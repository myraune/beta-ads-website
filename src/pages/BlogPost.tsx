import React, { useEffect, useMemo, lazy, Suspense } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { SPFooter } from '@/components/sections/SPFooter';
import { ArrowLeft, Calendar, Clock, Tag, Share2, Twitter, Linkedin, Facebook, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getBlogPostBySlug, getRelatedPosts, type BlogPost } from "@/data/blogPosts";
import { getBlogImage } from "@/lib/blogImage";
import { SEO, type PageLocale } from "@/components/SEO";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { TableOfContents, dashboardTocItems } from "@/components/blog/TableOfContents";
import { StickyCTA, StreamerStickyCTA, InlineCTA, StreamerInlineCTA } from "@/components/blog/StickyCTA";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * Detect a post's language from its category + slug so we can emit the correct
 * hreflang / og:locale / localized seoTitle. Kept as a pure function rather
 * than tagging each post — the signals are reliable and new Nordic posts
 * inherit the right language automatically based on their category.
 *
 * Norwegian categories (Guider, Innsikt, Strategi) and the Streamer Guide
 * category when the post title contains Norwegian words cover ~14 of our 15
 * Nordic posts. Swedish + Finnish fall out of slug substring matches.
 */
const NORWEGIAN_CATEGORIES = new Set(["Guider", "Innsikt", "Strategi"]);
const FINNISH_CATEGORIES = new Set(["Oppaat"]);

function detectPostLanguage(post: BlogPost): PageLocale {
  if (FINNISH_CATEGORIES.has(post.category) || /\b(suomi|mainonta|opas)\b/i.test(post.slug)) {
    return "fi";
  }
  if (/\b(sverige|reklam-sverige|svensk)\b/i.test(post.slug)) {
    return "sv";
  }
  if (NORWEGIAN_CATEGORIES.has(post.category)) return "no";
  // Streamer Guide category has mixed language; detect from title characters.
  if (post.category === "Streamer Guide" && /[æøå]/i.test(post.title)) return "no";
  // Catch-all — any Norwegian character in title signals Norwegian content.
  if (/[æøå]/i.test(post.title) && /\b(hvordan|slik|norge|norsk|annonser|markedsf)\b/i.test(post.title.toLowerCase() + " " + post.excerpt.toLowerCase())) {
    return "no";
  }
  return "en";
}

// Auto-generate TOC items from markdown content
function extractTocFromMarkdown(content: string) {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const items: { id: string; title: string; level: number }[] = [];
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const title = match[2].replace(/[*_`\[\]]/g, "").trim();
    const id = title.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").slice(0, 60);
    items.push({ id, title, level });
  }
  return items;
}

const TwitchStatsDashboard = lazy(() => import("@/components/blog/TwitchStatsDashboard"));
const NorwegianStreamersDashboard = lazy(() => import("@/components/blog/NorwegianStreamersDashboard"));
const TopGamesDashboard = lazy(() => import("@/components/blog/TopGamesDashboard"));
const NordicMarketDashboard = lazy(() => import("@/components/blog/NordicMarketDashboard"));
const PlatformComparisonDashboard = lazy(() => import("@/components/blog/PlatformComparisonDashboard"));
const AdvertisingBenchmarksDashboard = lazy(() => import("@/components/blog/AdvertisingBenchmarksDashboard"));
const SwedishStreamersDashboard = lazy(() => import("@/components/blog/SwedishStreamersDashboard"));
const FinnishStreamersDashboard = lazy(() => import("@/components/blog/FinnishStreamersDashboard"));
const GloriousCaseStudy = lazy(() => import("@/components/blog/GloriousCaseStudy"));
const GokstadCaseStudy = lazy(() => import("@/components/blog/GokstadCaseStudy"));
const ClippingEconomyDashboard = lazy(() => import("@/components/blog/ClippingEconomyDashboard"));
const TwitchAnalyticsToolsDashboard = lazy(() => import("@/components/blog/TwitchAnalyticsToolsDashboard"));

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = slug ? getBlogPostBySlug(slug) : undefined;
  const relatedPosts = slug ? getRelatedPosts(slug, 3) : [];

  useEffect(() => {
    if (!post) { navigate("/about"); return; }
    window.scrollTo(0, 0);
  }, [post, navigate]);

  if (!post) return null;

  const isStreamerPost = post.category === "Streamer Guide";
  const postLocale = detectPostLanguage(post);
  const seoTitle = post.seoTitle[postLocale] || post.seoTitle.en;
  const seoDescription = post.seoDescription[postLocale] || post.seoDescription.en;
  const seoKeywords = post.seoKeywords[postLocale] || post.seoKeywords.en;
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleShare = (platform: string) => {
    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    };
    window.open(urls[platform], "_blank", "width=600,height=400");
  };

  const autoTocItems = useMemo(() => extractTocFromMarkdown(post.content), [post.content]);
  const tocItems = post.hasDashboard ? dashboardTocItems[post.hasDashboard] || [] : autoTocItems;
  const wideLayout = post.hasDashboard === "twitch-analytics-tools";

  return (
    <>
      <ReadingProgress />
      <SEO
        title={seoTitle}
        description={seoDescription}
        canonical={`/blog/${post.slug}`}
        ogType="article"
        ogImage={post.image}
        ogImageAlt={post.title}
        locale={postLocale}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": seoDescription,
            "image": post.image.startsWith("http") ? post.image : `https://beta-ads.no${post.image}`,
            "datePublished": post.dateISO,
            "dateModified": post.dateISO,
            "author": { "@type": "Organization", "name": "Beta Ads", "url": "https://beta-ads.no" },
            "publisher": { "@type": "Organization", "name": "Beta Ads", "logo": { "@type": "ImageObject", "url": "https://beta-ads.no/lovable-uploads/logo-color.png" } },
            "mainEntityOfPage": { "@type": "WebPage", "@id": `https://beta-ads.no/blog/${post.slug}` },
            "keywords": seoKeywords.join(", "),
            "inLanguage": postLocale,
            "wordCount": post.content.split(/\s+/).length,
            "articleSection": post.category
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://beta-ads.no/" },
              { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://beta-ads.no/blog" },
              { "@type": "ListItem", "position": 3, "name": post.title, "item": `https://beta-ads.no/blog/${post.slug}` }
            ]
          }
        ]}
      />

      <div className="pt-16 lg:pt-20 overflow-x-clip">
        <article>
          {/* Hero image — full width */}
          {!post.hasDashboard && (
            <div className="relative w-full h-48 md:h-72 lg:h-[360px] overflow-hidden bg-muted">
              {/* fetchpriority="high": this is the LCP element on blog post pages — signals browser to load it early, improving Core Web Vitals score */}
              <img
                src={getBlogImage(post)}
                alt={post.title}
                className="w-full h-full object-cover"
                fetchPriority="high"
                decoding="async"
              />
            </div>
          )}

          <div className={`${wideLayout ? 'max-w-[1400px]' : 'max-w-7xl'} mx-auto px-4 sm:px-6 lg:px-8`}>
            {/* Back link */}
            <div className="py-6">
              <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to Blog
              </Link>
            </div>

            {/* Header */}
            <div className={`${post.hasDashboard ? '' : 'max-w-4xl'} mb-10`}>
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 text-sm px-3 py-0.5">{post.category}</Badge>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{post.date}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{post.readTime}</span>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5 leading-tight">{post.title}</h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed border-l-4 border-primary/30 pl-4">{post.excerpt}</p>
            </div>

            {/* Wide layout: no sidebar, full width dashboard */}
            {wideLayout ? (
              <div className="pb-12">
                <Suspense fallback={<div className="text-center py-12 text-muted-foreground">Loading dashboard...</div>}>
                  <TwitchAnalyticsToolsDashboard />
                </Suspense>
              </div>
            ) : (
            /* Content + Sidebar */
            <div className="flex gap-10 xl:gap-14 pb-12">
              <div className="flex-1 min-w-0">
                {post.hasDashboard ? (
                  <Suspense fallback={<div className="text-center py-12 text-muted-foreground">Loading dashboard...</div>}>
                    {post.hasDashboard === "twitch-stats" && <TwitchStatsDashboard />}
                    {post.hasDashboard === "norwegian-streamers" && <NorwegianStreamersDashboard />}
                    {post.hasDashboard === "top-games" && <TopGamesDashboard />}
                    {post.hasDashboard === "nordic-market" && <NordicMarketDashboard />}
                    {post.hasDashboard === "platform-comparison" && <PlatformComparisonDashboard />}
                    {post.hasDashboard === "ad-benchmarks" && <AdvertisingBenchmarksDashboard />}
                    {post.hasDashboard === "swedish-streamers" && <SwedishStreamersDashboard />}
                    {post.hasDashboard === "finnish-streamers" && <FinnishStreamersDashboard />}
                    {post.hasDashboard === "glorious-case-study" && <GloriousCaseStudy />}
                    {post.hasDashboard === "gokstad-case-study" && <GokstadCaseStudy />}
                    {post.hasDashboard === "clipping-economy" && <ClippingEconomyDashboard />}
                  </Suspense>
                ) : (
                  <div className="max-w-none">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        h2: ({ children }) => {
                          const text = String(children).replace(/[*_`\[\]]/g, "").trim();
                          const id = text.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").slice(0, 60);
                          return (
                            <h2 id={id} className="text-2xl md:text-3xl font-bold text-foreground mt-14 mb-5 pb-3 border-b border-border/50 scroll-mt-24">
                              {children}
                            </h2>
                          );
                        },
                        h3: ({ children }) => {
                          const text = String(children).replace(/[*_`\[\]]/g, "").trim();
                          const id = text.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").slice(0, 60);
                          return (
                            <h3 id={id} className="text-xl md:text-2xl font-semibold text-foreground mt-10 mb-4 scroll-mt-24">
                              {children}
                            </h3>
                          );
                        },
                        p: ({ children }) => (
                          <p className="text-base md:text-lg text-foreground/80 leading-relaxed mb-5">
                            {children}
                          </p>
                        ),
                        ul: ({ children }) => (
                          <ul className="list-disc pl-6 space-y-2.5 text-foreground/80 mb-5 text-base md:text-lg">
                            {children}
                          </ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="list-decimal pl-6 space-y-2.5 text-foreground/80 mb-5 text-base md:text-lg">
                            {children}
                          </ol>
                        ),
                        li: ({ children }) => (
                          <li className="text-foreground/80 leading-relaxed">{children}</li>
                        ),
                        strong: ({ children }) => (
                          <strong className="text-foreground font-semibold">{children}</strong>
                        ),
                        blockquote: ({ children }) => (
                          <blockquote className="my-6 px-5 py-4 bg-primary/10 border-l-4 border-primary rounded-r-xl text-foreground/90 italic text-lg">
                            {children}
                          </blockquote>
                        ),
                        a: ({ href, children }) => {
                          if (href?.startsWith("/")) {
                            return <Link to={href} className="text-primary font-medium underline underline-offset-2 hover:text-primary/80 transition-colors">{children}</Link>;
                          }
                          return <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary font-medium underline underline-offset-2 hover:text-primary/80 transition-colors">{children}</a>;
                        },
                        img: ({ src, alt }) => (
                          <figure className="my-8 -mx-4 sm:mx-0">
                            <img
                              src={src}
                              alt={alt || ""}
                              className="w-full rounded-xl object-cover shadow-md"
                              style={{ maxHeight: "480px" }}
                            />
                            {alt && (
                              <figcaption className="mt-2 text-center text-sm text-muted-foreground italic px-4">
                                {alt}
                              </figcaption>
                            )}
                          </figure>
                        ),
                        table: ({ children }) => (
                          <div className="overflow-x-auto my-8 rounded-xl border border-border shadow-sm">
                            <table className="w-full border-collapse">{children}</table>
                          </div>
                        ),
                        thead: ({ children }) => (
                          <thead className="bg-muted/60">{children}</thead>
                        ),
                        tbody: ({ children }) => <tbody>{children}</tbody>,
                        tr: ({ children }) => (
                          <tr className="border-b border-border/50 even:bg-muted/20 hover:bg-muted/40 transition-colors">
                            {children}
                          </tr>
                        ),
                        th: ({ children }) => (
                          <th className="text-left py-3.5 px-5 text-foreground font-semibold text-sm uppercase tracking-wide">
                            {children}
                          </th>
                        ),
                        td: ({ children }) => (
                          <td className="py-3.5 px-5 text-foreground/80 text-sm md:text-base">
                            {children}
                          </td>
                        ),
                      }}
                    >
                      {post.content}
                    </ReactMarkdown>

                    {isStreamerPost ? (
                      <StreamerInlineCTA language="en" />
                    ) : (
                      <InlineCTA language="en" />
                    )}
                  </div>
                )}
              </div>

              {/* Sidebar — always visible on desktop */}
              <aside className="hidden lg:block w-72 xl:w-80 shrink-0">
                <div className="sticky top-24 flex flex-col gap-6 max-h-[calc(100vh-8rem)] overflow-y-auto">
                  {tocItems.length > 0 && <TableOfContents items={tocItems} />}
                  {isStreamerPost ? (
                    <StreamerStickyCTA language="en" />
                  ) : (
                    <StickyCTA language="en" />
                  )}
                </div>
              </aside>
            </div>
            )}

            {/* Tags + Share */}
            <div className="border-t border-border/50 pt-8 pb-12">
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <Tag className="w-4 h-4 text-muted-foreground" />
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                ))}
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <Share2 className="w-4 h-4" />Share:
                </span>
                <Button variant="outline" size="icon" className="h-9 w-9" onClick={() => handleShare("twitter")} aria-label="Share on X (Twitter)"><Twitter className="w-4 h-4" /></Button>
                <Button variant="outline" size="icon" className="h-9 w-9" onClick={() => handleShare("linkedin")} aria-label="Share on LinkedIn"><Linkedin className="w-4 h-4" /></Button>
                <Button variant="outline" size="icon" className="h-9 w-9" onClick={() => handleShare("facebook")} aria-label="Share on Facebook"><Facebook className="w-4 h-4" /></Button>
              </div>
            </div>
          </div>
        </article>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <section className="py-16 lg:py-20 px-4 border-t border-border">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-light tracking-tight text-foreground mb-8 text-center">Related Articles</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.id} to={`/blog/${relatedPost.slug}`} className="group bg-card rounded-2xl overflow-hidden shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500">
                    <div className="relative h-44 overflow-hidden">
                      <img src={relatedPost.image} alt={relatedPost.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute top-3 left-3">
                        <span className="bg-primary/90 backdrop-blur-sm text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">{relatedPost.category}</span>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                        <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{relatedPost.date}</span>
                        <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{relatedPost.readTime}</span>
                      </div>
                      <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">{relatedPost.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{relatedPost.excerpt}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <SPFooter />
      </div>
    </>
  );
};

export default BlogPostPage;
