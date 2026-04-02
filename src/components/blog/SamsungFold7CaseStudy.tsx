import React from "react";

const topStreamers = [
  { name: "Danniz", views: "97,110", ctr: "0.30%", note: "32.4% of all campaign views" },
  { name: "RubenGKS", views: "51,085", ctr: "0.74%", note: "Most link clicks (379)" },
  { name: "ForsteGir", views: "45,841", ctr: "0.42%", note: "665h airtime, stable coverage" },
  { name: "Jonieboi", views: "28,996", ctr: "0.38%", note: "857 new followers - #1 follower growth" },
  { name: "LaSanias", views: "33,234", ctr: "0.35%", note: "IRL content, high watch time" },
];

const highCTRStreamers = [
  { name: "Simmlings", ctr: "11.80%", multiple: "18.2×" },
  { name: "m4r5t3in", ctr: "10.00%", multiple: "15.4×" },
  { name: "healingsaint", ctr: "7.39%", multiple: "11.4×" },
  { name: "mrrxspect", ctr: "6.64%", multiple: "10.2×" },
  { name: "midtboe", ctr: "5.85%", multiple: "9.0×" },
];

const categories = [
  { name: "Just Chatting", share: "34.45%", views: "103,358", ctr: "0.73%" },
  { name: "Minecraft", share: "17.95%", views: "53,869", ctr: "0.39%" },
  { name: "IRL", share: "16.35%", views: "49,046", ctr: "0.45%" },
  { name: "Grand Theft Auto V", share: "11.28%", views: "33,852", ctr: "0.67%" },
  { name: "Rust", share: "4.32%", views: "12,975", ctr: "0.79%" },
];

const weeklyProgression = [
  { week: "Week 1", ctr: "3.70%", viewers: "29,549" },
  { week: "Week 2", ctr: "3.20%", viewers: "70,019" },
  { week: "Week 3", ctr: "2.56%", viewers: "112,248" },
  { week: "Final", ctr: "2.34%", viewers: "141,930" },
];

const SamsungFold7CaseStudy: React.FC = () => {
  return (
    <div className="space-y-14">

      {/* Hero image */}
      <img
        src="/lovable-uploads/blog-samsung-twitch-campaign-hero.jpg"
        alt="Samsung Galaxy Z Fold7 Twitch campaign"
        className="w-full h-auto rounded-xl object-cover"
        style={{ maxHeight: "420px" }}
      />

      {/* Challenge */}
      <section>
        <h2 className="text-2xl font-bold text-foreground border-b-2 border-border pb-3 mb-6">
          Challenge
        </h2>
        <p className="text-muted-foreground leading-relaxed text-lg">
          Samsung wanted to launch the Galaxy Z Fold7 to Norwegian consumers - but the foldable phone category isn't
          like launching a regular smartphone. It requires education, not just awareness. Potential buyers need to
          understand the hinge, the inner display, the productivity use case, and why the form factor justifies the
          price premium. A banner ad can't do that.
        </p>
        <p className="text-muted-foreground leading-relaxed text-lg mt-4">
          The primary target audience - tech-savvy Norwegian males aged 18–35 - watches Twitch, not TV. They actively
          block standard digital ads and ignore pre-roll video. Samsung needed an approach that felt native to the
          platform, reached the right demographic, and gave creators room to genuinely explain the product.
        </p>
      </section>

      {/* Solution */}
      <section>
        <h2 className="text-2xl font-bold text-foreground border-b-2 border-border pb-3 mb-6">
          Solution
        </h2>
        <p className="text-muted-foreground leading-relaxed text-lg mb-8">
          Beta deployed a two-format campaign across 28 Norwegian Twitch streamers running from September 22 to
          October 22, 2025. The first format was a rich media overlay - animated brand graphics that appeared
          directly inside the stream during natural content moments, bypassing adblock entirely. The second format
          added a live interactive mechanism: a chatbot CTA that prompted viewers to engage and click through
          to the Fold7 product page.
        </p>

        {/* Ad creative showcase */}
        <div className="grid md:grid-cols-2 gap-6 my-8">
          <div className="rounded-xl overflow-hidden bg-muted/20 border border-border">
            <img
              src="/lovable-uploads/samsung-zfold7-banner.png"
              alt="Samsung Galaxy Z Fold7 overlay ad banner"
              className="w-full h-auto"
            />
            <div className="px-4 py-3 border-t border-border">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Ad Format</p>
              <p className="text-sm text-foreground font-medium mt-0.5">Rich Media Overlay</p>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden bg-black border border-border">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto"
            >
              <source src="/lovable-uploads/samsung-zfold7-overlay.webm" type="video/webm" />
            </video>
            <div className="px-4 py-3 border-t border-border">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Ad Format</p>
              <p className="text-sm text-foreground font-medium mt-0.5">Animated Overlay - Live on Stream</p>
            </div>
          </div>
        </div>

        <p className="text-muted-foreground leading-relaxed text-lg">
          All creative was produced by Beta's in-house motion design team - purpose-built for the Fold7 launch,
          not repurposed from static display ads. The animations were engineered to render flawlessly inside OBS
          browser sources, with zero streamer setup required beyond installing the overlay link. Samsung's visual
          language was preserved exactly: the signature fold animation, colour palette, and product reveal sequence
          matched the official launch campaign.
        </p>
      </section>

      {/* Top Streamers */}
      <section>
        <h2 className="text-2xl font-bold text-foreground border-b-2 border-border pb-3 mb-6">
          The Streamers
        </h2>
        <p className="text-muted-foreground leading-relaxed text-lg mb-6">
          Beta selected 28 Norwegian Twitch streamers across a mix of gaming categories - FPS, battle royale,
          Just Chatting, IRL, and variety - ensuring the message reached the full breadth of Samsung's target
          demographic. The roster was structured as a two-tier strategy: high-reach anchors for volume, and
          micro-influencers for community engagement.
        </p>

        {/* Top 5 by views */}
        <h3 className="text-base font-semibold text-foreground mb-3">Top 5 by Completed Views</h3>
        <div className="rounded-xl border border-border overflow-hidden mb-8">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Streamer</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Views</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">CTR</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Note</th>
              </tr>
            </thead>
            <tbody>
              {topStreamers.map((s, i) => (
                <tr key={s.name} className={`border-b border-border last:border-0 ${i === 0 ? "bg-primary/5" : ""}`}>
                  <td className="px-5 py-3.5 font-medium text-foreground">{s.name}</td>
                  <td className="px-5 py-3.5 text-right text-foreground tabular-nums">{s.views}</td>
                  <td className="px-5 py-3.5 text-right text-muted-foreground tabular-nums">{s.ctr}</td>
                  <td className="px-5 py-3.5 text-muted-foreground hidden md:table-cell">{s.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* High-CTR micro-influencers */}
        <h3 className="text-base font-semibold text-foreground mb-3">High-CTR Micro-Influencers</h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          Smaller channels consistently outperformed the campaign average on engagement. These five streamers
          delivered click-through rates 9–18× above the campaign verified average.
        </p>
        <div className="grid sm:grid-cols-5 gap-3">
          {highCTRStreamers.map((s) => (
            <div key={s.name} className="p-4 rounded-xl border border-border bg-muted/20 text-center">
              <div className="text-lg font-bold text-primary">{s.ctr}</div>
              <div className="text-xs font-semibold text-foreground mt-1">{s.name}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.multiple} avg</div>
            </div>
          ))}
        </div>
      </section>

      {/* Ad fatigue / weekly progression */}
      <section>
        <h2 className="text-2xl font-bold text-foreground border-b-2 border-border pb-3 mb-6">
          Campaign Progression
        </h2>
        <p className="text-muted-foreground leading-relaxed text-lg mb-6">
          CTR declined naturally as the campaign matured - a classic ad fatigue curve as repeat viewers
          become desensitised to the creative. However, unique viewer reach continued expanding throughout the
          campaign, growing 4.8× from Week 1 to final.
        </p>
        <div className="grid grid-cols-4 gap-px rounded-xl overflow-hidden bg-border">
          {weeklyProgression.map((w) => (
            <div key={w.week} className="bg-background px-5 py-5">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{w.week}</div>
              <div className="text-2xl font-bold text-foreground tracking-tight">{w.ctr}</div>
              <div className="text-xs text-muted-foreground mt-1">CTR (unverified)</div>
              <div className="text-xs text-muted-foreground mt-3">{w.viewers}</div>
              <div className="text-xs text-muted-foreground">unique viewers</div>
            </div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
          Week 1 peaked at 3.70% CTR - well above industry benchmarks. The best single day was September 25
          with 160 clicks across 10,564 views (1.51% verified CTR). Rotating creatives or refreshing the
          streamer roster mid-campaign can sustain Week 1–level engagement throughout.
        </p>
      </section>

      {/* Category breakdown */}
      <section>
        <h2 className="text-2xl font-bold text-foreground border-b-2 border-border pb-3 mb-6">
          Content Categories
        </h2>
        <p className="text-muted-foreground leading-relaxed text-lg mb-6">
          The campaign ran across 54 unique content categories. Just Chatting was the dominant category,
          consistent with Samsung's previous S25 Ultra campaign. Its conversational, relaxed format appears
          highly conducive to Samsung's interactive CTA format.
        </p>
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Category</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Share</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Views</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">CTR</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c, i) => (
                <tr key={c.name} className={`border-b border-border last:border-0 ${i === 0 ? "bg-primary/5" : ""}`}>
                  <td className="px-5 py-3.5 font-medium text-foreground">{c.name}</td>
                  <td className="px-5 py-3.5 text-right text-foreground font-semibold tabular-nums">{c.share}</td>
                  <td className="px-5 py-3.5 text-right text-muted-foreground tabular-nums hidden sm:table-cell">{c.views}</td>
                  <td className="px-5 py-3.5 text-right text-muted-foreground tabular-nums">{c.ctr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Audience */}
      <section>
        <h2 className="text-2xl font-bold text-foreground border-b-2 border-border pb-3 mb-6">
          Audience Profile
        </h2>
        <p className="text-muted-foreground leading-relaxed text-lg mb-6">
          The Fold7 campaign confirmed the consistency of the Norwegian Twitch demographic - the same audience
          profile that made Samsung's S25 Ultra campaign successful earlier in 2025.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px rounded-xl overflow-hidden bg-border">
          {[
            { value: "93.05%", label: "Norwegian audience" },
            { value: "100%", label: "Male" },
            { value: "100%", label: "Age 18–24" },
            { value: "80.39%", label: "Desktop users" },
          ].map((s) => (
            <div key={s.label} className="bg-background px-5 py-5">
              <div className="text-2xl font-bold text-foreground tracking-tight">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          Top Norwegian regions: Oslo (14.20%), Trøndelag (12.33%), Akershus (10.21%) - aligning with
          Samsung's key urban markets.
        </p>
      </section>

      {/* VOD reach */}
      <section>
        <h2 className="text-2xl font-bold text-foreground border-b-2 border-border pb-3 mb-6">
          Extended Reach via VOD
        </h2>
        <p className="text-muted-foreground leading-relaxed text-lg mb-4">
          Twitch streams don't disappear after broadcast. VOD (recorded stream) views added a substantial
          secondary audience - with Samsung's creative assets continuing to work long after the live session ended.
        </p>
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          {[
            { value: "300,054", label: "Live completed views" },
            { value: "558,257+", label: "VOD views (minimum)" },
            { value: "~858K", label: "Combined minimum reach" },
          ].map((s) => (
            <div key={s.label} className="p-5 rounded-xl border border-border bg-muted/20">
              <div className="text-2xl font-bold text-foreground tracking-tight">{s.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          RubenGKS alone drove 214,500 VOD views. Danniz contributed 148,800 (including his subathon content).
          Jonieboi added 105,542. Total minimum VOD reach exceeded live views by nearly 2:1.
        </p>
      </section>

      {/* Impact */}
      <section>
        <h2 className="text-2xl font-bold text-foreground border-b-2 border-border pb-3 mb-6">
          Impact
        </h2>
        <p className="text-muted-foreground leading-relaxed text-lg mb-6">
          The dual-format campaign consistently outperformed industry benchmarks. Standard display advertising
          achieves a CTR of around 0.1%. The Fold7 campaign delivered a{" "}
          <strong className="text-foreground">2.34% unverified CTR</strong> across the full 31-day run - and
          3.70% in its first week. Viewers who clicked through were actively considering the device, not
          accidentally tapping an ad.
        </p>
        <p className="text-muted-foreground leading-relaxed text-lg">
          The rich media overlays rendered as browser sources inside OBS - not as external ads served by a
          third-party network. Every impression was a genuine view by an engaged live audience, undetectable
          by adblock software. At a verified CPC of approximately 76 NOK, the campaign delivered qualified
          traffic at a fraction of the cost of traditional digital channels.
        </p>
      </section>

      {/* Results */}
      <section>
        <h2 className="text-2xl font-bold text-foreground border-b-2 border-border pb-3 mb-6">
          Results
        </h2>
        <ul className="space-y-3 mb-10">
          {[
            { value: "300,054", label: "Completed live views" },
            { value: "141,930", label: "Unique viewers" },
            { value: "2.34%", label: "Unverified CTR (3.70% in Week 1)" },
            { value: "7,028", label: "Unverified link clicks" },
            { value: "2,000h 22m", label: "Artwork watch time" },
            { value: "28", label: "Norwegian streamers" },
            { value: "558,257+", label: "Additional VOD views" },
            { value: "0%", label: "Adblock impact" },
          ].map(({ value, label }) => (
            <li key={label} className="text-lg text-muted-foreground flex items-start gap-3">
              <span className="text-primary font-bold text-2xl leading-none">•</span>
              <span><strong className="text-foreground">{value}</strong> {label}</span>
            </li>
          ))}
        </ul>

        {/* Second overlay video */}
        <div className="rounded-xl overflow-hidden bg-black border border-border">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto"
          >
            <source src="/lovable-uploads/overlay-samsung.webm" type="video/webm" />
          </video>
          <div className="px-5 py-3 border-t border-border">
            <p className="text-xs text-muted-foreground">Samsung Galaxy Z Fold7 overlay running live on a Norwegian Twitch stream</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default SamsungFold7CaseStudy;
