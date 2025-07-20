import React from "react";

interface FooterProps {
  t: any;
  language: string;
  setLanguage: (lang: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ t, language, setLanguage }) => (
  <footer className="bg-background text-foreground py-24">
    <div className="max-w-7xl mx-auto px-8 lg:px-12">
      <div className="grid md:grid-cols-3 gap-16">
        <div className="space-y-8">
          <div className="flex items-center">
            {/* Dark theme logo */}
            <img 
              src="/lovable-uploads/d3f9fcbc-48d7-4015-82cd-721f68f85de3.png" 
              alt="Beta AOS" 
              className="h-8 w-auto dark:block hidden"
            />
            {/* Light theme logo */}
            <img 
              src="/lovable-uploads/4036e1d6-6941-4822-9a2b-41b6c09ef4bc.png" 
              alt="Beta AOS" 
              className="h-8 w-auto dark:hidden block"
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
          </div>
        </div>
      </div>

      <div className="border-t border-border mt-20 pt-12 text-center text-muted-foreground font-extralight tracking-widest">
        <p>&copy; 2024 Beta Ads. All rights reserved.</p>
      </div>
    </div>
  </footer>
);