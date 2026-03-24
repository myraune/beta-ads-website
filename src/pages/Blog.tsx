import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowRight, X } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import { Input } from "@/components/ui/input";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { SEO } from "@/components/SEO";
import { SPFooter } from "@/components/sections/SPFooter";

const POSTS_PER_PAGE = 9;

const Blog: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();

  const categories = [
    { id: "all", label: "All" },
    { id: "twitch-insights", label: "Twitch Insights" },
    { id: "case-studies", label: "Case Studies" },
    { id: "nordic-market", label: "Nordic Market" },
    { id: "guides", label: "Guides" },
  ];

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q);

      const matchesCategory =
        activeCategory === "all" ||
        post.category?.toLowerCase().includes(activeCategory.replace("-", " "));

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <>
      <SEO
        title="Blog | Beta Ads"
        description="Data-driven insights, analytics, and advertising guides for reaching Gen Z on Twitch and streaming platforms in the Nordics."
        canonical="/blog"
      />

      <div className="min-h-screen pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div
            ref={headerRef}
            className={`mb-14 transition-all duration-700 ${
              headerVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Beta Ads Insights
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              Data-driven guides for the Nordic streaming market. Learn how to
              reach Gen Z through native stream advertising.
            </p>

            {/* Filters */}
            <div className="mt-10 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
              <div className="flex flex-wrap gap-5">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`text-sm font-medium pb-1.5 border-b-2 transition-all ${
                      activeCategory === cat.id
                        ? "text-foreground border-primary"
                        : "text-muted-foreground border-transparent hover:text-foreground"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-56">
                <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-6 bg-transparent border-0 border-b border-border/50 rounded-none focus-visible:ring-0 focus-visible:border-primary"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Posts grid */}
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg text-muted-foreground mb-2">
                No articles found
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                className="text-sm text-primary hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.slice(0, POSTS_PER_PAGE).map((post) => (
                <Link
                  to={`/blog/${post.slug}`}
                  key={post.id}
                  className="group"
                >
                  <article>
                    <div className="aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-muted">
                      {post.image ? (
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                          <span className="text-xs text-muted-foreground">
                            Beta Ads Blog
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[11px] font-semibold text-primary">
                        {post.category}
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        · {post.date}
                      </span>
                      {post.readTime && (
                        <span className="text-[11px] text-muted-foreground">
                          · {post.readTime}
                        </span>
                      )}
                    </div>
                    <h2 className="text-base font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors leading-snug">
                      {post.title}
                    </h2>
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <SPFooter />
    </>
  );
};

export default Blog;
