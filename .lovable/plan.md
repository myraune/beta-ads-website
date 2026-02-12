

# Fix All Carousel Animations

## Problem

The `prefers-reduced-motion` media query at the bottom of `src/index.css` still disables `.animate-scroll-smooth` (line 613), which is the animation class used by the client logo carousel (TrustedBy component). The previous fix only removed `.animate-scroll` but missed this one.

## Fix

Remove `.animate-scroll-smooth` from the reduced-motion block in `src/index.css` (line 613), so both carousels always animate:

- `.animate-scroll` (Ad Formats carousel) -- already fixed
- `.animate-scroll-smooth` (Client logos carousel) -- needs fixing

This is a single-line removal in the `@media (prefers-reduced-motion: reduce)` block.

