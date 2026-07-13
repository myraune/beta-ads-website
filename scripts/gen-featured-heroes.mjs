// Branded editorial hero images for the 4 homepage-featured posts (replacing weak
// external-site screenshots). Same dark/signal-red typographic system as the heroes
// for the 8 B2B posts. 1600x900 (16:9). Output: public/lovable-uploads/blog-featured-*.png
import { chromium } from "playwright";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "lovable-uploads");
const RED = "#e94f37";

const cards = [
  { file: "blog-featured-dentsu.png",
    kicker: "Gaming trends 2025", title: ["What Dentsu's report", "means for the {Nordics}"],
    ghost: "2025", meta: "The 2025 Gaming Trends Report, decoded" },
  { file: "blog-featured-kick-100m.png",
    kicker: "Platform watch", title: ["100 million users,", "one {vanity} metric"],
    ghost: "KICK", meta: "What Nordic advertisers should take from it" },
  { file: "blog-featured-twitch-overhaul.png",
    kicker: "Platform update", title: ["Twitch {rewrote}", "the rules again"],
    ghost: "TWITCH", meta: "Data-sharing + vertical streaming" },
  { file: "blog-featured-brief.png",
    kicker: "Creator ops", title: ["How to {brief}", "a streamer, properly"],
    ghost: "BRIEF", meta: "The complete native-integration guide" },
];

function renderTitle(lines) {
  return lines
    .map((l) => `<span class="tline">${l.replace(/\{([^}]+)\}/g, '<span class="accent">$1</span>')}</span>`)
    .join("");
}

function page(card) {
  return `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Instrument+Serif:ital@1&display=swap" rel="stylesheet">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  html,body { width:1600px; height:900px; }
  body { background:#0a0a0b; font-family:'Inter',system-ui,sans-serif; color:#fff; overflow:hidden; position:relative; }
  .wash { position:absolute; inset:0; background: radial-gradient(1200px 700px at 8% -10%, rgba(233,79,55,0.10), transparent 60%); }
  .grid { position:absolute; inset:0; opacity:0.04; background-image:linear-gradient(#fff 1px, transparent 1px); background-size:100% 88px; }
  .ghost { position:absolute; right:-40px; bottom:-140px; font-weight:800; font-size:520px; letter-spacing:-0.04em; color:#fff; opacity:0.035; line-height:0.8; white-space:nowrap; }
  .frame { position:absolute; inset:0; padding:110px 120px; display:flex; flex-direction:column; }
  .kicker { display:flex; align-items:center; gap:18px; font-size:22px; font-weight:600; letter-spacing:0.22em; text-transform:uppercase; color:${RED}; }
  .kicker::before { content:""; width:56px; height:3px; background:${RED}; display:block; }
  .title { margin-top:auto; display:flex; flex-direction:column; gap:6px; }
  .tline { font-size:98px; font-weight:600; letter-spacing:-0.03em; line-height:1.02; }
  .accent { font-family:'Instrument Serif', Georgia, serif; font-style:italic; font-weight:400; color:${RED}; letter-spacing:0; }
  .foot { margin-top:56px; display:flex; align-items:flex-end; justify-content:space-between; border-top:1px solid rgba(255,255,255,0.14); padding-top:26px; }
  .wordmark { font-size:26px; font-weight:700; letter-spacing:-0.02em; }
  .wordmark b { color:${RED}; font-weight:700; }
  .meta { font-size:19px; color:rgba(255,255,255,0.55); font-weight:500; }
</style></head>
<body>
  <div class="wash"></div><div class="grid"></div>
  <div class="ghost">${card.ghost}</div>
  <div class="frame">
    <div class="kicker">${card.kicker}</div>
    <div class="title">${renderTitle(card.title)}</div>
    <div class="foot"><div class="wordmark">beta<b>.</b>ads</div><div class="meta">${card.meta}</div></div>
  </div>
</body></html>`;
}

async function run() {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: 2 });
  let done = 0;
  for (const card of cards) {
    const pg = await ctx.newPage();
    await pg.setContent(page(card), { waitUntil: "networkidle" });
    await pg.waitForTimeout(600);
    await pg.screenshot({ path: path.join(outDir, card.file), type: "png" });
    await pg.close();
    console.log(`[${++done}/${cards.length}] ${card.file}`);
  }
  await browser.close();
  console.log("done");
}
run().catch((e) => { console.error(e); process.exit(1); });
