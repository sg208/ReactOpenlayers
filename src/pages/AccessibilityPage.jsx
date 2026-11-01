import LegalLayout from './LegalLayout'
import { REPO_URL } from '../Layouts/Footer/Footer'

const AccessibilityPage = () => (
    <LegalLayout page="accessibility" title="Accessibility">
        <p>Last reviewed 1 November 2026.</p>
        <p>
            The goal for this site is WCAG 2.2 level AA. It is a small demo, so the checks so far are a code
            review and a set of unit tests, not a formal audit.
        </p>

        <h2>What works today</h2>
        <ul>
            <li>
                Every page has a skip link, a header, a main region and a footer, and one top-level heading.
            </li>
            <li>
                The map can take keyboard focus. Arrow keys pan it, plus and minus zoom it, and a hidden hint
                tells screen reader users so.
            </li>
            <li>
                The OpenLayers zoom, rotation and attribution buttons have proper names instead of the bare
                symbols they ship with.
            </li>
            <li>The water layer toggle is a labelled checkbox, and the reset button is a real button.</li>
            <li>The map centre and zoom level are announced politely when the view changes.</li>
            <li>Every link and control shows a visible focus ring.</li>
            <li>
                Text and control colours were chosen to meet AA contrast in both the light and dark theme.
            </li>
            <li>
                The theme follows your system setting. When you ask for reduced motion, CSS animations stop
                and the zoom and reset animations are skipped.
            </li>
            <li>Links that open a new tab say so to screen readers.</li>
        </ul>

        <h2>Known limitations</h2>
        <ul>
            <li>
                The satellite imagery and the water outlines are visual only. There is no text alternative for
                what the map shows.
            </li>
            <li>The pointer position readout only updates with a mouse or other pointer.</li>
            <li>
                With reduced motion on, keyboard panning and drag inertia still animate briefly, because the
                setting is read once when the map loads.
            </li>
            <li>
                Each arrow key press queues its own centre announcement, so holding a key down can be noisy
                with a screen reader.
            </li>
            <li>
                Font sizes are set in pixels. Browser zoom works, but a larger default font size in browser
                settings is not picked up.
            </li>
            <li>There are no automated accessibility browser tests yet.</li>
        </ul>

        <h2>Report a problem</h2>
        <p>
            If something gets in your way, please{' '}
            <a href={`${REPO_URL}/issues`} target="_blank" rel="noopener noreferrer">
                open an issue on GitHub<span className="visually-hidden"> (opens in a new tab)</span>
            </a>
            . Say which page, what you were trying to do, and which browser and assistive technology you use.
        </p>
    </LegalLayout>
)

export default AccessibilityPage
