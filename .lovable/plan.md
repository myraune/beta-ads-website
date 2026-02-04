
# Plan: Adjust Founder Photo Display

## Current Issue

The photo uses `aspect-[4/3]` with `object-cover object-top`, but the image composition isn't being displayed well. The face or key part of the photo may be cropped awkwardly.

## Proposed Changes

**File: `src/pages/AboutUs.tsx`**

| Current | Change |
|---------|--------|
| `aspect-[4/3]` | `aspect-[16/9]` for wider cinematic format |
| `object-top` | `object-center` or `object-[center_25%]` to better frame the subject |

### Updated Image Code

```tsx
<div className="relative aspect-[16/9] overflow-hidden">
  <img 
    src={founderImage} 
    alt="Andreas Myraune, Founder of Beta Ads"
    className="w-full h-full object-cover object-[center_30%]"
  />
```

The `object-[center_30%]` positions the focus point 30% from the top, which typically frames a person's face better in a landscape crop.

## Visual Result

```text
Current (4:3):
+------------------+
|                  |
|   [cropped       |
|    awkwardly]    |
|                  |
+------------------+

New (16:9):
+---------------------------+
|   [wider, better framed]  |
+---------------------------+
```

## Summary

- Change aspect ratio from 4:3 to 16:9
- Adjust object position for better face framing
- Image will feel more cinematic and professional
