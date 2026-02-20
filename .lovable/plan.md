

# Remove Three Sections

## What gets removed

1. **Stat Counters** (40+ Nordic streamers, 2.5M+ impressions, 2.8% CTR, 8 campaigns) from the homepage
2. **Common Questions** (FAQ accordion) from the homepage
3. **Earnings Calculator** from the Streamers page

## Changes

| File | Change |
|------|--------|
| `src/pages/Index.tsx` | Remove `StatCounters` and `HomepageFAQ` imports and their usage from the page |
| `src/components/sections/StreamerSection.tsx` | Remove `EarningsCalculator` import and its usage from the streamer page |

The component files themselves (`StatCounters.tsx`, `HomepageFAQ.tsx`, `EarningsCalculator.tsx`) can be left in place or deleted -- they simply won't be rendered anywhere.

