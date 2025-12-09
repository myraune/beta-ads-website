import React from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCountUp } from "@/hooks/useCountUp";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { Eye, MousePointer, Percent, Users, Clock, MessageCircle } from "lucide-react";

const viewsData = [
  { name: "Nov 6", views: 12000 },
  { name: "Nov 7", views: 18000 },
  { name: "Nov 8", views: 15000 },
  { name: "Nov 9", views: 22000 },
  { name: "Nov 10", views: 8000 },
  { name: "Nov 11", views: 16000 },
];

const streamerData = [
  { name: "Streamer A", value: 25, color: "#3B82F6" },
  { name: "Streamer B", value: 20, color: "#8B5CF6" },
  { name: "Streamer C", value: 18, color: "#EC4899" },
  { name: "Streamer D", value: 15, color: "#F59E0B" },
  { name: "Streamer E", value: 12, color: "#10B981" },
  { name: "Others", value: 10, color: "#6B7280" },
];

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  suffix?: string;
  decimals?: number;
  isVisible: boolean;
  delay: number;
  isPrimary?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ 
  icon, 
  label, 
  value, 
  suffix = "", 
  decimals = 0,
  isVisible, 
  delay,
  isPrimary = false
}) => {
  const { displayValue, hasCompleted } = useCountUp(value, isVisible, { 
    delay, 
    decimals,
    enableLivePulse: true 
  });

  return (
    <div 
      className={`
        relative p-4 md:p-6 rounded-xl backdrop-blur-sm border transition-all duration-500
        ${isPrimary 
          ? 'bg-primary/10 border-primary/30 shadow-lg shadow-primary/10' 
          : 'bg-card/50 border-border/30 hover:border-border/50'
        }
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className={`${isPrimary ? 'text-primary' : 'text-muted-foreground'}`}>
          {icon}
        </div>
        <span className="text-xs md:text-sm text-muted-foreground uppercase tracking-wide">
          {label}
        </span>
      </div>
      <div className="flex items-baseline gap-1">
        <span 
          className={`
            text-2xl md:text-3xl lg:text-4xl font-bold tabular-nums
            ${isPrimary ? 'text-primary' : 'text-foreground'}
            ${hasCompleted ? 'animate-pulse-subtle' : ''}
          `}
        >
          {displayValue}
        </span>
        {suffix && (
          <span className="text-sm md:text-base text-muted-foreground">{suffix}</span>
        )}
      </div>
    </div>
  );
};

export const LiveDashboard: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const stats = [
    { icon: <Eye className="w-4 h-4 md:w-5 md:h-5" />, label: "Views", value: 91145, isPrimary: true },
    { icon: <MousePointer className="w-4 h-4 md:w-5 md:h-5" />, label: "Clicks", value: 670 },
    { icon: <Percent className="w-4 h-4 md:w-5 md:h-5" />, label: "CTR", value: 0.74, suffix: "%", decimals: 2 },
    { icon: <Users className="w-4 h-4 md:w-5 md:h-5" />, label: "Streamers", value: 25 },
    { icon: <Clock className="w-4 h-4 md:w-5 md:h-5" />, label: "Watch Time", value: 405.15, suffix: "hrs", decimals: 2 },
    { icon: <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />, label: "Mentions", value: 2801 },
  ];

  return (
    <section 
      ref={ref}
      className="py-16 md:py-24 bg-gradient-to-b from-background via-muted/20 to-background"
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div 
          className={`text-center mb-10 md:mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-xs md:text-sm font-medium text-primary">Live Campaign Report</span>
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4">
            Real-Time Analytics
          </h2>
          <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Track your campaign performance with live data and insights
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 mb-8 md:mb-12">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              {...stat}
              isVisible={isVisible}
              delay={index * 100}
            />
          ))}
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {/* Bar Chart */}
          <div 
            className={`
              p-4 md:p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/30
              transition-all duration-700 delay-500
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}
          >
            <h3 className="text-base md:text-lg font-semibold text-foreground mb-4 md:mb-6">Views Over Time</h3>
            <div className="h-48 md:h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={viewsData}>
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    tickFormatter={(value) => `${value / 1000}k`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      color: 'hsl(var(--foreground))'
                    }}
                    formatter={(value: number) => [value.toLocaleString(), 'Views']}
                  />
                  <Bar 
                    dataKey="views" 
                    fill="hsl(var(--primary))" 
                    radius={[4, 4, 0, 0]}
                    isAnimationActive={isVisible}
                    animationDuration={1500}
                    animationBegin={600}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Donut Chart */}
          <div 
            className={`
              p-4 md:p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/30
              transition-all duration-700 delay-700
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}
          >
            <h3 className="text-base md:text-lg font-semibold text-foreground mb-4 md:mb-6">Streamer Distribution</h3>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="h-40 w-40 md:h-48 md:w-48 flex-shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={streamerData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      paddingAngle={2}
                      dataKey="value"
                      isAnimationActive={isVisible}
                      animationDuration={1500}
                      animationBegin={800}
                    >
                      {streamerData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        color: 'hsl(var(--foreground))'
                      }}
                      formatter={(value: number) => [`${value}%`, 'Share']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap md:flex-col gap-2 justify-center">
                {streamerData.map((entry) => (
                  <div key={entry.name} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full flex-shrink-0" 
                      style={{ backgroundColor: entry.color }}
                    />
                    <span className="text-xs md:text-sm text-muted-foreground">{entry.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
