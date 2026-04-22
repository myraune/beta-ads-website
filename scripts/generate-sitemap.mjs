/**
 * scripts/generate-sitemap.mjs
 *
 * Generates public/sitemap.xml dynamically from:
 *   - A hard-coded list of static pages with their priorities
 *   - All blog post slugs parsed from src/data/blogPosts.ts
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
  // Secondary high-priority pages
  { path: "/youtube-advertising",    priority: "0.9",  changefreq: "monthly" },
  { path: "/streamers",              priority: "0.9",  changefreq: "weekly"  },
  { path: "/case-study/samsung",     priority: "0.85", changefreq: "monthly" },
  { path: "/case-study/glorious",    priority: "0.8",  changefreq: "monthly" },
  { path: "/case-study/gokstad",     priority: "0.8",  changefreq: "monthly" },
  { path: "/case-study/samsung-fold7", priority: "0.8", changefreq: "monthly" },
  { path: "/case-study/surfshark",   priority: "0.8",  changefreq: "monthly" },
  { path: "/case-study/saily",       priority: "0.8",  changefreq: "monthly" },
  { path: "/case-study/shure",       priority: "0.8",  changefreq: "monthly" },
  { path: "/case-study/kristiania",  priority: "0.8",  changefreq: "monthly" },
  { path: "/case-study/komplett",    priority: "0.8",  changefreq: "monthly" },
  { path: "/case-study/nki",         priority: "0.8",  changefreq: "monthly" },
  { path: "/blog",                   priority: "0.75", changefreq: "weekly"  },
  { path: "/demo",                   priority: "0.7",  changefreq: "monthly" },
  { path: "/contact",                priority: "0.6",  changefreq: "monthly" },
  { path: "/about",                  priority: "0.5",  changefreq: "monthly" },
  { path: "/terms",                  priority: "0.2",  changefreq: "yearly"  },
  { path: "/privacy",                priority: "0.2",  changefreq: "yearly"  },
];

// ---------------------------------------------------------------------------
// Parse blog post slugs + dates from blogPosts.ts
// ---------------------------------------------------------------------------
function parseBlogPosts() {
  const src = fs.readFileSync(
    path.join(ROOT, "src/data/blogPosts.ts"),
    "utf-8"
  );

  // Capture blocks between array elements to pair slug + dateISO
  const posts = [];
  const blocks = src.split(/(?=^\s*\{)/m);

  for (const block of blocks) {
    const slugMatch   = block.match(/^\s+slug:\s*["']([^"']+)["']/m);
    const dateMatch   = block.match(/^\s+dateISO:\s*["']([^"']+)["']/m);
    if (slugMatch) {
      posts.push({
        slug:    slugMatch[1],
        dateISO: dateMatch ? dateMatch[1].split("T")[0] : TODAY,
      });
    }
  }

  return posts;
}

// ---------------------------------------------------------------------------
// Build XML
// ---------------------------------------------------------------------------
function urlEntry({ loc, lastmod, changefreq, priority }) {
  return [
    "  <url>",
    `    <loc>${loc}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    "  </url>",
  ].join("\n");
}

function main() {
  const blogPosts = parseBlogPosts();

  const staticEntries = STATIC_PAGES.map((p) =>
    urlEntry({
      loc:        `${BASE_URL}${p.path}`,
      lastmod:    TODAY,
      changefreq: p.changefreq,
      priority:   p.priority,
    })
  );

  const blogEntries = blogPosts.map((p) =>
    urlEntry({
      loc:        `${BASE_URL}/blog/${p.slug}`,
      lastmod:    p.dateISO,
      changefreq: "monthly",
      priority:   "0.65",
    })
  );

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    "",
    "  <!-- ── Static pages ── -->",
    staticEntries.join("\n\n"),
    "",
    "  <!-- ── Blog posts ── -->",
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
