const formatAxis = (value, positive, negative) =>
    `${Math.abs(value).toFixed(4)}° ${value < 0 ? negative : positive}`

/** Formats an EPSG:4326 [lon, lat] pair as "43.4712° N, 80.0310° W". */
export const formatLonLat = (coordinate) => {
    if (!coordinate) return '—'
    const [lon, lat] = coordinate
    return `${formatAxis(lat, 'N', 'S')}, ${formatAxis(lon, 'E', 'W')}`
}
