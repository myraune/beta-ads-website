import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { blogPostsMeta, getBlogPostMetaBySlug } from "@/data/blogPostsMeta";
import { getBlogImage } from "@/lib/blogImage";

// Curated editorial picks - mix of high-traffic posts and core value-prop content.
// Falls back to the 4 most recent posts if a slug is ever removed.
const FEATURED_SLUGS = [
  "how-twitch-advertising-works-2026",
  "twitch-vs-youtube-gaming-2025",
  "ad-blocker-crisis-livestream-native-ads-2026",
  "most-watched-twitch-games-2025",
];
const featuredPosts = FEATURED_SLUGS
  .map((s) => getBlogPostMetaBySlug(s))
  .filter(Boolean)
  .concat(blogPostsMeta.slice(0, 4))
  // deduplicate and take first 4
  .filter((post, idx, arr) => arr.findIndex((p) => p!.slug === post!.slug) === idx)
  .slice(0, 4) as (typeof blogPostsMeta)[number][];

export const SPCTA: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section ref={ref} className="py-20 md:py-28" aria-label="Blog posts">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header row */}
        <div className={`flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-4 block">
              Blog
            </span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">
              From the blog
            </h2>
          </div>
          <Link to="/blog">
            <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground text-sm">
              All posts <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        {/* Post grid */}
        <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          {featuredPosts.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="group rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background">
              <article className="rounded-2xl overflow-hidden border border-border transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-black/[0.06] group-hover:border-foreground/20">
                {/* Cover image */}
                <div className="aspect-[16/9] overflow-hidden bg-muted">
                  <img
                    src={getBlogImage(post)}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">
                  {/* flex-wrap + whitespace-nowrap: long category names ("INDUSTRY INSIGHTS")
                      previously broke mid-word at 375px because flex items shrank; now each
                      pill keeps its words together and the row wraps cleanly to a second line. */}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-3">
                    <span className="text-[11px] font-semibold text-primary uppercase tracking-wider whitespace-nowrap">
                      {post.category}
                    </span>
                    <span className="text-[11px] text-muted-foreground whitespace-nowrap">· {post.date}</span>
                    <span className="text-[11px] text-muted-foreground whitespace-nowrap">· {post.readTime}</span>
                  </div>
                  <h3 className="text-base font-semibold text-foreground leading-snug mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
