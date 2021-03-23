import React, { Component } from 'react'
import Openlayers from './../../Components/Openlayers/Openlayers';

class Main extends Component {
    render() {
        return (
            <div role="main" className='global-container'>
                <h1 className='zero-element'>Here is The Map</h1>
                <p>OpenLayers + React + SCSS + Babel + Parcel + Jest + Vercel CI/CD</p>
                <Openlayers />
            </div>
        )
    }
}

export default Main
