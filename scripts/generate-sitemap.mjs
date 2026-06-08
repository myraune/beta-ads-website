/**
 * scripts/generate-sitemap.mjs
 *
 * Generates public/sitemap.xml dynamically from:
 *   - A hard-coded list of static pages with their priorities
 *   - All blog post slugs parsed from src/data/blogPosts.ts (with image data)
 *
 * Includes Google Image Sitemap extension so hero images from blog posts
 * are eligible for Google Image Search, driving additional organic traffic.
 *
 * Run: node scripts/generate-sitemap.mjs
 * (called automatically as part of `npm run build`)
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT      = path.resolve(__dirname, "..");
const BASE_URL  = "https://beta-ads.no";
const TODAY     = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

// Update this whenever significant site-wide content changes happen (e.g.
// internal links added to all posts, schema overhaul, etc.). Blog post lastmod
// will be max(dateISO, GLOBAL_MODIFIED_DATE) so Google recrawls updated posts.
const GLOBAL_MODIFIED_DATE = "2026-05-11";

// ---------------------------------------------------------------------------
// Static pages
// ---------------------------------------------------------------------------
const STATIC_PAGES = [
  { path: "/",                       priority: "1.0",  changefreq: "weekly"  },
  // Featured sitelinks — highest priority for Google sitelinks
  { path: "/case-studies",           priority: "0.95", changefreq: "weekly"  },
  { path: "/twitch-advertising",     priority: "0.95", changefreq: "monthly" },
  { path: "/kick-advertising",       priority: "0.95", changefreq: "monthly" },
  { path: "/press",                  priority: "0.95", changefreq: "monthly" },
  { path: "/norge",                  priority: "0.9",  changefreq: "monthly" },
  // Secondary high-priority pages
  { path: "/youtube-advertising",    priority: "0.9",  changefreq: "monthly" },
  { path: "/streamers",              priority: "0.9",  changefreq: "weekly"  },
  // Case studies — include image:image for Google Image Search eligibility
  { path: "/case-study/samsung",     priority: "0.85", changefreq: "monthly", image: "/lovable-uploads/samsung-zfold7-banner.png",           imageTitle: "Samsung Galaxy S25 Ultra x Beta Ads - Norwegian Twitch campaign overlay" },
  { path: "/case-study/samsung-fold7", priority: "0.8", changefreq: "monthly", image: "/lovable-uploads/blog-samsung-twitch-campaign-hero.jpg", imageTitle: "Samsung Galaxy Z Fold7 x Beta Ads - Twitch advertising campaign" },
  { path: "/case-study/surfshark",   priority: "0.8",  changefreq: "monthly", image: "/lovable-uploads/og-social-preview.png",                imageTitle: "Surfshark VPN x Beta Ads - Norwegian Twitch advertising case study" },
  { path: "/case-study/saily",       priority: "0.8",  changefreq: "monthly", image: "/lovable-uploads/og-social-preview.png",                imageTitle: "Saily eSIM x Beta Ads - Norwegian Twitch advertising case study" },
  { path: "/case-study/shure",       priority: "0.8",  changefreq: "monthly", image: "/lovable-uploads/shure-mv6-banner.jpg",                 imageTitle: "Shure MV6 x Beta Ads - Norwegian Twitch campaign, 9.12% CTR" },
  { path: "/case-study/glorious",    priority: "0.8",  changefreq: "monthly", image: "/lovable-uploads/og-social-preview.png",                imageTitle: "Glorious Gaming x Beta Ads - Nordic Twitch campaign case study" },
  { path: "/case-study/gokstad",     priority: "0.8",  changefreq: "monthly", image: "/lovable-uploads/og-social-preview.png",                imageTitle: "Gokstad Akademiet x Beta Ads - Twitch student recruitment campaign" },
  { path: "/case-study/kristiania",  priority: "0.8",  changefreq: "monthly", image: "/lovable-uploads/og-social-preview.png",                imageTitle: "Høyskolen Kristiania x Beta Ads - 600K views Twitch recruitment campaign" },
  { path: "/case-study/komplett",    priority: "0.8",  changefreq: "monthly", image: "/lovable-uploads/case-studies/komplett-preview.jpg",    imageTitle: "Komplett Gaming Deal x Beta Ads - Twitch retail advertising campaign" },
  { path: "/case-study/nki",         priority: "0.8",  changefreq: "monthly", image: "/lovable-uploads/case-studies/nki-detoo.png",           imageTitle: "NKI Distance Learning x Beta Ads - 220,003 views Twitch quiz campaign" },
  { path: "/blog",                   priority: "0.75", changefreq: "weekly"  },
  { path: "/demo",                   priority: "0.7",  changefreq: "monthly" },
  { path: "/contact",                priority: "0.6",  changefreq: "monthly" },
  { path: "/about",                  priority: "0.5",  changefreq: "monthly" },
  { path: "/terms",                  priority: "0.2",  changefreq: "yearly"  },
  { path: "/privacy",                priority: "0.2",  changefreq: "yearly"  },
];

// ---------------------------------------------------------------------------
// Parse blog post slugs + dates + images from blogPosts.ts
// ---------------------------------------------------------------------------
function parseBlogPosts() {
  const src = fs.readFileSync(
    path.join(ROOT, "src/data/blogPosts.ts"),
    "utf-8"
  );

  // Capture blocks between array elements to pair slug + dateISO + image + title
  const posts = [];
  const blocks = src.split(/(?=^\s*\{)/m);

  for (const block of blocks) {
    const slugMatch   = block.match(/^\s+slug:\s*["']([^"']+)["']/m);
    const dateMatch   = block.match(/^\s+dateISO:\s*["']([^"']+)["']/m);
    const imageMatch  = block.match(/^\s+image:\s*["']([^"']+)["']/m);
    const titleMatch  = block.match(/^\s+title:\s*["']([^"']+)["']/m);
    if (slugMatch) {
      posts.push({
        slug:    slugMatch[1],
        dateISO: dateMatch ? dateMatch[1].split("T")[0] : TODAY,
        image:   imageMatch ? imageMatch[1] : null,
        title:   titleMatch ? titleMatch[1].replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") : null,
      });
    }
  }

  return posts;
}

// ---------------------------------------------------------------------------
// Build XML
// ---------------------------------------------------------------------------
function urlEntry({ loc, lastmod, changefreq, priority, image, imageTitle }) {
  const lines = [
    "  <url>",
    `    <loc>${loc}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
  ];
  // Add image sitemap extension data when image is present
  if (image) {
    const imageUrl = image.startsWith("http") ? image : `${BASE_URL}${image}`;
    lines.push(`    <image:image>`);
    lines.push(`      <image:loc>${imageUrl}</image:loc>`);
    if (imageTitle) {
      lines.push(`      <image:title>${imageTitle}</image:title>`);
    }
    lines.push(`    </image:image>`);
  }
  lines.push("  </url>");
  return lines.join("\n");
}

function main() {
  const blogPosts = parseBlogPosts();

  const staticEntries = STATIC_PAGES.map((p) =>
    urlEntry({
      loc:        `${BASE_URL}${p.path}`,
      lastmod:    TODAY,
      changefreq: p.changefreq,
      priority:   p.priority,
      image:      p.image || undefined,
      imageTitle: p.imageTitle,
    })
  );

  const blogEntries = blogPosts.map((p) =>
    urlEntry({
      loc:        `${BASE_URL}/blog/${p.slug}`,
      // Use max(dateISO, GLOBAL_MODIFIED_DATE) so site-wide content changes
      // (internal links, schema updates, etc.) trigger a recrawl signal.
      lastmod:    p.dateISO > GLOBAL_MODIFIED_DATE ? p.dateISO : GLOBAL_MODIFIED_DATE,
      changefreq: "monthly",
      priority:   "0.65",
      image:      p.image,
      imageTitle: p.title,
    })
  );

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    "",
    "  <!-- ── Static pages ── -->",
    staticEntries.join("\n\n"),
    "",
    "  <!-- ── Blog posts (with image sitemap data) ── -->",
    blogEntries.join("\n\n"),
    "",
    "</urlset>",
  ].join("\n");

  const outPath = path.join(ROOT, "public", "sitemap.xml");
  fs.writeFileSync(outPath, xml, "utf-8");

  console.log(
    `✅ sitemap.xml generated — ${STATIC_PAGES.length} static + ${blogPosts.length} blog posts (${STATIC_PAGES.length + blogPosts.length} total URLs)`
  );
}

main();
