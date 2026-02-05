
# Plan: Fix Blog Navigation and Widen Dashboard Layout

## Issues Found

1. **Wrong back link**: In `src/pages/BlogPost.tsx` line 144, the "Back to Blog" link points to `/about` instead of `/blog`
2. **Narrow dashboard layout**: The article container uses `max-w-4xl` (896px) for all posts, which is too narrow for data-rich dashboard posts with charts, tables, and stat grids

## Changes

### 1. Fix Back to Blog Link

**File:** `src/pages/BlogPost.tsx` (line 144)

Change the Link destination from `/about` to `/blog`:

```tsx
// Before
<Link to="/about" ...>

// After  
<Link to="/blog" ...>
```

### 2. Widen Layout for Dashboard Posts

**File:** `src/pages/BlogPost.tsx` (line 141)

Use conditional width based on whether the post has a dashboard:
- Regular blog posts: Keep `max-w-4xl` (896px) for optimal text readability
- Dashboard posts: Use `max-w-7xl` (1280px) to give charts and stat cards room to breathe

```tsx
// Before
<div className="max-w-4xl mx-auto px-4">

// After
<div className={`${post.hasDashboard ? 'max-w-7xl' : 'max-w-4xl'} mx-auto px-4`}>
```

This gives the Twitch Statistics dashboard nearly 400px more horizontal space.

## Files to Modify

| File | Line | Change |
|------|------|--------|
| `src/pages/BlogPost.tsx` | 144 | Fix link to `/blog` |
| `src/pages/BlogPost.tsx` | 141 | Conditional `max-w-7xl` for dashboard posts |

## Result

- "Back to Blog" now correctly returns to `/blog` (blog index page)
- Dashboard posts use full-width layout (1280px max) for better chart and stat card display
- Regular markdown posts keep their current readable width (896px)
