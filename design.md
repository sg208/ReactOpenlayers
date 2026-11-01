# Design

PURPOSE: architecture · data flow · key decisions. Maintained by enggflo (`/enggflo-init`).

## Architecture

| layer | path | role |
|---|---|---|
| build | `vite.config.js:8-25` | `root: src`, `outDir: ../dist`; 4 HTML inputs (map + accessibility/privacy/terms) |
| map entry | `src/index.html` → `src/main.jsx` → `src/App.jsx:5-14` | skip link → Header · Main · Footer |
| map component | `src/Components/Openlayers/Openlayers.jsx:17-83` | owns React state (water visibility, view readout); mounts map in `useEffect` |
| map factory | `src/Components/Openlayers/createMap.js:53-99` | builds `ol/Map`: MapTiler XYZ raster + WFS water vector layer + controls |
| map collar | `src/Components/Openlayers/MapCollar.jsx:2-34` | water toggle · centre/zoom/pointer readout · reset button |
| legal pages | `src/{accessibility,privacy,terms}/index.html` → `src/pages/renderPage.jsx:10-23` | `data-page` picks page component; unknown → `TermsPage` |
| footer | `src/Layouts/Footer/Footer.jsx:5-36` | links Accessibility · Privacy · Terms · GitHub repo (`REPO_URL`) |
| tokens | `src/styles/_tokens.scss` | colour/size tokens; light + dark via system setting |
| hosting | `wrangler.jsonc` | Cloudflare Worker static assets from `dist/`, SPA fallback, custom domain `react-openlayers.engg.app` |

## Data flow

1. `Openlayers.jsx:27-44` → `createMap({ target, pointerTarget })` on mount → returns `{ map, view, waterLayer }` kept in a ref.
2. Raster tiles → `api.maptiler.com/tiles/satellite-v2` (`createMap.js:58`).
3. Water areas → `VectorSource` with `bboxStrategy`; URL per extent from `buildWaterAreasUrl` → `ahocevar.com/geoserver/wfs` GeoJSON (`createMap.js:48-52,63-73`).
4. `moveend` → `readViewState` → `viewState` → collar readout (`Openlayers.jsx:12-15,33`).
5. Pointer position → `MousePosition` control renders straight into collar `<dd>` via `pointerRef` (`createMap.js:74-80`).
6. Toggle → `waterLayer.setVisible` (`Openlayers.jsx:46-50`); reset → `view.animate` to initial centre/zoom (`Openlayers.jsx:52-58`).
7. Unmount → `map.un` · `setTarget(undefined)` · `dispose()` (`Openlayers.jsx:38-43`).

## Key decisions

- Map built outside React in `createMap.js`; React holds only UI state. WHY: OL owns its DOM; one effect, clean dispose, mockable in jsdom (`src/__tests__/openlayers.test.jsx`).
- Legal pages = separate Vite HTML inputs, not a router. WHY: static pages, no client routing dependency (`vite.config.js:15-20`).
- Reduced motion → zoom/reset durations 0 (`createMap.js:31-32,84`; `Openlayers.jsx:56`).
- OL control buttons get `aria-label` from `CONTROL_NAMES` (`createMap.js:35-45`). WHY: OL names buttons by glyph.
- MapTiler key ships in the bundle by design (`createMap.js:20-21`). WHY: client-side tile key; restrict by origin in MapTiler dashboard.
- Hosting = Cloudflare Worker (`wrangler.jsonc`), deploy `pnpm run deploy`. Vercel · Netlify · Railway · Cloudflare Pages · engg.me retired.

## External dependencies

| service | used by | status |
|---|---|---|
| MapTiler satellite-v2 tiles | `createMap.js:58` | ok |
| ahocevar.com GeoServer WFS (`osm:water_areas`) | `createMap.js:49` | Works from browsers (rechecked 2026-11-01); `curl`/scripts get 403 from an upstream bot filter |
