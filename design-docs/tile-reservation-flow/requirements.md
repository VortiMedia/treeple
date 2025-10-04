# Feature: Tile Reservation Flow (Full User Journey)

## Components Required:

### Navigation & Account
- navigation-menu (top menu bar for site navigation)
- dropdown-menu (account dropdown with sign-in/profile options)
- avatar (user profile picture in header)
- button (sign-in CTA, navigation actions)

### Tile Details Panel
- card (tile details container with glassomorphism styling)
- badge (status indicator: available/reserved/sold)
- button (primary CTA: "Reserve This Square")
- separator (dividing sections in tile details)

### Reservation Flow
- dialog (confirmation modal for reservation action)
- form (sign-in/sign-up form if not authenticated)
- input (email, password fields)
- label (form field labels)
- toast (sonner - success/error feedback after reservation)

## Full User Journey Hierarchy:
```
Page Layout
├── Header
│   ├── Logo
│   ├── NavigationMenu
│   │   ├── NavigationMenuItem (Home)
│   │   ├── NavigationMenuItem (About)
│   │   ├── NavigationMenuItem (Merch)
│   │   └── NavigationMenuItem (How It Works)
│   └── DropdownMenu (Account)
│       ├── DropdownMenuTrigger
│       │   └── Avatar (User Profile)
│       └── DropdownMenuContent
│           ├── DropdownMenuItem (Profile)
│           ├── DropdownMenuItem (My Tiles)
│           ├── DropdownMenuSeparator
│           └── DropdownMenuItem (Sign Out)
│
├── MapContainer (Main Content)
│   └── GridOverlay (Interactive Tiles)
│
└── SidePanel/Sheet (Tile Details)
    └── Card (Tile Details Panel)
        ├── Badge (Status Indicator)
        ├── Separator
        ├── CoordinateDisplay
        │   └── Badge (coordinate labels)
        ├── Separator
        ├── PriceDisplay
        └── Button (Reserve CTA)
            └── Dialog (Reservation Confirmation)
                ├── DialogHeader
                │   └── DialogTitle
                ├── DialogDescription
                ├── Form (If Not Authenticated)
                │   ├── FormField (Email)
                │   │   ├── Label
                │   │   └── Input
                │   └── FormField (Password)
                │       ├── Label
                │       └── Input
                └── DialogFooter
                    ├── Button (Cancel)
                    └── Button (Confirm Reservation)

Toast (Post-action feedback)
```

## Design Requirements:
- **Glassomorphism**: backdrop-blur-xl, bg-white/90, large border radius (rounded-2xl)
- **Colors**:
  - Available: emerald-500
  - Reserved: amber-500
  - Sold: slate-500
  - Primary CTA: forest green (#4f872b)
- **Responsive**: Side panel (desktop) vs bottom sheet (mobile)
- **Animations**: Smooth slide-in transitions, hover states

## User Flow:

### Unauthenticated User:
1. User lands on homepage → sees NavigationMenu with "Sign In" button
2. User clicks available tile → SidePanel/Sheet slides in with tile details
3. User reviews status badge, coordinates, price
4. User clicks "Reserve This Square" button
5. Dialog opens with sign-in form (email/password inputs)
6. User signs in or creates account
7. Reservation confirmed → Toast shows success message
8. DropdownMenu now shows Avatar with account options
9. Card updates to show "Reserved" status

### Authenticated User:
1. User sees Avatar in header → can access DropdownMenu (Profile, My Tiles, Sign Out)
2. User clicks available tile → SidePanel/Sheet slides in with tile details
3. User reviews status badge, coordinates, price
4. User clicks "Reserve This Square" button
5. Dialog opens confirming reservation details (no sign-in needed)
6. User confirms → Toast shows success message
7. Card updates to show "Reserved" status
8. User can view reserved tiles via "My Tiles" in DropdownMenu

## Acceptance Criteria:
- Card has premium glassomorphic appearance
- Badge colors match design system
- Button disabled for sold/reserved tiles
- Dialog prevents accidental reservations
- Toast auto-dismisses after 3 seconds
- All interactions < 100ms response time
