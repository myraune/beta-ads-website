import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const BASE_URL = 'https://beta-ads.no';

// ---------------------------------------------------------------------------
// Static pages map
// ---------------------------------------------------------------------------
const STATIC_PAGES = [
  {
    route: '/',
    title: 'Beta Ads | Native Livestream Advertising for Nordic Brands',
    description: 'Reach 40+ Nordic streamers on Twitch, YouTube & Kick. Native overlay ads that bypass adblock — 3-5x higher engagement than display. Book a free demo today.'
  },
  {
    route: '/streamers',
    title: 'Earn from Your Stream | Beta Ads Streamer Program',
    description: 'Get real brand deals on Twitch, YouTube & Kick. Accept offers you like, skip the rest. No follower minimum, no contracts. Join 40+ Nordic streamers earning monthly.'
  },
  {
    route: '/pricing',
    title: 'Pricing | Beta Ads Livestream Advertising',
    description: 'Transparent pricing for native livestream advertising in the Nordics. Pay per impression, no setup fees. Start with any budget — see plans and get a free demo.'
  },
  {
    route: '/blog',
    title: 'Blog | Livestream Advertising Insights — Beta Ads',
    description: 'Expert insights on Twitch advertising, Nordic streaming trends, influencer marketing and live commerce. Data-driven articles for brands and agencies.'
  },
  {
    route: '/contact',
    title: 'Contact Beta Ads | Start a Livestream Campaign',
    description: 'Talk to our team about running native overlay ads on Nordic Twitch, YouTube & Kick streams. Get a free campaign proposal within 24 hours.'
  },
  {
    route: '/demo',
    title: 'Book a Demo | Beta Ads Livestream Advertising',
    description: 'See exactly how native overlay ads work on Twitch, YouTube and Kick. Book a 20-minute demo with our Nordic advertising team — free, no commitment.'
  },
  {
    route: '/twitch-advertising',
    title: 'Twitch Advertising Agency for Nordic Brands | Beta Ads',
    description: 'Run native overlay ads on 39,000+ Nordic Twitch streams. 0% adblock rate, 3-5x higher engagement than display ads. Reach Gen Z where they actually watch.'
  },
  {
    route: '/youtube-advertising',
    title: 'YouTube Livestream Advertising in the Nordics | Beta Ads',
    description: 'Advertise on 8,200+ Nordic YouTube live streams. Native overlay formats with 45+ min average session time. No pre-roll skipping — ads viewers actually see.'
  },
  {
    route: '/kick-advertising',
    title: 'Kick Advertising for Nordic Brands | Beta Ads',
    description: 'First-mover advantage on Kick — the fastest-growing streaming platform. 2,800+ Nordic streamers, 125% growth in 2025. Start before your competitors do.'
  },
  {
    route: '/about',
    title: 'About Beta Ads | Nordic Livestream Advertising Platform',
    description: 'Founded in Oslo by Andreas Myraune. Beta Ads connects Nordic brands with Twitch, YouTube and Kick streamers through native overlay advertising.'
  },
  {
    route: '/case-studies',
    title: 'Case Studies | Beta Ads Livestream Campaign Results',
    description: 'Real results from native livestream advertising campaigns. See how Nordic brands achieved 3-5x higher engagement and bypassed adblock with Beta Ads.'
  },
];

// ---------------------------------------------------------------------------
// Helper: inject meta tags into raw HTML string
// ---------------------------------------------------------------------------
function injectMeta(html, title, description, canonical) {
  // Replace <title>
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);

  // Replace meta description
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${description}">`
  );

  // Replace og:title
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${title}" />`
  );

  // Replace og:description
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${description}" />`
  );

  // Replace or insert canonical
  const canonicalTag = `<link rel="canonical" href="${BASE_URL}${canonical}" />`;
  if (html.includes('<link rel="canonical"')) {
    html = html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,  canonicalTag);
  } else {
    html = html.replace('</head>', `  ${canonicalTag}\n</head>`);
  }

  // Replace or insert og:url
  const ogUrlTag = `<meta property="og:url" content="${BASE_URL}${canonical}" />`;
  if (html.includes('<meta property="og:url"')) {
    html = html.replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,  ogUrlTag);
  } else {
    html = html.replace('</head>', `  ${ogUrlTag}\n</head>`);
  }

  return html;
}

// ---------------------------------------------------------------------------
// Parse blog posts from TypeScript source using regex
// ---------------------------------------------------------------------------
function parseBlogPosts() {
  const srcPath = path.join(ROOT, 'src/data/blogPosts.ts');
  const source = fs.readFileSync(srcPath, 'utf-8');

  const slugMatches = [...source.matchAll(/slug:\s*["']([^"']+)["']/g)];
  // Skip the first match if it's from the interface definition (no value there)
  // Filter: only keep slug entries that have actual values (not "slug:" from the interface)
  const slugs = slugMatches.map(m => m[1]);

  const titleMatches = [...source.matchAll(/seoTitle:\s*\{[^}]*en:\s*["']([^"']+)["']/gs)];
  const descMatches = [...source.matchAll(/seoDescription:\s*\{[^}]*en:\s*["']([^"']+)["']/gs)];

  const posts = [];
  for (let i = 0; i < slugs.length; i++) {
    const slug = slugs[i];
    const title = titleMatches[i] ? titleMatches[i][1] : `Beta Ads Blog | ${slug}`;
    const desc = descMatches[i] ? descMatches[i][1] : '';
    posts.push({ slug, title, description: desc });
  }

  return posts;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
function main() {
  const indexHtmlPath = path.join(DIST, 'index.html');

  if (!fs.existsSync(indexHtmlPath)) {
    console.error('ERROR: dist/index.html not found. Run vite build first.');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

  // Generate static pages
  for (const page of STATIC_PAGES) {
    const { route, title, description } = page;
    const html = injectMeta(baseHtml, title, description, route);

    if (route === '/') {
      // Root — overwrite dist/index.html directly
      fs.writeFileSync(indexHtmlPath, html, 'utf-8');
      console.log('Generated: dist/index.html (/)');
    } else {
      const dir = path.join(DIST, route);
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf-8');
      console.log(`Generated: dist${route}/index.html`);
    }
  }

  // Generate blog post pages
  let posts;
  try {
    posts = parseBlogPosts();
  } catch (err) {
    console.error('ERROR: Could not parse blogPosts.ts:', err.message);
    process.exit(1);
  }

  console.log(`\nParsed ${posts.length} blog posts from src/data/blogPosts.ts`);

  for (const post of posts) {
    const { slug, title, description } = post;
    const canonical = `/blog/${slug}`;
    const html = injectMeta(baseHtml, title, description, canonical);
    const dir = path.join(DIST, 'blog', slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf-8');
    console.log(`Generated: dist/blog/${slug}/index.html`);
  }

  console.log(`\nDone. Generated ${STATIC_PAGES.length} static pages + ${posts.length} blog post pages.`);
}

main();
