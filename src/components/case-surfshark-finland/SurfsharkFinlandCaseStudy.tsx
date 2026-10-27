import React, { useEffect, useState } from "react";
import { brandInk } from "@/lib/brandInk";
import { Link } from "react-router-dom";
import { RankedBars, SplitBar, Meter, accent, accentSoft } from "./charts";
import {
  IMG,
  headline,
  delivery,
  verification,
  poll,
  chat,
  quotes,
  clickAudience,
  geo,
  gallery,
  codePanels,
  fmt,
} from "./data";

const BOOK_URL = "https://calendar.app.google/coW5NLQJtLxfRer19";

/** Case accent: Surfshark teal, darker in light mode for contrast on white. */
const ACCENT_CSS = `
.ssf { --ss: 178 84% 26%; }
.dark .ssf { --ss: 172 70% 52%; }
`;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener?.("change", on);
    return () => mq.removeEventListener?.("change", on);
  }, []);
  return reduced;
}

/** Page width: wide, dashboard-like, so the data reads as an overview instead of a long column. */
const W = "max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10";

const SectionHead: React.FC<{ n: string; kicker: string; title: React.ReactNode; lede?: React.ReactNode }> = ({ n, kicker, title, lede }) => (
  <header className="mb-7 md:mb-8">
    <div className="flex items-baseline gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] mb-3">
      <span className="tabular-nums" style={{ color: brandInk(accent) }}>{n}</span>
      <span className="text-muted-foreground">{kicker}</span>
    </div>
    <h2 className="text-[1.6rem] leading-[1.12] md:text-[2.1rem] font-bold tracking-tight text-foreground max-w-4xl">{title}</h2>
    {lede && <p className="mt-3 text-[15px] md:text-base leading-relaxed text-muted-foreground max-w-4xl">{lede}</p>}
  </header>
);

/** The light half of a Bold/Light headline (see .hl in src/index.css). */
const Light: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="hl">{children}</span>
);

const Section: React.FC<{ id: string; children: React.ReactNode; className?: string }> = ({ id, children, className = "" }) => (
  <section id={id} className={`scroll-mt-28 border-t border-border py-12 md:py-16 ${className}`}>
    <div className={W}>{children}</div>
  </section>
);

/** A titled block inside a section, so several blocks can sit side by side. */
const Panel: React.FC<{ title?: string; children: React.ReactNode; className?: string }> = ({ title, children, className = "" }) => (
  <div className={`min-w-0 ${className}`}>
    {title && <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground mb-4">{title}</h3>}
    {children}
  </div>
);

const Big: React.FC<{ v: React.ReactNode; l: React.ReactNode; size?: string }> = ({ v, l, size = "text-4xl md:text-5xl" }) => (
  <div>
    <div className={`${size} font-semibold tabular-nums tracking-tight text-foreground leading-none`}>{v}</div>
    <div className="mt-2 text-sm text-muted-foreground leading-snug">{l}</div>
  </div>
);

const SurfsharkFinlandCaseStudy: React.FC = () => {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <article className="ssf">
      <style>{ACCENT_CSS}</style>

      {/* ───────────── Hero: text and real frame side by side ───────────── */}
      <header className={`${W} pt-28 md:pt-32`}>
        <Link to="/case-studies" className="inline-flex text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          Case studies <span className="mx-2" aria-hidden>/</span> <span className="text-foreground">Surfshark Finland</span>
        </Link>

        <div className="grid lg:grid-cols-[1fr_1.05fr] gap-8 lg:gap-14 items-center">
          <div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3 mb-6">
              <img
                src="/lovable-uploads/logo-surfshark.png"
                alt="Surfshark"
                width={547}
                height={126}
                className="h-7 w-auto [filter:brightness(0)] dark:[filter:none]"
              />
              <span className="h-5 w-px bg-border" aria-hidden />
              <span className="text-sm font-medium text-foreground">Finland · August 2026</span>
              <span className="text-sm text-muted-foreground">14 Finnish Twitch creators · 1 Aug to 1 Sep</span>
            </div>
            <h1 className="text-[2.4rem] leading-[1.03] sm:text-5xl xl:text-[4.2rem] font-bold tracking-[-0.03em] text-foreground">
              Bought 100,000 views.{" "}
              Delivered 119,041 live.
            </h1>
            <p className="mt-6 max-w-xl text-base md:text-lg leading-relaxed text-muted-foreground">
              Surfshark VPN ran for a month on Finnish Twitch with a twist on the usual overlay: every ad moment
              opened a poll in the creator's own chat. The campaign over-delivered live by 19% and came back with a month of market research nobody had to pay a panel for.
            </p>
          </div>
          <figure>
            <div className="overflow-hidden rounded-[22px] bg-black aspect-video">
              <img
                src={`${IMG}/poll-driving.webp`}
                alt="Finnish IRL stream filmed from the driver's seat, with the Surfshark '4 extra months' overlay on the left and the live VPN poll at the bottom"
                width={1280}
                height={720}
                className="w-full h-full object-cover"
                {...{ fetchpriority: "high" }}
              />
            </div>
            <figcaption className="mt-2.5 text-xs text-muted-foreground">
              A real frame from the campaign: the overlay on the left edge, the Finnish poll running live at the bottom.
            </figcaption>
          </figure>
        </div>

        {/* Key figures: the whole campaign on one row */}
        <dl className="mt-10 md:mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 border-y border-border divide-border">
          {[
            { v: fmt(headline.viewsDelivered), l: "Live ad views", s: "119% of the 100,000 bought" },
            { v: fmt(verification.streams), l: "Streams", s: "With the ad running, 14 creators" },
            { v: fmt(headline.clicks), l: "Clicks", s: `${headline.ctr} click-through rate` },
            { v: `${verification.clipVerified}%`, l: "Clip-verified", s: `${fmt(verification.adPlays)} ad plays checked` },
            { v: fmt(headline.votes), l: "Poll votes", s: `${headline.polls} polls run in chat` },
            { v: `${verification.hoursWatched} h`, l: "Watched", s: "Stream time with the ad running" },
          ].map((k, i) => (
            <div key={k.l} className={`py-5 sm:py-6 px-4 first:pl-0 ${i > 0 ? "border-l border-border" : ""} ${i % 2 === 0 ? "max-sm:border-l-0 max-sm:pl-0" : ""} ${i >= 2 ? "max-sm:border-t" : ""} ${i >= 3 ? "sm:max-lg:border-t" : ""} ${i === 3 ? "sm:max-lg:border-l-0 sm:max-lg:pl-0" : ""}`}>
              <dt className="sr-only">{k.l}</dt>
              <dd>
                <div className="text-[1.6rem] sm:text-3xl xl:text-[2.4rem] font-semibold tabular-nums tracking-tight text-foreground leading-none">{k.v}</div>
                <div className="mt-2.5 text-sm font-medium text-foreground">{k.l}</div>
                <div className="mt-0.5 text-xs text-muted-foreground">{k.s}</div>
              </dd>
            </div>
          ))}
        </dl>
      </header>

      {/* ───────────── 01 Brief and setup: spec, animation, code panels in one row ───────────── */}
      <Section id="setup" className="mt-12 md:mt-16">
        <SectionHead
          n="01"
          kicker="The brief and setup"
          title={<>One overlay, one question, <Light>fourteen chats</Light></>}
          lede="14 Finnish creators for a month, and every ad moment had two jobs: show the offer, and ask chat a question."
        />
        <div className="grid md:grid-cols-2 xl:grid-cols-[1.1fr_1fr_0.9fr] gap-8 xl:gap-10 items-start">
          <dl className="divide-y divide-border border-y border-border">
            {[
              ["Market", "Finland, Finnish-language creators on Twitch"],
              ["Flight", "1 August to 1 September 2026"],
              ["Roster", "14 creators across gaming, IRL, music and Just Chatting"],
              ["Creative", "Animated corner overlay carrying the \"+4 months extra\" offer"],
              ["Interaction", "A live poll in the creator's own chat on every ad moment, asked in Finnish"],
              ["Chat command", "!surfshark or !vpn pulls up the offer link in chat"],
              ["Per creator", "A code panel with the creator's own name, so every channel tracks on its own"],
            ].map(([k, v]) => (
              <div key={k} className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-4 py-3">
                <dt className="text-sm text-muted-foreground">{k}</dt>
                <dd className="text-sm text-foreground leading-snug">{v}</dd>
              </div>
            ))}
          </dl>

          <figure>
            <div className="relative rounded-[18px] bg-[#05080a] overflow-hidden aspect-[4/3] flex items-center justify-center">
              <video
                key={reducedMotion ? "still" : "motion"}
                className="h-full w-auto"
                src={`${IMG}/overlay-animation.webm`}
                poster={`${IMG}/overlay-poster.webp`}
                muted
                playsInline
                loop
                autoPlay={!reducedMotion}
                controls={reducedMotion}
                preload="metadata"
                aria-label="The Surfshark overlay animation as it ran on stream: Stay safe, save big. 4 extra months. Share with devices. Faster, safer gaming. Get Surfshark, click the link in the chat."
              />
              <span className="absolute left-4 top-3 text-[11px] uppercase tracking-[0.16em] text-white/55">The overlay, as aired</span>
            </div>
            <figcaption className="mt-2.5 text-xs text-muted-foreground leading-relaxed">
              Cycles from "Stay safe, save big" through the 4 extra months offer to "Click the link in the chat".
            </figcaption>
          </figure>

          <div className="md:col-span-2 xl:col-span-1">
            <div className="grid grid-cols-4 xl:grid-cols-2 gap-2 sm:gap-3">
              {codePanels.map((p, i) => (
                <img
                  key={p.src}
                  src={`${IMG}/${p.src}`}
                  alt={`Surfshark code panel for the creator ${p.name}, offering 4 months extra`}
                  width={320}
                  height={320}
                  loading="lazy"
                  className={`w-full h-auto ${i % 2 === 0 ? "rounded-[12px]" : "rounded-[6px]"}`}
                />
              ))}
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              Each creator also had a panel with their own code and the same offer. Four of the fourteen, as they looked on channel pages.
            </p>
          </div>
        </div>
      </Section>

      {/* ───────────── 02 + 03 Delivery and verification side by side ───────────── */}
      <Section id="delivery">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="min-w-0">
            <SectionHead
              n="02"
              kicker="Delivery"
              title={<>Bought 100,000. <Light>Delivered 119,041 live.</Light></>}
              lede="Views are counted when the whole animation played on a live stream. Surfshark paid for 100,000 and got 19% more at no extra cost."
            />
            <div className="space-y-4">
              {[
                { l: "Bought", s: "animation views", v: delivery.bought, strength: 0.3 },
                { l: "Delivered live", s: "billed, 1 Aug to 1 Sep", v: delivery.live, strength: 1 },
              ].map((r) => (
                <div key={r.l} className="grid grid-cols-[8rem_minmax(0,1fr)] gap-4 items-center">
                  <div>
                    <div className="text-sm font-medium text-foreground">{r.l}</div>
                    <div className="text-xs text-muted-foreground">{r.s}</div>
                  </div>
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-8 rounded-[8px]" style={{ width: `${(r.v / delivery.live) * 74}%`, background: accentSoft(r.strength) }} aria-hidden />
                    <span className="text-base font-semibold tabular-nums text-foreground whitespace-nowrap">{fmt(r.v)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div id="verification" className="min-w-0 scroll-mt-28">
            <SectionHead
              n="03"
              kicker="Verification"
              title={<>Every ad play <Light>left a clip behind</Light></>}
              lede="A short clip of the stream is recorded around each ad play and checked automatically. Delivery becomes something you can look at, not only a number in a dashboard."
            />
            <div className="grid grid-cols-2 gap-6 pb-8 border-b border-border">
              <Big v={fmt(verification.adPlays)} l={`ad plays across ${verification.streams} streams`} />
              <Big v={`${verification.hoursWatched} h`} l="of stream watched with the campaign running" />
            </div>
            <div className="mt-2">
              <Meter pct={verification.clipVerified} label="of ad plays verified with a recorded clip of the stream" detail="The clip is the receipt. If the ad did not run, there is nothing to show." />
              <Meter pct={verification.displayedCorrectly} label="of those clips show the overlay displayed correctly" detail="Measured on the recorded clips, not taken on the ad server's word." />
              <Meter pct={verification.brandSaid} label="of clips have the streamer saying the brand out loud" detail="A spoken mention on top of the visual one, heard on the clip itself." />
            </div>
          </div>
        </div>
      </Section>

      {/* ───────────── 04 Gallery: compact grid ───────────── */}
      <Section id="gallery">
        <SectionHead
          n="04"
          kicker="On stream"
          title={<>What it looked like <Light>in the wild</Light></>}
          lede="Real frames from the campaign's verification clips. Different creators, different layouts, the same overlay in the corner, and the poll on screen when it ran."
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {gallery.slice(1).map((g, i) => (
            <figure key={g.src} className="flex flex-col min-w-0">
              <div className={`overflow-hidden bg-black aspect-video ${i % 3 === 0 ? "rounded-[14px]" : i % 3 === 1 ? "rounded-[6px]" : "rounded-[10px]"}`}>
                <img src={`${IMG}/${g.src}`} alt={g.alt} width={1280} height={720} loading="lazy" className="w-full h-full object-cover" />
              </div>
              <figcaption className="mt-2 text-xs text-muted-foreground leading-snug">{g.caption}</figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* ───────────── 05 Poll: answers and audiences side by side ───────────── */}
      <Section id="poll">
        <SectionHead
          n="05"
          kicker="What Finland answered"
          title={<>We asked Finnish Twitch <Light>if they use a VPN</Light></>}
          lede={`The poll ran ${fmt(headline.polls)} times in the creators' own chats. Answering takes one click and nobody leaves the stream. ${fmt(headline.votes)} votes came in, and ${fmt(headline.chatMessagesDuringAds)} chat messages from ${fmt(headline.chatPeopleDuringAds)} people landed while the ad was on screen.`}
        />
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="min-w-0">
            <blockquote className="mb-7">
              <p lang="fi" className="text-2xl md:text-[2rem] leading-[1.15] text-foreground">
                “{poll.questionFi}”
              </p>
              <footer className="mt-2 text-sm text-muted-foreground">
                “{poll.questionEn}” · asked {fmt(headline.polls)} times · {fmt(headline.votes)} votes
              </footer>
            </blockquote>
            <ol className="space-y-5">
              {poll.options.map((o, i) => (
                <li key={o.fi}>
                  <div className="flex items-end justify-between gap-4 mb-2">
                    <div className="min-w-0">
                      <div lang="fi" className="text-[15px] font-medium text-foreground leading-snug">{o.fi}</div>
                      <div className="text-xs text-muted-foreground">{o.en}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-2xl font-semibold tabular-nums tracking-tight text-foreground leading-none">{o.pct}%</span>
                      <span className="ml-2 text-xs text-muted-foreground tabular-nums">{fmt(o.votes)}</span>
                    </div>
                  </div>
                  <div className="h-2.5 rounded-full bg-muted overflow-hidden" aria-hidden>
                    <div className="h-full rounded-full" style={{ width: `${o.pct}%`, background: i === 0 ? accentSoft(0.4) : accent }} />
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="min-w-0 lg:pt-2">
            <h3 className="text-lg md:text-xl font-semibold tracking-tight text-foreground">
              One question, three audiences, and how big each one is
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              21% of voters are already on a VPN: 16% with a competitor, 5% with Surfshark. 10% are considering
              one. The other 69% do not use one at all. Each group needs a different message, and now Surfshark
              knows the size of each.
            </p>
            <div className="mt-6">
              <SplitBar
                ariaLabel="Poll answers as one split bar"
                height="h-12"
                parts={[
                  { label: "Don't use a VPN", value: 69.3, display: "69.3%", note: poll.options[0].reading },
                  { label: "Use another VPN", value: 16.3, display: "16.3%", note: poll.options[1].reading },
                  { label: "Considering it", value: 9.7, display: "9.7%", note: poll.options[2].reading },
                  { label: "Use Surfshark", value: 4.7, display: "4.7%", note: poll.options[3].reading },
                ]}
              />
            </div>
          </div>
        </div>
      </Section>

      {/* ───────────── 06 Chat: numbers, questions and quotes in three columns ───────────── */}
      <Section id="chat">
        <SectionHead
          n="06"
          kicker="What chat said"
          title={<>The audience wrote <Light>the sales FAQ</Light></>}
          lede="We read every viewer message that mentioned Surfshark or VPN in the creators' chats, removed the bots and translated them from Finnish."
        />
        <div className="grid md:grid-cols-2 xl:grid-cols-[0.9fr_0.9fr_1.4fr] gap-10 xl:gap-12 items-start">
          <Panel>
            <div className="grid grid-cols-2 gap-x-6 gap-y-6 pb-7 border-b border-border">
              <Big size="text-3xl md:text-4xl" v={fmt(chat.messages)} l="viewer messages" />
              <Big size="text-3xl md:text-4xl" v={fmt(chat.viewers)} l="different viewers" />
              <Big size="text-3xl md:text-4xl" v={String(chat.chats)} l="creators' chats" />
              <Big size="text-3xl md:text-4xl" v={String(chat.selfTypedCommands)} l="times viewers typed !surfshark or !vpn themselves" />
            </div>
            <div className="mt-7">
              <RankedBars
                title="Tone of the messages"
                labelWidth="5.5rem"
                rows={chat.tone.map((t) => ({ label: t.label, pct: t.pct, n: t.count }))}
                dimAfter={4}
              />
            </div>
          </Panel>

          <Panel title="What the questions were about">
            <div className="rounded-[16px] border border-border p-5">
              <div className="flex items-baseline gap-4 pb-5 border-b border-border">
                <span className="text-3xl font-semibold tabular-nums text-foreground">{chat.whatIsAVpnQuestions}</span>
                <span className="text-sm text-foreground leading-snug">were some version of "what is a VPN, and why would I need one?"</span>
              </div>
              <div className="pt-5">
                <div className="flex items-baseline gap-4">
                  <span className="text-3xl font-semibold tabular-nums text-foreground">{chat.buyingQuestions}</span>
                  <span className="text-sm text-foreground leading-snug">were buying questions:</span>
                </div>
                <ul className="mt-3 pl-12 space-y-1.5">
                  {chat.buyingTopics.map((t) => (
                    <li key={t} className="text-sm text-muted-foreground flex gap-2.5">
                      <span className="mt-[0.55rem] h-1 w-1 rounded-full shrink-0" style={{ background: accent }} aria-hidden />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-6 border-t border-border pt-5">
              <div className="text-sm font-semibold text-foreground">The frequency lesson</div>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                The most repeated complaint was not about Surfshark. It was about the poll showing up too often. One
                viewer started changing their answer every time out of protest. Run the poll less, and more people
                enjoy answering it.
              </p>
            </div>
          </Panel>

          <Panel title="In their own words" className="md:col-span-2 xl:col-span-1">
            <ul className="grid sm:grid-cols-2 gap-3">
              {quotes.map((q, i) => (
                <li
                  key={q.fi}
                  className={`p-4 ${i % 2 === 0 ? "rounded-[16px]" : "rounded-[8px]"} ${q.tone === "Negative" ? "border border-border" : "bg-muted/60"} ${i === quotes.length - 1 && quotes.length % 2 === 1 ? "sm:col-span-2" : ""}`}
                >
                  <div className="text-[10px] font-semibold uppercase tracking-[0.14em] mb-2" style={{ color: q.tone === "Negative" ? undefined : accent }}>
                    <span className={q.tone === "Negative" ? "text-muted-foreground" : ""}>{q.tone}</span>
                  </div>
                  <p className="text-[15px] leading-snug text-foreground">"{q.en}"</p>
                  <p lang="fi" className="mt-2 text-xs italic text-muted-foreground">{q.fi}</p>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-muted-foreground">Viewer messages from the creators' Twitch chats, August 2026. Finnish original under each translation. Usernames left out.</p>
          </Panel>
        </div>
      </Section>

      {/* ───────────── 07 + 08 Who clicked and where from, one panel ───────────── */}
      <Section id="who-clicked">
        <SectionHead
          n="07"
          kicker="Who clicked, and from where"
          title={<>A PC gaming audience, <Light>98% of it in Finland</Light></>}
          lede={`Every click is logged. Device, operating system and browser resolve on 99% of them (${fmt(clickAudience.resolvedOn)} click-log rows). Location resolves on ${geo.locatedShare} (${fmt(geo.located)} clicks), city on ${fmt(geo.cityResolved)}; geography shares are of the located clicks.`}
        />
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-x-10 gap-y-10">
          <Panel>
            <RankedBars title="Device" rows={clickAudience.device} scaleTo={100} labelWidth="4.5rem" />
            <div className="mt-7 rounded-[16px] bg-muted/60 p-5">
              <div className="text-3xl font-semibold tabular-nums tracking-tight text-foreground">94%</div>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                of desktop clicks came from Windows, only 4% from macOS. On mobile, Android leads iOS 75 to 25.
              </p>
            </div>
          </Panel>
          <Panel>
            <RankedBars title="Operating system" rows={clickAudience.os} scaleTo={100} labelWidth="5.5rem" />
          </Panel>
          <Panel>
            <RankedBars title="Browser" rows={clickAudience.browser} scaleTo={100} labelWidth="7.5rem" />
          </Panel>
          <Panel>
            <RankedBars title="Country" rows={geo.countries} scaleTo={100} labelWidth="6.5rem" />
            <div className="mt-7 flex items-baseline gap-3">
              <span className="text-5xl font-semibold tabular-nums tracking-tight" style={{ color: brandInk(accent) }}>{geo.vpnProxyClicks}</span>
              <span className="text-sm text-foreground leading-snug">located clicks ({geo.vpnProxyShare}) came through a VPN or proxy</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              That lines up with the poll: an audience that mostly does not have a VPN yet.
            </p>
          </Panel>
        </div>

        <div id="where" className="mt-12 scroll-mt-28 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-x-10">
          <h3 className="lg:col-span-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground mb-4">City</h3>
          {[geo.cities.slice(0, 5), geo.cities.slice(5)].map((part, col) => (
            <ol key={col} className="divide-y divide-border border-y border-border">
              {part.map((c, j) => {
                const i = col * 5 + j;
                return (
                  <li key={c.label} className="grid grid-cols-[1.75rem_7rem_minmax(0,1fr)_auto] items-center gap-x-3 py-2.5">
                    <span className="text-xs tabular-nums text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-sm text-foreground truncate">{c.label}</span>
                    <span className="h-2 rounded-full bg-muted overflow-hidden" aria-hidden>
                      <span className="block h-full rounded-full" style={{ width: `${(c.pct / geo.cities[0].pct) * 100}%`, background: i < 2 ? accent : accentSoft(0.45) }} />
                    </span>
                    <span className="text-right tabular-nums whitespace-nowrap">
                      <span className="text-sm font-semibold text-foreground">{c.pct}%</span>
                      <span className="ml-2 text-xs text-muted-foreground">{c.n}</span>
                    </span>
                  </li>
                );
              })}
              {col === 1 && (
                <li className="grid grid-cols-[1.75rem_7rem_minmax(0,1fr)_auto] items-center gap-x-3 py-2.5">
                  <span />
                  <span className="text-sm text-muted-foreground">Other cities</span>
                  <span />
                  <span className="text-right tabular-nums whitespace-nowrap">
                    <span className="text-sm font-semibold text-foreground">{geo.otherCities.pct}%</span>
                    <span className="ml-2 text-xs text-muted-foreground">{geo.otherCities.n}</span>
                  </span>
                </li>
              )}
            </ol>
          ))}
        </div>
        <p className="mt-6 text-xs text-muted-foreground">
          For a VPN, which people install on the device they use most, desktop is the right screen. Age and gender are not in the click log, so we do not report them.
        </p>
      </Section>

      {/* ───────────── 08 Takeaways ───────────── */}
      <Section id="takeaways-wrap">
        <div>
          <div id="takeaways" className="min-w-0 scroll-mt-28">
            <SectionHead n="08" kicker="Takeaways" title={<>What we would take <Light>into the next flight</Light></>} />
            <ol className="grid md:grid-cols-3 gap-8">
              {[
                ["Ask the audience something.", "A poll adds almost nothing to the setup and turns an overlay into research. Surfshark now knows how many Finnish viewers have no VPN, how many are undecided and how many pay a competitor."],
                ["Read the chat.", "The questions viewers ask are the FAQ and the next creative brief. Here that meant explaining what a VPN is for, and answering price, devices, streaming and logs up front."],
                ["Watch the frequency.", "The most repeated complaint was seeing the poll too often. Run it less and more people will enjoy answering it, which also makes the answers better."],
              ].map(([t, b], i) => (
                <li key={t} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-3">
                  <span className="text-3xl font-light leading-none tabular-nums" style={{ color: brandInk(accent) }}>{i + 1}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{t}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{b}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      {/* ───────────── Sources, two columns ───────────── */}
      <Section id="sources">
        <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground mb-6">Sources and notes</h2>
        <div className="grid lg:grid-cols-2 gap-x-12 gap-y-6 text-sm leading-relaxed text-muted-foreground">
          <ul className="space-y-3">
            <li><span className="text-foreground font-medium">Campaign report.</span> Surfshark Finland campaign report, LIVAD delivery, poll and click logs, campaign 3854, 1 August to 1 September 2026. Live views, clicks, CTR, polls, votes, poll split, chat activity during ad moments, device, OS, browser and geography.</li>
            <li><span className="text-foreground font-medium">Clip and campaign analytics.</span> LIVAD clip verification and campaign analytics, final pull 1 September 2026. Ad plays, streams, clip verification, correct display, brand said, hours watched.</li>
            <li><span className="text-foreground font-medium">Chat.</span> LIVAD keyword tracking (surfshark, vpn, surf), deduplicated, bots removed, read and translated from Finnish by us. LIVAD's dashboard counts {fmt(chat.dashboardKeywordHits)} keyword hits; {chat.messages} is the deduplicated viewer message count.</li>
          </ul>
          <div className="space-y-3">
            <p><span className="text-foreground font-medium">Two click counts.</span> The report counts {fmt(headline.clicks)} clicks, which is the figure behind the {headline.ctr} CTR. Device, OS and browser shares are calculated on {fmt(clickAudience.resolvedOn)} rows in the raw click log, where the user agent resolved. The two come from different counts in the LIVAD data and differ by 46. We show both rather than force them to match. Geography is located on {fmt(geo.located)} clicks, {geo.locatedShare} of the total.</p>
            <p><span className="text-foreground font-medium">Two chat numbers.</span> {fmt(headline.chatMessagesDuringAds)} messages from {fmt(headline.chatPeopleDuringAds)} people is all chat activity during ad moments. The {chat.messages} messages in section 06 are only the ones that mention Surfshark or VPN.</p>
            <p><span className="text-foreground font-medium">Ad plays and polls.</span> {fmt(verification.adPlays)} ad plays were verified by clip; {fmt(headline.polls)} polls were run. The two are logged separately and are not expected to match one to one.</p>
            <p><span className="text-foreground font-medium">No replay figures.</span> A Twitch VOD's view count includes the people who watched live, so it is not reach on top of the live views and is not reported here.</p>
            <p><span className="text-foreground font-medium">Not reported.</span> Age and gender are not available in the click log. One translated chat quote was left out because it quoted a price.</p>
          </div>
        </div>
      </Section>

      {/* ───────────── CTA ───────────── */}
      <section className="border-t border-border">
        <div className={`${W} py-14 md:py-20`}>
          <div className="dark rounded-[28px] bg-[#071214] text-white overflow-hidden grid lg:grid-cols-[1.4fr_1fr]">
            <div className="p-8 sm:p-10 md:p-12">
              <h2 className="text-3xl md:text-[2.4rem] leading-[1.1] font-bold tracking-tight">
                Want to know what your market <Light>thinks out loud?</Light>
              </h2>
              <p className="mt-4 text-white/70 text-base leading-relaxed max-w-lg">
                We run native overlay campaigns with Nordic Twitch creators, verify ad plays by clip, and
                report the chat and the clicks in one place.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={BOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta="book"
                  className="inline-flex items-center h-12 px-7 rounded-full bg-white text-[#071214] font-semibold hover:bg-white/90 transition-colors"
                >
                  Book a call
                </a>
                <a
                  href="mailto:sales@beta-ads.no"
                  data-cta="email"
                  className="inline-flex items-center h-12 px-7 rounded-full border border-white/25 text-white font-medium hover:border-white/60 transition-colors"
                >
                  sales@beta-ads.no
                </a>
              </div>
            </div>
            <div className="relative min-h-[220px] lg:min-h-0">
              <img
                src={`${IMG}/poll-gameplay.webp`}
                alt="Surfshark overlay and poll on a Finnish gameplay stream"
                width={1280}
                height={720}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </article>
  );
};

export default SurfsharkFinlandCaseStudy;
