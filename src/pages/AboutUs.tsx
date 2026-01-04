// ============ EDIT CONTENT HERE ============
// Stats - update these numbers as needed
const STATS = {
  campaignsShipped: 150,
  nordicMarkets: 4,
  creatorsInNetwork: 500,
  avgCtrRange: "2-4",
  hoursWatchedDelivered: 2,
  repeatBrandRate: 75,
};

// Timeline milestones
const TIMELINE_MILESTONES = [
  {
    period: "2000–2018",
    title: "Roots in Frosta",
    description: "Growing up on a farm in rural Norway. Long days. Hard work. Early mornings. The foundation of everything that came later.",
    icon: "Sprout",
  },
  {
    period: "2018–2019",
    title: "Early sales years",
    description: "Moved out at 17. Sold everything from subscriptions to energy contracts. Learned that attention is the only currency.",
    icon: "TrendingUp",
  },
  {
    period: "2019–2020",
    title: "First Twitch experiments",
    description: "Started watching streams obsessively. Noticed that viewers hated pre-rolls but loved creator moments. Something clicked.",
    icon: "Monitor",
  },
  {
    period: "2020–2021",
    title: "First working overlay",
    description: "Built a rough prototype. Placed a brand inside a live stream without interrupting it. The first native ad on a Nordic stream.",
    icon: "Layers",
  },
  {
    period: "2021–2022",
    title: "First brand campaigns",
    description: "Samsung said yes. Then Komplett. Then others. Real budgets. Real results. The model worked.",
    icon: "Rocket",
  },
  {
    period: "2022–2024",
    title: "Scaling the Nordics",
    description: "Built a network of 500+ creators across Norway, Sweden, Denmark, and Finland. Became the go-to for Twitch in the region.",
    icon: "Users",
  },
  {
    period: "2024–",
    title: "Beyond the Nordics",
    description: "The playbook is proven. Now it's time to take it further. New markets. Bigger brands. Same native approach.",
    icon: "Globe",
  },
];

// ON STREAM features
const ON_STREAM_FEATURES = [
  { icon: "Layers", title: "Live overlay moments", description: "Branded visuals that appear naturally during gameplay." },
  { icon: "MessageSquare", title: "Chat CTA links", description: "Direct response mechanics inside Twitch chat." },
  { icon: "Zap", title: "Trigger based moments", description: "Ads that react to in-game events in real time." },
  { icon: "Film", title: "Creative production", description: "We design assets that feel native to each stream." },
  { icon: "Users", title: "Streamer distribution", description: "Access to 500+ vetted Nordic creators." },
  { icon: "BarChart3", title: "Reporting and learnings", description: "Clear metrics on what worked and why." },
];

// OFF STREAM features
const OFF_STREAM_FEATURES = [
  { icon: "Heart", title: "Creator relationships", description: "Long-term partnerships, not one-off deals." },
  { icon: "Shield", title: "Brand safety routines", description: "Vetting, guidelines, and ongoing monitoring." },
  { icon: "Calendar", title: "Community and events", description: "Creator meetups and brand activations." },
  { icon: "Globe", title: "Nordic focus, global ambition", description: "Deep local expertise with international standards." },
];

// What makes Beta different
const DIFFERENTIATORS = [
  {
    title: "Why old ads fail in live",
    description: "Pre-rolls get skipped. Banners get ignored. Viewers came for the streamer, not the interruption. Traditional formats break the contract.",
  },
  {
    title: "Why creators are the distribution",
    description: "Trust transfers. When a streamer uses a product, their audience notices. The creator is the channel, not the inventory.",
  },
  {
    title: "Why timing wins",
    description: "A logo that appears during a victory hits different than one that loads before the stream. Context is everything in live content.",
  },
];

// Brand safety points
const BRAND_SAFETY = [
  { icon: "UserCheck", title: "Streamer vetting", description: "Every creator is reviewed before joining the network." },
  { icon: "AlertTriangle", title: "Category restrictions", description: "No gambling, adult content, or high-risk categories." },
  { icon: "Eye", title: "Creative review", description: "All assets are approved before going live." },
  { icon: "FileText", title: "Transparent reporting", description: "Full visibility into where your brand appeared." },
];
// ============ END EDITABLE CONTENT ============

import React, { useState, useEffect, useRef } from "react";
import { Footer } from "@/components/sections/Footer";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCountUp } from "@/hooks/useCountUp";
import {
  ArrowRight,
  ArrowDown,
  Sprout,
  TrendingUp,
  Monitor,
  Layers,
  Rocket,
  Users,
  Globe,
  MessageSquare,
  Zap,
  Film,
  BarChart3,
  Heart,
  Shield,
  Calendar,
  UserCheck,
  AlertTriangle,
  Eye,
  FileText,
  X,
  Focus,
} from "lucide-react";

interface AboutUsProps {
  t: any;
  language: string;
  setLanguage: (lang: string) => void;
}

// Icon mapping
const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Sprout, TrendingUp, Monitor, Layers, Rocket, Users, Globe, MessageSquare,
  Zap, Film, BarChart3, Heart, Shield, Calendar, UserCheck, AlertTriangle, Eye, FileText,
};

// Timeline progress indicator
const TimelineProgress: React.FC<{ progress: number }> = ({ progress }) => (
  <div className="hidden lg:block fixed left-8 top-1/2 -translate-y-1/2 z-40">
    <div className="relative h-48 w-0.5 bg-border/30 rounded-full">
      <div 
        className="absolute top-0 left-0 w-full bg-primary rounded-full transition-all duration-300"
        style={{ height: `${progress * 100}%` }}
      />
      <div 
        className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary border-2 border-background shadow-lg shadow-primary/30 transition-all duration-300"
        style={{ top: `${progress * 100}%` }}
      />
    </div>
  </div>
);

// Stat card component
const StatCard: React.FC<{
  value: number;
  suffix: string;
  label: string;
  isVisible: boolean;
  delay: number;
}> = ({ value, suffix, label, isVisible, delay }) => {
  const { displayValue } = useCountUp(value, isVisible, { duration: 2000, delay });

  return (
    <div
      className={`
        text-center p-6 bg-card/30 border border-border/20 rounded-xl
        transition-all duration-700 ease-out hover:bg-card/50 hover:border-primary/30
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span className="text-4xl md:text-5xl font-bold text-foreground">
        {displayValue}{suffix}
      </span>
      <p className="text-muted-foreground mt-2 text-sm">{label}</p>
    </div>
  );
};

// Feature card component
const FeatureCard: React.FC<{
  icon: string;
  title: string;
  description: string;
  isVisible: boolean;
  delay: number;
}> = ({ icon, title, description, isVisible, delay }) => {
  const IconComponent = iconMap[icon] || Layers;

  return (
    <div
      className={`
        p-5 bg-card/20 border border-border/20 rounded-xl
        transition-all duration-500 ease-out hover:bg-card/40 hover:border-primary/30 group
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
        <IconComponent className="w-5 h-5 text-primary" />
      </div>
      <h4 className="font-semibold text-foreground mb-1">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

// Timeline milestone card
const MilestoneCard: React.FC<{
  milestone: typeof TIMELINE_MILESTONES[0];
  index: number;
  isVisible: boolean;
}> = ({ milestone, index, isVisible }) => {
  const IconComponent = iconMap[milestone.icon] || Layers;
  const isLeft = index % 2 === 0;

  return (
    <div
      className={`
        relative grid lg:grid-cols-2 gap-4 lg:gap-12 items-center
        transition-all duration-700 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Timeline dot - visible on desktop */}
      <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background z-10" />

      {/* Content */}
      <div className={`lg:${isLeft ? 'text-right pr-12' : 'col-start-2 pl-12'}`}>
        <span className="text-xs text-primary font-medium uppercase tracking-wider">{milestone.period}</span>
        <h3 className="text-xl font-bold text-foreground mt-1 mb-2">{milestone.title}</h3>
        <p className="text-muted-foreground leading-relaxed">{milestone.description}</p>
      </div>

      {/* Icon - opposite side on desktop */}
      <div className={`hidden lg:flex ${isLeft ? 'col-start-2 pl-12' : 'col-start-1 row-start-1 justify-end pr-12'}`}>
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <IconComponent className="w-6 h-6 text-primary" />
        </div>
      </div>
    </div>
  );
};

const AboutUs: React.FC<AboutUsProps> = ({ t, language, setLanguage }) => {
  const [focusMode, setFocusMode] = useState(false);
  const [timelineProgress, setTimelineProgress] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);

  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: messageRef, isVisible: messageVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: timelineSectionRef, isVisible: timelineVisible } = useScrollAnimation({ threshold: 0.05 });
  const { ref: onStreamRef, isVisible: onStreamVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: offStreamRef, isVisible: offStreamVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: diffRef, isVisible: diffVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: safetyRef, isVisible: safetyVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation({ threshold: 0.1 });

  // Track timeline scroll progress
  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const start = windowHeight * 0.8;
      const end = -rect.height + windowHeight * 0.2;
      const progress = Math.max(0, Math.min(1, (start - rect.top) / (start - end)));
      setTimelineProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scroll when focus mode is active
  useEffect(() => {
    if (focusMode) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [focusMode]);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Timeline progress indicator */}
      {timelineVisible && <TimelineProgress progress={timelineProgress} />}

      {/* Focus Mode Overlay */}
      {focusMode && (
        <div 
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex items-center justify-center p-6"
          onClick={() => setFocusMode(false)}
        >
          <div 
            className="max-w-2xl w-full bg-card border border-border/30 rounded-2xl p-8 md:p-12 relative animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setFocusMode(false)}
              className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Message from Andreas</h2>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I started Beta Ads because I believed ads in live streams could be better. Not louder. Not more intrusive. Just better.
              </p>
              <p>
                When I watch a streamer I like, I'm not there for the ads. I'm there for the person. The moment. The community. 
                And when a brand shows up in a way that respects that, it actually works.
              </p>
              <p>
                That's what we build. Native moments inside live content. Ads that feel like part of the stream, not an interruption.
              </p>
              <p>
                If you're a brand trying to reach Gen Z, you already know they skip everything. But they watch streamers for hours. 
                Let's talk about how to show up in that space the right way.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-border/30 flex items-center gap-4">
              <div className="w-1 h-8 bg-primary rounded-full" />
              <span className="font-semibold text-foreground">Andreas</span>
            </div>

            <button
              onClick={() => setFocusMode(false)}
              className="mt-8 text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
            >
              <ArrowDown className="w-4 h-4" />
              Back to scroll
            </button>
          </div>
        </div>
      )}

      {/* Section 1: Hero */}
      <section
        ref={heroRef as React.RefObject<HTMLElement>}
        className="relative min-h-screen flex items-center justify-center overflow-hidden px-6"
      >
        {/* Subtle background glow */}
        <div 
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%)',
            filter: 'blur(60px)',
            transform: 'translateZ(0)',
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Pre-headline */}
          <div
            className={`
              inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-8
              transition-all duration-700 delay-100
              ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}
          >
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm text-primary font-medium">About Beta Ads</span>
          </div>

          {/* Main headline */}
          <h1
            className={`
              text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight tracking-tight mb-6
              transition-all duration-1000 delay-200
              ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}
          >
            About Beta Ads
          </h1>

          {/* Subheadline */}
          <p
            className={`
              text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8
              transition-all duration-700 delay-400
              ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
            `}
          >
            We place native ads inside live streams, delivered through creators, measured like performance media.
          </p>

          {/* CTAs */}
          <div
            className={`
              flex flex-col sm:flex-row items-center justify-center gap-4 mb-8
              transition-all duration-700 delay-500
              ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
            `}
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-full hover:bg-primary/90 transition-all hover:scale-105"
            >
              Book a call
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground font-medium rounded-full hover:bg-card/50 transition-all"
            >
              See our work
            </Link>
          </div>

          {/* Credit line */}
          <p
            className={`
              text-sm text-muted-foreground/70
              transition-all duration-700 delay-600
              ${heroVisible ? 'opacity-100' : 'opacity-0'}
            `}
          >
            Built by Andreas from Norway.
          </p>

          {/* Focus mode button */}
          <button
            onClick={() => setFocusMode(true)}
            className={`
              mt-12 inline-flex items-center gap-2 px-4 py-2 border border-border/40 rounded-full
              text-sm text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-card/30
              transition-all duration-300
              ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}
            style={{ transitionDelay: '700ms' }}
          >
            <Focus className="w-4 h-4" />
            Tap to focus
          </button>
        </div>

        {/* Scroll indicator */}
        <div
          className={`
            absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground
            transition-all duration-700 delay-800
            ${heroVisible ? 'opacity-100' : 'opacity-0'}
          `}
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </div>
      </section>

      {/* Section 2: Message from Andreas */}
      <section
        ref={messageRef as React.RefObject<HTMLElement>}
        className="py-24 lg:py-32 px-6"
      >
        <div className="max-w-3xl mx-auto">
          <div
            className={`
              bg-card/30 border border-border/20 rounded-2xl p-8 md:p-12
              transition-all duration-700
              ${messageVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">A note from Andreas</h2>

            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                I grew up on a farm in Frosta, a small place in the middle of Norway. Long days. Physical work. Not much glamour.
                But it taught me something: if you want results, you show up and do the work.
              </p>
              <p>
                I moved out young. Sold everything I could to make rent. Learned that attention is the only thing that matters in sales.
                If people aren't listening, nothing else works.
              </p>
              <p>
                Then I found Twitch. I watched streamers for hours. I noticed something: viewers hated ads that interrupted the stream,
                but they loved moments that felt like part of it. That gap was the opportunity.
              </p>
              <p>
                I built Beta Ads to close that gap. To make advertising work inside live content without breaking the trust between
                streamers and their audience. Native. Respectful. Effective.
              </p>
              <p>
                Today, we work with some of the biggest brands in the Nordics. We have 500+ creators in our network.
                And we're just getting started.
              </p>
            </div>

            {/* Signature */}
            <div className="mt-10 pt-6 border-t border-border/30 flex items-center gap-4">
              <div className="w-1 h-8 bg-primary rounded-full" />
              <span className="font-semibold text-foreground">Andreas</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Journey Timeline */}
      <section
        ref={timelineSectionRef as React.RefObject<HTMLElement>}
        className="py-24 lg:py-32 px-6 bg-card/10"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span
              className={`
                text-sm text-primary font-medium uppercase tracking-widest
                transition-all duration-500
                ${timelineVisible ? 'opacity-100' : 'opacity-0'}
              `}
            >
              The Journey
            </span>
            <h2
              className={`
                text-3xl md:text-5xl font-bold text-foreground mt-4
                transition-all duration-700 delay-100
                ${timelineVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
              `}
            >
              How we got here
            </h2>
          </div>

          {/* Timeline */}
          <div ref={timelineRef} className="relative">
            {/* Vertical line - desktop only */}
            <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-border/30" />

            <div className="space-y-12 lg:space-y-16">
              {TIMELINE_MILESTONES.map((milestone, index) => (
                <MilestoneCard
                  key={milestone.period}
                  milestone={milestone}
                  index={index}
                  isVisible={timelineVisible}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 4a: ON STREAM */}
      <section
        ref={onStreamRef as React.RefObject<HTMLElement>}
        className="py-24 lg:py-32 px-6"
      >
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2
              className={`
                text-4xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight
                transition-all duration-700
                ${onStreamVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
              `}
            >
              ON STREAM
            </h2>
            <p
              className={`
                text-lg text-muted-foreground mt-4 max-w-xl
                transition-all duration-700 delay-100
                ${onStreamVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
              `}
            >
              What we deliver inside live streams.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ON_STREAM_FEATURES.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                isVisible={onStreamVisible}
                delay={150 + index * 80}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Section 4b: OFF STREAM */}
      <section
        ref={offStreamRef as React.RefObject<HTMLElement>}
        className="py-24 lg:py-32 px-6 bg-card/10"
      >
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2
              className={`
                text-4xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight
                transition-all duration-700
                ${offStreamVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
              `}
            >
              OFF STREAM
            </h2>
            <p
              className={`
                text-lg text-muted-foreground mt-4 max-w-xl
                transition-all duration-700 delay-100
                ${offStreamVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
              `}
            >
              What builds trust and culture behind the scenes.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {OFF_STREAM_FEATURES.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                isVisible={offStreamVisible}
                delay={150 + index * 80}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: What Makes Beta Different */}
      <section
        ref={diffRef as React.RefObject<HTMLElement>}
        className="py-24 lg:py-32 px-6"
      >
        <div className="max-w-5xl mx-auto">
          <h2
            className={`
              text-2xl md:text-4xl lg:text-5xl font-bold text-foreground text-center mb-16 leading-tight
              transition-all duration-700
              ${diffVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}
          >
            Streaming is not a billboard.<br />
            <span className="text-primary">It is a relationship.</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {DIFFERENTIATORS.map((diff, index) => (
              <div
                key={diff.title}
                className={`
                  p-6 bg-card/30 border border-border/20 rounded-xl
                  transition-all duration-700 hover:bg-card/50 hover:border-primary/30
                  ${diffVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                `}
                style={{ transitionDelay: `${150 + index * 100}ms` }}
              >
                <h3 className="text-lg font-semibold text-foreground mb-3">{diff.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{diff.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: Stats */}
      <section
        ref={statsRef as React.RefObject<HTMLElement>}
        className="py-24 lg:py-32 px-6 bg-card/10"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span
              className={`
                text-sm text-primary font-medium uppercase tracking-widest
                transition-all duration-500
                ${statsVisible ? 'opacity-100' : 'opacity-0'}
              `}
            >
              Proof
            </span>
            <h2
              className={`
                text-3xl md:text-5xl font-bold text-foreground mt-4
                transition-all duration-700 delay-100
                ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
              `}
            >
              The numbers
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <StatCard value={STATS.campaignsShipped} suffix="+" label="Campaigns shipped" isVisible={statsVisible} delay={0} />
            <StatCard value={STATS.nordicMarkets} suffix="" label="Nordic markets" isVisible={statsVisible} delay={100} />
            <StatCard value={STATS.creatorsInNetwork} suffix="+" label="Creators in network" isVisible={statsVisible} delay={200} />
            <StatCard value={parseInt(STATS.avgCtrRange.split('-')[0])} suffix={`-${STATS.avgCtrRange.split('-')[1]}%`} label="Average CTR" isVisible={statsVisible} delay={300} />
            <StatCard value={STATS.hoursWatchedDelivered} suffix="M+" label="Hours watched delivered" isVisible={statsVisible} delay={400} />
            <StatCard value={STATS.repeatBrandRate} suffix="%" label="Repeat brand rate" isVisible={statsVisible} delay={500} />
          </div>

          {/* Quote */}
          <div
            className={`
              mt-16 max-w-2xl mx-auto text-center
              transition-all duration-700 delay-600
              ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}
          >
            <blockquote className="text-xl md:text-2xl text-foreground font-light italic leading-relaxed">
              "We built Beta Ads to make streaming ads feel native, not invasive."
            </blockquote>
            <div className="mt-4 flex items-center justify-center gap-3">
              <div className="w-8 h-0.5 bg-primary rounded-full" />
              <span className="text-muted-foreground font-medium">Andreas</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Brand Safety */}
      <section
        ref={safetyRef as React.RefObject<HTMLElement>}
        className="py-24 lg:py-32 px-6"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span
              className={`
                text-sm text-primary font-medium uppercase tracking-widest
                transition-all duration-500
                ${safetyVisible ? 'opacity-100' : 'opacity-0'}
              `}
            >
              Brand Safety
            </span>
            <h2
              className={`
                text-3xl md:text-5xl font-bold text-foreground mt-4
                transition-all duration-700 delay-100
                ${safetyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
              `}
            >
              Trust is the foundation
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {BRAND_SAFETY.map((item, index) => (
              <FeatureCard
                key={item.title}
                icon={item.icon}
                title={item.title}
                description={item.description}
                isVisible={safetyVisible}
                delay={150 + index * 80}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Section 8: Final CTA */}
      <section
        ref={ctaRef as React.RefObject<HTMLElement>}
        className="py-32 lg:py-40 px-6 relative overflow-hidden"
      >
        {/* Background glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full opacity-40"
          style={{
            background: 'radial-gradient(circle, hsl(var(--primary) / 0.12) 0%, transparent 70%)',
            filter: 'blur(60px)',
            transform: 'translateZ(0)',
          }}
        />

        <div
          className={`
            relative z-10 max-w-3xl mx-auto text-center
            transition-all duration-1000
            ${ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
          `}
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-8">
            Ready to earn attention in the stream
          </h2>

          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-medium rounded-full hover:bg-primary/90 transition-all hover:scale-105"
          >
            Book a call
            <ArrowRight className="w-5 h-5" />
          </Link>

          <p className="mt-8 text-muted-foreground">
            We keep it simple. We ship. We improve.
          </p>
        </div>
      </section>

      <Footer t={t} language={language} setLanguage={setLanguage} />
    </div>
  );
};

export default AboutUs;
