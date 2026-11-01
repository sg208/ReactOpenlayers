# ReactOpenlayers

A single-page map viewer: MapTiler satellite imagery with OpenStreetMap water areas loaded from a WFS service. The map sits on a sheet with a collar that holds the layer toggle, the view centre and zoom, the pointer position and a reset button. Light and dark themes follow the system setting.

Live at https://react-openlayers.engg.app

## Stack

OpenLayers 10, React 19, SCSS, Vite 8, Vitest with Testing Library. Hosted as a Cloudflare Worker serving static assets.

## Run it locally

Requires Node 24 (`.nvmrc`) and pnpm (`corepack enable`).

```bash
pnpm install
pnpm dev       # dev server
pnpm test      # Vitest suite
pnpm build     # production build to dist/
pnpm preview   # serve the build
```

The build has four pages: the map (`src/index.html`) and the accessibility, privacy and terms pages (`src/accessibility/`, `src/privacy/`, `src/terms/`), all listed as inputs in `vite.config.js`.

## Deploy

`pnpm run deploy` builds and runs `wrangler deploy`. `wrangler.jsonc` serves `dist/` on the `react-openlayers.engg.app` custom domain and falls back to `index.html` for unknown paths. It needs a global `wrangler` v4 and `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` in the environment.

## Accessibility

The target is WCAG 2.2 AA. The map takes keyboard focus (arrow keys pan, plus and minus zoom), every control has a visible focus ring, and motion is reduced when the system asks for it. Known gaps are listed on the [accessibility page](https://react-openlayers.engg.app/accessibility/).

## Bugs and ideas

Please open an issue on [GitHub](https://github.com/sg208/ReactOpenlayers/issues).

## License

MIT, see [LICENSE](LICENSE). Copyright (c) 2026 Syailendra Ginting.
