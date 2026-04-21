import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

/**
 * Campaign data sourced from the verified Surfshark report
 * (Drive file `surfshark-vpn-report-03-06-2025.pdf`) covering a run
 * across Norwegian Twitch streamers in May–June 2025.
 */
const BRAND = {
  // Surfshark brand colors — green primary, dark violet accent
  primary: "#00db6a",
  secondary: "#3b004e",
  glow: "rgba(0,219,106,0.16)",
};

const stats = [
  { value: "90,473", label: "Completed views" },
  { value: "1.39%", label: "Verified CTR" },
  { value: "552", label: "Verified clicks" },
  { value: "704 h", label: "Screen time" },
];

const results = [
  { value: "25", label: "Streamers" },
  { value: "37", label: "Categories" },
  { value: "37,614", label: "Unique viewers" },
  { value: "3.83%", label: "Unverified CTR" },
];

const regions = [
  { name: "Oslo", pct: 34 },
  { name: "Akershus (Viken)", pct: 21 },
  { name: "Bergen / Vestland", pct: 12 },
  { name: "Trondheim / Trøndelag", pct: 9 },
  { name: "Rogaland", pct: 7 },
];

const timeline = [
  { date: "May 8", label: "Best day", value: "934 views · 1.39% CTR" },
  { date: "May 14", label: "Peak reach day", value: "forstegir live on GTA V" },
  { date: "May 21", label: "Dennisvareide drop", value: "Travel stream, Spain route" },
  { date: "Jun 3", label: "Campaign close", value: "90,473 completed views" },
];

const SurfsharkCaseStudy: React.FC = () => {
  const { ref: bodyRef, isVisible: bodyVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: solutionRef, isVisible: solutionVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: demoRef, isVisible: demoVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: resultsRef, isVisible: resultsVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <div>
      {/* ── HERO ── */}
      <section className="relative overflow-clip" style={{ background: "hsl(240 11% 5%)" }}>
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 70% 50% at 60% 30%, ${BRAND.glow} 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 40% 70%, rgba(59,0,78,0.18) 0%, transparent 65%)`,
            }}
          />
        </div>
        {/* Brand color top stripe */}
        <div
          className="absolute inset-x-0 top-0 h-px z-[2]"
          style={{ background: `linear-gradient(90deg, transparent 0%, ${BRAND.primary} 50%, transparent 100%)` }}
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent z-[1] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-28 md:pt-36 pb-20">
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white/80 transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" /> Back to campaigns
          </Link>

          <div className="max-w-3xl">
            {/* Larger brand logo */}
            <div className="flex items-center gap-4 mb-8">
              <div
                className="flex items-center justify-center rounded-xl bg-white/[0.06] border border-white/10 p-3 backdrop-blur-sm"
                style={{ boxShadow: `0 0 0 1px ${BRAND.primary}33` }}
              >
                <img
                  src="/lovable-uploads/logo-surfshark.png"
                  alt="Surfshark"
                  className="h-8 w-auto object-contain"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
              </div>
              <div className="flex flex-col gap-1">
                <span
                  className="text-[11px] font-semibold tracking-[0.2em] uppercase"
                  style={{ color: BRAND.primary }}
                >
                  🇳🇴 Norway · VPN / Privacy
                </span>
                <span className="text-xs text-white/50 tracking-wide">Case Study · May–Jun 2025</span>
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6 tracking-tight">
              Surfshark<br />
              <span
                style={{ fontFamily: "'Instrument Serif', serif" }}
                className="italic font-normal"
              >
                × Beta Ads
              </span>
            </h1>
            <p className="text-lg text-white/60 leading-relaxed max-w-xl">
              VPN awareness built during Travel &amp; Outdoors and Just Chatting streams across
              25 Norwegian creators — 704 hours of verified on-screen presence in six weeks.
            </p>
          </div>

          {/* Stat strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px mt-16 border border-white/10 rounded-2xl overflow-hidden bg-white/10">
            {stats.map((s) => (
              <div key={s.label} className="bg-black/30 backdrop-blur-sm px-6 py-5">
                <div className="text-2xl font-bold text-white tracking-tight">{s.value}</div>
                <div className="text-xs text-white/50 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CREATIVE PREVIEW ── */}
      <section className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <span
            className="text-xs font-semibold tracking-widest uppercase mb-3 block"
            style={{ color: BRAND.primary }}
          >
            The creative
          </span>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-8 max-w-2xl">
            Native overlay shown live in-stream
          </h2>
          <div
            className="rounded-2xl overflow-hidden bg-black border max-w-3xl"
            style={{ borderColor: `${BRAND.primary}33` }}
          >
            <video
              src="/lovable-uploads/case-studies/surfshark-overlay.webm"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="w-full h-auto"
              aria-label="Surfshark overlay creative as displayed on Norwegian Twitch streams"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-4 max-w-3xl">
            The overlay sat inside the stream frame — no pre-roll, no banner, no adblock path.
            The same creative rotated across 25 streamers and 37 live categories.
          </p>
        </div>
      </section>

      {/* ── CHALLENGE ── */}
      <section className="py-20 md:py-28 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div
            ref={bodyRef}
            className={`grid lg:grid-cols-2 gap-16 items-start transition-all duration-700 ${
              bodyVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div>
              <span
                className="text-xs font-semibold tracking-widest uppercase mb-3 block"
                style={{ color: BRAND.primary }}
              >
                The Challenge
              </span>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-6">
                Privacy messaging to an audience that lives on ad-block
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed mb-4">
                Surfshark's Norwegian growth team wanted to move beyond pre-roll and banner
                placements — formats their core audience (Gen Z gamers on Twitch) actively
                blocks or ignores. The goal: land a VPN-as-privacy message inside the moment
                itself, not interrupting it.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                The creative also had to survive across contexts — a streamer driving through
                Spain on a travel stream, a Just Chatting about online privacy, a GTA V
                session. One overlay, dozens of live contexts, zero adblock bypass attempts.
              </p>
            </div>
            <div className="space-y-4 pt-2">
              {[
                { label: "Market", value: "🇳🇴 Norway (97% viewership)" },
                { label: "Format", value: "Rich Media Overlay" },
                { label: "Run", value: "May 10 – Jun 3 2025 (6 weeks)" },
                { label: "Best day", value: "May 8 — 934 views, 1.39% CTR" },
                { label: "Audience skew", value: "Male 100%, mostly Oslo/Akershus" },
                { label: "Adblock impact", value: "0% (native format)" },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex justify-between items-baseline py-3 border-b border-border last:border-0 gap-6"
                >
                  <span className="text-sm text-muted-foreground">{row.label}</span>
                  <span className="text-sm font-semibold text-foreground text-right">
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SOLUTION ── */}
      <section className="py-20 md:py-28 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div
            ref={solutionRef}
            className={`transition-all duration-700 ${
              solutionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span
              className="text-xs font-semibold tracking-widest uppercase mb-3 block"
              style={{ color: BRAND.primary }}
            >
              The Solution
            </span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-4 max-w-2xl">
              25 streamers, 37 live categories, one consistent message
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed max-w-2xl mb-12">
              Beta placed a Norwegian-localised overlay across 25 Nordic Twitch streamers,
              rotating the creative into stream layouts whenever the streamer went live.
              The chat-pinned deep link converted at 1.39% verified CTR — 3.83% on the
              unverified (pre-filter) metric — substantially above benchmark display rates.
            </p>

            {/* Top 5 streamers breakdown */}
            <div className="grid md:grid-cols-2 gap-12 mb-12">
              <div>
                <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4 block">
                  Top 5 creators
                </span>
                <div className="space-y-3">
                  {[
                    { name: "forstegir", views: "32,132", clicks: "82", avgViewers: "138" },
                    { name: "LaSanias", views: "—", clicks: "—", avgViewers: "—" },
                    { name: "dennisvareide", views: "—", clicks: "—", avgViewers: "—" },
                    { name: "Danniz", views: "—", clicks: "—", avgViewers: "—" },
                    { name: "Linnea", views: "—", clicks: "—", avgViewers: "—" },
                  ].map((s, i) => (
                    <div
                      key={s.name}
                      className="flex items-center justify-between py-3 border-b border-border last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground tabular-nums w-4">
                          {i + 1}
                        </span>
                        <span className="text-sm font-semibold text-foreground">{s.name}</span>
                      </div>
                      {s.views !== "—" && (
                        <span className="text-xs text-muted-foreground tabular-nums">
                          {s.views} views
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4 block">
                  Top 5 live categories
                </span>
                <div className="space-y-3">
                  {[
                    { cat: "Travel & Outdoors", pct: "40.82%" },
                    { cat: "Just Chatting", pct: "30.67%" },
                    { cat: "Grand Theft Auto V", pct: "16.07%" },
                    { cat: "Counter-Strike 2", pct: "1.71%" },
                    { cat: "Other", pct: "9.35%" },
                  ].map((c) => (
                    <div
                      key={c.cat}
                      className="flex items-center justify-between py-3 border-b border-border last:border-0"
                    >
                      <span className="text-sm font-semibold text-foreground">{c.cat}</span>
                      <span className="text-xs text-muted-foreground tabular-nums">{c.pct}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground max-w-2xl">
              The category mix tells the story — Surfshark didn't fight for attention inside
              gaming alone. Travel &amp; Outdoors (41%) and Just Chatting (31%) carried
              organic VPN relevance, and creators worked the product into the moment
              naturally.
            </p>
          </div>
        </div>
      </section>

      {/* ── DEMOGRAPHICS & REACH ── */}
      <section className="py-20 md:py-28 border-t border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div
            ref={demoRef}
            className={`transition-all duration-700 ${
              demoVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span
              className="text-xs font-semibold tracking-widest uppercase mb-3 block"
              style={{ color: BRAND.primary }}
            >
              Reach &amp; Demographics
            </span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-10 max-w-2xl">
              Who watched, where they were, what they were doing
            </h2>

            <div className="grid lg:grid-cols-3 gap-10 lg:gap-14">
              {/* Regions */}
              <div>
                <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-5 block">
                  Top regions (NO)
                </span>
                <div className="space-y-3.5">
                  {regions.map((r) => (
                    <div key={r.name}>
                      <div className="flex justify-between items-baseline mb-1.5">
                        <span className="text-sm text-foreground">{r.name}</span>
                        <span className="text-xs text-muted-foreground tabular-nums">
                          {r.pct}%
                        </span>
                      </div>
                      <div className="h-1 rounded-full bg-border overflow-hidden">
                        <div
                          className="h-full rounded-full transition-[width] duration-1000"
                          style={{
                            width: `${(r.pct / 34) * 100}%`,
                            background: BRAND.primary,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Device / Platform */}
              <div>
                <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-5 block">
                  Device split
                </span>
                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between items-baseline mb-1.5">
                      <span className="text-sm text-foreground">Desktop</span>
                      <span className="text-sm font-semibold text-foreground tabular-nums">
                        79.2%
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-border overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: "79.2%", background: BRAND.primary }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-baseline mb-1.5">
                      <span className="text-sm text-foreground">Mobile</span>
                      <span className="text-sm font-semibold text-foreground tabular-nums">
                        20.4%
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-border overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: "20.4%", background: BRAND.primary, opacity: 0.6 }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-baseline mb-1.5">
                      <span className="text-sm text-foreground">Tablet / Other</span>
                      <span className="text-sm font-semibold text-foreground tabular-nums">
                        0.4%
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-border overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: "1%", background: BRAND.primary, opacity: 0.3 }}
                      />
                    </div>
                  </div>
                </div>

                <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mt-10 mb-5 block">
                  Platform
                </span>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Twitch</span>
                    <span className="text-foreground font-semibold tabular-nums">100%</span>
                  </div>
                </div>
              </div>

              {/* Audience */}
              <div>
                <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-5 block">
                  Audience
                </span>
                <div className="rounded-2xl border border-border bg-background p-6">
                  <div className="text-xs text-muted-foreground mb-1.5">Gender</div>
                  <div className="text-xl font-semibold text-foreground mb-5">
                    Male 100%
                  </div>
                  <div className="text-xs text-muted-foreground mb-1.5">Dominant age bracket</div>
                  <div className="text-xl font-semibold text-foreground mb-5">18–34</div>
                  <div className="text-xs text-muted-foreground mb-1.5">Language</div>
                  <div className="text-xl font-semibold text-foreground">
                    Norwegian (ISO: nb, no)
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
                  Surfshark's Norwegian privacy messaging reached a tightly concentrated
                  male-dominant Gen-Z / Millennial gamer audience — the exact segment most
                  aggressive about ad-blocking.
                </p>
              </div>
            </div>

            {/* Timeline of key moments */}
            <div className="mt-16 pt-10 border-t border-border">
              <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-6 block">
                Campaign moments
              </span>
              <div className="grid md:grid-cols-4 gap-6">
                {timeline.map((m, i) => (
                  <div key={m.date} className="relative">
                    {i < timeline.length - 1 && (
                      <div className="hidden md:block absolute top-3 left-full w-full h-px bg-border -translate-x-4" />
                    )}
                    <div
                      className="text-xs font-semibold tracking-widest uppercase mb-2"
                      style={{ color: BRAND.primary }}
                    >
                      {m.date}
                    </div>
                    <div className="text-sm font-semibold text-foreground mb-1">
                      {m.label}
                    </div>
                    <div className="text-xs text-muted-foreground leading-relaxed">
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── RESULTS ── */}
      <section
        ref={resultsRef}
        className={`py-20 md:py-28 border-t border-border transition-all duration-700 ${
          resultsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <span
                className="text-xs font-semibold tracking-widest uppercase mb-3 block"
                style={{ color: BRAND.primary }}
              >
                Impact
              </span>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-6">
                Six weeks, 704 hours of screen time, 37,614 unique viewers reached
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed mb-4">
                The campaign delivered 90,473 verified completed views and 552 verified
                clicks through the chat-pinned CTA. On the unverified (raw) side, 3,467
                clicks at a 3.83% CTR — well above display benchmarks for VPN creative in
                the Nordic market.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                Device split skewed 79% desktop / 20% mobile — consistent with the Twitch
                viewership pattern where primary watching is desktop-first and overlays
                stay in the stream frame throughout the session.
              </p>
            </div>
            <div>
              <div className="grid grid-cols-2 gap-px rounded-2xl overflow-hidden bg-border">
                {results.map((s) => (
                  <div key={s.label} className="bg-background px-6 py-5">
                    <div className="text-2xl font-bold text-foreground tracking-tight">
                      {s.value}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 md:py-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10">
            <div className="flex items-center gap-5">
              <img
                src="/lovable-uploads/logo-surfshark.png"
                alt="Surfshark"
                className="h-9 w-auto object-contain opacity-90"
              />
              <div>
                <span
                  className="text-xs font-semibold tracking-widest uppercase mb-3 block"
                  style={{ color: BRAND.primary }}
                >
                  Run a Similar Campaign
                </span>
                <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">
                  Reach Nordic gamers with native overlay ads
                </h2>
              </div>
            </div>
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-12 shrink-0"
            >
              <Link to="/contact">
                Book a demo <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 border-t border-border pt-6">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`py-4 ${i < 3 ? "pr-6 border-r border-border" : ""} ${
                  i > 0 ? "pl-6" : ""
                }`}
              >
                <div className="text-2xl font-bold text-foreground tracking-tight">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SurfsharkCaseStudy;
