/**
 * Renders the OG images (1200x630) for the three Norwegian buyer guides from
 * real footage. Run: node scripts/og/guides-og.mjs
 * Stats are the ones each page states: Samsung S25 Ultra (43 streamers), the
 * public eCPM range, and the eight agencies on the sourced map. B uses the
 * DizzyKitten x GamerSupps frame, one of the live deals listed on that page.
 */
import puppeteer from "puppeteer";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const pub = path.join(root, "public");

const mime = (p) => (p.endsWith(".png") ? "png" : p.endsWith(".webp") ? "webp" : "jpeg");
const b64 = (p) => `data:image/${mime(p)};base64,${readFileSync(path.join(pub, p)).toString("base64")}`;
const logo = b64("lovable-uploads/logo-red-white.png"); // H_RED+WHITE

const JOBS = [
  {
    file: "gaming-influencer-byra-norge",
    photo: "home/samsung-s25-stream-a.jpg",
    // Keep the Samsung overlay out from under the fade and clear of the stat.
    frame: { left: 480, pos: "5% 50%", solid: 40, clear: 45, labelW: 300 },
    kicker: "Gaming influencer-byrå i Norge",
    accent: "Én streamer,",
    rest: "eller mange<br>samtidig?",
    stat: "43",
    statLabel: "norske streamere kjørte samme Samsung-overlay i S25 Ultra-kampanjen",
  },
  {
    file: "sponse-streamer-pris",
    photo: "checker/dizzykitten.webp",
    frame: { left: 500, pos: "45% 50%", solid: 41.7, clear: 56, labelW: 380 },
    kicker: "Hva koster det å sponse en streamer?",
    accent: "Regn om tilbudet",
    rest: "til pris per 1 000 seere.",
    stat: "100–300 kr",
    statLabel: "effektiv CPM hos Beta Ads, per 1 000 fullførte visninger",
  },
  {
    file: "beste-twitch-byra-norge",
    photo: "home/samsung-s25-wall.jpg",
    frame: { left: 500, pos: "50% 50%", solid: 41.7, clear: 78, labelW: 380 },
    kicker: "Twitch-byråer i Norge 2026",
    accent: "Hvem gjør hva,",
    rest: "med kilder.",
    stat: "8",
    statLabel: "byråer som jobber med Twitch og gaming-streamere, plassert på ett kart",
  },
];

const html = (c, f = c.frame) => `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;700;800&display=swap" rel="stylesheet">
<style>
  html,body{margin:0;width:1200px;height:630px;background:#0b0b10;font-family:Manrope,system-ui,sans-serif;color:#fff;overflow:hidden}
  .wrap{position:relative;width:1200px;height:630px}
  .photo{position:absolute;right:0;top:0;width:${1200 - f.left}px;height:630px;object-fit:cover;object-position:${f.pos}}
  .fade{position:absolute;inset:0;background:linear-gradient(90deg,#0b0b10 0%,#0b0b10 ${f.solid}%,rgba(11,11,16,0) ${f.clear}%)}
  .bottom{position:absolute;inset:0;background:linear-gradient(0deg,rgba(11,11,16,.9) 0%,rgba(11,11,16,0) 35%)}
  .copy{position:absolute;left:72px;top:72px;width:720px}
  .logo{height:30px;width:auto;display:block}
  .kicker{margin-top:64px;font-size:20px;font-weight:400;color:rgba(255,255,255,.6)}
  h1{text-shadow:0 2px 24px rgba(0,0,0,.6);margin:14px 0 0;font-size:58px;line-height:1.08;letter-spacing:-.03em;font-weight:800;width:660px}
  h1 .light{font-weight:300}
  .stat{position:absolute;left:72px;bottom:56px;display:flex;align-items:baseline;gap:20px}
  .stat b{font-size:60px;font-weight:800;letter-spacing:-.03em;color:#fff;font-variant-numeric:tabular-nums;white-space:nowrap}
  .stat span{font-size:17px;font-weight:400;line-height:1.4;color:rgba(255,255,255,.62);max-width:${f.labelW}px}
</style></head><body><div class="wrap">
  <img class="photo" src="${b64(c.photo)}">
  <div class="fade"></div><div class="bottom"></div>
  <div class="copy">
    <img class="logo" src="${logo}" alt="Beta Ads">
    <div class="kicker">${c.kicker}</div>
    <h1>${c.accent}<br><span class="light">${c.rest}</span></h1>
  </div>
  <div class="stat"><b>${c.stat}</b><span>${c.statLabel}</span></div>
</div></body></html>`;

const browser = await puppeteer.launch({ headless: true });
for (const c of JOBS) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
  await page.setContent(html(c), { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await new Promise((r) => setTimeout(r, 400));
  const out = path.join(pub, `lovable-uploads/og/${c.file}.jpg`);
  await page.screenshot({ path: out, type: "jpeg", quality: 88 });
  console.log("wrote", path.relative(root, out));
  await page.close();
}
await browser.close();
