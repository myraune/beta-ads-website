import React from "react";
import { FeaturePage } from "@/components/working/FeaturePage";
import { BuildPanel } from "@/components/home-final/panels";

/* Campaign builder. Steps and options are read off the real builder screen
   (objective, target audience, format, asset, review; awareness or traffic).
   Chat command and poll: confirmed product features. */

const CampaignBuilder: React.FC = () => (
  <FeaturePage
    path="/campaign-builder"
    crumb="Campaign builder"
    seoTitle="Campaign Builder: Livestream Ad Campaigns in Five Steps | Beta Ads"
    seoDescription="Build a livestream ad campaign in one flow: objective, target audience, format, asset and review. Your creative becomes an animated overlay with its own chat command, and a poll if you want one."
    kicker="Platform · Campaign builder"
    title="Build the campaign in one flow."
    lead="Objective, target audience, format, asset and review, in five steps. Your creative becomes an animated overlay with its own chat command, and a poll if you want one."
    hero={{ src: "/lovable-uploads/platform/campaign-builder.webp", alt: "The Beta Ads campaign builder on the first step: campaign name, an awareness or traffic objective and the dates.", caption: "The campaign builder, step 1 of 5." }}
    sections={[
      {
        kicker: "Five steps",
        title: "From objective to review.",
        body: "Name the campaign, pick an objective and set the dates. Then choose the audience, the format and the asset, and review it before it goes out.",
        points: ["01 Objective: awareness or traffic", "02 Target audience", "03 Format", "04 Asset", "05 Review"],
      },
      {
        kicker: "The overlay",
        title: "An overlay with its own chat command.",
        body: "Your creative runs as an animated overlay in a corner of the stream. Viewers type !yourbrand in chat and get your link back, and you can add a poll that opens in the creator's chat.",
        visual: <div className="bf" style={{ background: "transparent" }}><BuildPanel reveal={false} /></div>,
      },
    ]}
    related={[
      ["Streamer Explorer", "Find the streamers for the campaign.", "/streamer-explorer"],
      ["Setup verification", "Every stream checked on air, every play clipped.", "/campaign-compliance"],
      ["Reporting", "A report you can forward to the client.", "/reporting"],
    ]}
    faqTitle="Questions about the campaign builder"
    faqs={[
      { q: "Do we need to make the creative?", a: "In a managed campaign we design the animated overlay in your brand. In self-serve, your agency sets up the client's creative in the builder." },
      { q: "What is the chat command?", a: "A command like !yourbrand. When a viewer types it in the creator's chat, the link to your offer is posted back in chat." },
      { q: "Can we add a poll?", a: "Yes. A poll can open in the creator's chat when the ad runs, and the answers come back in the report." },
      { q: "Who can use the builder?", a: "Agencies on self-serve use it themselves. In a managed campaign we build it for you, and you follow it in your own login." },
    ]}
    close={{ title: "See the builder with your own creative.", body: "In a 30 minute demo we build a campaign with your brand and your market." }}
  />
);

export default CampaignBuilder;
