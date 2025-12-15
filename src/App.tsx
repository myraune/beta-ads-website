import React, { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Layout } from "@/components/Layout";

import Index from "./pages/Index";
import CaseStudies from "./pages/CaseStudies";
import HowItWorks from "./pages/HowItWorks";
import Streamers from "./pages/Streamers";
import AboutUs from "./pages/AboutUs";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";

// Translations object - shared across all pages
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
    streamerSectionTitle: "are you a streamer?",
    streamerSectionSubtitle: "Earn while you stream – automatically.",
    streamerSectionDescription: "Earn money automatically with Beta Ads. No shoutouts. No affiliate links. Just passive income through overlays.",
    joinStreamer: "Join as a Streamer",
    trustedByTitle: "Just watch...",
    trustedByDescription: "Designed to blend with the stream – but stand out to the viewer.",
    meetTeamTitle: "Meet the team",
    meetTeamDescription: "Young, international, and passionate about revolutionizing advertising on Twitch.",
    ctaTitle: "Let's talk",
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
    mechanismsSubtitle: "AI-Powered Features",
    mechanismsTitle: "This should convince you.",
    mechanismsDescription: "Discover our cutting-edge AI functionalities that make your brand integration more engaging and interactive.",
    vrmTitle: "Voice Recognition Mechanism",
    vrmDescription: "Contextual artwork appears when streamers say keywords, creating natural brand integration.",
    vrmHowItWorks: ["The streamer says one of the keywords.", "The mechanism recognises the word and launches the artwork.", "Viewers see a contextual message on the stream."],
    vrmWhyWorthIt: ["An innovative mechanism that surprises audiences.", "The brand becomes part of the themes or games on the stream.", "Contextual messages reach the audience better."],
    votingTitle: "Voting Mechanism",
    votingDescription: "Interactive voting system that allows viewers to participate in decision-making and games.",
    votingHowItWorks: ["Artwork encouraging people to vote for a particular option appears on the stream.", "Another artwork appears with the result that the players have chosen."],
    votingWhyWorthIt: ["Involving the audience in decision-making strengthens their focus.", "The brand is the interactive part of the stream. And since I'm already clicking on the chat, I can also click the link...."],
    howItWorksTitle: "HOW DOES IT WORK?",
    whyWorthItTitle: "WHY IS IT WORTH IT?",
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
    streamerSectionTitle: "er du en streamer?",
    streamerSectionSubtitle: "Tjen mens du streamer – automatisk.",
    streamerSectionDescription: "Tjen penger automatisk med Beta Ads. Ingen shoutouts. Ingen affiliate-lenker. Bare passiv inntekt gjennom overlays.",
    joinStreamer: "Bli med som Streamer",
    trustedByTitle: "Bare se...",
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
    mechanismsSubtitle: "AI-Drevne Funksjoner",
    mechanismsTitle: "Dette bør overbevise deg.",
    mechanismsDescription: "Oppdag våre banebrytende AI-funksjoner som gjør merkevareintegrasjonen mer engasjerende og interaktiv.",
    vrmTitle: "Stemmegjenkjenningsmekanisme",
    vrmDescription: "Kontekstuell grafikk dukker opp når streamere sier nøkkelord, og skaper naturlig merkevareintegrering.",
    vrmHowItWorks: ["Streameren sier et av nøkkelordene.", "Mekanismen gjenkjenner ordet og lanserer grafikken.", "Seerne ser en kontekstuell melding på streamen."],
    vrmWhyWorthIt: ["En innovativ mekanisme som overrasker publikum.", "Merkevaren blir en del av temaene eller spillene på streamen.", "Kontekstuelle meldinger når publikum bedre."],
    votingTitle: "Avstemningsmekanisme",
    votingDescription: "Interaktivt avstemningssystem som lar seere delta i beslutninger og spill.",
    votingHowItWorks: ["Grafikk som oppfordrer folk til å stemme på et bestemt alternativ dukker opp på streamen.", "En annen grafikk dukker opp med resultatet som spillerne har valgt."],
    votingWhyWorthIt: ["Å involvere publikum i beslutninger styrker deres fokus.", "Merkevaren er den interaktive delen av streamen. Og siden jeg allerede klikker på chatten, kan jeg også klikke på lenken...."],
    howItWorksTitle: "HVORDAN FUNGERER DET?",
    whyWorthItTitle: "HVORFOR ER DET VERDT DET?",
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
    streamerSectionTitle: "är du en streamer?",
    streamerSectionSubtitle: "Tjäna medan du streamar – automatiskt.",
    streamerSectionDescription: "Tjäna pengar automatiskt med Beta Ads. Inga shoutouts. Inga affiliate-länkar. Bara passiv inkomst genom overlays.",
    joinStreamer: "Gå med som Streamer",
    trustedByTitle: "Bara titta...",
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
    mechanismsSubtitle: "AI-Drivna Funktioner",
    mechanismsTitle: "Detta borde övertyga dig.",
    mechanismsDescription: "Upptäck våra banbrytande AI-funktioner som gör din varumärkesintegration mer engagerande och interaktiv.",
    vrmTitle: "Rösterkänningsmekanism",
    vrmDescription: "Kontextuell grafik visas när streamers säger nyckelord, vilket skapar naturlig varumärkesintegration.",
    vrmHowItWorks: ["Streamern säger ett av nyckelorden.", "Mekanismen känner igen ordet och lanserar grafiken.", "Tittarna ser ett kontextuellt meddelande på strömmen."],
    vrmWhyWorthIt: ["En innovativ mekanism som överraskar publiken.", "Varumärket blir en del av temana eller spelen på strömmen.", "Kontextuella meddelanden når publiken bättre."],
    votingTitle: "Röstmekanism",
    votingDescription: "Interaktivt röstningssystem som låter tittare delta i beslutsfattande och spel.",
    votingHowItWorks: ["Grafik som uppmuntrar folk att rösta på ett visst alternativ visas på strömmen.", "En annan grafik visas med resultatet som spelarna har valt."],
    votingWhyWorthIt: ["Att involvera publiken i beslutsfattande stärker deras fokus.", "Varumärket är den interaktiva delen av strömmen. Och eftersom jag redan klickar på chatten kan jag också klicka på länken...."],
    howItWorksTitle: "HUR FUNGERAR DET?",
    whyWorthItTitle: "VARFÖR ÄR DET VÄRT DET?",
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
    streamerSectionTitle: "oletko streamaaja?",
    streamerSectionSubtitle: "Ansaitse samalla kun streamaat – automaattisesti.",
    streamerSectionDescription: "Ansaitse rahaa automaattisesti Beta Adsin kanssa. Ei shoutouteja. Ei affiliate-linkkejä. Vain passiivista tuloa overlay-kerrosten kautta.",
    joinStreamer: "Liity Streamaajaksi",
    trustedByTitle: "Katso vain...",
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
    mechanismsSubtitle: "AI-Käyttöiset Ominaisuudet",
    mechanismsTitle: "Tämän pitäisi vakuuttaa sinut.",
    mechanismsDescription: "Tutustu huippuluokan AI-toimintoihimme, jotka tekevät brändi-integraatiosta kiinnostavampaa ja interaktiivisempaa.",
    vrmTitle: "Äänentunnistusmekanismi",
    vrmDescription: "Kontekstuaalinen grafiikka ilmestyy kun streamaajat sanovat avainsanoja, luoden luonnollisen brändi-integraation.",
    vrmHowItWorks: ["Streamaaja sanoo yhden avainsanoista.", "Mekanismi tunnistaa sanan ja käynnistää grafiikan.", "Katsojat näkevät kontekstuaalisen viestin streamissä."],
    vrmWhyWorthIt: ["Innovatiivinen mekanismi, joka yllättää yleisön.", "Brändi tulee osaksi streamin teemoja tai pelejä.", "Kontekstuaaliset viestit tavoittavat yleisön paremmin."],
    votingTitle: "Äänestysmekanismi",
    votingDescription: "Interaktiivinen äänestyssysteemi, joka antaa katsojien osallistua päätöksentekoon ja peleihin.",
    votingHowItWorks: ["Grafiikka, joka rohkaisee ihmisiä äänestämään tiettyä vaihtoehtoa, ilmestyy streamiin.", "Toinen grafiikka ilmestyy tuloksella, jonka pelaajat ovat valinneet."],
    votingWhyWorthIt: ["Yleisön osallistaminen päätöksentekoon vahvistaa heidän keskittymistään.", "Brändi on streamin interaktiivinen osa. Ja koska klikkaan jo chattia, voin myös klikata linkkiä...."],
    howItWorksTitle: "MITEN SE TOIMII?",
    whyWorthItTitle: "MIKSI SE ON KANNATTAVAA?",
  },
};

const queryClient = new QueryClient();

const App = () => {
  const [language, setLanguage] = useState("en");
  const t = translations[language as keyof typeof translations] || translations.en;

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout language={language} setLanguage={setLanguage}>
            <Routes>
              <Route path="/" element={<Index t={t} language={language} setLanguage={setLanguage} />} />
              <Route path="/case-studies" element={<CaseStudies t={t} language={language} setLanguage={setLanguage} />} />
              <Route path="/how-it-works" element={<HowItWorks t={t} language={language} setLanguage={setLanguage} />} />
              <Route path="/streamers" element={<Streamers t={t} language={language} setLanguage={setLanguage} />} />
              <Route path="/about" element={<AboutUs t={t} language={language} setLanguage={setLanguage} />} />
              <Route path="/blog" element={<Blog t={t} language={language} setLanguage={setLanguage} />} />
              <Route path="/blog/:slug" element={<BlogPost t={t} language={language} setLanguage={setLanguage} />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
