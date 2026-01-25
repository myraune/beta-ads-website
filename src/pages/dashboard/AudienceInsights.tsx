import React from "react";
import { audienceInsights } from "@/data/dashboardData";
import { HorizontalBarChart } from "@/components/dashboard/DashboardChart";

const AudienceInsights: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Audience Insights</h1>
        <p className="text-muted-foreground">Hvem ser på Twitch-kampanjene våre?</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Regions */}
        <div className="bg-card/50 shadow-lg shadow-black/10 rounded-xl p-6">
          <h3 className="font-semibold text-foreground mb-4">Hvor i Norge ser de fra?</h3>
          <div className="mb-4">
            <span className="text-muted-foreground">🇳🇴 Norge: </span>
            <span className="font-bold">95%</span>
            <span className="text-muted-foreground"> av seere</span>
          </div>
          <div className="space-y-3">
            {audienceInsights.regions.map((r) => (
              <div key={r.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">{r.name}</span>
                  <span className="font-mono">{r.percentage}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${r.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 text-sm text-muted-foreground">
            Øvrige land: Sverige (2.5%), Danmark (1.5%)
          </div>
        </div>

        {/* Devices & Age */}
        <div className="space-y-6">
          <div className="bg-card/50 shadow-lg shadow-black/10 rounded-xl p-6">
            <h3 className="font-semibold text-foreground mb-4">Hvilken enhet bruker de?</h3>
            {audienceInsights.devices.map((d) => (
              <div key={d.type} className="flex justify-between items-center py-2">
                <span className="text-muted-foreground">{d.icon} {d.type}</span>
                <span className="text-xl font-bold font-mono">{d.percentage}%</span>
              </div>
            ))}
          </div>
          <div className="bg-card/50 shadow-lg shadow-black/10 rounded-xl p-6">
            <h3 className="font-semibold text-foreground mb-4">Hvor gamle er de?</h3>
            {audienceInsights.ageGroups.map((a) => (
              <div key={a.range} className="flex justify-between items-center py-2">
                <span className="text-muted-foreground">{a.range}</span>
                <span className="text-xl font-bold font-mono">{a.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <HorizontalBarChart data={audienceInsights.topCategories} title="Hva spilles mest?" />

      {/* Insights */}
      <div className="bg-card/50 shadow-lg shadow-black/10 rounded-xl p-6">
        <h3 className="font-semibold text-foreground mb-4">Hva betyr dette for deg?</h3>
        <ul className="space-y-3 text-muted-foreground">
          <li>• <strong className="text-foreground">95% fra Norge</strong> → Fokus på norske kampanjer gir best ROI</li>
          <li>• <strong className="text-foreground">Desktop dominerer (80%)</strong> → Optimalisér grafikk for desktop-streaming</li>
          <li>• <strong className="text-foreground">Ung demografi (76% under 24)</strong> → Gaming og tech-produkter treffer godt</li>
          <li>• <strong className="text-foreground">Just Chatting dominerer (40%)</strong> → Lifestyle og entertainment-produkter funker</li>
        </ul>
      </div>
    </div>
  );
};

export default AudienceInsights;
