
# Expand About Page: Office Locations and Interactive Market Map

## Overview
Add two new sections below the hero on the About page:
1. **Office Locations** -- side-by-side cinematic city photos (Oslo and Chicago) with labels
2. **Interactive Nordic Market Map** -- an SVG map of the Nordics highlighting Norway, Sweden, and Finland with hover/click interactions

## New Assets
Copy the two uploaded city images into `src/assets/`:
- `src/assets/city-oslo.jpg` (Oslo skyline)
- `src/assets/city-chicago.jpg` (Chicago skyline)

## Changes to `src/pages/AboutUs.tsx`

### Section 1: Office Locations
Placed directly after the hero section. Two cards side by side on desktop, stacked on mobile. Each card contains:
- Full-width cinematic image (aspect-ratio 16/10) with a gradient overlay at the bottom
- City name and "HQ" / "Office" label in the bottom-left corner
- Scroll-reveal animation using `useScrollAnimation`
- Short contextual line beneath the grid (e.g., "Founded in Oslo. Growing from Chicago.")

### Section 2: Interactive Nordic Market Map
A clean section with a heading like "Our Markets" and a custom inline SVG map showing the Nordic/Scandinavian region. The map will:
- Highlight Norway, Sweden, and Finland with the primary color (red) fill
- Grey out other countries (Denmark, Iceland, etc.) for context
- On hover, each active country glows or scales slightly, and a tooltip/label shows the country name
- Use React state to track which country is hovered
- Include a small legend or text list of the three markets below the map
- The SVG paths will be simplified outlines of the Nordic countries (not pixel-perfect cartography, but recognizable)

### Layout Flow
```text
+----------------------------------+
|         HERO (existing)          |
+----------------------------------+
|                                  |
|   OFFICE LOCATIONS               |
|   [Oslo photo] [Chicago photo]   |
|   "Founded in Oslo..."           |
|                                  |
+----------------------------------+
|                                  |
|   OUR MARKETS                    |
|   [Interactive Nordic SVG Map]   |
|   Norway / Sweden / Finland      |
|                                  |
+----------------------------------+
|         FOOTER (existing)        |
+----------------------------------+
```

## Technical Details

### Imports to add
- `city-oslo.jpg` and `city-chicago.jpg` from `@/assets/`
- Additional `useScrollAnimation` instances for each new section
- `useState` for map hover state

### SVG Map approach
Use simplified SVG `<path>` elements for the three Nordic countries plus surrounding context countries. Each active country path gets:
- `onMouseEnter` / `onMouseLeave` to set hovered state
- Conditional fill: primary color when hovered, slightly muted primary when not
- A smooth CSS transition on fill and transform
- Inactive countries rendered in `hsl(var(--muted))` with lower opacity

### Animation
- Office location cards use staggered scroll-reveal (delay-100, delay-300)
- Map section fades in on scroll
- Country hover effects use CSS transitions (200ms)

## Files

| Action | File | Description |
|--------|------|-------------|
| Copy | `user-uploads://christoffer-engstrom-...` to `src/assets/city-oslo.jpg` | Oslo skyline photo |
| Copy | `user-uploads://ricky-beron-...` to `src/assets/city-chicago.jpg` | Chicago skyline photo |
| Modify | `src/pages/AboutUs.tsx` | Add Office Locations section and Interactive Market Map section between hero and footer |
