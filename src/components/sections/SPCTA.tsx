import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { blogPosts } from "@/data/blogPosts";
import { getBlogImage } from "@/lib/blogImage";

const latestPosts = blogPosts.slice(0, 2);

export const SPCTA: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section ref={ref} className="py-20 md:py-28" aria-label="Blog posts">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header row */}
        <div className={`flex items-end justify-between mb-10 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div>
            <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary mb-4">
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
        <div className={`grid md:grid-cols-2 gap-6 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          {latestPosts.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="group">
              <article className="rounded-2xl overflow-hidden border border-border bg-card transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-black/[0.06] group-hover:border-border/60">
                {/* Cover image */}
                <div className="aspect-[16/9] overflow-hidden bg-muted">
                  <img
                    src={getBlogImage(post.slug)}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[11px] font-semibold text-primary uppercase tracking-wider">
                      {post.category}
                    </span>
                    <span className="text-[11px] text-muted-foreground">· {post.date}</span>
                    <span className="text-[11px] text-muted-foreground">· {post.readTime}</span>
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
