import React from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink, Check } from "lucide-react";
import { SPFooter } from '@/components/sections/SPFooter';
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Lightning } from "@/components/ui/lightning";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const t = {
  footerDescription: "The future of Twitch advertising is here.",
  contactTitle: "CONTACT",
  connectTitle: "CONNECT",
};

const managedFeatures = [
  "Full campaign strategy & creative production",
  "Streamer matching & approval workflow",
  "Real-time deployment across 40+ streamers",
  "Weekly performance reports",
  "Dedicated account manager",
  "Brand safety monitoring",
  "Custom overlay artwork design",
  "Post-campaign analysis & insights",
];

const selfServiceFeatures = [
  "Self-serve campaign dashboard",
  "Choose from pre-approved streamers",
  "Upload your own overlay artwork",
  "Real-time analytics",
  "Flexible budget control",
  "Pay-per-impression pricing",
];

const pricingFaqs = [
  {
    question: "What's included in a managed campaign?",
    answer: "Everything from strategy to execution. We handle creative production, streamer selection, deployment, monitoring, and reporting. You approve the artwork and streamers — we do the rest.",
  },
  {
    question: "How does pricing work for managed campaigns?",
    answer: "Managed campaigns are priced based on your goals, target markets, and campaign duration. Contact us for a custom quote tailored to your brand.",
  },
  {
    question: "Is there a long-term commitment?",
    answer: "No. Campaigns are booked individually. Many clients run recurring campaigns, but there's no contract lock-in.",
  },
  {
    question: "Can I start with a small test campaign?",
    answer: "Absolutely. We recommend starting with a single-market test campaign to see results before scaling across the Nordics.",
  },
];

const Pricing: React.FC = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation();

  return (
    <>
      <SEO
        title="Pricing | Beta Ads"
        description="Transparent pricing for native Twitch advertising in the Nordics. Choose managed campaigns or self-service. No lock-in contracts. Start with a test campaign."
        canonical="/pricing"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "name": "Beta Ads Pricing",
          "description": "Pricing plans for native livestream advertising campaigns across Nordic Twitch, YouTube and Kick streams.",
          "url": "https://beta-ads.no/pricing",
          "mainEntity": pricingFaqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        }}
      />
      {/* Accessibility fix: Layout.tsx already provides <main> — nested <main> is invalid HTML (WCAG 1.3.6) */}
      <div>
      {/* Hero with Lightning background */}
      <section className="relative overflow-hidden bg-[#0a0a0f] pt-32 lg:pt-44 pb-24">
        {/* Lightning canvas */}
        <div className="absolute inset-0">
          <Lightning hue={10} speed={1.3} intensity={0.55} size={2.2} />
        </div>
        {/* Radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_60%,rgba(233,79,55,0.12),transparent)]" />
        {/* Bottom fade to page background */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />

        <div
          ref={heroRef}
          className={`relative z-10 max-w-[780px] mx-auto px-6 lg:px-12 text-center transition-[opacity,transform] duration-700 ${
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-xs font-light tracking-[0.3em] text-white/40 uppercase mb-5">
            Pricing
          </p>
          <h1 className="text-4xl lg:text-6xl font-light tracking-tight mb-6 text-white">
            Simple, transparent{" "}
            <span className="font-extralight italic text-white/50">pricing.</span>
          </h1>
          <p className="text-lg text-white/60 font-light leading-relaxed max-w-[520px] mx-auto mb-5">
            Whether you want a fully managed campaign or prefer to run things yourself, we have you covered.
          </p>
          {/* Humor line */}
          <p className="inline-block text-sm text-white/35 font-light italic border border-white/10 rounded-full px-5 py-2 bg-white/[0.03] backdrop-blur-sm">
            😅 Got a bit scared? Our prices are secret — only the lucky ones get to know.
          </p>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div 
          ref={cardsRef}
          className={`max-w-[1000px] mx-auto px-6 lg:px-12 transition-[opacity,transform] duration-700 delay-200 ${
            cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Managed Service */}
            <div className="rounded-2xl bg-card/40 p-8 lg:p-10 space-y-8">
              <div className="space-y-3">
                <p className="text-xs font-light tracking-[0.2em] text-primary/70 uppercase">Recommended</p>
                <h2 className="text-2xl font-light tracking-tight">Managed Service</h2>
                <p className="text-muted-foreground font-light">
                  Custom campaigns run by our team. From brief to broadcast — we handle everything.
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-light tracking-tight">Custom pricing</p>
                <p className="text-sm text-muted-foreground font-light">Based on your campaign goals</p>
              </div>
              <ul className="space-y-3">
                {managedFeatures.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm font-light text-foreground/80">
                    <Check className="h-4 w-4 text-primary/70 mt-0.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link to="/demo">
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full font-light tracking-wide">
                  Book a Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Self-Service */}
            <div className="rounded-2xl bg-card/20 p-8 lg:p-10 space-y-8 relative">
              <div className="absolute top-6 right-6">
                <span className="text-[10px] font-light tracking-[0.2em] text-muted-foreground/50 uppercase bg-muted/30 px-3 py-1 rounded-full">
                  Coming soon
                </span>
              </div>
              <div className="space-y-3">
                <p className="text-xs font-light tracking-[0.2em] text-muted-foreground/50 uppercase">For hands-on marketers</p>
                <h2 className="text-2xl font-light tracking-tight">Self-Service</h2>
                <p className="text-muted-foreground font-light">
                  Launch campaigns yourself through our platform. Full control, flexible budgets.
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-light tracking-tight text-muted-foreground/60">Pay-per-impression</p>
                <p className="text-sm text-muted-foreground/50 font-light">Transparent, usage-based pricing</p>
              </div>
              <ul className="space-y-3">
                {selfServiceFeatures.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm font-light text-muted-foreground/60">
                    <Check className="h-4 w-4 text-muted-foreground/30 mt-0.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button 
                variant="outline" 
                className="w-full font-light tracking-wide opacity-50 cursor-not-allowed"
                disabled
              >
                Join Waitlist
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing FAQ */}
      <section className="pb-24 lg:pb-32">
        <div className="max-w-[700px] mx-auto px-6 lg:px-12">
          <h2 className="text-3xl font-light tracking-tight text-center mb-12">
            Pricing questions
          </h2>
          <Accordion type="single" collapsible className="space-y-2">
            {pricingFaqs.map((faq, index) => (
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
        </div>
      </section>

      <SPFooter />
      </div>
    </>
  );
};

export default Pricing;
