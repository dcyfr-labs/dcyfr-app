# AGENTS.md - dcyfr-app

## What this is

Interactive showcase for DCYFR starter templates, served in production at https://dcyfr.app (package name `dcyfr-app-showcase`, dev port 3301). It is one of seven sibling sites built from the `dcyfr-site-scaffold` contract, so the layout, tooling and CI match the other `dcyfr-*` site repos.

## Stack

- Next.js `^16.4.3` (App Router) with React `^19.0.0`, TypeScript `^5`
- Tailwind CSS `^4.3.3` through `@tailwindcss/postcss`; there is no Tailwind config file
- shadcn (`new-york` style) with the `@dcyfr-labs` registry (`https://registry.dcyfr.ai/r/{name}.json`, see `components.json`)
- `@sentry/nextjs` `^10`, `@vercel/analytics`, `@vercel/speed-insights`, `next-themes`
- Playwright `^1.58.2` for e2e, contrast and visual-regression tests
- ESLint `^9` flat config (`eslint.config.mjs`)

## Directory map

- `app/` : routes (`/`, `/templates`, `/templates/[id]`, `/privacy`), `robots.ts`, `sitemap.ts`, `indexnow.txt`, `.well-known/security.txt`, icons and the OG image, plus the theme CSS files
- `components/` : `CodePreview`, `IntegrationMatrix`, `TemplateCard`, `TemplateFilters`, `TemplateGrid`
- `components/chrome/` : shared nav, footer, theme provider and toggle (registry-owned, see Conventions)
- `components/ui/` : `button`, `dcyfr-badge`, `dcyfr-button`, `dcyfr-card`, `sheet`
- `data/templates.json` : the 7 templates the catalog renders; `/templates/[id]` is pre-rendered with `generateStaticParams`
- `hooks/` : `use-dropdown`, `use-media-query`
- `lib/` : `types.ts`, `utils.ts`
- `e2e/` : Playwright specs (`smoke`, `contrast`, `snapshots`) and their README
- `eslint-local-rules/` : the five local ESLint rules
- `scripts/check-theme-wiring.mjs` : theme wiring check
- `proxy.ts` : apex to `www` redirect (Next 16 middleware)
- `public/llms.txt`, `DEPLOYMENT.md` (operational runbook)

## Scripts

- `dev` and `start` run `next dev --port 3301` and `next start --port 3301`. `build` runs `next build`, `lint` runs `eslint .`, `typecheck` runs `tsc --noEmit`.
- `test:e2e` runs every Playwright spec in `e2e/`; `test:e2e:ui` opens Playwright UI mode.
- `test:contrast` and `test:snapshots` run one spec each (`e2e/contrast.spec.ts`, `e2e/snapshots.spec.ts`) on chromium. `test:snapshots:update` and `test:snapshots:rebaseline` add `--update-snapshots` and `--update-snapshots=all`.
- `check:theme-wiring` runs `node scripts/check-theme-wiring.mjs`.

## Environment variables

There is no `.env.example`. The names below are the ones the code reads, and all are optional locally.

- `NEXT_PUBLIC_SENTRY_DSN`, `SENTRY_DSN` (falls back to `NEXT_PUBLIC_SENTRY_DSN`)
- `SENTRY_ORG`, `SENTRY_PROJECT` (build-time source maps; default to `dcyfr-labs` and `dcyfr-app`)
- `INDEXNOW_KEY` : served at `/indexnow.txt`; the route returns 404 when it is unset
- `VERCEL_ENV`, `NEXT_PUBLIC_VERCEL_ENV`, `NEXT_RUNTIME`, `CI` : set by the platform or CI
- `BASE_URL`, `VERCEL_AUTOMATION_BYPASS_SECRET` : Playwright only

## Testing

- Playwright has no `webServer` block. `playwright.config.ts` reads `BASE_URL` and falls back to the production site, so start the app yourself and set `BASE_URL=http://localhost:3301` to test local changes.
- `smoke.spec.ts` checks the homepage, the template grid and filters, one template detail page, console errors and mobile layout. `contrast.spec.ts` covers `/`, `/templates` and `/privacy`. `snapshots.spec.ts` covers `/` and `/#templates` at 1440x900 and 375x812, with a 5% `maxDiffPixelRatio`.
- Mobile snapshot baselines must be generated on x86 CI. Use the `visual-regression.yml` dispatch with `update_baselines` instead of a local run.
- There is no unit-test runner.

## CI

- `ci.yml`: `typecheck`, `lint` and `build` matrix on Node 20.
- `design-tokens.yml`: palette and primitive-color guards, identity-clobber and theme-wiring checks.
- `visual-regression.yml`: runs on Vercel preview `deployment_status` or dispatch (`base_url`, `update_baselines`); contrast spec, then snapshots (Node 22).
- `codeql.yml`, `semgrep.yml`: weekly (Monday 09:00 UTC), PRs and pushes to `main`; Semgrep needs `SEMGREP_APP_TOKEN`. The Dependabot auto-merge workflows handle dependency PRs.

The `main protection` ruleset requires the `lint`, `typecheck` and `build` checks.

## Design system rules

- Colors, spacing, radii and type come from CSS variables and the vendored `app/dcyfr-theme-*.css` and `app/dcyfr-chrome.css` files. `app/layout.tsx` sets `data-identity="slate"` on `<html>`, and `npm run check:theme-wiring` verifies that wiring.
- ESLint errors: `no-hardcoded-colors`, `no-deprecated-design-tokens`, `no-legacy-dcyfr-palette`. `no-hardcoded-spacing` and `no-hardcoded-typography` are `off` in `eslint.config.mjs`.
- Add primitives with the shadcn CLI and the `@dcyfr-labs` registry instead of writing parallel copies.

## Conventions and gotchas

- `components/chrome/` is owned by the registry bundle. Update it by re-running the registry add command instead of editing the files.
- `proxy.ts` redirects `dcyfr.app` to `www.dcyfr.app` with a 308 and security headers. It stays inert while the Vercel project-level apex redirect exists. `metadataBase` is the apex URL.
- Security headers are also set in `vercel.json`.
- Preserve App Router patterns, and extend existing components and `data/templates.json` before adding new structures.
- Run `npm run typecheck` and the relevant Playwright spec after UI changes.
