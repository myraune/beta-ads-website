

# Adjust Supademo Iframe Sizing in Hero

## Change

Update the iframe container in the hero section for better visual balance:

- Change aspect ratio from `aspect-[4/3]` to `aspect-video` (16:9), which better matches the Supademo content and feels more natural alongside the headline
- Add a subtle border for definition against the dark background

## File: `src/pages/CaseStudies.tsx` (line 89)

**Before:**
```tsx
<div className="aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-2xl shadow-black/20 bg-card/20">
```

**After:**
```tsx
<div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl shadow-black/20 bg-card/20 border border-white/5">
```

Single line change. The 16:9 ratio reduces the vertical height of the embed, keeping the hero balanced with the text column on the left.

