
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play, Users, Target, TrendingUp, Star, ExternalLink } from "lucide-react";

const Index = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center space-y-8">
            <Badge className="bg-purple-500/20 text-purple-200 border-purple-400/30 text-sm px-4 py-2">
              🚀 Now live across Nordic markets
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              The ad format{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Twitch
              </span>{" "}
              has been waiting for
            </h1>
            
            <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
              Automated pop-up overlays that appear naturally in livestreams. No forced integrations, just guaranteed visibility.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Button 
                size="lg" 
                className="bg-white text-purple-900 hover:bg-purple-50 px-8 py-4 text-lg font-semibold"
                onClick={() => scrollToSection('how-it-works')}
              >
                I'm a brand
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold"
                onClick={() => window.open('https://beta.instreamly.com/en/sponsorships/available', '_blank')}
              >
                I'm a streamer
                <ExternalLink className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* Video Mockup Area */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="relative bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
              <div className="aspect-video bg-black/40 rounded-xl flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Play className="h-16 w-16 text-white/60 mx-auto" />
                  <p className="text-white/80 text-lg">Interactive ad demo coming soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How it works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple, automated, effective. We handle everything while brands get guaranteed visibility and streamers earn passively.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <Card className="text-center p-8 hover:shadow-lg transition-shadow border-0 shadow-md">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">1. Pop-ups in streams</h3>
                <p className="text-gray-600 leading-relaxed">
                  Small, branded animations appear 1-2 times per hour across 20+ livestreams simultaneously. No interruptions, just visibility.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-8 hover:shadow-lg transition-shadow border-0 shadow-md">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">2. Pay per view</h3>
                <p className="text-gray-600 leading-relaxed">
                  CPM model with precise viewer targeting. You only pay for actual impressions, with full transparency on campaign performance.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-8 hover:shadow-lg transition-shadow border-0 shadow-md">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">3. Streamers earn</h3>
                <p className="text-gray-600 leading-relaxed">
                  Streamers get paid per view automatically. No awkward sponsorship reads, no content changes. Just passive monetization.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Twitch Section */}
      <section className="py-24 bg-gradient-to-br from-purple-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Twitch is the sleeping giant
            </h2>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              While other platforms saturate, Twitch offers authentic engagement with the most valuable demographics.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4">
              <div className="text-5xl font-bold text-purple-300">2.5hrs</div>
              <p className="text-lg text-purple-100">Average viewing session</p>
              <p className="text-purple-200 text-sm">vs 5-15 seconds on TikTok</p>
            </div>
            
            <div className="space-y-4">
              <div className="text-5xl font-bold text-pink-300">73%</div>
              <p className="text-lg text-purple-100">Gen Z & Millennial audience</p>
              <p className="text-purple-200 text-sm">Prime consumer demographics</p>
            </div>
            
            <div className="space-y-4">
              <div className="text-5xl font-bold text-cyan-300">85%</div>
              <p className="text-lg text-purple-100">Viewer loyalty rate</p>
              <p className="text-purple-200 text-sm">Highly engaged communities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Trusted by leading brands
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From tech giants to local favorites, brands choose Beta Ads for authentic Twitch engagement.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center mb-16">
            {['Samsung', 'Surfshark', 'Komplett', 'Shure', 'Domino\'s'].map((brand, index) => (
              <div key={brand} className="text-2xl font-bold text-gray-400 hover:text-gray-600 transition-colors">
                {brand}
              </div>
            ))}
          </div>
          
          <Card className="max-w-4xl mx-auto p-8 border-0 shadow-lg">
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-500 fill-current" />
                <span className="font-semibold text-gray-900">Featured Campaign</span>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900">Samsung Galaxy Campaign</h3>
              
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-purple-600">2.3M</div>
                  <p className="text-gray-600">Total impressions</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">$1.20</div>
                  <p className="text-gray-600">Cost per 1000 views</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600">94%</div>
                  <p className="text-gray-600">Campaign completion rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Meet the team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Young, international, and passionate about revolutionizing advertising on Twitch.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Alex Chen', role: 'CEO & Co-founder', location: 'Oslo, Norway' },
              { name: 'Sarah Kim', role: 'Head of Partnerships', location: 'Stockholm, Sweden' },
              { name: 'Marcus Johansson', role: 'Tech Lead', location: 'Helsinki, Finland' }
            ].map((member, index) => (
              <Card key={member.name} className="text-center p-6 hover:shadow-lg transition-shadow border-0 shadow-md">
                <CardContent className="space-y-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mx-auto"></div>
                  <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                  <p className="text-purple-600 font-medium">{member.role}</p>
                  <p className="text-gray-500 text-sm">{member.location}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to test a campaign?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Get started with a small test campaign. No long-term commitments, full transparency, and results you can measure.
          </p>
          
          <Button 
            size="lg" 
            className="bg-white text-purple-900 hover:bg-purple-50 px-12 py-4 text-lg font-semibold"
          >
            Book a demo call
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <p className="text-purple-200 text-sm mt-4">
            Minimum campaign budget: $500 • Setup takes less than 24 hours
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Beta Ads</h3>
              <p className="text-gray-400">
                The future of Twitch advertising is here.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <p>hello@betaads.com</p>
                <p>+47 123 45 678</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Connect</h4>
              <div className="space-y-2 text-gray-400">
                <p>LinkedIn</p>
                <p>Discord</p>
                <p>Twitter</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Language</h4>
              <div className="space-y-2 text-gray-400">
                <p>🇺🇸 English</p>
                <p>🇳🇴 Norwegian</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Beta Ads. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
