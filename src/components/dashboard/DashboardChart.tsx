import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { cn } from "@/lib/utils";

interface DashboardLineChartProps {
  data: { date: string; views: number; clicks: number }[];
  className?: string;
}

export const DashboardLineChart: React.FC<DashboardLineChartProps> = ({
  data,
  className,
}) => {
  const [metric, setMetric] = useState<"views" | "clicks" | "ctr">("views");

  const chartData = data.map((item) => ({
    ...item,
    ctr: item.views > 0 ? ((item.clicks / item.views) * 100).toFixed(2) : 0,
    dateLabel: new Date(item.date).toLocaleDateString("no-NO", {
      month: "short",
      day: "numeric",
    }),
  }));

  const formatValue = (value: number) => {
    if (metric === "ctr") return `${value}%`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
    return value.toString();
  };

  return (
    <div className={cn("bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h3 className="font-semibold text-lg text-foreground">Performance over tid</h3>
        <div className="flex gap-2">
          {(["views", "clicks", "ctr"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMetric(m)}
              className={cn(
                "px-3 py-1.5 text-sm font-medium rounded-lg transition-colors",
                metric === m
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              {m === "views" ? "Views" : m === "clicks" ? "Clicks" : "CTR"}
            </button>
          ))}
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis
              dataKey="dateLabel"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => formatValue(value)}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                color: "hsl(var(--foreground))",
              }}
              labelStyle={{ color: "hsl(var(--muted-foreground))" }}
              formatter={(value: number) => [formatValue(value), metric.toUpperCase()]}
            />
            <Line
              type="monotone"
              dataKey={metric}
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={{ fill: "hsl(var(--primary))", strokeWidth: 0, r: 4 }}
              activeDot={{ r: 6, fill: "hsl(var(--primary))" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

interface HorizontalBarChartProps {
  data: { name: string; percentage: number }[];
  title: string;
  className?: string;
}

export const HorizontalBarChart: React.FC<HorizontalBarChartProps> = ({
  data,
  title,
  className,
}) => {
  return (
    <div className={cn("bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6", className)}>
      <h3 className="font-semibold text-lg text-foreground mb-4">{title}</h3>
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={item.name}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">{item.name}</span>
              <span className="font-medium font-mono text-foreground">{item.percentage}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-500"
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface SimpleBarChartProps {
  data: { name: string; value: number }[];
  title: string;
  className?: string;
}

export const SimpleBarChart: React.FC<SimpleBarChartProps> = ({
  data,
  title,
  className,
}) => {
  return (
    <div className={cn("bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6", className)}>
      <h3 className="font-semibold text-lg text-foreground mb-4">{title}</h3>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} horizontal={false} />
            <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis
              type="category"
              dataKey="name"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              width={100}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                color: "hsl(var(--foreground))",
              }}
            />
            <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
