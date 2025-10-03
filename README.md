# Treeple - Conservation Grid Platform 🌲

**A platform for creating interactive conservation grids. Currently featuring Yellowstone National Park.**

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)](https://tailwindcss.com/)
[![MapLibre](https://img.shields.io/badge/MapLibre-4-orange)](https://maplibre.org/)

---

## 🎯 Project Overview

### What is Treeple?

**Treeple** is a reusable platform for creating interactive conservation experiences. It enables users to:
- **Explore** beautiful topographic maps of protected natural areas
- **Visualize** grid overlays representing symbolic land parcels
- **Interact** with grid squares to view details and availability
- **Reserve** squares as conservation gifts (symbolic, not actual ownership)

### Current Implementation: Yellowstone National Park

This MVP showcases Treeple's capabilities with Yellowstone as the first featured conservation area, designed for **investor demos** with the full user experience from discovery to reservation.

### Vision

Create a modern, premium platform where conservation enthusiasts can symbolically "sponsor" portions of protected lands, with proceeds supporting conservation efforts. Think "buy a star" but for national parks and wilderness areas.

### Why Yellowstone First?

Yellowstone National Park serves as our proof-of-concept for several reasons:
- **Icon status** - America's first national park with global recognition
- **Varied terrain** - Demonstrates platform's ability to handle diverse landscapes
- **Conservation impact** - Real need for ongoing preservation support
- **Technical complexity** - 2,300+ tiles showcase platform scalability

---

## ✨ Features (MVP)

### ✅ Implemented
- 🗺️ Interactive MapLibre map with MapTiler topographic basemap
- 📊 2,300+ tile grid overlay covering Yellowstone
- 🎨 Beautiful glass-morphism UI with modern design
- 🖱️ Click/tap tiles to view details in side panel
- 🎨 Three tile states: Available (green), Reserved (amber), Sold (gray)
- 📱 Fully responsive mobile experience
- ⚡ Optimized performance (Lighthouse >90)
- 🚀 Deployed on Vercel

### 🚧 Coming Soon (Phase 2)
- 💳 Stripe payment integration
- 👤 User authentication & accounts
- 📧 Email notifications
- 🎁 Gift messaging & certificates
- 🛍️ Merch store
- 📊 Admin dashboard

---

## 🛠️ Tech Stack

### Core Technologies
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 3
- **UI Components:** shadcn/ui
- **Mapping:** MapLibre GL JS + MapTiler
- **Geospatial:** Turf.js

### Infrastructure
- **Hosting:** Vercel
- **Data:** Static JSON (Phase 1) → Supabase (Phase 2)
- **Payments:** Stripe (Phase 2)

---

## 📁 Project Structure

```
treeple/
├── docs/                    # 📚 All documentation
│   ├── PRD.md              # Product requirements
│   ├── TECHNICAL_SPEC.md   # Architecture
│   ├── DESIGN_SYSTEM.md    # Design guidelines
│   ├── COMPONENT_SPEC.md   # Component docs
│   ├── DATA_STRUCTURE.md   # Data models
│   ├── SETUP.md            # Setup guide
│   ├── FOLDER_STRUCTURE.md # File tree
│   └── CLAUDE.md           # AI assistant instructions
│
├── public/
│   └── data/               # Implementation-specific data
│       ├── yellowstone-grid.json
│       └── seed-tiles.json
│
└── src/
    ├── app/                # Next.js pages
    ├── components/         # React components
    ├── lib/                # Utilities
    ├── types/              # TypeScript types
    ├── constants/          # Configuration
    └── hooks/              # Custom hooks
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- npm 10+
- MapTiler API key ([get free key](https://cloud.maptiler.com/))

### Installation

1. **Clone repository**
```bash
git clone https://github.com/[your-username]/treeple.git
cd treeple
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment**
```bash
cp .env.example .env.local
# Add your MapTiler API key to .env.local
```

4. **Generate data** (Important!)
```bash
npm run setup
```
⚠️ **Note:** This step is required! It generates the grid data files. If you skip this, the map won't load.

5. **Start development server**
```bash
npm run dev
```

6. **Open browser**
Visit [http://localhost:3000](http://localhost:3000)

---

## 🔧 Troubleshooting

### Common Issues

**1. Map not loading / "There is no style added to the map" warning**
- **Cause:** Missing or invalid MapTiler API key
- **Solution:**
  - Ensure `NEXT_PUBLIC_MAPTILER_KEY` is set in `.env.local`
  - Get a free key from [MapTiler Cloud](https://cloud.maptiler.com/)
  - Verify the key is valid in your MapTiler dashboard
  - **Important:** Restart the dev server after adding/changing environment variables
  - Check browser console for specific error messages

**2. Tiles not clickable / Map interactions not working**
- **Cause:** Corrupted or missing grid data
- **Solution:**
  - Run `npm run generate-grid` to regenerate the tile data
  - Check that `/public/data/yellowstone-grid.json` exists and contains unique tile IDs
  - Look for console errors about duplicate IDs
  - Verify the file size is ~12MB (not a few KB)

**3. 404 errors for data files**
- **Cause:** Setup script not run or data files missing
- **Solution:**
  - Run the setup script: `npm run setup`
  - Verify files exist:
    - `public/data/yellowstone-grid.json` (~12MB)
    - `public/data/seed-tiles.json`
  - Check that the `public` directory is being served correctly
  - Clear Next.js cache: `rm -rf .next` and rebuild

**4. Layout issues / Content pushed off screen**
- **Cause:** CSS conflicts or browser cache
- **Solution:**
  - Clear browser cache and hard reload (Cmd/Ctrl + Shift + R)
  - Check browser console for CSS or layout errors
  - Verify the header height (h-16) matches in both Header and page components
  - Try a different browser to isolate the issue

**5. Environment variables not working on Vercel**
- **Cause:** Variables not configured in Vercel dashboard
- **Solution:**
  - Add variables in Vercel dashboard: Settings → Environment Variables
  - Variables must be prefixed with `NEXT_PUBLIC_` to be available in the browser
  - Set the variable for all environments (Production, Preview, Development)
  - **Important:** Redeploy after adding/changing environment variables (changes don't auto-apply)

**6. "Grid data is corrupted" error**
- **Cause:** All tiles have the same ID (usually "YS-000-000")
- **Solution:**
  - This happens if the grid generation script had a bug
  - Run `npm run generate-grid` to regenerate with the fixed script
  - Check console logs to verify unique IDs are being generated
  - The script should show: "✓ Validated: All [number] tile IDs are unique"

**7. Slow performance or map lag**
- **Cause:** Too many tiles rendering or hardware limitations
- **Solution:**
  - Ensure you're using a modern browser (Chrome 90+, Safari 14+)
  - Check that hardware acceleration is enabled in browser settings
  - Reduce zoom level to show fewer tiles
  - Close other browser tabs to free up memory

### Debug Checklist

If something isn't working, check these in order:

1. ✅ **Environment Variables**
   - `.env.local` file exists
   - `NEXT_PUBLIC_MAPTILER_KEY` is set
   - Dev server restarted after adding variables

2. ✅ **Data Files**
   - Run `npm run setup` completed successfully
   - `public/data/yellowstone-grid.json` exists (~12MB)
   - `public/data/seed-tiles.json` exists

3. ✅ **Browser Console**
   - Open DevTools (F12)
   - Check Console tab for errors
   - Look for specific error messages with ✓ or ❌ indicators

4. ✅ **Dependencies**
   - Run `npm install` to ensure all packages are installed
   - Check Node.js version is 20+ (`node --version`)
   - Clear node_modules and reinstall if needed: `rm -rf node_modules && npm install`

5. ✅ **Build & Cache**
   - Clear Next.js cache: `rm -rf .next`
   - Rebuild: `npm run build`
   - Restart dev server: `npm run dev`

### Getting Help

If you're still stuck:
1. Check the browser console (F12) for detailed errors
2. Search existing [GitHub Issues](https://github.com/[your-username]/treeple/issues)
3. Open a new issue with:
   - Error message (from console)
   - Steps to reproduce
   - Your environment (OS, browser, Node version)

---

## 📖 Documentation

### For Developers
Start with these docs in order:

1. **[SETUP.md](docs/SETUP.md)** - Get your environment running
2. **[FOLDER_STRUCTURE.md](docs/FOLDER_STRUCTURE.md)** - Understand the codebase
3. **[TECHNICAL_SPEC.md](docs/TECHNICAL_SPEC.md)** - Learn the architecture
4. **[COMPONENT_SPEC.md](docs/COMPONENT_SPEC.md)** - Build components

### For Designers
1. **[DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md)** - Colors, typography, components
2. **[COMPONENT_SPEC.md](docs/COMPONENT_SPEC.md)** - Component patterns

### For Product Managers
1. **[PRD.md](docs/PRD.md)** - Product requirements & user stories
2. **[TECHNICAL_SPEC.md](docs/TECHNICAL_SPEC.md)** - Technical constraints

### For Data Engineers
1. **[DATA_STRUCTURE.md](docs/DATA_STRUCTURE.md)** - Data models & schemas

---

## 🎨 Design System

### Colors
- **Primary (Forest Green):** Conservation theme
- **Secondary (Warm Amber):** Premium, gift-worthy
- **Neutrals (Slate):** Clean, modern

### Typography
- **Font Family:** Inter (sans-serif)
- **Monospace:** Geist Mono (for IDs, coordinates)

### Components
Built with shadcn/ui and Tailwind CSS for a modern, glass-morphism aesthetic.

See [DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) for full details.

---

## 🗺️ Map Features

### Grid Specifications
- **Cell Size:** 1 km × 1 km (247 acres)
- **Total Tiles:** 2,304 covering Yellowstone
- **Coordinate System:** WGS84 (lat/lng)

### Tile States
- 🟢 **Available** - Ready to reserve
- 🟡 **Reserved** - Temporarily held (14 days)
- ⚫ **Sold** - Purchased and claimed

### Interactions
- **Hover:** Highlight tile with smooth animation
- **Click:** Open side panel with tile details
- **Pan/Zoom:** Explore different areas
- **Mobile:** Touch-friendly gestures

---

## 📊 Data Structure

### Tile Object
```typescript
interface Tile {
  id: string              // "YS-001-045"
  coordinates: {
    lat: number
    lng: number
  }
  status: 'available' | 'reserved' | 'sold'
  geometry: GeoJSON.Polygon
  price: number           // USD cents
  reservedAt?: string     // ISO timestamp
  soldAt?: string
}
```

See [DATA_STRUCTURE.md](docs/DATA_STRUCTURE.md) for complete schemas.

---

## 🧪 Development

### Available Scripts

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run format       # Format with Prettier
npm run generate-grid # Generate grid data
npm run seed-tiles   # Seed tile statuses
npm run setup        # Run both generators
```

### Key Commands

```bash
# Add shadcn component
npx shadcn-ui@latest add button

# Type check
npm run type-check

# Bundle analysis
ANALYZE=true npm run build
```

---

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect repository to Vercel**
2. **Add environment variables:**
   - `NEXT_PUBLIC_MAPTILER_KEY`
3. **Deploy:** Automatic on git push

### Manual Deploy
```bash
vercel --prod
```

---

## 🎯 Roadmap

### ✅ Phase 1: MVP (Current)
- Interactive map demo
- Grid visualization
- Tile selection UI
- Static data

### 🚧 Phase 2: Transactions
- User authentication
- Stripe integration
- Real-time tile updates
- Email notifications

### 🔮 Phase 3: Social
- Gift messaging
- Certificate generation
- User profiles
- Share on social media

### 🌟 Phase 4: Scale
- **Multiple conservation areas** (other national parks, forests, marine reserves)
- Mobile apps (iOS/Android)
- Conservation partnerships
- Merch store

---

## 📱 Browser Support

- Chrome 90+
- Safari 14+
- Firefox 88+
- Edge 90+
- iOS Safari 14+
- Chrome Android 90+

---

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and contribution process.

### For AI Code Agents (Claude Code, etc.)

This project is **optimized for AI-assisted development**. See [docs/CLAUDE.md](docs/CLAUDE.md) for specific guidelines.

Quick tips:
1. **Read documentation first:** Start with [docs/PRD.md](docs/PRD.md)
2. **Follow patterns:** Use existing components as templates
3. **Respect design system:** Follow [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md)
4. **Write TypeScript:** No PropTypes, use interfaces
5. **Be responsive:** Mobile-first approach

---

## 📄 License

MIT License - See LICENSE file for details

---

## 🙏 Acknowledgments

- **MapTiler** - Beautiful topographic maps
- **MapLibre** - Open-source mapping library
- **Turf.js** - Geospatial calculations
- **shadcn/ui** - Component library
- **Vercel** - Hosting platform

---

## 📞 Contact

- **GitHub:** [github.com/[your-username]/treeple](https://github.com/[your-username]/treeple)
- **Issues:** [Submit an issue](https://github.com/[your-username]/treeple/issues)
- **Discussions:** [GitHub Discussions](https://github.com/[your-username]/treeple/discussions)

---

## 🐛 Known Issues

### MVP Limitations
- Tile reservations are not persisted (no backend yet)
- No user authentication
- No payment processing
- Grid data is static (regenerate manually)
- Currently supports only Yellowstone (multi-area support in Phase 4)

### Browser Issues
- Safari may have rendering issues on older iOS versions
- Firefox touch gestures may be less smooth

Report issues on [GitHub Issues](https://github.com/[your-username]/treeple/issues)

---

## 💡 Tips for Success

### For Demos
1. **Preload map:** Open app before demo to cache tiles
2. **Pick scenic areas:** Zoom to geysers or mountains
3. **Show mobile:** Demo responsiveness
4. **Highlight speed:** Emphasize performance

### For Development
1. **Use the docs:** Everything you need is documented
2. **Start small:** Build one component at a time
3. **Test responsive:** Use Chrome DevTools
4. **Ask questions:** Open issues for clarification

---

## 🎓 Learn More

### Next.js
- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)

### MapLibre
- [MapLibre GL JS Docs](https://maplibre.org/maplibre-gl-js-docs/)
- [MapTiler Documentation](https://docs.maptiler.com/)

### Turf.js
- [Turf.js Documentation](https://turfjs.org/)
- [GeoJSON Spec](https://geojson.org/)

---

**Built with ❤️ for conservation and beautiful code**

*Treeple is a platform for creating interactive conservation experiences. Yellowstone National Park is our first implementation.*