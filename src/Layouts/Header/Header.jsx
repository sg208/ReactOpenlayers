import './Header.scss'

const REPO_URL = 'https://github.com/sg208/ReactOpenlayers'

export const Header = () => (
    <header className="header">
        <p className="header-brand">
            React<span className="header-plus">+</span>OpenLayers
        </p>
        <a className="header-link" href={REPO_URL} target="_blank" rel="noopener noreferrer">
            Source<span className="visually-hidden"> on GitHub (opens in a new tab)</span>
        </a>
    </header>
)

export default Header
