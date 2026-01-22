import React, { useState } from "react";
import { Footer } from "@/components/sections/Footer";
import { Play, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCountUp } from "@/hooks/useCountUp";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

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
    id: "snipe",
    name: "Snipe Banner",
    dimensions: "1920 × 250 px",
    description: "Horizontal banner overlay with high visibility. Appears at the top or bottom of the stream for maximum exposure without disrupting the viewing experience.",
    bestFor: "Awareness",
    image: "/lovable-uploads/snipeDemo1.png",
  },
  {
    id: "richmedia",
    name: "Rich Media",
    dimensions: "1920 × 1080 px",
    description: "Full-screen takeover with premium experience. Perfect for major announcements, product launches, or brand moments that demand attention.",
    bestFor: "Engagement",
    image: "/lovable-uploads/richMediaDemo1.png",
  },
  {
    id: "poll",
    name: "Poll",
    dimensions: "Dynamic",
    description: "Interactive poll that lets viewers participate in real-time. Great for audience insights, product preferences, or engagement campaigns.",
    bestFor: "Insights",
    image: "/lovable-uploads/pollDemo1.png",
  },
  {
    id: "premium",
    name: "Premium",
    dimensions: "1920 × 1080 px",
    description: "Rich media with clickable elements and interactive features. Includes CTAs, hotspots, and trackable engagement metrics.",
    bestFor: "Brand Moments",
    image: "/lovable-uploads/interactiveDemo1.png",
  },
  {
    id: "video",
    name: "Video",
    dimensions: "640 × 360 px",
    description: "Native in-stream video ads that feel organic to the broadcast. Supports sound-on playback with viewer-friendly skip options.",
    bestFor: "Storytelling",
    image: "/lovable-uploads/videoDemo1.png",
  },
  {
    id: "sidebar",
    name: "Side Bar",
    dimensions: "300 × 1080 px",
    description: "Persistent vertical placement alongside the stream. Maintains brand presence throughout the viewing session without interruption.",
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

// Video Modal Component
const VideoModal: React.FC<{ 
  videoId: string | null; 
  onClose: () => void 
}> = ({ videoId, onClose }) => {
  return (
    <Dialog open={!!videoId} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-6xl w-[95vw] p-0 bg-black border-border/20 overflow-hidden">
        <DialogTitle className="sr-only">Case Study Video</DialogTitle>
        <DialogDescription className="sr-only">Watch the full campaign breakdown</DialogDescription>
        <div className="aspect-video w-full">
          {videoId && (
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
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

const CaseStudies: React.FC<CaseStudiesProps> = ({ t, language, setLanguage }) => {
  const [modalVideoId, setModalVideoId] = useState<string | null>(null);
  const [activeFormat, setActiveFormat] = useState(adFormats[0].id);
  const [caseStudyIndex, setCaseStudyIndex] = useState(0);
  
  // Scroll animations
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.2 });
  const { ref: caseStudiesRef, isVisible: caseStudiesVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.1 });
  const { ref: formatsRef, isVisible: formatsVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.1 });
  const { ref: pressRef, isVisible: pressVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.1 });

  const selectedFormat = adFormats.find(f => f.id === activeFormat) || adFormats[0];
  
  // Featured case study for hero
  const featuredStudy = caseStudies[0];

  const navigateCaseStudy = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCaseStudyIndex(prev => prev === 0 ? caseStudies.length - 1 : prev - 1);
    } else {
      setCaseStudyIndex(prev => prev === caseStudies.length - 1 ? 0 : prev + 1);
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Video Modal */}
      <VideoModal videoId={modalVideoId} onClose={() => setModalVideoId(null)} />

      {/* ========== HERO SECTION - Calm, Minimal Opening ========== */}
      <section 
        ref={heroRef}
        className={`min-h-screen flex flex-col justify-center relative overflow-hidden transition-all duration-1000 ${
          heroVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Aurora/Glow Effect - Right Side */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div 
            className="absolute top-1/2 right-0 w-[70%] h-[140%] -translate-y-1/2 opacity-50"
            style={{
              background: 'radial-gradient(ellipse 100% 80% at 90% 50%, hsl(var(--primary)) 0%, hsl(15, 90%, 50%) 20%, hsl(350, 75%, 40%) 40%, transparent 70%)',
              filter: 'blur(80px)',
            }}
          />
          <div 
            className="absolute top-1/3 right-[10%] w-[40%] h-[60%] opacity-30"
            style={{
              background: 'radial-gradient(ellipse 80% 80% at 50% 50%, hsl(25, 95%, 55%) 0%, hsl(0, 80%, 50%) 50%, transparent 80%)',
              filter: 'blur(60px)',
            }}
          />
        </div>

        <div className="grid lg:grid-cols-2 h-full px-6 lg:px-16 xl:px-24 relative z-10">
          {/* Left: Large Typography */}
          <div className="flex flex-col justify-center py-32 lg:py-0">
            <div className={`transition-all duration-700 delay-200 ${heroVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight mb-8 text-foreground">
                Our Work
              </h1>
              <p className="text-lg lg:text-xl font-light max-w-md text-muted-foreground leading-relaxed">
                Native advertising for Gen Z audiences.
              </p>
            </div>
          </div>

          {/* Right: Subtle Tagline at Bottom */}
          <div className="hidden lg:flex items-end justify-end pb-32">
            <div className={`transition-all duration-700 delay-500 ${heroVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              <p className="text-sm text-muted-foreground/60 max-w-xs text-right leading-relaxed">
                Nordic advertising platform reaching gaming audiences through Twitch.
              </p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 transition-all duration-700 delay-700 ${heroVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-muted-foreground/40 uppercase tracking-widest">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-muted-foreground/30 to-transparent animate-pulse" />
          </div>
        </div>
      </section>

      {/* ========== CASE STUDIES - Large Gallery with Navigation ========== */}
      <section 
        ref={caseStudiesRef}
        className={`py-20 lg:py-32 transition-all duration-700 ${
          caseStudiesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="px-6 lg:px-16 xl:px-24 max-w-[1800px] mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-light mb-3 text-foreground">Case Studies</h2>
              <p className="text-muted-foreground">Click to watch the full campaign breakdown</p>
            </div>
            
            {/* Navigation */}
            <div className="hidden lg:flex items-center gap-3">
              <button 
                onClick={() => navigateCaseStudy('prev')}
                className="w-12 h-12 rounded-full flex items-center justify-center border border-border/30 bg-card/50 hover:border-primary hover:bg-primary/10 transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-sm text-muted-foreground tabular-nums min-w-[60px] text-center">
                {caseStudyIndex + 1} / {caseStudies.length}
              </span>
              <button 
                onClick={() => navigateCaseStudy('next')}
                className="w-12 h-12 rounded-full flex items-center justify-center border border-border/30 bg-card/50 hover:border-primary hover:bg-primary/10 transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Large Card Display */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Main Featured Card */}
            <div 
              className="group cursor-pointer"
              onClick={() => setModalVideoId(caseStudies[caseStudyIndex].id)}
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-border/20 bg-card/40">
                <img
                  src={`https://img.youtube.com/vi/${caseStudies[caseStudyIndex].id}/maxresdefault.jpg`}
                  alt={caseStudies[caseStudyIndex].campaign}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = `https://img.youtube.com/vi/${caseStudies[caseStudyIndex].id}/hqdefault.jpg`;
                  }}
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-primary/90 flex items-center justify-center shadow-xl transition-all duration-300 group-hover:scale-110">
                    <Play className="w-7 h-7 lg:w-8 lg:h-8 text-primary-foreground ml-1" fill="currentColor" />
                  </div>
                </div>

                {/* Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                  <h3 className="text-2xl lg:text-3xl font-medium text-white mb-2">{caseStudies[caseStudyIndex].brand}</h3>
                  <p className="text-white/80">{caseStudies[caseStudyIndex].campaign}</p>
                </div>
              </div>
              
              {/* Metrics Below */}
              <div className="flex gap-8 mt-6 pt-6 border-t border-border/20">
                <div>
                  <p className="text-2xl lg:text-3xl font-light text-primary">{caseStudies[caseStudyIndex].impressions}</p>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1">Impressions</p>
                </div>
                <div>
                  <p className="text-2xl lg:text-3xl font-light text-primary">{caseStudies[caseStudyIndex].ctr}</p>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1">CTR</p>
                </div>
              </div>
              <p className="text-muted-foreground mt-4 leading-relaxed">{caseStudies[caseStudyIndex].description}</p>
            </div>

            {/* Thumbnail Grid */}
            <div className="grid grid-cols-2 gap-4">
              {caseStudies.slice(1, 5).map((study, index) => (
                <div 
                  key={study.id}
                  className={cn(
                    "group cursor-pointer relative aspect-video rounded-xl overflow-hidden border border-border/20 bg-card/40 transition-all duration-300",
                    caseStudyIndex === index + 1 && "ring-2 ring-primary"
                  )}
                  onClick={() => setCaseStudyIndex(index + 1)}
                >
                  <img
                    src={`https://img.youtube.com/vi/${study.id}/hqdefault.jpg`}
                    alt={study.campaign}
                    className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-sm font-medium text-white">{study.brand}</p>
                    <p className="text-xs text-white/70 truncate">{study.campaign}</p>
                  </div>
                  
                  {/* Play Icon on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center">
                      <Play className="w-4 h-4 text-primary-foreground ml-0.5" fill="currentColor" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: All Cards Grid */}
          <div className="lg:hidden mt-8 grid gap-4">
            {caseStudies.slice(5).map((study) => (
              <div 
                key={study.id}
                className="group cursor-pointer flex gap-4 p-4 rounded-xl border border-border/20 bg-card/40"
                onClick={() => setModalVideoId(study.id)}
              >
                <div className="relative w-32 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={`https://img.youtube.com/vi/${study.id}/hqdefault.jpg`}
                    alt={study.campaign}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Play className="w-5 h-5 text-white" fill="currentColor" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground">{study.brand}</h4>
                  <p className="text-sm text-muted-foreground truncate">{study.campaign}</p>
                  <div className="flex gap-4 mt-2">
                    <span className="text-xs text-primary">{study.impressions}</span>
                    <span className="text-xs text-primary">{study.ctr} CTR</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== AD FORMATS - Interactive Tab Selector ========== */}
      <section 
        ref={formatsRef}
        className={`py-20 lg:py-32 transition-all duration-700 ${
          formatsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="px-6 lg:px-16 xl:px-24 max-w-[1800px] mx-auto">
          <h2 className="text-3xl lg:text-4xl font-light mb-3 text-foreground">Ad Formats</h2>
          <p className="text-muted-foreground mb-10">Native advertising designed for live streaming</p>

          {/* Tab Selector */}
          <div className="flex flex-wrap gap-2 mb-10">
            {adFormats.map((format) => (
              <button
                key={format.id}
                onClick={() => setActiveFormat(format.id)}
                className={cn(
                  "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                  activeFormat === format.id
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "bg-card/60 text-muted-foreground hover:text-foreground hover:bg-card border border-border/30"
                )}
              >
                {format.name}
              </button>
            ))}
          </div>

          {/* Format Display */}
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Large Preview Image - 3/5 width */}
            <div className="lg:col-span-3 relative">
              <div className="aspect-video rounded-2xl overflow-hidden border border-border/20 bg-card/40 shadow-2xl">
                <img
                  key={selectedFormat.id}
                  src={selectedFormat.image}
                  alt={selectedFormat.name}
                  className="w-full h-full object-cover animate-fade-in"
                />
              </div>
              
              {/* Dimensions Badge */}
              <div className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-background/90 backdrop-blur-sm border border-border/30">
                <span className="text-xs font-mono text-muted-foreground">{selectedFormat.dimensions}</span>
              </div>
            </div>

            {/* Format Details - 2/5 width */}
            <div className="lg:col-span-2 flex flex-col justify-center">
              <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 w-fit mb-4">
                {selectedFormat.bestFor}
              </span>
              <h3 className="text-2xl lg:text-3xl font-light text-foreground mb-4">{selectedFormat.name}</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">{selectedFormat.description}</p>
              
              {/* Format Quick Stats */}
              <div className="pt-6 border-t border-border/20 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Dimensions</span>
                  <span className="text-sm font-mono text-foreground">{selectedFormat.dimensions}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Best For</span>
                  <span className="text-sm text-foreground">{selectedFormat.bestFor}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Format</span>
                  <span className="text-sm text-foreground">PNG / MP4</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== PRESS SECTION - Static Grid ========== */}
      <section 
        ref={pressRef}
        className={`py-20 lg:py-32 transition-all duration-700 ${
          pressVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="px-6 lg:px-16 xl:px-24 max-w-[1800px] mx-auto">
          <h2 className="text-3xl lg:text-4xl font-light mb-3 text-foreground">Featured in Press</h2>
          <p className="text-muted-foreground mb-12">What the media is saying about Beta Ads</p>

          {/* 4-Column Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pressArticles.map((article, index) => {
              const isKampanje = article.publication === "Kampanje";
              
              return (
                <a 
                  key={article.url}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group block rounded-2xl overflow-hidden border border-border/20 bg-card/40 transition-all duration-500 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 ${
                    pressVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    
                    {/* Publication Badge */}
                    <div className="absolute top-3 left-3">
                      <span 
                        className={cn(
                          "text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-sm",
                          isKampanje 
                            ? "bg-primary/80 text-primary-foreground" 
                            : "bg-green-500/80 text-white"
                        )}
                      >
                        {article.publication}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-base font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-200 mb-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{article.subtitle}</p>
                    <div className="flex items-center text-xs text-primary">
                      <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                      Read article
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <Footer t={t} language={language} setLanguage={setLanguage} />
    </div>
  );
};

export default CaseStudies;
