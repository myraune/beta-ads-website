/**
 * Blog posts that stay live for readers but are kept out of Google's index.
 *
 * These are plain translations of an English (or Norwegian) original: same
 * headings, same links, no market-specific content. Google treated them as
 * near-duplicates and left most of them in "Discovered/Crawled, not indexed",
 * spending crawl on them instead of on the pages that sell.
 *
 * Each slug here gets <meta name="robots" content="noindex, follow"> (in the
 * static shell and from <SEO>), is left out of sitemap.xml, and is dropped from
 * every hreflang set (its own and its siblings'). The post is still published,
 * listed on the blog hubs and linked, so readers can use it.
 *
 * To index one again (e.g. after a rewrite with local examples), remove its
 * slug here. Plan: Desktop/beta-ads-blog-cleanup.html, 13 Nov 2026.
 */
export const NOINDEX_BLOG_SLUGS: ReadonlySet<string> = new Set([
  "beta-ads-2-0-platform-launch-da",
  "beta-ads-2-0-platform-launch-fi",
  "beta-ads-2-0-platform-launch-no",
  "beta-ads-2-0-platform-launch-sv",
  "beta-ads-atlas-accelerator-no",
  "clip-analytics-ad-verification-nordic-streaming-da",
  "clip-analytics-ad-verification-nordic-streaming-fi",
  "clip-analytics-ad-verification-nordic-streaming-no",
  "clip-analytics-ad-verification-nordic-streaming-sv",
  "virtuelle-produktplasseringer-norden",
  "dentsu-2025-gaming-trends-report-nordic-twitch-advertising-da",
  "dentsu-2025-gaming-trends-report-nordic-twitch-advertising-fi",
  "dentsu-2025-gaming-trends-report-nordic-twitch-advertising-no",
  "dentsu-2025-gaming-trends-report-nordic-twitch-advertising-sv",
  "twitch-statistics-2025-global-insights-da",
  "twitch-statistics-2025-global-insights-fi",
  "twitch-statistics-2025-global-insights-no",
  "twitch-statistics-2025-global-insights-sv",
  "twitch-vs-youtube-gaming-2025-da",
  "twitch-vs-youtube-gaming-2025-fi",
  "twitch-vs-youtube-gaming-2025-no",
  "twitch-vs-youtube-gaming-2025-sv",
  "twitch-april-2026-platform-overhaul-advertiser-guide-da",
  "twitch-april-2026-platform-overhaul-advertiser-guide-fi",
  "twitch-april-2026-platform-overhaul-advertiser-guide-no",
  "twitch-april-2026-platform-overhaul-advertiser-guide-sv",
  "kick-streaming-growth-2025-da",
  "kick-streaming-growth-2025-fi",
  "kick-streaming-growth-2025-no",
  "kick-streaming-growth-2025-sv",
  "paid-amplification-creator-content-beyond-social-2026-da",
  "paid-amplification-creator-content-beyond-social-2026-fi",
  "paid-amplification-creator-content-beyond-social-2026-no",
  "paid-amplification-creator-content-beyond-social-2026-sv",
  "how-to-brief-streamer-native-ad-integration-2026-da",
  "how-to-brief-streamer-native-ad-integration-2026-fi",
  "how-to-brief-streamer-native-ad-integration-2026-no",
  "how-to-brief-streamer-native-ad-integration-2026-sv",
  "twitch-statistikk-verktoy-2026-da",
  "twitch-statistikk-verktoy-2026-fi",
  "twitch-statistikk-verktoy-2026-sv",
  "gta-vi-nordisk-merkevareguide",
]);

export const isIndexableBlogSlug = (slug: string): boolean => !NOINDEX_BLOG_SLUGS.has(slug);
