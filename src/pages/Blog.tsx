import React, { useState, useMemo } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Search, Calendar, Clock, ArrowRight, X } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Header */}
          <div 
            ref={headerRef}
            className={`mb-12 transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                {bt.pageTitle}
              </h1>
              <p className="text-xl text-primary font-medium mb-2">
                {bt.pageSubtitle}
              </p>
              <p className="text-muted-foreground text-lg">
                {bt.pageDescription}
              </p>
            </div>

            {/* Search and Filters */}
            <div className="mt-8 space-y-4">
              {/* Search Input */}
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={bt.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-10 bg-card border-border/50"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeCategory === category
                        ? "bg-primary text-primary-foreground"
                        : "bg-card border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/50"
                    }`}
                  >
                    {category === "all" ? bt.allCategories : category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Featured Post */}
          {featuredPost && currentPage === 1 && (
            <Link
              to={`/blog/${featuredPost.slug}`}
              className="block mb-12 group"
            >
              <article className="grid lg:grid-cols-2 gap-8 bg-card rounded-2xl border border-border/50 overflow-hidden hover:border-primary/50 transition-all duration-500">
                <div className="aspect-video lg:aspect-auto lg:h-full overflow-hidden">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className="bg-primary/20 text-primary border-0">
                      {bt.featured}
                    </Badge>
                    <Badge variant="outline" className="border-border/50 text-muted-foreground">
                      {featuredPost.category}
                    </Badge>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-muted-foreground mb-6 line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {featuredPost.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {featuredPost.readTime}
                    </span>
                  </div>
                  <span className="inline-flex items-center text-primary font-medium group-hover:gap-3 gap-2 transition-all">
                    {bt.readMore} <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </article>
            </Link>
          )}

          {/* Blog Grid */}
          <div 
            ref={gridRef}
            className={`transition-all duration-700 delay-200 ${gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {displayPosts.length > 0 ? (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {displayPosts.map((post, index) => (
                    <Link
                      key={post.id}
                      to={`/blog/${post.slug}`}
                      className="group"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <article className="h-full bg-card rounded-xl border border-border/50 overflow-hidden hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-500 flex flex-col">
                        <div className="aspect-video overflow-hidden">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        </div>
                        <div className="p-6 flex flex-col flex-1">
                          <Badge variant="outline" className="w-fit mb-3 border-border/50 text-muted-foreground">
                            {post.category}
                          </Badge>
                          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-1">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground mt-auto">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {post.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {post.readTime}
                            </span>
                          </div>
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
              <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {bt.noResults}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {bt.noResultsDescription}
                </p>
                <Button onClick={handleClearFilters} variant="outline">
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
