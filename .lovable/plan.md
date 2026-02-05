

# Plan: Fix Blog Background and Simplify About Page

## 1. Blog Page Background

**File:** `src/pages/Blog.tsx` (line 178)

The Blog page wraps everything in `min-h-screen bg-background`, which creates an opaque layer that blocks the shared aurora/ambient background rendered by `AnimatedBackground` in the Layout. Other pages like Index and Streamers do not use `bg-background` on their outer wrapper, allowing the aurora to show through.

**Change:** Remove `bg-background` from the outer div, matching the pattern used by other pages:

```tsx
// Before
<div className="min-h-screen bg-background pt-24 pb-16">

// After
<div className="min-h-screen pt-24 pb-16">
```

## 2. About Page -- Single Photo Only

**File:** `src/pages/AboutUs.tsx`

Remove the secondary images grid (lines 104-129) and the unused imports for `founderImage2`, `founderImage3`, `founderImage4` (lines 8-9), the `secondaryImages` array (lines 17-21), and the `useMultipleScrollAnimations` hook usage. Keep only the main hero image of Andreas.

Also remove `bg-background` from the About page outer div (line 28) to match the same aurora background fix.

**Changes:**
- Remove imports: `founderImage2`, `founderImage3`, `founderImage4`
- Remove `useMultipleScrollAnimations` from the import and its usage
- Remove the `secondaryImages` array
- Remove the entire "Secondary Images Grid" section
- Change outer div from `min-h-screen bg-background text-foreground` to `min-h-screen text-foreground`

## Files to Modify

| File | Change |
|------|--------|
| `src/pages/Blog.tsx` | Remove `bg-background` from outer wrapper |
| `src/pages/AboutUs.tsx` | Remove secondary images grid, unused imports, and `bg-background` |

