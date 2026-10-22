import Anthropic from "@anthropic-ai/sdk";
import { betaZodOutputFormat } from "@anthropic-ai/sdk/helpers/beta/zod";
import * as z from "zod/v4";

/* Sponsorship checker for /twitch-sponsorship-checker.
   GET  ?q=name   -> channel search (Twitch Helix), for the autocomplete.
   POST {login}   -> reads the creator's current title, bio and last 100 VOD titles,
                     and asks Claude which brands sponsor them.
   Runs as a Vercel function in production and through the dev middleware in
   vite.config.ts locally. Needs TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET and
   ANTHROPIC_API_KEY (server-side only, never VITE_-prefixed). */

const MODEL = "claude-opus-5-5";
const CACHE_MS = 6 * 60 * 60 * 1000;
const PER_IP_HOUR = 15;
const PER_DAY = 300; // hard ceiling on Claude calls per instance per day, protects the credits

type Title = { id: number; date: string; lastDate: string; count: number; text: string; url: string; source: "live" | "vod" | "bio" };

const cache = new Map<string, { at: number; data: unknown }>();
const hits = new Map<string, number[]>();
let day = { key: "", n: 0 };
let token: { value: string; exp: number } | null = null;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json", "cache-control": "no-store" } });

async function twitchToken() {
  if (token && token.exp > Date.now() + 60_000) return token.value;
  const r = await fetch("https://id.twitch.tv/oauth2/token", {
    method: "POST",
    body: new URLSearchParams({
      client_id: process.env.TWITCH_CLIENT_ID!,
      client_secret: process.env.TWITCH_CLIENT_SECRET!,
      grant_type: "client_credentials",
    }),
  });
  if (!r.ok) throw new Error(`Twitch token ${r.status}`);
  const t = await r.json();
  token = { value: t.access_token, exp: Date.now() + t.expires_in * 1000 };
  return token.value;
}

async function helix<T = any>(path: string): Promise<T> {
  const r = await fetch(`https://api.twitch.tv/helix/${path}`, {
    headers: { "Client-ID": process.env.TWITCH_CLIENT_ID!, Authorization: `Bearer ${await twitchToken()}` },
  });
  if (!r.ok) throw new Error(`Twitch ${path.split("?")[0]} ${r.status}`);
  return r.json();
}

/* Same title streamed many days in a row collapses to one line with a date range. */
function collapse(rows: Omit<Title, "id" | "lastDate" | "count">[]): Title[] {
  const byText = new Map<string, Title>();
  for (const row of rows) {
    const key = row.text.trim().toLowerCase();
    const seen = byText.get(key);
    if (seen) {
      seen.count++;
      if (row.date < seen.date) { seen.date = row.date; seen.url = row.url; }
      if (row.date > seen.lastDate) seen.lastDate = row.date;
    } else byText.set(key, { ...row, id: 0, lastDate: row.date, count: 1 });
  }
  return [...byText.values()].sort((a, b) => b.lastDate.localeCompare(a.lastDate)).map((t, i) => ({ ...t, id: i + 1 }));
}

const Result = z.object({
  sponsors: z.array(z.object({
    brand: z.string(),
    category: z.string(),
    kind: z.enum(["sponsor", "affiliate", "own_brand", "unclear"]),
    confidence: z.enum(["high", "medium", "low"]),
    evidence_ids: z.array(z.number()),
    note: z.string(),
  })),
  not_sponsors: z.array(z.object({ token: z.string(), reason: z.string() })),
  summary: z.string(),
});

const SYSTEM = `You read Twitch stream titles and a channel bio and decide which brands sponsor the creator.

Twitch titles are full of !commands. Most are chat bot commands, not deals: !discord, !socials, !youtube, !merch for the creator's own shop, !prime (a Prime Gaming sub reminder), !drops, game guides, champion or build names, community events, other streamers. Count a brand only when the line shows a commercial relationship: a !command named after a company or product (!hellofresh, !gamersupps, !steelseries), #ad or #sponsored, "sponsored by", "partner", "code X" or "use code" with a brand, or a brand @mention in a promo context.

kind: "sponsor" for a paid placement, "affiliate" for codes or links that look like an affiliate or creator-code deal, "own_brand" for the creator's own merch or company, "unclear" when you cannot tell. Use the real brand name with normal capitalisation (Opera GX, not OPERAGX). evidence_ids are the ids of the lines that show it; never invent ids. not_sponsors lists the !commands or names you looked at and rejected, with a short reason, at most 12. summary is two plain sentences for a marketer: who sponsors this creator and since when, based on the dates. Write dates like "25 Sep 2026", refer to the creator by name or as "they", and do not use em dashes. If nothing qualifies, return an empty sponsors list and say so.`;

async function analyse(login: string) {
  const users = await helix(`users?login=${encodeURIComponent(login)}`);
  const u = users.data?.[0];
  if (!u) return null;

  const [channel, stream, vods, followers] = await Promise.all([
    helix(`channels?broadcaster_id=${u.id}`),
    helix(`streams?user_id=${u.id}`),
    helix(`videos?user_id=${u.id}&type=archive&first=100`),
    helix(`channels/followers?broadcaster_id=${u.id}`).catch(() => null),
  ]);
  const ch = channel.data?.[0] ?? {};
  const live = stream.data?.[0] ?? null;

  const rows: Omit<Title, "id" | "lastDate" | "count">[] = [];
  const today = new Date().toISOString().slice(0, 10);
  if (ch.title) rows.push({ date: today, text: ch.title, url: `https://twitch.tv/${u.login}`, source: "live" });
  for (const v of vods.data ?? []) rows.push({ date: v.created_at.slice(0, 10), text: v.title, url: v.url, source: "vod" });
  const titles = collapse(rows);
  if (u.description) titles.push({ id: titles.length + 1, date: today, lastDate: today, count: 1, text: u.description, url: `https://twitch.tv/${u.login}/about`, source: "bio" });

  const creator = {
    login: u.login,
    name: u.display_name,
    avatar: u.profile_image_url,
    language: ch.broadcaster_language ?? null,
    game: ch.game_name ?? null,
    followers: followers?.total ?? null,
    live: live ? { viewers: live.viewer_count, title: live.title, game: live.game_name } : null,
    vodCount: vods.data?.length ?? 0,
    since: titles.length ? titles.reduce((m, t) => (t.date < m ? t.date : m), today) : null,
  };

  if (!titles.length) return { creator, sponsors: [], not_sponsors: [], summary: "No titles or VODs to read for this channel.", scannedLines: 0 };

  const lines = titles.map(t => `${t.id} | ${t.source} | ${t.date === t.lastDate ? t.date : `${t.date}..${t.lastDate}`}${t.count > 1 ? ` x${t.count}` : ""} | ${t.text.replace(/\s+/g, " ").slice(0, 300)}`).join("\n");

  const client = new Anthropic();
  const res = await client.beta.messages.parse({
    model: MODEL,
    max_tokens: 4000,
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    output_config: { effort: "medium", format: betaZodOutputFormat(Result) },
    system: SYSTEM,
    messages: [{ role: "user", content: `Creator: ${u.display_name} (twitch.tv/${u.login})\nLines (id | source | date | text):\n${lines}` }],
  });
  if (res.stop_reason === "refusal" || !res.parsed_output) throw new Error(`Claude returned no result (${res.stop_reason})`);
  console.log(`[creator-sponsors] ${u.login}: ${titles.length} lines, ${res.usage.input_tokens} in / ${res.usage.output_tokens} out`);

  const byId = new Map(titles.map(t => [t.id, t]));
  const sponsors = res.parsed_output.sponsors
    .map(s => {
      const ev = s.evidence_ids.map(id => byId.get(id)).filter((t): t is Title => !!t);
      if (!ev.length) return null; // drop anything Claude could not tie to a real line
      return {
        brand: s.brand, category: s.category, kind: s.kind, confidence: s.confidence, note: s.note,
        firstSeen: ev.reduce((m, t) => (t.date < m ? t.date : m), ev[0].date),
        lastSeen: ev.reduce((m, t) => (t.lastDate > m ? t.lastDate : m), ev[0].lastDate),
        streams: ev.reduce((n, t) => n + t.count, 0),
        evidence: ev.slice(0, 4).map(t => ({ text: t.text, date: t.lastDate, url: t.url, source: t.source })),
      };
    })
    .filter(Boolean)
    .sort((a, b) => b!.lastSeen.localeCompare(a!.lastSeen));

  return { creator, sponsors, not_sponsors: res.parsed_output.not_sponsors, summary: res.parsed_output.summary, scannedLines: titles.length };
}

function allow(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter(t => now - t < 3_600_000);
  const key = new Date().toISOString().slice(0, 10);
  if (day.key !== key) day = { key, n: 0 };
  if (recent.length >= PER_IP_HOUR || day.n >= PER_DAY) return false;
  recent.push(now);
  hits.set(ip, recent);
  day.n++;
  return true;
}

export async function GET(request: Request) {
  const q = (new URL(request.url).searchParams.get("q") ?? "").trim();
  if (q.length < 2 || q.length > 40) return json({ results: [] });
  try {
    const r = await helix(`search/channels?first=8&query=${encodeURIComponent(q)}`);
    return json({
      results: (r.data ?? []).map((c: any) => ({
        login: c.broadcaster_login, name: c.display_name, avatar: c.thumbnail_url, live: c.is_live, game: c.game_name, language: c.broadcaster_language,
      })),
    });
  } catch (e) {
    return json({ error: "Search is unavailable right now." }, 502);
  }
}

export async function POST(request: Request) {
  let login = "";
  try {
    login = String((await request.json()).login ?? "").trim().toLowerCase().replace(/^.*twitch\.tv\//, "").replace(/[/?#].*$/, "");
  } catch { /* handled below */ }
  if (!/^[a-z0-9_]{2,25}$/.test(login)) return json({ error: "Enter a Twitch channel name." }, 400);

  const cached = cache.get(login);
  if (cached && Date.now() - cached.at < CACHE_MS) return json({ ...(cached.data as object), cached: true });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
  if (!allow(ip)) return json({ error: "Too many lookups. Try again in an hour." }, 429);

  try {
    const data = await analyse(login);
    if (!data) return json({ error: `No Twitch channel called "${login}".` }, 404);
    cache.set(login, { at: Date.now(), data });
    return json(data);
  } catch (e) {
    console.error("[creator-sponsors]", e);
    return json({ error: "The check failed. Try again in a minute." }, 502);
  }
}
