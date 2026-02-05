import { StatCard, StatCardGrid } from '../StatCard';

const EngagementSection = () => (
  <div>
    <h3 className="text-xl font-semibold text-foreground mb-6">Engagement & Activity Metrics</h3>
    <StatCardGrid columns={4}>
      <StatCard value={7.4} suffix="M" label="Active Streamers" decimals={1} trend="Monthly unique" format="raw" />
      <StatCard value={91400} label="Avg Concurrent Channels" trend="Live at any time" format="auto" />
      <StatCard value={2.3} suffix="M" label="Avg Concurrent Viewers" decimals={1} trend="-8% YoY" format="raw" />
      <StatCard value={48000} label="Hours Watched / Min" trend="Across all streams" format="auto" />
    </StatCardGrid>
  </div>
);

export default EngagementSection;
