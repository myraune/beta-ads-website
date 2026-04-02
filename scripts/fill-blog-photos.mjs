/**
 * Auto-fill /public/blog-photos/ with relevant free photos from Pexels.
 * Uses Playwright to search and download. All Pexels photos are free to use.
 *
 * Usage: node scripts/fill-blog-photos.mjs [count-per-category]
 *   Default: 12 photos per category = ~120 total
 */

import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';
import https from 'https';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '..', 'public', 'blog-photos');
const PER_CATEGORY = parseInt(process.argv[2]) || 12;

// Category → search queries (rotated for variety)
const categories = {
  twitch: [
    'gaming stream setup neon lights',
    'streamer playing video games microphone',
    'gaming room purple light monitors',
  ],
  kick: [
    'live streaming setup green lights',
    'esports player dual monitors',
    'gaming desk setup modern rgb',
  ],
  youtube: [
    'youtube studio setup camera',
    'video creator filming studio',
    'content creator desk camera ring light',
  ],
  esports: [
    'esports tournament arena stage',
    'competitive gaming team event',
    'gaming competition audience',
  ],
  gaming: [
    'gaming controller neon lights',
    'gaming pc setup rgb keyboard',
    'gaming headset desk setup',
    'video game screen gameplay',
  ],
  streamers: [
    'person gaming headset microphone',
    'streamer microphone webcam setup',
    'young person playing computer game',
  ],
  analytics: [
    'data analytics dashboard screen',
    'business charts laptop screen',
    'marketing analytics computer monitor',
  ],
  nordic: [
    'scandinavian modern office interior',
    'nordic city winter skyline',
    'stockholm cityscape modern',
  ],
  advertising: [
    'digital marketing campaign screen',
    'social media advertising phone',
    'brand marketing strategy meeting',
  ],
  general: [
    'technology modern workspace laptop',
    'gen z young people phones',
    'audience watching screen event',
  ],
};

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const doGet = (u, redirects = 0) => {
      if (redirects > 5) return reject(new Error('Too many redirects'));
      https.get(u, { headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)' } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          const loc = res.headers.location.startsWith('/') ? 'https://images.pexels.com' + res.headers.location : res.headers.location;
          return doGet(loc, redirects + 1);
        }
        if (res.statusCode !== 200) return reject(new Error('HTTP ' + res.statusCode));
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on('finish', () => { file.close(); resolve(); });
        file.on('error', reject);
      }).on('error', reject);
    };
    doGet(url);
  });
}

async function scrapeCategory(browser, category, queries) {
  const catDir = path.join(outDir, category);
  fs.mkdirSync(catDir, { recursive: true });

  const existing = fs.readdirSync(catDir).filter(f => /\.(jpe?g|png|webp)$/i.test(f));
  const needed = PER_CATEGORY - existing.length;
  if (needed <= 0) {
    console.log(`  [${category}] Already has ${existing.length}/${PER_CATEGORY}, skip`);
    return existing.length;
  }

  // Collect unique image URLs from multiple search queries
  const allUrls = [];
  const seenIds = new Set();

  for (const query of queries) {
    if (allUrls.length >= needed * 2) break; // get extras in case some fail

    const pg = await browser.newPage();
    try {
      await pg.goto(`https://www.pexels.com/search/${encodeURIComponent(query)}/`, {
        waitUntil: 'domcontentloaded',
        timeout: 15000,
      });
      await pg.waitForTimeout(3000);
      // Scroll down to load more images
      await pg.evaluate(() => window.scrollBy(0, 2000));
      await pg.waitForTimeout(2000);

      // Extract all Pexels photo URLs
      const urls = await pg.evaluate(() => {
        return Array.from(document.querySelectorAll('img'))
          .map(img => img.getAttribute('src') || '')
          .filter(s => s.includes('images.pexels.com/photos/'));
      });

      for (const rawUrl of urls) {
        // Extract the photo ID to deduplicate
        const match = rawUrl.match(/\/photos\/(\d+)\//);
        if (!match) continue;
        const photoId = match[1];
        if (seenIds.has(photoId)) continue;
        seenIds.add(photoId);

        // Build a sized download URL (landscape, 1200x675 for 16:9)
        const cleanPath = rawUrl.split('?')[0];
        const dlUrl = cleanPath + '?auto=compress&cs=tinysrgb&w=1200&h=675&fit=crop&dpr=1';
        allUrls.push({ url: dlUrl, id: photoId });
      }
    } catch (err) {
      console.warn(`    query "${query}" failed: ${err.message.split('\n')[0]}`);
    } finally {
      await pg.close();
    }
  }

  // Download up to `needed` images
  let downloaded = 0;
  let idx = existing.length;

  for (const { url, id } of allUrls) {
    if (downloaded >= needed) break;
    const filename = `${category}-${String(idx + 1).padStart(3, '0')}.jpg`;
    const dest = path.join(catDir, filename);

    try {
      await download(url, dest);
      const stat = fs.statSync(dest);
      if (stat.size < 10000) { // too small = probably error page
        fs.unlinkSync(dest);
        continue;
      }
      downloaded++;
      idx++;
    } catch {
      try { fs.unlinkSync(dest); } catch {}
    }
  }

  const total = existing.length + downloaded;
  console.log(`  [${category}] +${downloaded} new (${total} total)`);
  return total;
}

async function run() {
  console.log(`\nFilling blog-photos/ — ${PER_CATEGORY} per category\n`);

  const browser = await chromium.launch({ headless: true });

  let grandTotal = 0;
  const cats = Object.entries(categories);
  for (let i = 0; i < cats.length; i++) {
    const [cat, queries] = cats[i];
    // Fresh context per category to avoid rate limiting / captchas
    const ctx = await browser.newContext({
      viewport: { width: 1400, height: 900 },
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    });
    grandTotal += await scrapeCategory(ctx, cat, queries);
    await ctx.close();
    // Pause between categories to avoid rate limits
    if (i < cats.length - 1) await new Promise(r => setTimeout(r, 3000));
  }

  await browser.close();
  console.log(`\nDone: ${grandTotal} photos in ${Object.keys(categories).length} folders`);
  console.log(`→ public/blog-photos/\n`);
}

run().catch(console.error);
