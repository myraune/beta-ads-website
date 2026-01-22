import React, { useRef, useState } from "react";
import { Footer } from "@/components/sections/Footer";
import { Play, ChevronLeft, ChevronRight, ExternalLink, X } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCountUp } from "@/hooks/useCountUp";
import { Dialog, DialogContent } from "@/components/ui/dialog";

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
    impressionsNum: 500000,
    ctr: "2.93%",
    ctrNum: 2.93,
    description: "Premium awareness campaign for Samsung's flagship smartphone launch across Nordic Twitch streamers."
  },
  { 
    id: "IZOx_VMdJJg", 
    brand: "Shure", 
    campaign: "MV7+ Microphone Launch",
    impressions: "320,000+",
    impressionsNum: 320000,
    ctr: "2.45%",
    ctrNum: 2.45,
    description: "Creator-focused campaign showcasing premium audio equipment to streaming audiences."
  },
  { 
    id: "ufNq-A4d7iA", 
    brand: "Komplett", 
    campaign: "Monthly Gaming Deals",
    impressions: "150,000+",
    impressionsNum: 150000,
    ctr: "3.24%",
    ctrNum: 3.24,
    description: "Recurring promotion campaign driving traffic to gaming hardware deals."
  },
  { 
    id: "DMz-NV1W_Is", 
    brand: "Saily", 
    campaign: "E-SIM Campaign Norway",
    impressions: "280,000+",
    impressionsNum: 280000,
    ctr: "2.67%",
    ctrNum: 2.67,
    description: "Travel-focused campaign targeting young, mobile-first audiences."
  },
  { 
    id: "U6i5uvhk2Sw", 
    brand: "Surfshark", 
    campaign: "VPN Awareness Nordic",
    impressions: "420,000+",
    impressionsNum: 420000,
    ctr: "2.81%",
    ctrNum: 2.81,
    description: "Privacy and security messaging tailored for gaming communities."
  },
  { 
    id: "GwE4dagRm_k", 
    brand: "Kristiania", 
    campaign: "University Recruitment",
    impressions: "600,000+",
    impressionsNum: 600000,
    ctr: "2.00%",
    ctrNum: 2.0,
    description: "Student recruitment campaign reaching Gen Z through their favorite streamers."
  },
  { 
    id: "aE0-S8GC1Iw", 
    brand: "M3panel", 
    campaign: "Research Panel Signup",
    impressions: "180,000+",
    impressionsNum: 180000,
    ctr: "3.45%",
    ctrNum: 3.45,
    description: "Direct response campaign driving panel signups with incentive offers."
  },
  { 
    id: "swu_ye12IHs", 
    brand: "Norstat", 
    campaign: "Survey Participation Drive",
    impressions: "210,000+",
    impressionsNum: 210000,
    ctr: "2.92%",
    ctrNum: 2.92,
    description: "Engagement campaign encouraging survey participation among young demographics."
  },
];

// Calculate totals for hero stats
const totalImpressions = caseStudies.reduce((sum, s) => sum + s.impressionsNum, 0);
const avgCtr = caseStudies.reduce((sum, s) => sum + s.ctrNum, 0) / caseStudies.length;

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

// Animated Number Component for Hero
const AnimatedNumber: React.FC<{ 
  value: number; 
  suffix?: string; 
  prefix?: string;
  decimals?: number;
  isVisible: boolean;
}> = ({ value, suffix = "", prefix = "", decimals = 0, isVisible }) => {
  const { displayValue } = useCountUp(value, isVisible, { 
    duration: 2500, 
    decimals,
    enableLivePulse: false 
  });
  
  return (
    <span className="tabular-nums">
      {prefix}{displayValue}{suffix}
    </span>
  );
};

// Case Study Card Component - Responsive sizing
const CaseStudyCard: React.FC<{ 
  study: typeof caseStudies[0]; 
  onOpenModal: (id: string) => void;
  index: number;
  isVisible: boolean;
}> = ({ study, onOpenModal, index, isVisible }) => (
  <div 
    className={`flex-shrink-0 w-[340px] sm:w-[400px] lg:w-[460px] group transition-all duration-700 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    }`}
    style={{ transitionDelay: `${index * 100}ms` }}
  >
    <div className="rounded-2xl overflow-hidden border border-border/20 bg-card/40 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1">
      {/* Video Thumbnail */}
      <div 
        className="relative aspect-video overflow-hidden cursor-pointer"
        onClick={() => onOpenModal(study.id)}
      >
        <img
          src={`https://img.youtube.com/vi/${study.id}/maxresdefault.jpg`}
          alt={study.campaign}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
          onError={(e) => {
            e.currentTarget.src = `https://img.youtube.com/vi/${study.id}/hqdefault.jpg`;
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Play Button - Centered with pulse animation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
            <Play className="w-7 h-7 text-primary-foreground ml-1" fill="currentColor" />
          </div>
        </div>

        {/* Watch label */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-sm font-medium text-white/90">Watch Case Study</span>
          <span className="text-xs text-white/70">{study.brand}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-medium text-foreground mb-1">{study.brand}</h3>
            <p className="text-sm text-muted-foreground">{study.campaign}</p>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
            Case Study
          </span>
        </div>
        
        {/* Metrics Row - Animated on hover */}
        <div className="flex gap-8 my-5 py-4 border-y border-border/20">
          <div className="group/metric">
            <p className="text-2xl font-semibold text-primary transition-transform duration-300 group-hover/metric:scale-105">
              {study.impressions}
            </p>
            <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1">Impressions</p>
          </div>
          <div className="group/metric">
            <p className="text-2xl font-semibold text-primary transition-transform duration-300 group-hover/metric:scale-105">
              {study.ctr}
            </p>
            <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1">CTR</p>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">{study.description}</p>
      </div>
    </div>
  </div>
);

// Ad Format Card Component - For carousel
const AdFormatCard: React.FC<{ format: typeof adFormats[0] }> = ({ format }) => (
  <div className="flex-shrink-0 w-[300px] sm:w-[360px] lg:w-[420px] group">
    <div className="rounded-2xl overflow-hidden border border-border/20 bg-card/40 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
      {/* Image with hover overlay */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={format.image}
          alt={format.name}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Hover overlay with details */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-5">
          <p className="text-sm text-foreground/90 mb-2">{format.description}</p>
          <span className="text-xs font-mono text-primary">{format.dimensions}</span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-foreground">{format.name}</h3>
          <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary">
            {format.bestFor}
          </span>
        </div>
      </div>
    </div>
  </div>
);

// Press Card Component - Larger, matching frontpage style
const PressCard: React.FC<{ article: typeof pressArticles[0]; index: number; isVisible: boolean }> = ({ 
  article, 
  index,
  isVisible 
}) => {
  const isKampanje = article.publication === "Kampanje";
  
  return (
    <div 
      className={`flex-shrink-0 w-[300px] sm:w-[360px] lg:w-[420px] group cursor-pointer transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
      onClick={() => window.open(article.url, "_blank")}
    >
      <div className="rounded-2xl overflow-hidden border border-border/20 bg-card/40 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
        {/* Image */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
            loading="lazy"
          />
          
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-5">
            <h3 className="text-base font-medium text-foreground mb-2 leading-tight">
              {article.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{article.subtitle}</p>
            <div className="flex items-center text-xs text-primary mt-3">
              <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
              Read full article
            </div>
          </div>

          {/* Publication badge - Always visible */}
          <div className="absolute top-4 left-4">
            <span 
              className={`text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-sm ${
                isKampanje 
                  ? 'bg-primary/80 text-primary-foreground' 
                  : 'bg-green-500/80 text-white'
              }`}
            >
              {article.publication}
            </span>
          </div>
        </div>
        
        {/* Simple title below */}
        <div className="p-5">
          <h3 className="text-base font-medium text-foreground line-clamp-1 group-hover:text-primary transition-colors duration-200">
            {article.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{article.subtitle}</p>
        </div>
      </div>
    </div>
  );
};

// Video Modal Component
const VideoModal: React.FC<{ 
  videoId: string | null; 
  onClose: () => void 
}> = ({ videoId, onClose }) => {
  if (!videoId) return null;
  
  return (
    <Dialog open={!!videoId} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-5xl w-[95vw] p-0 bg-black border-border/20 overflow-hidden">
        <div className="aspect-video w-full">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title="Case Study Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

const CaseStudies: React.FC<CaseStudiesProps> = ({ t, language, setLanguage }) => {
  const [modalVideoId, setModalVideoId] = useState<string | null>(null);
  const caseStudiesRef = useRef<HTMLDivElement>(null);
  
  // Scroll animations
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: caseStudiesAnimRef, isVisible: caseStudiesVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: formatsRef, isVisible: formatsVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: pressRef, isVisible: pressVisible } = useScrollAnimation({ threshold: 0.1 });

  const scrollCaseStudies = (direction: 'left' | 'right') => {
    if (caseStudiesRef.current) {
      const scrollAmount = window.innerWidth < 640 ? 360 : window.innerWidth < 1024 ? 420 : 480;
      caseStudiesRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Video Modal */}
      <VideoModal videoId={modalVideoId} onClose={() => setModalVideoId(null)} />

      {/* Hero Header with Animated Stats */}
      <section 
        ref={heroRef}
        className={`pt-32 pb-16 lg:pb-24 px-6 lg:px-12 transition-all duration-1000 ${
          heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-[1600px] mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-light tracking-tight mb-6 text-foreground">
            {t.ourWork || "Our Work"}
          </h1>
          <p className="text-lg lg:text-xl font-light max-w-2xl text-muted-foreground leading-relaxed mb-12">
            Real campaigns. Real results. See how brands connect with gaming audiences through native Twitch advertising.
          </p>

          {/* Animated Stats */}
          <div className="flex flex-wrap gap-12 lg:gap-20">
            <div>
              <p className="text-4xl lg:text-5xl font-light text-primary">
                <AnimatedNumber 
                  value={totalImpressions} 
                  suffix="+" 
                  isVisible={heroVisible} 
                />
              </p>
              <p className="text-sm uppercase tracking-wider text-muted-foreground mt-2">Total Impressions</p>
            </div>
            <div>
              <p className="text-4xl lg:text-5xl font-light text-primary">
                <AnimatedNumber 
                  value={avgCtr} 
                  suffix="%" 
                  decimals={2}
                  isVisible={heroVisible} 
                />
              </p>
              <p className="text-sm uppercase tracking-wider text-muted-foreground mt-2">Average CTR</p>
            </div>
            <div>
              <p className="text-4xl lg:text-5xl font-light text-primary">
                <AnimatedNumber 
                  value={caseStudies.length} 
                  suffix="+" 
                  isVisible={heroVisible} 
                />
              </p>
              <p className="text-sm uppercase tracking-wider text-muted-foreground mt-2">Campaigns</p>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section ref={caseStudiesAnimRef} className="py-16 lg:py-24 relative">
        <div className="px-6 lg:px-12 mb-10 max-w-[1600px] mx-auto">
          <h2 className="text-2xl lg:text-3xl font-light mb-2 text-foreground">Case Studies</h2>
          <p className="text-muted-foreground">Click to watch the full campaign breakdown</p>
        </div>

        {/* Scroll Container */}
        <div className="relative group/scroll">
          {/* Navigation Arrows */}
          <button 
            onClick={() => scrollCaseStudies('left')}
            className="absolute left-2 lg:left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center border border-border/30 bg-background/90 backdrop-blur-sm opacity-0 group-hover/scroll:opacity-100 transition-all duration-300 hover:border-primary hover:bg-primary/10 text-foreground shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button 
            onClick={() => scrollCaseStudies('right')}
            className="absolute right-2 lg:right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center border border-border/30 bg-background/90 backdrop-blur-sm opacity-0 group-hover/scroll:opacity-100 transition-all duration-300 hover:border-primary hover:bg-primary/10 text-foreground shadow-lg"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Gradient Fades */}
          <div className="absolute left-0 top-0 bottom-0 w-12 lg:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 lg:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          {/* Scrollable Cards */}
          <div 
            ref={caseStudiesRef}
            className="flex gap-6 lg:gap-8 overflow-x-auto scrollbar-hide px-6 lg:px-12 pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {caseStudies.map((study, index) => (
              <CaseStudyCard 
                key={study.id} 
                study={study} 
                onOpenModal={setModalVideoId}
                index={index}
                isVisible={caseStudiesVisible}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Ad Formats Section - Auto-scrolling carousel */}
      <section 
        ref={formatsRef}
        className={`py-16 lg:py-24 overflow-hidden transition-all duration-700 ${
          formatsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="px-6 lg:px-12 mb-10 max-w-[1600px] mx-auto">
          <h2 className="text-2xl lg:text-3xl font-light mb-2 text-foreground">Ad Formats</h2>
          <p className="text-muted-foreground">Native advertising designed for live streaming</p>
        </div>

        {/* Auto-scrolling Carousel */}
        <div className="relative">
          {/* Gradient Fades */}
          <div className="absolute left-0 top-0 bottom-0 w-12 lg:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 lg:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          {/* Continuous Scroll Container */}
          <div className="overflow-hidden">
            <div 
              className="flex gap-6 lg:gap-8 animate-scroll hover:[animation-play-state:paused]"
              style={{ width: 'max-content' }}
            >
              {/* First set */}
              {adFormats.map((format) => (
                <AdFormatCard key={`1-${format.name}`} format={format} />
              ))}
              {/* Duplicate for seamless loop */}
              {adFormats.map((format) => (
                <AdFormatCard key={`2-${format.name}`} format={format} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Press Section */}
      <section ref={pressRef} className="py-16 lg:py-24 relative">
        <div className="px-6 lg:px-12 mb-10 max-w-[1600px] mx-auto">
          <h2 className="text-2xl lg:text-3xl font-light mb-2 text-foreground">Featured in Press</h2>
          <p className="text-muted-foreground">What the media is saying about Beta Ads</p>
        </div>

        {/* Auto-scrolling Carousel */}
        <div className="relative">
          {/* Gradient Fades */}
          <div className="absolute left-0 top-0 bottom-0 w-12 lg:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 lg:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          {/* Continuous Scroll Container */}
          <div className="overflow-hidden">
            <div 
              className="flex gap-6 lg:gap-8 animate-scroll hover:[animation-play-state:paused]"
              style={{ width: 'max-content' }}
            >
              {/* First set */}
              {pressArticles.map((article, index) => (
                <PressCard 
                  key={`1-${article.url}`} 
                  article={article} 
                  index={index}
                  isVisible={pressVisible}
                />
              ))}
              {/* Duplicate for seamless loop */}
              {pressArticles.map((article, index) => (
                <PressCard 
                  key={`2-${article.url}`} 
                  article={article} 
                  index={index}
                  isVisible={pressVisible}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer t={t} language={language} setLanguage={setLanguage} />
    </div>
  );
};

export default CaseStudies;
