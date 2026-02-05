

# Plan: Overhaul TwitchStatsDashboard with Better Layout and More Data

## Problems to Fix

1. **Layout issues**: The stat cards still look awkward due to the `suffix` prop containing multi-character strings like "B hrs" which get appended after the animated number, creating visual clutter
2. **Too little data**: The dashboard only covers 5 sections (key metrics, quarterly hours, market share, content split, demographics, geography). The StreamHatchet 2025 report contains significantly more data that would make this a richer, more authoritative resource

## Changes

### 1. Fix TwitchStatsDashboard Stat Cards

The current stat cards use `format="raw"` with decimal values like `19.2` and suffix `"B"`. This works correctly with the StatCard component. The real issue is that some cards may look off because:
- The trend text adds a third line making cards uneven heights
- Need to verify all 4 cards have consistent content density

**Fix**: Ensure all stat cards have a trend value so they all render 3 lines consistently. The StatCardGrid with `items-stretch` and `min-h-[120px]` should handle the rest.

### 2. Add Significantly More Data Sections

Expand the dashboard from 5 sections to 10+ sections using verified data from StreamHatchet 2025 and cross-referenced industry sources:

**New data arrays and chart sections to add:**

#### a) Top Streamers 2025 (Table + Bar Chart)
- KaiCenat, Jynxzi, ibai, Gaules, xQc and others with hours watched
- Most watched streamers by total hours

#### b) Concurrent Viewership Trend (Line Chart)
- Average concurrent viewers by quarter (2024 vs 2025)
- ~2.3M average concurrent viewers

#### c) Streamer Activity Stats (Stat Cards)
- 7.4M active streamers
- 91,400 avg concurrent live channels
- ~25 viewers per stream average
- 48,000 hours watched per minute on Twitch

#### d) Content Category Breakdown (Stacked Bar Chart)
- Just Chatting, League of Legends, GTA V, Fortnite, Valorant, etc.
- Show top 10 categories by hours watched

#### e) Year-over-Year Comparison (Grouped Bar Chart)
- 2024 vs 2025 side-by-side for key metrics
- Hours watched, market share, channels, peak concurrent

#### f) Weekly Viewership Pattern (Area Chart)
- Viewership peaked at 810M hours in July 2025
- Show weekly pattern with notable peaks

#### g) Platform Revenue & Creator Economy (Stat Cards)
- Twitch subscription revenue split (50% base / 70% Partner Plus)
- Comparison context with Kick's 95% split
- Sponsored content growth +71% YoY

#### h) Esports Viewership (Bar Chart)
- 654M hours of esports content per quarter
- Top esports events and peak viewers
- LoL Worlds 2024 peaked at 6.7M concurrent

#### i) Engagement Metrics (Stat Cards)
- 8x longer viewing time vs on-demand video
- Average session 25.4 minutes
- 42.8% of Gen Z internet users watch live streams

### 3. Update Blog Post Content

Update the markdown content in `blogPosts.ts` for this post to include all the new data sections with proper headings that match the dashboard sections.

## Files to Modify

| File | Changes |
|------|---------|
| `src/components/blog/TwitchStatsDashboard.tsx` | Major expansion: add ~8 new data arrays and chart sections |
| `src/data/blogPosts.ts` | Update the blog post content to reference all new sections |

## Technical Details

- All new charts use `isAnimationActive={false}` per project convention
- All new stat cards use the shared `StatCard` and `StatCardGrid` components
- Consistent chart styling: `bg-card/30 border border-border/30 rounded-xl p-6`
- Tooltip styling matches existing pattern
- Data sourced from StreamHatchet 2025, TwitchTracker, and cross-referenced industry reports (Teleprompter.com, Adam Connell compilations)

## Expected Result

- A comprehensive, data-rich dashboard that positions Beta Ads as an authoritative source on Twitch statistics
- All stat cards render consistently across mobile and desktop
- 10+ interactive chart sections instead of the current 5
- Better SEO value due to richer content
- More reasons for media agencies and brands to engage with the page

