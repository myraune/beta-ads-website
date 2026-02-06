
# Replace Simplified SVG Paths with Geographically Accurate Nordic Map

## Overview
Replace the current hand-drawn SVG paths in `src/components/sections/MarketsSection.tsx` with geographically accurate country outlines sourced from a public domain world map dataset (sirlisko/world-map-country-shapes, MIT license).

## What Changes

**File: `src/components/sections/MarketsSection.tsx`**

Replace the `COUNTRIES` object paths (lines 5-26) with accurate SVG path data:

- **Norway**: Real coastline with fjords and northern islands (Svalbard excluded for framing)
- **Sweden**: Proper elongated shape with correct western coastline
- **Finland**: Accurate eastern border and lake region outline
- **Denmark**: Correct Jutland peninsula and Zealand island shapes

Update the SVG `viewBox` from the current `"60 10 130 270"` to approximately `"1010 85 120 160"` to frame the Nordic region correctly within the world-map coordinate system.

## Technical Details

- The new paths come from a Mercator-projected world map where coordinates range roughly from 0-1950 horizontally and 0-1000 vertically
- The Nordic countries sit around x: 1010-1130, y: 85-240 in this projection
- The viewBox will be tuned to crop tightly around the Nordics
- All existing interactivity (hover sync, glow effects, opacity transitions) remains unchanged
- All styles continue to use inline `style` props for complex effects (per the project's CSS parser constraint)
- No new dependencies or files needed
- The SVG height container stays the same (`h-[320px]`)
- The hover label text position will be adjusted to fit the new viewBox coordinate space
