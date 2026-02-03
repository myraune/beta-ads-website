import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Zap, DollarSign, Play } from "lucide-react";

interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const steps: Step[] = [
  {
    id: 1,
    title: "Go live",
    description: "Stream like you normally do on Twitch, YouTube, or Kick.",
    icon: <Play className="w-5 h-5" />,
  },
  {
    id: 2,
    title: "Accept offers",
    description: "Browse brand sponsorships and accept the ones that fit.",
    icon: <Check className="w-5 h-5" />,
  },
  {
    id: 3,
    title: "Ads run natively",
    description: "Sponsored content appears seamlessly in your stream.",
    icon: <Zap className="w-5 h-5" />,
  },
  {
    id: 4,
    title: "Get paid",
    description: "Monthly payouts based on your actual performance.",
    icon: <DollarSign className="w-5 h-5" />,
  },
];

export const StreamerExperience: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleStepClick = (index: number) => {
    setActiveStep(index);
    setIsAutoPlaying(false);
  };

  return (
    <section id="streamer-experience" className="py-24 lg:py-32">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 lg:mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            How it works
          </h2>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">
            From going live to getting paid—in four simple steps.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-center">
          {/* Left: Steps */}
          <div className="space-y-4">
            {steps.map((step, index) => (
              <motion.button
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                onClick={() => handleStepClick(index)}
                className={`w-full text-left p-5 rounded-xl transition-all duration-300 ${
                  activeStep === index
                    ? "bg-primary/10 border-l-2 border-primary"
                    : "bg-card/5 hover:bg-card/10 border-l-2 border-transparent"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                      activeStep === index
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted/30 text-muted-foreground"
                    }`}
                  >
                    {step.icon}
                  </div>
                  <div>
                    <h3
                      className={`font-semibold text-lg mb-1 transition-colors ${
                        activeStep === index ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`text-sm transition-colors ${
                        activeStep === index ? "text-muted-foreground" : "text-muted-foreground/60"
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Right: Visual Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-xl overflow-hidden bg-[#18181b] shadow-2xl shadow-black/30 aspect-video">
              <AnimatePresence mode="wait">
                {/* Step 1: Go live */}
                {activeStep === 0 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a]"
                  >
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4 animate-pulse">
                        <div className="w-4 h-4 rounded-full bg-red-500" />
                      </div>
                      <p className="text-white text-lg font-medium">You're live!</p>
                      <p className="text-white/40 text-sm mt-1">847 viewers watching</p>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Accept offers */}
                {activeStep === 1 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 p-6 bg-[#0e0e10]"
                  >
                    <div className="space-y-3">
                      <div className="text-white/60 text-xs uppercase tracking-wider mb-4">Available offers</div>
                      {[
                        { brand: "Glorious", amount: "$45", color: "from-pink-500 to-purple-600" },
                        { brand: "Surfshark", amount: "$62", color: "from-cyan-500 to-blue-600" },
                        { brand: "Logitech", amount: "$38", color: "from-blue-500 to-indigo-600" },
                      ].map((offer, i) => (
                        <motion.div
                          key={offer.brand}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.15 }}
                          className="flex items-center justify-between bg-white/5 rounded-lg p-3"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${offer.color}`} />
                            <span className="text-white font-medium text-sm">{offer.brand}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-primary font-semibold">{offer.amount}</span>
                            <button className="bg-primary/20 text-primary text-xs px-3 py-1 rounded-md font-medium">
                              Accept
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Ads run natively */}
                {activeStep === 2 && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a]"
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-48 h-48 rounded-full bg-primary/10 blur-3xl" />
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="absolute bottom-4 left-4 right-4"
                    >
                      <div className="bg-black/60 backdrop-blur-sm rounded-lg px-4 py-3 flex items-center justify-between border border-white/10">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-purple-600" />
                          <div>
                            <span className="text-white text-sm font-medium block">Glorious Gaming</span>
                            <span className="text-white/50 text-xs">Use code STREAM20</span>
                          </div>
                        </div>
                        <span className="text-primary text-sm font-medium">!glorious</span>
                      </div>
                    </motion.div>
                  </motion.div>
                )}

                {/* Step 4: Get paid */}
                {activeStep === 3 && (
                  <motion.div
                    key="step-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 p-6 bg-[#0e0e10] flex flex-col justify-center items-center"
                  >
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="text-center"
                    >
                      <div className="text-6xl lg:text-7xl font-bold text-primary mb-2">$847</div>
                      <p className="text-white/60 text-sm">This month's earnings</p>
                      <div className="mt-6 flex items-center justify-center gap-6 text-sm">
                        <div>
                          <span className="text-white font-medium block">12</span>
                          <span className="text-white/40">campaigns</span>
                        </div>
                        <div className="w-px h-8 bg-white/10" />
                        <div>
                          <span className="text-white font-medium block">145K</span>
                          <span className="text-white/40">impressions</span>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Progress indicators */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleStepClick(index)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    activeStep === index ? "w-8 bg-primary" : "w-2 bg-muted/30"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
