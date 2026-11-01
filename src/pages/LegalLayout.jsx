import Header from '../Layouts/Header/Header'
import Footer from '../Layouts/Footer/Footer'

import '../Layouts/Main/Main.scss'
import './LegalLayout.scss'

const LegalLayout = ({ page, title, children }) => (
    <div className="app">
        <a className="skip-link" href="#content">
            Skip to content
        </a>
        <Header />
        <main id="content" className="sheet legal" tabIndex={-1}>
            <p className="legal-back">
                <a href="/">Back to the map</a>
            </p>
            <h1 className="sheet-title">{title}</h1>
            {children}
        </main>
        <Footer currentPage={page} />
    </div>
)

export default LegalLayout
