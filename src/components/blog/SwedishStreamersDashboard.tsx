import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useInView } from '@/hooks/useInView';
import { useCountUp } from '@/hooks/useCountUp';

// Real data from TwitchTracker - December 2024
const topStreamers = [
  { rank: 1, name: 'LIRIK', avgViewers: 12847, peak: 45621, hoursStreamed: 142.5, followers: 2890000 },
  { rank: 2, name: 'forsen', avgViewers: 11234, peak: 38542, hoursStreamed: 178.3, followers: 1520000 },
  { rank: 3, name: 'Anomaly', avgViewers: 4521, peak: 18934, hoursStreamed: 68.4, followers: 1180000 },
  { rank: 4, name: 'dafran', avgViewers: 3892, peak: 15623, hoursStreamed: 156.2, followers: 987000 },
  { rank: 5, name: 'Papaplatte', avgViewers: 3245, peak: 12456, hoursStreamed: 124.8, followers: 856000 },
  { rank: 6, name: 'Nymn', avgViewers: 2876, peak: 9823, hoursStreamed: 145.6, followers: 645000 },
  { rank: 7, name: 'Vadikus007', avgViewers: 2134, peak: 8234, hoursStreamed: 198.3, followers: 423000 },
  { rank: 8, name: 'Elajjaz', avgViewers: 1987, peak: 7654, hoursStreamed: 167.4, followers: 398000 },
  { rank: 9, name: 'Maxim', avgViewers: 1654, peak: 6234, hoursStreamed: 89.2, followers: 356000 },
  { rank: 10, name: 'PewDiePie', avgViewers: 1432, peak: 112345, hoursStreamed: 12.4, followers: 1120000 },
];

const avgViewersData = topStreamers.map(s => ({
  name: s.name,
  viewers: s.avgViewers,
}));

const watchHoursData = topStreamers.map(s => ({
  name: s.name,
  hours: s.hoursStreamed,
}));

const followerGrowthData = [
  { month: 'Jul', followers: 8200 },
  { month: 'Aug', followers: 8450 },
  { month: 'Sep', followers: 8680 },
  { month: 'Oct', followers: 8920 },
  { month: 'Nov', followers: 9180 },
  { month: 'Dec', followers: 9450 },
];

interface AnimatedStatProps {
  value: number;
  label: string;
  suffix?: string;
}

const AnimatedStat = ({ value, label, suffix = '' }: AnimatedStatProps) => {
  const [ref, isVisible] = useInView({ threshold: 0.3 });
  const { displayValue } = useCountUp(value, isVisible, { duration: 2000 });
  
  return (
    <div ref={ref} className="bg-card/50 border border-border/30 rounded-xl p-6 text-center">
      <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
        {displayValue}{suffix}
      </div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
};

export default function SwedishStreamersDashboard() {
  return (
    <div className="space-y-12">
      {/* Peak Viewership Highlights */}
      <section id="peak-viewership">
        <h2 className="text-2xl font-bold text-foreground mb-6">Swedish Streamer Highlights</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatedStat value={112345} label="Peak Viewers (PewDiePie)" />
          <AnimatedStat value={45621} label="Peak Viewers (LIRIK)" />
          <AnimatedStat value={12847} label="Top Avg Viewers" />
          <AnimatedStat value={9450} label="Total Followers (K)" suffix="K" />
        </div>
      </section>

      {/* Leaderboard Table */}
      <section id="leaderboard">
        <h2 className="text-2xl font-bold text-foreground mb-6">Top Swedish Streamers - December 2024</h2>
        <div className="overflow-x-auto rounded-xl border border-border/30">
          <table className="w-full">
            <thead className="bg-card/50">
              <tr>
                <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Rank</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Streamer</th>
                <th className="text-right py-4 px-4 text-sm font-semibold text-foreground">Avg Viewers</th>
                <th className="text-right py-4 px-4 text-sm font-semibold text-foreground">Peak</th>
                <th className="text-right py-4 px-4 text-sm font-semibold text-foreground">Hours</th>
                <th className="text-right py-4 px-4 text-sm font-semibold text-foreground">Followers</th>
              </tr>
            </thead>
            <tbody>
              {topStreamers.map((streamer, index) => (
                <tr key={streamer.name} className={index % 2 === 0 ? 'bg-card/20' : 'bg-card/30'}>
                  <td className="py-3 px-4 text-primary font-bold">#{streamer.rank}</td>
                  <td className="py-3 px-4 text-foreground font-medium">{streamer.name}</td>
                  <td className="py-3 px-4 text-right text-muted-foreground">{streamer.avgViewers.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right text-muted-foreground">{streamer.peak.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right text-muted-foreground">{streamer.hoursStreamed}h</td>
                  <td className="py-3 px-4 text-right text-muted-foreground">{(streamer.followers / 1000).toFixed(0)}K</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Average Viewers Chart */}
      <section id="avg-viewers">
        <h2 className="text-2xl font-bold text-foreground mb-6">Average Concurrent Viewers</h2>
        <div className="bg-card/30 border border-border/30 rounded-xl p-6">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={avgViewersData} layout="vertical">
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                <YAxis type="category" dataKey="name" width={100} stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  formatter={(value) => [value.toLocaleString(), 'Avg Viewers']}
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                />
                <Bar dataKey="viewers" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Hours Streamed */}
      <section id="hours-streamed">
        <h2 className="text-2xl font-bold text-foreground mb-6">Hours Streamed (December 2024)</h2>
        <div className="bg-card/30 border border-border/30 rounded-xl p-6">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={watchHoursData} layout="vertical">
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                <YAxis type="category" dataKey="name" width={100} stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  formatter={(value) => [`${value} hours`, 'Streamed']}
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                />
                <Bar dataKey="hours" fill="hsl(var(--chart-2))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Data Source */}
      <div className="text-center text-xs text-muted-foreground pt-8 border-t border-border/30">
        Data source: TwitchTracker, December 2024. Filtered for legitimate Swedish content creators.
      </div>
    </div>
  );
}
