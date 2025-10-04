# Implementation Notes - Demo Data Integration

## Overview
This document provides step-by-step guidance for implementing the demo data designed in this directory. Follow these instructions to integrate visual patterns, donor attributions, water exclusions, and enhanced landmarks into the Treeple platform.

---

## Prerequisites

### Required Libraries
```bash
npm install @turf/boolean-point-in-polygon @turf/buffer @turf/intersect
```

### Files to Modify
- `public/data/seed-tiles.json` - Add donor attributions and pattern data
- `scripts/generate-grid.js` - Add water exclusion logic
- `src/components/map/LandmarkOverlay.tsx` - New component for landmarks
- `src/components/map/MapContainer.tsx` - Integrate landmark layer
- `src/data/landmarks.json` - Copy from `landmark-enhancements.json`

---

## Phase 1: Water Exclusions (Priority: HIGH)

### Goal
Remove tiles that fall over water bodies to create a realistic, clean grid.

### Implementation Steps

#### 1.1 Load Water Exclusion Data
```typescript
// scripts/generate-grid.js
import waterExclusions from '../design-docs/demo-data/water-exclusions.json' assert { type: 'json' };
import * as turf from '@turf/turf';
```

#### 1.2 Add Exclusion Logic to Grid Generation
```typescript
function isPointInWater(lat, lng) {
  const point = turf.point([lng, lat]);

  // Check polygons (lakes)
  const polygons = ['yellowstone_lake', 'lewis_lake', 'shoshone_lake', 'heart_lake'];
  for (const polygonName of polygons) {
    const feature = waterExclusions.water_features[polygonName];
    const polygon = turf.polygon([feature.coordinates]);
    if (turf.booleanPointInPolygon(point, polygon)) {
      return true;
    }
  }

  // Check buffered linestrings (rivers)
  const rivers = ['yellowstone_river_north', 'yellowstone_river_south', 'madison_river', 'firehole_river'];
  for (const riverName of rivers) {
    const feature = waterExclusions.water_features[riverName];
    const line = turf.lineString(feature.coordinates);
    const buffered = turf.buffer(line, feature.buffer_km, { units: 'kilometers' });
    if (turf.booleanPointInPolygon(point, buffered)) {
      return true;
    }
  }

  return false;
}

// Filter tiles during grid generation
const filteredFeatures = gridFeatures.filter(feature => {
  const { lat, lng } = feature.properties.coordinates;
  return !isPointInWater(lat, lng);
});
```

#### 1.3 Expected Results
- Reduced tile count: ~14,000-15,000 tiles (from 15,984)
- No tiles over Yellowstone Lake, Lewis Lake, or major rivers
- Clean visual appearance on map

---

## Phase 2: Donor Attributions & Visual Patterns (Priority: HIGH)

### Goal
Create compelling "sold" tile patterns with high-profile donor attributions.

### Implementation Steps

#### 2.1 Generate Seed Tiles from Donor Data
```typescript
// scripts/generate-seed-tiles.js (NEW or UPDATE)
import donorData from '../design-docs/demo-data/donor-attributions.json' assert { type: 'json' };

const seedTiles = {};

donorData.clusters.forEach(cluster => {
  cluster.tiles.forEach(tileId => {
    seedTiles[tileId] = {
      status: 'sold',
      soldAt: cluster.donated_at,
      donor: cluster.donor,
      pattern: cluster.pattern,
      price: cluster.price_per_tile,
      message: cluster.message,
      visibility: cluster.visibility
    };
  });
});

// Write to public/data/seed-tiles.json
fs.writeFileSync('public/data/seed-tiles.json', JSON.stringify(seedTiles, null, 2));
```

#### 2.2 Update Tile Details Component
```typescript
// src/components/tiles/TileDetails.tsx

// Show donor attribution for sold tiles
{tile.status === 'sold' && tile.donor && (
  <div className="mt-4 p-3 bg-slate-100 rounded-lg">
    <p className="text-sm font-medium text-slate-700">
      Donated by: {tile.donor}
    </p>
    {tile.pattern && (
      <Badge variant="secondary" className="mt-1">
        Part of "{tile.pattern}" pattern
      </Badge>
    )}
    {tile.message && tile.visibility === 'public' && (
      <p className="text-xs italic text-slate-600 mt-2">
        "{tile.message}"
      </p>
    )}
  </div>
)}
```

#### 2.3 Add Pattern Visualization (Optional Enhancement)
```typescript
// src/components/map/GridOverlay.tsx

// Add special styling for pattern tiles
map.setPaintProperty('grid-fill', 'fill-color', [
  'match',
  ['get', 'pattern'],
  'bear', '#8b4513',      // Brown for bear
  'bison', '#654321',     // Dark brown for bison
  'tree', '#228b22',      // Forest green for tree
  /* default */ [
    'match',
    ['get', 'status'],
    'sold', '#64748b',
    'reserved', '#d4a574',
    '#4f872b'
  ]
]);
```

#### 2.4 Expected Results
- 131 tiles marked as "sold" across 8 donor clusters
- Bear (20 tiles), Bison (34 tiles), Tree (26 tiles) patterns visible
- Donor names displayed in tile details panel
- Total demo donations: $22,950,000

---

## Phase 3: Enhanced Landmarks (Priority: MEDIUM)

### Goal
Add rich landmark data with icons, categories, and zoom-based visibility.

### Implementation Steps

#### 3.1 Copy Landmark Data
```bash
cp design-docs/demo-data/landmark-enhancements.json src/data/landmarks.json
```

#### 3.2 Create Landmark Overlay Component
```typescript
// src/components/map/LandmarkOverlay.tsx (NEW)
import React, { useEffect } from 'react';
import { Map } from 'maplibre-gl';
import landmarksData from '@/data/landmarks.json';

interface LandmarkOverlayProps {
  map: Map;
}

export function LandmarkOverlay({ map }: LandmarkOverlayProps) {
  useEffect(() => {
    if (!map) return;

    // Create GeoJSON source from landmarks
    const geojson = {
      type: 'FeatureCollection',
      features: landmarksData.landmarks.map(landmark => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [landmark.coordinates.lng, landmark.coordinates.lat]
        },
        properties: {
          name: landmark.name,
          icon: landmark.icon,
          prominence: landmark.prominence,
          type: landmark.type,
          description: landmark.description
        }
      }))
    };

    // Add source
    map.addSource('landmarks', {
      type: 'geojson',
      data: geojson
    });

    // Add symbol layer with icons
    map.addLayer({
      id: 'landmarks-icons',
      type: 'symbol',
      source: 'landmarks',
      minzoom: 8,
      layout: {
        'icon-image': ['get', 'icon'], // Use icon from properties
        'icon-size': [
          'match',
          ['get', 'prominence'],
          'high', 1.2,
          'medium', 0.9,
          'low', 0.6,
          1.0
        ],
        'text-field': ['get', 'name'],
        'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
        'text-size': [
          'match',
          ['get', 'prominence'],
          'high', 14,
          'medium', 12,
          'low', 10,
          12
        ],
        'text-offset': [0, 1.5],
        'text-anchor': 'top'
      }
    });

    // Add click handler
    map.on('click', 'landmarks-icons', (e) => {
      const landmark = e.features[0];
      // Open side panel with landmark details
      console.log('Landmark clicked:', landmark.properties);
    });

    return () => {
      if (map.getLayer('landmarks-icons')) map.removeLayer('landmarks-icons');
      if (map.getSource('landmarks')) map.removeSource('landmarks');
    };
  }, [map]);

  return null;
}
```

#### 3.3 Load Custom Icons
```typescript
// src/components/map/MapContainer.tsx

// Load custom landmark icons when map loads
map.on('load', () => {
  const icons = {
    'geyser': '/icons/geyser.svg',
    'hot-spring': '/icons/hot-spring.svg',
    'waterfall': '/icons/waterfall.svg',
    'lake': '/icons/lake.svg',
    'viewpoint': '/icons/viewpoint.svg',
    'wildlife': '/icons/wildlife.svg',
    'mountain': '/icons/mountain.svg',
    'river': '/icons/river.svg',
    'steam': '/icons/steam.svg'
  };

  Object.entries(icons).forEach(([name, url]) => {
    map.loadImage(url, (error, image) => {
      if (error) throw error;
      map.addImage(name, image);
    });
  });
});
```

#### 3.4 Expected Results
- 15 landmarks displayed on map
- Icons scale based on prominence (high/medium/low)
- Landmarks appear at appropriate zoom levels
- Click handlers open landmark details

---

## Phase 4: Testing & Validation

### 4.1 Visual Verification
- [ ] Map loads without console errors
- [ ] No tiles appear over Yellowstone Lake
- [ ] Bear, bison, and tree patterns are visible at zoom 10-13
- [ ] Donor names appear in tile details for sold tiles
- [ ] Landmarks appear at correct locations
- [ ] Landmark icons scale correctly with zoom

### 4.2 Data Validation
```typescript
// Run validation script
npm run validate-demo-data

// Expected output:
// ✓ 131 donor-attributed tiles
// ✓ 8 donor clusters
// ✓ 15 landmarks
// ✓ 8 water exclusion zones
// ✓ 3 visual patterns (bear, bison, tree)
// ✓ ~14,000 total tiles (after water exclusions)
```

### 4.3 Performance Checks
- [ ] Grid renders in < 2 seconds
- [ ] No lag when zooming/panning
- [ ] Smooth interactions at 60fps
- [ ] Lighthouse score > 90

---

## Phase 5: Optional Enhancements

### 5.1 Pattern Discovery Feature
Add a "Discover Patterns" button that:
- Animates camera to each pattern location
- Highlights pattern tiles with glow effect
- Shows donor story/message

### 5.2 Landmark Search
```typescript
// Add search bar that filters landmarks
const searchLandmarks = (query: string) => {
  return landmarks.filter(lm =>
    lm.name.toLowerCase().includes(query.toLowerCase()) ||
    lm.tags.some(tag => tag.includes(query))
  );
};
```

### 5.3 Premium Tile Pricing
Mark tiles near high-prominence landmarks as "premium":
```typescript
// Increase price for tiles within 2km of iconic landmarks
const isPremiumTile = (tile) => {
  const highProminenceLandmarks = landmarks.filter(lm => lm.prominence === 'high');
  return highProminenceLandmarks.some(lm => {
    const distance = turf.distance(
      [tile.lng, tile.lat],
      [lm.coordinates.lng, lm.coordinates.lat],
      { units: 'kilometers' }
    );
    return distance <= 2;
  });
};
```

### 5.4 Donor Leaderboard
```typescript
// Display top donors on homepage
const topDonors = donorData.clusters
  .filter(c => c.visibility === 'public')
  .sort((a, b) => b.total_donated - a.total_donated)
  .slice(0, 5);
```

---

## Troubleshooting

### Issue: Tiles still appearing over water
**Solution:** Check that water exclusion coordinates are in [lng, lat] format (GeoJSON standard)

### Issue: Patterns not visible on map
**Solution:** Ensure seed-tiles.json is being loaded correctly and pattern tiles have `status: 'sold'`

### Issue: Landmark icons not showing
**Solution:** Verify icon files exist in `/public/icons/` and are loaded before adding the layer

### Issue: Performance degradation
**Solution:** Reduce landmark count at lower zoom levels, use clustering for low-prominence landmarks

---

## Next Steps (Phase 2 Features)

1. **Backend Integration**
   - Move seed-tiles.json to Supabase database
   - Create real-time tile status updates
   - Add donor attribution management

2. **Certificate Generation**
   - Generate PDFs showing donor's pattern visualization
   - Include tile map, coordinates, and thank you message

3. **Social Sharing**
   - "Share My Conservation" feature
   - Generate images of donor patterns for social media

4. **Admin Dashboard**
   - Manage donor attributions
   - Upload new landmark data
   - Monitor tile sales by pattern/location

---

## Summary Checklist

- [ ] Water exclusions implemented (~1,200 tiles removed)
- [ ] 131 donor tiles marked as sold with attributions
- [ ] 3 visual patterns (bear, bison, tree) visible
- [ ] 15 landmarks displayed with icons
- [ ] Donor names shown in tile details
- [ ] All files validated and tested
- [ ] Documentation updated
- [ ] Demo ready for investor presentation

---

## File Reference

| File | Purpose | Status |
|------|---------|--------|
| `visual-patterns.md` | Documents pixel art patterns | ✅ Complete |
| `donor-attributions.json` | Donor data and tile clusters | ✅ Complete |
| `water-exclusions.json` | Water bodies for exclusion | ✅ Complete |
| `landmark-enhancements.json` | 15 enhanced landmarks | ✅ Complete |
| `implementation-notes.md` | This file - implementation guide | ✅ Complete |

---

## Support

For questions or issues during implementation:
1. Review this document thoroughly
2. Check Turf.js documentation: https://turfjs.org/
3. Review MapLibre GL JS docs: https://maplibre.org/
4. Consult `/docs/prd.md` for platform requirements

**Good luck with the implementation! 🌲**
