/**
 * About Us Page - Beta Ads
 * Editorial, founder-led design with scrollytelling
 * 
 * ============ EDIT CONTENT HERE ============
 */

// ============ STATS ============
const STATS = {
  campaignsShipped: 150,
  nordicMarkets: 4,
  creatorsInNetwork: 500,
  avgCtr: "2-4",
  hoursWatched: 2,
  repeatRate: 75,
};

// ============ TIMELINE ============
const TIMELINE_MILESTONES = [
  {
    period: "1990s–2010s",
    title: "Roots in Frosta",
    description: "Growing up on a farm in Norway taught me that good work means showing up, every single day. No shortcuts.",
  },
  {
    period: "2010s",
    title: "Learning to sell",
    description: "Moved out young. Worked in sales, learned to talk to people, and figured out what actually makes someone say yes.",
  },
  {
    period: "2017–2018",
    title: "Discovering Twitch",
    description: "Found Twitch and understood immediately: this is where attention lives now. Live, unfiltered, real.",
  },
  {
    period: "2019",
    title: "First overlay experiments",
    description: "Started testing overlay ads in streams. Most failed. But the ones that felt native? They worked.",
  },
  {
    period: "2020–2021",
    title: "First brand campaigns",
    description: "Landed real brand deals. Proved that native streaming ads could deliver performance, not just impressions.",
  },
  {
    period: "2022–2023",
    title: "Scaling the Nordic network",
    description: "Built a network of creators across Norway, Sweden, Denmark, and Finland. Quality over quantity.",
  },
  {
    period: "2024–",
    title: "Beyond the Nordics",
    description: "Now we're ready. The playbook works. Time to take it further.",
  },
];

// ============ ON STREAM FEATURES ============
const ON_STREAM_FEATURES = [
  { title: "Live overlay moments", description: "Branded overlays that appear during natural stream moments" },
  { title: "Chat CTA links", description: "Clickable calls-to-action that live in chat" },
  { title: "Trigger based moments", description: "Ads that fire on gameplay events or viewer milestones" },
  { title: "Creative production", description: "We handle the creative so it fits the stream" },
  { title: "Streamer distribution", description: "Access to vetted Nordic creators" },
  { title: "Reporting and learnings", description: "Real performance data after every campaign" },
];

// ============ OFF STREAM ITEMS ============
const OFF_STREAM_ITEMS = [
  { number: "01", title: "Creator relationships", description: "We work with creators long-term. No one-off deals." },
  { number: "02", title: "Brand safety routines", description: "Every stream is monitored. Every creator is vetted." },
  { number: "03", title: "Community and events", description: "We show up. LAN parties, meetups, industry events." },
  { number: "04", title: "Nordic focus, global ambition", description: "Deep roots in the Nordics. Ready to expand." },
];

// ============ DIFFERENTIATORS ============
const DIFFERENTIATORS = [
  { 
    title: "Old ads fail in live environments", 
    description: "Pre-roll interrupts. Banners get ignored. Viewers have ad-blindness. The only way to win attention is to earn it inside the stream." 
  },
  { 
    title: "Creators are the distribution", 
    description: "The streamer is not just a channel. They are the relationship. Their endorsement means everything." 
  },
  { 
    title: "Timing and integration wins", 
    description: "When an ad appears at the right moment, in the right format, it feels like content. That's when performance happens." 
  },
];

// ============ BRAND SAFETY ============
const BRAND_SAFETY = {
  left: [
    { title: "Streamer vetting", items: ["Background checks", "Content history review", "Audience quality analysis"] },
    { title: "Category restrictions", items: ["No gambling streams", "No controversial content", "Family-safe by default"] },
  ],
  right: [
    { title: "Creative review", items: ["Every asset approved", "Brand guidelines enforced", "Context-aware placement"] },
    { title: "Transparent reporting", items: ["Full visibility on placements", "Real-time monitoring", "Post-campaign analysis"] },
  ],
};

// ============ END EDITABLE CONTENT ============

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Footer } from '@/components/sections/Footer';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useCountUp } from '@/hooks/useCountUp';

interface AboutUsProps {
  t: any;
  language: string;
  setLanguage: (lang: string) => void;
}

const AboutUs: React.FC<AboutUsProps> = ({ t, language, setLanguage }) => {
  const [focusMode, setFocusMode] = useState(false);
  const [timelineProgress, setTimelineProgress] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  
  const heroAnimation = useScrollAnimation({ threshold: 0.1 });
  const founderAnimation = useScrollAnimation({ threshold: 0.1 });
  const timelineAnimation = useScrollAnimation({ threshold: 0.05 });
  const onStreamAnimation = useScrollAnimation({ threshold: 0.1 });
  const offStreamAnimation = useScrollAnimation({ threshold: 0.1 });
  const differentiatorAnimation = useScrollAnimation({ threshold: 0.1 });
  const statsAnimation = useScrollAnimation({ threshold: 0.1 });
  const brandSafetyAnimation = useScrollAnimation({ threshold: 0.1 });
  const ctaAnimation = useScrollAnimation({ threshold: 0.1 });

  // Stats with count-up animation
  const campaignsCount = useCountUp(STATS.campaignsShipped, statsAnimation.isVisible, { duration: 2000 });
  const marketsCount = useCountUp(STATS.nordicMarkets, statsAnimation.isVisible, { duration: 1500 });
  const creatorsCount = useCountUp(STATS.creatorsInNetwork, statsAnimation.isVisible, { duration: 2000 });
  const hoursCount = useCountUp(STATS.hoursWatched, statsAnimation.isVisible, { duration: 1500 });
  const repeatCount = useCountUp(STATS.repeatRate, statsAnimation.isVisible, { duration: 2000 });

  // Timeline scroll progress
  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementTop = rect.top;
      const elementHeight = rect.height;
      
      if (elementTop > windowHeight) {
        setTimelineProgress(0);
      } else if (elementTop + elementHeight < 0) {
        setTimelineProgress(100);
      } else {
        const visibleStart = Math.max(0, windowHeight - elementTop);
        const progress = Math.min(100, (visibleStart / (elementHeight + windowHeight * 0.5)) * 100);
        setTimelineProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock scroll when focus mode is active
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
    <div className="min-h-screen bg-background text-foreground">
      
      {/* Section 1: Hero */}
      <section 
        ref={heroAnimation.ref}
        className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-32 pb-20"
      >
        <div className={`max-w-7xl transition-all duration-1000 ${heroAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-extralight tracking-tighter leading-[0.85] mb-8">
            About
            <br />
            <span className="text-primary">Beta</span> Ads
          </h1>
          
          <div className="max-w-md mt-12 mb-16">
            <p className="text-lg text-muted-foreground leading-relaxed">
              We place native ads inside live streams, delivered through creators, measured like performance media.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button asChild size="lg" className="group">
              <Link to="/contact">
                Book a call
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/case-studies">See our work</Link>
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <p className="text-sm text-muted-foreground">Built by Andreas from Norway</p>
            <button
              onClick={() => setFocusMode(true)}
              className="text-xs uppercase tracking-widest text-primary hover:text-primary/80 transition-colors"
            >
              Tap to focus →
            </button>
          </div>
        </div>
      </section>

      {/* Focus Mode Overlay */}
      {focusMode && (
        <div 
          className="fixed inset-0 z-50 bg-background/98 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setFocusMode(false)}
        >
          <div 
            className="max-w-2xl animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-xs uppercase tracking-widest text-primary mb-8">Message from Andreas</p>
            <p className="text-2xl md:text-3xl font-light leading-relaxed text-foreground/90 mb-8">
              I started Beta because I believed ads in streams could feel like content, not interruption.
              <br /><br />
              Most people said it wouldn't work. They were wrong.
            </p>
            <button
              onClick={() => setFocusMode(false)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to scroll
            </button>
          </div>
        </div>
      )}

      {/* Section 2: Founder Note - Editorial Style */}
      <section 
        ref={founderAnimation.ref}
        className="py-32 px-6 md:px-12 lg:px-24"
      >
        <div className={`max-w-7xl mx-auto transition-all duration-1000 delay-200 ${founderAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex">
            {/* Red accent bar */}
            <div className="hidden md:block w-px bg-primary/60 mr-12 self-stretch" />
            
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-widest text-primary mb-12">From the founder</p>
              
              <div className="space-y-8 text-xl md:text-2xl font-light leading-relaxed text-foreground/80">
                <p>
                  I grew up on a farm in Frosta, Norway. Work was never optional. 
                  You showed up, you did the job, you improved tomorrow.
                </p>
                <p>
                  I left home young. Worked in sales. Learned that trust is earned 
                  in small moments, not big pitches.
                </p>
                <p>
                  When I found Twitch, I saw something different. A new kind of 
                  attention. Real, live, earned. And I realized that advertising 
                  here couldn't work the old way.
                </p>
                <p>
                  So I built Beta. To make streaming ads that feel native, 
                  not invasive. That respect the viewer. That actually work.
                </p>
              </div>

              <div className="mt-16 flex items-center gap-4">
                <div className="w-12 h-px bg-primary" />
                <p className="text-lg italic text-primary">Andreas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Timeline */}
      <section 
        ref={timelineRef}
        className="py-32 px-6 md:px-12 lg:px-24 relative"
      >
        <div 
          ref={timelineAnimation.ref}
          className={`max-w-7xl mx-auto transition-all duration-1000 ${timelineAnimation.isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          <p className="text-xs uppercase tracking-widest text-primary mb-4">The journey</p>
          <h2 className="text-5xl md:text-7xl font-extralight tracking-tight mb-24">How we got here</h2>

          {/* Desktop progress indicator */}
          <div className="hidden lg:block fixed right-8 top-1/2 -translate-y-1/2 z-40">
            <div className="w-1 h-32 bg-border/20 rounded-full overflow-hidden">
              <div 
                className="w-full bg-primary transition-all duration-300 rounded-full"
                style={{ height: `${timelineProgress}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">{Math.round(timelineProgress)}%</p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical rail */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border/30 md:-translate-x-px" />

            {TIMELINE_MILESTONES.map((milestone, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <div 
                  key={index}
                  className={`relative flex items-start mb-20 last:mb-0 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Dot on rail */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-primary rounded-full -translate-x-1/2 mt-2 z-10" />
                  
                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                    <span className="text-xs uppercase tracking-widest text-muted-foreground">{milestone.period}</span>
                    <h3 className="text-2xl font-light mt-2 mb-3">{milestone.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{milestone.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 4a: ON STREAM */}
      <section 
        ref={onStreamAnimation.ref}
        className="py-32 px-6 md:px-12 lg:px-24 border-t border-border/10"
      >
        <div className={`max-w-7xl mx-auto transition-all duration-1000 ${onStreamAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs uppercase tracking-widest text-primary mb-4">What we deliver</p>
          <h2 className="text-7xl md:text-9xl font-extralight tracking-tighter mb-24">
            On<br />Stream
          </h2>

          {/* Feature Rail */}
          <div className="space-y-0">
            {ON_STREAM_FEATURES.map((feature, index) => (
              <div 
                key={index}
                className="group py-6 border-t border-border/20 first:border-t-0 flex flex-col md:flex-row md:items-center gap-2 md:gap-8 hover:bg-card/30 transition-colors px-4 -mx-4"
              >
                <h3 className="text-lg font-medium md:w-56 shrink-0">{feature.title}</h3>
                <p className="text-muted-foreground text-sm md:opacity-60 group-hover:opacity-100 transition-opacity">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4b: OFF STREAM */}
      <section 
        ref={offStreamAnimation.ref}
        className="py-32 px-6 md:px-12 lg:px-24"
      >
        <div className={`max-w-7xl mx-auto transition-all duration-1000 ${offStreamAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs uppercase tracking-widest text-primary mb-4">Beyond the stream</p>
          <h2 className="text-7xl md:text-9xl font-extralight tracking-tighter mb-24">
            Off<br />Stream
          </h2>

          {/* Staggered Callouts */}
          <div className="space-y-16">
            {OFF_STREAM_ITEMS.map((item, index) => (
              <div 
                key={index}
                className="flex gap-6 md:gap-12"
                style={{ marginLeft: `${index * 3}%` }}
              >
                <span className="text-6xl md:text-8xl font-extralight text-primary/20">{item.number}</span>
                <div className="pt-4">
                  <h3 className="text-xl font-medium mb-2">{item.title}</h3>
                  <p className="text-muted-foreground max-w-md">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: What Makes Beta Different */}
      <section 
        ref={differentiatorAnimation.ref}
        className="py-32 px-6 md:px-12 lg:px-24 border-t border-border/10"
      >
        <div className={`max-w-7xl mx-auto transition-all duration-1000 ${differentiatorAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-extralight tracking-tight leading-tight mb-24">
            Streaming is not a billboard.
            <br />
            <span className="text-primary">It is a relationship.</span>
          </h2>

          <div className="space-y-16 max-w-3xl">
            {DIFFERENTIATORS.map((item, index) => (
              <div key={index} className="flex gap-6">
                <div className="w-2 h-2 rounded-full bg-primary mt-3 shrink-0" />
                <div>
                  <h3 className="text-xl font-medium mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: Stats Strip */}
      <section 
        ref={statsAnimation.ref}
        className="py-32 px-6 md:px-12 lg:px-24 border-t border-border/10"
      >
        <div className={`max-w-7xl mx-auto transition-all duration-1000 ${statsAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs uppercase tracking-widest text-primary mb-16">The numbers</p>
          
          {/* Stats Strip */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-0 lg:divide-x lg:divide-border/20 mb-24">
            <div className="lg:px-6 first:lg:pl-0 last:lg:pr-0">
              <p className="text-4xl md:text-5xl font-extralight text-primary">{campaignsCount.displayValue}+</p>
              <p className="text-sm text-muted-foreground mt-2">Campaigns shipped</p>
            </div>
            <div className="lg:px-6">
              <p className="text-4xl md:text-5xl font-extralight text-primary">{marketsCount.displayValue}</p>
              <p className="text-sm text-muted-foreground mt-2">Nordic markets</p>
            </div>
            <div className="lg:px-6">
              <p className="text-4xl md:text-5xl font-extralight text-primary">{creatorsCount.displayValue}+</p>
              <p className="text-sm text-muted-foreground mt-2">Creators in network</p>
            </div>
            <div className="lg:px-6">
              <p className="text-4xl md:text-5xl font-extralight text-primary">{STATS.avgCtr}%</p>
              <p className="text-sm text-muted-foreground mt-2">Average CTR range</p>
            </div>
            <div className="lg:px-6">
              <p className="text-4xl md:text-5xl font-extralight text-primary">{hoursCount.displayValue}M+</p>
              <p className="text-sm text-muted-foreground mt-2">Hours watched</p>
            </div>
            <div className="lg:px-6 last:lg:pr-0">
              <p className="text-4xl md:text-5xl font-extralight text-primary">{repeatCount.displayValue}%</p>
              <p className="text-sm text-muted-foreground mt-2">Repeat brand rate</p>
            </div>
          </div>

          {/* Quote */}
          <div className="max-w-2xl">
            <blockquote className="text-2xl md:text-3xl font-light italic text-foreground/80 leading-relaxed">
              "We built Beta Ads to make streaming ads feel native, not invasive."
            </blockquote>
            <div className="mt-8 flex items-center gap-4">
              <div className="w-12 h-px bg-primary" />
              <p className="text-primary">Andreas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Brand Safety */}
      <section 
        ref={brandSafetyAnimation.ref}
        className="py-32 px-6 md:px-12 lg:px-24 border-t border-border/10"
      >
        <div className={`max-w-7xl mx-auto transition-all duration-1000 ${brandSafetyAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs uppercase tracking-widest text-primary mb-4">Brand safety</p>
          <h2 className="text-4xl md:text-5xl font-extralight tracking-tight mb-16">
            Your brand is protected
          </h2>

          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-12">
              {BRAND_SAFETY.left.map((block, index) => (
                <div key={index}>
                  <h3 className="text-lg font-medium mb-4">{block.title}</h3>
                  <ul className="space-y-2">
                    {block.items.map((item, i) => (
                      <li key={i} className="text-muted-foreground flex items-start gap-3">
                        <span className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="space-y-12">
              {BRAND_SAFETY.right.map((block, index) => (
                <div key={index}>
                  <h3 className="text-lg font-medium mb-4">{block.title}</h3>
                  <ul className="space-y-2">
                    {block.items.map((item, i) => (
                      <li key={i} className="text-muted-foreground flex items-start gap-3">
                        <span className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: Final CTA */}
      <section 
        ref={ctaAnimation.ref}
        className="py-32 px-6 md:px-12 lg:px-24 border-t border-border/10"
      >
        <div className={`max-w-7xl mx-auto text-center transition-all duration-1000 ${ctaAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-extralight tracking-tight mb-12">
            Ready to earn attention
            <br />
            <span className="text-primary">in the stream</span>
          </h2>
          
          <Button asChild size="lg" className="mb-8">
            <Link to="/contact">
              Book a call
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          
          <p className="text-muted-foreground">
            We keep it simple. We ship. We improve.
          </p>
        </div>
      </section>

      <Footer t={t} language={language} setLanguage={setLanguage} />
    </div>
  );
};

export default AboutUs;
