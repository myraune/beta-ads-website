import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Gift, Wallet, BarChart3, ArrowRight, Zap, Users, Shield,
  CheckCircle2, Twitch, Youtube
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface StreamerSectionProps {
  t: any;
  language: string;
}

// Brand logos that work with Beta Ads streamers
const brandLogos = [
  { src: "/lovable-uploads/logo-surfshark.png", alt: "Surfshark", scale: "scale-90" },
  { src: "/lovable-uploads/logo-logitech.png", alt: "Logitech", scale: "scale-100" },
  { src: "/lovable-uploads/logo-steelseries.png", alt: "SteelSeries", scale: "scale-110" },
  { src: "/lovable-uploads/logo-shure.png", alt: "Shure", scale: "scale-90" },
  { src: "/lovable-uploads/logo-foodora.png", alt: "Foodora", scale: "scale-90" },
  { src: "/lovable-uploads/logo-dentsu.png", alt: "Dentsu", scale: "scale-75" },
];

const features = [
  {
    icon: Gift,
    title: "Easy Sponsorships",
    description: "Browse available campaigns, accept with one click. Pre-written scripts and brand guidelines included."
  },
  {
    icon: Wallet,
    title: "Get Paid Monthly",
    description: "Earn per impression (RPM). Track your earnings and request payouts directly from the platform."
  },
  {
    icon: BarChart3,
    title: "See Your Stats",
    description: "Real-time analytics on views, clicks, and earnings. Know exactly how your content performs."
  }
];

const steps = [
  {
    number: "01",
    title: "Connect your stream",
    description: "Sign in with Twitch, Kick, YouTube, or Trovo. Instant setup, no technical knowledge required.",
    icons: [Twitch, Youtube]
  },
  {
    number: "02",
    title: "Accept sponsorships",
    description: "Browse campaigns and accept the ones you like. Full creative control, pre-made scripts provided."
  },
  {
    number: "03",
    title: "Get paid",
    description: "Ads run automatically during your stream. You get paid monthly based on your RPM."
  }
];

const benefits = [
  "No minimum follower count",
  "Works with Twitch, Kick, YouTube, Trovo",
  "Get paid within 30 days",
  "Full creative control",
  "Pre-made scripts & guidelines",
  "Real-time earnings dashboard"
];

export const StreamerSection: React.FC<StreamerSectionProps> = ({ t, language }) => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  const { ref: featuresRef, isVisible: featuresVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  const { ref: stepsRef, isVisible: stepsVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  const { ref: brandsRef, isVisible: brandsVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="min-h-[80vh] flex items-center justify-center relative overflow-hidden">
        {/* Aurora glow effect */}
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] -translate-y-1/2 translate-x-1/4">
          <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-primary/5 to-transparent blur-3xl animate-pulse" />
        </div>
        
        <div 
          ref={heroRef}
          className={`max-w-7xl mx-auto px-4 lg:px-8 w-full transition-all duration-1000 ${
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="text-primary/80 text-sm font-medium tracking-wider uppercase">
                  For Streamers
                </span>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[0.95]">
                  Get paid to stream.
                  <br />
                  <span className="text-muted-foreground">No extra work.</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-md">
                  Monetize your stream with native sponsorships that feel part of your content, not interruptions.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 px-8"
                  onClick={() => window.open("https://beta.streamer.livad.stream/login", "_blank")}
                >
                  Join Beta Ads
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-border/50 hover:bg-card/50 gap-2"
                  onClick={() => window.open("https://discord.gg/betaads", "_blank")}
                >
                  Join Discord
                </Button>
              </div>
            </div>

            {/* Right: Visual element */}
            <div className="relative hidden lg:block">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border/30 bg-card/20 backdrop-blur-sm">
                <img 
                  src="/lovable-uploads/streamer-dashboard-sponsors.png" 
                  alt="Beta Ads streamer dashboard showing available sponsorships"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-20 lg:py-28">
        <div 
          ref={featuresRef}
          className={`max-w-6xl mx-auto px-4 lg:px-8 transition-all duration-1000 delay-100 ${
            featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why streamers love Beta Ads
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to monetize your stream, without the hassle.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-8 transition-all duration-500 hover:border-primary/30 hover:bg-card/50`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 lg:py-28 bg-card/20">
        <div 
          ref={stepsRef}
          className={`max-w-6xl mx-auto px-4 lg:px-8 transition-all duration-1000 ${
            stepsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How it works
            </h2>
            <p className="text-muted-foreground text-lg">
              Start earning in three simple steps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div 
                key={index}
                className="relative"
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[calc(100%-20%)] h-px bg-gradient-to-r from-border to-transparent" />
                )}
                
                <div className="space-y-4">
                  <span className="text-5xl font-bold text-primary/20">
                    {step.number}
                  </span>
                  <h3 className="text-xl font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Benefits list */}
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 text-muted-foreground"
              >
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted by Brands Section */}
      <section className="py-20 lg:py-28">
        <div 
          ref={brandsRef}
          className={`max-w-6xl mx-auto px-4 lg:px-8 transition-all duration-1000 ${
            brandsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Earn from brands like these
            </h2>
            <p className="text-muted-foreground">
              Join 500+ streamers already earning with Beta Ads.
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
            {brandLogos.map((logo, index) => (
              <div 
                key={index}
                className={`h-10 w-28 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity ${logo.scale}`}
              >
                <img 
                  src={logo.src} 
                  alt={logo.alt}
                  className="max-h-full max-w-full object-contain filter brightness-0 invert"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28">
        <div 
          ref={ctaRef}
          className={`max-w-4xl mx-auto px-4 lg:px-8 text-center transition-all duration-1000 ${
            ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="bg-gradient-to-br from-card/60 to-card/30 backdrop-blur-sm border border-border/50 rounded-3xl p-12 lg:p-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Ready to start earning?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Sign up in seconds. Start earning from your next stream.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 px-10 py-6 text-lg"
                onClick={() => window.open("https://beta.streamer.livad.stream/login", "_blank")}
              >
                Join Beta Ads
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-border/50 hover:bg-card/50 gap-2 px-8 py-6 text-lg"
                onClick={() => window.open("https://discord.gg/betaads", "_blank")}
              >
                Join Discord
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
