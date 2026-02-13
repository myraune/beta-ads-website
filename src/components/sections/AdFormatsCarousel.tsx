import React from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface AdFormatsCarouselProps {
  t: any;
}

interface AdFormat {
  name: string;
  dimensions: string;
  description: string;
  bestFor: string;
  image: string;
}

const adFormats: AdFormat[] = [
  {
    name: "Video",
    dimensions: "640 × 360 px",
    description: "In-stream video ads that blend natively into the broadcast.",
    bestFor: "Story-driven campaigns",
    image: "/lovable-uploads/videoDemo1.png",
  },
  {
    name: "Snipe Banner",
    dimensions: "1920 × 250 px",
    description: "Horizontal banner overlay. High visibility.",
    bestFor: "Awareness, product launches",
    image: "/lovable-uploads/snipeDemo1.png",
  },
  {
    name: "Side Bar",
    dimensions: "300 × 1080 px",
    description: "Vertical ad placement alongside the stream.",
    bestFor: "Persistent brand presence",
    image: "/lovable-uploads/sideBarDemo1.png",
  },
  {
    name: "Rich Media",
    dimensions: "1920 × 1080 px",
    description: "Full-screen takeover. Premium experience.",
    bestFor: "Engagement, interactive campaigns",
    image: "/lovable-uploads/richMediaDemo1.png",
  },
  {
    name: "Poll",
    dimensions: "Dynamic",
    description: "Interactive poll overlay. Direct engagement.",
    bestFor: "Direct conversions, promo codes",
    image: "/lovable-uploads/pollDemo1.png",
  },
  {
    name: "Interactive",
    dimensions: "1920 × 1080 px",
    description: "Rich media with clickable elements.",
    bestFor: "Full-screen brand moments",
    image: "/lovable-uploads/interactiveDemo1.png",
  },
];

const AdFormatCard: React.FC<{ format: AdFormat; t: any }> = ({ format, t }) => (
  <div className="flex-shrink-0 w-[280px] sm:w-[340px] lg:w-[400px] group">
    <div className="relative rounded-xl overflow-hidden bg-card/50 backdrop-blur-sm shadow-lg shadow-black/10 transition-[box-shadow,background-color] duration-300 hover:shadow-xl hover:shadow-primary/15">
      <div className="aspect-video overflow-hidden">
        <img
          src={format.image}
          alt={`${format.name} preview`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      
      {/* Text overlay - only visible on hover */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/95 to-transparent p-4 pt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="inline-block text-xs font-mono text-primary/80 bg-primary/10 px-2 py-0.5 rounded mb-2">
          {format.dimensions}
        </span>
        
        <h3 className="text-foreground font-medium text-lg mb-1">
          {format.name}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-2">
          {format.description}
        </p>
        
        <p className="text-primary text-xs font-medium">
          {t.bestFor || "Best for"}: {format.bestFor}
        </p>
      </div>
    </div>
  </div>
);

export const AdFormatsCarousel: React.FC<AdFormatsCarouselProps> = ({ t }) => {
  const { ref: sectionRef, isVisible } = useScrollAnimation();

  return (
    <section 
      ref={sectionRef}
      className={`py-16 lg:py-24 overflow-hidden transition-[opacity,transform] duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
    >
      {/* Section Header */}
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 mb-10">
        <h2 className="text-2xl lg:text-3xl font-light text-foreground mb-2">
          {t.adFormatsTitle || "Ad Formats"}
        </h2>
        <p className="text-muted-foreground text-base max-w-md">
          {t.adFormatsSubtitle || "Native advertising designed for live streaming"}
        </p>
      </div>

      {/* Carousel Container - Full Width */}
      <div className="relative">
        {/* Left Gradient Fade */}
        <div className="absolute left-0 top-0 bottom-0 w-12 lg:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        
        {/* Right Gradient Fade */}
        <div className="absolute right-0 top-0 bottom-0 w-12 lg:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Continuous Scroll Container */}
        <div className="overflow-hidden">
          <div 
            className="flex gap-4 lg:gap-6 animate-scroll"
            style={{ width: 'max-content' }}
          >
            {/* First set of cards */}
            {adFormats.map((format) => (
              <AdFormatCard key={`1-${format.name}`} format={format} t={t} />
            ))}
            
            {/* Duplicated set for seamless loop */}
            {adFormats.map((format) => (
              <AdFormatCard key={`2-${format.name}`} format={format} t={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
