import React from "react";
import { SEO } from "@/components/SEO";
import { Timeline } from "@/components/ui/timeline";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const imgClass =
  "rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]";

const timelineData = [
  {
    title: "2026",
    content: (
      <div>
        <p className="text-foreground text-xs md:text-sm font-semibold mb-2">
          Beta 2.0 — Self-Service Campaign Platform
        </p>
        <p className="text-muted-foreground text-xs md:text-sm font-normal mb-6">
          We launched Beta 2.0, a completely rebuilt self-service platform designed for media agencies and brands. Run campaigns across hundreds of streamers simultaneously, with AI-powered analytics that track when streamers mention your brand on stream — delivering real-time sentiment and exposure data.
        </p>
        <div className="mb-8 space-y-2">
          <div className="flex gap-2 items-center text-muted-foreground text-xs md:text-sm">
            🚀 Launched Beta 2.0 self-service campaign platform
          </div>
          <div className="flex gap-2 items-center text-muted-foreground text-xs md:text-sm">
            🤖 AI-powered brand mention tracking and sentiment analysis
          </div>
          <div className="flex gap-2 items-center text-muted-foreground text-xs md:text-sm">
            📊 Real-time campaign statistics and performance dashboards
          </div>
          <div className="flex gap-2 items-center text-muted-foreground text-xs md:text-sm">
            🏢 Built for media agencies and enterprise brands
          </div>
          <div className="flex gap-2 items-center text-muted-foreground text-xs md:text-sm">
            🌍 Expanding across the Nordics — Norway, Sweden, Finland
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop"
            alt="SaaS analytics dashboard on laptop"
            className={imgClass}
          />
          <img
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop"
            alt="Marketing data and campaign metrics"
            className={imgClass}
          />
        </div>
      </div>
    ),
  },
  {
    title: "2025",
    content: (
      <div>
        <p className="text-foreground text-xs md:text-sm font-semibold mb-2">
          First Full Year — 10+ Campaigns, 100 Streamers
        </p>
        <p className="text-muted-foreground text-xs md:text-sm font-normal mb-6">
          Our first full year of business. We delivered over 10 campaigns for major brands including Samsung, Foodora, and Shure, working with 100 Nordic streamers. Native overlay ads proved their value — bypassing adblock, achieving 100% viewability, and consistently outperforming traditional video ads on engagement.
        </p>
        <div className="mb-8 space-y-2">
          <div className="flex gap-2 items-center text-muted-foreground text-xs md:text-sm">
            ✅ 10+ campaigns delivered for Samsung, Foodora, Shure and more
          </div>
          <div className="flex gap-2 items-center text-muted-foreground text-xs md:text-sm">
            ✅ Worked with 100 Nordic streamers across Twitch
          </div>
          <div className="flex gap-2 items-center text-muted-foreground text-xs md:text-sm">
            ✅ 100% viewability — ads can't be skipped or blocked
          </div>
          <div className="flex gap-2 items-center text-muted-foreground text-xs md:text-sm">
            ✅ 3-5x higher engagement than traditional video ads
          </div>
          <div className="flex gap-2 items-center text-muted-foreground text-xs md:text-sm">
            ✅ Proven ROI model for brands targeting Gen Z
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <img
            src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&h=300&fit=crop"
            alt="Professional gaming and streaming setup"
            className={imgClass}
          />
          <img
            src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=500&h=300&fit=crop"
            alt="Team celebrating campaign success"
            className={imgClass}
          />
          <img
            src="https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=500&h=300&fit=crop"
            alt="Live streaming content creator"
            className={imgClass}
          />
          <img
            src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500&h=300&fit=crop"
            alt="Brand strategy and campaign planning"
            className={imgClass}
          />
        </div>
      </div>
    ),
  },
  {
    title: "2024",
    content: (
      <div>
        <p className="text-foreground text-xs md:text-sm font-semibold mb-2">
          Beta 1.0 — The Software Launch
        </p>
        <p className="text-muted-foreground text-xs md:text-sm font-normal mb-6">
          We launched Beta 1.0 — our first software platform for collaborating with Nordic Twitch streamers at scale. Built in partnership with a Polish software development team, the platform enabled brands to deploy animated overlays directly onto live streams. This was the moment Beta Ads went from a talent agency to a tech company.
        </p>
        <div className="mb-8 space-y-2">
          <div className="flex gap-2 items-center text-muted-foreground text-xs md:text-sm">
            🛠️ Launched Beta 1.0 software platform
          </div>
          <div className="flex gap-2 items-center text-muted-foreground text-xs md:text-sm">
            🤝 Built in collaboration with a Polish software company
          </div>
          <div className="flex gap-2 items-center text-muted-foreground text-xs md:text-sm">
            🎨 Started deploying animated overlay ads on streams
          </div>
          <div className="flex gap-2 items-center text-muted-foreground text-xs md:text-sm">
            📡 Streamlined multi-streamer campaign management
          </div>
          <div className="flex gap-2 items-center text-muted-foreground text-xs md:text-sm">
            🇳🇴 Focus on Nordic Twitch streamers
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <img
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=300&fit=crop"
            alt="Software development and coding"
            className={imgClass}
          />
          <img
            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&h=300&fit=crop"
            alt="Motion graphics and animation design"
            className={imgClass}
          />
        </div>
      </div>
    ),
  },
  {
    title: "2023",
    content: (
      <div>
        <p className="text-foreground text-xs md:text-sm font-semibold mb-2">
          The Talent Agency — Where It All Started
        </p>
        <p className="text-muted-foreground text-xs md:text-sm font-normal mb-6">
          Beta Ads launched as a talent agency, working with 5+ of the biggest Twitch streamers in Norway. We started with simple logo placement deals — getting brand logos onto streams. It was manual, but it proved the concept: brands wanted to be on streams, and streamers wanted easy ways to monetize. We knew there was something much bigger here.
        </p>
        <div className="mb-8 space-y-2">
          <div className="flex gap-2 items-center text-muted-foreground text-xs md:text-sm">
            🎬 Launched as a Twitch talent agency in Norway
          </div>
          <div className="flex gap-2 items-center text-muted-foreground text-xs md:text-sm">
            🇳🇴 Worked with 5+ of Norway's biggest Twitch streamers
          </div>
          <div className="flex gap-2 items-center text-muted-foreground text-xs md:text-sm">
            🏷️ Simple logo placement deals for brands
          </div>
          <div className="flex gap-2 items-center text-muted-foreground text-xs md:text-sm">
            💡 Validated that brands want native stream presence
          </div>
          <div className="flex gap-2 items-center text-muted-foreground text-xs md:text-sm">
            📈 Proved streamer monetization without forced integrations
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <img
            src="https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=500&h=300&fit=crop"
            alt="Gaming community and esports"
            className={imgClass}
          />
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=300&fit=crop"
            alt="Young entrepreneurs brainstorming"
            className={imgClass}
          />
        </div>
      </div>
    ),
  },
  {
    title: "2022",
    content: (
      <div>
        <p className="text-foreground text-xs md:text-sm font-semibold mb-2">
          The Idea — Born During the Twitch Boom
        </p>
        <p className="text-muted-foreground text-xs md:text-sm font-normal mb-6">
          During COVID, live streaming exploded. Twitch viewership skyrocketed as millions tuned in from home. We saw the opportunity: a massive, engaged Gen Z audience spending hours daily on streams — yet brands had no native way to reach them. Pre-rolls got skipped, banners got blocked, and sponsorship deals were expensive and manual. The idea for Beta Ads was born.
        </p>
        <div className="mb-8 space-y-2">
          <div className="flex gap-2 items-center text-muted-foreground text-xs md:text-sm">
            💡 The idea sparked during the COVID streaming boom
          </div>
          <div className="flex gap-2 items-center text-muted-foreground text-xs md:text-sm">
            📺 Twitch viewership at all-time highs
          </div>
          <div className="flex gap-2 items-center text-muted-foreground text-xs md:text-sm">
            🎯 Identified the gap: no native ads for live streams
          </div>
          <div className="flex gap-2 items-center text-muted-foreground text-xs md:text-sm">
            🧠 Vision: ads that feel like part of the stream
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <img
            src="https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=500&h=300&fit=crop"
            alt="Person watching streams at home during COVID"
            className={imgClass}
          />
          <img
            src="https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&h=300&fit=crop"
            alt="Gaming controller and screen"
            className={imgClass}
          />
        </div>
        <div className="mt-8">
          <Link to="/demo">
            <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-full h-11 px-6 text-sm font-semibold">
              Join Our Journey
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    ),
  },
];

const Story: React.FC = () => {
  return (
    <div className="pt-24">
      {/* Page-specific meta tags — ensures /story gets its own SEO title/description instead of inheriting the homepage values */}
      <SEO
        title="Our Story | Beta Ads – Nordic Twitch Marketing Agency"
        description="From a COVID-era idea to the leading native stream advertising platform in the Nordics. Discover how Beta Ads was founded and grew from 2022 to today."
        canonical="/story"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "Our Story | Beta Ads – Nordic Twitch Marketing Agency",
          description: "From a COVID-era idea to the leading native stream advertising platform in the Nordics. Discover how Beta Ads was founded and grew from 2022 to today.",
          url: "https://beta-ads.no/story",
          publisher: {
            "@type": "Organization",
            name: "Beta Ads",
            url: "https://beta-ads.no",
          },
        }}
      />
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10 py-20">
        {/* h1 — primary page heading for correct SEO heading hierarchy (was h2) */}
        <h1 className="text-lg md:text-4xl mb-4 text-foreground max-w-4xl font-bold">
          Our Story
        </h1>
        <p className="text-muted-foreground text-sm md:text-base max-w-xl">
          From a COVID-era idea to the leading native stream advertising platform in the Nordics. Here's how Beta Ads came to be.
        </p>
      </div>
      <Timeline data={timelineData} />
    </div>
  );
};

export default Story;
