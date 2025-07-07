import React from "react";
import { useState } from "react";
import { Hero } from "@/components/sections/Hero";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { Examples } from "@/components/sections/Examples";
import { StreamerSection } from "@/components/sections/StreamerSection";
import { Press } from "@/components/sections/Press";
import { Team } from "@/components/sections/Team";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";

const Index = () => {
  const [language, setLanguage] = useState("en");

  const translations = {
    en: {
      heroSubtitle: "Nordic twitch agency",
      heroTitle: ["Your brand, live on Twitch", "– without interruptions"],
      heroDescription: "We place your brand inside Twitch streams through animated overlays that viewers actually notice.",
      heroSubDescription: "No forced integrations. Just guaranteed visibility.",
      brandButton: "See How It Works",
      streamerButton: "I'm a streamer",
      usedByTitle: "Used by Samsung, Surfshark, and Shure to reach Twitch viewers with native ads",
      seeCampaignExample: "See Campaign Example",
      streamerSectionTitle: "Are you a Twitch streamer?",
      streamerSectionSubtitle: "Earn while you stream – automatically.",
      streamerSectionDescription: "Earn money automatically with Beta Ads. No shoutouts. No affiliate links. Just passive income through overlays.",
      joinStreamer: "Join as a Streamer",
      trustedByTitle: "How your brand will look on Twitch",
      trustedByDescription: "Designed to blend with the stream – but stand out to the viewer.",
      meetTeamTitle: "Meet the team",
      meetTeamDescription: "Young, international, and passionate about revolutionizing advertising on Twitch.",
      ctaTitle: "Sounds cool?",
      ctaDescription: "Book a quick demo with our team and we'll show you what your brand could look like live on Twitch.",
      bookDemo: "Let's have a chat",
      contactTitle: "CONTACT",
      connectTitle: "CONNECT",
      languageTitle: "LANGUAGE",
      pressTitle: "Featured in Press",
      pressDescription: "Beta Ads has been featured in leading Nordic media outlets for our innovative approach to Twitch advertising.",
    },
    no: {
      heroSubtitle: "Nordisk Twitch-byrå",
      heroTitle: ["Din merkevare, live på Twitch", "– uten avbrytelser"],
      heroDescription: "Vi plasserer din merkevare inne i Twitch-streams gjennom animerte overlays som seere faktisk legger merke til.",
      heroSubDescription: "Ingen tvungne integrasjoner. Bare garantert synlighet.",
      brandButton: "Se Hvordan Det Fungerer",
      streamerButton: "Jeg er en streamer",
      usedByTitle: "Brukt av Samsung, Surfshark og Shure for å nå Twitch-seere med native annonser",
      seeCampaignExample: "Se Kampanjeeksempel",
      streamerSectionTitle: "Er du en Twitch-streamer?",
      streamerSectionSubtitle: "Tjen mens du streamer – automatisk.",
      streamerSectionDescription: "Tjen penger automatisk med Beta Ads. Ingen shoutouts. Ingen affiliate-lenker. Bare passiv inntekt gjennom overlays.",
      joinStreamer: "Bli med som Streamer",
      trustedByTitle: "Hvordan din merkevare vil se ut på Twitch",
      trustedByDescription: "Designet for å blande seg med streamen – men skille seg ut for seeren.",
      meetTeamTitle: "Møt teamet",
      meetTeamDescription: "Unge, internasjonale og lidenskapelige om å revolusjonere annonsering på Twitch.",
      ctaTitle: "Høres kult ut?",
      ctaDescription: "Book en rask demo med vårt team og vi viser deg hvordan din merkevare kan se ut live på Twitch.",
      bookDemo: "La oss snakke sammen",
      contactTitle: "KONTAKT",
      connectTitle: "KOBLE TIL",
      languageTitle: "SPRÅK",
      pressTitle: "Omtalt i Media",
      pressDescription: "Beta Ads har blitt omtalt i ledende nordiske medier for vår innovative tilnærming til Twitch-annonsering.",
    },
  };

  const t = translations[language];

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const caseVideos = [
    {
      id: "IZOx_VMdJJg",
      title: "Shure Campaign Case Study",
      brand: "Shure",
    },
    {
      id: "ufNq-A4d7iA",
      title: "Komplett Campaign Case Study",
      brand: "Komplett",
    },
    {
      id: "O9bK6Sg7wHg",
      title: "Samsung Campaign Case Study",
      brand: "Samsung",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Hero t={t} scrollToSection={scrollToSection} language={language} setLanguage={setLanguage} />
      <TrustedBy />
      <Examples t={t} caseVideos={caseVideos} />
      <StreamerSection t={t} language={language} />
      <Press t={t} />
      <Team t={t} />
      <CTA t={t} />
      <Footer t={t} language={language} setLanguage={setLanguage} />
    </div>
  );
};

export default Index;
