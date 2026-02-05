

# Fix: Aurora Background Visibility on Blog and About Pages

## Problem

After comparing all pages via browser screenshots, the aurora background IS rendering on every page (it's in the shared Layout component). However, on the Blog and About pages, it appears much flatter than on the Homepage and Streamers page. The reason is content density -- the Blog and About pages immediately fill the viewport with text and cards starting from the top, leaving no visual breathing room for the aurora glow to be visible.

The Homepage and Streamers page both have spacious hero sections with open areas where the aurora shines through.

## Solution

Add a subtle top section gradient to the Blog and About pages that reinforces the aurora's appearance, matching the visual warmth seen on other pages. This is a lightweight approach that keeps the content structure unchanged while ensuring the background atmosphere is consistent across the site.

## Changes

### 1. `src/pages/Blog.tsx`

Add an absolute-positioned gradient overlay at the top of the page content that matches the aurora glow. This creates the same atmospheric effect seen on other pages.

```tsx
// Before (line 178)
<div className="min-h-screen pt-24 pb-16">

// After
<div className="min-h-screen pt-24 pb-16 relative">
  {/* Aurora reinforcement gradient */}
  <div 
    className="absolute inset-x-0 top-0 h-[500px] pointer-events-none z-0"
    style={{
      background: 'radial-gradient(ellipse 80% 70% at 30% 0%, hsl(0, 80%, 50%, 0.12), transparent 70%)',
    }}
  />
```

Also add a `relative z-10` to the inner content container so text stays above the gradient.

### 2. `src/pages/AboutUs.tsx`

Same treatment: add an aurora reinforcement gradient to the outer wrapper.

```tsx
// Before (line 18)
<div className="min-h-screen text-foreground">

// After
<div className="min-h-screen text-foreground relative">
  {/* Aurora reinforcement gradient */}
  <div 
    className="absolute inset-x-0 top-0 h-[500px] pointer-events-none z-0"
    style={{
      background: 'radial-gradient(ellipse 80% 70% at 30% 0%, hsl(0, 80%, 50%, 0.12), transparent 70%)',
    }}
  />
```

### 3. Add a Footer to the Blog page

The Blog page is currently missing a Footer (unlike all other pages), which also makes it feel incomplete. Add the Footer component at the end.

## Files to Modify

| File | Change |
|------|--------|
| `src/pages/Blog.tsx` | Add aurora reinforcement gradient, add Footer component |
| `src/pages/AboutUs.tsx` | Add aurora reinforcement gradient |

## Result

Both pages will show a warm red glow in the upper area, matching the atmospheric look of the Homepage and Streamers page. The effect is subtle and only affects dark mode (in light mode, the `body::before` pseudo-element already handles the ambient glow).

