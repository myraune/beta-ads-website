import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, ExternalLink, Home, HelpCircle, ChevronRight, Gift, TrendingUp as LevelUp, Film, Wallet, BarChart3, CircleHelp, ArrowUpRight, ArrowDownLeft, CheckCircle2, Clock } from "lucide-react";

interface StreamerSectionProps {
  t: any;
  language: string;
}

export const StreamerSection: React.FC<StreamerSectionProps> = ({ t, language }) => {
  const [activeTab, setActiveTab] = useState<"my" | "available">("available");
  const [activeNavItem, setActiveNavItem] = useState<string>("Sponsorships");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const sponsorships = [
    {
      id: 1,
      title: "NO Philips OneBlade x Fortnite Kickoff",
      subtitle: "Philips OneBlade",
      image: "/lovable-uploads/71765092-972e-4792-a241-0f155a62af68.png",
      status: "planned",
      isNew: true,
      price: "13 EUR",
      rateType: "Rate for 1000 views"
    },
    {
      id: 2,
      title: "Saily",
      subtitle: "Worldwide eSIM service",
      image: "/lovable-uploads/a3645b32-75a2-494d-aa42-f7b96dba1d94.png",
      status: "planned",
      isNew: true,
      price: "13 EUR",
      rateType: "Rate for 1000 views"
    },
    {
      id: 3,
      title: "Brand Lift Study",
      subtitle: "skincare electronics p1",
      image: "/lovable-uploads/f88bb0a9-d318-40f3-9e9c-736f0b37438c.png",
      status: "active",
      isNew: true,
      price: "0.7 EUR",
      rateType: "Rate per completed survey"
    },
    {
      id: 4,
      title: "Surfshark VPN",
      subtitle: "Premium VPN service",
      image: "/lovable-uploads/958b1a7f-a00c-46bc-acdb-bbefda64b9da.png",
      status: "active",
      isNew: false,
      price: "13 EUR",
      rateType: "Rate for 1000 views"
    }
  ];

  const mySponsorships = [
    {
      id: 1,
      title: "Surfshark VPN",
      image: "/lovable-uploads/958b1a7f-a00c-46bc-acdb-bbefda64b9da.png",
      status: "active",
      earnings: "€124.50",
      impressions: "9,576",
      startDate: "Oct 15, 2024"
    },
    {
      id: 2,
      title: "Brand Lift Study",
      image: "/lovable-uploads/f88bb0a9-d318-40f3-9e9c-736f0b37438c.png",
      status: "active",
      earnings: "€8.40",
      impressions: "12 surveys",
      startDate: "Nov 10, 2024"
    }
  ];

  const walletData = {
    availableBalance: 247.50,
    pendingEarnings: 34.20,
    pendingSponsorships: 3,
    totalEarned: 1842.30,
    thisMonth: 156.80,
    monthChange: 12
  };

  const transactions = [
    { date: "Dec 8", description: "Surfshark VPN payout", amount: 24.70, type: "credit", status: "completed" },
    { date: "Dec 5", description: "Saily campaign bonus", amount: 15.00, type: "credit", status: "completed" },
    { date: "Dec 2", description: "Withdrawal to PayPal", amount: -150.00, type: "debit", status: "completed" },
    { date: "Nov 28", description: "Philips OneBlade payout", amount: 42.30, type: "credit", status: "completed" },
    { date: "Nov 25", description: "Brand Lift Study", amount: 8.40, type: "credit", status: "completed" },
    { date: "Nov 20", description: "Surfshark VPN payout", amount: 31.20, type: "credit", status: "pending" },
  ];

  const navItems = [
    { icon: Gift, label: "Sponsorships" },
    { icon: LevelUp, label: "Level Up" },
    { icon: Film, label: "My clips" },
    { icon: Wallet, label: "Wallet" },
    { icon: BarChart3, label: "Statistics" },
    { icon: CircleHelp, label: "Help" },
  ];

  const handleTabChange = (tab: "my" | "available") => {
    if (tab === activeTab) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveTab(tab);
      setIsTransitioning(false);
    }, 150);
  };

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
      {/* Balance Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-xl p-5 border border-green-500/20">
          <div className="text-white/60 text-sm mb-1">Available Balance</div>
          <div className="text-white font-bold text-2xl mb-3">€{walletData.availableBalance.toFixed(2)}</div>
          <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white text-xs h-8 w-full">
            Withdraw
          </Button>
        </div>
        <div className="bg-[#252525] rounded-xl p-5 border border-white/5">
          <div className="text-white/60 text-sm mb-1">Pending Earnings</div>
          <div className="text-white font-bold text-2xl">€{walletData.pendingEarnings.toFixed(2)}</div>
          <div className="text-white/40 text-xs mt-1">{walletData.pendingSponsorships} sponsorships</div>
        </div>
        <div className="bg-[#252525] rounded-xl p-5 border border-white/5">
          <div className="text-white/60 text-sm mb-1">Total Earned</div>
          <div className="text-white font-bold text-2xl">€{walletData.totalEarned.toFixed(2)}</div>
          <div className="text-white/40 text-xs mt-1">All time</div>
        </div>
        <div className="bg-[#252525] rounded-xl p-5 border border-white/5">
          <div className="text-white/60 text-sm mb-1">This Month</div>
          <div className="text-white font-bold text-2xl">€{walletData.thisMonth.toFixed(2)}</div>
          <div className="text-green-400 text-xs mt-1 flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" />
            {walletData.monthChange}% vs last month
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-[#252525] rounded-xl border border-white/5 overflow-hidden">
        <div className="px-5 py-4 border-b border-white/10">
          <h4 className="text-white font-semibold">Transaction History</h4>
        </div>
        <div className="divide-y divide-white/5">
          {transactions.map((tx, index) => (
            <div key={index} className="px-5 py-4 flex items-center justify-between hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  tx.type === "credit" ? "bg-green-500/20" : "bg-red-500/20"
                }`}>
                  {tx.type === "credit" ? (
                    <ArrowDownLeft className="w-4 h-4 text-green-400" />
                  ) : (
                    <ArrowUpRight className="w-4 h-4 text-red-400" />
                  )}
                </div>
                <div>
                  <div className="text-white text-sm font-medium">{tx.description}</div>
                  <div className="text-white/40 text-xs">{tx.date}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className={`text-sm font-bold ${tx.type === "credit" ? "text-green-400" : "text-red-400"}`}>
                  {tx.type === "credit" ? "+" : ""}€{Math.abs(tx.amount).toFixed(2)}
                </div>
                <div className="flex items-center gap-1">
                  {tx.status === "completed" ? (
                    <>
                      <CheckCircle2 className="w-3 h-3 text-green-400" />
                      <span className="text-green-400 text-xs">Completed</span>
                    </>
                  ) : (
                    <>
                      <Clock className="w-3 h-3 text-yellow-400" />
                      <span className="text-yellow-400 text-xs">Pending</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="px-5 py-3 border-t border-white/10">
          <button className="text-red-400 text-sm font-medium hover:text-red-300 transition-colors">
            Load more transactions
          </button>
        </div>
      </div>
    </div>
  );

  const renderSponsorshipsContent = () => (
    <div className="flex-1">
      {/* Title Section */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-white mb-2">
          {activeTab === "available" ? "Available sponsorships" : "My sponsorships"}
        </h3>
        <p className="text-white/50">
          {activeTab === "available" 
            ? "Choose a brand you want to partner with." 
            : "Track your active sponsorship campaigns."}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-white/10">
        <button
          onClick={() => handleTabChange("my")}
          className={`px-4 py-3 text-sm font-medium transition-all relative ${
            activeTab === "my"
              ? "text-white"
              : "text-white/50 hover:text-white/80"
          }`}
        >
          My sponsorships
          {activeTab === "my" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-400" />
          )}
        </button>
        <button
          onClick={() => handleTabChange("available")}
          className={`px-4 py-3 text-sm font-medium transition-all relative ${
            activeTab === "available"
              ? "text-white"
              : "text-white/50 hover:text-white/80"
          }`}
        >
          Available sponsorships
          {activeTab === "available" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-400" />
          )}
        </button>
      </div>

      {/* Tab Content with Animation */}
      <div className={`transition-all duration-300 ${isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
        {activeTab === "available" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sponsorships.map((sponsorship) => (
              <div
                key={sponsorship.id}
                className="bg-[#252525] rounded-xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl group"
              >
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={sponsorship.image}
                    alt={sponsorship.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  {sponsorship.isNew && (
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[10px] px-2 py-0.5 font-medium border-0">
                        ◇ New!
                      </Badge>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h4 className="text-white font-medium text-sm mb-1 line-clamp-2 min-h-[40px]">
                    {sponsorship.title}
                  </h4>
                  <div className="mb-3">
                    <Badge
                      className={`text-[10px] px-2 py-0.5 font-medium border-0 ${
                        sponsorship.status === "active"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {sponsorship.status}
                    </Badge>
                  </div>
                  <div className="mb-4">
                    <div className="text-white font-bold text-lg">{sponsorship.price}</div>
                    <div className="text-white/40 text-xs">{sponsorship.rateType}</div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent border-white/20 text-white/80 hover:bg-white/10 hover:text-white text-xs h-8"
                    >
                      View details
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-red-400 hover:bg-red-500 text-white text-xs h-8"
                    >
                      Join
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {mySponsorships.map((sponsorship) => (
              <div
                key={sponsorship.id}
                className="bg-[#252525] rounded-xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-300 hover:shadow-xl"
              >
                <div className="flex">
                  <div className="w-24 h-24 shrink-0">
                    <img
                      src={sponsorship.image}
                      alt={sponsorship.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-white font-medium text-sm">{sponsorship.title}</h4>
                      <Badge className="bg-green-500/20 text-green-400 text-[10px] px-2 py-0.5 font-medium border-0">
                        {sponsorship.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <div className="text-white/40">Earnings</div>
                        <div className="text-green-400 font-medium">{sponsorship.earnings}</div>
                      </div>
                      <div>
                        <div className="text-white/40">Impressions</div>
                        <div className="text-white font-medium">{sponsorship.impressions}</div>
                      </div>
                      <div>
                        <div className="text-white/40">Started</div>
                        <div className="text-white font-medium">{sponsorship.startDate}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <section id="streamer-section" className="py-32">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        {/* Header with CTAs */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-extralight mb-6 tracking-tighter text-foreground">
            {t.streamerSectionTitle}
          </h2>
          <p className="text-2xl md:text-3xl text-muted-foreground font-light mb-8 tracking-wide">
            {t.streamerSectionSubtitle}
          </p>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-extralight leading-relaxed tracking-wide mb-12">
            {t.streamerSectionDescription}
          </p>

          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <Button
              size="lg"
              className="bg-red-400 text-white hover:bg-red-500 px-12 py-6 text-lg font-light tracking-wide h-auto shadow-2xl hover:shadow-red-400/20 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
              onClick={() => window.open("https://beta.instreamly.com/", "_blank")}
            >
              {t.joinStreamer}
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-border text-card-foreground hover:bg-secondary bg-secondary/50 px-12 py-6 text-lg font-light tracking-wide h-auto transition-all duration-300 hover:border-muted hover:scale-105 hover:-translate-y-1"
              onClick={() => window.open("https://discord.gg/hNgHCbQUvb", "_blank")}
            >
              {t.joinDiscord}
              <ExternalLink className="ml-4 h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Platform Preview */}
        <div className="rounded-2xl overflow-hidden shadow-2xl border border-border/50 bg-[#1a1a1a]">
          {/* Browser Bar */}
          <div className="bg-[#2a2a2a] px-4 py-3 flex items-center gap-3 border-b border-white/10">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="bg-[#1a1a1a] rounded-lg px-4 py-1.5 text-sm text-white/60 flex items-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                {getBrowserUrl()}
              </div>
            </div>
          </div>

          {/* App Header */}
          <div className="bg-[#1a1a1a] border-b border-white/10">
            <div className="px-6 py-4 flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center gap-2">
                <span className="text-white font-bold text-xl">beta</span>
                <span className="text-red-400 font-bold text-xl">ads</span>
              </div>

              {/* Navigation */}
              <nav className="hidden md:flex items-center gap-1">
                {navItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveNavItem(item.label)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${
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

              {/* User avatar placeholder */}
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500" />
            </div>
          </div>

          {/* Breadcrumb */}
          <div className="bg-[#1a1a1a] px-6 py-3 border-b border-white/5">
            <div className="flex items-center gap-2 text-sm">
              <Home className="w-4 h-4 text-white/40" />
              <ChevronRight className="w-3 h-3 text-white/30" />
              <span className="text-white/60">{getBreadcrumb()}</span>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Dynamic Content Based on Nav */}
              {activeNavItem === "Wallet" ? renderWalletContent() : renderSponsorshipsContent()}

              {/* FAQ Card - Only show on Sponsorships */}
              {activeNavItem === "Sponsorships" && (
                <div className="lg:w-64 shrink-0">
                  <div className="bg-gradient-to-br from-purple-600/30 to-pink-600/30 rounded-xl p-5 border border-white/10">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                        <HelpCircle className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-sm">FAQ</h4>
                      </div>
                    </div>
                    <p className="text-white/70 text-sm mb-4">
                      What permissions does Beta require?
                    </p>
                    <button className="text-red-400 text-sm font-medium flex items-center gap-1 hover:text-red-300 transition-colors">
                      Read it now
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-3 glass-card rounded-2xl px-8 py-4 transition-all duration-300 hover:shadow-lg hover:scale-105">
            <TrendingUp className="h-6 w-6 text-muted-foreground" />
            <span className="text-secondary-foreground font-light text-lg tracking-wide">
              {t.passiveIncome}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};