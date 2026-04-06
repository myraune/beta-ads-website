import React from "react";
import { Link } from "react-router-dom";

interface FooterProps {
  t: any;
}

export const Footer: React.FC<FooterProps> = ({ t }) => (
  <footer className="py-24">
    <div className="max-w-7xl mx-auto px-8 lg:px-12">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
        {/* Brand */}
        <div className="space-y-6">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/logo-black.png" 
              alt="Beta Ads" 
              className="h-8 w-auto dark:hidden block"
            />
            <img 
              src="/lovable-uploads/logo-white.png" 
              alt="Beta Ads" 
              className="h-8 w-auto dark:block hidden"
            />
          </div>
          <p className="text-muted-foreground font-extralight leading-relaxed text-base tracking-wide">
            {t.footerDescription}
          </p>
          {/* Use proper <a> tags so links are keyboard-navigable, crawlable, and accessible */}
          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com/company/beta-nordic"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm font-light"
            >
              LinkedIn
            </a>
            <a
              href="https://discord.gg/tSmM6XMEkn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm font-light"
            >
              Discord
            </a>
          </div>
        </div>

        {/* Product */}
        <div className="space-y-6">
          {/* h3: highest heading level within the footer landmark — no h2 precedes these */}
          <h3 className="font-light tracking-widest text-sm uppercase text-muted-foreground/60">Product</h3>
          <div className="space-y-3">
            <Link to="/how-it-works" className="block text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm font-light tracking-wide">
              How It Works
            </Link>
            <Link to="/case-studies" className="block text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm font-light tracking-wide">
              Case Studies
            </Link>
            <Link to="/pricing" className="block text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm font-light tracking-wide">
              Pricing
            </Link>
            <Link to="/streamers" className="block text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm font-light tracking-wide">
              For Streamers
            </Link>
          </div>
        </div>

        {/* Resources */}
        <div className="space-y-6">
          <h3 className="font-light tracking-widest text-sm uppercase text-muted-foreground/60">Resources</h3>
          <div className="space-y-3">
            <Link to="/blog" className="block text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm font-light tracking-wide">
              Blog
            </Link>
            <Link to="/press" className="block text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm font-light tracking-wide">
              Press
            </Link>
            <Link to="/about" className="block text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm font-light tracking-wide">
              About Us
            </Link>
          </div>
        </div>

        {/* Contact */}
        <div className="space-y-6">
          <h3 className="font-light tracking-widest text-sm uppercase text-muted-foreground/60">Get in Touch</h3>
          <div className="space-y-3">
            <Link to="/demo" className="block text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm font-light tracking-wide">
              Book a Demo
            </Link>
            <a href="mailto:andreas@beta-ads.no" className="block text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm font-light tracking-wide">
              andreas@beta-ads.no
            </a>
            <a href="tel:+4746195548" className="block text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm font-light tracking-wide">
              +47 461 95 548
            </a>
          </div>
        </div>
      </div>

      <div className="mt-20 pt-12 text-center text-muted-foreground/60 font-extralight tracking-widest space-y-3">
        <p className="text-sm italic font-light tracking-wide">Made with kaffe in Oslo, Stockholm & Helsinki</p>
        <p>&copy; 2026 Beta Ads. All rights reserved. | Beta Agency AS | Org. 933 303 136</p>
      </div>
    </div>
  </footer>
);
