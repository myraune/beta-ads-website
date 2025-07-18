import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ExternalLink, Sparkles, ChevronDown } from "lucide-react";



interface HeroProps {
  t: any;
  scrollToSection: (id: string) => void;
  language: string;
  setLanguage: (lang: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ t, scrollToSection, language, setLanguage }) => {
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  
  const languages = [
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "no", label: "Norsk", flag: "🇳🇴" },
    { code: "sv", label: "Svenska", flag: "🇸🇪" },
    { code: "fi", label: "Suomi", flag: "🇫🇮" },
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-red-950 via-red-900 to-black text-gray-100">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23000000%22%20fill-opacity%3D%220.02%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      {/* Language Dropdown */}
      <div className="absolute top-8 right-8 z-10">
        <div className="relative">
          <button
            onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
            className="flex items-center space-x-2 bg-black/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30 text-gray-200 hover:text-white transition-all duration-300"
          >
            <span className="text-sm">{currentLanguage?.flag}</span>
            <span className="text-sm font-light">{currentLanguage?.label}</span>
            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isLanguageDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isLanguageDropdownOpen && (
            <div className="absolute top-full mt-2 right-0 bg-black/90 backdrop-blur-md rounded-xl border border-white/20 py-2 min-w-[140px] shadow-xl">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setIsLanguageDropdownOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-2 text-sm transition-all duration-200 ${
                    language === lang.code
                      ? "bg-white/10 text-white"
                      : "text-gray-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span className="font-light">{lang.label}</span>
                </button>
            ))}
            </div>
          )}
        </div>
      </div>

    <div className="relative max-w-7xl mx-auto px-8 lg:px-12 py-32 lg:py-40">
      <div className="text-center space-y-12">
        <div className="inline-flex items-center space-x-3">
          <Sparkles className="h-5 w-5 text-gray-300" />
          <Badge className="bg-black/20 text-gray-200 border-gray-500 text-sm px-6 py-3 font-light backdrop-blur-sm tracking-wider">
            {t.heroSubtitle}
          </Badge>
        </div>

        <div className="space-y-8">
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center">
              <span className="text-5xl md:text-6xl font-extralight text-gray-100 tracking-tighter">Beta</span>
              <span className="text-5xl md:text-6xl font-extralight text-red-400 tracking-tighter ml-2">Ads</span>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight leading-[0.9] tracking-tighter text-gray-100">
            {t.heroTitle[0]}{" "}
            <span className="font-light italic bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
              {t.heroTitle[1]}
            </span>
          </h1>

          <div className="max-w-3xl mx-auto">
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-extralight tracking-wide">
              {t.heroDescription}
            </p>
            <p className="text-lg md:text-xl text-gray-400 mt-4 font-extralight">
              {t.heroSubDescription}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
          <Button
            size="lg"
            className="bg-white text-gray-900 hover:bg-gray-100 px-10 py-6 text-lg font-light tracking-wide h-auto border-0 shadow-2xl hover:shadow-white/20 transition-all duration-300 hover:scale-105"
            onClick={() => scrollToSection("examples")}
          >
            {t.brandButton}
            <ArrowRight className="ml-3 h-5 w-5" />
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-gray-400 text-gray-200 hover:bg-white/10 bg-black/30 px-10 py-6 text-lg font-light tracking-wide h-auto backdrop-blur-sm transition-all duration-300 hover:border-gray-300"
            onClick={() => scrollToSection("streamer-section")}
          >
            {t.streamerButton}
            <ExternalLink className="ml-3 h-5 w-5" />
          </Button>
        </div>

        <div className="pt-16">
          <div className="relative bg-gradient-to-r from-black/30 to-red-900/40 rounded-3xl p-6 backdrop-blur-md border border-gray-600/30 shadow-2xl max-w-4xl mx-auto">
            <div className="aspect-video rounded-2xl overflow-hidden border border-gray-600/20">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/P9yEc7v22MI"
                title="Campaign Grid Overview"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            <div className="text-center mt-4">
              <p className="text-gray-300 text-sm font-extralight tracking-wide">{t.campaignOverview}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};