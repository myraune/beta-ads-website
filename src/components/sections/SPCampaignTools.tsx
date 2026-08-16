import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

/**
 * Homepage entry point to the three campaign-reporting tool pages.
 *
 * They were orphans: nothing on the site linked to /livestream-chat-engagement,
 * /campaign-compliance or /replay-reach, which is bad for a visitor trying to
 * find them and bad for indexing, since internal links are how these pages get
 * discovered and get any authority at all.
 *
 * Text-first cards, no decorative icons, one accent for the section.
 */

const tools = [
  {
    href: "/campaign-compliance",
    label: "Setup verification",
    head: "Is it actually running?",
    body: "Every channel checked continuously: banner up, command in the title, gone live, pointing at a tracked link. Problems surface on day one, not in the final report.",
  },
  {
    href: "/livestream-chat-engagement",
    label: "Chat tracking",
    head: "What did the room say?",
    body: "Every message that mentions you, across every channel at once, translated and scored by tone. Including the scepticism, which is the part worth reading.",
  },
  {
    href: "/replay-reach",
    label: "Replay reach",
    head: "What did it keep earning?",
    body: "The overlay is baked into the recording, so the stream keeps collecting views after it ends. Counted per channel, with the live audience shown inside the total rather than added to it.",
  },
];

export const SPCampaignTools: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section aria-label="Campaign reporting" className="py-20 md:py-28 border-t border-border">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 2xl:max-w-[1400px] transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
            Reporting
          </span>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-4">
            Proof the campaign ran, not a promise that it did
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Most livestream reporting is a screenshot and a number the agency typed in. These are
            the three views we run on every campaign, and you get all of them.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {tools.map((t) => (
            <Link
              key={t.href}
              to={t.href}
              className="group rounded-2xl border border-border bg-card p-7 flex flex-col hover:border-primary/30 transition-colors"
            >
              <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">
                {t.label}
              </span>
              <h3 className="text-lg font-semibold text-foreground mb-3">{t.head}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">{t.body}</p>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground mt-5 group-hover:text-primary transition-colors">
                See how it works
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
