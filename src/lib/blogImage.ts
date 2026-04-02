/**
 * Blog post image resolver.
 *
 * Looks for photos in /blog-photos/{category}/ folders and matches them
 * to blog posts based on tags and category. Photos are distributed
 * deterministically so each post gets a unique image when possible.
 *
 * Upload structure:
 *   public/blog-photos/
 *     twitch/        — Twitch streams, UI, streamers
 *     kick/          — Kick platform content
 *     youtube/       — YouTube Gaming / YouTube Live
 *     esports/       — Tournaments, competitive gaming
 *     gaming/        — Gaming setups, gameplay, controllers
 *     streamers/     — Streamer photos, setups, behind-the-scenes
 *     analytics/     — Dashboards, charts, data visualizations
 *     nordic/        — Nordic-themed (offices, cities, brands)
 *     advertising/   — Ads, marketing, brand campaigns
 *     general/       — Fallback photos for any topic
 *
 * How matching works:
 *   1. Post tags + title are checked against folder names
 *   2. Best-matching folder is selected
 *   3. A photo is picked deterministically (hash of slug)
 *   4. If no custom photos exist, falls back to post.image from blogPosts.ts
 */

import { blogPosts, type BlogPost } from "@/data/blogPosts";

// Photo registry: populated by the build-time scan script or at runtime
// Maps folder name → array of filenames
const photoRegistry: Record<string, string[]> = {};
let registryLoaded = false;

// Tag-to-folder mapping: which tags suggest which photo folder
const tagFolderMap: Record<string, string[]> = {
  // Platform tags
  "Twitch":          ["twitch", "streamers", "gaming"],
  "Kick":            ["kick", "streamers", "gaming"],
  "YouTube":         ["youtube", "streamers"],
  "TikTok":          ["general", "streamers"],
  "Discord":         ["gaming", "streamers"],

  // Content tags
  "Esports":         ["esports", "gaming"],
  "Gaming":          ["gaming", "esports"],
  "Streaming":       ["streamers", "twitch", "gaming"],
  "Live Streaming":  ["streamers", "twitch", "gaming"],
  "Overlay Ads":     ["advertising", "twitch", "streamers"],
  "Native Ads":      ["advertising", "streamers"],
  "Advertising":     ["advertising", "general"],
  "Media Buying":    ["analytics", "advertising"],
  "CPM":             ["analytics", "advertising"],
  "ROI":             ["analytics", "advertising"],
  "Analytics":       ["analytics"],
  "Data":            ["analytics"],
  "Statistics":      ["analytics"],

  // Audience tags
  "Gen Z":           ["streamers", "gaming", "general"],
  "Nordic":          ["nordic", "general"],
  "Norway":          ["nordic"],
  "Sweden":          ["nordic"],
  "Finland":         ["nordic"],
  "Denmark":         ["nordic"],

  // Topic tags
  "Creators":        ["streamers", "general"],
  "Brand Safety":    ["advertising", "general"],
  "Sponsorship":     ["advertising", "streamers"],
  "Commerce":        ["advertising", "general"],
  "IRL":             ["streamers", "general"],
  "Just Chatting":   ["streamers", "twitch"],
  "Music":           ["streamers", "general"],
  "Art":             ["streamers", "general"],
};

// Category-to-folder mapping
const categoryFolderMap: Record<string, string[]> = {
  "Twitch Insights":    ["twitch", "streamers", "analytics"],
  "Nordic Market":      ["nordic", "analytics", "advertising"],
  "Nordic Insights":    ["nordic", "analytics"],
  "Guides":             ["advertising", "streamers", "general"],
  "Guider":             ["advertising", "streamers", "general"],
  "Oppaat":             ["advertising", "streamers", "general"],
  "Case Studies":       ["advertising", "streamers"],
  "Industry Insights":  ["analytics", "advertising", "general"],
  "Statistics & Data":  ["analytics", "twitch"],
  "Trends":             ["streamers", "gaming", "general"],
  "Streamer Guide":     ["streamers", "twitch"],
  "Strategi":           ["advertising", "nordic"],
};

/**
 * Simple hash of a string to a number (deterministic).
 */
function hashSlug(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = ((hash << 5) - hash + slug.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

/**
 * Score how well a folder matches a post's tags and category.
 */
function scoreFolders(post: BlogPost): string[] {
  const scores: Record<string, number> = {};

  // Score from tags
  for (const tag of post.tags) {
    for (const [keyword, folders] of Object.entries(tagFolderMap)) {
      if (tag.toLowerCase().includes(keyword.toLowerCase())) {
        for (let i = 0; i < folders.length; i++) {
          scores[folders[i]] = (scores[folders[i]] || 0) + (folders.length - i);
        }
      }
    }
  }

  // Score from category
  const catFolders = categoryFolderMap[post.category];
  if (catFolders) {
    for (let i = 0; i < catFolders.length; i++) {
      scores[catFolders[i]] = (scores[catFolders[i]] || 0) + (catFolders.length - i) * 2;
    }
  }

  // Score from title keywords
  const titleLower = post.title.toLowerCase();
  if (titleLower.includes("twitch")) scores["twitch"] = (scores["twitch"] || 0) + 3;
  if (titleLower.includes("kick")) scores["kick"] = (scores["kick"] || 0) + 3;
  if (titleLower.includes("youtube")) scores["youtube"] = (scores["youtube"] || 0) + 3;
  if (titleLower.includes("esport")) scores["esports"] = (scores["esports"] || 0) + 3;
  if (titleLower.includes("nordic") || titleLower.includes("nordi")) scores["nordic"] = (scores["nordic"] || 0) + 3;
  if (titleLower.includes("streamer")) scores["streamers"] = (scores["streamers"] || 0) + 2;
  if (titleLower.includes("brand") || titleLower.includes("ad ") || titleLower.includes("ads")) scores["advertising"] = (scores["advertising"] || 0) + 2;

  // Sort folders by score descending
  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([folder]) => folder);
}

/**
 * Try to pick a photo from the registry for a given post.
 * Returns null if no custom photos are available.
 */
function pickPhoto(post: BlogPost): string | null {
  if (!registryLoaded || Object.keys(photoRegistry).length === 0) {
    return null;
  }

  const rankedFolders = scoreFolders(post);
  const hash = hashSlug(post.slug);

  // Try each folder in ranked order
  for (const folder of rankedFolders) {
    const photos = photoRegistry[folder];
    if (photos && photos.length > 0) {
      const idx = hash % photos.length;
      return `/blog-photos/${folder}/${photos[idx]}`;
    }
  }

  // Fallback to general folder
  const general = photoRegistry["general"];
  if (general && general.length > 0) {
    return `/blog-photos/general/${general[hash % general.length]}`;
  }

  return null;
}

/**
 * Main image resolver.
 */
export function getBlogImage(slug: string): string {
  const post = blogPosts.find(p => p.slug === slug);

  // 1. Try custom photo from /blog-photos/ (if any are registered)
  if (post) {
    const customPhoto = pickPhoto(post);
    if (customPhoto) return customPhoto;
  }

  // 2. Image from blogPosts.ts
  if (post?.image) {
    return post.image;
  }

  // 3. Deterministic fallback
  return `https://picsum.photos/seed/${encodeURIComponent(slug)}/800/450`;
}

/**
 * Register photos from a folder scan.
 * Call this with the result of scanning /blog-photos/ at build time or on mount.
 *
 * Example: registerPhotos({ twitch: ["stream1.jpg", "stream2.jpg"], gaming: ["setup.jpg"] })
 */
export function registerPhotos(registry: Record<string, string[]>): void {
  Object.assign(photoRegistry, registry);
  registryLoaded = true;
}
