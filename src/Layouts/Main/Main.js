import React, { Component } from 'react'
import Openlayers, {  } from './../../Components/Openlayers/Openlayers';

class Main extends Component {
    render() {
        return (
            <div role="main" className='global-container'>
                <h1>This is MAIN LAYOUT COMPONENT</h1>
                <Openlayers />                
            </div>
        )
    }
}

export default Main
