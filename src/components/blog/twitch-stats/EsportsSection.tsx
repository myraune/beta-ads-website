import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { StatCard, StatCardGrid } from '../StatCard';

const esportsEvents = [
  { event: 'LoL Worlds 2024', peakViewers: 6.9, platform: 'Multi' },
  { event: 'VALORANT Champions', peakViewers: 1.9, platform: 'Twitch' },
  { event: 'CS2 Major Copenhagen', peakViewers: 1.8, platform: 'Twitch' },
  { event: 'The International', peakViewers: 1.4, platform: 'Twitch' },
  { event: 'LEC Finals', peakViewers: 0.9, platform: 'Twitch' },
  { event: 'CDL Major', peakViewers: 0.4, platform: 'Twitch' },
];

const EsportsSection = () => (
  <div className="space-y-6">
    <h3 className="text-xl font-semibold text-foreground">Esports Viewership</h3>
    
    <StatCardGrid columns={3}>
      <StatCard value={654} suffix="M" label="Esports Hours / Quarter" trend="Avg across 2025" format="raw" />
      <StatCard value={6.9} suffix="M" label="Peak Concurrent (LoL Worlds)" decimals={1} trend="All-time esports record" format="raw" highlight />
      <StatCard value={42} suffix="%" label="Esports Share on Twitch" trend="Of total gaming hours" format="raw" />
    </StatCardGrid>

    <div className="bg-card/30 border border-border/30 rounded-xl p-6">
      <h4 className="text-sm font-medium text-muted-foreground mb-4">Peak Concurrent Viewers by Event (Millions)</h4>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={esportsEvents} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis type="number" stroke="hsl(var(--muted-foreground))" unit="M" />
          <YAxis dataKey="event" type="category" stroke="hsl(var(--muted-foreground))" width={150} />
          <Tooltip 
            contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
            formatter={(value: number) => [`${value}M peak viewers`, 'Peak']}
          />
          <Bar dataKey="peakViewers" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} isAnimationActive={false} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default EsportsSection;
