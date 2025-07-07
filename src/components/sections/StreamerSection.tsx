import React from "react";
import { Button } from "@/components/ui/button";
import { TrendingUp, ExternalLink } from "lucide-react";

interface StreamerSectionProps {
  t: any;
  language: string;
}

export const StreamerSection: React.FC<StreamerSectionProps> = ({ t, language }) => (
  <section id="streamer-section" className="py-32 bg-white text-gray-900">
    <div className="max-w-7xl mx-auto px-8 lg:px-12">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-6xl font-extralight mb-6 tracking-tighter text-gray-900">
          {t.streamerSectionTitle}
        </h2>
        <p className="text-2xl md:text-3xl text-gray-700 font-light mb-8 tracking-wide">
          {t.streamerSectionSubtitle}
        </p>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto font-extralight leading-relaxed tracking-wide">
          {t.streamerSectionDescription}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-16">
        <Button
          size="lg"
          className="bg-red-400 text-white hover:bg-red-500 px-12 py-6 text-lg font-light tracking-wide h-auto shadow-2xl hover:shadow-red-400/20 transition-all duration-300 hover:scale-105"
          onClick={() => window.open("https://beta.instreamly.com/en/sponsorships/available", "_blank")}
        >
          {t.joinStreamer}
          <ExternalLink className="ml-4 h-5 w-5" />
        </Button>

        <Button
          size="lg"
          variant="outline"
          className="border-border text-card-foreground hover:bg-secondary bg-secondary/50 px-12 py-6 text-lg font-light tracking-wide h-auto transition-all duration-300 hover:border-muted"
          onClick={() => window.open("https://discord.gg/hNgHCbQUvb", "_blank")}
        >
          Join Our Discord
          <ExternalLink className="ml-4 h-5 w-5" />
        </Button>
      </div>

      <div className="text-center">
        <div className="inline-flex items-center space-x-3 bg-secondary rounded-2xl px-8 py-4 border border-border">
          <TrendingUp className="h-6 w-6 text-muted-foreground" />
          <span className="text-secondary-foreground font-light text-lg tracking-wide">
            {language === "en"
              ? "Earn passive income based on your viewership"
              : "Tjen passiv inntekt basert på dine seertall"}
          </span>
        </div>
      </div>
    </div>
  </section>
);