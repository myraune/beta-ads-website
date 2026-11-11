import React from "react";
import { FeaturePage } from "@/components/working/FeaturePage";
import { W, kicker, h2 } from "@/components/working/shared";

/* Virtual product placement, launched in the Nordics November 2026.
   The technology is LIVAD's (our platform partner); every claim here comes
   from the launch posts on LinkedIn (Beta Ads page and Andreas, Nov 2026):
   one 2D product image becomes a 3D model, the scene is mapped, the product
   is placed and lit to match, in live streams and in clips.
   Footage is LIVAD's demo reel. The brands in it are examples, not Beta Ads clients,
   and the captions say so. No pricing or results are claimed. */

const V = "/lovable-uploads/vpp";

const DemoVideo: React.FC = () => (
  <div className="rounded-[16px] overflow-hidden border border-border bg-black shadow-[0_24px_48px_-28px_rgba(15,16,18,.28)]">
    <video
      className="block w-full h-auto"
      src="/videos/virtual-product-placement.mp4"
      poster="/videos/virtual-product-placement-poster.webp"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-label="Products placed inside game scenes on live streams: a drink can, headphones, a sneaker and a controller"
    />
  </div>
);

const SCENES = [
  { src: `${V}/counter-strike.webp`, game: "Counter-Strike", what: "A mouse on the floor of the map" },
  { src: `${V}/gta-rp.webp`, game: "GTA roleplay", what: "Headphones next to the player" },
  { src: `${V}/league.webp`, game: "League of Legends", what: "A drink in the corner of the arena" },
  { src: `${V}/fortnite.webp`, game: "Fortnite", what: "A controller in the build" },
  { src: `${V}/gta-garage.webp`, game: "GTA", what: "A sneaker in the garage" },
  { src: `${V}/valorant.webp`, game: "Valorant", what: "A can on the floor of the round" },
];

const Scenes: React.FC = () => (
  <section className="border-t border-border py-16 md:py-24">
    <div className={W}>
      <div className="max-w-3xl">
        <div className={`${kicker} mb-4`}>In the game</div>
        <h2 className={h2}>The product sits in the scene, not on top of it.</h2>
        <p className="mt-5 text-muted-foreground leading-relaxed max-w-2xl">
          Six games, six products. Each one is placed where an object like it could actually be, at the right angle, with the light and shadow of the game around it.
        </p>
      </div>
      <div className="mt-10 md:mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {SCENES.map((s) => (
          <figure key={s.src} className="m-0">
            <img src={s.src} alt={`${s.what}, placed in a ${s.game} stream`} width={1280} height={720} loading="lazy" className="block w-full h-auto rounded-[12px] border border-border" />
            <figcaption className="mt-3 text-sm"><b className="font-semibold">{s.game}</b> <span className="text-muted-foreground">· {s.what}</span></figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-8 text-xs text-muted-foreground max-w-2xl">
        Demo footage from LIVAD, our technology partner. The brands shown are examples and are not Beta Ads clients.
      </p>
    </div>
  </section>
);

const VirtualProductPlacement: React.FC = () => (
  <FeaturePage
    path="/virtual-product-placement"
    crumb="Virtual product placement"
    seoTitle="Virtual Product Placement in Live Streams and Clips | Beta Ads"
    seoDescription="Put your product inside the game scene on Twitch, Kick and YouTube. From one product photo we build a 3D model and place it with matching light and shadow, live and in clips. Now in the Nordics."
    kicker="Platform · New format"
    title="Your product, inside the game."
    lead="Virtual product placement puts a 3D version of your product into the scene of a live stream or a clip, lit like everything around it. No ad break, nothing to skip. Now available to brands in the Nordics."
    hero={{ visual: <DemoVideo />, caption: "Demo footage from LIVAD, our technology partner. Brands shown are examples, not Beta Ads clients." }}
    sections={[
      {
        kicker: "How it works",
        title: "One product photo is enough.",
        body: "You send a normal 2D image of the product. The platform builds a 3D model from it, maps the scene, and picks where the product fits: the place, the angle and the light. The result looks like the object was in the game all along.",
        points: ["The scene is mapped in 3D", "A 3D model is made from one image", "The product is placed where it fits", "Light and shadow are matched to the game"],
        img: { src: `${V}/counter-strike.webp`, alt: "A gaming mouse placed on the ground in a Counter-Strike map during a live stream", caption: "Counter-Strike. Demo footage from LIVAD." },
      },
      {
        kicker: "Live and in clips",
        title: "On the stream, and in every clip after it.",
        body: "The same placement works beyond the live broadcast. Products can be added to the most relevant moments across thousands of stream clips, and those clips travel to TikTok, Instagram and YouTube. Streamers earn from their clip catalogue even when they are offline.",
        points: ["Live on Twitch, Kick and YouTube", "Added to clips after the stream", "Clips reach TikTok, Instagram and YouTube"],
        img: { src: `${V}/gta-garage.webp`, alt: "A sneaker placed in a garage scene in a GTA stream", caption: "GTA. Demo footage from LIVAD." },
      },
      {
        kicker: "Why it matters",
        title: "More inventory, no extra ad break.",
        body: "Most ads fail because they interrupt. A placement in the scene adds a brand moment without stopping the stream, so viewers keep watching and streamers do not lose them to an ad break. It is its own format, separate from the animated overlay.",
        points: ["Nothing to skip or block", "No break in the stream", "More brand inventory without more ads"],
        img: { src: `${V}/league.webp`, alt: "An energy drink placed in the corner of a League of Legends stream", caption: "League of Legends. Demo footage from LIVAD." },
      },
    ]}
    extra={<Scenes />}
    related={[
      ["Campaign builder", "The overlay format, with chat command and poll.", "/campaign-builder"],
      ["Setup verification", "Every stream checked on air, every play clipped.", "/campaign-compliance"],
      ["Creative library", "100+ in-stream ad ideas, sorted by industry.", "/creative-library"],
    ]}
    faqTitle="Questions about virtual product placement"
    faqs={[
      { q: "What do we need to send?", a: "One normal product image. The 3D model is built from it, so you do not need a 3D file." },
      { q: "Where does it run?", a: "In live streams on Twitch, Kick and YouTube, and in clips from those streams, which can travel on to TikTok, Instagram and YouTube." },
      { q: "Who builds the technology?", a: "Our platform partner LIVAD. Beta Ads plans and runs the campaigns for brands and agencies in Norway, Sweden, Denmark and Finland." },
      { q: "Can we combine it with an overlay campaign?", a: "It is a separate format from the animated overlay. Ask us how the two fit together for your budget and market." },
      { q: "How do we test it?", a: "Send us your product and market, and we show you what a placement could look like for your brand before anything is booked." },
    ]}
    close={{ title: "See your product in a stream.", body: "Send one product image and we show you how a placement could look for your brand." }}
  />
);

export default VirtualProductPlacement;
