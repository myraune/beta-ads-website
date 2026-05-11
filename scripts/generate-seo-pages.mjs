#!/usr/bin/env node
/**
 * Full-site static HTML shell generator.
 *
 * Why this exists: the site is a Vite SPA. Without this script, every URL
 * serves the same dist/index.html with the default title/description/canonical
 * from the static shell — so Googlebot's first-pass crawl sees 100+ URLs with
 * identical metadata. React's <SEO> component fixes this after JS hydration,
 * but the initial crawl signals are what rank the page.
 *
 * What it does: after `vite build`, walk every known route and write a
 * per-path dist/<route>/index.html with:
 *   • correct <title>
 *   • correct <meta name="description">
 *   • correct <link rel="canonical">
 *   • correct og:title / og:description / og:url / og:locale
 *   • correct <html lang> per locale
 *   • correct hreflang alternates per locale (self-ref + cluster siblings)
 *
 * Runs in ~500ms for 120+ routes — plain Node, no Puppeteer, no Chromium.
 * Supersedes the older inject-locale-html.mjs (hreflang-only injector).
 *
 * Routes come from three sources:
 *   1. STATIC_PAGES — hand-maintained list of page routes + SEO copy
 *   2. CASE_STUDIES — hand-maintained list mirroring src/pages/CaseStudy*.tsx
 *   3. blog posts — parsed from src/data/blogPosts.ts (regex, locale-aware)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const BASE_URL = "https://beta-ads.no";

const OG_LOCALES = {
  en: "en_US",
  no: "nb_NO",
  sv: "sv_SE",
  fi: "fi_FI",
};

// ---------------------------------------------------------------------------
// STATIC PAGES — hand-maintained. Must mirror the title/description each page
// passes to its <SEO> call in src/pages/*.tsx.
// ---------------------------------------------------------------------------
const STATIC_PAGES = [
  {
    route: "/",
    title: "Beta Ads | Native Twitch & Livestream Advertising",
    description:
      "Native advertising platform for Twitch, YouTube and Kick livestreams in the Nordics. Overlay ads that bypass adblock and deliver 3-5x higher engagement.",
    locale: "en",
    alternates: [
      { hreflang: "en", href: "/" },
      { hreflang: "no", href: "/norge" },
      { hreflang: "x-default", href: "/" },
    ],
  },
  {
    route: "/norge",
    title: "Twitch-annonsering Norge | Beta Ads",
    description:
      "Twitch-annonsering for norske merkevarer. Samsung, Shure, Komplett og NKI har kjørt kampanjer via Beta Ads på 39 000+ norske streamere. Book en samtale.",
    locale: "no",
    alternates: [
      { hreflang: "no", href: "/norge" },
      { hreflang: "en", href: "/" },
      { hreflang: "x-default", href: "/" },
    ],
  },
  {
    route: "/streamers",
    title: "Earn from Your Stream | Beta Ads Streamer Program",
    description:
      "Get real brand deals on Twitch, YouTube & Kick. Accept offers you like, skip the rest. No minimum followers, no contracts. Join 40+ Nordic streamers.",
    locale: "en",
  },
  {
    route: "/blog",
    title: "Blog | Livestream Advertising Insights | Beta Ads",
    description:
      "Expert insights on Twitch advertising, Nordic streaming trends, influencer marketing and live commerce. Data-driven articles for brands and agencies.",
    locale: "en",
  },
  {
    route: "/contact",
    title: "Contact Beta Ads | Start a Livestream Campaign",
    description:
      "Talk to our team about running native overlay ads on Nordic Twitch, YouTube & Kick streams. Get a free campaign proposal within 24 hours.",
    locale: "en",
  },
  {
    route: "/demo",
    title: "Book a Demo | Beta Ads Livestream Advertising",
    description:
      "See exactly how native overlay ads work on Twitch, YouTube and Kick. Book a 20-minute demo with our Nordic advertising team — free, no commitment.",
    locale: "en",
  },
  {
    route: "/twitch-advertising",
    title: "Twitch Advertising Agency for Nordic Brands | Beta Ads",
    description:
      "Run native overlay ads on 39,000+ Nordic Twitch streams. 0% adblock rate, 3-5x higher engagement than display ads. Reach Gen Z where they actually watch.",
    locale: "en",
  },
  {
    route: "/youtube-advertising",
    title: "YouTube Livestream Advertising in the Nordics | Beta Ads",
    description:
      "Advertise on 8,200+ Nordic YouTube live streams. Native overlay formats with 45+ min average session time. No pre-roll skipping — ads viewers actually see.",
    locale: "en",
  },
  {
    route: "/kick-advertising",
    title: "Kick Advertising for Nordic Brands | Beta Ads",
    description:
      "First-mover advantage on Kick — the fastest-growing streaming platform. 2,800+ Nordic streamers, 125% growth in 2025. Start before your competitors do.",
    locale: "en",
  },
  {
    route: "/about",
    title: "About Us | Beta Ads",
    description:
      "Beta Ads is a native advertising platform for Twitch, Kick and YouTube livestreams across the Nordics. Founded in Oslo, now operating from Oslo and Chicago.",
    locale: "en",
  },
  {
    route: "/case-studies",
    title: "Case Studies | Beta Ads Livestream Campaign Results",
    description:
      "Real results from native livestream advertising campaigns. See how Nordic brands achieved 3-5x higher engagement and bypassed adblock with Beta Ads.",
    locale: "en",
  },
  {
    route: "/press",
    title: "Press & Media Coverage | Beta Ads",
    description:
      "Beta Ads in the media — coverage, interviews, and press assets. Nordic livestream advertising platform based in Oslo.",
    locale: "en",
  },
  {
    route: "/terms",
    title: "Terms of Service | Beta Ads",
    description: "Terms of Service for Beta Ads / Beta Agency AS.",
    locale: "en",
  },
  {
    route: "/privacy",
    title: "Privacy Policy | Beta Ads",
    description: "Privacy Policy for Beta Ads / Beta Agency AS.",
    locale: "en",
  },
];

// ---------------------------------------------------------------------------
// CASE STUDIES — mirror of src/pages/CaseStudy*.tsx <SEO> calls.
// datePublished mirrors datePublished in each page's Article JSON-LD.
// image is the og:image set on the <SEO> component (null if none).
// ---------------------------------------------------------------------------
const CASE_STUDIES = [
  {
    route: "/case-study/samsung",
    title: "Samsung x Beta Ads Case Study | Beta Ads",
    description:
      "Samsung Galaxy S25 Ultra and Z Fold7 on Norwegian Twitch: 800K+ live views, 1.35M+ with VOD, 2.93% CTR, 71 streamer slots, zero adblock impact.",
    locale: "en",
    datePublished: "2025-12-01",
    image: "/lovable-uploads/samsung-zfold7-banner.png",
  },
  {
    route: "/case-study/samsung-fold7",
    title: "Samsung Galaxy Z Fold7 Case Study | Beta Ads",
    description:
      "Samsung Galaxy Z Fold7 on Norwegian Twitch: native overlay ads and streamer integrations, 2.47% CTR across 19 streamers.",
    locale: "en",
    datePublished: "2026-01-01",
    image: "/lovable-uploads/blog-samsung-twitch-campaign-hero.jpg",
  },
  {
    route: "/case-study/surfshark",
    title: "Surfshark VPN Case Study | Beta Ads",
    description:
      "Surfshark on Norwegian Twitch: 90,473 views, 1.39% CTR, 552 verified clicks, 704h screen time across 25 streamers. Zero adblock impact.",
    locale: "en",
    datePublished: "2025-03-01",
    image: null,
  },
  {
    route: "/case-study/saily",
    title: "Saily eSIM Case Study | Beta Ads",
    description:
      "Saily eSIM launch on Norwegian Twitch: 102,794 views, 1.08% CTR, 518 verified clicks across 22 creators. Travel audience targeting via native overlays.",
    locale: "en",
    datePublished: "2025-11-01",
    image: null,
  },
  {
    route: "/case-study/shure",
    title: "Shure MV6 Case Study | Beta Ads",
    description:
      "Shure MV6 on Norwegian Twitch: 182,554 completed views, 2,378 verified clicks, 9.12% peak CTR with just 2 streamers. 48,617 unique Norwegian viewers.",
    locale: "en",
    datePublished: "2025-07-01",
    image: "/lovable-uploads/shure-mv6-banner.jpg",
  },
  {
    route: "/case-study/glorious",
    title: "Glorious Gaming Case Study | Beta Ads",
    description:
      "Glorious O3 mouse launch across Finland, Norway, and Sweden via native rich media overlays. 137K+ total views across 25 creators.",
    locale: "en",
    datePublished: "2025-04-01",
    image: null,
  },
  {
    route: "/case-study/gokstad",
    title: "Gokstad Akademiet Case Study | Beta Ads",
    description:
      "How Gokstad Akademiet recruited IT students through native Twitch overlays with 22 creators, 100K+ views, and 1.22% CTR across 49 categories.",
    locale: "en",
    datePublished: "2025-06-01",
    image: null,
  },
  {
    route: "/case-study/komplett",
    title: "Komplett Månedens Gaming Deal Case Study | Beta Ads",
    description:
      "Komplett on Twitch + Kick: 151,278 views, 1.17% CTR, 4.48% peak CTR across 34 creators. Black Friday retail activation that bypassed adblock.",
    locale: "en",
    datePublished: "2025-08-01",
    image: "/lovable-uploads/case-studies/komplett-preview.jpg",
  },
  {
    route: "/case-study/kristiania",
    title: "Høyskolen Kristiania Case Study | Beta Ads",
    description:
      "Høyskolen Kristiania on Twitch: two parallel campaigns, 599,252 combined views, 5,997 clicks, 3,329h screen time across awareness and voting activations.",
    locale: "en",
    datePublished: "2025-09-01",
    image: null,
  },
  {
    route: "/case-study/nki",
    title: "NKI Distance Learning Case Study | Beta Ads",
    description:
      "NKI on Twitch: interactive quiz campaign, 220,003 completed views, 1,595 clicks across 19 streamers. Personalized ads for distance-learning recruitment.",
    locale: "en",
    datePublished: "2025-10-01",
    image: "/lovable-uploads/case-studies/nki-detoo.png",
  },
];

// ---------------------------------------------------------------------------
// Blog post locale inference — mirrors src/pages/BlogPost.tsx detection.
// ---------------------------------------------------------------------------
const NORWEGIAN_CATEGORIES = new Set(["Guider", "Innsikt", "Strategi"]);
const FINNISH_CATEGORIES = new Set(["Oppaat"]);

function detectBlogLocale({ category, slug, title, excerpt }) {
  if (FINNISH_CATEGORIES.has(category) || /\b(suomi|mainonta-suomi|opas)\b/i.test(slug)) return "fi";
  if (/\b(sverige|reklam-sverige|svensk)\b/i.test(slug)) return "sv";
  if (NORWEGIAN_CATEGORIES.has(category)) return "no";
  if (category === "Streamer Guide" && /[æøå]/i.test(title || "")) return "no";
  if (/[æøå]/i.test(title || "") && /\b(hvordan|slik|norge|norsk|annonser|markedsf)\b/i.test((title + " " + (excerpt || "")).toLowerCase())) return "no";
  return "en";
}

// ---------------------------------------------------------------------------
// Parse blog posts from TypeScript source using regex.
// Returns [{ slug, title, description, locale, category }]
// ---------------------------------------------------------------------------
function parseBlogPosts() {
  const srcPath = path.join(ROOT, "src/data/blogPosts.ts");
  const source = fs.readFileSync(srcPath, "utf-8");

  // Split into post objects. Each post starts with `    id: "...",` at 4-space
  // indent level and ends before the next one (or the closing `];`).
  // We operate on the array body only.
  const arrayMatch = source.match(/export const blogPosts: BlogPost\[\] = \[([\s\S]*?)\n\];/);
  if (!arrayMatch) {
    console.error("❌ Could not find blogPosts array in blogPosts.ts");
    return [];
  }
  const body = arrayMatch[1];

  // Naive split — post entries are `  {` at 2-space indent, ending in `  },`
  // or `  }` (last entry).
  const chunks = [];
  let depth = 0;
  let start = -1;
  for (let i = 0; i < body.length; i++) {
    const c = body[i];
    if (c === "{") {
      if (depth === 0) start = i;
      depth++;
    } else if (c === "}") {
      depth--;
      if (depth === 0 && start >= 0) {
        chunks.push(body.slice(start, i + 1));
        start = -1;
      }
    }
  }

  const posts = [];
  for (const chunk of chunks) {
    const slug = chunk.match(/slug:\s*["']([^"']+)["']/)?.[1];
    if (!slug) continue;
    const title = chunk.match(/^\s*title:\s*["']([^"']+)["']/m)?.[1] || "";
    const excerpt = chunk.match(/excerpt:\s*["']([^"']+)["']/)?.[1] || "";
    const category = chunk.match(/category:\s*["']([^"']+)["']/)?.[1] || "";

    // seoTitle / seoDescription per locale
    const seoTitleBlock = chunk.match(/seoTitle:\s*\{([\s\S]*?)\n\s*\}/)?.[1] || "";
    const seoDescBlock = chunk.match(/seoDescription:\s*\{([\s\S]*?)\n\s*\}/)?.[1] || "";

    const pickLocale = (block, locale) =>
      block.match(new RegExp(`${locale}:\\s*["']([^"']+)["']`))?.[1];

    const locale = detectBlogLocale({ category, slug, title, excerpt });
    const seoTitle =
      pickLocale(seoTitleBlock, locale) ||
      pickLocale(seoTitleBlock, "en") ||
      `${title} | Beta Ads`;
    const seoDescription =
      pickLocale(seoDescBlock, locale) ||
      pickLocale(seoDescBlock, "en") ||
      excerpt;
    const image = chunk.match(/image:\s*["']([^"']+)["']/)?.[1] || null;
    const dateISO = chunk.match(/dateISO:\s*["']([^"']+)["']/)?.[1] || null;
    const rawTitle = chunk.match(/^\s*title:\s*["']([^"']+)["']/m)?.[1] || seoTitle;
    const seoKeywordsBlock = chunk.match(/seoKeywords:\s*\{([\s\S]*?)\n\s*\}/)?.[1] || "";
    const keywords = (seoKeywordsBlock.match(/["']([^"']+)["']/g) || [])
      .map(k => k.replace(/["']/g, ""))
      .filter(k => !["en", "no", "sv", "fi"].includes(k))
      .slice(0, 8)
      .join(", ");

    posts.push({
      slug,
      title: seoTitle,
      rawTitle,
      description: seoDescription,
      locale,
      category,
      image,
      dateISO,
      keywords,
    });
  }
  return posts;
}

// ---------------------------------------------------------------------------
// JSON-LD builder for blog posts
// Injected into static shells so Googlebot sees it on first-pass crawl
// without needing to execute React's useEffect-driven react-helmet-async.
// ---------------------------------------------------------------------------
function buildBlogPostingJsonLd({ slug, rawTitle, description, image, dateISO, keywords, locale }) {
  const pageUrl = `${BASE_URL}/blog/${slug}`;
  const imageUrl = image ? (image.startsWith("http") ? image : `${BASE_URL}${image}`) : null;

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": rawTitle,
      "description": description,
      "url": pageUrl,
      ...(imageUrl ? { "image": imageUrl } : {}),
      ...(dateISO ? { "datePublished": dateISO, "dateModified": dateISO } : {}),
      "author": { "@type": "Organization", "name": "Beta Ads", "url": BASE_URL },
      "publisher": {
        "@type": "Organization",
        "name": "Beta Ads",
        "logo": { "@type": "ImageObject", "url": `${BASE_URL}/lovable-uploads/logo-color.png` }
      },
      "mainEntityOfPage": { "@type": "WebPage", "@id": pageUrl },
      "inLanguage": locale,
      ...(keywords ? { "keywords": keywords } : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE_URL}/` },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${BASE_URL}/blog` },
        { "@type": "ListItem", "position": 3, "name": rawTitle, "item": pageUrl }
      ]
    }
  ];

  return schema.map(s =>
    `  <script type="application/ld+json">\n  ${JSON.stringify(s, null, 2).replace(/\n/g, "\n  ")}\n  </script>`
  ).join("\n");
}

// ---------------------------------------------------------------------------
// JSON-LD builder for case study pages
// Injects Article + BreadcrumbList so Googlebot sees structured data on
// first-pass crawl without needing React/JS hydration.
// ---------------------------------------------------------------------------
function buildCaseStudyJsonLd({ route, title, description, image, datePublished }) {
  const pageUrl = `${BASE_URL}${route}`;
  const imageUrl = image ? (image.startsWith("http") ? image : `${BASE_URL}${image}`) : null;
  // Strip " | Beta Ads" suffix for the Article headline
  const headline = title.replace(/\s*\|\s*Beta Ads\s*$/, "");

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": headline,
      "description": description,
      "url": pageUrl,
      ...(imageUrl ? { "image": imageUrl } : {}),
      ...(datePublished ? { "datePublished": datePublished, "dateModified": "2026-05-11" } : {}),
      "author": { "@type": "Organization", "name": "Beta Ads", "url": BASE_URL },
      "publisher": {
        "@type": "Organization",
        "name": "Beta Ads",
        "logo": { "@type": "ImageObject", "url": `${BASE_URL}/lovable-uploads/logo-color.png` },
      },
      "mainEntityOfPage": { "@type": "WebPage", "@id": pageUrl },
      "inLanguage": "en",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE_URL}/` },
        { "@type": "ListItem", "position": 2, "name": "Case Studies", "item": `${BASE_URL}/case-studies` },
        { "@type": "ListItem", "position": 3, "name": headline, "item": pageUrl },
      ],
    },
  ];

  return schema.map(s =>
    `  <script type="application/ld+json">\n  ${JSON.stringify(s, null, 2).replace(/\n/g, "\n  ")}\n  </script>`
  ).join("\n");
}

// ---------------------------------------------------------------------------
// HTML injection helpers
// ---------------------------------------------------------------------------
function toAbsolute(href) {
  return href.startsWith("http") ? href : `${BASE_URL}${href}`;
}

function escapeHtmlAttr(s) {
  return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

function buildHreflangBlock(alternates) {
  if (!alternates || alternates.length === 0) return "";
  const MARKER_START = "<!-- beta-ads:hreflang-start -->";
  const MARKER_END = "<!-- beta-ads:hreflang-end -->";
  const tags = alternates
    .map(
      ({ hreflang, href }) =>
        `    <link rel="alternate" hreflang="${hreflang}" href="${toAbsolute(href)}" />`,
    )
    .join("\n");
  return `${MARKER_START}\n${tags}\n    ${MARKER_END}`;
}

function injectMeta(shellHtml, { title, description, canonical, locale, alternates, image }) {
  let html = shellHtml;
  const canonicalUrl = toAbsolute(canonical);
  const ogLocale = OG_LOCALES[locale] || "en_US";
  const ogImage = image ? toAbsolute(image) : null;

  const escapedTitle = escapeHtmlAttr(title);
  const escapedDesc = escapeHtmlAttr(description);

  // <html lang>
  html = html.replace(/<html lang="[^"]*">/, `<html lang="${locale}">`);

  // <title>
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);

  // <meta name="description">
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${escapedDesc}">`,
  );

  // <link rel="canonical">
  const canonicalTag = `<link rel="canonical" href="${canonicalUrl}" />`;
  if (/<link\s+rel="canonical"/.test(html)) {
    html = html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/, canonicalTag);
  } else {
    html = html.replace("</head>", `    ${canonicalTag}\n  </head>`);
  }

  // og:title
  if (/<meta\s+property="og:title"/.test(html)) {
    html = html.replace(
      /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
      `<meta property="og:title" content="${escapedTitle}" />`,
    );
  } else {
    html = html.replace("</head>", `    <meta property="og:title" content="${escapedTitle}" />\n  </head>`);
  }

  // og:description
  if (/<meta\s+property="og:description"/.test(html)) {
    html = html.replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
      `<meta property="og:description" content="${escapedDesc}" />`,
    );
  } else {
    html = html.replace("</head>", `    <meta property="og:description" content="${escapedDesc}" />\n  </head>`);
  }

  // og:url
  const ogUrlTag = `<meta property="og:url" content="${canonicalUrl}" />`;
  if (/<meta\s+property="og:url"/.test(html)) {
    html = html.replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/, ogUrlTag);
  } else {
    html = html.replace("</head>", `    ${ogUrlTag}\n  </head>`);
  }

  // og:locale
  const ogLocaleTag = `<meta property="og:locale" content="${ogLocale}" />`;
  if (/<meta\s+property="og:locale"/.test(html)) {
    html = html.replace(/<meta\s+property="og:locale"\s+content="[^"]*"\s*\/?>/, ogLocaleTag);
  } else {
    html = html.replace("</head>", `    ${ogLocaleTag}\n  </head>`);
  }

  // og:image + twitter:image — critical for social share cards. Inject the
  // per-page image so non-JS social crawlers (LinkedIn, some Slack/Teams
  // previewers) see the right image on first fetch instead of the default shell.
  if (ogImage) {
    const imageTags = [
      `<meta property="og:image" content="${ogImage}" />`,
      `<meta property="og:image:alt" content="${escapedTitle}" />`,
      `<meta name="twitter:image" content="${ogImage}" />`,
      `<meta name="twitter:card" content="summary_large_image" />`,
    ];
    for (const tag of imageTags) {
      const [, propOrName, key] = tag.match(/<meta\s+(property|name)="([^"]+)"/) || [];
      if (!key) continue;
      const existingRe = new RegExp(
        `<meta\\s+${propOrName}="${key.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&")}"\\s+content="[^"]*"\\s*\\/?>`,
      );
      if (existingRe.test(html)) {
        html = html.replace(existingRe, tag);
      } else {
        html = html.replace("</head>", `    ${tag}\n  </head>`);
      }
    }
  }

  // hreflang alternates (in a stable marker-delimited block)
  const hreflangBlock = buildHreflangBlock(alternates);
  if (hreflangBlock) {
    const existingBlock = /<!-- beta-ads:hreflang-start -->[\s\S]*?<!-- beta-ads:hreflang-end -->/;
    if (existingBlock.test(html)) {
      html = html.replace(existingBlock, hreflangBlock);
    } else {
      html = html.replace("</head>", `    ${hreflangBlock}\n  </head>`);
    }
  }

  // twitter:title / twitter:description (mirror og values)
  if (/<meta\s+name="twitter:title"/.test(html)) {
    html = html.replace(
      /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/,
      `<meta name="twitter:title" content="${escapedTitle}" />`,
    );
  }
  if (/<meta\s+name="twitter:description"/.test(html)) {
    html = html.replace(
      /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/,
      `<meta name="twitter:description" content="${escapedDesc}" />`,
    );
  }

  return html;
}

function writeShell(targetPath, html) {
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.writeFileSync(targetPath, html, "utf-8");
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
function main() {
  const indexPath = path.join(DIST, "index.html");
  if (!fs.existsSync(indexPath)) {
    console.error("❌ dist/index.html not found — run `vite build` first.");
    process.exit(1);
  }

  const shell = fs.readFileSync(indexPath, "utf-8");
  let staticCount = 0;
  let caseStudyCount = 0;
  let blogCount = 0;

  // Static pages
  for (const page of STATIC_PAGES) {
    const { route, title, description, locale, alternates } = page;
    const html = injectMeta(shell, {
      title,
      description,
      canonical: route,
      locale,
      alternates,
    });
    if (route === "/") {
      fs.writeFileSync(indexPath, html, "utf-8");
    } else {
      writeShell(path.join(DIST, route.replace(/^\//, ""), "index.html"), html);
    }
    staticCount++;
  }

  // Case studies
  for (const page of CASE_STUDIES) {
    const { route, title, description, locale, datePublished, image } = page;
    let html = injectMeta(shell, {
      title,
      description,
      canonical: route,
      locale,
      image,
    });
    // Inject Article + BreadcrumbList JSON-LD for first-pass Googlebot crawl.
    const jsonLdBlock = buildCaseStudyJsonLd({ route, title, description, image, datePublished });
    const MARKER = "<!-- beta-ads:case-study-jsonld -->";
    if (html.includes(MARKER)) {
      html = html.replace(
        new RegExp(`${MARKER}[\\s\\S]*?<!-- beta-ads:case-study-jsonld-end -->`),
        `${MARKER}\n${jsonLdBlock}\n  <!-- beta-ads:case-study-jsonld-end -->`
      );
    } else {
      html = html.replace("</head>", `    ${MARKER}\n${jsonLdBlock}\n  <!-- beta-ads:case-study-jsonld-end -->\n  </head>`);
    }
    writeShell(path.join(DIST, route.replace(/^\//, ""), "index.html"), html);
    caseStudyCount++;
  }

  // Blog posts
  const posts = parseBlogPosts();
  for (const post of posts) {
    const canonical = `/blog/${post.slug}`;
    const alternates =
      post.locale === "en"
        ? undefined
        : [
            { hreflang: post.locale, href: canonical },
            { hreflang: "x-default", href: canonical },
          ];
    let html = injectMeta(shell, {
      title: post.title,
      description: post.description,
      canonical,
      locale: post.locale,
      alternates,
      image: post.image,
    });
    // Inject BlogPosting + BreadcrumbList JSON-LD into the static shell so
    // Googlebot sees structured data on first-pass crawl (before JS hydration).
    const jsonLdBlock = buildBlogPostingJsonLd(post);
    // Insert before </head> using a marker to avoid duplicates on re-runs.
    const MARKER = "<!-- beta-ads:blog-jsonld -->";
    if (html.includes(MARKER)) {
      html = html.replace(new RegExp(`${MARKER}[\\s\\S]*?<!-- beta-ads:blog-jsonld-end -->`), `${MARKER}\n${jsonLdBlock}\n  <!-- beta-ads:blog-jsonld-end -->`);
    } else {
      html = html.replace("</head>", `    ${MARKER}\n${jsonLdBlock}\n  <!-- beta-ads:blog-jsonld-end -->\n  </head>`);
    }
    writeShell(path.join(DIST, "blog", post.slug, "index.html"), html);
    blogCount++;
  }

  console.log(
    `✅ static HTML shells — ${staticCount} pages + ${caseStudyCount} case studies + ${blogCount} blog posts (${staticCount + caseStudyCount + blogCount} total)`,
  );
}

main();
