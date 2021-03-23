import React from 'react'
import ReactDOM from 'react-dom'

/// importing global styles
import './index.scss';

/// importing layout
import Header from './Layouts/Header/Header'
import Main from './Layouts/Main/Main'
import Footer from './Layouts/Footer/Footer'

const Index = () => {
    return (
        <div >
            <Header />
            <Main />
            <Footer />
        </div>
    )
}

ReactDOM.render(<Index />, document.getElementById('root'))