import React from "react";
import { StreamerHero } from "@/components/sections/StreamerHero";
import { StreamerBrands } from "@/components/sections/StreamerBrands";
import { StreamerHowItWorks } from "@/components/sections/StreamerHowItWorks";
import { StreamerWhatYouGet } from "@/components/sections/StreamerWhatYouGet";
import { EarningsCalculator } from "@/components/sections/EarningsCalculator";
import { StreamerCTA } from "@/components/sections/StreamerCTA";

interface StreamerSectionProps {
  t: any;
  language: string;
}

export const StreamerSection: React.FC<StreamerSectionProps> = () => {
  return (
    <div className="relative overflow-hidden">
      {/* 1. Hero - Matches homepage style */}
      <StreamerHero />

      {/* 2. Brand logos */}
      <StreamerBrands />

      {/* 3. How it works - Same style as homepage */}
      <StreamerHowItWorks />

      {/* 4. What you get - Clear feature grid */}
      <StreamerWhatYouGet />

      {/* 5. Earnings Calculator */}
      <EarningsCalculator />

      {/* 6. Final CTA */}
      <StreamerCTA />
    </div>
  );
};
