import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { StatCard, StatCardGrid } from './StatCard';
import TopStreamersSection from './twitch-stats/TopStreamersSection';
import CategoryBreakdownSection from './twitch-stats/CategoryBreakdownSection';
import YearOverYearSection from './twitch-stats/YearOverYearSection';
import EngagementSection from './twitch-stats/EngagementSection';
import RevenueSection from './twitch-stats/RevenueSection';
import EsportsSection from './twitch-stats/EsportsSection';
import ViewerDemographicsSection from './twitch-stats/ViewerDemographicsSection';
import GeographicSection from './twitch-stats/GeographicSection';

const quarterlyData = [
  { quarter: 'Q1 2024', hours: 5.4 },
  { quarter: 'Q2 2024', hours: 5.2 },
  { quarter: 'Q3 2024', hours: 5.3 },
  { quarter: 'Q4 2024', hours: 5.1 },
  { quarter: 'Q1 2025', hours: 5.2 },
  { quarter: 'Q2 2025', hours: 4.8 },
  { quarter: 'Q3 2025', hours: 4.8 },
  { quarter: 'Q4 2025', hours: 4.4 },
];

const marketShareData = [
  { name: 'Twitch', value: 52.8, color: 'hsl(var(--primary))' },
  { name: 'YouTube Gaming', value: 24.3, color: 'hsl(var(--chart-2))' },
  { name: 'Kick', value: 12.4, color: 'hsl(var(--accent))' },
  { name: 'Others', value: 10.5, color: 'hsl(var(--muted-foreground))' },
];

const contentSplitData = [
  { name: 'Gaming', value: 78, color: 'hsl(var(--primary))' },
  { name: 'Non-Gaming', value: 22, color: 'hsl(var(--accent))' },
];

const TwitchStatsDashboard = () => {
  return (
    <div className="space-y-16">
      {/* Key Platform Metrics */}
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-6">Key Platform Metrics (StreamHatchet 2025)</h3>
        <StatCardGrid>
          <StatCard value={19.2} suffix="B" label="Hours Watched" decimals={1} trend="-8.9% YoY" format="raw" />
          <StatCard value={52.8} suffix="%" label="Market Share" decimals={1} trend="-8.3 pts YoY" format="raw" />
          <StatCard value={19.7} suffix="M" label="Unique Channels" decimals={1} trend="-0.5% YoY" format="raw" />
          <StatCard value={22} suffix="%" label="Non-Gaming Content" trend="+2 pts YoY" format="raw" />
        </StatCardGrid>
      </div>

      {/* Engagement & Activity */}
      <EngagementSection />

      {/* Quarterly Hours */}
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-6">Quarterly Hours Watched (Billions)</h3>
        <div className="bg-card/30 border border-border/30 rounded-xl p-6">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={quarterlyData}>
              <defs>
                <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="quarter" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" domain={[4, 6]} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
                formatter={(value: number) => [`${value}B hours`, 'Watched']}
              />
              <Area type="monotone" dataKey="hours" stroke="hsl(var(--primary))" fill="url(#colorHours)" strokeWidth={2} isAnimationActive={false} />
            </AreaChart>
          </ResponsiveContainer>
          <p className="text-center text-sm text-muted-foreground mt-4">Q4 2025 was the lowest viewership quarter since Q1 2020</p>
        </div>
      </div>

      {/* YoY Comparison */}
      <YearOverYearSection />

      {/* Market Share & Content Split */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-6">Platform Market Share 2025</h3>
          <div className="bg-card/30 border border-border/30 rounded-xl p-6">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={marketShareData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" label={({ name, value }) => `${name}: ${value}%`} isAnimationActive={false}>
                  {marketShareData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-6">Content Split 2025</h3>
          <div className="bg-card/30 border border-border/30 rounded-xl p-6">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={contentSplitData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" label={({ name, value }) => `${name}: ${value}%`} isAnimationActive={false}>
                  {contentSplitData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
            <p className="text-center text-sm text-muted-foreground mt-4">Non-gaming grew from 20% to 22% YoY</p>
          </div>
        </div>
      </div>

      {/* Top Streamers */}
      <TopStreamersSection />

      {/* Category Breakdown */}
      <CategoryBreakdownSection />

      {/* Viewer Demographics */}
      <ViewerDemographicsSection />

      {/* Geographic Distribution */}
      <GeographicSection />

      {/* Creator Economy */}
      <RevenueSection />

      {/* Esports */}
      <EsportsSection />

      {/* Sources */}
      <div className="text-xs text-muted-foreground border-t border-border/30 pt-6">
        <p className="font-medium mb-2">Data Sources:</p>
        <p>StreamHatchet 2025 Yearly Live Streaming Trends Report, TwitchTracker, Esports Charts</p>
      </div>
    </div>
  );
};

export default TwitchStatsDashboard;
