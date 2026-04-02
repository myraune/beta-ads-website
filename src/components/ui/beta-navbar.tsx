"use client";
import * as React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Menu,
  X,
  ChevronDown,
  Layers,
  BarChart3,
  Target,
  Tv,
  Sparkles,
  FileText,
  CreditCard,
  BookOpen,
  Newspaper,
  Users,
  HelpCircle,
  Monitor,
  Play,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeSwitch } from "@/components/ui/theme-switch-button";
import { useState, useCallback, useEffect, useRef } from "react";

/* ── Product dropdown items — scroll to homepage sections ── */
const productItems = [
  {
    icon: Layers,
    label: "Ad Formats",
    desc: "6 native overlay formats",
    scrollTo: "Ad formats",
  },
  {
    icon: Tv,
    label: "Live Demo",
    desc: "See overlays in action",
    scrollTo: "See it in action",
  },
  {
    icon: Target,
    label: "Platform Reach",
    desc: "39K+ streamers, 4 platforms",
    scrollTo: "Platforms and ad formats",
  },
  {
    icon: BarChart3,
    label: "Analytics",
    desc: "Real-time campaign data",
    scrollTo: "Features",
  },
  {
    icon: Monitor,
    label: "Twitch Ads",
    desc: "Native overlays on Twitch",
    href: "/twitch-advertising",
  },
  {
    icon: Play,
    label: "YouTube Ads",
    desc: "Overlays on YouTube Live",
    href: "/youtube-advertising",
  },
  {
    icon: Zap,
    label: "Kick Ads",
    desc: "First-mover on Kick",
    href: "/kick-advertising",
  },
];

/* ── About dropdown items ── */
const aboutItems = [
  {
    icon: FileText,
    label: "Case Studies",
    desc: "Real campaign results & ROI data",
    href: "/case-studies",
  },
  {
    icon: CreditCard,
    label: "Pricing",
    desc: "Plans for brands & agencies",
    href: "/pricing",
  },
  {
    icon: BookOpen,
    label: "Blog",
    desc: "Insights, guides & news",
    href: "/blog",
  },
  {
    icon: Newspaper,
    label: "Press",
    desc: "Beta in the media",
    href: "/press",
  },
  {
    icon: Users,
    label: "About Us",
    desc: "Our story & team",
    href: "/about",
  },
];

export function BetaNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const aboutDropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // When not scrolled and on homepage, navbar sits over the dark hero bg — use white text
  const isOnHero = !scrolled && location.pathname === "/";
  const navigate = useNavigate();

  useEffect(() => {
    setMobileOpen(false);
    setProductOpen(false);
    setAboutOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setProductOpen(false);
      }
      if (
        aboutDropdownRef.current &&
        !aboutDropdownRef.current.contains(e.target as Node)
      ) {
        setAboutOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const scrollToSection = (ariaLabel: string) => {
    setProductOpen(false);
    setMobileOpen(false);

    // If not on homepage, navigate first
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.querySelector(`[aria-label="${ariaLabel}"]`);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 400);
    } else {
      const el = document.querySelector(`[aria-label="${ariaLabel}"]`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[200] flex justify-center pointer-events-none">
      {/* ── Desktop ── */}
      {/* aria-label identifies this as the primary nav landmark for screen readers */}
      <nav
        aria-label="Main navigation"
        className={cn(
          "hidden lg:flex items-center gap-1 pointer-events-auto transition-all duration-500 ease-out mt-4 px-2 py-1.5 rounded-full",
          scrolled
            ? "bg-background/60 backdrop-blur-xl shadow-lg shadow-black/[0.08] ring-1 ring-white/[0.08] dark:ring-white/[0.06]"
            : "bg-transparent"
        )}
      >
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center group flex-shrink-0 px-3 py-1.5"
        >
          <img
            src="/lovable-uploads/favicon.png"
            alt="Beta Ads"
            className="h-6 w-auto transition-transform duration-200 group-hover:scale-105"
          />
        </Link>

        {/* Product dropdown */}
        <div ref={dropdownRef} className="relative">
          {/* aria-haspopup + aria-expanded: screen readers announce this as a menu button and its open/closed state */}
          <button
            onClick={() => { setProductOpen(!productOpen); setAboutOpen(false); }}
            aria-haspopup="true"
            aria-expanded={productOpen}
            className={cn(
              "flex items-center gap-1 px-3.5 py-1.5 text-[13px] font-medium rounded-full transition-all duration-200",
              productOpen
                ? isOnHero ? "text-white bg-white/15" : "text-foreground bg-foreground/[0.08]"
                : isOnHero ? "text-white/80 hover:text-white hover:bg-white/10" : "text-muted-foreground hover:text-foreground hover:bg-foreground/[0.05]"
            )}
          >
            Product
            <ChevronDown
              className={cn(
                "w-3 h-3 transition-transform duration-200",
                productOpen && "rotate-180"
              )}
            />
          </button>

          {/* Dropdown panel */}
          <div
            className={cn(
              "absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 rounded-2xl border border-border/50 bg-background/95 backdrop-blur-xl shadow-xl shadow-black/[0.12] transition-all duration-200 origin-top",
              productOpen
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
            )}
          >
            <div className="p-2">
              {productItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    onClick={() => {
                      if (item.href) {
                        navigate(item.href);
                      } else if (item.scrollTo) {
                        scrollToSection(item.scrollTo);
                      }
                    }}
                    className="w-full flex items-start gap-3 px-3 py-2.5 rounded-xl text-left hover:bg-foreground/[0.05] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-[13px] font-medium text-foreground">
                        {item.label}
                      </div>
                      <div className="text-[11px] text-muted-foreground">
                        {item.desc}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="border-t border-border/50 p-2">
              <a
                href="/#case-studies"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById("case-studies");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                  else window.location.href = "/#case-studies";
                }}
                className="flex items-center justify-between px-3 py-2 rounded-xl text-[12px] font-medium text-muted-foreground hover:text-foreground hover:bg-foreground/[0.05] transition-colors cursor-pointer"
              >
                View campaign highlights
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* About dropdown */}
        <div ref={aboutDropdownRef} className="relative">
          {/* aria-haspopup + aria-expanded: screen readers announce this as a menu button and its open/closed state */}
          <button
            onClick={() => { setAboutOpen(!aboutOpen); setProductOpen(false); }}
            aria-haspopup="true"
            aria-expanded={aboutOpen}
            className={cn(
              "flex items-center gap-1 px-3.5 py-1.5 text-[13px] font-medium rounded-full transition-all duration-200",
              aboutOpen || ["/case-studies", "/pricing", "/blog", "/press", "/about"].includes(location.pathname)
                ? isOnHero ? "text-white bg-white/15" : "text-foreground bg-foreground/[0.08]"
                : isOnHero ? "text-white/80 hover:text-white hover:bg-white/10" : "text-muted-foreground hover:text-foreground hover:bg-foreground/[0.05]"
            )}
          >
            About
            <ChevronDown
              className={cn(
                "w-3 h-3 transition-transform duration-200",
                aboutOpen && "rotate-180"
              )}
            />
          </button>

          {/* Dropdown panel */}
          <div
            className={cn(
              "absolute top-full right-0 mt-2 w-72 rounded-2xl border border-border/50 bg-background/95 backdrop-blur-xl shadow-xl shadow-black/[0.12] transition-all duration-200 origin-top",
              aboutOpen
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
            )}
          >
            <div className="p-2">
              {aboutItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <button
                    key={item.label}
                    onClick={() => {
                      setAboutOpen(false);
                      navigate(item.href);
                    }}
                    className={cn(
                      "w-full flex items-start gap-3 px-3 py-2.5 rounded-xl text-left hover:bg-foreground/[0.05] transition-colors group",
                      isActive && "bg-foreground/[0.05]"
                    )}
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-[13px] font-medium text-foreground">
                        {item.label}
                      </div>
                      <div className="text-[11px] text-muted-foreground">
                        {item.desc}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="border-t border-border/50 p-2">
              <a
                href="https://calendar.app.google/coW5NLQJtLxfRer19"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-3 py-2 rounded-xl text-[12px] font-medium text-muted-foreground hover:text-foreground hover:bg-foreground/[0.05] transition-colors cursor-pointer"
              >
                Book a demo call
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Right side: CTA + Theme toggle */}
        <div className="flex items-center gap-2 ml-2">
          <Link to="/streamers">
            <Button
              size="sm"
              className="rounded-full h-7 px-4 text-[12px] font-semibold bg-primary text-white hover:bg-primary/90"
            >
              I am a Streamer
            </Button>
          </Link>
          <ThemeSwitch className={isOnHero ? "text-white" : "text-foreground"} />
        </div>
      </nav>

      {/* ── Mobile ── */}
      <div className="lg:hidden w-full pointer-events-auto">
        <div
          className={cn(
            "mx-3 mt-3 flex items-center justify-between px-4 py-2.5 rounded-2xl transition-all duration-500",
            scrolled || mobileOpen
              ? "bg-background/60 backdrop-blur-xl shadow-lg shadow-black/[0.08] ring-1 ring-white/[0.08] dark:ring-white/[0.06]"
              : "bg-transparent"
          )}
        >
          <Link to="/" className="flex items-center">
            <img
              src="/lovable-uploads/favicon.png"
              alt="Beta Ads"
              className="h-6 w-auto"
            />
          </Link>
          <div className="flex items-center gap-2">
            <ThemeSwitch className={isOnHero && !mobileOpen ? "text-white" : "text-foreground"} />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={cn("p-1.5 rounded-full transition-colors", isOnHero && !mobileOpen ? "text-white hover:bg-white/10" : "text-foreground hover:bg-foreground/5")}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile dropdown — wrapped in <nav> for screen reader landmark support */}
        <nav
          id="mobile-nav"
          aria-label="Mobile navigation"
          aria-hidden={!mobileOpen}
          className={cn(
            "mx-3 mt-1 overflow-hidden transition-all duration-300 ease-out rounded-2xl",
            mobileOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="bg-background/80 backdrop-blur-xl ring-1 ring-white/[0.08] dark:ring-white/[0.06] shadow-lg shadow-black/[0.08] rounded-2xl px-3 py-3 space-y-0.5">
            {/* Product section */}
            <p className="px-4 pt-2 pb-1 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              Product
            </p>
            {productItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => {
                    if (item.href) {
                      navigate(item.href);
                    } else if (item.scrollTo) {
                      scrollToSection(item.scrollTo);
                    }
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-xl text-muted-foreground hover:text-foreground hover:bg-foreground/[0.05] transition-colors"
                >
                  <Icon className="w-4 h-4 text-primary" />
                  {item.label}
                </button>
              );
            })}

            <div className="h-px bg-border/50 my-2" />

            <p className="px-4 pt-2 pb-1 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              About
            </p>
            {aboutItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-xl transition-colors",
                    location.pathname === item.href
                      ? "text-foreground bg-foreground/[0.08]"
                      : "text-muted-foreground hover:text-foreground hover:bg-foreground/[0.05]"
                  )}
                >
                  <Icon className="w-4 h-4 text-primary" />
                  {item.label}
                </Link>
              );
            })}

            <div className="px-4 pt-2 pb-1">
              <Link to="/streamers" className="block">
                <Button className="w-full rounded-xl h-10 text-sm font-semibold bg-primary text-white hover:bg-primary/90">
                  I am a Streamer
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

