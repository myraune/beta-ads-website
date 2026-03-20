import React from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { AnimatedTabs } from "@/components/ui/animated-tabs";
import type { Tab } from "@/components/ui/animated-tabs";

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
    description: "In-stream video ads that blend natively into the broadcast. High completion rates with unskippable, non-intrusive placements.",
    bestFor: "Story-driven campaigns",
    image: "/lovable-uploads/videoDemo1.png",
  },
  {
    name: "Snipe Banner",
    dimensions: "1920 × 250 px",
    description: "Horizontal banner overlay with high visibility. Appears at key moments during the stream for maximum impact.",
    bestFor: "Awareness, product launches",
    image: "/lovable-uploads/snipeDemo1.png",
  },
  {
    name: "Side Bar",
    dimensions: "300 × 1080 px",
    description: "Vertical ad placement alongside the stream. Always visible without disrupting the viewing experience.",
    bestFor: "Persistent brand presence",
    image: "/lovable-uploads/sideBarDemo1.png",
  },
  {
    name: "Rich Media",
    dimensions: "1920 × 1080 px",
    description: "Full-screen takeover with premium visual experience. Creates memorable brand moments that viewers remember.",
    bestFor: "Engagement, interactive campaigns",
    image: "/lovable-uploads/richMediaDemo1.png",
  },
  {
    name: "Poll",
    dimensions: "Dynamic",
    description: "Interactive poll overlay that drives direct viewer engagement. Viewers participate in real-time decision making.",
    bestFor: "Direct conversions, promo codes",
    image: "/lovable-uploads/pollDemo1.png",
  },
  {
    name: "Interactive",
    dimensions: "1920 × 1080 px",
    description: "Rich media with clickable elements and interactive overlays. Viewers engage directly with the ad content.",
    bestFor: "Full-screen brand moments",
    image: "/lovable-uploads/interactiveDemo1.png",
  },
];

const adFormatTabs: Tab[] = adFormats.map((format) => ({
  id: format.name.toLowerCase().replace(/\s+/g, "-"),
  label: format.name,
  content: (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full h-full">
      <img
        src={format.image}
        alt={`${format.name} preview`}
        className="rounded-lg w-full h-60 object-cover !m-0 shadow-[0_0_20px_rgba(0,0,0,0.2)] border-none"
      />
      <div className="flex flex-col gap-y-2">
        <div className="flex items-center gap-2 flex-wrap">
          <h2 className="text-2xl font-bold text-white !m-0">
            {format.name}
          </h2>
          <span className="text-xs font-mono text-primary/80 bg-primary/15 px-2 py-0.5 rounded">
            {format.dimensions}
          </span>
        </div>
        <p className="text-sm text-gray-200 mt-1">
          {format.description}
        </p>
        <p className="text-primary text-xs font-medium mt-2">
          Best for: {format.bestFor}
        </p>
      </div>
    </div>
  ),
}));

export const AdFormatsCarousel: React.FC<AdFormatsCarouselProps> = ({ t }) => {
  const { ref: sectionRef, isVisible } = useScrollAnimation();

  return (
    <section
      ref={sectionRef}
      className={`py-16 lg:py-24 transition-[opacity,transform] duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
    >
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-10">
          <h2 className="text-2xl lg:text-3xl font-light text-foreground mb-2">
            {t.adFormatsTitle || "Ad Formats"}
          </h2>
          <p className="text-muted-foreground text-base max-w-md">
            {t.adFormatsSubtitle || "Native advertising designed for live streaming"}
          </p>
        </div>

        {/* Animated Tabs */}
        <AnimatedTabs
          tabs={adFormatTabs}
          defaultTab="video"
          className="max-w-3xl"
        />
      </div>
    </section>
  );
};
