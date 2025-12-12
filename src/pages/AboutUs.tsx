import React from "react";
import { Footer } from "@/components/sections/Footer";
import { Team } from "@/components/sections/Team";
import { Press } from "@/components/sections/Press";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { blogPosts } from "@/data/blogPosts";

interface AboutUsProps {
  t: any;
  language: string;
  setLanguage: (lang: string) => void;
}

const AboutUs: React.FC<AboutUsProps> = ({ t, language, setLanguage }) => {
  const readMoreText = {
    en: "Read more",
    no: "Les mer",
    sv: "Läs mer",
    fi: "Lue lisää"
  };

  const blogTitle = {
    en: "Latest Insights",
    no: "Siste Innsikt",
    sv: "Senaste Insikter",
    fi: "Viimeisimmät Oivallukset"
  };

  const blogDescription = {
    en: "Explore our thoughts on Twitch advertising, streamer trends, and industry news.",
    no: "Utforsk våre tanker om Twitch-annonsering, streamertrender og bransjenyheter.",
    sv: "Utforska våra tankar om Twitch-reklam, streamertrender och branschnyheter.",
    fi: "Tutustu ajatuksiimme Twitch-mainonnasta, streamaajatrendeistä ja toimialauutisista."
  };

  const lang = language as keyof typeof readMoreText;

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="text-primary text-sm font-medium tracking-widest uppercase mb-4 block">
            {language === "no" ? "Om Oss" : language === "sv" ? "Om Oss" : language === "fi" ? "Tietoa Meistä" : "About Us"}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            {language === "no" ? "Vi Revolusjonerer Twitch-Annonsering" : 
             language === "sv" ? "Vi Revolutionerar Twitch-Reklam" : 
             language === "fi" ? "Vallankumouksellista Twitch-Mainontaa" : 
             "Revolutionizing Twitch Advertising"}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {language === "no" ? "Vi er et nordisk team som brenner for å skape en bedre annonseringsopplevelse for streamere, seere og merkevarer." : 
             language === "sv" ? "Vi är ett nordiskt team som brinner för att skapa en bättre reklamupplevelse för streamers, tittare och varumärken." : 
             language === "fi" ? "Olemme pohjoismainen tiimi, joka on intohimoinen paremman mainoskokemuksen luomisesta streamaajille, katsojille ja brändeille." : 
             "We're a Nordic team passionate about creating a better advertising experience for streamers, viewers, and brands alike."}
          </p>
        </div>
      </section>

      {/* Team Section */}
      <Team t={t} />

      {/* Press Section */}
      <Press t={t} />

      {/* Blog Section */}
      <section className="py-20 lg:py-28 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-primary text-sm font-medium tracking-widest uppercase mb-3 block">
              {language === "no" ? "Blogg" : language === "sv" ? "Blogg" : language === "fi" ? "Blogi" : "Blog"}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {blogTitle[lang] || blogTitle.en}
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {blogDescription[lang] || blogDescription.en}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.slice(0, 6).map((post) => (
              <Link 
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-primary/90 backdrop-blur-sm text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {post.excerpt}
                  </p>
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
