

# Add Container Scroll Animation to Homepage Hero

## Overview

Replace the current side-by-side hero layout with a vertical layout that uses a 3D perspective scroll animation on the LiveDashboard preview. As the user scrolls, the dashboard rotates from a tilted perspective to flat, creating a cinematic reveal effect.

## Changes

### 1. Create `src/components/ui/container-scroll-animation.tsx`
- Port the provided component, removing `"use client"` directive (not needed in Vite/React)
- Uses framer-motion's `useScroll` and `useTransform` for scroll-linked rotation, scale, and translate
- Three sub-components: `ContainerScroll` (wrapper), `Header` (title area), `Card` (animated container)

### 2. Restructure `src/components/sections/Hero.tsx`
- Change from the current `grid lg:grid-cols-[38%_62%]` side-by-side layout to a vertical layout
- The text content (greeting, logo, headline, buttons) becomes the `titleComponent` prop passed to `ContainerScroll`
- The `LiveDashboard` becomes the child of `ContainerScroll`, wrapped in the animated card
- Keep all existing text content, rotating words, Nordic greeting animations intact
- The dashboard preview will start tilted at 20deg rotateX and animate to flat as user scrolls

### 3. Layout adaptation
- Center the text content above the dashboard instead of left-aligned
- Keep the `max-w-md` constraint on text but center it
- The `ContainerScroll` container handles the scroll-based animation area (needs sufficient height for scroll range)

### No new dependencies needed
- `framer-motion` is already installed (version ^12.23.26)

