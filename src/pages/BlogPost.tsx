import React, { useEffect, lazy, Suspense } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Footer } from "@/components/sections/Footer";
import { ArrowLeft, Calendar, Clock, Tag, Share2, Twitter, Linkedin, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getBlogPostBySlug, getRelatedPosts, BlogPost as BlogPostType } from "@/data/blogPosts";
import { Helmet } from "react-helmet";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { TableOfContents, dashboardTocItems } from "@/components/blog/TableOfContents";

const TwitchStatsDashboard = lazy(() => import("@/components/blog/TwitchStatsDashboard"));
const NorwegianStreamersDashboard = lazy(() => import("@/components/blog/NorwegianStreamersDashboard"));
const TopGamesDashboard = lazy(() => import("@/components/blog/TopGamesDashboard"));
const NordicMarketDashboard = lazy(() => import("@/components/blog/NordicMarketDashboard"));
const PlatformComparisonDashboard = lazy(() => import("@/components/blog/PlatformComparisonDashboard"));
const AdvertisingBenchmarksDashboard = lazy(() => import("@/components/blog/AdvertisingBenchmarksDashboard"));
const SwedishStreamersDashboard = lazy(() => import("@/components/blog/SwedishStreamersDashboard"));
const FinnishStreamersDashboard = lazy(() => import("@/components/blog/FinnishStreamersDashboard"));

interface BlogPostPageProps {
  t: any;
  language: string;
  setLanguage: (lang: string) => void;
}

const BlogPostPage: React.FC<BlogPostPageProps> = ({ t, language, setLanguage }) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = slug ? getBlogPostBySlug(slug) : undefined;
  const relatedPosts = slug ? getRelatedPosts(slug, 3) : [];

  useEffect(() => {
    if (!post) {
      navigate("/about");
      return;
    }

    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, [post, navigate]);

  if (!post) {
    return null;
  }

  const lang = language as keyof typeof post.seoTitle;
  const seoTitle = post.seoTitle[lang] || post.seoTitle.en;
  const seoDescription = post.seoDescription[lang] || post.seoDescription.en;
  const seoKeywords = post.seoKeywords[lang] || post.seoKeywords.en;

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleShare = (platform: string) => {
    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    };
    window.open(urls[platform], "_blank", "width=600,height=400");
  };

  // Parse markdown content to HTML-like sections
  const renderContent = (content: string) => {
    const lines = content.trim().split("\n");
    const elements: React.ReactNode[] = [];
    let currentList: string[] = [];
    let inTable = false;
    let tableRows: string[][] = [];

    const flushList = () => {
      if (currentList.length > 0) {
        elements.push(
          <ul key={`list-${elements.length}`} className="list-disc pl-6 space-y-2 text-muted-foreground">
            {currentList.map((item, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, "<strong class='text-foreground'>$1</strong>") }} />
            ))}
          </ul>
        );
        currentList = [];
      }
    };

    const flushTable = () => {
      if (tableRows.length > 0) {
        const headers = tableRows[0];
        const body = tableRows.slice(2); // Skip header and separator
        elements.push(
          <div key={`table-${elements.length}`} className="overflow-x-auto my-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  {headers.map((cell, i) => (
                    <th key={i} className="text-left py-3 px-4 text-foreground font-semibold">{cell.trim()}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {body.map((row, i) => (
                  <tr key={i} className="border-b border-border/50">
                    {row.map((cell, j) => (
                      <td key={j} className="py-3 px-4 text-muted-foreground">{cell.trim()}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        tableRows = [];
        inTable = false;
      }
    };

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();

      // Table detection
      if (trimmedLine.startsWith("|") && trimmedLine.endsWith("|")) {
        flushList();
        inTable = true;
        const cells = trimmedLine.split("|").filter(cell => cell.trim() !== "" && !cell.match(/^[-:]+$/));
        if (cells.length > 0 && !trimmedLine.match(/^\|[-:|\s]+\|$/)) {
          tableRows.push(cells);
        }
        return;
      } else if (inTable) {
        flushTable();
      }

      // Headers
      if (trimmedLine.startsWith("## ")) {
        flushList();
        elements.push(
          <h2 key={index} className="text-2xl font-bold text-foreground mt-10 mb-4">
            {trimmedLine.replace("## ", "")}
          </h2>
        );
      } else if (trimmedLine.startsWith("### ")) {
        flushList();
        elements.push(
          <h3 key={index} className="text-xl font-semibold text-foreground mt-8 mb-3">
            {trimmedLine.replace("### ", "")}
          </h3>
        );
      } 
      // List items
      else if (trimmedLine.startsWith("- ")) {
        currentList.push(trimmedLine.replace("- ", ""));
      }
      // Numbered list
      else if (/^\d+\.\s/.test(trimmedLine)) {
        currentList.push(trimmedLine.replace(/^\d+\.\s/, ""));
      }
      // Regular paragraph
      else if (trimmedLine.length > 0) {
        flushList();
        elements.push(
          <p 
            key={index} 
            className="text-muted-foreground leading-relaxed mb-4"
            dangerouslySetInnerHTML={{ 
              __html: trimmedLine.replace(/\*\*(.*?)\*\*/g, "<strong class='text-foreground'>$1</strong>") 
            }}
          />
        );
      }
    });

    flushList();
    flushTable();

    return elements;
  };

  const readMoreText = {
    en: "Read more",
    no: "Les mer",
    sv: "Läs mer",
    fi: "Lue lisää"
  };

  const relatedPostsText = {
    en: "Related Articles",
    no: "Relaterte artikler",
    sv: "Relaterade artiklar",
    fi: "Aiheeseen liittyvät artikkelit"
  };

  const backText = {
    en: "Back to Blog",
    no: "Tilbake til bloggen",
    sv: "Tillbaka till bloggen",
    fi: "Takaisin blogiin"
  };

  const tocItems = post.hasDashboard ? dashboardTocItems[post.hasDashboard] || [] : [];

  return (
    <>
      <ReadingProgress />
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content={seoKeywords.join(", ")} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:image" content={post.image} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content={post.image} />
        <link rel="alternate" hrefLang="en" href={`https://betaads.com/blog/${post.slug}`} />
        <link rel="alternate" hrefLang="no" href={`https://betaads.com/no/blog/${post.slug}`} />
        <link rel="alternate" hrefLang="sv" href={`https://betaads.com/sv/blog/${post.slug}`} />
        <link rel="alternate" hrefLang="fi" href={`https://betaads.com/fi/blog/${post.slug}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": seoDescription,
            "image": post.image,
            "datePublished": post.dateISO,
            "dateModified": post.dateISO,
            "author": {
              "@type": "Organization",
              "name": "Beta Ads"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Beta Ads",
              "logo": {
                "@type": "ImageObject",
                "url": "/lovable-uploads/logo-color.png"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": shareUrl
            }
          })}
        </script>
      </Helmet>

      <div className="pt-16 lg:pt-20">
        {/* Hero Section */}
        <article className="py-12 lg:py-20">
          <div className="max-w-4xl mx-auto px-4">
            {/* Back Button */}
            <Link 
              to="/about" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              {backText[lang] || backText.en}
            </Link>

            {/* Category & Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                {post.category}
              </Badge>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Hero Image */}
            <div className="relative rounded-2xl overflow-hidden mb-12 aspect-video">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Dashboard or Content with ToC */}
            <div className="flex gap-8">
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
                  </Suspense>
                ) : (
                  <div className="prose prose-lg max-w-none">
                    {renderContent(post.content)}
                  </div>
                )}
              </div>
              {tocItems.length > 0 && <TableOfContents items={tocItems} />}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2 mt-12 pt-8 border-t border-border">
              <Tag className="w-4 h-4 text-muted-foreground" />
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-4 mt-8">
              <span className="text-sm text-muted-foreground flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                Share:
              </span>
              <Button 
                variant="outline" 
                size="icon" 
                className="h-9 w-9"
                onClick={() => handleShare("twitter")}
              >
                <Twitter className="w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="h-9 w-9"
                onClick={() => handleShare("linkedin")}
              >
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="h-9 w-9"
                onClick={() => handleShare("facebook")}
              >
                <Facebook className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-16 lg:py-20 px-4 bg-muted/30">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
                {relatedPostsText[lang] || relatedPostsText.en}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link 
                    key={relatedPost.id} 
                    to={`/blog/${relatedPost.slug}`}
                    className="group bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <img 
                        src={relatedPost.image} 
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="bg-primary/90 backdrop-blur-sm text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                          {relatedPost.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {relatedPost.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {relatedPost.readTime}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <Footer t={t} language={language} setLanguage={setLanguage} />
      </div>
    </>
  );
};

export default BlogPostPage;
