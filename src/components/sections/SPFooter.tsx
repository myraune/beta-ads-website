import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const footerLinks = {
  PLATFORM: [
    { label: "Stream Overlays", to: "/how-it-works" },
    { label: "Voice Recognition", to: "/how-it-works" },
    { label: "Streamers", to: "/streamers" },
    { label: "Analytics", to: "/how-it-works" },
    { label: "Contact", to: "/contact" },
  ],
  RESOURCES: [
    { label: "Blog", to: "/blog" },
    { label: "Case Studies", to: "/" },
    { label: "Press", to: "/press" },
  ],
  COMPANY: [
    { label: "Contact Us", to: "/contact" },
    { label: "About Us", to: "/about" },
    { label: "Partnership Contact", to: "/contact" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/betaads/" },
  ],
  LEGAL: [
    { label: "Terms of Service", to: "/terms" },
    { label: "Privacy Policy", to: "/privacy" },
  ],
};

export const SPFooter: React.FC = () => {
  return (
    <footer className="bg-[#111111] text-white" role="contentinfo">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    {"href" in link && link.href ? (
                      <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm text-white/70 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:text-white focus-visible:underline">
                        {link.label}
                      </a>
                    ) : (
                      <Link to={link.to || "#"} className="text-sm text-white/70 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:text-white focus-visible:underline">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Get Started column */}
          <div>
            <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-4">GET STARTED</h4>
            <a
              href="https://calendar.app.google/coW5NLQJtLxfRer19"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="rounded-full border-white/20 text-white hover:bg-white/10 hover:text-white text-sm font-medium mb-3 transition-all duration-300">
                Book a Demo
              </Button>
            </a>
            <Link to="/streamers" className="block text-sm text-white/70 hover:text-white transition-colors mt-2">
              For Streamers →
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          {/* Social links */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">FOLLOW US ON OUR SOCIALS</p>
              <div className="flex items-center gap-4">
                <a href="https://www.linkedin.com/company/betaads/" target="_blank" rel="noopener noreferrer" className="text-sm text-white/70 hover:text-white transition-colors flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  LinkedIn
                </a>
                <a href="https://discord.gg/betaads" target="_blank" rel="noopener noreferrer" className="text-sm text-white/70 hover:text-white transition-colors flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.838-9.674-3.5485-13.6604a.061.061 0 00-.0312-.0286z"/></svg>
                  Discord
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
            <div className="flex items-center gap-2">
              <span className="text-lg font-black tracking-tight">beta ads</span>
              <span className="text-xs text-white/40">© 2026 All rights reserved.</span>
            </div>
            <p className="text-xs text-white/40">
              Made with kaffe in Oslo, Stockholm & Helsinki
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
