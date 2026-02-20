

# Rebuild Navbar From Scratch

## What changes

**Delete and rewrite `src/components/Navbar.tsx`** with a clean, minimal implementation.

## Desktop navbar

A centered floating pill with all elements in a single row, tightly spaced:

```text
[Logo] [Brands] [Streamers] [Pricing] | [theme] [Book a Demo ->]
```

- Fixed `max-w-[680px]`, `h-[52px]`, `rounded-full`, centered with `mx-auto`
- Single flex row with `items-center justify-center gap-2`
- No nested flex containers or `flex-1` columns
- Scroll behavior: IntersectionObserver with sentinel (keep existing pattern)
- On scroll: only `bg-background/80 backdrop-blur-md shadow-lg` -- no scale or translate transforms

## Mobile navbar

- Full-width bar, `h-[56px]`, logo left, hamburger right
- Dropdown panel slides open with simple `max-h` transition
- Links stacked vertically, CTA at bottom

## Hover states

All hover transitions scoped to specific properties only (no `transition-all`):
- Nav links: `transition-colors duration-150` -- just color change, no background shift
- CTA button: `transition-colors duration-150` -- subtle brightness change only
- Logo: no hover effect at all (remove the scale transform)
- Theme toggle: `transition-colors duration-150`

## What stays the same

- `navLinks` array with current labels (Brands, Streamers, Pricing)
- IntersectionObserver scroll detection with sentinel div
- Theme toggle with `next-themes`
- Mobile menu open/close with `isOpen` state
- Close mobile menu on route change

## Technical details

Single file change: `src/components/Navbar.tsx` -- complete rewrite, approximately 120 lines. No other files need changes.

Key structural differences from current code:
- Remove all `group-hover` effects on logo
- Remove `will-change-transform` (unnecessary for color-only transitions)
- Remove scale/translate animations on scroll (just bg + blur + shadow)
- Flatten the desktop layout to one flex container instead of nested divs
- Use `transition-colors` everywhere instead of broad transition classes

