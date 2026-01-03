import React, { useMemo } from "react";
import { Footer } from "@/components/sections/Footer";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useMouseParallax } from "@/hooks/useMouseParallax";

interface AboutUsProps {
  t: any;
  language: string;
  setLanguage: (lang: string) => void;
}

// Value card with large number and hover effect
const ValueCard: React.FC<{
  number: string;
  title: string;
  subtitle: string;
}> = ({ number, title, subtitle }) => {
  return (
    <div className="group relative h-[420px] bg-card border border-border/20 overflow-hidden cursor-pointer transition-all duration-500 hover:border-primary/50">
      {/* Large background number */}
      <span className="absolute -right-6 -top-12 text-[240px] font-bold text-muted/5 transition-all duration-500 group-hover:text-primary/10 select-none leading-none">
        {number}
      </span>
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end p-8">
        <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-3 transition-colors duration-300 group-hover:text-primary">
          {title}
        </h3>
        <p className="text-muted-foreground text-lg max-w-xs">
          {subtitle}
        </p>
        
        {/* Hover arrow */}
        <div className="mt-6 flex items-center gap-2 text-primary opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
          <ArrowRight className="w-5 h-5" />
        </div>
      </div>
      
      {/* Hover gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </div>
  );
};

// Milestone item with large year
const MilestoneItem: React.FC<{
  year: string;
  title: string;
}> = ({ year, title }) => {
  return (
    <div className="group flex items-start gap-8 py-10 border-b border-border/20 last:border-b-0 cursor-pointer transition-colors duration-300 hover:border-primary/30">
      <span className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-muted/30 to-muted/10 transition-all duration-500 group-hover:from-primary group-hover:to-primary/70 leading-none min-w-[140px] md:min-w-[200px]">
        {year}
      </span>
      <div className="flex-1 pt-3 md:pt-5">
        <p className="text-xl md:text-2xl text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
          {title}
        </p>
      </div>
      <ArrowRight className="w-6 h-6 text-muted/30 mt-3 md:mt-5 transition-all duration-300 group-hover:text-primary group-hover:translate-x-2" />
    </div>
  );
};

const AboutUs: React.FC<AboutUsProps> = ({ t, language, setLanguage }) => {
  const { containerRef, getParallaxStyle } = useMouseParallax(12);
  
  const values = useMemo(() => [
    {
      number: "01",
      title: language === "no" ? "Native først" : "Native First",
      subtitle: language === "no" ? "Annonser som føles som innhold, ikke avbrytelser." : "Ads that feel like content, not interruptions.",
    },
    {
      number: "02",
      title: language === "no" ? "Kvalitet" : "Quality",
      subtitle: language === "no" ? "Hver visning teller. Vi gjør ikke fyll." : "Every impression matters. We don't do filler.",
    },
    {
      number: "03",
      title: language === "no" ? "Tillit" : "Trust",
      subtitle: language === "no" ? "Bygget for merkevarer som bryr seg." : "Built for brands who care about their reputation.",
    },
  ], [language]);

  const milestones = useMemo(() => [
    {
      year: "2021",
      title: language === "no" ? "Beta Ads grunnlagt i Oslo" : "Beta Ads founded in Oslo",
    },
    {
      year: "2022",
      title: language === "no" ? "Første 100 streamere ombord" : "First 100 streamers onboarded",
    },
    {
      year: "2023",
      title: language === "no" ? "Utvidet til alle nordiske land" : "Expanded to all Nordic countries",
    },
    {
      year: "2024",
      title: language === "no" ? "Lanserte interaktive annonseformater" : "Launched interactive ad formats",
    },
  ], [language]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Split Layout */}
      <section 
        ref={containerRef}
        className="relative min-h-screen grid lg:grid-cols-2 items-center overflow-hidden"
      >
        {/* Left side - Text content */}
        <div className="relative z-10 px-6 md:px-12 lg:px-20 py-32 lg:py-0">
          <div className="max-w-xl">
            {/* Role tag */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-8">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm text-primary font-medium">Founder & CEO</span>
            </div>
            
            {/* Name - Large typography */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground leading-[0.9] tracking-tight mb-6">
              <span className="block">ANDREAS</span>
              <span className="block text-primary">MYRAUNE</span>
            </h1>
            
            {/* Short bio */}
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-10 max-w-md">
              {language === "no" 
                ? "Bygger fremtiden for native annonsering i live streams." 
                : "Building the future of native advertising inside live streams."}
            </p>
            
            {/* Stats row */}
            <div className="flex gap-12">
              <div>
                <span className="text-4xl md:text-5xl font-bold text-foreground">500+</span>
                <p className="text-sm text-muted-foreground mt-1">
                  {language === "no" ? "Streamere" : "Streamers"}
                </p>
              </div>
              <div>
                <span className="text-4xl md:text-5xl font-bold text-foreground">50M+</span>
                <p className="text-sm text-muted-foreground mt-1">
                  {language === "no" ? "Visninger" : "Impressions"}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right side - Image with parallax and clip-path */}
        <div 
          className="absolute lg:static inset-0 lg:h-screen"
          style={getParallaxStyle(0.3)}
        >
          <div 
            className="relative w-full h-full overflow-hidden"
            style={{
              clipPath: "polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)",
            }}
          >
            <img
              src="/lovable-uploads/e6d9646d-bf5f-471c-a2d8-1f06c274f570.png"
              alt="Andreas Myraune"
              className="w-full h-full object-cover object-top"
            />
          </div>
          {/* Gradient overlay for text readability on mobile */}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/20 lg:from-background lg:via-transparent lg:to-transparent pointer-events-none" />
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground z-10">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-muted-foreground to-transparent" />
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 px-6 md:px-12 lg:px-20 bg-background">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="mb-16">
            <span className="text-sm text-primary font-medium uppercase tracking-widest">
              {language === "no" ? "Våre Verdier" : "Our Values"}
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mt-4 max-w-2xl">
              {language === "no" 
                ? "Det som driver alt vi bygger" 
                : "What drives everything we build"}
            </h2>
          </div>
          
          {/* Value cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value) => (
              <ValueCard
                key={value.number}
                number={value.number}
                title={value.title}
                subtitle={value.subtitle}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="py-32 px-6 md:px-12 lg:px-20 bg-card/30">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <div className="mb-16">
            <span className="text-sm text-primary font-medium uppercase tracking-widest">
              {language === "no" ? "Reisen" : "The Journey"}
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mt-4">
              {language === "no" ? "Viktige øyeblikk" : "Key moments"}
            </h2>
          </div>
          
          {/* Milestones */}
          <div>
            {milestones.map((milestone) => (
              <MilestoneItem
                key={milestone.year}
                year={milestone.year}
                title={milestone.title}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-32 px-6 md:px-12 lg:px-20 bg-background">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-sm text-primary font-medium uppercase tracking-widest">
            {language === "no" ? "Ta kontakt" : "Get in touch"}
          </span>
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mt-6 mb-12">
            {language === "no" ? "La oss snakke" : "Let's talk"}
          </h2>
          
          {/* Email link */}
          <a 
            href="mailto:andreas@betaads.no"
            className="group inline-flex items-center gap-4 text-2xl md:text-4xl text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            <span>andreas@betaads.no</span>
            <ArrowRight className="w-8 h-8 transition-transform duration-300 group-hover:translate-x-2" />
          </a>
          
          {/* Secondary CTA */}
          <div className="mt-16">
            <Link 
              to="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-medium rounded-full hover:bg-primary/90 transition-colors duration-300"
            >
              <span>{language === "no" ? "Kontakt oss" : "Contact us"}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer t={t} language={language} setLanguage={setLanguage} />
    </div>
  );
};

export default AboutUs;
