import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { SPFooter } from '@/components/sections/SPFooter';
import MarketsSection from '@/components/sections/MarketsSection';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import founderImage from '@/assets/founder-andreas.jpeg';
import cityOslo from '@/assets/city-oslo.jpg';
import cityChicago from '@/assets/city-chicago.jpg';

interface AboutUsProps {
  t: any;
}

const serifFont = { fontFamily: "'Instrument Serif', serif" };

const AboutUs: React.FC<AboutUsProps> = ({ t }) => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: locRef, isVisible: locVisible } = useScrollAnimation();
  const { ref: marketsRef, isVisible: marketsVisible } = useScrollAnimation();

  return (
    <div className="min-h-screen text-foreground relative">
      <SEO
        title="About Us | Beta Ads"
        description="Meet the team behind Beta Ads, the leading native advertising platform for Twitch and livestreams in Norway and the Nordics. Founded by Andreas Myraune in Oslo."
        canonical="/about"
        ogType="website"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "About Beta Ads",
          "description": "Meet the team behind Beta Ads, the leading native advertising platform for Twitch and livestreams in Norway and the Nordics.",
          "url": "https://beta-ads.no/about",
          "isPartOf": { "@id": "https://beta-ads.no/#website" }
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-[500px] pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse 80% 70% at 30% 0%, hsl(var(--primary) / 0.08), transparent 70%)',
        }}
      />

      {/* ── Section 1 — Hero ── */}
      <section className="relative">
        <div
          ref={heroRef}
          className={`max-w-[1200px] mx-auto px-6 lg:px-12 pt-32 lg:pt-44 pb-24 lg:pb-32 transition-all duration-1000 ease-out ${
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="grid lg:grid-cols-[58%_42%] gap-12 lg:gap-8 items-start">
            <div className="max-w-[480px]">
              <p className="text-[11px] uppercase tracking-[0.16em] text-primary mb-5 font-light">About</p>
              <h1 className="text-4xl lg:text-[56px] leading-[1.1] tracking-tight text-foreground mb-8" style={serifFont}>
                We make ads that feel like{' '}
                <span className="italic text-primary">content</span>, not interruption.
              </h1>
              <div className="space-y-5 mb-10">
                <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                  Native advertising on Twitch. We work with brands and streamers to create ads that feel like content, not interruption.
                </p>
                <p className="text-base lg:text-lg text-muted-foreground/70 leading-relaxed">
                  We place sponsored overlays inside live streams across the Nordics. Brands get reach. Streamers get paid. Viewers get content that respects their attention.
                </p>
              </div>
              <a href="https://calendar.app.google/coW5NLQJtLxfRer19" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary text-sm tracking-wide hover:gap-3 transition-all duration-300">
                Book a call <ArrowRight size={14} />
              </a>
            </div>
            <div className="lg:-mr-16 xl:-mr-24">
              <div className="overflow-hidden rounded-[14px]">
                <img src={founderImage} alt="Andreas Myraune, Founder of Beta Ads" className="w-full aspect-[3/4] object-cover object-[center_30%]" />
              </div>
              <div className="mt-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-primary">Founder</p>
                <p className="text-sm text-muted-foreground mt-0.5">Andreas Myraune</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2 — Locations ── */}
      <section className="relative">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12"><div className="border-t border-foreground/[0.06]" /></div>
        <div ref={locRef} className="max-w-[1200px] mx-auto px-6 lg:px-12 py-32 lg:py-40">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            <div className={`lg:w-[60%] transition-all duration-1000 ease-out ${locVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="overflow-hidden rounded-[14px] relative">
                <img src={cityOslo} alt="Oslo, Norway" className="w-full aspect-[16/10] object-cover transition-transform duration-700 hover:scale-[1.03]" />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
              </div>
              <div className="mt-4">
                <p className="text-[10px] uppercase tracking-[0.25em] text-primary">Headquarters</p>
                <p className="text-lg text-foreground mt-0.5" style={serifFont}>Oslo</p>
              </div>
            </div>
            <div className={`lg:w-[35%] lg:pt-[5vw] transition-all duration-1000 delay-200 ease-out ${locVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="overflow-hidden rounded-[14px] relative">
                <img src={cityChicago} alt="Chicago, USA" className="w-full aspect-[4/3] object-cover transition-transform duration-700 hover:scale-[1.03]" />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
              </div>
              <div className="mt-4">
                <p className="text-[10px] uppercase tracking-[0.25em] text-primary">Office</p>
                <p className="text-lg text-foreground mt-0.5" style={serifFont}>Chicago</p>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-16 italic" style={serifFont}>Founded in Oslo. Growing from Chicago.</p>
        </div>
      </section>

      <MarketsSection marketsRef={marketsRef} marketsVisible={marketsVisible} />
      <SPFooter />
    </div>
  );
};

export default AboutUs;
