

# Upgrade About Page: Instrument Serif + Enhanced Sections

## Overview
Refine the existing About page with the specific design details from the prompts: Instrument Serif typography, updated hero copy, section dividers, and an abstract dot visualization for markets.

## Files to Modify

| File | Change |
|------|--------|
| `index.html` | Add Instrument Serif font from Google Fonts |
| `src/pages/AboutUs.tsx` | Update all three sections with new typography, copy, dividers, and market visualization |

---

## 1. Add Instrument Serif Font

Add to `index.html` head:
```html
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
```

---

## 2. Section 1 -- Hero Updates

- Add small uppercase red label "ABOUT" above the heading (11px, letter-spacing 0.16em, color primary)
- Change heading to: "We make ads that feel like **content**, not interruption." -- using `font-family: 'Instrument Serif'`, with "content" in italic + primary red
- Keep the two muted paragraphs and "Book a call" link as-is
- Grid stays 55/45 asymmetric
- Keep founder photo, name, and "FOUNDER" label

---

## 3. Section 2 -- Locations Updates

- Add a thin 1px divider (`border-t border-foreground/[0.06]`) at the top of the section
- Add subtle dark gradient overlays on the bottom of each city image (for label readability)
- Change city name typography to Instrument Serif
- Change tagline to Instrument Serif italic
- Keep the staggered layout (Oslo 60%, Chicago 35% offset)

---

## 4. Section 3 -- Markets: Add Abstract Dot Visualization

Replace the current text-only layout with a two-column approach:

**Left column (50%):**
- Red uppercase "OUR MARKETS" label
- Serif heading "Active across the Nordics" in Instrument Serif
- Muted gray paragraph
- Three inline country indicators with glowing red dots

**Right column (50%, desktop only):**
- Three absolutely positioned glowing dots representing Norway, Sweden, and Finland
- Each dot has a tiny country code label (NO, SE, FI) next to it
- Dots connected by very faint white SVG lines (opacity 0.07)
- Dots have a subtle red glow effect (box-shadow or radial gradient)
- Hidden on mobile (`hidden lg:block`)

Dot positions (approximate, within a relative container):
- Norway (NO): top-left area (~25%, 30%)
- Sweden (SE): center (~50%, 45%)
- Finland (FI): right area (~70%, 35%)

SVG lines connect the three dots in a triangle pattern with very low opacity.

---

## Technical Details

- Instrument Serif applied via inline style `fontFamily: "'Instrument Serif', serif"` on specific headings and taglines only (not body text)
- Body text remains the default sans-serif (Inter)
- All existing scroll animations (useScrollAnimation) are preserved
- Aurora reinforcement gradient stays
- No new dependencies required -- Google Fonts loaded via CDN link
- The dot visualization uses pure CSS positioning + an inline SVG for the connecting lines

