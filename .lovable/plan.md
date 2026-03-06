

# Fix: Pin Hero During Dashboard Scroll Animation

## Problem
The entire page scrolls normally while the dashboard tilt animation plays, making it feel broken. The animation should play while the hero section stays visually pinned in the viewport.

## Solution
Use a **sticky positioning** approach: the outer container provides the scroll height (for framer-motion to track), while the visible content is `position: sticky; top: 0` so it stays pinned in the viewport as the user scrolls. The animation plays smoothly while the hero appears stationary.

## Changes

### `src/components/ui/container-scroll-animation.tsx`
- The outer `div` (with `ref={containerRef}`) keeps its tall height but removes `flex items-center justify-center` — it just provides scroll range
- Add a new inner wrapper with `sticky top-0 h-screen` that holds the perspective container, header, and card
- This pins the visible content while `scrollYProgress` advances from 0 to 1
- Adjust inner padding so the content is vertically centered within the sticky viewport
- Keep all existing animation transforms (rotate 12deg→0, scale, translate)

### `src/components/sections/Hero.tsx`
- Remove `overflow-hidden` from the section — it would break `sticky` positioning
- No other changes needed

