import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import App from '../App'
import Footer from '../Layouts/Footer/Footer'
import Header from '../Layouts/Header/Header'

vi.mock('../Components/Openlayers/Openlayers', () => ({
    default: () => <div data-testid="map-stub" />,
}))

describe('layout', () => {
    it('renders the header brand as a banner', () => {
        render(<Header />)
        expect(screen.getByRole('banner')).toHaveTextContent('React+OpenLayers')
    })

    it('renders the footer as contentinfo', () => {
        render(<Footer />)
        expect(screen.getByRole('contentinfo')).toHaveTextContent('With gratitude, github/sg208')
        expect(screen.getByRole('link', { name: /^Source on GitHub.*opens in a new tab/ })).toHaveAttribute(
            'href',
            'https://github.com/sg208/ReactOpenlayers',
        )
        expect(screen.getByRole('link', { name: 'Accessibility' })).toHaveAttribute('href', '/accessibility/')
        expect(screen.getByRole('link', { name: 'Privacy' })).toHaveAttribute('href', '/privacy/')
        expect(screen.getByRole('link', { name: 'Terms' })).toHaveAttribute('href', '/terms/')
    })

    it('renders header, main with heading and map, and footer', () => {
        render(<App />)
        expect(screen.getByRole('banner')).toBeInTheDocument()
        expect(screen.getByRole('main')).toBeInTheDocument()
        expect(screen.getByRole('heading', { level: 1, name: 'Satellite map with water areas' })).toBeInTheDocument()
        expect(screen.getByTestId('map-stub')).toBeInTheDocument()
        expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    })
})
