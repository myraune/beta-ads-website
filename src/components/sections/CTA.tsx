import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useSoundEffects } from "@/hooks/useSoundEffects";

interface CTAProps {
  t: any;
}

export const CTA: React.FC<CTAProps> = ({ t }) => {
  const { hover, whoosh } = useSoundEffects();
  
  return (
  <section 
    className="pt-16 pb-32 text-white relative overflow-hidden" 
    data-colors="#9f1c26,#4a0a0f,#0a0a0f"
    style={{ "--bg-strength": 0.75 } as React.CSSProperties}
  >
    <div className="relative max-w-5xl mx-auto text-center px-8 lg:px-12">
      <h2 className="text-5xl md:text-7xl font-extralight mb-12 tracking-tighter">
        {t.ctaTitle}
      </h2>
      <p className="text-2xl text-gray-300 mb-12 max-w-3xl mx-auto font-extralight leading-relaxed tracking-wide">
        {t.ctaDescription}
      </p>
      
      <div className="flex items-center justify-center mb-12 transition-all duration-300 hover:scale-105 cursor-pointer group" onMouseEnter={hover}>
        <div className="w-16 h-16 rounded-full overflow-hidden mr-4 ring-2 ring-white/20 transition-all duration-300 group-hover:ring-white/40 group-hover:shadow-lg">
          <img
            src="/lovable-uploads/e6d9646d-bf5f-471c-a2d8-1f06c274f570.png"
            alt="Andreas Myraune"
            className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110"
          />
        </div>
        <div className="text-left">
          <p className="text-lg font-light text-white tracking-wide transition-all duration-300 group-hover:text-gray-100">Andreas Myraune</p>
          <p className="text-sm text-gray-300 font-extralight tracking-wide transition-all duration-300 group-hover:text-gray-200">Head of Agency</p>
        </div>
      </div>

      <Button
        size="lg"
        className="bg-white text-black hover:bg-gray-50 px-16 py-8 text-xl font-light tracking-wide h-auto shadow-2xl hover:shadow-white/10 transition-all duration-300 hover:scale-105 hover:-translate-y-2"
        onClick={() => {
          whoosh();
          window.open(
            "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1RiJEObf5v758exr0hi5vk0ZRP0vgGQexQeAoykItGH1-RTFV1DQOye1rJbUSAqu7TdhWhRigO",
            "_blank"
          );
        }}
        onMouseEnter={hover}
      >
        {t.bookDemo}
        <ArrowRight className="ml-4 h-6 w-6" />
      </Button>
    </div>
  </section>
  );
};