import React, { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const StreamerDashboardPreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState("offers");

  return (
    <section className="py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-16 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Your dashboard.
              <br />
              <span className="text-muted-foreground">Your control.</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Manage brand offers, track earnings, and monitor performance—all in one place. 
              No spreadsheets. No guessing.
            </p>

            {/* Feature bullets */}
            <div className="space-y-4">
              {[
                "See all available sponsorships",
                "Accept or decline with one click",
                "Track real-time earnings",
                "Monthly automatic payouts",
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="text-foreground">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Interactive Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative lg:-mr-12"
          >
            {/* Browser Chrome */}
            <div className="bg-card/5 rounded-xl overflow-hidden shadow-2xl shadow-black/20">
              {/* Browser Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-card/10">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/20" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-muted/10 rounded-md px-4 py-1 text-xs text-muted-foreground/40 font-mono">
                    beta.streamer.livad.stream
                  </div>
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="bg-[#0e0e10] min-h-[400px]">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <div className="px-4 pt-4 border-b border-white/5">
                    <TabsList className="bg-transparent h-auto p-0 gap-6">
                      <TabsTrigger 
                        value="offers" 
                        className="bg-transparent px-0 pb-3 text-sm font-medium data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=inactive]:text-white/40 border-b-2 rounded-none data-[state=active]:border-primary data-[state=inactive]:border-transparent"
                      >
                        Your Offers
                      </TabsTrigger>
                      <TabsTrigger 
                        value="earnings" 
                        className="bg-transparent px-0 pb-3 text-sm font-medium data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=inactive]:text-white/40 border-b-2 rounded-none data-[state=active]:border-primary data-[state=inactive]:border-transparent"
                      >
                        Earnings
                      </TabsTrigger>
                      <TabsTrigger 
                        value="stats" 
                        className="bg-transparent px-0 pb-3 text-sm font-medium data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=inactive]:text-white/40 border-b-2 rounded-none data-[state=active]:border-primary data-[state=inactive]:border-transparent"
                      >
                        Stats
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="offers" className="mt-0">
                    <img 
                      src="/lovable-uploads/streamer-brands-grid.png" 
                      alt="Available brand offers" 
                      className="w-full h-auto"
                    />
                  </TabsContent>

                  <TabsContent value="earnings" className="mt-0 p-6">
                    <div className="space-y-6">
                      <div className="grid grid-cols-3 gap-4">
                        {[
                          { label: "This month", value: "$847", trend: "+12%" },
                          { label: "Last month", value: "$623", trend: "" },
                          { label: "All time", value: "$4,291", trend: "" },
                        ].map((stat) => (
                          <div key={stat.label} className="bg-white/5 rounded-lg p-4">
                            <p className="text-white/40 text-xs mb-1">{stat.label}</p>
                            <p className="text-white text-xl font-bold">{stat.value}</p>
                            {stat.trend && (
                              <p className="text-green-400 text-xs mt-1">{stat.trend}</p>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="bg-white/5 rounded-lg p-4">
                        <p className="text-white/60 text-sm mb-4">Recent payouts</p>
                        <div className="space-y-3">
                          {[
                            { date: "Jan 15", amount: "$623" },
                            { date: "Dec 15", amount: "$512" },
                            { date: "Nov 15", amount: "$489" },
                          ].map((payout) => (
                            <div key={payout.date} className="flex items-center justify-between">
                              <span className="text-white/60 text-sm">{payout.date}</span>
                              <span className="text-white font-medium">{payout.amount}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="stats" className="mt-0 p-6">
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { label: "Impressions", value: "145.2K" },
                          { label: "Engagements", value: "8,421" },
                          { label: "Campaigns run", value: "34" },
                          { label: "Avg. CPM", value: "$18.50" },
                        ].map((stat) => (
                          <div key={stat.label} className="bg-white/5 rounded-lg p-4">
                            <p className="text-white/40 text-xs mb-1">{stat.label}</p>
                            <p className="text-white text-xl font-bold">{stat.value}</p>
                          </div>
                        ))}
                      </div>

                      <div className="bg-white/5 rounded-lg p-4">
                        <p className="text-white/60 text-sm mb-3">Top performing brands</p>
                        <div className="space-y-2">
                          {[
                            { brand: "Glorious", impressions: "42K" },
                            { brand: "Surfshark", impressions: "38K" },
                            { brand: "Logitech", impressions: "31K" },
                          ].map((brand) => (
                            <div key={brand.brand} className="flex items-center justify-between">
                              <span className="text-white text-sm">{brand.brand}</span>
                              <span className="text-white/60 text-sm">{brand.impressions}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
