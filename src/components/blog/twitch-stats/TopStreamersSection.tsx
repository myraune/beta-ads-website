import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const topStreamersData = [
  { name: 'KaiCenat', hoursWatched: 317, platform: 'Twitch', category: 'Just Chatting' },
  { name: 'Jynxzi', hoursWatched: 212, platform: 'Twitch', category: 'Rainbow Six Siege' },
  { name: 'ibai', hoursWatched: 186, platform: 'Twitch', category: 'Just Chatting' },
  { name: 'Gaules', hoursWatched: 178, platform: 'Twitch', category: 'Counter-Strike 2' },
  { name: 'xQc', hoursWatched: 152, platform: 'Kick/Twitch', category: 'Just Chatting' },
  { name: 'Ironmouse', hoursWatched: 141, platform: 'Twitch', category: 'VTuber' },
  { name: 'Cellbit', hoursWatched: 134, platform: 'Twitch', category: 'Variety' },
  { name: 'Caedrel', hoursWatched: 128, platform: 'Twitch', category: 'League of Legends' },
  { name: 'Squeezie', hoursWatched: 119, platform: 'Twitch', category: 'Variety' },
  { name: 'Rubius', hoursWatched: 112, platform: 'Twitch', category: 'Variety' },
];

const chartData = topStreamersData.slice(0, 8).map(s => ({
  name: s.name,
  hours: s.hoursWatched,
}));

const TopStreamersSection = () => (
  <div className="space-y-6">
    <h3 className="text-xl font-semibold text-foreground">Most Watched Streamers 2025 (Million Hours)</h3>
    
    <div className="bg-card/30 border border-border/30 rounded-xl p-6">
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={chartData} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis type="number" stroke="hsl(var(--muted-foreground))" unit="M" />
          <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" width={90} />
          <Tooltip 
            contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
            formatter={(value: number) => [`${value}M hours`, 'Watched']}
          />
          <Bar dataKey="hours" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} isAnimationActive={false} />
        </BarChart>
      </ResponsiveContainer>
    </div>

    <div className="bg-card/30 border border-border/30 rounded-xl overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Rank</TableHead>
            <TableHead>Streamer</TableHead>
            <TableHead>Hours Watched</TableHead>
            <TableHead className="hidden sm:table-cell">Platform</TableHead>
            <TableHead className="hidden md:table-cell">Primary Category</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {topStreamersData.map((s, i) => (
            <TableRow key={s.name}>
              <TableCell className="font-medium">#{i + 1}</TableCell>
              <TableCell className="font-semibold text-foreground">{s.name}</TableCell>
              <TableCell>{s.hoursWatched}M</TableCell>
              <TableCell className="hidden sm:table-cell text-muted-foreground">{s.platform}</TableCell>
              <TableCell className="hidden md:table-cell text-muted-foreground">{s.category}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    <p className="text-xs text-muted-foreground">KaiCenat's 317M hours made him the #1 most watched streamer globally for the second consecutive year</p>
  </div>
);

export default TopStreamersSection;
