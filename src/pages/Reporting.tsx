import React from "react";
import { FeaturePage } from "@/components/working/FeaturePage";
import { PanelFrame, DashboardPanel, LiveMonitorPanel, DeliveryPanel, BannerReachPanel, PollPanel } from "@/components/home-final/product-panels";

/* Reporting. Coded dark product panels of the dashboard and campaign room
   views (live monitor, delivery) plus the poll result, with the
   Surfshark Finland figures. Copy sticks to the
   confirmed report dimensions: delivery, verification clips, clicks, chat
   tracking, polls, brand safety, PDF. Banner reach is the broadcasts' total
   views (live plus afterwards), shown next to completed views and never added
   to them: the animation's viewers are already inside that total. */

const Reporting: React.FC = () => (
  <FeaturePage
    path="/reporting"
    crumb="Reporting"
    seoTitle="Livestream Ad Reporting: Live Dashboard and PDF | Beta Ads"
    seoDescription="Follow every livestream campaign live: delivery per streamer and stream, verification clips, clicks, chat and polls. Then send one PDF report."
    kicker="Platform · Reporting"
    title="A report you can forward to the client."
    lead="Live in your own dashboard while the campaign runs, and as one PDF when it ends: delivery, verification clips, clicks, chat and polls."
    hero={{ visual: <PanelFrame><DashboardPanel /></PanelFrame>, caption: "The dashboard, Surfshark VPN Finland." }}
    sections={[
      {
        kicker: "Live monitor",
        title: "See who is live with your ad right now.",
        body: "The campaign room shows which channels are live, how many viewers are watching, and which ones are running your overlay at this moment.",
        visual: <PanelFrame><LiveMonitorPanel /></PanelFrame>,
      },
      {
        kicker: "Delivery",
        title: "Delivery you can look at.",
        body: "Every ad play is recorded as a clip and checked: whether the overlay was displayed correctly and whether the brand was mentioned. It is evidence, not a served-impression count.",
        visual: <PanelFrame><DeliveryPanel /></PanelFrame>,
      },
      {
        kicker: "Banner reach",
        title: "Two audiences. Never added together.",
        body: "The animation plays in moments, so completed views count the viewers watching when it played. That is what you pay for. The banner and the !brand stream title stay on screen for the whole broadcast through the campaign, so they reach everyone who opens the stream, live or afterwards. We count those stream views per channel from Twitch and show them next to completed views.",
        visual: <PanelFrame><BannerReachPanel /></PanelFrame>,
      },
      {
        kicker: "Polls",
        title: "What the audience answered.",
        body: "If the campaign runs a poll in the creator's chat, every answer comes back in the report, with the share for each option.",
        visual: <PanelFrame><PollPanel /></PanelFrame>,
      },
    ]}
    related={[
      ["Setup verification", "Every stream checked on air, every play clipped.", "/campaign-compliance"],
      ["Chat tracking", "Every brand mention in chat, translated and scored.", "/livestream-chat-engagement"],
      ["Brand safety", "What was said around every ad.", "/brand-safety"],
    ]}
    faqTitle="Questions about reporting"
    faqs={[
      { q: "When can we see the numbers?", a: "From the first stream. You follow delivery in your own dashboard login while the campaign runs." },
      { q: "What is in the end report?", a: "Delivery per streamer and per stream, the verification clips, clicks from the chat command, chat tracking, poll results and brand safety, as one PDF." },
      { q: "Are clicks guaranteed?", a: "No. You buy completed views. Clicks and CTR are tracked and reported, not guaranteed." },
      { q: "Can we share it with the client?", a: "Yes. The report is made to be forwarded as it is." },
    ]}
    close={{ title: "See a real campaign report.", body: "In a 30 minute demo we open the dashboard of a finished campaign and walk through the report." }}
  />
);

export default Reporting;
