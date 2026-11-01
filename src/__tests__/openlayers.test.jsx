import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const mapInstances = vi.hoisted(() => [])

vi.mock('ol/Map', () => ({
    default: vi.fn(function MockMap(options) {
        this.options = options
        this.setTarget = vi.fn()
        this.dispose = vi.fn()
        this.on = vi.fn()
        this.un = vi.fn()
        mapInstances.push(this)
    }),
}))

const { default: Openlayers, INITIAL_CENTER, INITIAL_ZOOM, buildWaterAreasUrl } = await import(
    '../Components/Openlayers/Openlayers'
)

describe('Openlayers', () => {
    beforeEach(() => {
        mapInstances.length = 0
    })

    it('creates one map targeting the rendered map element', () => {
        render(<Openlayers />)
        const mapElement = screen.getByRole('region', { name: 'Map' })

        expect(mapInstances).toHaveLength(1)
        const [map] = mapInstances
        expect(map.options.target).toBe(mapElement)
        expect(map.options.layers).toHaveLength(2)
        expect(map.options.view.getCenter()).toEqual(INITIAL_CENTER)
        expect(map.options.view.getZoom()).toBe(INITIAL_ZOOM)
    })

    it('detaches and disposes the map on unmount', () => {
        const { unmount } = render(<Openlayers />)
        const [map] = mapInstances
        unmount()

        expect(map.un).toHaveBeenCalledWith('moveend', expect.any(Function))
        expect(map.setTarget).toHaveBeenCalledWith(undefined)
        expect(map.dispose).toHaveBeenCalledOnce()
    })

    it('makes the map keyboard focusable', () => {
        render(<Openlayers />)
        expect(screen.getByRole('region', { name: 'Map' })).toHaveAttribute('tabindex', '0')
    })

    it('toggles the water-areas layer from the legend', () => {
        render(<Openlayers />)
        const [map] = mapInstances
        const waterLayer = map.options.layers[1]
        const toggle = screen.getByRole('checkbox', { name: 'Water areas' })

        expect(toggle).toBeChecked()
        fireEvent.click(toggle)
        expect(toggle).not.toBeChecked()
        expect(waterLayer.getVisible()).toBe(false)
    })

    it('shows the initial centre and zoom in the collar', () => {
        render(<Openlayers />)
        expect(screen.getByText(/° N, .*° W/)).toBeInTheDocument()
        expect(screen.getByText('12.0')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Reset view' })).toBeInTheDocument()
    })

    it('builds the WFS water-areas URL for an extent', () => {
        const url = buildWaterAreasUrl([1, 2, 3, 4])
        expect(url).toContain('typename=osm:water_areas')
        expect(url).toMatch(/bbox=1,2,3,4,EPSG:3857$/)
    })
})

describe('map attributions', () => {
    it('tells screen readers that each attribution link opens a new tab', async () => {
        const { ATTRIBUTIONS } = await import('../Components/Openlayers/createMap')
        const container = document.createElement('div')
        container.innerHTML = ATTRIBUTIONS
        const links = [...container.querySelectorAll('a[target="_blank"]')]

        expect(links).toHaveLength(2)
        links.forEach((link) => expect(link.textContent).toMatch(/\(opens in a new tab\)$/))
    })
})
