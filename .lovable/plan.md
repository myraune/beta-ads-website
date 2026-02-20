

# Rebuild Navbar - Complete Rewrite

## Problems identified

1. The 680px pill is too wide for the content inside it, creating an oversized background bubble around tightly clustered items — especially visible when scrolled and the background becomes opaque
2. Logo sits directly next to "Brands" with only a tiny gap-2 between them
3. The transition between transparent and scrolled states exaggerates the width problem

## Solution

**Complete rewrite of `src/components/Navbar.tsx`** with these specific fixes:

### Desktop layout

Shrink the pill to fit its content instead of using a fixed max-width:

```text
[Logo]  ·  [Brands] [Streamers] [Pricing]  |  [theme] [Book a Demo ->]
```

- Remove `max-w-[680px]` — use `w-fit` so the pill hugs its content
- Add `px-4` padding inside the pill for breathing room
- Add `gap-3` between logo and the first link (more space than current gap-2)
- Keep `gap-1` between nav links themselves (tight grouping)
- Add a small `mx-1` divider gap between links section and actions section
- Height stays at `h-[52px]`, `rounded-full`, centered with `mx-auto`

### Scroll behavior

- Transparent at top: `bg-transparent backdrop-blur-none`
- On scroll: `bg-background/80 backdrop-blur-md shadow-lg shadow-black/10`
- Transition only on `background-color, box-shadow, backdrop-filter` — no transforms

### Hover states

- Nav links: `transition-colors duration-150` only (color change, nothing else)
- CTA button: `transition-colors duration-150`
- Logo: zero hover effect
- Theme toggle: `transition-colors duration-150`

### Mobile

- Stays the same — full-width bar with dropdown, no changes needed

## Technical details

Single file: `src/components/Navbar.tsx` — full rewrite.

Key change from current code:
- `max-w-[680px]` replaced with `w-fit` so the pill auto-sizes to content
- Logo gets `mr-1` extra margin to separate it from "Brands"
- Inner container uses `gap-3` for overall spacing
- Nav links grouped in their own `flex gap-1` container for tight link spacing
- Divider and action buttons in a separate `flex gap-2` group

This means the scrolled background pill will only be as wide as the navbar content, not a fixed 680px that creates empty space on the sides.
