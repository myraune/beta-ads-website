
Goal: make the page feel “locked” when the dashboard reveal starts, so the hero is clearly pinned and the animation completes before the next section moves in.

What is currently causing the broken feel:
1) Pin duration is too short (`h-[120vh] / h-[140vh]`), so sticky only lasts ~20–40vh of scroll.
2) `useScroll` is mapped with `offset: ["start start","end start"]`, so animation progress continues after sticky should release.
3) The header itself is translating during scroll, which visually reads like “site still scrolling.”

Implementation plan:

1) Rework hero pin timing in `src/components/ui/container-scroll-animation.tsx`
- Increase sticky runway to make pin obvious:
  - mobile: `h-[180vh]`
  - desktop: `h-[220vh]`
- Change Framer offset to match sticky lifecycle:
  - from `["start start","end start"]`
  - to `["start start","end end"]`
- Add phased animation progress so it feels intentional:
  - phase A (hold): 0 → ~0.12 (no motion)
  - phase B (reveal): ~0.12 → ~0.72 (dashboard animates)
  - phase C (hold): ~0.72 → 1 (final state locked before release)
- Drive transforms from phased progress:
  - rotate: subtle (e.g. 8→0)
  - scale: modest (desktop near 1.03→1, mobile slightly tighter than current)
  - header translate: reduce heavily or remove (0→0 or very small) so “site stop” feels real

2) Keep sticky compatibility clean
- Keep current parent overflow fix (`overflow-x-hidden`) as-is.
- Ensure sticky wrapper remains `sticky top-0 h-screen`.

3) Hardening for cross-browser sticky behavior
- In `src/index.css`, update `.animate-page-enter` so it doesn’t leave a persistent transform on the page wrapper (remove `forwards` on transform-based animation or switch to opacity-only page-enter). This avoids known sticky inconsistencies when ancestors retain transform.

4) End-to-end verification (desktop + mobile)
- Desktop (1366x768):
  - Start at top of `/`.
  - Scroll into hero: hero should pin immediately when reveal starts.
  - During reveal, next section must not advance into view.
  - Dashboard finishes reveal before release to next section.
- Mobile (375x812):
  - Same validation, no jumpy release.
  - Ensure hero still pins and reveal completes smoothly.
- Regression checks:
  - Navbar behavior unchanged.
  - No layout clipping in hero.
  - No new framer-motion offset warnings in console during scroll.

Acceptance criteria:
- When dashboard reveal starts, viewport feels pinned (not drifting into next section).
- Reveal completes while pinned.
- Release into `TrustedBy` happens only after reveal finishes.
- Smooth on both desktop and mobile.
