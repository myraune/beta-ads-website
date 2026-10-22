import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink, Loader2, Search } from "lucide-react";
import { SEO } from "@/components/SEO";
import { W, kicker, h2, BOOKING_URL } from "@/components/working/shared";

/* Twitch sponsorship checker. Search a channel, then /api/creator-sponsors reads the
   current title, bio and last 100 VOD titles and Claude says which brands sponsor
   the creator, with the titles as proof. Examples are channels that ran a brand
   !command on 21 October 2026. */

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

const SponsorshipChecker: React.FC = () => {
  const [q, setQ] = useState("");
  const [hits, setHits] = useState<Hit[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);

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

  const check = async (login: string) => {
    const name = login.trim();
    if (!name || loading) return;
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title="Twitch Sponsor Checker: Who Sponsors a Streamer? | Beta Ads"
        description="Search any Twitch streamer and see which brands sponsor them. We read stream titles, the bio and the last 100 VODs, and show the proof for every deal."
        canonical="/twitch-sponsorship-checker"
        ogType="website"
      />

      <header className={`${W} pt-28 md:pt-36 pb-10`}>
        <div className={`${kicker} mb-5`}>Free tool</div>
        <h1 className="text-[2.6rem] leading-[1.04] sm:text-6xl lg:text-[4.2rem] font-bold tracking-[-0.03em] max-w-4xl m-0">
          Who sponsors this streamer? <span className="text-muted-foreground font-light">See every deal.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          Search a Twitch channel. We read the live title, the bio and the last 100 VODs, and Claude separates real brand
          deals from chat commands like !discord and !prime. Every deal comes with the titles that prove it.
        </p>

        <form
          className="mt-10 max-w-2xl"
          onSubmit={e => { e.preventDefault(); check(q); }}
        >
          <div ref={boxRef} className="relative">
            <div className="flex items-center gap-2 rounded-full border border-border bg-card pl-5 pr-1.5 h-14 focus-within:border-foreground/40 transition-colors">
              <Search className="w-4 h-4 text-muted-foreground shrink-0" aria-hidden="true" />
              <input
                value={q}
                onChange={e => { setQ(e.target.value); setOpen(true); }}
                onFocus={() => setOpen(true)}
                placeholder="Twitch channel, e.g. AstaBush"
                aria-label="Twitch channel"
                autoComplete="off"
                spellCheck={false}
                className="flex-1 min-w-0 bg-transparent border-0 outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 shadow-none text-base placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                disabled={loading || !q.trim()}
                className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-primary text-primary-foreground text-sm font-semibold disabled:opacity-40 hover:opacity-90 transition-opacity"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                Check
              </button>
            </div>

            {open && hits.length > 0 && !loading && (
              <ul className="absolute z-20 left-0 right-0 mt-2 rounded-2xl border border-border bg-card shadow-xl overflow-hidden list-none p-1.5 m-0">
                {hits.map(h => (
                  <li key={h.login}>
                    <button
                      type="button"
                      onClick={() => check(h.login)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted text-left"
                    >
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

          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span>Try:</span>
            {EXAMPLES.map(x => (
              <button key={x} type="button" onClick={() => check(x)} disabled={loading}
                className="h-8 px-3 rounded-full border border-border hover:border-foreground/40 text-foreground transition-colors disabled:opacity-40">
                {x}
              </button>
            ))}
          </div>
        </form>
      </header>

      <section className={`${W} pb-24 min-h-[200px]`} aria-live="polite">
        {loading && (
          <div className="max-w-2xl rounded-2xl border border-border p-6">
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

        {error && <p className="max-w-2xl rounded-2xl border border-border p-6 text-sm m-0">{error}</p>}

        {result && <ResultView r={result} />}
      </section>

      <section className="border-t border-border">
        <div className={`${W} py-20 md:py-28 grid md:grid-cols-2 gap-10 items-end`}>
          <div>
            <div className={`${kicker} mb-4`}>For brands</div>
            <h2 className={h2}>Want your brand in these streams? <span className="text-muted-foreground font-light">We run it for you.</span></h2>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" data-cta="book"
              className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
              Book a demo <ArrowRight className="w-4 h-4" />
            </a>
            <Link to="/streamer-explorer" className="inline-flex items-center h-11 px-6 rounded-full border border-border text-sm font-semibold hover:border-foreground/40 transition-colors">
              Streamer Explorer
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

const ResultView: React.FC<{ r: Result }> = ({ r }) => {
  const c = r.creator;
  return (
    <div className="grid lg:grid-cols-[minmax(0,1fr)_340px] gap-8 items-start">
      <div className="min-w-0">
        <div className="flex items-center gap-4">
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
