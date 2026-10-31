import { useEffect, useRef } from 'react'

import Map from 'ol/Map'
import View from 'ol/View'
import MousePosition from 'ol/control/MousePosition'
import { defaults as defaultControls } from 'ol/control/defaults'
import { createStringXY } from 'ol/coordinate'
import GeoJSON from 'ol/format/GeoJSON'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import { bbox as bboxStrategy } from 'ol/loadingstrategy'
import VectorSource from 'ol/source/Vector'
import XYZ from 'ol/source/XYZ'
import { Stroke, Style } from 'ol/style'

import './Openlayers.scss'

export const INITIAL_CENTER = [-8908887.277395891, 5381918.072437216]
export const INITIAL_ZOOM = 12

// Client-side MapTiler key: it ships in the browser bundle by design, so treat it as public.
const MAPTILER_KEY = 'Qg3YFC9sjakX9lep4dSi'
const ATTRIBUTIONS =
    '<a href="https://www.maptiler.com/copyright/" target="_blank" rel="noopener noreferrer">&copy; MapTiler</a> | ' +
    '<a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">&copy; OpenStreetMap</a>'

export const buildWaterAreasUrl = (extent) =>
    'https://ahocevar.com/geoserver/wfs?service=WFS&' +
    'version=1.1.0&request=GetFeature&typename=osm:water_areas&' +
    'outputFormat=application/json&srsname=EPSG:3857&' +
    `bbox=${extent.join(',')},EPSG:3857`

const createMap = (target) => {
    const raster = new TileLayer({
        source: new XYZ({
            attributions: ATTRIBUTIONS,
            url: `https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=${MAPTILER_KEY}`,
            maxZoom: 20,
        }),
    })

    const vector = new VectorLayer({
        source: new VectorSource({
            format: new GeoJSON(),
            url: buildWaterAreasUrl,
            strategy: bboxStrategy,
        }),
        style: new Style({
            stroke: new Stroke({ color: 'rgba(0, 0, 255, 1.0)', width: 2 }),
        }),
    })

    const mousePosition = new MousePosition({
        coordinateFormat: createStringXY(4),
        projection: 'EPSG:4326',
        placeholder: 'Mouse Position',
    })

    return new Map({
        target,
        layers: [raster, vector],
        view: new View({ center: INITIAL_CENTER, zoom: INITIAL_ZOOM }),
        controls: defaultControls().extend([mousePosition]),
    })
}

const Openlayers = () => {
    const mapElementRef = useRef(null)

    useEffect(() => {
        const map = createMap(mapElementRef.current)
        return () => {
            map.setTarget(undefined)
            map.dispose()
        }
    }, [])

    return (
        <div>
            <div ref={mapElementRef} id="map" className="map" role="region" aria-label="Map" />
        </div>
    )
}

export default Openlayers
