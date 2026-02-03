import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Globe, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";

interface NavbarProps {
  language: string;
  setLanguage: (lang: string) => void;
}

const navLinks = [{
  href: "/case-studies",
  label: {
    en: "For brands",
    no: "For merkevarer",
    sv: "För varumärken",
    fi: "Brändeille"
  }
}, {
  href: "/streamers",
  label: {
    en: "For streamers",
    no: "For streamere",
    sv: "För streamers",
    fi: "Streamaajille"
  }
}];

const languages = [{
  code: "en",
  label: "English",
  flag: "🇬🇧"
}, {
  code: "no",
  label: "Norsk",
  flag: "🇳🇴"
}, {
  code: "sv",
  label: "Svenska",
  flag: "🇸🇪"
}, {
  code: "fi",
  label: "Suomi",
  flag: "🇫🇮"
}];

export const Navbar: React.FC<NavbarProps> = ({
  language,
  setLanguage
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  // Only show theme toggle after mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // IntersectionObserver for scroll detection - no scroll events!
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

  const currentLang = languages.find(l => l.code === language) || languages[0];

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Desktop Navigation */}
      <nav className="hidden lg:block pt-6">
        <div 
          className={`
            mx-auto max-w-[800px] px-8 py-3 rounded-full
            will-change-transform
            transition-[transform,background-color,box-shadow,backdrop-filter] duration-300 ease-out
            ${isScrolled 
              ? "bg-background/80 backdrop-blur-md shadow-lg shadow-black/10 scale-[0.98] -translate-y-1" 
              : "bg-background/5 backdrop-blur-none shadow-none scale-100 translate-y-0"
            }
          `}
          style={{ transform: isScrolled ? 'scale(0.98) translateY(-4px)' : 'scale(1) translateY(0)' }}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center group flex-shrink-0">
              <img 
                src="/lovable-uploads/favicon.png" 
                alt="Beta Ads" 
                className="h-7 w-auto transition-transform duration-200 group-hover:scale-105" 
              />
            </Link>

            {/* Nav Links - Center */}
            <div className="flex items-center gap-1">
              {navLinks.map(link => (
                <Link 
                  key={link.href} 
                  to={link.href} 
                  className={`px-4 py-2 text-sm font-light tracking-wide rounded-full transition-colors duration-200 ${
                    location.pathname === link.href 
                      ? "text-primary bg-primary/10" 
                      : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                  }`}
                >
                  {link.label[language as keyof typeof link.label] || link.label.en}
                </Link>
              ))}
            </div>

            {/* Theme Toggle & Language Selector - Right */}
            <div className="flex items-center gap-1 flex-shrink-0">
              {/* Theme Toggle */}
              {mounted && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={toggleTheme}
                  className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                  aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                >
                  {theme === "dark" ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                </Button>
              )}

              {/* Language Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 px-3 rounded-full text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                  >
                    <span className="text-sm">{currentLang.flag}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-background/90 backdrop-blur-xl shadow-xl shadow-black/15">
                  {languages.map(lang => (
                    <DropdownMenuItem 
                      key={lang.code} 
                      onClick={() => setLanguage(lang.code)} 
                      className={`cursor-pointer ${language === lang.code ? "bg-primary/10 text-primary" : ""}`}
                    >
                      <span className="mr-2">{lang.flag}</span>
                      {lang.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="lg:hidden">
        {/* Mobile Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-background/80 backdrop-blur-xl shadow-md shadow-black/10">
          <Link to="/" className="flex items-center">
            <img src="/lovable-uploads/favicon.png" alt="Beta Ads" className="h-7 w-auto" />
          </Link>
          <div className="flex items-center gap-2">
            {/* Mobile Theme Toggle */}
            {mounted && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={toggleTheme}
                className="h-9 w-9 rounded-lg text-foreground hover:bg-foreground/5"
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
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

        {/* Mobile Menu Dropdown */}
        <div className={`overflow-hidden transition-all duration-300 ease-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
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
                {link.label[language as keyof typeof link.label] || link.label.en}
              </Link>
            ))}

            {/* Mobile Language Selector */}
            <div className="pt-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                    <Globe className="h-4 w-4 mr-2" />
                    {currentLang.flag} {currentLang.label}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-background/95 backdrop-blur-xl shadow-xl shadow-black/15">
                  {languages.map(lang => (
                    <DropdownMenuItem 
                      key={lang.code} 
                      onClick={() => setLanguage(lang.code)} 
                      className={`cursor-pointer ${language === lang.code ? "bg-primary/10 text-primary" : ""}`}
                    >
                      <span className="mr-2">{lang.flag}</span>
                      {lang.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
