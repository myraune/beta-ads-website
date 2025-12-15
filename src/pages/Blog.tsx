import React, { useState, useMemo } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Search, Calendar, Clock, ArrowRight, X, BarChart3 } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface BlogProps {
  t: Record<string, any>;
  language: string;
  setLanguage: (lang: string) => void;
}

const blogTranslations = {
  en: {
    pageTitle: "Blog",
    pageSubtitle: "Insights & Guides on Twitch Advertising",
    pageDescription: "Stay updated on native advertising trends, strategies, and success stories from the Nordic streaming market.",
    searchPlaceholder: "Search articles...",
    allCategories: "All",
    noResults: "No articles found",
    noResultsDescription: "Try adjusting your search or filters to find what you're looking for.",
    clearFilters: "Clear filters",
    readMore: "Read more",
    featured: "Featured",
    minRead: "min read",
  },
  no: {
    pageTitle: "Blogg",
    pageSubtitle: "Innsikt & Guider om Twitch-annonsering",
    pageDescription: "Hold deg oppdatert på native annonseringstrender, strategier og suksesshistorier fra det nordiske streamingmarkedet.",
    searchPlaceholder: "Søk artikler...",
    allCategories: "Alle",
    noResults: "Ingen artikler funnet",
    noResultsDescription: "Prøv å justere søket eller filtrene for å finne det du leter etter.",
    clearFilters: "Fjern filtre",
    readMore: "Les mer",
    featured: "Fremhevet",
    minRead: "min lesing",
  },
  sv: {
    pageTitle: "Blogg",
    pageSubtitle: "Insikter & Guider om Twitch-reklam",
    pageDescription: "Håll dig uppdaterad om native reklamtrender, strategier och framgångshistorier från den nordiska streamingmarknaden.",
    searchPlaceholder: "Sök artiklar...",
    allCategories: "Alla",
    noResults: "Inga artiklar hittades",
    noResultsDescription: "Prova att justera din sökning eller filter för att hitta det du letar efter.",
    clearFilters: "Rensa filter",
    readMore: "Läs mer",
    featured: "Utvald",
    minRead: "min läsning",
  },
  fi: {
    pageTitle: "Blogi",
    pageSubtitle: "Oivallukset & Oppaat Twitch-mainonnasta",
    pageDescription: "Pysy ajan tasalla native-mainonnan trendeistä, strategioista ja menestystarinoista pohjoismaisilla streaming-markkinoilla.",
    searchPlaceholder: "Etsi artikkeleita...",
    allCategories: "Kaikki",
    noResults: "Artikkeleita ei löytynyt",
    noResultsDescription: "Kokeile muuttaa hakua tai suodattimia löytääksesi etsimäsi.",
    clearFilters: "Tyhjennä suodattimet",
    readMore: "Lue lisää",
    featured: "Suositeltu",
    minRead: "min lukuaika",
  },
};

const POSTS_PER_PAGE = 6;

const Blog: React.FC<BlogProps> = ({ language }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  
  const bt = blogTranslations[language as keyof typeof blogTranslations] || blogTranslations.en;
  
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation();

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set(blogPosts.map(p => p.category));
    return ["all", ...Array.from(cats)];
  }, []);

  // Filter posts
  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = searchQuery === "" ||
        post.title.toLowerCase().includes(searchLower) ||
        post.excerpt.toLowerCase().includes(searchLower) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchLower));
      
      const matchesCategory = activeCategory === "all" || post.category === activeCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  // Featured post (first post when no filters)
  const featuredPost = searchQuery === "" && activeCategory === "all" ? blogPosts[0] : null;
  const displayPosts = featuredPost 
    ? paginatedPosts.filter(p => p.id !== featuredPost.id)
    : paginatedPosts;

  const handleClearFilters = () => {
    setSearchQuery("");
    setActiveCategory("all");
    setCurrentPage(1);
  };

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  return (
    <>
      <Helmet>
        <title>{bt.pageTitle} | Beta Ads - Twitch Advertising</title>
        <meta name="description" content={bt.pageDescription} />
        <meta name="keywords" content="twitch blog, streaming advertising, native ads, gen z marketing, twitch insights" />
        <link rel="canonical" href="https://betaads.no/blog" />
      </Helmet>

      <div className="min-h-screen bg-background pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          
          {/* Header - Clean Editorial Style */}
          <div 
            ref={headerRef}
            className={`mb-16 transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 tracking-tight">
                {bt.pageTitle}
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {bt.pageDescription}
              </p>
            </div>

            {/* Search and Filters - Minimal */}
            <div className="mt-12 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
              {/* Category Tabs - Underline style */}
              <div className="flex flex-wrap gap-6">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    className={`text-sm font-medium pb-2 transition-all duration-300 border-b-2 ${
                      activeCategory === category
                        ? "text-foreground border-primary"
                        : "text-muted-foreground border-transparent hover:text-foreground hover:border-border"
                    }`}
                  >
                    {category === "all" ? bt.allCategories : category}
                  </button>
                ))}
              </div>

              {/* Search Input - Minimal */}
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={bt.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-6 bg-transparent border-0 border-b border-border rounded-none focus-visible:ring-0 focus-visible:border-primary"
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

          {/* Featured Post - Full width editorial */}
          {featuredPost && currentPage === 1 && (
            <Link
              to={`/blog/${featuredPost.slug}`}
              className="block mb-16 group"
            >
              <article className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                <div className="aspect-[4/3] rounded-xl overflow-hidden relative">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {featuredPost.hasDashboard && (
                    <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-primary/90 backdrop-blur-sm text-primary-foreground px-3 py-1.5 rounded-full text-sm font-medium">
                      <BarChart3 className="w-4 h-4" />
                      Interactive Dashboard
                    </div>
                  )}
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-primary text-sm font-medium mb-4">
                    {featuredPost.category}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors leading-tight">
                    {featuredPost.title}
                  </h2>
                  <p className="text-muted-foreground mb-6 line-clamp-3 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      {featuredPost.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      {featuredPost.readTime}
                    </span>
                  </div>
                  <span className="inline-flex items-center text-foreground font-medium group-hover:text-primary group-hover:gap-3 gap-2 transition-all">
                    {bt.readMore} <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </article>
            </Link>
          )}

          {/* Divider */}
          {featuredPost && currentPage === 1 && <div className="border-t border-border/50 mb-12" />}

          {/* Blog Grid - Clean minimal */}
          <div 
            ref={gridRef}
            className={`transition-all duration-700 delay-200 ${gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {displayPosts.length > 0 ? (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mb-16">
                  {displayPosts.map((post, index) => (
                    <Link
                      key={post.id}
                      to={`/blog/${post.slug}`}
                      className="group"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <article className="h-full flex flex-col">
                        <div className="aspect-[3/2] rounded-lg overflow-hidden mb-5 relative">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          {post.hasDashboard && (
                            <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-primary/90 backdrop-blur-sm text-primary-foreground px-2.5 py-1 rounded-full text-xs font-medium">
                              <BarChart3 className="w-3 h-3" />
                              Interactive
                            </div>
                          )}
                        </div>
                        <span className="text-primary/70 text-sm font-medium mb-2">
                          {post.category}
                        </span>
                        <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-1">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-auto">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {post.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {post.readTime}
                          </span>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                          className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <PaginationItem key={page}>
                          <PaginationLink
                            onClick={() => setCurrentPage(page)}
                            isActive={currentPage === page}
                            className="cursor-pointer"
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      <PaginationItem>
                        <PaginationNext
                          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                          className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </>
            ) : (
              /* Empty State */
              <div className="text-center py-20">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {bt.noResults}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {bt.noResultsDescription}
                </p>
                <Button onClick={handleClearFilters} variant="outline" className="border-border">
                  {bt.clearFilters}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;