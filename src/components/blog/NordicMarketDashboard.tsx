import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { StatCard, StatCardGrid } from './StatCard';

const countryData = [
  { country: 'Sweden', viewers: 620000, watchTime: 2.1, growth: 12, streamers: 850 },
  { country: 'Norway', viewers: 420000, watchTime: 2.0, growth: 18, streamers: 620 },
  { country: 'Denmark', viewers: 380000, watchTime: 1.8, growth: 15, streamers: 480 },
  { country: 'Finland', viewers: 350000, watchTime: 2.3, growth: 22, streamers: 520 },
];

const marketShareData = [
  { name: 'Sweden', value: 35 },
  { name: 'Norway', value: 24 },
  { name: 'Denmark', value: 21 },
  { name: 'Finland', value: 20 },
];

const quarterlyGrowth = [
  { quarter: 'Q1 2024', sweden: 580, norway: 380, denmark: 340, finland: 300 },
  { quarter: 'Q2 2024', sweden: 590, norway: 395, denmark: 355, finland: 320 },
  { quarter: 'Q3 2024', sweden: 605, norway: 410, denmark: 365, finland: 335 },
  { quarter: 'Q4 2024', sweden: 620, norway: 420, denmark: 380, finland: 350 },
];

const COLORS = ['hsl(var(--primary))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];

export default function NordicMarketDashboard() {
  return (
    <div className="space-y-12">
      {/* Overview Stats */}
      <section id="overview">
        <h2 className="text-2xl font-bold text-foreground mb-6">Nordic Twitch Market Overview</h2>
        <StatCardGrid>
          <StatCard value={1.77} label="Total Nordic Viewers" suffix="M" decimals={2} format="raw" />
          <StatCard value={2.05} label="Avg Watch Time (hrs)" suffix="h" decimals={2} format="raw" />
          <StatCard value={16.75} label="YoY Growth Rate" suffix="%" decimals={2} format="raw" />
          <StatCard value={2470} label="Active Nordic Streamers" format="raw" />
        </StatCardGrid>
      </section>

      {/* Country Comparison */}
      <section id="country-comparison">
        <h2 className="text-2xl font-bold text-foreground mb-6">Country Comparison</h2>
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Market Share Pie */}
          <div className="bg-card/30 border border-border/30 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Market Share Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={marketShareData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {marketShareData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Growth Rate Bar */}
          <div className="bg-card/30 border border-border/30 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">YoY Growth Rate by Country</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={countryData} layout="vertical">
                  <XAxis type="number" tickFormatter={(v) => `${v}%`} stroke="hsl(var(--muted-foreground))" />
                  <YAxis type="category" dataKey="country" width={80} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Growth Rate']}
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                  />
                  <Bar dataKey="growth" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* Unique Viewers */}
      <section id="viewers">
        <h2 className="text-2xl font-bold text-foreground mb-6">Monthly Unique Viewers by Country</h2>
        <div className="bg-card/30 border border-border/30 rounded-xl p-6">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={countryData}>
                <XAxis dataKey="country" stroke="hsl(var(--muted-foreground))" />
                <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  formatter={(value) => [`${(Number(value) / 1000).toFixed(0)}K`, 'Viewers']}
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                />
                <Bar dataKey="viewers" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Watch Time */}
      <section id="watch-time">
        <h2 className="text-2xl font-bold text-foreground mb-6">Average Daily Watch Time</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {countryData.map((country) => (
            <div key={country.country} className="bg-card/30 border border-border/30 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">{country.watchTime}h</div>
              <div className="text-sm text-muted-foreground">{country.country}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Growth Trends */}
      <section id="growth">
        <h2 className="text-2xl font-bold text-foreground mb-6">Quarterly Viewer Growth (2024)</h2>
        <div className="bg-card/30 border border-border/30 rounded-xl p-6">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={quarterlyGrowth}>
                <XAxis dataKey="quarter" stroke="hsl(var(--muted-foreground))" />
                <YAxis tickFormatter={(v) => `${v}K`} stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  formatter={(value) => [`${value}K viewers`, '']}
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                />
                <Line type="monotone" dataKey="sweden" stroke={COLORS[0]} strokeWidth={2} dot={{ fill: COLORS[0] }} />
                <Line type="monotone" dataKey="norway" stroke={COLORS[1]} strokeWidth={2} dot={{ fill: COLORS[1] }} />
                <Line type="monotone" dataKey="denmark" stroke={COLORS[2]} strokeWidth={2} dot={{ fill: COLORS[2] }} />
                <Line type="monotone" dataKey="finland" stroke={COLORS[3]} strokeWidth={2} dot={{ fill: COLORS[3] }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-4 mt-4 justify-center">
            {countryData.map((c, i) => (
              <div key={c.country} className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                <span className="text-muted-foreground">{c.country}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Source */}
      <div className="text-center text-xs text-muted-foreground pt-8 border-t border-border/30">
        Data compiled from TwitchTracker, Stream Hatchet, and internal Beta Ads analytics. December 2024.
      </div>
    </div>
  );
}
