

# Update Gokstad Akademiet Case Study

## What changes

Update the Gokstad case study with the new campaign data you provided. The metrics and content have improved since the first version.

## Key updates

- **Header GIF**: New URL (`ad-gifs/3818527.gif`)
- **Challenge text**: Rewritten to focus on connecting with next-gen IT professionals
- **Solution section**: Now includes a two-column GIF gallery showing campaign creatives, plus updated copy (49 categories, 22 creators)
- **Impact section**: Updated CTR from 1.01% to 1.22%, updated views from 54K+ to 100K+
- **Results**: 100K+ views, 1.22% CTR, 22 creators, 49 categories
- **Video**: Updated to new video URL with English subtitle track
- **CTA link**: Points to contact page (`/demo`) instead of external URL

## Files to change

### 1. `src/components/blog/GokstadCaseStudy.tsx`
- Replace header GIF source
- Rewrite Challenge paragraph
- Add GIF gallery (two side-by-side GIFs) to Solution section with updated copy
- Update Impact text and keep the analysis image
- Update Results list with new numbers
- Update video source URL and add subtitle track
- Update CTA to link internally

### 2. `src/data/blogPosts.ts` (lines 37-67)
- Update excerpt to reflect new metrics (1.22% CTR, 22 creators, 100K+ views)
- Update header image URL to new GIF
- Update SEO descriptions across all languages with new stats
- Update date to Feb 20, 2025

