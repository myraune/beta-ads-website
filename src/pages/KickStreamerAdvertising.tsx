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

type Lang = "en" | "no";

const ROUTES: Record<Lang, string> = {
  en: "/kick-streamer-advertising",
  no: "/kick-streamer-annonsering",
};
export const KICK_STREAMER_ROUTES = ROUTES;

const OG: Record<Lang, string> = {
  en: "/lovable-uploads/og/kick-streamer-advertising-en.png",
  no: "/lovable-uploads/og/kick-streamer-advertising-no.png",
};

const serif = { fontFamily: "'Instrument Serif', serif" };
const HERO_IMG = "/lovable-uploads/beta-mascot-onair.jpg";
const EXPLORER = "/lovable-uploads/kick/streamer-explorer-kick.webp";

const CASES = [
  { brand: "Samsung", logo: "/lovable-uploads/logo-samsung.png", metric: "500,131", metricNo: "500 131", video: "/lovable-uploads/overlay-samsung.webm", href: "/case-study/samsung", label: { en: "completed views, 2.93% CTR", no: "fullførte visninger, 2,93 % CTR" } },
  { brand: "Shure", logo: "/lovable-uploads/logo-shure.png", metric: "9.12%", metricNo: "9,12 %", video: "/lovable-uploads/overlay-shure-gca.webm", href: "/case-study/shure", label: { en: "peak-day CTR, 182,554 views", no: "CTR på toppdagen, 182 554 visninger" } },
  { brand: "Komplett", logo: "/lovable-uploads/logo-komplett.png", metric: "151,278", metricNo: "151 278", video: "/lovable-uploads/overlay-komplett.webm", href: "/case-study/komplett", label: { en: "display views, 1.17% CTR, 34 streamers", no: "visninger, 1,17 % CTR, 34 strømmere" } },
] as const;

/** Real frames from real campaigns, overlay in the picture. */
const STILLS = [
  { src: "/lovable-uploads/case-glorious-poster.webp", href: "/case-study/glorious", alt: "VikingDuden live with a Glorious V3 Mouse overlay in the lower right of the stream, chat on the left", cap: { en: "Glorious, in VikingDuden's stream", no: "Glorious, i VikingDudens strøm" } },
  { src: "/lovable-uploads/adgif-3637484-poster.webp", href: "/case-study/gokstad", alt: "A streamer talking to camera with a Gokstad Akademiet overlay asking what you will do this autumn", cap: { en: "Gokstad Akademiet, voice-triggered overlay", no: "Gokstad Akademiet, stemmestyrt overlay" } },
  { src: "/lovable-uploads/adgif-3818527-poster.webp", href: "/case-study/glorious", alt: "kishoo live with a Glorious V3 Mouse overlay beside the chat", cap: { en: "Glorious, in kishoo's stream", no: "Glorious, i kishoos strøm" } },
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
    otherLang: "Denne siden på norsk",
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
    otherLang: "This page in English",
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
  const kickPage = lang === "no" ? "/kick-annonsering" : "/kick-advertising";
  const other: Lang = lang === "no" ? "en" : "no";

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
        alternates: [
          { hreflang: "en", href: ROUTES.en },
          { hreflang: "no", href: ROUTES.no },
          { hreflang: "x-default", href: ROUTES.en },
        ],
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
                <div className="text-3xl font-bold tracking-tight tabular-nums text-foreground">{lang === "no" ? c.metricNo : c.metric}</div>
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
            <Link to={ROUTES[other]} hrefLang={other} className="text-sm font-medium text-foreground hover:text-primary underline-offset-4 hover:underline">
              {t.otherLang}
            </Link>
          </div>
        </div>
      </section>
    </MarketingPageLayout>
  );
};

export default KickStreamerAdvertising;
