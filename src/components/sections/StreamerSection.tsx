import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, ExternalLink, Home, ChevronRight, Gift, TrendingUp as LevelUp, 
  Film, Wallet, BarChart3, CircleHelp, ArrowUpRight, ArrowDownLeft, 
  CheckCircle2, Clock, Eye, MousePointer
} from "lucide-react";
import { AreaChart, Area, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

interface StreamerSectionProps {
  t: any;
  language: string;
}

export const StreamerSection: React.FC<StreamerSectionProps> = ({ t, language }) => {
  const [activeNavItem, setActiveNavItem] = useState<string>("Sponsorships");

  const sponsorships = [
    {
      id: 1,
      title: "Philips OneBlade x Fortnite",
      image: "/lovable-uploads/71765092-972e-4792-a241-0f155a62af68.png",
      status: "available",
      isNew: true
    },
    {
      id: 2,
      title: "Saily eSIM",
      image: "/lovable-uploads/a3645b32-75a2-494d-aa42-f7b96dba1d94.png",
      status: "available",
      isNew: true
    },
    {
      id: 3,
      title: "Surfshark VPN",
      image: "/lovable-uploads/958b1a7f-a00c-46bc-acdb-bbefda64b9da.png",
      status: "available",
      isNew: false
    },
    {
      id: 4,
      title: "NordVPN",
      image: "/lovable-uploads/4d784a07-41cb-46c9-9bfc-b33f83db6f0c.png",
      status: "available",
      isNew: true
    }
  ];

  const walletData = {
    availableBalance: 247.50,
    pendingEarnings: 34.20,
    totalEarned: 1842.30,
    thisMonth: 156.80,
    monthChange: 12
  };

  const transactions = [
    { date: "Dec 8", description: "Surfshark VPN payout", amount: 24.70, type: "credit", status: "completed" },
    { date: "Dec 5", description: "Saily campaign bonus", amount: 15.00, type: "credit", status: "completed" },
    { date: "Dec 2", description: "Withdrawal to PayPal", amount: -150.00, type: "debit", status: "completed" },
    { date: "Nov 28", description: "Philips OneBlade payout", amount: 42.30, type: "credit", status: "completed" },
  ];

  const navItems = [
    { icon: Gift, label: "Sponsorships" },
    { icon: LevelUp, label: "Level Up" },
    { icon: Film, label: "My clips" },
    { icon: Wallet, label: "Wallet" },
    { icon: BarChart3, label: "Statistics" },
    { icon: CircleHelp, label: "Help" },
  ];

  // Statistics data
  const weeklyViews = [
    { day: "Mon", views: 1200 },
    { day: "Tue", views: 1800 },
    { day: "Wed", views: 1500 },
    { day: "Thu", views: 2200 },
    { day: "Fri", views: 2800 },
    { day: "Sat", views: 3500 },
    { day: "Sun", views: 2900 },
  ];

  const weeklyEarnings = [
    { day: "Mon", amount: 12.50 },
    { day: "Tue", amount: 18.20 },
    { day: "Wed", amount: 15.80 },
    { day: "Thu", amount: 24.30 },
    { day: "Fri", amount: 31.40 },
    { day: "Sat", amount: 38.60 },
    { day: "Sun", amount: 28.90 },
  ];

  const topCampaigns = [
    { name: "Surfshark VPN", earnings: 124.50, impressions: 9576 },
    { name: "Brand Lift Study", earnings: 8.40, impressions: 12 },
    { name: "Philips OneBlade", earnings: 67.30, impressions: 5178 },
  ];

  const getBrowserUrl = () => {
    const urlMap: Record<string, string> = {
      "Sponsorships": "sponsorships",
      "Level Up": "level-up",
      "My clips": "clips",
      "Wallet": "wallet",
      "Statistics": "statistics",
      "Help": "help"
    };
    return `beta.instreamly.com/${urlMap[activeNavItem] || "sponsorships"}`;
  };

  const getBreadcrumb = () => {
    const breadcrumbMap: Record<string, string> = {
      "Sponsorships": "Available sponsorships",
      "Level Up": "Level Up",
      "My clips": "My clips",
      "Wallet": "Wallet",
      "Statistics": "Statistics",
      "Help": "Help center"
    };
    return breadcrumbMap[activeNavItem] || "Available sponsorships";
  };

  const renderWalletContent = () => (
    <div className="flex-1">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-xl p-4 border border-green-500/20">
          <div className="text-white/60 text-xs mb-1">Available</div>
          <div className="text-white font-bold text-xl">€{walletData.availableBalance.toFixed(2)}</div>
        </div>
        <div className="bg-[#252525] rounded-xl p-4 border border-white/5">
          <div className="text-white/60 text-xs mb-1">Pending</div>
          <div className="text-white font-bold text-xl">€{walletData.pendingEarnings.toFixed(2)}</div>
        </div>
        <div className="bg-[#252525] rounded-xl p-4 border border-white/5">
          <div className="text-white/60 text-xs mb-1">Total Earned</div>
          <div className="text-white font-bold text-xl">€{walletData.totalEarned.toFixed(2)}</div>
        </div>
        <div className="bg-[#252525] rounded-xl p-4 border border-white/5">
          <div className="text-white/60 text-xs mb-1">This Month</div>
          <div className="text-white font-bold text-xl">€{walletData.thisMonth.toFixed(2)}</div>
        </div>
      </div>

      <div className="bg-[#252525] rounded-xl border border-white/5 overflow-hidden">
        <div className="px-4 py-3 border-b border-white/10">
          <h4 className="text-white font-medium text-sm">Recent Transactions</h4>
        </div>
        <div className="divide-y divide-white/5">
          {transactions.map((tx, index) => (
            <div key={index} className="px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
                  tx.type === "credit" ? "bg-green-500/20" : "bg-red-500/20"
                }`}>
                  {tx.type === "credit" ? (
                    <ArrowDownLeft className="w-3.5 h-3.5 text-green-400" />
                  ) : (
                    <ArrowUpRight className="w-3.5 h-3.5 text-red-400" />
                  )}
                </div>
                <div>
                  <div className="text-white text-xs font-medium">{tx.description}</div>
                  <div className="text-white/40 text-[10px]">{tx.date}</div>
                </div>
              </div>
              <div className={`text-xs font-bold ${tx.type === "credit" ? "text-green-400" : "text-red-400"}`}>
                {tx.type === "credit" ? "+" : ""}€{Math.abs(tx.amount).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSponsorshipsContent = () => (
    <div className="flex-1">
      <h3 className="text-lg font-medium text-white mb-4">Available sponsorships</h3>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {sponsorships.map((sponsorship) => (
          <div
            key={sponsorship.id}
            className="bg-[#252525] rounded-xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-300"
          >
            <div className="relative h-24 overflow-hidden">
              <img
                src={sponsorship.image}
                alt={sponsorship.title}
                className="w-full h-full object-cover"
              />
              {sponsorship.isNew && (
                <Badge className="absolute top-2 left-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[9px] px-1.5 py-0.5 border-0">
                  New!
                </Badge>
              )}
            </div>
            <div className="p-3">
              <h4 className="text-white font-medium text-xs mb-2 line-clamp-1">{sponsorship.title}</h4>
              <Button 
                size="sm" 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs py-1 h-7 mt-2"
              >
                Apply
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStatisticsContent = () => (
    <div className="flex-1 space-y-4">
      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-3">
        <div className="bg-[#252525] rounded-xl p-4 border border-white/5">
          <div className="flex items-center gap-2 mb-2">
            <Eye className="w-4 h-4 text-primary/70" />
            <span className="text-white/60 text-xs">Total Views</span>
          </div>
          <div className="text-white font-bold text-xl">15,900</div>
          <div className="text-green-400 text-xs flex items-center gap-1 mt-1">
            <ArrowUpRight className="w-3 h-3" /> +18.5%
          </div>
        </div>
        <div className="bg-[#252525] rounded-xl p-4 border border-white/5">
          <div className="flex items-center gap-2 mb-2">
            <MousePointer className="w-4 h-4 text-primary/70" />
            <span className="text-white/60 text-xs">Avg CTR</span>
          </div>
          <div className="text-white font-bold text-xl">2.4%</div>
          <div className="text-green-400 text-xs flex items-center gap-1 mt-1">
            <ArrowUpRight className="w-3 h-3" /> +0.3%
          </div>
        </div>
        <div className="bg-[#252525] rounded-xl p-4 border border-white/5">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-primary/70" />
            <span className="text-white/60 text-xs">Watch Time</span>
          </div>
          <div className="text-white font-bold text-xl">23 min</div>
          <div className="text-muted-foreground text-xs mt-1">Average</div>
        </div>
        <div className="bg-[#252525] rounded-xl p-4 border border-white/5">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-primary/70" />
            <span className="text-white/60 text-xs">Conversion</span>
          </div>
          <div className="text-white font-bold text-xl">1.8%</div>
          <div className="text-green-400 text-xs flex items-center gap-1 mt-1">
            <ArrowUpRight className="w-3 h-3" /> +0.2%
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-2 gap-4">
        {/* Views Chart */}
        <div className="bg-[#252525] rounded-xl p-4 border border-white/5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white text-sm font-medium">Views This Week</span>
            <span className="text-white/40 text-xs">Last 7 days</span>
          </div>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyViews}>
                <defs>
                  <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#666', fontSize: 10 }} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: 8 }}
                  labelStyle={{ color: '#fff' }}
                  itemStyle={{ color: '#ef4444' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="views" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  fill="url(#viewsGradient)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Earnings Chart */}
        <div className="bg-[#252525] rounded-xl p-4 border border-white/5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white text-sm font-medium">Earnings This Week</span>
            <span className="text-green-400 text-xs font-medium">€169.70 total</span>
          </div>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyEarnings}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#666', fontSize: 10 }} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: 8 }}
                  labelStyle={{ color: '#fff' }}
                  formatter={(value: number) => [`€${value.toFixed(2)}`, 'Earnings']}
                />
                <Bar dataKey="amount" fill="#22c55e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Campaigns */}
      <div className="bg-[#252525] rounded-xl p-4 border border-white/5">
        <h4 className="text-white text-sm font-medium mb-3">Top Performing Campaigns</h4>
        <div className="space-y-2">
          {topCampaigns.map((campaign, index) => (
            <div key={campaign.name} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
              <div className="flex items-center gap-3">
                <span className="text-white/40 text-xs w-4">{index + 1}.</span>
                <span className="text-white text-sm">{campaign.name}</span>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="text-green-400 text-sm font-medium">€{campaign.earnings.toFixed(2)}</div>
                  <div className="text-white/40 text-[10px]">earned</div>
                </div>
                <div className="text-right">
                  <div className="text-white text-sm font-medium">{campaign.impressions.toLocaleString()}</div>
                  <div className="text-white/40 text-[10px]">impressions</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeNavItem) {
      case "Wallet":
        return renderWalletContent();
      case "Statistics":
        return renderStatisticsContent();
      default:
        return renderSponsorshipsContent();
    }
  };

  return (
    <section id="streamer-section" className="py-12 lg:py-20">
      <div className="max-w-[1500px] mx-auto px-4 lg:px-6">
        {/* Platform Preview */}
        <div className="rounded-2xl overflow-hidden shadow-2xl border border-border/50 bg-[#1a1a1a]">
          {/* Browser Bar */}
          <div className="bg-[#2a2a2a] px-4 py-2.5 flex items-center gap-3 border-b border-white/10">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="bg-[#1a1a1a] rounded-lg px-3 py-1 text-xs text-white/60 flex items-center gap-2">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                {getBrowserUrl()}
              </div>
            </div>
          </div>

          {/* App Header */}
          <div className="bg-[#1a1a1a] border-b border-white/10">
            <div className="px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img 
                  src="/lovable-uploads/logo-white.png" 
                  alt="inStreamly" 
                  className="h-6 w-auto"
                />
                <Badge className="bg-red-400/20 text-red-400 text-[9px] px-1.5 py-0.5 border-0">
                  BETA
                </Badge>
              </div>

              <nav className="hidden md:flex items-center gap-0.5">
                {navItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveNavItem(item.label)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all ${
                      activeNavItem === item.label
                        ? "bg-red-400/20 text-red-400"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <item.icon className="w-3.5 h-3.5" />
                    {item.label}
                  </button>
                ))}
              </nav>

              <div className="flex items-center gap-2">
                <div className="hidden sm:block text-right text-[10px]">
                  <div className="text-white/60">Level 3</div>
                  <div className="text-green-400">€247.50</div>
                </div>
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 border border-white/20" />
              </div>
            </div>
          </div>

          {/* Breadcrumb */}
          <div className="bg-[#1a1a1a] px-4 py-2 border-b border-white/5">
            <div className="flex items-center gap-1.5 text-xs">
              <Home className="w-3.5 h-3.5 text-white/40" />
              <ChevronRight className="w-3 h-3 text-white/30" />
              <span className="text-white/60">{getBreadcrumb()}</span>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-4 min-h-[320px]">
            {renderContent()}
          </div>
        </div>

        {/* CTAs Below Preview */}
        <div className="text-center mt-10">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <Button
              size="lg"
              className="bg-red-400 text-white hover:bg-red-500 px-8 py-4 text-sm font-light tracking-wide h-auto shadow-xl hover:shadow-red-400/20 transition-all duration-300 hover:scale-105"
              onClick={() => window.open("https://beta.instreamly.com/", "_blank")}
            >
              {t.joinStreamer}
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-border text-card-foreground hover:bg-secondary bg-secondary/50 px-8 py-4 text-sm font-light tracking-wide h-auto transition-all duration-300 hover:border-muted hover:scale-105"
              onClick={() => window.open("https://discord.gg/hNgHCbQUvb", "_blank")}
            >
              {t.joinDiscord}
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="inline-flex items-center space-x-2 glass-card rounded-xl px-5 py-2.5">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            <span className="text-secondary-foreground font-light text-sm tracking-wide">
              {t.passiveIncome}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
