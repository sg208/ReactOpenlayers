import Map from 'ol/Map'
import View from 'ol/View'
import MousePosition from 'ol/control/MousePosition'
import ScaleLine from 'ol/control/ScaleLine'
import { defaults as defaultControls } from 'ol/control/defaults'
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
const ATTRIBUTIONS =
    '<a href="https://www.maptiler.com/copyright/" target="_blank" rel="noopener noreferrer">&copy; MapTiler</a> | ' +
    '<a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">&copy; OpenStreetMap</a>'

// Water outline: a pale line on a dark halo so it reads over any imagery.
// Keep in sync with the legend swatch in Openlayers.scss.
export const WATER_STROKE = '#7fd8ea'
const WATER_HALO = 'rgba(6, 30, 38, 0.6)'

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

    const map = new Map({
        target,
        layers: [raster, waterLayer],
        view,
        controls: defaultControls().extend([mousePosition, new ScaleLine()]),
    })

    return { map, view, waterLayer }
}
