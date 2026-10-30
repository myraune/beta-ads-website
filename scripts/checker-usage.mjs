// Sums the sponsorship checker's Claude usage from the private Blob store (checker/usage/<day>/...).
// node --env-file=.env.local scripts/checker-usage.mjs [days=30]
import { list } from "@vercel/blob";

const days = Number(process.argv[2] || 30), token = process.env.LEADS_READ_WRITE_TOKEN;
const since = new Date(Date.now() - days * 864e5).toISOString().slice(0, 10);
const blobs = [];
for (let cursor; ;) {
  const r = await list({ prefix: "checker/usage/", token, limit: 1000, cursor });
  blobs.push(...r.blobs); if (!r.hasMore) break; cursor = r.cursor;
}
const byDay = {}; let n = 0, usd = 0, tin = 0, tout = 0;
for (const b of blobs.filter(b => b.pathname.slice(14, 24) >= since)) {
  // private blobs need the token on the download request
  const e = await (await fetch(b.downloadUrl, { headers: { authorization: `Bearer ${token}` } })).json();
  const d = (byDay[e.at.slice(0, 10)] ||= { n: 0, usd: 0 });
  d.n++; d.usd += e.usd; n++; usd += e.usd; tin += e.input; tout += e.output;
}
for (const [d, v] of Object.entries(byDay).sort()) console.log(`${d}  ${String(v.n).padStart(4)} checks  $${v.usd.toFixed(2)}`);
console.log(`\n${n} Claude checks in ${days} days, $${usd.toFixed(2)} total, $${n ? (usd / n).toFixed(3) : "0"} per check (${tin} in / ${tout} out tokens)`);
