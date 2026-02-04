
# Plan: Fix About Page Layout

## Current Problems

1. **Not centered on page** - Uses `max-w-6xl` without `mx-auto`, leaving content left-aligned
2. **Image is too tall** - 3:4 aspect ratio creates a massive vertical element
3. **Grid is 50/50** - Should follow the site's 38/62 asymmetric pattern (text/visual)
4. **Awkward proportions** - Text feels cramped next to the dominant image

## Proposed Layout

Follow the homepage Hero pattern but adapted for an About page:

```text
+----------------------------------------------------------+
|                                                          |
|   About Beta Ads                                         |
|                                                          |
|   [Text content + CTA]     [Founder image - landscape]   |
|         38%                        62%                   |
|                                                          |
+----------------------------------------------------------+
```

## Changes

| Issue | Fix |
|-------|-----|
| Not centered | Add `max-w-[1600px] mx-auto` wrapper |
| 50/50 grid | Change to `grid lg:grid-cols-[38%_62%]` |
| Portrait 3:4 image | Use landscape `aspect-[4/3]` or square `aspect-square` |
| Too much padding | Reduce `gap-24` to `gap-8` |
| Oversized heading | Scale down to match homepage proportions |

## Code Changes

**File: `src/pages/AboutUs.tsx`**

1. Update container to match homepage: `max-w-[1600px] mx-auto px-6 lg:px-12`
2. Change grid to asymmetric: `lg:grid-cols-[38%_62%]`
3. Change image aspect from `aspect-[3/4]` to `aspect-[4/3]` (landscape)
4. Reduce heading size to match homepage scale
5. Reduce gap from `gap-24` to `gap-8`
6. Add visual extension styling like homepage dashboard

## Result

A balanced, horizontally-oriented layout that:
- Matches the homepage design language
- Keeps the image prominent but not overwhelming
- Feels intentional and professional
