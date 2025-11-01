import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, ExternalLink, DollarSign, Wallet } from "lucide-react";
import { useSoundEffects } from "@/hooks/useSoundEffects";

interface StreamerSectionProps {
  t: any;
  language: string;
}

export const StreamerSection: React.FC<StreamerSectionProps> = ({ t, language }) => {
  const [showDashboard, setShowDashboard] = useState(false);
  const { hover, click, whoosh, buttonPress } = useSoundEffects();

  const sponsorships = [
    {
      id: 1,
      title: "Samsung S25 Ultra",
      image: "/lovable-uploads/71765092-972e-4792-a241-0f155a62af68.png",
      status: "active",
      price: "10 EUR"
    },
    {
      id: 2,
      title: "Kristiania Voting",
      image: "/lovable-uploads/a3645b32-75a2-494d-aa42-f7b96dba1d94.png",
      status: "active",
      price: "13 EUR"
    },
    {
      id: 3,
      title: "Surfshark VPN",
      image: "/lovable-uploads/f88bb0a9-d318-40f3-9e9c-736f0b37438c.png",
      status: "inactive",
      price: "13 EUR"
    }
  ];

  return (
  <section 
    id="streamer-section" 
    className="py-32 text-foreground" 
    data-colors="#9f1c26,#4a0a0f,#0a0a0f"
    style={{ "--bg-strength": 0.7 } as React.CSSProperties}
  >
    <div className="max-w-7xl mx-auto px-8 lg:px-12">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-6xl font-extralight mb-6 tracking-tighter text-foreground">
          {t.streamerSectionTitle}
        </h2>
        <p className="text-2xl md:text-3xl text-muted-foreground font-light mb-8 tracking-wide">
          {t.streamerSectionSubtitle}
        </p>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-extralight leading-relaxed tracking-wide">
          {t.streamerSectionDescription}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-16">
        <Button
          size="lg"
          className="bg-red-400 text-white hover:bg-red-500 px-12 py-6 text-lg font-light tracking-wide h-auto shadow-2xl hover:shadow-red-400/20 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
          onClick={() => { whoosh(); window.open("https://beta.instreamly.com/", "_blank"); }}
          onMouseEnter={hover}
        >
          {t.joinStreamer}
        </Button>

        <Button
          size="lg"
          variant="outline"
          className="border-border text-card-foreground hover:bg-secondary bg-secondary/50 px-12 py-6 text-lg font-light tracking-wide h-auto transition-all duration-300 hover:border-muted hover:scale-105 hover:-translate-y-1"
          onClick={() => { click(); window.open("https://discord.gg/hNgHCbQUvb", "_blank"); }}
          onMouseEnter={hover}
        >
          {t.joinDiscord}
          <ExternalLink className="ml-4 h-5 w-5" />
        </Button>
      </div>

      {showDashboard && (
        <div className="mt-16">
          <Tabs defaultValue="sponsorships" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
              <TabsTrigger value="sponsorships">Sponsorships</TabsTrigger>
              <TabsTrigger value="wallet">Wallet</TabsTrigger>
            </TabsList>

            <TabsContent value="sponsorships">
              <div className="mb-6">
                <h3 className="text-2xl font-light mb-2">Available sponsorships</h3>
                <p className="text-muted-foreground">Choose a brand you want to partner with.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {sponsorships.map((sponsorship) => (
                  <Card key={sponsorship.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:-translate-y-1" onMouseEnter={hover}>
                    <div className="relative">
                       <img 
                         src={sponsorship.image} 
                         alt={sponsorship.title}
                         className="w-full h-48 object-cover transition-all duration-300 hover:scale-110"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge className={sponsorship.status === "active" ? "bg-green-500 text-white" : "bg-red-500 text-white"}>
                          {sponsorship.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-2">{sponsorship.title}</h3>
                      <div className="text-center mb-4">
                        <div className="text-2xl font-bold">{sponsorship.price}</div>
                        <div className="text-sm text-muted-foreground">Rate for 1000 views</div>
                      </div>
                      
                       <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1 transition-all duration-300 hover:scale-105" onClick={buttonPress}>
                           View details
                        </Button>
                        <Button size="sm" className="flex-1 bg-red-400 hover:bg-red-500 text-white transition-all duration-300 hover:scale-105" onClick={whoosh}>
                          Join
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="wallet">
              <div className="max-w-md mx-auto">
                <Card className="bg-gradient-to-r from-red-400 to-orange-400 text-white border-0 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <DollarSign className="h-5 w-5 mr-2" />
                      Total Earnings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold mb-4">2,450 EUR</div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-white/80">This month:</span>
                        <span className="font-semibold">340 EUR</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/80">Last month:</span>
                        <span className="font-semibold">285 EUR</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/80">Total views:</span>
                        <span className="font-semibold">125,300</span>
                      </div>
                    </div>
                    
                    <Button className="w-full mt-4 bg-white/20 hover:bg-white/30 text-white border-white/20 transition-all duration-300 hover:scale-105">
                      Withdraw Earnings
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}

      <div className="text-center mt-16">
        <div className="inline-flex items-center space-x-3 bg-secondary rounded-2xl px-8 py-4 border border-border transition-all duration-300 hover:shadow-lg hover:scale-105 hover:bg-secondary/80">
          <TrendingUp className="h-6 w-6 text-muted-foreground" />
          <span className="text-secondary-foreground font-light text-lg tracking-wide">
            {t.passiveIncome}
          </span>
        </div>
      </div>
    </div>
  </section>
  );
};