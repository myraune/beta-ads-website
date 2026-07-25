import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Play, ArrowRight, Zap, TrendingUp } from "lucide-react";

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
    howItWorks: "How Twitch advertising works",
    whatItCosts: "What it costs",
  },
  no: {
    headline: "Klar for Twitch-annonsering?",
    subheadline: "Nå Gen Z med native overlay-annonser",
    bookCall: "Book et møte",
    watchDemo: "Se demo",
    or: "eller",
    howItWorks: "Slik fungerer Twitch-annonsering",
    whatItCosts: "Hva det koster",
  },
  sv: {
    headline: "Redo för Twitch-reklam?",
    subheadline: "Nå Gen Z med native overlay-annonser",
    bookCall: "Boka ett samtal",
    watchDemo: "Se demo",
    or: "eller",
    howItWorks: "Så fungerar Twitch-reklam",
    whatItCosts: "Vad det kostar",
  },
  fi: {
    headline: "Valmis Twitch-mainontaan?",
    subheadline: "Tavoita Gen Z native overlay-mainoksilla",
    bookCall: "Varaa puhelu",
    watchDemo: "Katso demo",
    or: "tai",
    howItWorks: "Näin Twitch-mainonta toimii",
    whatItCosts: "Mitä se maksaa",
  },
};

const streamerCtaTranslations = {
  en: {
    headline: "Earn passive income from your stream",
    subheadline: "Non-intrusive native overlay ads. No scripts. No interruptions.",
    joinStreamer: "Join as Streamer",
    seeEarnings: "See How It Works",
    or: "or",
    badge: "Free to join",
  },
  no: {
    headline: "Tjen passiv inntekt fra streamen din",
    subheadline: "Ikke-påtrengende native overlay-annonser. Ingen manus. Ingen avbrudd.",
    joinStreamer: "Bli med som streamer",
    seeEarnings: "Se hvordan det fungerer",
    or: "eller",
    badge: "Gratis å bli med",
  },
  sv: {
    headline: "Tjäna passiv inkomst från din stream",
    subheadline: "Icke-påträngande native overlay-annonser. Inga manus. Inga avbrott.",
    joinStreamer: "Gå med som streamer",
    seeEarnings: "Se hur det fungerar",
    or: "eller",
    badge: "Gratis att gå med",
  },
  fi: {
    headline: "Ansaitse passiivisia tuloja striimauksesta",
    subheadline: "Ei-tunkeilevat native overlay-mainokset. Ei käsikirjoituksia. Ei keskeytyksiä.",
    joinStreamer: "Liity streamaajana",
    seeEarnings: "Katso miten se toimii",
    or: "tai",
    badge: "Ilmainen liittyminen",
  },
};

export const StickyCTA: React.FC<StickyCTAProps> = ({ language }) => {
  const t = ctaTranslations[language as keyof typeof ctaTranslations] || ctaTranslations.en;

  return (
    <div className="p-6 rounded-2xl bg-card/60 backdrop-blur-sm border border-border/50 shadow-lg shadow-black/5">
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

      {/* Lower-commitment next steps for cold readers - a path to the product
          and cost pages instead of only the calendar. */}
      <div className="mt-5 pt-4 border-t border-border/50 flex flex-col gap-2.5">
        <Link
          to="/twitch-advertising"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowRight className="w-3.5 h-3.5" />
          {t.howItWorks}
        </Link>
        <Link
          to="/twitch-advertising-cost"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowRight className="w-3.5 h-3.5" />
          {t.whatItCosts}
        </Link>
      </div>
    </div>
  );
};

export const StreamerStickyCTA: React.FC<StickyCTAProps> = ({ language }) => {
  const t = streamerCtaTranslations[language as keyof typeof streamerCtaTranslations] || streamerCtaTranslations.en;

  return (
    <div className="rounded-2xl overflow-hidden border border-border/50 shadow-lg shadow-black/5">
      <div className="bg-gradient-to-br from-primary to-primary/80 p-5">
        <span className="inline-block text-xs font-semibold bg-white/20 text-white px-2.5 py-0.5 rounded-full mb-3">
          {t.badge}
        </span>
        <h3 className="text-base font-bold text-white mb-1 leading-snug">
          {t.headline}
        </h3>
        <p className="text-sm text-white/80">
          {t.subheadline}
        </p>
      </div>
      <div className="bg-card p-5 flex flex-col gap-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <TrendingUp className="w-3.5 h-3.5 text-primary" />
          <span>39,000+ streamers already earning</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Zap className="w-3.5 h-3.5 text-primary" />
          <span>Ads run automatically - no effort</span>
        </div>
        <Link to="/streamers" className="block mt-1">
          <Button className="w-full gap-2" size="lg">
            {t.joinStreamer}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
        <Link to="/case-studies" className="block">
          <Button variant="outline" className="w-full gap-2" size="sm">
            {t.seeEarnings}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export const InlineCTA: React.FC<StickyCTAProps> = ({ language }) => {
  const t = ctaTranslations[language as keyof typeof ctaTranslations] || ctaTranslations.en;

  return (
    <div className="lg:hidden my-10 rounded-2xl bg-foreground text-background p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-1">
            {t.headline}
          </h3>
          <p className="text-sm text-background/60">
            {t.subheadline}
          </p>
        </div>
        <a
          href="https://calendar.app.google/coW5NLQJtLxfRer19"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 whitespace-nowrap gap-2">
            {t.bookCall}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </a>
      </div>
      {/* Lower-commitment paths for cold readers */}
      <div className="mt-5 pt-4 border-t border-background/15 flex flex-wrap gap-x-6 gap-y-2">
        <Link to="/twitch-advertising" className="inline-flex items-center gap-1.5 text-sm text-background/70 hover:text-background transition-colors">
          <ArrowRight className="w-3.5 h-3.5" />
          {t.howItWorks}
        </Link>
        <Link to="/twitch-advertising-cost" className="inline-flex items-center gap-1.5 text-sm text-background/70 hover:text-background transition-colors">
          <ArrowRight className="w-3.5 h-3.5" />
          {t.whatItCosts}
        </Link>
      </div>
    </div>
  );
};

export const StreamerInlineCTA: React.FC<StickyCTAProps> = ({ language }) => {
  const t = streamerCtaTranslations[language as keyof typeof streamerCtaTranslations] || streamerCtaTranslations.en;

  return (
    <div className="lg:hidden my-10 rounded-2xl overflow-hidden border border-primary/20">
      <div className="bg-gradient-to-r from-primary to-primary/80 p-5">
        <h3 className="text-lg font-bold text-white mb-1">{t.headline}</h3>
        <p className="text-sm text-white/80">{t.subheadline}</p>
      </div>
      <div className="bg-card/80 p-5 flex flex-col sm:flex-row items-center gap-3">
        <div className="flex-1 flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <TrendingUp className="w-3.5 h-3.5 text-primary" />
            <span>39,000+ streamers already earning</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Zap className="w-3.5 h-3.5 text-primary" />
            <span>Ads run automatically - no effort</span>
          </div>
        </div>
        <Link to="/streamers">
          <Button className="gap-2 whitespace-nowrap">
            {t.joinStreamer}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default StickyCTA;
