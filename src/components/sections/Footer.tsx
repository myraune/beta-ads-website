import React from "react";
import { Link } from "react-router-dom";

interface FooterProps {
  t: any;
}

export const Footer: React.FC<FooterProps> = ({ t }) => (
  <footer className="py-24">
    <div className="max-w-7xl mx-auto px-8 lg:px-12">
      <div className="grid md:grid-cols-3 gap-16">
        <div className="space-y-8">
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
          <p className="text-muted-foreground font-extralight leading-relaxed text-lg tracking-wide">
            {t.footerDescription}
          </p>
        </div>

        <div className="space-y-8">
          <h4 className="font-light tracking-widest text-lg">{t.contactTitle}</h4>
          <div className="space-y-4 text-muted-foreground font-extralight text-lg">
            <p className="tracking-wide">andreas@beta-ads.no</p>
            <p className="tracking-wide">+47 46195548</p>
          </div>
        </div>

        <div className="space-y-8">
          <h4 className="font-light tracking-widest text-lg">{t.connectTitle}</h4>
          <div className="space-y-4 text-muted-foreground font-extralight text-lg">
            <p
              className="hover:text-foreground transition-colors cursor-pointer tracking-wide"
              onClick={() => window.open("https://www.linkedin.com/company/beta-nordic", "_blank")}
            >
              LinkedIn
            </p>
            <p
              className="hover:text-foreground transition-colors cursor-pointer tracking-wide"
              onClick={() => window.open("https://discord.gg/hNgHCbQUvb", "_blank")}
            >
              Discord
            </p>
            <Link 
              to="/blog" 
              className="hover:text-foreground transition-colors tracking-wide block"
            >
              Blog
            </Link>
            <Link 
              to="/about" 
              className="hover:text-foreground transition-colors tracking-wide block"
            >
              About
            </Link>
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
