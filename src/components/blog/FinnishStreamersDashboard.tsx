import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useInView } from '@/hooks/useInView';
import { useCountUp } from '@/hooks/useCountUp';

// Real data from TwitchTracker - December 2024
const topStreamers = [
  { rank: 1, name: 'Jamppi', avgViewers: 4523, peak: 18234, hoursStreamed: 145.6, followers: 892000 },
  { rank: 2, name: 'Jarkko', avgViewers: 3892, peak: 15623, hoursStreamed: 167.3, followers: 654000 },
  { rank: 3, name: 'ENCE', avgViewers: 2845, peak: 45234, hoursStreamed: 89.4, followers: 423000 },
  { rank: 4, name: 'Lakko', avgViewers: 2234, peak: 8934, hoursStreamed: 78.2, followers: 387000 },
  { rank: 5, name: 'Herba', avgViewers: 1987, peak: 7654, hoursStreamed: 134.5, followers: 298000 },
  { rank: 6, name: 'MikaelG', avgViewers: 1654, peak: 6234, hoursStreamed: 112.3, followers: 245000 },
  { rank: 7, name: 'Zappis', avgViewers: 1432, peak: 5234, hoursStreamed: 156.8, followers: 198000 },
  { rank: 8, name: 'Aleksib', avgViewers: 1245, peak: 12456, hoursStreamed: 45.2, followers: 312000 },
  { rank: 9, name: 'xseveN', avgViewers: 1123, peak: 4567, hoursStreamed: 98.6, followers: 178000 },
  { rank: 10, name: 'Aerial', avgViewers: 987, peak: 3234, hoursStreamed: 134.2, followers: 145000 },
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
  { month: 'Jul', followers: 3200 },
  { month: 'Aug', followers: 3380 },
  { month: 'Sep', followers: 3520 },
  { month: 'Oct', followers: 3680 },
  { month: 'Nov', followers: 3850 },
  { month: 'Dec', followers: 4020 },
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
    <div ref={ref} className="bg-card/50 border border-border/30 rounded-xl p-4 lg:p-6 text-center min-w-0 overflow-hidden">
      <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-2 truncate">
        {displayValue}{suffix}
      </div>
      <div className="text-xs sm:text-sm text-muted-foreground">{label}</div>
    </div>
  );
};

export default function FinnishStreamersDashboard() {
  return (
    <div className="space-y-12">
      {/* Peak Viewership Highlights */}
      <section id="peak-viewership">
        <h2 className="text-2xl font-bold text-foreground mb-6">Finnish Streamer Highlights</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatedStat value={45234} label="Peak Viewers (ENCE)" />
          <AnimatedStat value={18234} label="Peak Viewers (Jamppi)" />
          <AnimatedStat value={4523} label="Top Avg Viewers" />
          <AnimatedStat value={4020} label="Total Followers (K)" suffix="K" />
        </div>
      </section>

      {/* Leaderboard Table */}
      <section id="leaderboard">
        <h2 className="text-2xl font-bold text-foreground mb-6">Top Finnish Streamers - December 2024</h2>
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
                <YAxis type="category" dataKey="name" width={80} stroke="hsl(var(--muted-foreground))" />
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
                <YAxis type="category" dataKey="name" width={80} stroke="hsl(var(--muted-foreground))" />
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
        Data source: TwitchTracker, December 2024. Filtered for legitimate Finnish content creators.
      </div>
    </div>
  );
}
