# Component Research: Tile Reservation Flow

## Installation:

### Core Components (Already Installed):
```bash
# Already available in project
button, sheet, skeleton
```

### New Components Needed:
```bash
npx shadcn@latest add @shadcn/card @shadcn/badge @shadcn/dialog @shadcn/sonner @shadcn/separator @shadcn/dropdown-menu @shadcn/navigation-menu @shadcn/input @shadcn/avatar @shadcn/label @shadcn/form
```

---

## Component: Card

**Purpose:** Container for tile details panel with glassomorphism styling

**Dependencies:** None

**Key Props:**
- `className` - for custom styling (glassomorphism effects)

**Key Subcomponents:**
- `CardHeader` - Top section with title
- `CardTitle` - Main heading
- `CardDescription` - Subtitle/description text
- `CardContent` - Main content area
- `CardFooter` - Bottom section with actions
- `CardAction` - Action link in header

**Example Implementation:**
```tsx
<Card className="w-full max-w-sm backdrop-blur-xl bg-white/90 rounded-2xl">
  <CardHeader>
    <CardTitle>Tile YS-042-123</CardTitle>
    <CardDescription>1km² Conservation Parcel</CardDescription>
  </CardHeader>
  <CardContent>
    <div className="space-y-4">
      {/* Tile details content */}
    </div>
  </CardContent>
  <CardFooter>
    <Button className="w-full">Reserve This Square</Button>
  </CardFooter>
</Card>
```

**Treeple Customization:**
- Add `backdrop-blur-xl bg-white/90` for glassomorphism
- Use `rounded-2xl` or `rounded-3xl` for soft feel
- Apply shadow effects: `shadow-2xl`

---

## Component: Badge

**Purpose:** Status indicators (Available, Reserved, Sold) and coordinate labels

**Dependencies:** `@radix-ui/react-slot`

**Key Props:**
- `variant` - "default" | "secondary" | "destructive" | "outline"
- `className` - for custom colors

**Example Implementation:**
```tsx
// Status badges
<Badge variant="secondary" className="bg-emerald-500 text-white">
  Available
</Badge>
<Badge variant="secondary" className="bg-amber-500 text-white">
  Reserved
</Badge>
<Badge variant="secondary" className="bg-slate-500 text-white">
  Sold
</Badge>

// Coordinate labels
<Badge variant="outline" className="font-mono text-xs">
  44.5678°N, -110.1234°W
</Badge>
```

**Treeple Customization:**
- Available: `bg-emerald-500 text-white dark:bg-emerald-600`
- Reserved: `bg-amber-500 text-white dark:bg-amber-600`
- Sold: `bg-slate-500 text-white dark:bg-slate-600`
- Use with icons: `<BadgeCheckIcon />` from lucide-react

---

## Component: Button

**Purpose:** Primary CTA actions (Reserve, Sign In, Confirm, Cancel)

**Dependencies:** `@radix-ui/react-slot`

**Key Props:**
- `variant` - "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
- `size` - "default" | "sm" | "lg" | "icon"
- `disabled` - boolean
- `asChild` - render as child component

**Example Implementation:**
```tsx
// Primary CTA (Reserve button)
<Button className="w-full bg-[#4f872b] hover:bg-[#3d6821]">
  Reserve This Square
</Button>

// Secondary action
<Button variant="outline">
  Cancel
</Button>

// Disabled state (sold tiles)
<Button disabled className="w-full">
  Sold Out
</Button>
```

**Treeple Customization:**
- Primary: Use forest green `#4f872b`
- Ensure min touch target: `min-h-[44px] min-w-[44px]`
- Add loading state with spinner for async actions

---

## Component: Dialog

**Purpose:** Confirmation modal for reservation and sign-in flow

**Dependencies:** `@radix-ui/react-dialog`

**Key Props:**
- `open` - controlled state
- `onOpenChange` - callback for state changes

**Key Subcomponents:**
- `DialogTrigger` - Opens the dialog
- `DialogContent` - Modal container
- `DialogHeader` - Top section
- `DialogTitle` - Modal heading
- `DialogDescription` - Subtitle text
- `DialogFooter` - Bottom actions
- `DialogClose` - Close button

**Example Implementation:**
```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Reserve This Square</Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>Confirm Reservation</DialogTitle>
      <DialogDescription>
        You're about to reserve tile YS-042-123 for $50.
      </DialogDescription>
    </DialogHeader>
    <div className="grid gap-4 py-4">
      {/* Form content if needed */}
    </div>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">Cancel</Button>
      </DialogClose>
      <Button type="submit">Confirm Reservation</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

**Treeple Customization:**
- Add glassomorphism to `DialogContent`
- Use for both confirmation and sign-in flows
- Include loading states during reservation processing

---

## Component: Sonner (Toast)

**Purpose:** Success/error feedback after reservation actions

**Dependencies:** `sonner`, `next-themes`

**Key Props (via `toast()` function):**
- `description` - Additional message text
- `action` - Action button config
- `duration` - Auto-dismiss time (default 3s)

**Example Implementation:**
```tsx
"use client"

import { toast } from "sonner"

// Success toast
toast("Reservation Confirmed!", {
  description: "Tile YS-042-123 has been reserved.",
  action: {
    label: "View My Tiles",
    onClick: () => router.push("/account"),
  },
})

// Error toast
toast.error("Reservation Failed", {
  description: "This tile is no longer available.",
})
```

**Setup Required:**
```tsx
// In app/layout.tsx
import { Toaster } from "@/components/ui/sonner"

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
```

**Treeple Customization:**
- Position: `position="top-center"` for better visibility
- Theme: Match glassomorphism design
- Duration: 4000ms for important messages

---

## Component: Separator

**Purpose:** Visual dividers between tile detail sections

**Dependencies:** `@radix-ui/react-separator`

**Key Props:**
- `orientation` - "horizontal" | "vertical"
- `decorative` - boolean (for accessibility)

**Example Implementation:**
```tsx
<div className="space-y-4">
  <Badge>Available</Badge>

  <Separator />

  <div>
    <p className="text-sm text-muted-foreground">Coordinates</p>
    <p className="font-mono">44.5678°N, -110.1234°W</p>
  </div>

  <Separator />

  <div>
    <p className="text-sm text-muted-foreground">Price</p>
    <p className="text-2xl font-bold">$50</p>
  </div>
</div>
```

**Treeple Customization:**
- Use subtle color: `bg-slate-200 dark:bg-slate-800`
- Adjust spacing: `my-4` or `my-6`

---

## Component: Dropdown Menu

**Purpose:** Account menu in header (Profile, My Tiles, Sign Out)

**Dependencies:** `@radix-ui/react-dropdown-menu`

**Key Props:**
- `open`, `onOpenChange` - controlled state

**Key Subcomponents:**
- `DropdownMenuTrigger` - Button to open menu
- `DropdownMenuContent` - Menu container
- `DropdownMenuLabel` - Section label
- `DropdownMenuItem` - Menu item
- `DropdownMenuSeparator` - Divider
- `DropdownMenuGroup` - Group items
- `DropdownMenuShortcut` - Keyboard shortcuts

**Example Implementation:**
```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
      <Avatar>
        <AvatarImage src={user.image} />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56" align="end">
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuGroup>
      <DropdownMenuItem>Profile</DropdownMenuItem>
      <DropdownMenuItem>My Tiles</DropdownMenuItem>
      <DropdownMenuItem>Settings</DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Sign Out</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

**Treeple Customization:**
- Add glassomorphism to `DropdownMenuContent`
- Position: `align="end"` to align with avatar
- Add icons from lucide-react

---

## Component: Navigation Menu

**Purpose:** Top navigation bar for site sections

**Dependencies:** `@radix-ui/react-navigation-menu`

**Key Props:**
- `viewport` - boolean (enable viewport portal)

**Key Subcomponents:**
- `NavigationMenuList` - Container for menu items
- `NavigationMenuItem` - Individual menu item
- `NavigationMenuTrigger` - Dropdown trigger
- `NavigationMenuContent` - Dropdown content
- `NavigationMenuLink` - Link component

**Example Implementation:**
```tsx
<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuLink href="/" className={navigationMenuTriggerStyle()}>
        Home
      </NavigationMenuLink>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink href="/about" className={navigationMenuTriggerStyle()}>
        About
      </NavigationMenuLink>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink href="/merch" className={navigationMenuTriggerStyle()}>
        Merch
      </NavigationMenuLink>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuTrigger>How It Works</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[300px] gap-3 p-4">
          <li>
            <NavigationMenuLink href="/how-it-works">
              <div className="font-medium">Conservation Model</div>
              <p className="text-sm text-muted-foreground">
                Learn about our approach
              </p>
            </NavigationMenuLink>
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```

**Treeple Customization:**
- Keep simple for MVP (no complex dropdowns)
- Use Next.js Link component: `<Link href="...">`
- Mobile: Consider hamburger menu for small screens

---

## Component: Input

**Purpose:** Form fields for email, password in sign-in flow

**Dependencies:** None

**Key Props:**
- `type` - "text" | "email" | "password" | etc.
- `placeholder` - Hint text
- `disabled` - boolean
- Standard HTML input props

**Example Implementation:**
```tsx
<div className="grid gap-2">
  <Label htmlFor="email">Email</Label>
  <Input
    id="email"
    type="email"
    placeholder="you@example.com"
    required
  />
</div>

<div className="grid gap-2">
  <Label htmlFor="password">Password</Label>
  <Input
    id="password"
    type="password"
    placeholder="••••••••"
    required
  />
</div>
```

**Treeple Customization:**
- Ensure good contrast for accessibility
- Add focus ring: `focus-visible:ring-2 focus-visible:ring-[#4f872b]`
- Min touch target height: `h-11` or `h-12`

---

## Component: Label

**Purpose:** Accessible labels for form fields

**Dependencies:** `@radix-ui/react-label`

**Key Props:**
- `htmlFor` - Associates with input ID
- Standard label props

**Example Implementation:**
```tsx
<Label htmlFor="email" className="text-sm font-medium">
  Email Address
</Label>
<Input id="email" type="email" />
```

**Treeple Customization:**
- Use consistent text size: `text-sm`
- Pair with FormMessage for validation errors

---

## Component: Form

**Purpose:** Form management with validation (react-hook-form + zod)

**Dependencies:** `react-hook-form`, `@hookform/resolvers/zod`, `zod`

**Key Subcomponents:**
- `Form` - Form context provider
- `FormField` - Controlled field wrapper
- `FormItem` - Field container
- `FormLabel` - Field label
- `FormControl` - Input wrapper
- `FormDescription` - Helper text
- `FormMessage` - Validation error display

**Example Implementation:**
```tsx
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export function SignInForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Handle sign-in
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Sign In
        </Button>
      </form>
    </Form>
  )
}
```

**Treeple Customization:**
- Use for sign-in/sign-up forms in Dialog
- Validation schema: email format, password min length
- Error messages: Show below fields with FormMessage
- Success handling: Close dialog, show toast, update UI

---

## Component: Avatar

**Purpose:** User profile picture in header dropdown

**Dependencies:** `@radix-ui/react-avatar`

**Key Props:**
- None specific, uses subcomponents

**Key Subcomponents:**
- `Avatar` - Container
- `AvatarImage` - Profile image
- `AvatarFallback` - Initials/placeholder when no image

**Example Implementation:**
```tsx
<Avatar className="h-10 w-10">
  <AvatarImage src={user.image} alt={user.name} />
  <AvatarFallback className="bg-[#4f872b] text-white">
    {user.name?.charAt(0) || "U"}
  </AvatarFallback>
</Avatar>
```

**Treeple Customization:**
- Fallback: Use forest green background `bg-[#4f872b]`
- Size: `h-10 w-10` for header, `h-20 w-20` for profile page
- Border: Optional `ring-2 ring-slate-200`

---

## Design System Integration

### Glassomorphism Effects:
```css
.glass-card {
  @apply backdrop-blur-xl bg-white/90 dark:bg-slate-950/90;
  @apply rounded-2xl shadow-2xl;
  @apply border border-white/20 dark:border-slate-800/20;
}
```

### Color Palette:
```tsx
// Primary Conservation Green
const colors = {
  primary: "#4f872b",
  primaryHover: "#3d6821",

  // Status Colors
  available: "emerald-500",
  reserved: "amber-500",
  sold: "slate-500",

  // Neutrals (Tailwind Slate)
  neutral: "slate-{50-950}",
}
```

### Responsive Breakpoints:
```tsx
// Mobile: < 768px (use Sheet for bottom panel)
// Desktop: >= 768px (use side panel)

<div className="md:hidden">
  <Sheet>{/* Mobile bottom sheet */}</Sheet>
</div>

<div className="hidden md:block">
  <Card>{/* Desktop side panel */}</Card>
</div>
```

---

## Next Steps

1. **Install all components:**
   ```bash
   npx shadcn@latest add @shadcn/card @shadcn/badge @shadcn/dialog @shadcn/sonner @shadcn/separator @shadcn/dropdown-menu @shadcn/navigation-menu @shadcn/input @shadcn/avatar @shadcn/label @shadcn/form
   ```

2. **Set up form validation:**
   ```bash
   npm install react-hook-form @hookform/resolvers/zod zod
   ```

3. **Add Toaster to layout:**
   - Import `Toaster` from `@/components/ui/sonner`
   - Add `<Toaster />` to root layout

4. **Create custom wrapper components:**
   - `GlassCard` - Card with glassomorphism preset
   - `TileStatusBadge` - Badge with status-specific colors
   - `ReservationDialog` - Dialog with form for reservation flow
   - `AccountDropdown` - DropdownMenu with user-specific actions

5. **Implement authentication flow:**
   - Sign-in form in Dialog
   - State management for user session
   - Protected routes for account pages

6. **Test responsive behavior:**
   - Mobile: Bottom sheets, hamburger menu
   - Desktop: Side panels, horizontal navigation
   - Touch targets: Min 44x44px
   - Performance: Smooth 60fps animations
