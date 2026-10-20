import React from "react";
import { FeaturePage } from "@/components/working/FeaturePage";
import { PanelFrame, DashboardPanel, LiveMonitorPanel, DeliveryPanel, ReplayPanel, PollPanel } from "@/components/home-final/product-panels";

/* Reporting. Coded dark product panels of the dashboard and campaign room
   views (live monitor, delivery, replay reach) plus the poll result, with the
   Surfshark Finland figures. Copy sticks to the
   confirmed report dimensions: delivery, verification clips, replay and clip
   views, clicks, chat tracking, polls, brand safety, PDF. */

const Reporting: React.FC = () => (
  <FeaturePage
    path="/reporting"
    crumb="Reporting"
    seoTitle="Livestream Ad Reporting: Live Dashboard and PDF | Beta Ads"
    seoDescription="Follow every livestream campaign live: delivery per streamer and stream, verification clips, replay reach, clicks, chat and polls. Then send one PDF report."
    kicker="Platform · Reporting"
    title="A report you can forward to the client."
    lead="Live in your own dashboard while the campaign runs, and as one PDF when it ends: delivery, verification clips, replay reach, clicks, chat and polls."
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
        kicker: "Replay reach",
        title: "Live views billed. Replays counted on top.",
        body: "The overlay stays in the VOD and in clips. Replay reach shows those views per channel, next to the live views you paid for.",
        visual: <PanelFrame><ReplayPanel /></PanelFrame>,
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
      { q: "What is in the end report?", a: "Delivery per streamer and per stream, the verification clips, replay and clip views, clicks from the chat command, chat tracking, poll results and brand safety, as one PDF." },
      { q: "Are clicks guaranteed?", a: "No. You buy completed views. Clicks and CTR are tracked and reported, not guaranteed." },
      { q: "Can we share it with the client?", a: "Yes. The report is made to be forwarded as it is." },
    ]}
    close={{ title: "See a real campaign report.", body: "In a 30 minute demo we open the dashboard of a finished campaign and walk through the report." }}
  />
);

export default Reporting;
