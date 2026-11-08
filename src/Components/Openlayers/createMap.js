import Map from 'ol/Map'
import View from 'ol/View'
import MousePosition from 'ol/control/MousePosition'
import ScaleLine from 'ol/control/ScaleLine'
import { defaults as defaultControls } from 'ol/control/defaults'
import { defaults as defaultInteractions } from 'ol/interaction/defaults'
import GeoJSON from 'ol/format/GeoJSON'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import { bbox as bboxStrategy } from 'ol/loadingstrategy'
import VectorSource from 'ol/source/Vector'
import XYZ from 'ol/source/XYZ'
import { Stroke, Style } from 'ol/style'

import { formatLonLat } from './formatCoordinate'

export const INITIAL_CENTER = [-8908887.277395891, 5381918.072437216]
export const INITIAL_ZOOM = 12

// Client-side MapTiler key: it ships in the browser bundle by design, so treat it as public.
const MAPTILER_KEY = 'Qg3YFC9sjakX9lep4dSi'
const NEW_TAB_NOTE = '<span class="visually-hidden"> (opens in a new tab)</span>'
export const ATTRIBUTIONS =
    `<a href="https://www.maptiler.com/copyright/" target="_blank" rel="noopener noreferrer">&copy; MapTiler${NEW_TAB_NOTE}</a> | ` +
    `<a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">&copy; OpenStreetMap${NEW_TAB_NOTE}</a>`

// Water outline: a pale line on a dark halo so it reads over any imagery.
// Keep in sync with --water in styles/_tokens.scss (used by the legend swatch).
export const WATER_STROKE = '#7fd8ea'
const WATER_HALO = 'rgba(6, 30, 38, 0.6)'

export const prefersReducedMotion = () =>
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false

// OpenLayers names its buttons from their glyph ("+", "-", "i") and keeps the real name in `title`.
const CONTROL_NAMES = {
    '.ol-zoom-in': 'Zoom in',
    '.ol-zoom-out': 'Zoom out',
    '.ol-rotate button': 'Reset rotation',
    '.ol-attribution button': 'Toggle attributions',
}

const nameControlButtons = (target) => {
    for (const [selector, name] of Object.entries(CONTROL_NAMES)) {
        target.querySelector(selector)?.setAttribute('aria-label', name)
    }
}

export const buildWaterAreasUrl = (extent) =>
    'https://ahocevar.com/geoserver/wfs?service=WFS&' +
    'version=1.1.0&request=GetFeature&typename=osm:water_areas&' +
    'outputFormat=application/json&srsname=EPSG:3857&' +
    `bbox=${extent.join(',')},EPSG:3857`

export const createMap = ({ target, pointerTarget }) => {
    const raster = new TileLayer({
        source: new XYZ({
            attributions: ATTRIBUTIONS,
            url: `https://api.maptiler.com/tiles/satellite-v2/{z}/{x}/{y}.jpg?key=${MAPTILER_KEY}`,
            maxZoom: 20,
        }),
    })

    const waterLayer = new VectorLayer({
        source: new VectorSource({
            format: new GeoJSON(),
            url: buildWaterAreasUrl,
            strategy: bboxStrategy,
        }),
        style: [
            new Style({ stroke: new Stroke({ color: WATER_HALO, width: 4.5 }) }),
            new Style({ stroke: new Stroke({ color: WATER_STROKE, width: 2 }) }),
        ],
    })

    const mousePosition = new MousePosition({
        coordinateFormat: formatLonLat,
        projection: 'EPSG:4326',
        placeholder: '—',
        target: pointerTarget,
        className: 'map-pointer-readout',
    })

    const view = new View({ center: INITIAL_CENTER, zoom: INITIAL_ZOOM })

    const motionDuration = prefersReducedMotion() ? 0 : undefined

    const map = new Map({
        target,
        layers: [raster, waterLayer],
        view,
        controls: defaultControls({ zoomOptions: { duration: motionDuration } }).extend([
            mousePosition,
            new ScaleLine(),
        ]),
        interactions: defaultInteractions({ zoomDuration: motionDuration }),
    })
    nameControlButtons(target)

    return { map, view, waterLayer }
}
