
# Fix Navbar: Close the Gap and Rename Labels

## Problem
The `justify-between` on the inner flex container pushes the logo to the far left edge and the links/buttons to the far right edge of the 680px pill, creating a huge visual gap. The labels also need "For" removed.

## Solution (single file: `src/components/Navbar.tsx`)

### 1. Rename nav labels (line 7-10)
- "For brands" becomes "Brands"
- "For streamers" becomes "Streamers"
- Update both desktop and mobile (mobile uses same `navLinks` array, so one change fixes both)

### 2. Fix the gap between logo and links (line 51)
- Remove `justify-between` from the inner flex container
- Add a `gap-1` so all items (logo, links, divider, buttons) flow together with consistent tight spacing
- The pill already has `px-6` padding, so items will naturally sit together in the center of the bar without being pushed apart

### Technical detail

**Line 8-9**: Change labels:
```
{ href: "/case-studies", label: "Brands" },
{ href: "/streamers", label: "Streamers" },
```

**Line 51**: Change from:
```
flex items-center justify-between w-full h-full
```
To:
```
flex items-center justify-center gap-1 w-full h-full
```

This centers everything as one cohesive group with tight spacing -- logo, links, divider, toggle, and CTA all sit together.
