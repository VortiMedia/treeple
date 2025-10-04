const fs = require('fs');
const path = require('path');

// Load the grid data
const gridPath = path.join(__dirname, '..', 'public', 'data', 'yellowstone-grid.json');
const grid = JSON.parse(fs.readFileSync(gridPath, 'utf8'));

// Load donor attributions
const donorDataPath = path.join(__dirname, '..', 'design-docs', 'demo-data', 'donor-attributions.json');
const donorData = JSON.parse(fs.readFileSync(donorDataPath, 'utf8'));

console.log('Seeding tile statuses from donor attributions...');

const seedData = {};
const totalTiles = grid.features.length;
const allTileIds = grid.features.map(f => f.properties.id);
const allTileIdsSet = new Set(allTileIds);

// Process donor clusters
let donorTileCount = 0;
let skippedTileCount = 0;

donorData.clusters.forEach(cluster => {
  cluster.tiles.forEach(tileId => {
    // Only add tile if it exists in the grid (not excluded by water)
    if (allTileIdsSet.has(tileId)) {
      seedData[tileId] = {
        status: 'sold',
        soldAt: cluster.donated_at,
        donor: cluster.donor,
        pattern: cluster.pattern,
        price: cluster.price_per_tile,
        message: cluster.message,
        visibility: cluster.visibility
      };
      donorTileCount++;
    } else {
      skippedTileCount++;
    }
  });
});

// Add some random reserved tiles (for demo variety)
const numReserved = 50; // Just a few reserved tiles for demo
const shuffled = allTileIds
  .filter(id => !seedData[id]) // Only tiles not already sold
  .sort(() => 0.5 - Math.random());

for (let i = 0; i < Math.min(numReserved, shuffled.length); i++) {
  const tileId = shuffled[i];
  seedData[tileId] = {
    status: 'reserved',
    reservedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
  };
}

// Write seed data
const outputPath = path.join(__dirname, '..', 'public', 'data', 'seed-tiles.json');
fs.writeFileSync(outputPath, JSON.stringify(seedData, null, 2));

console.log('\n✓ Seed Data Statistics:');
console.log(`  Total tiles in grid: ${totalTiles}`);
console.log(`  Donor-attributed tiles: ${donorTileCount}`);
console.log(`  Skipped (water-excluded): ${skippedTileCount}`);
console.log(`  Random reserved tiles: ${Math.min(numReserved, shuffled.length)}`);
console.log(`  Total seeded tiles: ${Object.keys(seedData).length}`);
console.log(`\n✓ Donor Clusters:`);
donorData.clusters.forEach(cluster => {
  const actualTiles = cluster.tiles.filter(id => allTileIdsSet.has(id)).length;
  console.log(`  ${cluster.donor}: ${actualTiles} tiles (${cluster.pattern})`);
});
console.log(`\n✓ Saved to ${outputPath}`);
