import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

/**
 * Data sourced from `komplett-manedens-gaming-deal-report-01-05-2025.pdf`
 * (Drive). Komplett's monthly Gaming Deal tactical campaign, Apr 14–30 2025.
 * Komplett is Norway's #3 electronics retailer, leaning into "the home for
 * gamers" positioning — see WAL brief in Drive (`Brief - Komplett 2025.pdf`).
 */
const stats = [
  { value: "151,278", label: "Display views" },
  { value: "1.17%", label: "Verified CTR" },
  { value: "1,768", label: "Verified clicks" },
  { value: "1,261 h", label: "Screen time" },
];

const results = [
  { value: "34", label: "Streamers" },
  { value: "46", label: "Categories" },
  { value: "66,626", label: "Unique viewers" },
  { value: "4.48%", label: "Peak-day CTR" },
];

const KomplettCaseStudy: React.FC = () => {
  const { ref: bodyRef, isVisible: bodyVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: solutionRef, isVisible: solutionVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: resultsRef, isVisible: resultsVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <div>
      <section className="relative overflow-clip" style={{ background: "hsl(240 11% 5%)" }}>
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 50% at 65% 30%, rgba(0,180,255,0.10) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 35% 70%, rgba(233,79,55,0.10) 0%, transparent 65%)",
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
                src="/lovable-uploads/logo-client-10.png"
                alt="Komplett"
                className="h-6 w-auto object-contain"
                style={{ filter: "brightness(0) invert(1)", opacity: 0.85 }}
              />
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-white/70 tracking-wider uppercase">
                Case Study
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6 tracking-tight">
              Komplett<br />
              <span
                style={{ fontFamily: "'Instrument Serif', serif" }}
                className="italic font-normal"
              >
                Månedens Gaming Deal
              </span>
            </h1>
            <p className="text-lg text-white/60 leading-relaxed max-w-xl">
              Tactical monthly deal-driver for Norway's #3 electronics retailer — peak
              4.48% CTR, 1,768 verified clicks, and 19h 40m of artwork-on-screen time
              across 34 Norwegian gaming streamers.
            </p>
          </div>

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
          <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
            The creative
          </span>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-8 max-w-2xl">
            Månedens Gaming Deal — 30s overlay creative
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl">
            <div className="rounded-2xl overflow-hidden bg-black border border-border">
              <video
                src="/lovable-uploads/case-studies/komplett-overlay.webm"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="w-full h-auto"
                aria-label="Komplett Månedens Gaming Deal overlay creative as displayed on Twitch + Kick streams"
              />
            </div>
            <div className="rounded-2xl overflow-hidden bg-card border border-border">
              <img
                src="/lovable-uploads/case-studies/komplett-preview.jpg"
                alt="Komplett Månedens Gaming Deal — static preview"
                className="w-full h-auto"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

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
                Win clicks in a category where customer loyalty is essentially zero
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed mb-4">
                Norwegian electronics buyers are notoriously disloyal — every purchase
                gets won fresh in a brutal price-comparison environment. Komplett's 2025
                strategy (per the WAL brief) calls for being "continuously present with
                tactical campaigns that deliver clicks and conversion" to a 20–50
                audience for tactical, and 15–35 for the gaming positioning.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                The Månedens Gaming Deal needed to drive deal-page traffic from gamers
                already shopping mentally — and do it at a CPM that respects Komplett's
                lean media budget vs. the bigger competitors.
              </p>
            </div>
            <div className="space-y-4 pt-2">
              {[
                { label: "Market", value: "Norway (95.8% viewership)" },
                { label: "Format", value: "Rich Media Overlay" },
                { label: "Run", value: "Apr 14 – Apr 30 2025 (17 days)" },
                { label: "Best day", value: "Apr 14 — 4,126 views, 4.48% CTR" },
                { label: "Audience", value: "58% age 18–24, 42% age 25–34, male 100%" },
                { label: "Platforms", value: "Twitch + Kick" },
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
              17 days, 34 creators, 4.48% peak-day verified CTR
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed max-w-2xl mb-12">
              Beta concentrated the run inside Norwegian gaming-adjacent streams — with
              over half of all screen time landing inside Just Chatting — where deal
              messaging gets discussed organically and the chat-pinned link converts at
              its highest rate.
            </p>

            <div className="grid md:grid-cols-2 gap-12 mb-12">
              <div>
                <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4 block">
                  Top 5 creators
                </span>
                <div className="space-y-3">
                  {[
                    { name: "rubengks", views: "41,099", clicks: "169", avgViewers: "326" },
                    { name: "Danniz", views: "—", clicks: "—", avgViewers: "—" },
                    { name: "Linnea", views: "—", clicks: "—", avgViewers: "—" },
                    { name: "forstegir", views: "—", clicks: "—", avgViewers: "—" },
                    { name: "AndersMish", views: "—", clicks: "—", avgViewers: "—" },
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
                          {s.views} views · {s.clicks} clicks
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
                    { cat: "Just Chatting", pct: "52.88%" },
                    { cat: "Grand Theft Auto V", pct: "19.92%" },
                    { cat: "Travel & Outdoors", pct: "5.84%" },
                    { cat: "Counter-Strike 2", pct: "5.20%" },
                    { cat: "Fortnite", pct: "4.17%" },
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
              Just Chatting at 53% is unusually high for a tactical retail campaign — but
              that's exactly where the streamer's audience is most attentive, and where
              "this month's deal" registers as recommendation rather than ad.
            </p>
          </div>
        </div>
      </section>

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
                4.48% peak-day CTR — 10× the typical retail display benchmark
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed mb-4">
                Komplett's tactical Gaming Deal hit 4.48% verified CTR on launch day
                (Apr 14) and held a strong 1.17% verified average through the 17-day
                run. 1,768 verified clicks landed deal-page traffic where it counts —
                and 4,298 unverified clicks indicate substantial brand-aware interest
                even before deduplication.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                With 34 streamers across both Twitch and Kick, the campaign covered
                Komplett's full Norwegian gamer audience. 66,626 unique viewers reached
                through the chat-pinned deal link.
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

      <section className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 md:py-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10">
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
                Run a Similar Campaign
              </span>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">
                Tactical retail campaigns that convert
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

export default KomplettCaseStudy;
