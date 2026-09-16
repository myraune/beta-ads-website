/**
 * Renders the five Kick advertising OG images (1200x630) from one HTML
 * template. Run: node scripts/og/kick-og.mjs
 * Copy comes from src/data/kickAds.ts (hero accent + rest + first stat).
 */
import puppeteer from "puppeteer";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const pub = path.join(root, "public");

const COPY = {
  en: { accent: "One in five", rest: "live hours in Northern Europe is on Kick.", stat: "20.0%", statLabel: "Kick's share of Kick + Twitch hours, Northern Europe, Q2 2026", kicker: "Kick advertising in the Nordics" },
  no: { accent: "Hver femte", rest: "live-time i Nord-Europa ses på Kick.", stat: "20,0 %", statLabel: "Kicks andel av Kick + Twitch-timer, Nord-Europa, Q2 2026", kicker: "Kick-annonsering i Norge og Norden" },
  sv: { accent: "Var femte", rest: "live-timme i Nordeuropa ses på Kick.", stat: "20,0 %", statLabel: "Kicks andel av Kick + Twitch-timmar, Nordeuropa, Q2 2026", kicker: "Kick-annonsering i Sverige och Norden" },
  da: { accent: "Hver femte", rest: "live-time i Nordeuropa ses på Kick.", stat: "20,0 %", statLabel: "Kicks andel af Kick + Twitch-timer, Nordeuropa, Q2 2026", kicker: "Kick-annoncering i Danmark og Norden" },
  fi: { accent: "Joka viides", rest: "live-tunti Pohjois-Euroopassa katsotaan Kickissä.", stat: "20,0 %", statLabel: "Kickin osuus Kick + Twitch -tunneista, Pohjois-Eurooppa, Q2 2026", kicker: "Kick-mainonta Suomessa ja Pohjoismaissa" },
};

const b64 = (p) => `data:image/${p.endsWith(".png") ? "png" : "jpeg"};base64,${readFileSync(path.join(pub, p)).toString("base64")}`;
const mascot = b64("lovable-uploads/beta-mascot-kick.jpg");
const mark = b64("lovable-uploads/favicon.png");

const html = (c) => `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Instrument+Serif:ital@1&display=swap" rel="stylesheet">
<style>
  html,body{margin:0;width:1200px;height:630px;background:#0b0b10;font-family:Inter,system-ui,sans-serif;color:#fff;overflow:hidden}
  .wrap{position:relative;width:1200px;height:630px}
  .photo{position:absolute;right:0;top:0;width:640px;height:630px;object-fit:cover;object-position:60% 50%}
  .fade{position:absolute;inset:0;background:linear-gradient(90deg,#0b0b10 0%,#0b0b10 44%,rgba(11,11,16,.85) 56%,rgba(11,11,16,0) 80%)}
  .bottom{position:absolute;inset:0;background:linear-gradient(0deg,rgba(11,11,16,.9) 0%,rgba(11,11,16,0) 35%)}
  .copy{position:absolute;left:72px;top:72px;width:720px}
  .brand{display:flex;align-items:center;gap:12px;font-size:20px;font-weight:600;letter-spacing:-.01em;color:rgba(255,255,255,.85)}
  .brand img{height:28px;width:auto}
  .kicker{margin-top:56px;font-size:15px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:#e94f37}
  h1{margin:18px 0 0;font-size:56px;line-height:1.05;letter-spacing:-.025em;font-weight:700;width:760px}
  h1 em{font-family:'Instrument Serif',serif;font-style:italic;font-weight:400}
  .stat{position:absolute;left:72px;bottom:56px;display:flex;align-items:baseline;gap:20px}
  .stat b{font-size:64px;letter-spacing:-.03em;color:#53FC18;font-variant-numeric:tabular-nums}
  .stat span{font-size:17px;line-height:1.35;color:rgba(255,255,255,.6);max-width:420px}
</style></head><body><div class="wrap">
  <img class="photo" src="${mascot}">
  <div class="fade"></div><div class="bottom"></div>
  <div class="copy">
    <div class="brand"><img src="${mark}">Beta Ads</div>
    <div class="kicker">${c.kicker}</div>
    <h1><em>${c.accent}</em><br>${c.rest}</h1>
  </div>
  <div class="stat"><b>${c.stat}</b><span>${c.statLabel}</span></div>
</div></body></html>`;

const browser = await puppeteer.launch({ headless: true });
for (const [lang, c] of Object.entries(COPY)) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
  await page.setContent(html(c), { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await new Promise((r) => setTimeout(r, 400));
  const out = path.join(pub, `lovable-uploads/og/kick-advertising-${lang}.png`);
  await page.screenshot({ path: out, type: "png" });
  console.log("wrote", path.relative(root, out));
  await page.close();
}
await browser.close();
