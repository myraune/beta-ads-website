import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const geoData = [
  { country: 'USA', percentage: 23.1 },
  { country: 'Germany', percentage: 8.6 },
  { country: 'Brazil', percentage: 7.2 },
  { country: 'Russia', percentage: 6.8 },
  { country: 'France', percentage: 5.4 },
  { country: 'UK', percentage: 4.9 },
  { country: 'Canada', percentage: 4.2 },
  { country: 'Spain', percentage: 3.8 },
  { country: 'South Korea', percentage: 3.1 },
  { country: 'Turkey', percentage: 2.6 },
];

const GeographicSection = () => (
  <div>
    <h3 className="text-xl font-semibold text-foreground mb-6">Geographic Distribution (Top 10 Markets)</h3>
    <div className="bg-card/30 border border-border/30 rounded-xl p-6">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={geoData} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis type="number" stroke="hsl(var(--muted-foreground))" unit="%" />
          <YAxis dataKey="country" type="category" stroke="hsl(var(--muted-foreground))" width={100} />
          <Tooltip 
            contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
            formatter={(value: number) => [`${value}%`, 'Share']}
          />
          <Bar dataKey="percentage" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} isAnimationActive={false} />
        </BarChart>
      </ResponsiveContainer>
      <p className="text-center text-sm text-muted-foreground mt-4">
        The Nordic region represents ~2.3% of global Twitch traffic with above-average engagement
      </p>
    </div>
  </div>
);

export default GeographicSection;
