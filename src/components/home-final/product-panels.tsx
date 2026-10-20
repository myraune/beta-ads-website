import React from "react";
import { TwitchMark, YouTubeMark, KickMark } from "./marks";
import { Corners } from "./panels";
import { delivery, headline, poll, verification, vodChannels, fmt } from "@/components/case-surfshark-finland/data";

/* Coded product panels for the Platform pages, in the same dark language as the
   homepage tour panels (panels.tsx): rail / main / side composition, real stream
   frames with pick marks, .num numerals, red only on live dots and hot chips.
   They replace the app screenshots.

   Wrap each one in <PanelFrame>: the transparent .bf wrapper becomes a size
   container (home-overrides.css), so the panels collapse on their own width,
   not the viewport. No reveal class: no scroll observer runs off the homepage.

   Sources:
   - Surfshark Finland figures: case-surfshark-finland/data.ts. Stills are the
     real campaign frames from the case page.
   - Streamer avg viewers / followers: src/data (TwitchTracker / Twitch snapshots).
   - Danniz sponsorship numbers: Samsung S25 Ultra and Kristiania case pages.
   - Flagged clip (theturtza, Surfshark Finland): the real Clip Review view that
     was on /brand-safety; transcript lines and scores are copied from it.
   Illustrative UI (said in the aria-labels): the cumulative curve between the
   real start and end, category numbers, live viewer counts, the clean
   Samsung transcript and the clip timestamps. */

const FI = "/lovable-uploads/case-surfshark-finland";
const CR = "/lovable-uploads/creators";

/** The transparent .bf wrapper every panel needs outside the homepage. */
export const PanelFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bf" style={{ background: "transparent" }}>{children}</div>
);

const PMARK = { twitch: TwitchMark, youtube: YouTubeMark, kick: KickMark } as const;
type Platform = keyof typeof PMARK;

const Pm: React.FC<{ p: Platform }> = ({ p }) => {
  const M = PMARK[p];
  return <span className="pp-pm"><M /></span>;
};

/** A zoomed crop of a larger still: scale around the focal point. */
const Crop: React.FC<{ src: string; at: string; zoom: number; className: string }> = ({ src, at, zoom, className }) => (
  <span className={`pp-crop ${className}`}>
    <img src={src} alt="" loading="lazy" style={{ objectPosition: at, transformOrigin: at, transform: `scale(${zoom})` }} />
  </span>
);

const Ava: React.FC<{ src?: string; pos?: string; zoom?: number; name: string; size?: "s" | "m" | "l"; square?: boolean }> = ({ src, pos, zoom, name, size = "s", square }) =>
  src && pos && zoom ? (
    <Crop src={src} at={pos} zoom={zoom} className={`pp-ava pp-ava--${size}${square ? " pp-ava--sq" : ""}`} />
  ) : src ? (
    <img className={`pp-ava pp-ava--${size}${square ? " pp-ava--sq" : ""}`} src={src} alt="" loading="lazy" />
  ) : (
    <span className={`pp-ava pp-ava--${size} pp-ava--i${square ? " pp-ava--sq" : ""}`}>{name.replace(/^Channel /, "")[0].toUpperCase()}</span>
  );

const Cb: React.FC<{ on?: boolean; children: React.ReactNode }> = ({ on, children }) => (
  <li className={on ? "on" : undefined}><i className="pp-cb" aria-hidden="true" />{children}</li>
);

const Bar: React.FC<{ pct: number; strong?: boolean }> = ({ pct, strong }) => (
  <span className={`pp-bar${strong ? " pp-bar--s" : ""}`}><i style={{ width: `${Math.max(2, Math.min(100, pct))}%` }} /></span>
);

/** A real stream frame in the .preview treatment, with an optional pick box. */
const Shot: React.FC<{
  src: string;
  tag?: React.ReactNode;
  pick?: [number, number, number, number];
  chip?: React.ReactNode;
  className?: string;
}> = ({ src, tag, pick, chip, className }) => (
  <div className={`preview pp-shot${className ? ` ${className}` : ""}`} aria-hidden="true">
    <img src={src} alt="" loading="lazy" />
    {pick && (
      <span className="pp-pick" style={{ left: `${pick[0]}%`, top: `${pick[1]}%`, width: `${pick[2]}%`, height: `${pick[3]}%` }}>
        <Corners />
      </span>
    )}
    {tag && <span className="pv-tag">{tag}</span>}
    {chip && <span className="pp-shot__chip">{chip}</span>}
  </div>
);

/* ── 1. Dashboard ─────────────────────────────────────────────────────────── */

/* Cumulative completed live views, 1 Aug to 1 Sep. Start (0), the 100,000
   bought and the end (119,041) are real; the daily weights between are
   illustrative, so the curve carries no intermediate numbers. */
const WTS = [3, 4, 4, 5, 5, 3, 3, 4, 5, 6, 5, 4, 3, 5, 6, 6, 5, 4, 4, 5, 6, 7, 6, 4, 4, 6, 7, 7, 6, 5, 4];
const CUM = WTS.reduce<number[]>((a, w) => [...a, (a.length ? a[a.length - 1] : 0) + w], [0]);
const CW = 600;
const CH = 150;
const TOP = 130000;
const yOf = (v: number) => CH - (v / TOP) * CH;
const PTS = CUM.map((c, i) => [(i / (CUM.length - 1)) * CW, yOf((c / CUM[CUM.length - 1]) * 119041)] as const);
const LINE = PTS.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
const BOUGHT_Y = yOf(100000);

export const DashboardPanel: React.FC = () => (
  <div
    className="panel pp-dash dui"
    role="img"
    aria-label="Campaign dashboard for Surfshark VPN Finland, 1 August to 1 September 2026: 119,041 completed live views against 100,000 bought, 1,281 clicks, 1.08% CTR, 202 streams, 759 ad plays and 964 hours watched, with a delivery curve, the latest ad play on stream and the poll result. Illustrative UI."
  >
    <div className="r-side">
      <div className="r-brand">Surfshark</div>
      <div className="r-camp">VPN Finland, 1 Aug to 1 Sep</div>
      <ul className="r-nav">
        <li className="on"><i />Overview</li>
        <li><i />Setup verification</li>
        <li><i />Chat tracking</li>
        <li><i />Replay reach</li>
        <li><i />PDF report</li>
      </ul>
    </div>
    <div className="r-main">
      <div className="r-top">
        <div>
          <div className="r-k">Completed live views</div>
          <div className="r-num num">{fmt(headline.viewsDelivered)}</div>
        </div>
        <div className="r-states">
          <span className="seg"><b className="on">Live</b><b>Live + replays</b></span>
          <span className="tbtn tbtn--dark">Export PDF</span>
        </div>
      </div>
      <div className="pp-mini">
        <div><span>Clicks</span><b className="num">{fmt(headline.clicks)}</b></div>
        <div><span>CTR</span><b className="num">{headline.ctr}</b></div>
        <div><span>Streams</span><b className="num">{fmt(verification.streams)}</b></div>
        <div><span>Ad plays</span><b className="num">{fmt(verification.adPlays)}</b></div>
        <div><span>Hours watched</span><b className="num">{fmt(verification.hoursWatched)}</b></div>
      </div>
      <div className="pp-curve">
        <div className="pp-curve__plot">
          <svg viewBox={`0 0 ${CW} ${CH}`} preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="pp-curve-fill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#fff" stopOpacity=".14" />
                <stop offset="1" stopColor="#fff" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={`${LINE} L${CW} ${CH} L0 ${CH} Z`} fill="url(#pp-curve-fill)" />
            <line x1="0" x2={CW} y1={BOUGHT_Y} y2={BOUGHT_Y} className="pp-curve__bought" />
            <path d={LINE} className="pp-curve__line" />
          </svg>
          <span className="pp-curve__lbl" style={{ top: `${(BOUGHT_Y / CH) * 100}%` }}>Bought 100,000</span>
          <span className="pp-curve__end" style={{ top: `${(yOf(119041) / CH) * 100}%` }}><b className="num">119,041</b></span>
        </div>
        <div className="pp-curve__x"><span>1 Aug</span><span>15 Aug</span><span>1 Sep</span></div>
      </div>
    </div>
    <div className="b-side">
      <div className="bcard">
        <div className="bcard-h">Latest ad play <span className="pp-dim">Just Chatting</span></div>
        <Shot src={`${FI}/just-chatting.webp`} pick={[0, 29, 12.5, 33]} />
      </div>
      <div className="bcard">
        <div className="bcard-h">Poll <span className="pp-dim num">{fmt(headline.votes)} votes</span></div>
        <div className="field q pp-q1">{poll.questionEn}</div>
        {poll.options.slice(0, 2).map((o, i) => (
          <div key={o.en} className="pp-optbar">
            <span>{o.en}</span><b className="num">{o.pct}%</b>
            <Bar pct={o.pct} strong={i === 0} />
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ── 2. Streamer Explorer ─────────────────────────────────────────────────── */

type Row = { h: string; img?: string; p: Platform; c: string; l: string; cat: string; avg: number; fol: number; added?: boolean };

/* Avg viewers and followers: TwitchTracker / Twitch snapshots in src/data. */
const STREAMERS: Row[] = [
  { h: "perra", p: "twitch", c: "Sweden", l: "Swedish", cat: "Just Chatting", avg: 1580, fol: 185174 },
  { h: "henksuliini", img: `${CR}/henksuliini.webp`, p: "twitch", c: "Finland", l: "Finnish", cat: "Just Chatting", avg: 544, fol: 113711, added: true },
  { h: "detoo", img: `${CR}/detoo.jpg`, p: "twitch", c: "Norway", l: "Norwegian", cat: "IRL", avg: 403, fol: 85915, added: true },
  { h: "Klokkismann", img: `${CR}/klokkismann.jpg`, p: "twitch", c: "Norway", l: "Norwegian", cat: "Minecraft", avg: 166, fol: 15922 },
  { h: "Jonieboi", img: `${CR}/jonieboi.png`, p: "twitch", c: "Norway", l: "Norwegian", cat: "GTA V", avg: 137, fol: 24339 },
  { h: "Danniz", img: `${CR}/danniz.png`, p: "twitch", c: "Norway", l: "Norwegian", cat: "Just Chatting", avg: 105, fol: 44354, added: true },
];

export const ExplorerPanel: React.FC = () => {
  const rows = STREAMERS;
  const list = rows.filter((r) => r.added);
  return (
    <div
      className="panel pp-exp dui"
      role="img"
      aria-label="Streamer Explorer across Twitch, YouTube and Kick: filters for platform, country, language and category, a table of streamers including perra, henksuliini, detoo, Klokkismann, Jonieboi and Danniz with top category, average viewers and followers, and a shortlist of three. Illustrative UI."
    >
      <div className="pp-rail">
        <div className="pp-rail__h">Filters</div>
        <div className="pp-fg">
          <div className="pp-fg__k">Platform</div>
          <ul className="pp-cbs">
            <Cb on>Twitch</Cb>
            <Cb on>YouTube</Cb>
            <Cb on>Kick</Cb>
          </ul>
        </div>
        <div className="pp-fg">
          <div className="pp-fg__k">Country</div>
          <div className="pp-tags"><span className="chip">Norway</span><span className="chip">Sweden</span><span className="chip">Finland</span></div>
        </div>
        <div className="pp-fg">
          <div className="pp-fg__k">Language</div>
          <div className="field pp-sel">Any language</div>
        </div>
        <div className="pp-fg">
          <div className="pp-fg__k">Category</div>
          <div className="field pp-sel">All categories</div>
        </div>
      </div>
      <div className="b-main">
        <div className="b-head">
          <div>
            <div className="b-title">Streamer Explorer</div>
            <div className="b-k num">39,445 streamers · 37,599 recently active</div>
          </div>
          <div className="field pp-search">Search streamers</div>
        </div>
        <div className="pp-tbl pp-tbl--exp">
          <div className="pp-tr pp-th"><span>Streamer</span><span>Top category</span><span className="pp-r">Avg viewers</span><span className="pp-r">Followers</span><span /></div>
          {rows.map((r) => (
            <div key={r.h} className="pp-tr">
              <span className="pp-who">
                <Ava src={r.img} name={r.h} />
                <span className="pp-who__t"><span className="pp-who__n"><b>{r.h}</b><Pm p={r.p} /></span><small>{r.c} · {r.l}</small></span>
              </span>
              <span className="pp-dim">{r.cat}</span>
              <span className="pp-r num pp-strong">{fmt(r.avg)}</span>
              <span className="pp-r num">{fmt(r.fol)}</span>
              <span className="pp-r"><i className={`pp-add${r.added ? " pp-add--on" : ""}`}>{r.added ? "Added" : "Add"}</i></span>
            </div>
          ))}
        </div>
      </div>
      <div className="b-side pp-short">
        <div className="bcard">
          <div className="bcard-h">Shortlist <span className="pp-dim num">{list.length}</span></div>
          <ul className="pp-shl">
            {list.map((r) => (
              <li key={r.h}>
                <Ava src={r.img} name={r.h} size="m" />
                <span><b>{r.h}</b><small>{r.c} · {fmt(r.avg)} avg viewers</small></span>
              </li>
            ))}
          </ul>
          <div className="pp-shl__sum"><span>Combined avg viewers</span><b className="num">{fmt(list.reduce((s, r) => s + r.avg, 0))}</b></div>
          <span className="r-btn pp-shl__btn">Create list</span>
        </div>
      </div>
    </div>
  );
};

/* ── 3. Category Explorer ─────────────────────────────────────────────────── */

const CATS = [
  { n: "Just Chatting", s: 1240, v: 9860, wt: 312000 },
  { n: "Grand Theft Auto V", s: 610, v: 5120, wt: 168000 },
  { n: "Counter-Strike 2", s: 880, v: 4740, wt: 151000 },
  { n: "Minecraft", s: 540, v: 2310, wt: 74000 },
  { n: "Fortnite", s: 470, v: 1980, wt: 61000 },
];
const k = (n: number) => (n >= 1000 ? `${Math.round(n / 1000)}K` : String(n));

export const CategoryPanel: React.FC = () => (
  <div
    className="panel pp-cat dui"
    role="img"
    aria-label="Category Explorer on Twitch for the last 30 days: Just Chatting, Grand Theft Auto V, Counter-Strike 2, Minecraft and Fortnite with active streamers, live viewers and watch time, and three streams live now in Just Chatting. Illustrative UI with example numbers."
  >
    <div className="b-main pp-cat__main">
      <div className="b-head">
        <div>
          <div className="b-title">Category Explorer</div>
          <div className="b-k">Twitch · last 30 days</div>
        </div>
        <span className="seg"><b className="on">Watch time</b><b>Viewers</b></span>
      </div>
      <div className="pp-tbl pp-tbl--cat">
        <div className="pp-tr pp-th"><span>Category</span><span className="pp-r">Streamers</span><span className="pp-r">Live viewers</span><span className="pp-r">Watch time</span></div>
        {CATS.map((c, i) => (
          <div key={c.n} className={`pp-tr pp-tr--bar${i === 0 ? " pp-tr--on" : ""}`}>
            <span className="pp-strong">{c.n}</span>
            <span className="pp-r num">{fmt(c.s)}</span>
            <span className="pp-r num">{fmt(c.v)}</span>
            <span className="pp-r num">{k(c.wt)} h</span>
            <Bar pct={(c.wt / CATS[0].wt) * 100} strong={i === 0} />
          </div>
        ))}
      </div>
    </div>
    <div className="pp-cat__side">
      <div className="pp-cat__h"><span>Live now in Just Chatting</span><span className="v-all"><i className="live-dot" />1,240 live</span></div>
      <div className="pp-thumbs">
        <Shot src={`${FI}/just-chatting.webp`} chip={<><i className="live-dot" />612</>} />
        <Shot src={`${FI}/poll-studio.webp`} chip={<><i className="live-dot" />488</>} />
        <Shot src={`${FI}/drums-chat-command.webp`} chip={<><i className="live-dot" />236</>} />
      </div>
    </div>
  </div>
);

/* ── 4. Streamer profile ──────────────────────────────────────────────────── */

const MOMENTS = [
  { b: "Samsung Galaxy S25 Ultra", d: "53,966 completed views", img: "/home/samsung-s25-stream-a.webp", pos: "30% 62%", zoom: 1.5 },
  { b: "Høyskolen Kristiania", d: "102,696 views, top creator", img: "/lovable-uploads/case-studies/kristiania-hero-poster.jpg", pos: "50% 50%", zoom: 1.6 },
  { b: "Saily", d: "Overlay and chat command", img: "/lovable-uploads/case-studies/saily-overlay-poster.webp", pos: "10% 45%", zoom: 2 },
];

export const ProfilePanel: React.FC = () => (
  <div
    className="panel pp-prof dui"
    role="img"
    aria-label="Streamer profile for Danniz on Twitch, Norway, Norwegian: 105 average viewers, 44,354 followers, 162 hours streamed, a recent stream, and earlier sponsorship moments with Samsung Galaxy S25 Ultra (53,966 completed views), Høyskolen Kristiania (102,696 views) and Saily. Illustrative UI."
  >
    <div className="pp-prof__head">
      <Ava src={`${CR}/danniz.png`} name="Danniz" size="l" />
      <div className="pp-prof__id">
        <div className="pp-prof__n">Danniz <Pm p="twitch" /></div>
        <div className="b-k">Norway · Norwegian · Twitch Partner</div>
      </div>
      <span className="tbtn tbtn--dark">Add to list</span>
    </div>
    <div className="pp-prof__body">
      <div className="pp-prof__l">
        <Shot src="/lovable-uploads/clip-danniz-poster.jpg" tag="Recent stream · Counter-Strike 2" />
        <div className="pp-stats">
          <div><span>Avg viewers</span><b className="num">105</b></div>
          <div><span>Followers</span><b className="num">44,354</b></div>
          <div><span>Streamed</span><b className="num">162 h</b></div>
        </div>
      </div>
      <div className="pp-prof__r">
        <div className="bcard pp-moments">
          <div className="bcard-h">Sponsorship moments</div>
          <ul>
            {MOMENTS.map((m) => (
              <li key={m.b}>
                <Crop src={m.img} at={m.pos} zoom={m.zoom} className="pp-mthumb" />
                <span><b>{m.b}</b><small>{m.d}</small></span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
);

/* ── 5. Live campaign monitor ─────────────────────────────────────────────── */

/* Faces only where the person is known: theturtza is the channel in
   guitar-stream.webp (his name is on screen), henksuliini has his own photo.
   The case stills do not say whose stream they are, so the other channels keep
   an initial rather than a stranger's face. */
const CHANNELS: { h: string; img?: string; pos?: string; zoom?: number; live: boolean; st: string; v: number }[] = [
  { h: "theturtza", img: `${FI}/guitar-stream.webp`, pos: "85% 88%", zoom: 2, live: true, st: "Overlay on", v: 612 },
  { h: "henksuliini", img: `${CR}/henksuliini.webp`, live: true, st: "Overlay on", v: 488 },
  { h: "miikaz", live: true, st: "Between ad moments", v: 236 },
  { h: "ketku", live: false, st: "Live 3 h ago", v: 0 },
  { h: "datrope", live: false, st: "Live yesterday", v: 0 },
];

export const LiveMonitorPanel: React.FC = () => (
  <div
    className="panel pp-mon dui"
    role="img"
    aria-label="Live campaign monitor for Surfshark VPN Finland: 3 of 14 channels live with 1,336 viewers, 2 of them running the overlay right now, a live preview of a stream with the overlay and poll on screen, and a channel list. Illustrative UI."
  >
    <div className="b-main pp-mon__l">
      <div className="b-head">
        <div>
          <div className="b-title">Live campaign monitor</div>
          <div className="b-k">Surfshark VPN Finland</div>
        </div>
        <span className="pill pill--live"><i className="live-dot" />3 live of 14</span>
      </div>
      <Shot src={`${FI}/poll-studio.webp`} tag="Live preview · overlay on" pick={[0, 29, 11.5, 35]} />
      <div className="pp-mini pp-mini--3">
        <div><span>Viewers now</span><b className="num">1,336</b></div>
        <div><span>Overlay on</span><b className="num">2</b></div>
        <div><span>Ad plays today</span><b className="num">31</b></div>
      </div>
    </div>
    <div className="verify pp-mon__r">
      <div className="v-head"><span>Channels</span><span className="v-all"><i className="live-dot" />3 live</span></div>
      <ol className="pp-chl">
        {CHANNELS.map((c) => (
          <li key={c.h} className={c.live ? "live" : undefined}>
            <Ava src={c.img} pos={c.pos} zoom={c.zoom} name={c.h} size="m" square />
            <span className="pp-chl__t"><b>{c.h}</b><small>{c.st}</small></span>
            {c.live ? <span className="pp-chl__v num"><i className="live-dot" />{fmt(c.v)}</span> : <span className="pp-chl__v pp-dim">Offline</span>}
          </li>
        ))}
      </ol>
    </div>
  </div>
);

/* ── 6. Delivery ──────────────────────────────────────────────────────────── */

const Ring: React.FC<{ p: number; label: string; sub: string }> = ({ p, label, sub }) => (
  <li className="pp-ringc">
    <span className="pp-ring" style={{ ["--p" as string]: p } as React.CSSProperties}><b className="num">{p}%</b></span>
    <span><span className="pp-ring__l">{label}</span><span className="pp-ring__s">{sub}</span></span>
  </li>
);

const clipVerified = Math.round((verification.adPlays * verification.clipVerified) / 100);

export const DeliveryPanel: React.FC = () => (
  <div
    className="panel pp-del dui"
    role="img"
    aria-label={`Delivery for Surfshark VPN Finland: a recorded clip of an ad play with the overlay marked, ${verification.clipVerified}% of ${verification.adPlays} ad plays recorded as a clip, ${verification.displayedCorrectly}% displayed correctly and the brand mentioned in ${verification.brandSaid}%. Illustrative UI.`}
  >
    <div className="b-main pp-del__l">
      <div className="b-head">
        <div>
          <div className="b-title">Delivery</div>
          <div className="b-k">Surfshark VPN Finland</div>
        </div>
        <span className="r-btn">All clips</span>
      </div>
      <Shot src={`${FI}/poll-gameplay.webp`} tag="Clip recorded · 00:41:12" pick={[0, 30, 11.5, 34]} />
      <div className="pp-clips" aria-hidden="true">
        {["poll-car", "guitar-stream", "drums-chat-command", "poll-outdoor"].map((f) => (
          <span key={f}><img src={`${FI}/${f}.webp`} alt="" loading="lazy" /><i>Verified</i></span>
        ))}
      </div>
    </div>
    <div className="verify pp-del__r">
      <div className="v-head"><span>Ad detection</span><span className="v-all num">{verification.adPlays} ad plays</span></div>
      <ul className="pp-rings">
        <Ring p={verification.clipVerified} label="Clip recorded" sub={`${fmt(clipVerified)} of ${verification.adPlays} ad plays`} />
        <Ring p={verification.displayedCorrectly} label="Displayed correctly" sub="in each clip" />
        <Ring p={verification.brandSaid} label="Brand mentioned" sub="said on stream" />
      </ul>
      <div className="v-foot num">{fmt(verification.adPlays - clipVerified)} plays without a clip · {fmt(verification.streams)} streams</div>
    </div>
  </div>
);

/* ── 7. Replay reach ──────────────────────────────────────────────────────── */

/* Same rule as the monitor: a face only where it is that creator. */
const REPLAY_IMG: Record<string, string | undefined> = {
  henksuliini: `${CR}/henksuliini.webp`,
};

export const ReplayPanel: React.FC = () => {
  const top = vodChannels.slice(0, 5);
  const max = top[0].views;
  const parts = [
    { l: "Live, billed", v: delivery.live },
    { l: "VOD views", v: delivery.vodViews },
    { l: "Clip views", v: delivery.clipViews },
  ];
  return (
    <div
      className="panel pp-rep dui"
      role="img"
      aria-label={`Replay reach for Surfshark VPN Finland: ${fmt(delivery.combined)} views with replays, of which ${fmt(delivery.live)} live views billed, ${fmt(delivery.vodViews)} VOD views and ${fmt(delivery.clipViews)} clip views, with VOD views for the five biggest channels. Illustrative UI.`}
    >
      <div className="r-main">
        <div className="r-top">
          <div>
            <div className="r-k">Views with replays</div>
            <div className="r-num num">{fmt(delivery.combined)}</div>
          </div>
          <span className="seg"><b>Live</b><b className="on">Live + replays</b></span>
        </div>
        <div className="pp-split" aria-hidden="true">
          {parts.map((p, i) => <i key={p.l} className={`s${i}`} style={{ flexGrow: p.v }} />)}
        </div>
        <div className="pp-legend">
          {parts.map((p, i) => <span key={p.l}><i className={`s${i}`} />{p.l}<b className="num">{fmt(p.v)}</b></span>)}
        </div>
        <div className="pp-tbl pp-tbl--rep">
          <div className="pp-tr pp-th"><span>Channel</span><span className="pp-r">VODs</span><span>VOD views</span><span /></div>
          {top.map((c, i) => (
            <div key={c.channel} className="pp-tr">
              <span className="pp-who"><Ava src={REPLAY_IMG[c.channel]} name={c.channel} square /><b>{c.channel}</b></span>
              <span className="pp-r num pp-dim">{c.vods}</span>
              <Bar pct={(c.views / max) * 100} strong={i === 0} />
              <span className="pp-r num pp-strong">{fmt(c.views)}</span>
            </div>
          ))}
        </div>
        <div className="pp-note">Live views billed. Replays and clips reported on top.</div>
      </div>
    </div>
  );
};

/* ── 8. Poll ──────────────────────────────────────────────────────────────── */

export const PollPanel: React.FC = () => (
  <div
    className="panel pp-poll dui"
    role="img"
    aria-label={`Poll from Surfshark VPN Finland running on a live stream, ${fmt(headline.votes)} votes over ${fmt(headline.polls)} polls: ${poll.options.map((o) => `${o.en} ${o.pct}%`).join(", ")}. Illustrative UI.`}
  >
    <div className="b-main pp-poll__l">
      <div className="b-head">
        <div>
          <div className="b-title">Poll</div>
          <div className="b-k">Surfshark VPN Finland</div>
        </div>
        <span className="chip num">{fmt(headline.polls)} polls</span>
      </div>
      <Shot src={`${FI}/poll-driving.webp`} tag="Poll on stream" pick={[27, 67, 46, 31]} />
    </div>
    <div className="verify pp-poll__r">
      <div className="v-head"><span>Result</span><span className="v-all num">{fmt(headline.votes)} votes</span></div>
      <div className="pp-poll__body">
        <div className="pp-q__fi">{poll.questionFi}</div>
        <div className="pp-q__en">{poll.questionEn}</div>
        <ul className="pp-opts">
          {poll.options.map((o, i) => (
            <li key={o.fi}>
              <div className="pp-opts__t"><span><b>{o.fi}</b><em>{o.en}</em></span><span className="num"><b>{o.pct}%</b><em>{fmt(o.votes)}</em></span></div>
              <Bar pct={o.pct} strong={i === 0} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

/* ── 9. Clip Review ───────────────────────────────────────────────────────── */

type Clip = {
  img: string;
  pick: [number, number, number, number];
  time: string;
  lang: string;
  camp: string;
  meta: [string, string][];
  lines: [React.ReactNode, React.ReactNode][];
  cat: string;
  hot: boolean;
};

const CLIPS: Record<"flagged" | "clean", Clip> = {
  /* The real clip from the Surfshark Finland campaign (theturtza, Clone Hero),
     values and transcript copied from the platform view. */
  flagged: {
    img: `${FI}/guitar-stream.webp`,
    pick: [0, 29, 11.5, 34],
    time: "0:15 / 0:57",
    lang: "Finnish",
    camp: "Surfshark VPN Finland",
    meta: [
      ["Streamer", "theturtza"],
      ["Date", "5 Aug 2026"],
      ["Views", "400"],
      ["Clicks", "12"],
      ["Promotion score", "0.75"],
      ["Brand safety score", "0.80"],
    ],
    lines: [
      [<>No mut hei, jos tarvitte VPN-ää, niin tosta <mark>huutomerkki surfshark</mark>, koodilla turtsa neljä kuukautta kaupan päälle.</>, <>Well hey, if you need a VPN, then from that <mark>exclamation mark Surfshark</mark>, with the code turtsa, four months extra.</>],
      ["Mun tekis mieleen antaa tost sulle sakkoa.", "I feel like giving you a fine for that."],
    ],
    cat: "Obscenity and Profanity",
    hot: true,
  },
  clean: {
    img: "/home/samsung-s25-stream-a.webp",
    pick: [3, 62, 25, 28],
    time: "0:14 / 0:48",
    lang: "Norwegian",
    camp: "Samsung Galaxy S25",
    meta: [
      ["Platform", "Twitch"],
      ["Language", "Norwegian"],
      ["Clip length", "0:48"],
    ],
    lines: [
      [<>Jeg har byttet til <mark>S25</mark> nå, kameraet er helt sinnssykt.</>, <>I have switched to the <mark>S25</mark> now, the camera is insane.</>],
      ["Linken ligger i chatten.", "The link is in the chat."],
    ],
    cat: "No risk",
    hot: false,
  },
};

export const ClipReviewPanel: React.FC<{ variant: "flagged" | "clean" }> = ({ variant }) => {
  const c = CLIPS[variant];
  return (
    <div
      className={`panel pp-clip pp-clip--${variant} dui`}
      role="img"
      aria-label={
        variant === "flagged"
          ? "Clip Review for a Finnish Surfshark clip from theturtza: the recorded frame with the overlay marked, the Finnish transcript and the English translation with the brand mention highlighted, promotion score 0.75, brand safety score 0.80, category Obscenity and Profanity. Illustrative UI."
          : "Clip Review for a Norwegian Samsung Galaxy S25 clip: the recorded frame with the overlay marked, the Norwegian transcript and English translation with the S25 mention highlighted, rated no risk. Illustrative UI."
      }
    >
      <div className="b-head pp-clip__head">
        <div>
          <div className="b-title">Clip Review</div>
          <div className="b-k">{c.camp} · clip 1 of 3</div>
        </div>
        <div className="pp-clip__btns"><span className="r-btn">Reject</span><span className="tbtn tbtn--dark">Approve</span></div>
      </div>
      <div className="pp-meta">
        {c.meta.map(([k2, v]) => <div key={k2}><span>{k2}</span><b className="num">{v}</b></div>)}
        <div><span>Category</span><b><i className={`sc${c.hot ? " pp-sc--hi" : ""}`}>{c.cat}</i></b></div>
      </div>
      <div className="pp-clip__body">
        <Shot src={c.img} tag={`Ad play · ${c.time}`} pick={c.pick} />
        <div className="pp-clip__r">
          <div className="bcard pp-tx">
            <div className="bcard-h">Transcript <span>{c.lang}</span></div>
            {c.lines.map((l, i) => <p key={i}>{l[0]}</p>)}
          </div>
          <div className="bcard pp-tx pp-tx--en">
            <div className="bcard-h">Translation <span>English</span></div>
            {c.lines.map((l, i) => <p key={i}>{l[1]}</p>)}
          </div>
          <ul className="bcard pp-checks">
            <li><span>Overlay displayed</span><b className="pp-ok">Correctly</b></li>
            <li><span>Brand mentioned</span><b className="pp-ok">Yes</b></li>
          </ul>
        </div>
      </div>
    </div>
  );
};
