import React, { Component } from 'react'
import './Header.scss'

export class Header extends Component {
    render() {
        return (
            <header role="banner" className="header-container">
                <h2 className="header-main-text">React<span className="plus-green">+</span>OpenLayers</h2>
            </header>
        )
    }
}

export default Header
