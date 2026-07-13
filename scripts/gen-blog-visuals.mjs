// Generate branded in-article visuals for blog posts — same dark/editorial house
// style as the hero images. Three structural visual types that carry NO fabrication
// risk: concept "framework" cards, numbered "steps" bands, and "compare" bars drawn
// from each article's own content (any numbers are the article's stated guidance,
// labelled as such). Output: public/lovable-uploads/blog-viz-<slug>-<n>.png (2400 wide).
import { chromium } from "playwright";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "lovable-uploads");
const RED = "#e94f37";

// ---- specs: 2 visuals per new post ---------------------------------------
export const specs = [
  // 0. B2B brands
  { slug: "b2b-brands-live-streaming-advertising-2026", n: 1, type: "framework",
    kicker: "Why B2B belongs here", title: "Your buyers are people before they are job titles",
    cards: [
      { label: "The audience", h: "Buyers off the clock", b: "The 25-40 decision-makers you chase watch streams in their own time." },
      { label: "The attention", h: "Lean-in, 90+ min", b: "Sustained sessions, nothing like a skippable pre-roll they tune out." },
      { label: "The gap", h: "Everyone else is on LinkedIn", b: "B2B budgets crowd the same feeds; live streaming stays uncontested." },
    ] },
  { slug: "b2b-brands-live-streaming-advertising-2026", n: 2, type: "steps",
    kicker: "The B2B playbook", title: "How a B2B brand shows up without feeling out of place",
    items: [
      { t: "Pick the niche", d: "Dev, finance, hardware, SaaS — match the creator to the buyer." },
      { t: "Sponsor the workflow", d: "Show the product doing the job the audience already cares about." },
      { t: "Give a reason to click", d: "A trial, a tool, a template — not just a demo-request form." },
      { t: "Measure pipeline", d: "Track assisted conversions across the cycle, not raw clicks." },
    ] },

  // 1. incremental sales lift
  { slug: "incremental-sales-lift-twitch-sponsorship-measurement-2026", n: 1, type: "steps",
    kicker: "The measurement loop", title: "Four steps to a lift number you can defend",
    items: [
      { t: "Set the holdout", d: "Carve out matched control regions that see no campaign." },
      { t: "Run the flight", d: "Ship the same creative to test regions only." },
      { t: "Compare test vs control", d: "The gap is the lift, not the raw impressions." },
      { t: "Attribute the delta", d: "Tie the movement back to spend for a real ROAS." },
    ] },
  { slug: "incremental-sales-lift-twitch-sponsorship-measurement-2026", n: 2, type: "framework",
    kicker: "Triangulate the signal", title: "Three ways to read the same campaign",
    cards: [
      { label: "Geo holdout", h: "Did sales move?", b: "Test vs control regions isolate real incremental sales." },
      { label: "Brand-lift survey", h: "Did intent move?", b: "Aided awareness and consideration against a control cell." },
      { label: "Promo-code redemption", h: "Who acted now?", b: "A floor on direct response, never the whole picture." },
    ] },

  // 2. creator brief
  { slug: "creator-brief-authentic-integration-templates-2026", n: 1, type: "framework",
    kicker: "Anatomy of a brief", title: "Three layers of a brief that survives the read",
    cards: [
      { label: "Non-negotiables", h: "The three things", b: "Product name, one claim, one link. Nothing more that must be said." },
      { label: "The freedom zone", h: "Their words", b: "The creator frames it in their own voice, on their own beat." },
      { label: "Guardrails", h: "The hard nos", b: "Claims to avoid, competitors, tone. Short, specific, checkable." },
    ] },
  { slug: "creator-brief-authentic-integration-templates-2026", n: 2, type: "compare",
    kicker: "What the audience feels", title: "The scripted read loses the room",
    note: "Directional: relative audience tolerance, not measured percentages.",
    bars: [
      { label: "Creator frames it in their words", v: 92 },
      { label: "Brand supplies talking points", v: 64 },
      { label: "Word-for-word script read aloud", v: 21 },
    ] },

  // 3. FAST channels
  { slug: "nordic-fast-channels-brand-advertising-2026", n: 1, type: "framework",
    kicker: "Where FAST sits", title: "Three streaming layers, three jobs",
    cards: [
      { label: "Linear / broadcast TV", h: "Mass reach", b: "Broad, ageing audience, hard to target, premium CPMs." },
      { label: "FAST channels", h: "The missing middle", b: "Free ad-supported streaming TV: addressable, lean-back, undervalued." },
      { label: "Live streaming (Twitch/Kick)", h: "Lean-in attention", b: "Young, engaged, native formats, deep session length." },
    ] },
  { slug: "nordic-fast-channels-brand-advertising-2026", n: 2, type: "steps",
    kicker: "Adding FAST to the plan", title: "How a Nordic FAST test slots in",
    items: [
      { t: "Pick the market", d: "NO, SE, DK or FI — inventory and language differ by country." },
      { t: "Match the daypart", d: "Lean-back evening viewing complements lean-in live streams." },
      { t: "Reuse the creative", d: "Non-skippable in-stream spots repurpose existing video." },
      { t: "Measure incrementally", d: "Treat FAST as added reach on top of live, not a swap." },
    ] },

  // 4. Nordic streaming calendar
  { slug: "nordic-streaming-media-planning-calendar-2026", n: 1, type: "compare",
    kicker: "The planning year", title: "Premium vs value windows across 2026",
    note: "Directional planning guidance: relative demand, not viewership figures.",
    bars: [
      { label: "Q4 — holidays, product launches", v: 96 },
      { label: "Q1 — new-year attention, esports majors", v: 78 },
      { label: "Q3 — back-to-school ramp", v: 62 },
      { label: "Q2 — summer lull, lowest inventory pressure", v: 44 },
    ] },
  { slug: "nordic-streaming-media-planning-calendar-2026", n: 2, type: "framework",
    kicker: "Plan by market", title: "Four Nordic markets, one calendar",
    cards: [
      { label: "Norway", h: "NO", b: "Highest CPMs, strong Just Chatting and FIFA/EA FC culture." },
      { label: "Sweden", h: "SE", b: "Largest creator base, deep CS2 and variety scenes." },
      { label: "Denmark & Finland", h: "DK · FI", b: "Smaller but loyal; Finnish audiences skew hardcore gaming." },
    ] },

  // 5. clip usage rights
  { slug: "streamer-clip-usage-rights-paid-media-2026", n: 1, type: "framework",
    kicker: "Three rights to lock", title: "Negotiate these before the clip exists",
    cards: [
      { label: "Usage rights", h: "Can you keep it?", b: "Where and how long the brand may reuse the clip." },
      { label: "Whitelisting", h: "Run it as an ad", b: "Permission to run paid media from the creator's handle." },
      { label: "Paid amplification", h: "Budget behind it", b: "The media dollars most brands leave on the table." },
    ] },
  { slug: "streamer-clip-usage-rights-paid-media-2026", n: 2, type: "steps",
    kicker: "Who owns the clip", title: "The rights chain, start to finish",
    items: [
      { t: "Creator makes it", d: "The moment happens live and belongs to the creator first." },
      { t: "Platform licenses it", d: "Twitch/Kick terms govern hosting and export." },
      { t: "Brand negotiates use", d: "Usage + whitelisting rights are agreed in the deal, not after." },
      { t: "Paid media scales it", d: "With rights in hand, the clip becomes ad inventory." },
    ] },

  // 6. frequency capping
  { slug: "streaming-ad-frequency-capping-wearout-2026", n: 1, type: "compare",
    kicker: "Operating guidance", title: "Weekly exposure caps we run by",
    note: "Beta Ads operating thresholds from Nordic overlay and native placements, not an external benchmark.",
    bars: [
      { label: "Twitch overlays (loyal, repeat core)", v: 5, suffix: "/wk" },
      { label: "Kick (looser tolerance)", v: 7, suffix: "/wk" },
      { label: "Point where CTR decay sets in", v: 8, suffix: "/wk" },
    ], scaleMax: 10 },
  { slug: "streaming-ad-frequency-capping-wearout-2026", n: 2, type: "steps",
    kicker: "Beat the wearout", title: "Set the schedule before the flight launches",
    items: [
      { t: "Define the ceiling", d: "Exposure cap per viewer per week, per streamer tier." },
      { t: "Pre-produce 3+ creatives", d: "Rotation ready before the first overlay goes live." },
      { t: "Trigger a refresh", d: "Calendar reminder around day 10 to swap the creative." },
      { t: "Watch the decay", d: "Pull a creative once CTR drops ~25% off its week-one base." },
    ] },

  // 7. community events
  { slug: "twitch-community-events-brand-activation-2026", n: 1, type: "framework",
    kicker: "Event playbook", title: "Three community moments, three roles for a brand",
    cards: [
      { label: "Subathons", h: "Sustained spotlight", b: "Multi-day marathons where peak concurrents can climb well past baseline." },
      { label: "Charity streams", h: "Halo & goodwill", b: "Brand matching and milestones tie the name to a cause the community owns." },
      { label: "Squad cups", h: "Competitive energy", b: "Creator tournaments give a product a native reason to be on screen." },
    ] },
  { slug: "twitch-community-events-brand-activation-2026", n: 2, type: "steps",
    kicker: "Activate an event", title: "From sponsor logo to genuine moment",
    items: [
      { t: "Pick the moment", d: "Match the event type to the campaign goal, not the calendar." },
      { t: "Give the community a role", d: "Milestones, matching, or a reward the audience unlocks." },
      { t: "Go native", d: "The brand shows up inside the format, not bolted over it." },
      { t: "Capture the clips", d: "Peak moments become owned paid-media assets afterwards." },
    ] },
];

// ---- rendering ------------------------------------------------------------
function frameCard(c) {
  return `<div class="card">
    <div class="cardlabel">${c.label}</div>
    <div class="cardh">${c.h}</div>
    <div class="cardb">${c.b}</div>
  </div>`;
}
function stepItem(s, i, n) {
  return `<div class="step">
    <div class="stepnum">${String(i + 1).padStart(2, "0")}${i < n - 1 ? '<span class="steparrow">→</span>' : ""}</div>
    <div class="steph">${s.t}</div>
    <div class="stepb">${s.d}</div>
  </div>`;
}
function bar(b, scaleMax) {
  const pct = Math.round((b.v / scaleMax) * 100);
  const val = b.suffix ? `${b.v}${b.suffix}` : "";
  return `<div class="barrow">
    <div class="barlabel">${b.label}</div>
    <div class="bartrack"><div class="barfill" style="width:${pct}%"></div><span class="barval">${val}</span></div>
  </div>`;
}

function body(spec) {
  if (spec.type === "framework") {
    return `<div class="cards cards-${spec.cards.length}">${spec.cards.map(frameCard).join("")}</div>`;
  }
  if (spec.type === "steps") {
    const n = spec.items.length;
    return `<div class="steps steps-${n}">${spec.items.map((s, i) => stepItem(s, i, n)).join("")}</div>`;
  }
  if (spec.type === "compare") {
    const scaleMax = spec.scaleMax || Math.max(...spec.bars.map((b) => b.v));
    return `<div class="bars">${spec.bars.map((b) => bar(b, scaleMax)).join("")}</div>
      ${spec.note ? `<div class="note">${spec.note}</div>` : ""}`;
  }
  return "";
}

function pageHtml(spec) {
  return `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Instrument+Serif:ital@1&display=swap" rel="stylesheet">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  html,body { width:2400px; }
  body { background:#0a0a0b; color:#fff; font-family:'Inter',system-ui,sans-serif; position:relative; overflow:hidden; }
  .grid { position:absolute; inset:0; opacity:0.04; background-image:linear-gradient(#fff 1px,transparent 1px); background-size:100% 120px; }
  .wash { position:absolute; inset:0; background:radial-gradient(1600px 900px at 6% -20%, rgba(233,79,55,0.10), transparent 60%); }
  .frame { position:relative; padding:130px 150px; }
  .kicker { display:flex; align-items:center; gap:26px; font-size:30px; font-weight:600; letter-spacing:0.22em; text-transform:uppercase; color:${RED}; margin-bottom:34px; }
  .kicker::before { content:""; width:80px; height:4px; background:${RED}; }
  .title { font-size:82px; font-weight:600; letter-spacing:-0.03em; line-height:1.04; max-width:1900px; margin-bottom:86px; }
  /* framework cards */
  .cards { display:grid; gap:40px; }
  .cards-3 { grid-template-columns:repeat(3,1fr); }
  .cards-2 { grid-template-columns:repeat(2,1fr); }
  .card { background:#131316; border:1px solid rgba(255,255,255,0.10); border-radius:28px; padding:56px 52px; }
  .cardlabel { font-size:26px; font-weight:600; letter-spacing:0.14em; text-transform:uppercase; color:${RED}; margin-bottom:30px; }
  .cardh { font-size:46px; font-weight:600; letter-spacing:-0.02em; margin-bottom:22px; }
  .cardb { font-size:30px; line-height:1.5; color:rgba(255,255,255,0.62); font-weight:400; }
  /* steps */
  .steps { display:grid; gap:56px; }
  .steps-4 { grid-template-columns:repeat(4,1fr); }
  .steps-3 { grid-template-columns:repeat(3,1fr); }
  .step { position:relative; }
  .stepnum { font-size:92px; font-weight:800; letter-spacing:-0.04em; color:rgba(233,79,55,0.22); line-height:1; margin-bottom:26px; position:relative; }
  .steparrow { position:absolute; right:-38px; top:14px; font-size:44px; color:rgba(255,255,255,0.18); font-weight:400; }
  .steph { font-size:40px; font-weight:600; letter-spacing:-0.02em; margin-bottom:18px; }
  .stepb { font-size:28px; line-height:1.5; color:rgba(255,255,255,0.60); }
  /* bars */
  .bars { display:flex; flex-direction:column; gap:44px; max-width:2000px; }
  .barrow { display:flex; flex-direction:column; gap:18px; }
  .barlabel { font-size:34px; font-weight:500; color:rgba(255,255,255,0.86); }
  .bartrack { position:relative; height:56px; background:#17171b; border-radius:14px; overflow:hidden; display:flex; align-items:center; }
  .barfill { height:100%; background:${RED}; border-radius:14px; }
  .barval { position:absolute; right:26px; font-size:30px; font-weight:700; color:#fff; }
  .note { margin-top:52px; font-size:26px; color:rgba(255,255,255,0.45); font-style:italic; max-width:1900px; }
  .foot { margin-top:96px; display:flex; align-items:center; justify-content:space-between; border-top:1px solid rgba(255,255,255,0.12); padding-top:40px; }
  .wordmark { font-size:34px; font-weight:700; letter-spacing:-0.02em; }
  .wordmark b { color:${RED}; }
  .footmeta { font-size:26px; color:rgba(255,255,255,0.4); }
</style></head>
<body>
  <div class="wash"></div><div class="grid"></div>
  <div class="frame">
    <div class="kicker">${spec.kicker}</div>
    <div class="title">${spec.title}</div>
    ${body(spec)}
    <div class="foot"><div class="wordmark">beta<b>.</b>ads</div><div class="footmeta">Nordic livestream advertising</div></div>
  </div>
</body></html>`;
}

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 2400, height: 1700 }, deviceScaleFactor: 1 });
  let done = 0;
  for (const spec of specs) {
    const pg = await context.newPage();
    await pg.setContent(pageHtml(spec), { waitUntil: "networkidle" });
    await pg.waitForTimeout(500);
    // crop tight to the footer's bottom edge + matching bottom breathing room
    const h = await pg.evaluate(() => Math.ceil(document.querySelector(".foot").getBoundingClientRect().bottom + 110));
    const outPath = path.join(outDir, `blog-viz-${spec.slug}-${spec.n}.png`);
    await pg.screenshot({ path: outPath, type: "png", clip: { x: 0, y: 0, width: 2400, height: h } });
    await pg.close();
    done++;
    console.log(`[${done}/${specs.length}] ${path.basename(outPath)} (${h}px)`);
  }
  await browser.close();
  console.log(`\nDone: ${done} visuals.`);
}

run().catch((e) => { console.error(e); process.exit(1); });
