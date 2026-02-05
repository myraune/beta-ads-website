
# Plan: Fix Stat Card Number Overflow

## Issue

The animated stat cards in the TwitchStatsDashboard show numbers overflowing outside their container boxes on smaller screens. This happens because:
- The grid uses `grid-cols-2` on mobile, making cards narrower
- Font size `text-3xl lg:text-4xl` is too large for narrow cards
- No text truncation or responsive sizing is applied

## Solution

Update the `AnimatedStatCard` component styling to:
1. Use responsive font sizes that scale down on smaller screens
2. Add `overflow-hidden` to prevent text escaping the container
3. Use `min-w-0` to allow flex/grid items to shrink properly
4. Adjust padding for smaller screens

## File to Modify

`src/components/blog/TwitchStatsDashboard.tsx`

## Changes

Update the AnimatedStatCard component (lines 59-67):

```tsx
return (
  <div ref={ref} className="bg-card/50 border border-border/30 rounded-xl p-4 lg:p-6 text-center min-w-0 overflow-hidden">
    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-2 truncate">
      {displayValue}{suffix}
    </div>
    <div className="text-xs sm:text-sm text-muted-foreground">{label}</div>
    {trend && <div className="text-xs text-muted-foreground mt-1">{trend}</div>}
  </div>
);
```

## Technical Details

| Property | Before | After |
|----------|--------|-------|
| Container padding | `p-6` | `p-4 lg:p-6` |
| Container overflow | none | `overflow-hidden min-w-0` |
| Number font size | `text-3xl lg:text-4xl` | `text-2xl sm:text-3xl lg:text-4xl` |
| Label font size | `text-sm` | `text-xs sm:text-sm` |

## Expected Result

- Numbers will stay within card boundaries on all screen sizes
- Cards will scale gracefully from mobile to desktop
- Visual hierarchy is preserved with proportional scaling
