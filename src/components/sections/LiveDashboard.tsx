import React from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCountUp } from "@/hooks/useCountUp";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { Eye, MousePointer, Users, TrendingUp } from "lucide-react";

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
  suffix?: string;
  decimals?: number;
  isVisible: boolean;
  delay: number;
}

const StatCard: React.FC<StatCardProps> = ({ 
  icon, 
  label, 
  value, 
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
        relative p-4 md:p-5 rounded-xl backdrop-blur-md 
        bg-gradient-to-br from-card/60 to-card/30 
        border border-border/20 
        transition-all duration-500
        hover:border-border/40 hover:shadow-lg hover:shadow-primary/5
        ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="text-primary/80">
          {icon}
        </div>
        <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
          {label}
        </span>
      </div>
      <div className="flex items-baseline gap-1">
        <span 
          className={`
            text-3xl md:text-4xl lg:text-5xl font-bold tabular-nums tracking-tight text-foreground
            ${hasCompleted ? 'animate-pulse-subtle' : ''}
          `}
        >
          {displayValue}
        </span>
        {suffix && (
          <span className="text-sm md:text-base text-muted-foreground font-medium">{suffix}</span>
        )}
      </div>
    </div>
  );
};

interface LiveDashboardProps {
  className?: string;
}

export const LiveDashboard: React.FC<LiveDashboardProps> = ({ className = "" }) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.15 });

  const stats = [
    { icon: <Eye className="w-4 h-4" />, label: "Views", value: 91145 },
    { icon: <MousePointer className="w-4 h-4" />, label: "Clicks", value: 670 },
    { icon: <TrendingUp className="w-4 h-4" />, label: "CTR", value: 0.74, suffix: "%", decimals: 2 },
    { icon: <Users className="w-4 h-4" />, label: "Streamers", value: 25 },
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
          absolute -inset-8 md:-inset-12 rounded-3xl 
          bg-gradient-to-br from-primary/20 via-primary/5 to-transparent
          blur-3xl opacity-50 -z-10
          transition-all duration-1000 delay-300
          ${isVisible ? 'opacity-50 scale-100' : 'opacity-0 scale-90'}
        `}
      />

      {/* Browser mockup frame */}
      <div 
        className={`
          relative rounded-2xl overflow-hidden
          bg-gradient-to-br from-card/80 via-card/60 to-card/40
          backdrop-blur-xl border border-border/30
          shadow-2xl shadow-background/50
          transition-all duration-700 delay-200
          ${isVisible ? 'animate-dashboard-tilt' : ''}
        `}
      >
        {/* Browser top bar */}
        <div className="flex items-center gap-3 px-4 py-3 bg-muted/30 border-b border-border/20">
          {/* Traffic lights */}
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-destructive/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          
          {/* URL bar */}
          <div className="flex-1 flex justify-center">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-background/50 border border-border/20 max-w-md w-full">
              <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span className="text-xs text-muted-foreground font-medium">app.betaads.no/dashboard</span>
            </div>
          </div>

          {/* Placeholder for balance */}
          <div className="w-14" />
        </div>

        {/* Dashboard content */}
        <div className="p-4 md:p-6 space-y-4 md:space-y-6">
          {/* Live indicator */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
              </span>
              <span className="text-sm font-medium text-primary">Live Campaign</span>
            </div>
            <span className="text-xs text-muted-foreground">Updated just now</span>
          </div>

          {/* Stats Grid - 4 key metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {stats.map((stat, index) => (
              <StatCard
                key={stat.label}
                {...stat}
                isVisible={isVisible}
                delay={300 + index * 100}
              />
            ))}
          </div>

          {/* Area Chart */}
          <div 
            className={`
              p-4 md:p-5 rounded-xl 
              bg-gradient-to-br from-card/40 to-transparent
              border border-border/20
              transition-all duration-700 delay-700
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground">Campaign Performance</h3>
              <span className="text-xs text-primary font-medium">+23.5%</span>
            </div>
            <div className="h-32 md:h-40">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={viewsData}>
                  <defs>
                    <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                    tickFormatter={(value) => `${value / 1000}k`}
                    width={35}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      color: 'hsl(var(--foreground))',
                      fontSize: '12px'
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
                    animationBegin={800}
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