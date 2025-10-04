# Donor Pattern Color Scheme

## Visual Hierarchy

The map uses a **three-tier visual hierarchy** to tell a compelling story:

1. **Donor Patterns** (BOLD) - High opacity, saturated colors, thicker borders
2. **Random Reserved Tiles** (SUBDUED) - Lower opacity amber, thinner borders
3. **Available Tiles** (SUBTLE) - Very low opacity green, background role

This hierarchy ensures donor patterns are immediately recognizable and visually dominant.

---

## Donor Colors

Each major donor has a distinct color that makes their pattern recognizable at a glance:

### 🐻 Elon Musk - Bear Pattern
- **Fill:** `#DC2626` (Deep Red/Crimson - Tailwind red-600)
- **Opacity:** 60%
- **Stroke:** `#991B1B` (Dark Red - Tailwind red-800)
- **Hover Fill:** `#EF4444` (Bright Red - Tailwind red-500)
- **Hover Opacity:** 80%
- **Tiles:** 20 tiles forming a bear shape
- **Story:** Bold red for pioneering conservation vision

### 🦬 Patagonia Foundation - Bison Pattern
- **Fill:** `#EA580C` (Warm Orange - Tailwind orange-600)
- **Opacity:** 60%
- **Stroke:** `#C2410C` (Dark Orange - Tailwind orange-700)
- **Hover Fill:** `#F97316` (Bright Orange - Tailwind orange-500)
- **Hover Opacity:** 80%
- **Tiles:** 34 tiles forming a bison shape
- **Story:** Warm earth tone representing Patagonia's conservation values

### 🌲 Marc Benioff - Tree Pattern
- **Fill:** `#15803D` (Dark Forest Green - Tailwind green-700)
- **Opacity:** 60%
- **Stroke:** `#166534` (Darker Green - Tailwind green-800)
- **Hover Fill:** `#22C55E` (Bright Green - Tailwind green-500)
- **Hover Opacity:** 80%
- **Tiles:** 26 tiles forming a tree shape
- **Story:** Deep forest green distinct from available tiles

### 💧 Bill & Melinda Gates Foundation - Old Faithful Cluster
- **Fill:** `#2563EB` (Royal Blue - Tailwind blue-600)
- **Opacity:** 60%
- **Stroke:** `#1E40AF` (Dark Blue - Tailwind blue-800)
- **Hover Fill:** `#3B82F6` (Bright Blue - Tailwind blue-500)
- **Hover Opacity:** 80%
- **Tiles:** 15 tiles around Old Faithful geyser
- **Story:** Blue representing water and geothermal features

### 🌊 Leonardo DiCaprio Foundation - Grand Canyon Cluster
- **Fill:** `#0D9488` (Teal - Tailwind teal-600)
- **Opacity:** 60%
- **Stroke:** `#115E59` (Dark Teal - Tailwind teal-800)
- **Hover Fill:** `#14B8A6` (Bright Teal - Tailwind teal-500)
- **Hover Opacity:** 80%
- **Tiles:** 11 tiles near Grand Canyon of Yellowstone
- **Story:** Aquatic teal for water conservation focus

### 🎨 National Geographic Society - Yellowstone Lake Cluster
- **Fill:** `#CA8A04` (Golden Yellow - Tailwind yellow-600)
- **Opacity:** 60%
- **Stroke:** `#A16207` (Dark Gold - Tailwind yellow-700)
- **Hover Fill:** `#EAB308` (Bright Gold - Tailwind yellow-500)
- **Hover Opacity:** 80%
- **Tiles:** 10 tiles near Yellowstone Lake
- **Story:** Golden yellow representing exploration and discovery

### 💜 Salesforce Ohana Foundation - Random Cluster
- **Fill:** `#9333EA` (Purple - Tailwind purple-600)
- **Opacity:** 60%
- **Stroke:** `#7E22CE` (Dark Purple - Tailwind purple-700)
- **Hover Fill:** `#A855F7` (Bright Purple - Tailwind purple-500)
- **Hover Opacity:** 80%
- **Tiles:** 8 tiles in northeastern region
- **Story:** Tech purple for innovation in conservation

### 🌿 Anonymous - Small Cluster
- **Fill:** `#65A30D` (Olive Green - Tailwind lime-600)
- **Opacity:** 60%
- **Stroke:** `#4D7C0F` (Dark Olive - Tailwind lime-700)
- **Hover Fill:** `#84CC16` (Bright Olive - Tailwind lime-500)
- **Hover Opacity:** 80%
- **Tiles:** 4 tiles in small cluster
- **Story:** Olive green for quiet, anonymous support

---

## Non-Donor Tile Colors (Subdued)

### Available Tiles
- **Fill:** `#10b981` (Emerald-500)
- **Opacity:** 15% (very subtle)
- **Stroke:** `#059669` (Emerald-600)
- **Purpose:** Background layer, doesn't compete with donor patterns

### Reserved (No Donor Attribution)
- **Fill:** `#f59e0b` (Amber-500)
- **Opacity:** 25% (subdued, down from original 40%)
- **Stroke:** `#d97706` (Amber-600)
- **Purpose:** Shows reservation without competing with donor tiles

### Sold (No Donor Attribution)
- **Fill:** `#64748b` (Slate-500)
- **Opacity:** 30% (muted)
- **Stroke:** `#475569` (Slate-600)
- **Purpose:** Indicates sold status for non-donor purchases

---

## Border Widths

**Donor Tiles:**
- Normal: 2px
- Hover: 3px

**Non-Donor Tiles:**
- Normal: 1px
- Hover: 2px

Thicker borders make donor patterns more defined and recognizable.

---

## Color Selection Rationale

Colors were chosen to:
1. **Maximize distinguishability** - All colors are easily differentiated
2. **Tell a story** - Each color connects to the donor's brand or conservation mission
3. **Ensure visibility** - All colors stand out against the topographic basemap
4. **Create hierarchy** - Donor tiles are bolder than non-donor tiles
5. **Maintain aesthetics** - Professional, premium look suitable for investor demos

---

## Accessibility Considerations

- All donor colors have sufficient contrast against white backgrounds
- Color is not the only differentiator (opacity and borders also vary)
- Patterns are recognizable by shape as well as color
- Hover states provide additional feedback

---

## Testing Color Combinations

Run the app and verify:
- ✅ Bear shape (red) is clearly visible and distinct
- ✅ Bison shape (orange) is clearly visible and distinct from bear
- ✅ Tree shape (dark green) is clearly visible and distinct from available tiles
- ✅ All 8 donor patterns are simultaneously recognizable
- ✅ Non-donor reserved tiles are visibly subdued
- ✅ Map remains readable with all patterns visible
