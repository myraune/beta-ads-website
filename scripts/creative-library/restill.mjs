/* Swaps library previews for re-rendered ones and adds new items, from a build
   folder's restill.json (see ~/dev/creative-library-build/restill.py):
   node --env-file=.env.local scripts/creative-library/restill.mjs <build-dir>
   Uploads the new MP4 + WebP, points the manifest at them, adds the new items,
   writes the manifest, and only then deletes the replaced files. */
import { readFileSync } from "node:fs";
import path from "node:path";
import { put, get, del } from "@vercel/blob";

const dir = process.argv[2];
if (!dir) throw new Error("Usage: restill.mjs <build-dir>");
const { rendered, new: fresh } = JSON.parse(readFileSync(path.join(dir, "restill.json"), "utf8"));
const PRIVATE = { access: "private", token: process.env.LEADS_READ_WRITE_TOKEN };

const current = await get("manifest.json", PRIVATE);
const items = JSON.parse(await new Response(current.stream).text());
const byId = new Map(items.map((i) => [i.id, i]));
const up = (id, file, type) =>
  put(`library/${id}${path.extname(file)}`, readFileSync(path.join(dir, file)), { access: "public", addRandomSuffix: true, contentType: type });

const old = [];
let swapped = 0, added = 0;
for (const [id, r] of Object.entries(rendered)) {
  const [video, poster] = await Promise.all([up(id, r.mp4, "video/mp4"), up(id, r.webp, "image/webp")]);
  const item = byId.get(id);
  if (item) {
    old.push(item.video, item.poster);
    Object.assign(item, { video: video.url, poster: poster.url });
    swapped++;
  } else {
    const n = fresh.find((x) => x.id === id);
    if (!n) continue;
    items.push({ id, brand: n.brand, title: n.title, industry: n.industry, kind: n.kind, poster: poster.url, video: video.url, createdAt: new Date().toISOString() });
    added++;
  }
  console.log(item ? "swapped" : "added", id);
}
// Concepts first, then campaigns that ran, then partner-network examples.
const rank = { concept: 0, client: 1, network: 2 };
items.sort((a, b) => rank[a.kind] - rank[b.kind]);
await put("manifest.json", JSON.stringify(items, null, 1), { ...PRIVATE, addRandomSuffix: false, allowOverwrite: true, contentType: "application/json" });
const stale = old.filter(Boolean);
if (stale.length) await del(stale);
console.log(`done: ${swapped} swapped, ${added} added, ${stale.length} old files deleted, ${items.length} in the library`);
