
# Plan: Fix TwitchStatsDashboard Chart Rendering Error

## Issue Identified

The error occurs in the "Quarterly Hours Watched" chart section of the `TwitchStatsDashboard` component. This is a known Recharts issue where chart animations cause crashes during rapid visibility state changes (such as when components are lazy-loaded via React Suspense).

The project already has a documented fix for this in `LiveDashboard.tsx` - disabling animations with `isAnimationActive={false}`.

## Root Cause

Recharts charts with animations enabled can crash when:
- Components are lazy-loaded via `React.lazy()`
- Visibility changes rapidly (intersection observer + count-up animations)
- Multiple charts render simultaneously

The `TwitchStatsDashboard`, `TopGamesDashboard`, and `PlatformComparisonDashboard` components all lack the `isAnimationActive={false}` prop that prevents these crashes.

## Solution

Add `isAnimationActive={false}` to all chart elements in the affected dashboard components:

### Files to Modify

| File | Charts to Update |
|------|------------------|
| `src/components/blog/TwitchStatsDashboard.tsx` | Area, Pie (x3), Bar |
| `src/components/blog/TopGamesDashboard.tsx` | Bar, Pie (x2) |
| `src/components/blog/PlatformComparisonDashboard.tsx` | Bar (x2), Pie, Radar |

### Changes Per Component

**TwitchStatsDashboard.tsx:**
- Line 104: `<Area ... isAnimationActive={false} />`
- Lines 120-131, 146-157, 177-188: `<Pie ... isAnimationActive={false} />`
- Line 214: `<Bar ... isAnimationActive={false} />`

**TopGamesDashboard.tsx:**
- All `<Bar>` and `<Pie>` components need `isAnimationActive={false}`

**PlatformComparisonDashboard.tsx:**
- All `<Bar>`, `<Pie>`, and `<Radar>` components need `isAnimationActive={false}`

## Expected Result

After this fix:
- Charts will render without crashing on lazy-load
- The error dialog will no longer appear
- All dashboard visualizations will display correctly
- Slight trade-off: no entrance animations on charts (acceptable for stability)

## Technical Notes

This follows the existing pattern established in `LiveDashboard.tsx` which already uses `isAnimationActive={false}` for the same reason.
