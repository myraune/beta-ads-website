
# Fix Navbar - Make It Compact

## Problem
The `flex-1` on the logo and button columns pushes the logo far left and the button far right, creating a huge gap between the icon and the nav links. The navbar should feel like one tight, cohesive bar.

## Solution
Drop the three-column `flex-1` layout. Instead, use a single flex row with a small gap between all items: logo, links, and buttons. The logo stays left, everything else flows naturally with consistent spacing.

**File: `src/components/Navbar.tsx`**

Replace the inner layout (lines 51-99) with:

```
<div className="flex items-center justify-between w-full h-full">
  {/* Logo */}
  <Link to="/" className="flex items-center group">
    <img src="/lovable-uploads/favicon.png" alt="Beta Ads" className="h-6 w-auto" />
  </Link>

  {/* Nav links + actions together on the right */}
  <div className="flex items-center gap-1">
    {navLinks...}
    <div className="w-px h-4 bg-foreground/10 mx-2" />  <!-- subtle divider -->
    {theme toggle}
    {Book a Demo button}
  </div>
</div>
```

Key changes:
- Remove all `flex-1` wrappers -- no more three columns
- Logo on the left via `justify-between`
- Nav links, theme toggle, and CTA button grouped together on the right with tight `gap-1` spacing
- A subtle 1px vertical divider separates nav links from action buttons
- Reduce logo from `h-7` to `h-6` for better proportion
- Reduce pill max-width from `960px` to `680px` to keep it compact

This gives a compact, proportional navbar where nothing is far apart.
