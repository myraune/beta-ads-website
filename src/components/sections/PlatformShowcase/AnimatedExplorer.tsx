import React from "react";
import { cn } from "@/lib/utils";

interface AnimatedExplorerProps {
  isActive: boolean;
}

const streamers = [
  { name: "Aienia", viewers: "2.4K", game: "Just Chatting", isLive: true },
  { name: "Pernataia", viewers: "1.8K", game: "Valorant", isLive: true },
  { name: "Emmelie", viewers: "1.2K", game: "League", isLive: false },
  { name: "ZywOo", viewers: "15K", game: "CS2", isLive: true },
  { name: "Rubius", viewers: "45K", game: "GTA V", isLive: false },
  { name: "Ibai", viewers: "32K", game: "Just Chatting", isLive: true },
];

const filters = [
  { label: "Country", active: false },
  { label: "Game", active: false },
  { label: "Live Now", active: true },
  { label: "Avg Viewers", active: false },
];

export const AnimatedExplorer: React.FC<AnimatedExplorerProps> = ({ isActive }) => {
  return (
    <div className="w-full h-full bg-background/80 rounded-xl overflow-hidden shadow-inner shadow-black/10">
      <div className="p-6 h-full flex gap-4">
        {/* Sidebar Filters */}
        <div className="w-48 flex flex-col gap-3">
          {/* Search */}
          <div className={cn(
            "relative bg-card/50 rounded-lg px-3 py-2 transition-all duration-500",
            isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
          )}>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <span className="text-sm text-muted-foreground">Search...</span>
              {isActive && (
                <span className="w-0.5 h-4 bg-primary animate-pulse" />
              )}
            </div>
          </div>

          {/* Filter toggles */}
          <div className="space-y-2 mt-2">
            <div className="text-xs text-muted-foreground font-medium px-1">Filters</div>
            {filters.map((filter, i) => (
              <div
                key={filter.label}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-500",
                  filter.active ? "bg-primary/20" : "bg-card/30",
                  isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                )}
                style={{ transitionDelay: `${200 + i * 100}ms` }}
              >
                <div className={cn(
                  "w-8 h-4 rounded-full relative transition-colors duration-300",
                  filter.active ? "bg-primary" : "bg-muted/50"
                )}>
                  <div className={cn(
                    "absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all duration-300",
                    filter.active ? "left-4" : "left-0.5"
                  )} />
                </div>
                <span className="text-sm text-foreground">{filter.label}</span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className={cn(
            "mt-auto bg-card/30 rounded-lg p-3 transition-all duration-700",
            isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )} style={{ transitionDelay: "700ms" }}>
            <div className="text-xs text-muted-foreground mb-1">Matching</div>
            <div className="text-2xl font-medium text-foreground">
              {isActive ? "423" : "0"}
            </div>
            <div className="text-xs text-muted-foreground">streamers</div>
          </div>
        </div>

        {/* Streamer Grid */}
        <div className="flex-1 grid grid-cols-3 gap-3 content-start">
          {streamers.map((streamer, i) => (
            <div
              key={streamer.name}
              className={cn(
                "group bg-card/40 rounded-xl p-3 hover:bg-card/60 transition-all duration-500 cursor-pointer",
                isActive ? "opacity-100 scale-100" : "opacity-0 scale-95"
              )}
              style={{ transitionDelay: `${300 + i * 100}ms` }}
            >
              {/* Avatar */}
              <div className="relative mb-2">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/40 to-primary/20 mx-auto" />
                {streamer.isLive && isActive && (
                  <div className="absolute -top-1 -right-1 flex items-center gap-1 bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5 rounded">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    LIVE
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="text-center">
                <div className="text-sm font-medium text-foreground truncate">
                  {streamer.name}
                </div>
                <div className="text-xs text-muted-foreground truncate">
                  {streamer.game}
                </div>
                <div className="text-xs text-primary mt-1">
                  {streamer.viewers} viewers
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
