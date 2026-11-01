import './Footer.scss'

export const REPO_URL = 'https://github.com/sg208/ReactOpenlayers'

const PAGE_LINKS = [
    { page: 'accessibility', label: 'Accessibility', href: '/accessibility/' },
    { page: 'privacy', label: 'Privacy', href: '/privacy/' },
    { page: 'terms', label: 'Terms', href: '/terms/' },
]

export const Footer = ({ currentPage }) => (
    <footer className="footer">
        <nav className="footer-nav" aria-label="Site">
            <ul className="footer-list">
                {PAGE_LINKS.map(({ page, label, href }) => (
                    <li key={page}>
                        <a href={href} aria-current={page === currentPage ? 'page' : undefined}>
                            {label}
                        </a>
                    </li>
                ))}
                <li>
                    <a href={REPO_URL} target="_blank" rel="noopener noreferrer">
                        Source on GitHub<span className="visually-hidden"> (opens in a new tab)</span>
                    </a>
                </li>
            </ul>
        </nav>
        <p className="footer-text">
            With gratitude,{' '}
            <a href="https://github.com/sg208" target="_blank" rel="noopener noreferrer">
                github/sg208<span className="visually-hidden"> (opens in a new tab)</span>
            </a>{' '}
            <span aria-hidden="true">·</span> MIT licensed
        </p>
    </footer>
)

export default Footer
