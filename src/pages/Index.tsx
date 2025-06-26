import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play, Users, Target, TrendingUp, Star, ExternalLink, Sparkles } from "lucide-react";

const Index = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.02%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-8 lg:px-12 py-40 lg:py-48">
          <div className="text-center space-y-16">
            <div className="inline-flex items-center space-x-3">
              <Sparkles className="h-5 w-5 text-white/60" />
              <Badge className="bg-white/5 text-white/90 border-white/10 text-sm px-8 py-4 font-light backdrop-blur-sm tracking-wider">
                Now live across Nordic markets
              </Badge>
            </div>
            
            <div className="space-y-8">
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-extralight leading-[0.85] tracking-tighter">
                The ad format{" "}
                <span className="font-light italic bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Twitch
                </span>{" "}
                has been waiting for
              </h1>
              
              <div className="max-w-5xl mx-auto">
                <p className="text-2xl md:text-3xl text-gray-300 leading-relaxed font-extralight tracking-wide">
                  Automated pop-up overlays that appear naturally in livestreams.
                </p>
                <p className="text-xl md:text-2xl text-gray-400 mt-4 font-extralight">
                  No forced integrations. Just guaranteed visibility.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center pt-16">
              <Button 
                size="lg" 
                className="bg-white text-black hover:bg-gray-50 px-12 py-8 text-lg font-light tracking-wide h-auto border-0 shadow-2xl hover:shadow-white/10 transition-all duration-300 hover:scale-105"
                onClick={() => scrollToSection('how-it-works')}
              >
                I'm a brand
                <ArrowRight className="ml-4 h-5 w-5" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/20 text-white hover:bg-white/5 px-12 py-8 text-lg font-light tracking-wide h-auto backdrop-blur-sm transition-all duration-300 hover:border-white/30"
                onClick={() => window.open('https://beta.instreamly.com/en/sponsorships/available', '_blank')}
              >
                I'm a streamer
                <ExternalLink className="ml-4 h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* Video Area - Updated with Samsung case study */}
          <div className="mt-32 max-w-6xl mx-auto">
            <div className="relative bg-gradient-to-r from-white/5 to-white/10 rounded-3xl p-8 backdrop-blur-md border border-white/10 shadow-2xl">
              <div className="aspect-video rounded-2xl overflow-hidden border border-white/5">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/O9bK6Sg7wHg"
                  title="Samsung Case Study - Beta Ads"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
              <div className="text-center mt-6">
                <p className="text-white/70 text-lg font-extralight tracking-wide">Samsung Galaxy Campaign Case Study</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-40 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-extralight text-gray-900 mb-12 tracking-tighter">
              How it works
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto font-extralight leading-relaxed tracking-wide">
              Simple, automated, effective. We handle everything while brands get guaranteed visibility and streamers earn passively.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-20">
            {[
              {
                icon: Target,
                title: "Pop-ups in streams",
                description: "Small, branded animations appear 1-2 times per hour across 20+ livestreams simultaneously. No interruptions, just visibility."
              },
              {
                icon: TrendingUp,
                title: "Pay per view",
                description: "CPM model with precise viewer targeting. You only pay for actual impressions, with full transparency on campaign performance."
              },
              {
                icon: Users,
                title: "Streamers earn",
                description: "Streamers get paid per view automatically. No awkward sponsorship reads, no content changes. Just passive monetization."
              }
            ].map((item, index) => (
              <div key={item.title} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                <div className="w-24 h-24 bg-gradient-to-br from-black to-gray-800 rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-2xl group-hover:shadow-black/20 transition-all duration-300">
                  <item.icon className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-3xl font-light text-gray-900 mb-8 tracking-wide">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed font-extralight text-xl tracking-wide">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Twitch Section */}
      <section className="py-40 bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M20%2020c0-5.5-4.5-10-10-10s-10%204.5-10%2010%204.5%2010%2010%2010%2010-4.5%2010-10z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-8 lg:px-12">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-extralight mb-12 tracking-tighter">
              Why Twitch is the sleeping giant
            </h2>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto font-extralight leading-relaxed tracking-wide">
              While other platforms saturate, Twitch offers authentic engagement with the most valuable demographics.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-20 text-center">
            {[
              { stat: "2.5hrs", label: "Average viewing session", subtitle: "vs 5-15 seconds on TikTok" },
              { stat: "73%", label: "Gen Z & Millennial audience", subtitle: "Prime consumer demographics" },
              { stat: "85%", label: "Viewer loyalty rate", subtitle: "Highly engaged communities" }
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

      {/* Case Studies Section */}
      <section className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-extralight text-gray-900 mb-12 tracking-tighter">
              Trusted by leading brands
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto font-extralight leading-relaxed tracking-wide">
              From tech giants to local favorites, brands choose Beta Ads for authentic Twitch engagement.
            </p>
          </div>
          
          <div className="grid grid-cols-3 md:grid-cols-5 gap-16 items-center justify-items-center mb-32">
            {['Samsung', 'Surfshark', 'Komplett', 'Shure', 'Domino\'s'].map((brand, index) => (
              <div key={brand} className="text-3xl font-extralight text-gray-400 hover:text-gray-900 transition-all duration-300 tracking-widest hover:scale-110 cursor-default">
                {brand}
              </div>
            ))}
          </div>
          
          <Card className="max-w-6xl mx-auto border-0 shadow-2xl bg-gradient-to-br from-gray-50 to-white">
            <CardContent className="p-16 space-y-12">
              <div className="flex items-center space-x-4">
                <Star className="h-8 w-8 text-black fill-current" />
                <span className="font-light text-gray-900 tracking-widest text-lg">FEATURED CAMPAIGN</span>
              </div>
              
              <h3 className="text-4xl font-extralight text-gray-900 tracking-wide">Samsung Galaxy Campaign</h3>
              
              <div className="grid md:grid-cols-3 gap-16 text-center pt-12">
                {[
                  { value: "2.3M", label: "Total impressions" },
                  { value: "$1.20", label: "Cost per 1000 views" },
                  { value: "94%", label: "Campaign completion rate" }
                ].map((metric, index) => (
                  <div key={metric.label} className="space-y-4">
                    <div className="text-5xl font-extralight text-black tracking-tighter">{metric.value}</div>
                    <p className="text-gray-600 font-extralight text-lg tracking-wide">{metric.label}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-40 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-extralight text-gray-900 mb-12 tracking-tighter">
              Meet the team
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto font-extralight leading-relaxed tracking-wide">
              Young, international, and passionate about revolutionizing advertising on Twitch.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-16">
            {[
              { name: 'Alex Chen', role: 'CEO & Co-founder', location: 'Oslo, Norway' },
              { name: 'Sarah Kim', role: 'Head of Partnerships', location: 'Stockholm, Sweden' },
              { name: 'Marcus Johansson', role: 'Tech Lead', location: 'Helsinki, Finland' }
            ].map((member, index) => (
              <div key={member.name} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                <div className="w-40 h-40 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full mx-auto mb-8 group-hover:shadow-2xl transition-all duration-300"></div>
                <h3 className="text-2xl font-light text-gray-900 mb-3 tracking-wide">{member.name}</h3>
                <p className="text-gray-900 font-extralight mb-2 text-lg tracking-wide">{member.role}</p>
                <p className="text-gray-500 font-extralight tracking-widest uppercase text-sm">{member.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.02%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        <div className="relative max-w-5xl mx-auto text-center px-8 lg:px-12">
          <h2 className="text-5xl md:text-7xl font-extralight mb-12 tracking-tighter">
            Ready to test a campaign?
          </h2>
          <p className="text-2xl text-gray-300 mb-16 max-w-3xl mx-auto font-extralight leading-relaxed tracking-wide">
            Get started with a small test campaign. No long-term commitments, full transparency, and results you can measure.
          </p>
          
          <Button 
            size="lg" 
            className="bg-white text-black hover:bg-gray-50 px-16 py-8 text-xl font-light tracking-wide h-auto shadow-2xl hover:shadow-white/10 transition-all duration-300 hover:scale-105"
          >
            Book a demo call
            <ArrowRight className="ml-4 h-6 w-6" />
          </Button>
          
          <p className="text-gray-400 text-lg mt-12 font-extralight tracking-widest">
            Minimum campaign budget: $500 • Setup takes less than 24 hours
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="grid md:grid-cols-4 gap-16">
            <div className="space-y-8">
              <h3 className="text-3xl font-extralight tracking-widest">Beta Ads</h3>
              <p className="text-gray-400 font-extralight leading-relaxed text-lg tracking-wide">
                The future of Twitch advertising is here.
              </p>
            </div>
            
            <div className="space-y-8">
              <h4 className="font-light tracking-widest text-lg">CONTACT</h4>
              <div className="space-y-4 text-gray-400 font-extralight text-lg">
                <p className="tracking-wide">hello@betaads.com</p>
                <p className="tracking-wide">+47 123 45 678</p>
              </div>
            </div>
            
            <div className="space-y-8">
              <h4 className="font-light tracking-widest text-lg">CONNECT</h4>
              <div className="space-y-4 text-gray-400 font-extralight text-lg">
                <p className="hover:text-white transition-colors cursor-pointer tracking-wide">LinkedIn</p>
                <p className="hover:text-white transition-colors cursor-pointer tracking-wide">Discord</p>
                <p className="hover:text-white transition-colors cursor-pointer tracking-wide">Twitter</p>
              </div>
            </div>
            
            <div className="space-y-8">
              <h4 className="font-light tracking-widest text-lg">LANGUAGE</h4>
              <div className="space-y-4 text-gray-400 font-extralight text-lg">
                <p className="hover:text-white transition-colors cursor-pointer tracking-wide">🇺🇸 English</p>
                <p className="hover:text-white transition-colors cursor-pointer tracking-wide">🇳🇴 Norwegian</p>
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
