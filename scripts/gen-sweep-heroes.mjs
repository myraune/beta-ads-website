// Branded editorial heroes for the 13 remaining posts still on the old screenshot
// pipeline. Same dark/signal-red typographic system. Localized guides get native copy.
// 1600x900. Output: public/lovable-uploads/blog-h-<slug>.png
import { chromium } from "playwright";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "lovable-uploads");
const RED = "#e94f37";

export const cards = [
  { slug: "twitch-sponsored-campaigns-open-to-affiliates-2026", kicker: "Platform update",
    title: ["Twitch opens ads", "to {every} affiliate"], ghost: "TWITCH", meta: "What the Minecraft Tiny Takeover means" },
  { slug: "paid-amplification-creator-content-beyond-social-2026", kicker: "Paid media",
    title: ["Creator content is", "{escaping} social"], ghost: "$11B", meta: "The paid amplification shift, explained" },
  { slug: "twitch-statistics-2025-global-insights", kicker: "The 2025 numbers",
    title: ["19.2 billion hours", "of {Twitch}"], ghost: "2025", meta: "Market share, trends & audience" },
  { slug: "norwegian-twitch-streamers-2025-analytics", kicker: "Nordic creators",
    title: ["The Norwegians who", "{move} 18-34"], ghost: "NO", meta: "Top Norwegian Twitch streamers 2025" },
  { slug: "twitch-vs-youtube-gaming-2025", kicker: "Platform comparison",
    title: ["Twitch, YouTube, Kick,", "the {honest} read"], ghost: "2026", meta: "Where each platform actually stands" },
  { slug: "swedish-twitch-streamers-2025", kicker: "Nordic creators",
    title: ["The Swedes who hold", "18-34 {attention}"], ghost: "SE", meta: "Top Swedish Twitch streamers 2025" },
  { slug: "finnish-twitch-streamers-2025", kicker: "Nordic creators",
    title: ["Finland's {esports}", "streaming market"], ghost: "FI", meta: "The market advertisers miss" },
  { slug: "kick-streaming-growth-2025", kicker: "Platform watch",
    title: ["Kick grew {131%}", "in a single year"], ghost: "KICK", meta: "What Nordic advertisers need for 2026" },
  { slug: "creator-marketing-lifecycle-broken-how-to-fix-2026", kicker: "Creator strategy",
    title: ["The creator lifecycle", "is {broken}"], ghost: "FIX", meta: "And how smart brands are fixing it" },
  // localized market guides — native copy
  { slug: "twitch-annonsering-norge-guide", kicker: "Komplett guide",
    title: ["Twitch-annonsering", "i {Norge}"], ghost: "NORGE", meta: "Alt om Twitch-reklame i 2026" },
  { slug: "twitch-reklam-sverige-guide", kicker: "Komplett guide",
    title: ["Twitch-reklam", "i {Sverige}"], ghost: "SVERIGE", meta: "Allt om Twitch-annonsering 2026" },
  { slug: "twitch-mainonta-suomi-opas", kicker: "Täydellinen opas",
    title: ["Twitch-mainonta", "{Suomessa}"], ghost: "SUOMI", meta: "Kaikki Twitch-mainonnasta 2026" },
  { slug: "norske-twitch-streamere-2026", kicker: "Nordiske skapere",
    title: ["Norske Twitch-", "streamere å {kjenne}"], ghost: "NORGE", meta: "Skaperne du bør følge i 2026" },
];

const rT = (lines) => lines.map((l) => `<span class="tline">${l.replace(/\{([^}]+)\}/g, '<span class="accent">$1</span>')}</span>`).join("");
function page(c) {
  return `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Instrument+Serif:ital@1&display=swap" rel="stylesheet">
<style>
  *{margin:0;padding:0;box-sizing:border-box}html,body{width:1600px;height:900px}
  body{background:#0a0a0b;font-family:'Inter',system-ui,sans-serif;color:#fff;overflow:hidden;position:relative}
  .wash{position:absolute;inset:0;background:radial-gradient(1200px 700px at 8% -10%,rgba(233,79,55,0.10),transparent 60%)}
  .grid{position:absolute;inset:0;opacity:0.04;background-image:linear-gradient(#fff 1px,transparent 1px);background-size:100% 88px}
  .ghost{position:absolute;right:-40px;bottom:-140px;font-weight:800;font-size:520px;letter-spacing:-0.04em;color:#fff;opacity:0.035;line-height:0.8;white-space:nowrap}
  .frame{position:absolute;inset:0;padding:110px 120px;display:flex;flex-direction:column}
  .kicker{display:flex;align-items:center;gap:18px;font-size:22px;font-weight:600;letter-spacing:0.22em;text-transform:uppercase;color:${RED}}
  .kicker::before{content:"";width:56px;height:3px;background:${RED};display:block}
  .title{margin-top:auto;display:flex;flex-direction:column;gap:6px}
  .tline{font-size:94px;font-weight:600;letter-spacing:-0.03em;line-height:1.03}
  .accent{font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-weight:400;color:${RED};letter-spacing:0}
  .foot{margin-top:56px;display:flex;align-items:flex-end;justify-content:space-between;border-top:1px solid rgba(255,255,255,0.14);padding-top:26px}
  .wordmark{font-size:26px;font-weight:700;letter-spacing:-0.02em}.wordmark b{color:${RED};font-weight:700}
  .meta{font-size:19px;color:rgba(255,255,255,0.55);font-weight:500}
</style></head><body>
  <div class="wash"></div><div class="grid"></div><div class="ghost">${c.ghost}</div>
  <div class="frame"><div class="kicker">${c.kicker}</div><div class="title">${rT(c.title)}</div>
  <div class="foot"><div class="wordmark">beta<b>.</b>ads</div><div class="meta">${c.meta}</div></div></div>
</body></html>`;
}
async function run() {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: 2 });
  let n = 0;
  for (const c of cards) {
    const pg = await ctx.newPage();
    await pg.setContent(page(c), { waitUntil: "networkidle" });
    await pg.waitForTimeout(550);
    await pg.screenshot({ path: path.join(outDir, `blog-h-${c.slug}.png`), type: "png" });
    await pg.close();
    console.log(`[${++n}/${cards.length}] blog-h-${c.slug}.png`);
  }
  await browser.close(); console.log("done");
}
run().catch((e) => { console.error(e); process.exit(1); });
