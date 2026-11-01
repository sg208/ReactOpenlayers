import Openlayers from '../../Components/Openlayers/Openlayers'

import './Main.scss'

const Main = () => (
    <main className="sheet">
        <div className="sheet-title-row">
            <h1 className="sheet-title">Satellite map with water areas</h1>
            <p className="sheet-subline">
                OpenStreetMap water areas, loaded per view from a WFS service and traced over
                MapTiler satellite imagery.
            </p>
        </div>
        <Openlayers />
        <p className="sheet-stack">Built with OpenLayers, React, SCSS, Vite and Vitest. Hosted on Vercel.</p>
    </main>
)

export default Main
