import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { CHANNEL_SETUP, CHANNEL_REACH } from "@/data/campaignSample";
import { CHAT_MENTIONS } from "@/data/chatMentions";

/**
 * Each card carries a small preview built from the same sample data the tool
 * page renders, rather than a decorative graphic. They are miniatures of the
 * real thing: the status grid, the message feed, the reach bars. One accent
 * colour throughout, used only to mark the thing that matters in each preview.
 */

/** Setup verification: one cell per channel, accent = needs attention. */
const SetupPreview: React.FC = () => (
  <div className="flex flex-wrap gap-1" aria-hidden>
    {CHANNEL_SETUP.map((c) => (
      <span
        key={c.ch}
        className={`h-6 w-6 rounded ${c.note ? "bg-primary/70" : "bg-foreground/10"}`}
      />
    ))}
  </div>
);

/**
 * Three rows chosen to show the tone range rather than just the first three in
 * the file, which happen to contain no critical message and made the preview
 * look flat.
 */
const CHAT_PREVIEW_ROWS = [
  CHAT_MENTIONS.find((m) => m.tone === "question"),
  CHAT_MENTIONS.find((m) => m.tone === "positive"),
  CHAT_MENTIONS.find((m) => m.tone === "negative"),
].filter(Boolean) as typeof CHAT_MENTIONS;

/** Chat tracking: three miniature feed rows. */
const ChatPreview: React.FC = () => (
  <div className="space-y-1.5" aria-hidden>
    {CHAT_PREVIEW_ROWS.map((m, i) => (
      <div key={i} className="flex items-center gap-1.5">
        <span className="text-[9px] font-semibold text-muted-foreground/70 w-6 shrink-0">{m.c}</span>
        <span
          className={`h-2 rounded-full ${m.tone === "negative" ? "bg-primary/70" : "bg-foreground/15"}`}
          style={{ width: `${[68, 46, 78][i]}%` }}
        />
      </div>
    ))}
  </div>
);

/** Replay reach: total bar with the live subset marked inside it. */
const ReachPreview: React.FC = () => {
  const live = CHANNEL_REACH.reduce((s, c) => s + c.live, 0);
  const total = CHANNEL_REACH.reduce((s, c) => s + c.total, 0);
  const livePct = Math.round((live / total) * 100);
  return (
    <div className="space-y-2" aria-hidden>
      <div className="h-3 rounded-full bg-primary/70 w-full" />
      <div className="h-3 rounded-full bg-foreground/15" style={{ width: `${livePct}%` }} />
      <div className="flex justify-between text-[9px] text-muted-foreground/70">
        <span>live inside total</span>
        <span className="tabular-nums">{(total / live).toFixed(1)}x</span>
      </div>
    </div>
  );
};

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
    caption: `${CHANNEL_SETUP.length} channels, ${CHANNEL_SETUP.filter((c) => c.note).length} needing attention`,
    preview: <SetupPreview />,
  },
  {
    href: "/livestream-chat-engagement",
    label: "Chat tracking",
    head: "What did the room say?",
    body: "Every message that mentions you, across every channel at once, translated and scored by tone. Including the scepticism, which is the part worth reading.",
    caption: "Every mention, translated and scored",
    preview: <ChatPreview />,
  },
  {
    href: "/replay-reach",
    label: "Replay reach",
    head: "What did it keep earning?",
    body: "The overlay is baked into the recording, so the stream keeps collecting views after it ends. Counted per channel, with the live audience shown inside the total rather than added to it.",
    caption: "Total views against the live audience",
    preview: <ReachPreview />,
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

              {/* Miniature of the tool's own view, built from the same sample
                  data the page renders. Not decoration: it shows the shape of
                  what you get before you click. */}
              <div className="mt-5 rounded-xl border border-border bg-muted/30 px-4 py-3.5">
                {t.preview}
                <p className="text-[10px] text-muted-foreground/60 mt-3">{t.caption}</p>
              </div>

              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground mt-4 group-hover:text-primary transition-colors">
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
