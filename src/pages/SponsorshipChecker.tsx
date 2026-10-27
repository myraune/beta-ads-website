import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink, Loader2, Search } from "lucide-react";
import { SEO } from "@/components/SEO";
import { W, kicker, h2, BOOKING_URL } from "@/components/working/shared";
import { LIVE_DEALS, SNAPSHOT_DATE } from "@/data/liveDeals";
import { ExplorerPlans } from "@/components/working/ExplorerPlans";

/* Twitch sponsorship checker. Search a channel, then /api/creator-sponsors reads the
   current title, bio and last 100 VOD titles and Claude says which brands sponsor
   the creator, with the titles as proof. The frames and cards below the search are
   real streams that ran a brand !command on 21 October 2026 (src/data/liveDeals.ts). */

type Hit = { login: string; name: string; avatar: string; live: boolean; game: string; language: string };
type Evidence = { text: string; date: string; url: string; source: "live" | "vod" | "bio" | "command" };
type Sponsor = {
  brand: string; category: string; domain?: string; kind: "sponsor" | "affiliate" | "own_brand" | "unclear";
  confidence: "high" | "medium" | "low"; note: string; firstSeen: string; lastSeen: string; streams: number; evidence: Evidence[];
};
type Result = {
  creator: { login: string; name: string; avatar: string; language: string | null; game: string | null; followers: number | null;
    live: { viewers: number; title: string; game: string } | null; vodCount: number; commandCount?: number; since: string | null };
  sponsors: Sponsor[]; not_sponsors: { token: string; reason: string }[]; summary: string; scannedLines: number;
};

/* Same client logos as the homepage strip. */
const LOGOS: [string, string, number][] = [
  ["samsung", "Samsung", 16], ["logitech", "Logitech", 28], ["komplett", "Komplett", 22], ["steelseries", "SteelSeries", 18],
  ["shure", "Shure", 20], ["glorious", "Glorious", 19], ["foodora", "foodora", 21], ["saily", "Saily", 26],
];

/* Real calls from the checker on 21 October 2026, one per kind of result. */
const KINDS = [
  { tab: "Sponsors", title: "Paid deals, dated.", body: "A brand-named !command, #ad or a partner tag, tied to the streams it ran on. You see when it started and if it is still running.",
    login: "astabush", who: "AstaBush", rows: [["HelloFresh", "!Hellofresh in every title, 6 to 22 Oct", "12 streams"], ["Helix", "!Helix with #HelixPartner, 28 Aug", "1 stream"], ["Alienware", "Cozy rainy Monday with !Alienware, 7 Sep", "1 stream"]] },
  { tab: "Campaign starts", title: "Catch a deal the week it starts.", body: "No brand in the earlier titles, then a command and #ad. That is a new campaign, and a brand that just started buying streams.",
    login: "artosis", who: "Artosis", rows: [["HelloFresh", "!HelloFresh #ad, first seen 21 Oct", "New"], ["Before that", "No brand in titles back to 22 Aug", "Clean"]] },
  { tab: "Own brands", title: "The creator's own shop is not a sponsor.", body: "Coaching courses, merch and second channels look like deals to a keyword list. They are counted apart.",
    login: "agurin", who: "agurin", rows: [["SteelSeries", "!steelseries NEW, 25 Sep to 22 Oct", "28 streams"], ["!course", "The creator's own coaching course", "Own brand"]] },
  { tab: "Noise", title: "Chat commands, thrown out.", body: "Every channel has a dozen !commands. We read each one in context and say why it is not a deal.",
    login: "agurin", who: "agurin", rows: [["!khazix", "League of Legends champion guide", "Not a deal"], ["!borders", "Overlay command, no brand", "Not a deal"], ["!prime", "Prime Gaming sub reminder", "Not a deal"]] },
];

const TOOLKIT = [
  { t: "Streamer Explorer", d: "39,000+ streamers on Twitch, YouTube and Kick. Filter by country, language, category, audience and brand safety.", to: "/streamer-explorer",
    rows: [["Platform", "Twitch, YouTube, Kick"], ["Country and language", "Every market"], ["Brand safety score", "Per streamer"]] },
  { t: "AI streamer search", d: "Describe the streamers you need or paste a brief, and get the list back. 5 Beta Credits a run.", to: "/streamer-explorer#plans",
    rows: [["Brief", "Norwegian FPS streamers, 18 to 24"], ["Result", "A shortlist you can save"], ["Cost", "5 credits"]] },
  { t: "Streamer lists", d: "Save shortlists per market or client, share them with your team and turn them into a campaign.", to: "/streamer-explorer",
    rows: [["Growth", "10 lists, 2,500 each"], ["Scale", "Unlimited lists"], ["Export", "CSV"]] },
  { t: "Brand safety vetting", d: "Check what a streamer says on stream before your brand sits next to them.", to: "/brand-safety",
    rows: [["Growth", "500 vetted a month"], ["Scale", "2,000 vetted a month"], ["Enterprise", "Unlimited"]] },
];

const EXAMPLES = ["AstaBush", "agurin", "Artosis", "Mr_Mammal", "DansGaming"];
const KIND: Record<Sponsor["kind"], string> = { sponsor: "Sponsor", affiliate: "Affiliate code", own_brand: "Own brand", unclear: "Unclear" };
const STEPS = ["Reading the channel and bio", "Reading the last 100 VOD titles and chat bot commands", "Checking each brand mention"];

const fmt = (d: string) => new Date(d + "T12:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
const num = (n: number) => n.toLocaleString("en-US");
const frame = (login: string) => `/checker/${login}.webp`;
const avatar = (login: string) => `/checker/av-${login}.webp`;

/* The curved strip of stream frames under the search, like a smile: the middle
   sits lowest, the ends rise, tilt outwards and fade. The curve stays inside the box
   (no corner above the top, even tilted at the far ends) so wide screens never show a frame cut off. It rolls endlessly to the
   left: each frame's slot slides along the curve and wraps at the far end, where
   it is fully faded, so the loop has no seam. Under reduced motion it keeps rolling, at a third of the speed. */
const ARC = LIVE_DEALS.slice(0, 19);
const ARC_SPEED = 0.35; // slots per second
const ARC_SPEED_REDUCED = 0.12;
const placeFrame = (el: HTMLDivElement, o: number, mid: number) => {
  const a = Math.abs(o);
  const fade = Math.max(0, 1 - a / (mid + 1.5));
  const edge = Math.min(1, Math.max(0, (mid + 0.5 - a) / 2)); // 0 at the wrap point, +/-(mid + 0.5)
  el.style.transform = `translate(calc(${o * 128}px - 50%), ${146 - a ** 1.8 * 2.2}px) rotate(${o * 2.4}deg)`;
  el.style.opacity = String((0.35 + fade * 0.65) * edge);
};
const FrameArc: React.FC = () => {
  const mid = (ARC.length - 1) / 2;
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    const n = ARC.length;
    const draw = (shift: number) =>
      refs.current.forEach((el, i) => el && placeFrame(el, ((((i - mid - shift + n / 2) % n) + n) % n) - n / 2, mid));
    const speed = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? ARC_SPEED_REDUCED : ARC_SPEED;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => { draw(((now - start) / 1000) * speed); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [mid]);
  return (
    <div className="relative h-[230px] md:h-[300px] overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]" aria-hidden="true">
      <div className="absolute left-1/2 top-0 w-0">
        {ARC.map((d, i) => (
          <div key={d.login} ref={el => { refs.current[i] = el; if (el && !el.style.transform) placeFrame(el, i - mid, mid); }}
            className="absolute w-[120px] md:w-[150px] aspect-video rounded-lg overflow-hidden shadow-[0_12px_30px_-12px_rgba(15,16,18,.35)] bg-muted will-change-transform">
            <img src={frame(d.login)} alt="" loading="lazy" className="w-full h-full object-cover" />
            <span className="absolute left-1.5 bottom-1.5 text-[10px] font-semibold px-1.5 py-0.5 rounded bg-black/70 text-white">{d.brand}</span>
          </div>
        ))}
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

  const [kind, setKind] = useState(0);
  const idle = !loading && !result && !error;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title="Twitch Sponsor Checker: Who Sponsors a Streamer? | Beta Ads"
        description="Search any Twitch streamer and see which brands sponsor them. We read stream titles, the bio, the last 100 VODs and the chat bot commands, and show the proof for every deal."
        canonical="/twitch-sponsorship-checker"
        ogType="website"
      />

      {/* ── HERO: centred search ── */}
      <header ref={topRef} className={`${W} pt-28 md:pt-36 text-center scroll-mt-20`}>
        <h1 className="text-[2.6rem] leading-[1.04] sm:text-6xl lg:text-[4.4rem] font-bold tracking-[-0.035em] max-w-4xl mx-auto m-0">
          The sponsorship search <span className="text-muted-foreground font-light">engine for Twitch.</span>
        </h1>
        <p className="mt-6 max-w-xl mx-auto text-lg text-muted-foreground leading-relaxed">
          Type a streamer and see every brand they work with, each one shown with the title or chat command that proves it.
        </p>

        <form className="mt-9 max-w-2xl mx-auto text-left" onSubmit={e => { e.preventDefault(); check(q); }}>
          <div ref={boxRef} className="relative">
            <div className="flex items-center gap-2 rounded-full border border-border bg-card pl-5 pr-1.5 h-14 shadow-[0_1px_2px_rgba(15,16,18,.04),0_16px_32px_-24px_rgba(15,16,18,.2)] focus-within:border-foreground/40 transition-colors">
              <Search className="w-4 h-4 text-muted-foreground shrink-0" aria-hidden="true" />
              <input
                value={q}
                onChange={e => { setQ(e.target.value); setOpen(true); }}
                onFocus={() => setOpen(true)}
                placeholder="Search a Twitch streamer, e.g. agurin"
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
          {loading && <div className="mt-6"><FrameArc /></div>}
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

      {/* ── LOGOS ── */}
      <section className={`${W} py-16 md:py-24 text-center`}>
        <h2 className={`${h2} max-w-3xl mx-auto`}>Built by the team behind <span className="text-muted-foreground font-light">these livestream campaigns.</span></h2>
        <ul className="mt-10 m-0 p-0 list-none flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
          {LOGOS.map(([f, alt, hgt]) => (
            <li key={f}><img src={`/lovable-uploads/logo-${f}.png`} alt={alt} style={{ height: hgt }} className="w-auto brightness-0 opacity-75 dark:invert" loading="lazy" /></li>
          ))}
        </ul>
        <Link to="/case-studies" className="mt-8 inline-block text-sm font-semibold text-muted-foreground hover:text-foreground">See the case studies &rarr;</Link>
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
            <Row n="03" title="Noise thrown out" body="A keyword list counts !prime and !khazix as brands. We read them in context and tell you why they are not deals.">
              <div className="rounded-xl bg-white text-[#0F1012] p-4 shadow-2xl text-sm space-y-2.5">
                {[["!prime", "Prime Gaming sub reminder"], ["!khazix", "League of Legends champion guide"], ["!course", "The creator's own coaching course"], ["!discord", "Community server"]].map(([k, v]) => (
                  <div key={k} className="flex items-baseline gap-3"><span className="font-semibold w-20 shrink-0">{k}</span><span className="text-[#6B7079] min-w-0 truncate">{v}</span><span className="ml-auto text-xs font-semibold text-[#C8243A] shrink-0">Not a deal</span></div>
                ))}
              </div>
            </Row>
          </div>
        </div>
      </section>

      {/* ── KINDS: tabs ── */}
      <section className={`${W} py-20 md:py-28`}>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className={h2}>Covering what keyword lists <span className="text-muted-foreground font-light">get wrong.</span></h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">A list of brand names counts every !command. The checker reads them the way a person would, and sorts them.</p>
        </div>
        <div role="tablist" className="mt-8 flex flex-wrap justify-center gap-2">
          {KINDS.map((k, i) => (
            <button key={k.tab} role="tab" aria-selected={kind === i} type="button" onClick={() => setKind(i)}
              className={`h-10 px-5 rounded-full text-sm font-semibold transition-colors ${kind === i ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}>
              {k.tab}
            </button>
          ))}
        </div>
        <div className="mt-10 md:mt-14 grid md:grid-cols-2 gap-8 md:gap-14 items-center">
          <div>
            <h3 className="text-3xl md:text-[2.6rem] leading-[1.06] font-bold tracking-tight m-0">{KINDS[kind].title}</h3>
            <p className="mt-5 mb-0 text-muted-foreground leading-relaxed max-w-md">{KINDS[kind].body}</p>
            <button type="button" onClick={() => check(KINDS[kind].login, true)} className="mt-6 text-sm font-semibold hover:opacity-70">Check {KINDS[kind].who} live &rarr;</button>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 md:p-6 shadow-[0_24px_48px_-28px_rgba(15,16,18,.2)]">
            <div className="flex items-center gap-3">
              <img src={avatar(KINDS[kind].login)} alt="" className="w-8 h-8 rounded-full" />
              <span className="font-semibold">{KINDS[kind].who}</span>
              <span className="ml-auto text-xs text-muted-foreground">Checked 21 Oct 2026</span>
            </div>
            <div className="mt-4 border-t border-border">
              {KINDS[kind].rows.map(([a, b, c]) => (
                <div key={a} className="flex items-baseline gap-4 py-3 border-b border-border last:border-b-0 text-sm">
                  <span className="font-semibold w-28 shrink-0">{a}</span>
                  <span className="text-muted-foreground min-w-0">{b}</span>
                  <span className={`ml-auto shrink-0 text-xs font-semibold ${c === "Not a deal" ? "text-signal" : ""}`}>{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TOOLKIT ── */}
      <section className={`${W} pb-8`}>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className={h2}>Plus the rest <span className="text-muted-foreground font-light">of the platform.</span></h2>
          <p className="mt-4 text-muted-foreground">The checker is the free part. Behind the login: the tools we plan our own campaigns with.</p>
        </div>
        <div className="mt-10 md:mt-12 grid md:grid-cols-2 gap-4 md:gap-5">
          {TOOLKIT.map(t => (
            <Link key={t.t} to={t.to} className="group rounded-[20px] bg-muted/60 p-6 md:p-8 flex flex-col hover:bg-muted transition-colors">
              <span className="text-lg font-bold tracking-tight">{t.t}</span>
              <span className="mt-2 text-[15px] text-muted-foreground leading-relaxed max-w-md">{t.d}</span>
              <span className="mt-6 rounded-xl bg-card p-4 shadow-[0_1px_2px_rgba(15,16,18,.04),0_16px_32px_-24px_rgba(15,16,18,.2)]">
                {t.rows.map(([a, b]) => (
                  <span key={a} className="flex items-baseline justify-between gap-4 py-2 border-b border-border last:border-b-0 text-sm">
                    <span className="text-muted-foreground">{a}</span><span className="font-semibold text-right">{b}</span>
                  </span>
                ))}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <ExplorerPlans centered />

      {/* ── CLOSE: dark CTA ── */}
      <section className={`${W} pb-20 md:pb-28`}>
        <div className="rounded-[28px] bg-[#0E0F12] text-white px-6 py-16 md:py-24 text-center">
          <h2 className={`${h2} text-white max-w-3xl mx-auto`}>Stop guessing who sponsors whom. <span className="text-white/45 font-light">Search it.</span></h2>
          <p className="mt-5 max-w-xl mx-auto text-white/60 leading-relaxed">Free, for any Twitch channel. And if you want your brand in these streams, we run the campaign for you.</p>
          <div className="mt-9 max-w-xl mx-auto flex flex-col sm:flex-row gap-3">
            <button type="button" onClick={() => { topRef.current?.scrollIntoView({ behavior: "smooth" }); }}
              className="flex-1 h-12 rounded-full bg-white text-[#0F1012] text-sm font-semibold hover:opacity-90 transition-opacity">Search a streamer</button>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" data-cta="book"
              className="flex-1 h-12 inline-flex items-center justify-center gap-2 rounded-full border border-white/20 text-sm font-semibold hover:border-white/50 transition-colors">Book a demo <ArrowRight className="w-4 h-4" /></a>
          </div>
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

/* The brand's own favicon in high resolution. Unknown domains come back as a 16 px
   globe, so anything that small falls back to the brand's first letter. */
const BrandLogo: React.FC<{ brand: string; domain?: string }> = ({ brand, domain }) => {
  const [ok, setOk] = useState(!!domain);
  return (
    <span className="w-10 h-10 shrink-0 rounded-lg border border-border bg-white grid place-items-center overflow-hidden">
      {ok
        ? <img src={`https://www.google.com/s2/favicons?domain=${domain}&sz=128`} alt="" className="w-7 h-7 object-contain"
            onError={() => setOk(false)} onLoad={e => e.currentTarget.naturalWidth <= 16 && setOk(false)} />
        : <span className="text-sm font-bold text-[#0F1012]">{brand.charAt(0)}</span>}
    </span>
  );
};

const range = (a: string, b: string) => {
  if (a === b) return fmt(a);
  const short = a.slice(0, 4) === b.slice(0, 4) ? new Date(a + "T12:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "short" }) : fmt(a);
  return `${short} to ${fmt(b)}`;
};

const SponsorCard: React.FC<{ s: Sponsor }> = ({ s }) => (
  <article className="rounded-2xl border border-border bg-card p-4 flex flex-col min-w-0">
    <div className="flex items-center gap-3">
      <BrandLogo brand={s.brand} domain={s.domain} />
      <div className="min-w-0 flex-1">
        <h3 className="text-base font-bold tracking-tight m-0 truncate">{s.brand}</h3>
        <p className="m-0 text-xs text-muted-foreground truncate">{s.category}</p>
      </div>
      <span className="shrink-0 px-2 h-6 inline-flex items-center rounded-full bg-foreground text-background text-[11px] font-semibold">{KIND[s.kind]}</span>
    </div>
    <p className="mt-3 mb-0 text-xs text-muted-foreground">
      <span className="font-semibold text-foreground">{range(s.firstSeen, s.lastSeen)}</span>
      {" · "}{s.streams > 0 ? `${s.streams} stream${s.streams === 1 ? "" : "s"}` : s.evidence.some(e => e.source === "command") ? "chat bot" : "bio"}
      {s.confidence !== "high" && ` · ${s.confidence} confidence`}
    </p>
    <p className="mt-2 mb-0 text-sm text-muted-foreground leading-snug line-clamp-3">{s.note}</p>
    <details className="mt-auto pt-3 group/p">
      <summary className="text-xs font-semibold cursor-pointer list-none inline-flex items-center gap-1 hover:text-foreground">
        Proof ({s.evidence.length}) <span className="transition-transform group-open/p:rotate-90">›</span>
      </summary>
      <ul className="mt-2 m-0 p-0 list-none border-t border-border">
        {s.evidence.map(e => (
          <li key={e.url + e.date + e.text} className="border-b border-border last:border-b-0">
            <a href={e.url} target="_blank" rel="noopener noreferrer" className="block py-2 text-xs group">
              <span className="text-muted-foreground">{e.source === "live" ? "Live now" : e.source === "bio" ? "Bio" : e.source === "command" ? "Chat bot" : fmt(e.date)}</span>
              <span className="block mt-0.5 text-muted-foreground group-hover:text-foreground line-clamp-2 break-words">{e.text}</span>
            </a>
          </li>
        ))}
      </ul>
    </details>
  </article>
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

        {r.sponsors.length === 0 ? (
          <p className="mt-8 rounded-2xl border border-border p-6 text-sm text-muted-foreground m-0">No brand deals in the titles we could read.</p>
        ) : (
          <div className="mt-8 grid sm:grid-cols-2 gap-3">
            {r.sponsors.map(s => <SponsorCard key={s.brand} s={s} />)}
          </div>
        )}
      </div>

      <aside className="rounded-2xl bg-muted/60 p-5 md:p-6 text-sm">
        <div className={`${kicker} mb-3`}>What we read</div>
        <p className="m-0 text-muted-foreground leading-relaxed">
          {r.scannedLines} different titles from {c.vodCount} VODs{c.since ? ` since ${fmt(c.since)}` : ""}, the live title, the bio{c.commandCount ? ` and ${c.commandCount} public chat bot commands` : ""}.
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
