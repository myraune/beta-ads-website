import React from "react";
import { Link } from "react-router-dom";
import { MarketingPageLayout } from "@/components/layout/MarketingPageLayout";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowRight, Monitor, Zap, Eye, Play, Shield, Users, TrendingUp, Globe, Music, Dumbbell, BookOpen, Mic, Video, Gamepad2, HeartPulse } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedShaderBackground from "@/components/ui/animated-shader-background";

const serifFont = { fontFamily: "'Instrument Serif', serif" };

const stats = [
  { value: "8,200+", label: "Nordic Streamers" },
  { value: "#2", label: "Fastest-Growing Platform" },
  { value: "45 min", label: "Avg. Live Session" },
  { value: "2B+", label: "Monthly Users" },
];

const formats = [
  { icon: Monitor, title: "Static Overlay", desc: "Clean branded graphics during YouTube Live streams. Persistent visibility without interrupting the content." },
  { icon: Zap, title: "Animated Overlay", desc: "Motion graphics and dynamic creatives that capture attention during live broadcasts." },
  { icon: Play, title: "Rich Media", desc: "Interactive branded content with video, product showcases, and clickable elements." },
  { icon: Eye, title: "AI Voice-Triggered", desc: "Overlays activated by real-time voice recognition when the creator mentions your brand." },
];

const why = [
  { icon: Shield, title: "Ad-block proof", desc: "Same overlay technology as Twitch — rendered in-stream, invisible to blockers." },
  { icon: Users, title: "Broader demographics", desc: "YouTube reaches audiences beyond gaming — music, lifestyle, education, sports." },
  { icon: TrendingUp, title: "SEO + Discovery", desc: "Live content appears in YouTube search and recommendations, extending reach beyond live viewers." },
  { icon: Globe, title: "Nordic growth platform", desc: "YouTube Live grew while Twitch declined in 2025 — the fastest-rising streaming platform in the Nordics." },
];

const categories = [
  { icon: Gamepad2, label: "Gaming", streamers: "3,400+", desc: "Console, PC and mobile gaming across all genres" },
  { icon: Music, label: "Music & DJ", streamers: "1,200+", desc: "Live performances, DJ sets, music production" },
  { icon: Dumbbell, label: "Fitness & Sports", streamers: "980+", desc: "Workouts, sports events, esports" },
  { icon: BookOpen, label: "Education", streamers: "750+", desc: "Tutorials, coding, language learning" },
  { icon: Mic, label: "Podcast & Talk", streamers: "640+", desc: "News, commentary, interviews" },
  { icon: HeartPulse, label: "Lifestyle & IRL", streamers: "820+", desc: "Travel, cooking, daily life content" },
  { icon: Video, label: "Reaction & Entertainment", streamers: "410+", desc: "React content, variety shows" },
  { icon: Globe, label: "News & Current Affairs", streamers: "290+", desc: "Live news, political commentary" },
];

const platforms = [
  { name: "Twitch", streamers: "28,000+", strength: "Largest gaming audience", slug: "/twitch-advertising" },
  { name: "YouTube", streamers: "8,200+", strength: "Broadest demographics", slug: "/youtube-advertising" },
  { name: "Kick", streamers: "2,800+", strength: "Fastest growth, longest sessions", slug: "/kick-advertising" },
  { name: "Trovo", streamers: "445+", strength: "Untapped niche communities", slug: "#" },
];

const YouTubeAdvertising: React.FC = () => {
  const { ref: formatsRef, isVisible: formatsVisible } = useScrollAnimation();
  const { ref: mockupRef, isVisible: mockupVisible } = useScrollAnimation();
  const { ref: whyRef, isVisible: whyVisible } = useScrollAnimation();
  const { ref: catRef, isVisible: catVisible } = useScrollAnimation();
  const { ref: howRef, isVisible: howVisible } = useScrollAnimation();
  const { ref: compRef, isVisible: compVisible } = useScrollAnimation();
  const { ref: faqRef, isVisible: faqVisible } = useScrollAnimation();

  return (
    <MarketingPageLayout
      seo={{
        title: "YouTube Live Advertising in the Nordics | Beta Ads",
        description: "Native overlay ads on YouTube Live streams across Norway, Sweden, Finland, and Denmark. Reach gaming and lifestyle audiences with advertising that bypasses ad blockers.",
        canonical: "/youtube-advertising",
        jsonLd: [
          { "@context": "https://schema.org", "@type": "Service", name: "YouTube Live Advertising - Beta Ads", provider: { "@id": "https://beta-ads.no/#organization" }, areaServed: ["Norway", "Sweden", "Denmark", "Finland"], url: "https://beta-ads.no/youtube-advertising" },
          { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://beta-ads.no/" }, { "@type": "ListItem", position: 2, name: "YouTube Advertising", item: "https://beta-ads.no/youtube-advertising" }] },
          { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "Can you advertise on YouTube Live streams?", acceptedAnswer: { "@type": "Answer", text: "Yes. Beta Ads places native overlay ads directly inside YouTube Live streams as part of the video content, bypassing ad blockers." } }, { "@type": "Question", name: "How is YouTube Live advertising different from regular YouTube ads?", acceptedAnswer: { "@type": "Answer", text: "Regular YouTube ads can be skipped or blocked. Native overlay ads on YouTube Live are part of the stream — viewers can't skip them, and ad blockers can't remove them." } }] },
        ],
      }}
      cta={{
        heading: "Start advertising on YouTube Live",
        subtext: "Reach Nordic audiences beyond Twitch. Book a demo to see YouTube Live overlay ads in action.",
        primaryLabel: "Book a Demo",
        primaryHref: "/demo",
        secondaryLabel: "See Twitch Ads",
        secondaryHref: "/twitch-advertising",
      }}
    >

      {/* ── Hero ── */}
      <section className="relative overflow-hidden" style={{ background: 'hsl(240 11% 5%)' }}>
        <AnimatedShaderBackground heightFactor={0.85} />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent z-[1] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-36 pb-28">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-white/80 backdrop-blur-sm mb-7">
              <img src="/lovable-uploads/platform-youtube.png" alt="YouTube" className="h-3.5 w-auto" />
              YouTube Live Advertising
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6 tracking-tight">
              <span style={serifFont} className="italic font-normal">Native ads</span>
              <br />on YouTube Live
            </h1>
            <p className="text-lg text-white/65 leading-relaxed mb-10 max-w-lg">
              YouTube Live is the fastest-growing streaming platform in the Nordics. Reach gaming, music, and lifestyle audiences with overlay ads that can't be skipped or blocked.
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

      {/* ── What it looks like ── */}
      <section className="py-20 md:py-28 border-t border-border">
        <div ref={mockupRef} className={`max-w-7xl mx-auto px-6 lg:px-12 transition-all duration-700 ${mockupVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Real YouTube screenshot */}
            <div className="relative order-2 lg:order-1">
              <div className="rounded-xl overflow-hidden shadow-2xl shadow-black/20 border border-border">
                <img
                  src="/lovable-uploads/screenshot-youtube2.jpg"
                  alt="YouTube Gaming page showing live streams"
                  className="w-full h-auto block"
                  loading="lazy"
                />
              </div>
              <p className="text-[10px] text-muted-foreground mt-2">Real YouTube Gaming page — live streams across categories</p>
              <div className="absolute -inset-4 -z-10 rounded-2xl opacity-10 blur-2xl" style={{ background: "radial-gradient(ellipse at center, #ff0000, transparent 70%)" }} />
            </div>

            <div className="order-1 lg:order-2">
              <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">In-Stream</span>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-5">
                YouTube's 2B users. Your brand inside the stream.
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-md">
                YouTube Live has the broadest demographic reach of any streaming platform. Unlike Twitch's gaming-heavy audience, YouTube Live viewers span every content category — from competitive gaming to live music to fitness coaching.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-md">
                The platform's search and recommendation algorithm also means your brand is discovered beyond the live audience. Streams are archived and resurface in search results for months after the campaign ends.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "18–24 year olds", value: "41%" },
                  { label: "25–34 year olds", value: "29%" },
                  { label: "Non-gaming content", value: "52%" },
                  { label: "Mobile viewers", value: "63%" },
                ].map((stat) => (
                  <div key={stat.label} className="p-4 rounded-xl border border-border bg-card">
                    <p className="text-2xl font-bold text-foreground tracking-tight">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Ad Formats ── */}
      <section className="py-20 md:py-28 border-t border-border">
        <div ref={formatsRef} className={`max-w-7xl mx-auto px-6 lg:px-12 transition-all duration-700 ${formatsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="mb-12">
            <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">Ad Formats</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">
              Overlay technology built for YouTube Live.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {formats.map((f) => (
              <div key={f.title} className="p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:-translate-y-1 transition-all duration-300">
                <f.icon className="w-5 h-5 text-primary mb-4" />
                <h3 className="text-base font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why YouTube Live ── */}
      <section className="py-20 md:py-28 border-t border-border">
        <div ref={whyRef} className={`max-w-7xl mx-auto px-6 lg:px-12 transition-all duration-700 ${whyVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">Why YouTube Live</span>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-6">
                The platform Twitch-only brands are missing
              </h2>
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>YouTube Live is rapidly gaining ground in the Nordics. While Twitch viewership declined 10% in 2025, YouTube Live continues to grow — particularly in non-gaming categories like music, education, and lifestyle content.</p>
                <p>For brands targeting audiences beyond core gaming, YouTube Live offers access to demographics that Twitch doesn't reach. The platform's discoverability advantage means live content surfaces in regular YouTube search results, extending your brand's reach beyond the live audience.</p>
                <p>Combined with Twitch and Kick campaigns through Beta Ads, YouTube Live ensures your brand reaches the full Nordic streaming audience — not just one slice of it.</p>
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

      {/* ── Content Categories ── */}
      <section className="py-20 md:py-28 border-t border-border">
        <div ref={catRef} className={`max-w-7xl mx-auto px-6 lg:px-12 transition-all duration-700 ${catVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="mb-12">
            <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">Content Categories</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground max-w-2xl">
              Beyond gaming — the broadest streaming audience in the Nordics
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed mt-3 max-w-xl">
              52% of YouTube Live viewing in the Nordics is non-gaming content. Reach audiences traditional advertisers consistently miss.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {categories.map((cat) => (
              <div key={cat.label} className="p-5 rounded-2xl border border-border bg-card hover:border-primary/20 transition-colors">
                <cat.icon className="w-5 h-5 text-primary mb-3" />
                <h3 className="text-sm font-semibold text-foreground mb-1">{cat.label}</h3>
                <p className="text-xs text-muted-foreground mb-2">{cat.desc}</p>
                <p className="text-xs font-semibold text-primary">{cat.streamers} streamers</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-20 md:py-28 border-t border-border">
        <div ref={howRef} className={`max-w-7xl mx-auto px-6 lg:px-12 transition-all duration-700 ${howVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="mb-12">
            <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">Process</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">
              Same streamlined process. Any platform.
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Brief & Strategy", desc: "Define your goals, audience, and budget. We design a YouTube Live campaign strategy for the Nordic market." },
              { step: "02", title: "Creator Selection", desc: "We match your brand with YouTube Live streamers from our network, filtered by audience demographics and category." },
              { step: "03", title: "Creative & Launch", desc: "Our team creates overlay creatives optimized for YouTube Live's player. Campaigns launch across selected creators." },
              { step: "04", title: "Report & Iterate", desc: "Real-time performance tracking with full campaign reporting — views, exposure, engagement, and audience insights." },
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

      {/* ── Multi-Platform ── */}
      <section className="py-20 md:py-28 border-t border-border">
        <div ref={compRef} className={`max-w-7xl mx-auto px-6 lg:px-12 transition-all duration-700 ${compVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="mb-12">
            <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">Multi-Platform</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">
              Don't choose one platform. Own all of them.
            </h2>
            <p className="text-muted-foreground mt-3 max-w-2xl text-sm leading-relaxed">
              Beta Ads runs native overlay campaigns across YouTube, Twitch, Kick, and Trovo from a single dashboard. No single platform captures the full Nordic streaming audience.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-5">
            {platforms.map((p) => (
              <Link key={p.name} to={p.slug}>
                <div className={`p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${p.name === "YouTube" ? "border-primary/40 bg-primary/5" : "border-border bg-card hover:border-primary/20"}`}>
                  <h3 className="font-semibold text-foreground mb-1">{p.name}</h3>
                  <div className="text-2xl font-bold text-foreground tracking-tight mb-2">{p.streamers}</div>
                  <p className="text-xs text-muted-foreground">{p.strength}</p>
                  {p.name === "YouTube" && (
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
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-10">Common questions</h2>
          <div className="space-y-px">
            {[
              { q: "Can you advertise on YouTube Live streams?", a: "Yes. Beta Ads places native overlay ads directly inside YouTube Live streams. They're rendered as part of the video content — bypassing ad blockers and providing sustained brand visibility." },
              { q: "How is this different from regular YouTube ads?", a: "Regular YouTube ads (pre-roll, mid-roll) can be skipped or blocked. Native overlay ads are part of the stream — viewers can't skip them, and ad blockers can't remove them." },
              { q: "What categories of streamers are on YouTube Live?", a: "Our 8,200+ Nordic YouTube Live streamers span gaming, music, sports, education, lifestyle, and IRL content — considerably broader than Twitch's gaming-dominant catalog." },
              { q: "Can I run campaigns on both Twitch and YouTube simultaneously?", a: "Yes, and we recommend it. Beta Ads manages multi-platform campaigns from a single dashboard, giving your brand presence across the full Nordic streaming audience." },
              { q: "Does YouTube Live content stay discoverable after the campaign ends?", a: "Yes. YouTube archives live streams as VODs that continue to surface in search results. Your overlay ad is present in archived content, extending the campaign's effective reach well beyond the live audience." },
              { q: "How does audience targeting work on YouTube Live?", a: "We filter our 8,200+ Nordic YouTube Live streamers by content category, country, language, audience demographics, and average concurrent viewers. You approve the final creator list before launch." },
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

export default YouTubeAdvertising;
