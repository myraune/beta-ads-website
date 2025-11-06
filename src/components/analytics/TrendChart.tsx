import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface TrendPoint {
  week: string;
  twitch: number;
  kick: number;
}

const chartConfig: ChartConfig = {
  twitch: {
    label: "Twitch watch hours",
    color: "#8B5CF6",
  },
  kick: {
    label: "Kick watch hours",
    color: "#34D399",
  },
};

interface TrendChartProps {
  data: TrendPoint[];
}

export const TrendChart: React.FC<TrendChartProps> = ({ data }) => {
  return (
    <Card className="h-full overflow-hidden border-border/60 bg-gradient-to-br from-background via-background to-background/50 shadow-xl">
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <div>
            <CardTitle className="text-base font-semibold">
              Cross-platform watch hours
            </CardTitle>
            <p className="text-sm text-muted-foreground/80">
              Weekly rolling average comparing Twitch and Kick creators.
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[280px]">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="fillTwitch" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor="var(--color-twitch)" stopOpacity={0.35} />
                <stop offset="95%" stopColor="var(--color-twitch)" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="fillKick" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor="var(--color-kick)" stopOpacity={0.35} />
                <stop offset="95%" stopColor="var(--color-kick)" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="8 8" className="stroke-muted/40" vertical={false} />
            <XAxis
              dataKey="week"
              axisLine={false}
              tickLine={false}
              tickMargin={8}
              className="text-xs text-muted-foreground"
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `${value}k`}
              className="text-xs text-muted-foreground"
            />
            <ChartTooltip
              cursor={{ strokeDasharray: "4 4" }}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              type="monotone"
              dataKey="twitch"
              stroke="var(--color-twitch)"
              strokeWidth={2}
              fill="url(#fillTwitch)"
            />
            <Area
              type="monotone"
              dataKey="kick"
              stroke="var(--color-kick)"
              strokeWidth={2}
              fill="url(#fillKick)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
