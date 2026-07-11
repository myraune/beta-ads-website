// Generate branded editorial hero images for the 8 B2B/media-planning blog posts.
// Dark, typographic, on-brand (signal red accent, Instrument Serif italic accent word).
// No stock photos, no AI-slop gradients — a clean magazine-cover system.
// Output: public/lovable-uploads/blog-<slug>-hero.png at 1600x900 (16:9), @2x.
import { chromium } from "playwright";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "lovable-uploads");

// Each card: kicker (category), title lines with one {accent} word in serif italic,
// a big ghosted background word, and a small meta line.
const cards = [
  {
    slug: "b2b-brands-live-streaming-advertising-2026",
    kicker: "B2B on stream",
    title: ["Your buyers are", "already {watching}"],
    ghost: "B2B",
    meta: "Live-streaming for B2B brands",
  },
  {
    slug: "creator-brief-authentic-integration-templates-2026",
    kicker: "Creator ops",
    title: ["The brief that", "doesn’t {kill} the read"],
    ghost: "BRIEF",
    meta: "Anatomy of a creator brief",
  },
  {
    slug: "incremental-sales-lift-twitch-sponsorship-measurement-2026",
    kicker: "Measurement",
    title: ["Measure the {lift},", "not the impressions"],
    ghost: "LIFT",
    meta: "Incrementality on Twitch & Kick",
  },
  {
    slug: "nordic-fast-channels-brand-advertising-2026",
    kicker: "Media planning",
    title: ["The free TV slot", "your plan is {missing}"],
    ghost: "FAST",
    meta: "FAST channels in the Nordics",
  },
  {
    slug: "nordic-streaming-media-planning-calendar-2026",
    kicker: "Media planning",
    title: ["When to {book}", "Nordic streaming"],
    ghost: "2026",
    meta: "The 2026 Nordic streaming calendar",
  },
  {
    slug: "streamer-clip-usage-rights-paid-media-2026",
    kicker: "Rights & paid media",
    title: ["Who {owns}", "the clip?"],
    ghost: "CLIP",
    meta: "Usage rights, whitelisting & paid media",
  },
  {
    slug: "streaming-ad-frequency-capping-wearout-2026",
    kicker: "Creative strategy",
    title: ["How often is", "{too} often?"],
    ghost: "FREQ",
    meta: "Frequency capping & creative wearout",
  },
  {
    slug: "twitch-community-events-brand-activation-2026",
    kicker: "Brand activation",
    title: ["Subathons, charity", "streams & {squad} cups"],
    ghost: "LIVE",
    meta: "Community events Nordic brands skip",
  },
];

const RED = "#e94f37";

function renderTitle(lines) {
  return lines
    .map((l) => {
      const html = l.replace(
        /\{([^}]+)\}/g,
        `<span class="accent">$1</span>`
      );
      return `<span class="tline">${html}</span>`;
    })
    .join("");
}

function page(card) {
  return `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Instrument+Serif:ital@1&display=swap" rel="stylesheet">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  html,body { width:1600px; height:900px; }
  body {
    background: #0a0a0b;
    font-family: 'Inter', system-ui, sans-serif;
    color:#fff; overflow:hidden; position:relative;
  }
  /* subtle top-left ambient wash (not a decorative blob — very low, flat vignette) */
  .wash { position:absolute; inset:0;
    background: radial-gradient(1200px 700px at 8% -10%, rgba(233,79,55,0.10), transparent 60%); }
  /* faint baseline grid for editorial texture */
  .grid { position:absolute; inset:0; opacity:0.04;
    background-image: linear-gradient(#fff 1px, transparent 1px);
    background-size: 100% 88px; }
  .ghost { position:absolute; right:-40px; bottom:-140px;
    font-weight:800; font-size:520px; letter-spacing:-0.04em;
    color:#fff; opacity:0.035; line-height:0.8; user-select:none; white-space:nowrap; }
  .frame { position:absolute; inset:0; padding:110px 120px; display:flex; flex-direction:column; }
  .kicker { display:flex; align-items:center; gap:18px;
    font-size:22px; font-weight:600; letter-spacing:0.22em; text-transform:uppercase; color:${RED}; }
  .kicker::before { content:""; width:56px; height:3px; background:${RED}; display:block; }
  .title { margin-top:auto; margin-bottom:0; display:flex; flex-direction:column; gap:6px; }
  .tline { font-size:98px; font-weight:600; letter-spacing:-0.03em; line-height:1.02; }
  .accent { font-family:'Instrument Serif', Georgia, serif; font-style:italic; font-weight:400; color:${RED}; letter-spacing:0; }
  .foot { margin-top:56px; display:flex; align-items:flex-end; justify-content:space-between;
    border-top:1px solid rgba(255,255,255,0.14); padding-top:26px; }
  .wordmark { font-size:26px; font-weight:700; letter-spacing:-0.02em; }
  .wordmark b { color:${RED}; font-weight:700; }
  .meta { font-size:19px; color:rgba(255,255,255,0.55); font-weight:500; }
</style></head>
<body>
  <div class="wash"></div>
  <div class="grid"></div>
  <div class="ghost">${card.ghost}</div>
  <div class="frame">
    <div class="kicker">${card.kicker}</div>
    <div class="title">${renderTitle(card.title)}</div>
    <div class="foot">
      <div class="wordmark">beta<b>.</b>ads</div>
      <div class="meta">${card.meta}</div>
    </div>
  </div>
</body></html>`;
}

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1600, height: 900 },
    deviceScaleFactor: 2,
  });
  let done = 0;
  for (const card of cards) {
    const pg = await context.newPage();
    await pg.setContent(page(card), { waitUntil: "networkidle" });
    await pg.waitForTimeout(600); // let webfonts settle
    const outPath = path.join(outDir, `blog-${card.slug}-hero.png`);
    await pg.screenshot({ path: outPath, type: "png" });
    await pg.close();
    done++;
    console.log(`[${done}/${cards.length}] ${outPath}`);
  }
  await browser.close();
  console.log(`\nDone: ${done} hero images generated.`);
}

run().catch((e) => { console.error(e); process.exit(1); });
