import React from "react";
import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

/* Single source for the visible FAQ and the FAQPage JSON-LD on "/" (Index.tsx
   maps this array), so the two can never drift apart again. Only confirmed
   facts: pricing per 1,000 views from 100,000 NOK, refund of undelivered views,
   client dashboard login, streamer list approval on request. */
export const homepageFaqs = [
  {
    question: "How is this different from Twitch's own ads?",
    answer: "Twitch's own ads are pre-rolls and mid-rolls that viewers skip or remove with an ad blocker. Our overlay is part of the stream picture itself, rendered by the streamer's broadcast software, so blockers cannot remove it and nobody can skip it.",
  },
  {
    question: "What's the minimum campaign budget?",
    answer: "Campaigns start from 100,000 NOK. You pay per 1,000 animation views, and the bigger the budget, the lower the price per view. The planner on this page shows what each budget buys.",
  },
  {
    question: "What counts as a view, and what if you don't deliver?",
    answer: "One view is one fully played run of your animation on a live stream. If a campaign delivers fewer views than you paid for, the undelivered views are refunded pro rata. Clicks and CTR are reported but not guaranteed.",
  },
  {
    question: "How do you ensure brand safety?",
    answer: "We pick streamers for your brand and you can approve the streamer list before the campaign goes live. During the campaign every channel is checked for the overlay running correctly, and every chat mention of your brand is tracked.",
  },
  {
    question: "What metrics and reporting do I get?",
    answer: "You get your own login to the live campaign dashboard with views, clicks and chat mentions per streamer. When the campaign ends you get an automated report covering setup verification, chat tracking and replay reach.",
  },
  {
    question: "Can I target specific games or audiences?",
    answer: "Yes. We choose streamers by game, language, country and audience size from a database of 39,000+ streamers on Twitch, YouTube and Kick, and match them to who you want to reach.",
  },
];

export const HomepageFAQ: React.FC = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation();

  return (
    <section className="py-24 lg:py-32" aria-label="Frequently asked questions">
      <div
        ref={sectionRef}
        className={`max-w-[800px] mx-auto px-6 lg:px-12 transition-[opacity,transform] duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="mb-12">
          <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3 block">
            Frequently asked
          </span>
          <h2 className="text-3xl lg:text-4xl font-light tracking-tight text-foreground">
            Common questions
          </h2>
        </div>

        {/* Native <details> per the design system (no Accordion component). */}
        <div>
          {homepageFaqs.map((faq, index) => (
            <details key={index} className="group border-b border-border last:border-b-0">
              <summary className="flex items-center justify-between gap-4 py-5 cursor-pointer text-sm font-medium text-foreground hover:text-primary transition-colors select-none list-none [&::-webkit-details-marker]:hidden">
                {faq.question}
                <ArrowRight className="w-4 h-4 shrink-0 transition-transform duration-200 group-open:rotate-90 text-muted-foreground" />
              </summary>
              <div className="pb-5 text-sm text-muted-foreground leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>

        <div className="mt-12">
          <a
            href="https://calendar.app.google/coW5NLQJtLxfRer19"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 min-h-[44px] py-2.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-200 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Still have questions? Book a 15-minute call
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
