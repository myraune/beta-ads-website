import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

/** Glorious brand palette — white + gold accent `#D4AF37` per their identity */
const BRAND = {
  primary: "#D4AF37",
  glow: "rgba(212,175,55,0.14)",
};

const stats = [
  { value: "137K+", label: "Total views" },
  { value: "25", label: "Creators" },
  { value: "112", label: "Categories" },
  { value: "3", label: "Countries" },
];

const results = [
  { value: "137K+", label: "Total views" },
  { value: "25", label: "Creators participated" },
  { value: "112", label: "Live stream categories" },
  { value: "3", label: "Countries (FI, NO, SE)" },
];

const GloriousCaseStudy: React.FC = () => {
  const { ref: bodyRef, isVisible: bodyVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: solutionRef, isVisible: solutionVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: resultsRef, isVisible: resultsVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <div>
      {/* ── HERO ── */}
      <style>{`
        @keyframes glorious-glow {
          0%   { opacity: 0.6; transform: scale(1); }
          100% { opacity: 1;   transform: scale(1.1); }
        }
      `}</style>
      <section className="relative overflow-clip" style={{ background: "hsl(240 11% 5%)" }}>
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute inset-0" style={{
            background: `radial-gradient(ellipse 80% 60% at 65% 35%, ${BRAND.glow} 0%, transparent 60%)`,
            animation: "glorious-glow 10s ease-in-out infinite alternate",
            willChange: "opacity, transform",
          }} />
        </div>
        {/* Brand gold top stripe */}
        <div
          className="absolute inset-x-0 top-0 h-px z-[2]"
          style={{ background: `linear-gradient(90deg, transparent 0%, ${BRAND.primary} 50%, transparent 100%)` }}
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent z-[1] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-28 md:pt-36 pb-20">
          <Link to="/case-studies" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white/80 transition-colors mb-10">
            <ArrowLeft className="w-4 h-4" /> Back to campaigns
          </Link>

          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-8">
              <div
                className="flex items-center justify-center rounded-xl bg-white/[0.06] border border-white/10 p-3 backdrop-blur-sm"
                style={{ boxShadow: `0 0 0 1px ${BRAND.primary}44` }}
              >
                <img
                  src="/lovable-uploads/logo-glorious.png"
                  alt="Glorious"
                  className="h-8 w-auto object-contain"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
              </div>
              <div className="flex flex-col gap-1">
                <span
                  className="text-[11px] font-semibold tracking-[0.2em] uppercase"
                  style={{ color: BRAND.primary }}
                >
                  Nordics · Gaming peripherals · Product launch
                </span>
                <span className="text-xs text-white/50 tracking-wide">
                  Case Study · O3 Mouse campaign
                </span>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6 tracking-tight">
              Glorious<br />
              <span style={{ fontFamily: "'Instrument Serif', serif" }} className="italic font-normal">× Beta Ads</span>
            </h1>
            <p className="text-lg text-white/60 leading-relaxed max-w-xl">
              How Glorious reached the Nordic gaming community with native rich media overlays to promote the O3 mouse across Finland, Norway, and Sweden.
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

      {/* ── HEADER IMAGE ── */}
      <section className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <img
            src="https://storage.googleapis.com/livad-blog/3292/3669942.gif"
            alt="Glorious O3 Mouse campaign overlay on Twitch stream"
            className="w-full h-auto rounded-2xl"
          />
        </div>
      </section>

      {/* ── CHALLENGE ── */}
      <section className="py-20 md:py-28 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div
            ref={bodyRef}
            className={`grid lg:grid-cols-2 gap-16 items-start transition-all duration-700 ${bodyVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">The Challenge</span>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-6">
                Reaching gamers who block everything
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed mb-4">
                Glorious needed to promote the new O3 mouse to tech-savvy gamers across the Nordics — an audience that blocks pre-roll ads on sight and has learned to ignore banner placements entirely.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                Standard digital formats couldn't penetrate this audience. Glorious needed something that felt native to the stream, was invisible to adblock software, and could scale across three languages and three markets simultaneously.
              </p>
            </div>
            <div className="space-y-4 pt-2">
              {[
                { label: "Target markets", value: "Finland, Norway, Sweden" },
                { label: "Product", value: "Glorious O3 Mouse" },
                { label: "Primary challenge", value: "Adblock-heavy gaming audience" },
                { label: "Format used", value: "Rich Media Overlays" },
              ].map((row) => (
                <div key={row.label} className="flex justify-between items-baseline py-3 border-b border-border last:border-0">
                  <span className="text-sm text-muted-foreground">{row.label}</span>
                  <span className="text-sm font-semibold text-foreground">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SOLUTION / GIFs ── */}
      <section className="py-20 md:py-28 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div
            ref={solutionRef}
            className={`transition-all duration-700 ${solutionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">The Solution</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-4 max-w-2xl">
              Localised overlays across 25 creators, 3 markets
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed max-w-2xl mb-12">
              Beta deployed rich media overlay ads across 25 Nordic streamers. Creative assets were localised in Finnish, Norwegian, and English — appearing naturally during live broadcasts and prompting viewers to explore the O3 mouse through a link in the streamer's banner.
            </p>

            {/* Full-width GIF duo */}
            <div className="grid md:grid-cols-2 gap-5 mb-5">
              <img
                src="https://storage.googleapis.com/livad-blog/3292/3637484.gif"
                alt="Glorious O3 overlay – Norwegian stream"
                className="w-full h-auto rounded-2xl"
              />
              <img
                src="https://storage.googleapis.com/livad-blog/3292/3644839.gif"
                alt="Glorious O3 overlay – Finnish stream"
                className="w-full h-auto rounded-2xl"
              />
            </div>

            <p className="text-sm text-muted-foreground mt-4">
              By collaborating with 25 creators across 112 categories, Glorious reached its audience regardless of what game they were watching — without interrupting the experience.
            </p>
          </div>
        </div>
      </section>

      {/* ── PERFORMANCE ANALYSIS ── */}
      <section className="py-20 md:py-28 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">Campaign Data</span>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-10">Performance breakdown</h2>
          <img
            src="https://storage.googleapis.com/livad-blog/3292/analysis_campaigns_3292_3315_3317.png"
            alt="Campaign performance analysis across Finland, Norway, Sweden"
            className="w-full h-auto rounded-2xl"
          />
        </div>
      </section>

      {/* ── RESULTS ── */}
      <section
        ref={resultsRef}
        className={`py-20 md:py-28 border-t border-border transition-all duration-700 ${resultsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">Impact</span>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-6">
                A multi-market presence, built in one campaign
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                The international campaign established Glorious across three Nordic markets simultaneously. The message reached gamers in 112 different live stream categories — gaming, IRL, Just Chatting — bypassing traditional advertising hurdles and generating significant engagement for the O3 launch.
              </p>
            </div>
            <div>
              <div className="grid grid-cols-2 gap-px rounded-2xl overflow-hidden bg-border">
                {results.map((s) => (
                  <div key={s.label} className="bg-background px-6 py-5">
                    <div className="text-2xl font-bold text-foreground tracking-tight">{s.value}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VIDEO ── */}
      <section className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">Campaign Footage</span>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-8">See it live on stream</h2>
          <div className="relative w-full rounded-2xl overflow-hidden bg-black" style={{ aspectRatio: "16/9" }}>
            <video controls className="absolute inset-0 w-full h-full">
              <source src="https://storage.googleapis.com/livad-blog/3292/combined_campaign_3292_20260127_010350.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 md:py-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10">
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">Run a Similar Campaign</span>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">Reach Nordic gamers natively</h2>
            </div>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-12 shrink-0">
              <Link to="/contact">Book a demo <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 border-t border-border pt-6">
            {stats.map((s, i) => (
              <div key={s.label} className={`py-4 ${i < 3 ? "pr-6 border-r border-border" : ""} ${i > 0 ? "pl-6" : ""}`}>
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

export default GloriousCaseStudy;
