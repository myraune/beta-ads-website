

# Fine-Tune Hero Scroll Animation

## Current State
The container scroll height is `160vh / 180vh` with rotation `12→0`, scale `1.05→1`, and translate `0→-100`. The animation works with sticky positioning but the scroll range is too long — the user scrolls for a while before the reveal completes.

## Changes

### `src/components/ui/container-scroll-animation.tsx`

**Tighter scroll range:**
- Reduce container height from `h-[160vh] md:h-[180vh]` to `h-[120vh] md:h-[140vh]` — faster reveal, less dead scrolling

**Refined transforms:**
- Reduce initial rotation from `12` to `8` degrees — subtler, more polished tilt
- Reduce translate from `[0, -100]` to `[0, -60]` — header moves up less aggressively
- Adjust desktop scale from `[1.05, 1]` to `[1.02, 1]` — less scale bounce

These three changes together create a tighter, snappier reveal that feels intentional rather than sluggish.

### Testing Plan
After implementation, use browser tools to:
1. Scroll through the homepage on desktop (1440px) — verify the hero stays pinned and animation completes smoothly
2. Resize to mobile (375px) — verify the same behavior on small screens
3. Confirm no layout jumps or content overflow issues

