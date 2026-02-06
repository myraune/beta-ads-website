

# Replace Abstract Dots with Nordic Map Visualization

## Overview
Replace the current abstract dot visualization in the Markets section with a proper SVG map of Northern Europe, where Norway, Sweden, and Finland are highlighted in the primary red color. Denmark and surrounding geography shown as faint/muted shapes for context.

## What Changes

**File: `src/pages/AboutUs.tsx`** (lines 189-215)

Replace the current "abstract dot visualization" div with an inline SVG map of the Nordic region:

- Use geographically accurate simplified SVG paths for Norway, Sweden, Finland, and Denmark
- Norway, Sweden, Finland filled with primary red at ~60% opacity, brightening on hover
- Denmark shown muted (low opacity, gray) to indicate it is not an active market
- Subtle red glow filter on the highlighted countries
- Country name label appears on hover (text element at bottom of SVG)
- Interactive: hovering a country name in the left-column list highlights the corresponding country on the map, and vice versa
- The SVG viewBox is tuned so the Nordic peninsula fills the space naturally
- Hidden on mobile (`hidden lg:block`), same as the current visualization
- All glow effects use inline `style` props (not Tailwind arbitrary shadow classes) per the project's CSS parser constraint

## Technical Approach

- Reuse the proven SVG path data from the existing `src/components/NordicMap.tsx` component (simplified country outlines already defined there)
- Add `useState` for `hoveredCountry` to enable interactive hover between the text list and the map
- Country indicator dots in the left column gain `onMouseEnter`/`onMouseLeave` handlers that sync with the map
- SVG paths gain matching hover handlers
- No new files or dependencies needed -- all changes are within `AboutUs.tsx`

