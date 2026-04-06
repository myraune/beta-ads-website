import React from "react";
import { SEO } from "@/components/SEO";
import { ExternalLink } from "lucide-react";
import { SPFooter } from "@/components/sections/SPFooter";

const pressArticles = [
  {
    title: "Odelsgutten Andreas (22) satser på Twitch-reklame fra Chicago",
    subtitle: "– Vil tjene penger",
    publication: "Frostingen",
    date: "April 2026",
    url: "https://www.frostingen.no/odelsgutten-andreas-22-satser-pa-twitch-reklame-fra-chicago-vil-tjene-penger/s/5-166-56722",
    image: "/lovable-uploads/press-frostingen-chicago.jpg",
  },
  {
    title: "Andreas (22) startet byrå ved siden av studiene",
    subtitle: "Nå utvider han til Sverige og Finland",
    publication: "Kampanje",
    date: "May 2025",
    url: "https://kampanje.com/premium/mai-2025/innsikt/andreas-22-startet-byra-ved-siden-av-studiene--na-utvider-han-til-sverige-og-finland/",
    image: "/lovable-uploads/press-kampanje-expansion-new.png",
  },
  {
    title: "Andreas (21) satser på eget Twitch-byrå",
    subtitle: "Nå får han polske tech-krefter i ryggen",
    publication: "Kampanje",
    date: "September 2024",
    url: "https://kampanje.com/premium/september-2024/innsikt/andreas-21-satser-pa-eget-twtich-byra--na-far-han-polske-tech-krefter-i-ryggen---har-lagt-grunnlaget-na/",
    image: "/lovable-uploads/press-kampanje-startup.png",
  },
  {
    title: "Ny kanal for mediekjøp",
    subtitle: "Beta er Norges nye Twitch-byrå",
    publication: "Kom24",
    date: "2024",
    url: "https://www.kom24.no/andreas-myraune-beta-influensere/ny-kanal-for-mediekjop-beta-er-norges-nye-twitch-byra/730424",
    image: "/lovable-uploads/press-kom24-twitch.png",
  },
  {
    title: "Instreamly og Beta inngår partnerskap",
    subtitle: "Strategisk samarbeid i Norge",
    publication: "Kom24",
    date: "2024",
    url: "https://www.kom24.no/andreas-myraune-beta-instreamly/instreamly-og-beta-inngar-partnerskap-i-norge/749907",
    image: "/lovable-uploads/press-kampanje-expansion.png",
  },
];

const Press: React.FC = () => {
  return (
    <>
      <SEO
        title="Press & Media Coverage | Beta Ads"
        description="Beta Ads in the media. Featured in Kampanje, Kom24, and leading Nordic publications covering Twitch advertising innovation."
        canonical="/press"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Press & Media Coverage - Beta Ads",
          "description": "Beta Ads press coverage and media mentions from leading Nordic publications.",
          "url": "https://beta-ads.no/press",
          "isPartOf": { "@id": "https://beta-ads.no/#website" }
        }}
      />
      <div className="max-w-6xl mx-auto px-6 lg:px-8 pt-32 md:pt-40 pb-20">
        <div className="mb-14">
          <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
            Press
          </span>
          <h1 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-4">
            Beta Ads in the media
          </h1>
          <p className="text-muted-foreground max-w-lg">
            Featured in leading Nordic publications covering advertising,
            technology, and media.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {pressArticles.map((article, i) => (
            <a
              key={i}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-border bg-card overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all duration-300"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-primary text-xs font-semibold uppercase tracking-widest">
                    {article.publication}
                  </p>
                  {article.date && (
                    <p className="text-muted-foreground text-[10px] uppercase tracking-widest">
                      {article.date}
                    </p>
                  )}
                </div>
                <h2 className="text-base font-semibold text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-2">
                  {article.title}
                </h2>
                <p className="text-muted-foreground text-sm line-clamp-1 mb-3">
                  {article.subtitle}
                </p>
                <span className="flex items-center gap-1 text-sm text-muted-foreground group-hover:text-primary transition-colors">
                  Read article <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
      <SPFooter />
    </>
  );
};

export default Press;
