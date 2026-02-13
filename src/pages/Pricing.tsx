import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink, Check } from "lucide-react";
import { Footer } from "@/components/sections/Footer";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
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
      <section className="pt-32 lg:pt-40 pb-16">
        <div 
          ref={heroRef}
          className={`max-w-[800px] mx-auto px-6 lg:px-12 text-center transition-[opacity,transform] duration-700 ${
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-xs font-light tracking-[0.3em] text-muted-foreground/60 uppercase mb-4">
            Pricing
          </p>
          <h1 className="text-4xl lg:text-5xl font-light tracking-tight mb-6">
            Simple, transparent{" "}
            <span className="font-extralight italic text-muted-foreground">pricing.</span>
          </h1>
          <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-[520px] mx-auto">
            Whether you want a fully managed campaign or prefer to run things yourself, we have you covered.
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
                <h3 className="text-2xl font-light tracking-tight">Managed Service</h3>
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
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-light tracking-wide shadow-md shadow-primary/20">
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
                <h3 className="text-2xl font-light tracking-tight">Self-Service</h3>
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
          <h2 className="text-2xl font-light tracking-tight text-center mb-12">
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

      <Footer t={t} />
    </>
  );
};

export default Pricing;
