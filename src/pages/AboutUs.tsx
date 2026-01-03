import React, { useMemo } from "react";
import { Footer } from "@/components/sections/Footer";
import { Press } from "@/components/sections/Press";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { Mail, ArrowRight } from "lucide-react";

interface AboutUsProps {
  t: any;
  language: string;
  setLanguage: (lang: string) => void;
}

// Letter animation component
const AnimatedText: React.FC<{ text: string; className?: string }> = ({ text, className = "" }) => {
  const letters = text.split("");
  
  return (
    <span className={`letter-animate relative ${className}`}>
      {letters.map((letter, index) => (
        <span 
          key={index} 
          className="letter relative inline-block"
          style={{ transitionDelay: `${index * 0.02}s` }}
        >
          {letter === " " ? "\u00A0" : letter}
        </span>
      ))}
      <span className="absolute inset-0">
        {letters.map((letter, index) => (
          <span 
            key={`clone-${index}`} 
            className="letter-clone"
            style={{ transitionDelay: `${index * 0.02}s` }}
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}
      </span>
    </span>
  );
};

// Value block with hover reveal
const ValueBlock: React.FC<{ 
  title: string; 
  subtitle: string;
  index: number;
}> = ({ title, subtitle, index }) => {
  return (
    <div 
      className="group hover-reveal-trigger relative h-48 lg:h-64 border border-border/30 flex items-end p-6 lg:p-8 overflow-hidden cursor-default"
      style={{ 
        clipPath: index === 0 
          ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' 
          : index === 1 
            ? 'polygon(0 0, 100% 0, 85% 100%, 15% 100%)' 
            : 'polygon(15% 0, 85% 0, 100% 100%, 0 100%)'
      }}
    >
      {/* Background gradient on hover */}
      <div className="hover-reveal-overlay absolute inset-0 bg-primary/10" />
      
      {/* Large background number */}
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] lg:text-[14rem] font-bold text-foreground/[0.03] leading-none select-none">
        0{index + 1}
      </span>
      
      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );
};

const AboutUs: React.FC<AboutUsProps> = ({ t, language, setLanguage }) => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: valuesRef, isVisible: valuesVisible } = useScrollAnimation();
  const { ref: teamRef, isVisible: teamVisible } = useScrollAnimation();
  const { containerRef, getParallaxStyle } = useMouseParallax(15);

  const milestones = useMemo(() => [
    { year: "2023", title: language === "no" ? "Grunnlagt" : language === "sv" ? "Grundades" : language === "fi" ? "Perustettu" : "Founded" },
    { year: "2024", title: language === "no" ? "Nordisk ekspansjon" : language === "sv" ? "Nordisk expansion" : language === "fi" ? "Pohjoismainen laajennus" : "Nordic Expansion" },
    { year: "2025", title: language === "no" ? "1M+ visninger" : language === "sv" ? "1M+ visningar" : language === "fi" ? "1M+ näyttöä" : "1M+ Views" }
  ], [language]);

  const values = useMemo(() => [
    { 
      title: language === "no" ? "Native først" : language === "sv" ? "Native först" : language === "fi" ? "Natiivi ensin" : "Native First",
      subtitle: language === "no" ? "Annonser som føles ekte" : language === "sv" ? "Annonser som känns äkta" : language === "fi" ? "Mainoksia, jotka tuntuvat aidoilta" : "Ads that feel authentic"
    },
    { 
      title: language === "no" ? "Kvalitet" : language === "sv" ? "Kvalitet" : language === "fi" ? "Laatu" : "Quality",
      subtitle: language === "no" ? "Premium streamere kun" : language === "sv" ? "Premium streamers endast" : language === "fi" ? "Vain premium-streamaajat" : "Premium streamers only"
    },
    { 
      title: language === "no" ? "Tillit" : language === "sv" ? "Förtroende" : language === "fi" ? "Luottamus" : "Trust",
      subtitle: language === "no" ? "Langsiktige partnerskap" : language === "sv" ? "Långsiktiga partnerskap" : language === "fi" ? "Pitkäaikaiset kumppanuudet" : "Long-term partnerships"
    }
  ], [language]);

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section - Full viewport with parallax image */}
      <section 
        ref={heroRef}
        className="min-h-screen flex items-center relative overflow-hidden"
      >
        {/* Background image with parallax */}
        <div 
          ref={containerRef}
          className="absolute inset-0 z-0"
        >
          <div 
            className="absolute inset-[-5%] w-[110%] h-[110%]"
            style={getParallaxStyle(0.5)}
          >
            <img
              src="/lovable-uploads/e6d9646d-bf5f-471c-a2d8-1f06c274f570.png"
              alt="Andreas Myraune"
              className="w-full h-full object-cover object-top opacity-40"
            />
          </div>
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
        </div>

        {/* Content */}
        <div className={`relative z-10 w-full px-4 lg:px-12 transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="max-w-7xl mx-auto">
            {/* Role tag */}
            <div className="mb-6">
              <span className="text-primary text-xs font-medium tracking-[0.3em] uppercase">
                {language === "no" ? "Byråsjef" : language === "sv" ? "Byråchef" : language === "fi" ? "Toimistopäällikkö" : "Head of Agency"}
              </span>
            </div>
            
            {/* Large name with letter animation */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-foreground leading-[0.9] tracking-tighter mb-8">
              <AnimatedText text="ANDREAS" />
              <br />
              <span className="text-primary">
                <AnimatedText text="MYRAUNE" />
              </span>
            </h1>

            {/* Tagline */}
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-xl mb-12 leading-relaxed">
              {language === "no" ? "Skaper fremtidens Twitch-annonsering i Norden." : 
               language === "sv" ? "Skapar framtidens Twitch-reklam i Norden." : 
               language === "fi" ? "Luo tulevaisuuden Twitch-mainontaa Pohjoismaissa." : 
               "Building the future of Twitch advertising in the Nordics."}
            </p>

            {/* Stats row */}
            <div className="flex items-center gap-12 lg:gap-16">
              {[
                { value: "50+", label: language === "no" ? "Kampanjer" : language === "sv" ? "Kampanjer" : language === "fi" ? "Kampanjat" : "Campaigns" },
                { value: "1M+", label: language === "no" ? "Visninger" : language === "sv" ? "Visningar" : language === "fi" ? "Näyttöä" : "Views" },
                { value: "4", label: language === "no" ? "Markeder" : language === "sv" ? "Marknader" : language === "fi" ? "Markkinat" : "Markets" }
              ].map((stat, i) => (
                <div key={i} className="text-center lg:text-left">
                  <span className="text-4xl lg:text-5xl font-bold text-foreground">{stat.value}</span>
                  <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-primary/50 to-primary animate-pulse" />
        </div>
      </section>

      {/* Journey - Large year numbers */}
      <section className="py-24 lg:py-40 px-4 lg:px-12 border-t border-border/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-sm font-medium text-muted-foreground tracking-[0.3em] uppercase mb-16 lg:mb-24">
            {language === "no" ? "Vår reise" : language === "sv" ? "Vår resa" : language === "fi" ? "Matkamme" : "Our Journey"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-4">
            {milestones.map((milestone, index) => (
              <div 
                key={milestone.year}
                className="group relative"
              >
                {/* Large year */}
                <span className="text-8xl md:text-9xl lg:text-[12rem] font-bold text-transparent leading-none tracking-tighter"
                  style={{
                    WebkitTextStroke: '1px hsl(var(--border))',
                  }}
                >
                  {milestone.year}
                </span>
                
                {/* Filled year on hover */}
                <span className="absolute top-0 left-0 text-8xl md:text-9xl lg:text-[12rem] font-bold text-primary leading-none tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {milestone.year}
                </span>
                
                <h3 className="text-lg lg:text-xl font-medium text-foreground mt-4">
                  {milestone.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section - Visual blocks with shapes */}
      <section 
        ref={valuesRef}
        className="py-24 lg:py-32 px-4 lg:px-12 border-t border-border/20"
      >
        <div className={`max-w-7xl mx-auto transition-all duration-1000 ${valuesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-sm font-medium text-muted-foreground tracking-[0.3em] uppercase mb-16">
            {language === "no" ? "Våre verdier" : language === "sv" ? "Våra värderingar" : language === "fi" ? "Arvomme" : "Our Values"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {values.map((value, index) => (
              <ValueBlock
                key={value.title}
                title={value.title}
                subtitle={value.subtitle}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Bold CTA */}
      <section 
        ref={teamRef}
        className="py-24 lg:py-40 px-4 lg:px-12 border-t border-border/20"
      >
        <div className={`max-w-7xl mx-auto transition-all duration-1000 ${teamVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left - Contact */}
            <div>
              <h2 className="text-sm font-medium text-muted-foreground tracking-[0.3em] uppercase mb-8">
                {language === "no" ? "Ta kontakt" : language === "sv" ? "Kontakta oss" : language === "fi" ? "Ota yhteyttä" : "Get in Touch"}
              </h2>
              
              <a 
                href="mailto:andreas@beta-ads.no"
                className="group inline-flex items-center gap-4 text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground hover:text-primary transition-colors duration-300"
              >
                <AnimatedText text="andreas@beta-ads.no" />
                <ArrowRight className="w-8 h-8 lg:w-10 lg:h-10 group-hover:translate-x-2 transition-transform" />
              </a>

              <p className="text-muted-foreground mt-8 max-w-md">
                {language === "no" ? "Vi tror på kraften i autentiske forbindelser. Når en streamer virkelig elsker et produkt, merker seerne det." : 
                 language === "sv" ? "Vi tror på kraften i autentiska kopplingar. När en streamer verkligen älskar en produkt märker tittarna det." : 
                 language === "fi" ? "Uskomme aitojen yhteyksien voimaan. Kun streamaaja todella rakastaa tuotetta, katsojat huomaavat sen." : 
                 "We believe in the power of authentic connections. When a streamer genuinely loves a product, viewers notice."}
              </p>
            </div>

            {/* Right - Join team */}
            <div className="flex items-end lg:justify-end">
              <a 
                href="mailto:careers@beta-ads.no"
                className="group inline-flex items-center gap-3 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="w-12 h-px bg-current transition-all group-hover:w-20" />
                {language === "no" ? "Bli med på laget" : language === "sv" ? "Gå med i teamet" : language === "fi" ? "Liity tiimiin" : "Join the team"}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Press Section */}
      <Press t={t} />

      <Footer t={t} language={language} setLanguage={setLanguage} />
    </div>
  );
};

export default AboutUs;
