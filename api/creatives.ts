import { json, readManifest, saveLead, issueToken, tokenValid } from "./_lib/creatives.js";
import { FREE_IDS, libraryOrder } from "../src/data/creatives.js";

/* Creative library for /creative-library.
   GET               -> the FREE_IDS creatives (marked
                        free, with video), and only industry + type for the rest,
                        so nothing of a locked creative can be seen before signing up.
   GET  (x-creative-token header with a valid token) -> every creative with video.
   POST {name, email, company, website} -> stores the lead in the private Blob store
                                           and returns an access token for the videos.
   website is a honeypot: bots fill it, people never see it. */

const PER_IP_HOUR = 10;
const hits = new Map<string, number[]>();
const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

export async function GET(request: Request) {
  const unlocked = tokenValid(request.headers.get("x-creative-token"));
  const all = libraryOrder(await readManifest());
  const picked = FREE_IDS.map((id) => all.find((c) => c.id === id)).filter((c) => c !== undefined);
  const free = [...picked, ...all.filter((c) => !picked.includes(c))].slice(0, FREE_IDS.length);
  const items = [...free.map((c) => ({ ...c, free: true })), ...all.filter((c) => !free.includes(c))];
  if (unlocked) return json({ unlocked, items, locked: [] });
  return json({
    unlocked,
    items: items.filter((c) => c.free),
    locked: items.filter((c) => !c.free).map(({ industry, kind }) => ({ industry, kind })),
  });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase().slice(0, 200) : "";
  const name = typeof body.name === "string" ? body.name.trim().slice(0, 120) : "";
  const company = typeof body.company === "string" ? body.company.trim().slice(0, 120) : "";
  if (!name) return json({ error: "Enter your name." }, 400);
  if (!EMAIL.test(email)) return json({ error: "Enter a valid work email." }, 400);
  if (!company) return json({ error: "Enter your company." }, 400);
  // Honeypot: answer like a success so the bot learns nothing, but store nothing.
  if (typeof body.website === "string" && body.website.trim()) return json({ token: "" });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 3_600_000);
  if (recent.length >= PER_IP_HOUR) return json({ error: "Too many requests. Try again in an hour." }, 429);
  hits.set(ip, [...recent, now]);

  await saveLead({
    name,
    email,
    company,
    country: request.headers.get("x-vercel-ip-country") || "",
    referrer: typeof body.referrer === "string" ? body.referrer.slice(0, 300) : "",
    userAgent: (request.headers.get("user-agent") || "").slice(0, 300),
  });
  return json({ token: issueToken(email) });
}
