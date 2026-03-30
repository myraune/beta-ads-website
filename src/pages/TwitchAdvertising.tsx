import React from "react";
import { Link } from "react-router-dom";
import { MarketingPageLayout } from "@/components/layout/MarketingPageLayout";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowRight, Monitor, Zap, Eye, MessageSquare, Shield, Users, BarChart3, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedShaderBackground from "@/components/ui/animated-shader-background";

const serifFont = { fontFamily: "'Instrument Serif', serif" };

const stats = [
  { value: "39,000+", label: "Nordic Streamers" },
  { value: "3–5×", label: "Higher Engagement" },
  { value: "90 min", label: "Avg. Session" },
  { value: "0%", label: "Ad Block Rate" },
];

const formats = [
  { icon: Monitor, title: "Static Overlay", desc: "Persistent branded graphic displayed throughout the stream. Always visible, always on brand." },
  { icon: Zap, title: "Animated Overlay", desc: "Motion graphics triggered by game events or schedule. Attention-catching without interrupting." },
  { icon: MessageSquare, title: "AI Voice-Triggered", desc: "Appears when the streamer naturally mentions your brand — powered by real-time voice recognition." },
  { icon: Eye, title: "Rich Media", desc: "Interactive full-screen branded content. Video, animation, clickable elements. The most engaging format." },
];

const why = [
  { icon: Shield, title: "Bypasses ad blockers", desc: "Rendered inside the stream itself — not browser-injected. Ad blockers have nothing to detect." },
  { icon: TrendingUp, title: "90-minute sessions", desc: "Twitch viewers average 90+ minutes per session. Your brand gets sustained, repeated exposure." },
  { icon: Users, title: "Gen Z native", desc: "73% of Twitch's audience is 18–34. The generation traditional media can't reach." },
  { icon: BarChart3, title: "Real-time analytics", desc: "Views, exposure time, chat mentions, CTR — tracked live. Full report delivered post-campaign." },
];

const TwitchAdvertising: React.FC = () => {
  const { ref: formatsRef, isVisible: formatsVisible } = useScrollAnimation();
  const { ref: whyRef, isVisible: whyVisible } = useScrollAnimation();
  const { ref: howRef, isVisible: howVisible } = useScrollAnimation();
  const { ref: faqRef, isVisible: faqVisible } = useScrollAnimation();

  return (
    <MarketingPageLayout
      seo={{
        title: "Twitch Advertising in the Nordics | Beta Ads",
        description: "Native overlay ads on Twitch that bypass ad blockers and reach Gen Z. 39,000+ Nordic streamers, 3-5x higher engagement, real-time analytics.",
        canonical: "/twitch-advertising",
        jsonLd: [
          { "@context": "https://schema.org", "@type": "Service", name: "Twitch Advertising - Beta Ads", provider: { "@id": "https://beta-ads.no/#organization" }, areaServed: ["Norway", "Sweden", "Denmark", "Finland"], url: "https://beta-ads.no/twitch-advertising" },
          { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://beta-ads.no/" }, { "@type": "ListItem", position: 2, name: "Twitch Advertising", item: "https://beta-ads.no/twitch-advertising" }] },
          { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How much does Twitch advertising cost in Norway?", acceptedAnswer: { "@type": "Answer", text: "Pricing varies by campaign scope and duration. We offer flexible pricing with no long-term contracts. Contact us for a custom quote." } }, { "@type": "Question", name: "How do Twitch overlay ads bypass ad blockers?", acceptedAnswer: { "@type": "Answer", text: "Overlay ads are rendered inside the stream itself, not injected by the browser. Ad blockers can't detect or remove them." } }] },
        ],
      }}
      cta={{
        heading: "Ready to advertise on Twitch?",
        subtext: "Book a free demo call and we'll show you what your brand looks like live on Nordic Twitch streams.",
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
              <img src="/lovable-uploads/platform-twitch.png" alt="Twitch" className="h-3.5 w-auto" />
              Twitch Advertising
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6 tracking-tight">
              <span style={serifFont} className="italic font-normal">Native ads</span>
              <br />inside Twitch
            </h1>
            <p className="text-lg text-white/65 leading-relaxed mb-10 max-w-lg">
              Overlay ads that bypass ad blockers, reach Gen Z during 90-minute sessions, and deliver 3–5× higher engagement than traditional video formats.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/demo">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-12">
                  Book a Demo <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/case-studies">
                <Button size="lg" variant="ghost" className="text-white hover:bg-white/10 rounded-full px-8 h-12 border border-white/20">
                  Case Studies
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

      {/* ── Ad Formats ── */}
      <section className="py-20 md:py-28">
        <div ref={formatsRef} className={`max-w-7xl mx-auto px-6 lg:px-12 transition-all duration-700 ${formatsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="mb-12">
            <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">Ad Formats</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">
              Four formats. All bypass ad blockers.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {formats.map((f) => (
              <div key={f.title} className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:-translate-y-1 transition-all duration-300">
                <f.icon className="w-5 h-5 text-primary mb-4" />
                <h3 className="text-base font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Twitch ── */}
      <section className="py-20 md:py-28 border-t border-border">
        <div ref={whyRef} className={`max-w-7xl mx-auto px-6 lg:px-12 transition-all duration-700 ${whyVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">Why Twitch</span>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-6">
                Where the next generation of consumers lives
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed mb-8">
                Nordic Twitch communities are smaller and more engaged than US or UK equivalents. A Norwegian streamer with 1,000 concurrent viewers has built a community where brand integrations carry genuine social weight. The audience is there. The engagement is real. Traditional ads can't reach them.
              </p>
              <div className="space-y-3">
                {[
                  "80% ad-blocker rate among Nordic 18–34s — overlay ads bypass this entirely",
                  "90+ minute average sessions — your brand gets sustained exposure, not a 6-second skip",
                  "79% of Twitch viewers support ads that help creators — native formats earn goodwill",
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                    <p className="text-sm text-muted-foreground leading-relaxed">{point}</p>
                  </div>
                ))}
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

      {/* ── How It Works ── */}
      <section className="py-20 md:py-28 border-t border-border">
        <div ref={howRef} className={`max-w-7xl mx-auto px-6 lg:px-12 transition-all duration-700 ${howVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="mb-12">
            <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">Process</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">
              Brief to live in days, not weeks.
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Brief & Strategy", desc: "Tell us your goals, audience, and budget. We design a campaign strategy for the Nordic streaming market." },
              { step: "02", title: "Streamer Selection", desc: "We match your brand with the right streamers from 39,000+ Nordic creators, filtered by audience, category, and engagement." },
              { step: "03", title: "Creative & Launch", desc: "Our team creates overlay creatives that fit naturally in streams. Campaigns go live across selected streamers simultaneously." },
              { step: "04", title: "Report & Iterate", desc: "Track performance in real time — views, exposure time, engagement, chat mentions. Full campaign report delivered post-campaign." },
            ].map((s, i) => (
              <div key={s.step} className="relative">
                {i < 3 && <div className="hidden md:block absolute top-4 left-full w-full h-px bg-border -translate-x-4" />}
                <div className="text-4xl font-bold text-primary/15 mb-4 tracking-tighter">{s.step}</div>
                <h3 className="text-base font-semibold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
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
              { q: "How much does Twitch advertising cost?", a: "Costs vary by campaign scope, number of streamers, and duration. We offer flexible pricing with no long-term contracts. Contact us for a custom quote." },
              { q: "How do overlay ads bypass ad blockers?", a: "Overlay ads are rendered inside the stream itself as part of the video feed — not browser-injected elements. Ad blocking software has nothing to detect or remove." },
              { q: "Can I target specific countries or languages?", a: "Yes. Target by country (Norway, Sweden, Finland, Denmark), language, content category, audience size, and engagement metrics. Our database covers 39,000+ Nordic streamers." },
              { q: "What results can I expect?", a: "Native overlay ads typically deliver 3–5× higher engagement than traditional display ads. Twitch sessions average 90+ minutes of sustained brand exposure." },
              { q: "Do I need to create the ad creatives?", a: "No. Our managed service includes creative production. We design overlay graphics that match your brand and fit naturally in livestream content." },
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

export default TwitchAdvertising;
