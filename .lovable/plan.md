

# Plan: Smooth Navbar Scroll Behavior with IntersectionObserver

## Current Problems

The current implementation has several performance issues:

| Issue | Current Implementation | Problem |
|-------|------------------------|---------|
| State updates on every scroll | `window.addEventListener("scroll", ...)` with `setScrollPhase()` | Causes jank, triggers re-renders continuously |
| Animating layout properties | `max-width`, `padding`, `border-radius` | Causes layout thrashing, not GPU-accelerated |
| Complex multi-phase logic | 3 states (0, 1, 2) | Unpredictable transitions |

## Solution Overview

Replace scroll event listeners with an IntersectionObserver watching a 1px sentinel div. This toggles a single boolean (`isScrolled`) that triggers a clean CSS transition using only GPU-accelerated properties.

## Architecture

```text
                    SENTINEL (1px div at top)
                           |
                           v
              IntersectionObserver watches
                           |
           +---------------+---------------+
           |                               |
    sentinel visible              sentinel NOT visible
           |                               |
    isScrolled = false             isScrolled = true
           |                               |
    navbar: top state              navbar: scrolled state
    - translateY(0)                - translateY(-4px) scale(0.98)
    - full opacity                 - bg visible, shadow
    - no shadow                    - subtle blur
```

## Technical Implementation

### 1. Sentinel Div Placement

Add a 1px invisible div in `Layout.tsx`, placed before the Navbar:

```tsx
{/* Scroll sentinel for navbar */}
<div id="navbar-sentinel" className="absolute top-0 left-0 w-full h-[1px]" />
```

### 2. IntersectionObserver Hook

Replace the scroll event listener with IntersectionObserver:

```tsx
const [isScrolled, setIsScrolled] = useState(false);

useEffect(() => {
  const sentinel = document.getElementById('navbar-sentinel');
  if (!sentinel) return;

  const observer = new IntersectionObserver(
    ([entry]) => setIsScrolled(!entry.isIntersecting),
    { threshold: 0 }
  );

  observer.observe(sentinel);
  return () => observer.disconnect();
}, []);
```

### 3. CSS-Only Transitions (GPU-Accelerated)

Only animate these properties:
- `transform` (translateY, scale)
- `opacity`
- `background-color`
- `box-shadow`

NO animation of:
- `width`, `max-width`
- `height`, `padding`
- `border-radius`
- `top`, `left`, `right`

### 4. Navbar Positioning

Use `left: 50%` with `translateX(-50%)` for centering:

```tsx
<nav className="fixed top-0 left-1/2 -translate-x-1/2 z-50 ..." />
```

### 5. will-change and translate3d

Add GPU hints:

```tsx
className="will-change-transform"
style={{ transform: 'translate3d(-50%, 0, 0)' }}
```

### 6. Reduced Blur on Scroll (Performance)

Use a lighter blur when scrolled to prevent lag on lower-end devices:
- Non-scrolled: `backdrop-blur-none`
- Scrolled: `backdrop-blur-md` (not `xl`)

## Files to Modify

| File | Change |
|------|--------|
| `src/components/Layout.tsx` | Add sentinel div before Navbar |
| `src/components/Navbar.tsx` | Complete rewrite of scroll logic and styles |

## New Navbar Component Structure

```tsx
// Key changes:
1. Single boolean state: isScrolled
2. IntersectionObserver instead of scroll listener
3. Fixed positioning with transform centering
4. GPU-only property transitions
5. will-change hint
6. Simpler class logic
```

### CSS Classes Applied

**Non-scrolled state:**
```text
translate-y-0 
opacity-100 
bg-transparent 
shadow-none
```

**Scrolled state:**
```text
-translate-y-1 
scale-[0.98] 
bg-background/80 
backdrop-blur-md 
shadow-lg shadow-black/10
```

### Transition Definition

```css
transition: transform 300ms ease-out, 
            opacity 300ms ease-out, 
            background-color 300ms ease-out, 
            box-shadow 300ms ease-out;
```

## Expected Performance Improvements

| Metric | Before | After |
|--------|--------|-------|
| Scroll event frequency | Every frame | Never |
| State updates | Continuous | Binary toggle |
| Properties animated | 6+ (layout) | 4 (GPU only) |
| Paint/Layout thrashing | Yes | No |
| GPU acceleration | Partial | Full |

## Summary

This approach eliminates scroll-jank by:
1. Using IntersectionObserver (no scroll events)
2. Single boolean state toggle (minimal React work)
3. GPU-only animations (transform, opacity, bg-color, shadow)
4. `will-change` and `translate3d` hints
5. Reduced blur intensity for performance

