import React from "react";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

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

const PressCard: React.FC<{ article: PressArticle; t: any }> = ({ article, t }) => {
  const isKampanje = article.publication === "Kampanje";

  return (
    <div
      className="flex-shrink-0 w-[280px] sm:w-[340px] lg:w-[400px] group cursor-pointer"
      onClick={() => window.open(article.url, "_blank")}
    >
      <div className="relative rounded-xl overflow-hidden border border-border/30 bg-card/50 backdrop-blur-sm transition-all duration-500 group-hover:border-primary/50 group-hover:shadow-lg group-hover:shadow-primary/10">
        {/* Article image */}
        <div className="aspect-video overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Text overlay - visible on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-4 sm:p-6">
          <Badge
            className={`mb-3 w-fit text-xs font-light ${
              isKampanje
                ? "bg-primary/20 text-primary border-primary/30"
                : "bg-green-500/20 text-green-400 border-green-500/30"
            }`}
          >
            {article.publication}
          </Badge>
          <h3 className="text-base sm:text-lg font-light text-foreground mb-2 tracking-wide leading-tight">
            {article.title}
          </h3>
          <p className="text-muted-foreground text-sm font-extralight leading-relaxed">
            {article.subtitle}
          </p>
          <div className="mt-3 flex items-center text-muted-foreground text-xs">
            <ExternalLink className="h-3 w-3 mr-1" />
            <span>{t.readMore || "Read more"}</span>
          </div>
        </div>

        {/* Publication badge - always visible */}
        <div className="absolute top-3 left-3 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
          <Badge
            className={`text-xs font-light ${
              isKampanje
                ? "bg-primary/80 text-primary-foreground border-primary/50"
                : "bg-green-500/80 text-white border-green-500/50"
            }`}
          >
            {article.publication}
          </Badge>
        </div>
      </div>
    </div>
  );
};

interface PressProps {
  t: any;
}

export const Press: React.FC<PressProps> = ({ t }) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section ref={ref} className="py-16 lg:py-24 relative overflow-hidden">
      {/* Header */}
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 mb-10">
        <h2 className="text-2xl lg:text-3xl font-light text-foreground mb-2">
          {t.pressTitle || "Featured in Press"}
        </h2>
        <p className="text-muted-foreground text-base max-w-md">
          {t.pressDescription || "What the media is saying about Beta Ads"}
        </p>
      </div>

      {/* Carousel */}
      <div className="relative">
        {/* Gradient fades */}
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Scrolling container */}
        <div
          className={`flex gap-6 sm:gap-8 px-6 lg:px-8 ${
            isVisible ? "animate-scroll" : ""
          } hover:[animation-play-state:paused]`}
          style={{ width: "max-content" }}
        >
          {/* First set */}
          {pressArticles.map((article, index) => (
            <PressCard key={`press-${index}`} article={article} t={t} />
          ))}
          {/* Duplicate for seamless loop */}
          {pressArticles.map((article, index) => (
            <PressCard key={`press-dup-${index}`} article={article} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
};
