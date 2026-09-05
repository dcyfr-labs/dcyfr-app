# AGENTS.md - dcyfr-app

## Project Overview

`dcyfr.app` is a Next.js 16 / React 19 showcase app for DCYFR starter templates.

## Architecture

- App Router pages live in `app/`
- Shared UI lives in `components/`
- Utilities and app logic live in `lib/`
- End-to-end coverage lives in `e2e/`

## Commands

```bash
npm run dev
npm run build
npm run lint
npm run typecheck
npm run test:e2e
```

## Working Rules

- Preserve established Next.js App Router patterns.
- Prefer updating existing components and data sources instead of adding parallel structures.
- If UI behavior changes, run `npm run typecheck` and the relevant Playwright coverage when feasible.
