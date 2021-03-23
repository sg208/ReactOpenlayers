import React, { Component } from 'react'

/// openlayers
import Map from 'ol/map'
import View from 'ol/view'

import MousePosition from 'ol/control/MousePosition'
import { createStringXY } from 'ol/coordinate'
import { defaults as defaultControls } from 'ol/control'

import GeoJSON from 'ol/format/GeoJSON';
import VectorSource from 'ol/source/Vector';
import XYZ from 'ol/source/XYZ';
import {Stroke, Style} from 'ol/style';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {bbox as bboxStrategy} from 'ol/loadingstrategy';

/// styles
import './Openlayers.scss'

class Openlayers extends Component {
    constructor(props) {
        super(props)

        this.state = {
            center: [-8908887.277395891, 5381918.072437216],
            zoom: 12,
            projection: 'EPSG:28992'
        };

        this.mousePositionControl = new MousePosition({
            coordinateFormat: createStringXY(4),
            projection: 'EPSG:4326',
            // comment the following two lines to have the mouse position
            // be placed within the map.
            //className: 'custom-mouse-position',
            target: document.getElementById('mouse-position'),
            undefinedHTML: 'Mouse Position',
        });

        this.vectorSource = new VectorSource({
            format: new GeoJSON(),
            url: function (extent) {
              return (
                'https://ahocevar.com/geoserver/wfs?service=WFS&' +
                'version=1.1.0&request=GetFeature&typename=osm:water_areas&' +
                'outputFormat=application/json&srsname=EPSG:3857&' +
                'bbox=' +
                extent.join(',') +
                ',EPSG:3857'
              );
            },
            strategy: bboxStrategy,
        });

        this.vector = new VectorLayer({
            source: this.vectorSource,
            style: new Style({
              stroke: new Stroke({
                color: 'rgba(0, 0, 255, 1.0)',
                width: 2,
              }),
            }),
        });

        this.maptilerKey = 'Qg3YFC9sjakX9lep4dSi';
        this.attributions =
        '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> | ' +
        '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap</a>';

        this.raster = new TileLayer({
            source: new XYZ({
                attributions: this.attributions,
                url: 'https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=' + this.maptilerKey,
                maxZoom: 20,
            })
        });

        this.map = new Map({
            target: null,
            layers: [this.raster, this.vector],
            view: new View({
              center: this.state.center,
              zoom: this.state.zoom
            }),
            controls: defaultControls().extend([ this.mousePositionControl ]),
            projection: this.state.projection
        });        
    }
    
    updateMap() {
        this.map.getView().setCenter(this.state.center);
        this.map.getView().setZoom(this.state.zoom);
    }

    componentDidMount() {
        this.map.setTarget('map');
    
        // Listen to map changes
        this.map.on('moveend', () => {
          let center = this.map.getView().getCenter();
          let zoom = this.map.getView().getZoom();
          this.setState({ center, zoom });
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        let center = this.map.getView().getCenter();
        let zoom = this.map.getView().getZoom();
        if (center === nextState.center && zoom === nextState.zoom) return false;
        return true;
    }    
    
    render() {
        this.updateMap();
        return (
            <div>
                <div id="map" className="map"></div>                
            </div>
        );
    }
}

export default Openlayers
