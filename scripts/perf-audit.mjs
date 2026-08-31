#!/usr/bin/env node
/**
 * Page-speed audit across every route.
 *
 * Why this exists: on 2026-08-30 Vercel reported a Real Experience Score of 28
 * with a p75 LCP of 14.58s, and there was no way to tell which page was at
 * fault. Speed Insights filed every sample under route "Unknown", and spot
 * checking the homepage showed nothing wrong. The slow page was /blog, which
 * nobody was looking at. This script measures all of them so that cannot
 * happen again.
 *
 * It serves the built `dist` rather than the dev server, because the dev server
 * ships unbundled ES modules and inflates the byte count by several megabytes.
 * The static server below mirrors vercel.json's rewrite: only extension-less
 * paths fall back to index.html, so a missing .png 404s here exactly as it
 * would in production.
 *
 * Usage:
 *   npm run build         (or: ./node_modules/.bin/vite build)
 *   node scripts/perf-audit.mjs
 *   node scripts/perf-audit.mjs --json > perf-baseline.json
 *   node scripts/perf-audit.mjs --compare perf-baseline.json
 *
 * Throttling is fixed at 5 Mbps / 70ms / 4x CPU. The absolute numbers are not
 * field data; the point is a like-for-like comparison between runs.
 */

import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const require = createRequire(path.join(ROOT, "package.json"));

/** Picked at listen time: a crashed or backgrounded run can leave 4610 held. */
let PORT = 4610;
const THROTTLE = { latency: 70, downKbps: 5 * 1024, cpu: 4 };
/** LCP above this is flagged. Google's "good" threshold is 2.5s. */
const LCP_BUDGET_MS = 2500;
/** Transferred bytes above this is flagged. */
const WEIGHT_BUDGET_MB = 2.0;

const ROUTES = [
  "/", "/blog", "/blog/how-twitch-advertising-works-2026", "/blog/norge", "/blog/sverige",
  "/blog/danmark", "/blog/suomi", "/about", "/case-studies", "/case-study/samsung",
  "/case-study/shure", "/case-study/saily", "/case-study/gokstad", "/case-study/glorious", "/contact", "/demo", "/press", "/streamers",
  "/norge", "/twitch-advertising", "/twitch-advertising-cost", "/kick-advertising",
  "/kick-advertising-cost", "/youtube-advertising", "/nordic-livestream-advertising",
  "/campaign-compliance", "/replay-reach", "/livestream-chat-engagement",
  "/twitch-annonsering-pris", "/privacy", "/terms",
];

const MIME = {
  ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".webp": "image/webp",
  ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".svg": "image/svg+xml",
  ".json": "application/json", ".mp4": "video/mp4", ".webm": "video/webm",
  ".ico": "image/x-icon", ".xml": "application/xml", ".txt": "text/plain", ".woff2": "font/woff2",
};

function serve() {
  return new Promise((resolve) => {
    const srv = http.createServer((req, res) => {
      const urlPath = decodeURIComponent(req.url.split("?")[0]);
      let f = path.join(DIST, urlPath);
      // Prerender writes each route to <route>/index.html. A static host serves
      // that for the directory; serving DIST/index.html instead hands back the
      // homepage at every prerendered URL, which measured as ~2 MB of extra
      // requests and a bogus 0.656 CLS on blog posts.
      if (fs.existsSync(f) && fs.statSync(f).isDirectory()) {
        const idx = path.join(f, "index.html");
        f = fs.existsSync(idx) ? idx : null;
      }
      if (!f || !fs.existsSync(f)) {
        const looksLikeFile = /\.[a-zA-Z0-9]{2,4}$/.test(urlPath);
        f = looksLikeFile ? null : path.join(DIST, "index.html");
      }
      if (!f || !fs.existsSync(f)) {
        res.writeHead(404);
        return res.end("not found");
      }
      const type = MIME[path.extname(f)] || "application/octet-stream";
      const size = fs.statSync(f).size;
      // Range support matters: <video preload="metadata"> asks for the first
      // bytes only. A server that answers 200 with the whole file makes the
      // browser download everything, which reported /case-study/shure as a
      // 44 MB page when production (206 Partial Content) sends ~1 KB of it.
      const range = req.headers.range;
      const m = range && /^bytes=(\d*)-(\d*)$/.exec(range);
      if (m) {
        const start = m[1] ? parseInt(m[1], 10) : 0;
        const end = m[2] ? parseInt(m[2], 10) : size - 1;
        if (start >= size || end >= size || start > end) {
          res.writeHead(416, { "content-range": `bytes */${size}` });
          return res.end();
        }
        res.writeHead(206, {
          "content-type": type,
          "accept-ranges": "bytes",
          "content-range": `bytes ${start}-${end}/${size}`,
          "content-length": end - start + 1,
        });
        return fs.createReadStream(f, { start, end }).pipe(res);
      }
      res.writeHead(200, { "content-type": type, "accept-ranges": "bytes", "content-length": size });
      fs.createReadStream(f).pipe(res);
    });
    srv.on("error", (e) => {
      if (e.code === "EADDRINUSE") { PORT += 1; srv.listen(PORT); }
      else throw e;
    });
    srv.listen(PORT, () => resolve(srv));
  });
}

async function measure(browser, route) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  const cdp = await page.target().createCDPSession();
  await cdp.send("Network.enable");
  await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
  await cdp.send("Network.emulateNetworkConditions", {
    offline: false,
    latency: THROTTLE.latency,
    downloadThroughput: (THROTTLE.downKbps * 1024) / 8,
    uploadThroughput: (1024 * 1024) / 8,
  });
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: THROTTLE.cpu });

  const seen = new Map();
  cdp.on("Network.responseReceived", (e) =>
    seen.set(e.requestId, { url: e.response.url, type: e.type, status: e.response.status }));
  cdp.on("Network.loadingFinished", (e) => {
    const r = seen.get(e.requestId);
    if (r) r.bytes = e.encodedDataLength;
  });

  await page.evaluateOnNewDocument(() => {
    window.__lcp = null;
    new PerformanceObserver((l) => {
      const e = l.getEntries().at(-1);
      window.__lcp = { t: e.startTime, url: e.url, tag: e.element?.tagName };
    }).observe({ type: "largest-contentful-paint", buffered: true });
    window.__cls = 0;
    new PerformanceObserver((l) => {
      for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value;
    }).observe({ type: "layout-shift", buffered: true });
  });

  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e).slice(0, 90)));

  let result;
  try {
    await page.goto(`http://127.0.0.1:${PORT}${route}`, { waitUntil: "load", timeout: 120000 });
    await new Promise((r) => setTimeout(r, 3500));
    const m = await page.evaluate(() => ({
      lcp: window.__lcp,
      cls: Math.round((window.__cls || 0) * 1000) / 1000,
      fcp: performance.getEntriesByName("first-contentful-paint")[0]?.startTime ?? null,
      text: document.body.innerText.length,
    }));
    const all = [...seen.values()].filter((r) => r.bytes);
    const byType = {};
    for (const r of all) byType[r.type] = (byType[r.type] || 0) + r.bytes;
    result = {
      route,
      lcp: Math.round(m.lcp?.t ?? 0),
      fcp: Math.round(m.fcp ?? 0),
      cls: m.cls,
      bytes: all.reduce((s, r) => s + r.bytes, 0),
      requests: all.length,
      byType,
      text: m.text,
      broken: all.filter((r) => r.status >= 400).map((r) => `${r.status} ${r.url.slice(-52)}`),
      heaviest: all.sort((a, b) => b.bytes - a.bytes).slice(0, 3)
        .map((r) => ({ kb: Math.round(r.bytes / 1024), url: r.url.replace(`http://127.0.0.1:${PORT}`, "") })),
      errors,
    };
  } catch (e) {
    result = { route, failed: String(e).slice(0, 100) };
  }
  await page.close();
  return result;
}

const mb = (b) => (b / 1024 / 1024).toFixed(2);

async function main() {
  const asJson = process.argv.includes("--json");
  const compareIdx = process.argv.indexOf("--compare");
  const baseline = compareIdx > -1
    ? JSON.parse(fs.readFileSync(process.argv[compareIdx + 1], "utf8"))
    : null;

  if (!fs.existsSync(path.join(DIST, "index.html"))) {
    console.error("dist/index.html missing. Run the build first.");
    process.exit(1);
  }

  const puppeteer = require("puppeteer");
  const server = await serve();
  const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });

  // --only <substr> narrows the run, for re-checking a single suspicious route.
  const onlyIdx = process.argv.indexOf("--only");
  const routes = onlyIdx > -1 ? ROUTES.filter((r) => r.includes(process.argv[onlyIdx + 1])) : ROUTES;

  const results = [];
  for (const route of routes) {
    const r = await measure(browser, route);
    results.push(r);
    if (!asJson) {
      if (r.failed) {
        console.log(`  FAIL ${r.route.padEnd(38)} ${r.failed}`);
      } else {
        const prev = baseline?.find((b) => b.route === r.route);
        const d = prev ? ` (was ${prev.lcp}ms / ${mb(prev.bytes)}MB)` : "";
        const flag = r.lcp > LCP_BUDGET_MS || r.bytes / 1048576 > WEIGHT_BUDGET_MB ? " <--" : "";
        console.log(
          `  ${r.route.padEnd(38)} LCP ${String(r.lcp).padStart(5)}ms  ` +
          `${mb(r.bytes).padStart(5)}MB  ${String(r.requests).padStart(3)}req  ` +
          `CLS ${String(r.cls).padEnd(5)}${flag}${d}`);
      }
    }
  }

  await browser.close();
  server.close();

  if (asJson) {
    console.log(JSON.stringify(results, null, 2));
    return;
  }

  const ok = results.filter((r) => !r.failed);
  const worst = [...ok].sort((a, b) => b.lcp - a.lcp).slice(0, 5);
  const heavy = [...ok].sort((a, b) => b.bytes - a.bytes).slice(0, 5);
  console.log(`\n  routes: ${ok.length} measured, ${results.length - ok.length} failed`);
  console.log(`  over LCP budget (${LCP_BUDGET_MS}ms): ${ok.filter((r) => r.lcp > LCP_BUDGET_MS).length}`);
  console.log(`  over weight budget (${WEIGHT_BUDGET_MB}MB): ${ok.filter((r) => r.bytes / 1048576 > WEIGHT_BUDGET_MB).length}`);
  console.log(`\n  slowest LCP:`);
  worst.forEach((r) => console.log(`    ${String(r.lcp).padStart(6)}ms  ${r.route}   ${r.heaviest[0]?.kb}KB ${r.heaviest[0]?.url.slice(0, 54) ?? ""}`));
  console.log(`\n  heaviest:`);
  heavy.forEach((r) => console.log(`    ${mb(r.bytes).padStart(6)}MB  ${r.route}`));

  const broken = ok.flatMap((r) => r.broken.map((b) => `${r.route}: ${b}`));
  if (broken.length) {
    console.log(`\n  broken requests:`);
    [...new Set(broken)].slice(0, 12).forEach((b) => console.log(`    ${b}`));
  }
  const errs = ok.flatMap((r) => r.errors.map((e) => `${r.route}: ${e}`));
  if (errs.length) {
    console.log(`\n  page errors:`);
    [...new Set(errs)].slice(0, 8).forEach((e) => console.log(`    ${e}`));
  }
}

main();
