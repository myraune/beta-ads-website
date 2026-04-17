import React from "react";
import { SEO } from "@/components/SEO";
import { ArrowRight, Mail, MapPin, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedShaderBackground from "@/components/ui/animated-shader-background";
import { SPFooter } from "@/components/sections/SPFooter";

const Contact: React.FC = () => {
  return (
    <>
      <SEO
        title="Contact Us | Beta Ads"
        description="Get in touch with Beta Ads. Book a demo, ask a question, or explore partnership opportunities for native livestream advertising in the Nordics."
        canonical="/contact"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact Beta Ads",
          "description": "Get in touch with Beta Ads for native livestream advertising inquiries, demos, and partnership opportunities.",
          "url": "https://beta-ads.no/contact",
          "isPartOf": { "@id": "https://beta-ads.no/#website" },
          "mainEntity": {
            "@type": "Organization",
            "name": "Beta Ads",
            "email": "andreas@beta-ads.no",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Chicago",
              "addressCountry": "US"
            }
          }
        }}
      />

      {/* Hero */}
      <section className="relative overflow-clip" style={{ background: "hsl(240 11% 5%)" }}>
        <AnimatedShaderBackground heightFactor={0.85} />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent z-[1] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-36 pb-28">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-4 block">Contact</span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-6">
              Let's<br />
              <span style={{ fontFamily: "'Instrument Serif', serif" }} className="italic font-normal">talk.</span>
            </h1>
            <p className="text-lg text-white/60 leading-relaxed max-w-md">
              Whether you're a brand planning a campaign, an agency looking for a new format, or a streamer wanting to monetize — we're easy to reach.
            </p>
          </div>
        </div>
      </section>

      {/* Contact options */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-3 gap-8">

            {/* Book a demo - primary */}
            <a
              href="https://calendar.app.google/coW5NLQJtLxfRer19"
              target="_blank"
              rel="noopener noreferrer"
              className="group col-span-1 lg:col-span-2 rounded-3xl p-10 md:p-14 border border-border hover:border-primary/30 transition-colors"
            >
              <div className="flex flex-col h-full">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-8">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-light tracking-tight text-foreground mb-4">Book a demo call</h2>
                  <p className="text-muted-foreground text-base leading-relaxed max-w-lg mb-8">
                    15 minutes. We walk you through how native overlay ads work, show you real campaign numbers, and tell you whether your brand is a fit for the format.
                  </p>
                  <div className="grid grid-cols-3 border-t border-border pt-4 mb-8">
                    {[
                      { value: "15 min", label: "Call length" },
                      { value: "Free", label: "No commitment" },
                      { value: "Live", label: "Platform demo" },
                    ].map((s, i) => (
                      <div key={s.label} className={`${i < 2 ? "pr-5 border-r border-border" : ""} ${i > 0 ? "pl-5" : ""}`}>
                        <div className="text-lg font-bold text-foreground">{s.value}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                  Schedule now <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </a>

            {/* Email + Location stacked */}
            <div className="flex flex-col gap-6">
              <a
                href="mailto:andreas@beta-ads.no"
                className="group flex-1 rounded-3xl border border-border bg-card p-8 hover:border-primary/30 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-lg font-semibold text-foreground mb-2">Email us</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  Questions, proposals, press, partnerships. We reply within one business day.
                </p>
                <span className="text-sm font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                  andreas@beta-ads.no <ArrowRight className="w-4 h-4" />
                </span>
              </a>

              <div className="rounded-3xl border border-border bg-card p-8">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-lg font-semibold text-foreground mb-2">HQ in Chicago</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Headquartered in Chicago, with roots in Oslo. Operating globally.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ strip */}
      <section className="border-t border-border py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">Common questions</span>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">Before you reach out</h2>
            </div>
            <div className="divide-y divide-border">
              <details className="group py-5">
                <summary className="flex items-center justify-between cursor-pointer text-sm font-medium text-foreground hover:text-primary transition-colors select-none list-none">
                  What's the minimum campaign budget?
                  <ArrowRight className="w-4 h-4 shrink-0 ml-4 transition-transform group-open:rotate-90 text-muted-foreground" />
                </summary>
                <p className="pt-3 text-sm text-muted-foreground leading-relaxed">We recommend a minimum of $10,000 USD. This ensures enough reach, streamer variety, and creative quality to generate meaningful results. Smaller tests are possible — book a call to discuss.</p>
              </details>
              <details className="group py-5">
                <summary className="flex items-center justify-between cursor-pointer text-sm font-medium text-foreground hover:text-primary transition-colors select-none list-none">
                  How fast can a campaign go live?
                  <ArrowRight className="w-4 h-4 shrink-0 ml-4 transition-transform group-open:rotate-90 text-muted-foreground" />
                </summary>
                <p className="pt-3 text-sm text-muted-foreground leading-relaxed">Anywhere from 24 hours to 2 weeks depending on scope, creative complexity, and how many streamers are involved. We handle all outreach, setup, and OBS integration.</p>
              </details>
              <details className="group py-5">
                <summary className="flex items-center justify-between cursor-pointer text-sm font-medium text-foreground hover:text-primary transition-colors select-none list-none">
                  I'm a streamer — how do I join?
                  <ArrowRight className="w-4 h-4 shrink-0 ml-4 transition-transform group-open:rotate-90 text-muted-foreground" />
                </summary>
                <p className="pt-3 text-sm text-muted-foreground leading-relaxed">
                  Head over to our <Link to="/streamers" className="text-primary hover:underline">streamer page</Link> to sign up. We review your channel and reach out when there's a matching campaign.
                </p>
              </details>
            </div>
          </div>
        </div>
      </section>

      <SPFooter />
    </>
  );
};

export default Contact;
