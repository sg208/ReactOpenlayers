import LegalLayout from './LegalLayout'
import { REPO_URL } from '../Layouts/Footer/Footer'

const TermsPage = () => (
    <LegalLayout page="terms" title="Terms">
        <p>Last updated 1 November 2026.</p>
        <p>
            This is a demo and portfolio project: a satellite map with OpenStreetMap water areas, built to try
            out React and OpenLayers. You are welcome to use it, but please don&apos;t rely on it for
            navigation, planning or anything else that matters.
        </p>

        <h2>No warranty</h2>
        <p>
            The site and its content are provided as is, without warranty of any kind. The map data may be
            incomplete, out of date or unavailable, and the outside services it depends on can change or go
            offline at any time.
        </p>

        <h2>The code</h2>
        <p>
            The source code is released under the MIT License. You can read it, and the license, in the{' '}
            <a href={REPO_URL} target="_blank" rel="noopener noreferrer">
                GitHub repository<span className="visually-hidden"> (opens in a new tab)</span>
            </a>
            .
        </p>

        <h2>Third-party content</h2>
        <p>
            Satellite imagery is &copy; MapTiler, and the water areas come from OpenStreetMap contributors.
            The IBM Plex fonts belong to IBM. Each stays with its owner under its own terms; the MIT License
            covers only the code in this repository.
        </p>

        <h2>Privacy</h2>
        <p>
            What the site does with your data, and which services your browser talks to, is on the{' '}
            <a href="/privacy/">privacy page</a>.
        </p>
    </LegalLayout>
)

export default TermsPage
