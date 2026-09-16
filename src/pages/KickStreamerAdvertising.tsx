import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { MarketingPageLayout } from "@/components/layout/MarketingPageLayout";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";
import AnimatedShaderBackground from "@/components/ui/lazy-animated-background";

/**
 * Beta Ads on Kick: the creator route. Where /kick-advertising sells Kick's
 * own placements, this page explains how a brand appears inside the streams
 * of the Nordic Kick creators in our network, how a campaign runs, and what
 * the same format has delivered on Twitch.
 *
 * Two languages (en, no). Every number is either ours (network size, case
 * results, poll response) or Kick's with attribution. The overlay clips are
 * real campaign overlays; they ran on Twitch and the copy says so.
 */

type Lang = "en" | "no" | "sv" | "da" | "fi";

const ROUTES: Record<Lang, string> = {
  en: "/kick-streamer-advertising",
  no: "/kick-streamer-annonsering",
  sv: "/kick-streamer-annonsering-sverige",
  da: "/kick-streamer-annoncering",
  fi: "/kick-streamer-mainonta",
};
const LANGS: Lang[] = ["en", "no", "sv", "da", "fi"];
const LANG_NAMES: Record<Lang, string> = { en: "English", no: "Norsk", sv: "Svenska", da: "Dansk", fi: "Suomi" };
const KICK_PAGE: Record<Lang, string> = {
  en: "/kick-advertising",
  no: "/kick-annonsering",
  sv: "/kick-annonsering-sverige",
  da: "/kick-annoncering",
  fi: "/kick-mainonta",
};
export const KICK_STREAMER_ROUTES = ROUTES;

const OG: Record<Lang, string> = Object.fromEntries(
  LANGS.map((l) => [l, `/lovable-uploads/og/kick-streamer-advertising-${l}.png`]),
) as Record<Lang, string>;

const serif = { fontFamily: "'Instrument Serif', serif" };
const HERO_IMG = "/lovable-uploads/beta-mascot-onair.jpg";
const EXPLORER = "/lovable-uploads/kick/streamer-explorer-kick.webp";

const CASES = [
  { brand: "Samsung", logo: "/lovable-uploads/logo-samsung.png", metric: "500,131", metricLocal: "500 131", href: "/case-study/samsung",
    label: { en: "completed views, 2.93% CTR", no: "fullførte visninger, 2,93 % CTR", sv: "fullföljda visningar, 2,93 % CTR", da: "gennemførte visninger, 2,93 % CTR", fi: "katsottua näyttöä, 2,93 % CTR" } },
  { brand: "Shure", logo: "/lovable-uploads/logo-shure.png", metric: "9.12%", metricLocal: "9,12 %", href: "/case-study/shure",
    label: { en: "peak-day CTR, 182,554 views", no: "CTR på toppdagen, 182 554 visninger", sv: "CTR på toppdagen, 182 554 visningar", da: "CTR på topdagen, 182.554 visninger", fi: "huippupäivän CTR, 182 554 näyttöä" } },
  { brand: "Komplett", logo: "/lovable-uploads/logo-komplett.png", metric: "151,278", metricLocal: "151 278", href: "/case-study/komplett",
    label: { en: "display views, 1.17% CTR, 34 streamers", no: "visninger, 1,17 % CTR, 34 strømmere", sv: "visningar, 1,17 % CTR, 34 streamers", da: "visninger, 1,17 % CTR, 34 streamere", fi: "näyttöä, 1,17 % CTR, 34 striimaajaa" } },
] as const;

/** Real frames from real campaigns, overlay in the picture. */
const STILLS = [
  { src: "/lovable-uploads/case-glorious-poster.webp", href: "/case-study/glorious", alt: "VikingDuden live with a Glorious V3 Mouse overlay in the lower right of the stream, chat on the left", cap: { en: "Glorious, in VikingDuden's stream", no: "Glorious, i VikingDudens strøm", sv: "Glorious, i VikingDudens stream", da: "Glorious, i VikingDudens stream", fi: "Glorious, VikingDudenin lähetyksessä" } },
  { src: "/lovable-uploads/adgif-3818527-poster.webp", href: "/case-study/gokstad", alt: "RubenGKS live at his desk with a Gokstad Akademiet overlay in the lower right asking what you will do this autumn", cap: { en: "Gokstad Akademiet, in RubenGKS's stream", no: "Gokstad Akademiet, i RubenGKS' strøm", sv: "Gokstad Akademiet, i RubenGKS stream", da: "Gokstad Akademiet, i RubenGKS' stream", fi: "Gokstad Akademiet, RubenGKS:n lähetyksessä" } },
  { src: "/lovable-uploads/adgif-3637484-poster.webp", href: "/case-study/glorious", alt: "kishoo live with a Glorious V3 Mouse overlay beside the chat", cap: { en: "Glorious, in kishoo's stream", no: "Glorious, i kishoos strøm", sv: "Glorious, i kishoos stream", da: "Glorious, i kishoos stream", fi: "Glorious, kishoon lähetyksessä" } },
] as const;

const COPY = {
  en: {
    seoTitle: "Advertise Through Kick Streamers in the Nordics | Beta Ads",
    seoDescription:
      "Beta Ads places brands inside the streams of 2,800+ Nordic Kick creators: native overlays, voice-triggered ads, polls and replay reach. How a campaign runs, what it has delivered, and how to start.",
    badge: "Beta Ads on Kick",
    h1Accent: "Inside the stream,",
    h1Rest: "not around it.",
    sub: "Kick sells the frame. We work inside the picture: your brand appears in the broadcast a Nordic creator is making, during moments they have agreed to, in a language their viewers speak.",
    primary: "Book a demo",
    secondary: "Kick's own formats",
    stats: [
      { value: "2,800+", label: "Kick creators in Norway, Sweden, Denmark and Finland (Beta Ads network)" },
      { value: "2.93%", label: "average CTR on the Samsung campaign, 500,131 completed views" },
      { value: "67%", label: "response rate reached on in-stream polls" },
      { value: "20.0%", label: "Kick's share of Kick + Twitch hours in Northern Europe (Kick, Q2 2026)" },
    ],
    formats: {
      label: "How it appears",
      heading: "Four ways into a Kick stream.",
      body: "All of them are part of the video the creator sends out. That is why every viewer sees them, on every device, with every ad blocker, and why they are still there when the stream is replayed.",
      items: [
        { name: "Native overlay", desc: "A branded graphic on the stream during sponsored moments, animated or static. It never runs constantly and never covers the game." },
        { name: "Voice-triggered", desc: "Fires when the creator says your brand, using real-time voice recognition. The ad shows up at the exact second the endorsement happens." },
        { name: "Polls and chat", desc: "A question the audience answers in chat, with the split in your report. Our poll campaigns have reached a 67 percent response rate." },
        { name: "Replay reach", desc: "The overlay is burned into the VOD and the clips, so the campaign keeps being seen after the live stream ends." },
      ],
      clipsLabel: "Real overlays in real streams",
      clipsNote: "Frames from the Glorious and Gokstad Akademiet campaigns. The overlay is part of the picture the creator sends out, not a layer the player adds.",
    },
    steps: {
      label: "How a campaign runs",
      heading: "Brief on Monday. Live the week after.",
      items: [
        { n: "01", title: "Brief and market", desc: "Country, budget, dates, what you want viewers to do. We answer with a plan and a CPM within two working days." },
        { n: "02", title: "Creators, by hand", desc: "We pick from the Kick creators in our Streamer Explorer, filtered on country, language, category and brand-safety score. You approve the list." },
        { n: "03", title: "Live", desc: "Creators install nothing new; the overlay runs through the software they already stream with. Ads fire during agreed moments, not around the clock." },
        { n: "04", title: "Report", desc: "Completed views, CTR, poll answers, per-channel brand safety, replay reach. Kick and Twitch campaigns land in the same report." },
      ],
      figureCaption: "Streamer Explorer in the Beta Ads dashboard: 39,081 channels across Twitch, Kick, YouTube and Trovo, with engagement and brand-safety scores per channel. Kick creators are filtered out by platform, country and language.",
    },
    why: {
      label: "Why creators",
      heading: "Trust does not transfer from a banner.",
      body: [
        "Kick's own media kit quotes Edelman: 3.2 times more people trust a creator's recommendation than a celebrity's, and 94 percent of Gen Z trust influencers over TV ads. That trust belongs to the person on screen, and it only rubs off on a brand that appears with them, not in the sidebar next to them.",
        "Nordic Kick viewers watch Nordic creators in Norwegian, Swedish, Danish and Finnish. A creator campaign speaks that language by default. Kick's platform inventory is geo-targeted, which is useful, but it is a placement, not an endorsement.",
      ],
      note: "Both routes are booked through Beta Ads. Most brands we plan for now run Kick's homepage or category formats for the launch moment and a creator campaign for the weeks around it.",
      link: "See Kick's own formats",
    },
    proof: {
      label: "What the format has delivered",
      heading: "Same overlay, measured.",
      note: "Case studies from Twitch campaigns; the first Kick campaigns are booking now and will be published here when they report.",
      read: "Read the case",
    },
    faq: [
      { q: "Do you have Kick creators in my country?", a: "Yes. The network covers more than 2,800 Kick creators across Norway, Sweden, Denmark and Finland, with Finland the largest share, which matches Kick's own Nordic watch-hour split. Tell us the country and category and we send a shortlist." },
      { q: "Can viewers block the ad?", a: "No. The overlay is rendered into the video the creator broadcasts, so it reaches every viewer on every device, including those running ad blockers. It is also in the VOD and clips afterwards." },
      { q: "What about gambling and alcohol rules?", a: "Every campaign goes through our compliance check for the market it runs in, including Norway's marketing rules. Creators are hand-picked per campaign, and Kick's own 18+ inventory is a separate product we do not mix into creator campaigns without asking." },
    ],
    cta: { heading: "Let us show you a Nordic Kick stream with your brand in it.", subtext: "Thirty minutes, real channels, real reports.", primary: "Book a demo", secondary: "Pricing" },
    otherLang: "This page in other languages",
  },
  no: {
    seoTitle: "Annonser gjennom Kick-strømmere i Norden | Beta Ads",
    seoDescription:
      "Beta Ads plasserer merkevarer inne i strømmene til over 2 800 nordiske Kick-skapere: native overlays, stemmestyrte annonser, avstemninger og Replay reach. Slik kjøres en kampanje, hva den har levert, og hvordan du starter.",
    badge: "Beta Ads på Kick",
    h1Accent: "Inne i strømmen,",
    h1Rest: "ikke rundt den.",
    sub: "Kick selger rammen. Vi jobber inne i bildet: merkevaren din vises i sendingen en nordisk skaper lager, i øyeblikk de har sagt ja til, på et språk seerne snakker.",
    primary: "Book en demo",
    secondary: "Kicks egne formater",
    stats: [
      { value: "2 800+", label: "Kick-skapere i Norge, Sverige, Danmark og Finland (Beta Ads-nettverket)" },
      { value: "2,93 %", label: "gjennomsnittlig CTR på Samsung-kampanjen, 500 131 fullførte visninger" },
      { value: "67 %", label: "svarandel oppnådd på avstemninger i strømmen" },
      { value: "20,0 %", label: "Kicks andel av Kick + Twitch-timer i Nord-Europa (Kick, Q2 2026)" },
    ],
    formats: {
      label: "Slik vises det",
      heading: "Fire veier inn i en Kick-strøm.",
      body: "Alle er en del av videoen skaperen sender ut. Derfor ser alle seere dem, på alle enheter, med alle adblockere, og derfor er de fortsatt der når strømmen spilles av igjen.",
      items: [
        { name: "Native overlay", desc: "En merket grafikk på strømmen i sponsede øyeblikk, animert eller statisk. Den går aldri konstant og ligger aldri over spillet." },
        { name: "Stemmestyrt", desc: "Utløses når skaperen sier navnet på merkevaren, med talegjenkjenning i sanntid. Annonsen vises i samme sekund som anbefalingen skjer." },
        { name: "Avstemninger og chat", desc: "Et spørsmål publikum svarer på i chatten, med fordelingen i rapporten din. Avstemningskampanjene våre har nådd 67 prosent svarandel." },
        { name: "Replay reach", desc: "Overlayet ligger i VOD-en og klippene, så kampanjen blir sett videre etter at live-strømmen er over." },
      ],
      clipsLabel: "Ekte overlays i ekte strømmer",
      clipsNote: "Bilder fra Glorious- og Gokstad Akademiet-kampanjene. Overlayet er en del av bildet skaperen sender ut, ikke et lag spilleren legger på.",
    },
    steps: {
      label: "Slik kjøres en kampanje",
      heading: "Brief på mandag. Live uken etter.",
      items: [
        { n: "01", title: "Brief og marked", desc: "Land, budsjett, datoer, hva du vil at seerne skal gjøre. Vi svarer med en plan og en CPM innen to virkedager." },
        { n: "02", title: "Skapere, for hånd", desc: "Vi plukker fra Kick-skaperne i Streamer Explorer, filtrert på land, språk, kategori og brand safety-score. Du godkjenner listen." },
        { n: "03", title: "Live", desc: "Skaperne installerer ingenting nytt; overlayet går gjennom programvaren de allerede strømmer med. Annonsene går i avtalte øyeblikk, ikke døgnet rundt." },
        { n: "04", title: "Rapport", desc: "Fullførte visninger, CTR, svar på avstemninger, brand safety per kanal, Replay reach. Kick- og Twitch-kampanjer havner i samme rapport." },
      ],
      figureCaption: "Streamer Explorer i Beta Ads-dashbordet: 39 081 kanaler på tvers av Twitch, Kick, YouTube og Trovo, med engasjement- og brand safety-score per kanal. Kick-skapere filtreres ut på plattform, land og språk.",
    },
    why: {
      label: "Hvorfor skapere",
      heading: "Tillit smitter ikke fra et banner.",
      body: [
        "Kicks eget mediekit siterer Edelman: 3,2 ganger flere stoler på en skapers anbefaling enn på en kjendis, og 94 prosent av Gen Z stoler mer på influencere enn på TV-reklame. Den tilliten tilhører personen på skjermen, og den smitter bare over på en merkevare som vises sammen med dem, ikke i sidekolonnen ved siden av.",
        "Nordiske Kick-seere ser nordiske skapere på norsk, svensk, dansk og finsk. En skaperkampanje snakker det språket uten videre. Kicks plattformflater er geomålrettet, og det er nyttig, men det er en plassering, ikke en anbefaling.",
      ],
      note: "Begge veier bookes gjennom Beta Ads. De fleste merkevarene vi planlegger for nå, kjører Kicks forside- eller kategoriformater på lanseringsdagen og en skaperkampanje i ukene rundt.",
      link: "Se Kicks egne formater",
    },
    proof: {
      label: "Hva formatet har levert",
      heading: "Samme overlay, målt.",
      note: "Casene er fra Twitch-kampanjer; de første Kick-kampanjene bookes nå og publiseres her når de rapporterer.",
      read: "Les casen",
    },
    faq: [
      { q: "Har dere Kick-skapere i Norge?", a: "Ja. Nettverket dekker over 2 800 Kick-skapere i Norge, Sverige, Danmark og Finland, med Finland som største andel, noe som stemmer med Kicks egen nordiske fordeling av setimer. Si hvilket land og hvilken kategori, så sender vi en kortliste." },
      { q: "Kan seerne blokkere annonsen?", a: "Nei. Overlayet rendres inn i videoen skaperen sender, så det når alle seere på alle enheter, også de med adblocker. Det ligger også i VOD-en og klippene etterpå." },
      { q: "Hva med regler for pengespill og alkohol?", a: "Hver kampanje går gjennom vår compliance-sjekk for markedet den kjører i, inkludert det norske regelverket. Skaperne håndplukkes per kampanje, og Kicks egne 18+-flater er et eget produkt vi ikke blander inn i skaperkampanjer uten å spørre." },
    ],
    cta: { heading: "La oss vise deg en nordisk Kick-strøm med merkevaren din i.", subtext: "Tretti minutter, ekte kanaler, ekte rapporter.", primary: "Book en demo", secondary: "Priser" },
    otherLang: "Denne siden på andre språk",
  },
  sv: {
    seoTitle: "Annonsera genom Kick-streamers i Norden | Beta Ads",
    seoDescription:
      "Beta Ads placerar varumärken inne i streamsen hos över 2 800 nordiska Kick-kreatörer: native overlays, röststyrda annonser, omröstningar och Replay reach. Så körs en kampanj, vad den har levererat och hur du börjar.",
    badge: "Beta Ads på Kick",
    h1Accent: "Inne i streamen,",
    h1Rest: "inte runt den.",
    sub: "Kick säljer ramen. Vi jobbar inne i bilden: ditt varumärke syns i sändningen en nordisk kreatör gör, under ögonblick de har sagt ja till, på ett språk tittarna talar.",
    primary: "Boka en demo",
    secondary: "Kicks egna format",
    stats: [
      { value: "2 800+", label: "Kick-kreatörer i Sverige, Norge, Danmark och Finland (Beta Ads nätverk)" },
      { value: "2,93 %", label: "genomsnittlig CTR på Samsung-kampanjen, 500 131 fullföljda visningar" },
      { value: "67 %", label: "svarsfrekvens uppnådd på omröstningar i streamen" },
      { value: "20,0 %", label: "Kicks andel av Kick + Twitch-timmar i Nordeuropa (Kick, Q2 2026)" },
    ],
    formats: {
      label: "Så syns det",
      heading: "Fyra vägar in i en Kick-stream.",
      body: "Alla är en del av videon kreatören sänder ut. Därför ser alla tittare dem, på alla enheter, med alla adblockers, och därför finns de kvar när streamen spelas upp igen.",
      items: [
        { name: "Native overlay", desc: "En varumärkt grafik på streamen under sponsrade ögonblick, animerad eller statisk. Den går aldrig konstant och ligger aldrig över spelet." },
        { name: "Röststyrd", desc: "Triggas när kreatören säger varumärkets namn, med röstigenkänning i realtid. Annonsen visas i samma sekund som rekommendationen sker." },
        { name: "Omröstningar och chatt", desc: "En fråga publiken svarar på i chatten, med fördelningen i din rapport. Våra omröstningskampanjer har nått 67 procents svarsfrekvens." },
        { name: "Replay reach", desc: "Overlayen ligger kvar i VOD:en och klippen, så kampanjen fortsätter ses efter att live-streamen är slut." },
      ],
      clipsLabel: "Riktiga overlays i riktiga streams",
      clipsNote: "Bilder från Glorious- och Gokstad Akademiet-kampanjerna. Overlayen är en del av bilden kreatören sänder ut, inte ett lager spelaren lägger på.",
    },
    steps: {
      label: "Så körs en kampanj",
      heading: "Brief på måndag. Live veckan efter.",
      items: [
        { n: "01", title: "Brief och marknad", desc: "Land, budget, datum, vad du vill att tittarna ska göra. Vi svarar med en plan och en CPM inom två arbetsdagar." },
        { n: "02", title: "Kreatörer, för hand", desc: "Vi väljer bland Kick-kreatörerna i Streamer Explorer, filtrerat på land, språk, kategori och brand safety-poäng. Du godkänner listan." },
        { n: "03", title: "Live", desc: "Kreatörerna installerar inget nytt; overlayen går genom programvaran de redan streamar med. Annonserna går i avtalade ögonblick, inte dygnet runt." },
        { n: "04", title: "Rapport", desc: "Fullföljda visningar, CTR, svar på omröstningar, brand safety per kanal, Replay reach. Kick- och Twitch-kampanjer landar i samma rapport." },
      ],
      figureCaption: "Streamer Explorer i Beta Ads-dashboarden: 39 081 kanaler över Twitch, Kick, YouTube och Trovo, med engagemangs- och brand safety-poäng per kanal. Kick-kreatörer filtreras fram på plattform, land och språk.",
    },
    why: {
      label: "Varför kreatörer",
      heading: "Förtroende smittar inte från en banner.",
      body: [
        "Kicks eget mediekit citerar Edelman: 3,2 gånger fler litar på en kreatörs rekommendation än på en kändis, och 94 procent av Gen Z litar mer på influencers än på tv-reklam. Det förtroendet tillhör personen på skärmen, och det smittar bara av sig på ett varumärke som syns tillsammans med dem, inte i sidokolumnen bredvid.",
        "Nordiska Kick-tittare tittar på nordiska kreatörer på svenska, norska, danska och finska. En kreatörskampanj talar det språket av sig själv. Kicks plattformsytor är geostyrda, och det är användbart, men det är en placering, inte en rekommendation.",
      ],
      note: "Båda vägarna bokas genom Beta Ads. De flesta varumärken vi planerar för nu kör Kicks startsides- eller kategoriformat på lanseringsdagen och en kreatörskampanj veckorna runt.",
      link: "Se Kicks egna format",
    },
    proof: {
      label: "Vad formatet har levererat",
      heading: "Samma overlay, mätt.",
      note: "Casen är från Twitch-kampanjer; de första Kick-kampanjerna bokas nu och publiceras här när de rapporterar.",
      read: "Läs caset",
    },
    faq: [
      { q: "Har ni Kick-kreatörer i Sverige?", a: "Ja. Nätverket täcker över 2 800 Kick-kreatörer i Sverige, Norge, Danmark och Finland, med Finland som största andel och Sverige som näst största, vilket stämmer med Kicks egen nordiska fördelning av tittartimmar. Säg vilket land och vilken kategori, så skickar vi en kortlista." },
      { q: "Kan tittarna blockera annonsen?", a: "Nej. Overlayen renderas in i videon kreatören sänder, så den når alla tittare på alla enheter, även de med adblocker. Den ligger också i VOD:en och klippen efteråt." },
      { q: "Hur är det med regler för spel och alkohol?", a: "Varje kampanj går igenom vår compliance-kontroll för marknaden den körs i, inklusive de svenska reglerna för spel- och alkoholreklam. Kreatörerna handplockas per kampanj, och Kicks egna 18+-ytor är en separat produkt vi inte blandar in i kreatörskampanjer utan att fråga." },
    ],
    cta: { heading: "Låt oss visa dig en nordisk Kick-stream med ditt varumärke i.", subtext: "Trettio minuter, riktiga kanaler, riktiga rapporter.", primary: "Boka en demo", secondary: "Priser" },
    otherLang: "Den här sidan på andra språk",
  },
  da: {
    seoTitle: "Annoncer gennem Kick-streamere i Norden | Beta Ads",
    seoDescription:
      "Beta Ads placerer brands inde i streamsene hos over 2.800 nordiske Kick-creators: native overlays, stemmestyrede annoncer, afstemninger og Replay reach. Sådan kører en kampagne, hvad den har leveret, og hvordan du starter.",
    badge: "Beta Ads på Kick",
    h1Accent: "Inde i streamen,",
    h1Rest: "ikke rundt om den.",
    sub: "Kick sælger rammen. Vi arbejder inde i billedet: dit brand vises i den udsendelse, en nordisk creator laver, i øjeblikke de har sagt ja til, på et sprog seerne taler.",
    primary: "Book en demo",
    secondary: "Kicks egne formater",
    stats: [
      { value: "2.800+", label: "Kick-creators i Danmark, Norge, Sverige og Finland (Beta Ads-netværket)" },
      { value: "2,93 %", label: "gennemsnitlig CTR på Samsung-kampagnen, 500.131 gennemførte visninger" },
      { value: "67 %", label: "svarprocent opnået på afstemninger i streamen" },
      { value: "20,0 %", label: "Kicks andel af Kick + Twitch-timer i Nordeuropa (Kick, Q2 2026)" },
    ],
    formats: {
      label: "Sådan vises det",
      heading: "Fire veje ind i en Kick-stream.",
      body: "Alle er en del af den video, creatoren sender ud. Derfor ser alle seere dem, på alle enheder, med alle adblockere, og derfor er de der stadig, når streamen afspilles igen.",
      items: [
        { name: "Native overlay", desc: "En brandet grafik på streamen i sponsorerede øjeblikke, animeret eller statisk. Den kører aldrig konstant og ligger aldrig over spillet." },
        { name: "Stemmestyret", desc: "Udløses, når creatoren siger brandets navn, med stemmegenkendelse i realtid. Annoncen vises i samme sekund, som anbefalingen sker." },
        { name: "Afstemninger og chat", desc: "Et spørgsmål publikum svarer på i chatten, med fordelingen i din rapport. Vores afstemningskampagner har nået 67 procents svarprocent." },
        { name: "Replay reach", desc: "Overlayet ligger i VOD'en og klippene, så kampagnen bliver set videre, efter live-streamen er slut." },
      ],
      clipsLabel: "Rigtige overlays i rigtige streams",
      clipsNote: "Billeder fra Glorious- og Gokstad Akademiet-kampagnerne. Overlayet er en del af det billede, creatoren sender ud, ikke et lag afspilleren lægger på.",
    },
    steps: {
      label: "Sådan kører en kampagne",
      heading: "Brief mandag. Live ugen efter.",
      items: [
        { n: "01", title: "Brief og marked", desc: "Land, budget, datoer, hvad du vil have seerne til at gøre. Vi svarer med en plan og en CPM inden for to arbejdsdage." },
        { n: "02", title: "Creators, i hånden", desc: "Vi vælger blandt Kick-creatorerne i Streamer Explorer, filtreret på land, sprog, kategori og brand safety-score. Du godkender listen." },
        { n: "03", title: "Live", desc: "Creatorerne installerer intet nyt; overlayet kører gennem den software, de allerede streamer med. Annoncerne kører i aftalte øjeblikke, ikke døgnet rundt." },
        { n: "04", title: "Rapport", desc: "Gennemførte visninger, CTR, svar på afstemninger, brand safety per kanal, Replay reach. Kick- og Twitch-kampagner lander i samme rapport." },
      ],
      figureCaption: "Streamer Explorer i Beta Ads-dashboardet: 39.081 kanaler på tværs af Twitch, Kick, YouTube og Trovo, med engagement- og brand safety-score per kanal. Kick-creators filtreres frem på platform, land og sprog.",
    },
    why: {
      label: "Hvorfor creators",
      heading: "Tillid smitter ikke fra et banner.",
      body: [
        "Kicks eget mediekit citerer Edelman: 3,2 gange flere stoler på en creators anbefaling end på en kendis, og 94 procent af Gen Z stoler mere på influencere end på tv-reklamer. Den tillid tilhører personen på skærmen, og den smitter kun af på et brand, der vises sammen med dem, ikke i sidekolonnen ved siden af.",
        "Nordiske Kick-seere ser nordiske creators på dansk, norsk, svensk og finsk. En creator-kampagne taler det sprog af sig selv. Kicks platformsflader er geomålrettede, og det er nyttigt, men det er en placering, ikke en anbefaling.",
      ],
      note: "Begge veje bookes gennem Beta Ads. De fleste brands, vi planlægger for nu, kører Kicks forside- eller kategoriformater på lanceringsdagen og en creator-kampagne i ugerne omkring.",
      link: "Se Kicks egne formater",
    },
    proof: {
      label: "Hvad formatet har leveret",
      heading: "Samme overlay, målt.",
      note: "Casene er fra Twitch-kampagner; de første Kick-kampagner bookes nu og offentliggøres her, når de rapporterer.",
      read: "Læs casen",
    },
    faq: [
      { q: "Har I Kick-creators i Danmark?", a: "Ja. Netværket dækker over 2.800 Kick-creators i Danmark, Norge, Sverige og Finland. Danmark er det mindste af de fire markeder, hvilket passer med Kicks egen nordiske fordeling af setimer, men det er også der, konkurrencen om fladerne er lavest. Sig hvilket land og hvilken kategori, så sender vi en kortliste." },
      { q: "Kan seerne blokere annoncen?", a: "Nej. Overlayet renderes ind i den video, creatoren sender, så det når alle seere på alle enheder, også dem med adblocker. Det ligger også i VOD'en og klippene bagefter." },
      { q: "Hvad med regler for spil og alkohol?", a: "Hver kampagne går gennem vores compliance-tjek for det marked, den kører i, inklusive de danske regler for spil- og alkoholreklame. Creators håndplukkes per kampagne, og Kicks egne 18+-flader er et separat produkt, vi ikke blander ind i creator-kampagner uden at spørge." },
    ],
    cta: { heading: "Lad os vise dig en nordisk Kick-stream med dit brand i.", subtext: "Tredive minutter, rigtige kanaler, rigtige rapporter.", primary: "Book en demo", secondary: "Priser" },
    otherLang: "Denne side på andre sprog",
  },
  fi: {
    seoTitle: "Mainosta Kick-striimaajien kautta Pohjoismaissa | Beta Ads",
    seoDescription:
      "Beta Ads tuo brändit yli 2 800 pohjoismaisen Kick-tekijän lähetysten sisään: native overlayt, ääniohjatut mainokset, äänestykset ja Replay reach. Näin kampanja pyörii, mitä se on tuottanut ja miten aloitat.",
    badge: "Beta Ads Kickissä",
    h1Accent: "Lähetyksen sisällä,",
    h1Rest: "ei sen ympärillä.",
    sub: "Kick myy kehyksen. Me työskentelemme kuvan sisällä: brändisi näkyy pohjoismaisen tekijän lähetyksessä, hetkinä joihin he ovat suostuneet, kielellä jota katsojat puhuvat.",
    primary: "Varaa demo",
    secondary: "Kickin omat formaatit",
    stats: [
      { value: "2 800+", label: "Kick-tekijää Suomessa, Ruotsissa, Norjassa ja Tanskassa (Beta Adsin verkosto)" },
      { value: "2,93 %", label: "keskimääräinen CTR Samsung-kampanjassa, 500 131 katsottua näyttöä" },
      { value: "67 %", label: "vastausaste lähetyksen äänestyksissä" },
      { value: "20,0 %", label: "Kickin osuus Kick + Twitch -tunneista Pohjois-Euroopassa (Kick, Q2 2026)" },
    ],
    formats: {
      label: "Näin se näkyy",
      heading: "Neljä reittiä Kick-lähetyksen sisään.",
      body: "Kaikki ovat osa videota, jonka tekijä lähettää. Siksi jokainen katsoja näkee ne, kaikilla laitteilla, kaikilla mainosestäjillä, ja siksi ne ovat yhä paikallaan, kun lähetys katsotaan uudelleen.",
      items: [
        { name: "Native overlay", desc: "Brändätty grafiikka lähetyksessä sponsoroitujen hetkien aikana, animoituna tai staattisena. Ei koskaan jatkuvasti, ei koskaan pelin päällä." },
        { name: "Ääniohjattu", desc: "Käynnistyy, kun tekijä sanoo brändisi nimen, reaaliaikaisella puheentunnistuksella. Mainos näkyy samalla sekunnilla kuin suositus." },
        { name: "Äänestykset ja chat", desc: "Kysymys, johon yleisö vastaa chatissa, jakauma raportissasi. Äänestyskampanjamme ovat yltäneet 67 prosentin vastausasteeseen." },
        { name: "Replay reach", desc: "Overlay jää VOD:iin ja klippeihin, joten kampanjaa katsotaan vielä live-lähetyksen päätyttyä." },
      ],
      clipsLabel: "Oikeita overlayta oikeissa lähetyksissä",
      clipsNote: "Kuvia Glorious- ja Gokstad Akademiet -kampanjoista. Overlay on osa kuvaa, jonka tekijä lähettää, ei soittimen lisäämä kerros.",
    },
    steps: {
      label: "Näin kampanja pyörii",
      heading: "Brief maanantaina. Livenä seuraavalla viikolla.",
      items: [
        { n: "01", title: "Brief ja markkina", desc: "Maa, budjetti, päivämäärät, mitä haluat katsojien tekevän. Vastaamme suunnitelmalla ja CPM:llä kahden arkipäivän sisällä." },
        { n: "02", title: "Tekijät, käsin", desc: "Valitsemme Streamer Explorerin Kick-tekijöistä maan, kielen, kategorian ja bränditurvallisuuspisteiden mukaan. Sinä hyväksyt listan." },
        { n: "03", title: "Live", desc: "Tekijät eivät asenna mitään uutta; overlay kulkee ohjelmiston läpi, jolla he jo striimaavat. Mainokset näkyvät sovittuina hetkinä, eivät kellon ympäri." },
        { n: "04", title: "Raportti", desc: "Katsotut näytöt, CTR, äänestysvastaukset, bränditurvallisuus kanavaa kohti, Replay reach. Kick- ja Twitch-kampanjat päätyvät samaan raporttiin." },
      ],
      figureCaption: "Streamer Explorer Beta Adsin hallintapaneelissa: 39 081 kanavaa Twitchissä, Kickissä, YouTubessa ja Trovossa, sitoutumis- ja bränditurvallisuuspisteet kanavaa kohti. Kick-tekijät suodatetaan alustan, maan ja kielen mukaan.",
    },
    why: {
      label: "Miksi tekijät",
      heading: "Luottamus ei tartu bannerista.",
      body: [
        "Kickin oma mediakortti lainaa Edelmania: 3,2 kertaa useampi luottaa tekijän suositukseen kuin julkkiksen, ja 94 prosenttia Z-sukupolvesta luottaa vaikuttajiin enemmän kuin tv-mainoksiin. Se luottamus kuuluu ruudulla olevalle henkilölle, ja se tarttuu vain brändiin, joka näkyy heidän kanssaan, ei sivupalkissa heidän vieressään.",
        "Pohjoismaiset Kick-katsojat katsovat pohjoismaisia tekijöitä suomeksi, ruotsiksi, norjaksi ja tanskaksi. Tekijäkampanja puhuu sitä kieltä itsestään. Kickin alustapinnat ovat maakohdennettuja, mikä on hyödyllistä, mutta se on mainospaikka, ei suositus.",
      ],
      note: "Molemmat reitit varataan Beta Adsin kautta. Useimmat brändit, joille nyt suunnittelemme, ajavat Kickin etusivu- tai kategoriaformaatteja julkaisupäivänä ja tekijäkampanjaa sitä ympäröivinä viikkoina.",
      link: "Katso Kickin omat formaatit",
    },
    proof: {
      label: "Mitä formaatti on tuottanut",
      heading: "Sama overlay, mitattuna.",
      note: "Caset ovat Twitch-kampanjoista; ensimmäiset Kick-kampanjat varataan nyt ja julkaistaan tässä, kun ne raportoivat.",
      read: "Lue case",
    },
    faq: [
      { q: "Onko teillä Kick-tekijöitä Suomessa?", a: "Kyllä. Verkosto kattaa yli 2 800 Kick-tekijää Suomessa, Ruotsissa, Norjassa ja Tanskassa, ja Suomi on suurin osuus, mikä vastaa Kickin omaa pohjoismaista katselutuntijakoa. Kerro maa ja kategoria, niin lähetämme lyhytlistan." },
      { q: "Voivatko katsojat estää mainoksen?", a: "Eivät. Overlay renderöidään tekijän lähettämään videoon, joten se tavoittaa jokaisen katsojan kaikilla laitteilla, myös mainosestäjää käyttävät. Se on myös VOD:issa ja klipeissä jälkeenpäin." },
      { q: "Entä rahapeli- ja alkoholimainonnan säännöt?", a: "Jokainen kampanja käy läpi compliance-tarkastuksemme sen markkinan osalta, jossa se pyörii, mukaan lukien Suomen rahapeli- ja alkoholimainonnan säännöt. Tekijät valitaan käsin kampanjaa kohti, ja Kickin omat 18+-pinnat ovat erillinen tuote, jota emme sekoita tekijäkampanjoihin kysymättä." },
    ],
    cta: { heading: "Näytämme sinulle pohjoismaisen Kick-lähetyksen, jossa brändisi on mukana.", subtext: "Kolmekymmentä minuuttia, oikeita kanavia, oikeita raportteja.", primary: "Varaa demo", secondary: "Hinnat" },
    otherLang: "Tämä sivu muilla kielillä",
  },
} as const;

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">{children}</span>
);
const H2: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-6">{children}</h2>
);
const Reveal: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div ref={ref} className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}>
      {children}
    </div>
  );
};

const KickStreamerAdvertising: React.FC<{ lang?: Lang }> = ({ lang = "en" }) => {
  const t = COPY[lang];
  const route = ROUTES[lang];
  const kickPage = KICK_PAGE[lang];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: t.seoTitle,
      description: t.seoDescription,
      url: `https://beta-ads.no${route}`,
      provider: { "@type": "Organization", name: "Beta Ads", url: "https://beta-ads.no" },
      areaServed: ["NO", "SE", "DK", "FI"],
      serviceType: "In-stream advertising on Kick",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: t.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];

  return (
    <MarketingPageLayout
      seo={{
        title: t.seoTitle,
        description: t.seoDescription,
        canonical: route,
        locale: lang,
        alternates: [...LANGS.map((l) => ({ hreflang: l, href: ROUTES[l] })), { hreflang: "x-default" as const, href: ROUTES.en }],
        ogImage: OG[lang],
        jsonLd,
      }}
      cta={{ heading: t.cta.heading, subtext: t.cta.subtext, primaryLabel: t.cta.primary, primaryHref: "/demo", secondaryLabel: t.cta.secondary, secondaryHref: "/pricing" }}
    >
      {/* Hero */}
      <section className="relative overflow-hidden bg-[hsl(240_11%_5%)]">
        <AnimatedShaderBackground heightFactor={0.85} />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent z-[1] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-36 pb-24">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-white/80 backdrop-blur-sm mb-7">{t.badge}</span>
              <h1 className="text-5xl md:text-6xl font-bold text-white leading-[1.05] mb-6 tracking-tight">
                <span style={serif} className="italic font-normal">{t.h1Accent}</span>
                <br />
                {t.h1Rest}
              </h1>
              <p className="text-lg text-white/65 leading-relaxed mb-10 max-w-lg">{t.sub}</p>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-12">
                  <Link to="/demo">{t.primary} <ArrowRight className="ml-2 w-4 h-4" /></Link>
                </Button>
                <Button asChild size="lg" variant="ghost" className="text-white hover:bg-white/10 rounded-full px-8 h-12 border border-white/20">
                  <Link to={kickPage}>{t.secondary}</Link>
                </Button>
              </div>
            </div>
            <figure className="m-0 lg:justify-self-end w-full max-w-xl">
              <img src={HERO_IMG} alt="Beta, the Beta Ads mascot, live on air at a streaming desk" width={1200} height={685} className="w-full h-auto rounded-2xl ring-1 ring-white/10" loading="eager" />
            </figure>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px mt-20 border border-white/10 rounded-2xl overflow-hidden bg-white/10">
            {t.stats.map((s) => (
              <div key={s.label} className="bg-black/30 backdrop-blur-sm px-6 py-5">
                <div className="text-2xl font-bold text-white tracking-tight tabular-nums">{s.value}</div>
                <div className="text-xs text-white/50 mt-0.5 leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formats + real overlay clips */}
      <section className="border-t border-border py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-16 items-start">
            <div className="max-w-xl">
              <Label>{t.formats.label}</Label>
              <H2>{t.formats.heading}</H2>
              <p className="text-base md:text-lg font-light leading-relaxed text-muted-foreground">{t.formats.body}</p>
            </div>
            <dl className="grid sm:grid-cols-2 gap-x-10 gap-y-8 m-0 lg:pt-3">
              {t.formats.items.map((f) => (
                <div key={f.name} className="border-t border-border pt-4">
                  <dt className="text-base font-semibold text-foreground">{f.name}</dt>
                  <dd className="m-0 mt-1 text-sm leading-relaxed text-muted-foreground">{f.desc}</dd>
                </div>
              ))}
            </dl>
          </div>
          <Reveal className="mt-16">
            <h3 className="text-base font-semibold text-foreground mb-4">{t.formats.clipsLabel}</h3>
            <div className="grid md:grid-cols-3 gap-5">
              {STILLS.map((st) => (
                <Link key={st.src + st.cap.en} to={st.href} className="group block">
                  <figure className="m-0">
                    <img src={st.src} alt={st.alt} width={1280} height={720} loading="lazy" className="w-full h-auto rounded-2xl ring-1 ring-border" />
                    <figcaption className="text-xs text-muted-foreground mt-2 group-hover:text-foreground transition-colors">{st.cap[lang]}</figcaption>
                  </figure>
                </Link>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3">{t.formats.clipsNote}</p>
          </Reveal>
        </div>
      </section>

      {/* Steps + explorer */}
      <section className="border-t border-border py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-2xl">
            <Label>{t.steps.label}</Label>
            <H2>{t.steps.heading}</H2>
          </div>
          <div className="grid md:grid-cols-4 gap-8 mt-10">
            {t.steps.items.map((s, i) => (
              <div key={s.n} className="relative">
                {i < t.steps.items.length - 1 && <div className="hidden md:block absolute top-4 left-full w-full h-px bg-border -translate-x-4" />}
                <div className="text-4xl font-bold text-primary/15 mb-4 tracking-tighter">{s.n}</div>
                <h3 className="text-base font-semibold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <Reveal className="mt-16">
            <figure className="m-0">
              <img src={EXPLORER} alt="Beta Ads Streamer Explorer overview: 39,081 streamers, 2.0B total followers, 7.7M average concurrent viewers, engagement 6.2 of 10, brand safety 6.8 of 10, 878.9M hours total watch time" width={1900} height={720} loading="lazy" className="w-full h-auto rounded-2xl ring-1 ring-border" />
              <figcaption className="text-xs text-muted-foreground mt-3 max-w-2xl">{t.steps.figureCaption}</figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* Why creators */}
      <section className="border-t border-border py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-[1.05fr_0.95fr] gap-16 items-start">
          <div className="max-w-xl">
            <Label>{t.why.label}</Label>
            <H2>{t.why.heading}</H2>
            {t.why.body.map((p) => (
              <p key={p} className="text-base md:text-lg font-light leading-relaxed text-muted-foreground mb-5">{p}</p>
            ))}
          </div>
          <div className="lg:pt-3 max-w-xl">
            <p className="text-base font-light leading-relaxed text-foreground">{t.why.note}</p>
            <Link to={kickPage} className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline underline-offset-4 mt-4">
              {t.why.link} <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Proof */}
      <section className="border-t border-border py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-2xl">
            <Label>{t.proof.label}</Label>
            <H2>{t.proof.heading}</H2>
          </div>
          <Reveal className="grid md:grid-cols-3 gap-x-10 gap-y-10 mt-10 border-t border-border">
            {CASES.map((c) => (
              <div key={c.brand} className="pt-6">
                <img src={c.logo} alt={c.brand} className="h-6 w-auto mb-5" loading="lazy" />
                <div className="text-3xl font-bold tracking-tight tabular-nums text-foreground">{lang === "en" ? c.metric : c.metricLocal}</div>
                <div className="text-sm text-muted-foreground mt-1">{c.label[lang]}</div>
                <Link to={c.href} className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline underline-offset-4 mt-4">
                  {t.proof.read} <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </Reveal>
          <p className="text-xs text-muted-foreground mt-6 max-w-2xl">{t.proof.note}</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-[1.05fr_0.95fr] gap-16 items-start">
          <div>
            <Label>FAQ</Label>
            <div className="max-w-2xl">
              {t.faq.map((f) => (
                <details key={f.q} className="group border-b border-border last:border-b-0">
                  <summary className="flex items-center justify-between py-5 cursor-pointer text-sm font-medium text-foreground hover:text-primary transition-colors select-none">
                    {f.q}
                    <ArrowRight className="w-4 h-4 shrink-0 ml-4 transition-transform group-open:rotate-90 text-muted-foreground" />
                  </summary>
                  <div className="pb-5 text-sm text-muted-foreground leading-relaxed">{f.a}</div>
                </details>
              ))}
            </div>
          </div>
          <div className="lg:pt-3">
            <span className="text-xs text-muted-foreground block mb-3">{t.otherLang}</span>
            <nav className="flex flex-wrap gap-x-5 gap-y-2">
              {LANGS.filter((l) => l !== lang).map((l) => (
                <Link key={l} to={ROUTES[l]} hrefLang={l} className="text-sm font-medium text-foreground hover:text-primary underline-offset-4 hover:underline">
                  {LANG_NAMES[l]}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </section>
    </MarketingPageLayout>
  );
};

export default KickStreamerAdvertising;
