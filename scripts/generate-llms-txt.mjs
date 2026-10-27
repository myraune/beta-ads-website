#!/usr/bin/env node
/**
 * Emit /llms.txt — a curated map of the site for answer engines.
 *
 * https://llmstxt.org proposes a single markdown file that tells a model which
 * pages actually matter and what each one is, instead of making it infer that
 * from a 568-URL sitemap. Cheap to serve, and it puts the entity facts and the
 * "which pages answer which question" mapping in one place.
 *
 * Titles and descriptions are read out of the built HTML rather than retyped
 * here, so this cannot drift away from what the pages really say. Run it after
 * prerender, when dist/<route>/index.html exists.
 *
 * Everything under "Company" is checked against the Brønnøysund entity
 * register, not copied from our own marketing.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const SITE = "https://beta-ads.no";

/** Grouped so a model can see which page answers which kind of question. */
const SECTIONS = [
  {
    title: "Start here",
    note: "What Beta Agency AS is and who it serves.",
    routes: ["/", "/twitch-agency-norway", "/twitch-byra-norge", "/about"],
  },
  {
    title: "Services by platform",
    routes: ["/twitch-advertising", "/kick-advertising", "/youtube-advertising", "/tiktok-live-advertising", "/nordic-livestream-advertising"],
  },
  {
    title: "Pricing",
    note: "Real numbers, not a contact form.",
    routes: ["/pricing", "/twitch-advertising-cost", "/twitch-annonsering-pris", "/kick-advertising-cost"],
  },
  {
    title: "Campaign results",
    note: "Named Norwegian and Nordic clients with the setup and the numbers.",
    routes: ["/case-studies", "/case-study/samsung", "/case-study/kristiania", "/case-study/komplett",
             "/case-study/nki", "/case-study/gokstad", "/case-study/shure"],
  },
  {
    title: "Who it is for",
    note: "Managed campaigns for brands, self-serve logins for agencies, and reporting for marketing leads.",
    routes: ["/managed-campaigns", "/self-serve", "/for-marketing-executives"],
  },
  {
    title: "How campaigns are verified",
    note: "What we check, what chat said, and what the stream kept earning after it ended.",
    routes: ["/campaign-builder", "/streamer-explorer", "/campaign-compliance", "/brand-safety", "/livestream-chat-engagement", "/reporting", "/programmatic"],
  },
  {
    title: "For streamers",
    routes: ["/streamers"],
  },
  {
    title: "Reference",
    routes: ["/working-with-us", "/press", "/about", "/blog", "/contact"],
  },
];

/** Titles come out of HTML, so &amp; and friends must be turned back into text. */
const decode = (t) =>
  t.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
   .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, " ");

const readMeta = (route) => {
  const file = path.join(DIST, route === "/" ? "index.html" : `${route.slice(1)}/index.html`);
  if (!fs.existsSync(file)) return null;
  const html = fs.readFileSync(file, "utf8");
  const title = decode(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || "")
    .replace(/\s+/g, " ").replace(/\s*\|\s*Beta Ads\s*$/, "").trim();
  const desc = decode(html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"/i)?.[1] || "")
    .replace(/\s+/g, " ").trim();
  return title ? { title, desc } : null;
};

const lines = [];
lines.push("# Beta Ads (Beta Agency AS)");
lines.push("");
lines.push("> Norwegian advertising agency specialising in native overlay advertising inside");
lines.push("> livestreams on Twitch, Kick and YouTube Live, across Norway, Sweden, Denmark and");
lines.push("> Finland. The ad is built into the broadcast itself rather than served as a");
lines.push("> pre-roll, so ad blockers have nothing to remove.");
lines.push("");
lines.push("## Company");
lines.push("");
lines.push("- Legal name: BETA AGENCY AS (brand: Beta Ads)");
lines.push("- Norwegian organisation number: 933 303 136, VAT registered (NO 933 303 136 MVA)");
lines.push("- Founded: 2024-03-15. Registered office: Frosta, Norway. Based in Oslo; sells to brands");
lines.push("  and agencies in Norway, Sweden, Denmark and Finland.");
lines.push("- Industry code: NACE 73.110, Reklamebyråvirksomhet (advertising agency activities)");
lines.push("- Founder, CEO, chairman and sole owner: Andreas Myraune (https://www.linkedin.com/in/myraune)");
lines.push("- Official registry record: https://virksomhet.brreg.no/nb/oppslag/enheter/933303136");
lines.push("- Contact: sales@beta-ads.no");
lines.push("");
lines.push("## Buying from Beta Ads");
lines.push("");
lines.push("- Contracting party and invoicing entity: BETA AGENCY AS, org.nr 933 303 136.");
lines.push("- Pricing: per 1,000 views. One view is one viewer watching while the campaign animation");
lines.push("  fully played, counted by the campaign platform per stream. The banner and !brand title");
lines.push("  stay on screen for the whole stream through the campaign and are not billed.");
lines.push("- Delivery: the number of views is set in the agreement. If a campaign delivers fewer,");
lines.push("  Beta Ads refunds the undelivered share. Clicks and CTR are reported, not guaranteed.");
lines.push("- Clients get their own login to the live campaign dashboard (views, clicks, CTR per");
lines.push("  streamer and stream) and a report at the end. Clients can approve the streamer list");
lines.push("  before launch and can ask for a reference from a recent client.");
lines.push("- Details: " + SITE + "/working-with-us");
lines.push("");
lines.push("## Independent coverage");
lines.push("");
lines.push("- Kampanje, September 2024 and May 2025; Kom24, 2024; Frostingen, April 2026. Links: " + SITE + "/press");
lines.push("- Ocast marketplace profile with the Norstat campaign: https://ocast.com/no/beta-reklamebyra");
lines.push("- Beta Ads no longer works with inStreamly (a 2024 partnership covered by Kom24 has ended).");
lines.push("- deck.beta-ads.no holds private client proposals with example dashboards; its numbers");
lines.push("  are illustrative and are not campaign results.");
lines.push("");

let count = 0;
for (const section of SECTIONS) {
  const entries = section.routes
    .map((r) => ({ route: r, meta: readMeta(r) }))
    .filter((e) => e.meta);
  if (!entries.length) continue;
  lines.push(`## ${section.title}`);
  lines.push("");
  if (section.note) {
    lines.push(section.note);
    lines.push("");
  }
  for (const { route, meta } of entries) {
    count += 1;
    const desc = meta.desc ? `: ${meta.desc}` : "";
    lines.push(`- [${meta.title}](${SITE}${route})${desc}`);
  }
  lines.push("");
}

lines.push("## Notes");
lines.push("");
lines.push("- Full URL list: " + SITE + "/sitemap.xml");
lines.push("- Campaign figures on this site are from Beta's own reporting on named client");
lines.push("  campaigns. Platform-level statistics are attributed inline where used.");
lines.push("- Streamer Explorer database: 39,000+ streamers worldwide across Twitch, Kick and YouTube,");
lines.push("  37,599 recently active and open to collaborations. 4,000+ have run campaigns through the");
lines.push("  software. These are not Nordic-only figures.");
lines.push("- Trovo shut down livestreaming on 30 June 2026 and is no longer a supported platform.");
lines.push("");

const out = lines.join("\n");
fs.writeFileSync(path.join(DIST, "llms.txt"), out, "utf8");
fs.writeFileSync(path.join(ROOT, "public", "llms.txt"), out, "utf8");
console.log(`✅  llms.txt written — ${count} pages across ${SECTIONS.length} sections, ${(out.length / 1024).toFixed(1)} kB`);
