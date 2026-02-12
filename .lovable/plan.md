

# Fix Header Smoothness

## Problem
The global CSS rule `* { transition: background-color 0.3s ease, box-shadow 0.3s ease, color 0.15s ease; }` in `src/index.css` applies transitions to every element on the page, including the fixed navbar. When the rotating Nordic greeting updates every 3 seconds, it triggers repaints that cause the navbar to re-evaluate its transitions, creating visible jank.

## Solution

Two changes:

### 1. Scope the global transition rule (index.css)
Replace the blanket `*` selector with a more targeted approach. Remove the wildcard and instead apply theme transitions only where needed (cards, buttons, text elements) -- NOT on the fixed navbar or layout containers:

```css
/* Before */
* {
  transition: background-color 0.3s ease, box-shadow 0.3s ease, color 0.15s ease;
}

/* After */
a, p, span, h1, h2, h3, h4, h5, h6,
button, input, textarea, select,
.glass-card, .glass-card-hover,
[class*="bg-"], [class*="text-"], [class*="shadow-"] {
  transition: background-color 0.3s ease, box-shadow 0.3s ease, color 0.15s ease;
}
```

### 2. Remove duplicate transform on the Navbar (Navbar.tsx)
The navbar currently sets transform via both a Tailwind class AND an inline `style` prop, which can conflict. Remove the inline `style` attribute and keep only the Tailwind classes for the scroll animation.

## Files to modify

| File | Change |
|------|--------|
| `src/index.css` | Replace `*` transition selector with scoped selectors (around line 430) |
| `src/components/Navbar.tsx` | Remove the inline `style={{ transform: ... }}` prop from the desktop nav pill |
