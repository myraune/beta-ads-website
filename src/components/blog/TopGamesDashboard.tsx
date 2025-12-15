import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';
import { useInView } from '@/hooks/useInView';
import { useCountUp } from '@/hooks/useCountUp';

const topGamesData = [
  { name: 'Just Chatting', hours: 3200 },
  { name: 'League of Legends', hours: 1670 },
  { name: 'Counter-Strike 2', hours: 1450 },
  { name: 'GTA V', hours: 1210 },
  { name: 'VALORANT', hours: 980 },
  { name: 'Minecraft', hours: 890 },
  { name: 'Fortnite', hours: 780 },
  { name: 'Dota 2', hours: 650 },
];

const categoryData = [
  { name: 'Gaming', value: 68, color: 'hsl(var(--primary))' },
  { name: 'Non-Gaming', value: 32, color: 'hsl(var(--accent))' },
];

const topStreamersData = [
  { name: 'Ninja', followers: 19.2 },
  { name: 'ibai', followers: 17.2 },
  { name: 'AuronPlay', followers: 16.7 },
  { name: 'Kai Cenat', followers: 16.2 },
  { name: 'Rubius', followers: 14.8 },
  { name: 'xQc', followers: 12.1 },
  { name: 'Tfue', followers: 11.8 },
  { name: 'shroud', followers: 10.9 },
];

const monthlyViewersData = [
  { month: 'Jan 25', viewers: 2.46 },
  { month: 'Feb 25', viewers: 2.38 },
  { month: 'Mar 25', viewers: 2.42 },
  { month: 'Apr 25', viewers: 2.35 },
  { month: 'May 25', viewers: 2.28 },
  { month: 'Jun 25', viewers: 2.22 },
  { month: 'Jul 25', viewers: 2.09 },
];

const yearlyHoursData = [
  { year: '2020', hours: 18.4 },
  { year: '2021', hours: 24.3 },
  { year: '2022', hours: 22.8 },
  { year: '2023', hours: 21.4 },
  { year: '2024', hours: 20.8 },
  { year: '2025', hours: 23.2 },
];

interface AnimatedStatCardProps {
  value: number;
  label: string;
  suffix?: string;
  decimals?: number;
}

const AnimatedStatCard = ({ value, label, suffix = '', decimals = 0 }: AnimatedStatCardProps) => {
  const [ref, isVisible] = useInView<HTMLDivElement>({ threshold: 0.3 });
  const { displayValue } = useCountUp(value, isVisible, { duration: 2000, decimals });

  return (
    <div ref={ref} className="bg-card/50 border border-border/30 rounded-xl p-6 text-center">
      <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
        {displayValue}{suffix}
      </div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
};

const TopGamesDashboard = () => {
  return (
    <div className="space-y-12">
      {/* Key Stats */}
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-6">Platform Overview (2025)</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatedStatCard value={23.2} suffix="B" label="Hours Watched" decimals={1} />
          <AnimatedStatCard value={9.2} suffix="M" label="Avg Channels Live" decimals={1} />
          <AnimatedStatCard value={105} suffix="K" label="Partner Streamers" />
          <AnimatedStatCard value={11.5} suffix="M" label="Affiliates" decimals={1} />
        </div>
      </div>

      {/* Top Games Ranking */}
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-6">Most Watched Categories (Millions of Hours)</h3>
        <div className="bg-card/30 border border-border/30 rounded-xl p-6">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={topGamesData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
              <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" width={120} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
                formatter={(value: number) => [`${value}M hours`, 'Watched']}
              />
              <Bar dataKey="hours" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gaming vs Non-Gaming */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-6">Content Category Split</h3>
          <div className="bg-card/30 border border-border/30 rounded-xl p-6">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <p className="text-center text-sm text-muted-foreground mt-4">
              "Just Chatting" now rivals gaming as a top category
            </p>
          </div>
        </div>

        {/* Top Streamers by Followers */}
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-6">Top Streamers by Followers (Millions)</h3>
          <div className="bg-card/30 border border-border/30 rounded-xl p-6">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={topStreamersData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" angle={-45} textAnchor="end" height={80} />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
                  formatter={(value: number) => [`${value}M`, 'Followers']}
                />
                <Bar dataKey="followers" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Monthly Concurrent Viewers Trend */}
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-6">Average Concurrent Viewers 2025 (Millions)</h3>
        <div className="bg-card/30 border border-border/30 rounded-xl p-6">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyViewersData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" domain={[1.8, 2.6]} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
                formatter={(value: number) => [`${value}M`, 'Concurrent Viewers']}
              />
              <Line type="monotone" dataKey="viewers" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ fill: 'hsl(var(--primary))', r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Yearly Hours Watched */}
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-6">Total Hours Watched by Year (Billions)</h3>
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
              <Bar dataKey="hours" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-center text-sm text-muted-foreground mt-4">
            2021 peak driven by pandemic viewing habits
          </p>
        </div>
      </div>

      {/* Sources */}
      <div className="text-xs text-muted-foreground border-t border-border/30 pt-6">
        <p className="font-medium mb-2">Data Sources:</p>
        <p>TwitchTracker, Statista, StreamElements, Business of Apps (2024-2025)</p>
      </div>
    </div>
  );
};

export default TopGamesDashboard;
