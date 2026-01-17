import React from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface Testimonial {
  quote: string;
  author: string;
  company: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "Beta Ads delivered 3x the engagement of our previous Twitch campaigns—at a lower CPM.",
    author: "Marketing Manager",
    company: "Vipps MobilePay",
  },
  {
    quote: "The native integration felt authentic. Our brand became part of the stream, not an interruption.",
    author: "Brand Director",
    company: "Samsung Nordic",
  },
  {
    quote: "Real-time tracking made it easy to justify budget.",
    author: "CMO",
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
        <div className="mb-10">
          <h2 className="text-2xl lg:text-3xl font-light text-foreground">
            What Brands Say
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.company}
              className={`p-6 transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Quote Text */}
              <blockquote className="text-foreground/90 text-base lg:text-lg leading-relaxed mb-5">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div>
                <p className="text-foreground text-sm font-medium">
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
