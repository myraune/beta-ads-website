
# Fix Navbar Spacing

## Problem
The desktop navbar has uneven spacing between its three sections (logo, nav links, right-side buttons). The `justify-between` layout creates inconsistent gaps because the three groups have different widths.

## Solution
Change the desktop navbar to use a properly balanced layout:

1. Make the nav links absolutely centered in the bar
2. Pin the logo to the left and CTA to the right
3. Increase `gap` between nav link items from `gap-1` to `gap-2` for better breathing room

### Technical detail

**File: `src/components/Navbar.tsx`**

- Change the inner flex container (line 51) to use `relative` positioning
- Make the nav links div (line 60) absolutely centered: `absolute left-1/2 -translate-x-1/2`
- Increase nav link gap from `gap-1` to `gap-2`
- Keep logo and right-side CTA as `justify-between` at the edges

This ensures the navigation links are always perfectly centered in the bar, with logo and CTA symmetrically placed at each end regardless of content width.
