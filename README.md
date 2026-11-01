# ReactOpenlayers
A single-page map viewer: MapTiler satellite imagery with OpenStreetMap water areas loaded from a WFS service. The map sits on a sheet with a collar that holds the layer toggle, the view centre and zoom, the pointer position and a reset button. Light and dark themes follow the system setting.
https://react-openlayers.engg.app

## Stacks
OpenLayers 10 + React 19 + SCSS + Vite 8 + Vitest/Testing Library + Cloudflare Workers (static assets)

## Setup
Requires Node 24 (`.nvmrc`) and pnpm (`corepack enable`).

```bash
pnpm install
pnpm dev       # dev server
pnpm build     # production build to dist/
pnpm preview   # serve the build
pnpm test      # Vitest suite
```

The site runs as a Cloudflare Worker serving static assets on the sg208 account. `wrangler.jsonc` serves `dist/` (from `pnpm build`) and falls back to `index.html` for SPA routes. `pnpm run deploy` builds and runs `wrangler deploy`; it needs `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` in the environment. `vercel.json` is left over from the old host and is not used.

## Accessibility
The map takes keyboard focus (arrow keys pan, plus and minus zoom), every control has a visible focus ring, colours meet WCAG 2.2 AA contrast, and motion is reduced when the system asks for it.

## Backlogs
- Automated accessibility browser tests (contrast, focus order)
- More unit tests

## Bug Reporting
Feel free to submit bugs/issues to later enhance this simple app.

Thanks :)

## License
MIT, see [LICENSE](LICENSE). Copyright (c) 2026 Syailendra Ginting.
