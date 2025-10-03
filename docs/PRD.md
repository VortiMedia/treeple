# Product Requirements Document (PRD)
## Treeple Platform - Yellowstone MVP

### Version 1.0 | Last Updated: October 2025

---

## 1. Executive Summary

**Platform Name:** Treeple
**First Implementation:** Yellowstone Conservation Grid
**Version:** MVP (Investor Demo)
**Target Audience:** Investors, early adopters, conservation enthusiasts
**Platform:** Web (Next.js), Mobile-optimized

### Vision
**Treeple** is a reusable platform for creating interactive conservation experiences where users can symbolically "claim" or "sponsor" parcels of protected natural areas as conservation gifts. The Yellowstone National Park implementation serves as the MVP to demonstrate the platform's core experience and business model to investors.

### Platform Goals
- Create a scalable system that can be deployed for multiple conservation areas
- Demonstrate technical feasibility with Yellowstone as the proof-of-concept
- Establish design patterns and data structures that work across different geographies
- Build investor confidence in the platform's multi-area potential

### Success Metrics (MVP)
- Interactive demo runs smoothly on desktop and mobile
- Map loads in < 2 seconds
- Grid overlay renders 1000+ tiles without performance issues
- Investors can visualize the full user journey (browse → select → reserve)
- UI feels premium, modern, and trustworthy

---

## 2. User Stories

### Primary Persona: Conservation Enthusiast
*"I want to support Yellowstone and give meaningful gifts that connect people to nature."*

#### User Journey
1. **Discover** - Land on homepage with stunning topo map of Yellowstone
2. **Explore** - Pan, zoom, and hover over grid squares
3. **Select** - Click a square to view details (coordinates, ID, status)
4. **Reserve** - Click "Reserve This Square" (MVP: placeholder action)
5. **Gift** - (Phase 2) Add gift message, checkout with Stripe

### Core User Stories

#### US-001: Map Exploration
**As a** visitor  
**I want to** pan and zoom a topographic map of Yellowstone  
**So that** I can explore different areas of the park

**Acceptance Criteria:**
- Map loads with Yellowstone centered
- Smooth pan/zoom interactions (60fps)
- Topo details visible at all zoom levels
- Mobile gestures work (pinch-to-zoom, two-finger pan)

#### US-002: Grid Visualization
**As a** visitor  
**I want to** see a grid overlay on the map  
**So that** I understand the available parcels

**Acceptance Criteria:**
- Grid squares are 1km × 1km
- Grid lines are visible but not overwhelming
- Grid updates dynamically when zooming
- Each square has a unique identifier

#### US-003: Tile Interaction
**As a** visitor  
**I want to** hover and click on grid squares  
**So that** I can learn more about specific parcels

**Acceptance Criteria:**
- Hover highlights the square with smooth animation
- Click opens side panel with tile details
- Mobile tap works equivalently to desktop click
- Interaction feels responsive (< 100ms)

#### US-004: Tile Status Visualization
**As a** visitor  
**I want to** see which squares are available, reserved, or sold  
**So that** I know which ones I can claim

**Acceptance Criteria:**
- Available tiles: Soft green tint
- Reserved tiles: Warm amber tint
- Sold tiles: Slate gray tint
- Colors are distinguishable on mobile screens
- Legend explains status colors

#### US-005: Tile Details Panel
**As a** visitor  
**I want to** view detailed information about a selected tile  
**So that** I can decide if I want to reserve it

**Acceptance Criteria:**
- Panel slides in from right (desktop) or bottom (mobile)
- Shows: Tile ID, coordinates, status, description
- Displays high-quality imagery or icon
- CTA button changes based on status:
  - Available → "Reserve This Square"
  - Reserved → "View Details" (grayed out)
  - Sold → "Sold Out"

---

## 3. MVP Scope

### In Scope ✅
- Next.js 14 web app with App Router
- MapLibre GL JS + MapTiler topographic basemap
- Turf.js-generated grid overlay (1km squares)
- Interactive map (pan, zoom, click)
- Side panel UI with tile details
- Three tile states (Available, Reserved, Sold)
- Seeded data (JSON file with ~50 random sold/reserved tiles)
- Responsive design (mobile-first)
- Top navigation bar (placeholder links)
- Deployment to Vercel

### Out of Scope (Phase 2) 🚫
- Real authentication/accounts
- Stripe payment integration
- Backend API (Supabase)
- Certificate generation
- Email notifications
- Merch store functionality
- Gift message feature
- Admin dashboard

### Technical Requirements
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + shadcn/ui
- **Mapping:** MapLibre GL JS + MapTiler API
- **Geospatial:** Turf.js
- **Deployment:** Vercel
- **Performance:** Lighthouse score > 90

---

## 4. Design Requirements

### Visual Theme
**"Modern Conservation Glassomorphism"**

- Clean, neutral color palette with natural accents
- Glass-effect panels (blur, transparency, shadows)
- Large border radius for soft, friendly feel
- Smooth animations and transitions
- High-quality typography
- Generous whitespace

### UI Components (shadcn/ui)
- Card (side panel container)
- Button (CTA actions)
- Badge (tile status indicator)
- Dialog (future: checkout modal)
- Skeleton (loading states)

### Mobile Optimization
- Touch-friendly hit targets (min 44×44px)
- Bottom sheets for mobile panels
- Optimized map controls for small screens
- Responsive text sizing
- Reduced motion for accessibility

---

## 5. Data Structure

### Tile Object
```json
{
  "id": "YS-001-045",
  "coordinates": {
    "lat": 44.5678,
    "lng": -110.1234
  },
  "status": "available", // available | reserved | sold
  "geometry": { /* GeoJSON polygon */ },
  "reservedAt": null, // ISO timestamp
  "soldAt": null
}
```

### Grid Generation
- Use Turf.js `squareGrid` function
- Bounding box: Yellowstone National Park boundaries
- Cell size: 1 km
- Output: GeoJSON FeatureCollection
- Store in: `public/data/yellowstone-grid.json`

---

## 6. Technical Architecture

### Frontend Stack
```
Next.js 14 (App Router)
├── React 18
├── TypeScript
├── Tailwind CSS
├── shadcn/ui
└── MapLibre GL JS
```

### Key Libraries
- `maplibre-gl` - Map rendering
- `@turf/turf` - Geospatial calculations
- `@maptiler/sdk` - MapTiler integration
- `lucide-react` - Icons
- `clsx` / `tailwind-merge` - Utility styling

### File Structure
```
treeple/
├── docs/               # All documentation
├── public/
│   └── data/          # Implementation-specific GeoJSON data
├── src/
│   ├── app/           # Next.js pages
│   ├── components/    # React components
│   ├── lib/           # Utilities
│   ├── types/         # TypeScript types
│   └── constants/     # Config constants
└── package.json
```

**Note:** The platform is designed to be implementation-agnostic. Grid data and configuration can be swapped out for different conservation areas in future deployments.

---

## 7. User Flow (MVP Demo)

### Happy Path
1. User lands on homepage
2. Map loads with Yellowstone centered
3. User zooms into an area of interest
4. User hovers over a green (available) square → highlight appears
5. User clicks the square
6. Side panel slides in with:
   - Tile ID: "YS-001-045"
   - Status badge: "Available"
   - Coordinates
   - "Reserve This Square" button
7. User clicks "Reserve This Square"
8. (MVP: Show success message, no real transaction)

### Edge Cases
- Clicking a sold tile → Panel shows "Sold Out", no CTA
- Clicking a reserved tile → Panel shows "Reserved", grayed CTA
- Slow network → Show loading skeleton
- Mobile view → Panel slides from bottom, full-width

---

## 8. Success Criteria

### Demo Readiness
- [ ] Deploys successfully to Vercel
- [ ] Loads on iOS Safari and Chrome Android
- [ ] Investors can complete full click-through
- [ ] No console errors or warnings
- [ ] Professional visual quality

### Performance
- [ ] First Contentful Paint < 1.5s
- [ ] Map interactive < 2s
- [ ] Smooth 60fps interactions
- [ ] Works on 3G mobile connection

### User Experience
- [ ] Intuitive without tutorial
- [ ] Feels premium and trustworthy
- [ ] Mobile experience is excellent
- [ ] Accessible (WCAG AA)

---

## 9. Launch Checklist

### Pre-Launch
- [ ] Generate Yellowstone grid GeoJSON
- [ ] Seed 50 random reserved/sold tiles
- [ ] Test on 5 different devices
- [ ] Verify MapTiler API key is working
- [ ] Set up Vercel project
- [ ] Configure environment variables

### Post-Launch (Phase 2)
- [ ] Set up Supabase backend
- [ ] Integrate Stripe Checkout
- [ ] Add user authentication
- [ ] Build certificate generator
- [ ] Create merch store pages

### Future Platform Expansion (Phase 4)
- [ ] Design multi-area architecture (area selector, shared infrastructure)
- [ ] Create area configuration system (different grids, boundaries, themes)
- [ ] Build admin panel for managing multiple conservation areas
- [ ] Develop area-specific theming system
- [ ] Support different grid configurations (size, shape, density)

---

## 10. Open Questions

1. **Grid size:** Is 1km too large? Should we use 0.5km for more granularity?
2. **Pricing:** What's the price point per square? ($25, $50, $100?)
3. **Real vs symbolic:** How do we communicate this is symbolic, not actual land ownership?
4. **Conservation partner:** Which Yellowstone foundation to partner with?

---

## Appendix

### References
- MapTiler Docs: https://docs.maptiler.com/
- MapLibre GL JS: https://maplibre.org/
- Turf.js: https://turfjs.org/
- shadcn/ui: https://ui.shadcn.com/

### Glossary
- **Tile:** A single square in the grid overlay
- **Parcel:** Synonym for tile
- **Reserve:** User action to claim a tile (MVP: non-binding)
- **Grid:** The overlay of square tiles on the map
- **Topo:** Topographic map style showing elevation and terrain