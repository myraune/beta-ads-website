import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CTAProps {
  t: any;
}

export const CTA: React.FC<CTAProps> = ({ t }) => (
  <section className="py-32 bg-gradient-to-br from-red-900 via-red-950 to-black text-white relative overflow-hidden">
    <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.02%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
    <div className="relative max-w-5xl mx-auto text-center px-8 lg:px-12">
      <h2 className="text-5xl md:text-7xl font-extralight mb-12 tracking-tighter">
        {t.ctaTitle}
      </h2>
      <p className="text-2xl text-gray-300 mb-16 max-w-3xl mx-auto font-extralight leading-relaxed tracking-wide">
        {t.ctaDescription}
      </p>

      <Button
        size="lg"
        className="bg-white text-black hover:bg-gray-50 px-16 py-8 text-xl font-light tracking-wide h-auto shadow-2xl hover:shadow-white/10 transition-all duration-300 hover:scale-105"
        onClick={() =>
          window.open(
            "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1RiJEObf5v758exr0hi5vk0ZRP0vgGQexQeAoykItGH1-RTFV1DQOye1rJbUSAqu7TdhWhRigO",
            "_blank"
          )
        }
      >
        {t.bookDemo}
        <ArrowRight className="ml-4 h-6 w-6" />
      </Button>
    </div>
  </section>
);