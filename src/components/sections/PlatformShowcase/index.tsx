import React, { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { AnimatedDashboard } from "./AnimatedDashboard";
import { AnimatedExplorer } from "./AnimatedExplorer";
import { AnimatedCampaignBuilder } from "./AnimatedCampaignBuilder";
import { AnimatedFormatPicker } from "./AnimatedFormatPicker";
import { BarChart3, Users, Rocket, Layers } from "lucide-react";

const tabs = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3, description: "Real-time campaign analytics" },
  { id: "explorer", label: "Explorer", icon: Users, description: "Find your perfect streamers" },
  { id: "builder", label: "Campaign Builder", icon: Rocket, description: "Launch in minutes" },
  { id: "formats", label: "Ad Formats", icon: Layers, description: "Choose your format" },
];

const AUTO_ROTATE_INTERVAL = 6000; // 6 seconds per tab

export const PlatformShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isPaused, setIsPaused] = useState(false);
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.2 });

  // Auto-rotation logic
  useEffect(() => {
    if (!isVisible || isPaused) return;

    const interval = setInterval(() => {
      setActiveTab(current => {
        const currentIndex = tabs.findIndex(t => t.id === current);
        const nextIndex = (currentIndex + 1) % tabs.length;
        return tabs[nextIndex].id;
      });
    }, AUTO_ROTATE_INTERVAL);

    return () => clearInterval(interval);
  }, [isVisible, isPaused]);

  const handleTabClick = useCallback((tabId: string) => {
    setActiveTab(tabId);
    setIsPaused(true);
    // Resume auto-rotation after 15 seconds of inactivity
    setTimeout(() => setIsPaused(false), 15000);
  }, []);

  const renderMockup = () => {
    const isActive = isVisible;
    
    switch (activeTab) {
      case "dashboard":
        return <AnimatedDashboard isActive={isActive} />;
      case "explorer":
        return <AnimatedExplorer isActive={isActive} />;
      case "builder":
        return <AnimatedCampaignBuilder isActive={isActive} />;
      case "formats":
        return <AnimatedFormatPicker isActive={isActive} />;
      default:
        return <AnimatedDashboard isActive={isActive} />;
    }
  };

  return (
    <section
      ref={ref}
      className={cn(
        "py-24 lg:py-32 relative transition-all duration-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container mx-auto px-6 lg:px-16 xl:px-24">
        {/* Section Header */}
        <div className="mb-12 max-w-2xl">
          <h2 className={cn(
            "text-3xl lg:text-4xl font-light mb-4 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            The Platform
          </h2>
          <p className={cn(
            "text-lg text-muted-foreground transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )} style={{ transitionDelay: "100ms" }}>
            Everything you need to plan, launch, and measure Twitch campaigns.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className={cn(
          "flex flex-wrap gap-2 mb-8 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )} style={{ transitionDelay: "200ms" }}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={cn(
                  "group flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "bg-card/40 text-muted-foreground hover:bg-card/60 hover:text-foreground"
                )}
              >
                <Icon className={cn(
                  "w-4 h-4 transition-transform duration-300",
                  isActive && "scale-110"
                )} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
          
          {/* Progress indicator */}
          <div className="flex-1 flex items-center justify-end">
            <div className="flex gap-1">
              {tabs.map((tab) => (
                <div
                  key={tab.id}
                  className={cn(
                    "w-6 h-1 rounded-full transition-all duration-300",
                    activeTab === tab.id ? "bg-primary" : "bg-muted/30"
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Active Tab Description */}
        <div className={cn(
          "mb-6 transition-all duration-500",
          isVisible ? "opacity-100" : "opacity-0"
        )}>
          <p className="text-sm text-muted-foreground">
            {tabs.find(t => t.id === activeTab)?.description}
          </p>
        </div>

        {/* Mockup Container */}
        <div 
          className={cn(
            "relative rounded-2xl overflow-hidden bg-card/20 backdrop-blur-sm shadow-2xl shadow-black/20 transition-all duration-700",
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-98"
          )}
          style={{ transitionDelay: "300ms" }}
        >
          {/* Browser Chrome */}
          <div className="flex items-center gap-2 px-4 py-3 bg-card/50 border-b border-border/20">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-destructive/60" />
              <div className="w-3 h-3 rounded-full bg-primary/40" />
              <div className="w-3 h-3 rounded-full bg-muted-foreground/40" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="bg-background/50 rounded-lg px-4 py-1 text-xs text-muted-foreground">
                app.betaads.no
              </div>
            </div>
            <div className="w-16" /> {/* Spacer for balance */}
          </div>

          {/* Mockup Content */}
          <div className="aspect-[16/10] lg:aspect-[16/9]">
            {renderMockup()}
          </div>
        </div>

        {/* Feature highlights below mockup */}
        <div className={cn(
          "grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )} style={{ transitionDelay: "500ms" }}>
          {[
            { label: "Real-time Analytics", value: "Live" },
            { label: "Nordic Streamers", value: "400+" },
            { label: "Ad Formats", value: "6" },
            { label: "Avg Campaign CTR", value: "2.8%" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="bg-card/30 rounded-xl p-4 text-center"
              style={{ transitionDelay: `${600 + i * 100}ms` }}
            >
              <div className="text-xl font-medium text-primary">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
