import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface AnimatedFormatPickerProps {
  isActive: boolean;
}

const formats = [
  { id: "snipe", label: "Snipe", icon: "⬛", dimensions: "1920×250" },
  { id: "rich", label: "Rich Media", icon: "🖼️", dimensions: "1920×1080" },
  { id: "poll", label: "Poll", icon: "📊", dimensions: "Dynamic" },
  { id: "video", label: "Video", icon: "▶️", dimensions: "640×360" },
];

export const AnimatedFormatPicker: React.FC<AnimatedFormatPickerProps> = ({ isActive }) => {
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setSelectedFormat(null);
      setShowPreview(false);
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];

    // Select format after 600ms
    timers.push(setTimeout(() => setSelectedFormat("snipe"), 600));
    
    // Show preview after 1.2s
    timers.push(setTimeout(() => setShowPreview(true), 1200));

    return () => timers.forEach(clearTimeout);
  }, [isActive]);

  return (
    <div className="w-full h-full bg-background/80 rounded-xl overflow-hidden shadow-inner shadow-black/10">
      <div className="p-6 h-full flex gap-6">
        {/* Left: Format Selector */}
        <div className="w-1/3 flex flex-col">
          <div className={cn(
            "text-sm text-muted-foreground mb-4 transition-all duration-500",
            isActive ? "opacity-100" : "opacity-0"
          )}>
            Select Ad Format
          </div>

          <div className="space-y-2">
            {formats.map((format, i) => (
              <button
                key={format.id}
                className={cn(
                  "w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-500",
                  selectedFormat === format.id
                    ? "bg-primary/20 ring-2 ring-primary"
                    : "bg-card/40 hover:bg-card/60",
                  isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                )}
                style={{ transitionDelay: `${200 + i * 100}ms` }}
              >
                <div className="text-xl">{format.icon}</div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground">{format.label}</div>
                  <div className="text-xs text-muted-foreground">{format.dimensions}</div>
                </div>
                {selectedFormat === format.id && (
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                )}
              </button>
            ))}
          </div>

          {/* Upload area */}
          <div className={cn(
            "mt-auto bg-card/30 rounded-xl p-4 border-2 border-dashed border-muted/30 text-center transition-all duration-700",
            isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )} style={{ transitionDelay: "800ms" }}>
            <div className="text-muted-foreground text-sm mb-2">
              Drag assets here
            </div>
            <div className="text-xs text-muted-foreground/60">
              PNG, JPG up to 5MB
            </div>
          </div>
        </div>

        {/* Right: Live Preview */}
        <div className="flex-1 flex flex-col">
          <div className={cn(
            "text-sm text-muted-foreground mb-4 transition-all duration-500",
            isActive ? "opacity-100" : "opacity-0"
          )}>
            Live Preview
          </div>

          {/* Stream Mockup */}
          <div className={cn(
            "flex-1 bg-card/40 rounded-xl overflow-hidden relative transition-all duration-700",
            showPreview ? "opacity-100 scale-100" : "opacity-0 scale-95"
          )}>
            {/* Fake stream content */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
            
            {/* Stream header */}
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/30" />
              <div>
                <div className="h-2 w-16 bg-muted/50 rounded" />
                <div className="h-1.5 w-12 bg-muted/30 rounded mt-1" />
              </div>
              <div className="flex items-center gap-1 bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5 rounded ml-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                LIVE
              </div>
            </div>

            {/* Chat sidebar indicator */}
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-card/50 border-l border-border/20">
              <div className="p-2 space-y-1">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-2 bg-muted/20 rounded w-full" />
                ))}
              </div>
            </div>

            {/* Snipe Banner Preview */}
            {selectedFormat === "snipe" && showPreview && (
              <div className={cn(
                "absolute bottom-4 left-4 right-20 h-12 rounded-lg overflow-hidden transition-all duration-500",
                showPreview ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )} style={{ transitionDelay: "400ms" }}>
                <div className="w-full h-full bg-gradient-to-r from-primary/90 to-primary/70 flex items-center justify-between px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-white/20" />
                    <div>
                      <div className="text-white text-sm font-medium">Your Ad Here</div>
                      <div className="text-white/70 text-xs">Click to learn more</div>
                    </div>
                  </div>
                  <button className="bg-white text-primary text-xs font-medium px-3 py-1.5 rounded">
                    Shop Now
                  </button>
                </div>
              </div>
            )}

            {/* Dimension badge */}
            <div className={cn(
              "absolute bottom-4 right-20 bg-background/80 backdrop-blur-sm text-xs px-2 py-1 rounded transition-all duration-500",
              showPreview ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
            )} style={{ transitionDelay: "600ms" }}>
              {formats.find(f => f.id === selectedFormat)?.dimensions}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
