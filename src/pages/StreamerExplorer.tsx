import React from "react";
import { FeaturePage } from "@/components/working/FeaturePage";
import { PanelFrame, ExplorerPanel, CategoryPanel, ProfilePanel } from "@/components/home-final/product-panels";
import { ExplorerPlans } from "@/components/working/ExplorerPlans";

/* Streamer Explorer. Counts from the streamer database: 39,445 in Streamer
   Explorer ("39,000+"), 37,599 recently active and open to collaborations.
   Worldwide, across Twitch, YouTube and Kick: never call it Nordic. Filters and
   columns follow the real screens, shown as coded dark product panels. */

const StreamerExplorer: React.FC = () => (
  <FeaturePage
    path="/streamer-explorer"
    crumb="Streamer Explorer"
    seoTitle="Streamer Explorer: Search 39,000+ Streamers | Beta Ads"
    seoDescription="Search and filter 39,000+ streamers on Twitch, YouTube and Kick by platform, country, language and category, and build the streamer list for your campaign."
    kicker="Platform · Streamer Explorer"
    title="39,000+ streamers, ready to search."
    lead="Filter by platform, country, language and category, open a profile, and build the list for your campaign. 37,599 of them are recently active and open to collaborations."
    hero={{ visual: <PanelFrame><ExplorerPanel /></PanelFrame>, caption: "Streamer Explorer, filtered by platform and country." }}
    sections={[
      {
        kicker: "Category Explorer",
        title: "Start from the game, not the name.",
        body: "Browse by category to see how many streamers are active in each game, how many viewers they reach, and how much air time and watch time there is.",
        visual: <PanelFrame><CategoryPanel /></PanelFrame>,
      },
      {
        kicker: "Streamer profiles",
        title: "Open a profile before you book.",
        body: "Each streamer has a profile with their audience, their top categories and earlier sponsorship moments, so you know who you are putting your brand next to.",
        visual: <PanelFrame><ProfilePanel /></PanelFrame>,
      },
    ]}
    extra={<ExplorerPlans />}
    related={[
      ["Campaign builder", "Build the campaign in one flow.", "/campaign-builder"],
      ["Brand safety", "What was said around every ad.", "/brand-safety"],
      ["Self-serve for agencies", "Your own login to the same database.", "/self-serve"],
    ]}
    faqTitle="Questions about Streamer Explorer"
    faqs={[
      { q: "How many streamers are in it?", a: "39,000+ streamers across Twitch, YouTube and Kick, of which 37,599 are recently active and open to collaborations." },
      { q: "Are they all Nordic?", a: "No. The database is worldwide. Filter by country and language to find streamers for your market." },
      { q: "Can we approve the streamer list?", a: "Yes. In a managed campaign we shortlist and you approve or remove anyone before launch. On self-serve you build the list yourself." },
      { q: "What does access cost?", a: "Growth is $299 a month ($249 billed yearly) with 150 Beta Credits, Scale is $899 a month ($749 billed yearly) with 400 credits, and Enterprise is custom. Creating campaigns is free on every plan, and we set up access with you in a short demo." },
      { q: "What is a Beta Credit?", a: "Credits pay for the AI features: an AI streamer or category search costs 5 credits, a streamer summary 1 and an AI campaign session 25. Filtering, lists, exports and campaign creation never cost credits. Top-up packs come in 250, 600 and 1,500." },
      { q: "Do brands in a managed campaign need a plan?", a: "No. In a managed campaign we build the streamer list for you and you approve it in your own login." },
    ]}
    close={{ title: "Find the streamers for your market.", body: "In a 30 minute demo we search Streamer Explorer for your market and category." }}
  />
);

export default StreamerExplorer;
