import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ArrowRight, Play, Users, Target, TrendingUp, Star, ExternalLink, Sparkles, CheckCircle } from "lucide-react";
import { useState } from "react";

const Index = () => {
  const [language, setLanguage] = useState('en');

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
      popUpsTitle: "Pop-ups in streams",
      popUpsDescription: "Small, branded animations appear 1-2 times per hour across 20+ livestreams simultaneously. No interruptions, just visibility.",
      payPerViewTitle: "Pay per view",
      payPerViewDescription: "CPM model with precise viewer targeting. You only pay for actual impressions, with full transparency on campaign performance.",
      streamersEarnTitle: "Streamers earn",
      streamersEarnDescription: "Streamers get paid per view automatically. No awkward sponsorship reads, no content changes. Just passive monetization.",
      streamerSectionTitle: "Are you a Twitch streamer?",
      streamerSectionSubtitle: "Earn while you stream – automatically.",
      streamerSectionDescription: "Earn money automatically with Beta Ads. No shoutouts. No affiliate links. Just passive income through overlays.",
      joinStreamer: "Join as a Streamer",
      estimateIncome: "Estimate My Income",
      whyTwitchTitle: "Why Twitch is the sleeping giant",
      whyTwitchDescription: "While other platforms saturate, Twitch offers authentic engagement with the most valuable demographics.",
      trustedByTitle: "How your brand will look on Twitch",
      trustedByDescription: "Designed to blend with the stream – but stand out to the viewer.",
      featuredCampaign: "FEATURED CAMPAIGN",
      meetTeamTitle: "Meet the team",
      meetTeamDescription: "Young, international, and passionate about revolutionizing advertising on Twitch.",
      ctaTitle: "Want to try a campaign?",
      ctaDescription: "Book a quick demo with our team and we'll show you what your brand could look like live on Twitch.",
      bookDemo: "Let's have a chat",
      contactTitle: "CONTACT",
      connectTitle: "CONNECT",
      languageTitle: "LANGUAGE"
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
      popUpsTitle: "Pop-ups i streams",
      popUpsDescription: "Små, merkede animasjoner vises 1-2 ganger per time på tvers av 20+ livestreams samtidig. Ingen avbrytelser, bare synlighet.",
      payPerViewTitle: "Betal per visning",
      payPerViewDescription: "CPM-modell med presis seer-targeting. Du betaler kun for faktiske visninger, med full transparens på kampanjeytelse.",
      streamersEarnTitle: "Streamere tjener",
      streamersEarnDescription: "Streamere får betalt per visning automatisk. Ingen pinlige sponsoravlesninger, ingen innholdsendringer. Bare passiv inntjening.",
      streamerSectionTitle: "Er du en Twitch-streamer?",
      streamerSectionSubtitle: "Tjen mens du streamer – automatisk.",
      streamerSectionDescription: "Tjen penger automatisk med Beta Ads. Ingen shoutouts. Ingen affiliate-lenker. Bare passiv inntekt gjennom overlays.",
      joinStreamer: "Bli med som Streamer",
      estimateIncome: "Estimer Min Inntekt",
      whyTwitchTitle: "Hvorfor Twitch er den sovende giganten",
      whyTwitchDescription: "Mens andre plattformer mettes, tilbyr Twitch autentisk engasjement med de mest verdifulle demografiene.",
      trustedByTitle: "Hvordan din merkevare vil se ut på Twitch",
      trustedByDescription: "Designet for å blande seg med streamen – men skille seg ut for seeren.",
      featuredCampaign: "UTVALGT KAMPANJE",
      meetTeamTitle: "Møt teamet",
      meetTeamDescription: "Unge, internasjonale og lidenskapelige om å revolusjonere annonsering på Twitch.",
      ctaTitle: "Vil du prøve en kampanje?",
      ctaDescription: "Book en rask demo med vårt team og vi viser deg hvordan din merkevare kan se ut live på Twitch.",
      bookDemo: "La oss snakke sammen",
      contactTitle: "KONTAKT",
      connectTitle: "KOBLE TIL",
      languageTitle: "SPRÅK"
    }
  };

  const t = translations[language];

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const caseVideos = [
    {
      id: "O9bK6Sg7wHg",
      title: "Samsung Galaxy Campaign Case Study",
      brand: "Samsung"
    },
    {
      id: "ufNq-A4d7iA", 
      title: "Komplett Campaign Case Study",
      brand: "Komplett"
    }
  ];

  const brands = ['Samsung', 'Surfshark', 'Komplett', 'Shure', 'Domino\'s'];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.02%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-8 lg:px-12 py-32 lg:py-40">
          <div className="text-center space-y-12">
            {/* Top badge */}
            <div className="inline-flex items-center space-x-3">
              <Sparkles className="h-5 w-5 text-white/60" />
              <Badge className="bg-white/5 text-white/90 border-white/10 text-sm px-6 py-3 font-light backdrop-blur-sm tracking-wider">
                {t.heroSubtitle}
              </Badge>
            </div>
            
            {/* Main heading */}
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
            
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <Button 
                size="lg" 
                className="bg-white text-black hover:bg-gray-50 px-10 py-6 text-lg font-light tracking-wide h-auto border-0 shadow-2xl hover:shadow-white/10 transition-all duration-300 hover:scale-105"
                onClick={() => scrollToSection('how-it-works')}
              >
                {t.brandButton}
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/50 text-white hover:bg-white/20 bg-white/10 px-10 py-6 text-lg font-light tracking-wide h-auto backdrop-blur-sm transition-all duration-300 hover:border-white/70"
                onClick={() => scrollToSection('streamer-section')}
              >
                {t.streamerButton}
                <ExternalLink className="ml-3 h-5 w-5" />
              </Button>
            </div>

            {/* Video showcase */}
            <div className="pt-16">
              <div className="relative bg-gradient-to-r from-white/5 to-white/10 rounded-3xl p-6 backdrop-blur-md border border-white/10 shadow-2xl max-w-4xl mx-auto">
                <div className="aspect-video rounded-2xl overflow-hidden border border-white/5">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/O9bK6Sg7wHg"
                    title="Samsung Campaign Example"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
                <div className="text-center mt-4">
                  <p className="text-white/70 text-sm font-extralight tracking-wide">Live example: Samsung overlay in action</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-8 tracking-wide max-w-4xl mx-auto">
              {t.usedByTitle}
            </h2>
            
            {/* Brand Carousel */}
            <div className="mb-12">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full max-w-4xl mx-auto"
              >
                <CarouselContent className="-ml-1">
                  {brands.map((brand, index) => (
                    <CarouselItem key={brand} className="pl-1 basis-1/3 md:basis-1/5">
                      <div className="p-1">
                        <div className="flex items-center justify-center h-16">
                          <div className="text-xl md:text-2xl font-extralight text-gray-400 hover:text-gray-900 transition-all duration-300 tracking-widest hover:scale-110 cursor-default text-center">
                            {brand}
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>

            <Button 
              variant="outline"
              size="lg"
              className="px-8 py-4 text-lg font-light tracking-wide border-gray-200 hover:bg-gray-50"
              onClick={() => scrollToSection('examples')}
            >
              {t.seeCampaignExample}
              <Play className="ml-3 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
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
          
          <div className="grid md:grid-cols-4 gap-8 lg:gap-12">
            {[
              {
                icon: Target,
                title: t.step1Title,
                description: t.step1Description
              },
              {
                icon: Users,
                title: t.step2Title,
                description: t.step2Description
              },
              {
                icon: Play,
                title: t.step3Title,
                description: t.step3Description
              },
              {
                icon: TrendingUp,
                title: t.step4Title,
                description: t.step4Description
              }
            ].map((item, index) => (
              <div key={item.title} className="text-center group hover:transform hover:scale-105 transition-all duration-300 relative">
                {/* Connection line */}
                {index < 3 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 to-transparent z-0"></div>
                )}
                
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-black to-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl group-hover:shadow-black/20 transition-all duration-300">
                    <item.icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-light text-gray-900 mb-6 tracking-wide">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed font-extralight text-lg tracking-wide">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Examples Section */}
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
          
          {/* Case Studies Carousel */}
          <div className="max-w-5xl mx-auto">
            <Carousel className="w-full">
              <CarouselContent>
                {caseVideos.map((video, index) => (
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
                        <p className="text-gray-700 text-lg font-light tracking-wide">{video.title}</p>
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

      {/* Streamer Section */}
      <section id="streamer-section" className="py-32 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M20%2020c0-5.5-4.5-10-10-10s-10%204.5-10%2010%204.5%2010%2010%2010%2010-4.5%2010-10z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-8 lg:px-12">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-extralight mb-6 tracking-tighter">
              {t.streamerSectionTitle}
            </h2>
            <p className="text-2xl md:text-3xl text-purple-200 font-light mb-8 tracking-wide">
              {t.streamerSectionSubtitle}
            </p>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto font-extralight leading-relaxed tracking-wide">
              {t.streamerSectionDescription}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-16">
            <Button 
              size="lg" 
              className="bg-white text-purple-900 hover:bg-purple-50 px-12 py-6 text-lg font-light tracking-wide h-auto shadow-2xl hover:shadow-white/10 transition-all duration-300 hover:scale-105"
              onClick={() => window.open('https://beta.instreamly.com/en/sponsorships/available', '_blank')}
            >
              {t.joinStreamer}
              <ExternalLink className="ml-4 h-5 w-5" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/50 text-white hover:bg-white/20 bg-white/10 px-12 py-6 text-lg font-light tracking-wide h-auto backdrop-blur-sm transition-all duration-300 hover:border-white/70"
              onClick={() => window.open('https://discord.gg/hNgHCbQUvb', '_blank')}
            >
              Join Our Discord
              <ExternalLink className="ml-4 h-5 w-5" />
            </Button>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-4 border border-white/20">
              <TrendingUp className="h-6 w-6 text-purple-200" />
              <span className="text-purple-100 font-light text-lg tracking-wide">
                {language === 'en' ? 'Earn passive income based on your viewership' : 'Tjen passiv inntekt basert på dine seertall'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Twitch Section */}
      <section className="py-32 bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M20%2020c0-5.5-4.5-10-10-10s-10%204.5-10%2010%204.5%2010%2010%2010%2010-4.5%2010-10z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-8 lg:px-12">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-extralight mb-12 tracking-tighter">
              {t.whyTwitchTitle}
            </h2>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto font-extralight leading-relaxed tracking-wide">
              {t.whyTwitchDescription}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-20 text-center">
            {[
              { stat: "2.5hrs", label: language === 'en' ? "Average viewing session" : "Gjennomsnittlig visningsøkt", subtitle: language === 'en' ? "vs 5-15 seconds on TikTok" : "vs 5-15 sekunder på TikTok" },
              { stat: "73%", label: language === 'en' ? "Gen Z & Millennial audience" : "Gen Z & Millennial publikum", subtitle: language === 'en' ? "Prime consumer demographics" : "Primære forbrukerdemografi" },
              { stat: "85%", label: language === 'en' ? "Viewer loyalty rate" : "Seer-lojalitetsrate", subtitle: language === 'en' ? "Highly engaged communities" : "Høyt engasjerte samfunn" }
            ].map((item, index) => (
              <div key={item.stat} className="space-y-8 group hover:transform hover:scale-105 transition-all duration-300">
                <div className="text-7xl font-extralight text-white tracking-tighter group-hover:text-gray-200 transition-colors duration-300">{item.stat}</div>
                <p className="text-2xl text-gray-200 font-light tracking-wide">{item.label}</p>
                <p className="text-gray-400 font-extralight text-lg tracking-wide">{item.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
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

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
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
            onClick={() => window.open('https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1RiJEObf5v758exr0hi5vk0ZRP0vgGQexQeAoykItGH1-RTFV1DQOye1rJbUSAqu7TdhWhRigO', '_blank')}
          >
            {t.bookDemo}
            <ArrowRight className="ml-4 h-6 w-6" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="grid md:grid-cols-4 gap-16">
            <div className="space-y-8">
              <h3 className="text-3xl font-extralight tracking-widest">Beta Ads</h3>
              <p className="text-gray-400 font-extralight leading-relaxed text-lg tracking-wide">
                {language === 'en' ? 'The future of Twitch advertising is here.' : 'Fremtiden for Twitch-annonsering er her.'}
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
                  onClick={() => window.open('https://www.linkedin.com/company/beta-nordic', '_blank')}
                >
                  LinkedIn
                </p>
                <p 
                  className="hover:text-white transition-colors cursor-pointer tracking-wide"
                  onClick={() => window.open('https://discord.gg/hNgHCbQUvb', '_blank')}
                >
                  Discord
                </p>
              </div>
            </div>
            
            <div className="space-y-8">
              <h4 className="font-light tracking-widest text-lg">{t.languageTitle}</h4>
              <div className="space-y-4 text-gray-400 font-extralight text-lg">
                <p 
                  className={`hover:text-white transition-colors cursor-pointer tracking-wide ${language === 'en' ? 'text-white' : ''}`}
                  onClick={() => setLanguage('en')}
                >
                  🇺🇸 English
                </p>
                <p 
                  className={`hover:text-white transition-colors cursor-pointer tracking-wide ${language === 'no' ? 'text-white' : ''}`}
                  onClick={() => setLanguage('no')}
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
    </div>
  );
};

export default Index;
