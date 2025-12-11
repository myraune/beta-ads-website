import React, { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCountUp } from "@/hooks/useCountUp";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { 
  Eye, MousePointer, TrendingUp, Wallet,
  LayoutDashboard, Video, BarChart3, Users, Settings,
  Gamepad2, Monitor, Smartphone, Globe, Clock, MessageSquare, RotateCcw
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

// Streamer data for Streams tab
const streamers = [
  { 
    name: "AIENIA", 
    gif: "/lovable-uploads/streamer-aienia.gif",
    viewers: 1247,
    category: "Just Chatting",
    exposure: "2.4K",
    duration: "2h 34m",
    ctr: 2.4,
    clicks: 847
  },
  { 
    name: "Emmelie", 
    gif: "/lovable-uploads/streamer-emmelie.gif",
    viewers: 847,
    category: "Gaming",
    exposure: "1.8K",
    duration: "1h 52m",
    ctr: 2.1,
    clicks: 612
  },
  { 
    name: "pernataia", 
    gif: "/lovable-uploads/streamer-pernataia.gif",
    viewers: 623,
    category: "Valorant",
    exposure: "1.2K",
    duration: "3h 18m",
    ctr: 1.9,
    clicks: 438
  },
];

// Analytics data
const analyticsData = {
  ageDistribution: [
    { range: "18-24", percent: 42 },
    { range: "25-34", percent: 36 },
    { range: "35-44", percent: 15 },
    { range: "45+", percent: 7 },
  ],
  gender: [
    { label: "Male", percent: 78, color: "bg-blue-500" },
    { label: "Female", percent: 19, color: "bg-pink-500" },
    { label: "Other", percent: 3, color: "bg-purple-500" },
  ],
  countries: [
    { flag: "🇳🇴", name: "Norway", percent: 34 },
    { flag: "🇸🇪", name: "Sweden", percent: 22 },
    { flag: "🇩🇰", name: "Denmark", percent: 16 },
    { flag: "🇩🇪", name: "Germany", percent: 12 },
    { flag: "🇺🇸", name: "USA", percent: 8 },
  ],
  interests: [
    { name: "Gaming", icon: "🎮", percent: 62 },
    { name: "Tech", icon: "💻", percent: 48 },
    { name: "Esports", icon: "🏆", percent: 41 },
    { name: "Music", icon: "🎵", percent: 35 },
  ],
  peakHours: [
    { time: "20:00-23:00", intensity: 100 },
    { time: "17:00-20:00", intensity: 70 },
    { time: "14:00-17:00", intensity: 40 },
  ],
  engagement: {
    chatActivity: 4.7,
    avgWatchTime: 23,
    returnRate: 67,
  },
};

interface LiveDashboardProps {
  className?: string;
  compact?: boolean;
}

export const LiveDashboard: React.FC<LiveDashboardProps> = ({ className = "", compact = false }) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const [activeTab, setActiveTab] = useState(0);

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
    { icon: LayoutDashboard, active: activeTab === 0 },
    { icon: Video, active: activeTab === 1 },
    { icon: BarChart3, active: activeTab === 2 },
    { icon: Users, active: false },
    { icon: Settings, active: false },
  ];

  const tabs = ["Overview", "Streams", "Analytics"];

  // Render Overview Tab Content
  const renderOverviewContent = () => (
    <>
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
    </>
  );

  // Render Streams Tab Content
  const renderStreamsContent = () => (
    <>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-[11px] font-medium text-foreground">Live Streams</span>
          <span className="text-[9px] text-muted-foreground bg-muted/40 px-1.5 py-0.5 rounded">3 active</span>
        </div>
      </div>

      {/* Streamer Cards */}
      <div className="grid grid-cols-3 gap-2">
        {streamers.map((streamer, i) => (
          <div 
            key={streamer.name}
            className={`
              group relative rounded-lg overflow-hidden bg-muted/20 border border-border/20
              transition-all duration-500 hover:scale-105 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}
            style={{ transitionDelay: `${150 + i * 100}ms` }}
          >
            {/* GIF Thumbnail */}
            <div className="relative aspect-video overflow-hidden">
              <img 
                src={streamer.gif} 
                alt={streamer.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              {/* Live Badge */}
              <div className="absolute top-1 left-1 flex items-center gap-1 bg-destructive/90 px-1 py-0.5 rounded text-[7px] font-bold text-white">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                LIVE
              </div>
              {/* Viewer count */}
              <div className="absolute bottom-1 right-1 bg-background/80 backdrop-blur-sm px-1 py-0.5 rounded text-[8px] font-medium">
                {streamer.viewers.toLocaleString()} 👁
              </div>
              
              {/* Hover Overlay with Additional Stats */}
              <div className="absolute inset-0 bg-background/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-2">
                <Clock className="w-3 h-3 text-primary mb-1" />
                <div className="text-[8px] text-muted-foreground">Stream Duration</div>
                <div className="text-sm font-bold text-foreground">{streamer.duration}</div>
                <div className="grid grid-cols-2 gap-3 mt-2 w-full">
                  <div className="text-center">
                    <div className="text-[7px] text-muted-foreground uppercase">CTR</div>
                    <div className="text-xs font-semibold text-primary">{streamer.ctr}%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[7px] text-muted-foreground uppercase">Clicks</div>
                    <div className="text-xs font-semibold text-foreground">{streamer.clicks}</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Info */}
            <div className="p-1.5 space-y-0.5">
              <div className="text-[9px] font-semibold text-foreground truncate">{streamer.name}</div>
              <div className="text-[8px] text-muted-foreground truncate">{streamer.category}</div>
              <div className="flex items-center gap-1 pt-0.5">
                <div className="text-[7px] text-primary bg-primary/10 px-1 py-0.5 rounded">
                  {streamer.exposure} exposed
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stream Stats Summary */}
      <div 
        className={`
          bg-muted/10 rounded-lg p-2.5
          transition-all duration-700 delay-400
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}
      >
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <div className="text-[10px] text-muted-foreground mb-0.5">Total Viewers</div>
            <div className="text-sm font-bold text-foreground">2,717</div>
          </div>
          <div>
            <div className="text-[10px] text-muted-foreground mb-0.5">Total Exposure</div>
            <div className="text-sm font-bold text-primary">5.4K</div>
          </div>
          <div>
            <div className="text-[10px] text-muted-foreground mb-0.5">Avg CTR</div>
            <div className="text-sm font-bold text-foreground">2.3%</div>
          </div>
        </div>
      </div>
    </>
  );

  // Render Analytics Tab Content
  const renderAnalyticsContent = () => (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <span className="text-[11px] font-medium text-foreground">Audience Insights</span>
        <span className="text-[9px] text-muted-foreground">Last 30 days</span>
      </div>

      {/* Age Distribution */}
      <div 
        className={`
          bg-muted/10 rounded-lg p-2
          transition-all duration-500
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}
      >
        <div className="text-[9px] font-medium text-foreground mb-1.5">Age Distribution</div>
        <div className="space-y-1">
          {analyticsData.ageDistribution.map((age, i) => (
            <div key={age.range} className="flex items-center gap-2">
              <span className="text-[8px] text-muted-foreground w-8">{age.range}</span>
              <div className="flex-1 h-2 bg-muted/30 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary/70 rounded-full transition-all duration-700"
                  style={{ 
                    width: isVisible ? `${age.percent}%` : '0%',
                    transitionDelay: `${200 + i * 100}ms`
                  }}
                />
              </div>
              <span className="text-[8px] font-medium text-foreground w-6 text-right">{age.percent}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Gender & Countries Row */}
      <div className="grid grid-cols-2 gap-2">
        {/* Gender */}
        <div 
          className={`
            bg-muted/10 rounded-lg p-2
            transition-all duration-500 delay-200
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
        >
          <div className="text-[9px] font-medium text-foreground mb-1.5">Gender</div>
          <div className="space-y-1">
            {analyticsData.gender.map((g) => (
              <div key={g.label} className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full ${g.color}`} />
                  <span className="text-[9px] text-foreground">{g.label}</span>
                </div>
                <span className="text-[9px] font-medium text-muted-foreground">{g.percent}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Countries */}
        <div 
          className={`
            bg-muted/10 rounded-lg p-2
            transition-all duration-500 delay-300
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
        >
          <div className="text-[9px] font-medium text-foreground mb-1.5">Top Countries</div>
          <div className="space-y-0.5">
            {analyticsData.countries.map((c) => (
              <div key={c.name} className="flex items-center justify-between">
                <span className="text-[9px]">{c.flag} {c.name}</span>
                <span className="text-[8px] font-medium text-muted-foreground">{c.percent}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interests & Peak Hours Row */}
      <div className="grid grid-cols-2 gap-2">
        {/* Interests */}
        <div 
          className={`
            bg-muted/10 rounded-lg p-2
            transition-all duration-500 delay-400
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
        >
          <div className="text-[9px] font-medium text-foreground mb-1.5">Interests</div>
          <div className="space-y-1">
            {analyticsData.interests.map((interest) => (
              <div key={interest.name} className="flex items-center justify-between">
                <span className="text-[9px]">{interest.icon} {interest.name}</span>
                <span className="text-[8px] font-medium text-primary">{interest.percent}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Peak Hours */}
        <div 
          className={`
            bg-muted/10 rounded-lg p-2
            transition-all duration-500 delay-500
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
        >
          <div className="flex items-center gap-1 mb-1.5">
            <Clock className="w-2.5 h-2.5 text-muted-foreground/60" />
            <span className="text-[9px] font-medium text-foreground">Peak Hours</span>
          </div>
          <div className="space-y-1">
            {analyticsData.peakHours.map((hour) => (
              <div key={hour.time} className="flex items-center gap-1.5">
                <div className="flex-1 h-1.5 bg-muted/30 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary/60 rounded-full"
                    style={{ width: `${hour.intensity}%` }}
                  />
                </div>
                <span className="text-[7px] text-muted-foreground w-14">{hour.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Engagement Metrics */}
      <div 
        className={`
          bg-muted/10 rounded-lg p-2
          transition-all duration-500 delay-600
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}
      >
        <div className="text-[9px] font-medium text-foreground mb-1.5">Engagement Metrics</div>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="flex flex-col items-center">
            <MessageSquare className="w-3 h-3 text-primary/70 mb-0.5" />
            <div className="text-[10px] font-bold text-foreground">{analyticsData.engagement.chatActivity}%</div>
            <div className="text-[7px] text-muted-foreground">Chat Activity</div>
          </div>
          <div className="flex flex-col items-center">
            <Clock className="w-3 h-3 text-primary/70 mb-0.5" />
            <div className="text-[10px] font-bold text-foreground">{analyticsData.engagement.avgWatchTime}m</div>
            <div className="text-[7px] text-muted-foreground">Avg Watch</div>
          </div>
          <div className="flex flex-col items-center">
            <RotateCcw className="w-3 h-3 text-primary/70 mb-0.5" />
            <div className="text-[10px] font-bold text-foreground">{analyticsData.engagement.returnRate}%</div>
            <div className="text-[7px] text-muted-foreground">Return Rate</div>
          </div>
        </div>
      </div>
    </>
  );

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
                onClick={() => i < 3 && setActiveTab(i)}
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
                  onClick={() => setActiveTab(i)}
                  className={`
                    px-2.5 py-1 rounded-md text-[10px] font-medium transition-colors
                    ${activeTab === i 
                      ? 'bg-primary/15 text-primary' 
                      : 'text-muted-foreground/60 hover:text-muted-foreground'
                    }
                  `}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content with Fade Transition */}
            <div 
              key={activeTab}
              className="animate-fade-in space-y-3"
            >
              {activeTab === 0 && renderOverviewContent()}
              {activeTab === 1 && renderStreamsContent()}
              {activeTab === 2 && renderAnalyticsContent()}
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