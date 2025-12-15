import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';
import { useInView } from '@/hooks/useInView';
import { useCountUp } from '@/hooks/useCountUp';

const platformMetrics = [
  { metric: 'MAU (M)', twitch: 140, youtube: 2000 },
  { metric: 'DAU (M)', twitch: 35, youtube: 122 },
  { metric: 'Avg Session (min)', twitch: 95, youtube: 29 },
  { metric: 'Hours Watched (B)', twitch: 23.2, youtube: 24.8 },
];

const creatorPayouts = [
  { year: '2022', twitch: 1.5, youtube: 4.0 },
  { year: '2023', twitch: 1.8, youtube: 4.5 },
  { year: '2024', twitch: 2.1, youtube: 5.2 },
];

const audienceComparison = [
  { age: '13-17', twitch: 21, youtube: 15 },
  { age: '18-24', twitch: 41, youtube: 23 },
  { age: '25-34', twitch: 26, youtube: 22 },
  { age: '35-44', twitch: 9, youtube: 18 },
  { age: '45+', twitch: 3, youtube: 22 },
];

const radarData = [
  { metric: 'Engagement', twitch: 92, youtube: 65 },
  { metric: 'Reach', twitch: 45, youtube: 95 },
  { metric: 'Ad Effectiveness', twitch: 88, youtube: 72 },
  { metric: 'Brand Recall', twitch: 78, youtube: 58 },
  { metric: 'Cost Efficiency', twitch: 72, youtube: 80 },
  { metric: 'Targeting', twitch: 85, youtube: 90 },
];

interface AnimatedStatCardProps {
  value: number;
  label: string;
  sublabel?: string;
  suffix?: string;
  decimals?: number;
}

const AnimatedStatCard = ({ value, label, sublabel, suffix = '', decimals = 0 }: AnimatedStatCardProps) => {
  const [ref, isVisible] = useInView({ threshold: 0.3 });
  const { displayValue } = useCountUp(value, isVisible, { duration: 2000, decimals });
  
  return (
    <div ref={ref} className="bg-card/50 border border-border/30 rounded-xl p-6 text-center">
      <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
        {displayValue}{suffix}
      </div>
      <div className="text-sm text-foreground font-medium">{label}</div>
      {sublabel && <div className="text-xs text-muted-foreground mt-1">{sublabel}</div>}
    </div>
  );
};

export default function PlatformComparisonDashboard() {
  return (
    <div className="space-y-12">
      {/* Overview Stats */}
      <section id="overview">
        <h2 className="text-2xl font-bold text-foreground mb-6">Platform Overview 2025</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatedStatCard value={140} label="Twitch MAU" suffix="M" />
          <AnimatedStatCard value={2} label="YouTube Gaming MAU" suffix="B" decimals={0} />
          <AnimatedStatCard value={95} label="Avg Twitch Session" suffix=" min" />
          <AnimatedStatCard value={29} label="Avg YouTube Session" suffix=" min" />
        </div>
      </section>

      {/* Active Users Comparison */}
      <section id="users">
        <h2 className="text-2xl font-bold text-foreground mb-6">Monthly & Daily Active Users</h2>
        <div className="bg-card/30 border border-border/30 rounded-xl p-6">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={platformMetrics.slice(0, 2)} layout="vertical">
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                <YAxis type="category" dataKey="metric" width={100} stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                />
                <Bar dataKey="twitch" name="Twitch" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                <Bar dataKey="youtube" name="YouTube Gaming" fill="hsl(var(--chart-2))" radius={[0, 4, 4, 0]} />
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
          </div>
        </div>
      </section>

      {/* Hours Watched */}
      <section id="hours">
        <h2 className="text-2xl font-bold text-foreground mb-6">Hours Watched (2024)</h2>
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-card/30 border border-border/30 rounded-xl p-8 text-center">
            <div className="text-5xl font-bold text-primary mb-2">23.2B</div>
            <div className="text-lg text-foreground">Twitch Hours Watched</div>
            <div className="text-sm text-muted-foreground mt-2">Projected annual total</div>
          </div>
          <div className="bg-card/30 border border-border/30 rounded-xl p-8 text-center">
            <div className="text-5xl font-bold" style={{ color: 'hsl(var(--chart-2))' }}>24.8B</div>
            <div className="text-lg text-foreground">YouTube Gaming Hours</div>
            <div className="text-sm text-muted-foreground mt-2">Projected annual total</div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-4 text-center">
          Despite YouTube's larger user base, Twitch has nearly equal hours watched due to longer session times.
        </p>
      </section>

      {/* Audience Demographics */}
      <section id="revenue">
        <h2 className="text-2xl font-bold text-foreground mb-6">Audience Age Distribution</h2>
        <div className="bg-card/30 border border-border/30 rounded-xl p-6">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={audienceComparison}>
                <XAxis dataKey="age" stroke="hsl(var(--muted-foreground))" />
                <YAxis tickFormatter={(v) => `${v}%`} stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  formatter={(value) => [`${value}%`, '']}
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                />
                <Bar dataKey="twitch" name="Twitch" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="youtube" name="YouTube" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-muted-foreground mt-4 text-center">
            Twitch has 62% of users under 25, making it ideal for Gen Z marketing.
          </p>
        </div>
      </section>

      {/* For Advertisers */}
      <section id="advertisers">
        <h2 className="text-2xl font-bold text-foreground mb-6">For Advertisers: Platform Comparison</h2>
        <div className="bg-card/30 border border-border/30 rounded-xl p-6">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="metric" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                <Radar name="Twitch" dataKey="twitch" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} />
                <Radar name="YouTube" dataKey="youtube" stroke="hsl(var(--chart-2))" fill="hsl(var(--chart-2))" fillOpacity={0.3} />
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
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="bg-card/30 border border-border/30 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-primary mb-3">Twitch Advantages</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Higher engagement rates (92% vs 65%)</li>
              <li>• Better brand recall (78% vs 58%)</li>
              <li>• Younger demographic concentration</li>
              <li>• Real-time interactive opportunities</li>
              <li>• Streamer-first native integrations</li>
            </ul>
          </div>
          <div className="bg-card/30 border border-border/30 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-3" style={{ color: 'hsl(var(--chart-2))' }}>YouTube Advantages</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Much larger overall reach</li>
              <li>• Better search discoverability</li>
              <li>• Broader age demographics</li>
              <li>• Advanced targeting tools</li>
              <li>• VOD and clip discoverability</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Data Source */}
      <div className="text-center text-xs text-muted-foreground pt-8 border-t border-border/30">
        Data compiled from Twitch Advertising, YouTube Analytics, Stream Hatchet, and industry reports. 2024-2025.
      </div>
    </div>
  );
}
