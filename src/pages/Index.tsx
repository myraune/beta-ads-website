import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ArrowRight, Play, Users, Target, TrendingUp, ExternalLink, Sparkles, Youtube, Twitch } from "lucide-react";
import { useState } from "react";

const Hero = ({ t, scrollToSection }: { t: any; scrollToSection: (id: string) => void }) => (
  <section className="relative overflow-hidden bg-gradient-to-br from-red-900 via-red-950 to-black text-white">
    <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.02%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
    <div className="relative max-w-7xl mx-auto px-8 lg:px-12 py-32 lg:py-40">
      <div className="text-center space-y-12">
        <div className="inline-flex items-center space-x-3">
          <Sparkles className="h-5 w-5 text-white/60" />
          <Badge className="bg-white/5 text-white/90 border-white/10 text-sm px-6 py-3 font-light backdrop-blur-sm tracking-wider">
            {t.heroSubtitle}
          </Badge>
        </div>

        <div className="space-y-8">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight leading-[0.9] tracking-tighter">
            {t.heroTitle[0]}{" "}
            <span className="font-light italic bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
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
            className="bg-white text-black hover:bg-gray-50 px-10 py-6 text-lg font-light tracking-wide h-auto border-0 shadow-2xl hover:shadow-white/10 transition-all duration-300 hover:scale-105"
            onClick={() => scrollToSection("how-it-works")}
          >
            {t.brandButton}
            <ArrowRight className="ml-3 h-5 w-5" />
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-white/50 text-white hover:bg-white/20 bg-white/10 px-10 py-6 text-lg font-light tracking-wide h-auto backdrop-blur-sm transition-all duration-300 hover:border-white/70"
            onClick={() => scrollToSection("streamer-section")}
          >
            {t.streamerButton}
            <ExternalLink className="ml-3 h-5 w-5" />
          </Button>
        </div>

        <div className="pt-16">
          <div className="relative bg-gradient-to-r from-white/5 to-white/10 rounded-3xl p-6 backdrop-blur-md border border-white/10 shadow-2xl max-w-4xl mx-auto">
            <div className="aspect-video rounded-2xl overflow-hidden border border-white/5">
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
              <p className="text-white/70 text-sm font-extralight tracking-wide">Overview of multiple campaigns in action</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const TrustedBy = () => (
  <section className="py-20 bg-white overflow-hidden">
    <div className="max-w-7xl mx-auto px-8 lg:px-12">
      <div className="text-center mb-16">
        <div className="mb-12 relative">
          <div className="flex overflow-hidden">
            <div className="flex animate-scroll">
              <div className="flex items-center space-x-24 whitespace-nowrap">
                <div className="h-12 w-32 flex items-center justify-center">
                  <img src="/lovable-uploads/711bde8c-3d71-40eb-8c93-2f8bf7350a57.png" alt="Samsung" className="max-h-12 max-w-32 opacity-60 object-contain" />
                </div>
                <div className="h-12 w-32 flex items-center justify-center">
                  <img src="/lovable-uploads/bf505fdb-dc9b-4a82-93b6-f604c840737f.png" alt="Surfshark" className="max-h-12 max-w-32 opacity-60 object-contain" />
                </div>
                <div className="h-12 w-32 flex items-center justify-center">
                  <img src="/lovable-uploads/1e56f4d8-0545-4132-8d6f-8738cdb1ae4f.png" alt="Komplett" className="max-h-12 max-w-32 opacity-60 object-contain" />
                </div>
                <div className="h-12 w-32 flex items-center justify-center">
                  <img src="/lovable-uploads/5b2346c1-8226-4f68-9806-5b03cba8e17c.png" alt="Shure" className="max-h-12 max-w-32 opacity-60 object-contain" />
                </div>
                <div className="h-12 w-32 flex items-center justify-center">
                  <img src="/lovable-uploads/59160e7a-4d18-4413-9f1b-f681271f8dde.png" alt="Foodora" className="max-h-12 max-w-32 opacity-60 object-contain" />
                </div>
                <div className="h-12 w-32 flex items-center justify-center">
                  <img src="/lovable-uploads/a3645b32-75a2-494d-aa42-f7b96dba1d94.png" alt="Group M" className="max-h-12 max-w-32 opacity-60 object-contain" />
                </div>
                <div className="h-12 w-32 flex items-center justify-center">
                  <img src="/lovable-uploads/cda69e31-7632-469a-b206-367ba4350480.png" alt="Logitech G" className="max-h-12 max-w-32 opacity-60 object-contain" />
                </div>
                <div className="h-12 w-32 flex items-center justify-center">
                  <img src="/lovable-uploads/1fc4788c-f973-403f-9b01-4f3b4fa2ba20.png" alt="SteelSeries" className="max-h-12 max-w-32 opacity-60 object-contain" />
                </div>
              </div>
              <div className="flex items-center space-x-24 whitespace-nowrap">
                <div className="h-12 w-32 flex items-center justify-center">
                  <img src="/lovable-uploads/711bde8c-3d71-40eb-8c93-2f8bf7350a57.png" alt="Samsung" className="max-h-12 max-w-32 opacity-60 object-contain" />
                </div>
                <div className="h-12 w-32 flex items-center justify-center">
                  <img src="/lovable-uploads/bf505fdb-dc9b-4a82-93b6-f604c840737f.png" alt="Surfshark" className="max-h-12 max-w-32 opacity-60 object-contain" />
                </div>
                <div className="h-12 w-32 flex items-center justify-center">
                  <img src="/lovable-uploads/1e56f4d8-0545-4132-8d6f-8738cdb1ae4f.png" alt="Komplett" className="max-h-12 max-w-32 opacity-60 object-contain" />
                </div>
                <div className="h-12 w-32 flex items-center justify-center">
                  <img src="/lovable-uploads/5b2346c1-8226-4f68-9806-5b03cba8e17c.png" alt="Shure" className="max-h-12 max-w-32 opacity-60 object-contain" />
                </div>
                <div className="h-12 w-32 flex items-center justify-center">
                  <img src="/lovable-uploads/59160e7a-4d18-4413-9f1b-f681271f8dde.png" alt="Foodora" className="max-h-12 max-w-32 opacity-60 object-contain" />
                </div>
                <div className="h-12 w-32 flex items-center justify-center">
                  <img src="/lovable-uploads/a3645b32-75a2-494d-aa42-f7b96dba1d94.png" alt="Group M" className="max-h-12 max-w-32 opacity-60 object-contain" />
                </div>
                <div className="h-12 w-32 flex items-center justify-center">
                  <img src="/lovable-uploads/cda69e31-7632-469a-b206-367ba4350480.png" alt="Logitech G" className="max-h-12 max-w-32 opacity-60 object-contain" />
                </div>
                <div className="h-12 w-32 flex items-center justify-center">
                  <img src="/lovable-uploads/1fc4788c-f973-403f-9b01-4f3b4fa2ba20.png" alt="SteelSeries" className="max-h-12 max-w-32 opacity-60 object-contain" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const HowItWorks = ({ t }: { t: any }) => (
  <section id="how-it-works" className="py-32 bg-gradient-to-br from-gray-50 to-white">
    <div className="max-w-7xl mx-auto px-8 lg:px-12">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-6xl font-extralight text-gray-900 mb-8 tracking-tighter">
          {t.howItWorksTitle}
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto font-extralight leading-relaxed tracking-wide">
          {t.howItWorksDescription}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Target className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-light text-gray-900 mb-4 tracking-wide">{t.step1Title}</h3>
            <p className="text-gray-600 font-extralight leading-relaxed tracking-wide">{t.step1Description}</p>
          </div>
        </div>

        <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-light text-gray-900 mb-4 tracking-wide">{t.step2Title}</h3>
            <p className="text-gray-600 font-extralight leading-relaxed tracking-wide">{t.step2Description}</p>
          </div>
        </div>

        <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Play className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-light text-gray-900 mb-4 tracking-wide">{t.step3Title}</h3>
            <p className="text-gray-600 font-extralight leading-relaxed tracking-wide">{t.step3Description}</p>
          </div>
        </div>

        <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <TrendingUp className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-light text-gray-900 mb-4 tracking-wide">{t.step4Title}</h3>
            <p className="text-gray-600 font-extralight leading-relaxed tracking-wide">{t.step4Description}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Examples = ({ t, caseVideos }: { t: any; caseVideos: any[] }) => (
  <section id="examples" className="py-32 bg-white">
    <div className="max-w-7xl mx-auto px-8 lg:px-12">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-6xl font-extralight text-gray-900 mb-8 tracking-tighter">
          {t.trustedByTitle}
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto font-extralight leading-relaxed tracking-wide">
          {t.trustedByDescription}
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        <Carousel className="w-full">
          <CarouselContent>
            {caseVideos.map((video) => (
              <CarouselItem key={video.id}>
                <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border border-gray-100 shadow-xl">
                  <div className="aspect-video rounded-2xl overflow-hidden border border-gray-200">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${video.id}`}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  </div>
                  <div className="text-center mt-6">
                    <h3 className="text-xl font-light text-gray-900 mb-2 tracking-wide">{video.brand}</h3>
                    <p className="text-gray-600 font-extralight tracking-wide">{video.title}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="text-gray-600 border-gray-200 hover:bg-gray-50" />
          <CarouselNext className="text-gray-600 border-gray-200 hover:bg-gray-50" />
        </Carousel>
      </div>
    </div>
  </section>
);

const StreamerSection = ({ t, language }: { t: any; language: string }) => (
  <section id="streamer-section" className="py-32 bg-gradient-to-br from-red-900 via-red-950 to-black text-white relative overflow-hidden">
    <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M20%2020c0-5.5-4.5-10-10-10s-10%204.5-10%2010%204.5%2010%2010%2010%2010-4.5%2010-10z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
    <div className="relative max-w-7xl mx-auto px-8 lg:px-12">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-6xl font-extralight mb-6 tracking-tighter">
          {t.streamerSectionTitle}
        </h2>
        <p className="text-2xl md:text-3xl text-gray-200 font-light mb-8 tracking-wide">
          {t.streamerSectionSubtitle}
        </p>
        <p className="text-xl text-gray-100 max-w-3xl mx-auto font-extralight leading-relaxed tracking-wide">
          {t.streamerSectionDescription}
        </p>
      </div>

      <div className="mb-16">
        <div className="text-center mb-12">
          <h3 className="text-2xl font-light text-white mb-4 tracking-wide">
            {language === "en" ? "Compatible with all major platforms" : "Kompatibel med alle store plattformer"}
          </h3>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-2xl mx-auto">
          <Button
            size="lg"
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg font-light tracking-wide h-auto shadow-xl transition-all duration-300 hover:scale-105 w-full sm:w-auto"
          >
            <Twitch className="mr-3 h-5 w-5" />
            Login with Twitch
          </Button>

          <Button
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-light tracking-wide h-auto shadow-xl transition-all duration-300 hover:scale-105 w-full sm:w-auto"
          >
            <Youtube className="mr-3 h-5 w-5" />
            Login with YouTube
          </Button>

          <Button
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-light tracking-wide h-auto shadow-xl transition-all duration-300 hover:scale-105 w-full sm:w-auto"
          >
            <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7.5 2L2 7.5v9L7.5 22h9L22 16.5v-9L16.5 2h-9z"/>
            </svg>
            Login with Kick
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-16">
        <Button
          size="lg"
          className="bg-white text-black hover:bg-gray-50 px-12 py-6 text-lg font-light tracking-wide h-auto shadow-2xl hover:shadow-white/10 transition-all duration-300 hover:scale-105"
          onClick={() => window.open("https://beta.instreamly.com/en/sponsorships/available", "_blank")}
        >
          {t.joinStreamer}
          <ExternalLink className="ml-4 h-5 w-5" />
        </Button>

        <Button
          size="lg"
          variant="outline"
          className="border-white/50 text-white hover:bg-white/20 bg-white/10 px-12 py-6 text-lg font-light tracking-wide h-auto backdrop-blur-sm transition-all duration-300 hover:border-white/70"
          onClick={() => window.open("https://discord.gg/hNgHCbQUvb", "_blank")}
        >
          Join Our Discord
          <ExternalLink className="ml-4 h-5 w-5" />
        </Button>
      </div>

      <div className="text-center">
        <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-4 border border-white/20">
          <TrendingUp className="h-6 w-6 text-gray-200" />
          <span className="text-gray-100 font-light text-lg tracking-wide">
            {language === "en"
              ? "Earn passive income based on your viewership"
              : "Tjen passiv inntekt basert på dine seertall"}
          </span>
        </div>
      </div>
    </div>
  </section>
);

const Press = ({ t }: { t: any }) => (
  <section className="py-32 bg-gradient-to-br from-red-900 via-red-950 to-black text-white relative overflow-hidden">
    <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M20%2020c0-5.5-4.5-10-10-10s-10%204.5-10%2010%204.5%2010%2010%2010%2010-4.5%2010-10z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
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

const Team = ({ t }: { t: any }) => (
  <section className="py-32 bg-gradient-to-br from-gray-50 to-white">
    <div className="max-w-7xl mx-auto px-8 lg:px-12">
      <div className="text-center mb-24">
        <h2 className="text-5xl md:text-7xl font-extralight text-gray-900 mb-12 tracking-tighter">
          {t.meetTeamTitle}
        </h2>
        <p className="text-2xl text-gray-600 max-w-4xl mx-auto font-extralight leading-relaxed tracking-wide">
          {t.meetTeamDescription}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-16 max-w-4xl mx-auto">
        <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
          <div className="w-40 h-40 rounded-full mx-auto mb-8 overflow-hidden group-hover:shadow-2xl transition-all duration-300">
            <img
              src="/lovable-uploads/e6d9646d-bf5f-471c-a2d8-1f06c274f570.png"
              alt="Andreas Myraune"
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-2xl font-light text-gray-900 mb-3 tracking-wide">Andreas Myraune</h3>
          <p className="text-gray-900 font-extralight mb-2 text-lg tracking-wide">Head of Agency</p>
          <p className="text-gray-500 font-extralight tracking-wide">andreas@beta-ads.no</p>
        </div>

        <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
          <div className="w-40 h-40 rounded-full mx-auto mb-8 overflow-hidden group-hover:shadow-2xl transition-all duration-300">
            <img
              src="/lovable-uploads/6f888d5f-8917-41fc-8808-f528b2aac891.png"
              alt="Toms Znatnajs"
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-2xl font-light text-gray-900 mb-3 tracking-wide">Toms Znatnajs</h3>
          <p className="text-gray-900 font-extralight mb-2 text-lg tracking-wide">Head of Talent</p>
          <p className="text-gray-500 font-extralight tracking-wide">toms@beta-ads.no</p>
        </div>
      </div>
    </div>
  </section>
);

const CTA = ({ t }: { t: any }) => (
  <section className="py-32 bg-gradient-to-br from-red-900 via-red-950 to-black text-white relative overflow-hidden">
    <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.02%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
    <div className="relative max-w-5xl mx-auto text-center px-8 lg:px-12">
      <h2 className="text-5xl md:text-7xl font-extralight mb-12 tracking-tighter">
        {t.ctaTitle}
      </h2>
      <p className="text-2xl text-gray-300 mb-16 max-w-3xl mx-auto font-extralight leading-relaxed tracking-wide">
        {t.ctaDescription}
      </p>

      <Button
        size="lg"
        className="bg-white text-black hover:bg-gray-50 px-16 py-8 text-xl font-light tracking-wide h-auto shadow-2xl hover:shadow-white/10 transition-all duration-300 hover:scale-105"
        onClick={() =>
          window.open(
            "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1RiJEObf5v758exr0hi5vk0ZRP0vgGQexQeAoykItGH1-RTFV1DQOye1rJbUSAqu7TdhWhRigO",
            "_blank"
          )
        }
      >
        {t.bookDemo}
        <ArrowRight className="ml-4 h-6 w-6" />
      </Button>
    </div>
  </section>
);

const Footer = ({ t, language, setLanguage }: { t: any; language: string; setLanguage: (lang: string) => void }) => (
  <footer className="bg-gray-900 text-white py-24">
    <div className="max-w-7xl mx-auto px-8 lg:px-12">
      <div className="grid md:grid-cols-4 gap-16">
        <div className="space-y-8">
          <h3 className="text-3xl font-extralight tracking-widest">Beta Ads</h3>
          <p className="text-gray-400 font-extralight leading-relaxed text-lg tracking-wide">
            {language === "en" ? "The future of Twitch advertising is here." : "Fremtiden for Twitch-annonsering er her."}
          </p>
        </div>

        <div className="space-y-8">
          <h4 className="font-light tracking-widest text-lg">{t.contactTitle}</h4>
          <div className="space-y-4 text-gray-400 font-extralight text-lg">
            <p className="tracking-wide">andreas@beta-ads.no</p>
            <p className="tracking-wide">+47 46195548</p>
          </div>
        </div>

        <div className="space-y-8">
          <h4 className="font-light tracking-widest text-lg">{t.connectTitle}</h4>
          <div className="space-y-4 text-gray-400 font-extralight text-lg">
            <p
              className="hover:text-white transition-colors cursor-pointer tracking-wide"
              onClick={() => window.open("https://www.linkedin.com/company/beta-nordic", "_blank")}
            >
              LinkedIn
            </p>
            <p
              className="hover:text-white transition-colors cursor-pointer tracking-wide"
              onClick={() => window.open("https://discord.gg/hNgHCbQUvb", "_blank")}
            >
              Discord
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <h4 className="font-light tracking-widest text-lg">{t.languageTitle}</h4>
          <div className="space-y-4 text-gray-400 font-extralight text-lg">
            <p
              className={`hover:text-white transition-colors cursor-pointer tracking-wide ${language === "en" ? "text-white" : ""}`}
              onClick={() => setLanguage("en")}
            >
              🇺🇸 English
            </p>
            <p
              className={`hover:text-white transition-colors cursor-pointer tracking-wide ${language === "no" ? "text-white" : ""}`}
              onClick={() => setLanguage("no")}
            >
              🇳🇴 Norwegian
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-20 pt-12 text-center text-gray-400 font-extralight tracking-widest">
        <p>&copy; 2024 Beta Ads. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

const Index = () => {
  const [language, setLanguage] = useState("en");

  const translations = {
    en: {
      heroSubtitle: "Nordic twitch agency",
      heroTitle: ["Your brand, live on Twitch", "– without interruptions"],
      heroDescription: "We place your brand inside Twitch streams through animated overlays that viewers actually notice.",
      heroSubDescription: "No forced integrations. Just guaranteed visibility.",
      brandButton: "See How It Works",
      streamerButton: "I'm a streamer",
      usedByTitle: "Used by Samsung, Surfshark, and Shure to reach Twitch viewers with native ads",
      seeCampaignExample: "See Campaign Example",
      howItWorksTitle: "Campaign Flow",
      howItWorksDescription: "Simple process, guaranteed results. Here's exactly how your brand reaches Twitch viewers.",
      step1Title: "1. Brand Chooses Campaign",
      step1Description: "Set your targeting, budget, and campaign goals with our team",
      step2Title: "2. We Activate 40+ Streamers",
      step2Description: "Your campaign goes live across our verified network simultaneously",
      step3Title: "3. Ads Appear 1-2x Per Hour",
      step3Description: "Animated overlays display naturally during streams",
      step4Title: "4. You Get Guaranteed Reach",
      step4Description: "Pay per view with transparent CPM tracking",
      streamerSectionTitle: "Are you a Twitch streamer?",
      streamerSectionSubtitle: "Earn while you stream – automatically.",
      streamerSectionDescription: "Earn money automatically with Beta Ads. No shoutouts. No affiliate links. Just passive income through overlays.",
      joinStreamer: "Join as a Streamer",
      trustedByTitle: "How your brand will look on Twitch",
      trustedByDescription: "Designed to blend with the stream – but stand out to the viewer.",
      meetTeamTitle: "Meet the team",
      meetTeamDescription: "Young, international, and passionate about revolutionizing advertising on Twitch.",
      ctaTitle: "Sounds cool?",
      ctaDescription: "Book a quick demo with our team and we'll show you what your brand could look like live on Twitch.",
      bookDemo: "Let's have a chat",
      contactTitle: "CONTACT",
      connectTitle: "CONNECT",
      languageTitle: "LANGUAGE",
      pressTitle: "Featured in Press",
      pressDescription: "Beta Ads has been featured in leading Nordic media outlets for our innovative approach to Twitch advertising.",
    },
    no: {
      heroSubtitle: "Nordisk Twitch-byrå",
      heroTitle: ["Din merkevare, live på Twitch", "– uten avbrytelser"],
      heroDescription: "Vi plasserer din merkevare inne i Twitch-streams gjennom animerte overlays som seere faktisk legger merke til.",
      heroSubDescription: "Ingen tvungne integrasjoner. Bare garantert synlighet.",
      brandButton: "Se Hvordan Det Fungerer",
      streamerButton: "Jeg er en streamer",
      usedByTitle: "Brukt av Samsung, Surfshark og Shure for å nå Twitch-seere med native annonser",
      seeCampaignExample: "Se Kampanjeeksempel",
      howItWorksTitle: "Kampanjeflyt",
      howItWorksDescription: "Enkel prosess, garanterte resultater. Her er nøyaktig hvordan din merkevare når Twitch-seere.",
      step1Title: "1. Merkevare Velger Kampanje",
      step1Description: "Sett målretting, budsjett og kampanjemål med vårt team",
      step2Title: "2. Vi Aktiverer 40+ Streamere",
      step2Description: "Din kampanje går live på tvers av vårt verifiserte nettverk samtidig",
      step3Title: "3. Annonser Vises 1-2x Per Time",
      step3Description: "Animerte overlays vises naturlig under streams",
      step4Title: "4. Du Får Garantert Rekkevidde",
      step4Description: "Betal per visning med transparent CPM-sporing",
      streamerSectionTitle: "Er du en Twitch-streamer?",
      streamerSectionSubtitle: "Tjen mens du streamer – automatisk.",
      streamerSectionDescription: "Tjen penger automatisk med Beta Ads. Ingen shoutouts. Ingen affiliate-lenker. Bare passiv inntekt gjennom overlays.",
      joinStreamer: "Bli med som Streamer",
      trustedByTitle: "Hvordan din merkevare vil se ut på Twitch",
      trustedByDescription: "Designet for å blande seg med streamen – men skille seg ut for seeren.",
      meetTeamTitle: "Møt teamet",
      meetTeamDescription: "Unge, internasjonale og lidenskapelige om å revolusjonere annonsering på Twitch.",
      ctaTitle: "Høres kult ut?",
      ctaDescription: "Book en rask demo med vårt team og vi viser deg hvordan din merkevare kan se ut live på Twitch.",
      bookDemo: "La oss snakke sammen",
      contactTitle: "KONTAKT",
      connectTitle: "KOBLE TIL",
      languageTitle: "SPRÅK",
      pressTitle: "Omtalt i Media",
      pressDescription: "Beta Ads har blitt omtalt i ledende nordiske medier for vår innovative tilnærming til Twitch-annonsering.",
    },
  };

  const t = translations[language];

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const caseVideos = [
    {
      id: "IZOx_VMdJJg",
      title: "Shure Campaign Case Study",
      brand: "Shure",
    },
    {
      id: "ufNq-A4d7iA",
      title: "Komplett Campaign Case Study",
      brand: "Komplett",
    },
    {
      id: "O9bK6Sg7wHg",
      title: "Samsung Campaign Case Study",
      brand: "Samsung",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Hero t={t} scrollToSection={scrollToSection} />
      <TrustedBy />
      <HowItWorks t={t} />
      <Examples t={t} caseVideos={caseVideos} />
      <StreamerSection t={t} language={language} />
      <Press t={t} />
      <Team t={t} />
      <CTA t={t} />
      <Footer t={t} language={language} setLanguage={setLanguage} />
    </div>
  );
};

export default Index;
