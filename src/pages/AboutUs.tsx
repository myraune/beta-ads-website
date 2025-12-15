import React from "react";
import { Footer } from "@/components/sections/Footer";
import { Team } from "@/components/sections/Team";
import { Press } from "@/components/sections/Press";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface AboutUsProps {
  t: any;
  language: string;
  setLanguage: (lang: string) => void;
}

const AboutUs: React.FC<AboutUsProps> = ({ t, language, setLanguage }) => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: timelineRef, isVisible: timelineVisible } = useScrollAnimation();

  const milestones = [
    {
      year: "2023",
      title: language === "no" ? "Grunnlagt" : language === "sv" ? "Grundades" : language === "fi" ? "Perustettu" : "Founded",
      description: language === "no" ? "Startet i Oslo med en visjon" : language === "sv" ? "Startade i Oslo med en vision" : language === "fi" ? "Aloitettiin Oslossa visiolla" : "Started in Oslo with a vision"
    },
    {
      year: "2024",
      title: language === "no" ? "Nordisk ekspansjon" : language === "sv" ? "Nordisk expansion" : language === "fi" ? "Pohjoismainen laajennus" : "Nordic Expansion",
      description: language === "no" ? "Utvidet til Sverige og Finland" : language === "sv" ? "Expanderade till Sverige och Finland" : language === "fi" ? "Laajentui Ruotsiin ja Suomeen" : "Expanded to Sweden & Finland"
    },
    {
      year: "2025",
      title: language === "no" ? "1M+ visninger" : language === "sv" ? "1M+ visningar" : language === "fi" ? "1M+ näyttöä" : "1M+ Views",
      description: language === "no" ? "Passerte en million visninger" : language === "sv" ? "Passerade en miljon visningar" : language === "fi" ? "Ylitettiin miljoona näyttöä" : "Surpassed one million views"
    }
  ];

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section - Modern Flowing Layout */}
      <section 
        ref={heroRef}
        className="min-h-[85vh] flex items-center px-4 lg:px-12 relative overflow-hidden"
      >
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-transparent" />
        
        <div className={`max-w-7xl mx-auto w-full grid lg:grid-cols-5 gap-16 lg:gap-24 items-center relative z-10 transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Left - Text content */}
          <div className="lg:col-span-3 space-y-8">
            <div className="space-y-4">
              <span className="text-primary/70 text-sm font-medium tracking-[0.3em] uppercase">
                {language === "no" ? "Om Oss" : language === "sv" ? "Om Oss" : language === "fi" ? "Tietoa Meistä" : "About Us"}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-[1.05] tracking-tight">
                {language === "no" ? (
                  <>Vi bygger fremtidens <span className="text-primary">Twitch-annonsering</span></>
                ) : language === "sv" ? (
                  <>Vi bygger framtidens <span className="text-primary">Twitch-reklam</span></>
                ) : language === "fi" ? (
                  <>Rakennamme tulevaisuuden <span className="text-primary">Twitch-mainontaa</span></>
                ) : (
                  <>Building the future of <span className="text-primary">Twitch advertising</span></>
                )}
              </h1>
            </div>
            
            <p className="text-lg lg:text-xl text-muted-foreground max-w-xl leading-relaxed">
              {language === "no" ? "Et nordisk team dedikert til å skape autentiske forbindelser mellom merkevarer og Gen Z-publikum gjennom native streamer-integrasjoner." : 
               language === "sv" ? "Ett nordiskt team dedikerat till att skapa autentiska kopplingar mellan varumärken och Gen Z-publik genom nativa streamer-integreringar." : 
               language === "fi" ? "Pohjoismainen tiimi, joka on omistautunut luomaan aitoja yhteyksiä brändien ja Gen Z -yleisön välille natiivien streamaaja-integraatioiden kautta." : 
               "A Nordic team dedicated to creating authentic connections between brands and Gen Z audiences through native streamer integrations."}
            </p>

            {/* Inline Stats - Modern flowing design */}
            <div className="flex flex-wrap items-center gap-x-10 gap-y-4 pt-4">
              <div className="group">
                <span className="text-4xl lg:text-5xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">50+</span>
                <p className="text-sm text-muted-foreground mt-1">
                  {language === "no" ? "Kampanjer" : language === "sv" ? "Kampanjer" : language === "fi" ? "Kampanjat" : "Campaigns"}
                </p>
              </div>
              <div className="w-px h-12 bg-border/50" />
              <div className="group">
                <span className="text-4xl lg:text-5xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">1M+</span>
                <p className="text-sm text-muted-foreground mt-1">
                  {language === "no" ? "Visninger" : language === "sv" ? "Visningar" : language === "fi" ? "Näyttöä" : "Views"}
                </p>
              </div>
              <div className="w-px h-12 bg-border/50" />
              <div className="group">
                <span className="text-4xl lg:text-5xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">4</span>
                <p className="text-sm text-muted-foreground mt-1">
                  {language === "no" ? "Markeder" : language === "sv" ? "Marknader" : language === "fi" ? "Markkinat" : "Markets"}
                </p>
              </div>
            </div>
          </div>

          {/* Right - Minimal Visual */}
          <div className="lg:col-span-2 relative hidden lg:block">
            <div className="absolute -inset-8 bg-gradient-to-r from-primary/10 to-transparent rounded-full blur-3xl" />
            <div className="relative aspect-square flex items-center justify-center">
              <div className="absolute inset-0 border border-border/20 rounded-full" />
              <div className="absolute inset-8 border border-primary/20 rounded-full" />
              <div className="absolute inset-16 border border-primary/30 rounded-full" />
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                <div className="w-12 h-12 bg-primary rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Timeline - Minimal Design */}
      <section 
        ref={timelineRef}
        className="py-32 px-4 lg:px-12"
      >
        <div className={`max-w-5xl mx-auto transition-all duration-1000 delay-200 ${timelineVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {language === "no" ? "Vår reise" : language === "sv" ? "Vår resa" : language === "fi" ? "Matkamme" : "Our Journey"}
            </h2>
            <p className="text-muted-foreground text-lg max-w-lg">
              {language === "no" ? "Fra idé til Nordens ledende Twitch-byrå" : language === "sv" ? "Från idé till Nordens ledande Twitch-byrå" : language === "fi" ? "Ideasta Pohjoismaiden johtavaksi Twitch-toimistoksi" : "From idea to the Nordics' leading Twitch agency"}
            </p>
          </div>

          {/* Timeline - Clean minimal */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent md:-translate-x-1/2" />
            
            <div className="space-y-16 md:space-y-24">
              {milestones.map((milestone, index) => (
                <div 
                  key={milestone.year}
                  className={`relative grid md:grid-cols-2 gap-8 md:gap-16 items-center ${index % 2 === 1 ? 'md:text-right' : ''}`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Dot */}
                  <div className="absolute left-0 md:left-1/2 top-0 w-3 h-3 bg-primary rounded-full md:-translate-x-1/2 ring-4 ring-background" />
                  
                  {/* Content */}
                  <div className={`pl-8 md:pl-0 ${index % 2 === 1 ? 'md:order-1' : 'md:order-2 md:pl-16'} ${index % 2 === 0 ? '' : 'md:pr-16'}`}>
                    <span className="text-6xl md:text-7xl font-bold text-primary/10">{milestone.year}</span>
                    <h3 className="text-2xl font-semibold text-foreground -mt-4">{milestone.title}</h3>
                    <p className="text-muted-foreground mt-2">{milestone.description}</p>
                  </div>
                  
                  {/* Empty space for alternating layout */}
                  <div className={`hidden md:block ${index % 2 === 1 ? 'md:order-2' : 'md:order-1'}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <Team t={t} language={language} />

      {/* Press Section */}
      <Press t={t} />

      <Footer t={t} language={language} setLanguage={setLanguage} />
    </div>
  );
};

export default AboutUs;