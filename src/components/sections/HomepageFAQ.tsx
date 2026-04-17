import React from "react";
import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How is this different from Twitch's own ads?",
    answer: "Twitch's native ads are pre-rolls and mid-rolls that viewers skip or block with adblock. Our overlay ads are built directly into the stream itself — they bypass adblock entirely and feel like part of the content, not an interruption.",
  },
  {
    question: "What's the minimum campaign budget?",
    answer: "Campaign budgets vary based on reach, duration, and market. Contact us directly for a custom quote — we'll match the right streamers and format to your goals and budget.",
  },
  {
    question: "How do you ensure brand safety?",
    answer: "Every streamer in our network is vetted and approved. We monitor streams in real-time and have content guidelines in place. You approve every streamer before your campaign goes live.",
  },
  {
    question: "What metrics and reporting do I get?",
    answer: "You get real-time access to impressions, CTR, viewership data, and engagement metrics through our dashboard. Weekly reports are delivered during active campaigns with actionable insights.",
  },
  {
    question: "Can I target specific games or audiences?",
    answer: "Yes. You can target by game category, streamer demographics, viewer location (country-level), streaming schedule, and audience size. We help you find the right streamers for your brand.",
  },
  {
    question: "How quickly can a campaign go live?",
    answer: "From brief to broadcast in as little as 5 business days. We handle creative production, streamer matching, and deployment — you just approve the final artwork and streamer list.",
  },
];

export const HomepageFAQ: React.FC = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation();

  return (
    <section className="py-24 lg:py-32" aria-label="Frequently asked questions">
      <div 
        ref={sectionRef}
        className={`max-w-[800px] mx-auto px-6 lg:px-12 transition-[opacity,transform] duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="text-center mb-16">
          <p className="text-xs font-light tracking-[0.3em] text-muted-foreground/60 uppercase mb-4">
            Frequently asked
          </p>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight">
            Common questions
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border-b border-border/50 py-1"
            >
              <AccordionTrigger className="text-left text-base font-light tracking-wide hover:text-foreground text-foreground/90 py-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground font-light leading-relaxed pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="text-center mt-12">
          <a 
            href="https://calendar.app.google/coW5NLQJtLxfRer19"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-light tracking-wide text-primary hover:text-primary/80 transition-colors duration-200"
          >
            Still have questions? Book a 15-minute call
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
