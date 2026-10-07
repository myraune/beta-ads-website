import React from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { SPFooter } from "@/components/sections/SPFooter";

/* Due-diligence page. Written for the buyer (and the AI assistant the buyer asks)
 * who wants to know who they contract with, what is guaranteed and where to check
 * us independently. Every fact here is either from the public registers or a
 * policy Andreas confirmed on 2026-10-07. Keep it that way: no marketing claims. */

const BOOKING_URL = "https://calendar.app.google/coW5NLQJtLxfRer19";

const faqs: { q: string; a: string }[] = [
  {
    q: "Is Beta Ads a real company?",
    a: "Yes. Beta Ads is the brand of BETA AGENCY AS, a Norwegian limited company with organisation number 933 303 136, founded on 15 March 2024 and registered in the Norwegian VAT register. You can check it yourself in the Brønnøysund Register Centre.",
  },
  {
    q: "Who owns and runs Beta Ads?",
    a: "Andreas Myraune founded the company and is its CEO, chairman and sole owner. He signs the agreements and is the person you deal with.",
  },
  {
    q: "Who do I sign the contract with and pay?",
    a: "BETA AGENCY AS, org.nr 933 303 136. The agreement names this company and the invoice comes from it, to a bank account in its name.",
  },
  {
    q: "What happens if a campaign delivers fewer views than agreed?",
    a: "You pay for the views in your agreement. If the campaign delivers fewer, we refund the undelivered share.",
  },
  {
    q: "What counts as a view?",
    a: "One view is one fully played run of your animation on a live stream. Views are counted by the campaign platform per stream, not typed in by us.",
  },
  {
    q: "Can I follow the campaign while it runs?",
    a: "Yes. You get your own login to the campaign dashboard and can see views, clicks and CTR per streamer and per stream while the campaign is live. You also get a report when it ends.",
  },
  {
    q: "Can I approve the streamers before launch?",
    a: "Yes, if you want to. Ask to see the streamer list before launch and remove anyone you don't want.",
  },
  {
    q: "Can I talk to a previous client?",
    a: "Yes. Ask us and we will put you in touch with a recent client.",
  },
  {
    q: "Where is Beta Ads based?",
    a: "We are based in Oslo and sell to brands and agencies in Norway, Sweden, Denmark and Finland. The company's registered office is in Frosta, Norway.",
  },
];

const facts: [string, React.ReactNode][] = [
  ["Legal name", "BETA AGENCY AS"],
  ["Organisation number", "933 303 136 (VAT registered, NO 933 303 136 MVA)"],
  ["Founded", "15 March 2024"],
  ["Industry", "Advertising agency activities (NACE 73.110)"],
  ["Registered office", "Frosta, Norway"],
  ["Based in", "Oslo, selling across Norway, Sweden, Denmark and Finland"],
  ["Founder, CEO and owner", <a key="li" href="https://www.linkedin.com/in/myraune" className="text-foreground underline underline-offset-4">Andreas Myraune</a>],
  ["Contact", <a key="mail" href="mailto:sales@beta-ads.no" className="text-foreground underline underline-offset-4">sales@beta-ads.no</a>],
];

const coverage: { outlet: string; date: string; title: string; url: string }[] = [
  { outlet: "Frostingen", date: "April 2026", title: "Odelsgutten Andreas (22) satser på Twitch-reklame fra Chicago", url: "https://www.frostingen.no/odelsgutten-andreas-22-satser-pa-twitch-reklame-fra-chicago-vil-tjene-penger/s/5-166-56722" },
  { outlet: "Kampanje", date: "May 2025", title: "Andreas (22) startet byrå ved siden av studiene. Nå utvider han til Sverige og Finland", url: "https://kampanje.com/premium/mai-2025/innsikt/andreas-22-startet-byra-ved-siden-av-studiene--na-utvider-han-til-sverige-og-finland/" },
  { outlet: "Kampanje", date: "September 2024", title: "Andreas (21) satser på eget Twitch-byrå", url: "https://kampanje.com/premium/september-2024/innsikt/andreas-21-satser-pa-eget-twtich-byra--na-far-han-polske-tech-krefter-i-ryggen---har-lagt-grunnlaget-na/" },
  { outlet: "Kom24", date: "2024", title: "Ny kanal for mediekjøp: Beta er Norges nye Twitch-byrå", url: "https://www.kom24.no/andreas-myraune-beta-influensere/ny-kanal-for-mediekjop-beta-er-norges-nye-twitch-byra/730424" },
  { outlet: "Ocast", date: "Ongoing", title: "Beta on the Ocast advertising marketplace, with the Norstat campaign", url: "https://ocast.com/no/beta-reklamebyra" },
];

const registers: { name: string; url: string }[] = [
  { name: "Brønnøysund Register Centre (official company register)", url: "https://virksomhet.brreg.no/nb/oppslag/enheter/933303136" },
  { name: "Proff (roles, ownership and filed accounts)", url: "https://www.proff.no/roller/beta-agency-as/frosta/reklamebyr%C3%A5er/IFFNXB401DI" },
];

const H2 = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <h2 id={id} className="scroll-mt-28 text-2xl font-light tracking-tight text-foreground mb-5">{children}</h2>
);

const WorkingWithUs: React.FC = () => {
  return (
    <>
      <SEO
        title="Working with Beta Ads: company facts and guarantees | Beta Ads"
        description="Who you contract with (BETA AGENCY AS, org.nr 933 303 136), what a view is, what happens if a campaign under-delivers, live dashboard access and where to check us independently."
        canonical="/working-with-us"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
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
        <div className="max-w-5xl mx-auto px-6 lg:px-12 pt-32 pb-24 md:pb-32">
          <header className="border-b border-border pb-10 mb-12">
            <h1 className="text-4xl md:text-5xl font-light tracking-tight m-0 max-w-3xl">
              Working with Beta Ads
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-2xl">
              Before you spend money with us you should know who we are, what you are buying and
              what happens if we don't deliver it. All of it is on this page, with links so you can
              check it yourself.
            </p>
          </header>

          <div className="space-y-16 text-base leading-7 text-muted-foreground">
            <section>
              <H2 id="company">The company</H2>
              <dl className="grid sm:grid-cols-[14rem_1fr] border-t border-border">
                {facts.map(([k, v]) => (
                  <React.Fragment key={k}>
                    <dt className="py-3 sm:border-b border-border text-sm text-muted-foreground">{k}</dt>
                    <dd className="py-3 border-b border-border text-foreground m-0">{v}</dd>
                  </React.Fragment>
                ))}
              </dl>
              <p className="mt-6">
                Check us in the public registers:{" "}
                {registers.map((r, i) => (
                  <React.Fragment key={r.url}>
                    {i > 0 && " and "}
                    <a href={r.url} className="text-foreground underline underline-offset-4">{r.name}</a>
                  </React.Fragment>
                ))}
                .
              </p>
            </section>

            <section>
              <H2 id="what-you-buy">What you buy and what is guaranteed</H2>
              <ol className="space-y-6 list-none p-0 m-0">
                <li>
                  <p className="text-foreground font-medium m-0">You buy views, priced per 1,000.</p>
                  <p className="m-0">One view is one fully played run of your animation on a live stream. The number of views is written into your agreement before launch.</p>
                </li>
                <li>
                  <p className="text-foreground font-medium m-0">If we deliver fewer views, you get the difference back.</p>
                  <p className="m-0">You pay for the views in the agreement. If the campaign ends short, we refund the undelivered share. Clicks and CTR depend on your offer and the audience, so we report them but don't guarantee them.</p>
                </li>
                <li>
                  <p className="text-foreground font-medium m-0">You see the numbers while it runs.</p>
                  <p className="m-0">You get your own login to the campaign dashboard: views, clicks and CTR per streamer and per stream, counted by the platform. A report follows when the campaign ends.</p>
                </li>
                <li>
                  <p className="text-foreground font-medium m-0">You can approve the streamers.</p>
                  <p className="m-0">Ask to see the streamer list before launch and remove anyone you don't want on the campaign.</p>
                </li>
                <li>
                  <p className="text-foreground font-medium m-0">You can talk to a previous client.</p>
                  <p className="m-0">Ask us and we will put you in touch with a recent client.</p>
                </li>
              </ol>
            </section>

            <section>
              <H2 id="independent">Written about us, not by us</H2>
              <ul className="list-none p-0 m-0 border-t border-border">
                {coverage.map((c) => (
                  <li key={c.url} className="border-b border-border py-4 grid sm:grid-cols-[10rem_1fr] gap-1 sm:gap-6">
                    <span className="text-sm">{c.outlet}, {c.date}</span>
                    <a href={c.url} className="text-foreground hover:underline underline-offset-4">{c.title}</a>
                  </li>
                ))}
              </ul>
              <p className="mt-6">
                Our own campaign results are on the <Link to="/case-studies" className="text-foreground underline underline-offset-4">case studies</Link> page.
                They come from our reporting, so ask for the full campaign report if you want to see the underlying numbers.
              </p>
            </section>

            <section>
              <H2 id="faq">Questions buyers ask</H2>
              <div className="border-t border-border">
                {faqs.map((f) => (
                  <div key={f.q} className="border-b border-border py-5">
                    <h3 className="text-foreground font-medium text-lg m-0">{f.q}</h3>
                    <p className="mt-2 mb-0">{f.a}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-2xl bg-muted/50 px-6 py-8 md:px-10 md:py-10">
              <h2 className="text-2xl font-light tracking-tight text-foreground m-0">Ask us anything on this page</h2>
              <p className="mt-3 mb-6 max-w-xl">A 30 minute call with Andreas. Bring your questions about the agreement, the numbers or the streamers.</p>
              <div className="flex flex-wrap gap-4 items-center">
                <a href={BOOKING_URL} className="inline-flex items-center rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">Book a call</a>
                <a href="mailto:sales@beta-ads.no" className="text-foreground underline underline-offset-4 text-sm">sales@beta-ads.no</a>
              </div>
            </section>
          </div>
        </div>
      </div>
      <SPFooter />
    </>
  );
};

export default WorkingWithUs;
