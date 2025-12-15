import React from "react";
import { Footer } from "@/components/sections/Footer";
import { Press } from "@/components/sections/Press";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Mail, Linkedin, ArrowRight } from "lucide-react";

interface AboutUsProps {
  t: any;
  language: string;
  setLanguage: (lang: string) => void;
}

const AboutUs: React.FC<AboutUsProps> = ({ t, language, setLanguage }) => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: journeyRef, isVisible: journeyVisible } = useScrollAnimation();
  const { ref: teamRef, isVisible: teamVisible } = useScrollAnimation();

  const milestones = [
    {
      year: "2023",
      title: language === "no" ? "Grunnlagt" : language === "sv" ? "Grundades" : language === "fi" ? "Perustettu" : "Founded",
    },
    {
      year: "2024",
      title: language === "no" ? "Nordisk ekspansjon" : language === "sv" ? "Nordisk expansion" : language === "fi" ? "Pohjoismainen laajennus" : "Nordic Expansion",
    },
    {
      year: "2025",
      title: language === "no" ? "1M+ visninger" : language === "sv" ? "1M+ visningar" : language === "fi" ? "1M+ näyttöä" : "1M+ Views",
    }
  ];

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section - Asymmetric flowing layout */}
      <section 
        ref={heroRef}
        className="min-h-[80vh] flex items-center px-4 lg:px-12 relative overflow-hidden"
      >
        <div className={`max-w-6xl mx-auto w-full transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Large headline with accent */}
          <div className="space-y-6 mb-16">
            <span className="text-primary text-sm font-medium tracking-[0.3em] uppercase">
              {language === "no" ? "Om Oss" : language === "sv" ? "Om Oss" : language === "fi" ? "Tietoa Meistä" : "About Us"}
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-foreground leading-[0.95] tracking-tight max-w-4xl">
              {language === "no" ? (
                <>Fremtidens<br /><span className="text-primary">Twitch-annonsering</span></>
              ) : language === "sv" ? (
                <>Framtidens<br /><span className="text-primary">Twitch-reklam</span></>
              ) : language === "fi" ? (
                <>Tulevaisuuden<br /><span className="text-primary">Twitch-mainonta</span></>
              ) : (
                <>The future of<br /><span className="text-primary">Twitch advertising</span></>
              )}
            </h1>
          </div>
          
          {/* Offset description and stats */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-lg lg:ml-auto">
              {language === "no" ? "Et nordisk team dedikert til å skape autentiske forbindelser mellom merkevarer og Gen Z-publikum gjennom native streamer-integrasjoner." : 
               language === "sv" ? "Ett nordiskt team dedikerat till att skapa autentiska kopplingar mellan varumärken och Gen Z-publik genom nativa streamer-integreringar." : 
               language === "fi" ? "Pohjoismainen tiimi, joka on omistautunut luomaan aitoja yhteyksiä brändien ja Gen Z -yleisön välille natiivien streamaaja-integraatioiden kautta." : 
               "A Nordic team dedicated to creating authentic connections between brands and Gen Z audiences through native streamer integrations."}
            </p>

            {/* Stats - Horizontal flow */}
            <div className="flex items-center gap-12 lg:gap-16">
              <div>
                <span className="text-5xl lg:text-6xl font-bold text-foreground">50+</span>
                <p className="text-sm text-muted-foreground mt-1">
                  {language === "no" ? "Kampanjer" : language === "sv" ? "Kampanjer" : language === "fi" ? "Kampanjat" : "Campaigns"}
                </p>
              </div>
              <div>
                <span className="text-5xl lg:text-6xl font-bold text-foreground">1M+</span>
                <p className="text-sm text-muted-foreground mt-1">
                  {language === "no" ? "Visninger" : language === "sv" ? "Visningar" : language === "fi" ? "Näyttöä" : "Views"}
                </p>
              </div>
              <div>
                <span className="text-5xl lg:text-6xl font-bold text-foreground">4</span>
                <p className="text-sm text-muted-foreground mt-1">
                  {language === "no" ? "Markeder" : language === "sv" ? "Marknader" : language === "fi" ? "Markkinat" : "Markets"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journey - Horizontal minimal timeline */}
      <section 
        ref={journeyRef}
        className="py-24 lg:py-32 px-4 lg:px-12"
      >
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${journeyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-2xl md:text-3xl font-medium text-muted-foreground mb-16">
            {language === "no" ? "Vår reise" : language === "sv" ? "Vår resa" : language === "fi" ? "Matkamme" : "Our Journey"}
          </h2>

          {/* Horizontal timeline */}
          <div className="relative">
            {/* Line */}
            <div className="absolute left-0 right-0 top-8 h-px bg-border" />
            
            <div className="grid grid-cols-3 gap-8">
              {milestones.map((milestone, index) => (
                <div 
                  key={milestone.year}
                  className="relative pt-12"
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Dot */}
                  <div className="absolute top-6 left-0 w-4 h-4 bg-primary rounded-full ring-4 ring-background" />
                  
                  <span className="text-6xl md:text-7xl lg:text-8xl font-bold text-primary/10 leading-none">
                    {milestone.year}
                  </span>
                  <h3 className="text-xl lg:text-2xl font-medium text-foreground -mt-6 lg:-mt-8">
                    {milestone.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section - Simple wide layout */}
      <section 
        ref={teamRef}
        className="py-24 lg:py-32 px-4 lg:px-12"
      >
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${teamVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            {/* Image */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <img
                src="/lovable-uploads/e6d9646d-bf5f-471c-a2d8-1f06c274f570.png"
                alt="Andreas Myraune"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            </div>
            
            {/* Content */}
            <div className="space-y-8">
              <div>
                <span className="text-primary text-sm font-medium tracking-[0.2em] uppercase">
                  {language === "no" ? "Byråsjef" : language === "sv" ? "Byråchef" : language === "fi" ? "Toimistopäällikkö" : "Head of Agency"}
                </span>
                <h2 className="text-4xl lg:text-5xl font-bold text-foreground mt-2">
                  Andreas Myraune
                </h2>
              </div>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                {language === "no" ? "Vi tror på kraften i autentiske forbindelser. Når en streamer virkelig elsker et produkt, merker seerne det." : 
                 language === "sv" ? "Vi tror på kraften i autentiska kopplingar. När en streamer verkligen älskar en produkt märker tittarna det." : 
                 language === "fi" ? "Uskomme aitojen yhteyksien voimaan. Kun streamaaja todella rakastaa tuotetta, katsojat huomaavat sen." : 
                 "We believe in the power of authentic connections. When a streamer genuinely loves a product, viewers notice."}
              </p>

              {/* Values as simple text */}
              <div className="text-sm text-muted-foreground space-y-1">
                <p><span className="text-foreground font-medium">{language === "no" ? "Native først" : language === "sv" ? "Native först" : language === "fi" ? "Natiivi ensin" : "Native First"}</span> · {language === "no" ? "Annonser som føles ekte" : language === "sv" ? "Annonser som känns äkta" : language === "fi" ? "Mainoksia, jotka tuntuvat aidoilta" : "Ads that feel authentic"}</p>
                <p><span className="text-foreground font-medium">{language === "no" ? "Kvalitet" : language === "sv" ? "Kvalitet" : language === "fi" ? "Laatu" : "Quality"}</span> · {language === "no" ? "Premium streamere kun" : language === "sv" ? "Premium streamers endast" : language === "fi" ? "Vain premium-streamaajat" : "Premium streamers only"}</p>
                <p><span className="text-foreground font-medium">{language === "no" ? "Tillit" : language === "sv" ? "Förtroende" : language === "fi" ? "Luottamus" : "Trust"}</span> · {language === "no" ? "Langsiktige partnerskap" : language === "sv" ? "Långsiktiga partnerskap" : language === "fi" ? "Pitkäaikaiset kumppanuudet" : "Long-term partnerships"}</p>
              </div>

              {/* Contact */}
              <div className="flex items-center gap-4 pt-4">
                <a 
                  href="mailto:andreas@beta-ads.no"
                  className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium"
                >
                  <Mail className="w-4 h-4" />
                  andreas@beta-ads.no
                </a>
                <span className="text-border">·</span>
                <a 
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
              </div>

              {/* Join CTA - Simple inline */}
              <div className="pt-8 border-t border-border">
                <a 
                  href="mailto:careers@beta-ads.no"
                  className="group inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors"
                >
                  <span className="font-medium">
                    {language === "no" ? "Bli med på laget" : language === "sv" ? "Gå med i teamet" : language === "fi" ? "Liity tiimiin" : "Join the team"}
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
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
