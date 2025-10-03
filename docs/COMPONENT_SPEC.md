# Component Specifications
## Yellowstone Conservation Grid

### Detailed Component Documentation

---

## Component Tree

```
App
├── Header
│   ├── Logo
│   ├── Navigation
│   └── AccountButton
├── MapContainer
│   ├── MapLibre Instance
│   ├── GridOverlay
│   ├── MapControls
│   │   ├── ZoomControls
│   │   ├── ResetViewButton
│   │   └── FullscreenButton
│   └── MapLegend
├── SidePanel (Desktop) / BottomSheet (Mobile)
│   ├── TileDetails
│   │   ├── TileHeader
│   │   ├── TileStatusBadge
│   │   ├── TileInfo
│   │   └── TileActions
│   └── CloseButton
└── Footer (Optional)
```

---

## 1. Header Component

### Header.tsx
**Purpose:** Top navigation bar with logo and menu items

**Props:**
```typescript
interface HeaderProps {
  className?: string
}
```

**Structure:**
```jsx
<header className="fixed top-0 w-full z-50 backdrop-blur-xl bg-white/80 border-b border-slate-200/50 shadow-sm">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between h-16">
      {/* Logo */}
      <Logo />
      
      {/* Desktop Navigation */}
      <Navigation className="hidden md:flex" />
      
      {/* Mobile Menu Button */}
      <MobileMenuButton className="md:hidden" />
      
      {/* Account Button */}
      <AccountButton />
    </div>
  </div>
</header>
```

**Responsive Behavior:**
- Desktop: Horizontal nav bar
- Mobile: Hamburger menu → slide-in drawer

---

## 2. MapContainer Component

### MapContainer.tsx
**Purpose:** Initialize and manage MapLibre instance

**Props:**
```typescript
interface MapContainerProps {
  initialCenter?: [number, number]
  initialZoom?: number
  onTileClick?: (tileId: string) => void
  onTileHover?: (tileId: string | null) => void
  className?: string
}
```

**State:**
```typescript
const [map, setMap] = useState<maplibregl.Map | null>(null)
const [isLoaded, setIsLoaded] = useState(false)
const [error, setError] = useState<string | null>(null)
```

**Lifecycle:**
```typescript
useEffect(() => {
  // Initialize map
  const mapInstance = new maplibregl.Map({
    container: mapContainerRef.current,
    style: MAP_CONFIG.style,
    center: MAP_CONFIG.center,
    zoom: MAP_CONFIG.zoom,
    maxBounds: MAP_CONFIG.maxBounds,
  })

  mapInstance.on('load', () => {
    setMap(mapInstance)
    setIsLoaded(true)
  })

  mapInstance.on('error', (e) => {
    setError(e.error.message)
  })

  return () => mapInstance.remove()
}, [])
```

**Structure:**
```jsx
<div className="relative w-full h-full">
  {/* Loading State */}
  {!isLoaded && <MapSkeleton />}
  
  {/* Error State */}
  {error && <MapError message={error} />}
  
  {/* Map Container */}
  <div ref={mapContainerRef} className="w-full h-full" />
  
  {/* Overlays */}
  {isLoaded && map && (
    <>
      <GridOverlay map={map} />
      <MapControls map={map} />
      <MapLegend />
    </>
  )}
</div>
```

---

## 3. GridOverlay Component

### GridOverlay.tsx
**Purpose:** Render grid tiles on map with interaction

**Props:**
```typescript
interface GridOverlayProps {
  map: maplibregl.Map
  gridData: GridData
  tileStates: Record<string, TileStatus>
  hoveredTileId: string | null
  selectedTileId: string | null
  onTileClick: (tileId: string) => void
  onTileHover: (tileId: string | null) => void
}
```

**Implementation:**
```typescript
useEffect(() => {
  if (!map || !gridData) return

  // Add grid source
  map.addSource('grid', {
    type: 'geojson',
    data: gridData,
  })

  // Add fill layer (colored tiles)
  map.addLayer({
    id: 'grid-fill',
    type: 'fill',
    source: 'grid',
    paint: {
      'fill-color': [
        'match',
        ['get', 'status'],
        'available', 'rgba(16, 185, 129, 0.2)',
        'reserved', 'rgba(245, 158, 11, 0.2)',
        'sold', 'rgba(100, 116, 139, 0.3)',
        'rgba(148, 163, 184, 0.1)' // fallback
      ],
      'fill-opacity': [
        'case',
        ['==', ['get', 'id'], hoveredTileId],
        0.6,
        0.3
      ]
    }
  })

  // Add line layer (borders)
  map.addLayer({
    id: 'grid-outline',
    type: 'line',
    source: 'grid',
    paint: {
      'line-color': [
        'match',
        ['get', 'status'],
        'available', 'rgba(16, 185, 129, 0.6)',
        'reserved', 'rgba(245, 158, 11, 0.6)',
        'sold', 'rgba(100, 116, 139, 0.7)',
        'rgba(148, 163, 184, 0.4)'
      ],
      'line-width': [
        'case',
        ['==', ['get', 'id'], hoveredTileId],
        2.5,
        1.5
      ]
    }
  })

  // Click handler
  map.on('click', 'grid-fill', (e) => {
    const feature = e.features?.[0]
    if (feature?.properties?.id) {
      onTileClick(feature.properties.id)
    }
  })

  // Hover handler
  map.on('mousemove', 'grid-fill', (e) => {
    map.getCanvas().style.cursor = 'pointer'
    const feature = e.features?.[0]
    if (feature?.properties?.id) {
      onTileHover(feature.properties.id)
    }
  })

  map.on('mouseleave', 'grid-fill', () => {
    map.getCanvas().style.cursor = ''
    onTileHover(null)
  })

  return () => {
    if (map.getLayer('grid-fill')) map.removeLayer('grid-fill')
    if (map.getLayer('grid-outline')) map.removeLayer('grid-outline')
    if (map.getSource('grid')) map.removeSource('grid')
  }
}, [map, gridData, tileStates, hoveredTileId])
```

---

## 4. MapControls Component

### MapControls.tsx
**Purpose:** Zoom, reset view, fullscreen buttons

**Props:**
```typescript
interface MapControlsProps {
  map: maplibregl.Map
  className?: string
}
```

**Structure:**
```jsx
<div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
  {/* Zoom In */}
  <button
    onClick={() => map.zoomIn()}
    className="w-10 h-10 rounded-lg bg-white/90 backdrop-blur shadow-lg 
               hover:bg-white transition-all flex items-center justify-center
               border border-slate-200"
    aria-label="Zoom in"
  >
    <ZoomIn className="w-5 h-5 text-slate-700" />
  </button>

  {/* Zoom Out */}
  <button
    onClick={() => map.zoomOut()}
    className="w-10 h-10 rounded-lg bg-white/90 backdrop-blur shadow-lg 
               hover:bg-white transition-all flex items-center justify-center
               border border-slate-200"
    aria-label="Zoom out"
  >
    <ZoomOut className="w-5 h-5 text-slate-700" />
  </button>

  {/* Reset View */}
  <button
    onClick={() => map.flyTo({ center: MAP_CONFIG.center, zoom: MAP_CONFIG.zoom })}
    className="w-10 h-10 rounded-lg bg-white/90 backdrop-blur shadow-lg 
               hover:bg-white transition-all flex items-center justify-center
               border border-slate-200"
    aria-label="Reset view"
  >
    <Maximize2 className="w-5 h-5 text-slate-700" />
  </button>
</div>
```

---

## 5. MapLegend Component

### MapLegend.tsx
**Purpose:** Show status color key

**Structure:**
```jsx
<div className="absolute bottom-4 left-4 z-10 
                backdrop-blur-xl bg-white/90 rounded-2xl 
                shadow-xl border border-slate-200/50 p-4">
  <h3 className="text-sm font-semibold text-slate-900 mb-3">
    Tile Status
  </h3>
  
  <div className="space-y-2">
    {/* Available */}
    <div className="flex items-center gap-2">
      <div className="w-4 h-4 rounded bg-emerald-500/40 border-2 border-emerald-500" />
      <span className="text-sm text-slate-700">Available</span>
    </div>
    
    {/* Reserved */}
    <div className="flex items-center gap-2">
      <div className="w-4 h-4 rounded bg-amber-500/40 border-2 border-amber-500" />
      <span className="text-sm text-slate-700">Reserved</span>
    </div>
    
    {/* Sold */}
    <div className="flex items-center gap-2">
      <div className="w-4 h-4 rounded bg-slate-500/40 border-2 border-slate-500" />
      <span className="text-sm text-slate-700">Sold</span>
    </div>
  </div>
</div>
```

**Responsive:**
- Desktop: Bottom-left corner
- Mobile: Collapsible or hidden by default, expandable button

---

## 6. SidePanel Component

### SidePanel.tsx
**Purpose:** Display tile details and actions

**Props:**
```typescript
interface SidePanelProps {
  isOpen: boolean
  onClose: () => void
  tile: Tile | null
}
```

**Desktop Structure:**
```jsx
<div 
  className={cn(
    "fixed top-0 right-0 h-full w-96 z-40",
    "backdrop-blur-xl bg-white/95 shadow-2xl",
    "border-l border-slate-200/50",
    "transform transition-transform duration-300",
    isOpen ? "translate-x-0" : "translate-x-full"
  )}
>
  {/* Header */}
  <div className="flex items-center justify-between p-6 border-b border-slate-200">
    <h2 className="text-xl font-semibold text-slate-900">
      {tile ? `Tile ${tile.id}` : 'Select a tile'}
    </h2>
    <button
      onClick={onClose}
      className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
      aria-label="Close panel"
    >
      <X className="w-5 h-5 text-slate-600" />
    </button>
  </div>

  {/* Content */}
  <div className="p-6 overflow-y-auto h-[calc(100%-80px)]">
    {tile ? (
      <TileDetails tile={tile} />
    ) : (
      <EmptyState />
    )}
  </div>
</div>
```

**Mobile Structure (Bottom Sheet):**
```jsx
<Sheet open={isOpen} onOpenChange={onClose}>
  <SheetContent 
    side="bottom" 
    className="h-[70vh] rounded-t-3xl"
  >
    <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mb-6" />
    {tile && <TileDetails tile={tile} />}
  </SheetContent>
</Sheet>
```

---

## 7. TileDetails Component

### TileDetails.tsx
**Purpose:** Display comprehensive tile information

**Props:**
```typescript
interface TileDetailsProps {
  tile: Tile
}
```

**Structure:**
```jsx
<div className="space-y-6">
  {/* Status Badge */}
  <div className="flex items-center justify-between">
    <TileStatusBadge status={tile.status} />
    <span className="text-sm text-slate-500">
      {formatDate(tile.reservedAt || tile.soldAt)}
    </span>
  </div>

  {/* Hero Image/Illustration */}
  <div className="relative w-full h-48 rounded-xl overflow-hidden bg-slate-100">
    <Image
      src={`/images/tiles/${tile.id}.jpg`}
      alt={`Tile ${tile.id}`}
      fill
      className="object-cover"
      fallback={<TileIllustration />}
    />
  </div>

  {/* Information Grid */}
  <div className="grid grid-cols-2 gap-4">
    {/* Coordinates */}
    <div className="space-y-1">
      <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
        Coordinates
      </label>
      <p className="text-sm font-mono text-slate-900">
        {tile.coordinates.lat.toFixed(4)}°N
        <br />
        {Math.abs(tile.coordinates.lng).toFixed(4)}°W
      </p>
    </div>

    {/* Tile ID */}
    <div className="space-y-1">
      <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
        Tile ID
      </label>
      <p className="text-sm font-mono text-slate-900">
        {tile.id}
      </p>
    </div>

    {/* Area */}
    <div className="space-y-1">
      <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
        Area
      </label>
      <p className="text-sm text-slate-900">
        1 km² (247 acres)
      </p>
    </div>

    {/* Price */}
    <div className="space-y-1">
      <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
        Price
      </label>
      <p className="text-sm text-slate-900 font-semibold">
        ${(tile.price / 100).toFixed(2)}
      </p>
    </div>
  </div>

  {/* Description */}
  <div className="space-y-2">
    <h3 className="text-sm font-semibold text-slate-900">
      About This Area
    </h3>
    <p className="text-sm text-slate-600 leading-relaxed">
      This symbolic square represents a 1km² section of Yellowstone National Park. 
      Your contribution supports conservation efforts and helps preserve this 
      natural wonder for future generations.
    </p>
  </div>

  {/* Actions */}
  <TileActions tile={tile} />
</div>
```

---

## 8. TileStatusBadge Component

### TileStatusBadge.tsx
**Purpose:** Visual status indicator

**Props:**
```typescript
interface TileStatusBadgeProps {
  status: TileStatus
  size?: 'sm' | 'md' | 'lg'
}
```

**Implementation:**
```typescript
const STATUS_CONFIG = {
  available: {
    label: 'Available',
    color: 'emerald',
    icon: Check,
  },
  reserved: {
    label: 'Reserved',
    color: 'amber',
    icon: Clock,
  },
  sold: {
    label: 'Sold',
    color: 'slate',
    icon: Lock,
  },
} as const

export function TileStatusBadge({ status, size = 'md' }: TileStatusBadgeProps) {
  const config = STATUS_CONFIG[status]
  const Icon = config.icon
  
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  }

  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 rounded-full font-medium',
      `bg-${config.color}-100 text-${config.color}-700 border border-${config.color}-200`,
      sizeClasses[size]
    )}>
      <Icon className="w-3 h-3" />
      {config.label}
    </span>
  )
}
```

---

## 9. TileActions Component

### TileActions.tsx
**Purpose:** Call-to-action buttons based on tile status

**Props:**
```typescript
interface TileActionsProps {
  tile: Tile
  onReserve?: () => void
}
```

**Structure:**
```jsx
<div className="space-y-3 pt-6 border-t border-slate-200">
  {tile.status === 'available' && (
    <>
      {/* Primary CTA */}
      <Button
        onClick={onReserve}
        className="w-full bg-primary-500 hover:bg-primary-600 text-white"
        size="lg"
      >
        Reserve This Square
      </Button>
      
      {/* Secondary Action */}
      <Button
        variant="outline"
        className="w-full"
        onClick={() => window.open('/about', '_blank')}
      >
        Learn More
      </Button>
    </>
  )}

  {tile.status === 'reserved' && (
    <div className="text-center py-4">
      <p className="text-sm text-slate-600 mb-3">
        This tile is currently reserved
      </p>
      <Button
        variant="outline"
        className="w-full"
        disabled
      >
        Not Available
      </Button>
    </div>
  )}

  {tile.status === 'sold' && (
    <div className="text-center py-4">
      <p className="text-sm text-slate-600 mb-3">
        This tile has been sold
      </p>
      <Button
        variant="outline"
        className="w-full"
        onClick={() => router.push('/merch')}
      >
        View Available Tiles
      </Button>
    </div>
  )}
</div>
```

---

## 10. Navigation Component

### Navigation.tsx
**Purpose:** Main menu links

**Props:**
```typescript
interface NavigationProps {
  className?: string
}
```

**Structure:**
```jsx
<nav className={cn("flex items-center gap-8", className)}>
  <NavLink href="/" label="Map" />
  <NavLink href="/about" label="About" />
  <NavLink href="/merch" label="Merch" badge="Soon" />
  <NavLink href="/account" label="Account" />
</nav>
```

**NavLink Component:**
```jsx
function NavLink({ href, label, badge }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={cn(
        "relative text-sm font-medium transition-colors",
        "hover:text-slate-900",
        isActive ? "text-slate-900" : "text-slate-600"
      )}
    >
      {label}
      {badge && (
        <span className="absolute -top-2 -right-8 px-1.5 py-0.5 
                         text-xs bg-amber-100 text-amber-700 rounded-full">
          {badge}
        </span>
      )}
      {isActive && (
        <span className="absolute -bottom-1 left-0 right-0 h-0.5 
                         bg-primary-500 rounded-full" />
      )}
    </Link>
  )
}
```

---

## 11. Skeleton Components

### MapSkeleton.tsx
```jsx
export function MapSkeleton() {
  return (
    <div className="absolute inset-0 bg-slate-100 animate-pulse">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                      text-center space-y-3">
        <Loader2 className="w-8 h-8 text-slate-400 animate-spin mx-auto" />
        <p className="text-sm text-slate-600">Loading map...</p>
      </div>
    </div>
  )
}
```

### TileDetailsSkeleton.tsx
```jsx
export function TileDetailsSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-6 w-24 bg-slate-200 rounded-full" />
        <div className="h-4 w-20 bg-slate-200 rounded" />
      </div>
      
      <div className="h-48 bg-slate-200 rounded-xl" />
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="h-3 w-16 bg-slate-200 rounded" />
          <div className="h-8 w-full bg-slate-200 rounded" />
        </div>
        <div className="space-y-2">
          <div className="h-3 w-16 bg-slate-200 rounded" />
          <div className="h-8 w-full bg-slate-200 rounded" />
        </div>
      </div>
      
      <div className="h-32 bg-slate-200 rounded-lg" />
      <div className="h-12 bg-slate-200 rounded-xl" />
    </div>
  )
}
```

---

## 12. Error Components

### MapError.tsx
```jsx
interface MapErrorProps {
  message: string
  onRetry?: () => void
}

export function MapError({ message, onRetry }: MapErrorProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-slate-50">
      <div className="text-center space-y-4 max-w-md px-6">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center 
                        justify-center mx-auto">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-slate-900">
            Failed to Load Map
          </h3>
          <p className="text-sm text-slate-600">
            {message}
          </p>
        </div>
        
        {onRetry && (
          <Button onClick={onRetry} variant="outline">
            Try Again
          </Button>
        )}
      </div>
    </div>
  )
}
```

---

## Component State Management

### Using Context for Shared State
```typescript
// src/contexts/AppContext.tsx
interface AppContextValue {
  selectedTile: Tile | null
  setSelectedTile: (tile: Tile | null) => void
  hoveredTileId: string | null
  setHoveredTileId: (id: string | null) => void
  isPanelOpen: boolean
  setIsPanelOpen: (open: boolean) => void
  tileData: Map<string, Tile>
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}
```

---

## Component Interaction Flow

```
User clicks tile
    ↓
GridOverlay emits onTileClick(tileId)
    ↓
AppContext updates selectedTile
    ↓
SidePanel receives new tile prop
    ↓
SidePanel slides in with animation
    ↓
TileDetails renders tile information
    ↓
TileActions shows appropriate CTA
    ↓
User clicks "Reserve This Square"
    ↓
(MVP: Show success toast, no real transaction)
```

---

## Responsive Behavior Summary

| Component      | Desktop                  | Mobile                    |
|----------------|--------------------------|---------------------------|
| Header         | Horizontal nav           | Hamburger menu            |
| SidePanel      | Slide from right (384px) | Bottom sheet (70vh)       |
| MapControls    | Top-right corner         | Top-right, smaller        |
| MapLegend      | Bottom-left              | Collapsible button        |
| TileActions    | Full-width buttons       | Sticky bottom buttons     |

---

## Accessibility Requirements

### Keyboard Navigation
- All interactive elements focusable
- Tab order follows visual flow
- Escape key closes panels
- Arrow keys pan map (optional)

### ARIA Labels
```jsx
<button aria-label="Zoom in" />
<div role="region" aria-label="Map view" />
<nav aria-label="Main navigation" />
```

### Screen Reader Support
```jsx
<div aria-live="polite" className="sr-only">
  {selectedTile && `Tile ${selectedTile.id} selected`}
</div>
```

---

## Performance Considerations

### Memoization
```typescript
const GridOverlay = memo(function GridOverlay({ map, gridData }) {
  // Only re-render when map or gridData changes
})
```

### Lazy Loading
```typescript
const SidePanel = dynamic(() => import('@/components/layout/SidePanel'), {
  ssr: false,
})
```

### Virtual Rendering
For large grids (1000+ tiles), consider:
- Clustering at low zoom levels
- Only rendering visible tiles
- Progressive loading