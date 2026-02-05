import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';
import { StatCard, StatCardGrid } from './StatCard';

// Real December 2025 data from TwitchTracker (filtered for legitimate streamers)
const topStreamers = [
  { rank: 1, name: 'Komplettno', avgViewers: 2664, peakViewers: 6942, hoursStreamed: 12.9, followers: 71800 },
  { rank: 2, name: 'DennisVareide', avgViewers: 571, peakViewers: 2303, hoursStreamed: 66.3, followers: 56400 },
  { rank: 3, name: 'LevelUpNor', avgViewers: 396, peakViewers: 1531, hoursStreamed: 36.4, followers: 13400 },
  { rank: 4, name: 'detoo', avgViewers: 346, peakViewers: 2471, hoursStreamed: 145.8, followers: 73600 },
  { rank: 5, name: 'thomasPASTE', avgViewers: 221, peakViewers: 1284, hoursStreamed: 49.8, followers: 51700 },
  { rank: 6, name: 'Klokkismann', avgViewers: 210, peakViewers: 1158, hoursStreamed: 45.5, followers: 15300 },
  { rank: 7, name: 'Jonieboi', avgViewers: 205, peakViewers: 2595, hoursStreamed: 30.2, followers: 22600 },
  { rank: 8, name: 'sanderdale', avgViewers: 203, peakViewers: 1497, hoursStreamed: 10.9, followers: 21300 },
  { rank: 9, name: 'TobyTwoFaced', avgViewers: 193, peakViewers: 3443, hoursStreamed: 280.5, followers: 19800 },
  { rank: 10, name: 'PondernStream', avgViewers: 192, peakViewers: 854, hoursStreamed: 38.9, followers: 51100 },
  { rank: 11, name: 'POWER_no', avgViewers: 190, peakViewers: 1396, hoursStreamed: 38.3, followers: 6000 },
  { rank: 12, name: 'Emzia', avgViewers: 170, peakViewers: 21141, hoursStreamed: 84.5, followers: 97300 },
  { rank: 13, name: 'VeigarV2', avgViewers: 160, peakViewers: 2758, hoursStreamed: 144.3, followers: 67000 },
  { rank: 14, name: 'Elkjop_Gaming', avgViewers: 158, peakViewers: 1596, hoursStreamed: 9.8, followers: 6200 },
  { rank: 15, name: 'Ailincia', avgViewers: 128, peakViewers: 3893, hoursStreamed: 71.9, followers: 70600 },
];

const avgViewersData = topStreamers.slice(0, 10).map(s => ({
  name: s.name,
  viewers: s.avgViewers
}));

const watchHoursData = topStreamers.slice(0, 10).map(s => ({
  name: s.name,
  hours: s.hoursStreamed
}));

const followerGrowthData = [
  { month: 'Jul', followers: 45000 },
  { month: 'Aug', followers: 52000 },
  { month: 'Sep', followers: 58000 },
  { month: 'Oct', followers: 63000 },
  { month: 'Nov', followers: 68000 },
  { month: 'Dec', followers: 71800 },
];

const NorwegianStreamersDashboard = () => {
  return (
    <div className="space-y-12">
      {/* Peak Viewership Highlights */}
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-6">Peak Viewership Records (Dec 2025)</h3>
        <StatCardGrid columns={3}>
          <StatCard value={21141} label="Emzia (Peak)" highlight />
          <StatCard value={6942} label="Komplettno (Peak)" />
          <StatCard value={3893} label="Ailincia (Peak)" />
        </StatCardGrid>
      </div>

      {/* Leaderboard Table */}
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-6">Top Norwegian Streamers - December 2025</h3>
        <div className="bg-card/30 border border-border/30 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/30 bg-card/50">
                  <th className="text-left p-4 font-medium text-muted-foreground">#</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Streamer</th>
                  <th className="text-right p-4 font-medium text-muted-foreground">Avg Viewers</th>
                  <th className="text-right p-4 font-medium text-muted-foreground">Peak</th>
                  <th className="text-right p-4 font-medium text-muted-foreground">Hours</th>
                  <th className="text-right p-4 font-medium text-muted-foreground">Followers</th>
                </tr>
              </thead>
              <tbody>
                {topStreamers.map((streamer, index) => (
                  <tr key={streamer.name} className={`border-b border-border/20 ${index % 2 === 0 ? 'bg-card/20' : ''}`}>
                    <td className="p-4 text-primary font-bold">{streamer.rank}</td>
                    <td className="p-4 font-medium text-foreground">{streamer.name}</td>
                    <td className="p-4 text-right text-foreground">{streamer.avgViewers.toLocaleString()}</td>
                    <td className="p-4 text-right text-muted-foreground">{streamer.peakViewers.toLocaleString()}</td>
                    <td className="p-4 text-right text-muted-foreground">{streamer.hoursStreamed}h</td>
                    <td className="p-4 text-right text-muted-foreground">{(streamer.followers / 1000).toFixed(1)}K</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Average Viewers Bar Chart */}
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-6">Average Concurrent Viewers</h3>
        <div className="bg-card/30 border border-border/30 rounded-xl p-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={avgViewersData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
              <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" width={100} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
                formatter={(value: number) => [value.toLocaleString(), 'Avg Viewers']}
              />
              <Bar dataKey="viewers" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Watch Hours Distribution */}
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-6">Hours Streamed (December 2025)</h3>
        <div className="bg-card/30 border border-border/30 rounded-xl p-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={watchHoursData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
              <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" width={100} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
                formatter={(value: number) => [`${value}h`, 'Streamed']}
              />
              <Bar dataKey="hours" fill="hsl(var(--accent))" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Follower Growth Trend */}
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-6">Komplettno Follower Growth (H2 2025)</h3>
        <div className="bg-card/30 border border-border/30 rounded-xl p-6">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={followerGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
                formatter={(value: number) => [`${(value / 1000).toFixed(1)}K`, 'Followers']}
              />
              <Legend />
              <Line type="monotone" dataKey="followers" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: 'hsl(var(--primary))' }} name="Followers" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sources */}
      <div className="text-xs text-muted-foreground border-t border-border/30 pt-6">
        <p className="font-medium mb-2">Data Sources:</p>
        <p>TwitchTracker (December 2025) • Filtered for legitimate content creators</p>
      </div>
    </div>
  );
};

export default NorwegianStreamersDashboard;
