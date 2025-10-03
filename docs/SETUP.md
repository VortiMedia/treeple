# Development Setup Guide
## Yellowstone Conservation Grid - MVP

### Getting Started with Local Development

---

## Prerequisites

### Required Software
- **Node.js** 20.x or higher ([download](https://nodejs.org/))
- **npm** 10.x or higher (comes with Node.js)
- **Git** ([download](https://git-scm.com/))
- **Code Editor** (VS Code recommended)

### Recommended VS Code Extensions
```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "PKief.material-icon-theme",
    "christian-kohler.path-intellisense",
    "formulahendry.auto-rename-tag"
  ]
}
```

---

## Initial Setup

### 1. Clone Repository
```bash
# Clone the repository
git clone https://github.com/your-org/yellowstone-grid.git
cd yellowstone-grid

# Or start from scratch
mkdir yellowstone-grid
cd yellowstone-grid
npm init -y
```

### 2. Install Dependencies
```bash
npm install next@latest react@latest react-dom@latest typescript@latest
npm install -D @types/node @types/react @types/react-dom
npm install tailwindcss postcss autoprefixer
npm install maplibre-gl @turf/turf @maptiler/sdk
npm install lucide-react clsx tailwind-merge class-variance-authority
npm install -D @types/maplibre-gl eslint eslint-config-next prettier
```

### 3. Initialize Configuration Files

#### package.json
```json
{
  "name": "yellowstone-grid",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "format": "prettier --write .",
    "generate-grid": "tsx scripts/generate-grid.ts",
    "seed-tiles": "tsx scripts/seed-tiles.ts",
    "setup": "npm run generate-grid && npm run seed-tiles"
  },
  "dependencies": {
    "@maptiler/sdk": "^2.3.0",
    "@turf/turf": "^7.1.0",
    "clsx": "^2.1.0",
    "lucide-react": "^0.400.0",
    "maplibre-gl": "^4.7.0",
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "tailwind-merge": "^2.5.0"
  },
  "devDependencies": {
    "@types/maplibre-gl": "^4.7.0",
    "@types/node": "^20.0.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "autoprefixer": "^10.4.0",
    "eslint": "^8.57.0",
    "eslint-config-next": "^14.2.0",
    "postcss": "^8.4.0",
    "prettier": "^3.3.0",
    "tailwindcss": "^3.4.0",
    "tsx": "^4.19.0",
    "typescript": "^5.5.0"
  }
}
```

#### tsconfig.json
```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

#### next.config.js
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['api.maptiler.com'],
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false
    return config
  },
}

module.exports = nextConfig
```

#### tailwind.config.ts
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7ed',
          100: '#e0efd9',
          200: '#c1dfb3',
          300: '#96c77d',
          400: '#6fa94d',
          500: '#4f872b',
          600: '#3d6b1f',
          700: '#2f521a',
          800: '#294218',
          900: '#223717',
        },
        secondary: {
          50: '#fef9f3',
          100: '#fdf2e3',
          200: '#fae3c1',
          300: '#f6cf95',
          400: '#f1b365',
          500: '#d4a574',
          600: '#b88642',
          700: '#936838',
          800: '#785432',
          900: '#62472c',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'sans-serif'],
        mono: ['var(--font-mono)', 'Geist Mono', 'monospace'],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
```

#### postcss.config.js
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

#### .eslintrc.json
```json
{
  "extends": ["next/core-web-vitals", "prettier"],
  "rules": {
    "no-console": ["warn", { "allow": ["warn", "error"] }],
    "@next/next/no-html-link-for-pages": "off"
  }
}
```

#### .prettierrc
```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

### 4. Environment Variables

Create `.env.local`:
```bash
# MapTiler API Key (get from https://cloud.maptiler.com/)
NEXT_PUBLIC_MAPTILER_KEY=your_maptiler_api_key_here

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_TILE_PRICE=5000

# Development
NODE_ENV=development
```

Create `.env.example` (for version control):
```bash
NEXT_PUBLIC_MAPTILER_KEY=
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_TILE_PRICE=5000
```

---

## Get MapTiler API Key

1. Go to [https://cloud.maptiler.com/](https://cloud.maptiler.com/)
2. Sign up for free account
3. Create a new API key
4. Copy key to `.env.local`

**Free tier includes:**
- 100,000 tile requests/month
- Perfect for MVP demo

---

## Directory Structure Setup

```bash
# Create all directories
mkdir -p src/app
mkdir -p src/components/{ui,map,layout,tiles}
mkdir -p src/lib
mkdir -p src/types
mkdir -p src/constants
mkdir -p src/hooks
mkdir -p public/data
mkdir -p public/images
mkdir -p scripts
mkdir -p docs
```

---

## Install shadcn/ui Components

```bash
# Initialize shadcn/ui
npx shadcn-ui@latest init

# When prompted, choose:
# - Style: Default
# - Base color: Slate
# - CSS variables: Yes

# Install required components
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add sheet
npx shadcn-ui@latest add skeleton
npx shadcn-ui@latest add dialog
```

---

## Generate Grid Data

### Create generation script:
```bash
touch scripts/generate-grid.ts
```

Add content from DATA_STRUCTURE.md, then run:
```bash
npm run generate-grid
```

**Expected output:**
```
Generating Yellowstone grid...
✅ Generated 2304 tiles
📁 Saved to public/data/yellowstone-grid.json
📊 File size: 4.23 MB
```

### Create seed script:
```bash
touch scripts/seed-tiles.ts
```

Add content from DATA_STRUCTURE.md, then run:
```bash
npm run seed-tiles
```

---

## Create Core Files

### src/app/layout.tsx
```typescript
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Yellowstone Grid - Conservation Map',
  description: 'Explore and support Yellowstone National Park conservation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
```

### src/app/globals.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
  }
  
  * {
    @apply border-border;
  }
  
  body {
    @apply bg-background text-foreground;
  }
}

/* MapLibre styles */
@import 'maplibre-gl/dist/maplibre-gl.css';
```

### src/lib/utils.ts
```typescript
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

---

## Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Development Workflow

### Daily Workflow
1. Pull latest changes: `git pull`
2. Install new dependencies: `npm install`
3. Start dev server: `npm run dev`
4. Make changes
5. Format code: `npm run format`
6. Lint code: `npm run lint`
7. Commit changes: `git commit -m "feat: description"`

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/map-component

# Make changes and commit
git add .
git commit -m "feat: add map component"

# Push to remote
git push origin feature/map-component

# Create pull request on GitHub
```

---

## Troubleshooting

### MapLibre not loading
```bash
# Check if MapTiler API key is set
echo $NEXT_PUBLIC_MAPTILER_KEY

# Verify key works
curl "https://api.maptiler.com/maps/outdoor-v2/style.json?key=YOUR_KEY"
```

### Grid data not found
```bash
# Regenerate grid
npm run setup

# Verify files exist
ls -lh public/data/
```

### TypeScript errors
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Port already in use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

---

## Testing Checklist

Before committing, verify:
- [ ] `npm run build` succeeds
- [ ] No TypeScript errors
- [ ] No ESLint errors
- [ ] Map loads correctly
- [ ] Grid overlay appears
- [ ] Tile clicks work
- [ ] Side panel opens
- [ ] Mobile responsive

---

## Deployment Setup (Vercel)

### 1. Install Vercel CLI
```bash
npm i -g vercel
```

### 2. Login
```bash
vercel login
```

### 3. Deploy
```bash
# Preview deployment
vercel

# Production deployment
vercel --prod
```

### 4. Set Environment Variables
```bash
vercel env add NEXT_PUBLIC_MAPTILER_KEY
# Paste your key when prompted
```

---

## Performance Optimization

### Bundle Analysis
```bash
# Install analyzer
npm install -D @next/bundle-analyzer

# Add to next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
module.exports = withBundleAnalyzer(nextConfig)

# Run analysis
ANALYZE=true npm run build
```

### Lighthouse Test
```bash
# Install Lighthouse CLI
npm install -g @lhci/cli

# Run audit
lhci autorun --collect.url=http://localhost:3000
```

---

## Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Production build
npm run start            # Start production server
npm run lint             # Run ESLint
npm run format           # Format with Prettier

# Data generation
npm run generate-grid    # Generate grid data
npm run seed-tiles       # Seed tile statuses
npm run setup            # Run both

# Deployment
vercel                   # Preview deployment
vercel --prod            # Production deployment

# Maintenance
npm outdated             # Check for updates
npm update               # Update dependencies
npm audit                # Security audit
npm audit fix            # Fix vulnerabilities
```

---

## Next Steps

1. ✅ Complete setup
2. 📝 Read all docs/ files
3. 🗺️ Implement MapContainer component
4. 📊 Add GridOverlay
5. 🎨 Build SidePanel UI
6. 📱 Test mobile responsiveness
7. 🚀 Deploy to Vercel