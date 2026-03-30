import React from "react";
import { Link } from "react-router-dom";
import { MarketingPageLayout } from "@/components/layout/MarketingPageLayout";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowRight, Rocket, Users, Shield, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedShaderBackground from "@/components/ui/animated-shader-background";

const serifFont = { fontFamily: "'Instrument Serif', serif" };

const stats = [
  { value: "125%", label: "Viewership Growth 2025" },
  { value: "2,800+", label: "Nordic Kick Streamers" },
  { value: "120 min", label: "Avg. Session Length" },
  { value: "Low", label: "Ad Competition" },
];

const why = [
  { icon: Rocket, title: "125% growth in 2025", desc: "Kick was the only major platform with positive viewership growth last year. Twitch declined 10% in the same period." },
  { icon: Users, title: "Longer sessions", desc: "Average Kick viewing sessions exceed 120 minutes — 30% longer than Twitch. More exposure time for your brand." },
  { icon: Shield, title: "Low ad saturation", desc: "Kick has minimal built-in advertising. Native overlay ads stand out in a market with almost zero competition." },
  { icon: TrendingUp, title: "Creator migration", desc: "Major creators are moving to Kick for better revenue splits. Their audiences follow — creating new advertising inventory." },
];

const platforms = [
  { name: "Twitch", streamers: "28,000+", strength: "Largest gaming audience", slug: "/twitch-advertising" },
  { name: "YouTube", streamers: "8,200+", strength: "Broadest demographics", slug: "/youtube-advertising" },
  { name: "Kick", streamers: "2,800+", strength: "Fastest growth, longest sessions", slug: "/kick-advertising" },
  { name: "Trovo", streamers: "445+", strength: "Untapped niche communities", slug: "#" },
];

const KickAdvertising: React.FC = () => {
  const { ref: whyRef, isVisible: whyVisible } = useScrollAnimation();
  const { ref: compRef, isVisible: compVisible } = useScrollAnimation();
  const { ref: faqRef, isVisible: faqVisible } = useScrollAnimation();

  return (
    <MarketingPageLayout
      seo={{
        title: "Kick Advertising in the Nordics | Beta Ads",
        description: "Advertise on Kick — the fastest-growing streaming platform with 125% viewership growth in 2025. Native overlay ads across 2,800+ Nordic Kick streamers.",
        canonical: "/kick-advertising",
        jsonLd: [
          { "@context": "https://schema.org", "@type": "Service", name: "Kick Advertising - Beta Ads", provider: { "@id": "https://beta-ads.no/#organization" }, areaServed: ["Norway", "Sweden", "Denmark", "Finland"], url: "https://beta-ads.no/kick-advertising" },
          { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://beta-ads.no/" }, { "@type": "ListItem", position: 2, name: "Kick Advertising", item: "https://beta-ads.no/kick-advertising" }] },
          { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "Can you advertise on Kick?", acceptedAnswer: { "@type": "Answer", text: "Yes. Beta Ads supports native overlay advertising on Kick streams through creator partnerships." } }, { "@type": "Question", name: "Why advertise on Kick instead of Twitch?", acceptedAnswer: { "@type": "Answer", text: "Kick grew 125% while Twitch declined 10% in 2025. Lower ad saturation, longer sessions, and first-mover advantage make Kick an exceptional opportunity." } }] },
        ],
      }}
      cta={{
        heading: "Be first on Kick.",
        subtext: "The window for first-mover advantage won't stay open forever. Book a demo to see Kick overlay ads in action.",
        primaryLabel: "Book a Demo",
        primaryHref: "/demo",
        secondaryLabel: "View Pricing",
        secondaryHref: "/pricing",
      }}
    >

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <AnimatedShaderBackground heightFactor={0.85} />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent z-[1] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-36 pb-28">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-white/80 backdrop-blur-sm mb-7">
              <img src="/lovable-uploads/platform-kick.png" alt="Kick" className="h-3.5 w-auto" />
              Kick Advertising
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6 tracking-tight">
              <span style={serifFont} className="italic font-normal">First-mover ads</span>
              <br />on Kick
            </h1>
            <p className="text-lg text-white/65 leading-relaxed mb-10 max-w-lg">
              Kick grew 125% in 2025 — the only major platform with triple-digit growth. Get your brand on the fastest-growing streaming platform before the competition arrives.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/demo">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-12">
                  Book a Demo <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/twitch-advertising">
                <Button size="lg" variant="ghost" className="text-white hover:bg-white/10 rounded-full px-8 h-12 border border-white/20">
                  See Twitch Ads
                </Button>
              </Link>
            </div>
          </div>

          {/* Stat strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px mt-20 border border-white/10 rounded-2xl overflow-hidden bg-white/10">
            {stats.map((s) => (
              <div key={s.label} className="bg-black/30 backdrop-blur-sm px-6 py-5">
                <div className="text-2xl font-bold text-white tracking-tight">{s.value}</div>
                <div className="text-xs text-white/50 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Kick ── */}
      <section className="py-20 md:py-28">
        <div ref={whyRef} className={`max-w-7xl mx-auto px-6 lg:px-12 transition-all duration-700 ${whyVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">Why Kick</span>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-6">
                The platform most brands are sleeping on
              </h2>
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>While most brands focus their streaming budgets on Twitch, Kick has quietly become one of the most engaged platforms in gaming. Viewership grew 125% in 2025, and the platform's creator-friendly revenue model (95/5 split) is attracting top streamers who bring their audiences with them.</p>
                <p>For advertisers, Kick's rapid growth means two things: a highly engaged audience that hasn't been saturated with ads, and a first-mover advantage that won't last forever. The brands establishing presence on Kick now will build brand equity before the platform reaches Twitch-level competition.</p>
                <p>Beta Ads is one of the first platforms to offer native overlay advertising on Kick, giving Nordic brands access to this growing audience through the same format that works on Twitch and YouTube.</p>
              </div>
            </div>
            <div className="grid gap-4">
              {why.map((w) => (
                <div key={w.title} className="flex items-start gap-4 p-5 rounded-xl border border-border bg-card">
                  <w.icon className="w-4 h-4 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-1">{w.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{w.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Multi-Platform ── */}
      <section className="py-20 md:py-28 border-t border-border">
        <div ref={compRef} className={`max-w-7xl mx-auto px-6 lg:px-12 transition-all duration-700 ${compVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="mb-12">
            <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">Multi-Platform</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">
              Don't choose one platform. Own all of them.
            </h2>
            <p className="text-muted-foreground mt-3 max-w-2xl text-sm leading-relaxed">
              Beta Ads runs native overlay campaigns across Kick, Twitch, YouTube, and Trovo from a single dashboard. No single platform captures the full Nordic streaming audience.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-5">
            {platforms.map((p) => (
              <Link key={p.name} to={p.slug}>
                <div className={`p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${p.name === "Kick" ? "border-primary/40 bg-primary/5" : "border-border bg-card hover:border-primary/20"}`}>
                  <h3 className="font-semibold text-foreground mb-1">{p.name}</h3>
                  <div className="text-2xl font-bold text-foreground tracking-tight mb-2">{p.streamers}</div>
                  <p className="text-xs text-muted-foreground">{p.strength}</p>
                  {p.name === "Kick" && (
                    <span className="inline-block mt-3 text-[10px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">Current page</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 md:py-28 border-t border-border">
        <div ref={faqRef} className={`max-w-3xl mx-auto px-6 lg:px-12 transition-all duration-700 ${faqVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-3xl font-light tracking-tight text-foreground mb-10">Common questions</h2>
          <div className="space-y-px">
            {[
              { q: "Can you actually advertise on Kick?", a: "Yes. Beta Ads supports native overlay advertising on Kick streams through our creator partnerships. While Kick has limited built-in ad tools, our overlay technology works directly within the stream feed." },
              { q: "Why advertise on Kick instead of just Twitch?", a: "We recommend advertising on both. Kick grew 125% in 2025 while Twitch declined 10%. Kick has lower ad competition, longer average sessions (120+ min), and a rapidly growing audience." },
              { q: "Is Kick big enough to advertise on?", a: "Yes. Kick has grown to be the third-largest live streaming platform globally. In the Nordics, over 2,800 streamers are active with growing audiences. Early advertisers benefit from lower costs and higher attention." },
              { q: "What ad formats work on Kick?", a: "The same native overlay formats as Twitch and YouTube — static, animated, rich media, and AI voice-triggered overlays. All rendered inside the stream and invisible to ad blockers." },
            ].map((faq, i) => (
              <details key={i} className="group border-b border-border last:border-b-0">
                <summary className="flex items-center justify-between py-5 cursor-pointer text-sm font-medium text-foreground hover:text-primary transition-colors select-none">
                  {faq.q}
                  <ArrowRight className="w-4 h-4 shrink-0 ml-4 transition-transform group-open:rotate-90 text-muted-foreground" />
                </summary>
                <div className="pb-5 text-sm text-muted-foreground leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

    </MarketingPageLayout>
  );
};

export default KickAdvertising;
