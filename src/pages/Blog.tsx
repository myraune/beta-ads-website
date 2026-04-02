import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowRight, X } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import { getBlogImage } from "@/lib/blogImage";
import { Input } from "@/components/ui/input";
import { SEO } from "@/components/SEO";
import { SPFooter } from "@/components/sections/SPFooter";

const Blog: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", label: "All" },
    { id: "twitch-insights", label: "Twitch Insights" },
    { id: "case-studies", label: "Case Studies" },
    { id: "nordic-market", label: "Nordic Market" },
    { id: "guides", label: "Guides" },
  ];

  const filteredPosts = useMemo(() => {
    return blogPosts
      .filter((post) => {
        const q = searchQuery.toLowerCase();
        const matchesSearch =
          !q ||
          post.title.toLowerCase().includes(q) ||
          post.excerpt.toLowerCase().includes(q);

        const matchesCategory =
          activeCategory === "all" ||
          post.category?.toLowerCase().includes(activeCategory.replace("-", " "));

        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime());
  }, [searchQuery, activeCategory]);

  return (
    <>
      <SEO
        title="Insights & Blog | Beta Ads"
        description="Data-driven insights, analytics, and advertising guides for reaching Gen Z on Twitch and streaming platforms in the Nordics. Updated weekly."
        canonical="/blog"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "Beta Ads Insights",
          "description": "Data-driven guides for the Nordic streaming market. Learn how to reach Gen Z through native stream advertising.",
          "url": "https://beta-ads.no/blog",
          "publisher": {
            "@type": "Organization",
            "name": "Beta Ads",
            "logo": { "@type": "ImageObject", "url": "https://beta-ads.no/lovable-uploads/logo-color.png" }
          },
          "isPartOf": { "@id": "https://beta-ads.no/#website" }
        }}
      />

      <div className="min-h-screen pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="mb-14">
            <h1 className="text-4xl md:text-5xl font-light tracking-tight text-foreground mb-4">
              Beta Ads Insights
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              Data-driven guides for the Nordic streaming market. Learn how to
              reach Gen Z through native stream advertising.
            </p>

            {/* Filters — aria-label + aria-pressed so screen readers announce active filter */}
            <div className="mt-10 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
              <div className="flex flex-wrap gap-5" role="group" aria-label="Filter articles by category">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    aria-pressed={activeCategory === cat.id}
                    className={`text-sm font-medium pb-1.5 border-b-2 transition-all ${
                      activeCategory === cat.id
                        ? "text-foreground border-primary"
                        : "text-muted-foreground border-muted-foreground/20 hover:text-foreground hover:border-muted-foreground/40"
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
                  aria-label="Search articles"
                  className="pl-6 bg-transparent border-0 border-b border-border/50 rounded-none focus-visible:ring-0 focus-visible:border-primary"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear search"
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Posts */}
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
            <>
              {/* Featured first post */}
              {filteredPosts.length > 0 && (
                <Link to={`/blog/${filteredPosts[0].slug}`} className="group block mb-14">
                  <article className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-muted">
                      <img
                        src={getBlogImage(filteredPosts[0].slug)}
                        alt={filteredPosts[0].title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="eager"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-xs font-semibold text-primary">{filteredPosts[0].category}</span>
                        <span className="text-xs text-muted-foreground">· {filteredPosts[0].date}</span>
                        {filteredPosts[0].readTime && (
                          <span className="text-xs text-muted-foreground">· {filteredPosts[0].readTime}</span>
                        )}
                      </div>
                      <h2 className="text-2xl md:text-3xl font-light tracking-tight text-foreground mb-4 group-hover:text-primary transition-colors leading-snug">
                        {filteredPosts[0].title}
                      </h2>
                      <p className="text-base text-muted-foreground leading-relaxed line-clamp-3 mb-5">
                        {filteredPosts[0].excerpt}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                        Read article <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </article>
                </Link>
              )}

              {/* Remaining posts grid */}
              {filteredPosts.length > 1 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 border-t border-border pt-14">
                  {filteredPosts.slice(1).map((post) => (
                    <Link to={`/blog/${post.slug}`} key={post.id} className="group">
                      <article>
                        <div className="aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-muted">
                          <img
                            src={getBlogImage(post.slug)}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[11px] font-semibold text-primary">{post.category}</span>
                          <span className="text-[11px] text-muted-foreground">· {post.date}</span>
                          {post.readTime && (
                            <span className="text-[11px] text-muted-foreground">· {post.readTime}</span>
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
            </>
          )}
        </div>
      </div>
      <SPFooter />
    </>
  );
};

export default Blog;
