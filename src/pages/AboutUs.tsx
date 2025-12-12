import React from "react";
import { Footer } from "@/components/sections/Footer";
import { Team } from "@/components/sections/Team";
import { Press } from "@/components/sections/Press";
import { Calendar, Clock, ArrowRight, Target, Users, Zap, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { blogPosts } from "@/data/blogPosts";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface AboutUsProps {
  t: any;
  language: string;
  setLanguage: (lang: string) => void;
}

const AboutUs: React.FC<AboutUsProps> = ({ t, language, setLanguage }) => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: timelineRef, isVisible: timelineVisible } = useScrollAnimation();
  const { ref: blogRef, isVisible: blogVisible } = useScrollAnimation();

  const readMoreText = {
    en: "Read more",
    no: "Les mer",
    sv: "Läs mer",
    fi: "Lue lisää"
  };

  const lang = language as keyof typeof readMoreText;

  const milestones = [
    {
      year: "2023",
      title: language === "no" ? "Grunnlagt" : language === "sv" ? "Grundades" : language === "fi" ? "Perustettu" : "Founded",
      description: language === "no" ? "Startet i Oslo med en visjon" : language === "sv" ? "Startade i Oslo med en vision" : language === "fi" ? "Aloitettiin Oslossa visiolla" : "Started in Oslo with a vision"
    },
    {
      year: "2024",
      title: language === "no" ? "Nordisk ekspansjon" : language === "sv" ? "Nordisk expansion" : language === "fi" ? "Pohjoismainen laajennus" : "Nordic Expansion",
      description: language === "no" ? "Utvidet til Sverige og Finland" : language === "sv" ? "Expanderade till Sverige och Finland" : language === "fi" ? "Laajentui Ruotsiin ja Suomeen" : "Expanded to Sweden & Finland"
    },
    {
      year: "2025",
      title: language === "no" ? "1M+ visninger" : language === "sv" ? "1M+ visningar" : language === "fi" ? "1M+ näyttöä" : "1M+ Views",
      description: language === "no" ? "Passerte en million visninger" : language === "sv" ? "Passerade en miljon visningar" : language === "fi" ? "Ylitettiin miljoona näyttöä" : "Surpassed one million views"
    }
  ];

  const featuredPost = blogPosts[0];
  const sidebarPosts = blogPosts.slice(1, 3);
  const gridPosts = blogPosts.slice(3, 6);

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section - Split Layout */}
      <section 
        ref={heroRef}
        className="min-h-[85vh] flex items-center px-4 lg:px-12 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        
        <div className={`max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10 transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Left - Text content - LEFT ALIGNED */}
          <div className="space-y-8">
            <div className="space-y-2">
              <span className="text-primary text-sm font-medium tracking-[0.3em] uppercase block">
                {language === "no" ? "Om Oss" : language === "sv" ? "Om Oss" : language === "fi" ? "Tietoa Meistä" : "About Us"}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] tracking-tight">
                {language === "no" ? (
                  <>Vi bygger fremtidens <span className="text-primary">Twitch-annonsering</span></>
                ) : language === "sv" ? (
                  <>Vi bygger framtidens <span className="text-primary">Twitch-reklam</span></>
                ) : language === "fi" ? (
                  <>Rakennamme tulevaisuuden <span className="text-primary">Twitch-mainontaa</span></>
                ) : (
                  <>Building the future of <span className="text-primary">Twitch advertising</span></>
                )}
              </h1>
            </div>
            
            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              {language === "no" ? "Et nordisk team dedikert til å skape autentiske forbindelser mellom merkevarer og Gen Z-publikum gjennom native streamer-integrasjoner." : 
               language === "sv" ? "Ett nordiskt team dedikerat till att skapa autentiska kopplingar mellan varumärken och Gen Z-publik genom nativa streamer-integreringar." : 
               language === "fi" ? "Pohjoismainen tiimi, joka on omistautunut luomaan aitoja yhteyksiä brändien ja Gen Z -yleisön välille natiivien streamaaja-integraatioiden kautta." : 
               "A Nordic team dedicated to creating authentic connections between brands and Gen Z audiences through native streamer integrations."}
            </p>

            {/* Stats Bento Grid */}
            <div className="grid grid-cols-3 gap-3 pt-4">
              <div className="group bg-card/50 backdrop-blur-sm p-5 rounded-2xl border border-border/50 hover:border-primary/30 hover:bg-card/80 transition-all duration-300">
                <span className="text-3xl lg:text-4xl font-bold text-primary block mb-1 group-hover:scale-110 transition-transform duration-300">50+</span>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  {language === "no" ? "Kampanjer" : language === "sv" ? "Kampanjer" : language === "fi" ? "Kampanjat" : "Campaigns"}
                </p>
              </div>
              <div className="group bg-card/50 backdrop-blur-sm p-5 rounded-2xl border border-border/50 hover:border-primary/30 hover:bg-card/80 transition-all duration-300">
                <span className="text-3xl lg:text-4xl font-bold text-primary block mb-1 group-hover:scale-110 transition-transform duration-300">1M+</span>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  {language === "no" ? "Visninger" : language === "sv" ? "Visningar" : language === "fi" ? "Näyttöä" : "Views"}
                </p>
              </div>
              <div className="group bg-card/50 backdrop-blur-sm p-5 rounded-2xl border border-border/50 hover:border-primary/30 hover:bg-card/80 transition-all duration-300">
                <span className="text-3xl lg:text-4xl font-bold text-primary block mb-1 group-hover:scale-110 transition-transform duration-300">4</span>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  {language === "no" ? "Markeder" : language === "sv" ? "Marknader" : language === "fi" ? "Markkinat" : "Markets"}
                </p>
              </div>
            </div>
          </div>

          {/* Right - Visual Element */}
          <div className="relative hidden lg:block">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-3xl opacity-30" />
            <div className="relative grid grid-cols-2 gap-4">
              {/* Decorative cards */}
              <div className="space-y-4">
                <div className="bg-card/80 backdrop-blur-sm p-6 rounded-2xl border border-border/50 transform hover:-translate-y-1 transition-transform duration-300">
                  <Target className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-semibold text-foreground mb-1">Native Ads</h3>
                  <p className="text-sm text-muted-foreground">Seamless integration</p>
                </div>
                <div className="bg-card/80 backdrop-blur-sm p-6 rounded-2xl border border-border/50 transform hover:-translate-y-1 transition-transform duration-300">
                  <Users className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-semibold text-foreground mb-1">Gen Z Focus</h3>
                  <p className="text-sm text-muted-foreground">Authentic reach</p>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-card/80 backdrop-blur-sm p-6 rounded-2xl border border-border/50 transform hover:-translate-y-1 transition-transform duration-300">
                  <Zap className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-semibold text-foreground mb-1">Real-time</h3>
                  <p className="text-sm text-muted-foreground">Live analytics</p>
                </div>
                <div className="bg-card/80 backdrop-blur-sm p-6 rounded-2xl border border-border/50 transform hover:-translate-y-1 transition-transform duration-300">
                  <TrendingUp className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-semibold text-foreground mb-1">Growth</h3>
                  <p className="text-sm text-muted-foreground">Proven results</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Timeline */}
      <section 
        ref={timelineRef}
        className="py-24 px-4 lg:px-12 bg-muted/20"
      >
        <div className={`max-w-6xl mx-auto transition-all duration-1000 delay-200 ${timelineVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-start gap-4 mb-16">
            <div className="w-1 h-16 bg-gradient-to-b from-primary to-primary/20 rounded-full" />
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                {language === "no" ? "Vår reise" : language === "sv" ? "Vår resa" : language === "fi" ? "Matkamme" : "Our Journey"}
              </h2>
              <p className="text-muted-foreground">
                {language === "no" ? "Fra idé til Nordens ledende Twitch-byrå" : language === "sv" ? "Från idé till Nordens ledande Twitch-byrå" : language === "fi" ? "Ideasta Pohjoismaiden johtavaksi Twitch-toimistoksi" : "From idea to the Nordics' leading Twitch agency"}
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Line */}
            <div className="absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-primary/50 to-primary/20 hidden md:block" />
            
            <div className="grid md:grid-cols-3 gap-8">
              {milestones.map((milestone, index) => (
                <div 
                  key={milestone.year}
                  className={`relative group transition-all duration-500 delay-${index * 100}`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Dot */}
                  <div className="hidden md:flex absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-primary rounded-full items-center justify-center z-10 group-hover:scale-125 transition-transform duration-300">
                    <div className="w-3 h-3 bg-background rounded-full" />
                  </div>
                  
                  {/* Card */}
                  <div className="bg-card/50 backdrop-blur-sm p-6 rounded-2xl border border-border/50 mt-8 group-hover:border-primary/30 group-hover:bg-card/80 transition-all duration-300">
                    <span className="text-4xl font-bold text-primary/30 block mb-2">{milestone.year}</span>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{milestone.title}</h3>
                    <p className="text-muted-foreground text-sm">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <Team t={t} language={language} />

      {/* Press Section */}
      <Press t={t} />

      {/* Blog Section - Magazine Layout */}
      <section 
        ref={blogRef}
        className="py-24 px-4 lg:px-12 bg-muted/20"
      >
        <div className={`max-w-7xl mx-auto transition-all duration-1000 ${blogVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-start justify-between gap-4 mb-12">
            <div className="flex items-start gap-4">
              <div className="w-1 h-16 bg-gradient-to-b from-primary to-primary/20 rounded-full" />
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {language === "no" ? "Siste innsikt" : language === "sv" ? "Senaste insikter" : language === "fi" ? "Viimeisimmät oivallukset" : "Latest Insights"}
                </h2>
                <p className="text-muted-foreground">
                  {language === "no" ? "Tanker om Twitch-annonsering og bransjetrender" : language === "sv" ? "Tankar om Twitch-reklam och branschtrender" : language === "fi" ? "Ajatuksia Twitch-mainonnasta ja alan trendeistä" : "Thoughts on Twitch advertising and industry trends"}
                </p>
              </div>
            </div>
            <Link 
              to="/blog" 
              className="hidden md:flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors group"
            >
              {language === "no" ? "Se alle artikler" : language === "sv" ? "Se alla artiklar" : language === "fi" ? "Näytä kaikki artikkelit" : "View all posts"}
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Featured + Sidebar Layout */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Featured Article - Takes 2 columns */}
            <Link 
              to={`/blog/${featuredPost.slug}`}
              className="lg:col-span-2 group relative overflow-hidden rounded-3xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-500"
            >
              <div className="aspect-[16/9] lg:aspect-[21/9] overflow-hidden">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium mb-4 inline-block">
                  {featuredPost.category}
                </span>
                <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {featuredPost.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2 max-w-2xl">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {featuredPost.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {featuredPost.readTime}
                  </span>
                </div>
              </div>
            </Link>

            {/* Sidebar - 2 stacked posts */}
            <div className="flex flex-col gap-6">
              {sidebarPosts.map((post) => (
                <Link 
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="group flex-1 bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="relative h-32 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2">
                      <span className="bg-primary/90 backdrop-blur-sm text-primary-foreground px-2 py-0.5 rounded-full text-[10px] font-medium">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Grid of remaining posts */}
          <div className="grid md:grid-cols-3 gap-6">
            {gridPosts.map((post) => (
              <Link 
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="relative h-40 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-primary/90 backdrop-blur-sm text-primary-foreground px-2.5 py-1 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all">
                    {readMoreText[lang] || readMoreText.en}
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer t={t} language={language} setLanguage={setLanguage} />
    </div>
  );
};

export default AboutUs;
