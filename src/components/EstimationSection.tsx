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
    path: "M45,10 L48,8 L52,12 L50,18 L52,25 L48,35 L45,45 L42,55 L40,65 L38,75 L35,80 L32,75 L30,65 L28,50 L25,40 L28,30 L32,25 L35,20 L40,15 L42,12 Z",
    color: "text-red-400"
  },
  {
    name: "Sweden", 
    path: "M55,15 L58,12 L62,15 L65,20 L68,30 L70,40 L72,55 L70,70 L65,80 L60,85 L55,80 L52,70 L50,55 L48,40 L50,30 L52,25 L55,20 Z",
    color: "text-blue-400"
  },
  {
    name: "Denmark",
    path: "M35,70 L40,68 L45,70 L48,75 L45,80 L40,82 L35,80 L32,75 Z M25,65 L30,63 L35,65 L32,70 L28,72 L25,70 Z M20,75 L25,73 L28,75 L25,78 L22,80 L20,78 Z",
    color: "text-green-400"
  },
  {
    name: "Finland",
    path: "M75,8 L80,5 L85,8 L90,12 L95,20 L98,30 L95,40 L92,50 L88,60 L85,70 L80,75 L75,70 L72,60 L70,50 L72,40 L75,30 L78,20 L75,15 Z",
    color: "text-purple-400"
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
              
              <div className="relative max-w-2xl mx-auto">
                <svg 
                  viewBox="0 0 120 100" 
                  className="w-full h-80 mx-auto"
                  style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))' }}
                >
                  {countries.map((country) => (
                    <g key={country.name}>
                      <path
                        d={country.path}
                        className={`cursor-pointer transition-all duration-300 ${
                          selectedCountries.includes(country.name)
                            ? 'fill-red-400 stroke-red-500 stroke-2'
                            : 'fill-gray-200 hover:fill-gray-300 stroke-gray-300 stroke-1'
                        }`}
                        onClick={() => handleCountrySelect(country.name)}
                      />
                      <text
                        x={country.name === "Norway" ? "38" : country.name === "Sweden" ? "60" : country.name === "Denmark" ? "38" : "82"}
                        y={country.name === "Norway" ? "45" : country.name === "Sweden" ? "50" : country.name === "Denmark" ? "85" : "42"}
                        className="text-sm font-light fill-gray-700 pointer-events-none text-center"
                        textAnchor="middle"
                      >
                        {country.name}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>

              <div className="space-y-4">
                <p className="text-gray-600 font-extralight text-lg">
                  Click to select countries • {selectedCountries.length} selected
                </p>
                {selectedCountries.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-3">
                    {selectedCountries.map((country) => (
                      <span key={country} className="bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-light">
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
