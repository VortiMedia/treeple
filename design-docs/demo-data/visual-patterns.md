# Visual Patterns - Pixel Art Reservations

This document describes the "pixel art" patterns created using reserved tiles. These patterns form recognizable shapes when viewed on the map, creating visual interest and storytelling opportunities for the demo.

## Pattern Overview

Three main patterns have been designed:
1. **Bear Shape** - Iconic Yellowstone wildlife
2. **Bison Shape** - Another iconic park animal
3. **Pine Tree** - Symbol of conservation/forest

---

## 1. Bear Pattern

**Visual Representation:**
```
..XXXX..
.X....X.
X.X..X.X
X......X
X......X
.X....X.
..X..X..
...XX...
```

**Dimensions:** 8 rows × 8 columns = 20 tiles

**Tile IDs:**
```
YS-025-037, YS-025-038, YS-025-039, YS-025-040,
YS-026-036, YS-026-041,
YS-027-035, YS-027-037, YS-027-040, YS-027-042,
YS-028-035, YS-028-042,
YS-029-035, YS-029-042,
YS-030-036, YS-030-041,
YS-031-037, YS-031-040,
YS-032-038, YS-032-039
```

**Location Context:** Central park area (approximate lat: 44.35°, lng: -110.75°)

**Story Hook:** "A bear-shaped cluster honoring wildlife conservation efforts"

---

## 2. Bison Pattern

**Visual Representation:**
```
..XXXX....
.XXXXXX...
XXXXXXXX..
XXXXXXXX..
.XX..XX...
.XX..XX...
```

**Dimensions:** 6 rows × 10 columns = 34 tiles

**Tile IDs:**
```
YS-035-057, YS-035-058, YS-035-059, YS-035-060,
YS-036-056, YS-036-057, YS-036-058, YS-036-059, YS-036-060, YS-036-061,
YS-037-055, YS-037-056, YS-037-057, YS-037-058, YS-037-059, YS-037-060, YS-037-061, YS-037-062,
YS-038-055, YS-038-056, YS-038-057, YS-038-058, YS-038-059, YS-038-060, YS-038-061, YS-038-062,
YS-039-056, YS-039-057, YS-039-060, YS-039-061,
YS-040-056, YS-040-057, YS-040-060, YS-040-061
```

**Location Context:** Eastern area (approximate lat: 44.4°, lng: -110.45°)

**Story Hook:** "Bison herds roam free - a tribute to America's largest land mammal"

---

## 3. Pine Tree Pattern

**Visual Representation:**
```
...X...
..XXX..
.XXXXX.
..XXX..
.XXXXX.
XXXXXXX
...X...
...X...
```

**Dimensions:** 8 rows × 7 columns = 26 tiles

**Tile IDs:**
```
YS-020-053,
YS-021-052, YS-021-053, YS-021-054,
YS-022-051, YS-022-052, YS-022-053, YS-022-054, YS-022-055,
YS-023-052, YS-023-053, YS-023-054,
YS-024-051, YS-024-052, YS-024-053, YS-024-054, YS-024-055,
YS-025-050, YS-025-051, YS-025-052, YS-025-053, YS-025-054, YS-025-055, YS-025-056,
YS-026-053,
YS-027-053
```

**Location Context:** Central-north region (approximate lat: 44.32°, lng: -110.48°) - Relocated from original position to avoid water features

**Story Hook:** "Standing tall for forest conservation - every tree matters"

---

## Implementation Notes

### For Agent 2 (Implementation)

1. **Status Assignment:** All tiles in these patterns should be marked as `"status": "sold"` in the seed data

2. **Donor Attribution:** These patterns are attributed to high-profile donors in `donor-attributions.json`

3. **Visual Rendering:**
   - These patterns will be most visible at zoom levels 10-13
   - Consider adding subtle glow/border effects to pattern tiles
   - Use consistent "sold" color (slate-500) to maintain visual coherence

4. **Data Structure:**
   ```json
   {
     "YS-025-037": {
       "status": "sold",
       "soldAt": "2024-12-15T10:00:00Z",
       "donor": "Elon Musk",
       "pattern": "bear"
     }
   }
   ```

5. **Future Enhancements:**
   - Add hover tooltips: "Part of the 'Bear' conservation pattern"
   - Create pattern visualization layer toggle
   - Generate certificates highlighting pattern contributions

---

## Additional Pattern Ideas (Future)

- **Heart Shape** - For Valentine's Day campaigns
- **Yellowstone "Y" Letter** - Park branding
- **Park Boundary Outline** - Multi-hundred tile border pattern
- **Constellation Patterns** - Night sky theme
- **Mountain Range Silhouette** - Using elevation data

---

## Total Statistics

- **Total Pattern Tiles:** 80 (20 + 34 + 26)
- **Total Patterns:** 3
- **Coverage:** ~0.5% of total grid (80 / 15,984 tiles)
- **Visual Impact:** High (recognizable shapes create "treasure hunt" engagement)
