import Anthropic from "@anthropic-ai/sdk";
import { betaZodOutputFormat } from "@anthropic-ai/sdk/helpers/beta/zod";
import * as z from "zod/v4";
import { tokenValid } from "./_lib/creatives.js";
import { callsToday, logUsage, readCached, writeCached } from "./_lib/checker-store.js";

/* Sponsorship checker for /twitch-sponsorship-checker.
   GET  ?q=name   -> channel search (Twitch Helix), for the autocomplete.
   GET  ?contact=name -> business emails from the bio, the About panels and the bot
                     commands. Without the x-creative-token a visitor gets by signing up
                     (api/creatives.ts) it returns only how many it found.
   GET ?stats=x   -> live viewer count and followers for the sponsorship cost calculator.
   POST {login}   -> reads the creator's current title, bio, last 100 VOD titles and
                     public chat bot commands (Nightbot, StreamElements), and asks
                     Claude which brands sponsor them.
   Runs as a Vercel function in production and through the dev middleware in
   vite.config.ts locally. Needs TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET and
   ANTHROPIC_API_KEY (server-side only, never VITE_-prefixed). */

export const maxDuration = 60; // Claude call is ~10-20 s

const MODEL = "claude-opus-5-5";
const CACHE_MS = 24 * 60 * 60 * 1000; // sponsors change over weeks, so one paid check per channel per day is enough
const PRICE = { input: 4 / 1e6, output: 20 / 1e6 }; // Opus 5.5, USD per token
const PER_IP_HOUR = 15;
const PER_DAY = 300; // Claude calls per day across all instances (counted in the Blob usage log), protects the credits

type Title = { id: number; date: string; lastDate: string; count: number; text: string; url: string; source: "live" | "vod" | "bio" | "command" };

const cache = new Map<string, { at: number; data: unknown }>();
const hits = new Map<string, number[]>();
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

/* Brand deals mostly live behind chat commands (!reklame, !cupra): the title only says
   "!reklame", the bot reply names the brand. Both bots expose commands publicly.
   date is when the command was last edited. */
async function botCommands(login: string): Promise<Omit<Title, "id" | "lastDate" | "count">[]> {
  const get = (url: string, headers?: Record<string, string>) =>
    fetch(url, { headers, signal: AbortSignal.timeout(5000) }).then(r => (r.ok ? r.json() : null)).catch(() => null);
  const [nb, se] = await Promise.all([
    get(`https://api.nightbot.tv/1/channels/t/${login}`).then(async c =>
      c?.channel?._id ? (await get("https://api.nightbot.tv/1/commands", { "Nightbot-Channel": c.channel._id }))?.commands ?? [] : []),
    get(`https://api.streamelements.com/kappa/v2/channels/${login}`).then(async c =>
      c?._id ? (await get(`https://api.streamelements.com/kappa/v2/bot/commands/${c._id}/public`)) ?? [] : []),
  ]);
  const rows = [
    ...nb.map((c: any) => ({ name: c.name, reply: c.message, at: c.updatedAt, url: `https://nightbot.tv/t/${login}/commands` })),
    ...se.map((c: any) => ({ name: `!${c.command}`, reply: c.reply, at: c.updatedAt, url: `https://streamelements.com/${login}/commands` })),
  ];
  return rows
    .filter(c => c.name && c.reply?.trim() && c.at)
    .sort((a, b) => b.at.localeCompare(a.at))
    .slice(0, 150)
    .map(c => ({ date: c.at.slice(0, 10), text: `${c.name}: ${c.reply}`, url: c.url, source: "command" as const }));
}

/* The About panels under the stream. Helix has no endpoint for them; Twitch's own web
   client reads them from gql.twitch.tv with its public client id. */
async function panels(login: string): Promise<string[]> {
  const r = await fetch("https://gql.twitch.tv/gql", {
    method: "POST",
    headers: { "Client-Id": "kimne78kx3ncx6brgo4mv6wki5h1ko", "content-type": "application/json" },
    body: JSON.stringify({ query: `query{user(login:${JSON.stringify(login)}){panels{... on DefaultPanel{title description linkURL}}}}` }),
    signal: AbortSignal.timeout(6000),
  }).then(res => (res.ok ? res.json() : null)).catch(() => null);
  return (r?.data?.user?.panels ?? []).flatMap((p: any) => [p?.title, p?.description, p?.linkURL]).filter(Boolean);
}

const EMAIL = /[a-z0-9._%+-]+(?:@|\s?[[(]at[\])]\s?)[a-z0-9-]+(?:\.[a-z0-9-]+)*\.[a-z]{2,}/gi;
const contactCache = new Map<string, { at: number; emails: { email: string; source: "bio" | "panel" | "command" }[] }>();

/* Business emails a creator publishes: bio, About panels ("Business: x@y.com", mailto links),
   and bot commands such as !business or !email. Writes "name [at] domain" out in full. */
async function contactEmails(login: string) {
  const hit = contactCache.get(login);
  if (hit && Date.now() - hit.at < CACHE_MS) return hit.emails;
  const u = (await helix(`users?login=${encodeURIComponent(login)}`)).data?.[0];
  if (!u) return [];
  const [panelText, commands] = await Promise.all([panels(u.login), botCommands(u.login)]);
  const found = new Map<string, "bio" | "panel" | "command">();
  const scan = (text: string, source: "bio" | "panel" | "command") => {
    for (const m of text.match(EMAIL) ?? []) {
      const email = m.toLowerCase().replace(/^mailto:/, "").replace(/\s?[[(]at[\])]\s?/, "@");
      if (!found.has(email) && !/\.(png|jpe?g|gif|webp)$/.test(email)) found.set(email, source);
    }
  };
  scan(u.description ?? "", "bio");
  panelText.forEach(t => scan(t, "panel"));
  commands.forEach(c => scan(c.text, "command"));
  const emails = [...found].map(([email, source]) => ({ email, source }));
  contactCache.set(login, { at: Date.now(), emails });
  return emails;
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

/* "https://www.AMD.com/en" -> "amd.com"; anything that is not a plain hostname becomes "". */
const cleanDomain = (d: string) => {
  const h = d.trim().toLowerCase().replace(/^[a-z]+:\/\//, "").replace(/^www\./, "").split(/[/?#]/)[0];
  return /^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(h) ? h : "";
};

const Result = z.object({
  sponsors: z.array(z.object({
    brand: z.string(),
    category: z.string(),
    domain: z.string(),
    kind: z.enum(["sponsor", "affiliate", "own_brand", "unclear"]),
    confidence: z.enum(["high", "medium", "low"]),
    evidence_ids: z.array(z.number()),
    note: z.string(),
  })),
  not_sponsors: z.array(z.object({ token: z.string(), reason: z.string() })),
  summary: z.string(),
});

const SYSTEM = `You read Twitch stream titles, a channel bio and the channel's public chat bot commands, and decide which brands sponsor the creator.

Lines with source "command" are "!name: bot reply", dated by when the command was last edited. They are the best evidence: creators put "!reklame" or "!ad" in the title and the bot reply names the brands. A reply that discloses advertising in any language (Reklame, reklame for, annonse, annonce, #ad, #reklame, sponsored, "in partnership with", a discount code or tracking link for a company) is a deal. A disclosure list such as "this stream contains ads for A, B and C" counts for each brand it names; use that line as evidence for each. A command edited long ago is an older deal, keep it but say so in note.

Twitch titles are full of !commands. Most are chat bot commands, not deals: !discord, !socials, !youtube, !merch for the creator's own shop, !prime (a Prime Gaming sub reminder), !drops, game guides, champion or build names, community events, other streamers. Count a brand only when the line shows a commercial relationship: a !command named after a company or product (!hellofresh, !gamersupps, !steelseries), #ad or #sponsored, "sponsored by", "partner", "code X" or "use code" with a brand, or a brand @mention in a promo context.

kind: "sponsor" for a paid placement, "affiliate" for codes or links that look like an affiliate or creator-code deal, "own_brand" for the creator's own merch or company, "unclear" when you cannot tell. Use the real brand name with normal capitalisation (Opera GX, not OPERAGX). domain is the brand's own website domain, such as amd.com or cupra.no, not a tracking or shop link domain; use an empty string if you do not know it. evidence_ids are the ids of the lines that show it, the strongest first and at most 4; never invent ids. note is one sentence of at most 25 words. not_sponsors lists the !commands or names you looked at and rejected, with a reason of a few words, at most 8. summary is two plain sentences for a marketer: who sponsors this creator and since when, based on the dates. Write dates like "25 Sep 2026", refer to the creator by name or as "they", and do not use em dashes. If nothing qualifies, return an empty sponsors list and say so.`;

async function analyse(login: string) {
  const users = await helix(`users?login=${encodeURIComponent(login)}`);
  const u = users.data?.[0];
  if (!u) return null;

  const [channel, stream, vods, followers, commands] = await Promise.all([
    helix(`channels?broadcaster_id=${u.id}`),
    helix(`streams?user_id=${u.id}`),
    helix(`videos?user_id=${u.id}&type=archive&first=100`),
    helix(`channels/followers?broadcaster_id=${u.id}`).catch(() => null),
    botCommands(u.login),
  ]);
  const ch = channel.data?.[0] ?? {};
  const live = stream.data?.[0] ?? null;

  const rows: Omit<Title, "id" | "lastDate" | "count">[] = [];
  const today = new Date().toISOString().slice(0, 10);
  if (ch.title) rows.push({ date: today, text: ch.title, url: `https://twitch.tv/${u.login}`, source: "live" });
  for (const v of vods.data ?? []) rows.push({ date: v.created_at.slice(0, 10), text: v.title, url: v.url, source: "vod" });
  const titles = collapse(rows);
  const titleLines = titles.length;
  if (u.description) titles.push({ id: titles.length + 1, date: today, lastDate: today, count: 1, text: u.description, url: `https://twitch.tv/${u.login}/about`, source: "bio" });
  for (const c of commands) titles.push({ ...c, id: titles.length + 1, lastDate: c.date, count: 1 });

  const creator = {
    login: u.login,
    name: u.display_name,
    avatar: u.profile_image_url,
    language: ch.broadcaster_language ?? null,
    game: ch.game_name ?? null,
    followers: followers?.total ?? null,
    live: live ? { viewers: live.viewer_count, title: live.title, game: live.game_name } : null,
    vodCount: vods.data?.length ?? 0,
    commandCount: commands.length,
    since: titleLines ? titles.filter(t => t.source !== "command").reduce((m, t) => (t.date < m ? t.date : m), today) : null,
  };

  if (!titles.length) return { creator, sponsors: [], not_sponsors: [], summary: "No titles, VODs or bot commands to read for this channel.", scannedLines: 0 };

  const lines = titles.map(t => `${t.id} | ${t.source} | ${t.date === t.lastDate ? t.date : `${t.date}..${t.lastDate}`}${t.count > 1 ? ` x${t.count}` : ""} | ${t.text.replace(/\s+/g, " ").slice(0, t.source === "command" ? 600 : 300)}`).join("\n");

  const client = new Anthropic();
  const res = await client.beta.messages.parse({
    model: MODEL,
    max_tokens: 6000, // big channels list 15+ brands; 4000 cut the JSON off
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    output_config: { effort: "medium", format: betaZodOutputFormat(Result) },
    system: SYSTEM,
    messages: [{ role: "user", content: `Creator: ${u.display_name} (twitch.tv/${u.login})\nLines (id | source | date | text):\n${lines}` }],
  });
  if (res.stop_reason === "refusal" || !res.parsed_output) throw new Error(`Claude returned no result (${res.stop_reason})`);
  const usd = res.usage.input_tokens * PRICE.input + res.usage.output_tokens * PRICE.output;
  console.log(`[creator-sponsors] ${u.login}: ${titles.length} lines, ${res.usage.input_tokens} in / ${res.usage.output_tokens} out, $${usd.toFixed(3)}`);
  await logUsage({ login: u.login, model: MODEL, lines: titles.length, input: res.usage.input_tokens, output: res.usage.output_tokens, usd })
    .catch(e => console.error("[creator-sponsors] usage log", e));

  const byId = new Map(titles.map(t => [t.id, t]));
  const sponsors = res.parsed_output.sponsors
    .map(s => {
      const cited = s.evidence_ids.map(id => byId.get(id)).filter((t): t is Title => !!t);
      if (!cited.length) return null; // drop anything Claude could not tie to a real line
      // A command only has an edit date; the titles that advertise it (!cupra) show the real streams.
      const names = cited.filter(t => t.source === "command").map(t => t.text.split(":")[0].trim().toLowerCase())
        .filter(n => n.length > 2 && n !== "!reklame" && n !== "!ad" && n !== "!annonce");
      const inTitles = titles.filter(t => (t.source === "vod" || t.source === "live") && !cited.includes(t)
        && names.some(n => new RegExp(`${n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?![\\p{L}\\d])`, "iu").test(t.text)));
      const ev = [...cited, ...inTitles];
      return {
        brand: s.brand, category: s.category, domain: cleanDomain(s.domain), kind: s.kind, confidence: s.confidence, note: s.note,
        firstSeen: ev.reduce((m, t) => (t.date < m ? t.date : m), ev[0].date),
        lastSeen: ev.reduce((m, t) => (t.lastDate > m ? t.lastDate : m), ev[0].lastDate),
        streams: ev.reduce((n, t) => n + (t.source === "vod" || t.source === "live" ? t.count : 0), 0),
        evidence: [...cited.slice(0, 3), ...inTitles.slice(0, 2)].map(t => ({ text: t.text, date: t.lastDate, url: t.url, source: t.source })),
      };
    })
    .filter(Boolean)
    .sort((a, b) => b!.lastSeen.localeCompare(a!.lastSeen));

  return { creator, sponsors, not_sponsors: res.parsed_output.not_sponsors, summary: res.parsed_output.summary, scannedLines: titleLines };
}

function allow(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter(t => now - t < 3_600_000);
  if (recent.length >= PER_IP_HOUR) return false;
  recent.push(now);
  hits.set(ip, recent);
  return true;
}

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const contact = (params.get("contact") ?? "").trim().toLowerCase();
  if (contact) {
    if (!/^[a-z0-9_]{2,25}$/.test(contact)) return json({ error: "Enter a Twitch channel name." }, 400);
    try {
      const emails = await contactEmails(contact);
      if (!tokenValid(request.headers.get("x-creative-token"))) return json({ count: emails.length, gate: true });
      return json({ count: emails.length, emails });
    } catch {
      return json({ error: "Could not read the profile right now." }, 502);
    }
  }
  // viewer numbers for the /sponse-streamer-pris calculator: Twitch only, no Claude call
  const stats = (params.get("stats") ?? "").trim().toLowerCase();
  if (stats) {
    if (!/^[a-z0-9_]{2,25}$/.test(stats)) return json({ error: "Enter a Twitch channel name." }, 400);
    try {
      const u = (await helix(`users?login=${encodeURIComponent(stats)}`)).data?.[0];
      if (!u) return json({ error: "Found no Twitch channel with that name." }, 404);
      const [stream, followers] = await Promise.all([
        helix(`streams?user_id=${u.id}`),
        helix(`channels/followers?broadcaster_id=${u.id}`).catch(() => null),
      ]);
      const live = stream.data?.[0];
      return json({
        login: u.login, name: u.display_name, avatar: u.profile_image_url, followers: followers?.total ?? null,
        live: live ? { viewers: live.viewer_count, game: live.game_name, title: live.title } : null,
      });
    } catch {
      return json({ error: "Twitch is unavailable right now." }, 502);
    }
  }
  const q = (params.get("q") ?? "").trim();
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

  // this instance's memory first, then the shared Blob cache, before paying for a Claude call
  const cached = cache.get(login);
  if (cached && Date.now() - cached.at < CACHE_MS) return json({ ...(cached.data as object), cached: true });
  const shared = await readCached<object>(login, CACHE_MS);
  if (shared) { cache.set(login, { at: Date.now(), data: shared }); return json({ ...shared, cached: true }); }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
  if (!allow(ip)) return json({ error: "Too many lookups. Try again in an hour." }, 429);
  // fail open if the count can't be read: a Blob hiccup should not take the checker down
  if ((await callsToday().catch(() => 0)) >= PER_DAY) return json({ error: "The checker has hit today's limit. Try again tomorrow." }, 429);

  try {
    const data = await analyse(login);
    if (!data) return json({ error: `No Twitch channel called "${login}".` }, 404);
    cache.set(login, { at: Date.now(), data });
    await writeCached(login, data).catch(e => console.error("[creator-sponsors] cache write", e));
    return json(data);
  } catch (e) {
    console.error("[creator-sponsors]", e);
    return json({ error: "The check failed. Try again in a minute." }, 502);
  }
}
