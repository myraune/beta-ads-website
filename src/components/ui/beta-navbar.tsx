"use client";
import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import type { ReactElement } from "react";
import { useTheme } from "next-themes";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import {
  Monitor,
  Moon,
  Sun,
  ArrowRight,
  Tv,
  BarChart3,
  Target,
  Layers,
  Eye,
  Mic,
  Vote,
  Image,
  Users,
  TrendingUp,
  FileText,
  BookOpen,
  Newspaper,
  MessageSquare,
  Gamepad2,
  DollarSign,
  Shield,
  Zap,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useCallback, useEffect } from "react";

const forBrands: {
  title: string;
  icon: ReactElement;
  href: string;
  description: string;
}[] = [
  {
    title: "Native Overlays",
    href: "/how-it-works",
    icon: <Layers strokeWidth={2} />,
    description: "Ads that blend into the stream",
  },
  {
    title: "Voice Recognition",
    href: "/how-it-works",
    icon: <Mic strokeWidth={2} />,
    description: "AI-triggered brand moments",
  },
  {
    title: "Voting Mechanism",
    href: "/how-it-works",
    icon: <Vote strokeWidth={2} />,
    description: "Interactive viewer engagement",
  },
  {
    title: "Display Ads",
    href: "/how-it-works",
    icon: <Image strokeWidth={2} />,
    description: "Banner and overlay formats",
  },
];

const results: {
  title: string;
  icon: ReactElement;
  href: string;
  description: string;
}[] = [
  {
    title: "Case Studies",
    href: "/case-studies",
    icon: <FileText strokeWidth={2} />,
    description: "Real campaigns, real results",
  },
  {
    title: "Live Dashboard",
    href: "/demo",
    icon: <BarChart3 strokeWidth={2} />,
    description: "Track performance in real-time",
  },
  {
    title: "Audience Insights",
    href: "/case-studies",
    icon: <Target strokeWidth={2} />,
    description: "Reach Gen Z authentically",
  },
  {
    title: "Bypass Adblock",
    href: "/how-it-works",
    icon: <Eye strokeWidth={2} />,
    description: "100% viewability guaranteed",
  },
];

const forStreamers: {
  title: string;
  icon: ReactElement;
  href: string;
  description: string;
}[] = [
  {
    title: "Earn Passively",
    href: "/streamers",
    icon: <DollarSign strokeWidth={2} />,
    description: "Income based on viewership",
  },
  {
    title: "No Shoutouts",
    href: "/streamers",
    icon: <Shield strokeWidth={2} />,
    description: "Zero forced integrations",
  },
  {
    title: "Auto Overlays",
    href: "/streamers",
    icon: <Zap strokeWidth={2} />,
    description: "Set up once, earn forever",
  },
  {
    title: "Multi-Platform",
    href: "/streamers",
    icon: <Gamepad2 strokeWidth={2} />,
    description: "Twitch, YouTube, Kick",
  },
];

const resources: {
  title: string;
  icon: ReactElement;
  href: string;
  description: string;
}[] = [
  {
    title: "Blog",
    href: "/blog",
    icon: <BookOpen strokeWidth={2} />,
    description: "Insights & industry trends",
  },
  {
    title: "Press",
    href: "/press",
    icon: <Newspaper strokeWidth={2} />,
    description: "Beta Ads in the media",
  },
  {
    title: "About Us",
    href: "/about",
    icon: <Users strokeWidth={2} />,
    description: "Meet the team",
  },
  {
    title: "Contact",
    href: "/contact",
    icon: <MessageSquare strokeWidth={2} />,
    description: "Get in touch",
  },
];

export function BetaNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Desktop Navigation */}
      <div
        className={`hidden lg:flex px-4 w-full bg-background/80 backdrop-blur-md items-center h-16 justify-between transition-all duration-300 ${
          scrolled ? "border-b border-border shadow-sm" : "border-b border-transparent"
        }`}
      >
        <div className="flex items-center justify-between w-full mx-auto max-w-7xl">
          <div className="flex h-14 items-center">
            <Link to="/" className="flex items-center group flex-shrink-0 mr-2">
              <img
                src="/lovable-uploads/favicon.png"
                alt="Beta Ads"
                className="h-7 w-auto transition-transform duration-200 group-hover:scale-105"
              />
            </Link>
            <NavigationMenu className="ml-6">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "rounded-full h-8 font-normal text-muted-foreground bg-transparent hover:bg-foreground/5"
                    )}
                  >
                    For Brands
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-background/95 backdrop-blur-xl">
                    <ul className="grid w-[400px] pt-2 grid-cols-2 md:w-[550px]">
                      <div>
                        <span className="p-4 text-xs text-muted-foreground/60 uppercase tracking-wider">
                          Ad Formats
                        </span>
                        {forBrands.map((component) => (
                          <ListItem
                            key={component.title}
                            title={component.title}
                            icon={component.icon}
                            href={component.href}
                          >
                            {component.description}
                          </ListItem>
                        ))}
                      </div>
                      <div>
                        <span className="p-4 text-xs text-muted-foreground/60 uppercase tracking-wider">
                          Results
                        </span>
                        {results.map((component) => (
                          <ListItem
                            key={component.title}
                            title={component.title}
                            icon={component.icon}
                            href={component.href}
                          >
                            {component.description}
                          </ListItem>
                        ))}
                      </div>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "rounded-full h-8 font-normal text-muted-foreground bg-transparent hover:bg-foreground/5"
                    )}
                  >
                    For Streamers
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-background/95 backdrop-blur-xl">
                    <ul className="grid w-[280px] pt-2 grid-cols-1">
                      <div>
                        <span className="p-4 text-xs text-muted-foreground/60 uppercase tracking-wider">
                          Streamer Benefits
                        </span>
                        {forStreamers.map((component) => (
                          <ListItem
                            key={component.title}
                            title={component.title}
                            icon={component.icon}
                            href={component.href}
                          >
                            {component.description}
                          </ListItem>
                        ))}
                      </div>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "rounded-full h-8 font-normal text-muted-foreground bg-transparent hover:bg-foreground/5"
                    )}
                  >
                    Resources
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-background/95 backdrop-blur-xl">
                    <ul className="grid w-[280px] pt-2 grid-cols-1">
                      <div>
                        <span className="p-4 text-xs text-muted-foreground/60 uppercase tracking-wider">
                          Company
                        </span>
                        {resources.map((component) => (
                          <ListItem
                            key={component.title}
                            title={component.title}
                            icon={component.icon}
                            href={component.href}
                          >
                            {component.description}
                          </ListItem>
                        ))}
                      </div>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "rounded-full h-8 font-normal text-muted-foreground bg-transparent hover:bg-foreground/5"
                    )}
                  >
                    <Link to="/pricing">Pricing</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex gap-2 items-center">
            <ThemeSwitcher />
            <Link to="/contact">
              <Button variant="outline" size="sm" className="rounded-full h-8 text-xs font-light tracking-wide">
                Contact
              </Button>
            </Link>
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

      {/* Mobile Navigation */}
      <nav className="lg:hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-background/80 backdrop-blur-xl shadow-md shadow-black/10">
          <Link to="/" className="flex items-center">
            <img src="/lovable-uploads/favicon.png" alt="Beta Ads" className="h-7 w-auto" />
          </Link>
          <div className="flex items-center gap-2">
            <ThemeSwitcher />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-foreground rounded-lg hover:bg-foreground/5 transition-colors"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 ease-out ${
            mobileOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 py-4 bg-background/95 backdrop-blur-xl shadow-lg shadow-black/10 space-y-1">
            <MobileSection title="For Brands">
              <MobileLink href="/case-studies" label="Case Studies" />
              <MobileLink href="/how-it-works" label="How It Works" />
              <MobileLink href="/demo" label="Live Dashboard" />
            </MobileSection>
            <MobileSection title="For Streamers">
              <MobileLink href="/streamers" label="Streamer Portal" />
            </MobileSection>
            <MobileSection title="Resources">
              <MobileLink href="/blog" label="Blog" />
              <MobileLink href="/press" label="Press" />
              <MobileLink href="/about" label="About Us" />
              <MobileLink href="/pricing" label="Pricing" />
              <MobileLink href="/contact" label="Contact" />
            </MobileSection>
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
}

function MobileSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="py-2">
      <span className="px-4 text-xs text-muted-foreground/60 uppercase tracking-wider">{title}</span>
      <div className="mt-1 space-y-0.5">{children}</div>
    </div>
  );
}

function MobileLink({ href, label }: { href: string; label: string }) {
  const location = useLocation();
  return (
    <Link
      to={href}
      className={`block px-4 py-2.5 text-sm font-light tracking-wide rounded-lg transition-colors ${
        location.pathname === href
          ? "text-primary bg-primary/10"
          : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
      }`}
    >
      {label}
    </Link>
  );
}

function ListItem({
  title,
  icon,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & {
  href: string;
  icon: ReactElement;
}) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild className="hover:bg-transparent">
        <Link to={href}>
          <div className="group/item flex gap-3 items-start rounded-md p-2 transition-colors">
            <div className="border rounded-sm p-2 transition-all duration-200 group-hover/item:bg-foreground group-hover/item:text-background group-hover/item:scale-105">
              {icon}
            </div>
            <div>
              <div className="text-sm font-medium leading-none transition-colors duration-200 group-hover/item:text-foreground">
                {title}
              </div>
              <p className="text-muted-foreground line-clamp-2 pt-1 text-xs leading-snug transition-colors duration-200 group-hover/item:text-foreground/70">
                {children}
              </p>
            </div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

const themes = [
  {
    key: "system",
    icon: Monitor,
    label: "System theme",
  },
  {
    key: "light",
    icon: Sun,
    label: "Light theme",
  },
  {
    key: "dark",
    icon: Moon,
    label: "Dark theme",
  },
];

const ThemeSwitcher = ({ className }: { className?: string }) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const handleThemeClick = useCallback(
    (themeKey: "light" | "dark" | "system") => {
      setTheme(themeKey);
    },
    [setTheme]
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className={cn(
        "relative isolate flex h-7 rounded-full bg-background p-1 ring-1 ring-border",
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
              <div className="absolute inset-0 rounded-full bg-secondary" />
            )}
            <Icon
              className={cn(
                "relative z-10 m-auto h-3.5 w-3.5",
                isActive ? "text-foreground" : "text-muted-foreground"
              )}
            />
          </button>
        );
      })}
    </div>
  );
};
