
# Plan: Multi-Image About Page

## Overview

Replace the single hero image with a multi-image layout showcasing the founder in different contexts. This creates a more personal, dynamic presentation while maintaining the site's visual-first design principles.

## Proposed Layout

```text
+------------------------------------------------------------------+
|  About Beta Ads                                                   |
|                                                                   |
|  [Text + CTA]          [MAIN IMAGE - Hero, large]                |
|      38%                        62%                               |
+------------------------------------------------------------------+
|                                                                   |
|  [IMAGE 2]        [IMAGE 3]        [IMAGE 4]                     |
|    1/3              1/3              1/3                          |
|  At work          Standing         Office setup                   |
|                                                                   |
+------------------------------------------------------------------+
```

## Image Assignment

| Slot | Image | Context |
|------|-------|---------|
| Hero (main) | Current founder-andreas.jpeg | Primary headshot |
| Image 2 | 58AADC5C (atrium) | Professional setting |
| Image 3 | B83368C8 (standing, office) | Working environment |
| Image 4 | 6A9DA933 (at desk) | Behind the scenes |

## Files to Create/Modify

### New Assets

Copy the 3 uploaded images to `src/assets/`:
- `src/assets/founder-andreas-2.jpg` (atrium photo)
- `src/assets/founder-andreas-3.jpg` (standing in office)
- `src/assets/founder-andreas-4.jpg` (at desk)

### Code Changes: `src/pages/AboutUs.tsx`

1. Import all 4 founder images
2. Keep current hero layout (38/62 split)
3. Add new section below hero with 3-column image grid
4. Each secondary image uses:
   - `aspect-[4/3]` for consistent proportions
   - `rounded-xl` corners
   - Subtle hover effect (scale)
   - Optional caption overlay

## Technical Details

### Image Grid Styling

```tsx
<section className="max-w-[1600px] mx-auto px-6 lg:px-12 pb-16">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {/* Three secondary images */}
  </div>
</section>
```

### Hover Effect

```tsx
<div className="group overflow-hidden rounded-xl">
  <img 
    className="transition-transform duration-500 group-hover:scale-105"
  />
</div>
```

### Animation

- Secondary images fade in with staggered delay
- Uses existing `useScrollAnimation` hook for scroll-triggered reveal

## Visual Result

- Hero section unchanged (keeps current strong layout)
- New image grid adds depth and personality
- Shows founder in multiple professional contexts
- Maintains clean, minimal aesthetic with consistent spacing
