const fs = require('fs');
const path = require('path');

// Load the grid data
const gridPath = path.join(__dirname, '..', 'public', 'data', 'yellowstone-grid.json');
const grid = JSON.parse(fs.readFileSync(gridPath, 'utf8'));

console.log('Seeding tile statuses...');

// Randomly mark tiles as reserved or sold
const seedData = {};
const totalTiles = grid.features.length;
const numReserved = Math.floor(totalTiles * 0.05); // 5% reserved
const numSold = Math.floor(totalTiles * 0.10); // 10% sold

// Get random tile IDs
const allTileIds = grid.features.map(f => f.properties.id);
const shuffled = allTileIds.sort(() => 0.5 - Math.random());

// Mark first N as reserved
for (let i = 0; i < numReserved; i++) {
  const tileId = shuffled[i];
  seedData[tileId] = {
    status: 'reserved',
    reservedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
  };
}

// Mark next M as sold
for (let i = numReserved; i < numReserved + numSold; i++) {
  const tileId = shuffled[i];
  seedData[tileId] = {
    status: 'sold',
    soldAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString()
  };
}

// Write seed data
const outputPath = path.join(__dirname, '..', 'public', 'data', 'seed-tiles.json');
fs.writeFileSync(outputPath, JSON.stringify(seedData, null, 2));

console.log(`✓ Seeded ${numReserved} reserved tiles`);
console.log(`✓ Seeded ${numSold} sold tiles`);
console.log(`✓ Saved to ${outputPath}`);
