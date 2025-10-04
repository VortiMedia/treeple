# Donor Pattern Visualization - Testing Checklist

## Pre-Test Setup

Before testing, ensure:
- [ ] Development server is running (`npm run dev`)
- [ ] Browser DevTools console is open (F12)
- [ ] Grid data has been generated (`npm run generate-grid`)
- [ ] Seed tiles have been generated (`npm run seed-tiles`)
- [ ] No console errors on page load

---

## Visual Pattern Recognition Tests

### ✅ Test 1: Bear Pattern (Elon Musk)
- [ ] Can you see a bear-shaped cluster in **deep red/crimson**?
- [ ] Is the bear pattern clearly visible without zooming?
- [ ] Does the bear pattern have thicker borders than random tiles?
- [ ] When hovering over bear tiles, do they brighten?
- [ ] Location: Northern section of the map

**Expected:** 20 red tiles forming a recognizable bear silhouette

---

### ✅ Test 2: Bison Pattern (Patagonia Foundation)
- [ ] Can you see a bison-shaped cluster in **warm orange**?
- [ ] Is the bison distinct from the bear pattern?
- [ ] Is the pattern recognizable as a bison shape?
- [ ] Does the orange contrast well with the topographic base?
- [ ] Location: Central-eastern section

**Expected:** 34 orange tiles forming a recognizable bison silhouette

---

### ✅ Test 3: Tree Pattern (Marc Benioff)
- [ ] Can you see a tree-shaped cluster in **dark forest green**?
- [ ] Is it darker/more saturated than available tiles?
- [ ] Does the tree shape have clear trunk and canopy?
- [ ] Is it visually distinct from both bear and bison?
- [ ] Location: Northern central area

**Expected:** 26 dark green tiles forming a recognizable tree shape

---

### ✅ Test 4: Old Faithful Cluster (Gates Foundation)
- [ ] Can you see a cluster in **royal blue**?
- [ ] Are the blue tiles near Old Faithful landmark?
- [ ] Does blue stand out against other colors?
- [ ] Is the cluster cohesive and recognizable?
- [ ] Location: Old Faithful area (western section)

**Expected:** 15 blue tiles clustered around Old Faithful geyser

---

### ✅ Test 5: Grand Canyon Cluster (Leonardo DiCaprio)
- [ ] Can you see a cluster in **teal**?
- [ ] Are the teal tiles near Grand Canyon landmark?
- [ ] Is teal distinct from blue (Gates) and green (available)?
- [ ] Does the cluster stand out visually?
- [ ] Location: Grand Canyon of Yellowstone area

**Expected:** 11 teal tiles near Grand Canyon of Yellowstone

---

### ✅ Test 6: Yellowstone Lake Cluster (National Geographic)
- [ ] Can you see a cluster in **golden yellow**?
- [ ] Are the yellow tiles near Yellowstone Lake?
- [ ] Does yellow provide good contrast with other colors?
- [ ] Is the cluster easily recognizable?
- [ ] Location: Yellowstone Lake area

**Expected:** 10 golden yellow tiles near Yellowstone Lake

---

### ✅ Test 7: Random Cluster (Salesforce Ohana)
- [ ] Can you see a cluster in **purple**?
- [ ] Is purple distinct from all other donor colors?
- [ ] Does the cluster stand out against the base map?
- [ ] Is it cohesive despite being "random"?
- [ ] Location: Northeastern section

**Expected:** 8 purple tiles in northeastern region

---

### ✅ Test 8: Small Cluster (Anonymous)
- [ ] Can you see a small cluster in **olive green**?
- [ ] Is olive green distinct from tree pattern dark green?
- [ ] Is olive green distinct from available tile emerald?
- [ ] Is the cluster visible despite small size?
- [ ] Location: Northwestern section

**Expected:** 4 olive green tiles in small cluster

---

## Visual Hierarchy Tests

### ✅ Test 9: Donor vs Non-Donor Distinction
- [ ] Are donor tiles (all 8 patterns) **OBVIOUSLY bolder** than non-donor tiles?
- [ ] Do donor tiles have **higher opacity** (60% vs 15-30%)?
- [ ] Do donor tiles have **thicker borders** (2px vs 1px)?
- [ ] Can you instantly identify which tiles are donor-attributed?

**Expected:** Clear visual hierarchy - donor tiles dominate, non-donor tiles recede

---

### ✅ Test 10: Non-Donor Reserved Tiles
- [ ] Are random reserved tiles (no donor) **subdued/muted**?
- [ ] Do they use **amber color** at lower opacity?
- [ ] Are they clearly less prominent than donor tiles?
- [ ] Can you still distinguish them from available tiles?

**Expected:** 50 random reserved tiles in muted amber, visually secondary

---

### ✅ Test 11: Available Tiles
- [ ] Are available tiles very **subtle** (background role)?
- [ ] Do they use **emerald green** at low opacity (15%)?
- [ ] Do they form a background that doesn't compete with patterns?
- [ ] Can you still see the topographic map underneath?

**Expected:** ~2000 available tiles forming subtle green background

---

## Landmark Visibility Tests

### ✅ Test 12: Old Faithful Marker
- [ ] Can you see the Old Faithful landmark marker?
- [ ] Is it rendered **above** the grid tiles?
- [ ] Does it have a **glow effect** (high prominence)?
- [ ] Is it larger (40px) than other landmarks?
- [ ] Does hovering show the landmark name?

**Expected:** Prominent emerald green marker with glow

---

### ✅ Test 13: Grand Prismatic Spring Marker
- [ ] Can you see the Grand Prismatic Spring marker?
- [ ] Is it clearly visible above grid tiles?
- [ ] Does it have proper shadow and border?
- [ ] Does it respond to hover?

**Expected:** Prominent emerald green marker, high prominence

---

### ✅ Test 14: All Major Landmarks
- [ ] Are all high-prominence landmarks visible?
- [ ] Do they render above the donor patterns?
- [ ] Are they distinguishable from tile colors?
- [ ] Do tooltips work on hover?

**Expected:** 10+ major landmarks visible as emerald circles with white borders

---

## Interaction Tests

### ✅ Test 15: Hover Effects
- [ ] Do donor tiles **brighten** on hover?
- [ ] Do borders get **thicker** on hover (2px → 3px for donors)?
- [ ] Does opacity increase on hover?
- [ ] Is hover response smooth (no lag)?

**Expected:** Smooth, instant hover feedback for all tiles

---

### ✅ Test 16: Click Interaction
- [ ] Can you click on a donor tile?
- [ ] Does the side panel open showing tile details?
- [ ] Does it display donor name, pattern, message?
- [ ] Can you see the donor's contribution amount?

**Expected:** Side panel shows full donor information

---

### ✅ Test 17: Pan & Zoom
- [ ] Do patterns remain visible when panning?
- [ ] Do colors stay consistent across zoom levels?
- [ ] Are patterns recognizable at different zooms?
- [ ] Does performance stay smooth (60fps)?

**Expected:** Consistent rendering across all zoom levels

---

## Performance Tests

### ✅ Test 18: Initial Load Performance
- [ ] Does the map load in < 2 seconds?
- [ ] Are all 2,304 tiles rendered without lag?
- [ ] Is the grid visible immediately on load?
- [ ] No console errors or warnings?

**Expected:** Fast, smooth initial render

---

### ✅ Test 19: Runtime Performance
- [ ] Is hover response < 16ms (60fps)?
- [ ] No frame drops when panning?
- [ ] No lag when zooming?
- [ ] Smooth animations for hover effects?

**Expected:** Consistent 60fps during all interactions

---

### ✅ Test 20: Memory Usage
- [ ] Check DevTools Performance/Memory tab
- [ ] Memory usage stable (not growing)?
- [ ] No memory leaks on repeated interactions?

**Expected:** Stable ~50-100MB memory usage

---

## Screenshot Documentation Tests

### ✅ Test 21: Overview Screenshot
- [ ] Take a screenshot showing all 8 donor patterns
- [ ] Zoom level where all patterns are visible
- [ ] Clear contrast between different donors
- [ ] Landmarks visible

**Save as:** `design-docs/visual-rendering/overview-all-patterns.png`

---

### ✅ Test 22: Bear Pattern Detail
- [ ] Zoom in on the bear pattern
- [ ] Clear view of red tiles forming bear shape
- [ ] Borders and colors clearly visible

**Save as:** `design-docs/visual-rendering/bear-pattern-detail.png`

---

### ✅ Test 23: Bison Pattern Detail
- [ ] Zoom in on the bison pattern
- [ ] Clear view of orange tiles forming bison shape
- [ ] Distinct from bear pattern

**Save as:** `design-docs/visual-rendering/bison-pattern-detail.png`

---

### ✅ Test 24: Visual Hierarchy Comparison
- [ ] Screenshot showing:
  - Donor tile (bold, 60% opacity)
  - Non-donor reserved tile (muted, 25% opacity)
  - Available tile (subtle, 15% opacity)
- [ ] Side-by-side comparison clearly showing difference

**Save as:** `design-docs/visual-rendering/visual-hierarchy.png`

---

## Browser Compatibility Tests

### ✅ Test 25: Chrome
- [ ] All patterns render correctly
- [ ] Hover effects work
- [ ] No console errors
- [ ] Performance is smooth

---

### ✅ Test 26: Safari
- [ ] All patterns render correctly
- [ ] Colors match Chrome
- [ ] Hover effects work
- [ ] No rendering glitches

---

### ✅ Test 27: Firefox
- [ ] All patterns render correctly
- [ ] Touch gestures work (if applicable)
- [ ] Performance acceptable

---

## Mobile Responsiveness Tests

### ✅ Test 28: Mobile View (iPhone/Android)
- [ ] Patterns visible on small screen
- [ ] Touch interactions work
- [ ] Bottom sheet shows donor info on tap
- [ ] Performance smooth on mobile

---

## Data Integrity Tests

### ✅ Test 29: Tile Count Verification
Run in browser console:
```javascript
const tiles = await fetch('/data/seed-tiles.json').then(r => r.json());
const donorTiles = Object.entries(tiles).filter(([id, data]) => data.donor);
console.log(`Total donor tiles: ${donorTiles.length}`);
console.log('Expected: 131');
```
- [ ] Total donor tiles: **131** ✓
- [ ] Bear: 20 tiles ✓
- [ ] Bison: 34 tiles ✓
- [ ] Tree: 26 tiles ✓
- [ ] Old Faithful: 15 tiles ✓
- [ ] Grand Canyon: 11 tiles ✓
- [ ] Yellowstone Lake: 10 tiles ✓
- [ ] Salesforce: 8 tiles ✓
- [ ] Anonymous: 4 tiles ✓

---

### ✅ Test 30: Donor Name Consistency
- [ ] All donor names in seed-tiles.json match DONOR_COLORS keys exactly
- [ ] No typos or case mismatches
- [ ] All patterns have correct metadata

---

## Success Criteria Summary

**Visual Recognition:**
- ✅ Can identify all 8 donor patterns without clicking
- ✅ Each pattern has distinct color and shape
- ✅ Donor tiles clearly more prominent than non-donor tiles

**Landmarks:**
- ✅ Major landmarks visible with glow effects
- ✅ Landmarks render above grid tiles
- ✅ Old Faithful and Grand Prismatic easily findable

**Performance:**
- ✅ 60fps during all interactions
- ✅ < 2 second load time
- ✅ No memory leaks

**Story:**
- ✅ Map tells a compelling visual story without explanation
- ✅ Donor patterns create "wow factor" for investor demos
- ✅ Clear demonstration of multi-donor support capability

---

## Failure Scenarios

**If any pattern is not visible:**
1. Check seed-tiles.json for donor attribution
2. Check donor name matches DONOR_COLORS exactly
3. Verify GridOverlay is enriching properties
4. Check browser console for errors

**If all tiles same color:**
1. Verify paint expressions are loaded
2. Check MapLibre layer setup in GridOverlay
3. Confirm donor-colors.ts is imported correctly

**If performance is poor:**
1. Reduce tile count temporarily to isolate issue
2. Check for React re-render loops
3. Verify feature-state is being used for hover
4. Check browser GPU acceleration is enabled

---

## Post-Test Actions

After all tests pass:
- [ ] Take screenshots for documentation
- [ ] Update README with new visual features
- [ ] Create demo video for investors
- [ ] Document any edge cases discovered
- [ ] Plan enhancements for next iteration
