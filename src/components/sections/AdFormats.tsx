import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AdFormat {
  name: string;
  dimensions: string;
  description: string;
  image: string;
}

const adFormats: AdFormat[] = [
  {
    name: "Video",
    dimensions: "640 × 360 px",
    description: "In-stream video ads that blend natively into the broadcast.",
    image: "/lovable-uploads/videoDemo1.png",
  },
  {
    name: "Snipe",
    dimensions: "1920 × 250 px",
    description: "Horizontal banner overlay. Time-based, high visibility.",
    image: "/lovable-uploads/snipeDemo1.png",
  },
  {
    name: "Side Bar",
    dimensions: "300 × 1080 px",
    description: "Vertical ad placement alongside the stream. Native to the interface.",
    image: "/lovable-uploads/sideBarDemo1.png",
  },
  {
    name: "Rich Media",
    dimensions: "1920 × 1080 px",
    description: "Full-screen takeover. Premium, immersive experience.",
    image: "/lovable-uploads/richMediaDemo1.png",
  },
  {
    name: "Poll",
    dimensions: "Dynamic",
    description: "Interactive poll overlay. Viewers engage directly with the brand.",
    image: "/lovable-uploads/pollDemo1.png",
  },
  {
    name: "Interactive",
    dimensions: "Dynamic",
    description: "Rich media with clickable elements. Fully engaging.",
    image: "/lovable-uploads/interactiveDemo1.png",
  },
];

const AUTO_PLAY_INTERVAL = 4000;

export const AdFormats: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const activeFormat = adFormats[activeIndex];

  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % adFormats.length);
    }, AUTO_PLAY_INTERVAL);

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <section 
      className="py-20 lg:py-32 bg-transparent"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-medium text-foreground mb-4">
            Ad Formats
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Native advertising formats designed for live streaming
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 lg:mb-14">
          {adFormats.map((format, index) => (
            <button
              key={format.name}
              onClick={() => setActiveIndex(index)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeIndex === index
                  ? "bg-primary text-primary-foreground"
                  : "bg-card/50 text-muted-foreground hover:bg-card hover:text-foreground border border-border/50"
              }`}
            >
              {format.name}
            </button>
          ))}
        </div>

        {/* Active Format Display */}
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="space-y-6"
            >
              {/* Image Preview */}
              <div className="relative rounded-xl overflow-hidden border border-border/50 bg-card/30">
                <img
                  src={activeFormat.image}
                  alt={`${activeFormat.name} preview`}
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>

              {/* Format Info */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-2">
                <div>
                  <h3 className="text-xl lg:text-2xl font-medium text-foreground mb-1">
                    {activeFormat.name}
                  </h3>
                  <p className="text-muted-foreground">
                    {activeFormat.description}
                  </p>
                </div>
                <div className="flex-shrink-0 px-4 py-2 bg-card/50 rounded-lg border border-border/50">
                  <span className="text-muted-foreground text-sm">Dimensions: </span>
                  <span className="text-foreground font-mono text-sm">
                    {activeFormat.dimensions}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Quick navigation dots */}
        <div className="flex justify-center gap-2 mt-10">
          {adFormats.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "bg-primary w-6"
                  : "bg-border hover:bg-muted-foreground"
              }`}
              aria-label={`View format ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
