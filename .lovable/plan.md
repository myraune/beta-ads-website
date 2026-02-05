

# Add Gokstad Akademiet Case Study to Blog

## Overview
Add a new case study blog post for the Gokstad Akademiet campaign, following the exact same pattern as the Glorious O3 case study.

## Files to Create

### 1. `src/components/blog/GokstadCaseStudy.tsx`
A new React component mirroring the structure of `GloriousCaseStudy.tsx` with:
- Header GIF: `https://storage.googleapis.com/livad-blog/3498/3790256.gif`
- **Challenge** section: Recruiting students for Autumn 2026 by targeting gamers interested in tech/creativity
- **Solution** section: Live Stream Overlay across 19 channels with streamer-endorsed messaging
- **Impact** section: 1.01% CTR, qualified traffic to application portal
- **Results** section: 54K+ Completed Views, 1.01% CTR, 19 Creators, 31 Categories
- Performance analysis image: `https://storage.googleapis.com/livad-blog/3498/analysis_campaign_3498.png`
- Video embed: `https://storage.googleapis.com/livad-blog/3498/combined_campaign_3498_20260205_150643.mp4`

## Files to Modify

### 2. `src/data/blogPosts.ts`
Add a new blog post entry at the top of the array with:
- **slug**: `gokstad-akademiet-gamer-recruitment`
- **title**: "Case Study: Gokstad Akademiet Recruits Gamers"
- **category**: "Case Studies"
- **hasDashboard**: `"gokstad-case-study"`
- **date**: "Feb 5, 2025"
- Localized SEO metadata (en, no, sv, fi)
- **relatedSlugs** linking to the Glorious case study (and vice versa)

### 3. `src/pages/BlogPost.tsx`
- Add lazy import for `GokstadCaseStudy`
- Add rendering condition: `{post.hasDashboard === "gokstad-case-study" && <GokstadCaseStudy />}`

## Technical Details
- Component uses the same Tailwind classes and structure as `GloriousCaseStudy.tsx` for visual consistency
- `hasDashboard` triggers the wider `max-w-7xl` layout automatically
- All media assets are externally hosted on Google Cloud Storage (no uploads needed)

