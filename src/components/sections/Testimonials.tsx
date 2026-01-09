import React from "react";
import { Quote } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "Beta Ads delivered 3x the engagement of our previous Twitch campaigns—at a lower CPM.",
    author: "Marketing Manager",
    role: "",
    company: "Vipps MobilePay",
  },
  {
    quote: "The native integration felt authentic. Our brand became part of the stream, not an interruption.",
    author: "Brand Director",
    role: "",
    company: "Samsung Nordic",
  },
  {
    quote: "Real-time tracking made it easy to justify budget.",
    author: "CMO",
    role: "",
    company: "Komplett",
  },
];

export const Testimonials: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section 
      ref={ref}
      className={`py-16 lg:py-24 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-2xl lg:text-3xl font-light text-foreground mb-3">
            What Brands Say
          </h2>
          <p className="text-muted-foreground text-base max-w-md">
            Trusted by leading Nordic brands
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.company}
              className={`group relative p-6 lg:p-8 rounded-xl border border-border/30 bg-card/30 backdrop-blur-sm transition-all duration-500 hover:border-primary/40 hover:bg-card/50 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-primary/30 mb-4" />

              {/* Quote Text */}
              <blockquote className="text-foreground text-lg leading-relaxed mb-6">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="border-t border-border/30 pt-4">
                <p className="text-foreground font-medium text-sm">
                  {testimonial.author}
                </p>
                <p className="text-muted-foreground text-sm">
                  {testimonial.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
