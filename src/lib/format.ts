/**
 * Format coordinates to human-readable string
 */
export function formatCoordinates(lat: number, lng: number): string {
  const latDir = lat >= 0 ? 'N' : 'S';
  const lngDir = lng >= 0 ? 'E' : 'W';

  return `${Math.abs(lat).toFixed(4)}°${latDir}, ${Math.abs(lng).toFixed(4)}°${lngDir}`;
}

/**
 * Format price in cents to dollar string
 */
export function formatPrice(cents: number): string {
  const dollars = cents / 100;
  return `$${dollars.toFixed(2)}`;
}

/**
 * Format ISO date string to human-readable format
 */
export function formatDate(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

/**
 * Validate and format tile ID
 */
export function formatTileId(id: string): string {
  // Tile IDs are already in correct format: YS-XXX-YYY
  // This function validates and returns as-is
  const pattern = /^YS-\d{3}-\d{3}$/;
  if (!pattern.test(id)) {
    console.warn(`Invalid tile ID format: ${id}`);
  }
  return id;
}
