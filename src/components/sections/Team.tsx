import React from "react";
import { Mail, Linkedin, Quote, Heart, Shield, Sparkles } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface TeamProps {
  t: any;
  language?: string;
}

export const Team: React.FC<TeamProps> = ({ t, language = "en" }) => {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation();

  const values = [
    {
      icon: Heart,
      title: language === "no" ? "Native først" : language === "sv" ? "Native först" : language === "fi" ? "Natiivi ensin" : "Native First",
      description: language === "no" ? "Annonser som føles ekte" : language === "sv" ? "Annonser som känns äkta" : language === "fi" ? "Mainoksia, jotka tuntuvat aidoilta" : "Ads that feel authentic"
    },
    {
      icon: Shield,
      title: language === "no" ? "Kvalitet" : language === "sv" ? "Kvalitet" : language === "fi" ? "Laatu" : "Quality",
      description: language === "no" ? "Premium streamere kun" : language === "sv" ? "Premium streamers endast" : language === "fi" ? "Vain premium-streamaajat" : "Premium streamers only"
    },
    {
      icon: Sparkles,
      title: language === "no" ? "Tillit" : language === "sv" ? "Förtroende" : language === "fi" ? "Luottamus" : "Trust",
      description: language === "no" ? "Langsiktige partnerskap" : language === "sv" ? "Långsiktiga partnerskap" : language === "fi" ? "Pitkäaikaiset kumppanuudet" : "Long-term partnerships"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-24 lg:py-32 px-4 lg:px-12"
    >
      <div className={`max-w-7xl mx-auto transition-all duration-1000 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="flex items-start gap-4 mb-16">
          <div className="w-1 h-16 bg-gradient-to-b from-primary to-primary/20 rounded-full" />
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              {t.meetTeamTitle || (language === "no" ? "Møt teamet" : language === "sv" ? "Möt teamet" : language === "fi" ? "Tapaa tiimi" : "Meet the Team")}
            </h2>
            <p className="text-muted-foreground max-w-lg">
              {t.meetTeamDescription || (language === "no" ? "Lidenskapelige eksperter innen Twitch-annonsering" : language === "sv" ? "Passionerade experter inom Twitch-reklam" : language === "fi" ? "Intohimoiset Twitch-mainonnan asiantuntijat" : "Passionate experts in Twitch advertising")}
            </p>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Team Card - Takes 2 columns */}
          <div className="lg:col-span-2 bg-card/50 backdrop-blur-sm rounded-3xl border border-border/50 overflow-hidden group hover:border-primary/30 transition-all duration-500">
            <div className="grid md:grid-cols-2 h-full">
              {/* Image */}
              <div className="relative h-64 md:h-full overflow-hidden">
                <img
                  src="/lovable-uploads/e6d9646d-bf5f-471c-a2d8-1f06c274f570.png"
                  alt="Andreas Myraune"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/50 md:block hidden" />
              </div>
              
              {/* Content */}
              <div className="p-8 flex flex-col justify-center">
                <span className="text-primary text-xs font-medium tracking-[0.2em] uppercase mb-4">
                  {language === "no" ? "Byråsjef" : language === "sv" ? "Byråchef" : language === "fi" ? "Toimistopäällikkö" : "Head of Agency"}
                </span>
                <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                  Andreas Myraune
                </h3>
                
                {/* Quote */}
                <div className="relative mb-6">
                  <Quote className="w-8 h-8 text-primary/20 absolute -left-2 -top-2" />
                  <p className="text-muted-foreground italic pl-6 text-sm leading-relaxed">
                    {language === "no" ? "Vi tror på kraften i autentiske forbindelser. Når en streamer virkelig elsker et produkt, merker seerne det." : 
                     language === "sv" ? "Vi tror på kraften i autentiska kopplingar. När en streamer verkligen älskar en produkt märker tittarna det." : 
                     language === "fi" ? "Uskomme aitojen yhteyksien voimaan. Kun streamaaja todella rakastaa tuotetta, katsojat huomaavat sen." : 
                     "We believe in the power of authentic connections. When a streamer genuinely loves a product, viewers notice."}
                  </p>
                </div>

                {/* Contact Links */}
                <div className="flex items-center gap-3">
                  <a 
                    href="mailto:andreas@beta-ads.no"
                    className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    Email
                  </a>
                  <a 
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-muted hover:bg-muted/80 text-foreground px-4 py-2 rounded-full text-sm font-medium transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Values Card - 1 column */}
          <div className="bg-card/50 backdrop-blur-sm rounded-3xl border border-border/50 p-8 hover:border-primary/30 transition-all duration-300">
            <h3 className="text-lg font-semibold text-foreground mb-6">
              {language === "no" ? "Våre verdier" : language === "sv" ? "Våra värderingar" : language === "fi" ? "Arvomme" : "Core Values"}
            </h3>
            
            <div className="space-y-6">
              {values.map((value, index) => (
                <div 
                  key={value.title}
                  className="group/item flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover/item:bg-primary/20 transition-colors">
                    <value.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">{value.title}</h4>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Join Us Card */}
        <div className="mt-6 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-3xl border border-primary/20 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {language === "no" ? "Bli med på laget?" : language === "sv" ? "Gå med i teamet?" : language === "fi" ? "Liity tiimiin?" : "Join the team?"}
            </h3>
            <p className="text-muted-foreground text-sm">
              {language === "no" ? "Vi er alltid på utkikk etter talenter innen gaming og markedsføring" : 
               language === "sv" ? "Vi letar alltid efter talanger inom gaming och marknadsföring" : 
               language === "fi" ? "Etsimme aina lahjakkuuksia pelaamisen ja markkinoinnin parista" : 
               "We're always looking for talent in gaming and marketing"}
            </p>
          </div>
          <a 
            href="mailto:careers@beta-ads.no"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-full font-medium transition-colors whitespace-nowrap"
          >
            {language === "no" ? "Kontakt oss" : language === "sv" ? "Kontakta oss" : language === "fi" ? "Ota yhteyttä" : "Get in touch"}
          </a>
        </div>
      </div>
    </section>
  );
};
