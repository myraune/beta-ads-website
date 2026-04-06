/**
 * scripts/prerender.mjs
 *
 * Static pre-renderer for beta-ads-redesign.
 *
 * After `vite build` produces dist/, this script:
 *   1. Starts `vite preview` to serve the built SPA on a local port.
 *   2. Uses Puppeteer to visit every route, waits for React to render, and
 *      captures the full HTML (including all meta tags injected by
 *      react-helmet-async and all JSON-LD structured data from page components).
 *   3. Writes each route's HTML to dist/{route}/index.html so Vercel serves
 *      real content for every URL — not just the blank SPA shell.
 *
 * Routes covered:
 *   - All static pages defined in STATIC_ROUTES
 *   - All blog posts parsed from src/data/blogPosts.ts
 *
 * Animation handling:
 *   A CSS class `.prerendering` is injected before capture to force all
 *   IntersectionObserver-gated and framer-motion elements visible, so the
 *   full page content ends up in the static HTML.
 */

import puppeteer from "puppeteer";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT   = path.resolve(__dirname, "..");
const DIST   = path.join(ROOT, "dist");
const PORT   = 4173; // vite preview default
const BASE   = `http://localhost:${PORT}`;
const SITE   = "https://beta-ads.no";

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------
const STATIC_ROUTES = [
  "/",
  "/twitch-advertising",
  "/youtube-advertising",
  "/kick-advertising",
  "/streamers",
  "/about",
  "/blog",
  "/contact",
  "/demo",
  "/press",
  "/pricing",
  "/case-studies",
  "/case-study/samsung",
  "/case-study/glorious",
  "/case-study/gokstad",
  "/terms",
  "/privacy",
];

function getBlogSlugs() {
  const src = fs.readFileSync(path.join(ROOT, "src/data/blogPosts.ts"), "utf-8");
  // Match slug values from the data array (skip the interface property declaration)
  const matches = [...src.matchAll(/^\s+slug:\s*["']([^"']+)["']/gm)];
  return matches.map((m) => m[1]);
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function startPreviewServer() {
  const child = spawn("/Users/myraune/.nvm/versions/node/v24.13.0/bin/node", ["node_modules/.bin/vite", "preview", "--port", String(PORT), "--host"], {
    cwd: ROOT,
    stdio: ["ignore", "pipe", "pipe"],
    detached: false,
  });

  return new Promise((resolve, reject) => {
    let stdout = "";
    child.stdout.on("data", (d) => {
      stdout += d.toString();
      if (stdout.includes(String(PORT))) {
        resolve(child);
      }
    });
    child.stderr.on("data", (d) => {
      const msg = d.toString();
      if (msg.includes(String(PORT))) resolve(child);
    });
    child.on("error", reject);
    // Give it 8s at most to start
    setTimeout(() => resolve(child), 8000);
  });
}

/**
 * Remove hardcoded (non-data-rh) head tags that would duplicate the per-page
 * tags injected by react-helmet-async (which carry data-rh="true").
 *
 * Without this, social crawlers (Facebook / LinkedIn) read the FIRST occurrence
 * of og:title etc., which would be the generic homepage value baked into
 * index.html instead of the page-specific value from the React component.
 */
function deduplicateHeadTags(html) {
  // Properties that react-helmet-async owns per-page
  const rhProperties = [
    // canonical
    /(<link\s[^>]*rel="canonical"[^>]*>)(?=[^]*<link\s[^>]*rel="canonical"[^>]*data-rh="true")/gi,
    // og: meta property tags
    /(<meta\s[^>]*property="og:title"[^>]*>)(?=[^]*<meta\s[^>]*property="og:title"[^>]*data-rh="true")/gi,
    /(<meta\s[^>]*property="og:description"[^>]*>)(?=[^]*<meta\s[^>]*property="og:description"[^>]*data-rh="true")/gi,
    /(<meta\s[^>]*property="og:url"[^>]*>)(?=[^]*<meta\s[^>]*property="og:url"[^>]*data-rh="true")/gi,
    /(<meta\s[^>]*property="og:image"[^>]*>)(?=[^]*<meta\s[^>]*property="og:image"[^>]*data-rh="true")/gi,
    /(<meta\s[^>]*property="og:type"[^>]*>)(?=[^]*<meta\s[^>]*property="og:type"[^>]*data-rh="true")/gi,
    // twitter: meta name tags
    /(<meta\s[^>]*name="twitter:title"[^>]*>)(?=[^]*<meta\s[^>]*name="twitter:title"[^>]*data-rh="true")/gi,
    /(<meta\s[^>]*name="twitter:description"[^>]*>)(?=[^]*<meta\s[^>]*name="twitter:description"[^>]*data-rh="true")/gi,
    /(<meta\s[^>]*name="twitter:image"[^>]*>)(?=[^]*<meta\s[^>]*name="twitter:image"[^>]*data-rh="true")/gi,
    // page title: react-helmet-async sets <title>, remove duplicates if any
  ];

  let result = html;
  for (const re of rhProperties) {
    result = result.replace(re, "<!-- [prerender: removed duplicate static tag] -->");
  }
  return result;
}

function saveHtml(route, html) {
  // Replace any leftover localhost references with the production URL
  let clean = html.replace(new RegExp(`http://localhost:${PORT}`, "g"), SITE);
  // Remove static head tags that are duplicated by react-helmet-async
  clean = deduplicateHeadTags(clean);

  if (route === "/") {
    fs.writeFileSync(path.join(DIST, "index.html"), clean, "utf-8");
  } else {
    const dir = path.join(DIST, route.replace(/^\//, ""));
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "index.html"), clean, "utf-8");
  }
}


// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  if (!fs.existsSync(DIST)) {
    console.error("ERROR: dist/ not found — run `vite build` first.");
    process.exit(1);
  }

  const blogSlugs = getBlogSlugs();
  const allRoutes = [
    ...STATIC_ROUTES,
    ...blogSlugs.map((s) => `/blog/${s}`),
  ];

  console.log(`\n🚀 Starting pre-render of ${allRoutes.length} routes…\n`);

  // Start vite preview
  console.log("  Starting vite preview server…");
  const previewProcess = await startPreviewServer();
  console.log(`  Preview server ready at ${BASE}\n`);

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
      "--no-first-run",
    ],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  // Intercept canvas.getContext so Three.js sees no WebGL in headless mode,
  // and returns null (graceful) instead of throwing an uncaught error.
  await page.evaluateOnNewDocument(() => {
    const origGetContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, ...args) {
      if (type === "webgl" || type === "webgl2" || type === "experimental-webgl") {
        return null;
      }
      return origGetContext.call(this, type, ...args);
    };
  });

  // Log JS errors and failed requests so we can diagnose mount failures
  page.on("pageerror", (err) => {
    // Filter out the expected Three.js WebGL error (now patched above)
    if (!err.message.includes("WebGL")) {
      process.stderr.write(`    [page error] ${err.message}\n`);
    }
  });
  page.on("requestfailed", (req) => {
    // Only log local requests (chunk 404s etc.) — ignore external CDN noise
    if (req.url().startsWith(BASE)) {
      process.stderr.write(`    [404] ${req.url()} — ${req.failure()?.errorText}\n`);
    }
  });
  // Suppress routine console output but surface errors
  page.on("console", (msg) => {
    if (msg.type() === "error" && !msg.text().includes("WebGL")) {
      process.stderr.write(`    [console error] ${msg.text()}\n`);
    }
  });

  let ok = 0;
  let fail = 0;

  for (const route of allRoutes) {
    try {
      // "networkidle0" waits until there are no open network connections for
      // 500ms. This covers both the main bundle AND any lazy-loaded route chunks
      // that React.lazy() fetches after the initial load event fires.
      await page.goto(`${BASE}${route}`, {
        waitUntil: "networkidle0",
        timeout: 60_000,
      });

      // Wait for React to actually mount content into #root.
      // With networkidle0, the lazy chunk should already be loaded, so this
      // should resolve almost immediately. We still wait up to 15s as a safety net.
      await page.waitForFunction(
        () => {
          const root = document.getElementById("root");
          return root !== null && root.childElementCount > 0;
        },
        { timeout: 15_000 }
      );

      // Force all animated / scroll-gated elements visible so their content
      // appears in the static HTML (Google reads text even if opacity:0, but
      // this ensures nothing is display:none or visibility:hidden)
      await page.evaluate(() => {
        // Add a prerendering marker class
        document.documentElement.classList.add("prerendering");

        // Directly override any framer-motion / useScrollAnimation hidden state
        const style = document.createElement("style");
        style.textContent = `
          html.prerendering *[style*="opacity: 0"],
          html.prerendering *[style*="opacity:0"] {
            opacity: 1 !important;
          }
          html.prerendering *[style*="visibility: hidden"] {
            visibility: visible !important;
          }
          html.prerendering *[style*="display: none"] {
            display: block !important;
          }
        `;
        document.head.appendChild(style);
      });

      // Give React an extra tick to flush any deferred state / lazy children
      await new Promise((r) => setTimeout(r, 800));

      const html = await page.content();
      saveHtml(route, html);
      console.log(`  ✓  ${route}`);
      ok++;
    } catch (err) {
      console.error(`  ✗  ${route}  → ${err.message}`);
      fail++;
    }
  }

  await browser.close();

  // Kill the preview server
  try {
    previewProcess.kill("SIGTERM");
  } catch (_) {}

  console.log(`\n✅ Pre-render complete — ${ok} succeeded, ${fail} failed.\n`);

  if (fail > 0) {
    // Don't abort the build for individual page failures
    console.warn(`⚠️  ${fail} page(s) failed to pre-render and will fall back to the SPA shell.`);
  }
}

main().catch((err) => {
  console.error("Pre-render fatal error:", err);
  process.exit(1);
});
