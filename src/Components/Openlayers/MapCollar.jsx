// The map collar: legend, view readout and pointer readout, set like the margin of a chart sheet.
const MapCollar = ({ isWaterVisible, onWaterToggle, onResetView, viewState, pointerRef }) => (
    <div className="map-collar">
        <label className="map-legend">
            <input
                type="checkbox"
                className="map-legend-input"
                checked={isWaterVisible}
                onChange={onWaterToggle}
            />
            <span className="map-legend-swatch" aria-hidden="true" />
            <span>Water areas</span>
        </label>

        <dl className="map-readout">
            <div className="map-readout-item">
                <dt>Centre</dt>
                <dd className="map-figure">{viewState.centre}</dd>
            </div>
            <div className="map-readout-item">
                <dt>Zoom</dt>
                <dd className="map-figure">{viewState.zoom.toFixed(1)}</dd>
            </div>
            <div className="map-readout-item map-readout-pointer">
                <dt>Pointer</dt>
                <dd className="map-figure" ref={pointerRef} />
            </div>
        </dl>

        <button type="button" className="map-reset" onClick={onResetView}>
            Reset view
        </button>
    </div>
)

export default MapCollar
