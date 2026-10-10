import React from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";

/* Working with Beta Ads: the two ways to buy, then the due-diligence facts.
 * Managed (brands, test campaigns): we run the campaign from brief to report.
 * Self-serve (media agencies, partners): their own login to launch and resell,
 * with the option to connect campaigns to Adform and monitor them there.
 * Company facts and buyer policies are from the public registers or confirmed
 * by Andreas (2026-10-07). Keep it that way: no marketing claims, no invented numbers. */

const BOOKING_URL = "https://calendar.app.google/coW5NLQJtLxfRer19";
const PARTNER_MAIL = "mailto:sales@beta-ads.no?subject=Self-serve%20partner%20access";

const managedSteps: { t: string; d: string; who: "you" | "us" }[] = [
  { t: "Brief and budget", d: "Tell us the product, the market and the goal. We agree the number of views before launch.", who: "you" },
  { t: "Streamer selection", d: "We pick the creators from the Streamer Explorer. You can approve the list and remove anyone.", who: "us" },
  { t: "Custom overlay", d: "We design the animation in your brand, sized for a corner of the stream, plus the chat command and an optional poll.", who: "us" },
  { t: "Launch", d: "We brief the streamers, set it up in OBS and check that it runs on every channel from day one.", who: "us" },
  { t: "Live monitoring", d: "Every ad play leaves a recorded clip. You follow views, clicks and CTR in your own dashboard login.", who: "us" },
  { t: "Report", d: "A full report when the campaign ends: delivery, clicks, chat and replay reach. Undelivered views are refunded.", who: "us" },
];

const selfServe: { t: string; d: string }[] = [
  { t: "Your own platform login", d: "Find streamers in the Streamer Explorer, build the campaign and launch it yourself, when it suits your client." },
  { t: "Sell it as your own", d: "Package livestream as part of your media plan and sell it to your client on your terms. We stay in the background." },
  { t: "Adform connection", d: "We can connect campaigns to Adform, so you set them up from there and monitor delivery in the tool your team already uses." },
  { t: "Reporting you can forward", d: "Live numbers per streamer and per stream, clip verification and an end report you can put in front of the client." },
];

const compare: [string, string, string][] = [
  ["Who it's for", "Brands, and anyone running a first test campaign", "Media agencies and partners"],
  ["Who runs the campaign", "We do, from brief to report", "You do, in your own login"],
  ["Creative", "We design the overlay for you", "Your client's creative, set up in the platform"],
  ["Streamer list", "We select it, you can approve it", "You select it in the Streamer Explorer"],
  ["Monitoring", "Your own dashboard login", "Platform dashboard, or Adform if connected"],
  ["Who sells to the client", "We contract with you directly", "You do, on your terms"],
];

const faqs: { q: string; a: string }[] = [
  { q: "Should we start managed or self-serve?", a: "Brands and first test campaigns usually start managed: we run everything and you see how livestream performs before you build anything yourself. Agencies that run campaigns for several clients usually want self-serve access." },
  { q: "Can an agency start managed and move to self-serve later?", a: "Yes. Many start with one campaign we run for them, then get their own login for the next ones." },
  { q: "How does the Adform connection work?", a: "We connect the campaign to Adform so your team can set it up and follow it from there, next to the rest of the media plan. Ask us and we will set it up with you." },
  { q: "What counts as a view?", a: "One view is one fully played run of your animation on a live stream. Views are counted by the campaign platform per stream, not typed in by us." },
  { q: "What happens if a campaign delivers fewer views than agreed?", a: "You pay for the views in your agreement. If the campaign delivers fewer, we refund the undelivered share. Clicks and CTR are reported but not guaranteed." },
  { q: "Who do I sign the contract with and pay?", a: "BETA AGENCY AS, org.nr 933 303 136. The agreement names this company and the invoice comes from it, to a bank account in its name." },
  { q: "Who owns and runs Beta Ads?", a: "Andreas Myraune founded the company and is its CEO, chairman and sole owner. He signs the agreements and is the person you deal with." },
  { q: "Can I talk to a previous client?", a: "Yes. Ask us and we will put you in touch with a recent client." },
];

const facts: [string, React.ReactNode][] = [
  ["Legal name", "BETA AGENCY AS"],
  ["Organisation number", "933 303 136 (VAT registered, NO 933 303 136 MVA)"],
  ["Founded", "15 March 2024"],
  ["Registered office", "Frosta, Norway"],
  ["Based in", "Oslo, selling across Norway, Sweden, Denmark and Finland"],
  ["Founder, CEO and owner", <a key="li" href="https://www.linkedin.com/in/myraune" className="underline underline-offset-4">Andreas Myraune</a>],
];

const coverage: { outlet: string; date: string; title: string; url: string }[] = [
  { outlet: "Frostingen", date: "Apr 2026", title: "Odelsgutten Andreas (22) satser på Twitch-reklame fra Chicago", url: "https://www.frostingen.no/odelsgutten-andreas-22-satser-pa-twitch-reklame-fra-chicago-vil-tjene-penger/s/5-166-56722" },
  { outlet: "Kampanje", date: "May 2025", title: "Andreas (22) startet byrå ved siden av studiene. Nå utvider han til Sverige og Finland", url: "https://kampanje.com/premium/mai-2025/innsikt/andreas-22-startet-byra-ved-siden-av-studiene--na-utvider-han-til-sverige-og-finland/" },
  { outlet: "Kampanje", date: "Sep 2024", title: "Andreas (21) satser på eget Twitch-byrå", url: "https://kampanje.com/premium/september-2024/innsikt/andreas-21-satser-pa-eget-twtich-byra--na-far-han-polske-tech-krefter-i-ryggen---har-lagt-grunnlaget-na/" },
  { outlet: "Kom24", date: "2024", title: "Ny kanal for mediekjøp: Beta er Norges nye Twitch-byrå", url: "https://www.kom24.no/andreas-myraune-beta-influensere/ny-kanal-for-mediekjop-beta-er-norges-nye-twitch-byra/730424" },
  { outlet: "Ocast", date: "Ongoing", title: "Beta on the Ocast advertising marketplace, with the Norstat campaign", url: "https://ocast.com/no/beta-reklamebyra" },
];

const W = "max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-10";
const kicker = "text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground";

const PrimaryBtn: React.FC<{ href: string; children: React.ReactNode; cta: "book" | "email" }> = ({ href, children, cta }) => (
  <a href={href} data-cta={cta} target={cta === "book" ? "_blank" : undefined} rel={cta === "book" ? "noopener noreferrer" : undefined}
    className="inline-flex items-center h-11 px-6 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
    {children}
  </a>
);
const GhostBtn: React.FC<{ href: string; children: React.ReactNode; cta: "book" | "email" }> = ({ href, children, cta }) => (
  <a href={href} data-cta={cta} target={cta === "book" ? "_blank" : undefined} rel={cta === "book" ? "noopener noreferrer" : undefined}
    className="inline-flex items-center h-11 px-6 rounded-full border border-border text-foreground text-sm font-semibold hover:border-foreground/40 transition-colors">
    {children}
  </a>
);

const WorkingWithUs: React.FC = () => {
  return (
    <>
      <SEO
        title="Working with Beta Ads: managed campaigns or self-serve for agencies | Beta Ads"
        description="Two ways to run livestream ads with Beta Ads: we run brand and test campaigns from brief to report, or media agencies and partners launch and resell campaigns themselves, with an Adform connection. Plus company facts and delivery guarantees."
        canonical="/working-with-us"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          },
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Working with Beta Ads",
            url: "https://beta-ads.no/working-with-us",
            about: { "@id": "https://beta-ads.no/#organization" },
            isPartOf: { "@id": "https://beta-ads.no/#website" },
          },
        ]}
      />

      <div className="min-h-screen bg-background text-foreground">
        {/* ───────── Hero: two ways in ───────── */}
        <header className={`${W} pt-32 md:pt-40 pb-14 md:pb-20`}>
          <div className={`${kicker} mb-5`}>Working with us</div>
          <h1 className="text-[2.6rem] leading-[1.04] sm:text-6xl lg:text-[4.4rem] font-bold tracking-[-0.03em] max-w-4xl m-0">
            Two ways to run <span className="hl">livestream ads.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Brands and first test campaigns get the whole campaign run for them, from brief to report.
            Media agencies and partners get their own login to launch campaigns and sell them to their clients.
          </p>

          <div className="mt-12 grid md:grid-cols-2 gap-4 md:gap-5">
            <a href="#managed" className="group relative overflow-hidden rounded-[20px] bg-[#0b0a0b] text-white min-h-[320px] flex flex-col justify-end p-7 md:p-9">
              <img src="/home/samsung-s25-stream-a.webp" alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover opacity-45 group-hover:opacity-55 transition-opacity" />
              <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" aria-hidden />
              <span className="relative text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">For brands and test campaigns</span>
              <span className="relative mt-3 text-3xl md:text-4xl font-bold tracking-tight">Managed. <span className="font-light text-white/70">We run it A to Z.</span></span>
              <span className="relative mt-3 text-sm text-white/70 max-w-md">Streamers, overlay, launch, monitoring and report. You approve and follow along.</span>
            </a>
            <a href="#self-serve" className="group relative overflow-hidden rounded-[8px] border border-border bg-card min-h-[320px] flex flex-col justify-end p-7 md:p-9">
              <span className="mb-auto self-end w-[52%] max-w-[240px] rounded-[10px] overflow-hidden bg-[#0b0a0b] ring-1 ring-border" aria-hidden>
                <img src="/home/glorious-poster.webp" alt="" className="w-full h-auto block opacity-90 group-hover:opacity-100 transition-opacity" loading="lazy" />
              </span>
              <span className="mt-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">For media agencies and partners</span>
              <span className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">Self-serve. <span className="font-light text-muted-foreground">Launch it, sell it.</span></span>
              <span className="mt-3 text-sm text-muted-foreground max-w-md">Your own login to build and launch campaigns for your clients, with an Adform connection to monitor them where you already work.</span>
            </a>
          </div>
        </header>

        {/* ───────── Managed ───────── */}
        <section id="managed" className="scroll-mt-24 border-t border-border py-16 md:py-24">
          <div className={W}>
            <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-start">
              <div className="lg:sticky lg:top-28">
                <div className={`${kicker} mb-4`}>Managed · for brands and test campaigns</div>
                <h2 className="text-3xl md:text-[2.6rem] leading-[1.08] font-bold tracking-tight m-0">
                  We run the whole campaign. <span className="hl">You see every step.</span>
                </h2>
                <p className="mt-5 text-muted-foreground leading-relaxed max-w-lg">
                  The right start if livestream is new to you. You give us the brief and the budget. We
                  handle the streamers, the creative, the setup and the reporting, and you follow it
                  live in your own dashboard login.
                </p>
                <figure className="mt-8 hidden lg:block">
                  <div className="overflow-hidden rounded-[14px] bg-black aspect-video">
                    <img src="/home/komplett-stream.webp" alt="Komplett's monthly gaming deals overlay running on a Norwegian Twitch stream" className="w-full h-full object-cover scale-[1.12]" loading="lazy" />
                  </div>
                  <figcaption className="mt-2.5 text-xs text-muted-foreground">A managed campaign on air: Komplett's overlay, built by us, on a Norwegian stream.</figcaption>
                </figure>
                <div className="mt-8 flex flex-wrap gap-3">
                  <PrimaryBtn href={BOOKING_URL} cta="book">Plan a campaign</PrimaryBtn>
                  <Link to="/case-studies" className="inline-flex items-center h-11 px-6 rounded-full border border-border text-foreground text-sm font-semibold hover:border-foreground/40 transition-colors">See managed campaigns</Link>
                </div>
              </div>

              <ol className="m-0 p-0 list-none border-t border-border">
                {managedSteps.map((s, i) => (
                  <li key={s.t} className="grid grid-cols-[3rem_minmax(0,1fr)_auto] gap-x-4 py-6 border-b border-border items-baseline">
                    <span className="text-sm tabular-nums text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className="m-0 text-lg font-semibold tracking-tight">{s.t}</h3>
                      <p className="mt-1.5 mb-0 text-[15px] leading-relaxed text-muted-foreground">{s.d}</p>
                    </div>
                    <span className={`text-[11px] font-semibold uppercase tracking-[0.14em] whitespace-nowrap ${s.who === "you" ? "text-foreground" : "text-muted-foreground"}`}>
                      {s.who === "you" ? "You" : "Beta Ads"}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ───────── Self-serve ───────── */}
        <section id="self-serve" className="scroll-mt-24 border-t border-border py-16 md:py-24">
          <div className={W}>
            <div className="max-w-3xl">
              <div className={`${kicker} mb-4`}>Self-serve · for media agencies and partners</div>
              <h2 className="text-3xl md:text-[2.6rem] leading-[1.08] font-bold tracking-tight m-0">
                Launch campaigns yourself. <span className="hl">Sell them to your clients.</span>
              </h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                For agencies that want livestream in their own media plans. You get access to the same
                platform we use: find the streamers, launch the campaign and report it to your client,
                without waiting on us.
              </p>
            </div>

            <div className="mt-12 grid lg:grid-cols-[1.15fr_0.85fr] gap-6 items-stretch">
              <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8 content-start">
                {selfServe.map((f) => (
                  <div key={f.t} className="border-t border-border pt-5">
                    <h3 className="m-0 text-lg font-semibold tracking-tight">{f.t}</h3>
                    <p className="mt-2 mb-0 text-[15px] leading-relaxed text-muted-foreground">{f.d}</p>
                  </div>
                ))}
              </div>

              {/* How the Adform connection fits in */}
              <div className="rounded-[18px] bg-[#0b0a0b] text-white p-7 md:p-8 flex flex-col dark:bg-white/[0.04] dark:ring-1 dark:ring-white/10">
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">Works with Adform</div>
                <p className="mt-3 text-xl font-semibold tracking-tight leading-snug m-0">Set it up and follow it next to the rest of the media plan.</p>
                <ol className="mt-7 m-0 p-0 list-none space-y-0">
                  {[
                    ["Set up", "Create the campaign from Adform, connected to Beta Ads."],
                    ["Run", "The overlay runs inside the streamers' live streams."],
                    ["Monitor", "Follow delivery in Adform, with the full detail in the Beta Ads dashboard."],
                  ].map(([t, d], i) => (
                    <li key={t} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3 py-4 border-t border-white/12">
                      <span className="text-sm tabular-nums text-white/45">{i + 1}</span>
                      <div>
                        <div className="text-[15px] font-semibold">{t}</div>
                        <div className="text-sm text-white/65 leading-relaxed">{d}</div>
                      </div>
                    </li>
                  ))}
                </ol>
                <div className="mt-auto pt-6 flex flex-wrap gap-3">
                  <a href={PARTNER_MAIL} data-cta="email" className="inline-flex items-center h-11 px-6 rounded-full bg-white text-[#0b0a0b] text-sm font-semibold hover:bg-white/90 transition-colors">Get partner access</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ───────── Side by side ───────── */}
        <section id="compare" className="scroll-mt-24 border-t border-border py-16 md:py-24">
          <div className={W}>
            <h2 className="text-3xl md:text-[2.4rem] leading-[1.1] font-bold tracking-tight m-0 max-w-3xl">
              Managed or self-serve. <span className="hl">Side by side.</span>
            </h2>
            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[640px] text-left border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-3 pr-6 w-[24%] text-sm font-medium text-muted-foreground" />
                    <th className="py-3 pr-6 text-sm font-semibold">Managed</th>
                    <th className="py-3 text-sm font-semibold">Self-serve</th>
                  </tr>
                </thead>
                <tbody>
                  {compare.map(([k, a, b]) => (
                    <tr key={k} className="border-b border-border align-top">
                      <th scope="row" className="py-4 pr-6 text-sm font-medium text-muted-foreground">{k}</th>
                      <td className="py-4 pr-6 text-[15px]">{a}</td>
                      <td className="py-4 text-[15px]">{b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ───────── Same rules in both ───────── */}
        <section id="billing" className="scroll-mt-24 border-t border-border py-16 md:py-24">
          <div className={W}>
            <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16">
              <div>
                <div className={`${kicker} mb-4`}>The same in both</div>
                <h2 className="text-3xl md:text-[2.4rem] leading-[1.1] font-bold tracking-tight m-0">
                  You pay for views. <span className="hl">Not for promises.</span>
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
                {[
                  ["Priced per 1,000 views", "One view is one fully played run of the animation on a live stream, counted by the platform per stream."],
                  ["Undelivered views refunded", "If a campaign delivers fewer views than agreed, the undelivered share is refunded. Clicks and CTR are reported, not guaranteed."],
                  ["Every ad play verified", "A short clip of the stream is recorded around each ad play, so delivery is something you can look at."],
                  ["Your own dashboard login", "Views, clicks and CTR per streamer and per stream while it runs, and a report when it ends."],
                ].map(([t, d]) => (
                  <div key={t} className="border-t border-border pt-5">
                    <h3 className="m-0 text-lg font-semibold tracking-tight">{t}</h3>
                    <p className="mt-2 mb-0 text-[15px] leading-relaxed text-muted-foreground">{d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ───────── Company + coverage ───────── */}
        <section id="company" className="scroll-mt-24 border-t border-border py-16 md:py-24">
          <div className={`${W} grid lg:grid-cols-2 gap-12 lg:gap-16`}>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight m-0">Who you work with</h2>
              <dl className="mt-6 m-0 border-t border-border">
                {facts.map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[11rem_minmax(0,1fr)] gap-4 py-3 border-b border-border">
                    <dt className="text-sm text-muted-foreground">{k}</dt>
                    <dd className="m-0 text-[15px]">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 text-sm text-muted-foreground">
                Check us yourself in the{" "}
                <a href="https://virksomhet.brreg.no/nb/oppslag/enheter/933303136" className="text-foreground underline underline-offset-4">Brønnøysund Register Centre</a>
                {" "}and on{" "}
                <a href="https://www.proff.no/roller/beta-agency-as/frosta/reklamebyr%C3%A5er/IFFNXB401DI" className="text-foreground underline underline-offset-4">Proff</a>.
              </p>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight m-0">Written about us, <span className="hl">not by us</span></h2>
              <ul className="mt-6 m-0 p-0 list-none border-t border-border">
                {coverage.map((c) => (
                  <li key={c.url} className="grid grid-cols-[7.5rem_minmax(0,1fr)] gap-4 py-3 border-b border-border">
                    <span className="text-sm text-muted-foreground">{c.outlet}, {c.date}</span>
                    <a href={c.url} className="text-[15px] hover:underline underline-offset-4">{c.title}</a>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-muted-foreground">
                Campaign results are on the <Link to="/case-studies" className="text-foreground underline underline-offset-4">case studies</Link> page. Ask for the full report behind any of them.
              </p>
            </div>
          </div>
        </section>

        {/* ───────── FAQ ───────── */}
        <section id="faq" className="scroll-mt-24 border-t border-border py-16 md:py-24">
          <div className={`${W} grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16`}>
            <h2 className="text-3xl md:text-[2.4rem] leading-[1.1] font-bold tracking-tight m-0">Questions <span className="hl">buyers ask</span></h2>
            <div className="border-t border-border">
              {faqs.map((f) => (
                <details key={f.q} className="group border-b border-border py-5">
                  <summary className="cursor-pointer list-none flex justify-between gap-6 text-[17px] font-semibold tracking-tight">
                    {f.q}
                    <span className="text-muted-foreground group-open:rotate-45 transition-transform" aria-hidden>+</span>
                  </summary>
                  <p className="mt-3 mb-0 text-[15px] leading-relaxed text-muted-foreground max-w-2xl">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── CTA ───────── */}
        <section className="border-t border-border py-16 md:py-24">
          <div className={W}>
            <div className="grid md:grid-cols-2 gap-4 md:gap-5">
              <div className="rounded-[20px] border border-border p-8 md:p-10">
                <div className={kicker}>Brands</div>
                <p className="mt-3 text-2xl md:text-3xl font-bold tracking-tight m-0">Run a test campaign <span className="hl">with us.</span></p>
                <p className="mt-3 mb-7 text-muted-foreground">A 30 minute call with Andreas about your product, market and budget.</p>
                <PrimaryBtn href={BOOKING_URL} cta="book">Book a call</PrimaryBtn>
              </div>
              <div className="rounded-[8px] border border-border p-8 md:p-10">
                <div className={kicker}>Agencies and partners</div>
                <p className="mt-3 text-2xl md:text-3xl font-bold tracking-tight m-0">Get your own <span className="hl">platform login.</span></p>
                <p className="mt-3 mb-7 text-muted-foreground">Tell us about your agency and clients, and we set up access and the Adform connection.</p>
                <GhostBtn href={PARTNER_MAIL} cta="email">Get partner access</GhostBtn>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default WorkingWithUs;
