import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const categoryData = [
  { name: 'Just Chatting', hours: 3.8 },
  { name: 'League of Legends', hours: 1.95 },
  { name: 'GTA V', hours: 1.90 },
  { name: 'Fortnite', hours: 1.42 },
  { name: 'Valorant', hours: 1.21 },
  { name: 'Counter-Strike 2', hours: 0.98 },
  { name: 'Minecraft', hours: 0.87 },
  { name: 'Roblox', hours: 0.76 },
  { name: 'Dota 2', hours: 0.68 },
  { name: 'World of Warcraft', hours: 0.54 },
];

const CategoryBreakdownSection = () => (
  <div>
    <h3 className="text-xl font-semibold text-foreground mb-6">Top 10 Categories by Hours Watched (Billions)</h3>
    <div className="bg-card/30 border border-border/30 rounded-xl p-6">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={categoryData} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis type="number" stroke="hsl(var(--muted-foreground))" unit="B" />
          <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" width={120} />
          <Tooltip 
            contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
            formatter={(value: number) => [`${value}B hours`, 'Watched']}
          />
          <Bar dataKey="hours" fill="hsl(var(--accent))" radius={[0, 4, 4, 0]} isAnimationActive={false} />
        </BarChart>
      </ResponsiveContainer>
      <p className="text-center text-sm text-muted-foreground mt-4">
        Just Chatting dominates with 3.8B hours — nearly double the #2 category
      </p>
    </div>
  </div>
);

export default CategoryBreakdownSection;
