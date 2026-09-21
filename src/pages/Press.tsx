import React, { useState } from "react";
import { SEO } from "@/components/SEO";
import { ExternalLink, Play } from "lucide-react";
import { SPFooter } from "@/components/sections/SPFooter";
import { MascotBand } from "@/components/sections/MascotBand";

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
    image: "/lovable-uploads/press-kampanje-expansion-new.webp",
  },
  {
    title: "Andreas (21) satser på eget Twitch-byrå",
    subtitle: "Nå får han polske tech-krefter i ryggen",
    publication: "Kampanje",
    date: "September 2024",
    url: "https://kampanje.com/premium/september-2024/innsikt/andreas-21-satser-pa-eget-twtich-byra--na-far-han-polske-tech-krefter-i-ryggen---har-lagt-grunnlaget-na/",
    image: "/lovable-uploads/press-kampanje-startup.jpg",
  },
  {
    title: "Ny kanal for mediekjøp",
    subtitle: "Beta er Norges nye Twitch-byrå",
    publication: "Kom24",
    date: "2024",
    url: "https://www.kom24.no/andreas-myraune-beta-influensere/ny-kanal-for-mediekjop-beta-er-norges-nye-twitch-byra/730424",
    image: "/lovable-uploads/press-kom24-twitch.jpg",
  },
  {
    title: "Instreamly og Beta inngår partnerskap",
    subtitle: "Strategisk samarbeid i Norge",
    publication: "Kom24",
    date: "2024",
    url: "https://www.kom24.no/andreas-myraune-beta-instreamly/instreamly-og-beta-inngar-partnerskap-i-norge/749907",
    image: "/lovable-uploads/press-kampanje-expansion.webp",
  },
];

/**
 * The pitch video as a card in the same grid as the articles. Poster and
 * play button until clicked; then the youtube-nocookie iframe takes the
 * poster's place, so nothing from YouTube loads on page view.
 */
const VideoCard: React.FC = () => {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="group rounded-2xl border border-border bg-card overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all duration-300">
      <div className="aspect-[16/10] overflow-hidden relative bg-black">
        {playing ? (
          <iframe
            src="https://www.youtube-nocookie.com/embed/LDBZkZ-v_W8?autoplay=1&rel=0"
            title="Beta Ads pitch: Fremtidens verdiskaper"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label="Play the Beta Ads pitch video"
            className="absolute inset-0 w-full h-full"
          >
            <img
              src="/lovable-uploads/yt-fremtidens-verdiskaper-poster.webp"
              alt="Frame from the Beta Ads pitch video"
              width={1280}
              height={720}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="w-14 h-14 rounded-full bg-white/90 text-black flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <Play className="w-6 h-6 ml-0.5" fill="currentColor" />
              </span>
            </span>
          </button>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <p className="text-primary text-xs font-semibold uppercase tracking-widest">Video</p>
          <p className="text-muted-foreground text-[10px] uppercase tracking-widest">YouTube</p>
        </div>
        <h2 className="text-base font-semibold text-foreground mb-1 line-clamp-2">
          Beta Ads pitch: Fremtidens verdiskaper
        </h2>
        <p className="text-muted-foreground text-sm line-clamp-1 mb-3">
          The Beta Ads pitch for SpareBank 1 SMN's Fremtidens Verdiskaper. In Norwegian.
        </p>
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          Watch video <Play className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

const Press: React.FC = () => {
  return (
    <>
      <SEO
        title="Press & Media Coverage | Beta Ads"
        description="Beta Ads in the press. Featured in Kampanje, Kom24, and Nordic media on Twitch advertising, native overlay ads, and livestream marketing in Norway."
        canonical="/press"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Press & Media Coverage - Beta Ads",
            "description": "Beta Ads press coverage and media mentions from leading Nordic publications.",
            "url": "https://beta-ads.no/press",
            "isPartOf": { "@id": "https://beta-ads.no/#website" }
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://beta-ads.no/" },
              { "@type": "ListItem", "position": 2, "name": "Press", "item": "https://beta-ads.no/press" }
            ]
          }
        ]}
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
          <VideoCard />
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

      {/* ── Beta ── */}
      <MascotBand
        src="/lovable-uploads/beta-mascot-press.jpg"
        alt="Beta, the Beta Ads mascot, behind a broadcast microphone"
        variant="scene"
        eyebrow="For journalists"
        heading="Writing about us? Take what you need"
        body="Beta is our mascot and he is fair game. The renders on this site are ours to give away, so use them alongside a piece rather than screenshotting the homepage. If you need a specific pose, a founder photo or a comment on the Nordic livestream market, mail us and you will get an answer the same day."
        points={[
          "Mascot renders and logo files available on request",
          "Andreas Myraune is available for comment in Norwegian or English",
          "andreas@beta-ads.no",
        ]}
        cta={{ label: "Get in touch", to: "/contact" }}
        flip
      />

      <SPFooter />
    </>
  );
};

export default Press;
