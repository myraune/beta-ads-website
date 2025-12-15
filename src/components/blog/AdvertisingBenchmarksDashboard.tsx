import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { useInView } from '@/hooks/useInView';
import { useCountUp } from '@/hooks/useCountUp';

const cpmByRegion = [
  { region: 'North America', cpm: 12.50 },
  { region: 'Western Europe', cpm: 9.80 },
  { region: 'Nordics', cpm: 11.20 },
  { region: 'UK', cpm: 10.40 },
  { region: 'APAC', cpm: 4.20 },
  { region: 'LATAM', cpm: 2.80 },
];

const ctrByFormat = [
  { format: 'Native Overlay', ctr: 3.2, engagement: 4.8 },
  { format: 'Pre-roll Video', ctr: 0.8, engagement: 1.2 },
  { format: 'Mid-roll Video', ctr: 1.1, engagement: 1.5 },
  { format: 'Chatbot Integration', ctr: 4.5, engagement: 6.2 },
  { format: 'Streamer Sponsorship', ctr: 5.8, engagement: 7.4 },
  { format: 'Banner Ads', ctr: 0.4, engagement: 0.6 },
];

const engagementByCategory = [
  { category: 'Gaming', rate: 4.2 },
  { category: 'Just Chatting', rate: 5.1 },
  { category: 'Music', rate: 3.8 },
  { category: 'Sports', rate: 4.5 },
  { category: 'Creative', rate: 3.2 },
];

const roiComparison = [
  { platform: 'Twitch Native', roi: 380 },
  { platform: 'YouTube Pre-roll', roi: 220 },
  { platform: 'Instagram Reels', roi: 280 },
  { platform: 'TikTok', roi: 310 },
  { platform: 'Facebook Video', roi: 180 },
];

const industryPerformance = [
  { name: 'Gaming/Tech', value: 32 },
  { name: 'Food/Beverage', value: 22 },
  { name: 'Fashion', value: 18 },
  { name: 'Finance', value: 15 },
  { name: 'Entertainment', value: 13 },
];

const COLORS = ['hsl(var(--primary))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

interface AnimatedStatCardProps {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

const AnimatedStatCard = ({ value, label, suffix = '', prefix = '', decimals = 0 }: AnimatedStatCardProps) => {
  const [ref, isVisible] = useInView({ threshold: 0.3 });
  const { displayValue } = useCountUp(value, isVisible, { duration: 2000, decimals });
  
  return (
    <div ref={ref} className="bg-card/50 border border-border/30 rounded-xl p-6 text-center">
      <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
        {prefix}{displayValue}{suffix}
      </div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
};

export default function AdvertisingBenchmarksDashboard() {
  return (
    <div className="space-y-12">
      {/* Overview Stats */}
      <section id="overview">
        <h2 className="text-2xl font-bold text-foreground mb-6">Twitch Advertising Benchmarks 2025</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatedStatCard value={10.5} label="Avg CPM (Global)" prefix="$" decimals={1} />
          <AnimatedStatCard value={3.2} label="Avg CTR (Native)" suffix="%" decimals={1} />
          <AnimatedStatCard value={4.7} label="Avg Engagement Rate" suffix="%" decimals={1} />
          <AnimatedStatCard value={380} label="Avg ROI (Native)" suffix="%" />
        </div>
      </section>

      {/* CPM by Region */}
      <section id="cpm">
        <h2 className="text-2xl font-bold text-foreground mb-6">Average CPM by Region</h2>
        <div className="bg-card/30 border border-border/30 rounded-xl p-6">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cpmByRegion} layout="vertical">
                <XAxis type="number" tickFormatter={(v) => `$${v}`} stroke="hsl(var(--muted-foreground))" />
                <YAxis type="category" dataKey="region" width={120} stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  formatter={(value) => [`$${value}`, 'CPM']}
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                />
                <Bar dataKey="cpm" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-muted-foreground mt-4 text-center">
            Nordic markets command premium CPMs due to high purchasing power and engaged audiences.
          </p>
        </div>
      </section>

      {/* CTR by Format */}
      <section id="ctr">
        <h2 className="text-2xl font-bold text-foreground mb-6">CTR & Engagement by Ad Format</h2>
        <div className="bg-card/30 border border-border/30 rounded-xl p-6">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ctrByFormat}>
                <XAxis dataKey="format" stroke="hsl(var(--muted-foreground))" angle={-45} textAnchor="end" height={80} />
                <YAxis tickFormatter={(v) => `${v}%`} stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  formatter={(value) => [`${value}%`, '']}
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                />
                <Bar dataKey="ctr" name="CTR" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="engagement" name="Engagement" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-6 justify-center mt-4">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-muted-foreground">Click-Through Rate</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'hsl(var(--chart-2))' }} />
              <span className="text-muted-foreground">Engagement Rate</span>
            </div>
          </div>
        </div>
      </section>

      {/* Engagement by Category */}
      <section id="engagement">
        <h2 className="text-2xl font-bold text-foreground mb-6">Engagement Rate by Content Category</h2>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-card/30 border border-border/30 rounded-xl p-6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={engagementByCategory} layout="vertical">
                  <XAxis type="number" tickFormatter={(v) => `${v}%`} stroke="hsl(var(--muted-foreground))" />
                  <YAxis type="category" dataKey="category" width={100} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Engagement']}
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                  />
                  <Bar dataKey="rate" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-card/30 border border-border/30 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Best Performing Industries</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={industryPerformance}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${value}%`}
                  >
                    {industryPerformance.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-2 mt-2 justify-center">
              {industryPerformance.map((item, i) => (
                <div key={item.name} className="flex items-center gap-1 text-xs">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ROI Comparison */}
      <section id="roi">
        <h2 className="text-2xl font-bold text-foreground mb-6">ROI Comparison: Twitch vs Other Platforms</h2>
        <div className="bg-card/30 border border-border/30 rounded-xl p-6">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={roiComparison}>
                <XAxis dataKey="platform" stroke="hsl(var(--muted-foreground))" />
                <YAxis tickFormatter={(v) => `${v}%`} stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'ROI']}
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                />
                <Bar dataKey="roi" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]}>
                  {roiComparison.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.platform === 'Twitch Native' ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground) / 0.5)'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-muted-foreground mt-4 text-center">
            Twitch native advertising delivers 72% higher ROI than the next best platform (TikTok).
          </p>
        </div>
      </section>

      {/* Data Source */}
      <div className="text-center text-xs text-muted-foreground pt-8 border-t border-border/30">
        Data compiled from Beta Ads internal analytics, IAB reports, and industry benchmarks. 2024-2025.
      </div>
    </div>
  );
}
