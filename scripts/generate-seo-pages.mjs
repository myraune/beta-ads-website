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
import { createRequire } from "node:module";
import { buildSync } from "esbuild";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const BASE_URL = "https://beta-ads.no";
// Build date used as dateModified on all generated schemas — reflects the most
// recent deploy (which is when content + schema changes actually go live).
const BUILD_DATE = new Date().toISOString().split("T")[0];

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
      "Talk to our team about running native overlay ads on Nordic Twitch, YouTube & Kick streams. We reply within one business day.",
    locale: "en",
  },
  {
    route: "/demo",
    title: "Book a Demo | Beta Ads Livestream Advertising",
    description:
      "See exactly how native overlay ads work on Twitch, YouTube and Kick. Book a 20-minute demo with our Nordic advertising team - free, no commitment.",
    locale: "en",
  },
  {
    route: "/twitch-advertising",
    title: "Twitch Advertising in the Nordics | Beta Ads",
    description:
      "Native overlay ads on Twitch that bypass ad blockers and reach Gen Z. 39,000+ Nordic streamers, 3-5x higher engagement, real-time analytics.",
    locale: "en",
  },
  {
    route: "/youtube-advertising",
    title: "YouTube Live Advertising in the Nordics | Beta Ads",
    description:
      "Native overlay ads on YouTube Live streams across Norway, Sweden, Finland, and Denmark. Reach gaming and lifestyle audiences with ads that bypass ad blockers.",
    locale: "en",
  },
  {
    route: "/kick-advertising",
    title: "Kick Advertising in the Nordics | Beta Ads",
    description:
      "Advertise on Kick - the fastest-growing streaming platform with 125% viewership growth in 2025. Native overlay ads across 2,800+ Nordic Kick streamers.",
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
    title: "Case Studies | Beta Ads",
    description:
      "Real campaign results from Samsung, Shure, Surfshark, Glorious, and more. Native Twitch overlay case studies with verified impressions, CTR, and ROI data.",
    locale: "en",
  },
  {
    route: "/press",
    title: "Press & Media Coverage | Beta Ads",
    description:
      "Beta Ads in the press. Featured in Kampanje, Kom24, and Nordic media on Twitch advertising, native overlay ads, and livestream marketing in Norway.",
    locale: "en",
  },
  {
    route: "/twitch-advertising-cost",
    title: "What Does Twitch Advertising Cost? | Beta Ads",
    description:
      "No platform publishes a Twitch advertising rate card, not even Twitch. Here is how live-stream advertising is actually priced in the Nordics, the five cost drivers, and how to get a real quote.",
    locale: "en",
    alternates: [
      { hreflang: "en", href: "/twitch-advertising-cost" },
      { hreflang: "no", href: "/twitch-annonsering-pris" },
      { hreflang: "x-default", href: "/twitch-advertising-cost" },
    ],
  },
  {
    route: "/twitch-annonsering-pris",
    title: "Hva koster Twitch-annonsering i Norge? | Beta Ads",
    description:
      "Ingen plattform publiserer en prisliste for Twitch-annonsering, ikke engang Twitch. Slik prises livestream-annonsering faktisk i Norge: de fem kostnadsdriverne og hvordan du får et reelt tilbud.",
    locale: "no",
    alternates: [
      { hreflang: "no", href: "/twitch-annonsering-pris" },
      { hreflang: "en", href: "/twitch-advertising-cost" },
      { hreflang: "x-default", href: "/twitch-advertising-cost" },
    ],
  },
  {
    route: "/kick-advertising-cost",
    title: "What Does Kick Advertising Cost? | Beta Ads",
    description:
      "Kick has no public rate card, and as of 2026 no self-serve ad platform at all. Here is how Kick advertising is actually priced in the Nordics, what it costs to buy direct, and how to get a real quote.",
    locale: "en",
  },
  {
    route: "/nordic-livestream-advertising",
    title: "Nordic Livestream Advertising: The Brand's Field Guide | Beta Ads",
    description:
      "Who is watching, which platforms matter, what Nordic inventory exists, and what native overlay campaigns actually deliver. A data-backed field guide for brands, with real Beta Ads campaign results.",
    locale: "en",
  },
  {
    route: "/terms",
    title: "Terms of Service | Beta Ads",
    description: "Terms of Service for Beta Ads by Beta Agency AS. Read our terms covering service usage, intellectual property, and liability.",
    locale: "en",
  },
  {
    route: "/privacy",
    title: "Privacy Policy | Beta Ads",
    description: "Privacy Policy for Beta Ads by Beta Agency AS. How we collect, use, and protect your data in compliance with GDPR and Norwegian data protection law.",
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
    image: "/lovable-uploads/samsung-fold7-banner.jpg",
    ogImageWidth: 850,
    ogImageHeight: 500,
  },
  {
    route: "/case-study/samsung-fold7",
    title: "Samsung Galaxy Z Fold7 Case Study | Beta Ads",
    description:
      "Samsung Galaxy Z Fold7 on Norwegian Twitch: 300,054 live views, 3.70% CTR in Week 1 across 28 Norwegian streamers. Zero adblock impact.",
    locale: "en",
    datePublished: "2026-01-01",
    image: "/lovable-uploads/samsung-zfold7-banner.png",
    ogImageWidth: 1000,
    ogImageHeight: 1000,
  },
  {
    route: "/case-study/surfshark",
    title: "Surfshark VPN Case Study | Beta Ads",
    description:
      "Surfshark on Norwegian Twitch: 91,006 completed views, 707h on-screen and 37,713 unique viewers across 26 streamers. A reach-led VPN awareness run, zero adblock impact.",
    locale: "en",
    datePublished: "2025-03-01",
    image: "/lovable-uploads/og-social-preview.png",
  },
  {
    route: "/case-study/saily",
    title: "Saily eSIM Case Study | Beta Ads",
    description:
      "Saily on Norwegian Twitch: 102,794 completed views, 518 verified clicks, 0.50% CTR across 22 streamers. 53,229 unique viewers reached in peak travel season.",
    locale: "en",
    datePublished: "2025-11-01",
    image: "/lovable-uploads/og-social-preview.png",
  },
  {
    route: "/case-study/shure",
    title: "Shure MV6 Case Study | Beta Ads",
    description:
      "Shure MV6 on Norwegian Twitch: 182,554 completed views, 2,378 verified clicks, 9.12% peak CTR - with just 2 streamers. 48,617 unique Norwegian viewers.",
    locale: "en",
    datePublished: "2025-07-01",
    image: "/lovable-uploads/shure-mv6-banner.jpg",
    ogImageWidth: 1200,
    ogImageHeight: 600,
  },
  {
    route: "/case-study/glorious",
    title: "Glorious Gaming Case Study | Beta Ads",
    description:
      "How Glorious used rich media overlays to promote the O3 mouse across 25 Nordic Twitch streamers, reaching 137K+ views in Finland, Norway, and Sweden.",
    locale: "en",
    datePublished: "2025-04-01",
    image: "/lovable-uploads/og-social-preview.png",
  },
  {
    route: "/case-study/gokstad",
    title: "Gokstad Akademiet Case Study | Beta Ads",
    description:
      "How Gokstad Akademiet recruited IT students through native Twitch overlays with 22 creators, 100K+ views, and 1.22% CTR across 49 categories.",
    locale: "en",
    datePublished: "2025-06-01",
    image: "/lovable-uploads/og-social-preview.png",
  },
  {
    route: "/case-study/komplett",
    title: "Komplett Månedens Gaming Deal Case Study | Beta Ads",
    description:
      "How Komplett's tactical retail campaign hit a 4.48% peak-day CTR across 34 Norwegian gaming streamers. 151,278 display views, 1,768 verified clicks in 17 days.",
    locale: "en",
    datePublished: "2025-08-01",
    image: "/lovable-uploads/case-studies/komplett-preview.jpg",
    ogImageWidth: 1527,
    ogImageHeight: 1391,
  },
  {
    route: "/case-study/kristiania",
    title: "Høyskolen Kristiania Case Study | Beta Ads",
    description:
      "Høyskolen Kristiania on Twitch: two parallel campaigns, ~600K display views, ~6,000 verified clicks across 31 Norwegian streamers over 8 weeks.",
    locale: "en",
    datePublished: "2025-09-01",
    image: "/lovable-uploads/og-social-preview.png",
  },
  {
    route: "/case-study/nki",
    title: "NKI Distance Learning Case Study | Beta Ads",
    description:
      "NKI quiz campaign on Norwegian Twitch: 220,003 completed views, 1,595 verified clicks, 90,356 unique viewers across 19 streamers in Oct-Nov 2025.",
    locale: "en",
    datePublished: "2025-10-01",
    image: "/lovable-uploads/case-studies/nki-detoo.png",
    ogImageWidth: 1065,
    ogImageHeight: 583,
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
// Load a TypeScript data module by bundling it with esbuild and require()ing
// the result. Regex-parsing the source was tried first and silently broke: when
// blogPosts.ts was refactored to `[...posts_no, ...posts_sv, ...].filter(...)`
// the literal-array regex stopped matching, this returned [], and every blog
// post shipped with the fallback shell's homepage title and canonical. Evaluate
// the module instead so any future refactor of the data layer cannot desync it.
function loadTsModule(relPath, cacheKey) {
  const outfile = path.join(ROOT, "node_modules", ".cache", `seo-pages-${cacheKey}.cjs`);
  fs.mkdirSync(path.dirname(outfile), { recursive: true });
  buildSync({
    entryPoints: [path.join(ROOT, relPath)],
    bundle: true,
    format: "cjs",
    outfile,
    platform: "node",
    tsconfig: path.join(ROOT, "tsconfig.json"),
    logLevel: "silent",
  });
  const require = createRequire(import.meta.url);
  delete require.cache[require.resolve(outfile)];
  return require(outfile);
}

// Per-country blog hubs. Mirrors HUB_COPY in src/pages/BlogLocaleHub.tsx.
const BLOG_HUBS = [
  {
    locale: "no",
    hubSlug: "norge",
    h1: "Twitch-annonsering i Norge",
    intro:
      "Data og guider om Twitch, native overlay-annonsering og hvordan norske merkevarer når Gen Z der de faktisk er.",
  },
  {
    locale: "sv",
    hubSlug: "sverige",
    h1: "Twitch-annonsering i Sverige",
    intro:
      "Data och guider om Twitch, native overlay-annonsering och hur svenska varumärken når Gen Z där de faktiskt är.",
  },
  {
    locale: "fi",
    hubSlug: "suomi",
    h1: "Twitch-mainonta Suomessa",
    intro:
      "Dataa ja oppaita Twitchistä, natiiveista overlay-mainoksista ja siitä, miten suomalaiset brändit tavoittavat Z-sukupolven siellä missä se oikeasti on.",
  },
  {
    locale: "da",
    hubSlug: "danmark",
    h1: "Twitch-annoncering i Danmark",
    intro:
      "Data og guides om Twitch, native overlay-annoncering og hvordan danske brands når Gen Z, der hvor de faktisk er.",
  },
];

// Streamer profile shells, derived from the same data module StreamerProfile.tsx
// reads, so the title format here cannot drift from the rendered page.
function loadStreamerProfiles() {
  const { MARKET_CREATORS, MARKET_ROUNDUP } = loadTsModule("src/data/streamers.ts", "streamers");
  const out = [];
  for (const [market, creators] of Object.entries(MARKET_CREATORS || {})) {
    const roundup = MARKET_ROUNDUP?.[market];
    if (!roundup || !Array.isArray(creators)) continue;
    for (const c of creators) {
      out.push({
        handle: c.handle,
        locale: roundup.seoLocale,
        image: c.image || null,
        title: `${c.name}${c.realName ? ` (${c.realName})` : ""} | ${roundup.noun} | Beta Ads`,
        description: `Bakgrunn, kanaler og kilder for ${c.name} - ${c.meta}. ${c.blurb}`,
      });
    }
  }
  return out;
}

function parseBlogPosts() {
  const { blogPosts } = loadTsModule("src/data/blogPosts.ts", "blog");
  if (!Array.isArray(blogPosts)) {
    throw new Error("blogPosts.ts did not export a blogPosts array");
  }

  return blogPosts.map((p) => {
    // An explicit locale on the post wins; detectBlogLocale is the legacy
    // heuristic for older posts that predate the field.
    const locale =
      p.locale ||
      detectBlogLocale({
        category: p.category,
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
      });

    const pick = (obj, fallback) =>
      (obj && (obj[locale] || obj.en)) || fallback;

    // seoKeywords is either a bare array or a per-locale record of arrays or
    // comma-joined strings, depending on when the post was written.
    const rawKeywords = Array.isArray(p.seoKeywords) ? p.seoKeywords : pick(p.seoKeywords, "");
    const keywords = (Array.isArray(rawKeywords) ? rawKeywords : String(rawKeywords).split(","))
      .map((k) => String(k).trim())
      .filter(Boolean)
      .slice(0, 8)
      .join(", ");

    return {
      slug: p.slug,
      title: pick(p.seoTitle, `${p.title} | Beta Ads`),
      rawTitle: p.title,
      description: pick(p.seoDescription, p.excerpt),
      locale,
      category: p.category,
      image: p.image || null,
      dateISO: p.dateISO || null,
      keywords,
      translationGroup: p.translationGroup || null,
    };
  });
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
      "@id": `${pageUrl}#article`,
      "headline": rawTitle,
      "description": description,
      "url": pageUrl,
      ...(imageUrl ? { "image": imageUrl } : {}),
      ...(dateISO ? { "datePublished": dateISO, "dateModified": BUILD_DATE } : {}),
      "author": {
        "@type": "Organization",
        "name": "Beta Ads",
        "url": BASE_URL,
        "sameAs": ["https://www.linkedin.com/company/beta-nordic/", "https://discord.gg/tSmM6XMEkn"]
      },
      "publisher": {
        "@type": "Organization",
        "name": "Beta Ads",
        "logo": {
          "@type": "ImageObject",
          "url": `${BASE_URL}/lovable-uploads/logo-color.png`,
          "width": 200,
          "height": 50
        }
      },
      "mainEntityOfPage": { "@type": "WebPage", "@id": pageUrl },
      "isPartOf": { "@id": `${BASE_URL}/#website` },
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
      "@id": `${pageUrl}#article`,
      "headline": headline,
      "description": description,
      "url": pageUrl,
      ...(imageUrl ? { "image": imageUrl } : {}),
      ...(datePublished ? { "datePublished": datePublished, "dateModified": BUILD_DATE } : {}),
      "author": {
        "@type": "Organization",
        "name": "Beta Ads",
        "url": BASE_URL,
        "sameAs": ["https://www.linkedin.com/company/beta-nordic/", "https://discord.gg/tSmM6XMEkn"]
      },
      "publisher": {
        "@type": "Organization",
        "name": "Beta Ads",
        "logo": {
          "@type": "ImageObject",
          "url": `${BASE_URL}/lovable-uploads/logo-color.png`,
          "width": 200,
          "height": 50
        },
      },
      "mainEntityOfPage": { "@type": "WebPage", "@id": pageUrl },
      "isPartOf": { "@id": `${BASE_URL}/#website` },
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

// Crawlable homepage content, injected into #root of the homepage shell only.
// The homepage is too heavy for @sparticuz to prerender at build time (all 157
// other routes prerender fine), so it keeps the SEO shell — and a shell with an
// empty <div id="root"> gives AI crawlers ~230 chars to read. This block fixes
// that. The client uses createRoot(), which REPLACES #root on mount, so real
// visitors never see this markup; it is a no-JS fallback that mirrors the live
// homepage (not cloaking). Kept entity-dense for GEO: the legal-name binding
// sentence, the positioning line, services, real clients, markets, org number.
const HOME_CONTENT = `
      <main style="max-width:768px;margin:0 auto;padding:2rem;font-family:system-ui,sans-serif">
        <h1>Beta Ads — Native Twitch &amp; Livestream Advertising for Nordic Brands</h1>
        <p>Beta Ads is the trading name of Beta Agency AS (org. 933&nbsp;303&nbsp;136), a Nordic livestream advertising agency based in Oslo, Norway. Beta Ads is Norway's only specialist in native Twitch and livestream advertising.</p>
        <p>Beta Ads places native overlay ads directly inside live streams on Twitch, YouTube and Kick. Because the ad renders inside the broadcast feed, it cannot be skipped or removed by ad-blockers. Campaigns run across more than 39,000 Nordic streamers in Norway, Sweden, Denmark and Finland, with verified per-impression reporting through the Clip Analytics platform.</p>
        <h2>What Beta Ads does</h2>
        <ul>
          <li>Native overlay advertising on Twitch, YouTube Live and Kick</li>
          <li>Nordic creator and influencer campaigns across Norway, Sweden, Denmark and Finland</li>
          <li>Verified ad-delivery and brand-safety reporting via Clip Analytics</li>
          <li>Both managed and self-serve livestream ad campaigns</li>
        </ul>
        <h2>Selected clients</h2>
        <p>Samsung, Surfshark, Saily, Shure, Komplett, Glorious, NKI and Høyskolen Kristiania.</p>
        <h2>Why native livestream advertising</h2>
        <p>Streaming's young, engaged audience blocks traditional display and pre-roll ads at the highest rates of any group. Native overlay ads are rendered inside the stream, so they reach that audience where interruptive formats cannot. Beta Ads is built specifically for the Nordic market and the Twitch, YouTube and Kick platforms.</p>
        <h2>Contact</h2>
        <p>Beta Agency AS, Oslo, Norway. Email andreas@beta-ads.no. Web https://beta-ads.no.</p>
      </main>`;

function injectMeta(shellHtml, { title, description, canonical, locale, alternates, image, ogType = "website", articlePublishedTime = null, ogImageWidth = 1200, ogImageHeight = 630 }) {
  let html = shellHtml;
  const canonicalUrl = toAbsolute(canonical);
  const ogLocale = OG_LOCALES[locale] || "en_US";
  const ogImage = image ? toAbsolute(image) : null;

  const escapedTitle = escapeHtmlAttr(title);
  const escapedDesc = escapeHtmlAttr(description);

  // <html lang>
  // Tolerate extra attributes on <html> (class, dir, data-*) - an exact-shape
  // regex here silently no-ops and ships every locale as lang="en".
  html = html.replace(/<html\b[^>]*\blang="[^"]*"/, (tag) => tag.replace(/lang="[^"]*"/, `lang="${locale}"`));

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

  // og:type
  const ogTypeTag = `<meta property="og:type" content="${ogType}" />`;
  if (/<meta\s+property="og:type"/.test(html)) {
    html = html.replace(/<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/, ogTypeTag);
  } else {
    html = html.replace("</head>", `    ${ogTypeTag}\n  </head>`);
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
      `<meta property="og:image:width" content="${ogImageWidth}" />`,
      `<meta property="og:image:height" content="${ogImageHeight}" />`,
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

  // article:published_time + article:author — improves LinkedIn/Facebook share cards
  if (ogType === "article" && articlePublishedTime) {
    const pubTag = `<meta property="article:published_time" content="${articlePublishedTime}" />`;
    const authorTag = `<meta property="article:author" content="https://www.linkedin.com/company/beta-nordic/" />`;
    if (!html.includes('article:published_time')) {
      html = html.replace("</head>", `    ${pubTag}\n  </head>`);
    }
    if (!html.includes('article:author')) {
      html = html.replace("</head>", `    ${authorTag}\n  </head>`);
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
      // Inject the crawlable homepage content into #root (see HOME_CONTENT).
      // prerender.mjs runs after this; if the homepage prerender succeeds it
      // overwrites this with the full render, and if it fails (fail-open) this
      // richer shell survives instead of an empty one.
      const homeHtml = html.replace('<div id="root"></div>', `<div id="root">${HOME_CONTENT}</div>`);
      fs.writeFileSync(indexPath, homeHtml, "utf-8");
    } else {
      writeShell(path.join(DIST, route.replace(/^\//, ""), "index.html"), html);
    }
    staticCount++;
  }

  // Case studies
  for (const page of CASE_STUDIES) {
    const { route, title, description, locale, datePublished, image, ogImageWidth, ogImageHeight } = page;
    let html = injectMeta(shell, {
      title,
      description,
      canonical: route,
      locale,
      image,
      ogType: "article",
      articlePublishedTime: datePublished || null,
      ogImageWidth: ogImageWidth || 1200,
      ogImageHeight: ogImageHeight || 630,
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

  // Per-country blog hubs (/blog/norge, /blog/sverige, /blog/suomi, /blog/danmark).
  // Copy mirrors HUB_COPY in src/pages/BlogLocaleHub.tsx.
  let hubCount = 0;
  const hubAlternates = [
    ...BLOG_HUBS.map((h) => ({ hreflang: h.locale, href: `/blog/${h.hubSlug}` })),
    { hreflang: "en", href: "/blog" },
    { hreflang: "x-default", href: "/blog" },
  ];
  for (const hub of BLOG_HUBS) {
    const route = `/blog/${hub.hubSlug}`;
    const html = injectMeta(shell, {
      title: `${hub.h1} | Beta Ads`,
      description: hub.intro,
      canonical: route,
      locale: hub.locale,
      alternates: hubAlternates,
    });
    writeShell(path.join(DIST, "blog", hub.hubSlug, "index.html"), html);
    hubCount++;
  }

  // Streamer profiles (/streamere/<handle>) — derived from the same data module
  // the page component uses, so adding a creator needs no change here.
  let streamerCount = 0;
  for (const s of loadStreamerProfiles()) {
    const route = `/streamere/${s.handle}`;
    const html = injectMeta(shell, {
      title: s.title,
      description: s.description,
      canonical: route,
      locale: s.locale,
      image: s.image,
    });
    writeShell(path.join(DIST, "streamere", s.handle, "index.html"), html);
    streamerCount++;
  }

  // Blog posts
  const posts = parseBlogPosts();
  if (posts.length === 0) {
    // Previously this only console.error'd and the build stayed green, which is
    // how ~130 URLs shipped with the homepage's title and canonical for weeks.
    console.error("❌ parseBlogPosts() returned 0 posts — refusing to ship shells without blog coverage.");
    process.exit(1);
  }
  // translationGroup -> the locales it exists in, for hreflang clusters.
  const groupMembers = new Map();
  for (const p of posts) {
    if (!p.translationGroup) continue;
    if (!groupMembers.has(p.translationGroup)) groupMembers.set(p.translationGroup, []);
    groupMembers.get(p.translationGroup).push(p);
  }
  for (const post of posts) {
    const canonical = `/blog/${post.slug}`;
    // Posts sharing a translationGroup are each other's language alternates, so
    // Google serves the right language per country instead of picking one.
    const cluster = post.translationGroup ? groupMembers.get(post.translationGroup) : null;
    let alternates;
    if (cluster && cluster.length > 1) {
      alternates = cluster.map((m) => ({ hreflang: m.locale, href: `/blog/${m.slug}` }));
      const enSibling = cluster.find((m) => m.locale === "en");
      alternates.push({ hreflang: "x-default", href: `/blog/${(enSibling || post).slug}` });
    } else if (post.locale !== "en") {
      alternates = [
        { hreflang: post.locale, href: canonical },
        { hreflang: "x-default", href: canonical },
      ];
    }
    let html = injectMeta(shell, {
      title: post.title,
      description: post.description,
      canonical,
      locale: post.locale,
      alternates,
      image: post.image,
      ogType: "article",
      articlePublishedTime: post.dateISO || null,
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

  const total = staticCount + caseStudyCount + hubCount + streamerCount + blogCount;
  console.log(
    `✅ static HTML shells — ${staticCount} pages + ${caseStudyCount} case studies + ${hubCount} country hubs + ${streamerCount} streamer profiles + ${blogCount} blog posts (${total} total)`,
  );
}

main();
