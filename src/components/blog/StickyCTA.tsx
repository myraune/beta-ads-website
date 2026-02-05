import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Play, ArrowRight } from "lucide-react";

interface StickyCTAProps {
  language: string;
}

const ctaTranslations = {
  en: {
    headline: "Ready to advertise on Twitch?",
    subheadline: "Reach Gen Z audiences with native overlay ads",
    bookCall: "Book a Call",
    watchDemo: "Watch Demo",
    or: "or",
  },
  no: {
    headline: "Klar for Twitch-annonsering?",
    subheadline: "Nå Gen Z med native overlay-annonser",
    bookCall: "Book et møte",
    watchDemo: "Se demo",
    or: "eller",
  },
  sv: {
    headline: "Redo för Twitch-reklam?",
    subheadline: "Nå Gen Z med native overlay-annonser",
    bookCall: "Boka ett samtal",
    watchDemo: "Se demo",
    or: "eller",
  },
  fi: {
    headline: "Valmis Twitch-mainontaan?",
    subheadline: "Tavoita Gen Z native overlay-mainoksilla",
    bookCall: "Varaa puhelu",
    watchDemo: "Katso demo",
    or: "tai",
  },
};

export const StickyCTA: React.FC<StickyCTAProps> = ({ language }) => {
  const t = ctaTranslations[language as keyof typeof ctaTranslations] || ctaTranslations.en;

  return (
    <div className="sticky top-24 p-6 rounded-2xl bg-card/60 backdrop-blur-sm border border-border/50 shadow-lg shadow-black/5">
      <h3 className="text-lg font-semibold text-foreground mb-2">
        {t.headline}
      </h3>
      <p className="text-sm text-muted-foreground mb-6">
        {t.subheadline}
      </p>
      
      <a
        href="https://calendar.app.google/coW5NLQJtLxfRer19"
        target="_blank"
        rel="noopener noreferrer"
        className="block mb-3"
      >
        <Button className="w-full gap-2" size="lg">
          <Calendar className="w-4 h-4" />
          {t.bookCall}
        </Button>
      </a>
      
      <div className="flex items-center gap-3 mb-3">
        <div className="flex-1 h-px bg-border/50" />
        <span className="text-xs text-muted-foreground">{t.or}</span>
        <div className="flex-1 h-px bg-border/50" />
      </div>
      
      <Link to="/demo" className="block">
        <Button variant="outline" className="w-full gap-2" size="lg">
          <Play className="w-4 h-4" />
          {t.watchDemo}
        </Button>
      </Link>
    </div>
  );
};

export const InlineCTA: React.FC<StickyCTAProps> = ({ language }) => {
  const t = ctaTranslations[language as keyof typeof ctaTranslations] || ctaTranslations.en;

  return (
    <div className="lg:hidden my-10 p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-1">
            {t.headline}
          </h3>
          <p className="text-sm text-muted-foreground">
            {t.subheadline}
          </p>
        </div>
        <a
          href="https://calendar.app.google/coW5NLQJtLxfRer19"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="gap-2 whitespace-nowrap">
            {t.bookCall}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </a>
      </div>
    </div>
  );
};

export default StickyCTA;
