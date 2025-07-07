import React from "react";
import { Button } from "@/components/ui/button";
import { TrendingUp, ExternalLink } from "lucide-react";

interface StreamerSectionProps {
  t: any;
  language: string;
}

export const StreamerSection: React.FC<StreamerSectionProps> = ({ t, language }) => (
  <section id="streamer-section" className="py-32 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <div className="max-w-7xl mx-auto px-8 lg:px-12">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-6xl font-extralight mb-6 tracking-tighter text-gray-900 dark:text-gray-100">
          {t.streamerSectionTitle}
        </h2>
        <p className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 font-light mb-8 tracking-wide">
          {t.streamerSectionSubtitle}
        </p>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-extralight leading-relaxed tracking-wide">
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
          className="border-gray-400 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 bg-gray-50 dark:bg-gray-800/50 px-12 py-6 text-lg font-light tracking-wide h-auto transition-all duration-300 hover:border-gray-500 dark:hover:border-gray-500"
          onClick={() => window.open("https://discord.gg/hNgHCbQUvb", "_blank")}
        >
          Join Our Discord
          <ExternalLink className="ml-4 h-5 w-5" />
        </Button>
      </div>

      <div className="text-center">
        <div className="inline-flex items-center space-x-3 bg-gray-100 dark:bg-gray-800 rounded-2xl px-8 py-4 border border-gray-200 dark:border-gray-700">
          <TrendingUp className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          <span className="text-gray-700 dark:text-gray-300 font-light text-lg tracking-wide">
            {language === "en"
              ? "Earn passive income based on your viewership"
              : "Tjen passiv inntekt basert på dine seertall"}
          </span>
        </div>
      </div>
    </div>
  </section>
);