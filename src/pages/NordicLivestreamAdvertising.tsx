import React from "react";
import { Link } from "react-router-dom";
import { MarketingPageLayout } from "@/components/layout/MarketingPageLayout";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedShaderBackground from "@/components/ui/lazy-animated-background";

const serif = { fontFamily: "'Instrument Serif', serif" };

const heroStats = [
  { value: "105M", label: "monthly Twitch viewers" },
  { value: "72%", label: "aged 16 to 34" },
  { value: "3.4M", label: "Nordic stream hours / yr" },
  { value: "<5%", label: "of ad budgets go here" },
];

// Platform hours watched, 2025 full year (Stream Hatchet Yearly report). Billions.
const platforms = [
  { name: "Twitch", value: 19.2, display: "19.2B", note: "largest, but declining", accent: true },
  { name: "YouTube Gaming", value: 8.8, display: "8.8B", note: "record year" },
  { name: "Kick", value: 4.5, display: "4.5B", note: "up 131% year over year" },
];
const platformMax = 19.2;

// Nordic Twitch inventory, streamed hours per year (SullyGnome, July 2026 snapshot).
const nordic = [
  { lang: "Finnish", value: 1.142, display: "1.14M" },
  { lang: "Swedish", value: 1.133, display: "1.13M" },
  { lang: "Danish", value: 0.691, display: "691K" },
  { lang: "Norwegian", value: 0.504, display: "504K" },
];
const nordicMax = 1.142;

// Real, verified Beta Ads Nordic campaigns (from the case studies on this site).
const proof = [
  { brand: "Samsung", logo: "/lovable-uploads/logo-samsung.png", metric: "500,131", label: "completed views", extra: "2.93% avg CTR", video: "/lovable-uploads/overlay-samsung.webm", href: "/case-study/samsung" },
  { brand: "Shure", logo: "/lovable-uploads/logo-shure.png", metric: "9.12%", label: "peak-day CTR", extra: "182,554 views", video: "/lovable-uploads/overlay-shure-gca.webm", href: "/case-study/shure" },
  { brand: "Komplett", logo: "/lovable-uploads/logo-komplett.png", metric: "151,278", label: "display views", extra: "1.17% CTR, 34 streamers", video: "/lovable-uploads/overlay-komplett.webm", href: "/case-study/komplett" },
  { brand: "Surfshark", logo: "/lovable-uploads/logo-surfshark.png", metric: "90,473", label: "verified views", extra: "1.39% CTR", video: "/lovable-uploads/overlay-surfshark.webm", href: "/case-study/surfshark" },
];

const steps = [
  { step: "01", title: "The brief", desc: "Your goal, market and budget bracket. We tell you honestly whether the format fits before anyone spends." },
  { step: "02", title: "The match", desc: "We filter 39,000+ Nordic creators by category, language and verified CTR history, then you approve the shortlist." },
  { step: "03", title: "The overlay", desc: "We produce the creative and it renders natively in each stream through OBS. No pre-roll, no pop-up, no ad-block." },
  { step: "04", title: "The proof", desc: "Real-time views, verified CTR and clip verification, broken down by streamer and day. Not a screenshot, a receipt." },
];

const NordicLivestreamAdvertising: React.FC = () => {
  const audRef = useScrollAnimation();
  const platRef = useScrollAnimation();
  const nordRef = useScrollAnimation();
  const overlayRef = useScrollAnimation();
  const gapRef = useScrollAnimation();
  const proofRef = useScrollAnimation();
  const stepRef = useScrollAnimation();

  return (
    <MarketingPageLayout
      seo={{
        title: "Nordic Livestream Advertising: The Brand's Field Guide | Beta Ads",
        description:
          "Who is watching, which platforms matter, what Nordic inventory exists, and what native overlay campaigns actually deliver. A data-backed field guide for brands, with real Beta Ads campaign results.",
        canonical: "/nordic-livestream-advertising",
        jsonLd: [
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "The Nordic Livestream Advertising Landscape in 2026",
            author: { "@type": "Organization", name: "Beta Ads" },
            publisher: { "@type": "Organization", name: "Beta Ads", logo: { "@type": "ImageObject", url: "https://beta-ads.no/lovable-uploads/logo-color.png" } },
            datePublished: "2026-07-13",
          },
        ],
      }}
      cta={{
        heading: "Put your brand inside the stream",
        subtext: "Tell us your market and goal. We will tell you honestly whether native livestream advertising fits, and what it would take.",
        primaryLabel: "Book a demo",
        primaryHref: "/contact",
        secondaryLabel: "See what it costs",
        secondaryHref: "/twitch-advertising-cost",
      }}
    >
      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <AnimatedShaderBackground heightFactor={0.85} />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent z-[1] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-36 pb-24">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-white/80 backdrop-blur-sm mb-7">
              Field guide, 2026
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.04] mb-6 tracking-tight">
              The Nordic audience nobody
              <br />
              else can <span style={serif} className="italic font-normal text-primary">reach</span>.
            </h1>
            <p className="text-lg text-white/65 leading-relaxed mb-10 max-w-xl">
              Young, engaged, ad-block-proof, and watching millions of hours of Nordic streaming a year. Here is who they are, where they watch, and what a native campaign actually delivers.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/contact">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-12">
                  Book a demo <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/twitch-advertising-cost">
                <Button size="lg" variant="ghost" className="text-white hover:bg-white/10 rounded-full px-8 h-12 border border-white/20">
                  What it costs
                </Button>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px mt-16 border border-white/10 rounded-2xl overflow-hidden bg-white/10">
            {heroStats.map((s) => (
              <div key={s.label} className="bg-black/30 backdrop-blur-sm px-6 py-6">
                <div className="text-3xl font-bold text-white tracking-tight">{s.value}</div>
                <div className="text-xs text-white/50 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The audience ── */}
      <section className="py-20 md:py-28 border-t border-border">
        <div ref={audRef.ref} className={`max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center transition-all duration-700 ${audRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="max-w-xl">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">Who is watching</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-5">
              The hardest audience in media to reach anywhere else
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed mb-4">
              Twitch draws 105 million average monthly visitors, and 70% of them are between 18 and 34, per Amazon Ads' own Twitch advertising figures. GWI puts the audience at roughly 72% aged 16 to 34, two thirds male, and over-indexing the top 10% of income earners worldwide.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              The number that matters most: 65% of Twitch viewers cannot be reached on leading social channels (GWI, cited by Amazon Ads). This is not an audience you are already buying somewhere cheaper.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-px border border-border rounded-2xl overflow-hidden bg-border">
            {[
              { v: "105M", l: "avg monthly visitors", s: "Amazon Ads" },
              { v: "70%", l: "aged 18 to 34", s: "Amazon Ads" },
              { v: "65%", l: "unreachable on social", s: "GWI" },
              { v: "72%", l: "aged 16 to 34", s: "GWI" },
            ].map((x) => (
              <div key={x.l} className="bg-card px-7 py-8">
                <div className="text-4xl font-bold tracking-tight text-foreground">{x.v}</div>
                <div className="text-sm text-muted-foreground mt-1">{x.l}</div>
                <div className="text-[11px] text-muted-foreground/50 mt-3 uppercase tracking-wider">{x.s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The platforms ── */}
      <section className="py-20 md:py-28 border-t border-border">
        <div ref={platRef.ref} className={`max-w-7xl mx-auto px-6 lg:px-12 transition-all duration-700 ${platRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="max-w-2xl mb-14">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">Where they watch</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">Three platforms, 36.4 billion hours</h2>
            <p className="text-base text-muted-foreground leading-relaxed mt-4">
              Live streaming had a real year in 2025: 36.4 billion hours watched across the major platforms, up 6%, per Stream Hatchet. Twitch is still the centre of gravity, but Kick's growth is the fastest of any platform.
            </p>
          </div>
          <div className="space-y-7 max-w-4xl">
            {platforms.map((p) => (
              <div key={p.name}>
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-base font-semibold text-foreground">{p.name}</span>
                  <span className="text-sm text-muted-foreground">{p.display} hours <span className="text-muted-foreground/50">· {p.note}</span></span>
                </div>
                <div className="h-4 rounded-full bg-muted overflow-hidden">
                  <div className={`h-full rounded-full ${p.accent ? "bg-primary" : "bg-foreground/25"}`} style={{ width: `${Math.round((p.value / platformMax) * 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-8 text-xs text-muted-foreground/60">
            <img src="/lovable-uploads/icon-streamhatchet.png" alt="Stream Hatchet" className="h-4 w-auto opacity-60" />
            Source: Stream Hatchet 2025 Yearly Live Streaming Trends Report (hours watched, full year 2025).
          </div>
        </div>
      </section>

      {/* ── Nordic inventory ── */}
      <section className="py-20 md:py-28 border-t border-border">
        <div ref={nordRef.ref} className={`max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] gap-16 items-center transition-all duration-700 ${nordRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="max-w-md">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">The Nordic inventory</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-5">3.4 million hours of Nordic Twitch a year</h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              This is the supply a Nordic campaign draws from: streamed hours per year by language, snapshotted from SullyGnome. Finnish and Swedish lead, but Norwegian and Danish carry the highest CPMs and the least competition.
            </p>
          </div>
          <div className="space-y-6">
            {nordic.map((n) => (
              <div key={n.lang}>
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-base font-medium text-foreground">{n.lang}</span>
                  <span className="text-sm font-semibold text-foreground tabular-nums">{n.display}</span>
                </div>
                <div className="h-4 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${Math.round((n.value / nordicMax) * 100)}%` }} />
                </div>
              </div>
            ))}
            <p className="text-xs text-muted-foreground/60 pt-2">
              SullyGnome, July 2026 snapshot. Streamed hours (supply), not hours watched.
            </p>
          </div>
        </div>
      </section>

      {/* ── The overlay in action ── */}
      <section className="py-20 md:py-28 border-t border-border">
        <div ref={overlayRef.ref} className={`max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center transition-all duration-700 ${overlayRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="relative rounded-2xl overflow-hidden border border-border shadow-2xl bg-black aspect-video">
            <video
              src="/lovable-uploads/overlay-samsung.webm"
              autoPlay loop muted playsInline
              className="w-full h-full object-cover"
            />
            <span className="absolute top-3 left-3 flex items-center gap-1.5 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-white" /> Live
            </span>
          </div>
          <div className="max-w-xl">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">The format</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-5">The ad renders inside the stream</h2>
            <p className="text-base text-muted-foreground leading-relaxed mb-4">
              That is a real Beta Ads overlay for the Samsung Galaxy S25 Ultra, running natively in a Norwegian Twitch stream. It is drawn into the video feed through OBS, so ad-block software has nothing to detect and nothing to remove.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              That matters because roughly 64% of livestream viewers run ad-block (inStreamly, 2026). A native overlay is one of the few formats this audience does not, and cannot, skip.
            </p>
          </div>
        </div>
      </section>

      {/* ── The opportunity ── */}
      <section className="py-24 md:py-32 border-t border-border bg-foreground text-background">
        <div ref={gapRef.ref} className={`max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-12 items-center transition-all duration-700 ${gapRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="text-[120px] md:text-[180px] font-bold leading-none tracking-tighter text-primary">
            &lt;5<span className="text-[0.5em] align-top">%</span>
          </div>
          <div className="max-w-lg">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-5">of media budgets reach an audience this size</h2>
            <p className="text-base text-background/70 leading-relaxed">
              Gaming and live streaming still take less than 5% of overall media investment, per eMarketer data cited in Dentsu's 2025 Gaming Trends Report, despite reaching billions of hours of the exact demographic brands say they want. That gap is the entire opportunity, and it closes a little every quarter.
            </p>
          </div>
        </div>
      </section>

      {/* ── Proof: real Nordic campaigns ── */}
      <section className="py-20 md:py-28 border-t border-border">
        <div ref={proofRef.ref} className={`max-w-7xl mx-auto px-6 lg:px-12 transition-all duration-700 ${proofRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="max-w-2xl mb-14">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">Proof, not promises</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">What it delivers in the Nordics</h2>
            <p className="text-base text-muted-foreground leading-relaxed mt-4">
              Nine verified Nordic campaigns in 2025, drawn from a pool of 39,000+ indexed creators. These are real numbers from real streams, and every one links to the full case study.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {proof.map((p) => (
              <Link key={p.brand} to={p.href} className="group rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/40 hover:-translate-y-1 transition-all duration-300">
                <div className="relative aspect-video bg-black overflow-hidden">
                  <video src={p.video} autoPlay loop muted playsInline className="w-full h-full object-cover opacity-90" />
                </div>
                <div className="p-6">
                  <img src={p.logo} alt={p.brand} className="h-5 w-auto object-contain mb-5 opacity-80" style={{ filter: "brightness(0) invert(0.75)" }} />
                  <div className="text-3xl font-bold tracking-tight text-foreground">{p.metric}</div>
                  <div className="text-sm text-muted-foreground mt-0.5">{p.label}</div>
                  <div className="text-xs text-muted-foreground/70 mt-3 pt-3 border-t border-border flex items-center justify-between">
                    {p.extra}
                    <ArrowUpRight className="w-3.5 h-3.5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-12 grid sm:grid-cols-2 gap-6 max-w-4xl">
            <div className="flex items-start gap-4 p-6 rounded-2xl border border-border bg-card">
              <div className="text-3xl font-bold text-primary tracking-tight shrink-0">44%</div>
              <p className="text-sm text-muted-foreground leading-relaxed">of Twitch viewers have bought a product a streamer they watch recommended (Twitch RPG survey, US, Feb 2023).</p>
            </div>
            <div className="flex items-start gap-4 p-6 rounded-2xl border border-border bg-card">
              <div className="text-3xl font-bold text-primary tracking-tight shrink-0">67%</div>
              <p className="text-sm text-muted-foreground leading-relaxed">more likely to consider a brand after seeing it supported on a stream they watch (Amazon Marketing Cloud, 2023).</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── How a brand enters ── */}
      <section className="py-20 md:py-28 border-t border-border">
        <div ref={stepRef.ref} className={`max-w-7xl mx-auto px-6 lg:px-12 transition-all duration-700 ${stepRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="max-w-2xl mb-14">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">How it works</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">From brief to broadcast, managed end to end</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <div key={s.step} className="relative">
                {i < steps.length - 1 && <div className="hidden md:block absolute top-4 left-full w-full h-px bg-border -translate-x-4" />}
                <div className="text-4xl font-bold text-primary/15 mb-4 tracking-tighter">{s.step}</div>
                <h3 className="text-base font-semibold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MarketingPageLayout>
  );
};

export default NordicLivestreamAdvertising;
