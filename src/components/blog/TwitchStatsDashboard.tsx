import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Legend } from 'recharts';
import { useInView } from '@/hooks/useInView';
import { useCountUp } from '@/hooks/useCountUp';

// StreamHatchet 2025 data
const quarterlyData = [
  { quarter: 'Q1 2024', hours: 5.4 },
  { quarter: 'Q2 2024', hours: 5.2 },
  { quarter: 'Q3 2024', hours: 5.3 },
  { quarter: 'Q4 2024', hours: 5.1 },
  { quarter: 'Q1 2025', hours: 5.2 },
  { quarter: 'Q2 2025', hours: 4.8 },
  { quarter: 'Q3 2025', hours: 4.8 },
  { quarter: 'Q4 2025', hours: 4.4 },
];

const marketShareData = [
  { name: 'Twitch', value: 52.8, color: 'hsl(var(--primary))' },
  { name: 'YouTube Gaming', value: 24.3, color: 'hsl(var(--chart-2))' },
  { name: 'Kick', value: 12.4, color: 'hsl(var(--accent))' },
  { name: 'Others', value: 10.5, color: 'hsl(var(--muted-foreground))' },
];

const contentSplitData = [
  { name: 'Gaming', value: 78, color: 'hsl(var(--primary))' },
  { name: 'Non-Gaming', value: 22, color: 'hsl(var(--accent))' },
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

const ageData = [
  { name: '16-24', value: 41, color: 'hsl(var(--primary))' },
  { name: '25-34', value: 32, color: 'hsl(var(--accent))' },
  { name: '35-44', value: 17, color: 'hsl(var(--muted-foreground))' },
  { name: '45+', value: 10, color: 'hsl(var(--border))' },
];

interface AnimatedStatCardProps {
  value: number;
  label: string;
  suffix?: string;
  decimals?: number;
  trend?: string;
}

const AnimatedStatCard = ({ value, label, suffix = '', decimals = 0, trend }: AnimatedStatCardProps) => {
  const [ref, isVisible] = useInView<HTMLDivElement>({ threshold: 0.3 });
  const { displayValue } = useCountUp(value, isVisible, { duration: 2000, decimals });

  return (
    <div ref={ref} className="bg-card/50 border border-border/30 rounded-xl p-6 text-center">
      <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
        {displayValue}{suffix}
      </div>
      <div className="text-sm text-muted-foreground">{label}</div>
      {trend && <div className="text-xs text-muted-foreground mt-1">{trend}</div>}
    </div>
  );
};

const TwitchStatsDashboard = () => {
  return (
    <div className="space-y-12">
      {/* Key Metrics - StreamHatchet 2025 */}
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-6">Key Platform Metrics (StreamHatchet 2025)</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatedStatCard value={19.2} suffix="B" label="Hours Watched" decimals={1} trend="-8.9% YoY" />
          <AnimatedStatCard value={52.8} suffix="%" label="Market Share" decimals={1} trend="-8.3 pts YoY" />
          <AnimatedStatCard value={19.7} suffix="M" label="Unique Channels" decimals={1} trend="-0.5% YoY" />
          <AnimatedStatCard value={22} suffix="%" label="Non-Gaming Content" trend="+2 pts YoY" />
        </div>
      </div>

      {/* Quarterly Hours Watched */}
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-6">Quarterly Hours Watched (Billions)</h3>
        <div className="bg-card/30 border border-border/30 rounded-xl p-6">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={quarterlyData}>
              <defs>
                <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="quarter" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" domain={[4, 6]} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
                formatter={(value: number) => [`${value}B hours`, 'Watched']}
              />
              <Area type="monotone" dataKey="hours" stroke="hsl(var(--primary))" fill="url(#colorHours)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Q4 2025 was the lowest viewership quarter since Q1 2020
          </p>
        </div>
      </div>

      {/* Market Share */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-6">Platform Market Share 2025</h3>
          <div className="bg-card/30 border border-border/30 rounded-xl p-6">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={marketShareData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {marketShareData.map((entry, index) => (
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
          <h3 className="text-xl font-semibold text-foreground mb-6">Content Split 2025</h3>
          <div className="bg-card/30 border border-border/30 rounded-xl p-6">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={contentSplitData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
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
              Non-gaming grew from 20% to 22% YoY
            </p>
          </div>
        </div>
      </div>

      {/* Demographics */}
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
          <p className="text-center text-sm text-muted-foreground mt-4">
            73% of viewers are under 35 years old
          </p>
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
        <p className="font-medium mb-2">Data Source:</p>
        <p>StreamHatchet 2025 Yearly Live Streaming Trends Report</p>
      </div>
    </div>
  );
};

export default TwitchStatsDashboard;
