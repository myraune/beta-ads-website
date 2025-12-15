import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const topStreamers = [
  { rank: 1, name: 'Komplettno', avgViewers: 1247, peakViewers: 2017, hoursStreamed: 2840, followers: 89400 },
  { rank: 2, name: 'DennisVareide', avgViewers: 892, peakViewers: 1856, hoursStreamed: 1920, followers: 156200 },
  { rank: 3, name: 'detoo', avgViewers: 756, peakViewers: 1372, hoursStreamed: 2150, followers: 78300 },
  { rank: 4, name: 'Emzia', avgViewers: 623, peakViewers: 1245, hoursStreamed: 1680, followers: 124500 },
  { rank: 5, name: 'skiben', avgViewers: 589, peakViewers: 7418, hoursStreamed: 890, followers: 67800 },
  { rank: 6, name: 'Pernataia', avgViewers: 534, peakViewers: 1102, hoursStreamed: 2340, followers: 95600 },
  { rank: 7, name: 'Aienia', avgViewers: 487, peakViewers: 978, hoursStreamed: 1560, followers: 82100 },
  { rank: 8, name: 'Emmelie', avgViewers: 445, peakViewers: 892, hoursStreamed: 1890, followers: 71200 },
  { rank: 9, name: 'Rubius_NO', avgViewers: 398, peakViewers: 834, hoursStreamed: 1240, followers: 45600 },
  { rank: 10, name: 'NorwayGaming', avgViewers: 356, peakViewers: 756, hoursStreamed: 2120, followers: 38900 },
];

const avgViewersData = topStreamers.slice(0, 8).map(s => ({
  name: s.name,
  viewers: s.avgViewers
}));

const watchHoursData = topStreamers.slice(0, 8).map(s => ({
  name: s.name,
  hours: s.hoursStreamed
}));

const followerGrowthData = [
  { month: 'Jan', Komplettno: 78, DennisVareide: 142, detoo: 65, Emzia: 108 },
  { month: 'Feb', Komplettno: 80, DennisVareide: 145, detoo: 68, Emzia: 112 },
  { month: 'Mar', Komplettno: 82, DennisVareide: 148, detoo: 70, Emzia: 115 },
  { month: 'Apr', Komplettno: 84, DennisVareide: 150, detoo: 72, Emzia: 118 },
  { month: 'May', Komplettno: 86, DennisVareide: 152, detoo: 74, Emzia: 120 },
  { month: 'Jun', Komplettno: 89, DennisVareide: 156, detoo: 78, Emzia: 124 },
];

const StatHighlight = ({ value, label, highlight = false }: { value: string; label: string; highlight?: boolean }) => (
  <div className={`rounded-xl p-5 text-center ${highlight ? 'bg-primary/20 border border-primary/40' : 'bg-card/50 border border-border/30'}`}>
    <div className={`text-2xl lg:text-3xl font-bold mb-1 ${highlight ? 'text-primary' : 'text-foreground'}`}>{value}</div>
    <div className="text-sm text-muted-foreground">{label}</div>
  </div>
);

const NorwegianStreamersDashboard = () => {
  return (
    <div className="space-y-12">
      {/* Peak Viewership Highlights */}
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-6">Peak Viewership Records</h3>
        <div className="grid grid-cols-3 gap-4">
          <StatHighlight value="7,418" label="skiben (Peak)" highlight />
          <StatHighlight value="2,017" label="Komplettno (Peak)" />
          <StatHighlight value="1,856" label="DennisVareide (Peak)" />
        </div>
      </div>

      {/* Leaderboard Table */}
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-6">Top Norwegian Streamers Leaderboard</h3>
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
                    <td className="p-4 text-right text-muted-foreground">{streamer.hoursStreamed.toLocaleString()}</td>
                    <td className="p-4 text-right text-muted-foreground">{streamer.followers.toLocaleString()}</td>
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
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis type="number" stroke="#888" />
              <YAxis dataKey="name" type="category" stroke="#888" width={100} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #333', borderRadius: '8px' }}
                formatter={(value: number) => [value.toLocaleString(), 'Avg Viewers']}
              />
              <Bar dataKey="viewers" fill="#9147ff" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Watch Hours Distribution */}
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-6">Hours Streamed (2024)</h3>
        <div className="bg-card/30 border border-border/30 rounded-xl p-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={watchHoursData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis type="number" stroke="#888" />
              <YAxis dataKey="name" type="category" stroke="#888" width={100} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #333', borderRadius: '8px' }}
                formatter={(value: number) => [`${value.toLocaleString()} hrs`, 'Streamed']}
              />
              <Bar dataKey="hours" fill="#e91916" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Follower Growth Trend */}
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-6">Follower Growth Trend (Thousands)</h3>
        <div className="bg-card/30 border border-border/30 rounded-xl p-6">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={followerGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="month" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #333', borderRadius: '8px' }}
                formatter={(value: number) => [`${value}K`, 'Followers']}
              />
              <Line type="monotone" dataKey="Komplettno" stroke="#9147ff" strokeWidth={2} dot={{ fill: '#9147ff' }} />
              <Line type="monotone" dataKey="DennisVareide" stroke="#e91916" strokeWidth={2} dot={{ fill: '#e91916' }} />
              <Line type="monotone" dataKey="detoo" stroke="#00d4aa" strokeWidth={2} dot={{ fill: '#00d4aa' }} />
              <Line type="monotone" dataKey="Emzia" stroke="#f0b429" strokeWidth={2} dot={{ fill: '#f0b429' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sources */}
      <div className="text-xs text-muted-foreground border-t border-border/30 pt-6">
        <p className="font-medium mb-2">Data Sources:</p>
        <p>TwitchTracker, Statista, SullyGnome (2024-2025)</p>
      </div>
    </div>
  );
};

export default NorwegianStreamersDashboard;
