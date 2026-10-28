import { json } from "./_lib/creatives.js";
import { isAdminRequest } from "./_lib/admin.js";

/* Traffic tab of /admin. Reads beta-ads.no's numbers from the HQ tracker
   (hq.myraune.com/api/stats) with HQ_STATS_KEY, so the key never reaches the browser.
   GET ?days=7|28|90|365 */

export async function GET(request: Request) {
  if (!isAdminRequest(request)) return json({ error: "Sign in first." }, 401);
  const key = process.env.HQ_STATS_KEY;
  if (!key) return json({ error: "HQ_STATS_KEY is not set on the server." }, 500);
  const days = new URL(request.url).searchParams.get("days") || "28";
  const base = process.env.HQ_URL || "https://hq.myraune.com";
  const r = await fetch(`${base}/api/stats?site=betaads&days=${encodeURIComponent(days)}`, {
    headers: { authorization: `Bearer ${key}` },
    signal: AbortSignal.timeout(15_000),
  }).catch(() => null);
  if (!r?.ok) return json({ error: `Traffic is unavailable right now (HQ ${r?.status ?? "unreachable"}).` }, 502);
  return json(await r.json());
}
