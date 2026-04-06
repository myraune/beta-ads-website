import { useState, useEffect } from 'react';
import { List } from 'lucide-react';

interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -80% 0px' }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (items.length === 0) return null;

  return (
    <nav className="hidden xl:block w-64 shrink-0">
      <div className="bg-card/50 border border-border/50 rounded-xl p-5">
        <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-4">
          <List className="w-4 h-4" />
          On this page
        </h4>
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollToSection(item.id)}
                className={`text-left text-sm w-full transition-colors duration-200 ${
                  item.level === 2 ? 'pl-0' : 'pl-3'
                } ${
                  activeId === item.id
                    ? 'text-primary font-medium'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

// Dashboard-specific table of contents
export const dashboardTocItems: Record<string, TocItem[]> = {
  'norwegian-streamers': [
    { id: 'peak-viewership', title: 'Peak Viewership', level: 2 },
    { id: 'leaderboard', title: 'Leaderboard', level: 2 },
    { id: 'avg-viewers', title: 'Average Viewers', level: 2 },
    { id: 'hours-streamed', title: 'Hours Streamed', level: 2 },
    { id: 'follower-growth', title: 'Follower Growth', level: 2 },
    { id: 'sources', title: 'Data Sources', level: 2 },
  ],
  'twitch-stats': [
    { id: 'key-metrics', title: 'Key Metrics', level: 2 },
    { id: 'user-growth', title: 'User Growth', level: 2 },
    { id: 'demographics', title: 'Demographics', level: 2 },
    { id: 'revenue', title: 'Revenue Breakdown', level: 2 },
    { id: 'geography', title: 'Geography', level: 2 },
  ],
  'top-games': [
    { id: 'overview', title: 'Platform Overview', level: 2 },
    { id: 'top-categories', title: 'Top Categories', level: 2 },
    { id: 'content-split', title: 'Content Split', level: 2 },
    { id: 'top-streamers', title: 'Top Streamers', level: 2 },
    { id: 'trends', title: 'Viewing Trends', level: 2 },
  ],
  'nordic-market': [
    { id: 'overview', title: 'Market Overview', level: 2 },
    { id: 'country-comparison', title: 'Country Comparison', level: 2 },
    { id: 'viewers', title: 'Unique Viewers', level: 2 },
    { id: 'watch-time', title: 'Watch Time', level: 2 },
    { id: 'growth', title: 'Growth Rate', level: 2 },
  ],
  'platform-comparison': [
    { id: 'overview', title: 'Platform Overview', level: 2 },
    { id: 'users', title: 'Active Users', level: 2 },
    { id: 'hours', title: 'Hours Watched', level: 2 },
    { id: 'revenue', title: 'Revenue', level: 2 },
    { id: 'advertisers', title: 'For Advertisers', level: 2 },
  ],
  'ad-benchmarks': [
    { id: 'overview', title: 'Overview', level: 2 },
    { id: 'cpm', title: 'CPM by Region', level: 2 },
    { id: 'ctr', title: 'CTR by Format', level: 2 },
    { id: 'engagement', title: 'Engagement Rates', level: 2 },
    { id: 'roi', title: 'ROI Comparison', level: 2 },
  ],
  'swedish-streamers': [
    { id: 'peak-viewership', title: 'Peak Viewership', level: 2 },
    { id: 'leaderboard', title: 'Leaderboard', level: 2 },
    { id: 'avg-viewers', title: 'Average Viewers', level: 2 },
    { id: 'hours-streamed', title: 'Hours Streamed', level: 2 },
  ],
  'finnish-streamers': [
    { id: 'peak-viewership', title: 'Peak Viewership', level: 2 },
    { id: 'leaderboard', title: 'Leaderboard', level: 2 },
    { id: 'avg-viewers', title: 'Average Viewers', level: 2 },
    { id: 'hours-streamed', title: 'Hours Streamed', level: 2 },
  ],
  'twitch-analytics-tools': [
    { id: 'why-analytics', title: 'Hvorfor statistikk?', level: 2 },
    { id: 'market-overview', title: 'Markedsoversikt', level: 2 },
    { id: 'tool-reviews', title: 'Verktøy-gjennomgang', level: 2 },
    { id: 'feature-comparison', title: 'Funksjonssammenligning', level: 2 },
    { id: 'radar-comparison', title: 'Styrke-profiler', level: 2 },
    { id: 'use-cases', title: 'Bruksscenarioer', level: 2 },
    { id: 'links', title: 'Lenker', level: 2 },
    { id: 'twitch-native', title: 'Twitchs egne verktøy', level: 2 },
    { id: 'verdict', title: 'Vår anbefaling', level: 2 },
  ],
  'clipping-economy': [
    { id: 'overview', title: 'By the Numbers', level: 2 },
    { id: 'cpm', title: 'CPM Comparison', level: 2 },
    { id: 'roi', title: 'The $9K Math', level: 2 },
    { id: 'case-studies', title: 'Case Studies', level: 2 },
    { id: 'platforms', title: 'Platform Landscape', level: 2 },
    { id: 'adoption', title: 'Industry Adoption', level: 2 },
    { id: 'risks', title: 'Brand Safety', level: 2 },
    { id: 'earners', title: 'Clipper Earnings', level: 2 },
    { id: 'regulation', title: 'Legal Gray Area', level: 2 },
    { id: 'live-streaming', title: 'The Full Loop', level: 2 },
  ],
};
