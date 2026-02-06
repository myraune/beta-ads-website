

# Simplify Nordic Map Hover Effect

## Problem
The `drop-shadow` filter still produces harsh edges on multi-path countries. SVG filters on complex shapes with tight curves inherently create artifacts.

## Solution
Remove the `drop-shadow` filter entirely. Instead, on hover:
- Increase the fill opacity from 0.5 to 1.0 (brighter color)
- Apply a subtle `scale(1.03)` transform on the `<g>` group for a slight zoom effect
- Use `transform-origin: center` so the zoom feels natural

## File: `src/components/sections/MarketsSection.tsx`

**On the `<g>` element (line ~110-115):**
- Remove the `filter: drop-shadow(...)` property
- Add `transform` and `transformOrigin` for the zoom effect on hover

```
style={{
  transform: hoveredCountry === key && country.active ? 'scale(1.03)' : 'scale(1)',
  transformOrigin: 'center',
  transition: 'transform 0.2s ease',
}}
```

**On each `<path>` element (line ~122):**
- Change hovered opacity from `0.9` to `1`
- No other changes needed — stroke, fill, and inactive styles stay the same

