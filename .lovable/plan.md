

# Fix Navbar Layout

## Problem
The screenshot shows the nav links ("For brands", "For streamers", "Pricing") are wrapping onto two lines and not vertically centered within the pill. The `h-[52px]` container doesn't pass its height to the inner flex div, and the `max-w-[900px]` constraint makes the three `flex-1` columns too tight, causing text wrap.

## Solution

**File: `src/components/Navbar.tsx`**

1. **Add `h-full` to the inner flex container** (line 51) so items vertically center within the 52px pill
2. **Remove `flex-1` from the center nav links div** -- instead use `flex-shrink-0` so links never wrap. The left and right columns keep `flex-1` to push the links to center naturally
3. **Add `whitespace-nowrap`** to each nav link to prevent text wrapping
4. **Widen the pill** from `max-w-[900px]` to `max-w-[960px]` to give more breathing room

Changes at a glance:
- Line 42: `max-w-[900px]` becomes `max-w-[960px]`
- Line 51: `flex items-center w-full` becomes `flex items-center w-full h-full`
- Line 62: `flex-1 flex justify-center gap-3` becomes `flex items-center justify-center gap-1`
- Line 67: Add `whitespace-nowrap` to each nav link class
- Line 78: Keep `flex-1 flex justify-end gap-2` as-is

This ensures the center links stay on one line, are truly centered, and the pill has proper vertical alignment.

