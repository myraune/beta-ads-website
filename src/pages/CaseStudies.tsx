import React, { useRef } from "react";
import { Footer } from "@/components/sections/Footer";
import { Play, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

interface CaseStudiesProps {
  t: any;
  language: string;
  setLanguage: (lang: string) => void;
}

// Case study data with metrics
const caseStudies = [
  { 
    id: "Uw7IIecicB4", 
    brand: "Samsung", 
    campaign: "S25 Ultra Awareness Norway",
    impressions: "500,000+",
    ctr: "2.93%",
    description: "Premium awareness campaign for Samsung's flagship smartphone launch across Nordic Twitch streamers."
  },
  { 
    id: "IZOx_VMdJJg", 
    brand: "Shure", 
    campaign: "MV7+ Microphone Launch",
    impressions: "320,000+",
    ctr: "2.45%",
    description: "Creator-focused campaign showcasing premium audio equipment to streaming audiences."
  },
  { 
    id: "ufNq-A4d7iA", 
    brand: "Komplett", 
    campaign: "Monthly Gaming Deals",
    impressions: "150,000+",
    ctr: "3.24%",
    description: "Recurring promotion campaign driving traffic to gaming hardware deals."
  },
  { 
    id: "DMz-NV1W_Is", 
    brand: "Saily", 
    campaign: "E-SIM Campaign Norway",
    impressions: "280,000+",
    ctr: "2.67%",
    description: "Travel-focused campaign targeting young, mobile-first audiences."
  },
  { 
    id: "U6i5uvhk2Sw", 
    brand: "Surfshark", 
    campaign: "VPN Awareness Nordic",
    impressions: "420,000+",
    ctr: "2.81%",
    description: "Privacy and security messaging tailored for gaming communities."
  },
  { 
    id: "GwE4dagRm_k", 
    brand: "Kristiania", 
    campaign: "University Recruitment",
    impressions: "600,000+",
    ctr: "2.00%",
    description: "Student recruitment campaign reaching Gen Z through their favorite streamers."
  },
  { 
    id: "aE0-S8GC1Iw", 
    brand: "M3panel", 
    campaign: "Research Panel Signup",
    impressions: "180,000+",
    ctr: "3.45%",
    description: "Direct response campaign driving panel signups with incentive offers."
  },
  { 
    id: "swu_ye12IHs", 
    brand: "Norstat", 
    campaign: "Survey Participation Drive",
    impressions: "210,000+",
    ctr: "2.92%",
    description: "Engagement campaign encouraging survey participation among young demographics."
  },
];

// Ad formats data
const adFormats = [
  {
    name: "Snipe Banner",
    dimensions: "1920 × 250 px",
    description: "Horizontal banner overlay with high visibility.",
    bestFor: "Awareness",
    image: "/lovable-uploads/snipeDemo1.png",
  },
  {
    name: "Rich Media",
    dimensions: "1920 × 1080 px",
    description: "Full-screen takeover with premium experience.",
    bestFor: "Engagement",
    image: "/lovable-uploads/richMediaDemo1.png",
  },
  {
    name: "Poll",
    dimensions: "Dynamic",
    description: "Interactive poll for audience engagement.",
    bestFor: "Insights",
    image: "/lovable-uploads/pollDemo1.png",
  },
  {
    name: "Premium",
    dimensions: "1920 × 1080 px",
    description: "Rich media with clickable elements.",
    bestFor: "Brand moments",
    image: "/lovable-uploads/interactiveDemo1.png",
  },
  {
    name: "Video",
    dimensions: "640 × 360 px",
    description: "Native in-stream video ads.",
    bestFor: "Storytelling",
    image: "/lovable-uploads/videoDemo1.png",
  },
  {
    name: "Side Bar",
    dimensions: "300 × 1080 px",
    description: "Persistent vertical placement.",
    bestFor: "Presence",
    image: "/lovable-uploads/sideBarDemo1.png",
  },
];

// Press articles data
const pressArticles = [
  {
    title: "Andreas (22) startet byrå ved siden av studiene",
    subtitle: "Nå utvider han til Sverige og Finland",
    publication: "Kampanje",
    url: "https://kampanje.com/premium/mai-2025/innsikt/andreas-22-startet-byra-ved-siden-av-studiene--na-utvider-han-til-sverige-og-finland/",
    image: "/lovable-uploads/press-kampanje-expansion-new.png",
  },
  {
    title: "Andreas (21) satser på eget Twitch-byrå",
    subtitle: "Nå får han polske tech-krefter i ryggen",
    publication: "Kampanje",
    url: "https://kampanje.com/premium/september-2024/innsikt/andreas-21-satser-pa-eget-twtich-byra--na-far-han-polske-tech-krefter-i-ryggen---har-lagt-grunnlaget-na/",
    image: "/lovable-uploads/press-kampanje-startup.png",
  },
  {
    title: "Ny kanal for mediekjøp",
    subtitle: "Beta er Norges nye Twitch-byrå",
    publication: "Kom24",
    url: "https://www.kom24.no/andreas-myraune-beta-influensere/ny-kanal-for-mediekjop-beta-er-norges-nye-twitch-byra/730424",
    image: "/lovable-uploads/press-kom24-twitch.png",
  },
  {
    title: "Instreamly og Beta inngår partnerskap",
    subtitle: "Strategisk samarbeid i Norge",
    publication: "Kom24",
    url: "https://www.kom24.no/andreas-myraune-beta-instreamly/instreamly-og-beta-inngar-partnerskap-i-norge/749907",
    image: "/lovable-uploads/press-kampanje-expansion.png",
  },
];

// Case Study Card Component - Fixed 320x400 dimensions
const CaseStudyCard: React.FC<{ study: typeof caseStudies[0]; onPlay: (id: string) => void; isPlaying: boolean }> = ({ 
  study, 
  onPlay, 
  isPlaying 
}) => (
  <div className="snap-card w-[320px] h-[400px] flex-shrink-0 group">
    <div className="h-full rounded-xl overflow-hidden border border-border/30 bg-card/60 backdrop-blur-sm transition-all duration-200 hover:border-primary/40 hover:shadow-lg hover:shadow-black/20 hover:-translate-y-0.5 flex flex-col">
      {/* Video Thumbnail - Fixed height */}
      <div className="relative h-[180px] overflow-hidden flex-shrink-0">
        {isPlaying ? (
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${study.id}?autoplay=1`}
            title={study.campaign}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        ) : (
          <>
            <img
              src={`https://img.youtube.com/vi/${study.id}/maxresdefault.jpg`}
              alt={study.campaign}
              className="w-full h-full object-cover transition-all duration-200 group-hover:brightness-110"
              onError={(e) => {
                e.currentTarget.src = `https://img.youtube.com/vi/${study.id}/hqdefault.jpg`;
              }}
            />
            {/* Play Button Overlay */}
            <div 
              className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
              onClick={() => onPlay(study.id)}
            >
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg">
                <Play className="w-5 h-5 text-primary-foreground ml-0.5" fill="currentColor" />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Content - Consistent padding */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-medium text-foreground">{study.brand}</h3>
          <span className="text-xs px-2 py-0.5 rounded bg-primary/15 text-primary">
            Case Study
          </span>
        </div>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-1">{study.campaign}</p>
        
        {/* Metrics Row */}
        <div className="flex gap-6 mb-3">
          <div>
            <p className="text-xl font-semibold text-primary">{study.impressions}</p>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Impressions</p>
          </div>
          <div>
            <p className="text-xl font-semibold text-primary">{study.ctr}</p>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">CTR</p>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">{study.description}</p>
      </div>
    </div>
  </div>
);

// Ad Format Card Component - Fixed 240x280 dimensions
const AdFormatCard: React.FC<{ format: typeof adFormats[0] }> = ({ format }) => (
  <div className="w-[240px] h-[280px] flex-shrink-0 group">
    <div className="h-full rounded-xl overflow-hidden border border-border/30 bg-card/60 backdrop-blur-sm transition-all duration-200 hover:border-primary/40 hover:shadow-lg hover:shadow-black/20 flex flex-col">
      {/* Image - Fixed height */}
      <div className="h-[160px] overflow-hidden flex-shrink-0 relative">
        <img
          src={format.image}
          alt={format.name}
          className="w-full h-full object-cover transition-all duration-200 group-hover:brightness-105"
          loading="lazy"
        />
      </div>
      
      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-base font-medium text-foreground mb-1">{format.name}</h3>
        <p className="text-xs text-muted-foreground mb-2 font-mono">{format.dimensions}</p>
        <p className="text-xs text-primary mt-auto">Best for: {format.bestFor}</p>
      </div>
    </div>
  </div>
);

// Press Card Component - Compact horizontal 400x160 dimensions
const PressCard: React.FC<{ article: typeof pressArticles[0] }> = ({ article }) => {
  const isKampanje = article.publication === "Kampanje";
  
  return (
    <div 
      className="snap-card w-[400px] h-[160px] flex-shrink-0 group cursor-pointer"
      onClick={() => window.open(article.url, "_blank")}
    >
      <div className="h-full rounded-xl overflow-hidden border border-border/30 bg-card/60 backdrop-blur-sm transition-all duration-200 hover:border-primary/40 hover:shadow-lg hover:shadow-black/20 flex flex-row">
        {/* Image - Fixed width */}
        <div className="w-[120px] h-full overflow-hidden flex-shrink-0">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover transition-all duration-200 group-hover:brightness-105"
            loading="lazy"
          />
        </div>
        
        {/* Content */}
        <div className="p-4 flex flex-col justify-center flex-1 min-w-0">
          <span 
            className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full mb-2 w-fit ${
              isKampanje 
                ? 'bg-primary/15 text-primary' 
                : 'bg-green-500/15 text-green-400'
            }`}
          >
            {article.publication}
          </span>
          
          <h3 className="text-sm font-medium text-foreground mb-1 line-clamp-2 leading-tight group-hover:text-primary transition-colors duration-200">
            {article.title}
          </h3>
          
          <p className="text-xs text-muted-foreground line-clamp-1">{article.subtitle}</p>
          
          <div className="flex items-center text-xs text-muted-foreground mt-2 group-hover:text-primary transition-colors duration-200">
            <ExternalLink className="w-3 h-3 mr-1" />
            Read article
          </div>
        </div>
      </div>
    </div>
  );
};

const CaseStudies: React.FC<CaseStudiesProps> = ({ t, language, setLanguage }) => {
  const [playingVideo, setPlayingVideo] = React.useState<string | null>(null);
  const caseStudiesRef = useRef<HTMLDivElement>(null);
  const pressRef = useRef<HTMLDivElement>(null);

  const scrollCaseStudies = (direction: 'left' | 'right') => {
    if (caseStudiesRef.current) {
      caseStudiesRef.current.scrollBy({ left: direction === 'left' ? -340 : 340, behavior: 'smooth' });
    }
  };

  const scrollPress = (direction: 'left' | 'right') => {
    if (pressRef.current) {
      pressRef.current.scrollBy({ left: direction === 'left' ? -420 : 420, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Hero Header */}
      <section className="pt-32 pb-20 px-12">
        <div className="max-w-[1600px] mx-auto">
          <h1 className="text-5xl lg:text-6xl font-light tracking-tight mb-6 text-foreground">
            {t.ourWork || "Our Work"}
          </h1>
          <p className="text-lg font-light max-w-2xl text-muted-foreground leading-relaxed">
            Real campaigns. Real results. See how brands connect with gaming audiences through native Twitch advertising.
          </p>
        </div>
      </section>

      {/* Case Studies Section - Main focus */}
      <section className="py-20 relative">
        <div className="px-12 mb-12 max-w-[1600px] mx-auto">
          <h2 className="text-2xl font-light mb-2 text-foreground">Case Studies</h2>
          <p className="text-sm text-muted-foreground">Scroll to explore our campaign results</p>
        </div>

        {/* Scroll Container */}
        <div className="relative group/scroll">
          {/* Left Arrow */}
          <button 
            onClick={() => scrollCaseStudies('left')}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center border border-border/50 bg-background/80 backdrop-blur-sm opacity-0 group-hover/scroll:opacity-100 transition-all duration-200 hover:border-primary hover:bg-primary/10 text-foreground"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow */}
          <button 
            onClick={() => scrollCaseStudies('right')}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center border border-border/50 bg-background/80 backdrop-blur-sm opacity-0 group-hover/scroll:opacity-100 transition-all duration-200 hover:border-primary hover:bg-primary/10 text-foreground"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Gradient Fades */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          {/* Scrollable Cards */}
          <div 
            ref={caseStudiesRef}
            className="horizontal-snap-scroll gap-6 px-12 pb-4"
          >
            {caseStudies.map((study) => (
              <CaseStudyCard 
                key={study.id} 
                study={study} 
                onPlay={setPlayingVideo}
                isPlaying={playingVideo === study.id}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Ad Formats Section - Supporting, 4-column grid */}
      <section className="py-20 px-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-12">
            <h2 className="text-2xl font-light mb-2 text-foreground">Ad Formats</h2>
            <p className="text-sm text-muted-foreground">Native advertising designed for live streaming</p>
          </div>

          {/* 3x2 Grid for 6 formats */}
          <div className="grid grid-cols-3 gap-6 justify-items-center">
            {adFormats.map((format) => (
              <AdFormatCard key={format.name} format={format} />
            ))}
          </div>
        </div>
      </section>

      {/* Press Section - Smallest, horizontal scroll */}
      <section className="py-20 relative">
        <div className="px-12 mb-12 max-w-[1600px] mx-auto">
          <h2 className="text-2xl font-light mb-2 text-foreground">Featured in Press</h2>
          <p className="text-sm text-muted-foreground">What the media is saying about Beta Ads</p>
        </div>

        {/* Scroll Container */}
        <div className="relative group/scroll">
          {/* Left Arrow */}
          <button 
            onClick={() => scrollPress('left')}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center border border-border/50 bg-background/80 backdrop-blur-sm opacity-0 group-hover/scroll:opacity-100 transition-all duration-200 hover:border-primary hover:bg-primary/10 text-foreground"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow */}
          <button 
            onClick={() => scrollPress('right')}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center border border-border/50 bg-background/80 backdrop-blur-sm opacity-0 group-hover/scroll:opacity-100 transition-all duration-200 hover:border-primary hover:bg-primary/10 text-foreground"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Gradient Fades */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          {/* Scrollable Cards */}
          <div 
            ref={pressRef}
            className="horizontal-snap-scroll gap-6 px-12 pb-4"
          >
            {pressArticles.map((article) => (
              <PressCard key={article.url} article={article} />
            ))}
          </div>
        </div>
      </section>

      <Footer t={t} language={language} setLanguage={setLanguage} />
    </div>
  );
};

export default CaseStudies;
