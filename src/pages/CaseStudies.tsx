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
    description: "Horizontal banner overlay with high visibility. Perfect for awareness campaigns.",
    bestFor: "Awareness, product launches",
    image: "/lovable-uploads/snipeDemo1.png",
  },
  {
    name: "Rich Media",
    dimensions: "1920 × 1080 px",
    description: "Full-screen takeover with premium interactive experience.",
    bestFor: "Engagement, interactive campaigns",
    image: "/lovable-uploads/richMediaDemo1.png",
  },
  {
    name: "Poll",
    dimensions: "Dynamic",
    description: "Interactive poll overlay enabling direct audience engagement.",
    bestFor: "Audience insights, engagement",
    image: "/lovable-uploads/pollDemo1.png",
  },
  {
    name: "Premium",
    dimensions: "1920 × 1080 px",
    description: "Rich media with clickable elements for maximum impact.",
    bestFor: "Full-screen brand moments",
    image: "/lovable-uploads/interactiveDemo1.png",
  },
  {
    name: "Video",
    dimensions: "640 × 360 px",
    description: "In-stream video ads that blend natively into the broadcast.",
    bestFor: "Story-driven campaigns",
    image: "/lovable-uploads/videoDemo1.png",
  },
  {
    name: "Side Bar",
    dimensions: "300 × 1080 px",
    description: "Vertical ad placement alongside the stream for persistent presence.",
    bestFor: "Persistent brand presence",
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
    excerpt: "The young entrepreneur is now expanding Beta Ads operations into new Nordic markets, bringing native Twitch advertising to Sweden and Finland.",
  },
  {
    title: "Andreas (21) satser på eget Twitch-byrå",
    subtitle: "Nå får han polske tech-krefter i ryggen",
    publication: "Kampanje",
    url: "https://kampanje.com/premium/september-2024/innsikt/andreas-21-satser-pa-eget-twtich-byra--na-far-han-polske-tech-krefter-i-ryggen---har-lagt-grunnlaget-na/",
    image: "/lovable-uploads/press-kampanje-startup.png",
    excerpt: "With backing from Polish tech partners, Beta Ads is building the foundation for Nordic streaming advertising infrastructure.",
  },
  {
    title: "Ny kanal for mediekjøp",
    subtitle: "Beta er Norges nye Twitch-byrå",
    publication: "Kom24",
    url: "https://www.kom24.no/andreas-myraune-beta-influensere/ny-kanal-for-mediekjop-beta-er-norges-nye-twitch-byra/730424",
    image: "/lovable-uploads/press-kom24-twitch.png",
    excerpt: "Beta Ads emerges as Norway's first dedicated Twitch advertising agency, offering brands a new channel for reaching gaming audiences.",
  },
  {
    title: "Instreamly og Beta inngår partnerskap",
    subtitle: "Strategisk samarbeid i Norge",
    publication: "Kom24",
    url: "https://www.kom24.no/andreas-myraune-beta-instreamly/instreamly-og-beta-inngar-partnerskap-i-norge/749907",
    image: "/lovable-uploads/press-kampanje-expansion.png",
    excerpt: "Strategic partnership between Instreamly and Beta strengthens the native streaming advertising ecosystem in Norway.",
  },
];

// Case Study Card Component
const CaseStudyCard: React.FC<{ study: typeof caseStudies[0]; onPlay: (id: string) => void; isPlaying: boolean }> = ({ 
  study, 
  onPlay, 
  isPlaying 
}) => (
  <div className="snap-card w-[450px] group">
    <div 
      className="rounded-2xl overflow-hidden border border-white/10 transition-all duration-300 hover:border-[hsl(4_76%_58%)]/40 hover:shadow-2xl hover:shadow-[hsl(4_76%_58%)]/10"
      style={{ backgroundColor: 'hsl(180 2% 15%)' }}
    >
      {/* Video Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
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
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
              onError={(e) => {
                e.currentTarget.src = `https://img.youtube.com/vi/${study.id}/hqdefault.jpg`;
              }}
            />
            {/* Play Button Overlay */}
            <div 
              className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
              onClick={() => onPlay(study.id)}
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-xl transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: 'hsl(4 76% 58%)' }}>
                <Play className="w-7 h-7 text-white ml-1" fill="currentColor" />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-medium" style={{ color: '#F5F5F5' }}>{study.brand}</h3>
          <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: 'hsl(4 76% 58% / 0.15)', color: 'hsl(4 76% 58%)' }}>
            Case Study
          </span>
        </div>
        <p className="text-sm mb-4" style={{ color: '#A7A9A9' }}>{study.campaign}</p>
        
        {/* Metrics Row */}
        <div className="flex gap-8 mb-4">
          <div>
            <p className="text-2xl font-semibold" style={{ color: 'hsl(4 76% 58%)' }}>{study.impressions}</p>
            <p className="text-xs uppercase tracking-wider" style={{ color: '#A7A9A9' }}>Impressions</p>
          </div>
          <div>
            <p className="text-2xl font-semibold" style={{ color: 'hsl(4 76% 58%)' }}>{study.ctr}</p>
            <p className="text-xs uppercase tracking-wider" style={{ color: '#A7A9A9' }}>CTR</p>
          </div>
        </div>

        <p className="text-sm leading-relaxed" style={{ color: '#A7A9A9' }}>{study.description}</p>
      </div>
    </div>
  </div>
);

// Ad Format Card Component
const AdFormatCard: React.FC<{ format: typeof adFormats[0] }> = ({ format }) => (
  <div className="group relative rounded-xl overflow-hidden border border-white/10 transition-all duration-300 hover:border-[hsl(4_76%_58%)]/40 hover:shadow-lg" style={{ backgroundColor: 'hsl(180 2% 15%)' }}>
    <div className="aspect-[4/3] overflow-hidden">
      <img
        src={format.image}
        alt={format.name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
    </div>
    
    {/* Overlay on hover */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
      <span className="text-xs font-mono mb-2 px-2 py-1 rounded w-fit" style={{ backgroundColor: 'hsl(4 76% 58% / 0.2)', color: 'hsl(4 76% 58%)' }}>
        {format.dimensions}
      </span>
      <h3 className="text-lg font-medium mb-2" style={{ color: '#F5F5F5' }}>{format.name}</h3>
      <p className="text-sm mb-2" style={{ color: '#A7A9A9' }}>{format.description}</p>
      <p className="text-xs" style={{ color: 'hsl(4 76% 58%)' }}>Best for: {format.bestFor}</p>
    </div>
    
    {/* Always visible label */}
    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent group-hover:opacity-0 transition-opacity duration-300">
      <h3 className="text-base font-medium" style={{ color: '#F5F5F5' }}>{format.name}</h3>
    </div>
  </div>
);

// Press Article Block Component
const PressArticleBlock: React.FC<{ article: typeof pressArticles[0]; isReversed: boolean }> = ({ article, isReversed }) => {
  const isKampanje = article.publication === "Kampanje";
  
  return (
    <div 
      className={`flex ${isReversed ? 'flex-row-reverse' : 'flex-row'} gap-8 items-center max-w-[1400px] mx-auto group cursor-pointer transition-all duration-300 hover:translate-y-[-4px]`}
      onClick={() => window.open(article.url, "_blank")}
    >
      {/* Image */}
      <div className="w-[60%] rounded-2xl overflow-hidden border border-white/10 transition-all duration-300 group-hover:border-[hsl(4_76%_58%)]/30 group-hover:shadow-xl">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-[320px] object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      
      {/* Content */}
      <div className="w-[40%] py-6">
        <span 
          className={`inline-block text-xs font-medium px-3 py-1 rounded-full mb-4 ${
            isKampanje 
              ? 'bg-[hsl(4_76%_58%/0.15)] text-[hsl(4_76%_58%)]' 
              : 'bg-green-500/15 text-green-400'
          }`}
        >
          {article.publication}
        </span>
        
        <h3 className="text-2xl lg:text-3xl font-medium mb-3 leading-tight transition-colors duration-300 group-hover:text-[hsl(4_76%_58%)]" style={{ color: '#F5F5F5' }}>
          {article.title}
        </h3>
        
        <p className="text-lg mb-4" style={{ color: '#A7A9A9' }}>{article.subtitle}</p>
        
        <p className="text-sm leading-relaxed mb-6" style={{ color: '#A7A9A9' }}>{article.excerpt}</p>
        
        <div className="flex items-center text-sm transition-colors duration-300 group-hover:text-[hsl(4_76%_58%)]" style={{ color: '#A7A9A9' }}>
          <ExternalLink className="w-4 h-4 mr-2" />
          Read full article
        </div>
      </div>
    </div>
  );
};

const CaseStudies: React.FC<CaseStudiesProps> = ({ t, language, setLanguage }) => {
  const [playingVideo, setPlayingVideo] = React.useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -470, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 470, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'hsl(180 2% 12%)' }}>
      {/* Hero Header */}
      <section className="pt-32 pb-16 px-16">
        <div className="max-w-[1600px] mx-auto">
          <h1 className="text-6xl lg:text-8xl font-extralight tracking-tight mb-4" style={{ color: '#F5F5F5' }}>
            {t.ourWork || "Our Work"}
          </h1>
          <p className="text-xl lg:text-2xl font-light max-w-2xl" style={{ color: '#A7A9A9' }}>
            Real campaigns. Real results. See how brands connect with gaming audiences through native Twitch advertising.
          </p>
        </div>
      </section>

      {/* Case Studies Section - Horizontal Scroll */}
      <section className="py-16 relative">
        <div className="px-16 mb-8 max-w-[1600px] mx-auto">
          <h2 className="text-3xl font-light mb-2" style={{ color: '#F5F5F5' }}>Case Studies</h2>
          <p className="text-base" style={{ color: '#A7A9A9' }}>Scroll to explore our campaign results</p>
        </div>

        {/* Scroll Container */}
        <div className="relative group/scroll">
          {/* Left Arrow */}
          <button 
            onClick={scrollLeft}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center border border-white/20 bg-black/50 backdrop-blur-sm opacity-0 group-hover/scroll:opacity-100 transition-all duration-300 hover:border-[hsl(4_76%_58%)] hover:bg-[hsl(4_76%_58%/0.2)]"
            style={{ color: '#F5F5F5' }}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow */}
          <button 
            onClick={scrollRight}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center border border-white/20 bg-black/50 backdrop-blur-sm opacity-0 group-hover/scroll:opacity-100 transition-all duration-300 hover:border-[hsl(4_76%_58%)] hover:bg-[hsl(4_76%_58%/0.2)]"
            style={{ color: '#F5F5F5' }}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Gradient Fades */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[hsl(180_2%_12%)] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[hsl(180_2%_12%)] to-transparent z-10 pointer-events-none" />

          {/* Scrollable Cards */}
          <div 
            ref={scrollContainerRef}
            className="horizontal-snap-scroll gap-6 px-16 pb-4"
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

      {/* Ad Formats Section - Full Width Grid */}
      <section className="py-20 px-16">
        <div className="max-w-[1600px] mx-auto">
          <div className="mb-10">
            <h2 className="text-3xl font-light mb-2" style={{ color: '#F5F5F5' }}>Ad Formats</h2>
            <p className="text-base" style={{ color: '#A7A9A9' }}>Native advertising designed for live streaming</p>
          </div>

          {/* 6-Column Grid */}
          <div className="grid grid-cols-6 gap-5">
            {adFormats.map((format) => (
              <AdFormatCard key={format.name} format={format} />
            ))}
          </div>
        </div>
      </section>

      {/* Press Section - Alternating Blocks */}
      <section className="py-20 px-16">
        <div className="max-w-[1600px] mx-auto mb-12">
          <h2 className="text-3xl font-light mb-2" style={{ color: '#F5F5F5' }}>Featured in Press</h2>
          <p className="text-base" style={{ color: '#A7A9A9' }}>What the media is saying about Beta Ads</p>
        </div>

        <div className="flex flex-col gap-16">
          {pressArticles.map((article, index) => (
            <PressArticleBlock 
              key={article.url} 
              article={article} 
              isReversed={index % 2 !== 0}
            />
          ))}
        </div>
      </section>

      <Footer t={t} language={language} setLanguage={setLanguage} />
    </div>
  );
};

export default CaseStudies;
