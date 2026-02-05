
# Plan: Fix Stat Card Layout Properly

## Problem Analysis

The current stat cards break on smaller screens because:
1. A 4-column grid on 2-column mobile creates very narrow containers
2. Large numbers with locale formatting (e.g., "127,459") overflow narrow cards
3. The quick fix (truncation + tiny fonts) makes the cards look cramped and unreadable

## Solution: Responsive Stat Card System

### Approach
Create a proper responsive design that adapts gracefully across all screen sizes without truncation or cramped text.

### Changes

**1. Create Shared Stat Card Component**

Create `src/components/blog/StatCard.tsx` as a reusable component:
- Responsive grid that stacks to 1-col on very small screens, 2-col on mobile, 4-col on desktop
- Auto-fitting text using viewport-relative sizing where appropriate
- Compact number formatting built-in (e.g., 19.2B, 52.8%, 127K)
- Consistent styling across all dashboards

```
File: src/components/blog/StatCard.tsx

- Uses useInView and useCountUp hooks
- Accepts formatType prop: 'number' | 'percent' | 'currency' | 'compact'
- Auto-formats large numbers (thousands → K, millions → M, billions → B)
- Uses tabular-nums for alignment
- Responsive padding and font sizes without truncation
```

**2. Update TwitchStatsDashboard**

- Import the shared StatCard component
- Change grid from `grid-cols-2 lg:grid-cols-4` to `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`
- Remove the local AnimatedStatCard component
- Keep existing data structure

**3. Update FinnishStreamersDashboard**

- Import shared StatCard component  
- Apply same responsive grid pattern
- Remove local AnimatedStat component

**4. Update Other Dashboards**

Apply the same pattern to:
- `SwedishStreamersDashboard.tsx`
- `NorwegianStreamersDashboard.tsx`
- `NordicMarketDashboard.tsx`
- `TopGamesDashboard.tsx`
- `PlatformComparisonDashboard.tsx`

### Technical Details

| Breakpoint | Grid Columns | Card Padding | Number Size | Label Size |
|------------|--------------|--------------|-------------|------------|
| < 400px    | 1 column     | p-4          | text-3xl    | text-xs    |
| 400-640px  | 2 columns    | p-4          | text-3xl    | text-xs    |
| 640-1024px | 2 columns    | p-5          | text-3xl    | text-sm    |
| > 1024px   | 4 columns    | p-6          | text-4xl    | text-sm    |

### Number Formatting

Instead of displaying raw numbers that overflow:
- 19200000000 → 19.2B
- 127459 → 127,459 (fits at 3xl)
- 52.8 (with % suffix) → stays as-is

The component will auto-format based on magnitude while keeping the animated count-up effect.

### Expected Result

- Stat cards are readable at all screen sizes
- No text truncation or overflow
- Numbers animate smoothly
- Consistent look across all dashboard components
- Proper visual hierarchy maintained
