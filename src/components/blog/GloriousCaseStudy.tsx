import React from "react";

const GloriousCaseStudy: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header Cover */}
      <img
        src="https://storage.googleapis.com/livad-blog/3292/3669942.gif"
        alt="Glorious campaign header"
        className="w-full h-auto rounded-xl"
      />

      {/* Challenge Section */}
      <section>
        <h2 className="text-2xl font-bold text-foreground border-b-2 border-border pb-3 mb-6">
          Challenge
        </h2>
        <p className="text-muted-foreground leading-relaxed text-lg">
          How Glorious Empowered the Nordic Gaming Community with Beta's Rich Media
          Overlays. Glorious O3 Mouse NO, a global leader in high-performance PC gaming peripherals,
          has consistently delighted customers with its focus on ergonomic excellence and
          cutting-edge hardware. In the competitive landscape of gaming gear, Glorious has
          stood out for its unique ability to blend enthusiast-grade quality with accessible
          design, catering to the needs of professional players and casual hobbyists alike
          through an expansive portfolio of products.
        </p>
        <p className="text-muted-foreground leading-relaxed text-lg mt-4">
          The goal was to promote the new Glorious O3 mouse while maintaining a strong
          presence in the competitive Northern European gaming market. Glorious aimed to
          build awareness and boost giveaway entries, but standard digital ads often struggle
          with tech-savvy gamers. This audience frequently uses ad-blockers and prefers native
          content over intrusive formats.
        </p>
      </section>

      {/* Solution Section */}
      <section>
        <h2 className="text-2xl font-bold text-foreground border-b-2 border-border pb-3 mb-6">
          Solution
        </h2>
        
        {/* GIF Gallery */}
        <div className="flex flex-col md:flex-row gap-4 justify-center my-8">
          <img
            src="https://storage.googleapis.com/livad-blog/3292/3637484.gif"
            alt="Campaign GIF Left Column"
            className="w-full md:w-[48%] rounded-lg shadow-lg shadow-black/10"
          />
          <img
            src="https://storage.googleapis.com/livad-blog/3292/3644839.gif"
            alt="Campaign GIF Right Column"
            className="w-full md:w-[48%] rounded-lg shadow-lg shadow-black/10"
          />
        </div>

        <p className="text-muted-foreground leading-relaxed text-lg">
          Glorious used Beta's Rich Media Overlays to connect with audiences across Finland,
          Norway, and Sweden. The team implemented a scalable, automated sponsorship model
          featuring localized creative assets in Finnish, Norwegian, and English. These sleek
          overlays appeared naturally during live broadcasts, prompting viewers to explore the
          mouse and join the giveaway through a link in the streamer's banner. By collaborating
          with 25 creators, Glorious shared its message during high-engagement moments across
          112 categories without interrupting the viewing experience.
        </p>
      </section>

      {/* Impact Section */}
      <section>
        <h2 className="text-2xl font-bold text-foreground border-b-2 border-border pb-3 mb-6">
          Impact
        </h2>
        <p className="text-muted-foreground leading-relaxed text-lg mb-6">
          This international campaign successfully established a multi-market presence across
          the Nordic region. The message reached gamers in 112 different live stream categories,
          ensuring Glorious found its audience regardless of what they watched. Using Beta's automated
          distribution allowed the brand to keep a consistent voice while meeting local linguistic
          needs. This approach bypassed traditional advertising hurdles and generated significant
          engagement for the product launch.
        </p>

        {/* Performance Analysis Image */}
        <img
          src="https://storage.googleapis.com/livad-blog/3292/analysis_campaigns_3292_3315_3317.png"
          alt="Campaign Performance Analysis"
          className="w-full h-auto rounded-lg my-6"
        />
      </section>

      {/* Results Section */}
      <section>
        <h2 className="text-2xl font-bold text-foreground border-b-2 border-border pb-3 mb-6">
          Results
        </h2>
        
        {/* Results List */}
        <ul className="space-y-3 mb-8">
          <li className="text-lg text-muted-foreground flex items-start gap-3">
            <span className="text-primary font-bold text-2xl leading-none">•</span>
            <span><strong className="text-foreground">137K+</strong> Total Views</span>
          </li>
          <li className="text-lg text-muted-foreground flex items-start gap-3">
            <span className="text-primary font-bold text-2xl leading-none">•</span>
            <span><strong className="text-foreground">25</strong> Creators Participated</span>
          </li>
          <li className="text-lg text-muted-foreground flex items-start gap-3">
            <span className="text-primary font-bold text-2xl leading-none">•</span>
            <span><strong className="text-foreground">112</strong> Categories</span>
          </li>
          <li className="text-lg text-muted-foreground flex items-start gap-3">
            <span className="text-primary font-bold text-2xl leading-none">•</span>
            <span><strong className="text-foreground">3 Countries</strong> Reached (Finland, Norway, Sweden)</span>
          </li>
        </ul>

        <p className="text-muted-foreground leading-relaxed text-lg mb-8">
          Reach your target audience with fun and engaging virtual experiences, start today.
        </p>

        {/* Video Container */}
        <div className="relative w-full pb-[56.25%] h-0 overflow-hidden bg-black rounded-xl">
          <video 
            controls 
            className="absolute top-0 left-0 w-full h-full"
          >
            <source
              src="https://storage.googleapis.com/livad-blog/3292/combined_campaign_3292_20260127_010350.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>
    </div>
  );
};

export default GloriousCaseStudy;
