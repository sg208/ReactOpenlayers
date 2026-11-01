import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import AccessibilityPage from '../pages/AccessibilityPage'
import PrivacyPage from '../pages/PrivacyPage'
import TermsPage from '../pages/TermsPage'

describe.each([
    ['Accessibility', AccessibilityPage],
    ['Privacy', PrivacyPage],
    ['Terms', TermsPage],
])('%s page', (title, Page) => {
    it('has landmarks, one h1 and marks itself current in the footer', () => {
        render(<Page />)
        expect(screen.getByRole('banner')).toBeInTheDocument()
        expect(screen.getByRole('main')).toBeInTheDocument()
        expect(screen.getByRole('contentinfo')).toBeInTheDocument()
        expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
        expect(screen.getByRole('heading', { level: 1, name: title })).toBeInTheDocument()
        expect(screen.getByRole('link', { name: title })).toHaveAttribute('aria-current', 'page')
        expect(screen.getByRole('link', { name: 'Back to the map' })).toHaveAttribute('href', '/')
    })
})

describe('privacy page', () => {
    it('names every third party the browser contacts and the host', () => {
        render(<PrivacyPage />)
        const main = screen.getByRole('main')
        expect(main).toHaveTextContent('api.maptiler.com')
        expect(main).toHaveTextContent('ahocevar.com/geoserver/wfs')
        expect(main).toHaveTextContent('Cloudflare serves the site')
    })
})
