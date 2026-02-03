import React from "react";
import { Helmet } from "react-helmet";
import { Download, Mail, Phone, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Footer } from "@/components/sections/Footer";

interface PressProps {
  t: any;
  language: string;
  setLanguage: (lang: string) => void;
}

const pressTranslations = {
  en: {
    pageTitle: "Press Kit",
    pageDescription: "Press resources, media assets, and contact information for Beta Ads Nordic.",
    mediaContact: "Media Contact",
    ceo: "Founder & CEO",
    aboutTitle: "About Beta Ads",
    aboutText: "Beta Ads is a Nordic advertising platform specialized in native advertising within live Twitch streams. The company is headquartered in Oslo and operates in Norway, Sweden, Finland, and Denmark. Founded in 2023, Beta Ads has quickly become the leading Twitch advertising agency in the Nordics, working with brands like Samsung, Surfshark, and Shure.",
    foundedYear: "Founded",
    headquarters: "Headquarters",
    markets: "Markets",
    logoAssets: "Logo Assets",
    logoDescription: "Download our logos in various formats for press use.",
    downloadPng: "Download PNG",
    pressArticles: "Press Coverage",
    pressDescription: "Beta Ads has been featured in leading Nordic media outlets.",
    readArticle: "Read article",
  },
  no: {
    pageTitle: "Pressemateriale",
    pageDescription: "Presseressurser, mediafiler og kontaktinformasjon for Beta Ads Nordic.",
    mediaContact: "Pressekontakt",
    ceo: "Grunnlegger & Daglig leder",
    aboutTitle: "Om Beta Ads",
    aboutText: "Beta Ads er en nordisk annonseringsplattform spesialisert på native reklame i live Twitch-strømmer. Selskapet har hovedkontor i Oslo og opererer i Norge, Sverige, Finland og Danmark. Grunnlagt i 2023 har Beta Ads raskt blitt det ledende Twitch-reklamebyrået i Norden, og jobber med merkevarer som Samsung, Surfshark og Shure.",
    foundedYear: "Grunnlagt",
    headquarters: "Hovedkontor",
    markets: "Markeder",
    logoAssets: "Logoer",
    logoDescription: "Last ned våre logoer i ulike formater for pressebruk.",
    downloadPng: "Last ned PNG",
    pressArticles: "Pressedekning",
    pressDescription: "Beta Ads har blitt omtalt i ledende nordiske medier.",
    readArticle: "Les artikkel",
  },
  sv: {
    pageTitle: "Pressmaterial",
    pageDescription: "Pressresurser, mediefiler och kontaktinformation för Beta Ads Nordic.",
    mediaContact: "Presskontakt",
    ceo: "Grundare & VD",
    aboutTitle: "Om Beta Ads",
    aboutText: "Beta Ads är en nordisk annonseringsplattform specialiserad på native-reklam i live Twitch-strömmar. Företaget har huvudkontor i Oslo och verkar i Norge, Sverige, Finland och Danmark. Grundat 2023 har Beta Ads snabbt blivit den ledande Twitch-reklambyrån i Norden och arbetar med varumärken som Samsung, Surfshark och Shure.",
    foundedYear: "Grundat",
    headquarters: "Huvudkontor",
    markets: "Marknader",
    logoAssets: "Logotyper",
    logoDescription: "Ladda ner våra logotyper i olika format för pressanvändning.",
    downloadPng: "Ladda ner PNG",
    pressArticles: "Pressbevakning",
    pressDescription: "Beta Ads har uppmärksammats i ledande nordiska medier.",
    readArticle: "Läs artikel",
  },
  fi: {
    pageTitle: "Lehdistömateriaali",
    pageDescription: "Lehdistöresurssit, mediatiedostot ja yhteystiedot Beta Ads Nordicille.",
    mediaContact: "Mediayhteydet",
    ceo: "Perustaja & Toimitusjohtaja",
    aboutTitle: "Tietoa Beta Adsista",
    aboutText: "Beta Ads on pohjoismainen mainonta-alusta, joka on erikoistunut natiivimainontaan live Twitch-lähetyksissä. Yrityksen pääkonttori sijaitsee Oslossa ja se toimii Norjassa, Ruotsissa, Suomessa ja Tanskassa. Vuonna 2023 perustettu Beta Ads on nopeasti noussut johtavaksi Twitch-mainostoimistoksi Pohjoismaissa, työskennellen brändien kuten Samsung, Surfshark ja Shure kanssa.",
    foundedYear: "Perustettu",
    headquarters: "Pääkonttori",
    markets: "Markkinat",
    logoAssets: "Logot",
    logoDescription: "Lataa logomme eri muodoissa lehdistökäyttöön.",
    downloadPng: "Lataa PNG",
    pressArticles: "Lehdistönäkyvyys",
    pressDescription: "Beta Ads on ollut esillä johtavissa pohjoismaisissa medioissa.",
    readArticle: "Lue artikkeli",
  },
};

const logos = [
  {
    name: "Logo White",
    description: "For dark backgrounds",
    file: "/lovable-uploads/logo-white.png",
    bg: "bg-zinc-900",
  },
  {
    name: "Logo Black",
    description: "For light backgrounds",
    file: "/lovable-uploads/logo-black.png",
    bg: "bg-zinc-100",
  },
  {
    name: "Logo Color",
    description: "Full color version",
    file: "/lovable-uploads/logo-color.png",
    bg: "bg-zinc-800",
  },
  {
    name: "Icon / Favicon",
    description: "Square icon",
    file: "/lovable-uploads/favicon.png",
    bg: "bg-zinc-900",
  },
];

const pressArticles = [
  {
    title: "Andreas (22) startet byrå ved siden av studiene – Nå utvider han til Sverige og Finland",
    publication: "Kampanje",
    date: "2025",
    url: "https://kampanje.com/premium/mai-2025/innsikt/andreas-22-startet-byra-ved-siden-av-studiene--na-utvider-han-til-sverige-og-finland/",
  },
  {
    title: "Andreas (21) satser på eget Twitch-byrå – Nå får han polske tech-krefter i ryggen",
    publication: "Kampanje",
    date: "2024",
    url: "https://kampanje.com/premium/september-2024/innsikt/andreas-21-satser-pa-eget-twtich-byra--na-far-han-polske-tech-krefter-i-ryggen---har-lagt-grunnlaget-na/",
  },
  {
    title: "Ny kanal for mediekjøp: Beta er Norges nye Twitch-byrå",
    publication: "Kom24",
    date: "2024",
    url: "https://www.kom24.no/andreas-myraune-beta-influensere/ny-kanal-for-mediekjop-beta-er-norges-nye-twitch-byra/730424",
  },
  {
    title: "Instreamly og Beta inngår partnerskap i Norge",
    publication: "Kom24",
    date: "2024",
    url: "https://www.kom24.no/andreas-myraune-beta-instreamly/instreamly-og-beta-inngar-partnerskap-i-norge/749907",
  },
];

const Press: React.FC<PressProps> = ({ language, setLanguage }) => {
  const pt = pressTranslations[language as keyof typeof pressTranslations] || pressTranslations.en;
  const footerT = pressTranslations.en;

  const handleDownload = (file: string, name: string) => {
    const link = document.createElement("a");
    link.href = file;
    link.download = name.toLowerCase().replace(/\s+/g, "-") + ".png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Helmet>
        <title>{pt.pageTitle} | Beta Ads Nordic</title>
        <meta name="description" content={pt.pageDescription} />
      </Helmet>

      <main className="min-h-screen pt-32 pb-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          {/* Hero */}
          <div className="mb-20">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Press Kit
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-light text-foreground mb-4">
              {pt.pageTitle}
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl">
              {pt.pageDescription}
            </p>
          </div>

          {/* Two column layout */}
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16 mb-20">
            {/* Left column - Contact */}
            <div className="lg:col-span-1">
              <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-6">
                {pt.mediaContact}
              </h2>
              <div className="bg-card/50 rounded-2xl p-6 backdrop-blur-sm">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-2xl font-light text-primary">
                    AM
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-foreground">Andreas Myraune</h3>
                    <p className="text-muted-foreground text-sm">{pt.ceo}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <a
                    href="mailto:andreas@beta-ads.no"
                    className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group"
                  >
                    <Mail className="h-4 w-4 text-primary" />
                    <span className="text-sm group-hover:underline">andreas@beta-ads.no</span>
                  </a>
                  <a
                    href="tel:+4746195548"
                    className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group"
                  >
                    <Phone className="h-4 w-4 text-primary" />
                    <span className="text-sm group-hover:underline">+47 461 95 548</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right column - About */}
            <div className="lg:col-span-2">
              <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-6">
                {pt.aboutTitle}
              </h2>
              <p className="text-foreground/80 text-lg leading-relaxed mb-8">
                {pt.aboutText}
              </p>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{pt.foundedYear}</p>
                  <p className="text-foreground font-medium">2023</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{pt.headquarters}</p>
                  <p className="text-foreground font-medium">Oslo, Norway</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{pt.markets}</p>
                  <p className="text-foreground font-medium">NO, SE, FI, DK</p>
                </div>
              </div>
            </div>
          </div>

          {/* Logo Assets */}
          <div className="mb-20">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
              {pt.logoAssets}
            </h2>
            <p className="text-muted-foreground mb-8">{pt.logoDescription}</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {logos.map((logo) => (
                <div key={logo.name} className="group">
                  <div className={`${logo.bg} rounded-xl p-8 flex items-center justify-center h-32 mb-4 transition-transform duration-300 group-hover:scale-[1.02]`}>
                    <img
                      src={logo.file}
                      alt={logo.name}
                      className="max-h-12 w-auto object-contain"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-foreground text-sm font-medium">{logo.name}</p>
                      <p className="text-muted-foreground text-xs">{logo.description}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDownload(logo.file, logo.name)}
                      className="h-8 w-8 p-0 text-muted-foreground hover:text-primary"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Press Articles */}
          <div>
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
              {pt.pressArticles}
            </h2>
            <p className="text-muted-foreground mb-8">{pt.pressDescription}</p>
            <div className="space-y-4">
              {pressArticles.map((article, index) => (
                <a
                  key={index}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-4 rounded-xl bg-card/30 hover:bg-card/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        article.publication === "Kampanje"
                          ? "border-primary/30 text-primary"
                          : "border-green-500/30 text-green-400"
                      }`}
                    >
                      {article.publication}
                    </Badge>
                    <div>
                      <p className="text-foreground group-hover:text-primary transition-colors">
                        {article.title}
                      </p>
                      <p className="text-muted-foreground text-xs">{article.date}</p>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer t={{ ...footerT, footerDescription: "The future of Twitch advertising is here.", contactTitle: "CONTACT", connectTitle: "CONNECT" }} language={language} setLanguage={setLanguage} />
    </>
  );
};

export default Press;
