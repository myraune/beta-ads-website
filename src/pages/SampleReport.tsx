import React, { useEffect, useMemo, useRef, useState } from "react";
import { Area, AreaChart, CartesianGrid, ReferenceDot, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { FeaturePage } from "@/components/working/FeaturePage";
import { W } from "@/components/working/shared";
import { PanelFrame } from "@/components/home-final/product-panels";
import "./sample-report.css";

/* /report/sample: what a Beta Ads campaign report contains, on the Platform
   feature page template (/campaign-builder): the overview panel as the hero,
   then one numbered section per report page, each its own dark panel in the
   homepage language. Grey data, red for the lead series and the peaks.
   Sections and metric names are the real report's (Komplett, Samsung Fold7,
   NKI): completed views, times displayed, artwork watch time, screen time,
   verified / unverified / unique clicks and CTR, best day, streamers, average
   and unique viewers, categories, country, regions, devices, gender,
   providers. Plus what /reporting promises: verification with refunds, chat
   tracking with translation and score, polls.
   The brand, every streamer and every number are fictional, generated from a
   fixed seed so the page is the same on every build. The page says so. */

const BRAND = "Vinterbris Zero";
const START = Date.UTC(2026, 8, 14); // 14 Sep 2026
const DAYS = 42;
const BOOKED_VIEWS = 300_000;

type Platform = "Twitch" | "Kick" | "YouTube";
const STREAMERS: { name: string; base: number; live: number; ctr: number; cats: string[]; p: Platform }[] = [
  { name: "fjordfrag", base: 310, live: 0.55, ctr: 0.004, cats: ["Counter-Strike 2", "Just Chatting"], p: "Twitch" },
  { name: "midnattnova", base: 230, live: 0.6, ctr: 0.008, cats: ["Just Chatting", "IRL"], p: "Twitch" },
  { name: "tindetoppen", base: 180, live: 0.5, ctr: 0.006, cats: ["Grand Theft Auto V", "Just Chatting"], p: "Twitch" },
  { name: "pixelpolar", base: 140, live: 0.55, ctr: 0.011, cats: ["Fortnite"], p: "Twitch" },
  { name: "skjaergardtv", base: 95, live: 0.5, ctr: 0.009, cats: ["Minecraft", "Just Chatting"], p: "Twitch" },
  { name: "nordlysnils", base: 88, live: 0.45, ctr: 0.012, cats: ["Grand Theft Auto V"], p: "Twitch" },
  { name: "kaffekari", base: 72, live: 0.6, ctr: 0.015, cats: ["Just Chatting", "Co-working & Studying"], p: "Twitch" },
  { name: "bergenbyte", base: 64, live: 0.45, ctr: 0.01, cats: ["League of Legends"], p: "Twitch" },
  { name: "trollheimen", base: 58, live: 0.4, ctr: 0.013, cats: ["Call of Duty: Black Ops 6"], p: "Kick" },
  { name: "elgjakt_", base: 47, live: 0.5, ctr: 0.017, cats: ["Escape From Tarkov"], p: "Twitch" },
  { name: "vikenvibes", base: 42, live: 0.45, ctr: 0.012, cats: ["IRL", "Just Chatting"], p: "Twitch" },
  { name: "lofotlina", base: 38, live: 0.4, ctr: 0.02, cats: ["Minecraft"], p: "Twitch" },
  { name: "snusmumrik", base: 31, live: 0.5, ctr: 0.014, cats: ["EA Sports FC 26"], p: "Twitch" },
  { name: "fossefall", base: 27, live: 0.45, ctr: 0.018, cats: ["VALORANT"], p: "Twitch" },
  { name: "brunostbrian", base: 22, live: 0.4, ctr: 0.024, cats: ["R.E.P.O.", "Just Chatting"], p: "YouTube" },
  { name: "hyttehelga", base: 18, live: 0.35, ctr: 0.03, cats: ["Stardew Valley"], p: "Twitch" },
];
const FORMATS = [
  { name: "Rich Media", secs: 20, share: 0.55 },
  { name: "Snipe banner", secs: 15, share: 1 },
];

type Play = {
  t: number; day: number; streamer: string; cat: string; p: Platform; format: string;
  viewers: number; vClicks: number; uClicks: number; verified: boolean; stream: string;
};

/** Seeded PRNG (mulberry32): the same fictional campaign on every build. */
function rng(seed: number) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildPlays(): Play[] {
  const r = rng(2026);
  const out: Play[] = [];
  for (let d = 0; d < DAYS; d++) {
    for (const s of STREAMERS) {
      if (r() > s.live) continue;
      const cat = s.cats[r() < 0.75 ? 0 : s.cats.length - 1];
      const plays = 5 + Math.floor(r() * 10);
      let at = START + d * 864e5 + (15 + Math.floor(r() * 5)) * 36e5 + r() * 20 * 6e4; // UTC, Oslo is +2
      for (let i = 0; i < plays; i++) {
        at += (18 + r() * 6) * 6e4;
        const curve = 0.7 + Math.sin((i / plays) * Math.PI) * 0.5;
        const viewers = Math.max(3, Math.round(s.base * curve * (0.65 + r() * 0.7)));
        const vClicks = Math.round(viewers * s.ctr * (0.4 + r() * 1.2));
        out.push({
          t: at, day: d, streamer: s.name, cat, p: s.p, format: r() < FORMATS[0].share ? FORMATS[0].name : FORMATS[1].name,
          viewers, vClicks, uClicks: vClicks + Math.round(viewers * s.ctr * (1.2 + r() * 1.6)),
          verified: r() > 0.014, stream: `${s.name}-${d}`,
        });
      }
    }
  }
  return out.sort((a, b) => b.t - a.t);
}

const nf = new Intl.NumberFormat("en-GB");
const n = (x: number) => nf.format(Math.round(x));
const pct = (x: number, d = 2) => `${(x * 100).toFixed(d)}%`;
const hm = (h: number) => `${n(Math.floor(h))}h ${Math.round((h % 1) * 60)}m`;

/* Numbers count up and bars, hours and the chart grow when a panel scrolls
   into view, once. Driven by requestAnimationFrame writing --p (0 to 1) on the
   panel and the text of [data-to] numbers, so React does not re-render per
   frame. The markup holds the final values, so prerendered HTML and no-JS
   readers see the finished report. */
const FMT: Record<string, (x: number) => string> = {
  n, hm, p0: (x) => pct(x, 0), p1: (x) => pct(x, 1), p2: (x) => pct(x),
};
const Num: React.FC<{ v: number; f?: keyof typeof FMT }> = ({ v, f = "n" }) => (
  <span data-to={v} data-f={f}>{FMT[f](v)}</span>
);

const Sheet: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const nums = [...el.querySelectorAll<HTMLElement>("[data-to]")];
    const paint = (p: number) => {
      el.style.setProperty("--p", String(p));
      for (const x of nums) x.textContent = FMT[x.dataset.f!](Number(x.dataset.to) * p);
    };
    paint(0);
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => {
        const k = Math.min(1, (t - t0) / 1600);
        paint(1 - Math.pow(1 - k, 3));
        if (k < 1) raf = requestAnimationFrame(tick);
        else el.dataset.done = "";
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.25 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, []);
  return <PanelFrame><div ref={ref} className="panel dui rp-anim"><div className="r-main">{children}</div></div></PanelFrame>;
};
const dayLabel = (d: number) => new Date(START + d * 864e5).toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" });
const clock = (t: number) => new Date(t).toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", timeZone: "Europe/Oslo" });
const osloHour = (t: number) => Number(new Date(t).toLocaleString("en-GB", { hour: "2-digit", hourCycle: "h23", timeZone: "Europe/Oslo" }));
const secsOf = (f: string) => FORMATS.find((x) => x.name === f)!.secs;

type Agg = { name: string; plays: number; views: number; clicks: number; ctr: number; avg: number; p: Platform };
function aggregate(ps: Play[], key: (p: Play) => string): Agg[] {
  const m = new Map<string, Play[]>();
  for (const p of ps) { const k = key(p); if (!m.has(k)) m.set(k, []); m.get(k)!.push(p); }
  return [...m.entries()].map(([name, xs]) => {
    const views = xs.reduce((a, p) => a + p.viewers, 0);
    const clicks = xs.reduce((a, p) => a + p.vClicks, 0);
    return { name, plays: xs.length, views, clicks, ctr: views ? clicks / views : 0, avg: views / xs.length, p: xs[0].p };
  }).sort((a, b) => b.views - a.views);
}

/* Audience splits for the sample (fictional, in the shape of a Norwegian campaign). */
const COUNTRIES: [string, number][] = [["Norway", 0.9312], ["Sweden", 0.0214], ["Denmark", 0.0121], ["United Kingdom", 0.0094], ["Germany", 0.0078], ["Other", 0.0181]];
const REGIONS: [string, number][] = [["Oslo", 0.1384], ["Akershus", 0.1192], ["Vestland", 0.1047], ["Trøndelag", 0.0981], ["Innlandet", 0.0842], ["Rogaland", 0.0716]];
const DEVICES: [string, number][] = [["Desktop", 0.7962], ["Mobile", 0.1981], ["Tablet", 0.0057]];
const GENDER: [string, number][] = [["Male", 0.8143], ["Female", 0.1857]];
const POLL: [string, number][] = [["One more game", 0.41], ["A cold Vinterbris", 0.33], ["The chat", 0.18], ["Nothing, I sleep", 0.08]];
const CHAT: [string, string, string, string, string][] = [
  ["21:14", "skjaergardtv", "har faktisk smakt vinterbris zero, den er god", "actually tried Vinterbris Zero, it's good", "Positive"],
  ["21:32", "kaffekari", "!vinterbris", "link requested, answered", "Intent"],
  ["22:05", "midnattnova", "hva koster den i butikken?", "how much is it in the shop?", "Intent"],
  ["22:41", "pixelpolar", "endelig en sponsor som passer streamen", "finally a sponsor that fits the stream", "Positive"],
  ["23:08", "tindetoppen", "liker ikke sukkerfri brus tbh", "don't like sugar-free soda tbh", "Negative"],
  ["23:26", "fjordfrag", "kald vinterbris etter clutchen", "cold Vinterbris after the clutch", "Positive"],
];

/* The report reads top to bottom, one section per page of the real PDF. */
const SECTIONS = [
  ["Overview", "Delivery against what was booked."],
  ["Streamers", "Who carried the campaign."],
  ["Categories", "What was on screen when the ad played."],
  ["Audience", "Who was watching."],
  ["Delivery", "Every play checked, misses refunded."],
  ["Chat", "What chat said about the brand."],
] as const;
type TabName = (typeof SECTIONS)[number][0];
const SERIES = ["Completed views", "Clicks", "CTR", "Times displayed"] as const;
type Series = (typeof SERIES)[number];

const List: React.FC<{ title: string; rows: [string, number][]; digits?: number }> = ({ title, rows, digits = 1 }) => {
  const max = Math.max(...rows.map((r) => r[1]));
  return (
    <div>
      <div className="r-k">{title}</div>
      <ul className="rp-list">
        {rows.map(([k, v], i) => (
          <li key={k}><span>{k}</span><b>{pct(v, digits)}</b><span className={`pp-bar${i === 0 ? " pp-bar--s" : ""}`}><i style={{ "--w": Math.max(2, (v / max) * 100) } as React.CSSProperties} /></span></li>
        ))}
      </ul>
    </div>
  );
};

const SampleReport: React.FC = () => {
  const plays = useMemo(buildPlays, []);
  const [series, setSeries] = useState<Series>("Completed views");

  const m = useMemo(() => {
    const ok = plays.filter((p) => p.verified);
    const views = ok.reduce((a, p) => a + p.viewers, 0);
    const vClicks = ok.reduce((a, p) => a + p.vClicks, 0);
    const uClicks = ok.reduce((a, p) => a + p.uClicks, 0);
    const uniqueViewers = Math.round(views * 0.43);
    const uniqueClicks = Math.round(vClicks * 0.83);
    const daily = Array.from({ length: DAYS }, (_, d) => {
      const xs = ok.filter((p) => p.day === d);
      const v = xs.reduce((a, p) => a + p.viewers, 0);
      const c = xs.reduce((a, p) => a + p.vClicks, 0);
      return { k: dayLabel(d), "Completed views": v, Clicks: c, CTR: v ? +((c / v) * 100).toFixed(2) : 0, "Times displayed": xs.length };
    });
    const hourly = Array.from({ length: 24 }, (_, h) => ok.filter((p) => osloHour(p.t) === h).length);
    const streams = new Set(plays.map((p) => p.stream)).size;
    const providers = (["Twitch", "Kick", "YouTube"] as Platform[]).map((pl) => [pl, ok.filter((p) => p.p === pl).reduce((a, p) => a + p.viewers, 0) / views] as [string, number]);
    return {
      ok, views, vClicks, uClicks, uniqueViewers, uniqueClicks, daily, hourly, streams, providers,
      watchH: ok.reduce((a, p) => a + (p.viewers * secsOf(p.format)) / 3600, 0),
      screenH: ok.reduce((a, p) => a + secsOf(p.format) / 3600, 0),
      best: daily.reduce((a, b) => (b.Clicks > a.Clicks ? b : a)),
      plays: plays.length,
      refundedViews: plays.filter((p) => !p.verified).reduce((a, p) => a + p.viewers, 0),
      streamers: aggregate(ok, (p) => p.streamer),
      cats: aggregate(ok, (p) => p.cat),
      mentions: Math.round(streams * 4.6),
    };
  }, [plays]);

  const topClicks = [...m.streamers].sort((a, b) => b.clicks - a.clicks)[0].name;
  const topCtr = [...m.streamers].filter((s) => s.plays >= 30).sort((a, b) => b.ctr - a.ctr)[0].name;
  const badge = (name: string) => (name === m.streamers[0].name ? "Most views" : name === topClicks ? "Most clicks" : name === topCtr ? "Best CTR" : null);
  const maxHour = Math.max(...m.hourly);
  const peak = m.daily.reduce((a, b) => (b[series] > a[series] ? b : a));
  const fmtSeries = (v: number) => (series === "CTR" ? `${v}%` : n(v));

  const tabBody: Record<TabName, React.ReactNode> = {
    Overview: (
      <>
        <div className="rp-camp">
          <div><b>{BRAND}</b><span>Late Night Launch</span></div>
          <dl>
            <div><dt>Flight</dt><dd>{dayLabel(0)} to {dayLabel(DAYS)}</dd></div>
            <div><dt>Market</dt><dd>Norway</dd></div>
            <div><dt>Ad units</dt><dd>Rich Media, Snipe</dd></div>
          </dl>
        </div>
        <div className="r-top">
          <div>
            <div className="r-k">Completed views</div>
            <div className="r-num num"><Num v={m.views} /></div>
            <div className="rp-sub">Booked {n(BOOKED_VIEWS)}, delivered {pct(m.views / BOOKED_VIEWS, 0)}</div>
          </div>
          <div className="r-states"><button type="button" className="tbtn tbtn--dark" onClick={() => window.print()}>Export PDF</button></div>
        </div>
        <div className="pp-mini rp-mini">
          <div><span>Times displayed</span><b className="num"><Num v={m.ok.length} /></b></div>
          <div><span>Average viewers</span><b className="num"><Num v={m.views / m.ok.length} /></b></div>
          <div><span>Unique viewers</span><b className="num"><Num v={m.uniqueViewers} /></b></div>
          <div><span>Artwork watch time</span><b className="num"><Num v={m.watchH} f="hm" /></b></div>
          <div><span>Screen time</span><b className="num"><Num v={m.screenH} f="hm" /></b></div>
        </div>
        <div className="rp-h">
          <span>Per day</span>
          <div className="rp-seg">
            {SERIES.map((s) => <button key={s} type="button" aria-pressed={series === s} onClick={() => setSeries(s)}>{s}</button>)}
          </div>
        </div>
        <div className="rp-chart">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={m.daily} margin={{ top: 6, right: 4, left: -8, bottom: 0 }}>
              <defs>
                <linearGradient id="rp-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="var(--sw)" stopOpacity={0.32} /><stop offset="1" stopColor="var(--sw)" stopOpacity={0} /></linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="var(--line-2)" />
              <XAxis dataKey="k" tick={{ fontSize: 11.5, fill: "var(--ink-3)" }} tickLine={false} axisLine={false} interval="preserveStartEnd" minTickGap={28} />
              <YAxis width={44} tick={{ fontSize: 11.5, fill: "var(--ink-3)" }} tickLine={false} axisLine={false} tickFormatter={(v) => (series === "CTR" ? `${v}%` : v >= 1000 ? `${Math.round(v / 1000)}k` : String(v))} />
              <Tooltip
                cursor={{ stroke: "var(--line)" }}
                contentStyle={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 8, fontSize: 12.5, color: "var(--ink)" }}
                labelStyle={{ color: "var(--ink-3)" }}
                formatter={(v: number) => [fmtSeries(v), series]}
              />
              <Area type="monotone" dataKey={series} stroke="var(--sw)" strokeWidth={2} fill="url(#rp-fill)" activeDot={{ r: 4, fill: "var(--sw)", stroke: "var(--surface)", strokeWidth: 2 }} isAnimationActive={false} />
              <ReferenceDot x={peak.k} y={peak[series]} r={4.5} fill="var(--sw)" stroke="var(--surface)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="rp-t">
          <div className="rp-r rp-r--th" style={{ gridTemplateColumns: "1.4fr 1fr 1fr" }}><span>Interactions</span><span className="n">Clicks</span><span className="n">CTR</span></div>
          <div className="rp-r" style={{ gridTemplateColumns: "1.4fr 1fr 1fr" }}><span>Verified <span className="d">· bots and repeats removed</span></span><span className="n">{n(m.vClicks)}</span><span className="n">{pct(m.vClicks / m.views)}</span></div>
          <div className="rp-r" style={{ gridTemplateColumns: "1.4fr 1fr 1fr" }}><span>Unverified <span className="d">· every click on the chat link</span></span><span className="n">{n(m.uClicks)}</span><span className="n">{pct(m.uClicks / m.views)}</span></div>
          <div className="rp-r" style={{ gridTemplateColumns: "1.4fr 1fr 1fr" }}><span>Unique <span className="d">· one per viewer</span></span><span className="n">{n(m.uniqueClicks)}</span><span className="n">{pct(m.uniqueClicks / m.uniqueViewers)}</span></div>
          <div className="rp-r" style={{ gridTemplateColumns: "1.4fr 1fr 1fr" }}><span><i className="rp-dot" />Campaign's best day <span className="d">· {m.best.k}</span></span><span className="n">{n(m.best.Clicks)}</span><span className="n">{m.best.CTR}%</span></div>
        </div>
      </>
    ),

    Streamers: (
      <>
        <div className="r-top">
          <div><div className="r-k">Streamers</div><div className="r-num num"><Num v={m.streamers.length} /></div><div className="rp-sub">{n(m.streams)} sponsored streams</div></div>
        </div>
        <div className="rp-scroll">
          <div className="rp-t">
            <div className="rp-r rp-r--th" style={{ gridTemplateColumns: "1.3fr 1.6fr .7fr .7fr .7fr .8fr" }}><span>Streamer</span><span className="n">Completed views</span><span className="n">Avg viewers</span><span className="n">Link clicks</span><span className="n">CTR</span><span className="n">Displayed</span></div>
            {m.streamers.map((s) => (
              <div key={s.name} className="rp-r" style={{ gridTemplateColumns: "1.3fr 1.6fr .7fr .7fr .7fr .8fr" }}>
                <span className="rp-who"><span className="mono">{s.name[0].toUpperCase()}</span><span><b>{s.name}</b><small>{s.p}{badge(s.name) && <> · <i className="sc sc--hot">{badge(s.name)}</i></>}</small></span></span>
                <span className="rp-vbar"><b>{n(s.views)}</b><span className={`pp-bar${s === m.streamers[0] ? " pp-bar--s" : ""}`}><i style={{ "--w": (s.views / m.streamers[0].views) * 100 } as React.CSSProperties} /></span></span>
                <span className="n">{n(s.avg)}</span><span className="n">{n(s.clicks)}</span><span className="n">{pct(s.ctr)}</span><span className="n">{n(s.plays)}</span>
              </div>
            ))}
          </div>
        </div>
      </>
    ),

    Categories: (
      <>
        <div className="r-top">
          <div><div className="r-k">Unique categories</div><div className="r-num num"><Num v={m.cats.length} /></div><div className="rp-sub">What was being streamed when the ad played</div></div>
        </div>
        <div className="rp-scroll">
          <div className="rp-t">
            <div className="rp-r rp-r--th" style={{ gridTemplateColumns: "1.4fr 1.6fr .7fr .7fr .7fr .8fr" }}><span>Category</span><span className="n">Completed views</span><span className="n">Avg viewers</span><span className="n">Link clicks</span><span className="n">CTR</span><span className="n">Displayed</span></div>
            {m.cats.map((c, i) => (
              <div key={c.name} className="rp-r" style={{ gridTemplateColumns: "1.4fr 1.6fr .7fr .7fr .7fr .8fr" }}>
                <span>{c.name}</span>
                <span className="rp-vbar"><b>{n(c.views)}</b><span className={`pp-bar${i === 0 ? " pp-bar--s" : ""}`}><i style={{ "--w": (c.views / m.cats[0].views) * 100 } as React.CSSProperties} /></span></span>
                <span className="n">{n(c.avg)}</span><span className="n">{n(c.clicks)}</span><span className="n">{pct(c.ctr)}</span><span className="n">{n(c.plays)}</span>
              </div>
            ))}
          </div>
        </div>
      </>
    ),

    Audience: (
      <>
        <div className="r-top">
          <div><div className="r-k">Unique viewers</div><div className="r-num num"><Num v={m.uniqueViewers} /></div><div className="rp-sub">{n(m.views / m.ok.length)} watching per ad play on average</div></div>
        </div>
        <div className="rp-cols" style={{ marginTop: 28 }}>
          <List title="Country" rows={COUNTRIES} />
          <List title="Regions in Norway" rows={REGIONS} />
        </div>
        <div className="rp-cols" style={{ marginTop: 32, gridTemplateColumns: "repeat(3,minmax(0,1fr))" }}>
          <List title="Devices" rows={DEVICES} />
          <List title="Gender" rows={GENDER} />
          <List title="Streaming providers" rows={m.providers} />
        </div>
      </>
    ),

    Delivery: (
      <>
        <div className="r-top">
          <div><div className="r-k">Verified ad plays</div><div className="r-num num"><Num v={m.ok.length / m.plays} f="p1" /></div><div className="rp-sub">{n(m.ok.length)} of {n(m.plays)} plays checked on a recorded clip</div></div>
        </div>
        <div className="pp-mini rp-mini rp-mini--3">
          <div><span>Not verified</span><b className="num"><Num v={m.plays - m.ok.length} /></b></div>
          <div><span>Views refunded</span><b className="num"><Num v={m.refundedViews} /></b></div>
          <div><span>Delivered vs booked</span><b className="num"><Num v={m.views / BOOKED_VIEWS} f="p0" /></b></div>
        </div>
        <div className="rp-h"><span>When the ad played, Oslo time</span></div>
        <div className="rp-hours" role="img" aria-label="Ad plays per hour, peaking between 19:00 and 22:00">
          {m.hourly.map((v, h) => <i key={h} className={v === maxHour ? "top" : undefined} style={{ "--h": (v / maxHour) * 100 } as React.CSSProperties} title={`${String(h).padStart(2, "0")}:00 · ${v} plays`} />)}
        </div>
        <div className="rp-hx"><span>00</span><span>06</span><span>12</span><span>18</span></div>
        <div className="rp-scroll">
          <div className="rp-t" style={{ marginTop: 26 }}>
            <div className="rp-r rp-r--th" style={{ gridTemplateColumns: "1fr 1.1fr 1fr .6fr .6fr .9fr" }}><span>Time</span><span>Streamer</span><span>Ad unit</span><span className="n">Viewers</span><span className="n">Clicks</span><span>Status</span></div>
            {plays.slice(0, 8).map((p) => (
              <div key={p.t + p.streamer} className="rp-r" style={{ gridTemplateColumns: "1fr 1.1fr 1fr .6fr .6fr .9fr" }}>
                <span className="d num">{clock(p.t)}</span><span>{p.streamer}</span><span className="d">{p.format}</span>
                <span className="n">{n(p.viewers)}</span><span className="n">{n(p.vClicks)}</span>
                <span>{p.verified ? <i className="sc">Verified · clip</i> : <i className="sc sc--hot"><span className="rp-dot" />Refunded</i>}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="rp-note">The live report lists every play like this, {n(m.plays)} in this campaign, each with its clip.</p>
      </>
    ),

    Chat: (
      <>
        <div className="r-top">
          <div><div className="r-k">Chat brand mentions</div><div className="r-num num"><Num v={m.mentions} /></div><div className="rp-sub">58% positive · 33% neutral · 9% negative</div></div>
        </div>
        <div className="rp-scroll">
          <div className="rp-t" style={{ marginTop: 26 }}>
            <div className="rp-r rp-r--th" style={{ gridTemplateColumns: "60px 1.3fr 1.3fr 90px" }}><span>Time</span><span>Message</span><span>Translation</span><span>Score</span></div>
            {CHAT.map(([t, ch, msg, en, sc]) => (
              <div key={msg} className="rp-r" style={{ gridTemplateColumns: "60px 1.3fr 1.3fr 90px" }}>
                <span className="d num">{t}</span>
                <span>{msg.startsWith("!") ? <code>{msg}</code> : msg}<small className="d" style={{ display: "block", fontSize: 12 }}>in {ch}</small></span>
                <span className="d">{en}</span>
                <span><i className={`sc${sc === "Intent" ? " sc--hot" : ""}`}>{sc}</i></span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 30, maxWidth: 520 }}>
          <List title="Poll: “What gets you through a late stream?” · 3,412 answers" rows={POLL} digits={0} />
        </div>
      </>
    ),
  };

  const STEPS: { name: TabName; d: string }[] = [
    { name: "Streamers", d: "Every streamer who ran the ad, with views, clicks and CTR. The three that stood out are flagged." },
    { name: "Categories", d: "What was being streamed when the ad played, and how each category performed." },
    { name: "Audience", d: "Country, region, device, gender and platform for the people who saw the ad." },
    { name: "Delivery", d: "Every play is checked against a recorded clip. Plays that miss are not billed." },
    { name: "Chat", d: "Brand mentions in chat with a translation and a score, plus the poll answers." },
  ];

  return (
    <FeaturePage
      path="/report/sample"
      crumb="Sample report"
      seoTitle="Sample campaign report | Beta Ads"
      seoDescription="What a Beta Ads livestream campaign report contains: completed views, verified and unique clicks, delivery per streamer and category, audience, verification and chat tracking. Fictional brand and numbers."
      kicker="Reporting · Sample report"
      title="A sample report, every number in it."
      lead={`This is what you get after a campaign. The layout and every metric are the real Beta Ads report. ${BRAND}, the 16 streamers and the numbers are made up.`}
      hero={{ visual: <Sheet>{tabBody.Overview}</Sheet>, caption: "Overview: delivery against what was booked." }}
      sections={[]}
      extra={
        <section className="border-t border-border py-16 md:py-24 mt-16 md:mt-24">
          <div className={W}>
            <ol className="m-0 p-0 list-none space-y-14 md:space-y-20">
              {STEPS.map((x, i) => (
                <li key={x.name}>
                  <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-2 md:gap-10 items-baseline border-t border-border pt-5">
                    <h2 className="m-0 text-xl font-bold tracking-tight"><span className="text-muted-foreground font-semibold mr-3">{String(i + 2).padStart(2, "0")}</span>{x.name}</h2>
                    <p className="m-0 max-w-2xl text-muted-foreground leading-relaxed">{x.d}</p>
                  </div>
                  <div className="mt-6"><Sheet>{tabBody[x.name]}</Sheet></div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      }
      related={[
        ["Reporting", "How the live report and the PDF work.", "/reporting"],
        ["Setup verification", "Every stream checked on air, every play clipped.", "/campaign-compliance"],
        ["Request access", "Get your own login to the platform.", "/login"],
      ]}
      faqTitle="Questions about the report"
      faqs={[
        { q: "Is this a real campaign?", a: `No. ${BRAND}, the streamers and the numbers are made up. The layout and the metrics are the ones in a real Beta Ads report.` },
        { q: "What is the difference between verified and unverified clicks?", a: "Unverified counts every click on the chat link. Verified removes bots and repeat clicks. Unique counts one click per viewer." },
        { q: "Can we follow the campaign while it runs?", a: "Yes. You follow it live in your own login, and get the full report as a PDF when the campaign ends." },
      ]}
      close={{ title: "Want this for your next campaign?", body: "In a 30 minute demo we walk through a real report and plan a campaign for your brand." }}
    />
  );
};

export default SampleReport;
