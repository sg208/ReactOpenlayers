# ReactOpenlayers
A single-page map viewer: MapTiler satellite imagery with OpenStreetMap water areas loaded from a WFS service. The map sits on a sheet with a collar that holds the layer toggle, the view centre and zoom, the pointer position and a reset button. Light and dark themes follow the system setting.
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
