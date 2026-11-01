import { describe, expect, it } from 'vitest'

import { formatLonLat } from '../Components/Openlayers/formatCoordinate'

describe('formatLonLat', () => {
    it('formats hemispheres from the signs of lon and lat', () => {
        expect(formatLonLat([-80.03101, 43.47123])).toBe('43.4712° N, 80.0310° W')
        expect(formatLonLat([151.2093, -33.8688])).toBe('33.8688° S, 151.2093° E')
    })

    it('returns a dash when there is no coordinate', () => {
        expect(formatLonLat(undefined)).toBe('—')
    })
})
