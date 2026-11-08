# Conventions

PURPOSE: patterns the repo follows implicitly (ESLint flat config in `eslint.config.js`; no Prettier, formatting is by convention). Maintained by enggflo (`/enggflo-init`).

## Naming

- Component dirs PascalCase, `.jsx` + `.scss` of the same name side by side (`src/Layouts/Footer/Footer.{jsx,scss}`, `src/Components/Openlayers/Openlayers.{jsx,scss}`).
- Non-component modules camelCase `.js` (`createMap.js`, `formatCoordinate.js`).
- Page components `*Page.jsx` in `src/pages/`; HTML entry per page `src/<page>/index.html`.
- Booleans `is*` (`isWaterVisible`, `isChecked`); handlers `handle*` (`handleWaterToggle`, `handleResetView`); props for callbacks `on*` (`onWaterToggle`).
- Module constants UPPER_SNAKE (`INITIAL_CENTER`, `REPO_URL`, `PAGE_LINKS`).

## Style

- Arrow-function components; `const` only; `?.` / `??` for optional access.
- Font sizes in `rem` (WCAG 1.4.4); layout sizes may stay `px`.
- 4-space indent · single quotes · no semicolons · trailing commas (`vite.config.js`, `Footer.jsx`).
- Components export default; shared constants/helpers as named exports (`Footer.jsx:3,11,38`).
- Side-effect imports (`./X.scss`) after module imports.

## Accessibility

- External links: `target="_blank" rel="noopener noreferrer"` + visually hidden "(opens in a new tab)" (`Footer.jsx:23-25`).
- Motion gated by `prefersReducedMotion()` (`createMap.js:31-32`).
- Live readouts use `aria-live="polite"` + `aria-atomic` (`MapCollar.jsx:16,20`).

## Tests

- `src/__tests__/*.test.{js,jsx}`; `ol/Map` mocked (jsdom has no canvas).

## Git

- Conventional commit subjects: `feat:` · `fix:` · `chore:` · `docs:` · `test:` (`git log`).
- Work on `develop`; release by merging `develop` → `main` (`486cee0 chore(release): v2.1.0`).
