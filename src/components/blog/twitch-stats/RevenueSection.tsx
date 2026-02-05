import { StatCard, StatCardGrid } from '../StatCard';

const RevenueSection = () => (
  <div>
    <h3 className="text-xl font-semibold text-foreground mb-6">Creator Economy & Revenue</h3>
    <StatCardGrid columns={4}>
      <StatCard value={50} suffix="%" label="Base Sub Revenue Split" trend="Twitch standard" format="raw" />
      <StatCard value={70} suffix="%" label="Partner Plus Split" trend="Top-tier creators" format="raw" />
      <StatCard value={71} suffix="%" label="Sponsored Content Growth" trend="+71% YoY" format="raw" highlight />
      <StatCard value={1.7} suffix="M" label="Disney Brand Mentions" decimals={1} trend="#1 brand on Twitch" format="raw" />
    </StatCardGrid>
    <p className="text-xs text-muted-foreground mt-4">
      Kick offers 95% revenue split to creators, increasing competitive pressure on Twitch's monetization model
    </p>
  </div>
);

export default RevenueSection;
