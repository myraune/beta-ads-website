import React from "react";
import { SEO } from "@/components/SEO";
import { ArrowRight, Mail, MapPin, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

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
            "email": "hello@betaads.no",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Oslo",
              "addressCountry": "NO"
            }
          }
        }}
      />
      <div className="max-w-4xl mx-auto px-6 lg:px-8 pt-32 md:pt-40 pb-20">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary mb-4">
            Contact
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Let's talk
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Whether you're a brand, agency, or streamer — we'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Book a demo */}
          <a
            href="https://calendar.app.google/coW5NLQJtLxfRer19"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl border border-border bg-card p-6 hover:border-primary/30 hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-lg font-bold text-foreground mb-2">Book a Demo</h2>
            <p className="text-sm text-muted-foreground mb-4">
              See the platform live. 15-minute walkthrough of how native stream ads work.
            </p>
            <span className="text-sm font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
              Schedule now <ArrowRight className="w-4 h-4" />
            </span>
          </a>

          {/* Email */}
          <a
            href="mailto:hello@betaads.no"
            className="group rounded-2xl border border-border bg-card p-6 hover:border-primary/30 hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-lg font-bold text-foreground mb-2">Email Us</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Questions, partnerships, or press inquiries — drop us a line.
            </p>
            <span className="text-sm font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
              hello@betaads.no <ArrowRight className="w-4 h-4" />
            </span>
          </a>

          {/* Location */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-lg font-bold text-foreground mb-2">Visit Us</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Based in Oslo, operating across the Nordics.
            </p>
            <span className="text-sm text-muted-foreground">
              Oslo, Norway
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
