# Data Structure & API
## Yellowstone Conservation Grid

### Data Models & JSON Schemas

---

## Core Data Types

### 1. Tile
**Purpose:** Represents a single grid square

```typescript
interface Tile {
  id: string                    // "YS-001-045"
  coordinates: Coordinates
  status: TileStatus
  geometry: GeoJSON.Polygon
  price: number                 // USD cents (5000 = $50)
  reservedAt?: string          // ISO 8601 timestamp
  reservedBy?: string          // User ID (Phase 2)
  soldAt?: string              // ISO 8601 timestamp
  soldBy?: string              // User ID (Phase 2)
  metadata?: TileMetadata
}

interface Coordinates {
  lat: number                  // Latitude (decimal degrees)
  lng: number                  // Longitude (decimal degrees)
}

type TileStatus = 'available' | 'reserved' | 'sold'

interface TileMetadata {
  elevation?: number           // Meters above sea level
  terrain?: string            // "forest", "meadow", "river", etc.
  landmarks?: string[]        // Nearby features
  zone?: string              // Park zone/section
}
```

### 2. Grid Data (GeoJSON)
**Purpose:** Complete grid overlay for the map

```typescript
interface GridFeature extends GeoJSON.Feature<GeoJSON.Polygon> {
  type: 'Feature'
  properties: {
    id: string                 // Tile ID
    status: TileStatus
    center: [number, number]   // [lng, lat]
    price: number
  }
  geometry: {
    type: 'Polygon'
    coordinates: [number, number][][] // [[[lng, lat], ...]]
  }
}

interface GridData extends GeoJSON.FeatureCollection {
  type: 'FeatureCollection'
  features: GridFeature[]
  metadata?: {
    generated: string          // ISO timestamp
    totalTiles: number
    bounds: BoundingBox
  }
}
```

### 3. Bounding Box
```typescript
interface BoundingBox {
  minLng: number  // -111.05
  minLat: number  // 44.13
  maxLng: number  // -109.83
  maxLat: number  // 45.11
}

// Or as tuple: [minLng, minLat, maxLng, maxLat]
type BBox = [number, number, number, number]
```

---

## Static Data Files

### File: `public/data/yellowstone-grid.json`
**Purpose:** Generated grid with all tile geometries

**Structure:**
```json
{
  "type": "FeatureCollection",
  "metadata": {
    "generated": "2025-10-02T12:00:00Z",
    "totalTiles": 2304,
    "bounds": {
      "minLng": -111.05,
      "minLat": 44.13,
      "maxLng": -109.83,
      "maxLat": 45.11
    },
    "cellSize": 1,
    "units": "kilometers"
  },
  "features": [
    {
      "type": "Feature",
      "properties": {
        "id": "YS-001-001",
        "status": "available",
        "center": [-110.9425, 44.1345],
        "price": 5000
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [-110.9480, 44.1300],
          [-110.9370, 44.1300],
          [-110.9370, 44.1390],
          [-110.9480, 44.1390],
          [-110.9480, 44.1300]
        ]]
      }
    }
    // ... more features
  ]
}
```

**Size:** ~3-5 MB (2304 tiles)

---

### File: `public/data/seed-tiles.json`
**Purpose:** Initial tile statuses (reserved/sold)

**Structure:**
```json
{
  "lastUpdated": "2025-10-02T12:00:00Z",
  "tiles": [
    {
      "id": "YS-042-123",
      "status": "sold",
      "soldAt": "2025-09-15T10:30:00Z",
      "price": 5000
    },
    {
      "id": "YS-018-067",
      "status": "reserved",
      "reservedAt": "2025-09-28T14:22:00Z",
      "price": 5000
    }
    // ... 50-100 random entries
  ]
}
```

---

### File: `public/data/yellowstone-boundary.json`
**Purpose:** Park boundary polygon (optional mask)

**Structure:**
```json
{
  "type": "Feature",
  "properties": {
    "name": "Yellowstone National Park",
    "established": "1872-03-01",
    "area_km2": 8991
  },
  "geometry": {
    "type": "Polygon",
    "coordinates": [[
      [-111.05, 44.13],
      [-109.83, 44.13],
      [-109.83, 45.11],
      [-111.05, 45.11],
      [-111.05, 44.13]
    ]]
  }
}
```

---

## Grid Generation Script

### Script: `scripts/generate-grid.ts`
**Purpose:** Generate yellowstone-grid.json using Turf.js

```typescript
import * as turf from '@turf/turf'
import fs from 'fs'

const YELLOWSTONE_BBOX: [number, number, number, number] = [
  -111.05, // minLng (west)
  44.13,   // minLat (south)
  -109.83, // maxLng (east)
  45.11    // maxLat (north)
]

const CELL_SIZE = 1 // kilometers
const PRICE_PER_TILE = 5000 // $50 in cents

function generateGrid() {
  console.log('Generating Yellowstone grid...')
  
  // Generate square grid
  const grid = turf.squareGrid(YELLOWSTONE_BBOX, CELL_SIZE, {
    units: 'kilometers',
    mask: undefined // Optional: load boundary polygon
  })

  // Add properties to each feature
  grid.features = grid.features.map((feature, index) => {
    const center = turf.center(feature)
    const [lng, lat] = center.geometry.coordinates

    // Generate tile ID (YS-ROW-COL format)
    const row = String(Math.floor((lat - YELLOWSTONE_BBOX[1]) / 0.009)).padStart(3, '0')
    const col = String(Math.floor((lng - YELLOWSTONE_BBOX[0]) / 0.009)).padStart(3, '0')
    const id = `YS-${row}-${col}`

    return {
      ...feature,
      properties: {
        id,
        status: 'available',
        center: [lng, lat],
        price: PRICE_PER_TILE
      }
    }
  })

  // Add metadata
  const output = {
    ...grid,
    metadata: {
      generated: new Date().toISOString(),
      totalTiles: grid.features.length,
      bounds: {
        minLng: YELLOWSTONE_BBOX[0],
        minLat: YELLOWSTONE_BBOX[1],
        maxLng: YELLOWSTONE_BBOX[2],
        maxLat: YELLOWSTONE_BBOX[3]
      },
      cellSize: CELL_SIZE,
      units: 'kilometers'
    }
  }

  // Write to file
  const outputPath = 'public/data/yellowstone-grid.json'
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2))
  
  console.log(`✅ Generated ${grid.features.length} tiles`)
  console.log(`📁 Saved to ${outputPath}`)
  console.log(`📊 File size: ${(fs.statSync(outputPath).size / 1024 / 1024).toFixed(2)} MB`)
}

generateGrid()
```

**Run:**
```bash
npm run generate-grid
# or
tsx scripts/generate-grid.ts
```

---

## Seed Data Generation

### Script: `scripts/seed-tiles.ts`
**Purpose:** Create random reserved/sold tiles

```typescript
import fs from 'fs'

const TOTAL_TILES = 2304
const NUM_SOLD = 30
const NUM_RESERVED = 20

function seedTiles() {
  const tiles = []
  const usedIds = new Set<string>()

  // Generate random sold tiles
  for (let i = 0; i < NUM_SOLD; i++) {
    const id = generateRandomTileId(usedIds)
    usedIds.add(id)
    
    tiles.push({
      id,
      status: 'sold',
      soldAt: generateRandomDate(60), // Last 60 days
      price: 5000
    })
  }

  // Generate random reserved tiles
  for (let i = 0; i < NUM_RESERVED; i++) {
    const id = generateRandomTileId(usedIds)
    usedIds.add(id)
    
    tiles.push({
      id,
      status: 'reserved',
      reservedAt: generateRandomDate(14), // Last 14 days
      price: 5000
    })
  }

  const output = {
    lastUpdated: new Date().toISOString(),
    tiles: tiles.sort((a, b) => a.id.localeCompare(b.id))
  }

  fs.writeFileSync(
    'public/data/seed-tiles.json',
    JSON.stringify(output, null, 2)
  )

  console.log(`✅ Seeded ${tiles.length} tiles`)
}

function generateRandomTileId(usedIds: Set<string>): string {
  let id: string
  do {
    const row = String(Math.floor(Math.random() * 110)).padStart(3, '0')
    const col = String(Math.floor(Math.random() * 135)).padStart(3, '0')
    id = `YS-${row}-${col}`
  } while (usedIds.has(id))
  return id
}

function generateRandomDate(daysAgo: number): string {
  const now = new Date()
  const past = new Date(now.getTime() - Math.random() * daysAgo * 24 * 60 * 60 * 1000)
  return past.toISOString()
}

seedTiles()
```

---

## Data Loading Utilities

### File: `src/lib/tile-data.ts`

```typescript
import gridData from '@/../../public/data/yellowstone-grid.json'
import seedData from '@/../../public/data/seed-tiles.json'

// Load and merge data
export function loadTileData(): Map<string, Tile> {
  const tileMap = new Map<string, Tile>()

  // Load grid features
  gridData.features.forEach((feature: GridFeature) => {
    const tile: Tile = {
      id: feature.properties.id,
      coordinates: {
        lat: feature.properties.center[1],
        lng: feature.properties.center[0],
      },
      status: 'available', // Default
      geometry: feature.geometry,
      price: feature.properties.price,
    }
    tileMap.set(tile.id, tile)
  })

  // Apply seed statuses
  seedData.tiles.forEach((seed) => {
    const tile = tileMap.get(seed.id)
    if (tile) {
      tile.status = seed.status
      if (seed.reservedAt) tile.reservedAt = seed.reservedAt
      if (seed.soldAt) tile.soldAt = seed.soldAt
    }
  })

  return tileMap
}

// Get single tile
export function getTile(id: string): Tile | undefined {
  const tileMap = loadTileData()
  return tileMap.get(id)
}

// Get tiles by status
export function getTilesByStatus(status: TileStatus): Tile[] {
  const tileMap = loadTileData()
  return Array.from(tileMap.values()).filter(tile => tile.status === status)
}

// Get statistics
export function getTileStats() {
  const tileMap = loadTileData()
  const tiles = Array.from(tileMap.values())
  
  return {
    total: tiles.length,
    available: tiles.filter(t => t.status === 'available').length,
    reserved: tiles.filter(t => t.status === 'reserved').length,
    sold: tiles.filter(t => t.status === 'sold').length,
  }
}
```

---

## Future API Endpoints (Phase 2)

### GET `/api/tiles`
**Purpose:** List all tiles with pagination

**Query Parameters:**
```typescript
interface TileListParams {
  status?: TileStatus
  limit?: number        // Default: 100
  offset?: number       // Default: 0
  sort?: 'id' | 'date'  // Default: 'id'
}
```

**Response:**
```json
{
  "tiles": [...],
  "total": 2304,
  "limit": 100,
  "offset": 0
}
```

---

### GET `/api/tiles/:id`
**Purpose:** Get single tile details

**Response:**
```json
{
  "tile": {
    "id": "YS-042-123",
    "coordinates": { "lat": 44.5678, "lng": -110.1234 },
    "status": "available",
    "price": 5000,
    "geometry": { ... }
  }
}
```

---

### POST `/api/tiles/reserve`
**Purpose:** Reserve a tile (Phase 2)

**Body:**
```json
{
  "tileId": "YS-042-123",
  "userId": "user_abc123"
}
```

**Response:**
```json
{
  "success": true,
  "reservation": {
    "id": "res_xyz789",
    "tileId": "YS-042-123",
    "expiresAt": "2025-10-03T12:00:00Z"
  }
}
```

---

### POST `/api/checkout`
**Purpose:** Create Stripe checkout session (Phase 2)

**Body:**
```json
{
  "tileId": "YS-042-123",
  "giftMessage": "Happy birthday!",
  "recipientEmail": "friend@example.com"
}
```

**Response:**
```json
{
  "sessionId": "cs_test_123",
  "url": "https://checkout.stripe.com/..."
}
```

---

## Database Schema (Phase 2 - Supabase)

### Table: `tiles`
```sql
CREATE TABLE tiles (
  id TEXT PRIMARY KEY,
  coordinates JSONB NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('available', 'reserved', 'sold')),
  geometry JSONB NOT NULL,
  price INTEGER NOT NULL,
  reserved_at TIMESTAMPTZ,
  reserved_by UUID REFERENCES auth.users(id),
  sold_at TIMESTAMPTZ,
  sold_by UUID REFERENCES auth.users(id),
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_tiles_status ON tiles(status);
CREATE INDEX idx_tiles_reserved_by ON tiles(reserved_by);
CREATE INDEX idx_tiles_sold_by ON tiles(sold_by);
```

### Table: `purchases`
```sql
CREATE TABLE purchases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tile_id TEXT NOT NULL REFERENCES tiles(id),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  stripe_payment_id TEXT UNIQUE NOT NULL,
  amount INTEGER NOT NULL,
  gift_message TEXT,
  recipient_email TEXT,
  certificate_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_purchases_user_id ON purchases(user_id);
CREATE INDEX idx_purchases_tile_id ON purchases(tile_id);
```

---

## Data Validation

### Tile ID Format
```typescript
const TILE_ID_REGEX = /^YS-\d{3}-\d{3}$/

function isValidTileId(id: string): boolean {
  return TILE_ID_REGEX.test(id)
}
```

### Coordinates Validation
```typescript
function isValidCoordinates(lat: number, lng: number): boolean {
  return (
    lat >= 44.13 && lat <= 45.11 &&
    lng >= -111.05 && lng <= -109.83
  )
}
```

### Price Validation
```typescript
const MIN_PRICE = 1000  // $10
const MAX_PRICE = 100000 // $1000

function isValidPrice(price: number): boolean {
  return price >= MIN_PRICE && price <= MAX_PRICE && price % 100 === 0
}
```

---

## Data Migration Notes

### From MVP to Phase 2
1. Export seed-tiles.json
2. Create Supabase tables
3. Import seed data into `tiles` table
4. Add RLS policies
5. Update frontend to use API instead of static JSON

### Backup Strategy
- Daily snapshots of Supabase database
- Store grid.json in version control
- Keep seed-tiles.json as fallback