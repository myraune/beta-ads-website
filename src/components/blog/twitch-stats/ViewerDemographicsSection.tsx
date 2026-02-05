import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { StatCard, StatCardGrid } from '../StatCard';

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

const ViewerDemographicsSection = () => (
  <div className="space-y-6">
    <h3 className="text-xl font-semibold text-foreground">Viewer Demographics</h3>
    
    <StatCardGrid columns={4}>
      <StatCard value={73} suffix="%" label="Viewers Under 35" trend="Core demographic" format="raw" />
      <StatCard value={42.8} suffix="%" label="Gen Z Watch Live Streams" decimals={1} trend="Internet users 16-24" format="raw" />
      <StatCard value={25.4} suffix=" min" label="Avg Session Duration" decimals={1} trend="Per viewing session" format="raw" />
      <StatCard value={8} suffix="x" label="Longer Than On-Demand" trend="vs traditional video" format="raw" highlight />
    </StatCardGrid>

    <div className="grid lg:grid-cols-2 gap-8">
      <div className="bg-card/30 border border-border/30 rounded-xl p-6">
        <h4 className="text-sm font-medium text-muted-foreground mb-4 text-center">Age Distribution</h4>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={ageData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" label={({ name, value }) => `${name}: ${value}%`} isAnimationActive={false}>
              {ageData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-card/30 border border-border/30 rounded-xl p-6">
        <h4 className="text-sm font-medium text-muted-foreground mb-4 text-center">Gender Split</h4>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={genderData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" label={({ name, value }) => `${name}: ${value}%`} isAnimationActive={false}>
              {genderData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

export default ViewerDemographicsSection;
