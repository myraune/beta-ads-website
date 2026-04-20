import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

/**
 * Data sourced from the verified Kristiania campaign report (Drive file
 * `kristiania-report-14-04-2025.pdf`) — Høyskolen Kristiania's national
 * student-recruitment run on Norwegian Twitch, Feb–Apr 2025.
 */
const stats = [
  { value: "459,237", label: "Display views" },
  { value: "1.53%", label: "Verified CTR" },
  { value: "4,372", label: "Verified clicks" },
  { value: "2,551 h", label: "Screen time" },
];

const results = [
  { value: "31", label: "Streamers" },
  { value: "67", label: "Categories" },
  { value: "136,828", label: "Unique viewers" },
  { value: "2.15%", label: "Peak-day CTR" },
];

const KristianiaCaseStudy: React.FC = () => {
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
                "radial-gradient(ellipse 70% 50% at 60% 30%, rgba(233,79,55,0.16) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 40% 70%, rgba(255,200,80,0.08) 0%, transparent 65%)",
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
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-white/70 tracking-wider uppercase">
                University Recruitment
              </span>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-white/70 tracking-wider uppercase">
                Case Study
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6 tracking-tight">
              Kristiania<br />
              <span
                style={{ fontFamily: "'Instrument Serif', serif" }}
                className="italic font-normal"
              >
                × Beta Ads
              </span>
            </h1>
            <p className="text-lg text-white/60 leading-relaxed max-w-xl">
              Høyskolen Kristiania reached 136,828 unique Norwegian Gen Z viewers across
              31 streamers — 459K display views and 28 hours of artwork-on-screen time
              over an 8-week recruitment window.
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
                Reach Norwegian 18–24 year-olds at the moment they're choosing a university
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed mb-4">
                Kristiania needed presence inside a window that traditional university
                marketing struggles to reach: Gen Z evenings, on Twitch, where Norwegian
                students actually spend their attention. Application season runs Feb–Apr;
                after that, the window closes for a year.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                The brand had national TV money but needed a complementary channel that
                landed inside the moment — and not as a 30-second pre-roll that gets
                skipped.
              </p>
            </div>
            <div className="space-y-4 pt-2">
              {[
                { label: "Market", value: "Norway (95.4% viewership)" },
                { label: "Format", value: "Rich Media Overlay" },
                { label: "Run", value: "Feb 28 – Apr 5 2025 (~8 weeks)" },
                { label: "Best day", value: "Feb 28 — 5,171 views, 2.15% CTR" },
                { label: "Audience", value: "Skews Akershus + Oslo, mobile/desktop mix" },
                { label: "Device split", value: "Desktop 96.5% / Mobile 3.2%" },
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
              Native overlays across 31 creators, 67 live categories
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed max-w-2xl mb-12">
              Beta deployed Kristiania creative across a curated roster of Norwegian
              streamers spanning gaming and lifestyle content. The overlay spent 2,551
              hours on screen across the campaign — and 28 hours of focused
              artwork-watch-time, which is what actually drives recall.
            </p>

            <div className="grid md:grid-cols-2 gap-12 mb-12">
              <div>
                <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4 block">
                  Top 5 creators
                </span>
                <div className="space-y-3">
                  {[
                    { name: "danniz", views: "102,696", clicks: "519", avgViewers: "268" },
                    { name: "detoo", views: "—", clicks: "—", avgViewers: "—" },
                    { name: "mystixx", views: "—", clicks: "—", avgViewers: "—" },
                    { name: "texazrexaz", views: "—", clicks: "—", avgViewers: "—" },
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
                    { cat: "Grand Theft Auto V", pct: "49.02%" },
                    { cat: "Just Chatting", pct: "21.47%" },
                    { cat: "Minecraft", pct: "6.30%" },
                    { cat: "Fortnite", pct: "6.06%" },
                    { cat: "Travel & Outdoors", pct: "4.28%" },
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
              Half the screen time happened inside GTA V — a category dominated by exactly
              the audience Kristiania needed to reach. Just Chatting (21%) gave the brand
              host-read style mentions in the moments creators were already talking
              directly to their audience.
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
                459K display views and 4,372 verified clicks during application season
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed mb-4">
                Kristiania's campaign covered 31 Norwegian streamers and 67 live
                categories — landing the recruitment message in front of 136,828 unique
                Gen Z viewers across exactly the application window that matters.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                Verified CTR landed at 1.53% with peak days hitting 2.15% — well above
                the typical 0.3–0.5% benchmark for higher-education display creative on
                conventional Nordic networks.
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
                Reach Norwegian Gen Z at scale, natively
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

export default KristianiaCaseStudy;
