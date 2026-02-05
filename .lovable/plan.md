

# Plan: Refactor Stat Cards to Responsive CSS Grid

## Current State

The `StatCard` and `StatCardGrid` components currently use:
- Grid classes: `grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4`
- Card styling: `rounded-xl p-4 sm:p-5 lg:p-6 text-center`
- No consistent minimum height or flex centering

## Changes

### 1. Update StatCardGrid Component

**File:** `src/components/blog/StatCard.tsx` (lines 104-109)

Update the grid wrapper to use the exact classes requested:

```tsx
export const StatCardGrid = ({ children, columns = 4 }: StatCardGridProps) => {
  const gridClass = columns === 3 
    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch'
    : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch';
  
  return <div className={gridClass}>{children}</div>;
};
```

### 2. Update StatCard Component

**File:** `src/components/blog/StatCard.tsx` (lines 67-88)

Update the card container styling:

| Property | Before | After |
|----------|--------|-------|
| Width | implicit | `w-full min-w-0` |
| Border radius | `rounded-xl` | `rounded-2xl` |
| Border | conditional | `border border-border/30` (always) |
| Layout | `text-center` | `flex flex-col items-center justify-center` |
| Height | auto | `min-h-[120px]` |
| Overflow | none | `overflow-hidden` |

```tsx
return (
  <div 
    ref={ref} 
    className={`w-full min-w-0 rounded-2xl border p-4 sm:p-5 lg:p-6 
      flex flex-col items-center justify-center min-h-[120px] overflow-hidden ${
      highlight 
        ? 'bg-primary/20 border-primary/40' 
        : 'bg-card/50 border-border/30'
    }`}
  >
    <div 
      className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 tabular-nums text-center ${
        highlight ? 'text-primary' : 'text-primary'
      }`}
    >
      {displayValue}{suffix}
    </div>
    <div className="text-xs sm:text-sm text-muted-foreground leading-tight text-center">
      {label}
    </div>
    {trend && (
      <div className="text-xs text-muted-foreground/80 mt-1 text-center">{trend}</div>
    )}
  </div>
);
```

## Files to Modify

| File | Changes |
|------|---------|
| `src/components/blog/StatCard.tsx` | Update StatCard and StatCardGrid styling |

## Technical Summary

- **Grid:** `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch`
- **Cards:** `w-full min-w-0 rounded-2xl border flex flex-col items-center justify-center min-h-[120px] overflow-hidden`
- **Typography:** Centered with `text-center` on each text element
- **Height consistency:** `items-stretch` on grid + `min-h-[120px]` on cards ensures uniform height

