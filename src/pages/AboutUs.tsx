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

const AboutUs: React.FC<AboutUsProps> = ({ t, language, setLanguage }) => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: officeRef, isVisible: officeVisible } = useScrollAnimation();
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

      {/* Section 1 — About Intro */}
      <section className="relative">
        <div
          ref={heroRef}
          className={`max-w-[1200px] mx-auto px-6 lg:px-12 pt-32 lg:pt-44 pb-24 lg:pb-32 transition-all duration-1000 ease-out ${
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="grid lg:grid-cols-[55%_45%] gap-12 lg:gap-8 items-start">
            {/* Left column */}
            <div className="max-w-[480px]">
              <h1 className="text-5xl lg:text-6xl font-light leading-[1.1] tracking-tight text-foreground mb-8">
                About <span className="italic text-primary">Beta</span> Ads
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

            {/* Right column — Founder image */}
            <div className="lg:-mr-16 xl:-mr-24">
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={founderImage}
                  alt="Andreas Myraune, Founder of Beta Ads"
                  className="w-full aspect-[3/4] object-cover object-[center_30%]"
                />
              </div>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">Andreas Myraune</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-primary mt-0.5">Founder</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 — Where We Are */}
      <section className="relative">
        <div
          ref={officeRef}
          className="max-w-[1200px] mx-auto px-6 lg:px-12 py-32 lg:py-40"
        >
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Oslo — larger, left */}
            <div
              className={`lg:w-[60%] transition-all duration-1000 ease-out ${
                officeVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={cityOslo}
                  alt="Oslo, Norway"
                  className="w-full aspect-[4/5] object-cover transition-transform duration-700 hover:scale-[1.03]"
                />
              </div>
              <div className="mt-4">
                <p className="text-[10px] uppercase tracking-[0.25em] text-primary">Headquarters</p>
                <p className="text-lg font-medium text-foreground mt-0.5">Oslo</p>
              </div>
            </div>

            {/* Chicago — smaller, right, staggered down */}
            <div
              className={`lg:w-[35%] lg:mt-16 xl:mt-24 transition-all duration-1000 delay-200 ease-out ${
                officeVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={cityChicago}
                  alt="Chicago, USA"
                  className="w-full aspect-[3/4] object-cover transition-transform duration-700 hover:scale-[1.03]"
                />
              </div>
              <div className="mt-4">
                <p className="text-[10px] uppercase tracking-[0.25em] text-primary">Office</p>
                <p className="text-lg font-medium text-foreground mt-0.5">Chicago</p>
              </div>
            </div>
          </div>

          <p className="text-sm italic text-muted-foreground mt-16">
            Founded in Oslo. Growing from Chicago.
          </p>
        </div>
      </section>

      {/* Section 3 — Markets */}
      <section className="relative">
        <div
          ref={marketsRef}
          className={`max-w-[1200px] mx-auto px-6 lg:px-12 py-32 lg:py-40 transition-all duration-1000 ease-out ${
            marketsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="border-t border-foreground/[0.06] pt-16">
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4">Our Markets</p>
            <h2 className="text-3xl lg:text-4xl font-light tracking-tight text-foreground mb-6">
              Active across the Nordics
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed max-w-[520px] mb-12">
              We connect brands with live audiences in Norway, Sweden, and Finland — the most engaged streaming markets in Europe.
            </p>

            <div className="flex gap-10 lg:gap-16">
              {['Norway', 'Sweden', 'Finland'].map((country) => (
                <div key={country} className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="text-sm font-light text-foreground tracking-wide">{country}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer t={t} language={language} setLanguage={setLanguage} />
    </div>
  );
};

export default AboutUs;
