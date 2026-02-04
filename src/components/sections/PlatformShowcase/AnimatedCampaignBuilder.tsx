import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface AnimatedCampaignBuilderProps {
  isActive: boolean;
}

const steps = [
  { id: 1, label: "Objective" },
  { id: 2, label: "Targeting" },
  { id: 3, label: "Budget" },
];

const objectives = [
  { id: "awareness", label: "Brand Awareness", icon: "👁️" },
  { id: "traffic", label: "Website Traffic", icon: "🔗" },
  { id: "engagement", label: "Engagement", icon: "💬" },
];

export const AnimatedCampaignBuilder: React.FC<AnimatedCampaignBuilderProps> = ({ isActive }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedObjective, setSelectedObjective] = useState<string | null>(null);

  // Animate through steps
  useEffect(() => {
    if (!isActive) {
      setCurrentStep(1);
      setSelectedObjective(null);
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];

    // Step 1: Select objective after 800ms
    timers.push(setTimeout(() => setSelectedObjective("awareness"), 800));
    
    // Step 2: Move to targeting after 2s
    timers.push(setTimeout(() => setCurrentStep(2), 2000));
    
    // Step 3: Move to budget after 4s
    timers.push(setTimeout(() => setCurrentStep(3), 4000));

    return () => timers.forEach(clearTimeout);
  }, [isActive]);

  return (
    <div className="w-full h-full bg-background/80 rounded-xl overflow-hidden shadow-inner shadow-black/10">
      <div className="p-6 h-full flex flex-col">
        {/* Header */}
        <div className={cn(
          "flex items-center gap-3 mb-6 transition-all duration-500",
          isActive ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        )}>
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </div>
          <div>
            <div className="text-lg font-medium text-foreground">New Campaign</div>
            <div className="text-xs text-muted-foreground">Create a new ad campaign</div>
          </div>
        </div>

        {/* Step Indicator */}
        <div className={cn(
          "flex items-center gap-2 mb-8 transition-all duration-500",
          isActive ? "opacity-100" : "opacity-0"
        )} style={{ transitionDelay: "200ms" }}>
          {steps.map((step, i) => (
            <React.Fragment key={step.id}>
              <div className="flex items-center gap-2">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-500",
                  currentStep > step.id
                    ? "bg-primary text-primary-foreground"
                    : currentStep === step.id
                    ? "bg-primary/20 text-primary ring-2 ring-primary/50"
                    : "bg-muted/30 text-muted-foreground"
                )}>
                  {currentStep > step.id ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    step.id
                  )}
                </div>
                <span className={cn(
                  "text-sm transition-colors duration-300",
                  currentStep >= step.id ? "text-foreground" : "text-muted-foreground"
                )}>
                  {step.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={cn(
                  "flex-1 h-0.5 rounded transition-all duration-500",
                  currentStep > step.id ? "bg-primary" : "bg-muted/30"
                )} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1">
          {/* Step 1: Objectives */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground mb-4">
                Choose your campaign objective
              </div>
              <div className="grid grid-cols-3 gap-3">
                {objectives.map((obj, i) => (
                  <button
                    key={obj.id}
                    className={cn(
                      "p-4 rounded-xl text-center transition-all duration-500",
                      selectedObjective === obj.id
                        ? "bg-primary/20 ring-2 ring-primary"
                        : "bg-card/40 hover:bg-card/60",
                      isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    )}
                    style={{ transitionDelay: `${400 + i * 100}ms` }}
                  >
                    <div className="text-2xl mb-2">{obj.icon}</div>
                    <div className="text-sm font-medium text-foreground">{obj.label}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Targeting */}
          {currentStep === 2 && (
            <div className={cn(
              "space-y-4 transition-all duration-500",
              isActive ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            )}>
              <div className="text-sm text-muted-foreground mb-4">
                Define your target audience
              </div>
              
              {/* Targeting options */}
              {["Norway", "Sweden", "Finland"].map((country, i) => (
                <div
                  key={country}
                  className="flex items-center justify-between bg-card/40 rounded-lg p-3"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <span className="text-sm text-foreground">{country}</span>
                  <div className={cn(
                    "w-10 h-5 rounded-full relative transition-colors duration-500",
                    i < 2 ? "bg-primary" : "bg-muted/50"
                  )}>
                    <div className={cn(
                      "absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all duration-300",
                      i < 2 ? "left-5" : "left-0.5"
                    )} />
                  </div>
                </div>
              ))}

              {/* Forecast */}
              <div className="bg-card/30 rounded-xl p-4 mt-4">
                <div className="text-xs text-muted-foreground mb-2">Estimated Reach</div>
                <div className="text-2xl font-medium text-primary">1.2M - 1.8M</div>
                <div className="text-xs text-muted-foreground">weekly impressions</div>
              </div>
            </div>
          )}

          {/* Step 3: Budget */}
          {currentStep === 3 && (
            <div className={cn(
              "space-y-4 transition-all duration-500",
              isActive ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            )}>
              <div className="text-sm text-muted-foreground mb-4">
                Set your campaign budget
              </div>

              {/* Budget input */}
              <div className="bg-card/40 rounded-xl p-4">
                <div className="text-xs text-muted-foreground mb-2">Daily Budget</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-medium text-foreground">5,000</span>
                  <span className="text-lg text-muted-foreground">NOK</span>
                </div>
              </div>

              {/* CPM breakdown */}
              <div className="bg-card/30 rounded-xl p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Estimated CPM</span>
                  <span className="text-foreground">45 NOK</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Daily Impressions</span>
                  <span className="text-foreground">~111K</span>
                </div>
              </div>

              {/* Launch button */}
              <button className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-medium mt-4 animate-pulse">
                Launch Campaign
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
