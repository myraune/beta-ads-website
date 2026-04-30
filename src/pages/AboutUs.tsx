import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { SPFooter } from '@/components/sections/SPFooter';
import MarketsSection from '@/components/sections/MarketsSection';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import cityOslo from '@/assets/city-oslo.jpg';
import cityChicago from '@/assets/city-chicago.jpg';

interface AboutUsProps {
  t: any;
}

const serifFont = { fontFamily: "'Instrument Serif', serif" };

// Verified totals aggregated from the nine case studies shipped on this site.
const workStats = [
  { value: '1.6M+', label: 'Verified views delivered' },
  { value: '9', label: 'Case studies published' },
  { value: '50+', label: 'Nordic creators worked with' },
  { value: '3', label: 'Platforms: Twitch · Kick · YouTube' },
];

const principles = [
  {
    title: 'Verified numbers, always',
    body:
      'Every campaign we run reports back with view-counts, verified clicks and on-screen time audited against the platform feed — not rough estimates.',
  },
  {
    title: 'Native over disruptive',
    body:
      'Ad-blocked viewers don\u2019t see pre-rolls. They do see streamer overlays. We place ads inside the stream frame so they read as content, not interruption.',
  },
  {
    title: 'The creator is the product',
    body:
      'We don\u2019t treat streamers as inventory. Campaigns are built around whose audience a brand actually wants to reach — one channel at a time.',
  },
];

const AboutUs: React.FC<AboutUsProps> = ({ t }) => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: storyRef, isVisible: storyVisible } = useScrollAnimation();
  const { ref: workRef, isVisible: workVisible } = useScrollAnimation();
  const { ref: principlesRef, isVisible: principlesVisible } =
    useScrollAnimation();
  const { ref: locRef, isVisible: locVisible } = useScrollAnimation();
  const { ref: marketsRef, isVisible: marketsVisible } = useScrollAnimation();

  return (
    <div className="min-h-screen text-foreground relative">
      <SEO
        title="About Us | Beta Ads"
        description="Beta Ads is a native advertising platform for Twitch, Kick and YouTube livestreams across the Nordics. Founded in Oslo, now operating from Oslo and Chicago."
        canonical="/about"
        ogType="website"
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            name: 'About Beta Ads',
            description:
              'Beta Ads is a native advertising platform for Twitch, Kick and YouTube livestreams across the Nordics. Founded in Oslo, now operating from Oslo and Chicago.',
            url: 'https://beta-ads.no/about',
            isPartOf: { '@id': 'https://beta-ads.no/#website' },
            about: { '@id': 'https://beta-ads.no/#organization' },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'Person',
            '@id': 'https://beta-ads.no/#founder',
            name: 'Andreas Myraune',
            givenName: 'Andreas',
            familyName: 'Myraune',
            jobTitle: 'Founder & CEO',
            description:
              'Founder and CEO of Beta Ads (Beta Agency AS), a Nordic livestream advertising platform based in Oslo.',
            url: 'https://beta-ads.no/about',
            worksFor: { '@id': 'https://beta-ads.no/#organization' },
            nationality: { '@type': 'Country', name: 'Norway' },
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Oslo',
              addressCountry: 'NO',
            },
            sameAs: ['https://www.linkedin.com/in/andreasmyraune'],
          },
        ]}
      />

      <div
        className="absolute inset-x-0 top-0 h-[500px] pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 70% at 30% 0%, hsl(var(--primary) / 0.08), transparent 70%)',
        }}
      />

      {/* ── Hero ── */}
      <section className="relative">
        <div
          ref={heroRef}
          className={`max-w-7xl mx-auto px-6 lg:px-12 pt-32 lg:pt-44 pb-20 lg:pb-28 transition-all duration-1000 ease-out ${
            heroVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-[11px] uppercase tracking-[0.22em] text-primary mb-6 font-semibold">
            About
          </p>
          <h1
            className="text-4xl md:text-6xl lg:text-7xl leading-[1.04] tracking-tight text-foreground mb-10 max-w-4xl"
            style={serifFont}
          >
            Ads that feel like{' '}
            <span className="italic text-primary">content</span>,
            <br className="hidden md:block" /> not interruption.
          </h1>
          <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-10 lg:gap-16 max-w-5xl">
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
              Beta Ads is a native advertising platform for live streaming.
              We place sponsored overlays inside Twitch, Kick and YouTube
              streams across the Nordics, so brands reach audiences that
              other media formats can't.
            </p>
            <p className="text-lg lg:text-xl text-muted-foreground/70 leading-relaxed">
              Brands get verified reach. Streamers get paid to keep making
              what their audience already tunes in for. Viewers get ads
              that respect their attention — and that survive ad-block.
            </p>
          </div>
          <div className="mt-12 flex items-center gap-5">
            <a
              href="https://calendar.app.google/coW5NLQJtLxfRer19"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-white hover:bg-primary/90 px-7 h-12 rounded-full text-sm font-medium tracking-wide transition-colors"
            >
              Book a call <ArrowRight size={14} />
            </a>
            <a
              href="/case-studies"
              className="inline-flex items-center gap-2 text-foreground/70 hover:text-foreground text-sm tracking-wide transition-colors"
            >
              See the work <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* ── Story ── */}
      <section className="relative border-t border-foreground/[0.06]">
        <div
          ref={storyRef}
          className={`max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-32 transition-all duration-1000 ease-out ${
            storyVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="grid lg:grid-cols-[minmax(0,360px)_1fr] gap-12 lg:gap-24 items-start">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-primary mb-4 font-semibold">
                Why we exist
              </p>
              <h2
                className="text-3xl lg:text-4xl leading-[1.15] tracking-tight text-foreground"
                style={serifFont}
              >
                Live streaming is the largest daily attention pool for
                under-35s. Advertising hasn't caught up.
              </h2>
            </div>
            <div className="space-y-6 max-w-2xl">
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                Nordic 18–34s spend more time on Twitch, YouTube Gaming
                and Kick than on any single broadcaster — yet most ad budgets
                still flow to formats that audience actively blocks or
                skips. Pre-roll gets muted. Display gets filtered. Podcast
                sponsorships fall back on the host-read model.
              </p>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                Beta Ads started in Oslo in 2023 to run the same playbook
                natively inside the live stream frame. Overlays rendered into
                the creator's own layout, chat-pinned CTAs the streamer
                reads aloud, and verified-view reporting that treats spend
                as seriously as any other paid channel.
              </p>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                Today we run campaigns for brands like Samsung, Surfshark,
                Shure, Komplett, and Høyskolen Kristiania across Norway,
                Sweden, Denmark, and Finland — measured, repeatable, and
                native by design.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Work / By the numbers ── */}
      <section className="relative border-t border-foreground/[0.06]">
        <div
          ref={workRef}
          className={`max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-32 transition-all duration-1000 ease-out ${
            workVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-[11px] uppercase tracking-[0.22em] text-primary mb-4 font-semibold">
            By the numbers
          </p>
          <h2
            className="text-3xl lg:text-4xl font-light tracking-tight text-foreground mb-12 max-w-2xl"
          >
            Verified delivery across nine published case studies
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-foreground/[0.06]">
            {workStats.map((s, i) => (
              <div
                key={s.label}
                className={`py-8 ${
                  i > 0 ? 'lg:pl-8 lg:border-l border-foreground/[0.06]' : ''
                } ${i > 0 && i % 2 !== 0 ? 'pl-6' : ''} ${
                  i > 1 ? 'pt-6 lg:pt-8' : ''
                } pr-4`}
              >
                <div className="text-3xl lg:text-4xl font-light text-foreground tracking-tight mb-2">
                  {s.value}
                </div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
          <a
            href="/case-studies"
            className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:gap-3 transition-all duration-300 mt-10"
          >
            Read the campaigns <ArrowRight size={14} />
          </a>
        </div>
      </section>

      {/* ── Principles ── */}
      <section className="relative border-t border-foreground/[0.06]">
        <div
          ref={principlesRef}
          className={`max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-32 transition-all duration-1000 ease-out ${
            principlesVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-[11px] uppercase tracking-[0.22em] text-primary mb-4 font-semibold">
            How we work
          </p>
          <h2
            className="text-3xl lg:text-4xl font-light tracking-tight text-foreground mb-14 max-w-2xl"
          >
            Three principles, in order of priority
          </h2>
          <div className="space-y-10 max-w-3xl">
            {principles.map((p, i) => (
              <div
                key={p.title}
                className="flex gap-8 pb-10 border-b border-foreground/[0.06] last:border-b-0 last:pb-0"
              >
                <div
                  className="text-3xl lg:text-4xl font-light text-primary/40 tabular-nums shrink-0 w-12 pt-1 tracking-tight"
                  style={serifFont}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div>
                  <h3 className="text-lg lg:text-xl font-medium text-foreground mb-2 tracking-tight">
                    {p.title}
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {p.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Locations ── */}
      <section className="relative border-t border-foreground/[0.06]">
        <div
          ref={locRef}
          className="max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-32"
        >
          <p className="text-[11px] uppercase tracking-[0.22em] text-primary mb-4 font-semibold">
            Where we are
          </p>
          <h2
            className="text-3xl lg:text-4xl font-light tracking-tight text-foreground mb-12 max-w-2xl"
          >
            Founded in Oslo.{' '}
            <span className="italic" style={serifFont}>
              Growing from Chicago.
            </span>
          </h2>
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            <div
              className={`transition-all duration-1000 ease-out ${
                locVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="overflow-hidden rounded-2xl relative">
                <img
                  src={cityOslo}
                  alt="Oslo, Norway"
                  className="w-full aspect-[16/10] object-cover transition-transform duration-700 hover:scale-[1.03]"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
              </div>
              <div className="flex items-baseline justify-between mt-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-primary">
                    Headquarters
                  </p>
                  <p
                    className="text-xl text-foreground mt-0.5"
                    style={serifFont}
                  >
                    Oslo
                  </p>
                </div>
                <p className="text-xs text-muted-foreground tabular-nums">
                  Since 2023
                </p>
              </div>
            </div>
            <div
              className={`transition-all duration-1000 delay-200 ease-out ${
                locVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="overflow-hidden rounded-2xl relative">
                <img
                  src={cityChicago}
                  alt="Chicago, USA"
                  className="w-full aspect-[16/10] object-cover transition-transform duration-700 hover:scale-[1.03]"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
              </div>
              <div className="flex items-baseline justify-between mt-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-primary">
                    Office
                  </p>
                  <p
                    className="text-xl text-foreground mt-0.5"
                    style={serifFont}
                  >
                    Chicago
                  </p>
                </div>
                <p className="text-xs text-muted-foreground tabular-nums">
                  North American ops
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <MarketsSection marketsRef={marketsRef} marketsVisible={marketsVisible} />

      {/* ── Final CTA ── */}
      <section className="relative border-t border-foreground/[0.06]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-32">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <p className="text-[11px] uppercase tracking-[0.22em] text-primary mb-4 font-semibold">
                Start a campaign
              </p>
              <h2
                className="text-3xl lg:text-4xl font-light tracking-tight text-foreground"
                style={serifFont}
              >
                Want native ads running on Nordic live streams?
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://calendar.app.google/coW5NLQJtLxfRer19"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-white hover:bg-primary/90 px-8 h-12 rounded-full text-sm font-medium tracking-wide transition-colors"
              >
                Book a call <ArrowRight size={14} />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 text-foreground/80 hover:text-foreground border border-foreground/15 px-8 h-12 rounded-full text-sm font-medium tracking-wide transition-colors"
              >
                Contact us
              </a>
            </div>
          </div>
        </div>
      </section>

      <SPFooter />
    </div>
  );
};

export default AboutUs;
