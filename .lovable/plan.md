

# Fix Navbar Dimensions and Layout

## Problem
The navbar lacks a fixed height, uses absolute positioning for center links which can cause overlap, and the mobile bar height is inconsistent. The layout needs tighter control with proper flexbox distribution.

## Changes (single file: `src/components/Navbar.tsx`)

### Desktop navbar
- Set the pill container to a fixed height of `h-[52px]` (fits within the 60-80px range including the `pt-6` top padding)
- Remove `absolute left-1/2 -translate-x-1/2` from the nav links div -- replace with proper flexbox: make the three sections (logo, links, buttons) use `flex-1` so they share space evenly
- Logo section: `flex-1 flex justify-start`
- Links section: `flex-1 flex justify-center gap-3`
- Buttons section: `flex-1 flex justify-end gap-2`
- This eliminates any overlap risk and spaces everything evenly

### Mobile navbar
- Set the top bar to a fixed height of `h-[60px]` with `px-4` padding
- Keep the existing hamburger menu behavior unchanged

### Technical detail

**Line 42**: Add `h-[52px] flex items-center` to the pill container, remove `py-2.5` (height is now explicit)

**Lines 51-74**: Restructure the three-column layout:
```
<div className="flex items-center w-full">
  <div className="flex-1 flex justify-start">  <!-- logo -->
  <div className="flex-1 flex justify-center gap-3">  <!-- links -->
  <div className="flex-1 flex justify-end gap-2">  <!-- buttons -->
</div>
```

**Line 104**: Change `py-3` to `h-[60px]` for consistent mobile height

