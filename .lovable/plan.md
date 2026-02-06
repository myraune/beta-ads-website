

# Fix Nordic Map Hover — Remove Scale, Keep It Simple

## Problem
The `scale(1.03)` transform on SVG `<g>` elements does not work correctly because SVG transform origins resolve to the SVG coordinate system origin (0,0), not the visual center of the group. This causes countries to shift position on hover, making the effect look broken.

## Solution
Remove the scale transform entirely. The hover effect should be purely color/opacity based — simple and clean:

- On hover: opacity goes from 0.5 to 1 (already done)
- On hover: stroke brightens (already done)
- Remove `transform`, `transformOrigin`, and `transition` from the `<g>` style — leave it as a plain wrapper with just `key`

**File: `src/components/sections/MarketsSection.tsx`** (lines 110-117)

Strip the `<g>` inline style completely so it becomes:
```tsx
<g key={key}>
```

No other changes needed. The path-level opacity (0.5 to 1) and stroke color shift already provide a clean, subtle hover effect without any filter artifacts or transform issues.

