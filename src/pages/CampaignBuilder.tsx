import React, { useState } from "react";
import { FeaturePage } from "@/components/working/FeaturePage";
import { W, kicker, h2 } from "@/components/working/shared";
import { PortalBuilder } from "@/components/home-final/builder-panels";

/* Campaign builder. Steps and options follow the real builder (objective,
   target audience, format, asset, review; awareness or traffic), shown as the
   coded copy of the portal builder (builder-panels.tsx) instead of a screenshot,
   one panel per step.
   Chat command and poll: confirmed product features. */

const STEPS = [
  { n: "01", t: "Objective", d: "Name the campaign, pick awareness or traffic and set the dates. You pay per 1,000 views that played." },
  { n: "02", t: "Target audience", d: "Pick markets, platforms, categories and language. We shortlist streamers from Streamer Explorer and you approve every name." },
  { n: "03", t: "Format", d: "Your creative runs as an animated overlay in a corner of the stream, with its own chat command and an optional poll." },
  { n: "04", t: "Asset", d: "Upload the overlay and the link it points to. The file is checked against the spec before anything goes live." },
  { n: "05", t: "Review", d: "Every choice on one page. Submit, and the campaign goes to streamer approval and setup verification." },
];

const BuilderSteps: React.FC = () => {
  const [step, setStep] = useState(1);
  const s = STEPS[step - 1];
  return (
    <section className="border-t border-border py-16 md:py-24">
      <div className={W}>
        <div className="max-w-3xl">
          <div className={`${kicker} mb-4`}>Five steps</div>
          <h2 className={h2}>From objective to review.</h2>
        </div>
        <div role="tablist" aria-label="Builder steps" className="mt-8 md:mt-10 grid grid-cols-5 border-t border-border">
          {STEPS.map((x, i) => (
            <button key={x.t} type="button" role="tab" aria-selected={step === i + 1} onClick={() => setStep(i + 1)}
              className={`-mt-px border-t-2 pt-4 pb-2 pr-3 text-left transition-colors ${step === i + 1 ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
              <span className="block text-xs font-semibold">{x.n}</span>
              <span className="hidden sm:block mt-1 text-[15px] font-semibold tracking-tight">{x.t}</span>
            </button>
          ))}
        </div>
        <div className="mt-6 grid lg:grid-cols-[minmax(0,1fr)_auto] gap-4 items-end">
          <p className="m-0 max-w-2xl text-muted-foreground leading-relaxed"><span className="sm:hidden font-semibold text-foreground">{s.t}. </span>{s.d}</p>
          <div className="flex gap-2">
            <button type="button" onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1}
              className="h-10 px-4 rounded-full border border-border text-sm font-semibold disabled:opacity-30">Back</button>
            <button type="button" onClick={() => setStep(Math.min(5, step + 1))} disabled={step === 5}
              className="h-10 px-4 rounded-full bg-primary text-primary-foreground text-sm font-semibold disabled:opacity-30">Next step</button>
          </div>
        </div>
        {/* From md up, all five panels share one grid cell so the height never jumps between steps. On phones only the active panel renders, at its own height. */}
        <div className="mt-8 md:grid" role="tabpanel">
          {STEPS.map((x, i) => (
            <div key={x.t} className={`md:[grid-area:1/1] min-w-0 flex-col [&>.pb-wrap]:flex-1 ${step === i + 1 ? "flex" : "hidden md:flex md:invisible"}`} aria-hidden={step !== i + 1}>
              <PortalBuilder step={i + 1} theme="portal" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CampaignBuilder: React.FC = () => (
  <FeaturePage
    path="/campaign-builder"
    crumb="Campaign builder"
    seoTitle="Campaign Builder: Livestream Ads in Five Steps | Beta Ads"
    seoDescription="Build a livestream ad campaign in one flow: objective, audience, format, asset and review. Your creative becomes an animated overlay with a chat command."
    kicker="Platform · Campaign builder"
    title="Build the campaign in one flow."
    lead="Objective, target audience, format, asset and review, in five steps. Your creative becomes an animated overlay with its own chat command, and a poll if you want one."
    hero={{ visual: <PortalBuilder step={3} theme="portal" />, caption: "The campaign builder in the Beta Ads platform, on the format step." }}
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
