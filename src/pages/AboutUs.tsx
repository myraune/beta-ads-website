import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Footer } from '@/components/sections/Footer';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import founderImage from '@/assets/founder-andreas.jpeg';
import cityOslo from '@/assets/city-oslo.jpg';
import cityChicago from '@/assets/city-chicago.jpg';

interface AboutUsProps {
  t: any;
  language: string;
  setLanguage: (lang: string) => void;
}

const serifFont = { fontFamily: "'Instrument Serif', serif" };

const AboutUs: React.FC<AboutUsProps> = ({ t, language, setLanguage }) => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: locRef, isVisible: locVisible } = useScrollAnimation();
  const { ref: marketsRef, isVisible: marketsVisible } = useScrollAnimation();

  return (
    <div className="min-h-screen text-foreground relative">
      {/* Aurora reinforcement gradient */}
      <div
        className="absolute inset-x-0 top-0 h-[500px] pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse 80% 70% at 30% 0%, hsl(0, 80%, 50%, 0.12), transparent 70%)',
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
            {/* Left column */}
            <div className="max-w-[480px]">
              <p className="text-[11px] uppercase tracking-[0.16em] text-primary mb-5 font-light">
                About
              </p>
              <h1
                className="text-4xl lg:text-[56px] leading-[1.1] tracking-tight text-foreground mb-8"
                style={serifFont}
              >
                We make ads that feel like{' '}
                <span className="italic text-primary">content</span>, not
                interruption.
              </h1>
              <div className="space-y-5 mb-10">
                <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                  Native advertising on Twitch. We work with brands and streamers to create ads that feel like content, not interruption.
                </p>
                <p className="text-base lg:text-lg text-muted-foreground/70 leading-relaxed">
                  We place sponsored overlays inside live streams across the Nordics. Brands get reach. Streamers get paid. Viewers get content that respects their attention.
                </p>
              </div>
              <a
                href="https://calendar.app.google/coW5NLQJtLxfRer19"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary text-sm tracking-wide hover:gap-3 transition-all duration-300"
              >
                Book a call <ArrowRight size={14} />
              </a>
            </div>

            {/* Right column — Founder */}
            <div className="lg:-mr-16 xl:-mr-24">
              <div className="overflow-hidden rounded-[14px]">
                <img
                  src={founderImage}
                  alt="Andreas Myraune, Founder of Beta Ads"
                  className="w-full aspect-[3/4] object-cover object-[center_30%]"
                />
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
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <div className="border-t border-foreground/[0.06]" />
        </div>

        <div
          ref={locRef}
          className="max-w-[1200px] mx-auto px-6 lg:px-12 py-32 lg:py-40"
        >
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Oslo */}
            <div
              className={`lg:w-[60%] transition-all duration-1000 ease-out ${
                locVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="overflow-hidden rounded-[14px] relative">
                <img
                  src={cityOslo}
                  alt="Oslo, Norway"
                  className="w-full aspect-[16/10] object-cover transition-transform duration-700 hover:scale-[1.03]"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
              </div>
              <div className="mt-4">
                <p className="text-[10px] uppercase tracking-[0.25em] text-primary">Headquarters</p>
                <p className="text-lg text-foreground mt-0.5" style={serifFont}>Oslo</p>
              </div>
            </div>

            {/* Chicago */}
            <div
              className={`lg:w-[35%] lg:pt-[5vw] transition-all duration-1000 delay-200 ease-out ${
                locVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="overflow-hidden rounded-[14px] relative">
                <img
                  src={cityChicago}
                  alt="Chicago, USA"
                  className="w-full aspect-[4/3] object-cover transition-transform duration-700 hover:scale-[1.03]"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
              </div>
              <div className="mt-4">
                <p className="text-[10px] uppercase tracking-[0.25em] text-primary">Office</p>
                <p className="text-lg text-foreground mt-0.5" style={serifFont}>Chicago</p>
              </div>
            </div>
          </div>

          <p
            className="text-sm text-muted-foreground mt-16 italic"
            style={serifFont}
          >
            Founded in Oslo. Growing from Chicago.
          </p>
        </div>
      </section>

      {/* ── Section 3 — Markets ── */}
      <section className="relative">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <div className="border-t border-foreground/[0.06]" />
        </div>

        <div
          ref={marketsRef}
          className={`max-w-[1200px] mx-auto px-6 lg:px-12 py-32 lg:py-40 transition-all duration-1000 ease-out ${
            marketsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left — text */}
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4 font-light">
                Our Markets
              </p>
              <h2
                className="text-3xl lg:text-4xl tracking-tight text-foreground mb-6"
                style={serifFont}
              >
                Active across the Nordics
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed max-w-[520px] mb-12">
                We connect brands with live audiences in Norway, Sweden, and Finland — the most engaged streaming markets in Europe.
              </p>

              <div className="flex gap-10 lg:gap-16">
                {['Norway', 'Sweden', 'Finland'].map((country) => (
                  <div key={country} className="flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary)/0.6)]" />
                    <span className="text-sm font-light text-foreground tracking-wide">{country}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — abstract dot visualization (desktop only) */}
            <div className="hidden lg:block relative h-[280px]">
              {/* Connecting lines */}
              <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <line x1="25%" y1="30%" x2="50%" y2="55%" stroke="white" strokeWidth="1" opacity="0.07" />
                <line x1="50%" y1="55%" x2="72%" y2="35%" stroke="white" strokeWidth="1" opacity="0.07" />
                <line x1="72%" y1="35%" x2="25%" y2="30%" stroke="white" strokeWidth="1" opacity="0.07" />
              </svg>

              {/* Norway dot */}
              <div className="absolute" style={{ left: '25%', top: '30%', transform: 'translate(-50%,-50%)' }}>
                <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_14px_hsl(var(--primary)/0.5)]" />
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-[0.15em] text-muted-foreground">NO</span>
              </div>

              {/* Sweden dot */}
              <div className="absolute" style={{ left: '50%', top: '55%', transform: 'translate(-50%,-50%)' }}>
                <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_14px_hsl(var(--primary)/0.5)]" />
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-[0.15em] text-muted-foreground">SE</span>
              </div>

              {/* Finland dot */}
              <div className="absolute" style={{ left: '72%', top: '35%', transform: 'translate(-50%,-50%)' }}>
                <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_14px_hsl(var(--primary)/0.5)]" />
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-[0.15em] text-muted-foreground">FI</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer t={t} language={language} setLanguage={setLanguage} />
    </div>
  );
};

export default AboutUs;
