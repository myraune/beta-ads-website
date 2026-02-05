
# Plan: Fix Case Studies Visibility

## Problem Identified

The current layout on desktop only displays 5 of the 8 case studies:
- 1 main featured card (shows selected case study)
- 4 thumbnail cards in the grid (`slice(1, 5)`)
- Case studies 6, 7, and 8 (indices 5, 6, 7) are hidden on desktop

The remaining 3 case studies only appear on mobile in a separate section (`slice(5)`), creating a confusing experience where users on desktop cannot see all campaigns.

```text
Current Desktop:
+------------------+   +-------+-------+
|                  |   |   2   |   3   |
|   MAIN (1)       |   +-------+-------+
|                  |   |   4   |   5   |
+------------------+   +-------+-------+
                       
                       [6, 7, 8 are HIDDEN]
```

## Proposed Solution

Show all 8 case studies in the thumbnail grid by changing the layout:

```text
New Desktop:
+------------------+   +-------+-------+-------+
|                  |   |   2   |   3   |   4   |
|   MAIN (1)       |   +-------+-------+-------+
|                  |   |   5   |   6   |   7   |
+------------------+   +-------+-------+-------+
                       |        8              |
                       +-----------------------+
```

## Technical Changes

**File: `src/pages/CaseStudies.tsx`**

| Current | Change |
|---------|--------|
| `caseStudies.slice(1, 5)` | `caseStudies.filter((_, i) => i !== caseStudyIndex)` |
| `grid-cols-2` for thumbnails | `grid-cols-2 lg:grid-cols-3` for better layout |
| Separate mobile section | Unified layout for all devices |

### Updated Thumbnail Grid Code

```tsx
{/* Thumbnail Grid - Show all except current */}
<div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
  {caseStudies
    .map((study, index) => ({ study, index }))
    .filter(({ index }) => index !== caseStudyIndex)
    .map(({ study, index }) => (
      <div 
        key={study.id}
        className="group cursor-pointer relative aspect-video rounded-xl overflow-hidden bg-card/40 transition-all duration-300 shadow-lg shadow-black/10"
        onClick={() => setCaseStudyIndex(index)}
      >
        {/* ... thumbnail content ... */}
      </div>
    ))}
</div>
```

### Remove Mobile-Only Section

Delete the `lg:hidden` section that shows `caseStudies.slice(5)` since all case studies will now be visible in the unified grid.

## Result

- All 8 case studies visible on desktop
- Clicking any thumbnail makes it the main featured card
- The currently selected card is excluded from the grid (no duplication)
- Cleaner, unified layout for all screen sizes
- Navigation arrows still work for cycling through all case studies
