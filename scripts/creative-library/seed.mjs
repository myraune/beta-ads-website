/* Seeds the creative library from a build folder (see ~/dev/creative-library-build):
   node --env-file=.env.local scripts/creative-library/seed.mjs <dir-with-seed.json>
   Uploads each preview MP4 and poster WebP to the public Blob store (random-suffixed
   paths) and adds the item to manifest.json in the private store. Items whose id is
   already in the manifest are skipped, so it can be re-run safely. */
import { readFileSync } from "node:fs";
import path from "node:path";
import { put, get } from "@vercel/blob";

const dir = process.argv[2];
if (!dir) throw new Error("Usage: seed.mjs <build-dir>");
const seed = JSON.parse(readFileSync(path.join(dir, "seed.json"), "utf8"));
const PRIVATE = { access: "private", token: process.env.LEADS_READ_WRITE_TOKEN };

const current = await get("manifest.json", PRIVATE).catch(() => null);
const items = current?.statusCode === 200 ? JSON.parse(await new Response(current.stream).text()) : [];
const have = new Set(items.map((i) => i.id));

let added = 0;
for (const s of seed) {
  if (have.has(s.id)) continue;
  const up = (file, type) => put(`library/${s.id}${path.extname(file)}`, readFileSync(path.join(dir, file)), { access: "public", addRandomSuffix: true, contentType: type });
  const [video, poster] = await Promise.all([up(s.mp4, "video/mp4"), up(s.webp, "image/webp")]);
  items.push({
    id: s.id, brand: s.brand, title: s.title, industry: s.industry, kind: s.kind,
    ...(s.format ? { format: s.format } : {}), ...(s.description ? { description: s.description } : {}),
    poster: poster.url, video: video.url, createdAt: new Date().toISOString(),
  });
  added++;
  console.log("added", s.id);
}
// Concepts first (the bulk of the ideas), then campaigns that ran, then
// partner-network examples; the type filter on the page shows each on its own.
const rank = { concept: 0, client: 1, network: 2 };
items.sort((a, b) => rank[a.kind] - rank[b.kind]);
await put("manifest.json", JSON.stringify(items, null, 1), { ...PRIVATE, addRandomSuffix: false, allowOverwrite: true, contentType: "application/json" });
console.log(`done: ${added} added, ${items.length} in the library`);
