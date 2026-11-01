import './Footer.scss'

export const Footer = () => (
    <footer className="footer">
        <p className="footer-text">
            With gratitude,{' '}
            <a href="https://github.com/sg208" target="_blank" rel="noopener noreferrer">
                github/sg208<span className="visually-hidden"> (opens in a new tab)</span>
            </a>
        </p>
        <p className="footer-text">MIT licensed</p>
    </footer>
)

export default Footer
