import React from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCountUp } from "@/hooks/useCountUp";
import { AreaChart, Area, XAxis, ResponsiveContainer } from "recharts";
import { 
  Eye, MousePointer, TrendingUp, Wallet, Clock, Play, 
  Users, Video, Heart, Grid3X3, DollarSign, MessageSquare 
} from "lucide-react";

const viewsData = [
  { name: "1", views: 8500 },
  { name: "3", views: 12000 },
  { name: "5", views: 9800 },
  { name: "7", views: 18000 },
  { name: "9", views: 15500 },
  { name: "11", views: 22000 },
  { name: "13", views: 19000 },
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
  compact?: boolean;
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
  compact = false
}) => {
  const { displayValue, hasCompleted } = useCountUp(value, isVisible, { 
    delay, 
    decimals,
    enableLivePulse: true 
  });

  return (
    <div 
      className={`
        relative transition-all duration-500
        ${compact ? 'py-1.5 px-1.5' : 'py-3 px-2'}
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={`flex items-center gap-1 ${compact ? 'mb-0.5' : 'mb-1'}`}>
        <div className="text-primary/60">
          {icon}
        </div>
        <span className={`text-muted-foreground/70 uppercase tracking-wider font-medium truncate ${compact ? 'text-[7px]' : 'text-[9px]'}`}>
          {label}
        </span>
      </div>
      <div className="flex items-baseline gap-0.5">
        {prefix && (
          <span className={`text-muted-foreground font-medium ${compact ? 'text-[9px]' : 'text-xs'}`}>{prefix}</span>
        )}
        <span 
          className={`
            font-bold tabular-nums tracking-tight text-foreground
            ${compact ? 'text-sm' : 'text-lg md:text-xl'}
            ${hasCompleted ? 'animate-pulse-subtle' : ''}
          `}
        >
          {displayValue}
        </span>
        {suffix && (
          <span className={`text-muted-foreground/70 font-medium ${compact ? 'text-[8px]' : 'text-[10px]'}`}>{suffix}</span>
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

  const stats = [
    { icon: <Eye className={compact ? "w-2.5 h-2.5" : "w-3.5 h-3.5"} />, label: "Views", value: 92974 },
    { icon: <MousePointer className={compact ? "w-2.5 h-2.5" : "w-3.5 h-3.5"} />, label: "Clicks", value: 680 },
    { icon: <TrendingUp className={compact ? "w-2.5 h-2.5" : "w-3.5 h-3.5"} />, label: "CTR", value: 0.73, suffix: "%", decimals: 2 },
    { icon: <Wallet className={compact ? "w-2.5 h-2.5" : "w-3.5 h-3.5"} />, label: "Spend", value: 0, prefix: "€" },
    { icon: <Clock className={compact ? "w-2.5 h-2.5" : "w-3.5 h-3.5"} />, label: "Exposure", value: 11, suffix: "h" },
    { icon: <Play className={compact ? "w-2.5 h-2.5" : "w-3.5 h-3.5"} />, label: "Watch", value: 413, suffix: "h" },
    { icon: <Users className={compact ? "w-2.5 h-2.5" : "w-3.5 h-3.5"} />, label: "Streamers", value: 25 },
    { icon: <Video className={compact ? "w-2.5 h-2.5" : "w-3.5 h-3.5"} />, label: "Streams", value: 203 },
    { icon: <Heart className={compact ? "w-2.5 h-2.5" : "w-3.5 h-3.5"} />, label: "Followers", value: 157, suffix: "K" },
    { icon: <Grid3X3 className={compact ? "w-2.5 h-2.5" : "w-3.5 h-3.5"} />, label: "Categories", value: 82 },
    { icon: <DollarSign className={compact ? "w-2.5 h-2.5" : "w-3.5 h-3.5"} />, label: "Cost/Hr", value: 0, prefix: "€" },
    { icon: <MessageSquare className={compact ? "w-2.5 h-2.5" : "w-3.5 h-3.5"} />, label: "Mentions", value: 2841 },
  ];

  return (
    <div 
      ref={ref}
      className={`
        relative w-full mx-auto
        ${compact ? 'max-w-md' : 'max-w-5xl'}
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
          absolute rounded-3xl 
          bg-gradient-to-br from-primary/15 via-primary/5 to-transparent
          blur-3xl opacity-50 -z-10
          transition-all duration-1000 delay-300
          ${compact ? '-inset-4' : '-inset-6 md:-inset-10'}
          ${isVisible ? 'opacity-50 scale-100' : 'opacity-0 scale-90'}
        `}
      />

      {/* Browser mockup frame */}
      <div 
        className={`
          relative rounded-lg overflow-hidden
          bg-gradient-to-br from-card/80 via-card/60 to-card/40
          backdrop-blur-xl border border-border/30
          shadow-2xl shadow-background/50
          transition-all duration-700 delay-200
          ${isVisible ? 'animate-dashboard-tilt' : ''}
        `}
      >
        {/* Browser top bar */}
        <div className={`flex items-center gap-2 bg-muted/30 border-b border-border/20 ${compact ? 'px-2 py-1.5' : 'px-3 py-2'}`}>
          {/* Traffic lights */}
          <div className="flex items-center gap-1">
            <div className={`rounded-full bg-destructive/80 ${compact ? 'w-2 h-2' : 'w-2.5 h-2.5'}`} />
            <div className={`rounded-full bg-yellow-500/80 ${compact ? 'w-2 h-2' : 'w-2.5 h-2.5'}`} />
            <div className={`rounded-full bg-green-500/80 ${compact ? 'w-2 h-2' : 'w-2.5 h-2.5'}`} />
          </div>
          
          {/* URL bar */}
          <div className="flex-1 flex justify-center">
            <div className={`flex items-center gap-1.5 rounded bg-background/50 border border-border/20 ${compact ? 'px-2 py-0.5 max-w-[160px]' : 'px-3 py-1 max-w-sm'} w-full`}>
              <svg className={`text-green-500 ${compact ? 'w-2 h-2' : 'w-3 h-3'}`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span className={`text-muted-foreground font-medium truncate ${compact ? 'text-[9px]' : 'text-[11px]'}`}>app.betaads.no</span>
            </div>
          </div>

          <div className={compact ? 'w-8' : 'w-12'} />
        </div>

        {/* Dashboard content */}
        <div className={compact ? 'p-2 space-y-2' : 'p-3 md:p-4 space-y-3 md:space-y-4'}>
          {/* Live indicator */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
              </span>
              <span className={`font-medium text-primary ${compact ? 'text-[10px]' : 'text-xs'}`}>Live Campaign</span>
            </div>
            <span className={`text-muted-foreground ${compact ? 'text-[8px]' : 'text-[10px]'}`}>Updated now</span>
          </div>

          {/* Stats Grid */}
          <div className={`grid ${compact ? 'grid-cols-4' : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4'}`}>
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className={`
                  ${index % 4 !== 3 ? 'border-r border-border/10' : ''}
                  ${index < 8 ? 'border-b border-border/10' : ''}
                `}
              >
                <StatCard
                  {...stat}
                  isVisible={isVisible}
                  delay={100 + index * 30}
                  compact={compact}
                />
              </div>
            ))}
          </div>

          {/* Area Chart */}
          <div 
            className={`
              pt-2 border-t border-border/10
              transition-all duration-700 delay-500
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}
          >
            <div className="flex items-center justify-between mb-1">
              <h3 className={`font-semibold text-foreground ${compact ? 'text-[10px]' : 'text-xs'}`}>Performance</h3>
              <span className={`text-primary font-medium ${compact ? 'text-[9px]' : 'text-[10px]'}`}>+23.5%</span>
            </div>
            <div className={compact ? 'h-12' : 'h-24 md:h-32'}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={viewsData}>
                  <defs>
                    <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  {!compact && (
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false}
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 8 }}
                      dy={4}
                    />
                  )}
                  <Area 
                    type="monotone"
                    dataKey="views" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={1.5}
                    fill="url(#viewsGradient)"
                    isAnimationActive={isVisible}
                    animationDuration={1000}
                    animationBegin={400}
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
