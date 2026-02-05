import React from "react";
import { Link } from "react-router-dom";
import { BarChart3, ArrowRight, TrendingUp } from "lucide-react";
import { blogPosts, BlogPost } from "@/data/blogPosts";

interface FeaturedInsightsHubProps {
  language: string;
}

const hubTranslations = {
  en: {
    title: "Twitch Insights Hub",
    subtitle: "Data-driven insights for smarter advertising decisions",
    badge: "Interactive Dashboard",
    viewAll: "View all insights",
  },
  no: {
    title: "Twitch Innsikt Hub",
    subtitle: "Datadrevet innsikt for smartere annonseringsbeslutninger",
    badge: "Interaktivt Dashboard",
    viewAll: "Se alle innsikter",
  },
  sv: {
    title: "Twitch Insights Hub",
    subtitle: "Datadrivna insikter för smartare reklambeslutn",
    badge: "Interaktiv Dashboard",
    viewAll: "Visa alla insikter",
  },
  fi: {
    title: "Twitch Insights Hub",
    subtitle: "Dataohjatut oivallukset älykkäämpiin mainontapäätöksiin",
    badge: "Interaktiivinen Dashboard",
    viewAll: "Näytä kaikki oivallukset",
  },
};

// Featured slugs for the hub - these are the high-impression dashboard posts
const featuredSlugs = [
  "twitch-statistics-2025-global-insights",
  "most-watched-twitch-games-2025",
  "twitch-vs-youtube-gaming-2025",
];

export const FeaturedInsightsHub: React.FC<FeaturedInsightsHubProps> = ({ language }) => {
  const t = hubTranslations[language as keyof typeof hubTranslations] || hubTranslations.en;
  
  const featuredPosts = featuredSlugs
    .map(slug => blogPosts.find(post => post.slug === slug))
    .filter((post): post is BlogPost => post !== undefined);

  if (featuredPosts.length === 0) return null;

  return (
    <section className="mb-16 pb-16 border-b border-border/50">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span className="text-primary text-sm font-medium uppercase tracking-wider">
              Featured
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            {t.title}
          </h2>
          <p className="text-muted-foreground mt-1">
            {t.subtitle}
          </p>
        </div>
      </div>

      {/* Featured Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {featuredPosts.map((post) => (
          <Link
            key={post.id}
            to={`/blog/${post.slug}`}
            className="group relative rounded-xl overflow-hidden bg-card/50 border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-lg hover:shadow-primary/5"
          >
            {/* Image */}
            <div className="aspect-video overflow-hidden relative">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Badge */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-primary/90 backdrop-blur-sm text-primary-foreground px-2.5 py-1 rounded-full text-xs font-medium">
                <BarChart3 className="w-3 h-3" />
                {t.badge}
              </div>
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Content */}
            <div className="p-5">
              <span className="text-primary/70 text-xs font-medium uppercase tracking-wider">
                {post.category}
              </span>
              <h3 className="text-lg font-semibold text-foreground mt-2 mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                {post.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                {post.excerpt}
              </p>
              <span className="inline-flex items-center text-sm text-primary font-medium group-hover:gap-2 gap-1 transition-all">
                Explore Dashboard
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeaturedInsightsHub;
