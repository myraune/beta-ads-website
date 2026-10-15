import React from "react";
import { FeaturePage } from "@/components/working/FeaturePage";

/* Reporting. Screens are the real dashboard and campaign room views (live
   monitor, delivery, replay reach) plus the poll result. Copy sticks to the
   confirmed report dimensions: delivery, verification clips, replay and clip
   views, clicks, chat tracking, polls, brand safety, PDF. */

const Reporting: React.FC = () => (
  <FeaturePage
    path="/reporting"
    crumb="Reporting"
    seoTitle="Reporting for Livestream Ad Campaigns: Live Dashboard and PDF | Beta Ads"
    seoDescription="Follow every livestream campaign live in your own dashboard: delivery per streamer and per stream, verification clips, replay reach, clicks, chat and polls. Then forward one PDF report to the client."
    kicker="Platform · Reporting"
    title="A report you can forward to the client."
    lead="Live in your own dashboard while the campaign runs, and as one PDF when it ends: delivery, verification clips, replay reach, clicks, chat and polls."
    hero={{ src: "/lovable-uploads/platform/dashboard.webp", alt: "The Beta Ads dashboard with views, clicks, CTR, spend and watch time, a daily views chart and a campaign list.", caption: "The dashboard." }}
    sections={[
      {
        kicker: "Live monitor",
        title: "See who is live with your ad right now.",
        body: "The campaign room shows which channels are live, how many viewers are watching, and which ones are running your overlay at this moment.",
        img: { src: "/lovable-uploads/platform/campaign-room-live.webp", alt: "Live campaign monitor: live channels with viewer counts and a preview of the stream running the overlay.", caption: "Live campaign monitor." },
      },
      {
        kicker: "Delivery",
        title: "Delivery you can look at.",
        body: "Every ad play is recorded as a clip and checked: whether the overlay was displayed correctly and whether the brand was mentioned. It is evidence, not a served-impression count.",
        img: { src: "/lovable-uploads/platform/campaign-room-delivery.webp", alt: "Delivery view: share of ad plays with a recorded clip, share displayed correctly, and brand mention rate.", caption: "Delivery and ad detection." },
      },
      {
        kicker: "Replay reach",
        title: "Live views billed. Replays counted on top.",
        body: "The overlay stays in the VOD and in clips. Replay reach shows those views per channel, next to the live views you paid for.",
        img: { src: "/lovable-uploads/platform/campaign-room-replay.webp", alt: "Replay reach: live views billed, VOD views and clip views per channel.", caption: "Replay reach per channel." },
      },
      {
        kicker: "Polls",
        title: "What the audience answered.",
        body: "If the campaign runs a poll in the creator's chat, every answer comes back in the report, with the share for each option.",
        img: { src: "/lovable-uploads/platform/audience-poll.webp", alt: "Poll result from the creator's chat: answer shares and vote counts for each option.", caption: "A live chat poll, Surfshark Finland." },
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
