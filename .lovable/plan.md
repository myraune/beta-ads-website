

# Fix Glow Seams on Nordic Map Hover

## The Bug
When hovering a country, the `drop-shadow` filter is applied to each individual SVG `<path>`. Countries like Norway have 4 separate path segments (mainland + islands). The glow renders independently per path, creating visible cuts and strange edges where paths overlap or meet.

## The Fix

**File: `src/components/sections/MarketsSection.tsx`** (lines ~109-131)

Move the `filter: drop-shadow(...)` from the individual `<path>` elements up to the parent `<g>` group element. This way the glow is computed once for the entire country shape, producing a clean, unified shadow with no seams.

- Add inline `style` with the `filter` property to the `<g>` element, conditioned on `hoveredCountry === key`
- Remove the `filter` property from the individual `<path>` style objects
- All other path styles (fill, opacity, stroke, strokeWidth) remain on the individual paths as before

