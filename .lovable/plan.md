

# Ad Formats Updates -- For Brands Page

## Issues to fix

### 1. Carousel not scrolling
The `animate-scroll` CSS class exists and should work, but if your system has "prefers-reduced-motion" enabled (common on macOS), all animations are disabled by the media query at the bottom of `index.css`. The fix is to exclude `animate-scroll` from that reduced-motion block so the carousel always runs.

### 2. Rename "Premium" to "Interactive"
Three files contain an ad format called "Premium" or "Premium Experience" that needs renaming:
- `src/pages/CaseStudies.tsx` (line 125-131)
- `src/components/sections/AdFormatsCarousel.tsx` (line 38-43)

The `AdFormats.tsx` component already uses "Interactive" -- no change needed there.

### 3. Reorder formats
New order across all three files: **Video, Snipe Banner, Side Bar, Rich Media, Poll, Interactive**

## File changes

### `src/index.css`
Remove `.animate-scroll` from the `prefers-reduced-motion` media query so the carousel always animates.

### `src/pages/CaseStudies.tsx`
- Rename "Premium" to "Interactive" (id stays or changes to "interactive")
- Reorder the `adFormats` array to: Video, Snipe Banner, Side Bar, Rich Media, Poll, Interactive

### `src/components/sections/AdFormatsCarousel.tsx`
- Rename "Premium Experience" to "Interactive"
- Reorder the array to: Video, Snipe Banner, Side Bar, Rich Media, Poll, Interactive

### `src/components/sections/AdFormats.tsx`
- Reorder the array to: Video, Snipe Banner, Side Bar, Rich Media, Poll, Interactive
- (Already named correctly -- "Interactive" is already used here)

