import React from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const blogPosts = [
  {
    tag: "Inbound",
    tagColor: "text-green-600 dark:text-green-400",
    date: "Mar 22, 2026",
    title: "Why Native Stream Ads Outperform Traditional Video Ads 3:1",
    description: "Discover why brands are shifting budgets from pre-roll to native stream overlays — and seeing engagement rates 3x higher.",
    coverGradient: "from-rose-600/80 via-red-500/60 to-orange-400/40",
    coverIcon: "📊",
    slug: "why-native-stream-ads-outperform-3-to-1",
  },
  {
    tag: "Streaming",
    tagColor: "text-red-500 dark:text-red-400",
    date: "Mar 18, 2026",
    title: "Beyond Banner Blindness: How to Scale Stream Advertising in the Nordics",
    description: "Hit the viewer attention ceiling? Learn how to bypass ad blindness using native overlays and scale your Gen Z reach.",
    coverGradient: "from-violet-600/80 via-purple-500/60 to-blue-400/40",
    coverIcon: "🎮",
    slug: "beyond-banner-blindness-nordic-stream-advertising",
  },
];

export const SPCTA: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section ref={ref} className="py-20 md:py-32" aria-label="Blog posts">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className={`mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary mb-4">
            Blog
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Get to know more about us and our platform
          </h2>
          <p className="text-muted-foreground max-w-lg leading-relaxed">
            We share insights about stream advertising, native ads, and the future of Gen Z marketing.
          </p>
          <Link to="/blog" className="inline-block mt-6">
            <Button
              className="bg-foreground text-background hover:bg-foreground/90 rounded-full h-11 px-6 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              See our Blog
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className={`grid md:grid-cols-2 gap-8 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          {blogPosts.map((post, index) => (
            <Link
              to={`/blog/${post.slug}`}
              key={post.title}
              className={`group cursor-pointer transition-all duration-500 delay-${index * 100} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              {/* Blog card with gradient border on hover */}
              <div className="relative rounded-2xl p-[1px] transition-all duration-500 group-hover:bg-gradient-to-br group-hover:from-primary/60 group-hover:via-primary/20 group-hover:to-transparent">
                <div className="rounded-2xl bg-background overflow-hidden transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-xl group-hover:shadow-primary/10">
                  {/* Blog cover */}
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <div className={`w-full h-full bg-gradient-to-br ${post.coverGradient} flex items-center justify-center transition-transform duration-700 group-hover:scale-105`}>
                      <div className="text-center">
                        <span className="text-5xl mb-3 block">{post.coverIcon}</span>
                        <span className="text-xs font-semibold text-white/70 tracking-wider uppercase">Beta Ads Blog</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-[11px] font-semibold ${post.tagColor}`}>{post.tag}</span>
                      <span className="text-[11px] text-muted-foreground">&middot; {post.date}</span>
                    </div>

                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300 leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {post.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
