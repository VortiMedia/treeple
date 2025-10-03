# Design System
## Treeple Platform

### Version 1.0 | Style Guide & Component Library (Yellowstone Theme)

---

## Design Philosophy

**"Modern Conservation Glassomorphism"**

We blend natural, earthy tones with contemporary glass-effect UI to create a premium experience that feels both grounded in nature and cutting-edge in technology. This design philosophy is theme-agnostic and can be adapted for different conservation areas.

### Core Principles
1. **Clarity** - Information is easy to parse at a glance
2. **Elegance** - Generous spacing, large radii, subtle shadows
3. **Nature-inspired** - Colors drawn from natural landscapes (Yellowstone for MVP)
4. **Trust** - Professional, polished, confidence-inspiring
5. **Accessibility** - WCAG AA compliant throughout
6. **Themeable** - Design system supports area-specific color schemes

---

## Color Palette

### Primary Colors
```css
/* Forest Green - Conservation, Nature */
--primary-50:  #f0f7ed;
--primary-100: #e0efd9;
--primary-200: #c1dfb3;
--primary-300: #96c77d;
--primary-400: #6fa94d;
--primary-500: #4f872b; /* Main brand color */
--primary-600: #3d6b1f;
--primary-700: #2f521a;
--primary-800: #294218;
--primary-900: #223717;

/* Use primary-500 for main CTA buttons */
/* Use primary-600 for hover states */
```

### Secondary Colors
```css
/* Warm Amber - Premium, Gift-worthy */
--secondary-50:  #fef9f3;
--secondary-100: #fdf2e3;
--secondary-200: #fae3c1;
--secondary-300: #f6cf95;
--secondary-400: #f1b365;
--secondary-500: #d4a574; /* Main secondary */
--secondary-600: #b88642;
--secondary-700: #936838;
--secondary-800: #785432;
--secondary-900: #62472c;
```

### Neutral Colors (Slate)
```css
/* Use Tailwind's slate scale */
--slate-50:  #f8fafc;
--slate-100: #f1f5f9;
--slate-200: #e2e8f0;
--slate-300: #cbd5e1;
--slate-400: #94a3b8;
--slate-500: #64748b;
--slate-600: #475569;
--slate-700: #334155;
--slate-800: #1e293b;
--slate-900: #0f172a;
--slate-950: #020617;
```

### Semantic Colors
```css
/* Success (Available Tiles) */
--success: #10b981; /* emerald-500 */
--success-light: #d1fae5; /* emerald-100 */

/* Warning (Reserved Tiles) */
--warning: #f59e0b; /* amber-500 */
--warning-light: #fef3c7; /* amber-100 */

/* Error */
--error: #ef4444; /* red-500 */
--error-light: #fee2e2; /* red-100 */

/* Info */
--info: #3b82f6; /* blue-500 */
--info-light: #dbeafe; /* blue-100 */
```

### Tile State Colors
```css
/* Available Tile */
.tile-available {
  fill: rgba(16, 185, 129, 0.2); /* emerald with transparency */
  stroke: rgba(16, 185, 129, 0.6);
  stroke-width: 1.5px;
}

.tile-available:hover {
  fill: rgba(16, 185, 129, 0.4);
  stroke: rgba(16, 185, 129, 0.9);
  stroke-width: 2px;
}

/* Reserved Tile */
.tile-reserved {
  fill: rgba(245, 158, 11, 0.2); /* amber */
  stroke: rgba(245, 158, 11, 0.6);
  stroke-width: 1.5px;
}

/* Sold Tile */
.tile-sold {
  fill: rgba(100, 116, 139, 0.3); /* slate-500 */
  stroke: rgba(100, 116, 139, 0.7);
  stroke-width: 1.5px;
  pointer-events: none; /* Not clickable */
}
```

---

## Typography

### Font Families
```css
/* Primary Font Stack */
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Monospace (for IDs, coordinates) */
--font-mono: 'Geist Mono', 'JetBrains Mono', 'Fira Code', monospace;
```

### Font Sizes
```css
/* Tailwind scale - use these classes */
.text-xs    /* 0.75rem / 12px */
.text-sm    /* 0.875rem / 14px */
.text-base  /* 1rem / 16px */
.text-lg    /* 1.125rem / 18px */
.text-xl    /* 1.25rem / 20px */
.text-2xl   /* 1.5rem / 24px */
.text-3xl   /* 1.875rem / 30px */
.text-4xl   /* 2.25rem / 36px */
.text-5xl   /* 3rem / 48px */
```

### Type Scale Usage
- **Headings H1:** `text-4xl md:text-5xl font-bold tracking-tight`
- **Headings H2:** `text-3xl md:text-4xl font-semibold`
- **Headings H3:** `text-2xl md:text-3xl font-semibold`
- **Headings H4:** `text-xl md:text-2xl font-medium`
- **Body Large:** `text-lg font-normal leading-relaxed`
- **Body:** `text-base font-normal leading-normal`
- **Body Small:** `text-sm font-normal`
- **Caption:** `text-xs font-medium uppercase tracking-wide`

### Font Weights
```css
.font-normal    /* 400 */
.font-medium    /* 500 */
.font-semibold  /* 600 */
.font-bold      /* 700 */
```

---

## Spacing & Layout

### Spacing Scale (Tailwind)
```
0.5 = 2px   | 4  = 16px  | 12 = 48px
1   = 4px   | 5  = 20px  | 16 = 64px
1.5 = 6px   | 6  = 24px  | 20 = 80px
2   = 8px   | 8  = 32px  | 24 = 96px
3   = 12px  | 10 = 40px  | 32 = 128px
```

### Layout Patterns
- **Container max-width:** `max-w-7xl` (1280px)
- **Side panel width:** `w-96` (384px) desktop, full-width mobile
- **Header height:** `h-16` (64px)
- **Card padding:** `p-6` (24px)
- **Button padding:** `px-6 py-3` (24px × 12px)
- **Section spacing:** `space-y-8` (32px vertical gap)

### Responsive Breakpoints
```css
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
2xl: 1536px /* Extra large */
```

---

## Components

### Glass Panel
```jsx
<div className="
  backdrop-blur-xl 
  bg-white/80 
  rounded-3xl 
  shadow-2xl 
  border border-white/20
  p-6
">
  {/* Content */}
</div>
```

**Usage:** Side panel, modals, cards

### Buttons

#### Primary Button
```jsx
<button className="
  bg-primary-500 
  hover:bg-primary-600 
  text-white 
  font-medium 
  px-6 py-3 
  rounded-xl 
  shadow-lg 
  hover:shadow-xl
  transition-all duration-300
  active:scale-95
">
  Reserve This Square
</button>
```

#### Secondary Button
```jsx
<button className="
  bg-white 
  hover:bg-slate-50 
  text-slate-700 
  font-medium 
  px-6 py-3 
  rounded-xl 
  border border-slate-200
  shadow-md 
  hover:shadow-lg
  transition-all duration-300
">
  Learn More
</button>
```

#### Ghost Button
```jsx
<button className="
  text-slate-600 
  hover:text-slate-900 
  font-medium 
  px-4 py-2 
  rounded-lg 
  hover:bg-slate-100
  transition-all duration-200
">
  Cancel
</button>
```

### Status Badges

#### Available Badge
```jsx
<span className="
  inline-flex items-center gap-1.5
  px-3 py-1 
  rounded-full 
  bg-emerald-100 
  text-emerald-700 
  text-sm font-medium
  border border-emerald-200
">
  <div className="w-2 h-2 rounded-full bg-emerald-500" />
  Available
</span>
```

#### Reserved Badge
```jsx
<span className="
  inline-flex items-center gap-1.5
  px-3 py-1 
  rounded-full 
  bg-amber-100 
  text-amber-700 
  text-sm font-medium
  border border-amber-200
">
  <div className="w-2 h-2 rounded-full bg-amber-500" />
  Reserved
</span>
```

#### Sold Badge
```jsx
<span className="
  inline-flex items-center gap-1.5
  px-3 py-1 
  rounded-full 
  bg-slate-200 
  text-slate-700 
  text-sm font-medium
  border border-slate-300
">
  <div className="w-2 h-2 rounded-full bg-slate-500" />
  Sold
</span>
```

### Cards

#### Tile Details Card
```jsx
<div className="
  backdrop-blur-xl 
  bg-white/90 
  rounded-2xl 
  shadow-xl 
  border border-slate-200/50
  overflow-hidden
">
  <div className="p-6 space-y-4">
    {/* Header with badge */}
    <div className="flex items-start justify-between">
      <h3 className="text-2xl font-semibold text-slate-900">
        Tile YS-001-045
      </h3>
      {/* Status badge */}
    </div>
    
    {/* Content */}
    <div className="space-y-3 text-slate-600">
      {/* Details */}
    </div>
    
    {/* Footer with CTA */}
    <div className="pt-4 border-t border-slate-200">
      {/* Button */}
    </div>
  </div>
</div>
```

---

## Animations & Transitions

### Standard Transitions
```css
/* Default smooth transition */
.transition-all { transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1); }

/* Fast transitions (hover) */
.transition-fast { transition: all 150ms ease-out; }

/* Slow transitions (panels) */
.transition-slow { transition: all 500ms cubic-bezier(0.4, 0, 0.2, 1); }
```

### Common Animations
```css
/* Fade in */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Slide in from right */
@keyframes slideInRight {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}

/* Slide in from bottom (mobile) */
@keyframes slideInBottom {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}

/* Pulse (hover highlight) */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}
```

### Usage Examples
```jsx
/* Panel entrance */
<div className="animate-in slide-in-from-right duration-300">

/* Hover scale */
<button className="hover:scale-105 transition-transform">

/* Loading skeleton */
<div className="animate-pulse bg-slate-200 rounded">
```

---

## Shadows

### Shadow Scale
```css
.shadow-sm    /* Subtle lift */
.shadow       /* Standard card shadow */
.shadow-md    /* Raised element */
.shadow-lg    /* Prominent card */
.shadow-xl    /* Floating panel */
.shadow-2xl   /* Modal, drawer */
```

### Custom Shadows
```css
/* Glass effect shadow */
--shadow-glass: 
  0 8px 32px rgba(0, 0, 0, 0.08),
  0 2px 8px rgba(0, 0, 0, 0.04);

/* Elevated shadow */
--shadow-elevated:
  0 20px 50px rgba(0, 0, 0, 0.12),
  0 10px 20px rgba(0, 0, 0, 0.08);
```

---

## Border Radius

```css
.rounded-none   /* 0px */
.rounded-sm     /* 2px */
.rounded        /* 4px */
.rounded-md     /* 6px */
.rounded-lg     /* 8px */
.rounded-xl     /* 12px */
.rounded-2xl    /* 16px */
.rounded-3xl    /* 24px */
.rounded-full   /* 9999px */
```

**Recommendations:**
- Buttons: `rounded-xl`
- Cards: `rounded-2xl`
- Panels: `rounded-3xl`
- Badges: `rounded-full`
- Images: `rounded-lg`

---

## Icons

### Library: Lucide React
```jsx
import { 
  MapPin, 
  ZoomIn, 
  ZoomOut, 
  Maximize2,
  Info,
  Check,
  X,
  Menu,
  User,
  ShoppingBag
} from 'lucide-react'
```

### Icon Sizes
- **Small:** `size={16}` - Inline text, badges
- **Medium:** `size={20}` - Buttons, list items
- **Large:** `size={24}` - Headers, feature cards

### Icon Colors
```jsx
/* Inherit text color */
<MapPin className="text-slate-600" />

/* Brand color */
<Check className="text-primary-500" />

/* Muted */
<Info className="text-slate-400" />
```

---

## Accessibility

### Focus States
```css
/* Visible focus ring */
.focus-visible:ring-2 
.focus-visible:ring-primary-500 
.focus-visible:ring-offset-2
```

### Contrast Requirements
- Normal text: 4.5:1 minimum
- Large text (18px+): 3:1 minimum
- Interactive elements: 3:1 minimum

### Touch Targets
- Minimum size: 44×44px
- Spacing between targets: 8px minimum

### Motion Preferences
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Dark Mode (Future)

```css
/* Prepared for dark mode toggle */
.dark {
  --background: var(--slate-900);
  --foreground: var(--slate-100);
  --primary: var(--primary-400);
  /* ... */
}
```

---

## Theme Customization (Future)

For deploying Treeple to other conservation areas:
1. **Color Palette:** Define new primary/secondary colors based on area's natural landscape
2. **Tile Colors:** Customize available/reserved/sold colors to match theme
3. **Imagery:** Update hero images, backgrounds, and map styles
4. **Typography:** Maintain Inter but adjust weights/scales if needed
5. **Logo/Branding:** Area-specific logos while maintaining Treeple platform identity

The current Yellowstone theme uses forest greens and warm ambers. Future themes might use ocean blues (marine reserves), desert oranges (national monuments), or alpine whites (mountain ranges).

---

## Component Checklist

When building components, ensure:
- [ ] Responsive on mobile, tablet, desktop
- [ ] Touch-friendly (44px targets)
- [ ] Keyboard accessible
- [ ] Screen reader labels
- [ ] Loading states
- [ ] Error states
- [ ] Empty states
- [ ] Smooth transitions
- [ ] Consistent spacing
- [ ] Proper color contrast
- [ ] Theme-agnostic implementation (use CSS variables)