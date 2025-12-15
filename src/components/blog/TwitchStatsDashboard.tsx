import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Legend } from 'recharts';
import { useInView } from '@/hooks/useInView';
import { useCountUp } from '@/hooks/useCountUp';

const userGrowthData = [
  { year: '2020', users: 140 },
  { year: '2021', users: 180 },
  { year: '2022', users: 200 },
  { year: '2023', users: 220 },
  { year: '2024', users: 230 },
  { year: '2025', users: 240 },
];

const ageData = [
  { name: '16-24', value: 41, color: 'hsl(var(--primary))' },
  { name: '25-34', value: 32, color: 'hsl(var(--accent))' },
  { name: '35-44', value: 17, color: 'hsl(var(--muted-foreground))' },
  { name: '45+', value: 10, color: 'hsl(var(--border))' },
];

const genderData = [
  { name: 'Male', value: 65, color: 'hsl(var(--primary))' },
  { name: 'Female', value: 35, color: 'hsl(var(--accent))' },
];

const revenueData = [
  { name: 'Subscriptions', value: 58, color: 'hsl(var(--primary))' },
  { name: 'Advertising', value: 33, color: 'hsl(var(--accent))' },
  { name: 'Bits & Other', value: 9, color: 'hsl(var(--muted-foreground))' },
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

const TwitchStatsDashboard = () => {
  return (
    <div className="space-y-12">
      {/* Key Metrics */}
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-6">Key Platform Metrics (2025)</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatedStatCard value={240} suffix="M" label="Monthly Active Users" />
          <AnimatedStatCard value={35} suffix="M" label="Daily Active Users" />
          <AnimatedStatCard value={2.29} suffix="M" label="Avg Concurrent Viewers" decimals={2} />
          <AnimatedStatCard value={7.3} suffix="M" label="Active Streamers" decimals={1} />
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
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Area type="monotone" dataKey="users" stroke="hsl(var(--primary))" fill="url(#colorUsers)" strokeWidth={2} />
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
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
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
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
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
                contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
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
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" stroke="hsl(var(--muted-foreground))" unit="%" />
              <YAxis dataKey="country" type="category" stroke="hsl(var(--muted-foreground))" width={80} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
                formatter={(value: number) => [`${value}%`, 'Share']}
              />
              <Bar dataKey="percentage" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
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
