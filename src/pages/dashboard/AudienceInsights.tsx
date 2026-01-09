import React from "react";
import { audienceInsights } from "@/data/dashboardData";
import { Monitor, Smartphone, TrendingUp, Users, MapPin, Gamepad2 } from "lucide-react";

const AudienceInsights: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Audience Insights</h1>
        <p className="text-muted-foreground">Hvem ser på Twitch-kampanjene våre?</p>
      </div>

      {/* Main Grid: 2 columns on desktop, 1 on mobile */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left Column: Regions */}
        <div className="bg-card/50 border border-border/50 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">Hvor i Norge ser de fra?</h3>
          </div>
          
          {/* Norway Highlight */}
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🇳🇴</span>
              <div>
                <span className="text-2xl font-bold text-foreground">95%</span>
                <span className="text-muted-foreground ml-2">av seere fra Norge</span>
              </div>
            </div>
          </div>
          
          {/* Regional Distribution */}
          <p className="text-sm text-muted-foreground mb-3">Topp regioner:</p>
          <div className="space-y-3">
            {audienceInsights.regions.map((r) => (
              <div key={r.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-foreground">{r.name}</span>
                  <span className="font-mono font-medium text-foreground">{r.percentage}%</span>
                </div>
                <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-500" 
                    style={{ width: `${(r.percentage / 14) * 100}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
          
          {/* Other Countries */}
          <div className="mt-6 pt-4 border-t border-border/50 text-sm text-muted-foreground">
            Øvrige land: Sverige (2.5%), Danmark (1.5%)
          </div>
        </div>

        {/* Right Column: Devices & Age */}
        <div className="space-y-6">
          {/* Device Distribution */}
          <div className="bg-card/50 border border-border/50 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Monitor className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Hvilken enhet bruker de?</h3>
            </div>
            
            <div className="space-y-4">
              {audienceInsights.devices.map((d) => (
                <div key={d.type}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      {d.type === "Desktop" ? (
                        <Monitor className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <Smartphone className="w-5 h-5 text-muted-foreground" />
                      )}
                      <span className="text-foreground">{d.type}</span>
                    </div>
                    <span className="text-xl font-bold font-mono text-foreground">{d.percentage}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-500" 
                      style={{ width: `${d.percentage}%` }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Age Groups */}
          <div className="bg-card/50 border border-border/50 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Hvor gamle er de?</h3>
            </div>
            
            <div className="space-y-4">
              {audienceInsights.ageGroups.map((a) => (
                <div key={a.range}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-foreground">{a.range}</span>
                    <span className="text-xl font-bold font-mono text-foreground">{a.percentage}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-500" 
                      style={{ width: `${a.percentage}%` }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Game Categories - Full Width */}
      <div className="bg-card/50 border border-border/50 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <Gamepad2 className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Hva spilles mest?</h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
          {audienceInsights.topCategories.map((cat) => (
            <div key={cat.name}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-foreground">{cat.name}</span>
                <span className="font-mono font-medium text-foreground">{cat.percentage}%</span>
              </div>
              <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-500" 
                  style={{ width: `${(cat.percentage / 40) * 100}%` }} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Insights for Advertisers */}
      <div className="bg-card/50 border border-border/50 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Hva betyr dette for deg?</h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-muted/30 rounded-lg p-4">
            <p className="font-medium text-foreground mb-1">95% fra Norge</p>
            <p className="text-sm text-muted-foreground">Fokus på norske kampanjer gir best ROI</p>
          </div>
          
          <div className="bg-muted/30 rounded-lg p-4">
            <p className="font-medium text-foreground mb-1">Desktop dominerer (80%)</p>
            <p className="text-sm text-muted-foreground">Optimalisér grafikk for desktop-streaming</p>
          </div>
          
          <div className="bg-muted/30 rounded-lg p-4">
            <p className="font-medium text-foreground mb-1">Ung demografi (76% under 24)</p>
            <p className="text-sm text-muted-foreground">Gaming og tech-produkter treffer godt</p>
          </div>
          
          <div className="bg-muted/30 rounded-lg p-4">
            <p className="font-medium text-foreground mb-1">Just Chatting dominerer (40%)</p>
            <p className="text-sm text-muted-foreground">Lifestyle og entertainment-produkter funker</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudienceInsights;
