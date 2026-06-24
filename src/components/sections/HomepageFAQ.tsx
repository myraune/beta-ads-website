import React from "react";
import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const faqs = [
  {
    question: "How is this different from Twitch's own ads?",
    answer: "Twitch's native ads are pre-rolls and mid-rolls that viewers skip or block with adblock. Our overlay ads are built directly into the stream itself - they bypass adblock entirely and feel like part of the content, not an interruption.",
  },
  {
    question: "What's the minimum campaign budget?",
    answer: "Campaign budgets vary based on reach, duration, and market. Contact us directly for a custom quote - we'll match the right streamers and format to your goals and budget.",
  },
  {
    question: "How do you ensure brand safety?",
    answer: "Every streamer in our network is vetted and approved. We monitor streams in real-time and have content guidelines in place. You approve every streamer before your campaign goes live.",
  },
  {
    question: "What metrics and reporting do I get?",
    answer: "You get real-time access to impressions, CTR, viewership data, and engagement metrics through our dashboard. Weekly reports are delivered during active campaigns with views, verified clicks, screen time, and CTR broken down by streamer and day.",
  },
  {
    question: "Can I target specific games or audiences?",
    answer: "Yes. You can target by game category, streamer demographics, viewer location (country-level), streaming schedule, and audience size. We help you find the right streamers for your brand.",
  },
  {
    question: "How quickly can a campaign go live?",
    answer: "From brief to broadcast in as little as 5 business days. We handle creative production, streamer matching, and deployment - you just approve the final artwork and streamer list.",
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
          <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
            Frequently asked
          </span>
          <h2 className="text-3xl lg:text-4xl font-light tracking-tight text-foreground">
            Common questions
          </h2>
        </div>

        {/* Native <details> per the design system (no Accordion component). */}
        <div>
          {faqs.map((faq, index) => (
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
