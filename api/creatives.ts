import { json, readManifest, saveLead, issueToken, tokenValid } from "./_lib/creatives";

/* Creative library for /creative-library.
   GET               -> every creative, with poster but no video URL.
   GET  (x-creative-token header with a valid token) -> the same list with video URLs.
   POST {email, company, website} -> stores the lead in the private Blob store and
                                     returns an access token for the videos.
   website is a honeypot: bots fill it, people never see it. */

const PER_IP_HOUR = 10;
const hits = new Map<string, number[]>();
const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

export async function GET(request: Request) {
  const unlocked = tokenValid(request.headers.get("x-creative-token"));
  const items = await readManifest();
  return json({ unlocked, items: unlocked ? items : items.map(({ video: _video, ...rest }) => rest) });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase().slice(0, 200) : "";
  const company = typeof body.company === "string" ? body.company.trim().slice(0, 120) : "";
  if (!EMAIL.test(email)) return json({ error: "Enter a valid work email." }, 400);
  // Honeypot: answer like a success so the bot learns nothing, but store nothing.
  if (typeof body.website === "string" && body.website.trim()) return json({ token: "" });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 3_600_000);
  if (recent.length >= PER_IP_HOUR) return json({ error: "Too many requests. Try again in an hour." }, 429);
  hits.set(ip, [...recent, now]);

  await saveLead({
    email,
    company,
    country: request.headers.get("x-vercel-ip-country") || "",
    referrer: typeof body.referrer === "string" ? body.referrer.slice(0, 300) : "",
    userAgent: (request.headers.get("user-agent") || "").slice(0, 300),
  });
  return json({ token: issueToken(email) });
}
