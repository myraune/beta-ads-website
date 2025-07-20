import React from "react";
import { useState } from "react";
import { Hero } from "@/components/sections/Hero";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { Examples } from "@/components/sections/Examples";
import { StreamerSection } from "@/components/sections/StreamerSection";
import { Press } from "@/components/sections/Press";

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
      ctaTitle: "Andreas Myraune",
      ctaDescription: "Book a quick demo with our team and we'll show you what your brand could look like live on Twitch.",
      bookDemo: "Let's have a chat",
      contactTitle: "CONTACT",
      connectTitle: "CONNECT",
      languageTitle: "LANGUAGE",
      pressTitle: "Featured in Press",
      pressDescription: "Beta Ads has been featured in leading Nordic media outlets for our innovative approach to Twitch advertising.",
      footerDescription: "The future of Twitch advertising is here.",
      passiveIncome: "Earn passive income based on your viewership",
      swipeHelper: "Swipe or use arrows to see more campaign examples",
      campaignOverview: "Overview of multiple campaigns in action",
      joinDiscord: "Join Our Discord",
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
      footerDescription: "Fremtiden for Twitch-annonsering er her.",
      passiveIncome: "Tjen passiv inntekt basert på dine seertall",
      swipeHelper: "Sveip eller bruk pilene for å se flere kampanjeeksempler",
      campaignOverview: "Oversikt over flere kampanjer i aksjon",
      joinDiscord: "Bli med på Discord",
    },
    sv: {
      heroSubtitle: "Nordisk Twitch-byrå",
      heroTitle: ["Ditt varumärke, live på Twitch", "– utan avbrott"],
      heroDescription: "Vi placerar ditt varumärke i Twitch-strömmar genom animerade overlays som tittare faktiskt lägger märke till.",
      heroSubDescription: "Inga tvingade integrationer. Bara garanterad synlighet.",
      brandButton: "Se Hur Det Fungerar",
      streamerButton: "Jag är en streamer",
      usedByTitle: "Används av Samsung, Surfshark och Shure för att nå Twitch-tittare med native annonser",
      seeCampaignExample: "Se Kampanjexempel",
      streamerSectionTitle: "Är du en Twitch-streamer?",
      streamerSectionSubtitle: "Tjäna medan du streamar – automatiskt.",
      streamerSectionDescription: "Tjäna pengar automatiskt med Beta Ads. Inga shoutouts. Inga affiliate-länkar. Bara passiv inkomst genom overlays.",
      joinStreamer: "Gå med som Streamer",
      trustedByTitle: "Så här kommer ditt varumärke att se ut på Twitch",
      trustedByDescription: "Designad för att smälta in med strömmen – men sticka ut för tittaren.",
      meetTeamTitle: "Träffa teamet",
      meetTeamDescription: "Unga, internationella och passionerade för att revolutionera reklam på Twitch.",
      ctaTitle: "Låter coolt?",
      ctaDescription: "Boka en snabb demo med vårt team så visar vi dig hur ditt varumärke kan se ut live på Twitch.",
      bookDemo: "Låt oss prata",
      contactTitle: "KONTAKT",
      connectTitle: "ANSLUT",
      languageTitle: "SPRÅK",
      pressTitle: "Uppmärksammat i Media",
      pressDescription: "Beta Ads har uppmärksammats i ledande nordiska medier för vår innovativa approach till Twitch-reklam.",
      footerDescription: "Framtiden för Twitch-reklam är här.",
      passiveIncome: "Tjäna passiv inkomst baserat på dina tittarsiffror",
      swipeHelper: "Svep eller använd pilarna för att se fler kampanjexempel",
      campaignOverview: "Översikt över flera kampanjer i aktion",
      joinDiscord: "Gå med i Discord",
    },
    fi: {
      heroSubtitle: "Pohjoismainen Twitch-toimisto",
      heroTitle: ["Brändisi, livenä Twitchissä", "– ilman keskeytyksiä"],
      heroDescription: "Sijoitamme brändisi Twitch-streameihin animoitujen overlay-kerroksien kautta, joita katsojat todella huomaavat.",
      heroSubDescription: "Ei pakotettuja integraatioita. Vain taattu näkyvyys.",
      brandButton: "Katso Miten Se Toimii",
      streamerButton: "Olen streamaaja",
      usedByTitle: "Samsung, Surfshark ja Shure käyttävät meitä tavoittaakseen Twitch-katsojia natiivimainoksilla",
      seeCampaignExample: "Katso Kampanjaesimerkki",
      streamerSectionTitle: "Oletko Twitch-streamaaja?",
      streamerSectionSubtitle: "Ansaitse samalla kun streamaat – automaattisesti.",
      streamerSectionDescription: "Ansaitse rahaa automaattisesti Beta Adsin kanssa. Ei shoutouteja. Ei affiliate-linkkejä. Vain passiivista tuloa overlay-kerrosten kautta.",
      joinStreamer: "Liity Streamaajaksi",
      trustedByTitle: "Näin brändisi näyttää Twitchissä",
      trustedByDescription: "Suunniteltu sulautumaan streamiin – mutta erottumaan katsojalle.",
      meetTeamTitle: "Tapaa tiimi",
      meetTeamDescription: "Nuoria, kansainvälisiä ja intohimoisia vallankumouksellista Twitch-mainontaa kohtaan.",
      ctaTitle: "Kuulostaa siistiltä?",
      ctaDescription: "Varaa nopea demo tiimimme kanssa, niin näytämme miltä brändisi voisi näyttää livenä Twitchissä.",
      bookDemo: "Jutellaan",
      contactTitle: "YHTEYSTIEDOT",
      connectTitle: "YHDISTÄ",
      languageTitle: "KIELI",
      pressTitle: "Mediassa Esillä",
      pressDescription: "Beta Ads on ollut esillä johtavissa pohjoismaisissa medioissa innovatiivisesta lähestymistavastamme Twitch-mainontaan.",
      footerDescription: "Twitch-mainonnan tulevaisuus on täällä.",
      passiveIncome: "Ansaitse passiivista tuloa katsojalukujen perusteella",
      swipeHelper: "Pyyhkäise tai käytä nuolia nähdäksesi lisää kampanjaesimerkkejä",
      campaignOverview: "Katsaus useisiin kampanjoihin toiminnassa",
      joinDiscord: "Liity Discordiin",
    },
  };

  const t = translations[language] || translations.en;

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const caseVideos = [
    {
      id: "Uw7IIecicB4",
      title: "Samsung Campaign Case Study",
      brand: "Samsung",
    },
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
  ];

  return (
    <div className="min-h-screen bg-background">
      <Hero t={t} scrollToSection={scrollToSection} language={language} setLanguage={setLanguage} />
      <TrustedBy />
      <Examples t={t} caseVideos={caseVideos} />
      <StreamerSection t={t} language={language} />
      <Press t={t} />
      <CTA t={t} />
      <Footer t={t} language={language} setLanguage={setLanguage} />
    </div>
  );
};

export default Index;
