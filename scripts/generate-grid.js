const turf = require('@turf/turf');
const fs = require('fs');
const path = require('path');

// Yellowstone National Park bounding box (approximate)
const YELLOWSTONE_BBOX = [-111.1, 44.1, -109.8, 45.1]; // [minLng, minLat, maxLng, maxLat]
const CELL_SIZE = 1; // 1 km
const UNITS = 'kilometers';

console.log('Generating Yellowstone grid...');

// Generate square grid
const grid = turf.squareGrid(YELLOWSTONE_BBOX, CELL_SIZE, { units: UNITS });

// Add properties to each cell
grid.features = grid.features.map((feature, index) => {
  const center = turf.center(feature);
  const [lng, lat] = center.geometry.coordinates;

  // Calculate row/col based on position
  // Convert degree difference to km for proper row/col calculation
  const latDiffKm = (lat - YELLOWSTONE_BBOX[1]) * 111; // 1 degree ≈ 111 km
  const lngDiffKm = (lng - YELLOWSTONE_BBOX[0]) * 111 * Math.cos(lat * Math.PI / 180); // adjust for latitude

  const row = Math.floor(latDiffKm / CELL_SIZE);
  const col = Math.floor(lngDiffKm / CELL_SIZE);

  // Generate tile ID with zero-padded row and column
  const tileId = `YS-${String(row).padStart(3, '0')}-${String(col).padStart(3, '0')}`;

  return {
    ...feature,
    properties: {
      id: tileId,
      coordinates: {
        lat: parseFloat(lat.toFixed(6)),
        lng: parseFloat(lng.toFixed(6))
      },
      status: 'available' // default status
    }
  };
});

// Write to file
const outputPath = path.join(__dirname, '..', 'public', 'data', 'yellowstone-grid.json');
fs.writeFileSync(outputPath, JSON.stringify(grid, null, 2));

console.log(`✓ Generated ${grid.features.length} tiles`);
console.log(`✓ Saved to ${outputPath}`);
