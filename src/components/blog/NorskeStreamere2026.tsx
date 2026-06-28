import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

/**
 * Flagship Norwegian creator roundup - bespoke editorial layout (not the generic
 * markdown article template). Real Twitch avatars via unavatar.io/twitch/<handle>
 * (the same public-avatar source the streamer explorer already uses).
 *
 * Facts are sourced from web research; anything uncertain is intentionally kept
 * qualitative in the copy and listed in the publish-time verify notes.
 */

interface SocialLink {
  label: string;
  url: string;
}

interface Creator {
  handle: string;          // Twitch handle for the channel link
  name: string;            // display name
  realName?: string;       // only when publicly known + reasonably confirmed
  meta: string;            // platforms / role line
  blurb: string;           // 1-2 sentence native Norwegian description
  image: string;           // local path (downloaded real photo)
  attribution: string;     // who to credit (rendered as a small label under the image)
  attributionUrl: string;  // canonical source page for the photo
  /** Streaming language - important for brands picking who to work with. */
  language: "no" | "en" | "mixed";
  /** Sosiale lenker, kun de jeg har kilde for (gjetter ikke). */
  socials: SocialLink[];
}

const CREATORS: Creator[] = [
  {
    handle: "mrsavage",
    name: "MrSavage",
    realName: "Martin Foss Andersen",
    meta: "Twitch · YouTube · proff Fortnite",
    blurb:
      "Norges desidert største navn på Twitch. Profesjonell Fortnite-spiller med Fortnite-VM bak seg og et publikum i millionklassen på tvers av plattformene.",
    image: "/lovable-uploads/creators/mrsavage.jpg",
    attribution: "Liquipedia (FNCS Major)",
    attributionUrl: "https://liquipedia.net/fortnite/MrSavage",
    language: "en",
    socials: [
      { label: "Twitch",    url: "https://www.twitch.tv/mrsavage" },
      { label: "YouTube",   url: "https://www.youtube.com/@MrSavageOG" },
      { label: "Instagram", url: "https://www.instagram.com/mrsavage" },
    ],
  },
  {
    handle: "knut",
    name: "Knut",
    realName: "Knut Spildrejorde",
    meta: "Twitch · fitness, IRL & gaming",
    blurb:
      "Streameren som koblet norsk treningskultur til gaming. Kjent for «Camp Knut» og en blanding av gym, IRL og spill - i dag med mye av innholdet drevet fra USA.",
    image: "/lovable-uploads/creators/knut.png",
    attribution: "Wikimedia Commons (CC BY 3.0)",
    attributionUrl: "https://commons.wikimedia.org/wiki/File:Knut_2023-06-09_01.png",
    language: "en",
    socials: [
      { label: "Twitch",    url: "https://www.twitch.tv/knut" },
      { label: "Instagram", url: "https://www.instagram.com/knutspild" },
      { label: "X",         url: "https://x.com/Knutspild" },
    ],
  },
  {
    handle: "detoo",
    name: "detoo",
    realName: "Jørgen Jenssen",
    meta: "Twitch · YouTube · variert",
    blurb:
      "En av de mest sette norskspråklige streamerne. Hopper mellom Fortnite, Minecraft, Rust og Just Chatting, og holder et høyt tempo med mange timer live.",
    image: "/lovable-uploads/creators/detoo.jpg",
    attribution: "detoo.no",
    attributionUrl: "https://detoo.no/",
    language: "no",
    socials: [
      { label: "Twitch",  url: "https://www.twitch.tv/detoo" },
      { label: "YouTube", url: "https://www.youtube.com/@detoo" },
      { label: "Nettside", url: "https://detoo.no/" },
    ],
  },
  {
    handle: "emzia",
    name: "Emzia",
    realName: "Emilie Helgesen",
    meta: "Twitch · skytespill & variert",
    blurb:
      "En av Norges mest etablerte streamere og en tydelig stemme for et trygt streamingmiljø. Tidligere Twitch-ambassadør, og et kjent fjes også utenfor plattformen.",
    image: "/lovable-uploads/creators/emzia.png",
    attribution: "NOT Management",
    attributionUrl: "https://notmanagement.no/talent/emzia/",
    language: "no",
    socials: [
      { label: "Twitch",    url: "https://www.twitch.tv/emzia" },
      { label: "Instagram", url: "https://www.instagram.com/emziatv" },
      { label: "TikTok",    url: "https://www.tiktok.com/@emziatv" },
      { label: "YouTube",   url: "https://www.youtube.com/@emziatv" },
    ],
  },
  {
    handle: "thomaspaste",
    name: "thomasPASTE",
    meta: "Twitch · variert gaming",
    blurb:
      "Tidligere radioprofil som ble fulltidsstreamer. Pratsom, personlig stil og en av de mer langvarige norske kanalene.",
    image: "/lovable-uploads/creators/thomaspaste.png",
    attribution: "Twitch / @thomaspaste",
    attributionUrl: "https://www.twitch.tv/thomaspaste",
    language: "no",
    socials: [
      { label: "Twitch",  url: "https://www.twitch.tv/thomaspaste" },
      { label: "YouTube", url: "https://www.youtube.com/@thomasPASTE" },
      { label: "X",       url: "https://x.com/thomaspaste" },
    ],
  },
  {
    handle: "klokkismann",
    name: "Klokkismann",
    realName: "Aslak Maurstad",
    meta: "Twitch · Minecraft, sjakk & prat",
    blurb:
      "Skuespiller og stemmeskuespiller som også streamer. Vant «Forræder» i 2023, og veksler mellom Minecraft, sjakk og Just Chatting.",
    image: "/lovable-uploads/creators/klokkismann.jpg",
    attribution: "Foto: Jan-Petter Dahl / TV 2 (NTB pressemelding)",
    attributionUrl:
      "https://kommunikasjon.ntb.no/pressemelding/18478817/aslak-maurstad-leder-ny-storsatsing-pa-tv-2",
    language: "no",
    socials: [
      { label: "Twitch",    url: "https://www.twitch.tv/klokkismann" },
      { label: "Instagram", url: "https://www.instagram.com/klokkismann" },
      { label: "YouTube",   url: "https://www.youtube.com/@klokkismann" },
    ],
  },
  {
    handle: "dennisvareide",
    name: "Dennis Vareide",
    realName: "Dennis Vareide",
    meta: "YouTube · Twitch · Minecraft",
    blurb:
      "En av Norges OG-skapere. Halvparten av «Prebz og Dennis», med en lang fartstid i norsk YouTube og TV i tillegg til streaming.",
    image: "/lovable-uploads/creators/dennisvareide.jpg",
    attribution: "Thor Brødreskift, Wikimedia Commons (CC BY-SA 2.0)",
    attributionUrl:
      "https://commons.wikimedia.org/wiki/File:Dennis_Vareide_-_YouTube-talentene-_de_nye_mediestjernene_-_NMD_2015_(17236435890)_(cropped).jpg",
    language: "mixed",
    socials: [
      { label: "YouTube", url: "https://www.youtube.com/@PrebzOgDennis" },
      { label: "Twitch",  url: "https://www.twitch.tv/dennisvareide" },
    ],
  },
  {
    handle: "jonieboi",
    name: "Jonieboi",
    realName: "Jonas Johannessen",
    meta: "YouTube · Twitch · reaksjon & humor",
    blurb:
      "Kjent for reaksjons- og komiinnhold med norsk humor. Størst på YouTube, men også aktiv på Twitch.",
    image: "/lovable-uploads/creators/jonieboi.png",
    attribution: "Spires Agency",
    attributionUrl: "https://www.spiresagency.com/talent/jonieboi",
    language: "no",
    socials: [
      { label: "YouTube",   url: "https://www.youtube.com/@JonieBoi" },
      { label: "Twitch",    url: "https://www.twitch.tv/jonieboi" },
      { label: "Instagram", url: "https://www.instagram.com/jonieboitv" },
      { label: "TikTok",    url: "https://www.tiktok.com/@jonieboi" },
    ],
  },
  {
    handle: "danniz",
    name: "DannizTV",
    meta: "Twitch · variert gaming",
    blurb:
      "«Løs humor og high-quality gaming.» En langvarig norsk kanal med en lojal seerskare - en av streamerne Beta Ads selv har jobbet med.",
    image: "/lovable-uploads/creators/danniz.png",
    attribution: "Twitch / @danniz",
    attributionUrl: "https://www.twitch.tv/danniz",
    language: "no",
    socials: [{ label: "Twitch", url: "https://www.twitch.tv/danniz" }],
  },
  {
    handle: "mystixx",
    name: "Mystixx",
    meta: "Twitch · IRL & Minecraft",
    blurb:
      "Fulltidsstreamer fra Kongsberg, kjent for IRL/Just Chatting og Minecraft Hardcore.",
    image: "/lovable-uploads/creators/mystixx.png",
    attribution: "Twitch / @mystixx",
    attributionUrl: "https://www.twitch.tv/mystixx",
    language: "no",
    socials: [
      { label: "Twitch",    url: "https://www.twitch.tv/mystixx" },
      { label: "YouTube",   url: "https://www.youtube.com/@mystixx" },
      { label: "Instagram", url: "https://www.instagram.com/mystixxtv" },
      { label: "TikTok",    url: "https://www.tiktok.com/@mystixxtwitch" },
      { label: "X",         url: "https://x.com/MystixxTV" },
    ],
  },
];

const NorskeStreamere2026: React.FC = () => {
  return (
    <div className="pb-4">
      {/* Editorial header - tett, så listen kommer over folden */}
      <header className="max-w-3xl mb-8">
        <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
          Norsk streaming
        </span>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-foreground leading-[1.1] mb-4">
          Norske Twitch-streamere du bør kjenne til i{" "}
          <span style={{ fontFamily: "'Instrument Serif', serif" }} className="italic font-normal">
            2026
          </span>
        </h1>
        <p className="text-base md:text-lg font-light text-muted-foreground leading-relaxed">
          Et utvalg av streamere og innholdsskapere som setter preg på det norske
          streamingmiljøet - fra Fortnite-proffer til IRL-profiler og
          YouTube-veteraner. Ikke en rangering, en oversikt.
        </p>

        {/* Språk-legend - kompakt */}
        <div className="mt-4 flex flex-wrap items-center gap-1.5 text-[11px]">
          <span className="text-muted-foreground mr-1">Streamer på:</span>
          <span className="inline-flex items-center rounded-full bg-foreground text-background px-2 py-0.5 font-semibold tracking-widest uppercase">
            Norsk
          </span>
          <span className="inline-flex items-center rounded-full bg-primary text-white px-2 py-0.5 font-semibold tracking-widest uppercase">
            Engelsk
          </span>
          <span className="inline-flex items-center rounded-full bg-muted text-foreground px-2 py-0.5 font-semibold tracking-widest uppercase">
            Norsk / Engelsk
          </span>
        </div>
      </header>

      {/* Kort-grid: 2 per rad på desktop, 1 på mobil. Hvert kort er
          selvstendig med ekte foto, Twitch-avatar overlappende, blurb og
          sosiale lenker. */}
      <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 list-none">
        {CREATORS.map((c, i) => (
          <li
            key={c.handle}
            className="group relative flex flex-col rounded-2xl border border-border/60 bg-card/40 overflow-hidden hover:border-primary/40 hover:bg-card/70 transition-colors"
          >
            {/* Banner-foto */}
            <a
              href={`https://www.twitch.tv/${c.handle}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${c.name} on Twitch`}
              className="relative block aspect-[16/9] overflow-hidden bg-muted"
            >
              <img
                src={c.image}
                alt={c.realName ? `${c.realName} (${c.name})` : c.name}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              {/* Mørk gradient i bunn så avatar + tekst leses */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none" />
              {/* Nummer */}
              <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 backdrop-blur-sm px-2 py-0.5 text-[10px] font-semibold tabular-nums tracking-widest text-white">
                {String(i + 1).padStart(2, "0")} / 10
              </span>
              {/* Språk-tag */}
              <span
                className={`absolute top-3 right-3 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-widest uppercase shadow-sm ${
                  c.language === "no"
                    ? "bg-white/95 text-black"
                    : c.language === "en"
                      ? "bg-primary text-white"
                      : "bg-black/55 text-white backdrop-blur-sm"
                }`}
                title={
                  c.language === "no"
                    ? "Streamer på norsk"
                    : c.language === "en"
                      ? "Streamer på engelsk"
                      : "Innhold på norsk og engelsk"
                }
              >
                {c.language === "no" ? "Norsk" : c.language === "en" ? "Engelsk" : "Norsk / Engelsk"}
              </span>
            </a>

            {/* Innhold */}
            <div className="relative p-5 pt-3">
              {/* Twitch-avatar som overlapper banner */}
              <img
                src={`https://unavatar.io/twitch/${c.handle}`}
                alt=""
                aria-hidden="true"
                width={56}
                height={56}
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  const t = e.currentTarget;
                  if (!t.dataset.r) { t.dataset.r = "1"; t.src = `https://unavatar.io/twitch/${c.handle}?fallback=false`; }
                }}
                className="absolute -top-7 right-5 w-14 h-14 rounded-xl object-cover ring-2 ring-background bg-muted shadow-md"
              />

              {/* Navn + handle */}
              <div className="pr-16">
                <h2 className="text-xl font-semibold text-foreground leading-tight">
                  {c.name}
                </h2>
                <a
                  href={`https://www.twitch.tv/${c.handle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  @{c.handle}
                </a>
              </div>

              <p className="text-[11px] text-muted-foreground mt-1">
                {c.realName ? `${c.realName} · ` : ""}
                {c.meta}
              </p>

              <p className="text-sm text-foreground/85 leading-relaxed mt-3">
                {c.blurb}
              </p>

              {/* Sosiale lenker */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {c.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[11px] font-medium px-2.5 py-1 rounded-full border border-border/70 text-foreground/75 hover:text-foreground hover:border-primary/50 hover:bg-primary/5 transition-colors"
                  >
                    {s.label}
                  </a>
                ))}
              </div>

              {/* Foto-attribusjon */}
              <p className="text-[10px] text-muted-foreground/70 mt-4 pt-3 border-t border-border/40">
                Foto:{" "}
                <a
                  href={c.attributionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground underline-offset-2 hover:underline"
                >
                  {c.attribution}
                </a>
              </p>
            </div>
          </li>
        ))}
      </ol>

      {/* Why it matters for brands + CTA */}
      <section className="mt-14 max-w-2xl">
        <h2 className="text-2xl md:text-3xl font-light tracking-tight text-foreground mb-4">
          Hvorfor dette er kartet merkevarer trenger
        </h2>
        <p className="text-base md:text-lg font-light text-muted-foreground leading-relaxed mb-8">
          Disse kanalene er også oversikten over hvor norsk Gen Z faktisk bruker
          oppmerksomheten sin - et publikum som hopper over pre-rolls og kjører
          adblock. Beta Ads bygger native overlay-annonser rett inn i sendingene
          deres, så merkevaren din blir en del av innholdet i stedet for en
          avbrytelse.
        </p>
        <div className="rounded-3xl bg-foreground text-background p-8 md:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h3 className="text-xl md:text-2xl font-light tracking-tight mb-1">
              Vil du nå norsk Gen Z der de faktisk er?
            </h3>
            <p className="text-background/60 text-sm max-w-md">
              Ta en prat med oss, så viser vi hvordan merkevaren din kan leve
              inni streamen.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 shrink-0 rounded-full bg-primary hover:bg-primary/90 text-white px-7 h-12 text-sm font-medium transition-colors"
          >
            Snakk med Beta Ads <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default NorskeStreamere2026;
