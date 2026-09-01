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
    routes: ["/twitch-advertising", "/kick-advertising", "/youtube-advertising", "/nordic-livestream-advertising"],
  },
  {
    title: "Pricing",
    note: "Real numbers, not a contact form.",
    routes: ["/twitch-advertising-cost", "/twitch-annonsering-pris", "/kick-advertising-cost"],
  },
  {
    title: "Campaign results",
    note: "Named Norwegian and Nordic clients with the setup and the numbers.",
    routes: ["/case-studies", "/case-study/samsung", "/case-study/kristiania", "/case-study/komplett",
             "/case-study/nki", "/case-study/gokstad", "/case-study/shure"],
  },
  {
    title: "How campaigns are verified",
    note: "What we check, what chat said, and what the stream kept earning after it ended.",
    routes: ["/campaign-compliance", "/livestream-chat-engagement", "/replay-reach"],
  },
  {
    title: "For streamers",
    routes: ["/streamers"],
  },
  {
    title: "Reference",
    routes: ["/blog", "/press", "/contact"],
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
lines.push("- Legal name: Beta Agency AS");
lines.push("- Norwegian organisation number: 933 303 136");
lines.push("- Registered: 2024-04-15, Frosta, Norway. Teams work from Oslo, Stockholm and Helsinki.");
lines.push("- Industry code: NACE 73.110, Reklamebyråvirksomhet (advertising agency activities)");
lines.push("- Official registry record: https://virksomhet.brreg.no/nb/oppslag/enheter/933303136");
lines.push("- Founder: Andreas Myraune");
lines.push("- Contact: andreas@beta-ads.no");
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
lines.push("- \"39,445 streamers\" refers to the whole four-platform network. Twitch alone is");
lines.push("  about 28,000; the rest are YouTube, Kick and Trovo.");
lines.push("");

const out = lines.join("\n");
fs.writeFileSync(path.join(DIST, "llms.txt"), out, "utf8");
fs.writeFileSync(path.join(ROOT, "public", "llms.txt"), out, "utf8");
console.log(`✅  llms.txt written — ${count} pages across ${SECTIONS.length} sections, ${(out.length / 1024).toFixed(1)} kB`);
