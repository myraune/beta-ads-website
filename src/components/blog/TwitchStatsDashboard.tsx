import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Legend } from 'recharts';

const userGrowthData = [
  { year: '2020', users: 140 },
  { year: '2021', users: 180 },
  { year: '2022', users: 200 },
  { year: '2023', users: 220 },
  { year: '2024', users: 230 },
  { year: '2025', users: 240 },
];

const ageData = [
  { name: '18-24', value: 34, color: '#9147ff' },
  { name: '25-34', value: 27, color: '#772ce8' },
  { name: '35-44', value: 18, color: '#5c16c5' },
  { name: '45+', value: 21, color: '#3d0099' },
];

const genderData = [
  { name: 'Male', value: 65, color: '#9147ff' },
  { name: 'Female', value: 35, color: '#e91916' },
];

const revenueData = [
  { name: 'Subscriptions', value: 58, color: '#9147ff' },
  { name: 'Advertising', value: 33, color: '#e91916' },
  { name: 'Bits & Other', value: 9, color: '#00d4aa' },
];

const geoData = [
  { country: 'USA', percentage: 23.1 },
  { country: 'Germany', percentage: 8.6 },
  { country: 'Brazil', percentage: 7.2 },
  { country: 'Russia', percentage: 6.8 },
  { country: 'France', percentage: 5.4 },
  { country: 'UK', percentage: 4.9 },
  { country: 'Canada', percentage: 4.2 },
  { country: 'Spain', percentage: 3.8 },
];

const StatCard = ({ value, label, suffix = '' }: { value: string; label: string; suffix?: string }) => (
  <div className="bg-card/50 border border-border/30 rounded-xl p-6 text-center">
    <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">{value}{suffix}</div>
    <div className="text-sm text-muted-foreground">{label}</div>
  </div>
);

const TwitchStatsDashboard = () => {
  return (
    <div className="space-y-12">
      {/* Key Metrics */}
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-6">Key Platform Metrics (2025)</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard value="240" suffix="M" label="Monthly Active Users" />
          <StatCard value="35" suffix="M" label="Daily Active Users" />
          <StatCard value="2.29" suffix="M" label="Avg Concurrent Viewers" />
          <StatCard value="7.3" suffix="M" label="Active Streamers" />
        </div>
      </div>

      {/* User Growth Chart */}
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-6">Monthly Active Users Growth (Millions)</h3>
        <div className="bg-card/30 border border-border/30 rounded-xl p-6">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={userGrowthData}>
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9147ff" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#9147ff" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="year" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #333', borderRadius: '8px' }}
                labelStyle={{ color: '#fff' }}
              />
              <Area type="monotone" dataKey="users" stroke="#9147ff" fill="url(#colorUsers)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Demographics */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-6">Age Distribution</h3>
          <div className="bg-card/30 border border-border/30 rounded-xl p-6">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={ageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {ageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #333', borderRadius: '8px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-foreground mb-6">Gender Split</h3>
          <div className="bg-card/30 border border-border/30 rounded-xl p-6">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #333', borderRadius: '8px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Revenue Breakdown */}
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-6">Revenue Breakdown ($1.78B Total)</h3>
        <div className="bg-card/30 border border-border/30 rounded-xl p-6">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={revenueData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {revenueData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #333', borderRadius: '8px' }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Geographic Distribution */}
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-6">Geographic Distribution (Top Markets)</h3>
        <div className="bg-card/30 border border-border/30 rounded-xl p-6">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={geoData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis type="number" stroke="#888" unit="%" />
              <YAxis dataKey="country" type="category" stroke="#888" width={80} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #333', borderRadius: '8px' }}
                formatter={(value: number) => [`${value}%`, 'Share']}
              />
              <Bar dataKey="percentage" fill="#9147ff" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sources */}
      <div className="text-xs text-muted-foreground border-t border-border/30 pt-6">
        <p className="font-medium mb-2">Data Sources:</p>
        <p>TwitchTracker, Statista, Business of Apps, DemandSage (2024-2025)</p>
      </div>
    </div>
  );
};

export default TwitchStatsDashboard;
