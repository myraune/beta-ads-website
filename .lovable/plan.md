

# Plan: Replace Remaining Old Blog Post Images

## Overview

Replace the 5 remaining blog posts that still use old UUID-based screenshots with the new professional Twitch-themed images you just uploaded.

---

## Current State Analysis

| Post | Current Image | Status |
|------|---------------|--------|
| samsung-twitch-campaign-case-study | `a3645b32-...png` | OLD - needs replacement |
| twitch-annonsering-norge-guide | `4d784a07-...png` | OLD - needs replacement |
| twitch-reklam-sverige-guide | `f46743e1-...png` | OLD - needs replacement |
| twitch-mainonta-suomi-opas | `27d437c0-...png` | OLD - needs replacement |
| twitch-advertising-benchmarks-2025 | `958b1a7f-...png` | OLD - needs replacement |

---

## Image Mapping

| New Image | Visual Content | Best Use For |
|-----------|----------------|--------------|
| `twitch_chatting.webp` | "Get chatting" desktop with live chat panel | Samsung Case Study (engagement/community) |
| `twitch_overview.webp` | "Easily access favorites" tablet dashboard | Twitch Advertising Benchmarks (data/overview) |
| `twitch_phone_2.webp` | "Easily access favorites" mobile view | Norway Guide (clean, accessible) |
| `twitch_phone_1.webp` | DJ streaming "Discover new streams" | Sweden Guide (discovery, creators) |
| `twitch_browsing.webp` | "Improved browsing" tablet interface | Finland Guide (browsing/search) |

---

## Files to Change

### 1. Copy New Images to Project

```text
user-uploads://twitch_chatting.webp → public/lovable-uploads/blog-twitch-chatting.webp
user-uploads://twitch_overview.webp → public/lovable-uploads/blog-twitch-overview.webp
user-uploads://twitch_phone_2.webp → public/lovable-uploads/blog-twitch-favorites.webp
user-uploads://twitch_phone_1.webp → public/lovable-uploads/blog-twitch-discover.webp
user-uploads://twitch_browsing.webp → public/lovable-uploads/blog-twitch-browsing.webp
```

### 2. Update Blog Post Data

**File: `src/data/blogPosts.ts`**

| Post Slug | Current | New |
|-----------|---------|-----|
| `samsung-twitch-campaign-case-study` | `a3645b32-...png` | `blog-twitch-chatting.webp` |
| `twitch-advertising-benchmarks-2025` | `958b1a7f-...png` | `blog-twitch-overview.webp` |
| `twitch-annonsering-norge-guide` | `4d784a07-...png` | `blog-twitch-favorites.webp` |
| `twitch-reklam-sverige-guide` | `f46743e1-...png` | `blog-twitch-discover.webp` |
| `twitch-mainonta-suomi-opas` | `27d437c0-...png` | `blog-twitch-browsing.webp` |

---

## Result

After this update:
- All 14 blog posts will have professional, cohesive Twitch-themed imagery
- No more UUID-based screenshots in blog thumbnails
- Consistent visual style across the entire Blog page and Featured Insights Hub

---

## Technical Details

- Line 200: samsung-twitch-campaign-case-study image field
- Line 365: twitch-annonsering-norge-guide image field
- Line 447: twitch-reklam-sverige-guide image field  
- Line 529: twitch-mainonta-suomi-opas image field
- Line 794: twitch-advertising-benchmarks-2025 image field

