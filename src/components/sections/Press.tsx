import React from "react";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

interface PressProps {
  t: any;
}

export const Press: React.FC<PressProps> = ({ t }) => (
  <section className="pt-32 pb-16 bg-gradient-to-b from-red-900 via-red-950 to-red-950 text-white relative overflow-hidden">
    <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M20%2020c0-5.5-4.5-10-10-10s-10%204.5-10%2010%204.5%2010%2010-4.5%2010-10z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
    <div className="relative max-w-7xl mx-auto px-8 lg:px-12">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-6xl font-extralight text-white mb-8 tracking-tighter">
          {t.pressTitle}
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto font-extralight leading-relaxed tracking-wide">
          {t.pressDescription}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="group cursor-pointer" onClick={() => window.open("https://kampanje.com/premium/mai-2025/innsikt/andreas-22-startet-byra-ved-siden-av-studiene--na-utvider-han-til-sverige-og-finland/", "_blank")}>
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 border border-white/10 hover:bg-white/10">
            <div className="mb-4">
              <Badge className="bg-red-500/20 text-red-300 border-red-400/30 text-xs font-light">Kampanje</Badge>
            </div>
            <h3 className="text-lg font-light text-white mb-3 tracking-wide group-hover:text-red-300 transition-colors">
              Andreas (22) startet byrå ved siden av studiene
            </h3>
            <p className="text-gray-300 text-sm font-extralight leading-relaxed">
              Nå utvider han til Sverige og Finland
            </p>
            <div className="mt-4 flex items-center text-gray-400 text-xs">
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