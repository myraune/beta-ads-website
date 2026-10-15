import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "next-themes";
import { BOOKING_SHORT_LINK } from "@/components/BookingCalendar";
import "./home-final.css";
import "./final-chrome.css";
import "./home-overrides.css";
import { KickMark, TikTokMark, TwitchMark, YouTubeMark } from "./marks";

/* Nav, footer and shared bits of the final-platform design. The homepage ("/")
   renders them inside its own .bf root; every other route gets them from
   Layout (src/components/Layout.tsx), wrapped in .bf so the scoped styles apply.
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
  const { resolvedTheme, systemTheme, setTheme, forcedTheme } = useTheme();
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
  // Pages with a forced theme (/streamers is always dark) have nothing to switch.
  if (forcedTheme) return null;
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

/** Homepage section links: a plain hash on "/", "/#id" from any other page
    (ScrollToTop in App.tsx scrolls to the section once it has rendered). */
const HomeAnchor: React.FC<{ id: string; children: React.ReactNode; onClick?: () => void }> = ({ id, children, onClick }) => {
  const { pathname } = useLocation();
  return pathname === "/" ? (
    <a href={`#${id}`} onClick={onClick}>
      {children}
    </a>
  ) : (
    <Link to={`/#${id}`} onClick={onClick}>
      {children}
    </Link>
  );
};

/* "Platform" dropdown: the features a buyer checks, each linking to the page or
   homepage section that shows it, plus the three platforms it runs on. */
const PLATFORM_FEATURES: { t: string; d: string; to: string }[] = [
  { t: "Campaign builder", d: "Overlay, chat command and poll in one flow", to: "/campaign-builder" },
  { t: "Streamer Explorer", d: "39,000+ streamers to search and shortlist", to: "/streamer-explorer" },
  { t: "Setup verification", d: "Every stream checked on air, every play clipped", to: "/campaign-compliance" },
  { t: "Brand safety", d: "Swearing detected, every language translated", to: "/brand-safety" },
  { t: "Chat tracking", d: "Brand mentions translated and scored", to: "/livestream-chat-engagement" },
  { t: "Replay reach", d: "Views that keep counting after the stream", to: "/replay-reach" },
  { t: "Reporting", d: "Live dashboard and a PDF you can forward", to: "/reporting" },
  { t: "Programmatic deals", d: "Private deals on Adform and Magnite, bought in your DSP", to: "/programmatic" },
];
const PLATFORM_CHANNELS: { t: string; to?: string; Mark: React.FC; isNew?: boolean }[] = [
  { t: "Twitch", to: "/twitch-advertising", Mark: TwitchMark },
  { t: "YouTube", to: "/youtube-advertising", Mark: YouTubeMark },
  { t: "Kick", to: "/kick-advertising", Mark: KickMark },
  { t: "TikTok Live", to: "/tiktok-live-advertising", Mark: TikTokMark, isNew: true },
];

/** Desktop dropdown: opens on hover and on keyboard focus, and on click for touch.
    The panel content gets a close() so a picked link shuts it. */
const NavDropdown: React.FC<{ label: string; id: string; panelClass?: string; children: (close: () => void) => React.ReactNode }> = ({ label, id, panelClass = "", children }) => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);
  const close = () => setOpen(false);
  return (
    <div
      className={`nav__dd${open ? " nav__dd--open" : ""}`}
      onMouseLeave={close}
      onKeyDown={(e) => e.key === "Escape" && close()}
    >
      <button type="button" className="nav__dd-btn" aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)}>
        {label}
        <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 4.5L6 8l3.5-3.5" /></svg>
      </button>
      <div id={id} className={`nav__dd-panel ${panelClass}`}>{children(close)}</div>
    </div>
  );
};

/* "Solutions": who it is for, each with its own page. */
const SOLUTIONS: { t: string; d: string; to: string }[] = [
  { t: "For brands", d: "We run the campaign for you, brief to report", to: "/managed-campaigns" },
  { t: "For agencies", d: "Your own login to launch and resell campaigns", to: "/self-serve" },
  { t: "For marketing executives", d: "Livestream reported like the rest of the plan", to: "/for-marketing-executives" },
];

const SolutionsMenu: React.FC = () => (
  <NavDropdown label="Solutions" id="nav-solutions" panelClass="nav__dd-panel--list">
    {(close) => (
      <div className="nav__dd-feats nav__dd-feats--one">
        {SOLUTIONS.map((x) => (
          <Link key={x.to} to={x.to} onClick={close}>
            <b>{x.t}</b>
            <span>{x.d}</span>
          </Link>
        ))}
      </div>
    )}
  </NavDropdown>
);

/* "Login": the two dashboards on the LIVAD platform (already linked from the
   streamer pages), plus the sign-up page for streamers who are not on it yet. */
const LOGINS: { t: string; d: string; href: string }[] = [
  { t: "Brand or agency", d: "Your campaign dashboard", href: "https://beta.business.livad.stream/dashboard" },
  { t: "Streamer", d: "Your streamer account", href: "https://beta.streamer.livad.stream/login" },
];

const LoginMenu: React.FC = () => (
  <NavDropdown label="Login" id="nav-login" panelClass="nav__dd-panel--list nav__dd-panel--right">
    {(close) => (
      <div className="nav__dd-feats nav__dd-feats--one">
        {LOGINS.map((x) => (
          <a key={x.href} href={x.href} target="_blank" rel="noopener noreferrer" data-cta="login" onClick={close}>
            <b>{x.t}</b>
            <span>{x.d}</span>
          </a>
        ))}
        <Link to="/streamers" className="nav__dd-foot" onClick={close}>
          New streamer? Join Beta Ads <Arrow />
        </Link>
      </div>
    )}
  </NavDropdown>
);

const PlatformMenu: React.FC = () => (
  <NavDropdown label="Platform" id="nav-platform">
    {(close) => (
      <>
        <div className="nav__dd-feats">
          {PLATFORM_FEATURES.map((f) => (
            <Link key={f.t} to={f.to} onClick={close}>
              <b>{f.t}</b>
              <span>{f.d}</span>
            </Link>
          ))}
        </div>
        <div className="nav__dd-side">
          <span className="nav__dd-k">Runs on</span>
          {PLATFORM_CHANNELS.map(({ t, to, Mark, isNew }) => {
            const inner = (
              <>
                <span className="nav__dd-chi"><Mark /></span>
                <span className="nav__dd-cht">{t}</span>
                {isNew && <span className="nav__new">New</span>}
                {to && <span className="nav__dd-cha" aria-hidden="true">&rarr;</span>}
              </>
            );
            return to ? (
              <Link key={t} to={to} className="nav__dd-ch" onClick={close}>{inner}</Link>
            ) : (
              <span key={t} className="nav__dd-ch">{inner}</span>
            );
          })}
          <HomeAnchor id="tour" onClick={close}>
            <span className="nav__dd-tour">Take the tour <Arrow /></span>
          </HomeAnchor>
        </div>
      </>
    )}
  </NavDropdown>
);

const MENU_MORE: [string, string][] = [
  ["Blog", "/blog"],
  ["About", "/about"],
  ["Contact", "/contact"],
];

export const FinalNav: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  // Close the mobile menu on navigation and on Escape.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  const close = () => setOpen(false);
  const { forcedTheme } = useTheme();
  const cls = ["nav", open && "nav--open", forcedTheme && "nav--forced"].filter(Boolean).join(" ");
  return (
    <header className={cls}>
      <div className="nav__in">
        <Link to="/" className="nav__logo" aria-label="Beta Ads home">
          <img className="for-light" src={LOGO_LIGHT} alt="Beta Ads" width={95} height={23} />
          <img className="for-dark" src={LOGO_DARK} alt="Beta Ads" width={95} height={23} />
        </Link>
        <nav className="nav__links" aria-label="Main">
          <PlatformMenu />
          <SolutionsMenu />
          <Link to="/case-studies">Customers</Link>
          <Link to="/pricing">Pricing</Link>
        </nav>
        <div className="nav__side">
          <LoginMenu />
        </div>
        <ThemeSwitch />
        <BookDemo className="btn btn--sm" />
        <button
          className="nav__burger"
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="nav-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
        </button>
      </div>
      <nav id="nav-menu" className="nav__menu" aria-label="Menu" hidden={!open}>
        <details className="nav__menu-dd">
          <summary>Platform</summary>
          <div>
            {PLATFORM_FEATURES.map((f) => (
              <Link key={f.t} to={f.to} onClick={close}>
                {f.t}
              </Link>
            ))}
          </div>
        </details>
        <details className="nav__menu-dd">
          <summary>Solutions</summary>
          <div>
            {SOLUTIONS.map((x) => (
              <Link key={x.to} to={x.to} onClick={close}>
                {x.t}
              </Link>
            ))}
          </div>
        </details>
        <Link to="/case-studies">Customers</Link>
        <Link to="/pricing">Pricing</Link>
        <Link to="/streamers">For streamers</Link>
        <div className="nav__menu-login">
          {LOGINS.map((x) => (
            <a key={x.href} href={x.href} target="_blank" rel="noopener noreferrer" data-cta="login">
              Login: {x.t.toLowerCase()}
            </a>
          ))}
        </div>
        <div className="nav__menu-more">
          {MENU_MORE.map(([label, to]) => (
            <Link key={to} to={to}>
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

const FOOT_COLS: { h: string; links: [string, string][] }[] = [
  { h: "Product", links: [["Campaign builder", "/campaign-builder"], ["Streamer Explorer", "/streamer-explorer"], ["Pricing", "/pricing"], ["Setup verification", "/campaign-compliance"], ["Brand safety", "/brand-safety"], ["Chat tracking", "/livestream-chat-engagement"], ["Replay reach", "/replay-reach"], ["Reporting", "/reporting"], ["Programmatic", "/programmatic"]] },
  { h: "Platforms", links: [["Twitch", "/twitch-advertising"], ["YouTube", "/youtube-advertising"], ["Kick", "/kick-advertising"], ["TikTok LIVE", "/tiktok-live-advertising"], ["Kick pricing", "/kick-advertising-cost"], ["Nordics", "/nordic-livestream-advertising"]] },
  { h: "Customers", links: [["Case studies", "/case-studies"], ["Samsung", "/case-study/samsung"], ["Surfshark", "/case-study/surfshark-finland"], ["Komplett", "/case-study/komplett"], ["Shure", "/case-study/shure"]] },
  { h: "Nordics", links: [["Norge", "/norge"], ["Twitch agency Norway", "/twitch-agency-norway"], ["Twitch-byrå Norge", "/twitch-byra-norge"], ["Twitch annonsering pris", "/twitch-annonsering-pris"], ["Kick Norge", "/kick-annonsering"], ["Kick Sverige", "/kick-annonsering-sverige"], ["Kick Danmark", "/kick-annoncering"], ["Kick Suomi", "/kick-mainonta"]] },
  { h: "Company", links: [["About", "/about"], ["Press", "/press"], ["Blog", "/blog"], ["Working with us", "/working-with-us"], ["Managed campaigns", "/managed-campaigns"], ["Self-serve for agencies", "/self-serve"], ["For marketing executives", "/for-marketing-executives"], ["Contact", "/contact"]] },
  { h: "For streamers", links: [["Join as a streamer", "/streamers"], ["Kick streamers", "/kick-streamer-advertising"]] },
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
