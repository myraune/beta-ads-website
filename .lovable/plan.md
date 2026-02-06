

# Redesign: About Page -- Stripe/Linear Minimal Aesthetic

## Overview
Complete redesign of the About page to match a premium, editorial tech aesthetic inspired by Stripe and Linear. The page will feel asymmetric, spacious, and confident with generous whitespace and left-aligned typography.

## Files to Modify

| File | Change |
|------|--------|
| `src/pages/AboutUs.tsx` | Full rewrite of the page layout and all three sections |
| `src/components/NordicMap.tsx` | Delete or stop using -- replaced by inline minimal market indicators |

---

## Section 1 -- About Intro

Asymmetric two-column layout (~55% / 45%) with no card backgrounds, no borders.

**Left column (55%):**
- Large heading "About *Beta* Ads" at `text-5xl lg:text-6xl` (48-64px), `font-light`, white
- "Beta" rendered as `italic text-primary` (accent red)
- Two short paragraphs in muted gray (`text-[#8888a0]`), `max-w-[480px]`, `text-base lg:text-lg`
- "Book a call" as a subtle inline text link with arrow icon, not a button:
  ```
  <a className="inline-flex items-center gap-2 text-primary text-sm tracking-wide hover:gap-3 transition-all">
    Book a call <ArrowRight size={14} />
  </a>
  ```

**Right column (45%):**
- Founder image larger, `aspect-[3/4]` crop for cinematic vertical feel
- Image overflows the container slightly to the right (`lg:-mr-16 xl:-mr-24`)
- Rounded corners (`rounded-2xl`), no card wrapper, no overlay gradient
- Name and title sit **below** the image (not overlaid), clean small type:
  ```
  Andreas Myraune
  Founder
  ```
  in `text-sm text-[#8888a0]` and `text-xs uppercase tracking-[0.2em] text-primary`

**Spacing:** `pt-32 lg:pt-44 pb-24 lg:pb-32` for generous top breathing room.

**Animation:** Fade-up on scroll using `useScrollAnimation`.

---

## Section 2 -- Where We Are

Staggered, asymmetric image layout. NOT two equal cards.

- **Oslo image:** ~60% width, taller aspect ratio (`aspect-[4/5]`), positioned on the left. `rounded-2xl`, no border, no overlay. Subtle hover scale.
- **Chicago image:** ~35% width, shorter (`aspect-[3/4]`), positioned on the right, pushed down with `mt-16 lg:mt-24` to create vertical stagger.
- Both images float cleanly on the dark background.
- Labels sit **below** each image:
  - `HEADQUARTERS` / `OFFICE` in `text-[10px] uppercase tracking-[0.25em] text-primary` 
  - City name in `text-lg font-medium text-foreground`
- Tagline "Founded in Oslo. Growing from Chicago." as a standalone line, left-aligned, in `text-muted-foreground italic text-sm`, with generous margin above (`mt-16`).

**Container:** `max-w-[1200px]` centered, with large vertical padding `py-32 lg:py-40`.

**Animation:** Each image fades up on scroll with staggered delay.

---

## Section 3 -- Markets

Minimal, text-driven. No SVG map. All left-aligned.

- Thin horizontal divider line at the top: `border-t border-white/[0.06]` spanning full container width
- `Our Markets` label: `text-xs uppercase tracking-[0.25em] text-primary`, left-aligned
- Heading: `Active across the Nordics` at `text-3xl lg:text-4xl font-light text-foreground`
- Paragraph: muted gray, `max-w-[520px]`, `text-base text-[#8888a0]`
- Three country indicators as a horizontal row with generous spacing (`gap-10 lg:gap-16`):
  ```
  [dot] Norway    [dot] Sweden    [dot] Finland
  ```
  Small red dot (`w-1.5 h-1.5 rounded-full bg-primary`), country name in `text-sm font-light text-foreground tracking-wide`

**Container:** `max-w-[1200px]`, `py-32 lg:py-40`.

**Animation:** Fade-up on scroll.

---

## Technical Details

- Remove `NordicMap` component import and usage from `AboutUs.tsx`
- Keep the `NordicMap.tsx` file (in case it is used elsewhere) but remove it from the About page
- Remove the `Button` import (no longer needed)
- Keep the aurora reinforcement gradient at the top
- All containers use `max-w-[1200px]` instead of the current `max-w-[1600px]`
- Use three separate `useScrollAnimation` hooks (one per section)
- Keep existing imports for `Footer`, `founderImage`, `cityOslo`, `cityChicago`, `ArrowRight`
- All text left-aligned throughout
- No shadows, no borders, no card backgrounds in any section

