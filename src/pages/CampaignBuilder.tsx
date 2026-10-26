import React from "react";
import { FeaturePage } from "@/components/working/FeaturePage";
import { W, kicker, h2 } from "@/components/working/shared";
import { BuildPanel } from "@/components/home-final/panels";
import { PanelFrame } from "@/components/home-final/product-panels";

/* Campaign builder. Steps and options follow the real builder (objective,
   target audience, format, asset, review; awareness or traffic), shown as the
   coded dark product panel instead of a screenshot, one panel per step.
   (A faithful portal replica was tried in c32f52b and dropped in favour of this one.)
   Chat command and poll: confirmed product features. */

const STEPS = [
  { n: "01", t: "Objective", d: "Name the campaign, pick awareness or traffic and set the dates. You pay per 1,000 views that played." },
  { n: "02", t: "Target audience", d: "Pick markets, platforms, categories and language. We shortlist streamers from Streamer Explorer and you approve every name." },
  { n: "03", t: "Format", d: "Your creative runs as an animated overlay in a corner of the stream, with its own chat command and an optional poll." },
  { n: "04", t: "Asset", d: "Upload the overlay and the link it points to. The file is checked against the spec before anything goes live." },
  { n: "05", t: "Review", d: "Every choice on one page. Submit, and the campaign goes to streamer approval and setup verification." },
];

const BuilderSteps: React.FC = () => (
  <section className="border-t border-border py-16 md:py-24">
    <div className={W}>
      <div className="max-w-3xl">
        <div className={`${kicker} mb-4`}>Five steps</div>
        <h2 className={h2}>From objective to review.</h2>
      </div>
      <ol className="mt-10 md:mt-14 p-0 list-none space-y-14 md:space-y-20">
        {STEPS.map((x, i) => (
          <li key={x.t}>
            <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-2 md:gap-10 items-baseline border-t border-border pt-5">
              <h3 className="m-0 text-xl font-bold tracking-tight"><span className="text-muted-foreground font-semibold mr-3">{x.n}</span>{x.t}</h3>
              <p className="m-0 max-w-2xl text-muted-foreground leading-relaxed">{x.d}</p>
            </div>
            <div className="mt-6"><PanelFrame><BuildPanel reveal={false} step={i + 1} /></PanelFrame></div>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

const CampaignBuilder: React.FC = () => (
  <FeaturePage
    path="/campaign-builder"
    crumb="Campaign builder"
    seoTitle="Campaign Builder: Livestream Ads in Five Steps | Beta Ads"
    seoDescription="Build a livestream ad campaign in one flow: objective, audience, format, asset and review. Your creative becomes an animated overlay with a chat command."
    kicker="Platform · Campaign builder"
    title="Build the campaign in one flow."
    lead="Objective, target audience, format, asset and review, in five steps. Your creative becomes an animated overlay with its own chat command, and a poll if you want one."
    hero={{ visual: <PanelFrame><BuildPanel reveal={false} /></PanelFrame>, caption: "The builder on the format step." }}
    sections={[
      {
        kicker: "The overlay",
        title: "An overlay with its own chat command.",
        body: "Your creative runs as an animated overlay in a corner of the stream. Viewers type !yourbrand in chat and get your link back, and you can add a poll that opens in the creator's chat.",
        points: ["Animated overlay in a corner of the stream", "!yourbrand chat command posts your link", "Optional poll in the creator's chat"],
      },
    ]}
    extra={<BuilderSteps />}
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
