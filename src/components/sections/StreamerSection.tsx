import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, ExternalLink, Home, ChevronRight, Gift, TrendingUp as LevelUp, 
  Film, Wallet, BarChart3, CircleHelp, ArrowUpRight, ArrowDownLeft, 
  CheckCircle2, Clock, Eye, MousePointer, Menu, Download, Filter
} from "lucide-react";
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, ReferenceLine, Legend } from "recharts";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface StreamerSectionProps {
  t: any;
  language: string;
}

export const StreamerSection: React.FC<StreamerSectionProps> = ({ t, language }) => {
  const [activeNavItem, setActiveNavItem] = useState<string>("Sponsorships");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [timeFilter, setTimeFilter] = useState<string>("7d");
  const [campaignFilter, setCampaignFilter] = useState<string>("all");

  const sponsorships = [
    {
      id: 1,
      title: "Philips OneBlade x Fortnite",
      gradient: "from-blue-600 to-cyan-500",
      brand: "PHILIPS",
      status: "available",
      isNew: true
    },
    {
      id: 2,
      title: "Saily eSIM",
      gradient: "from-orange-500 to-yellow-500",
      brand: "SAILY",
      status: "available",
      isNew: true
    },
    {
      id: 3,
      title: "Surfshark VPN",
      gradient: "from-teal-500 to-emerald-500",
      brand: "SURFSHARK",
      status: "available",
      isNew: false
    },
    {
      id: 4,
      title: "NordVPN",
      gradient: "from-blue-700 to-indigo-600",
      brand: "NORDVPN",
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
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-4">
        <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-lg p-3 border border-green-500/20">
          <div className="text-white/60 text-[10px] mb-0.5">Available</div>
          <div className="text-white font-bold text-lg">€{walletData.availableBalance.toFixed(2)}</div>
        </div>
        <div className="bg-[#252525] rounded-lg p-3 border border-white/5">
          <div className="text-white/60 text-[10px] mb-0.5">Pending</div>
          <div className="text-white font-bold text-lg">€{walletData.pendingEarnings.toFixed(2)}</div>
        </div>
        <div className="bg-[#252525] rounded-lg p-3 border border-white/5">
          <div className="text-white/60 text-[10px] mb-0.5">Total Earned</div>
          <div className="text-white font-bold text-lg">€{walletData.totalEarned.toFixed(2)}</div>
        </div>
        <div className="bg-[#252525] rounded-lg p-3 border border-white/5">
          <div className="text-white/60 text-[10px] mb-0.5">This Month</div>
          <div className="text-white font-bold text-lg">€{walletData.thisMonth.toFixed(2)}</div>
        </div>
      </div>

      <div className="bg-[#252525] rounded-lg border border-white/5 overflow-hidden">
        <div className="px-3 py-2 border-b border-white/10">
          <h4 className="text-white font-medium text-xs">Recent Transactions</h4>
        </div>
        <div className="divide-y divide-white/5">
          {transactions.slice(0, 3).map((tx, index) => (
            <div key={index} className="px-3 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  tx.type === "credit" ? "bg-green-500/20" : "bg-red-500/20"
                }`}>
                  {tx.type === "credit" ? (
                    <ArrowDownLeft className="w-3 h-3 text-green-400" />
                  ) : (
                    <ArrowUpRight className="w-3 h-3 text-red-400" />
                  )}
                </div>
                <div>
                  <div className="text-white text-[11px] font-medium">{tx.description}</div>
                  <div className="text-white/40 text-[9px]">{tx.date}</div>
                </div>
              </div>
              <div className={`text-[11px] font-bold ${tx.type === "credit" ? "text-green-400" : "text-red-400"}`}>
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
      <h3 className="text-sm font-medium text-white mb-3">Available sponsorships</h3>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {sponsorships.map((sponsorship) => (
          <div
            key={sponsorship.id}
            className="bg-[#252525] rounded-lg overflow-hidden border border-white/5 hover:border-primary/50 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 cursor-pointer group"
          >
            <div className="relative h-16 overflow-hidden">
              <div className={`w-full h-full bg-gradient-to-br ${sponsorship.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                <span className="text-white/90 font-bold text-xs tracking-wider">{sponsorship.brand}</span>
              </div>
              {sponsorship.isNew && (
                <Badge className="absolute top-1.5 left-1.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[8px] px-1 py-0 border-0">
                  New!
                </Badge>
              )}
            </div>
            <div className="p-2">
              <h4 className="text-white font-medium text-[11px] mb-1.5 line-clamp-1">{sponsorship.title}</h4>
              <Button 
                size="sm" 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-[10px] py-0.5 h-6"
              >
                Apply
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const campaignBreakdown = [
    { name: "Surfshark", value: 45, color: "#22c55e" },
    { name: "Philips", value: 30, color: "#3b82f6" },
    { name: "Saily", value: 15, color: "#f59e0b" },
    { name: "Other", value: 10, color: "#6b7280" },
  ];

  const hourlyData = [
    { hour: "6PM", views: 800 },
    { hour: "7PM", views: 1200 },
    { hour: "8PM", views: 2400 },
    { hour: "9PM", views: 2100 },
    { hour: "10PM", views: 1800 },
    { hour: "11PM", views: 900 },
  ];

  const avgViews = useMemo(() => weeklyViews.reduce((a, b) => a + b.views, 0) / weeklyViews.length, []);

  const renderStatisticsContent = () => (
    <div className="flex-1 space-y-3">
      {/* Filters Row - Compact */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-[#252525] rounded-lg p-2 border border-white/5">
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-white/40" />
          <div className="flex gap-1">
            {["7d", "30d", "90d"].map((period) => (
              <button
                key={period}
                onClick={() => setTimeFilter(period)}
                className={`px-2 py-1 rounded-md text-[10px] font-medium transition-all ${
                  timeFilter === period
                    ? "bg-primary text-primary-foreground"
                    : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10"
                }`}
              >
                {period === "7d" ? "7D" : period === "30d" ? "30D" : "90D"}
              </button>
            ))}
          </div>
        </div>
        <Select value={campaignFilter} onValueChange={setCampaignFilter}>
          <SelectTrigger className="w-[120px] h-7 bg-white/5 border-white/10 text-white text-[10px]">
            <SelectValue placeholder="All Campaigns" />
          </SelectTrigger>
          <SelectContent className="bg-[#252525] border-white/10">
            <SelectItem value="all" className="text-white text-xs">All Campaigns</SelectItem>
            <SelectItem value="surfshark" className="text-white text-xs">Surfshark VPN</SelectItem>
            <SelectItem value="philips" className="text-white text-xs">Philips OneBlade</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Summary Stats - Compact */}
      <div className="grid grid-cols-4 gap-2">
        <div className="bg-[#252525] rounded-lg p-2.5 border border-white/5">
          <div className="flex items-center gap-1.5 mb-1">
            <Eye className="w-3 h-3 text-primary/70" />
            <span className="text-white/60 text-[9px]">Views</span>
          </div>
          <div className="text-white font-bold text-sm">15.9K</div>
          <div className="text-green-400 text-[9px] flex items-center gap-0.5">
            <ArrowUpRight className="w-2.5 h-2.5" /> +18%
          </div>
        </div>
        <div className="bg-[#252525] rounded-lg p-2.5 border border-white/5">
          <div className="flex items-center gap-1.5 mb-1">
            <MousePointer className="w-3 h-3 text-primary/70" />
            <span className="text-white/60 text-[9px]">CTR</span>
          </div>
          <div className="text-white font-bold text-sm">2.4%</div>
          <div className="text-green-400 text-[9px] flex items-center gap-0.5">
            <ArrowUpRight className="w-2.5 h-2.5" /> +0.3%
          </div>
        </div>
        <div className="bg-[#252525] rounded-lg p-2.5 border border-white/5">
          <div className="flex items-center gap-1.5 mb-1">
            <Clock className="w-3 h-3 text-primary/70" />
            <span className="text-white/60 text-[9px]">Watch</span>
          </div>
          <div className="text-white font-bold text-sm">23m</div>
          <div className="text-muted-foreground text-[9px]">Avg</div>
        </div>
        <div className="bg-[#252525] rounded-lg p-2.5 border border-white/5">
          <div className="flex items-center gap-1.5 mb-1">
            <TrendingUp className="w-3 h-3 text-primary/70" />
            <span className="text-white/60 text-[9px]">Conv</span>
          </div>
          <div className="text-white font-bold text-sm">1.8%</div>
          <div className="text-green-400 text-[9px] flex items-center gap-0.5">
            <ArrowUpRight className="w-2.5 h-2.5" /> +0.2%
          </div>
        </div>
      </div>

      {/* Charts Row - Compact */}
      <div className="grid grid-cols-2 gap-2">
        {/* Views Chart */}
        <div className="bg-[#252525] rounded-lg p-3 border border-white/5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white text-xs font-medium">Views</span>
            <span className="text-white/40 text-[9px]">Avg: {Math.round(avgViews).toLocaleString()}</span>
          </div>
          <div className="h-24">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyViews}>
                <defs>
                  <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#666', fontSize: 9 }} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: 6, fontSize: 10 }}
                  labelStyle={{ color: '#fff', fontSize: 10 }}
                  itemStyle={{ color: '#ef4444', fontSize: 10 }}
                />
                <ReferenceLine y={avgViews} stroke="#666" strokeDasharray="3 3" />
                <Area 
                  type="monotone" 
                  dataKey="views" 
                  stroke="#ef4444" 
                  strokeWidth={1.5}
                  fill="url(#viewsGradient)"
                  animationDuration={800}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Earnings Chart */}
        <div className="bg-[#252525] rounded-lg p-3 border border-white/5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white text-xs font-medium">Earnings</span>
            <span className="text-green-400 text-[9px] font-medium">€169.70</span>
          </div>
          <div className="h-24">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyEarnings}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#666', fontSize: 9 }} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: 6, fontSize: 10 }}
                  labelStyle={{ color: '#fff', fontSize: 10 }}
                  formatter={(value: number) => [`€${value.toFixed(2)}`, 'Earnings']}
                />
                <Bar dataKey="amount" fill="#22c55e" radius={[3, 3, 0, 0]} animationDuration={800} />
              </BarChart>
            </ResponsiveContainer>
          </div>
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
                {/* Mobile Menu Trigger */}
                <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                  <SheetTrigger asChild>
                    <button className="md:hidden p-1.5 rounded-lg hover:bg-white/10 transition-colors">
                      <Menu className="w-5 h-5 text-white" />
                    </button>
                  </SheetTrigger>
                  <SheetContent side="left" className="bg-[#1a1a1a] border-white/10 w-64 p-0">
                    <div className="p-4 border-b border-white/10">
                      <img 
                        src="/lovable-uploads/logo-white.png" 
                        alt="Beta Ads" 
                        className="h-6 w-auto"
                      />
                    </div>
                    <nav className="p-3 space-y-1">
                      {navItems.map((item, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setActiveNavItem(item.label);
                            setIsMobileMenuOpen(false);
                          }}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all ${
                            activeNavItem === item.label
                              ? "bg-red-400/20 text-red-400"
                              : "text-white/60 hover:text-white hover:bg-white/5"
                          }`}
                        >
                          <item.icon className="w-4 h-4" />
                          {item.label}
                        </button>
                      ))}
                    </nav>
                  </SheetContent>
                </Sheet>
                
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

          {/* Main Content - Fixed height for consistent sizing */}
          <div className="p-3 h-[320px] overflow-hidden">
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
