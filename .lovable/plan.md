

# Plan: SEO-Optimized Blog Improvements

## Overview

Based on Google Search Console data, the blog has high impressions but critically low CTR. This plan addresses all 5 recommendations to convert that search visibility into actual traffic.

---

## Google Search Console Data Analysis

| Page | Impressions | Clicks | CTR | Position | Issue |
|------|-------------|--------|-----|----------|-------|
| `/blog/most-watched-twitch-games-2025` | 2,144 | 9 | 0.4% | 9.0 | Generic title |
| `/blog/twitch-statistics-2025-global-insights` | 2,080 | 3 | 0.1% | 8.2 | Title not compelling |
| `/blog/twitch-vs-youtube-gaming-2025` | 1,252 | 1 | 0.1% | 6.4 | Weak meta description |
| `/blog` | 79 | 1 | 1.3% | 8.4 | Plain landing page |
| `/blog/nordic-twitch-market-2025` | 175 | 2 | 1.1% | 9.0 | Missing value proposition |

---

## Part 1: Rewrite SEO Metadata for Top 5 Posts

Improve titles and descriptions to be more click-worthy using power words, numbers, and clear value propositions.

**File: `src/data/blogPosts.ts`**

### Post 1: twitch-statistics-2025-global-insights

| Current | New |
|---------|-----|
| Title: "Twitch Statistics 2025: Global Platform Insights \| Beta Ads" | Title: "Twitch Statistics 2025: 240M Users, Demographics & Ad Trends \| Beta Ads" |
| Description: "Interactive dashboard with Twitch platform statistics 2025..." | Description: "Live dashboard: 240M monthly users, 35M daily active, $1.78B revenue. Get the demographics and ad benchmarks that top advertisers use." |

### Post 2: most-watched-twitch-games-2025

| Current | New |
|---------|-----|
| Title: "Most Watched Twitch Games & Categories 2025 \| Beta Ads" | Title: "Top 20 Twitch Games 2025: Hours Watched & Trending Categories \| Beta Ads" |
| Description: "Interactive dashboard of most watched Twitch games and categories 2025..." | Description: "Just Chatting leads with 3.2B hours. See the full ranking of games, top streamers, and year-over-year viewing trends advertisers need." |

### Post 3: twitch-vs-youtube-gaming-2025

| Current | New |
|---------|-----|
| Title: "Twitch vs YouTube Gaming 2025 \| Platform Comparison \| Beta Ads" | Title: "Twitch vs YouTube Gaming 2025: Which Platform Converts Better? \| Beta Ads" |
| Description: "Compare Twitch and YouTube Gaming for advertisers..." | Description: "Head-to-head comparison: user metrics, engagement rates, and ROI data. Find out which platform delivers better results for your ad spend." |

### Post 4: nordic-twitch-market-2025

| Current | New |
|---------|-----|
| Title: "Nordic Twitch Market Overview 2025 \| Beta Ads" | Title: "Nordic Twitch Market 2025: Sweden, Norway, Finland Growth Data \| Beta Ads" |
| Description: "Interactive dashboard of Nordic Twitch markets." | Description: "Compare viewership across all Nordic countries. Growth rates, top streamers, and advertising opportunities in the Scandinavian market." |

### Post 5: samsung-twitch-campaign-case-study

| Current | New |
|---------|-----|
| Title: "Samsung Twitch Campaign Case Study \| 2.5M Viewers \| Beta Ads" | Title: "Samsung Twitch Case Study: 2.5M Viewers, 89% Positive Sentiment \| Beta Ads" |
| Description: "See how Samsung reached 2.5M unique viewers on Twitch..." | Description: "How Samsung achieved 4.7% engagement and 3.2% CTR with native overlay ads. Full campaign breakdown with results and learnings." |

---

## Part 2: Featured Collection on Blog Homepage

Add a "Twitch Insights Hub" section at the top of the blog to highlight the high-performing data posts.

**File: `src/pages/Blog.tsx`**

### New Featured Section Structure

```text
+------------------------------------------------------------------+
|  TWITCH INSIGHTS HUB                                              |
|  "Data-driven insights for smarter advertising decisions"         |
+------------------------------------------------------------------+
|                                                                   |
|  [Twitch Stats]    [Top Games]    [Twitch vs YT]                 |
|   Full-width thumbnail grid with Interactive Dashboard badges     |
|                                                                   |
+------------------------------------------------------------------+
|                                                                   |
|  [Rest of blog as-is]                                            |
|                                                                   |
+------------------------------------------------------------------+
```

### Implementation

1. Create a `featuredPosts` array with slugs of the top 3 dashboard posts
2. Render a new section before the existing Featured Post
3. Use 3-column grid with large thumbnails and "Interactive Dashboard" badges
4. Add section headline and subtitle

---

## Part 3: Sticky CTA Sidebar on Blog Posts

Add a persistent call-to-action on the right side of blog content.

**File: `src/pages/BlogPost.tsx`**

### Desktop: Sticky Sidebar

```text
+-------------------------------------+  +------------------+
|                                     |  | START YOUR       |
|  [Blog Content]                     |  | TWITCH CAMPAIGN  |
|                                     |  |                  |
|  ...                                |  | [Book a Call]    |
|                                     |  |                  |
|                                     |  | Or request a     |
|                                     |  | [Free Demo]      |
+-------------------------------------+  +------------------+
```

### Mobile: Inline CTA Banner

Insert a subtle CTA banner at approximately 40% through the content.

### Implementation

1. Add a new `StickyCTA` component with `sticky top-24` positioning
2. Include primary CTA "Book a Call" linking to Google Calendar
3. Secondary CTA "Watch Demo" linking to `/demo`
4. Style with subtle background, rounded corners, matching design system

---

## Part 4: In-Content Related Reading Links

Improve internal linking between related posts using inline "See also" callouts.

**File: `src/data/blogPosts.ts`**

### Add New Field: `relatedSlugs`

```typescript
interface BlogPost {
  // ... existing fields
  relatedSlugs?: string[]; // New field for explicit internal links
}
```

### Example Mapping

| Post | Related Posts |
|------|---------------|
| twitch-statistics-2025 | most-watched-twitch-games-2025, twitch-vs-youtube-gaming-2025 |
| most-watched-twitch-games-2025 | twitch-statistics-2025, nordic-twitch-market-2025 |
| twitch-vs-youtube-gaming-2025 | twitch-statistics-2025, twitch-advertising-benchmarks-2025 |

**File: `src/pages/BlogPost.tsx`**

Add a "Related Reading" box after the first major section or dashboard, with direct links styled as inline cards.

---

## Part 5: Redesigned Blog Homepage

Transform the `/blog` page from a basic list to an authoritative hub.

**File: `src/pages/Blog.tsx`**

### New Header

| Current | New |
|---------|-----|
| "Blog" | "Beta Ads Insights" |
| Generic subtitle | "Data-driven guides for the Nordic streaming market" |

### New Category Filters

Add prominent filter buttons:
- [All]
- [Twitch Insights] (Statistics & Data + Trends)
- [Case Studies]
- [Nordic Market]
- [How-To Guides]

### Hero Featured Post

Make the first post span full-width with larger dimensions when no filters are active.

---

## File Changes Summary

| File | Changes |
|------|---------|
| `src/data/blogPosts.ts` | Rewrite SEO titles/descriptions for top 5 posts, add `relatedSlugs` field |
| `src/pages/Blog.tsx` | Add Featured Collection section, update header copy, improve category filters |
| `src/pages/BlogPost.tsx` | Add sticky CTA sidebar, inline mobile CTA, Related Reading box |

---

## Expected Impact

| Metric | Current | Target |
|--------|---------|--------|
| CTR (twitch-statistics) | 0.1% | 2-3% |
| CTR (most-watched-games) | 0.4% | 2-4% |
| CTR (/blog) | 1.3% | 3-5% |
| Avg. Time on Page | Unknown | +30% (from interlinking) |
| Conversion (CTA clicks) | None tracked | New tracking opportunity |

---

## Technical Notes

- All SEO changes use existing `seoTitle` and `seoDescription` fields in `blogPosts.ts`
- Sticky sidebar uses `position: sticky` with `top: 6rem` (96px) to clear navbar
- Featured Collection respects existing category filter logic
- Mobile CTA uses a new component inserted via markdown renderer or conditional block

