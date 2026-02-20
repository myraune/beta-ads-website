

# Update Gokstad Akademiet Case Study

## What changes

Replace the content in the Gokstad case study component with updated information, new media assets, and a revised layout.

## Key updates

- **Header GIF**: New URL (`https://storage.googleapis.com/ad-gifs/3818527.gif`)
- **Challenge section**: Rewritten copy about connecting with next-gen IT/design professionals
- **Solution section**: New two-column GIF gallery added (two side-by-side GIFs), plus updated copy about 49 categories and 22 creators
- **Impact section**: Updated text referencing 1.22% CTR and 100K+ completed views (same analysis image kept)
- **Results section**: Updated metrics: 100K+ Completed Views, 1.22% CTR, 22 Creators, 49 Categories
- **Video section**: New video URL (`combined_campaign_3498_20260220_053553.mp4`) with subtitle track (`combined_trimmed_386_20260220_053313.vtt`)
- **CTA**: Updated to link to `/contact` (internal) instead of external livad.stream URL

## Technical details

**File: `src/components/blog/GokstadCaseStudy.tsx`**

Full rewrite of the component content:

1. Update header GIF src
2. Rewrite Challenge paragraph
3. Add a two-column GIF gallery in the Solution section using `flex gap-4` layout with two images
4. Rewrite Solution paragraph
5. Rewrite Impact paragraph (keep existing analysis image)
6. Update Results list values (100K+, 1.22%, 22, 49)
7. Update video source URL and add a `<track>` element for English subtitles
8. Update the CTA link to use React Router `Link` to `/contact` instead of external URL

No changes needed to `blogPosts.ts` or `BlogPost.tsx`.

