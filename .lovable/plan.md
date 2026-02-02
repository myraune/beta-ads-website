
# Plan: Smooth Header Scroll Transition

## Overview
Improve the navbar transition from full-width to floating pill to create a clean, seamless animation that aligns with the iOS-inspired borderless design system.

## Current Problems
- Background appears suddenly when scrolling (opacity jump from 0 to 70%)
- Shadow pops in abruptly instead of fading
- Width snaps to `max-w-fit` rather than animating smoothly
- No background on initial state makes content hard to read on some pages

## Solution

### 1. Add Initial Subtle Background
Start with a very subtle background in the non-scrolled state so the transition feels like an evolution rather than a sudden change:
- Non-scrolled: `bg-transparent` or very subtle `bg-background/10`
- Scrolled: `bg-background/70`

### 2. Animate All Properties Together
Ensure these properties all transition smoothly:
- Background opacity (0% to 70%)
- Backdrop blur (0 to xl)
- Shadow (none to lg)
- Padding changes
- Border radius (0 to full)
- Max-width (full to fit)

### 3. Use CSS Custom Properties for Width
Instead of `max-w-fit` which can cause jumps, use a percentage-based approach or fixed pixel values that can be animated.

### 4. Add Transition to Shadow and Blur
Currently missing explicit transitions for:
- `shadow` (needs to fade in)
- `backdrop-blur` (needs to ramp up)

## Technical Changes

### File: `src/components/Navbar.tsx`

Update the desktop nav container classes:

```tsx
// Non-scrolled state
"max-w-[1280px] px-8 py-5 bg-transparent backdrop-blur-none shadow-none rounded-none"

// Scrolled state  
"max-w-[600px] px-6 py-2.5 bg-background/70 backdrop-blur-xl shadow-lg shadow-black/15 rounded-full"
```

Key changes:
1. Use fixed `max-w-[1280px]` instead of `max-w-7xl` to match with a fixed `max-w-[600px]` for the pill
2. Add explicit `bg-transparent`, `backdrop-blur-none`, `shadow-none`, `rounded-none` to initial state so transitions have a starting point
3. Ensure `will-change` includes all animating properties
4. Consider using `transition-[max-width,padding,background,box-shadow,border-radius,backdrop-filter]` for explicit property targeting

### File: `src/index.css` (optional)

Add a CSS class for smooth navbar transitions if needed:

```css
.nav-transition {
  transition: 
    max-width 700ms cubic-bezier(0.4, 0, 0.2, 1),
    padding 700ms cubic-bezier(0.4, 0, 0.2, 1),
    background-color 500ms ease-out,
    backdrop-filter 500ms ease-out,
    box-shadow 500ms ease-out,
    border-radius 700ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

## Expected Result
- When at top of page: Full-width transparent header
- As user scrolls past 20px: Smooth 700ms animation where the header:
  - Gently fades in the background
  - Gradually applies backdrop blur
  - Softly introduces the shadow
  - Shrinks from full-width to centered pill
  - Rounds the corners progressively
