
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { ArrowRight, ExternalLink, Users, Clock, Eye } from "lucide-react";

interface CountryData {
  name: string;
  path: string;
  color: string;
}

const countries: CountryData[] = [
  {
    name: "Norway",
    path: "M20,5 L25,3 L30,5 L35,8 L40,12 L42,18 L45,25 L48,35 L50,45 L52,55 L54,65 L55,75 L53,82 L50,85 L45,87 L40,85 L35,82 L30,78 L25,72 L20,65 L15,55 L12,45 L10,35 L12,25 L15,18 L18,12 Z",
    color: "text-red-500"
  },
  {
    name: "Sweden", 
    path: "M65,8 L70,5 L75,7 L80,10 L85,15 L90,22 L95,30 L98,40 L100,50 L102,60 L100,70 L95,78 L90,82 L85,85 L80,87 L75,85 L70,82 L65,78 L62,70 L60,60 L58,50 L60,40 L62,30 L65,22 L68,15 Z",
    color: "text-blue-500"
  },
  {
    name: "Denmark",
    path: "M25,88 L35,85 L45,88 L50,92 L48,98 L45,102 L40,105 L35,103 L30,100 L25,95 Z M15,78 L25,75 L30,78 L28,83 L25,87 L20,85 L15,82 Z M8,95 L18,92 L23,95 L21,100 L18,103 L13,101 L8,98 Z",
    color: "text-green-500"
  },
  {
    name: "Finland",
    path: "M110,3 L118,1 L125,4 L130,8 L135,15 L140,25 L142,35 L140,45 L135,55 L130,63 L125,70 L120,75 L115,78 L110,75 L105,70 L102,63 L100,55 L102,45 L105,35 L108,25 L110,15 Z",
    color: "text-purple-500"
  }
];

const calculateEstimate = (budget: number) => {
  const views = Math.round((budget / 40) * 1000);
  
  let duration = "";
  let streamers = "";
  
  if (budget >= 40000) {
    duration = "4–8 weeks";
    streamers = "50+ streamers";
  } else if (budget >= 20000) {
    duration = "4–5 weeks"; 
    streamers = "40+ streamers";
  } else if (budget >= 10000) {
    duration = "2–3 weeks";
    streamers = "25+ streamers";
  } else if (budget >= 5000) {
    duration = "1–2 weeks";
    streamers = "15+ streamers";
  } else {
    duration = "1 week";
    streamers = "10+ streamers";
  }
  
  return { views, duration, streamers };
};

const EstimationSection = ({ t, scrollToSection }: { t: any; scrollToSection: (id: string) => void }) => {
  const [step, setStep] = useState(1);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [budget, setBudget] = useState(10000);
  const [showEstimate, setShowEstimate] = useState(false);

  const handleCountrySelect = (countryName: string) => {
    setSelectedCountries(prev => {
      if (prev.includes(countryName)) {
        return prev.filter(c => c !== countryName);
      } else {
        return [...prev, countryName];
      }
    });
  };

  const proceedToBudget = () => {
    if (selectedCountries.length > 0) {
      setStep(2);
    }
  };

  const handleBudgetSubmit = () => {
    setStep(3);
    setTimeout(() => setShowEstimate(true), 300);
  };

  const estimate = calculateEstimate(budget);

  return (
    <section id="estimation" className="py-32 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-extralight text-gray-900 mb-8 tracking-tighter">
            Estimate Your Campaign
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-extralight leading-relaxed tracking-wide">
            Get an instant forecast for your Twitch campaign across the Nordic region
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Step Indicator */}
          <div className="flex justify-center mb-16">
            <div className="flex items-center space-x-8">
              {[1, 2, 3].map((num) => (
                <div key={num} className="flex items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-light transition-all duration-300 ${
                    step >= num 
                      ? 'bg-red-400 text-white shadow-lg' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {num}
                  </div>
                  {num < 3 && (
                    <div className={`w-16 h-0.5 ml-4 transition-all duration-300 ${
                      step > num ? 'bg-red-400' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step 1: Nordic Map Selector */}
          {step === 1 && (
            <div className="text-center space-y-12 animate-fade-in">
              <h3 className="text-3xl font-light text-gray-900 mb-8 tracking-wide">
                Select Your Target Markets
              </h3>
              
              <div className="relative max-w-3xl mx-auto">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-12 shadow-lg border border-blue-100">
                  <svg 
                    viewBox="0 0 160 120" 
                    className="w-full h-96 mx-auto"
                    style={{ filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.1))' }}
                  >
                    {/* Background water/sea */}
                    <rect width="160" height="120" fill="#e0f2fe" rx="8" />
                    
                    {countries.map((country) => (
                      <g key={country.name}>
                        <path
                          d={country.path}
                          className={`cursor-pointer transition-all duration-500 stroke-2 ${
                            selectedCountries.includes(country.name)
                              ? 'fill-red-400 stroke-red-600 drop-shadow-lg'
                              : 'fill-white hover:fill-gray-100 stroke-gray-400 hover:stroke-gray-600 hover:drop-shadow-md'
                          }`}
                          onClick={() => handleCountrySelect(country.name)}
                          style={{
                            filter: selectedCountries.includes(country.name) 
                              ? 'drop-shadow(0 4px 8px rgba(239, 68, 68, 0.3))' 
                              : 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))'
                          }}
                        />
                        <text
                          x={country.name === "Norway" ? "32" : country.name === "Sweden" ? "82" : country.name === "Denmark" ? "32" : "122"}
                          y={country.name === "Norway" ? "50" : country.name === "Sweden" ? "50" : country.name === "Denmark" ? "95" : "45"}
                          className={`text-sm font-medium pointer-events-none transition-all duration-300 ${
                            selectedCountries.includes(country.name) 
                              ? 'fill-white' 
                              : 'fill-gray-700 hover:fill-gray-900'
                          }`}
                          textAnchor="middle"
                        >
                          {country.name}
                        </text>
                      </g>
                    ))}
                    
                    {/* Decorative elements */}
                    <circle cx="140" cy="20" r="3" fill="#fbbf24" opacity="0.6" />
                    <circle cx="145" cy="25" r="2" fill="#fbbf24" opacity="0.4" />
                    <circle cx="135" cy="25" r="1.5" fill="#fbbf24" opacity="0.5" />
                  </svg>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-gray-600 font-extralight text-lg">
                  Click to select countries • {selectedCountries.length} selected
                </p>
                {selectedCountries.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-3">
                    {selectedCountries.map((country) => (
                      <span key={country} className="bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium shadow-sm border border-red-200">
                        {country}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <Button
                size="lg"
                onClick={proceedToBudget}
                disabled={selectedCountries.length === 0}
                className="bg-red-400 hover:bg-red-500 text-white px-12 py-6 text-lg font-light tracking-wide h-auto shadow-xl hover:shadow-red-400/20 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Budget
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Step 2: Budget Input */}
          {step === 2 && (
            <div className="text-center space-y-12 animate-fade-in">
              <h3 className="text-3xl font-light text-gray-900 mb-8 tracking-wide">
                What's your campaign budget?
              </h3>

              <div className="max-w-xl mx-auto space-y-8">
                <div className="space-y-6">
                  <div className="text-center">
                    <span className="text-5xl font-extralight text-gray-900 tracking-tighter">
                      €{budget.toLocaleString()}
                    </span>
                  </div>
                  
                  <Slider
                    value={[budget]}
                    onValueChange={(value) => setBudget(value[0])}
                    min={2000}
                    max={50000}
                    step={1000}
                    className="w-full"
                  />
                  
                  <div className="flex justify-between text-sm text-gray-500 font-light">
                    <span>€2,000</span>
                    <span>€50,000+</span>
                  </div>

                  <div className="mt-4">
                    <Input
                      type="number"
                      value={budget}
                      onChange={(e) => setBudget(Number(e.target.value))}
                      min={2000}
                      max={50000}
                      step={1000}
                      className="text-center text-xl font-light py-6"
                      placeholder="Enter budget in EUR"
                    />
                  </div>
                </div>

                <p className="text-gray-600 font-extralight text-lg">
                  Our average CPM is €40 – let's see what that gives you.
                </p>
              </div>

              <Button
                size="lg"
                onClick={handleBudgetSubmit}
                className="bg-red-400 hover:bg-red-500 text-white px-12 py-6 text-lg font-light tracking-wide h-auto shadow-xl hover:shadow-red-400/20 transition-all duration-300 hover:scale-105"
              >
                Calculate Estimate
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Step 3: Auto-Estimate Output */}
          {step === 3 && (
            <div className="text-center space-y-12">
              <h3 className="text-3xl font-light text-gray-900 mb-8 tracking-wide">
                Your Campaign Forecast
              </h3>

              {showEstimate && (
                <div className="animate-scale-in space-y-8">
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                      <Eye className="h-12 w-12 text-red-400 mx-auto mb-4" />
                      <div className="text-4xl font-extralight text-gray-900 mb-2 tracking-tighter">
                        {estimate.views.toLocaleString()}
                      </div>
                      <p className="text-gray-600 font-light text-lg">Estimated Views</p>
                    </div>

                    <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                      <Clock className="h-12 w-12 text-red-400 mx-auto mb-4" />
                      <div className="text-4xl font-extralight text-gray-900 mb-2 tracking-tighter">
                        {estimate.duration}
                      </div>
                      <p className="text-gray-600 font-light text-lg">Campaign Duration</p>
                    </div>

                    <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                      <Users className="h-12 w-12 text-red-400 mx-auto mb-4" />
                      <div className="text-4xl font-extralight text-gray-900 mb-2 tracking-tighter">
                        {estimate.streamers}
                      </div>
                      <p className="text-gray-600 font-light text-lg">Active Streamers</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-3xl p-8 border border-red-100">
                    <h4 className="text-2xl font-light text-gray-900 mb-4 tracking-wide">
                      Campaign Summary
                    </h4>
                    <p className="text-gray-700 font-extralight text-lg leading-relaxed">
                      Your €{budget.toLocaleString()} campaign across {selectedCountries.join(", ")} will reach 
                      <strong className="font-normal"> {estimate.views.toLocaleString()} viewers</strong> over 
                      <strong className="font-normal"> {estimate.duration}</strong> using our network of 
                      <strong className="font-normal"> {estimate.streamers}</strong>.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
                    <Button
                      size="lg"
                      className="bg-red-400 hover:bg-red-500 text-white px-12 py-6 text-lg font-light tracking-wide h-auto shadow-xl hover:shadow-red-400/20 transition-all duration-300 hover:scale-105"
                      onClick={() => window.open("https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1RiJEObf5v758exr0hi5vk0ZRP0vgGQexQeAoykItGH1-RTFV1DQOye1rJbUSAqu7TdhWhRigO", "_blank")}
                    >
                      Book a Custom Campaign
                      <ArrowRight className="ml-3 h-5 w-5" />
                    </Button>

                    <Button
                      size="lg"
                      variant="outline"
                      className="border-gray-400 text-gray-800 hover:bg-gray-50 bg-white px-12 py-6 text-lg font-light tracking-wide h-auto transition-all duration-300 hover:border-gray-500"
                      onClick={() => scrollToSection("examples")}
                    >
                      See Real Campaign Examples
                      <ExternalLink className="ml-3 h-5 w-5" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default EstimationSection;
