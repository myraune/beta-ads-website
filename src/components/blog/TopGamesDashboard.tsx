import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { StatCard, StatCardGrid } from './StatCard';

// StreamHatchet 2025 data
const topGamesData = [
  { name: 'League of Legends', hours: 1950, change: '+4%' },
  { name: 'GTA V', hours: 1900, change: '-5%' },
  { name: 'Counter-Strike', hours: 1280, change: '+29%' },
  { name: 'VALORANT', hours: 939, change: '-14%' },
  { name: 'Minecraft', hours: 850, change: '+10%' },
  { name: 'Dota 2', hours: 743, change: '-15%' },
  { name: 'Fortnite', hours: 691, change: '-7%' },
  { name: 'Mobile Legends', hours: 524, change: '+4%' },
  { name: 'Roblox', hours: 515, change: '+212%' },
  { name: 'Garena Free Fire', hours: 461, change: '-' },
];

const genreData = [
  { name: 'FPS', hours: 4600, change: '+6.7%' },
  { name: 'Action-Adventure', hours: 2800, change: '+3%' },
  { name: 'MOBA', hours: 2700, change: '+1%' },
  { name: 'Battle Royale', hours: 1800, change: '-5%' },
];

const contentSplitData = [
  { name: 'Gaming', value: 78, color: 'hsl(var(--primary))' },
  { name: 'Non-Gaming', value: 22, color: 'hsl(var(--accent))' },
];

const yearlyHoursData = [
  { year: '2020', hours: 18.4 },
  { year: '2021', hours: 24.3 },
  { year: '2022', hours: 22.8 },
  { year: '2023', hours: 21.0 },
  { year: '2024', hours: 21.1 },
  { year: '2025', hours: 19.2 },
];

const newReleasesData = [
  { name: 'ARC Raiders', hours: 129 },
  { name: 'Escape From Tarkov', hours: 104 },
  { name: 'Monster Hunter Wilds', hours: 74 },
];

const TopGamesDashboard = () => {
  return (
    <div className="space-y-12">
      {/* Key Stats - StreamHatchet 2025 */}
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-6">Platform Overview (StreamHatchet 2025)</h3>
        <StatCardGrid>
          <StatCard value={19.2} suffix="B" label="Twitch Hours Watched" decimals={1} trend="-8.9% YoY" format="raw" />
          <StatCard value={1.95} suffix="B" label="LoL Hours (Top Game)" decimals={2} trend="+4%" format="raw" />
          <StatCard value={4.6} suffix="B" label="FPS Genre Hours" decimals={1} trend="+6.7%" format="raw" />
          <StatCard value={212} suffix="%" label="Roblox Growth" trend="Breakout Star" format="raw" />
        </StatCardGrid>
      </div>

      {/* Top Games Ranking */}
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-6">Top 10 Games by Hours Watched (Millions)</h3>
        <div className="bg-card/30 border border-border/30 rounded-xl p-6">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={topGamesData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
              <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" width={120} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
                formatter={(value: number, name: string, props: any) => [`${value}M hours (${props.payload.change})`, 'Watched']}
              />
              <Bar dataKey="hours" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} isAnimationActive={false} />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Roblox was the breakout story with +212% growth, driven by "Grow A Garden" (113.7M hours)
          </p>
        </div>
      </div>

      {/* Genre Breakdown */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-6">Genre Hours Watched (Billions)</h3>
          <div className="bg-card/30 border border-border/30 rounded-xl p-6">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={genreData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
                  formatter={(value: number, name: string, props: any) => [`${(value/1000).toFixed(1)}B hours (${props.payload.change})`, 'Watched']}
                />
                <Bar dataKey="hours" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} isAnimationActive={false} />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-center text-sm text-muted-foreground mt-4">
              FPS genre leads with 4.6B hours (+6.7% YoY)
            </p>
          </div>
        </div>

        {/* Content Split */}
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-6">Gaming vs Non-Gaming Split</h3>
          <div className="bg-card/30 border border-border/30 rounded-xl p-6">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={contentSplitData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                  isAnimationActive={false}
                >
                  {contentSplitData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <p className="text-center text-sm text-muted-foreground mt-4">
              Non-gaming grew to 22%, up from 20% in 2024
            </p>
          </div>
        </div>
      </div>

      {/* Yearly Hours Trend */}
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-6">Twitch Hours Watched by Year (Billions)</h3>
        <div className="bg-card/30 border border-border/30 rounded-xl p-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={yearlyHoursData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
                formatter={(value: number) => [`${value}B hours`, 'Watched']}
              />
              <Bar dataKey="hours" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} isAnimationActive={false} />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-center text-sm text-muted-foreground mt-4">
            2021 peak driven by pandemic; 2025 decline due to viewbotting crackdown
          </p>
        </div>
      </div>

      {/* Top New Releases */}
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-6">Top New Game Releases 2025 (Millions of Hours)</h3>
        <div className="bg-card/30 border border-border/30 rounded-xl p-6">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={newReleasesData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
              <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" width={150} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
                formatter={(value: number) => [`${value}M hours`, 'Watched']}
              />
              <Bar dataKey="hours" fill="hsl(var(--accent))" radius={[0, 4, 4, 0]} isAnimationActive={false} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sources */}
      <div className="text-xs text-muted-foreground border-t border-border/30 pt-6">
        <p className="font-medium mb-2">Data Source:</p>
        <p>StreamHatchet 2025 Yearly Live Streaming Trends Report</p>
      </div>
    </div>
  );
};

export default TopGamesDashboard;
