import React from "react";
import { StreamerHero } from "@/components/sections/StreamerHero";
import { StreamerExperience } from "@/components/sections/StreamerExperience";
import { EarningsCalculator } from "@/components/sections/EarningsCalculator";
import { StreamerDashboardPreview } from "@/components/sections/StreamerDashboardPreview";
import { StreamerSocialProof } from "@/components/sections/StreamerSocialProof";
import { StreamerCTA } from "@/components/sections/StreamerCTA";

interface StreamerSectionProps {
  t: any;
  language: string;
}

export const StreamerSection: React.FC<StreamerSectionProps> = () => {
  return (
    <div className="relative overflow-hidden">
      {/* 1. Hero - Full-width with animated preview */}
      <StreamerHero />

      {/* 2. How it works - Interactive step-by-step demo */}
      <StreamerExperience />

      {/* 3. Dashboard Preview - Tabbed interface */}
      <StreamerDashboardPreview />

      {/* 4. Earnings Calculator */}
      <EarningsCalculator />

      {/* 5. Social Proof - Testimonials & stats */}
      <StreamerSocialProof />

      {/* 6. Final CTA */}
      <StreamerCTA />
    </div>
  );
};
