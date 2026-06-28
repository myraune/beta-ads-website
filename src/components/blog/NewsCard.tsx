import React from "react";
import { ExternalLink } from "lucide-react";

export interface NewsArticle {
  title: string;
  url: string;
  source: string;
  date: string;
  summary?: string;
  ogImage?: string | null;
}

interface Props {
  article: NewsArticle;
}

/**
 * Kort som viser et ekte nyhets-/presseoppslag om en streamer.
 * Bruker artikkelens OG-bilde (lastet ned lokalt) som forhåndsvisning, eller
 * en kilde-merket gradient-bakgrunn som fallback hvis bildet ikke finnes.
 */
export const NewsCard: React.FC<Props> = ({ article }) => {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-xl overflow-hidden border border-border/60 bg-card/40 hover:border-primary/40 hover:bg-card/70 transition-colors"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-muted">
        {article.ogImage ? (
          <img
            src={article.ogImage}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          // Fallback: kilde-merket gradient-flate så kortet fortsatt har visuell vekt
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 via-muted to-foreground/5">
            <span className="text-2xl font-light tracking-tight text-foreground/35 px-6 text-center">
              {article.source}
            </span>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/65 to-transparent pointer-events-none" />
        <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between gap-2">
          <span className="text-[10px] font-semibold tracking-widest uppercase text-white/95 truncate">
            {article.source}
          </span>
          {article.date && article.date !== "ukjent" && (
            <span className="text-[10px] font-medium text-white/75 tabular-nums shrink-0">
              {article.date}
            </span>
          )}
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-sm font-semibold text-foreground leading-snug mb-2 group-hover:text-primary transition-colors">
          {article.title}
        </h3>
        {article.summary && (
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
            {article.summary}
          </p>
        )}
        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-primary/80 group-hover:text-primary mt-3">
          Les hos {article.source}
          <ExternalLink className="w-3 h-3" />
        </span>
      </div>
    </a>
  );
};

export default NewsCard;
