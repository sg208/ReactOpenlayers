import Header from './Layouts/Header/Header'
import Main from './Layouts/Main/Main'
import Footer from './Layouts/Footer/Footer'

const App = () => (
    <div className="app">
        <a className="skip-link" href="#map">
            Skip to map
        </a>
        <Header />
        <Main />
        <Footer />
    </div>
)

export default App
