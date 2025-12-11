import React from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCountUp } from "@/hooks/useCountUp";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { 
  Eye, MousePointer, TrendingUp, Wallet, Clock, Play, 
  Users, Video, Heart, Grid3X3, DollarSign, MessageSquare 
} from "lucide-react";

const viewsData = [
  { name: "Nov 1", views: 8500 },
  { name: "Nov 3", views: 12000 },
  { name: "Nov 5", views: 9800 },
  { name: "Nov 7", views: 18000 },
  { name: "Nov 9", views: 15500 },
  { name: "Nov 11", views: 22000 },
  { name: "Nov 13", views: 19000 },
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
  delay
}) => {
  const { displayValue, hasCompleted } = useCountUp(value, isVisible, { 
    delay, 
    decimals,
    enableLivePulse: true 
  });

  return (
    <div 
      className={`
        relative p-3 rounded-lg backdrop-blur-sm 
        bg-gradient-to-br from-card/50 to-card/20 
        border border-border/10 
        transition-all duration-500
        hover:border-border/30 hover:bg-card/40
        ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-1.5 mb-1">
        <div className="text-primary/70">
          {icon}
        </div>
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium truncate">
          {label}
        </span>
      </div>
      <div className="flex items-baseline gap-0.5">
        {prefix && (
          <span className="text-xs text-muted-foreground font-medium">{prefix}</span>
        )}
        <span 
          className={`
            text-lg md:text-xl lg:text-2xl font-bold tabular-nums tracking-tight text-foreground
            ${hasCompleted ? 'animate-pulse-subtle' : ''}
          `}
        >
          {displayValue}
        </span>
        {suffix && (
          <span className="text-[10px] md:text-xs text-muted-foreground font-medium">{suffix}</span>
        )}
      </div>
    </div>
  );
};

interface LiveDashboardProps {
  className?: string;
}

export const LiveDashboard: React.FC<LiveDashboardProps> = ({ className = "" }) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const stats = [
    { icon: <Eye className="w-3.5 h-3.5" />, label: "Views", value: 92974 },
    { icon: <MousePointer className="w-3.5 h-3.5" />, label: "Clicks", value: 680 },
    { icon: <TrendingUp className="w-3.5 h-3.5" />, label: "CTR", value: 0.73, suffix: "%", decimals: 2 },
    { icon: <Wallet className="w-3.5 h-3.5" />, label: "Spend", value: 0, prefix: "€" },
    { icon: <Clock className="w-3.5 h-3.5" />, label: "Exposure Time", value: 11, suffix: "hrs" },
    { icon: <Play className="w-3.5 h-3.5" />, label: "Watch Time", value: 413.28, suffix: "hrs", decimals: 2 },
    { icon: <Users className="w-3.5 h-3.5" />, label: "Sponsored Streamers", value: 25 },
    { icon: <Video className="w-3.5 h-3.5" />, label: "Sponsored Streams", value: 203 },
    { icon: <Heart className="w-3.5 h-3.5" />, label: "Total Followers", value: 157, suffix: "K" },
    { icon: <Grid3X3 className="w-3.5 h-3.5" />, label: "Categories", value: 82 },
    { icon: <DollarSign className="w-3.5 h-3.5" />, label: "Cost/Hour Watched", value: 0, prefix: "€" },
    { icon: <MessageSquare className="w-3.5 h-3.5" />, label: "Chat Mentions", value: 2841 },
  ];

  return (
    <div 
      ref={ref}
      className={`
        relative w-full max-w-5xl mx-auto
        transition-all duration-1000 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
        ${className}
      `}
      style={{
        perspective: '1200px',
      }}
    >
      {/* Glow effect behind the dashboard */}
      <div 
        className={`
          absolute -inset-6 md:-inset-10 rounded-3xl 
          bg-gradient-to-br from-primary/15 via-primary/5 to-transparent
          blur-3xl opacity-50 -z-10
          transition-all duration-1000 delay-300
          ${isVisible ? 'opacity-50 scale-100' : 'opacity-0 scale-90'}
        `}
      />

      {/* Browser mockup frame */}
      <div 
        className={`
          relative rounded-xl overflow-hidden
          bg-gradient-to-br from-card/80 via-card/60 to-card/40
          backdrop-blur-xl border border-border/30
          shadow-2xl shadow-background/50
          transition-all duration-700 delay-200
          ${isVisible ? 'animate-dashboard-tilt' : ''}
        `}
      >
        {/* Browser top bar */}
        <div className="flex items-center gap-3 px-3 py-2 bg-muted/30 border-b border-border/20">
          {/* Traffic lights */}
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-destructive/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          
          {/* URL bar */}
          <div className="flex-1 flex justify-center">
            <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-background/50 border border-border/20 max-w-sm w-full">
              <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span className="text-[11px] text-muted-foreground font-medium">app.betaads.no/dashboard</span>
            </div>
          </div>

          {/* Placeholder for balance */}
          <div className="w-12" />
        </div>

        {/* Dashboard content */}
        <div className="p-3 md:p-4 space-y-3 md:space-y-4">
          {/* Live indicator */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-xs font-medium text-primary">Live Campaign</span>
            </div>
            <span className="text-[10px] text-muted-foreground">Updated just now</span>
          </div>

          {/* Stats Grid - 12 metrics in 4x3 grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-3">
            {stats.map((stat, index) => (
              <StatCard
                key={stat.label}
                {...stat}
                isVisible={isVisible}
                delay={200 + index * 50}
              />
            ))}
          </div>

          {/* Area Chart - more compact */}
          <div 
            className={`
              p-3 md:p-4 rounded-lg 
              bg-gradient-to-br from-card/30 to-transparent
              border border-border/10
              transition-all duration-700 delay-700
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold text-foreground">Campaign Performance</h3>
              <span className="text-[10px] text-primary font-medium">+23.5%</span>
            </div>
            <div className="h-24 md:h-32">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={viewsData}>
                  <defs>
                    <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 9 }}
                    dy={8}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 9 }}
                    tickFormatter={(value) => `${value / 1000}k`}
                    width={30}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px',
                      color: 'hsl(var(--foreground))',
                      fontSize: '11px'
                    }}
                    formatter={(value: number) => [value.toLocaleString(), 'Views']}
                  />
                  <Area 
                    type="monotone"
                    dataKey="views" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    fill="url(#viewsGradient)"
                    isAnimationActive={isVisible}
                    animationDuration={1500}
                    animationBegin={600}
                  />
                </AreaChart>
              </ResponsiveContainer>
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
