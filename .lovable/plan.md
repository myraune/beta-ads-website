

# Fix Container Scroll Animation Bugs

## Issues Identified

1. **Massive scroll height** — The container is 80rem (1280px) tall on desktop, creating an unnaturally long scroll zone before content appears. This makes the page feel broken.
2. **`scaleDimensions()` reactivity bug** — Called as a plain function during render, but depends on `isMobile` state. When state updates, the `useTransform` hook doesn't properly re-initialize with new scale values, causing visual jumps.
3. **Stale className** — The Header has `className="div max-w-5xl..."` with a leftover `div` string.
4. **iPad bezel too thin** — Padding of 12-16px doesn't look realistic. Real iPads have thinner bezels on modern models but the camera dot and home indicator need refinement.
5. **Scroll offset config** — Missing `offset` parameter on `useScroll`, so the animation triggers based on when the container enters/exits viewport rather than a controlled range, causing the tilt to snap between extremes.

## Changes

### 1. `src/components/ui/container-scroll-animation.tsx` — Full fix

- **Reduce container height** from `h-[60rem] md:h-[80rem]` to `h-[40rem] md:h-[50rem]` — enough scroll range without breaking the page flow
- **Add scroll offset** — use `offset: ["start start", "end start"]` on `useScroll` to control when the animation begins and ends relative to viewport
- **Fix scale reactivity** — pass scale values directly inline instead of through a function, or memoize properly
- **Reduce rotation** from 20deg to 12deg for a more subtle, polished feel
- **Remove stale `"div"` class** from Header
- **Refine iPad frame**:
  - Thinner bezel padding: `p-2 md:p-3` (modern iPad look)
  - Slightly smaller camera dot: `w-2 h-2`
  - Adjusted rounded corners: `rounded-[30px]` outer, `rounded-[22px]` inner screen
  - Home indicator: thinner, `h-[3px]`

### 2. `src/components/sections/Hero.tsx` — Minor cleanup

- No structural changes needed, the component is correct
- The `overflow-hidden` on the section is fine

