

# Fix Navbar Centering and Smooth Scroll Transition

## Issues

1. The nav links ("For brands", "For streamers") are not visually centered because the layout uses `justify-between` with three unequal-width sections (logo, links, CTA+theme toggle). The right side is wider than the left, pushing the center links off-center.

2. The scroll transition feels abrupt. Currently `duration-300 ease-out` -- needs a longer duration and a smoother easing curve. The `backdrop-filter` transition is also problematic as it cannot animate smoothly between `none` and `blur(12px)`.

## Changes (all in `src/components/Navbar.tsx`)

### 1. Center the nav links using a three-column flex layout

Replace the current `justify-between` flex container (line 50) with three equal-width columns so the center column (nav links) is always perfectly centered regardless of left/right content width:

- Logo wrapper: add `flex-1 justify-start`
- Nav links wrapper: keep centered (no flex-1, natural width)
- CTA wrapper: add `flex-1 justify-end`

### 2. Smooth the scroll transition

- Increase duration from `duration-300` to `duration-500`
- Change easing from `ease-out` to a custom cubic-bezier for a softer feel: `[cubic-bezier(0.4,0,0.2,1)]`
- Remove `backdrop-filter` from the transition property list (it causes a jarring snap between `none` and `blur`). Instead, always apply a minimal backdrop-blur and just change the background opacity, which transitions smoothly
- Remove the `scale` and `translate` transforms on scroll to eliminate the "jump" feeling -- keep the navbar static in position and only change background/shadow

### Technical Detail

**Line 43** -- transition property:
```
transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
```

**Lines 44-46** -- scrolled vs unscrolled states:
- Unscrolled: `bg-transparent backdrop-blur-sm shadow-none`
- Scrolled: `bg-background/80 backdrop-blur-md shadow-lg shadow-black/10`

**Line 50** -- flex layout:
```
<div className="flex items-center">
  <div className="flex-1 flex justify-start">...logo...</div>
  <div className="flex items-center gap-1">...links...</div>
  <div className="flex-1 flex items-center justify-end gap-2">...CTA...</div>
</div>
```

No other files need changes.

