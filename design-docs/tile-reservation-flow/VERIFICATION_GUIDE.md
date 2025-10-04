# Tile Reservation Flow - Verification Guide

## Quick Test URLs

1. **Main App**: http://localhost:3000
2. **Auth Test Page**: http://localhost:3000/test-auth

---

## ✅ Verification Checklist

### 1. Test Auth Test Page First (http://localhost:3000/test-auth)

This standalone page tests ONLY the authentication system:

- [ ] Page loads without errors
- [ ] Shows "Not signed in" state initially
- [ ] Click "Sign In" button → AuthDialog opens
- [ ] Try signing in with email: `demo@treeple.com`, password: `password123`
- [ ] Dialog closes, toast appears "Signed in successfully!"
- [ ] Avatar with "D" initial appears
- [ ] Email displays: demo@treeple.com
- [ ] Click "Sign Out" → returns to "Not signed in" state

**If this page doesn't work**, the auth system has an issue.

---

### 2. Test Main App (http://localhost:3000)

#### A. Navigation Header
Expected appearance:
```
┌─────────────────────────────────────────────────────┐
│ 🏔️ Treeple     Explore  About  Merch   [Sign In]  │
│    Yellowstone                    Soon              │
└─────────────────────────────────────────────────────┘
```

- [ ] Header has glassomorphism effect (blurred white background)
- [ ] "Explore" is underlined with green bar (active page)
- [ ] "Merch" has amber "Soon" badge
- [ ] "Sign In" button is forest green

#### B. Sign In Flow (Unauthenticated)
1. Click "Sign In" in navigation
   - [ ] AuthDialog opens centered on screen
   - [ ] Dialog has backdrop blur effect
   - [ ] Two tabs visible: "Sign In" and "Sign Up"

2. Sign In Tab (default)
   - [ ] Email field present
   - [ ] Password field present
   - [ ] "Sign In" button is forest green
   - [ ] Small text: "For demo purposes, any email and password (8+ characters) will work"

3. Enter credentials and submit
   - Email: `test@example.com`
   - Password: `password123`
   - [ ] Loading spinner appears on button ("Signing In...")
   - [ ] Dialog closes after ~800ms
   - [ ] Toast notification appears: "Signed in successfully! Welcome back to Treeple."
   - [ ] Navigation updates to show avatar with "T" initial

4. Click avatar
   - [ ] Dropdown menu opens
   - [ ] Shows "Account" header with email
   - [ ] Menu items: Profile, My Tiles, Sign Out
   - [ ] All items have icons

#### C. Sign Up Flow
1. Click "Sign In" → Switch to "Sign Up" tab
   - [ ] Name field (optional)
   - [ ] Email field
   - [ ] Password field
   - [ ] Confirm Password field

2. Fill form and submit
   - Name: `Demo User`
   - Email: `demo@treeple.com`
   - Password: `testpass123`
   - Confirm: `testpass123`
   - [ ] Loading spinner appears ("Creating Account...")
   - [ ] Dialog closes
   - [ ] Toast: "Account created! Welcome to Treeple. You can now reserve tiles."
   - [ ] Avatar appears with "DU" initials

3. Test validation
   - Enter mismatched passwords
   - [ ] Error message: "Passwords don't match"
   - Enter password < 8 chars
   - [ ] Error message: "Password must be at least 8 characters"

#### D. Map Interaction
1. Wait for map to load
   - [ ] Loading spinner disappears
   - [ ] Yellowstone map appears with topography
   - [ ] Grid overlay visible (colored squares)
   - [ ] Green squares = available
   - [ ] Amber squares = reserved
   - [ ] Gray squares = sold

2. Hover over tile
   - [ ] Tile highlights with brighter color
   - [ ] Cursor changes to pointer

3. Click available (green) tile
   - [ ] Side panel slides in from right (desktop)
   - [ ] OR bottom sheet slides up (mobile)
   - [ ] Panel has glassomorphism effect
   - [ ] Shows tile details:
     - Status badge (green "Available")
     - Tile preview image placeholder
     - Coordinates in monospace font
     - Tile ID in monospace font
     - Area: "1 km² (247 acres)"
     - Price: "$50"
     - Description text

#### E. Tile Reservation (Unauthenticated)
1. With panel open, click "Reserve This Square"
   - [ ] AuthDialog opens (not reservation dialog)
   - [ ] Panel remains open in background

2. Sign in through dialog
   - [ ] Dialog closes
   - [ ] Panel still shows same tile
   - [ ] Can now click "Reserve This Square" again

#### F. Tile Reservation (Authenticated)
1. Be signed in, click available tile
   - [ ] Side panel opens with tile details

2. Click "Reserve This Square" button
   - [ ] ReservationDialog opens
   - [ ] Dialog title: "Confirm Reservation"
   - [ ] Subtitle: "Review your tile details before completing the reservation"

3. Check dialog contents
   - [ ] Tile summary card with gradient background (emerald to amber)
   - [ ] Tile ID badge (monospace)
   - [ ] Status badge: "Available" (green)
   - [ ] Coordinates with map pin icon
   - [ ] Price with dollar icon
   - [ ] Area info: "1 km² (247 acres) conservation parcel..."
   - [ ] Gift Message input field (optional)
   - [ ] Character count: max 200
   - [ ] "Cancel" button (outline style)
   - [ ] "Reserve for $50" button (forest green)

4. Add gift message and confirm
   - Type: `For my favorite national park!`
   - Click "Reserve for $50"
   - [ ] Button shows loading spinner ("Reserving...")
   - [ ] After ~1.5s, dialog closes
   - [ ] Toast appears: "Tile Reserved! [TileID] has been reserved. Check your email for confirmation."
   - [ ] Toast duration: 5 seconds

#### G. Reserved/Sold Tiles
1. Click reserved (amber) tile
   - [ ] Panel opens
   - [ ] Status badge: "Reserved" (amber)
   - [ ] Reserve button disabled/not available
   - [ ] Message: "This tile is currently reserved"

2. Click sold (gray) tile
   - [ ] Panel opens
   - [ ] Status badge: "Sold" (gray)
   - [ ] Button: "View Available Tiles"
   - [ ] Message: "This tile has been sold"

---

## 🐛 Common Issues & Fixes

### Issue: Page shows plain HTML, no styling
**Cause:** JavaScript not loading or CSS not applied
**Fix:** Hard refresh (Cmd+Shift+R / Ctrl+Shift+R)

### Issue: "Sign In" button doesn't appear
**Cause:** AuthProvider not wrapping app
**Check:** `app/layout.tsx` should have `<AuthProvider>` wrapper
**Fix:** Already implemented, check browser console for errors

### Issue: Clicking tile doesn't open panel
**Cause:** Grid data not loaded or click handler not attached
**Check Console for:**
- "Loading Treeple data..." message
- "✓ Data loaded successfully: [number] grid tiles"
**Fix:** Run `npm run setup` to generate grid data

### Issue: Auth dialog doesn't open
**Cause:** State not updating or dialog component error
**Check:** Browser console for React errors
**Test:** Try http://localhost:3000/test-auth to isolate auth system

### Issue: Toast notifications don't appear
**Cause:** Toaster component not in layout
**Check:** `app/layout.tsx` has `<Toaster position="top-center" richColors />`
**Fix:** Already implemented

### Issue: Avatar doesn't show after sign in
**Cause:** User state not persisting or component not re-rendering
**Check:** localStorage should have `treeple_user` key after sign in
**Test:** Open browser DevTools → Application → Local Storage → http://localhost:3000

---

## 📱 Mobile Testing

### Responsive Breakpoints
- **Mobile:** < 768px width
- **Desktop:** ≥ 768px width

### Mobile-Specific Features
1. **Navigation**
   - Hidden on mobile (would need hamburger menu - not in MVP)

2. **Side Panel**
   - Becomes bottom sheet
   - Slides up from bottom
   - Covers ~70% of viewport height
   - Swipe handle at top

3. **Dialogs**
   - Centered on screen
   - Max width: 425px
   - Full width on very small screens

---

## 🎨 Visual Design Verification

### Colors
- **Primary Green:** `#4f872b` (buttons, accents)
- **Hover Green:** `#3d6821`
- **Available Tiles:** `emerald-500` (#10b981)
- **Reserved Tiles:** `amber-500` (#f59e0b)
- **Sold Tiles:** `slate-500` (#64748b)

### Glassomorphism Effect
Look for these CSS properties on Header, Dialogs, Panels:
```css
backdrop-filter: blur(24px); /* backdrop-blur-xl */
background-color: rgba(255, 255, 255, 0.95); /* bg-white/95 */
border-radius: 1rem; /* rounded-2xl */
box-shadow: /* large shadow */
```

### Typography
- **Tile IDs & Coordinates:** Monospace font (Geist Mono)
- **Body Text:** Sans-serif (Inter)
- **Buttons:** Medium weight (500)

---

## 🔧 Developer Tools Checks

### React DevTools
1. Install React DevTools extension
2. Inspect component tree:
   ```
   RootLayout
   └─ AuthProvider ✅
      └─ Home (page.tsx)
         ├─ Header
         │  ├─ Logo
         │  └─ Navigation ✅ (should show user state)
         ├─ MapContainer
         └─ SidePanel
            └─ TileDetails
               └─ TileActions ✅ (auth integration)
   ```

3. Check AuthProvider state:
   - `user`: null or {email, name}
   - `isLoading`: false
   - `signIn`, `signUp`, `signOut`: functions

### Network Tab
1. Open DevTools → Network
2. Reload page
3. Look for:
   - `yellowstone-grid.json` (12MB, status 200)
   - `seed-tiles.json` (small, status 200)
4. No failed requests for components

### Console Tab
Expected messages:
```
Loading Treeple data...
✓ Data loaded successfully: 2304 grid tiles, 2304 in tile map
```

No errors should appear.

---

## ✨ Success Criteria

All of these should work:
- ✅ Auth test page fully functional
- ✅ Main app navigation shows Sign In button
- ✅ Clicking Sign In opens auth dialog
- ✅ Sign in form validation works
- ✅ After sign in, avatar appears with dropdown
- ✅ Map loads with grid overlay
- ✅ Clicking tile opens side panel with details
- ✅ Unauthenticated: Reserve button opens auth dialog
- ✅ Authenticated: Reserve button opens reservation dialog
- ✅ Reservation confirms with toast notification
- ✅ Sign out works and returns to unauthenticated state
- ✅ All interactions feel smooth (no lag)
- ✅ Design matches glassomorphism aesthetic

---

## 📞 Support

If none of the above works:
1. Check browser console for errors (F12 → Console tab)
2. Verify all files exist (see IMPLEMENTATION_SUMMARY.md)
3. Ensure dev server is running: `npm run dev`
4. Try test page first: http://localhost:3000/test-auth
5. Check git status: files may have been modified incorrectly
