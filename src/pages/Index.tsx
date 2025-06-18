
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play, Users, Target, TrendingUp, Star, ExternalLink } from "lucide-react";

const Index = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-black text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        <div className="relative max-w-6xl mx-auto px-6 lg:px-8 py-32 lg:py-40">
          <div className="text-center space-y-12">
            <Badge className="bg-white/10 text-white border-white/20 text-sm px-6 py-3 font-medium tracking-wide">
              Now live across Nordic markets
            </Badge>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light leading-[0.9] tracking-tight">
              The ad format{" "}
              <span className="font-medium italic">
                Twitch
              </span>{" "}
              has been waiting for
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
              Automated pop-up overlays that appear naturally in livestreams.<br />
              No forced integrations. Just guaranteed visibility.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-12">
              <Button 
                size="lg" 
                className="bg-white text-black hover:bg-gray-100 px-10 py-6 text-base font-medium tracking-wide h-auto"
                onClick={() => scrollToSection('how-it-works')}
              >
                I'm a brand
                <ArrowRight className="ml-3 h-4 w-4" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/5 px-10 py-6 text-base font-medium tracking-wide h-auto"
                onClick={() => window.open('https://beta.instreamly.com/en/sponsorships/available', '_blank')}
              >
                I'm a streamer
                <ExternalLink className="ml-3 h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Video Mockup Area */}
          <div className="mt-24 max-w-5xl mx-auto">
            <div className="relative bg-gradient-to-r from-gray-800/30 to-gray-700/30 rounded-3xl p-12 backdrop-blur-sm border border-white/10">
              <div className="aspect-video bg-gray-900/60 rounded-2xl flex items-center justify-center">
                <div className="text-center space-y-6">
                  <Play className="h-20 w-20 text-white/40 mx-auto" />
                  <p className="text-white/60 text-lg font-light">Interactive ad demo coming soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-32 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-light text-gray-900 mb-8 tracking-tight">
              How it works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
              Simple, automated, effective. We handle everything while brands get guaranteed visibility and streamers earn passively.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-16">
            <div className="text-center">
              <div className="w-20 h-20 bg-black rounded-2xl flex items-center justify-center mx-auto mb-8">
                <Target className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-medium text-gray-900 mb-6">Pop-ups in streams</h3>
              <p className="text-gray-600 leading-relaxed font-light text-lg">
                Small, branded animations appear 1-2 times per hour across 20+ livestreams simultaneously. No interruptions, just visibility.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-black rounded-2xl flex items-center justify-center mx-auto mb-8">
                <TrendingUp className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-medium text-gray-900 mb-6">Pay per view</h3>
              <p className="text-gray-600 leading-relaxed font-light text-lg">
                CPM model with precise viewer targeting. You only pay for actual impressions, with full transparency on campaign performance.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-black rounded-2xl flex items-center justify-center mx-auto mb-8">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-medium text-gray-900 mb-6">Streamers earn</h3>
              <p className="text-gray-600 leading-relaxed font-light text-lg">
                Streamers get paid per view automatically. No awkward sponsorship reads, no content changes. Just passive monetization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Twitch Section */}
      <section className="py-32 bg-black text-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-light mb-8 tracking-tight">
              Why Twitch is the sleeping giant
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
              While other platforms saturate, Twitch offers authentic engagement with the most valuable demographics.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-16 text-center">
            <div className="space-y-6">
              <div className="text-6xl font-light text-white">2.5hrs</div>
              <p className="text-xl text-gray-200 font-medium">Average viewing session</p>
              <p className="text-gray-400 font-light">vs 5-15 seconds on TikTok</p>
            </div>
            
            <div className="space-y-6">
              <div className="text-6xl font-light text-white">73%</div>
              <p className="text-xl text-gray-200 font-medium">Gen Z & Millennial audience</p>
              <p className="text-gray-400 font-light">Prime consumer demographics</p>
            </div>
            
            <div className="space-y-6">
              <div className="text-6xl font-light text-white">85%</div>
              <p className="text-xl text-gray-200 font-medium">Viewer loyalty rate</p>
              <p className="text-gray-400 font-light">Highly engaged communities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-light text-gray-900 mb-8 tracking-tight">
              Trusted by leading brands
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
              From tech giants to local favorites, brands choose Beta Ads for authentic Twitch engagement.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-12 items-center justify-items-center mb-20">
            {['Samsung', 'Surfshark', 'Komplett', 'Shure', 'Domino\'s'].map((brand, index) => (
              <div key={brand} className="text-2xl font-light text-gray-400 hover:text-gray-900 transition-colors tracking-wide">
                {brand}
              </div>
            ))}
          </div>
          
          <Card className="max-w-5xl mx-auto border-0 shadow-xl bg-gray-50">
            <CardContent className="p-12 space-y-8">
              <div className="flex items-center space-x-3">
                <Star className="h-6 w-6 text-black fill-current" />
                <span className="font-medium text-gray-900 tracking-wide">Featured Campaign</span>
              </div>
              
              <h3 className="text-3xl font-light text-gray-900">Samsung Galaxy Campaign</h3>
              
              <div className="grid md:grid-cols-3 gap-12 text-center pt-8">
                <div>
                  <div className="text-4xl font-light text-black mb-2">2.3M</div>
                  <p className="text-gray-600 font-light">Total impressions</p>
                </div>
                <div>
                  <div className="text-4xl font-light text-black mb-2">$1.20</div>
                  <p className="text-gray-600 font-light">Cost per 1000 views</p>
                </div>
                <div>
                  <div className="text-4xl font-light text-black mb-2">94%</div>
                  <p className="text-gray-600 font-light">Campaign completion rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-light text-gray-900 mb-8 tracking-tight">
              Meet the team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
              Young, international, and passionate about revolutionizing advertising on Twitch.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { name: 'Alex Chen', role: 'CEO & Co-founder', location: 'Oslo, Norway' },
              { name: 'Sarah Kim', role: 'Head of Partnerships', location: 'Stockholm, Sweden' },
              { name: 'Marcus Johansson', role: 'Tech Lead', location: 'Helsinki, Finland' }
            ].map((member, index) => (
              <div key={member.name} className="text-center">
                <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-6"></div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">{member.name}</h3>
                <p className="text-gray-900 font-light mb-1">{member.role}</p>
                <p className="text-gray-500 font-light text-sm tracking-wide">{member.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
          <h2 className="text-4xl md:text-6xl font-light mb-8 tracking-tight">
            Ready to test a campaign?
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Get started with a small test campaign. No long-term commitments, full transparency, and results you can measure.
          </p>
          
          <Button 
            size="lg" 
            className="bg-white text-black hover:bg-gray-100 px-12 py-6 text-base font-medium tracking-wide h-auto"
          >
            Book a demo call
            <ArrowRight className="ml-3 h-4 w-4" />
          </Button>
          
          <p className="text-gray-400 text-sm mt-8 font-light tracking-wide">
            Minimum campaign budget: $500 • Setup takes less than 24 hours
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-light tracking-wide">Beta Ads</h3>
              <p className="text-gray-400 font-light leading-relaxed">
                The future of Twitch advertising is here.
              </p>
            </div>
            
            <div className="space-y-6">
              <h4 className="font-medium tracking-wide">Contact</h4>
              <div className="space-y-3 text-gray-400 font-light">
                <p>hello@betaads.com</p>
                <p>+47 123 45 678</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <h4 className="font-medium tracking-wide">Connect</h4>
              <div className="space-y-3 text-gray-400 font-light">
                <p>LinkedIn</p>
                <p>Discord</p>
                <p>Twitter</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <h4 className="font-medium tracking-wide">Language</h4>
              <div className="space-y-3 text-gray-400 font-light">
                <p>🇺🇸 English</p>
                <p>🇳🇴 Norwegian</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-16 pt-12 text-center text-gray-400 font-light">
            <p>&copy; 2024 Beta Ads. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
