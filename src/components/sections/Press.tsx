import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

interface PressArticle {
  title: string;
  subtitle: string;
  publication: "Kampanje" | "Kom24";
  url: string;
  image: string;
}

const pressArticles: PressArticle[] = [
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

const AUTO_PLAY_INTERVAL = 5000;

interface PressProps {
  t: any;
}

export const Press: React.FC<PressProps> = ({ t }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const activeArticle = pressArticles[activeIndex];

  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % pressArticles.length);
    }, AUTO_PLAY_INTERVAL);

    return () => clearInterval(interval);
  }, [isHovered]);

  const isKampanje = activeArticle.publication === "Kampanje";

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
            {t.pressTitle || "Featured in Press"}
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            {t.pressDescription || "What the media is saying about Beta Ads"}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 lg:mb-14">
          {pressArticles.map((article, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeIndex === index
                  ? "bg-primary text-primary-foreground"
                  : "bg-card/50 text-muted-foreground hover:bg-card hover:text-foreground border border-border/50"
              }`}
            >
              {article.publication}
            </button>
          ))}
        </div>

        {/* Active Article Display */}
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="space-y-6 cursor-pointer group"
              onClick={() => window.open(activeArticle.url, "_blank")}
            >
              {/* Image Preview */}
              <div className="relative rounded-xl overflow-hidden border border-border/50 bg-card/30 transition-all duration-300 group-hover:border-primary/50">
                <img
                  src={activeArticle.image}
                  alt={activeArticle.title}
                  className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                />
                {/* Publication badge */}
                <div className="absolute top-4 left-4">
                  <Badge
                    className={`text-xs font-medium ${
                      isKampanje
                        ? "bg-primary/90 text-primary-foreground border-primary/50"
                        : "bg-green-500/90 text-white border-green-500/50"
                    }`}
                  >
                    {activeArticle.publication}
                  </Badge>
                </div>
              </div>

              {/* Article Info */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-2">
                <div>
                  <h3 className="text-xl lg:text-2xl font-medium text-foreground mb-1 group-hover:text-primary transition-colors">
                    {activeArticle.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {activeArticle.subtitle}
                  </p>
                </div>
                <div className="flex-shrink-0 flex items-center gap-2 text-muted-foreground text-sm group-hover:text-primary transition-colors">
                  <ExternalLink className="h-4 w-4" />
                  <span>Les mer</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Quick navigation dots */}
        <div className="flex justify-center gap-2 mt-10">
          {pressArticles.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "bg-primary w-6"
                  : "bg-border hover:bg-muted-foreground"
              }`}
              aria-label={`View article ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
