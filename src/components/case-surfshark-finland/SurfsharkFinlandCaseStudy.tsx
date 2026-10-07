import React, { useEffect, useState } from "react";
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
  vodChannels,
  vodOther,
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

const SectionHead: React.FC<{ n: string; kicker: string; title: React.ReactNode; lede?: React.ReactNode }> = ({ n, kicker, title, lede }) => (
  <header className="max-w-3xl mb-10 md:mb-12">
    <div className="flex items-baseline gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] mb-4">
      <span className="tabular-nums" style={{ color: accent }}>{n}</span>
      <span className="text-muted-foreground">{kicker}</span>
    </div>
    <h2 className="text-[1.9rem] leading-[1.1] md:text-[2.6rem] font-semibold tracking-tight text-foreground">{title}</h2>
    {lede && <p className="mt-5 text-[17px] leading-relaxed text-muted-foreground">{lede}</p>}
  </header>
);

const Serif: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="italic font-normal" style={{ fontFamily: "'Instrument Serif', serif" }}>{children}</span>
);

const Section: React.FC<{ id: string; children: React.ReactNode; className?: string }> = ({ id, children, className = "" }) => (
  <section id={id} className={`scroll-mt-28 border-t border-border py-16 md:py-24 ${className}`}>
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
  </section>
);

const SurfsharkFinlandCaseStudy: React.FC = () => {
  const reducedMotion = usePrefersReducedMotion();
  const vodMax = vodChannels[0].views;

  return (
    <article className="ssf">
      <style>{ACCENT_CSS}</style>

      {/* ───────────── Hero ───────────── */}
      <header className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 md:pt-36">
        <Link to="/case-studies" className="inline-flex text-sm text-muted-foreground hover:text-foreground transition-colors mb-10">
          Case studies <span className="mx-2" aria-hidden>/</span> <span className="text-foreground">Surfshark Finland</span>
        </Link>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 mb-8">
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

        <h1 className="text-[2.6rem] leading-[1.02] sm:text-6xl lg:text-[5.2rem] font-semibold tracking-[-0.03em] text-foreground max-w-5xl">
          Bought 100,000 views.{" "}
          <Serif>Got close to a million.</Serif>
        </h1>
        <p className="mt-7 max-w-2xl text-lg md:text-xl leading-relaxed text-muted-foreground">
          Surfshark VPN ran for a month on Finnish Twitch with a twist on the usual overlay: every ad moment
          opened a poll in the creator's own chat. The campaign over-delivered live, kept collecting views in
          the replays, and came back with a month of market research nobody had to pay a panel for.
        </p>

        {/* Key figures ledger */}
        <dl className="mt-12 grid grid-cols-2 lg:grid-cols-4 border-y border-border">
          {[
            { v: fmt(headline.viewsDelivered), l: "Live ad views delivered", s: "119% of the 100,000 bought" },
            { v: fmt(delivery.combined), l: "Views with replays", s: "Live, VODs and clips combined" },
            { v: fmt(headline.clicks), l: "Clicks", s: `${headline.ctr} click-through rate` },
            { v: fmt(headline.votes), l: "Poll votes", s: `${headline.polls} polls run in chat` },
          ].map((k, i) => (
            <div
              key={k.l}
              className={`py-6 sm:py-8 pr-4 ${i % 2 === 1 ? "pl-4 sm:pl-6 border-l border-border" : ""} ${i >= 2 ? "border-t lg:border-t-0 border-border" : ""} ${i === 2 ? "lg:pl-6 lg:border-l" : ""} ${i === 1 || i === 3 ? "lg:pl-6" : ""}`}
            >
              <dt className="sr-only">{k.l}</dt>
              <dd>
                <div className="text-[1.75rem] sm:text-4xl lg:text-[2.75rem] font-semibold tabular-nums tracking-tight text-foreground leading-none">{k.v}</div>
                <div className="mt-3 text-sm font-medium text-foreground">{k.l}</div>
                <div className="mt-1 text-xs text-muted-foreground">{k.s}</div>
              </dd>
            </div>
          ))}
        </dl>

        {/* Hero visual: a real stream frame */}
        <figure className="mt-12 md:mt-16">
          <div className="overflow-hidden rounded-[22px] md:rounded-[28px] bg-black aspect-video">
            <img
              src={`${IMG}/poll-driving.webp`}
              alt="Finnish IRL stream filmed from the driver's seat, with the Surfshark '4 extra months' overlay on the left and the live VPN poll at the bottom"
              width={1280}
              height={720}
              className="w-full h-full object-cover"
              fetchPriority="high"
            />
          </div>
          <figcaption className="mt-3 text-xs text-muted-foreground">
            A real frame from the campaign: the overlay on the left edge, the Finnish poll running live at the bottom.
          </figcaption>
        </figure>
      </header>

      {/* ───────────── 01 Brief and setup ───────────── */}
      <Section id="setup" className="mt-16 md:mt-24">
        <SectionHead
          n="01"
          kicker="The brief and setup"
          title={<>One overlay, one question, <Serif>fourteen chats</Serif></>}
          lede="14 Finnish creators for a month, and every ad moment had two jobs: show the offer, and ask chat a question."
        />

        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-16 items-start">
          {/* Spec sheet */}
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
              <div key={k} className="grid grid-cols-[6.5rem_minmax(0,1fr)] sm:grid-cols-[8.5rem_minmax(0,1fr)] gap-4 py-4">
                <dt className="text-sm text-muted-foreground">{k}</dt>
                <dd className="text-[15px] text-foreground leading-snug">{v}</dd>
              </div>
            ))}
          </dl>

          {/* The real animation on a stage */}
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
              <span className="absolute left-4 top-3 text-[11px] uppercase tracking-[0.16em] text-white/55">The overlay animation, as aired</span>
            </div>
            <figcaption className="mt-3 text-xs text-muted-foreground leading-relaxed">
              The animation cycles from "Stay safe, save big" through the 4 extra months offer to "Click the link in the chat".
            </figcaption>
          </figure>
        </div>

        {/* Code panels */}
        <div className="mt-14 grid md:grid-cols-[1fr_2fr] gap-8 items-center">
          <p className="text-[15px] leading-relaxed text-muted-foreground max-w-sm">
            Each creator also had a panel with their own code and the same offer. Four of the fourteen, as they
            looked on channel pages:
          </p>
          <div className="grid grid-cols-4 gap-2 sm:gap-4">
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
        </div>
      </Section>

      {/* ───────────── 02 Delivery ───────────── */}
      <Section id="delivery">
        <SectionHead
          n="02"
          kicker="Delivery"
          title={<>Bought 100,000. <Serif>Delivered 119,041 live.</Serif></>}
          lede="A Twitch stream does not disappear when it ends. It stays on the creator's channel as a VOD with the overlay still in it, and the best moments get clipped. That is where most of the total came from."
        />

        {/* Bought vs live */}
        <div className="space-y-5 max-w-4xl">
          {[
            { l: "Bought", s: "animation views", v: delivery.bought, strength: 0.3 },
            { l: "Delivered live", s: "billed ad views, 1 Aug to 1 Sep", v: delivery.live, strength: 1 },
          ].map((r) => (
            <div key={r.l} className="grid grid-cols-1 sm:grid-cols-[11rem_minmax(0,1fr)] gap-2 sm:gap-6 items-center">
              <div>
                <div className="text-[15px] font-medium text-foreground">{r.l}</div>
                <div className="text-xs text-muted-foreground">{r.s}</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-9 rounded-[8px]" style={{ width: `${(r.v / delivery.live) * 78}%`, background: accentSoft(r.strength) }} aria-hidden />
                <span className="text-lg font-semibold tabular-nums text-foreground whitespace-nowrap">{fmt(r.v)}</span>
              </div>
            </div>
          ))}
        </div>

        {/* The full picture */}
        <div className="mt-16">
          <div className="flex flex-wrap items-baseline justify-between gap-3 mb-5">
            <h3 className="text-lg font-semibold text-foreground">Where the {fmt(delivery.combined)} views came from</h3>
            <span className="text-xs text-muted-foreground">Live views, plus the replays of the same streams</span>
          </div>
          <SplitBar
            ariaLabel={`Split of ${fmt(delivery.combined)} combined views`}
            parts={[
              { label: "VOD views", value: delivery.vodViews, display: fmt(delivery.vodViews), note: `${delivery.vods} VODs` },
              { label: "Live ad views", value: delivery.live, display: fmt(delivery.live), note: "What was billed" },
              { label: "Clip views", value: delivery.clipViews, display: fmt(delivery.clipViews), note: `${delivery.clips} clips` },
            ]}
          />
        </div>

        <aside className="mt-14 grid md:grid-cols-[12rem_minmax(0,1fr)] gap-3 md:gap-8 rounded-[14px] bg-muted/60 p-6 md:p-8">
          <div className="text-sm font-semibold text-foreground">Read the replays as a range</div>
          <p className="text-[15px] leading-relaxed text-muted-foreground">
            A VOD view on Twitch is a video load, and some of those are autoplay rather than someone sitting down
            to rewatch. The {fmt(delivery.vodViews)} is a real count from Twitch, but it is not the same thing as
            the {fmt(delivery.live)} live views Surfshark paid for. Clip views are the cleanest part of the replay
            number. VOD and clip counts cover the {delivery.channelsWithReplayData} channels with replay data,
            snapshot 1 September 2026.
          </p>
        </aside>
      </Section>

      {/* ───────────── 03 Verification ───────────── */}
      <Section id="verification">
        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-12 lg:gap-20">
          <div>
            <SectionHead
              n="03"
              kicker="Verification"
              title={<>Every ad play <Serif>left a clip behind</Serif></>}
              lede="A short clip of the stream is recorded around each ad play and checked automatically. Delivery becomes something you can look at, not only a number in a dashboard."
            />
            <div className="flex flex-wrap gap-x-12 gap-y-8">
              <div>
                <div className="text-5xl md:text-6xl font-semibold tabular-nums tracking-tight text-foreground">{fmt(verification.adPlays)}</div>
                <div className="mt-2 text-sm text-muted-foreground">ad plays across {verification.streams} streams</div>
              </div>
              <div>
                <div className="text-5xl md:text-6xl font-semibold tabular-nums tracking-tight text-foreground">{verification.hoursWatched} h</div>
                <div className="mt-2 text-sm text-muted-foreground">of stream watched with the campaign running</div>
              </div>
            </div>
          </div>
          <div className="lg:pt-24">
            <Meter pct={verification.clipVerified} label="of ad plays verified with a recorded clip of the stream" detail="The clip is the receipt. If the ad did not run, there is nothing to show." />
            <Meter pct={verification.displayedCorrectly} label="of those clips show the overlay displayed correctly" detail="Measured on the recorded clips, not taken on the ad server's word." />
            <Meter pct={verification.brandSaid} label="of clips have the streamer saying the brand out loud" detail="A spoken mention on top of the visual one, heard on the clip itself." />
          </div>
        </div>
      </Section>

      {/* ───────────── 04 Gallery ───────────── */}
      <Section id="gallery">
        <SectionHead
          n="04"
          kicker="On stream"
          title={<>What it looked like <Serif>in the wild</Serif></>}
          lede="Real frames from the campaign's verification clips. Different creators, different layouts, the same overlay in the corner. When the poll ran, the question and the live vote count sat on screen."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 md:gap-5">
          {gallery.slice(1).map((g, i) => {
            const span = i === 0 ? "lg:col-span-4 lg:row-span-2" : i < 3 ? "lg:col-span-2" : i < 6 ? "lg:col-span-2" : "lg:col-span-3";
            const radius = i % 3 === 0 ? "rounded-[18px]" : i % 3 === 1 ? "rounded-[8px]" : "rounded-[12px]";
            return (
              <figure key={g.src} className={`${span} flex flex-col`}>
                <div className={`overflow-hidden bg-black ${radius} aspect-video`}>
                  <img src={`${IMG}/${g.src}`} alt={g.alt} width={1280} height={720} loading="lazy" className="w-full h-full object-cover" />
                </div>
                <figcaption className="mt-2.5 text-xs text-muted-foreground leading-relaxed">{g.caption}</figcaption>
              </figure>
            );
          })}
        </div>
      </Section>

      {/* ───────────── 05 Poll ───────────── */}
      <Section id="poll">
        <SectionHead
          n="05"
          kicker="What Finland answered"
          title={<>We asked Finnish Twitch <Serif>if they use a VPN</Serif></>}
          lede={`The poll ran ${fmt(headline.polls)} times in the creators' own chats. Answering takes one click and nobody leaves the stream. ${fmt(headline.votes)} votes came in.`}
        />

        <div className="grid lg:grid-cols-[1fr_1.35fr] gap-10 lg:gap-16 items-start">
          <blockquote className="lg:sticky lg:top-28">
            <p lang="fi" className="text-3xl md:text-[2.6rem] leading-[1.12] text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>
              “{poll.questionFi}”
            </p>
            <footer className="mt-4 text-[15px] text-muted-foreground">
              “{poll.questionEn}” · asked {fmt(headline.polls)} times · {fmt(headline.votes)} votes
            </footer>
          </blockquote>

          <ol className="space-y-7">
            {poll.options.map((o, i) => (
              <li key={o.fi}>
                <div className="flex items-end justify-between gap-4 mb-2.5">
                  <div className="min-w-0">
                    <div lang="fi" className="text-[17px] font-medium text-foreground leading-snug">{o.fi}</div>
                    <div className="text-sm text-muted-foreground">{o.en}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-2xl md:text-3xl font-semibold tabular-nums tracking-tight text-foreground leading-none">{o.pct}%</div>
                    <div className="text-xs text-muted-foreground mt-1 tabular-nums">{fmt(o.votes)} votes</div>
                  </div>
                </div>
                <div className="h-3 rounded-full bg-muted overflow-hidden" aria-hidden>
                  <div className="h-full rounded-full" style={{ width: `${o.pct}%`, background: i === 0 ? accentSoft(0.4) : accent }} />
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Three audiences */}
        <div className="mt-20">
          <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground max-w-2xl">
            One question, three audiences, and how big each one is
          </h3>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            21% of voters are already on a VPN: 16% with a competitor, 5% with Surfshark. 10% are considering
            one. The other 69% do not use one at all. Each group needs a different message, and now Surfshark
            knows the size of each.
          </p>
          <div className="mt-8">
            <SplitBar
              ariaLabel="Poll answers as one split bar"
              height="h-14"
              parts={[
                { label: "Don't use a VPN", value: 69.3, display: "69.3%", note: poll.options[0].reading },
                { label: "Use another VPN", value: 16.3, display: "16.3%", note: poll.options[1].reading },
                { label: "Considering it", value: 9.7, display: "9.7%", note: poll.options[2].reading },
                { label: "Use Surfshark", value: 4.7, display: "4.7%", note: poll.options[3].reading },
              ]}
            />
          </div>
          <p className="mt-10 max-w-3xl text-[15px] leading-relaxed text-muted-foreground border-t border-border pt-6">
            Around the votes, {fmt(headline.chatMessagesDuringAds)} chat messages from {fmt(headline.chatPeopleDuringAds)} people
            landed during the ad moments across the flight. That is all chat activity while the ad was on screen,
            on top of the votes.
          </p>
        </div>
      </Section>

      {/* ───────────── 06 Chat ───────────── */}
      <Section id="chat">
        <SectionHead
          n="06"
          kicker="What chat said"
          title={<>The audience wrote <Serif>the sales FAQ</Serif></>}
          lede="We read every viewer message that mentioned Surfshark or VPN in the creators' chats, removed the bots and translated them from Finnish."
        />

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16">
          <div>
            <div className="flex flex-wrap gap-x-10 gap-y-6 pb-8 border-b border-border">
              {[
                [fmt(chat.messages), "viewer messages"],
                [fmt(chat.viewers), "different viewers"],
                [String(chat.chats), "creators' chats"],
                [String(chat.selfTypedCommands), "self-typed commands"],
              ].map(([v, l]) => (
                <div key={l}>
                  <div className="text-4xl font-semibold tabular-nums tracking-tight text-foreground">{v}</div>
                  <div className="text-sm text-muted-foreground mt-1">{l}</div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-[15px] leading-relaxed text-muted-foreground">
              {chat.selfTypedCommands} times, a viewer typed !surfshark or !vpn themselves to pull up the offer link.
            </p>

            <div className="mt-10">
              <RankedBars
                title="Tone of the messages"
                labelWidth="5.5rem"
                rows={chat.tone.map((t) => ({ label: t.label, pct: t.pct, n: t.count }))}
                dimAfter={4}
              />
            </div>

            <div className="mt-12">
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground mb-4">What the questions were about</h4>
              <div className="rounded-[16px] border border-border p-5 md:p-6">
                <div className="flex items-baseline gap-4 pb-5 border-b border-border">
                  <span className="text-3xl font-semibold tabular-nums text-foreground">{chat.whatIsAVpnQuestions}</span>
                  <span className="text-[15px] text-foreground leading-snug">were some version of "what is a VPN, and why would I need one?"</span>
                </div>
                <div className="pt-5">
                  <div className="flex items-baseline gap-4">
                    <span className="text-3xl font-semibold tabular-nums text-foreground">{chat.buyingQuestions}</span>
                    <span className="text-[15px] text-foreground leading-snug">were buying questions:</span>
                  </div>
                  <ul className="mt-3 sm:pl-12 space-y-1.5">
                    {chat.buyingTopics.map((t) => (
                      <li key={t} className="text-sm text-muted-foreground flex gap-2.5">
                        <span className="mt-[0.55rem] h-1 w-1 rounded-full shrink-0" style={{ background: accent }} aria-hidden />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Quotes */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground mb-5">In their own words</h4>
            <ul className="space-y-4">
              {quotes.map((q, i) => (
                <li
                  key={q.fi}
                  className={`p-5 md:p-6 ${i % 2 === 0 ? "rounded-[18px]" : "rounded-[10px]"} ${q.tone === "Negative" ? "border border-border" : "bg-muted/60"}`}
                >
                  <div className="text-[11px] font-semibold uppercase tracking-[0.14em] mb-2.5" style={{ color: q.tone === "Negative" ? undefined : accent }}>
                    <span className={q.tone === "Negative" ? "text-muted-foreground" : ""}>{q.tone}</span>
                  </div>
                  <p className="text-lg leading-snug text-foreground">"{q.en}"</p>
                  <p lang="fi" className="mt-2.5 text-sm italic text-muted-foreground">{q.fi}</p>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-muted-foreground">Viewer messages from the creators' Twitch chats, August 2026. Finnish original under each translation. Usernames left out.</p>
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-[12rem_minmax(0,1fr)] gap-3 md:gap-8 border-t border-border pt-8">
          <div className="text-sm font-semibold text-foreground">The frequency lesson</div>
          <p className="text-[17px] leading-relaxed text-foreground max-w-3xl">
            The most repeated complaint was not about Surfshark. It was about the poll showing up too often. One
            viewer started changing their answer every time out of protest. That is a cheap lesson to learn in a
            first flight: run the poll less, and more people enjoy answering it.
          </p>
        </div>
      </Section>

      {/* ───────────── 07 Who clicked ───────────── */}
      <Section id="who-clicked">
        <SectionHead
          n="07"
          kicker="Who clicked"
          title={<>A PC gaming audience, <Serif>clicking from the machine they play on</Serif></>}
          lede={`Every click is logged. Device, operating system and browser resolve on 99% of them: ${fmt(clickAudience.resolvedOn)} click-log rows.`}
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-[0.8fr_1fr_1fr] gap-x-12 gap-y-12">
          <div>
            <RankedBars title="Device" rows={clickAudience.device} scaleTo={100} labelWidth="4.5rem" />
            <div className="mt-10 rounded-[20px] bg-muted/60 p-6">
              <div className="text-4xl font-semibold tabular-nums tracking-tight text-foreground">94%</div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                of desktop clicks came from Windows, and only 4% from macOS. On mobile, Android leads iOS 75 to 25.
              </p>
            </div>
          </div>
          <RankedBars title="Operating system" rows={clickAudience.os} scaleTo={100} labelWidth="5.5rem" />
          <RankedBars title="Browser" rows={clickAudience.browser} scaleTo={100} labelWidth="7.5rem" />
        </div>
        <p className="mt-12 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">
          For a VPN, which people install on the device they use most, that is the right screen to reach them on.
          Age and gender are not in the click log, so we do not report them.
        </p>
      </Section>

      {/* ───────────── 08 Where from ───────────── */}
      <Section id="where">
        <SectionHead
          n="08"
          kicker="Where they clicked from"
          title={<>98% Finnish, <Serif>led by Helsinki and Oulu</Serif></>}
          lede={`Location resolves on ${geo.locatedShare} of clicks (${fmt(geo.located)}), and city on ${fmt(geo.cityResolved)}. Shares below are of the located clicks.`}
        />
        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-16 items-start">
          <div>
            <RankedBars title="Country" rows={geo.countries} scaleTo={100} labelWidth="7.5rem" />
            <div className="mt-12 border-t border-border pt-8">
              <div className="flex items-baseline gap-4">
                <span className="text-6xl md:text-7xl font-semibold tabular-nums tracking-tight" style={{ color: accent }}>{geo.vpnProxyClicks}</span>
                <span className="text-[15px] text-foreground leading-snug">located clicks ({geo.vpnProxyShare}) came through a VPN or proxy</span>
              </div>
              <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                That lines up with the poll. If most of this audience used a VPN, far more of their clicks would
                arrive through one. The click log and the chat point the same way: this is an audience that
                mostly does not have a VPN yet.
              </p>
            </div>
          </div>

          {/* Cities as a ranked map list */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground mb-4">City</h4>
            <ol className="divide-y divide-border border-y border-border">
              {geo.cities.map((c, i) => (
                <li key={c.label} className="grid grid-cols-[1.75rem_minmax(0,1fr)_auto] sm:grid-cols-[2rem_8rem_minmax(0,1fr)_auto] items-center gap-x-3 py-2.5">
                  <span className="text-xs tabular-nums text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[15px] text-foreground">{c.label}</span>
                  <span className="hidden sm:block h-2 rounded-full bg-muted overflow-hidden" aria-hidden>
                    <span className="block h-full rounded-full" style={{ width: `${(c.pct / geo.cities[0].pct) * 100}%`, background: i < 2 ? accent : accentSoft(0.45) }} />
                  </span>
                  <span className="text-right tabular-nums whitespace-nowrap">
                    <span className="text-[15px] font-semibold text-foreground">{c.pct}%</span>
                    <span className="ml-2 text-xs text-muted-foreground">{c.n}</span>
                  </span>
                </li>
              ))}
              <li className="grid grid-cols-[1.75rem_minmax(0,1fr)_auto] sm:grid-cols-[2rem_8rem_minmax(0,1fr)_auto] items-center gap-x-3 py-2.5">
                <span />
                <span className="text-[15px] text-muted-foreground">Other cities</span>
                <span className="hidden sm:block" />
                <span className="text-right tabular-nums whitespace-nowrap">
                  <span className="text-[15px] font-semibold text-foreground">{geo.otherCities.pct}%</span>
                  <span className="ml-2 text-xs text-muted-foreground">{geo.otherCities.n}</span>
                </span>
              </li>
            </ol>
          </div>
        </div>
      </Section>

      {/* ───────────── 09 After the stream ───────────── */}
      <Section id="replays">
        <SectionHead
          n="09"
          kicker="After the stream"
          title={<>The biggest channel passed <Serif>300,000 VOD views</Serif> on its own</>}
          lede={`${fmt(delivery.vodViews)} views on ${delivery.vods} VODs from August. The replays were spread across the roster, but a few channels carried most of it.`}
        />
        <ol className="max-w-4xl space-y-3.5">
          {vodChannels.map((c, i) => (
            <li key={c.channel} className="grid grid-cols-[minmax(0,1fr)_auto] sm:grid-cols-[9rem_minmax(0,1fr)] gap-x-5 gap-y-1.5 items-center">
              <div className="sm:text-right">
                <span className="text-[15px] font-medium text-foreground">{c.channel}</span>
                <span className="ml-2 sm:ml-0 sm:block text-xs text-muted-foreground">{c.vods} VODs</span>
              </div>
              <div className="col-span-2 sm:col-span-1 row-start-2 sm:row-start-auto flex items-center gap-3 min-w-0">
                <div className="h-7 rounded-[6px] shrink-0" style={{ width: `${(c.views / vodMax) * 72}%`, background: i === 0 ? accent : accentSoft(0.5) }} aria-hidden />
                <span className="text-[15px] font-semibold tabular-nums text-foreground whitespace-nowrap">{fmt(c.views)}</span>
              </div>
            </li>
          ))}
          <li className="grid grid-cols-[minmax(0,1fr)_auto] sm:grid-cols-[9rem_minmax(0,1fr)] gap-x-5 gap-y-1.5 items-center pt-2">
            <div className="sm:text-right">
              <span className="text-[15px] text-muted-foreground">{vodOther.channels} other channels</span>
              <span className="ml-2 sm:ml-0 sm:block text-xs text-muted-foreground">{vodOther.vods} VODs</span>
            </div>
            <div className="col-span-2 sm:col-span-1 row-start-2 sm:row-start-auto flex items-center gap-3 min-w-0">
              <div className="h-7 rounded-[6px] shrink-0" style={{ width: `${(vodOther.views / vodMax) * 72}%`, background: accentSoft(0.25), minWidth: 4 }} aria-hidden />
              <span className="text-[15px] font-semibold tabular-nums text-muted-foreground whitespace-nowrap">{fmt(vodOther.views)}</span>
            </div>
          </li>
        </ol>
        <p className="mt-8 text-xs text-muted-foreground max-w-3xl leading-relaxed">
          Twitch VOD view counts, snapshot 1 September 2026, for the {delivery.channelsWithReplayData} channels with replay
          data. "Other channels" is the remainder of the {fmt(delivery.vodViews)} total. On top of the VODs, {delivery.clips} clips
          collected {fmt(delivery.clipViews)} views.
        </p>
      </Section>

      {/* ───────────── 10 Takeaways ───────────── */}
      <Section id="takeaways">
        <SectionHead n="10" kicker="Takeaways" title={<>What we would take <Serif>into the next flight</Serif></>} />
        <ol className="grid md:grid-cols-2 gap-x-16 gap-y-12 max-w-5xl">
          {[
            ["Count the replays.", "Live views are what you buy. VODs and clips are what you get on top, for weeks after the stream. Report them as a range, next to the live number, never instead of it."],
            ["Ask the audience something.", "A poll adds almost nothing to the setup and turns an overlay into research. Surfshark now knows how many Finnish viewers have no VPN, how many are undecided and how many pay a competitor."],
            ["Read the chat.", "The questions viewers ask are the FAQ and the next creative brief. Here that meant explaining what a VPN is for, and answering price, devices, streaming and logs up front."],
            ["Watch the frequency.", "The most repeated complaint was seeing the poll too often. Run it less and more people will enjoy answering it, which also makes the answers better."],
          ].map(([t, b], i) => (
            <li key={t} className="grid grid-cols-[3rem_minmax(0,1fr)] gap-4">
              <span className="text-4xl leading-none tabular-nums" style={{ fontFamily: "'Instrument Serif', serif", color: accent }}>{i + 1}</span>
              <div>
                <h3 className="text-xl font-semibold text-foreground">{t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{b}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* ───────────── Sources ───────────── */}
      <Section id="sources">
        <div className="grid lg:grid-cols-[14rem_minmax(0,1fr)] gap-6 lg:gap-12">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">Sources and notes</h2>
          <div className="space-y-6 text-sm leading-relaxed text-muted-foreground max-w-3xl">
            <ul className="space-y-3">
              <li><span className="text-foreground font-medium">Campaign report.</span> Surfshark Finland campaign report, LIVAD delivery, poll and click logs, campaign 3854, 1 August to 1 September 2026. Live views, clicks, CTR, polls, votes, poll split, chat activity during ad moments, device, OS, browser and geography.</li>
              <li><span className="text-foreground font-medium">Clip and campaign analytics.</span> LIVAD clip verification and campaign analytics, final pull 1 September 2026. Ad plays, streams, clip verification, correct display, brand said, hours watched.</li>
              <li><span className="text-foreground font-medium">Replays.</span> Twitch VOD and clip view counts for the {delivery.channelsWithReplayData} channels with replay data, snapshot 1 September 2026.</li>
              <li><span className="text-foreground font-medium">Chat.</span> LIVAD keyword tracking (surfshark, vpn, surf), deduplicated, bots removed, read and translated from Finnish by us. LIVAD's dashboard counts {fmt(chat.dashboardKeywordHits)} keyword hits; {chat.messages} is the deduplicated viewer message count.</li>
            </ul>
            <div className="border-t border-border pt-6 space-y-3">
              <p><span className="text-foreground font-medium">Two click counts.</span> The report counts {fmt(headline.clicks)} clicks, which is the figure behind the {headline.ctr} CTR. Device, OS and browser shares are calculated on {fmt(clickAudience.resolvedOn)} rows in the raw click log, where the user agent resolved. The two come from different counts in the LIVAD data and differ by 46. We show both rather than force them to match. Geography is located on {fmt(geo.located)} clicks, {geo.locatedShare} of the total.</p>
              <p><span className="text-foreground font-medium">Two chat numbers.</span> {fmt(headline.chatMessagesDuringAds)} messages from {fmt(headline.chatPeopleDuringAds)} people is all chat activity during ad moments. The {chat.messages} messages in section 06 are only the ones that mention Surfshark or VPN.</p>
              <p><span className="text-foreground font-medium">Ad plays and polls.</span> {fmt(verification.adPlays)} ad plays were verified by clip; {fmt(headline.polls)} polls were run. The two are logged separately and are not expected to match one to one.</p>
              <p><span className="text-foreground font-medium">Replays.</span> A Twitch VOD view is a video load, including some autoplay. The combined {fmt(delivery.combined)} is live views plus VOD and clip views, and should be read as a range.</p>
              <p><span className="text-foreground font-medium">Not reported.</span> Age and gender are not available in the click log. One translated chat quote was left out because it quoted a price.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* ───────────── CTA ───────────── */}
      <section className="border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="rounded-[28px] bg-[#071214] text-white overflow-hidden grid lg:grid-cols-[1.4fr_1fr]">
            <div className="p-8 sm:p-10 md:p-14">
              <h2 className="text-3xl md:text-[2.6rem] leading-[1.1] font-semibold tracking-tight">
                Want to know what your market <Serif>thinks out loud?</Serif>
              </h2>
              <p className="mt-5 text-white/70 text-[17px] leading-relaxed max-w-lg">
                We run native overlay campaigns with Nordic Twitch creators, verify ad plays by clip, and
                report the chat, the replays and the clicks in one place.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
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
