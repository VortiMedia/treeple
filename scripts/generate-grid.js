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

// Track used IDs to ensure uniqueness
const usedIds = new Set();
let idCounter = 0;

// Add properties to each cell
grid.features = grid.features.map((feature, index) => {
  const center = turf.center(feature);
  const [lng, lat] = center.geometry.coordinates;

  // Calculate row/col based on position relative to bounding box
  const minLat = YELLOWSTONE_BBOX[1];
  const minLng = YELLOWSTONE_BBOX[0];

  // Convert coordinate differences to km
  const latDiffKm = (lat - minLat) * 111; // 1 degree ≈ 111 km
  const avgLat = (YELLOWSTONE_BBOX[1] + YELLOWSTONE_BBOX[3]) / 2;
  const lngDiffKm = (lng - minLng) * 111 * Math.cos(avgLat * Math.PI / 180);

  const row = Math.floor(latDiffKm / CELL_SIZE);
  const col = Math.floor(lngDiffKm / CELL_SIZE);

  // Generate tile ID with zero-padded row and column
  let tileId = `YS-${String(row).padStart(3, '0')}-${String(col).padStart(3, '0')}`;

  // If ID already exists (shouldn't happen with correct math, but safety check)
  while (usedIds.has(tileId)) {
    tileId = `YS-${String(row).padStart(3, '0')}-${String(col).padStart(3, '0')}-${idCounter++}`;
  }
  usedIds.add(tileId);

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

// Validate for duplicate IDs
console.log('Validating tile IDs...');
const idSet = new Set();
const duplicates = [];

grid.features.forEach((feature) => {
  const id = feature.properties.id;
  if (idSet.has(id)) {
    duplicates.push(id);
  } else {
    idSet.add(id);
  }
});

if (duplicates.length > 0) {
  console.error(`❌ ERROR: Found ${duplicates.length} duplicate tile IDs!`);
  console.error('Sample duplicates:', duplicates.slice(0, 5));
  process.exit(1);
}

console.log(`✓ Validated: All ${grid.features.length} tile IDs are unique`);

// Statistics
console.log('\nGrid Statistics:');
console.log(`  Bounding box: [${YELLOWSTONE_BBOX.join(', ')}]`);
console.log(`  Cell size: ${CELL_SIZE} ${UNITS}`);
console.log(`  Total tiles: ${grid.features.length}`);
console.log(`  Sample IDs (first 5):`, grid.features.slice(0, 5).map(f => f.properties.id));
console.log(`  Sample IDs (last 5):`, grid.features.slice(-5).map(f => f.properties.id));

// Write to file
const outputPath = path.join(__dirname, '..', 'public', 'data', 'yellowstone-grid.json');

try {
  fs.writeFileSync(outputPath, JSON.stringify(grid, null, 2));
  console.log(`\n✓ Saved to ${outputPath}`);

  // Verify file was written correctly
  const fileSize = fs.statSync(outputPath).size;
  console.log(`✓ File size: ${(fileSize / 1024 / 1024).toFixed(2)} MB`);

  // Read back and validate JSON
  const readBack = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
  if (readBack.features.length !== grid.features.length) {
    throw new Error('File verification failed: feature count mismatch');
  }
  console.log(`✓ File verified successfully`);
} catch (error) {
  console.error('❌ ERROR writing file:', error.message);
  process.exit(1);
}
