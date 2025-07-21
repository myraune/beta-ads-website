import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, HelpCircle, ArrowRight, Wallet, DollarSign, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const StreamerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("available-sponsorships");

  const sponsorships = [
    {
      id: 1,
      title: "Samsung S25 Ultra",
      brand: "Samsung",
      image: "/lovable-uploads/71765092-972e-4792-a241-0f155a62af68.png",
      status: "active",
      price: "10 EUR",
      rate: "Rate for 1000 views",
      category: "Gaming"
    },
    {
      id: 2,
      title: "Kristiania Voting",
      brand: "Kristiania",
      image: "/lovable-uploads/a3645b32-75a2-494d-aa42-f7b96dba1d94.png",
      status: "active",
      price: "13 EUR",
      rate: "Rate for 1000 views",
      category: "Education"
    },
    {
      id: 3,
      title: "Kristiania",
      brand: "Kristiania",
      image: "/lovable-uploads/a3645b32-75a2-494d-aa42-f7b96dba1d94.png",
      status: "active",
      price: "10 EUR",
      rate: "Rate for 1000 views",
      category: "Education"
    },
    {
      id: 4,
      title: "Surfshark VPN",
      brand: "Surfshark",
      image: "/lovable-uploads/f88bb0a9-d318-40f3-9e9c-736f0b37438c.png",
      status: "inactive",
      price: "13 EUR",
      rate: "Rate for 1000 views",
      category: "Security"
    }
  ];

  const earnings = {
    totalEarnings: "2,450 EUR",
    thisMonth: "340 EUR",
    lastMonth: "285 EUR",
    avgPerStream: "45 EUR",
    totalViews: "125,300",
    activeSponsorships: 3
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate("/")}
                className="mr-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center">
                <img 
                  src="/lovable-uploads/4036e1d6-6941-4822-9a2b-41b6c09ef4bc.png" 
                  alt="Beta AOS" 
                  className="h-8 w-auto dark:block hidden"
                />
                <img 
                  src="/lovable-uploads/d3f9fcbc-48d7-4015-82cd-721f68f85de3.png" 
                  alt="Beta AOS" 
                  className="h-8 w-auto dark:hidden block"
                />
              </div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6">
              <span className="text-sm text-muted-foreground">Sponsorships</span>
              <span className="text-sm text-muted-foreground">Wallet</span>
              <span className="text-sm text-muted-foreground">Help</span>
            </nav>

            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-400 to-red-400"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <span>🏠</span>
          <span>›</span>
          <span className="text-red-400">Available sponsorships</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-light mb-2">Available sponsorships</h1>
                  <p className="text-muted-foreground">Choose a brand you want to partner with.</p>
                </div>
              </div>

              <TabsList className="mb-6">
                <TabsTrigger value="my-sponsorships">My sponsorships</TabsTrigger>
                <TabsTrigger value="available-sponsorships">Available sponsorships</TabsTrigger>
              </TabsList>

              <TabsContent value="available-sponsorships" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {sponsorships.map((sponsorship) => (
                    <Card key={sponsorship.id} className="overflow-hidden">
                      <div className="relative">
                        <img 
                          src={sponsorship.image} 
                          alt={sponsorship.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-2 left-2">
                          <Badge variant="secondary" className="bg-orange-400 text-white">
                            📺
                          </Badge>
                        </div>
                        {sponsorship.status === "active" && (
                          <div className="absolute top-2 right-2">
                            <Badge className="bg-green-500 text-white">active</Badge>
                          </div>
                        )}
                        {sponsorship.status === "inactive" && (
                          <div className="absolute top-2 right-2">
                            <Badge variant="destructive">inactive</Badge>
                          </div>
                        )}
                      </div>
                      
                      <CardContent className="p-4">
                        <h3 className="font-medium mb-2">{sponsorship.title}</h3>
                        <div className="text-center mb-4">
                          <div className="text-2xl font-bold">{sponsorship.price}</div>
                          <div className="text-sm text-muted-foreground">{sponsorship.rate}</div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            View details
                          </Button>
                          <Button 
                            size="sm" 
                            className="flex-1 bg-red-400 hover:bg-red-500 text-white"
                          >
                            Join
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="my-sponsorships" className="space-y-6">
                <div className="text-center py-12">
                  <p className="text-muted-foreground">You don't have any active sponsorships yet.</p>
                  <Button 
                    className="mt-4 bg-red-400 hover:bg-red-500 text-white"
                    onClick={() => setActiveTab("available-sponsorships")}
                  >
                    Browse Available Sponsorships
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:w-80">
            <Tabs defaultValue="wallet" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="wallet">
                  <Wallet className="h-4 w-4 mr-2" />
                  Wallet
                </TabsTrigger>
                <TabsTrigger value="faq">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  FAQ
                </TabsTrigger>
              </TabsList>

              <TabsContent value="wallet">
                <Card className="bg-gradient-to-r from-red-400 to-orange-400 text-white border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <DollarSign className="h-5 w-5 mr-2" />
                      Total Earnings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold mb-4">{earnings.totalEarnings}</div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-white/80">This month:</span>
                        <span className="font-semibold">{earnings.thisMonth}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/80">Last month:</span>
                        <span className="font-semibold">{earnings.lastMonth}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/80">Avg per stream:</span>
                        <span className="font-semibold">{earnings.avgPerStream}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2" />
                      Statistics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total views:</span>
                        <span className="font-semibold">{earnings.totalViews}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Active sponsorships:</span>
                        <span className="font-semibold">{earnings.activeSponsorships}</span>
                      </div>
                    </div>
                    
                    <Button className="w-full mt-4 bg-red-400 hover:bg-red-500 text-white">
                      Withdraw Earnings
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="faq">
                <Card>
                  <CardHeader>
                    <CardTitle>FAQ</CardTitle>
                    <CardDescription>
                      What permissions does Beta require?
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      Read it now
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreamerDashboard;