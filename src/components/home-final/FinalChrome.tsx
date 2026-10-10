import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "next-themes";
import { BOOKING_SHORT_LINK } from "@/components/BookingCalendar";

/* Nav, footer and shared bits for the final-platform homepage ("/").
   Markup mirrors ~/dev/beta-ads-home-v3/31-final-platform/index.html. */

export const LOGO_LIGHT = "/lovable-uploads/logo-color.png"; // H_COLOR
export const LOGO_DARK = "/lovable-uploads/logo-red-white.png"; // H_RED+WHITE

/** Internal routes use the router, everything else is a plain anchor. */
export const A: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }> = ({ href, children, ...rest }) =>
  href.startsWith("/") ? (
    <Link to={href} {...rest}>
      {children}
    </Link>
  ) : (
    <a href={href} {...rest}>
      {children}
    </a>
  );

/** The site-wide booking link; ConversionTracker counts it as book_demo_click. */
export const BookDemo: React.FC<{ className?: string; children?: React.ReactNode }> = ({ className = "btn", children = "Book a demo" }) => (
  <a className={className} href={BOOKING_SHORT_LINK} data-cta="book" target="_blank" rel="noopener">
    {children}
  </a>
);

export const Arrow = () => <span aria-hidden="true">&rarr;</span>;

/** Theme switch on next-themes. Picking the OS look goes back to "system" so the
    page keeps following the Mac setting; the other look is saved (beta-theme). */
const ThemeSwitch: React.FC = () => {
  const { resolvedTheme, systemTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const dark = mounted && resolvedTheme === "dark";
  const toggle = () => {
    const next = resolvedTheme === "dark" ? "light" : "dark";
    const root = document.documentElement;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.classList.add("theming");
      window.setTimeout(() => root.classList.remove("theming"), 260);
    }
    setTheme(next === systemTheme ? "system" : next);
  };
  return (
    <button className="theme" type="button" aria-label={dark ? "Switch to light mode" : "Switch to dark mode"} onClick={toggle}>
      <svg className="theme__sun" viewBox="0 0 16 16" aria-hidden="true">
        <circle cx="8" cy="8" r="3" />
        <path d="M8 1.5v1.6M8 12.9v1.6M1.5 8h1.6M12.9 8h1.6M3.4 3.4l1.1 1.1M11.5 11.5l1.1 1.1M3.4 12.6l1.1-1.1M11.5 4.5l1.1-1.1" />
      </svg>
      <svg className="theme__moon" viewBox="0 0 16 16" aria-hidden="true">
        <path d="M13.6 9.8A5.9 5.9 0 0 1 6.2 2.4a5.9 5.9 0 1 0 7.4 7.4z" />
      </svg>
    </button>
  );
};

export const FinalNav: React.FC = () => (
  <header className="nav">
    <div className="nav__in">
      <Link to="/" className="nav__logo" aria-label="Beta Ads home">
        <img className="for-light" src={LOGO_LIGHT} alt="Beta Ads" width={95} height={23} />
        <img className="for-dark" src={LOGO_DARK} alt="Beta Ads" width={95} height={23} />
      </Link>
      <nav className="nav__links" aria-label="Main">
        <a href="#tour">Product</a>
        <Link to="/case-studies">Customers</Link>
        <Link to="/twitch-advertising-cost">Pricing</Link>
        <Link to="/working-with-us">Agencies</Link>
      </nav>
      <Link className="nav__side" to="/streamers">
        For streamers
      </Link>
      <ThemeSwitch />
      <BookDemo className="btn btn--sm" />
    </div>
  </header>
);

const FOOT_COLS: { h: string; links: [string, string][] }[] = [
  { h: "Product", links: [["How it works", "/twitch-advertising"], ["Setup verification", "/campaign-compliance"], ["Chat tracking", "/livestream-chat-engagement"], ["Replay reach", "/replay-reach"]] },
  { h: "Platforms", links: [["Twitch", "/twitch-advertising"], ["YouTube", "/youtube-advertising"], ["Kick", "/kick-advertising"], ["Nordics", "/nordic-livestream-advertising"]] },
  { h: "Customers", links: [["Case studies", "/case-studies"], ["Samsung", "/case-study/samsung"], ["Komplett", "/case-study/komplett"], ["Shure", "/case-study/shure"]] },
  { h: "Company", links: [["About", "/about"], ["Press", "/press"], ["Blog", "/blog"], ["Working with us", "/working-with-us"], ["Contact", "/contact"]] },
  { h: "For streamers", links: [["Join as a streamer", "/streamers"]] },
];

export const FinalFooter: React.FC = () => (
  <footer className="foot">
    <div className="foot__top">
      <div className="foot__brand">
        <img className="for-light" src={LOGO_LIGHT} alt="Beta Ads" width={86} height={21} loading="lazy" />
        <img className="for-dark" src={LOGO_DARK} alt="Beta Ads" width={86} height={21} loading="lazy" />
        <p>The platform for animated brand overlays inside live streams on Twitch, YouTube and Kick.</p>
      </div>
      <nav className="foot__cols" aria-label="Footer">
        {FOOT_COLS.map((c) => (
          <div key={c.h}>
            <h4>{c.h}</h4>
            {c.links.map(([label, to]) => (
              <Link key={label} to={to}>
                {label}
              </Link>
            ))}
          </div>
        ))}
      </nav>
    </div>
    <div className="foot__bot">
      <span>Beta Agency AS</span>
      <span>Org.nr 933 303 136</span>
      <span>Oslo, Norway</span>
      <Link to="/privacy">Privacy</Link>
      <Link to="/terms">Terms</Link>
      <span className="foot__mark">BETAADS&trade;</span>
    </div>
  </footer>
);
