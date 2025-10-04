const turf = require('@turf/turf');
const fs = require('fs');
const path = require('path');

// Yellowstone National Park bounding box (approximate)
const YELLOWSTONE_BBOX = [-111.1, 44.1, -109.8, 45.1]; // [minLng, minLat, maxLng, maxLat]
const CELL_SIZE = 1; // 1 km
const UNITS = 'kilometers';

console.log('Generating Yellowstone grid...');

// Load water exclusion data
const waterExclusionsPath = path.join(__dirname, '..', 'design-docs', 'demo-data', 'water-exclusions.json');
const waterExclusions = JSON.parse(fs.readFileSync(waterExclusionsPath, 'utf8'));

// Function to check if a point is in water
function isPointInWater(lat, lng) {
  const point = turf.point([lng, lat]);

  // Check polygons (lakes)
  const polygons = ['yellowstone_lake', 'lewis_lake', 'shoshone_lake', 'heart_lake'];
  for (const polygonName of polygons) {
    const feature = waterExclusions.water_features[polygonName];
    if (!feature || !feature.coordinates) continue;

    const polygon = turf.polygon([feature.coordinates]);
    if (turf.booleanPointInPolygon(point, polygon)) {
      return true;
    }
  }

  // Check buffered linestrings (rivers)
  const rivers = ['yellowstone_river_north', 'yellowstone_river_south', 'madison_river', 'firehole_river'];
  for (const riverName of rivers) {
    const feature = waterExclusions.water_features[riverName];
    if (!feature || !feature.coordinates) continue;

    const line = turf.lineString(feature.coordinates);
    const buffered = turf.buffer(line, feature.buffer_km, { units: 'kilometers' });
    if (turf.booleanPointInPolygon(point, buffered)) {
      return true;
    }
  }

  return false;
}

// Generate square grid
const grid = turf.squareGrid(YELLOWSTONE_BBOX, CELL_SIZE, { units: UNITS });

// Track used IDs to ensure uniqueness
const usedIds = new Set();
let idCounter = 0;

// Add properties to each cell and filter out water
const initialTileCount = grid.features.length;
let waterExcludedCount = 0;

grid.features = grid.features
  .map((feature, index) => {
    const center = turf.center(feature);
    const [lng, lat] = center.geometry.coordinates;

    // Calculate row/col based on position relative to bounding box
    const minLat = YELLOWSTONE_BBOX[1];
    const minLng = YELLOWSTONE_BBOX[0];

    // Use Turf's distance function for accurate calculations at any latitude
    const southwestPoint = turf.point([minLng, minLat]);
    const cellSouthPoint = turf.point([lng, minLat]);
    const cellWestPoint = turf.point([minLng, lat]);

    // Calculate actual distances using great-circle distance
    const latDistanceKm = turf.distance(southwestPoint, cellSouthPoint, { units: 'kilometers' });
    const lngDistanceKm = turf.distance(southwestPoint, cellWestPoint, { units: 'kilometers' });

    const row = Math.floor(latDistanceKm / CELL_SIZE);
    const col = Math.floor(lngDistanceKm / CELL_SIZE);

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
  })
  .filter((feature) => {
    const { lat, lng } = feature.properties.coordinates;
    const inWater = isPointInWater(lat, lng);
    if (inWater) {
      waterExcludedCount++;
    }
    return !inWater;
  });

console.log(`\nWater Exclusions:`);
console.log(`  Initial tiles: ${initialTileCount}`);
console.log(`  Excluded (water): ${waterExcludedCount}`);
console.log(`  Remaining tiles: ${grid.features.length}`);

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
