#!/usr/bin/env node
/**
 * Post-build locale HTML shell generator.
 *
 * Problem: Vite SPA serves the same dist/index.html for every route. The
 * <SEO> React component sets per-page <html lang> and hreflang on hydration,
 * but Googlebot's first-pass crawl indexes the static HTML before JS runs —
 * so Norwegian pages looked like English pages to the initial crawl.
 *
 * Solution: After `vite build`, copy dist/index.html into dist/<path>/index.html
 * for each non-English route we care about, with:
 *   - <html lang="xx"> updated to the correct locale
 *   - Per-page hreflang <link> tags injected into <head>
 *
 * Vercel's rewrites (vercel.json) must also route the specific URLs to their
 * per-locale HTML file BEFORE the wildcard SPA fallback, otherwise the shell
 * never gets served.
 *
 * Runs in milliseconds — no browser, no Chromium, no Puppeteer. Failures are
 * soft so a broken config doesn't block the whole deploy.
 */
import fs from "node:fs";
import path from "node:path";

const DIST = path.resolve("dist");
const BASE_URL = "https://beta-ads.no";

// Routes that need non-default locale shells. Mirrors the language inference
// in src/pages/BlogPost.tsx (Guider/Innsikt/Strategi → no; Oppaat → fi;
// sverige/svensk slug → sv). Add new Nordic posts here when you add them in
// src/data/blogPosts.ts.
const ROUTES = [
  // Norwegian market landing page — bidirectional cluster with /
  {
    path: "/norge",
    locale: "no",
    alternates: [
      { hreflang: "no", href: "/norge" },
      { hreflang: "en", href: "/" },
      { hreflang: "x-default", href: "/" },
    ],
  },
  // Norwegian blog posts — single-locale (self-referential hreflang + x-default)
  ...[
    "twitch-annonsering-norge-guide",
    "norges-storste-streamer-merkevare-samarbeid",
    "twitch-sponsor-priser-norge-2026",
    "hvordan-tjene-penger-pa-twitch-guide-2026",
    "sommerkampanje-twitch-annonsering-2026",
    "gaming-markedsforing-forste-kampanje-guide",
    "twitch-statistikk-verktoy-2026",
    "nintendo-dominerer-livestreaming-2026",
    "creator-communities-fremtiden-influencer-marketing-2026",
    "shadow-drops-livestreaming-risiko-2026",
    "most-watched-game-publishers-livestreaming-2026",
    "medieplanlegging-twitch-nordisk-mediemiks",
    "overlay-ads-kreativ-design-beste-praksis",
    "merkevarer-utenfor-gaming-twitch-annonsering",
    "adblock-gen-z-overlay-ads-twitch-2026",
  ].map((slug) => ({
    path: `/blog/${slug}`,
    locale: "no",
    alternates: [
      { hreflang: "no", href: `/blog/${slug}` },
      { hreflang: "x-default", href: `/blog/${slug}` },
    ],
  })),
  // Swedish country guide
  {
    path: "/blog/twitch-reklam-sverige-guide",
    locale: "sv",
    alternates: [
      { hreflang: "sv", href: "/blog/twitch-reklam-sverige-guide" },
      { hreflang: "x-default", href: "/blog/twitch-reklam-sverige-guide" },
    ],
  },
  // Finnish country guide
  {
    path: "/blog/twitch-mainonta-suomi-opas",
    locale: "fi",
    alternates: [
      { hreflang: "fi", href: "/blog/twitch-mainonta-suomi-opas" },
      { hreflang: "x-default", href: "/blog/twitch-mainonta-suomi-opas" },
    ],
  },
];

// Also patches the default index.html (English homepage) so it declares its
// Norwegian sibling — closes the hreflang cluster at the HTML level.
const HOMEPAGE_ALTERNATES = [
  { hreflang: "en", href: "/" },
  { hreflang: "no", href: "/norge" },
  { hreflang: "x-default", href: "/" },
];

function toAbsolute(href) {
  return href.startsWith("http") ? href : `${BASE_URL}${href}`;
}

function buildHreflangTags(alternates) {
  return alternates
    .map(
      ({ hreflang, href }) =>
        `    <link rel="alternate" hreflang="${hreflang}" href="${toAbsolute(href)}" />`,
    )
    .join("\n");
}

function injectIntoShell(shellHtml, { locale, alternates }) {
  // 1) Update <html lang="...">
  let out = shellHtml.replace(/<html lang="[^"]*">/, `<html lang="${locale}">`);

  // 2) Insert hreflang tags right before </head>. Use a stable marker comment
  // so re-runs don't stack duplicates.
  const MARKER_START = "<!-- beta-ads:hreflang-start -->";
  const MARKER_END = "<!-- beta-ads:hreflang-end -->";
  const block = `${MARKER_START}\n${buildHreflangTags(alternates)}\n    ${MARKER_END}`;

  const existing = new RegExp(
    `${MARKER_START}[\\s\\S]*?${MARKER_END}`,
    "m",
  );
  if (existing.test(out)) {
    out = out.replace(existing, block);
  } else {
    out = out.replace("</head>", `    ${block}\n  </head>`);
  }
  return out;
}

function writeShell(targetPath, html) {
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.writeFileSync(targetPath, html, "utf-8");
}

function main() {
  const indexPath = path.join(DIST, "index.html");
  if (!fs.existsSync(indexPath)) {
    console.error("❌ dist/index.html not found — did `vite build` run?");
    process.exit(1);
  }

  const shell = fs.readFileSync(indexPath, "utf-8");
  let generated = 0;

  for (const route of ROUTES) {
    // path "/norge" → dist/norge/index.html
    // path "/blog/foo" → dist/blog/foo/index.html
    const targetDir = path.join(DIST, route.path.replace(/^\//, ""));
    const targetPath = path.join(targetDir, "index.html");
    const html = injectIntoShell(shell, route);
    writeShell(targetPath, html);
    generated += 1;
  }

  // Patch the homepage index.html in place so `/` also declares alternates.
  const homepagePatched = injectIntoShell(shell, {
    locale: "en",
    alternates: HOMEPAGE_ALTERNATES,
  });
  fs.writeFileSync(indexPath, homepagePatched, "utf-8");

  console.log(
    `✅ locale HTML shells: ${generated} per-path + 1 homepage patched (en/no/x-default).`,
  );
}

main();
