import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Legend } from 'recharts';
import { ExternalLink, Check, X, Minus, TrendingUp, Users, BarChart3, Globe, Zap, ChevronDown, Download, Crown, Star, ArrowRight } from 'lucide-react';
import { StatCard, StatCardGrid } from './StatCard';
import { useState } from 'react';
import { Link } from 'react-router-dom';

/* ─── Tool data ─── */

interface Tool {
  name: string;
  url: string;
  icon: string;
  badge: string;
  badgeColor: string;
  tagline: string;
  bestFor: string;
  pricing: string;
  pricingColor: string;
  coverage: string;
  dataDepth: number;
  ease: number;
  adFeatures: number;
  exportFeatures: number;
  multiPlatform: boolean;
  realtime: boolean;
  historicalData: string;
  apiAccess: boolean;
  freeVersion: boolean;
  screenshot: string;
  screenshotAlt: string;
  strengths: string[];
  weaknesses: string[];
  keyDifferentiator: string;
}

const tools: Tool[] = [
  {
    name: 'TwitchTracker',
    url: 'https://twitchtracker.com',
    icon: '/lovable-uploads/icon-twitchtracker.png',
    badge: 'Mest brukt',
    badgeColor: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
    tagline: 'Den mest brukte gratisplattformen for Twitch-statistikk. Skriv inn et kanalnavn i URL-en og få umiddelbar tilgang til 9+ år med data — ingen innlogging, ingen paywall.',
    bestFor: 'Rask research og verifisering av individuelle streamere',
    pricing: 'Gratis',
    pricingColor: 'text-emerald-500 bg-emerald-500/10',
    coverage: 'Twitch only',
    dataDepth: 4,
    ease: 5,
    adFeatures: 1,
    exportFeatures: 2,
    multiPlatform: false,
    realtime: true,
    historicalData: '2015–nå (9+ år)',
    apiAccess: false,
    freeVersion: true,
    screenshot: '/lovable-uploads/screenshot-twitchtracker-channel.jpg',
    screenshotAlt: 'TwitchTracker kanaloversikt med seertall og trender over tid',
    keyDifferentiator: 'Raskeste vei fra spørsmål til svar. Null innlogging — bare skriv kanalnavnet i URL-en.',
    strengths: [
      'Raskeste veien til data — null innlogging, bare skriv kanalnavnet i URL-en',
      'Dypest historisk data — 9+ år per kanal',
      'Rent, raskt UI uten paywall for kjernedata',
      'Daglige/ukentlige/månedlige trendgrafer for enhver kanal',
      'Global Twitch-statistikk: samtidige seere, aktive kanaler, mest sette spill',
    ],
    weaknesses: [
      'Kun Twitch — ingen YouTube, Kick eller Facebook Gaming',
      'Ingen annonserelaterte funksjoner',
      'Begrenset demografisk data (kun språk)',
      'Ingen eksport til CSV/PDF eller rapportfunksjon',
    ],
  },
  {
    name: 'SullyGnome',
    url: 'https://sullygnome.com',
    icon: '/lovable-uploads/icon-sullygnome.png',
    badge: 'Best for rapporter',
    badgeColor: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
    tagline: 'Det mest granulære analyseverktøyet med kraftige eksport- og rapportfunksjoner. Last ned detaljerte CSV-rapporter for enhver kanal, kategori eller tidsperiode — helt gratis.',
    bestFor: 'Nedlasting av detaljerte rapporter og dypdykk i kategoridata',
    pricing: 'Gratis',
    pricingColor: 'text-emerald-500 bg-emerald-500/10',
    coverage: 'Twitch only',
    dataDepth: 5,
    ease: 3,
    adFeatures: 1,
    exportFeatures: 5,
    multiPlatform: false,
    realtime: false,
    historicalData: '2016–nå (8+ år)',
    apiAccess: false,
    freeVersion: true,
    screenshot: '/lovable-uploads/screenshot-sullygnome.jpg',
    screenshotAlt: 'SullyGnome avansert kanalrangering med filtrering og statistikk',
    keyDifferentiator: 'Eneste gratisverktøy med CSV-eksport og tilpassbare rapporter. Uslåelig for research.',
    strengths: [
      'Best på rapporter — last ned CSV med detaljerte data for enhver kanal eller kategori',
      'Mest granulære kategori/spill-analytics på markedet',
      'Sammenlign flere streamere side-by-side med egendefinerte datoer',
      'Stream-for-stream data: seere, chat-rate, spillbytter, klipp',
      'Avanserte filtre: språk, seerrange, sendeplan-overlap',
    ],
    weaknesses: [
      'Utdatert UI — bratt læringskurve for nye brukere',
      'Ikke sanntidsdata; oppdateres ca. hvert 15. minutt',
      'Kun Twitch, ingen multi-plattform-støtte',
      'Ingen API for programmatisk tilgang',
    ],
  },
  {
    name: 'Streams Charts',
    url: 'https://streamscharts.com',
    icon: '/lovable-uploads/icon-streamscharts.png',
    badge: 'Mest komplett',
    badgeColor: 'bg-primary/15 text-primary border-primary/20',
    tagline: 'Det absolutt beste analyseverktøyet for live streaming — og det eneste som tracker Twitch, YouTube, Kick, Trovo og CHZZK simultant. Avanserte filtre, regional data, esports-tracking, og API-tilgang.',
    bestFor: 'Komplett analyse på tvers av alle plattformer — den ultimate løsningen',
    pricing: '$29–99/mnd (Pro/Enterprise)',
    pricingColor: 'text-primary bg-primary/10',
    coverage: 'Twitch, YouTube, Kick, Trovo, CHZZK',
    dataDepth: 5,
    ease: 4,
    adFeatures: 3,
    exportFeatures: 4,
    multiPlatform: true,
    realtime: true,
    historicalData: '2019–nå',
    apiAccess: true,
    freeVersion: true,
    screenshot: '/lovable-uploads/screenshot-streamscharts.jpg',
    screenshotAlt: 'Streams Charts multi-plattform kanalrangering',
    keyDifferentiator: 'Uslåelig bredde: 5+ plattformer, regional data, esports events, API — alt i ett.',
    strengths: [
      'Eneste verktøy som tracker 5+ streaming-plattformer simultant',
      'Mest avanserte filtreringssystem: land, språk, kategori, viewers',
      'Utmerket esports-event tracking med peak concurrent viewers',
      'Regionale breakdowns: se hvor en streamers publikum faktisk er',
      'API-tilgang for Pro-abonnenter — integrer i egne systemer',
      'Influencer-discovery: finn streamere basert på nøyaktige kriterier',
    ],
    weaknesses: [
      'Dyrt — Pro starter på $29/mnd, Enterprise fra $99/mnd',
      'Gratis tier begrenser historisk data til 90 dager',
      'Kortere historikk enn TwitchTracker/SullyGnome (fra 2019)',
    ],
  },
  {
    name: 'Stream Hatchet',
    url: 'https://streamhatchet.com',
    icon: '/lovable-uploads/icon-streamhatchet.png',
    badge: 'Enterprise',
    badgeColor: 'bg-violet-500/15 text-violet-400 border-violet-500/20',
    tagline: 'Enterprise-analytics bygget for merkevarer og byråer. Logo-deteksjon via AI, sponsorverdivurdering og custom rapporter. Ikke et streamer-verktøy — bygget for annonsører.',
    bestFor: 'Store merkevarer og byråer med behov for logo-deteksjon og sponsormåling',
    pricing: 'Enterprise (custom)',
    pricingColor: 'text-violet-400 bg-violet-500/10',
    coverage: 'Twitch, YouTube, Kick, Facebook Gaming',
    dataDepth: 5,
    ease: 3,
    adFeatures: 4,
    exportFeatures: 4,
    multiPlatform: true,
    realtime: true,
    historicalData: '2017–nå',
    apiAccess: true,
    freeVersion: false,
    screenshot: '/lovable-uploads/screenshot-streamhatchet.jpg',
    screenshotAlt: 'Stream Hatchet enterprise streaming analytics plattform',
    keyDifferentiator: 'AI-drevet logo-deteksjon og automatisk sponsorverdivurdering — unikt i markedet.',
    strengths: [
      'AI-drevet logo-deteksjon: track organisk merkevare-eksponering automatisk',
      'Sponsorverdivurdering: mediaverdi-estimater per time og kampanje',
      'Custom rapporter og API for programmatisk tilgang',
      'Multi-plattform dekning inkludert Facebook Gaming',
    ],
    weaknesses: [
      'Ingen gratis tier — krever enterprise-kontrakt',
      'Overkill for små merkevarer eller enkeltkampanjer',
      'Kompleks onboarding; ikke self-serve',
      'Prisinformasjon ikke offentlig tilgjengelig',
    ],
  },
  {
    name: 'Beta Ads Dashboard',
    url: 'https://beta-ads.no',
    icon: '/lovable-uploads/logo-color.png',
    badge: 'Nordisk fokus',
    badgeColor: 'bg-primary/15 text-primary border-primary/20',
    tagline: 'Kampanjefokusert analytics bygget spesifikt for nordiske overlay-ads. Det eneste verktøyet som måler native overlay-annonser med sanntids impressions, engagement og nordisk publikumsverifikasjon.',
    bestFor: 'Måle native overlay-kampanjer i det nordiske markedet',
    pricing: 'Inkludert med kampanjer',
    pricingColor: 'text-primary bg-primary/10',
    coverage: 'Twitch (nordisk fokus)',
    dataDepth: 4,
    ease: 5,
    adFeatures: 5,
    exportFeatures: 3,
    multiPlatform: false,
    realtime: true,
    historicalData: 'Kampanjeperiode',
    apiAccess: false,
    freeVersion: false,
    screenshot: '/lovable-uploads/campaign-report-preview.png',
    screenshotAlt: 'Beta Ads kampanjerapport med impressions og engagement data',
    keyDifferentiator: 'Eneste verktøy bygget for overlay-annonsemåling med nordisk publikumsverifikasjon.',
    strengths: [
      'Eneste verktøy bygget spesifikt for overlay-annonsemåling',
      'Sanntids impression- og engagement-data per stream',
      'Nordisk publikumsverifikasjon — bekreft at du når NO/SE/FI/DK',
      'Integrert streamer-valg + kampanjerapportering i ett system',
    ],
    weaknesses: [
      'Kun tilgjengelig for Beta Ads-kunder',
      'Ikke et generelt Twitch-analyseverktøy',
      'Begrenset til nordisk markedsdata',
    ],
  },
];

/* ─── Radar chart data ─── */

const radarData = [
  { metric: 'Datadybde',         twitchtracker: 4, sullygnome: 5, streamscharts: 5, streamhatchet: 5, betaads: 4 },
  { metric: 'Brukervennlighet',  twitchtracker: 5, sullygnome: 3, streamscharts: 4, streamhatchet: 3, betaads: 5 },
  { metric: 'Annonsefunksjoner', twitchtracker: 1, sullygnome: 1, streamscharts: 3, streamhatchet: 4, betaads: 5 },
  { metric: 'Multi-plattform',   twitchtracker: 1, sullygnome: 1, streamscharts: 5, streamhatchet: 4, betaads: 1 },
  { metric: 'Eksport/rapporter', twitchtracker: 2, sullygnome: 5, streamscharts: 4, streamhatchet: 4, betaads: 3 },
  { metric: 'Pris/verdi',        twitchtracker: 5, sullygnome: 5, streamscharts: 3, streamhatchet: 2, betaads: 4 },
];

/* ─── Use case data ─── */

const useCases = [
  {
    scenario: 'Rask sjekk av en streamers seertall',
    icon: <Zap className="w-5 h-5" />,
    recommended: 'TwitchTracker',
    why: 'Null innlogging. Skriv kanalnavnet i URL-en og få umiddelbar statistikk. Raskeste vei fra spørsmål til svar.',
  },
  {
    scenario: 'Laste ned rapport for en kampanjevurdering',
    icon: <Download className="w-5 h-5" />,
    recommended: 'SullyGnome',
    why: 'Eneste gratisverktøy med CSV-eksport. Last ned detaljerte rapporter med seerdata, chat-rate og spillhistorikk for enhver kanal.',
  },
  {
    scenario: 'Sammenligne streamere på tvers av Twitch + YouTube + Kick',
    icon: <Globe className="w-5 h-5" />,
    recommended: 'Streams Charts',
    why: 'Eneste verktøy med samlet data på tvers av 5+ plattformer. Essensielt når en streamer multi-streamer eller har byttet plattform.',
  },
  {
    scenario: 'Enterprise brand safety + logo-deteksjon',
    icon: <Crown className="w-5 h-5" />,
    recommended: 'Stream Hatchet',
    why: 'AI-drevet logo-deteksjon forteller deg nøyaktig hvor mange minutter merkevaren din var synlig. Ingen andre verktøy gjør dette.',
  },
  {
    scenario: 'Tracke en aktiv overlay-kampanje i Norden',
    icon: <TrendingUp className="w-5 h-5" />,
    recommended: 'Beta Ads Dashboard',
    why: 'Sanntids impression- og engagement-data knyttet direkte til kampanjen. Nordisk publikumsverifikasjon inkludert.',
  },
  {
    scenario: 'Finne streamere i et spesifikt nordisk land',
    icon: <Users className="w-5 h-5" />,
    recommended: 'Beta Ads + SullyGnome',
    why: 'Beta Ads har kuraterte nordiske streamer-data; SullyGnomes språkfilter hjelper med å verifisere publikumsgeografi.',
  },
];

/* ─── Feature matrix ─── */

const featureCategories = [
  {
    category: 'Kjernedata',
    features: [
      { feature: 'Individuelle kanalstatistikker', twitchtracker: true, sullygnome: true, streamscharts: true, streamhatchet: true, betaads: 'partial' },
      { feature: 'Spill/kategori-analytics', twitchtracker: true, sullygnome: true, streamscharts: true, streamhatchet: true, betaads: false },
      { feature: 'Sanntidsdata', twitchtracker: true, sullygnome: false, streamscharts: true, streamhatchet: true, betaads: true },
      { feature: 'Historisk data (5+ år)', twitchtracker: true, sullygnome: true, streamscharts: false, streamhatchet: true, betaads: false },
    ],
  },
  {
    category: 'Plattform & dekning',
    features: [
      { feature: 'Twitch-dekning', twitchtracker: true, sullygnome: true, streamscharts: true, streamhatchet: true, betaads: true },
      { feature: 'YouTube Gaming', twitchtracker: false, sullygnome: false, streamscharts: true, streamhatchet: true, betaads: false },
      { feature: 'Kick', twitchtracker: false, sullygnome: false, streamscharts: true, streamhatchet: true, betaads: false },
      { feature: 'Regional/demografisk data', twitchtracker: 'partial', sullygnome: 'partial', streamscharts: true, streamhatchet: true, betaads: true },
    ],
  },
  {
    category: 'Rapporter & eksport',
    features: [
      { feature: 'CSV/Excel-eksport', twitchtracker: false, sullygnome: true, streamscharts: true, streamhatchet: true, betaads: false },
      { feature: 'PDF-rapporter', twitchtracker: false, sullygnome: false, streamscharts: 'partial', streamhatchet: true, betaads: true },
      { feature: 'API-tilgang', twitchtracker: false, sullygnome: false, streamscharts: true, streamhatchet: true, betaads: false },
      { feature: 'Streamer-sammenligning', twitchtracker: 'partial', sullygnome: true, streamscharts: true, streamhatchet: true, betaads: false },
    ],
  },
  {
    category: 'Annonsering & kampanjer',
    features: [
      { feature: 'Annonsekampanje-tracking', twitchtracker: false, sullygnome: false, streamscharts: false, streamhatchet: 'partial', betaads: true },
      { feature: 'Overlay-annonsemetrikker', twitchtracker: false, sullygnome: false, streamscharts: false, streamhatchet: false, betaads: true },
      { feature: 'Logo/merkevare-deteksjon', twitchtracker: false, sullygnome: false, streamscharts: false, streamhatchet: true, betaads: false },
      { feature: 'Sponsorverdivurdering', twitchtracker: false, sullygnome: false, streamscharts: false, streamhatchet: true, betaads: false },
      { feature: 'Esports event-tracking', twitchtracker: false, sullygnome: false, streamscharts: true, streamhatchet: true, betaads: false },
    ],
  },
  {
    category: 'Tilgjengelighet',
    features: [
      { feature: 'Gratis tier tilgjengelig', twitchtracker: true, sullygnome: true, streamscharts: true, streamhatchet: false, betaads: false },
      { feature: 'Ingen innlogging nødvendig', twitchtracker: true, sullygnome: true, streamscharts: 'partial', streamhatchet: false, betaads: false },
    ],
  },
];

/* ─── Components ─── */

function FeatureIcon({ value }: { value: boolean | string }) {
  if (value === true) return <Check className="w-4 h-4 text-emerald-500 mx-auto" />;
  if (value === false) return <X className="w-4 h-4 text-muted-foreground/20 mx-auto" />;
  return <Minus className="w-4 h-4 text-amber-500 mx-auto" />;
}

function RatingBar({ value, max = 5, label }: { value: number; max?: number; label: string }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className="text-xs font-medium text-foreground">{value}/5</span>
      </div>
      <div className="flex gap-0.5">
        {Array.from({ length: max }, (_, i) => (
          <div key={i} className={`h-1.5 rounded-full flex-1 ${i < value ? 'bg-primary' : 'bg-muted-foreground/15'}`} />
        ))}
      </div>
    </div>
  );
}

function ToolIcon({ tool, size = 'md' }: { tool: Tool; size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };
  const imgSize = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };
  return (
    <div className={`${sizeClasses[size]} rounded-lg bg-background/90 border border-border/50 flex items-center justify-center overflow-hidden shrink-0`}>
      <img src={tool.icon} alt={tool.name} className={`${imgSize[size]} object-contain`} />
    </div>
  );
}

function ToolDeepDive({ tool, index }: { tool: Tool; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <section id={`tool-${index}`} className="scroll-mt-24">
      <div className="bg-card/30 border border-border/30 rounded-2xl overflow-hidden hover:border-border/50 transition-colors">
        {/* Screenshot */}
        <div className="relative w-full h-44 sm:h-52 md:h-60 overflow-hidden bg-muted/50">
          <img src={tool.screenshot} alt={tool.screenshotAlt} className="w-full h-full object-cover object-top" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
          <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
            <div className="flex items-center gap-2.5">
              <ToolIcon tool={tool} size="lg" />
              <div>
                <h3 className="text-base font-bold text-white drop-shadow-md">{tool.name}</h3>
                <a href={tool.url} target="_blank" rel="noopener noreferrer" className="text-[11px] text-white/60 hover:text-white transition-colors inline-flex items-center gap-1">
                  {tool.url.replace('https://', '')} <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
            <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${tool.badgeColor} backdrop-blur-sm whitespace-nowrap`}>
              {tool.badge}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Pricing + CTA row */}
          <div className="flex items-center justify-between mb-4">
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${tool.pricingColor}`}>{tool.pricing}</span>
            <a href={tool.url} target="_blank" rel="noopener noreferrer"
              className="text-xs font-medium text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1">
              Besøk {tool.name} <ArrowRight className="w-3 h-3" />
            </a>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed mb-4">{tool.tagline}</p>

          {/* Key differentiator */}
          <div className="bg-primary/5 border border-primary/15 rounded-xl px-4 py-3 mb-4">
            <div className="flex items-start gap-2">
              <Star className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <p className="text-sm text-foreground leading-relaxed">{tool.keyDifferentiator}</p>
            </div>
          </div>

          {/* Ratings */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 mb-4">
            <RatingBar value={tool.dataDepth} label="Datadybde" />
            <RatingBar value={tool.ease} label="Brukervennlighet" />
            <RatingBar value={tool.exportFeatures} label="Eksport/rapporter" />
            <RatingBar value={tool.adFeatures} label="Annonsefunksjoner" />
          </div>

          {/* Quick info */}
          <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-4">
            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-primary shrink-0" />
              {tool.coverage}
            </div>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-3.5 h-3.5 text-primary shrink-0" />
              {tool.historicalData}
            </div>
            <div className="flex items-center gap-2">
              <Zap className={`w-3.5 h-3.5 shrink-0 ${tool.realtime ? 'text-primary' : 'text-muted-foreground/40'}`} />
              {tool.realtime ? 'Sanntid' : 'Forsinkede oppdateringer'}
            </div>
            <div className="flex items-center gap-2">
              <Users className={`w-3.5 h-3.5 shrink-0 ${tool.multiPlatform ? 'text-primary' : 'text-muted-foreground/40'}`} />
              {tool.multiPlatform ? 'Multi-plattform' : 'Kun Twitch'}
            </div>
          </div>

          {/* Expand */}
          <button onClick={() => setExpanded(!expanded)}
            className="text-sm text-primary font-medium inline-flex items-center gap-1.5 hover:text-primary/80 transition-colors">
            {expanded ? 'Skjul detaljer' : 'Styrker & svakheter'}
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Expanded */}
        {expanded && (
          <div className="border-t border-border/20">
            <div className="grid md:grid-cols-2">
              <div className="p-5">
                <h4 className="text-sm font-semibold text-emerald-500 mb-3 flex items-center gap-2">
                  <Check className="w-4 h-4" /> Styrker
                </h4>
                <ul className="space-y-2">
                  {tool.strengths.map((s, i) => (
                    <li key={i} className="text-sm text-muted-foreground leading-relaxed flex gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 shrink-0 mt-1.5" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-5 border-t md:border-t-0 md:border-l border-border/20">
                <h4 className="text-sm font-semibold text-rose-400 mb-3 flex items-center gap-2">
                  <X className="w-4 h-4" /> Svakheter
                </h4>
                <ul className="space-y-2">
                  {tool.weaknesses.map((w, i) => (
                    <li key={i} className="text-sm text-muted-foreground leading-relaxed flex gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500/50 shrink-0 mt-1.5" />
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ─── Main Dashboard ─── */

export default function TwitchAnalyticsToolsDashboard() {
  return (
    <div className="space-y-20">

      {/* ── Intro ── */}
      <section id="why-analytics">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-5 pb-3 border-b border-border/50">
          Hvorfor Twitch-statistikk er avgjørende
        </h2>
        <div className="grid lg:grid-cols-5 gap-10 items-start">
          <div className="lg:col-span-3 space-y-4">
            <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
              Tradisjonell digital annonsering gir deg CPM, CTR og konverteringer. Livestreaming er fundamentalt annerledes: seertall svinger fra time til time, engasjement avhenger av hva streameren spiller, og publikum reagerer i sanntid.
            </p>
            <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
              De riktige verktøyene lar deg gå fra magefølelse til datadrevne beslutninger. Vi har testet alle de store plattformene daglig — her er vår ærlige vurdering.
            </p>
          </div>
          <div className="lg:col-span-2 grid grid-cols-2 gap-3">
            <StatCard value={5} label="Verktøy testet" format="raw" />
            <StatCard value={9} label="År med data" suffix="+" format="raw" />
            <StatCard value={21} label="Funksjoner sammenlignet" format="raw" />
            <StatCard value={4.2} label="TwitchTracker mnd. besøk" suffix="M" decimals={1} format="raw" />
          </div>
        </div>
      </section>

      {/* ── Quick comparison strip ── */}
      <section id="market-overview">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 pb-3 border-b border-border/50">
          Oversikt: 5 verktøy sammenlignet
        </h2>
        <p className="text-sm text-muted-foreground mb-6 max-w-3xl">
          Rask sammenligning av de viktigste egenskapene. TwitchTracker er mest brukt, SullyGnome best for rapporter, og Streams Charts er det mest komplette produktet.
        </p>

        {/* Quick compare cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-8">
          {tools.map((tool, i) => (
            <div key={tool.name} className="bg-card/30 border border-border/30 rounded-xl p-4 text-center hover:border-primary/30 transition-colors">
              <div className="flex justify-center mb-2">
                <ToolIcon tool={tool} size="lg" />
              </div>
              <div className="text-sm font-semibold text-foreground mb-1">{tool.name}</div>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${tool.badgeColor} inline-block mb-2`}>
                {tool.badge}
              </span>
              <div className={`text-xs font-medium ${tool.pricingColor} rounded-full px-2 py-0.5 inline-block`}>
                {tool.pricing}
              </div>
            </div>
          ))}
        </div>

        {/* Traffic chart */}
        <div className="bg-card/30 border border-border/30 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-foreground mb-3">Månedlig trafikk (estimert, SimilarWeb)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={[
              { tool: 'TwitchTracker', visitors: 4200000 },
              { tool: 'Streams Charts', visitors: 2100000 },
              { tool: 'SullyGnome', visitors: 1800000 },
              { tool: 'Stream Hatchet', visitors: 310000 },
            ]} layout="vertical" margin={{ left: 10, right: 30 }}>
              <XAxis type="number" tickFormatter={(v) => `${(v / 1_000_000).toFixed(1)}M`} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
              <YAxis dataKey="tool" type="category" width={120} tick={{ fill: 'hsl(var(--foreground))', fontSize: 12, fontWeight: 500 }} />
              <Tooltip
                contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: 13 }}
                formatter={(v: number) => [`${(v / 1_000_000).toFixed(1)}M besøkende/mnd`, '']}
              />
              <Bar dataKey="visitors" fill="hsl(var(--primary))" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* ── Tool deep-dives ── */}
      <section id="tool-reviews">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 pb-3 border-b border-border/50">
          Alle 5 verktøy testet og vurdert
        </h2>
        <p className="text-sm text-muted-foreground mb-8 max-w-3xl">
          Hvert verktøy vurdert på datadybde, brukervennlighet, eksportmuligheter og annonsefunksjoner. Klikk for full styrke/svakheter-analyse.
        </p>
        <div className="grid lg:grid-cols-2 gap-5">
          {tools.map((tool, i) => (
            <ToolDeepDive key={tool.name} tool={tool} index={i} />
          ))}
        </div>
      </section>

      {/* ── Feature comparison matrix (grouped) ── */}
      <section id="feature-comparison">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 pb-3 border-b border-border/50">
          Funksjon-for-funksjon sammenligning
        </h2>
        <p className="text-sm text-muted-foreground mb-6 max-w-3xl">
          21 funksjoner gruppert i 5 kategorier. Grønn = full støtte, gul = delvis, grå = ikke tilgjengelig.
        </p>
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="min-w-[720px] px-4 sm:px-0">
            <div className="rounded-xl border border-border/30 overflow-hidden">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted/60">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-foreground sticky left-0 bg-muted/95 z-10">Funksjon</th>
                    {tools.map(t => (
                      <th key={t.name} className="text-center py-3 px-2 w-[100px]">
                        <div className="flex flex-col items-center gap-1">
                          <img src={t.icon} alt="" className="w-4 h-4 object-contain" />
                          <span className="text-[10px] font-semibold text-foreground whitespace-nowrap">{t.name.replace(' Dashboard', '')}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {featureCategories.map((cat) => (
                    <>
                      <tr key={cat.category} className="bg-primary/5">
                        <td colSpan={6} className="py-2 px-4 text-xs font-bold text-primary uppercase tracking-wider sticky left-0 bg-primary/5 z-10">
                          {cat.category}
                        </td>
                      </tr>
                      {cat.features.map((row, i) => (
                        <tr key={row.feature} className={`border-t border-border/10 ${i % 2 === 0 ? '' : 'bg-muted/5'}`}>
                          <td className="py-2.5 px-4 text-sm text-foreground/80 sticky left-0 bg-card/95 z-10">{row.feature}</td>
                          <td className="py-2.5 px-2"><FeatureIcon value={row.twitchtracker} /></td>
                          <td className="py-2.5 px-2"><FeatureIcon value={row.sullygnome} /></td>
                          <td className="py-2.5 px-2"><FeatureIcon value={row.streamscharts} /></td>
                          <td className="py-2.5 px-2"><FeatureIcon value={row.streamhatchet} /></td>
                          <td className="py-2.5 px-2"><FeatureIcon value={row.betaads} /></td>
                        </tr>
                      ))}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── Radar comparison ── */}
      <section id="radar-comparison">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 pb-3 border-b border-border/50">
          Styrke-profiler
        </h2>
        <p className="text-sm text-muted-foreground mb-6 max-w-3xl">
          Hver plattform har sin egen profil. Gratisverktøyene scorer høyest på pris/verdi, mens Streams Charts dominerer på bredde og funksjonalitet.
        </p>
        <div className="grid md:grid-cols-2 gap-5">
          <div className="bg-card/30 border border-border/30 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-foreground mb-1">Gratisverktøy</h3>
            <p className="text-xs text-muted-foreground mb-3">TwitchTracker, SullyGnome, Streams Charts (free tier)</p>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="metric" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} />
                <Radar name="TwitchTracker" dataKey="twitchtracker" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.15} strokeWidth={2} />
                <Radar name="SullyGnome" dataKey="sullygnome" stroke="hsl(var(--chart-2))" fill="hsl(var(--chart-2))" fillOpacity={0.08} strokeWidth={2} />
                <Radar name="Streams Charts" dataKey="streamscharts" stroke="hsl(var(--chart-3))" fill="hsl(var(--chart-3))" fillOpacity={0.08} strokeWidth={2} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-card/30 border border-border/30 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-foreground mb-1">Betalte / kampanjeverktøy</h3>
            <p className="text-xs text-muted-foreground mb-3">Stream Hatchet, Beta Ads Dashboard</p>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="metric" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} />
                <Radar name="Stream Hatchet" dataKey="streamhatchet" stroke="hsl(var(--chart-4))" fill="hsl(var(--chart-4))" fillOpacity={0.12} strokeWidth={2} />
                <Radar name="Beta Ads" dataKey="betaads" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.15} strokeWidth={2} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* ── Use cases ── */}
      <section id="use-cases">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 pb-3 border-b border-border/50">
          Hvilket verktøy for hvilken situasjon?
        </h2>
        <p className="text-sm text-muted-foreground mb-6 max-w-3xl">
          Det finnes ikke ett verktøy som gjør alt. Her er vår anbefalte kombinasjon for 6 vanlige scenarioer.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {useCases.map((uc, i) => (
            <div key={i} className="bg-card/30 border border-border/30 rounded-xl p-5 hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  {uc.icon}
                </div>
                <h3 className="text-sm font-semibold text-foreground">{uc.scenario}</h3>
              </div>
              <div className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Anbefalt</div>
              <div className="text-sm font-medium text-foreground mb-2">{uc.recommended}</div>
              <p className="text-xs text-muted-foreground leading-relaxed">{uc.why}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Quick links ── */}
      <section id="links">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 pb-3 border-b border-border/50">
          Direkte lenker
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {tools.map(tool => (
            <a key={tool.name} href={tool.url} target="_blank" rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2 p-4 rounded-xl border border-border/30 bg-card/30 hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-200 text-center">
              <ToolIcon tool={tool} size="lg" />
              <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{tool.name}</div>
              <div className="text-[11px] text-muted-foreground inline-flex items-center gap-1">
                Besøk <ExternalLink className="w-3 h-3" />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── Twitch native ── */}
      <section id="twitch-native">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 pb-3 border-b border-border/50">
          Twitchs egne verktøy
        </h2>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <p className="text-base text-foreground/80 leading-relaxed">
              Twitch tilbyr et innebygd analyseverktøy gjennom <strong>Creator Dashboard</strong>. Her finner streamere data om gjennomsnittlige samtidige seere, unike seere per stream, chat-aktivitet og følgervekst.
            </p>
            <p className="text-base text-foreground/80 leading-relaxed">
              Dataene er nøyaktige fordi de kommer direkte fra Twitch. Problemet: de er bare tilgjengelig for streameren selv. Som annonsør må du be streameren dele tallene manuelt — og det gjør objektiv sammenligning vanskelig.
            </p>
          </div>
          <div className="bg-card/30 border border-border/30 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4">Creator Dashboard gir deg:</h3>
            <div className="space-y-3">
              {[
                { label: 'Average Concurrent Viewers', desc: 'Gjennomsnittlig samtidige seere per stream' },
                { label: 'Unique Viewers', desc: 'Unike seere over en gitt periode' },
                { label: 'Chat Activity Rate', desc: 'Meldinger per minutt og aktive chattere' },
                { label: 'Follower Growth', desc: 'Nye følgere per stream og over tid' },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-3">
                  <TrendingUp className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-foreground">{item.label}</div>
                    <div className="text-xs text-muted-foreground">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Verdict ── */}
      <section id="verdict">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-5 pb-3 border-b border-border/50">
          Vår anbefaling
        </h2>
        <div className="bg-primary/5 border border-primary/15 rounded-2xl overflow-hidden">
          <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-primary/10">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <ToolIcon tool={tools[0]} size="sm" />
                <ToolIcon tool={tools[1]} size="sm" />
              </div>
              <div className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">For gratis research</div>
              <p className="text-base text-foreground font-semibold mb-2">TwitchTracker + SullyGnome</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                TwitchTracker for rask verifisering og langsiktige trender. SullyGnome for detaljerte rapporter og CSV-eksport. Begge er 100% gratis.
              </p>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <ToolIcon tool={tools[2]} size="sm" />
              </div>
              <div className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">For seriøs analyse</div>
              <p className="text-base text-foreground font-semibold mb-2">Streams Charts Pro</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Det mest komplette produktet på markedet. Multi-plattform, regional data, API, og influencer-discovery. Verdt prisen for profesjonelle.
              </p>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <ToolIcon tool={tools[4]} size="sm" />
              </div>
              <div className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">For nordiske kampanjer</div>
              <p className="text-base text-foreground font-semibold mb-2">Beta Ads Dashboard</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Hvis du kjører native overlay ads i Norden, gir Beta Ads det mest relevante datasettet — impressions, engagement, og nordisk publikumsverifikasjon.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
