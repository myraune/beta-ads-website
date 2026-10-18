import React from "react";
import { FeaturePage } from "@/components/working/FeaturePage";
import { DealFlow } from "@/components/working/DealFlow";

/* Programmatic. Mechanics confirmed by LIVAD (Arda, 2026-10-15): private deal on
   our SSP seat (Adform or Magnite, Equativ coming), deal ID shared, agency targets
   it in its own DSP. Not confirmed: which DSPs, and what reporting a programmatic
   buyer gets, so neither is claimed here. */

const Programmatic: React.FC = () => (
  <FeaturePage
    path="/programmatic"
    crumb="Programmatic deals"
    seoTitle="Programmatic Livestream Ads on Adform and Magnite | Beta Ads"
    seoDescription="Buy livestream ads on Twitch, YouTube and Kick programmatically: we set up a private deal on Adform or Magnite, share the deal ID, you target it in your DSP."
    kicker="Platform · Programmatic deals"
    title="Buy it in your DSP, with a private deal."
    lead="We have SSP seats on Adform and Magnite, with Equativ coming. We set up a private deal for the campaign and share the deal ID, and your team targets it in your own DSP."
    hero={{ visual: <DealFlow />, caption: "How a private deal runs, from the SSP to the live stream." }}
    sections={[
      {
        kicker: "For agencies",
        title: "Livestream next to the rest of the programmatic plan.",
        body: "No new tool for the trading desk. The deal ID goes into the DSP you already use, and the campaign is bought and paced there like any other deal.",
        points: ["SSP seats: Adform and Magnite", "Equativ: coming", "Set up per campaign, shared as a deal ID"],
        visual: (
          <div className="grid grid-cols-3 gap-3">
            {["Adform SSP", "Magnite", "Equativ"].map((s, i) => (
              <div key={s} className="rounded-[14px] border border-border bg-card p-5 text-center">
                <div className="text-[15px] font-semibold">{s}</div>
                <div className={`mt-2 text-xs ${i < 2 ? "text-foreground" : "text-muted-foreground"}`}>{i < 2 ? "Live" : "Coming"}</div>
              </div>
            ))}
          </div>
        ),
      },
    ]}
    related={[
      ["Self-serve for agencies", "Your own login to launch and resell campaigns.", "/self-serve"],
      ["Pricing", "Pay only for views that played.", "/pricing"],
      ["Reporting", "A report you can forward to the client.", "/reporting"],
    ]}
    faqTitle="Questions about programmatic deals"
    faqs={[
      { q: "How does it work?", a: "We set up a private deal on our SSP seat, on Adform or Magnite, and share the deal ID with you. Your team targets the deal ID in your DSP, and the overlay runs inside the live streams." },
      { q: "Which SSPs?", a: "Adform and Magnite today, with Equativ coming." },
      { q: "Which DSP do we need?", a: "Tell us which DSP your team uses, and we set the deal up so you can target it there." },
      { q: "Can we also buy it managed or through a login?", a: "Yes. The same inventory can be bought as a managed campaign or through your own self-serve login." },
    ]}
    close={{ title: "Get a deal ID for your next campaign.", body: "Tell us the market, the budget and your DSP, and we set up the private deal." }}
  />
);

export default Programmatic;
