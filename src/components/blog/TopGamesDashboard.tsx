import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';

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
  { name: 'Gaming', value: 68, color: '#9147ff' },
  { name: 'Non-Gaming', value: 32, color: '#e91916' },
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

const StatCard = ({ value, label, suffix = '' }: { value: string; label: string; suffix?: string }) => (
  <div className="bg-card/50 border border-border/30 rounded-xl p-6 text-center">
    <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">{value}{suffix}</div>
    <div className="text-sm text-muted-foreground">{label}</div>
  </div>
);

const TopGamesDashboard = () => {
  return (
    <div className="space-y-12">
      {/* Key Stats */}
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-6">Platform Overview (2025)</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard value="23.2" suffix="B" label="Hours Watched" />
          <StatCard value="9.2" suffix="M" label="Avg Channels Live" />
          <StatCard value="105" suffix="K" label="Partner Streamers" />
          <StatCard value="11.5" suffix="M" label="Affiliates" />
        </div>
      </div>

      {/* Top Games Ranking */}
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-6">Most Watched Categories (Millions of Hours)</h3>
        <div className="bg-card/30 border border-border/30 rounded-xl p-6">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={topGamesData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis type="number" stroke="#888" />
              <YAxis dataKey="name" type="category" stroke="#888" width={120} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #333', borderRadius: '8px' }}
                formatter={(value: number) => [`${value}M hours`, 'Watched']}
              />
              <Bar dataKey="hours" fill="#9147ff" radius={[0, 4, 4, 0]} />
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
                  contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #333', borderRadius: '8px' }}
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
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#888" angle={-45} textAnchor="end" height={80} />
                <YAxis stroke="#888" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #333', borderRadius: '8px' }}
                  formatter={(value: number) => [`${value}M`, 'Followers']}
                />
                <Bar dataKey="followers" fill="#e91916" radius={[4, 4, 0, 0]} />
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
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="month" stroke="#888" />
              <YAxis stroke="#888" domain={[1.8, 2.6]} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #333', borderRadius: '8px' }}
                formatter={(value: number) => [`${value}M`, 'Concurrent Viewers']}
              />
              <Line type="monotone" dataKey="viewers" stroke="#9147ff" strokeWidth={3} dot={{ fill: '#9147ff', r: 5 }} />
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
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="year" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #333', borderRadius: '8px' }}
                formatter={(value: number) => [`${value}B hours`, 'Watched']}
              />
              <Bar dataKey="hours" fill="#00d4aa" radius={[4, 4, 0, 0]} />
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
