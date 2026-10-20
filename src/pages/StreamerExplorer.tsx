import React from "react";
import { FeaturePage } from "@/components/working/FeaturePage";
import { PanelFrame, ExplorerPanel, CategoryPanel, ProfilePanel } from "@/components/home-final/product-panels";

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
      { q: "Who has access?", a: "Agencies on self-serve get their own login. Brands in a managed campaign see the list we build for them." },
    ]}
    close={{ title: "Find the streamers for your market.", body: "In a 30 minute demo we search Streamer Explorer for your market and category." }}
  />
);

export default StreamerExplorer;
