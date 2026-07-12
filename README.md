# dcyfr-app

Interactive showcase for DCYFR starter templates, live at **[dcyfr.app](https://dcyfr.app)**.

`dcyfr.app` is a Next.js 15 / React 19 showcase app for DCYFR starter templates: browse the catalog at `/templates` and drill into individual templates at `/templates/[id]`. It is part of the dcyfr-labs site family alongside [dcyfr-io](https://github.com/dcyfr-labs/dcyfr-io), [dcyfr-bot](https://github.com/dcyfr-labs/dcyfr-bot), [dcyfr-build](https://github.com/dcyfr-labs/dcyfr-build), [dcyfr-codes](https://github.com/dcyfr-labs/dcyfr-codes), [dcyfr-tech](https://github.com/dcyfr-labs/dcyfr-tech), and [dcyfr-work](https://github.com/dcyfr-labs/dcyfr-work).

## Stack

- Next.js 15 (App Router) / React 19 / Tailwind CSS
- shadcn primitives from the `@dcyfr-labs` registry (`registry.dcyfr.ai`); the shared chrome bundle (nav, footer, page shell, theme switcher/provider) lives in [`components/chrome/`](components/chrome/README.md)
- Sentry instrumentation (client, server, and edge configs)
- Playwright for e2e and visual-regression snapshots ([`e2e/`](e2e/README.md))

## Development

```sh
npm install
npm run dev        # http://localhost:3301
```

| Command | What it does |
|---|---|
| `npm run dev` / `npm run start` | Dev / production server on port **3301** |
| `npm run build` | Production build |
| `npm run lint` / `npm run typecheck` | ESLint / `tsc --noEmit` |
| `npm run test:e2e` (`:ui`) | Playwright e2e suite |
| `npm run test:snapshots` (`:update`) | Visual-regression snapshots (chromium) |

## Routes

- `/` — showcase landing page
- `/templates` — template catalog
- `/templates/[id]` — individual template detail

## Environment variables

No runtime secrets. `SENTRY_ORG` / `SENTRY_PROJECT` are used at build time for Sentry source-map upload; the site runs without them locally.

## Design-token & scaffold contract

This site follows the `dcyfr-site-scaffold` contract: all colors, spacing, radii, and typography resolve via CSS variables — no hardcoded design tokens. Local ESLint rules in `eslint-local-rules/` (`no-hardcoded-colors`, `no-hardcoded-spacing`, `no-hardcoded-typography`, `no-legacy-dcyfr-palette`) enforce this, and the `design-tokens.yml` workflow gates every PR. From the workspace root, `npm run audit:sites` checks scaffold compliance across the whole site family.

## CI

- `ci.yml` — lint, typecheck, build
- `codeql.yml` / `semgrep.yml` — static security analysis
- `design-tokens.yml` — design-token + scaffold gate
- `visual-regression.yml` — Playwright snapshots against preview deploys
- `dependabot-auto-merge.yml` — dependency hygiene

## Deployment

Deployed on Vercel from `main` (hardened headers via `vercel.json`). The operational runbook is [`DEPLOYMENT.md`](DEPLOYMENT.md) — note it is **TLP:AMBER**; treat its contents as limited-distribution.

## Further docs

- [`AGENTS.md`](AGENTS.md) — agent conventions and project structure
- [`components/chrome/README.md`](components/chrome/README.md) — shared chrome primitives
- [`e2e/README.md`](e2e/README.md) — test suite notes
