import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const yoyData = [
  { metric: 'Hours Watched (B)', y2024: 21.0, y2025: 19.2 },
  { metric: 'Market Share (%)', y2024: 61.1, y2025: 52.8 },
  { metric: 'Unique Channels (M)', y2024: 19.8, y2025: 19.7 },
  { metric: 'Avg Concurrent (M)', y2024: 2.5, y2025: 2.3 },
];

const YearOverYearSection = () => (
  <div>
    <h3 className="text-xl font-semibold text-foreground mb-6">Year-over-Year Comparison: 2024 vs 2025</h3>
    <div className="bg-card/30 border border-border/30 rounded-xl p-6">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={yoyData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="metric" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 11 }} />
          <YAxis stroke="hsl(var(--muted-foreground))" />
          <Tooltip 
            contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
          />
          <Legend />
          <Bar dataKey="y2024" name="2024" fill="hsl(var(--muted-foreground))" radius={[4, 4, 0, 0]} isAnimationActive={false} />
          <Bar dataKey="y2025" name="2025" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} isAnimationActive={false} />
        </BarChart>
      </ResponsiveContainer>
      <p className="text-center text-sm text-muted-foreground mt-4">
        Twitch declined across all key metrics in 2025, primarily due to viewbotting crackdowns
      </p>
    </div>
  </div>
);

export default YearOverYearSection;
