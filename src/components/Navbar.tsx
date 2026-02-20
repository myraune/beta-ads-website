import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

const navLinks = [
  { href: "/case-studies", label: "For brands" },
  { href: "/streamers", label: "For streamers" },
  { href: "/pricing", label: "Pricing" },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  useEffect(() => {
    const sentinel = document.getElementById('navbar-sentinel');
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsScrolled(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Desktop Navigation */}
      <nav className="hidden lg:block pt-6">
        <div 
          className={`
            mx-auto max-w-[900px] px-6 py-2.5 rounded-full
            will-change-transform
            transition-[transform,background-color,box-shadow,backdrop-filter] duration-300 ease-out
            ${isScrolled 
              ? "bg-background/80 backdrop-blur-md shadow-lg shadow-black/10 scale-[0.98] -translate-y-1" 
              : "bg-background/5 backdrop-blur-none shadow-none scale-100 translate-y-0"
            }
          `}
        >
          <div className="relative flex items-center justify-between">
            <Link to="/" className="flex items-center group flex-shrink-0">
              <img 
                src="/lovable-uploads/favicon.png" 
                alt="Beta Ads" 
                className="h-7 w-auto transition-transform duration-200 group-hover:scale-105" 
              />
            </Link>

            <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
              {navLinks.map(link => (
                <Link 
                  key={link.href} 
                  to={link.href} 
                  className={`px-3 py-2 text-sm font-light tracking-wide rounded-full transition-colors duration-200 ${
                    location.pathname === link.href 
                      ? "text-primary bg-primary/10" 
                      : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              {mounted && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={toggleTheme}
                  className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                  aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                >
                  {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
              )}
              <Link to="/demo">
                <Button
                  size="sm"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-light tracking-wide h-8 px-4 rounded-full shadow-md shadow-primary/20"
                >
                  Book a Demo
                  <ArrowRight className="ml-1.5 h-3 w-3" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="lg:hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-background/80 backdrop-blur-xl shadow-md shadow-black/10">
          <Link to="/" className="flex items-center">
            <img src="/lovable-uploads/favicon.png" alt="Beta Ads" className="h-7 w-auto" />
          </Link>
          <div className="flex items-center gap-2">
            {mounted && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={toggleTheme}
                className="h-9 w-9 rounded-lg text-foreground hover:bg-foreground/5"
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            )}
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="p-2 text-foreground rounded-lg hover:bg-foreground/5 transition-colors" 
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        <div className={`overflow-hidden transition-all duration-300 ease-out ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="px-4 py-4 bg-background/95 backdrop-blur-xl shadow-lg shadow-black/10 space-y-2">
            {navLinks.map(link => (
              <Link 
                key={link.href} 
                to={link.href} 
                className={`block px-4 py-3 text-sm font-light tracking-wide rounded-lg transition-colors ${
                  location.pathname === link.href 
                    ? "text-primary bg-primary/10" 
                    : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 space-y-2 border-t border-border">
              <Link to="/demo" className="block">
                <Button
                  size="sm"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-light tracking-wide h-10 rounded-lg shadow-md shadow-primary/20"
                >
                  Book a Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
