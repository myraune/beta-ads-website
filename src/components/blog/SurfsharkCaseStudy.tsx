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

const SurfsharkCaseStudy: React.FC = () => {
  const { ref: bodyRef, isVisible: bodyVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: solutionRef, isVisible: solutionVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: resultsRef, isVisible: resultsVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <div>
      {/* ── HERO ── */}
      <section className="relative overflow-clip" style={{ background: "hsl(240 11% 5%)" }}>
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 50% at 60% 30%, rgba(90,219,181,0.14) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 40% 70%, rgba(233,79,55,0.10) 0%, transparent 65%)",
            }}
          />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent z-[1] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-28 md:pt-36 pb-20">
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white/80 transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" /> Back to campaigns
          </Link>

          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/lovable-uploads/logo-surfshark.png"
                alt="Surfshark"
                className="h-6 w-auto object-contain"
                style={{ filter: "brightness(0) invert(1)", opacity: 0.85 }}
              />
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-white/70 tracking-wider uppercase">
                Case Study
              </span>
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
              <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
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
                { label: "Market", value: "Norway (97% viewership)" },
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
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
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
              <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
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
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
                Run a Similar Campaign
              </span>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">
                Reach Nordic gamers with native overlay ads
              </h2>
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
