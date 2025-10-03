# Folder Structure
## Treeple Platform - Complete File Tree

---

## Overview

```
treeple/
├── 📄 Configuration Files
├── 📁 docs/              Documentation
├── 📁 public/            Static assets & implementation data
├── 📁 scripts/           Build scripts
└── 📁 src/               Source code
```

---

## Complete File Tree

```
treeple/
│
├── .env.local                    # Environment variables (git-ignored)
├── .env.example                  # Example env file (committed)
├── .eslintrc.json               # ESLint configuration
├── .gitignore                   # Git ignore rules
├── .prettierrc                  # Prettier formatting rules
├── .prettierignore              # Files to skip formatting
├── next.config.js               # Next.js configuration
├── package.json                 # Dependencies and scripts
├── package-lock.json            # Dependency lock file
├── postcss.config.js            # PostCSS configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
├── README.md                    # Project overview
│
├── 📁 docs/                     # 📚 Documentation
│   ├── PRD.md                   # Product Requirements Document
│   ├── TECHNICAL_SPEC.md        # Technical specifications
│   ├── DESIGN_SYSTEM.md         # Design system & styles
│   ├── COMPONENT_SPEC.md        # Component documentation
│   ├── DATA_STRUCTURE.md        # Data models & API
│   ├── SETUP.md                 # Development setup guide
│   ├── FOLDER_STRUCTURE.md      # This file
│   └── CLAUDE.md                # AI assistant instructions
│
├── 📁 public/                   # 🌐 Static Assets
│   ├── favicon.ico              # Site favicon
│   ├── robots.txt               # SEO robots file
│   ├── sitemap.xml              # SEO sitemap
│   │
│   ├── 📁 data/                 # Implementation-specific data files
│   │   ├── yellowstone-grid.json         # Generated grid (~4MB)
│   │   ├── yellowstone-boundary.json     # Park boundary polygon
│   │   └── seed-tiles.json               # Initial tile statuses
│   │   # Note: For other areas, replace with area-specific JSON files
│   │
│   └── 📁 images/               # Static images
│       ├── logo.svg             # App logo
│       ├── logo-white.svg       # White version for dark backgrounds
│       ├── og-image.jpg         # Open Graph image (1200x630)
│       ├── hero-yellowstone.jpg # Hero/background image
│       └── 📁 tiles/            # Tile-specific images (optional)
│           └── placeholder.jpg
│
├── 📁 scripts/                  # 🔧 Build & Setup Scripts
│   ├── generate-grid.ts         # Generate grid GeoJSON
│   ├── seed-tiles.ts            # Generate seed data
│   └── verify-data.ts           # Validate generated data
│
└── 📁 src/                      # 💻 Source Code
    │
    ├── 📁 app/                  # Next.js App Router
    │   ├── layout.tsx           # Root layout component
    │   ├── page.tsx             # Home page (map view)
    │   ├── globals.css          # Global styles
    │   ├── loading.tsx          # Loading UI
    │   ├── error.tsx            # Error boundary
    │   ├── not-found.tsx        # 404 page
    │   │
    │   ├── 📁 about/            # About page
    │   │   ├── page.tsx
    │   │   └── layout.tsx
    │   │
    │   ├── 📁 merch/            # Merch store (placeholder)
    │   │   ├── page.tsx
    │   │   └── loading.tsx
    │   │
    │   ├── 📁 account/          # User account (placeholder)
    │   │   ├── page.tsx
    │   │   └── layout.tsx
    │   │
    │   └── 📁 api/              # API routes (Phase 2)
    │       └── 📁 tiles/
    │           └── route.ts
    │
    ├── 📁 components/           # ⚛️ React Components
    │   │
    │   ├── 📁 ui/               # shadcn/ui components
    │   │   ├── button.tsx       # Button component
    │   │   ├── card.tsx         # Card component
    │   │   ├── badge.tsx        # Badge component
    │   │   ├── sheet.tsx        # Drawer/sheet (mobile)
    │   │   ├── dialog.tsx       # Modal dialog
    │   │   ├── skeleton.tsx     # Loading skeleton
    │   │   ├── label.tsx        # Form label
    │   │   └── input.tsx        # Form input
    │   │
    │   ├── 📁 map/              # Map-related components
    │   │   ├── MapContainer.tsx          # Main map wrapper
    │   │   ├── MapControls.tsx           # Zoom/reset controls
    │   │   ├── MapLegend.tsx             # Status color legend
    │   │   ├── GridOverlay.tsx           # Grid layer manager
    │   │   ├── TileHighlight.tsx         # Hover highlight effect
    │   │   ├── MapSkeleton.tsx           # Loading state
    │   │   └── MapError.tsx              # Error state
    │   │
    │   ├── 📁 layout/           # Layout components
    │   │   ├── Header.tsx                # Top navigation bar
    │   │   ├── Footer.tsx                # Footer (optional)
    │   │   ├── Navigation.tsx            # Nav menu items
    │   │   ├── MobileMenu.tsx            # Mobile drawer menu
    │   │   ├── Logo.tsx                  # App logo
    │   │   ├── AccountButton.tsx         # Account dropdown
    │   │   └── SidePanel.tsx             # Tile details panel
    │   │
    │   ├── 📁 tiles/            # Tile-specific components
    │   │   ├── TileDetails.tsx           # Full tile info
    │   │   ├── TileCard.tsx              # Compact tile card
    │   │   ├── TileStatusBadge.tsx       # Status indicator
    │   │   ├── TileActions.tsx           # CTA buttons
    │   │   ├── TileInfo.tsx              # Info grid
    │   │   ├── TileHeader.tsx            # Title + badge
    │   │   └── TileDetailsSkeleton.tsx   # Loading state
    │   │
    │   └── 📁 shared/           # Shared/utility components
    │       ├── EmptyState.tsx            # No data state
    │       ├── ErrorBoundary.tsx         # Error catcher
    │       └── LoadingSpinner.tsx        # Spinner
    │
    ├── 📁 lib/                  # 🛠️ Utility Functions
    │   ├── utils.ts             # General utilities (cn, etc)
    │   ├── map-utils.ts         # Map helper functions
    │   ├── grid-generator.ts    # Grid generation logic
    │   ├── tile-data.ts         # Tile data management
    │   ├── format.ts            # Formatting helpers
    │   ├── validation.ts        # Data validation
    │   └── constants.ts         # Shared constants (alternative location)
    │
    ├── 📁 types/                # 📐 TypeScript Definitions
    │   ├── index.ts             # Main type exports
    │   ├── tile.types.ts        # Tile-related types
    │   ├── map.types.ts         # Map-related types
    │   └── api.types.ts         # API types (Phase 2)
    │
    ├── 📁 constants/            # 🔧 Configuration Constants
    │   ├── map-config.ts        # Map configuration
    │   ├── grid-config.ts       # Grid settings
    │   ├── colors.ts            # Color constants
    │   └── routes.ts            # Route paths
    │
    ├── 📁 hooks/                # 🪝 Custom React Hooks
    │   ├── useMap.ts            # Map instance management
    │   ├── useTileData.ts       # Tile data fetching
    │   ├── useMediaQuery.ts     # Responsive breakpoints
    │   ├── useLocalStorage.ts   # Local storage hook
    │   └── useDebounce.ts       # Debounce values
    │
    ├── 📁 contexts/             # 🔄 React Context Providers
    │   ├── AppContext.tsx       # Global app state
    │   └── MapContext.tsx       # Map-specific state
    │
    └── 📁 styles/               # 🎨 Additional Styles (optional)
        └── map.css              # Map-specific styles
```

---

## File Purposes

### Configuration Files (Root)

| File | Purpose |
|------|---------|
| `.env.local` | Environment variables (not committed) |
| `.env.example` | Template for environment variables |
| `.eslintrc.json` | Linting rules |
| `.gitignore` | Files to exclude from Git |
| `.prettierrc` | Code formatting rules |
| `next.config.js` | Next.js configuration |
| `package.json` | Dependencies and npm scripts |
| `postcss.config.js` | PostCSS plugins |
| `tailwind.config.ts` | Tailwind customization |
| `tsconfig.json` | TypeScript compiler options |

---

### Documentation (`/docs`)

| File | Purpose |
|------|---------|
| `PRD.md` | Product requirements, user stories, scope |
| `TECHNICAL_SPEC.md` | Architecture, tech stack, deployment |
| `DESIGN_SYSTEM.md` | Colors, typography, components styles |
| `COMPONENT_SPEC.md` | Detailed component documentation |
| `DATA_STRUCTURE.md` | Data models, JSON schemas, API specs |
| `SETUP.md` | Development environment setup |
| `FOLDER_STRUCTURE.md` | This file - project structure guide |

---

### Static Assets (`/public`)

| Path | Purpose |
|------|---------|
| `/public/data/yellowstone-grid.json` | Generated grid with 2304+ tiles |
| `/public/data/seed-tiles.json` | Initial reserved/sold tile statuses |
| `/public/data/yellowstone-boundary.json` | Park boundary polygon |
| `/public/images/logo.svg` | Main application logo |
| `/public/images/og-image.jpg` | Social media preview image |

---

### Source Code (`/src`)

#### App Router (`/src/app`)
Next.js 14 App Router pages and layouts

| Path | Purpose |
|------|---------|
| `app/layout.tsx` | Root layout with fonts, metadata |
| `app/page.tsx` | Home page with map |
| `app/globals.css` | Global CSS and Tailwind imports |
| `app/about/page.tsx` | About page |
| `app/merch/page.tsx` | Merch store (placeholder) |
| `app/account/page.tsx` | User account (placeholder) |

#### Components (`/src/components`)

**UI Components** (`/components/ui`)
- shadcn/ui components (button, card, badge, etc.)
- Reusable, unstyled base components

**Map Components** (`/components/map`)
- `MapContainer.tsx` - Map initialization and management
- `GridOverlay.tsx` - Grid layer rendering
- `MapControls.tsx` - Zoom, reset, fullscreen buttons
- `MapLegend.tsx` - Status color key

**Layout Components** (`/components/layout`)
- `Header.tsx` - Top navigation bar
- `SidePanel.tsx` - Tile details drawer
- `Navigation.tsx` - Menu items
- `Logo.tsx` - Brand logo

**Tile Components** (`/components/tiles`)
- `TileDetails.tsx` - Full tile information display
- `TileStatusBadge.tsx` - Visual status indicator
- `TileActions.tsx` - CTA buttons
- `TileCard.tsx` - Compact tile preview

#### Utilities (`/src/lib`)
Reusable functions and helpers

| File | Purpose |
|------|---------|
| `utils.ts` | General utilities (cn, etc) |
| `map-utils.ts` | Map calculations, projections |
| `grid-generator.ts` | Turf.js grid generation |
| `tile-data.ts` | Data loading and management |
| `format.ts` | Date, number, coordinate formatting |

#### Types (`/src/types`)
TypeScript type definitions

| File | Purpose |
|------|---------|
| `index.ts` | Main type exports |
| `tile.types.ts` | Tile, TileStatus, Coordinates |
| `map.types.ts` | MapConfig, BoundingBox |

#### Constants (`/src/constants`)
Configuration values

| File | Purpose |
|------|---------|
| `map-config.ts` | MapTiler settings, bounds |
| `grid-config.ts` | Cell size, Yellowstone bbox |
| `colors.ts` | Status colors |

#### Hooks (`/src/hooks`)
Custom React hooks

| File | Purpose |
|------|---------|
| `useMap.ts` | Map instance state |
| `useTileData.ts` | Tile data fetching |
| `useMediaQuery.ts` | Responsive breakpoints |

---

## File Size Estimates

| File/Directory | Size | Notes |
|----------------|------|-------|
| `/public/data/yellowstone-grid.json` | ~4-5 MB | 2304 tiles with geometry |
| `/public/data/seed-tiles.json` | ~5-10 KB | 50 seed entries |
| `/node_modules` | ~400 MB | All dependencies |
| `/src` | ~200 KB | Source code |
| `/.next` (build) | ~50 MB | Production build |
| Total project | ~450-500 MB |

---

## Git Ignore Rules

### .gitignore
```
# Dependencies
/node_modules
/.pnp
.pnp.js

# Testing
/coverage

# Next.js
/.next/
/out/

# Production
/build

# Misc
.DS_Store
*.pem

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Local env files
.env*.local
.env

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
next-env.d.ts

# IDE
.vscode/*
!.vscode/extensions.json
.idea
*.swp
*.swo
*~
```

---

## Package Scripts

### Available Commands
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "type-check": "tsc --noEmit",
    "generate-grid": "tsx scripts/generate-grid.ts",
    "seed-tiles": "tsx scripts/seed-tiles.ts",
    "verify-data": "tsx scripts/verify-data.ts",
    "setup": "npm run generate-grid && npm run seed-tiles && npm run verify-data",
    "clean": "rm -rf .next node_modules",
    "reinstall": "npm run clean && npm install",
    "analyze": "ANALYZE=true npm run build"
  }
}
```

---

## Import Aliases

### Configured in tsconfig.json
```typescript
// Instead of:
import { Button } from '../../../components/ui/button'

// Use:
import { Button } from '@/components/ui/button'
```

### Common Import Patterns
```typescript
// Components
import { MapContainer } from '@/components/map/MapContainer'
import { SidePanel } from '@/components/layout/SidePanel'
import { Button } from '@/components/ui/button'

// Utilities
import { cn } from '@/lib/utils'
import { loadTileData } from '@/lib/tile-data'

// Types
import type { Tile, TileStatus } from '@/types'

// Constants
import { MAP_CONFIG } from '@/constants/map-config'

// Hooks
import { useMap } from '@/hooks/useMap'
```

---

## Development vs Production

### Development Structure
```
src/
├── Hot reload enabled
├── Source maps enabled
├── Verbose error messages
└── Development builds

.next/
└── Development cache
```

### Production Structure
```
.next/
├── Optimized bundles
├── Minified code
├── Static assets
├── Server files
└── Build cache

out/ (if using static export)
└── Fully static HTML/CSS/JS
```

---

## Component Organization Pattern

### Feature-Based Structure
Each feature has related components grouped together:

```
components/
├── map/           # Map feature
│   ├── MapContainer.tsx
│   ├── GridOverlay.tsx
│   ├── MapControls.tsx
│   └── MapLegend.tsx
│
├── tiles/         # Tile feature
│   ├── TileDetails.tsx
│   ├── TileCard.tsx
│   └── TileActions.tsx
│
└── layout/        # Layout feature
    ├── Header.tsx
    ├── SidePanel.tsx
    └── Navigation.tsx
```

---

## File Naming Conventions

### React Components
- **PascalCase**: `MapContainer.tsx`, `TileDetails.tsx`
- **Include .tsx extension** for JSX components

### Utilities & Hooks
- **camelCase**: `map-utils.ts`, `tile-data.ts`
- **Use .ts extension** for non-JSX files

### Types
- **camelCase with .types suffix**: `tile.types.ts`, `map.types.ts`

### Constants
- **kebab-case**: `map-config.ts`, `grid-config.ts`

### Data Files
- **kebab-case**: `yellowstone-grid.json`, `seed-tiles.json`

---

## Adding New Features

### Example: Adding "Favorites" Feature

1. **Create types**
```typescript
// src/types/favorite.types.ts
export interface Favorite {
  id: string
  tileId: string
  userId: string
  createdAt: string
}
```

2. **Create hook**
```typescript
// src/hooks/useFavorites.ts
export function useFavorites() {
  // Implementation
}
```

3. **Create components**
```typescript
// src/components/favorites/FavoriteButton.tsx
// src/components/favorites/FavoritesList.tsx
```

4. **Add to context (if needed)**
```typescript
// src/contexts/AppContext.tsx
// Add favorites state
```

5. **Create route**
```typescript
// src/app/favorites/page.tsx
```

---

## Code Organization Best Practices

### 1. Component Structure
```typescript
// Imports (grouped by source)
import { useState } from 'react'
import { MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Tile } from '@/types'

// Interface/Type definitions
interface TileCardProps {
  tile: Tile
  onClick?: () => void
}

// Component
export function TileCard({ tile, onClick }: TileCardProps) {
  // Hooks
  const [isHovered, setIsHovered] = useState(false)
  
  // Handlers
  const handleClick = () => {
    onClick?.()
  }
  
  // Render
  return (
    <div>
      {/* JSX */}
    </div>
  )
}
```

### 2. Barrel Exports
Create index files to simplify imports:

```typescript
// src/components/tiles/index.ts
export { TileDetails } from './TileDetails'
export { TileCard } from './TileCard'
export { TileStatusBadge } from './TileStatusBadge'
export { TileActions } from './TileActions'

// Usage:
import { TileDetails, TileCard } from '@/components/tiles'
```

### 3. Type Exports
```typescript
// src/types/index.ts
export * from './tile.types'
export * from './map.types'
export * from './api.types'

// Usage:
import type { Tile, TileStatus, MapConfig } from '@/types'
```

---

## VS Code Workspace Settings

### .vscode/settings.json
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "files.associations": {
    "*.css": "tailwindcss"
  },
  "tailwindCSS.experimental.classRegex": [
    ["cn\\(([^)]*)\\)", "([\"'`][^\"'`]*.*?[\"'`])"]
  ]
}
```

### .vscode/extensions.json
```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "PKief.material-icon-theme",
    "christian-kohler.path-intellisense"
  ]
}
```

---

## Maintenance

### Regular Tasks

**Weekly:**
- [ ] Review and merge dependabot PRs
- [ ] Run `npm audit` and fix issues
- [ ] Check Vercel deployment logs

**Monthly:**
- [ ] Update dependencies: `npm update`
- [ ] Review bundle size: `npm run analyze`
- [ ] Run Lighthouse audit
- [ ] Review and archive old branches

**Quarterly:**
- [ ] Major dependency updates
- [ ] Performance optimization review
- [ ] Security audit
- [ ] Refactor technical debt

---

## Documentation Updates

When adding new features, update these files:

1. **PRD.md** - If scope changes
2. **TECHNICAL_SPEC.md** - If architecture changes
3. **COMPONENT_SPEC.md** - For new components
4. **DATA_STRUCTURE.md** - For new data models
5. **FOLDER_STRUCTURE.md** - For new files/folders
6. **README.md** - For user-facing changes

---

## Quick Reference

### Create New Component
```bash
# Create file
touch src/components/feature/ComponentName.tsx

# Add to barrel export (optional)
echo "export { ComponentName } from './ComponentName'" >> src/components/feature/index.ts
```

### Add shadcn Component
```bash
npx shadcn-ui@latest add component-name
```

### Generate New Page
```bash
mkdir -p src/app/new-page
touch src/app/new-page/page.tsx
```

### Add New Type
```bash
touch src/types/feature.types.ts
```

---

## Related Documentation

- 📋 **PRD.md** - Start here for project overview
- 🏗️ **TECHNICAL_SPEC.md** - Architecture and tech decisions
- 🎨 **DESIGN_SYSTEM.md** - UI guidelines and styles
- ⚛️ **COMPONENT_SPEC.md** - Component API documentation
- 📊 **DATA_STRUCTURE.md** - Data models and schemas
- 🚀 **SETUP.md** - Getting started guide