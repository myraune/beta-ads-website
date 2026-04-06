import React from "react";
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  ReferenceLine,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from "recharts";

/* ──────────────────────────────────────────────
   Apple/iOS-style chart primitives.
   - Soft gradients, monotone curves, no clutter.
   - Single accent color, thin axis labels.
   - Tooltips look like iOS popovers.
   ────────────────────────────────────────────── */

const PRIMARY = "hsl(357 70% 60%)"; // Beta signal red
const MUTED = "hsl(220 8% 46%)";

/* ── iOS-style tooltip ── */
const IOSTooltip: React.FC<{ active?: boolean; payload?: any[]; label?: string; suffix?: string; valuePrefix?: string }> = ({
  active,
  payload,
  label,
  suffix = "",
  valuePrefix = "",
}) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="rounded-2xl border border-border bg-background/95 backdrop-blur-xl shadow-2xl px-4 py-3">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-1">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-base font-bold text-foreground tabular-nums" style={{ color: entry.color || PRIMARY }}>
          {valuePrefix}
          {typeof entry.value === "number" ? entry.value.toLocaleString() : entry.value}
          {suffix}
        </p>
      ))}
    </div>
  );
};

/* ── Weekly CTR — iOS Stock app style area chart ── */
interface WeeklyDatum {
  week: string;
  ctr: number;
  viewers?: string | number;
  label?: string;
}

export const WeeklyCTRAreaChart: React.FC<{ data: WeeklyDatum[] }> = ({ data }) => (
  <div className="w-full h-[260px]">
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 6, left: -28, bottom: 0 }}>
        <defs>
          <linearGradient id="ctrFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={PRIMARY} stopOpacity={0.35} />
            <stop offset="100%" stopColor={PRIMARY} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="2 4" vertical={false} />
        <XAxis
          dataKey="week"
          stroke={MUTED}
          fontSize={11}
          tickLine={false}
          axisLine={false}
          dy={6}
        />
        <YAxis
          stroke={MUTED}
          fontSize={11}
          tickLine={false}
          axisLine={false}
          tickFormatter={(v) => `${v}%`}
          domain={[0, 4]}
          ticks={[0, 1, 2, 3, 4]}
        />
        <Tooltip content={<IOSTooltip suffix="%" />} cursor={{ stroke: PRIMARY, strokeWidth: 1, strokeDasharray: "3 3" }} />
        <Area
          type="monotone"
          dataKey="ctr"
          stroke={PRIMARY}
          strokeWidth={2.5}
          fill="url(#ctrFill)"
          dot={{ fill: PRIMARY, r: 4, strokeWidth: 0 }}
          activeDot={{ r: 6, fill: PRIMARY, stroke: "hsl(var(--background))", strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

/* ── Category donut — iOS Health app style ── */
interface CategoryDatum {
  name: string;
  share: number;
  views: string;
  ctr: string;
}

export const CategoryDonut: React.FC<{ data: CategoryDatum[] }> = ({ data }) => {
  // iOS palette: primary red anchor, then warm-to-cool fade
  const COLORS = [
    "hsl(357 70% 60%)", // primary red — Just Chatting (largest)
    "hsl(357 70% 70%)",
    "hsl(357 50% 75%)",
    "hsl(220 12% 55%)",
    "hsl(220 12% 70%)",
  ];

  // Calculate "other" slice for the unaccounted-for share
  const totalShare = data.reduce((sum, d) => sum + d.share, 0);
  const chartData = totalShare < 100
    ? [...data, { name: "Other categories", share: parseFloat((100 - totalShare).toFixed(2)), views: "", ctr: "" }]
    : data;

  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-6 items-center">
      <div className="relative w-full h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="share"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={62}
              outerRadius={100}
              paddingAngle={2}
              startAngle={90}
              endAngle={-270}
              stroke="hsl(var(--background))"
              strokeWidth={3}
            >
              {chartData.map((_, i) => (
                <Cell key={i} fill={i < COLORS.length ? COLORS[i] : "hsl(220 12% 80%)"} />
              ))}
            </Pie>
            <Tooltip content={<IOSTooltip suffix="%" />} />
          </PieChart>
        </ResponsiveContainer>
        {/* Center label */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground tracking-tight tabular-nums">{data.length}</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-0.5">Top categories</div>
          </div>
        </div>
      </div>
      {/* Legend */}
      <div className="space-y-2 min-w-[140px]">
        {chartData.slice(0, 5).map((c, i) => (
          <div key={c.name} className="flex items-center gap-2.5">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: i < COLORS.length ? COLORS[i] : "hsl(220 12% 80%)" }}
            />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-foreground truncate">{c.name}</div>
              <div className="text-[10px] text-muted-foreground tabular-nums">{c.share}%</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── Adblock impact gauge — iOS Activity ring style ── */
export const AdblockGauge: React.FC<{ percentage: number; label?: string }> = ({ percentage, label = "Adblock impact" }) => {
  const data = [{ name: "blocked", value: percentage, fill: PRIMARY }];
  return (
    <div className="relative w-full h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart cx="50%" cy="50%" innerRadius="70%" outerRadius="100%" data={data} startAngle={90} endAngle={-270}>
          <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
          <RadialBar background={{ fill: "hsl(var(--muted))" }} dataKey="value" cornerRadius={20} fill={PRIMARY} />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <div className="text-4xl font-bold text-foreground tracking-tight tabular-nums">{percentage}%</div>
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">{label}</div>
        </div>
      </div>
    </div>
  );
};

/* ── Campaign comparison — normalized index line chart ──
   Each metric is normalized to an index where 100 = combined campaign average.
   Above 100 = above average, below 100 = below average. This puts all metrics
   (views, clicks, CTR, days, etc) on a single comparable scale and creates
   meaningful line variation for both campaigns. The 100 baseline acts as
   a reference line, like the S&P 500 at 100 in stock comparison charts. */

interface IndexedMetric {
  metric: string;
  s25: number;        // index (100 = avg)
  fold7: number;
  s25Raw: string;     // display value for tooltip
  fold7Raw: string;
}

const buildIndexed = (s25Val: number, fold7Val: number, s25Raw: string, fold7Raw: string, metric: string): IndexedMetric => {
  const avg = (s25Val + fold7Val) / 2;
  return {
    metric,
    s25: Math.round((s25Val / avg) * 100),
    fold7: Math.round((fold7Val / avg) * 100),
    s25Raw,
    fold7Raw,
  };
};

const ComparisonTooltip: React.FC<{ active?: boolean; payload?: any[]; label?: string }> = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  const datum = payload[0]?.payload as IndexedMetric | undefined;
  if (!datum) return null;
  return (
    <div className="rounded-2xl border border-border bg-background/95 backdrop-blur-xl shadow-2xl px-4 py-3 min-w-[160px]">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">{label}</p>
      <div className="space-y-1.5">
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs text-muted-foreground flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ background: PRIMARY }} />
            S25 Ultra
          </span>
          <span className="text-sm font-bold text-foreground tabular-nums">{datum.s25Raw}</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs text-muted-foreground flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ background: "hsl(220 12% 60%)" }} />
            Z Fold7
          </span>
          <span className="text-sm font-bold text-foreground tabular-nums">{datum.fold7Raw}</span>
        </div>
      </div>
    </div>
  );
};

export const CampaignComparisonChart: React.FC = () => {
  // Per-streamer normalized comparison. Removes the budget-bias problem
  // where Fold7's smaller buy (28 streamers, 31 days) made it look weak
  // in absolute terms. With per-streamer rates, both campaigns shine on
  // different axes — Fold7 dominates reach efficiency, S25 dominates
  // engagement. Index 100 = average of both campaigns on each metric.
  //
  // S25 Ultra: 43 streamers, 56 days
  // Fold7:     28 streamers, 31 days
  const data: IndexedMetric[] = [
    // Reach efficiency
    buildIndexed(3224, 5069, "3,224", "5,069", "Unique / streamer"),
    buildIndexed(11631, 10716, "11,631", "10,716", "Views / streamer"),
    // Quality metrics
    buildIndexed(2.93, 2.34, "2.93%", "2.34%", "Average CTR"),
    buildIndexed(90.07, 93.05, "90.07%", "93.05%", "Norway audience"),
    // Engagement efficiency
    buildIndexed(341, 251, "341", "251", "Clicks / streamer"),
    buildIndexed(87.2, 71.4, "87.2h", "71.4h", "Watch hrs / streamer"),
  ];

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 16, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="s25LineFade" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={PRIMARY} stopOpacity={0.85} />
              <stop offset="100%" stopColor={PRIMARY} stopOpacity={1} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="2 4" vertical={false} />
          <XAxis
            dataKey="metric"
            stroke={MUTED}
            fontSize={10}
            tickLine={false}
            axisLine={false}
            dy={6}
            interval={0}
          />
          <YAxis
            stroke={MUTED}
            fontSize={10}
            tickLine={false}
            axisLine={false}
            domain={[40, 160]}
            ticks={[50, 75, 100, 125, 150]}
            tickFormatter={(v) => `${v}`}
          />
          <Tooltip content={<ComparisonTooltip />} cursor={{ stroke: PRIMARY, strokeWidth: 1, strokeDasharray: "3 3" }} />
          <ReferenceLine y={100} stroke="hsl(var(--muted-foreground))" strokeDasharray="4 4" strokeOpacity={0.4} label={{ value: "avg", position: "left", fill: MUTED, fontSize: 9 }} />
          <Line
            type="monotone"
            dataKey="s25"
            name="S25 Ultra"
            stroke={PRIMARY}
            strokeWidth={2.5}
            dot={{ fill: PRIMARY, r: 4, strokeWidth: 0 }}
            activeDot={{ r: 6, fill: PRIMARY, stroke: "hsl(var(--background))", strokeWidth: 2 }}
          />
          <Line
            type="monotone"
            dataKey="fold7"
            name="Z Fold7"
            stroke="hsl(220 12% 60%)"
            strokeWidth={2.5}
            dot={{ fill: "hsl(220 12% 60%)", r: 4, strokeWidth: 0 }}
            activeDot={{ r: 6, fill: "hsl(220 12% 60%)", stroke: "hsl(var(--background))", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
