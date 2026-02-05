

# Plan: Replace Blog Post Images with Professional Twitch-Themed Photos

## Overview

Replace the current "tacky screenshot" blog images with the 9 professional, polished images you uploaded. These new images have a cohesive Twitch visual aesthetic with purple backgrounds, professional photography, and clean branding that matches your site's design principles.

---

## Current State

The blog posts currently use old screenshots stored in `/lovable-uploads/` with random UUIDs. These look unprofessional and don't convey the quality of your brand.

---

## Image Mapping Plan

| Image File | Visual Content | Best Use For |
|------------|----------------|--------------|
| `twitch_logo.webp` | Clean Twitch logo on purple background | Twitch Statistics 2025 (hero/featured) |
| `how-to-stream-on-twitch.jpg` | Streamer with headphones, "LIVE" badge | How Twitch Advertising Works 2024 |
| `1-Twitch-YT-Featured.webp` | Twitch vs YouTube split logo | Twitch vs YouTube Gaming 2025 |
| `studio-ces24-twitch-nvidia.jpg` | Pro gamer at RGB setup | Nordic Twitch Market 2025 |
| `go_live_on_twitch.webp` | "Go live and create" app screenshot | Rise of Streamer-First Advertising |
| `unnamed_1.webp` | DJ streaming "Discover new streams" | Most Watched Twitch Games 2025 |
| `twitch_phone_4.webp` | Chat interface on mobile | Norwegian Twitch Streamers 2025 |
| `twitch_phone_3.webp` | Browse/search categories view | Swedish Twitch Streamers 2025 |
| `unnamed.webp` | "Get chatting" mobile view | Finnish Twitch Streamers 2025 |

---

## Files to Change

### 1. Copy Images to Project

Copy all 9 uploaded images to `public/lovable-uploads/` with clean, descriptive names:

```text
user-uploads://twitch_logo.webp → public/lovable-uploads/blog-twitch-logo.webp
user-uploads://how-to-stream-on-twitch.jpg → public/lovable-uploads/blog-twitch-streamer.jpg
user-uploads://1-Twitch-YT-Featured.webp → public/lovable-uploads/blog-twitch-vs-youtube.webp
user-uploads://studio-ces24-twitch-nvidia.jpg → public/lovable-uploads/blog-gaming-setup.jpg
user-uploads://go_live_on_twitch.webp → public/lovable-uploads/blog-go-live.webp
user-uploads://unnamed_1.webp → public/lovable-uploads/blog-dj-streaming.webp
user-uploads://twitch_phone_4.webp → public/lovable-uploads/blog-twitch-chat.webp
user-uploads://twitch_phone_3.webp → public/lovable-uploads/blog-twitch-browse.webp
user-uploads://unnamed.webp → public/lovable-uploads/blog-get-chatting.webp
```

### 2. Update Blog Post Data

**File: `src/data/blogPosts.ts`**

Update the `image` field for each relevant blog post:

| Blog Post | Current Image | New Image |
|-----------|---------------|-----------|
| `twitch-statistics-2025-global-insights` | `71765092-...png` | `blog-twitch-logo.webp` |
| `how-twitch-advertising-works-2024` | `71765092-...png` | `blog-twitch-streamer.jpg` |
| `twitch-vs-youtube-gaming-2025` | `a3645b32-...png` | `blog-twitch-vs-youtube.webp` |
| `nordic-twitch-market-2025` | `71765092-...png` | `blog-gaming-setup.jpg` |
| `rise-of-streamer-first-advertising` | `958b1a7f-...png` | `blog-go-live.webp` |
| `most-watched-twitch-games-2025` | `a3645b32-...png` | `blog-dj-streaming.webp` |
| `norwegian-twitch-streamers-2025-analytics` | `958b1a7f-...png` | `blog-twitch-chat.webp` |
| `swedish-twitch-streamers-2025` | `4d784a07-...png` | `blog-twitch-browse.webp` |
| `finnish-twitch-streamers-2025` | `cda69e31-...png` | `blog-get-chatting.webp` |

---

## Visual Preview of New Images

| Image | Description |
|-------|-------------|
| **twitch_logo.webp** | Bold Twitch wordmark on signature purple - perfect for statistics/data posts |
| **how-to-stream-on-twitch.jpg** | Pro streamer at keyboard with LIVE badge overlay - captures live energy |
| **1-Twitch-YT-Featured.webp** | Clean Twitch vs YouTube split design - ideal for comparison content |
| **studio-ces24-twitch-nvidia.jpg** | High-end gaming setup with Twitch/Nvidia branding - Nordic market appeal |
| **go_live_on_twitch.webp** | Colorful app screenshot with 3D mascots - engaging for trend content |
| **unnamed_1.webp** | DJ streaming with neon lights - shows diverse content beyond gaming |
| **twitch_phone_4.webp** | Mobile chat view with emotes - community engagement focus |
| **twitch_phone_3.webp** | Categories/browse view - discovery/search focused |
| **unnamed.webp** | "Get chatting" mobile interface - compact chat focus |

---

## Result

- All blog post thumbnails will have a consistent, professional Twitch aesthetic
- Images match the dark, modern, Twitch-native design principles in your project context
- Higher visual quality will improve perceived credibility and click-through rates
- Cohesive look across the Blog page and Featured Insights Hub

---

## Technical Notes

- All images saved as WebP/JPG for optimal web performance
- Images placed in `public/lovable-uploads/` to match existing asset structure
- No component changes needed - only data file updates for the `image` field

