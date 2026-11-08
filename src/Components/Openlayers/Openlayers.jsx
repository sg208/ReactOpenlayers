import { useEffect, useRef, useState } from 'react'
import { toLonLat } from 'ol/proj'

import { createMap, INITIAL_CENTER, INITIAL_ZOOM, prefersReducedMotion } from './createMap'
import { formatLonLat } from './formatCoordinate'
import MapCollar from './MapCollar'

import './Openlayers.scss'

const readViewState = (view) => ({
    centre: formatLonLat(toLonLat(view.getCenter() ?? INITIAL_CENTER)),
    zoom: view.getZoom() ?? INITIAL_ZOOM,
})

const Openlayers = () => {
    const mapElementRef = useRef(null)
    const pointerRef = useRef(null)
    const mapStateRef = useRef(null)
    const [isWaterVisible, setIsWaterVisible] = useState(true)
    const [viewState, setViewState] = useState(() => ({
        centre: formatLonLat(toLonLat(INITIAL_CENTER)),
        zoom: INITIAL_ZOOM,
    }))

    useEffect(() => {
        const mapState = createMap({
            target: mapElementRef.current,
            pointerTarget: pointerRef.current,
        })
        const { map, view } = mapState
        const handleMoveEnd = () => setViewState(readViewState(view))

        mapStateRef.current = mapState
        map.on('moveend', handleMoveEnd)

        return () => {
            map.un('moveend', handleMoveEnd)
            map.setTarget(undefined)
            map.dispose()
            mapStateRef.current = null
        }
    }, [])

    const handleWaterToggle = (event) => {
        const isChecked = event.target.checked
        setIsWaterVisible(isChecked)
        mapStateRef.current?.waterLayer.setVisible(isChecked)
    }

    const handleResetView = () => {
        mapStateRef.current?.view.animate({
            center: INITIAL_CENTER,
            zoom: INITIAL_ZOOM,
            duration: prefersReducedMotion() ? 0 : 450,
        })
    }

    return (
        <section className="map-panel">
            <div
                ref={mapElementRef}
                id="map"
                className="map"
                role="region"
                aria-label="Map"
                aria-describedby="map-keyboard-hint"
                // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                tabIndex={0}
            />
            <p id="map-keyboard-hint" className="visually-hidden">
                Arrow keys pan the map. Plus and minus zoom in and out.
            </p>
            <MapCollar
                isWaterVisible={isWaterVisible}
                onWaterToggle={handleWaterToggle}
                onResetView={handleResetView}
                viewState={viewState}
                pointerRef={pointerRef}
            />
        </section>
    )
}

export default Openlayers
