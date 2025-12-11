import React from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCountUp } from "@/hooks/useCountUp";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { 
  Eye, MousePointer, TrendingUp, Wallet,
  LayoutDashboard, Video, BarChart3, Users, Settings,
  Gamepad2, Monitor, Smartphone, Globe
} from "lucide-react";

const viewsData = [
  { name: "Mon", views: 18500 },
  { name: "Tue", views: 22000 },
  { name: "Wed", views: 19800 },
  { name: "Thu", views: 28000 },
  { name: "Fri", views: 35500 },
  { name: "Sat", views: 42000 },
  { name: "Sun", views: 38000 },
];

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  isVisible: boolean;
  delay: number;
}

const StatCard: React.FC<StatCardProps> = ({ 
  icon, 
  label, 
  value, 
  prefix = "",
  suffix = "", 
  decimals = 0,
  isVisible, 
  delay,
}) => {
  const { displayValue } = useCountUp(value, isVisible, { 
    delay, 
    decimals,
    enableLivePulse: true 
  });

  return (
    <div 
      className={`
        relative transition-all duration-500 py-2 px-2.5
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-1.5 mb-1">
        <div className="text-primary/70">
          {icon}
        </div>
        <span className="text-muted-foreground/70 uppercase tracking-wider font-medium text-[8px]">
          {label}
        </span>
      </div>
      <div className="flex items-baseline gap-0.5">
        {prefix && (
          <span className="text-muted-foreground font-medium text-xs">{prefix}</span>
        )}
        <span className="font-bold tabular-nums tracking-tight text-foreground text-lg">
          {displayValue}
        </span>
        {suffix && (
          <span className="text-muted-foreground/70 font-medium text-[9px]">{suffix}</span>
        )}
      </div>
    </div>
  );
};

interface LiveDashboardProps {
  className?: string;
  compact?: boolean;
}

export const LiveDashboard: React.FC<LiveDashboardProps> = ({ className = "", compact = false }) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const mainStats = [
    { icon: <Eye className="w-3 h-3" />, label: "Views", value: 127459 },
    { icon: <MousePointer className="w-3 h-3" />, label: "Clicks", value: 2847 },
    { icon: <Wallet className="w-3 h-3" />, label: "Spent", value: 1240, prefix: "€" },
    { icon: <TrendingUp className="w-3 h-3" />, label: "CTR", value: 2.23, suffix: "%", decimals: 2 },
  ];

  const demographics = {
    countries: [
      { flag: "🇳🇴", code: "NO", percent: 34 },
      { flag: "🇸🇪", code: "SE", percent: 22 },
      { flag: "🇩🇰", code: "DK", percent: 16 },
      { flag: "🇩🇪", code: "DE", percent: 12 },
    ],
    gender: [
      { label: "Male", percent: 78 },
      { label: "Female", percent: 19 },
    ],
    interests: ["Gaming", "Tech", "Esports", "Music"],
    devices: { desktop: 62, mobile: 38 },
  };

  const sidebarItems = [
    { icon: LayoutDashboard, active: true },
    { icon: Video, active: false },
    { icon: BarChart3, active: false },
    { icon: Users, active: false },
    { icon: Settings, active: false },
  ];

  const tabs = ["Overview", "Streams", "Analytics"];

  return (
    <div 
      ref={ref}
      className={`
        relative w-full mx-auto max-w-lg
        transition-all duration-1000 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
        ${className}
      `}
    >
      {/* Glow effect */}
      <div 
        className={`
          absolute rounded-2xl -inset-6
          bg-gradient-to-br from-primary/20 via-primary/5 to-transparent
          blur-3xl opacity-60 -z-10
          transition-all duration-1000 delay-300
          ${isVisible ? 'opacity-60 scale-100' : 'opacity-0 scale-90'}
        `}
      />

      {/* Browser frame */}
      <div className="relative rounded-xl overflow-hidden bg-card/90 backdrop-blur-xl border border-border/40 shadow-2xl">
        
        {/* Browser top bar */}
        <div className="flex items-center gap-2 bg-muted/40 border-b border-border/30 px-3 py-2">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-destructive/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          
          <div className="flex-1 flex justify-center">
            <div className="flex items-center gap-1.5 rounded-md bg-background/60 border border-border/30 px-3 py-1 max-w-[180px] w-full">
              <svg className="w-2.5 h-2.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span className="text-[10px] text-muted-foreground font-medium">app.betaads.no</span>
            </div>
          </div>

          <div className="w-10" />
        </div>

        {/* App layout with sidebar */}
        <div className="flex">
          {/* Mini Sidebar */}
          <div className="w-10 bg-muted/20 border-r border-border/20 py-3 flex flex-col items-center gap-2">
            {sidebarItems.map((item, i) => (
              <div
                key={i}
                className={`
                  p-1.5 rounded-md transition-colors cursor-pointer
                  ${item.active 
                    ? 'bg-primary/20 text-primary' 
                    : 'text-muted-foreground/60 hover:text-muted-foreground hover:bg-muted/30'
                  }
                `}
              >
                <item.icon className="w-3.5 h-3.5" />
              </div>
            ))}
          </div>

          {/* Main content */}
          <div className="flex-1 p-3 space-y-3">
            {/* Tabs */}
            <div className="flex items-center gap-1 border-b border-border/20 pb-2">
              {tabs.map((tab, i) => (
                <button
                  key={tab}
                  className={`
                    px-2.5 py-1 rounded-md text-[10px] font-medium transition-colors
                    ${i === 0 
                      ? 'bg-primary/15 text-primary' 
                      : 'text-muted-foreground/60 hover:text-muted-foreground'
                    }
                  `}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Campaign header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-[11px] font-medium text-foreground">Samsung Gaming Monitors Q4</span>
              </div>
              <span className="text-[9px] text-muted-foreground">Updated now</span>
            </div>

            {/* Main Stats */}
            <div className="grid grid-cols-4 bg-muted/20 rounded-lg divide-x divide-border/20">
              {mainStats.map((stat, index) => (
                <StatCard
                  key={stat.label}
                  {...stat}
                  isVisible={isVisible}
                  delay={100 + index * 50}
                />
              ))}
            </div>

            {/* Performance Chart */}
            <div 
              className={`
                bg-muted/10 rounded-lg p-2.5
                transition-all duration-700 delay-400
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
              `}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-medium text-foreground">Performance</span>
                <span className="text-[9px] font-semibold text-primary">+18.5% ↑</span>
              </div>
              <div className="h-16">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={viewsData}>
                    <defs>
                      <linearGradient id="viewsGradientCompact" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area 
                      type="monotone"
                      dataKey="views" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={1.5}
                      fill="url(#viewsGradientCompact)"
                      isAnimationActive={isVisible}
                      animationDuration={1000}
                      animationBegin={300}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Audience Demographics */}
            <div 
              className={`
                bg-muted/10 rounded-lg p-2.5
                transition-all duration-700 delay-500
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
              `}
            >
              <div className="flex items-center gap-1.5 mb-2.5">
                <Users className="w-3 h-3 text-primary/70" />
                <span className="text-[10px] font-medium text-foreground">Audience Demographics</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {/* Countries */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1">
                    <Globe className="w-2.5 h-2.5 text-muted-foreground/60" />
                    <span className="text-[8px] text-muted-foreground/80 uppercase tracking-wide">Region</span>
                  </div>
                  {demographics.countries.map((c) => (
                    <div key={c.code} className="flex items-center justify-between">
                      <span className="text-[10px]">{c.flag} {c.code}</span>
                      <span className="text-[9px] text-muted-foreground font-medium">{c.percent}%</span>
                    </div>
                  ))}
                </div>

                {/* Gender & Age */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1">
                    <Users className="w-2.5 h-2.5 text-muted-foreground/60" />
                    <span className="text-[8px] text-muted-foreground/80 uppercase tracking-wide">Gender</span>
                  </div>
                  {demographics.gender.map((g) => (
                    <div key={g.label} className="flex items-center justify-between">
                      <span className="text-[10px] text-foreground">{g.label}</span>
                      <span className="text-[9px] text-muted-foreground font-medium">{g.percent}%</span>
                    </div>
                  ))}
                  <div className="pt-1 border-t border-border/20">
                    <div className="flex items-center gap-1 mb-1">
                      <Monitor className="w-2.5 h-2.5 text-muted-foreground/60" />
                      <span className="text-[8px] text-muted-foreground/80 uppercase tracking-wide">Device</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-[9px]">
                        <Monitor className="w-2.5 h-2.5 inline mr-0.5 text-muted-foreground/60" />
                        {demographics.devices.desktop}%
                      </span>
                      <span className="text-[9px]">
                        <Smartphone className="w-2.5 h-2.5 inline mr-0.5 text-muted-foreground/60" />
                        {demographics.devices.mobile}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Interests */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1">
                    <Gamepad2 className="w-2.5 h-2.5 text-muted-foreground/60" />
                    <span className="text-[8px] text-muted-foreground/80 uppercase tracking-wide">Interests</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {demographics.interests.map((interest) => (
                      <span
                        key={interest}
                        className="px-1.5 py-0.5 bg-primary/10 text-primary text-[8px] rounded font-medium"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scanning light effect */}
        <div 
          className={`
            absolute inset-0 pointer-events-none overflow-hidden
            ${isVisible ? 'animate-scan-light' : 'opacity-0'}
          `}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-full animate-scan" />
        </div>
      </div>
    </div>
  );
};