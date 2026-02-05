import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, PieChart, Pie, Cell } from 'recharts';
import { useInView } from '@/hooks/useInView';
import { useCountUp } from '@/hooks/useCountUp';

// StreamHatchet 2025 data
const marketShareData = [
  { name: 'Twitch', value: 52.8, color: 'hsl(var(--primary))' },
  { name: 'YouTube Gaming', value: 24.3, color: 'hsl(var(--chart-2))' },
  { name: 'Kick', value: 12.4, color: 'hsl(var(--accent))' },
  { name: 'Others', value: 10.5, color: 'hsl(var(--muted-foreground))' },
];

const hoursWatchedData = [
  { platform: 'Twitch', hours: 19.2, change: '-8.9%' },
  { platform: 'YouTube Gaming', hours: 8.8, change: '+12%' },
  { platform: 'Kick', hours: 4.5, change: '+131%' },
];

const genreByPlatform = [
  { genre: 'FPS', twitch: 23, youtube: 17, kick: 11 },
  { genre: 'MOBA', twitch: 20, youtube: 10, kick: 5 },
  { genre: 'Action-Adventure', twitch: 15, youtube: 15, kick: 15 },
  { genre: 'Battle Royale', twitch: 10, youtube: 14, kick: 8 },
  { genre: 'Gambling', twitch: 2, youtube: 1, kick: 11 },
];

const radarData = [
  { metric: 'Engagement', twitch: 92, youtube: 65, kick: 78 },
  { metric: 'Reach', twitch: 55, youtube: 95, kick: 35 },
  { metric: 'Growth Rate', twitch: 35, youtube: 60, kick: 95 },
  { metric: 'Creator Earnings', twitch: 70, youtube: 85, kick: 75 },
  { metric: 'Ad Effectiveness', twitch: 88, youtube: 72, kick: 65 },
  { metric: 'Young Demo', twitch: 85, youtube: 70, kick: 80 },
];

interface AnimatedStatCardProps {
  value: number;
  label: string;
  sublabel?: string;
  suffix?: string;
  decimals?: number;
  trend?: string;
}

const AnimatedStatCard = ({ value, label, sublabel, suffix = '', decimals = 0, trend }: AnimatedStatCardProps) => {
  const [ref, isVisible] = useInView<HTMLDivElement>({ threshold: 0.3 });
  const { displayValue } = useCountUp(value, isVisible, { duration: 2000, decimals });
  
  return (
    <div ref={ref} className="bg-card/50 border border-border/30 rounded-xl p-6 text-center">
      <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
        {displayValue}{suffix}
      </div>
      <div className="text-sm text-foreground font-medium">{label}</div>
      {sublabel && <div className="text-xs text-muted-foreground mt-1">{sublabel}</div>}
      {trend && <div className="text-xs text-accent mt-1">{trend}</div>}
    </div>
  );
};

export default function PlatformComparisonDashboard() {
  return (
    <div className="space-y-12">
      {/* Overview Stats - StreamHatchet 2025 */}
      <section id="overview">
        <h2 className="text-2xl font-bold text-foreground mb-6">Platform Overview (StreamHatchet 2025)</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatedStatCard value={36.4} label="Total Industry" suffix="B hrs" decimals={1} trend="+6% YoY" />
          <AnimatedStatCard value={19.2} label="Twitch" suffix="B hrs" decimals={1} trend="-8.9% YoY" />
          <AnimatedStatCard value={8.8} label="YouTube Gaming" suffix="B hrs" decimals={1} trend="+12% YoY" />
          <AnimatedStatCard value={4.5} label="Kick" suffix="B hrs" decimals={1} trend="+131% YoY" />
        </div>
      </section>

      {/* Market Share Pie Chart */}
      <section id="market-share">
        <h2 className="text-2xl font-bold text-foreground mb-6">Market Share 2025</h2>
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-card/30 border border-border/30 rounded-xl p-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={marketShareData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {marketShareData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-card/30 border border-border/30 rounded-xl p-6 flex flex-col justify-center">
            <h3 className="text-lg font-semibold text-foreground mb-4">Key Trends</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary" />
                <span><strong>Twitch:</strong> 52.8% share, down -8.3 pts due to viewbotting cleanup</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: 'hsl(var(--chart-2))' }} />
                <span><strong>YouTube Gaming:</strong> Record year with +12% growth, +54% channels</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-accent" />
                <span><strong>Kick:</strong> Breakout with +131%, first to 1B quarterly hours</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Hours Watched Comparison */}
      <section id="hours">
        <h2 className="text-2xl font-bold text-foreground mb-6">Hours Watched by Platform (Billions)</h2>
        <div className="bg-card/30 border border-border/30 rounded-xl p-6">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hoursWatchedData}>
                <XAxis dataKey="platform" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                  formatter={(value: number, name: string, props: any) => [`${value}B hours (${props.payload.change})`, 'Watched']}
                />
                <Bar dataKey="hours" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-muted-foreground mt-4 text-center">
            YouTube Gaming had its highest annual viewership ever; Kick surpassed 1B quarterly hours for the first time in Q3 2025
          </p>
        </div>
      </section>

      {/* Genre Preferences by Platform */}
      <section id="genres">
        <h2 className="text-2xl font-bold text-foreground mb-6">Genre Preferences by Platform (%)</h2>
        <div className="bg-card/30 border border-border/30 rounded-xl p-6">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={genreByPlatform}>
                <XAxis dataKey="genre" stroke="hsl(var(--muted-foreground))" />
                <YAxis tickFormatter={(v) => `${v}%`} stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  formatter={(value) => [`${value}%`, '']}
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                />
                <Bar dataKey="twitch" name="Twitch" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="youtube" name="YouTube" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="kick" name="Kick" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-6 justify-center mt-4">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-muted-foreground">Twitch</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'hsl(var(--chart-2))' }} />
              <span className="text-muted-foreground">YouTube Gaming</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-full bg-accent" />
              <span className="text-muted-foreground">Kick</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-4 text-center">
            Kick has a notable 11% share in Gambling content; Twitch leads FPS and MOBA
          </p>
        </div>
      </section>

      {/* For Advertisers Radar */}
      <section id="advertisers">
        <h2 className="text-2xl font-bold text-foreground mb-6">Platform Comparison for Advertisers</h2>
        <div className="bg-card/30 border border-border/30 rounded-xl p-6">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="metric" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                <Radar name="Twitch" dataKey="twitch" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} />
                <Radar name="YouTube" dataKey="youtube" stroke="hsl(var(--chart-2))" fill="hsl(var(--chart-2))" fillOpacity={0.3} />
                <Radar name="Kick" dataKey="kick" stroke="hsl(var(--accent))" fill="hsl(var(--accent))" fillOpacity={0.3} />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-6 justify-center mt-4">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-muted-foreground">Twitch</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'hsl(var(--chart-2))' }} />
              <span className="text-muted-foreground">YouTube Gaming</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-full bg-accent" />
              <span className="text-muted-foreground">Kick</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-card/30 border border-border/30 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-primary mb-3">Twitch</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Highest engagement rates</li>
              <li>• Best for Gen Z targeting</li>
              <li>• Native integration options</li>
              <li>• 52.8% market share</li>
            </ul>
          </div>
          <div className="bg-card/30 border border-border/30 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-3" style={{ color: 'hsl(var(--chart-2))' }}>YouTube Gaming</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Largest overall reach</li>
              <li>• Best discoverability</li>
              <li>• +71% sponsored content growth</li>
              <li>• Strong in SEA markets</li>
            </ul>
          </div>
          <div className="bg-card/30 border border-border/30 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-accent mb-3">Kick</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Fastest growth (+131%)</li>
              <li>• Lower CPMs available</li>
              <li>• Early mover advantage</li>
              <li>• Authentic creator relationships</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Data Source */}
      <div className="text-center text-xs text-muted-foreground pt-8 border-t border-border/30">
        Data source: StreamHatchet 2025 Yearly Live Streaming Trends Report
      </div>
    </div>
  );
}
