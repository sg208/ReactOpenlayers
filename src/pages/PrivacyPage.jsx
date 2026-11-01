import LegalLayout from './LegalLayout'
import { REPO_URL } from '../Layouts/Footer/Footer'

const PrivacyPage = () => (
    <LegalLayout page="privacy" title="Privacy">
        <p>Last updated 1 November 2026.</p>
        <p>
            This site has no accounts, no analytics, no ads and no cookies. It does not use local storage
            either. The site itself stores nothing about you or what you do on the map.
        </p>

        <h2>Services your browser contacts</h2>
        <p>
            To draw the map and the text, your browser loads files straight from these services. Each one sees
            your IP address and browser details, like any website you visit, and handles them under its own
            privacy policy.
        </p>
        <ul>
            <li>
                <strong>MapTiler</strong> (<code>api.maptiler.com</code>) serves the satellite image tiles for
                the part of the world you are looking at. The requests carry this site&apos;s public MapTiler
                key.
            </li>
            <li>
                <strong>ahocevar.com GeoServer</strong> (<code>ahocevar.com/geoserver/wfs</code>) is a public
                GeoServer used by the OpenLayers examples. It returns the OpenStreetMap water areas for the
                visible map area, so each request includes the bounding box of your current view.
            </li>
            <li>
                <strong>Google Fonts</strong> (<code>fonts.googleapis.com</code> and{' '}
                <code>fonts.gstatic.com</code>) serves the IBM Plex Sans and IBM Plex Mono typefaces.
            </li>
        </ul>
        <p>Links to GitHub, MapTiler and OpenStreetMap only contact those sites if you click them.</p>

        <h2>Hosting</h2>
        <p>
            Cloudflare serves the site. As the host, it may keep standard request logs, such as your IP
            address, the page you asked for and your browser&apos;s user agent. I do not add any tracking on
            top of that.
        </p>

        <h2>Questions</h2>
        <p>
            There is no contact email for this project. If you have a question or a concern, please{' '}
            <a href={`${REPO_URL}/issues`} target="_blank" rel="noopener noreferrer">
                open an issue on GitHub<span className="visually-hidden"> (opens in a new tab)</span>
            </a>
            .
        </p>
    </LegalLayout>
)

export default PrivacyPage
