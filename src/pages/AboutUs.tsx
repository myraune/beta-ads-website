import React, { useMemo } from "react";
import { Footer } from "@/components/sections/Footer";
import { ArrowRight, ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCountUp } from "@/hooks/useCountUp";

interface AboutUsProps {
  t: any;
  language: string;
  setLanguage: (lang: string) => void;
}

// Story card component with scroll-triggered animations
const StoryCard: React.FC<{
  number: string;
  title: string;
  description: string;
  isVisible: boolean;
  delay: number;
  isLast?: boolean;
}> = ({ number, title, description, isVisible, delay, isLast }) => {
  return (
    <div 
      className={`
        flex-shrink-0 w-[300px] sm:w-[340px] h-[420px]
        bg-card/40 backdrop-blur-sm border border-border/20 rounded-2xl p-8
        flex flex-col justify-between
        transition-all duration-700 ease-out
        hover:bg-card/60 hover:border-primary/30 hover:scale-[1.02]
        group cursor-pointer
        ${isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-12'}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Top - Number */}
      <div>
        <span className="text-8xl font-bold text-primary/15 group-hover:text-primary/25 transition-colors duration-500 leading-none block">
          {number}
        </span>
      </div>
      
      {/* Bottom - Content */}
      <div>
        <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>
        
        {isLast && (
          <Link 
            to="/contact"
            className="inline-flex items-center gap-2 mt-6 text-primary font-medium group-hover:gap-3 transition-all duration-300"
          >
            <span>Get in touch</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </div>
  );
};

// Stat counter component
const StatCounter: React.FC<{
  value: number;
  suffix: string;
  label: string;
  isVisible: boolean;
  delay: number;
}> = ({ value, suffix, label, isVisible, delay }) => {
  const { displayValue } = useCountUp(value, isVisible, { 
    duration: 2000, 
    delay 
  });
  
  return (
    <div 
      className={`
        text-center transition-all duration-700 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground">
        {displayValue}{suffix}
      </span>
      <p className="text-muted-foreground mt-2 text-lg">{label}</p>
    </div>
  );
};

const AboutUs: React.FC<AboutUsProps> = ({ t, language, setLanguage }) => {
  const { containerRef, getParallaxStyle } = useMouseParallax(15);
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: storyRef, isVisible: storyVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation({ threshold: 0.2 });
  
  const storyCards = useMemo(() => [
    {
      number: "01",
      title: language === "no" ? "En gjeng som forstår" : "A team that gets it",
      description: language === "no" 
        ? "Streamere og markedsførere som bygger fra innsiden av kulturen." 
        : "Streamers and marketers building from inside the culture.",
    },
    {
      number: "02",
      title: language === "no" ? "Native in-stream annonser" : "Native in-stream ads",
      description: language === "no" 
        ? "Annonser som lever i streamen. Ikke pre-rolls. Ikke bannerannonser. Ekte integrasjoner." 
        : "Ads that live inside the stream. Not pre-rolls. Not banners. Real integrations.",
    },
    {
      number: "03",
      title: language === "no" ? "Gen Z er her" : "Gen Z is here",
      description: language === "no" 
        ? "De skroller forbi alt annet. Men de ser på streamere i timevis." 
        : "They skip everything else. But they watch streamers for hours.",
    },
    {
      number: "04",
      title: language === "no" ? "Brands som stoler på oss" : "Brands that trust us",
      description: language === "no" 
        ? "Samsung, Komplett, Surfshark, Kristiania, og flere av Nordens største merkevarer." 
        : "Samsung, Komplett, Surfshark, Kristiania, and more of the Nordics' biggest brands.",
    },
    {
      number: "05",
      title: language === "no" ? "La oss snakke" : "Let's talk",
      description: language === "no" 
        ? "Klar for å nå publikummet ditt der de faktisk er?" 
        : "Ready to reach your audience where they actually are?",
    },
  ], [language]);

  const stats = useMemo(() => [
    { value: 500, suffix: "+", label: language === "no" ? "Streamere" : "Streamers" },
    { value: 50, suffix: "M+", label: language === "no" ? "Visninger" : "Impressions" },
    { value: 4, suffix: "", label: language === "no" ? "Nordiske land" : "Nordic countries" },
  ], [language]);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      
      {/* Hero Section - Cinematic with oversized typography */}
      <section 
        ref={containerRef as React.RefObject<HTMLElement>}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Aurora background - optimized for performance */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Primary glow - reduced blur for better performance */}
          <div 
            className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full animate-aurora-drift-1"
            style={{
              background: 'radial-gradient(circle, hsl(0 84% 60% / 0.12) 0%, transparent 70%)',
              filter: 'blur(40px)',
              transform: 'translateZ(0)',
            }}
          />
          {/* Secondary glow - reduced blur for better performance */}
          <div 
            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full animate-aurora-drift-2"
            style={{
              background: 'radial-gradient(circle, hsl(280 70% 50% / 0.08) 0%, transparent 70%)',
              filter: 'blur(50px)',
              transform: 'translateZ(0)',
            }}
          />
        </div>
        
        {/* Content */}
        <div 
          className="relative z-10 text-center px-6 max-w-6xl mx-auto"
          style={getParallaxStyle(0.3)}
        >
          {/* Pre-headline tag */}
          <div 
            className={`
              inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-8
              transition-all duration-700 delay-100
              ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}
          >
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm text-primary font-medium">
              {language === "no" ? "Om Beta Ads" : "About Beta Ads"}
            </span>
          </div>
          
          {/* Main headline - Oversized */}
          <h1 
            className={`
              text-5xl sm:text-6xl md:text-7xl lg:text-[8rem] xl:text-[10rem] 
              font-bold text-foreground leading-[0.85] tracking-tighter mb-8
              transition-all duration-1000 delay-200
              ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}
          >
            <span className="block">REDEFINING</span>
            <span className="block text-primary">ADS ON TWITCH</span>
          </h1>
          
          {/* Subcopy */}
          <p 
            className={`
              text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light
              transition-all duration-700 delay-500
              ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
            `}
          >
            {language === "no" 
              ? "Vi lager native kampanjer i live streams som føles som innhold, ikke avbrytelser. Bygget for merkevarer som vil nå Gen Z der de faktisk ser." 
              : "We create native in-stream campaigns that feel like content, not interruptions. Built for brands who want to reach Gen Z where they actually pay attention."}
          </p>
        </div>
        
        {/* Scroll indicator */}
        <div 
          className={`
            absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground
            transition-all duration-700 delay-700
            ${heroVisible ? 'opacity-100' : 'opacity-0'}
          `}
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </div>
      </section>

      {/* Story Cards - Horizontal scroll section */}
      <section 
        ref={storyRef as React.RefObject<HTMLElement>}
        className="py-24 lg:py-32 bg-card/20"
      >
        <div className="px-6 lg:px-12 mb-12">
          <span 
            className={`
              text-sm text-primary font-medium uppercase tracking-widest
              transition-all duration-500
              ${storyVisible ? 'opacity-100' : 'opacity-0'}
            `}
          >
            {language === "no" ? "Vår historie" : "Our Story"}
          </span>
          <h2 
            className={`
              text-3xl md:text-5xl font-bold text-foreground mt-4 max-w-xl
              transition-all duration-700 delay-100
              ${storyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
            `}
          >
            {language === "no" ? "Hvem vi er og hva vi gjør" : "Who we are and what we do"}
          </h2>
        </div>
        
        {/* Horizontal scrolling cards */}
        <div className="overflow-x-auto pb-6 scrollbar-hide">
          <div className="flex gap-6 px-6 lg:px-12" style={{ width: 'max-content' }}>
            {storyCards.map((card, index) => (
              <StoryCard
                key={card.number}
                number={card.number}
                title={card.title}
                description={card.description}
                isVisible={storyVisible}
                delay={100 + index * 100}
                isLast={index === storyCards.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-24 lg:py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text content */}
          <div className="order-2 lg:order-1">
            <span className="text-sm text-primary font-medium uppercase tracking-widest">
              {language === "no" ? "Grunnlegger" : "Founder"}
            </span>
            
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mt-4 mb-6 leading-[0.95]">
              <span className="block">ANDREAS</span>
              <span className="block text-primary">MYRAUNE</span>
            </h2>
            
            <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-lg">
              {language === "no" 
                ? "Startet Beta Ads som 20-åring med en visjon om å gjøre Twitch-annonsering native og effektiv. Nå leder han Nordens største Twitch-first byrå." 
                : "Founded Beta Ads at 20 with a vision to make Twitch advertising native and effective. Now leading the Nordics' largest Twitch-first agency."}
            </p>
            
            <Link 
              to="/contact"
              className="inline-flex items-center gap-3 text-primary font-medium group"
            >
              <span>{language === "no" ? "Ta kontakt" : "Get in touch"}</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          
          {/* Image */}
          <div className="order-1 lg:order-2">
            <div 
              className="relative aspect-[3/4] overflow-hidden rounded-2xl"
              style={{
                clipPath: "polygon(10% 0%, 100% 0%, 100% 100%, 0% 100%)",
              }}
            >
              <img
                src="/lovable-uploads/e6d9646d-bf5f-471c-a2d8-1f06c274f570.png"
                alt="Andreas Myraune"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-top"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section 
        ref={statsRef as React.RefObject<HTMLElement>}
        className="py-24 lg:py-32 px-6 bg-card/30"
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {stats.map((stat, index) => (
              <StatCounter
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                isVisible={statsVisible}
                delay={index * 150}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        ref={ctaRef as React.RefObject<HTMLElement>}
        className="py-32 lg:py-40 px-6 relative overflow-hidden"
      >
        {/* Background glow - optimized */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full animate-aurora-pulse"
          style={{
            background: 'radial-gradient(circle, hsl(0 84% 60% / 0.08) 0%, transparent 70%)',
            filter: 'blur(40px)',
            transform: 'translateZ(0)',
          }}
        />
        
        <div 
          className={`
            relative z-10 max-w-4xl mx-auto text-center
            transition-all duration-1000
            ${ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
          `}
        >
          <span className="text-sm text-primary font-medium uppercase tracking-widest">
            {language === "no" ? "Klar til å starte?" : "Ready to start?"}
          </span>
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mt-6 mb-8 leading-[0.95]">
            {language === "no" ? "La oss skape noe sammen" : "Let's create something together"}
          </h2>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-xl mx-auto">
            {language === "no" 
              ? "Vi er klare når du er det. Ta kontakt så finner vi ut hvordan vi kan hjelpe deg å nå Gen Z." 
              : "We're ready when you are. Get in touch and let's figure out how to reach your audience."}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-medium rounded-full hover:bg-primary/90 transition-all duration-300 hover:scale-105"
            >
              <span>{language === "no" ? "Kontakt oss" : "Contact us"}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            
            <a 
              href="mailto:andreas@betaads.no"
              className="inline-flex items-center gap-2 px-8 py-4 text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              <span>andreas@betaads.no</span>
            </a>
          </div>
        </div>
      </section>

      <Footer t={t} language={language} setLanguage={setLanguage} />
    </div>
  );
};

export default AboutUs;
