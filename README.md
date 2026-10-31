# ReactOpenlayers
This is a simple SPA based site with Openlayers map. It has one single component with three layout components.
https://react-openlayers.vercel.app/

## Stacks
OpenLayers 10 + React 19 + SCSS + Vite 8 + Vitest/Testing Library + Vercel (CI/CD)

## Setup
Requires Node 24 (`.nvmrc`) and pnpm (`corepack enable`).

```bash
pnpm install
pnpm dev       # dev server
pnpm build     # production build to dist/
pnpm preview   # serve the build
pnpm test      # Vitest suite
```

Vercel settings live in `vercel.json` (pnpm install, `pnpm build`, output `dist/`).

## Backlogs
- Basic accessibility features + more accessibility browser tests for color contrasts, etc.
- More unit tests

## Bug Reporting
Feel free to submit bugs/issues to later enhance this simple app.

Thanks :)

## License
MIT, see [LICENSE](LICENSE). Copyright (c) 2026 Syailendra Ginting.
