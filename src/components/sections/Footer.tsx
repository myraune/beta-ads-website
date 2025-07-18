import React from "react";

interface FooterProps {
  t: any;
  language: string;
  setLanguage: (lang: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ t, language, setLanguage }) => (
  <footer className="bg-white text-gray-900 py-24">
    <div className="max-w-7xl mx-auto px-8 lg:px-12">
      <div className="grid md:grid-cols-3 gap-16">
        <div className="space-y-8">
          <h3 className="text-3xl font-extralight tracking-widest">Beta Ads</h3>
          <p className="text-gray-600 font-extralight leading-relaxed text-lg tracking-wide">
            {t.footerDescription}
          </p>
        </div>

        <div className="space-y-8">
          <h4 className="font-light tracking-widest text-lg">{t.contactTitle}</h4>
          <div className="space-y-4 text-gray-600 font-extralight text-lg">
            <p className="tracking-wide">andreas@beta-ads.no</p>
            <p className="tracking-wide">+47 46195548</p>
          </div>
        </div>

        <div className="space-y-8">
          <h4 className="font-light tracking-widest text-lg">{t.connectTitle}</h4>
          <div className="space-y-4 text-gray-600 font-extralight text-lg">
            <p
              className="hover:text-gray-900 transition-colors cursor-pointer tracking-wide"
              onClick={() => window.open("https://www.linkedin.com/company/beta-nordic", "_blank")}
            >
              LinkedIn
            </p>
            <p
              className="hover:text-gray-900 transition-colors cursor-pointer tracking-wide"
              onClick={() => window.open("https://discord.gg/hNgHCbQUvb", "_blank")}
            >
              Discord
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 mt-20 pt-12 text-center text-gray-600 font-extralight tracking-widest">
        <p>&copy; 2024 Beta Ads. All rights reserved.</p>
      </div>
    </div>
  </footer>
);