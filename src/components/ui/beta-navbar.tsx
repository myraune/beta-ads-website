"use client";
import * as React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import {
  Monitor,
  Moon,
  Sun,
  ArrowRight,
  Menu,
  X,
  ChevronDown,
  Layers,
  BarChart3,
  Target,
  Tv,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
    icon: Sparkles,
    label: "AI Features",
    desc: "Voice recognition & clipping",
    href: "/how-it-works",
  },
];

export function BetaNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setMobileOpen(false);
    setProductOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setProductOpen(false);
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
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      {/* ── Desktop ── */}
      <nav
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
          <button
            onClick={() => setProductOpen(!productOpen)}
            className={cn(
              "flex items-center gap-1 px-3.5 py-1.5 text-[13px] font-medium rounded-full transition-all duration-200",
              productOpen
                ? "text-foreground bg-foreground/[0.08]"
                : "text-muted-foreground hover:text-foreground hover:bg-foreground/[0.05]"
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
              <Link
                to="/case-studies"
                className="flex items-center justify-between px-3 py-2 rounded-xl text-[12px] font-medium text-muted-foreground hover:text-foreground hover:bg-foreground/[0.05] transition-colors"
              >
                View case studies
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Direct links */}
        <Link
          to="/streamers"
          className={cn(
            "px-3.5 py-1.5 text-[13px] font-medium rounded-full transition-all duration-200",
            location.pathname === "/streamers"
              ? "text-foreground bg-foreground/[0.08]"
              : "text-muted-foreground hover:text-foreground hover:bg-foreground/[0.05]"
          )}
        >
          Streamers
        </Link>

        <Link
          to="/pricing"
          className={cn(
            "px-3.5 py-1.5 text-[13px] font-medium rounded-full transition-all duration-200",
            location.pathname === "/pricing"
              ? "text-foreground bg-foreground/[0.08]"
              : "text-muted-foreground hover:text-foreground hover:bg-foreground/[0.05]"
          )}
        >
          Pricing
        </Link>

        {/* Right side: theme + CTA */}
        <div className="flex items-center gap-2 ml-2">
          <ThemeSwitcher />
          <a
            href="https://calendar.app.google/coW5NLQJtLxfRer19"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="sm"
              className="rounded-full h-7 px-4 text-[12px] font-semibold bg-primary text-white hover:bg-primary/90"
            >
              Book a Demo
            </Button>
          </a>
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
            <ThemeSwitcher />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-1.5 text-foreground rounded-full hover:bg-foreground/5 transition-colors"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <div
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

            {/* Pages */}
            <Link
              to="/streamers"
              className={cn(
                "block px-4 py-2.5 text-sm font-semibold rounded-xl transition-colors",
                location.pathname === "/streamers"
                  ? "text-foreground bg-foreground/[0.08]"
                  : "text-foreground hover:bg-foreground/[0.05]"
              )}
            >
              For Streamers
            </Link>
            <Link
              to="/pricing"
              className="block px-4 py-2.5 text-sm font-medium rounded-xl text-muted-foreground hover:text-foreground hover:bg-foreground/[0.05] transition-colors"
            >
              Pricing
            </Link>
            <Link
              to="/about"
              className="block px-4 py-2.5 text-sm font-medium rounded-xl text-muted-foreground hover:text-foreground hover:bg-foreground/[0.05] transition-colors"
            >
              About
            </Link>

            <div className="px-4 pt-2 pb-1">
              <a
                href="https://calendar.app.google/coW5NLQJtLxfRer19"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button className="w-full rounded-xl h-10 text-sm font-semibold bg-primary text-white hover:bg-primary/90">
                  Book a Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ── Theme Switcher ── */

const themes = [
  { key: "system", icon: Monitor, label: "System theme" },
  { key: "light", icon: Sun, label: "Light theme" },
  { key: "dark", icon: Moon, label: "Dark theme" },
];

const ThemeSwitcher = ({ className }: { className?: string }) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const handleThemeClick = useCallback(
    (themeKey: "light" | "dark" | "system") => setTheme(themeKey),
    [setTheme]
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={cn(
        "relative isolate flex h-7 rounded-full bg-background/50 p-1 ring-1 ring-border/50",
        className
      )}
    >
      {themes.map(({ key, icon: Icon, label }) => {
        const isActive = theme === key;
        return (
          <button
            aria-label={label}
            className="relative h-5 w-6 rounded-full"
            key={key}
            onClick={() => handleThemeClick(key as "light" | "dark" | "system")}
            type="button"
          >
            {isActive && (
              <div className="absolute inset-0 rounded-full bg-foreground/10" />
            )}
            <Icon
              className={cn(
                "relative z-10 m-auto h-3.5 w-3.5 transition-colors",
                isActive ? "text-foreground" : "text-muted-foreground"
              )}
            />
          </button>
        );
      })}
    </div>
  );
};
