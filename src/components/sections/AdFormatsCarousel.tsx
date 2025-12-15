import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface AdFormat {
  name: string;
  dimensions: string;
  description: string;
  image: string;
}

const adFormats: AdFormat[] = [
  {
    name: "Video Format",
    dimensions: "640 × 360 px",
    description: "In-stream video ads that blend natively into the broadcast.",
    image: "/lovable-uploads/videoDemo1.png",
  },
  {
    name: "Side Bar",
    dimensions: "300 × 1080 px",
    description: "Vertical ad placement alongside the stream.",
    image: "/lovable-uploads/sideBarDemo1.png",
  },
  {
    name: "Snipe",
    dimensions: "1920 × 250 px",
    description: "Horizontal banner overlay. High visibility.",
    image: "/lovable-uploads/snipeDemo1.png",
  },
  {
    name: "Rich Media",
    dimensions: "1920 × 1080 px",
    description: "Full-screen takeover. Premium experience.",
    image: "/lovable-uploads/richMediaDemo1.png",
  },
  {
    name: "Poll",
    dimensions: "Dynamic",
    description: "Interactive poll overlay. Direct engagement.",
    image: "/lovable-uploads/pollDemo1.png",
  },
  {
    name: "Interactive",
    dimensions: "Dynamic",
    description: "Rich media with clickable elements.",
    image: "/lovable-uploads/interactiveDemo1.png",
  },
];

export const AdFormatsCarousel: React.FC = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation();
  const [emblaRef] = useEmblaCarousel(
    {
      align: "start",
      loop: true,
      dragFree: true,
      containScroll: false,
    },
    [
      Autoplay({
        delay: 3000,
        stopOnMouseEnter: true,
        stopOnInteraction: false,
      }),
    ]
  );

  return (
    <section 
      ref={sectionRef}
      className={`py-16 lg:py-24 overflow-hidden transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
    >
      {/* Section Header */}
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 mb-10">
        <h2 className="text-2xl lg:text-3xl font-light text-foreground mb-2">
          Ad Formats
        </h2>
        <p className="text-muted-foreground text-base max-w-md">
          Native advertising designed for live streaming
        </p>
      </div>

      {/* Carousel Container - Full Width */}
      <div className="relative">
        {/* Left Gradient Fade */}
        <div className="absolute left-0 top-0 bottom-0 w-12 lg:w-24 bg-gradient-to-r from-[hsl(222,20%,4%)/90] to-transparent z-10 pointer-events-none" />
        
        {/* Right Gradient Fade */}
        <div className="absolute right-0 top-0 bottom-0 w-12 lg:w-24 bg-gradient-to-l from-[hsl(222,20%,4%)/90] to-transparent z-10 pointer-events-none" />

        {/* Embla Viewport */}
        <div ref={emblaRef} className="overflow-hidden cursor-grab active:cursor-grabbing">
          <div className="flex gap-4 lg:gap-6 pl-6 lg:pl-12">
            {adFormats.map((format) => (
              <div
                key={format.name}
                className="flex-shrink-0 w-[280px] sm:w-[340px] lg:w-[400px] group"
              >
                {/* Card */}
                <div className="relative rounded-xl overflow-hidden border border-border/30 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10">
                  {/* Image */}
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={format.image}
                      alt={`${format.name} preview`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  
                  {/* Overlay with Format Info - Enhanced hover reveal */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/90 to-transparent p-4 pt-16 transition-all duration-300 group-hover:from-background/95 group-hover:via-background/85">
                    {/* Dimensions Badge - Slides in on hover */}
                    <div className="overflow-hidden mb-2">
                      <span className="inline-block text-xs font-mono text-primary/80 bg-primary/10 px-2 py-0.5 rounded transform transition-all duration-300 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                        {format.dimensions}
                      </span>
                    </div>
                    
                    <h3 className="text-foreground font-medium text-lg mb-1 transition-transform duration-300 group-hover:-translate-y-0.5">
                      {format.name}
                    </h3>
                    
                    {/* Description - Expands on hover */}
                    <p className="text-muted-foreground text-sm transition-all duration-300 line-clamp-1 group-hover:line-clamp-none">
                      {format.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {/* End Spacer */}
            <div className="flex-shrink-0 w-6 lg:w-12" />
          </div>
        </div>
      </div>

    </section>
  );
};
