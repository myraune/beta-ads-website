import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink, Loader2, Search } from "lucide-react";
import { SEO } from "@/components/SEO";
import { W, kicker, h2, BOOKING_URL } from "@/components/working/shared";
import { LIVE_DEALS, SNAPSHOT_DATE } from "@/data/liveDeals";

/* Twitch sponsorship checker. Search a channel, then /api/creator-sponsors reads the
   current title, bio and last 100 VOD titles and Claude says which brands sponsor
   the creator, with the titles as proof. The frames and cards below the search are
   real streams that ran a brand !command on 21 October 2026 (src/data/liveDeals.ts). */

type Hit = { login: string; name: string; avatar: string; live: boolean; game: string; language: string };
type Evidence = { text: string; date: string; url: string; source: "live" | "vod" | "bio" };
type Sponsor = {
  brand: string; category: string; kind: "sponsor" | "affiliate" | "own_brand" | "unclear";
  confidence: "high" | "medium" | "low"; note: string; firstSeen: string; lastSeen: string; streams: number; evidence: Evidence[];
};
type Result = {
  creator: { login: string; name: string; avatar: string; language: string | null; game: string | null; followers: number | null;
    live: { viewers: number; title: string; game: string } | null; vodCount: number; since: string | null };
  sponsors: Sponsor[]; not_sponsors: { token: string; reason: string }[]; summary: string; scannedLines: number;
};

const EXAMPLES = ["AstaBush", "agurin", "Artosis", "Mr_Mammal", "DansGaming"];
const KIND: Record<Sponsor["kind"], string> = { sponsor: "Sponsor", affiliate: "Affiliate code", own_brand: "Own brand", unclear: "Unclear" };
const STEPS = ["Reading the channel and bio", "Reading the last 100 VOD titles", "Checking each brand mention with Claude"];

const fmt = (d: string) => new Date(d + "T12:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
const num = (n: number) => n.toLocaleString("en-US");
const frame = (login: string) => `/checker/${login}.webp`;
const avatar = (login: string) => `/checker/av-${login}.webp`;

/* The curved strip of stream frames under the search, like a smile: the middle
   sits lowest, the ends rise, tilt outwards and fade. */
const ARC = LIVE_DEALS.slice(0, 19);
const FrameArc: React.FC = () => {
  const mid = (ARC.length - 1) / 2;
  return (
    <div className="relative h-[230px] md:h-[300px] overflow-hidden" aria-hidden="true">
      <div className="absolute left-1/2 top-0 w-0">
        {ARC.map((d, i) => {
          const o = i - mid;
          const x = o * 128;
          const y = 120 - Math.abs(o) ** 1.55 * 9;
          const r = o * 2.4;
          const fade = Math.max(0, 1 - Math.abs(o) / (mid + 1.5));
          return (
            <div key={d.login} className="absolute w-[120px] md:w-[150px] aspect-video rounded-lg overflow-hidden shadow-[0_12px_30px_-12px_rgba(15,16,18,.35)] bg-muted"
              style={{ transform: `translate(calc(${x}px - 50%), ${y}px) rotate(${r}deg)`, opacity: 0.35 + fade * 0.65 }}>
              <img src={frame(d.login)} alt="" loading="lazy" className="w-full h-full object-cover" />
              <span className="absolute left-1.5 bottom-1.5 text-[10px] font-semibold px-1.5 py-0.5 rounded bg-black/70 text-white">{d.brand}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const SponsorshipChecker: React.FC = () => {
  const [q, setQ] = useState("");
  const [hits, setHits] = useState<Hit[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  // Channel autocomplete, debounced.
  useEffect(() => {
    const term = q.trim();
    if (term.length < 2) { setHits([]); return; }
    const t = setTimeout(async () => {
      try {
        const r = await fetch(`/api/creator-sponsors?q=${encodeURIComponent(term)}`);
        const d = await r.json();
        setHits(d.results ?? []);
      } catch { setHits([]); }
    }, 220);
    return () => clearTimeout(t);
  }, [q]);

  useEffect(() => {
    const close = (e: MouseEvent) => { if (!boxRef.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  useEffect(() => {
    if (!loading) return;
    setStep(0);
    const t = setInterval(() => setStep(s => Math.min(s + 1, STEPS.length - 1)), 2600);
    return () => clearInterval(t);
  }, [loading]);

  const check = async (login: string, scroll = false) => {
    const name = login.trim();
    if (!name || loading) return;
    if (scroll) topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setQ(name); setOpen(false); setError(""); setResult(null); setLoading(true);
    try {
      const r = await fetch("/api/creator-sponsors", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ login: name }) });
      const d = await r.json();
      if (!r.ok) setError(d.error ?? "The check failed.");
      else setResult(d);
    } catch {
      setError("The check failed. Try again in a minute.");
    } finally {
      setLoading(false);
    }
  };

  const idle = !loading && !result && !error;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title="Twitch Sponsor Checker: Who Sponsors a Streamer? | Beta Ads"
        description="Search any Twitch streamer and see which brands sponsor them. We read stream titles, the bio and the last 100 VODs, and show the proof for every deal."
        canonical="/twitch-sponsorship-checker"
        ogType="website"
      />

      {/* ── HERO: centred search ── */}
      <header ref={topRef} className={`${W} pt-28 md:pt-36 text-center scroll-mt-20`}>
        <h1 className="text-[2.6rem] leading-[1.04] sm:text-6xl lg:text-[4.4rem] font-bold tracking-[-0.035em] max-w-4xl mx-auto m-0">
          The sponsorship search <span className="text-muted-foreground font-light">engine for Twitch.</span>
        </h1>
        <p className="mt-6 max-w-xl mx-auto text-lg text-muted-foreground leading-relaxed">
          Search a streamer and see every brand that pays them, from the live title, the bio and the last 100 VODs.
          Claude keeps the deals and drops chat commands like !discord and !prime.
        </p>

        <form className="mt-9 max-w-2xl mx-auto text-left" onSubmit={e => { e.preventDefault(); check(q); }}>
          <div ref={boxRef} className="relative">
            <div className="flex items-center gap-2 rounded-full border border-border bg-card pl-5 pr-1.5 h-14 shadow-[0_1px_2px_rgba(15,16,18,.04),0_16px_32px_-24px_rgba(15,16,18,.2)] focus-within:border-foreground/40 transition-colors">
              <Search className="w-4 h-4 text-muted-foreground shrink-0" aria-hidden="true" />
              <input
                value={q}
                onChange={e => { setQ(e.target.value); setOpen(true); }}
                onFocus={() => setOpen(true)}
                placeholder="Search a Twitch streamer"
                aria-label="Twitch channel"
                autoComplete="off"
                spellCheck={false}
                className="flex-1 min-w-0 bg-transparent border-0 outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 shadow-none text-base placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                disabled={loading || !q.trim()}
                className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full bg-primary text-primary-foreground text-sm font-semibold disabled:opacity-40 hover:opacity-90 transition-opacity"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                Check
              </button>
            </div>

            {open && hits.length > 0 && !loading && (
              <ul className="absolute z-20 left-0 right-0 mt-2 rounded-2xl border border-border bg-card shadow-xl overflow-hidden list-none p-1.5 m-0">
                {hits.map(h => (
                  <li key={h.login}>
                    <button type="button" onClick={() => check(h.login)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted text-left">
                      <img src={h.avatar} alt="" className="w-8 h-8 rounded-full" loading="lazy" />
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold truncate">{h.name}</span>
                        <span className="block text-xs text-muted-foreground truncate">{h.game || "Twitch"}{h.language ? ` · ${h.language.toUpperCase()}` : ""}</span>
                      </span>
                      {h.live && <span className="inline-flex items-center gap-1.5 text-xs font-semibold"><span className="w-1.5 h-1.5 rounded-full bg-signal" />Live</span>}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground">
            <span>Try</span>
            {EXAMPLES.map(x => (
              <button key={x} type="button" onClick={() => check(x)} disabled={loading}
                className="h-8 px-3 rounded-full border border-border hover:border-foreground/40 text-foreground transition-colors disabled:opacity-40">
                {x}
              </button>
            ))}
          </div>
        </form>
      </header>

      {idle ? (
        <FrameArc />
      ) : (
        <section className={`${W} pt-12 pb-20 min-h-[240px]`} aria-live="polite">
          {loading && (
            <div className="max-w-2xl mx-auto rounded-2xl border border-border p-6">
              <ol className="m-0 p-0 list-none space-y-3">
                {STEPS.map((s, i) => (
                  <li key={s} className={`flex items-center gap-3 text-sm ${i <= step ? "text-foreground" : "text-muted-foreground/60"}`}>
                    {i < step ? <span className="w-4 text-center">✓</span> : i === step ? <Loader2 className="w-4 h-4 animate-spin" /> : <span className="w-4" />}
                    {s}
                  </li>
                ))}
              </ol>
            </div>
          )}
          {error && <p className="max-w-2xl mx-auto rounded-2xl border border-border p-6 text-sm m-0">{error}</p>}
          {result && <ResultView r={result} />}
        </section>
      )}

      {/* ── LIVE DEALS: dark banner ── */}
      <section className={`${W} pt-10 md:pt-16`}>
        <div className="rounded-[28px] bg-[#0E0F12] text-white px-5 py-14 md:px-12 md:py-20">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className={`${h2} text-white`}>47 creators. 20 brands. <span className="text-white/45 font-light">One morning.</span></h2>
            <p className="mt-4 text-white/60 leading-relaxed">
              Live Twitch streams with a brand in the title on {SNAPSHOT_DATE}. Pick one to see the full sponsor history.
            </p>
          </div>
          <div className="mt-10 md:mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {LIVE_DEALS.slice(0, 12).map(d => (
              <button key={d.login} type="button" onClick={() => check(d.login, true)}
                className="group text-left rounded-xl overflow-hidden bg-white/[0.04] hover:bg-white/[0.08] transition-colors">
                <span className="relative block aspect-video overflow-hidden">
                  <img src={frame(d.login)} alt={`${d.name} live on Twitch`} loading="lazy" className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" />
                  <span className="absolute left-2 top-2 inline-flex items-center gap-1.5 text-[11px] font-semibold px-1.5 h-5 rounded bg-black/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-signal" />{num(d.viewers)}
                  </span>
                  <span className="absolute right-2 bottom-2 text-[11px] font-bold px-2 h-6 inline-flex items-center rounded-full bg-white text-[#0F1012]">{d.brand}</span>
                </span>
                <span className="flex items-center gap-2.5 px-3 py-3">
                  <img src={avatar(d.login)} alt="" loading="lazy" className="w-6 h-6 rounded-full" />
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold truncate">{d.name}</span>
                    <span className="block text-xs text-white/50 truncate">{d.game}</span>
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEARCH. PROVE. PITCH. ── */}
      <section className={`${W} pt-4 md:pt-6`}>
        <div className="rounded-[28px] bg-[#0E0F12] text-white px-5 py-14 md:px-12 md:py-20">
          <h2 className={`${h2} text-white text-center`}>Search. Prove. <span className="text-white/45 font-light">Pitch.</span></h2>
          <p className="mt-4 text-white/60 text-center">What a brand already bought on stream, before you call them.</p>

          <div className="mt-10 md:mt-12 space-y-3 md:space-y-4">
            <Row n="01" title="Search any streamer" body="Type a name and pick the channel. Live channels show first, with their game and language.">
              <div className="rounded-xl bg-white text-[#0F1012] p-4 shadow-2xl">
                <div className="flex items-center gap-2 h-10 rounded-full border border-[#E8E8E6] px-4 text-sm"><Search className="w-3.5 h-3.5 text-[#6B7079]" />agur<span className="w-px h-4 bg-[#0F1012] animate-pulse" /></div>
                <div className="mt-2 rounded-xl border border-[#E8E8E6] p-1">
                  <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#F5F5F3]"><img src={avatar("agurin")} alt="" className="w-7 h-7 rounded-full" /><span className="text-sm font-semibold">agurin</span><span className="text-xs text-[#6B7079] truncate">League of Legends · DE</span><span className="ml-auto inline-flex items-center gap-1.5 text-xs font-semibold"><span className="w-1.5 h-1.5 rounded-full bg-signal" />Live</span></div>
                  <div className="px-3 py-2 text-sm text-[#6B7079]">AGurbs</div>
                  <div className="px-3 py-2 text-sm text-[#6B7079]">AgurrrS</div>
                </div>
              </div>
            </Row>
            <Row n="02" title="Proof for every deal" body="Each brand comes with first and last date seen, the number of streams and the exact titles, linked to the VOD." flip>
              <div className="rounded-xl bg-[#16171B] p-4 shadow-2xl ring-1 ring-white/10">
                <div className="flex items-center"><span className="font-bold">SteelSeries</span><span className="ml-auto text-[11px] font-bold px-2 h-6 inline-flex items-center rounded-full bg-white text-[#0F1012]">Sponsor</span></div>
                <div className="mt-3 grid grid-cols-3 gap-3 text-xs"><div><div className="text-white/45">First seen</div><div className="font-semibold">25 Sep 2026</div></div><div><div className="text-white/45">Last seen</div><div className="font-semibold">22 Oct 2026</div></div><div><div className="text-white/45">Streams</div><div className="font-semibold">28</div></div></div>
                <div className="mt-3 border-t border-white/10 text-xs">
                  {["AGURIN DOESN'T SHAVE UNTIL NA RANK 1 | !steelseries NEW !khazix", "NO SHAVE UNTIL NA RANK 1 | !steelseries NEW !khazix !course", "NA RANK 1 TIME| !steelseries NEW !khazix !course !borders"].map(t => (
                    <div key={t} className="py-2 border-b border-white/10 last:border-0 truncate text-white/60">{t}</div>
                  ))}
                </div>
              </div>
            </Row>
            <Row n="03" title="Noise thrown out" body="A keyword list counts !prime and !khazix as brands. Claude reads them in context and tells you why they are not deals.">
              <div className="rounded-xl bg-white text-[#0F1012] p-4 shadow-2xl text-sm space-y-2.5">
                {[["!prime", "Prime Gaming sub reminder"], ["!khazix", "League of Legends champion guide"], ["!course", "The creator's own coaching course"], ["!discord", "Community server"]].map(([k, v]) => (
                  <div key={k} className="flex items-baseline gap-3"><span className="font-semibold w-20 shrink-0">{k}</span><span className="text-[#6B7079] min-w-0 truncate">{v}</span><span className="ml-auto text-xs font-semibold text-[#C8243A] shrink-0">Not a deal</span></div>
                ))}
              </div>
            </Row>
          </div>
        </div>
      </section>

      {/* ── CLOSE ── */}
      <section className={`${W} py-20 md:py-28 text-center`}>
        <h2 className={`${h2} max-w-3xl mx-auto`}>Want your brand in these streams? <span className="text-muted-foreground font-light">We run it for you.</span></h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" data-cta="book"
            className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
            Book a demo <ArrowRight className="w-4 h-4" />
          </a>
          <Link to="/streamer-explorer" className="inline-flex items-center h-11 px-6 rounded-full border border-border text-sm font-semibold hover:border-foreground/40 transition-colors">
            Streamer Explorer
          </Link>
        </div>
      </section>
    </div>
  );
};

const Row: React.FC<{ n: string; title: string; body: string; flip?: boolean; children: React.ReactNode }> = ({ n, title, body, flip, children }) => (
  <div className="rounded-2xl bg-white/[0.035] p-6 md:p-10 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
    <div className={flip ? "md:order-2" : ""}>
      <div className="text-xs text-white/40 font-semibold">{n}</div>
      <h3 className="mt-3 text-2xl font-bold tracking-tight m-0">{title}</h3>
      <p className="mt-3 mb-0 text-white/60 leading-relaxed max-w-md">{body}</p>
    </div>
    <div className={`min-w-0 ${flip ? "md:order-1" : ""}`}>{children}</div>
  </div>
);

const ResultView: React.FC<{ r: Result }> = ({ r }) => {
  const c = r.creator;
  return (
    <div className="grid lg:grid-cols-[minmax(0,1fr)_340px] gap-8 items-start text-left">
      <div className="min-w-0">
        <div className="flex items-center gap-4 flex-wrap">
          <img src={c.avatar} alt="" className="w-14 h-14 rounded-full" />
          <div className="min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-2xl font-bold tracking-tight m-0">{c.name}</h2>
              {c.live && <span className="inline-flex items-center gap-1.5 text-xs font-semibold"><span className="w-1.5 h-1.5 rounded-full bg-signal" />Live · {num(c.live.viewers)}</span>}
            </div>
            <p className="m-0 text-sm text-muted-foreground">
              {[c.followers != null ? `${num(c.followers)} followers` : null, c.game, c.language?.toUpperCase()].filter(Boolean).join(" · ")}
            </p>
          </div>
          <a href={`https://twitch.tv/${c.login}`} target="_blank" rel="noopener noreferrer" className="ml-auto text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5">
            twitch.tv/{c.login} <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <p className="mt-6 text-base leading-relaxed max-w-2xl">{r.summary}</p>

        <div className="mt-8 space-y-4">
          {r.sponsors.length === 0 && (
            <p className="rounded-2xl border border-border p-6 text-sm text-muted-foreground m-0">No brand deals in the titles we could read.</p>
          )}
          {r.sponsors.map(s => (
            <article key={s.brand} className="rounded-2xl border border-border bg-card p-5 md:p-6">
              <div className="flex items-start gap-4 flex-wrap">
                <div className="min-w-0">
                  <h3 className="text-lg font-bold tracking-tight m-0">{s.brand}</h3>
                  <p className="m-0 text-sm text-muted-foreground">{s.category}</p>
                </div>
                <div className="ml-auto flex items-center gap-2 text-xs font-semibold">
                  <span className="px-2.5 h-7 inline-flex items-center rounded-full bg-foreground text-background">{KIND[s.kind]}</span>
                  {s.confidence !== "high" && <span className="px-2.5 h-7 inline-flex items-center rounded-full border border-border text-muted-foreground">{s.confidence} confidence</span>}
                </div>
              </div>
              <dl className="mt-4 grid grid-cols-3 gap-4 max-w-md m-0">
                <div><dt className="text-xs text-muted-foreground">First seen</dt><dd className="m-0 text-sm font-semibold">{fmt(s.firstSeen)}</dd></div>
                <div><dt className="text-xs text-muted-foreground">Last seen</dt><dd className="m-0 text-sm font-semibold">{fmt(s.lastSeen)}</dd></div>
                <div><dt className="text-xs text-muted-foreground">Streams</dt><dd className="m-0 text-sm font-semibold">{s.streams}</dd></div>
              </dl>
              <p className="mt-4 mb-0 text-sm text-muted-foreground leading-relaxed">{s.note}</p>
              <ul className="mt-4 m-0 p-0 list-none border-t border-border">
                {s.evidence.map(e => (
                  <li key={e.url + e.date} className="border-b border-border last:border-b-0">
                    <a href={e.url} target="_blank" rel="noopener noreferrer" className="flex items-baseline gap-3 py-2.5 text-sm hover:text-foreground group">
                      <span className="w-20 shrink-0 text-xs text-muted-foreground">{e.source === "live" ? "Live now" : e.source === "bio" ? "Bio" : fmt(e.date)}</span>
                      <span className="min-w-0 truncate text-muted-foreground group-hover:text-foreground">{e.text}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>

      <aside className="rounded-2xl bg-muted/60 p-5 md:p-6 text-sm">
        <div className={`${kicker} mb-3`}>What we read</div>
        <p className="m-0 text-muted-foreground leading-relaxed">
          {r.scannedLines} different titles from {c.vodCount} VODs{c.since ? ` since ${fmt(c.since)}` : ""}, the live title and the bio.
          Twitch keeps VODs for a limited time, so older deals may be missing.
        </p>
        {r.not_sponsors.length > 0 && (
          <>
            <div className={`${kicker} mt-6 mb-3`}>Not counted</div>
            <ul className="m-0 p-0 list-none space-y-2">
              {r.not_sponsors.map(n => (
                <li key={n.token} className="leading-snug"><span className="font-semibold">{n.token}</span> <span className="text-muted-foreground">{n.reason}</span></li>
              ))}
            </ul>
          </>
        )}
      </aside>
    </div>
  );
};

export default SponsorshipChecker;
