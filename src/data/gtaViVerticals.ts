/**
 * The eight brand categories worth planning around GTA VI, in both languages.
 *
 * Structured after the shape of a category guide, but written from scratch and
 * from our own campaign history. Where we have actually run a campaign in the
 * category the brand is named and the case study is linked. Where we have not,
 * `proof` is null and the copy says so, because a guide that claims credentials
 * in all eight categories is not worth reading.
 *
 * Logos are the brands' own marks as used elsewhere on the site.
 */

export type Lang = "en" | "no";

export interface Vertical {
  n: string;
  group: "session" | "game" | "launch";
  title: Record<Lang, string>;
  why: Record<Lang, string>;
  moment: Record<Lang, string>;
  /** A campaign we have actually run in this category, or null. */
  proof: { brand: string; logo: string; href?: string } | null;
  /** Said plainly when proof is null. */
  noProof?: Record<Lang, string>;
}

export const GROUPS: Record<Vertical["group"], Record<Lang, { label: string; blurb: string }>> = {
  session: {
    en: {
      label: "What gets consumed during a six-hour session",
      blurb:
        "Launch weekend is not a 30-second view. People settle in. Categories that already fit long sessions do not need a creative idea to belong, they just need to be there at the right hour.",
    },
    no: {
      label: "Det som forbrukes i en sekstimers økt",
      blurb:
        "Folk setter seg til rette på lanseringshelgen. De blir sittende i timevis. Kategorier som allerede hører hjemme i lange økter trenger ingen unnskyldning for å være der. De må bare være på skjermen til riktig tid.",
    },
  },
  game: {
    en: {
      label: "What the game is actually about",
      blurb:
        "GTA has always been cars, money and clothes. Those categories get to be contextually relevant without touching a single piece of Rockstar's IP, which is the part most brands get wrong.",
    },
    no: {
      label: "Det spillet faktisk handler om",
      blurb:
        "GTA har alltid handlet om biler, penger og klær. De kategoriene får kontekstuell relevans uten å røre en eneste bit av Rockstars rettigheter, og det er akkurat der de fleste merkevarer bommer.",
    },
  },
  launch: {
    en: {
      label: "What launch week breaks",
      blurb:
        "The Extended Look alone put Twitch into a major outage. Launch week will be worse. Two categories get to sell the solution to a problem the audience is feeling live.",
    },
    no: {
      label: "Det lanseringsuken knekker",
      blurb:
        "Bare Extended Look sendte Twitch i alvorlig nedetid. Lanseringsuken blir verre. To kategorier får selge løsningen på et problem publikum kjenner på direkten.",
    },
  },
};

export const VERTICALS: Vertical[] = [
  {
    n: "01",
    group: "session",
    title: { en: "Food delivery", no: "Matlevering" },
    why: {
      en: "A launch-night stream runs straight through dinner and out the other side. Nobody is cooking. The category does not have to argue for relevance, it has to be visible at 19:00 rather than at 02:00.",
      no: "En lanseringsstream går rett gjennom middagen og videre utover kvelden. Ingen står på kjøkkenet. Kategorien trenger ikke argumentere for relevans, den må være synlig klokken 19 og ikke klokken 02.",
    },
    moment: {
      en: "Tie the overlay to the hour, not the whole broadcast.",
      no: "Knytt overlayet til klokkeslettet, ikke til hele sendingen.",
    },
    proof: { brand: "Foodora", logo: "/lovable-uploads/logo-foodora.webp" },
  },
  {
    n: "02",
    group: "session",
    title: { en: "Electronics retail", no: "Elektronikkhandel" },
    why: {
      en: "Half of launch-week chat is people working out whether their machine will cope. That is a buying conversation happening on its own, and retail is the category that can answer it without changing the subject.",
      no: "Halve chatten i lanseringsuken er folk som lurer på om maskinen deres holder. Den samtalen går allerede, og elektronikkhandelen er den eneste kategorien som kan svare uten å skifte tema.",
    },
    moment: {
      en: "A chat command that answers the spec question beats a banner.",
      no: "En chat-kommando som svarer på maskinspørsmålet slår et banner.",
    },
    proof: {
      brand: "Komplett",
      logo: "/lovable-uploads/logo-komplett.webp",
      href: "/case-study/komplett",
    },
  },
  {
    n: "03",
    group: "session",
    title: { en: "Energy drinks and snacks", no: "Energidrikk og snacks" },
    why: {
      en: "The most crowded category on this list, and the one where being early matters most. Everyone books launch night. The stretch nobody books is the second and third week, when the sessions are just as long and the inventory is a fraction of the price.",
      no: "Den mest overfylte kategorien på listen, og den der det å være tidlig betyr mest. Alle booker lanseringskvelden. Strekket ingen booker er uke to og tre, når øktene er like lange og prisen er en brøkdel.",
    },
    moment: {
      en: "Skip the launch. Own the month after it.",
      no: "Dropp lanseringen. Eier måneden etter.",
    },
    proof: null,
    noProof: {
      en: "We have not run this category in the Nordics. Treat the argument above as reasoning, not as a track record.",
      no: "Vi har ikke kjørt denne kategorien i Norden. Se argumentet over som resonnement, ikke som referanse.",
    },
  },
  {
    n: "04",
    group: "game",
    title: { en: "Automotive", no: "Bil" },
    why: {
      en: "The series is built on car culture and the category has almost never shown up in streaming around it. Everyone chases official in-game placement, which is expensive and rationed. The stream around the game is neither.",
      no: "Hele serien er bygget på bilkultur, og likevel er kategorien nesten fraværende i streamingen rundt den. Alle jager offisiell plassering inne i spillet, som er dyrt og rasjonert. Sendingen rundt spillet er ingen av delene.",
    },
    moment: {
      en: "The reveal of a car in-game is a moment. Be next to it, not in it.",
      no: "Når en bil vises i spillet er det et øyeblikk. Vær ved siden av det, ikke inni det.",
    },
    proof: null,
    noProof: {
      en: "No Nordic automotive campaign on our side yet. The gap is the point: nobody else has run it either.",
      no: "Ingen nordisk bilkampanje hos oss ennå. Hullet er poenget: ingen andre har kjørt den heller.",
    },
  },
  {
    n: "05",
    group: "game",
    title: { en: "Fashion and streetwear", no: "Mote og streetwear" },
    why: {
      en: "Character styling is half of what gets clipped and shared. A clothing brand does not need a licence to be in the conversation about how a character looks, it needs a creator who dresses like that anyway.",
      no: "Halvparten av det som klippes og deles handler om hvordan figurene ser ut. Et klesmerke trenger ingen lisens for å være med i den samtalen, det trenger en skaper som kler seg slik uansett.",
    },
    moment: {
      en: "Creator-led styling content, not a logo in the corner.",
      no: "Innhold der skaperen styler, ikke en logo i hjørnet.",
    },
    proof: null,
    noProof: {
      en: "Not a category we have run. Said plainly rather than dressed up.",
      no: "Ikke en kategori vi har kjørt. Sagt rett ut i stedet for pyntet på.",
    },
  },
  {
    n: "06",
    group: "game",
    title: { en: "Finance and crypto", no: "Finans og krypto" },
    why: {
      en: "In-game money against real money is the oldest joke in this genre and it still works, provided the brand is in on it. The tone has to be light. A lecture about savings inside a heist stream is the fastest way to lose a chat.",
      no: "Penger i spillet mot penger i virkeligheten er den eldste vitsen i sjangeren, og den funker fortsatt, forutsatt at merkevaren er med på den. Tonen må være lett. En leksjon om sparing midt i en ranstream er den raskeste måten å miste en chat på.",
    },
    moment: {
      en: "Let the creator make the joke. Do not write it for them.",
      no: "La skaperen ta vitsen. Ikke skriv den for dem.",
    },
    proof: { brand: "Firi", logo: "/lovable-uploads/logo-firi.webp" },
  },
  {
    n: "07",
    group: "launch",
    title: { en: "Connectivity and VPN", no: "Tilkobling og VPN" },
    why: {
      en: "Downdetector logged more than 17,000 Twitch reports during a six-minute trailer. The audience felt the platform buckle in real time. That is the rarest thing in advertising: a category whose product is the answer to what the viewer is experiencing right now.",
      no: "Downdetector registrerte over 17 000 Twitch-meldinger under en seks minutters trailer. Publikum merket at plattformen sviktet mens det sto på. Det er det sjeldneste som finnes i reklame: en kategori der produktet er svaret på det seeren opplever akkurat da.",
    },
    moment: {
      en: "Book the outage window, not the calm after it.",
      no: "Kjøp mens det står på, ikke i roen etterpå.",
    },
    proof: {
      brand: "Surfshark",
      logo: "/lovable-uploads/logo-surfshark.png",
      href: "/case-study/surfshark",
    },
  },
  {
    n: "08",
    group: "launch",
    title: { en: "Gaming hardware and audio", no: "Gaming-utstyr og lyd" },
    why: {
      en: "Every launch stream is also a shot of somebody's desk. Viewers spend the session looking at a setup they are quietly comparing to their own. Peripherals do not need to interrupt that, they need to be in frame while it happens.",
      no: "Hver lanseringsstream er også et bilde av noens skrivebord. Seerne bruker økten på å se på et oppsett de i det stille sammenligner med sitt eget. Utstyr trenger ikke avbryte det, det må være i bildet mens det skjer.",
    },
    moment: {
      en: "A live callout from the creator beats a scheduled break.",
      no: "En spontan omtale fra skaperen slår en planlagt pause.",
    },
    proof: {
      brand: "Shure",
      logo: "/lovable-uploads/logo-shure.webp",
      href: "/case-study/shure",
    },
  },
];
