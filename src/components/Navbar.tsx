import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  language: string;
  setLanguage: (lang: string) => void;
}

const navLinks = [
  { href: "/case-studies", label: { en: "Our Work", no: "Vårt Arbeid", sv: "Vårt Arbete", fi: "Työmme" } },
  { href: "/how-it-works", label: { en: "How It Works", no: "Hvordan Det Fungerer", sv: "Hur Det Fungerar", fi: "Miten Se Toimii" } },
  { href: "/streamers", label: { en: "For Streamers", no: "For Streamere", sv: "För Streamers", fi: "Streamaajille" } },
  { href: "/about", label: { en: "About Us", no: "Om Oss", sv: "Om Oss", fi: "Tietoa Meistä" } },
];

const languages = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "no", label: "Norsk", flag: "🇳🇴" },
  { code: "sv", label: "Svenska", flag: "🇸🇪" },
  { code: "fi", label: "Suomi", flag: "🇫🇮" },
];

export const Navbar: React.FC<NavbarProps> = ({ language, setLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentLang = languages.find((l) => l.code === language) || languages[0];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "top-4" : ""
      }`}
    >
      <div className={`transition-all duration-500 ${
        scrolled 
          ? "mx-4 lg:mx-auto lg:max-w-3xl rounded-full bg-background/95 backdrop-blur-xl shadow-lg shadow-black/10 border border-border/30 px-4 lg:px-6"
          : "max-w-7xl mx-auto px-6 lg:px-8"
      }`}>
        <div className={`flex items-center justify-between transition-all duration-300 ${
          scrolled ? "h-12 lg:h-14" : "h-16 lg:h-20"
        }`}>
          {/* Logo Icon */}
          <Link to="/" className="flex items-center group">
            <img
              src="/lovable-uploads/favicon.png"
              alt="Beta Ads"
              className={`w-auto transition-all duration-300 group-hover:scale-105 ${
                scrolled ? "h-6 lg:h-7" : "h-8 lg:h-9"
              }`}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-2 text-sm font-light tracking-wide transition-all duration-300 rounded-lg ${
                  location.pathname === link.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {link.label[language as keyof typeof link.label] || link.label.en}
              </Link>
            ))}
          </div>

          {/* Right side - Language + CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Globe className="h-4 w-4 mr-2" />
                  <span className="text-sm">{currentLang.flag}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card/95 backdrop-blur-xl border-border/50">
                {languages.map((lang) => (
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

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-background/95 backdrop-blur-xl border-t border-border/50 px-6 py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 text-sm font-light tracking-wide transition-all duration-300 rounded-lg ${
                location.pathname === link.href
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              {link.label[language as keyof typeof link.label] || link.label.en}
            </Link>
          ))}
          
          <div className="pt-4 border-t border-border/50">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <Globe className="h-4 w-4 mr-2" />
                  {currentLang.flag} {currentLang.label}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-card/95 backdrop-blur-xl border-border/50">
                {languages.map((lang) => (
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
  );
};
