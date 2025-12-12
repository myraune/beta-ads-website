import React from "react";
import { Footer } from "@/components/sections/Footer";
import { Team } from "@/components/sections/Team";
import { Press } from "@/components/sections/Press";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface AboutUsProps {
  t: any;
  language: string;
  setLanguage: (lang: string) => void;
}

const blogPosts = [
  {
    id: 1,
    title: "How Twitch Advertising Works in 2024",
    excerpt: "A comprehensive guide to native advertising on Twitch and why traditional ads don't work for Gen Z audiences.",
    date: "Dec 10, 2024",
    readTime: "5 min read",
    image: "/lovable-uploads/71765092-972e-4792-a241-0f155a62af68.png",
    category: "Industry Insights"
  },
  {
    id: 2,
    title: "Case Study: Samsung's Twitch Campaign Success",
    excerpt: "How Samsung reached 2.5M unique viewers through native overlay ads without interrupting the stream.",
    date: "Dec 5, 2024",
    readTime: "4 min read",
    image: "/lovable-uploads/a3645b32-75a2-494d-aa42-f7b96dba1d94.png",
    category: "Case Studies"
  },
  {
    id: 3,
    title: "The Rise of Streamer-First Advertising",
    excerpt: "Why brands are shifting from interruptive ads to integrated experiences that respect both streamers and viewers.",
    date: "Nov 28, 2024",
    readTime: "6 min read",
    image: "/lovable-uploads/958b1a7f-a00c-46bc-acdb-bbefda64b9da.png",
    category: "Trends"
  }
];

const AboutUs: React.FC<AboutUsProps> = ({ t, language, setLanguage }) => {
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
              {language === "no" ? "Siste Innsikt" : 
               language === "sv" ? "Senaste Insikter" : 
               language === "fi" ? "Viimeisimmät Oivallukset" : 
               "Latest Insights"}
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {language === "no" ? "Utforsk våre tanker om Twitch-annonsering, streamertrender og bransjenyheter." : 
               language === "sv" ? "Utforska våra tankar om Twitch-reklam, streamertrender och branschnyheter." : 
               language === "fi" ? "Tutustu ajatuksiimme Twitch-mainonnasta, streamaajatrendeistä ja toimialauutisista." : 
               "Explore our thoughts on Twitch advertising, streamer trends, and industry news."}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <article 
                key={post.id}
                className="group bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 cursor-pointer"
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
                    {language === "no" ? "Les mer" : 
                     language === "sv" ? "Läs mer" : 
                     language === "fi" ? "Lue lisää" : 
                     "Read more"}
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer t={t} language={language} setLanguage={setLanguage} />
    </div>
  );
};

export default AboutUs;
