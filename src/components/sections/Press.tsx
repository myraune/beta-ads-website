import React from "react";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

interface PressProps {
  t: any;
}

export const Press: React.FC<PressProps> = ({ t }) => (
  <section className="py-20 lg:py-32 relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-extralight text-foreground mb-8 tracking-tighter">
          {t.pressTitle}
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-extralight leading-relaxed tracking-wide">
          {t.pressDescription}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="group cursor-pointer" onClick={() => window.open("https://kampanje.com/premium/mai-2025/innsikt/andreas-22-startet-byra-ved-siden-av-studiene--na-utvider-han-til-sverige-og-finland/", "_blank")}>
          <div className="glass-card-hover rounded-2xl p-6">
            <div className="mb-4">
              <Badge className="bg-red-500/20 text-red-300 border-red-400/30 text-xs font-light">Kampanje</Badge>
            </div>
            <h3 className="text-lg font-light text-foreground mb-3 tracking-wide group-hover:text-primary transition-colors">
              Andreas (22) startet byrå ved siden av studiene
            </h3>
            <p className="text-muted-foreground text-sm font-extralight leading-relaxed">
              Nå utvider han til Sverige og Finland
            </p>
            <div className="mt-4 flex items-center text-muted-foreground text-xs">
              <ExternalLink className="h-3 w-3 mr-1" />
              <span>Les mer</span>
            </div>
          </div>
        </div>

        <div className="group cursor-pointer" onClick={() => window.open("https://kampanje.com/premium/september-2024/innsikt/andreas-21-satser-pa-eget-twtich-byra--na-far-han-polske-tech-krefter-i-ryggen---har-lagt-grunnlaget-na/", "_blank")}>
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 border border-white/10 hover:bg-white/10">
            <div className="mb-4">
              <Badge className="bg-red-500/20 text-red-300 border-red-400/30 text-xs font-light">Kampanje</Badge>
            </div>
            <h3 className="text-lg font-light text-white mb-3 tracking-wide group-hover:text-red-300 transition-colors">
              Andreas (21) satser på eget Twitch-byrå
            </h3>
            <p className="text-gray-300 text-sm font-extralight leading-relaxed">
              Nå får han polske tech-krefter i ryggen
            </p>
            <div className="mt-4 flex items-center text-gray-400 text-xs">
              <ExternalLink className="h-3 w-3 mr-1" />
              <span>Les mer</span>
            </div>
          </div>
        </div>

        <div className="group cursor-pointer" onClick={() => window.open("https://www.kom24.no/andreas-myraune-beta-influensere/ny-kanal-for-mediekjop-beta-er-norges-nye-twitch-byra/730424", "_blank")}>
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 border border-white/10 hover:bg-white/10">
            <div className="mb-4">
              <Badge className="bg-green-500/20 text-green-300 border-green-400/30 text-xs font-light">Kom24</Badge>
            </div>
            <h3 className="text-lg font-light text-white mb-3 tracking-wide group-hover:text-green-300 transition-colors">
              Ny kanal for mediekjøp
            </h3>
            <p className="text-gray-300 text-sm font-extralight leading-relaxed">
              Beta er Norges nye Twitch-byrå
            </p>
            <div className="mt-4 flex items-center text-gray-400 text-xs">
              <ExternalLink className="h-3 w-3 mr-1" />
              <span>Les mer</span>
            </div>
          </div>
        </div>

        <div className="group cursor-pointer" onClick={() => window.open("https://www.kom24.no/andreas-myraune-beta-instreamly/instreamly-og-beta-inngar-partnerskap-i-norge/749907", "_blank")}>
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 border border-white/10 hover:bg-white/10">
            <div className="mb-4">
              <Badge className="bg-green-500/20 text-green-300 border-green-400/30 text-xs font-light">Kom24</Badge>
            </div>
            <h3 className="text-lg font-light text-white mb-3 tracking-wide group-hover:text-green-300 transition-colors">
              Instreamly og Beta inngår partnerskap
            </h3>
            <p className="text-gray-300 text-sm font-extralight leading-relaxed">
              Strategisk samarbeid i Norge
            </p>
            <div className="mt-4 flex items-center text-gray-400 text-xs">
              <ExternalLink className="h-3 w-3 mr-1" />
              <span>Les mer</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);