import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const mapInstances = vi.hoisted(() => [])

vi.mock('ol/Map', () => ({
    default: vi.fn(function MockMap(options) {
        this.options = options
        this.setTarget = vi.fn()
        this.dispose = vi.fn()
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

        expect(map.setTarget).toHaveBeenCalledWith(undefined)
        expect(map.dispose).toHaveBeenCalledOnce()
    })

    it('builds the WFS water-areas URL for an extent', () => {
        const url = buildWaterAreasUrl([1, 2, 3, 4])
        expect(url).toContain('typename=osm:water_areas')
        expect(url).toMatch(/bbox=1,2,3,4,EPSG:3857$/)
    })
})
