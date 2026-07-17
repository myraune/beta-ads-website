import { chromium } from "playwright";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "lovable-uploads");
const RED = "#e94f37";
const cards = [
  { slug: "budget-nordic-twitch-campaign-2026", kicker: "Media planning",
    title: ["What a Nordic Twitch", "campaign really {costs}"], ghost: "kr", meta: "Budgeting without a rate card" },
  { slug: "pre-roll-vs-native-overlay-livestream-ads-2026", kicker: "Ad formats",
    title: ["Skippable, blockable,", "or actually {seen}?"], ghost: "VS", meta: "Pre-roll vs native overlay" },
  { slug: "nordic-livestream-advertising-landscape-2026", kicker: "Field guide 2026",
    title: ["The Nordic livestream", "ad {landscape}"], ghost: "2026", meta: "A field guide for brands" },
];
const rT = (l) => l.map((x) => `<span class="tline">${x.replace(/\{([^}]+)\}/g, '<span class="accent">$1</span>')}</span>`).join("");
const page = (c) => `<!doctype html><html><head><meta charset="utf-8">
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
  .accent{font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-weight:400;color:${RED}}
  .foot{margin-top:56px;display:flex;align-items:flex-end;justify-content:space-between;border-top:1px solid rgba(255,255,255,0.14);padding-top:26px}
  .wordmark{font-size:26px;font-weight:700;letter-spacing:-0.02em}.wordmark b{color:${RED};font-weight:700}
  .meta{font-size:19px;color:rgba(255,255,255,0.55);font-weight:500}
</style></head><body>
  <div class="wash"></div><div class="grid"></div><div class="ghost">${c.ghost}</div>
  <div class="frame"><div class="kicker">${c.kicker}</div><div class="title">${rT(c.title)}</div>
  <div class="foot"><div class="wordmark">beta<b>.</b>ads</div><div class="meta">${c.meta}</div></div></div>
</body></html>`;
const b = await chromium.launch({ headless: true });
const ctx = await b.newContext({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: 2 });
let n = 0;
for (const c of cards) {
  const pg = await ctx.newPage();
  await pg.setContent(page(c), { waitUntil: "networkidle" });
  await pg.waitForTimeout(550);
  await pg.screenshot({ path: path.join(outDir, `blog-h-${c.slug}.png`), type: "png" });
  await pg.close();
  console.log(`[${++n}/${cards.length}] blog-h-${c.slug}.png`);
}
await b.close();
console.log("done");
