import React from "react";

const GokstadCaseStudy: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header Cover */}
      <img
        src="https://storage.googleapis.com/livad-blog/3498/3790256.gif"
        alt="Gokstad Akademiet campaign header"
        className="w-full h-auto rounded-xl"
      />

      {/* Challenge Section */}
      <section>
        <h2 className="text-2xl font-bold text-foreground border-b-2 border-border pb-3 mb-6">
          Challenge
        </h2>
        <p className="text-muted-foreground leading-relaxed text-lg">
          Gokstad Akademiet offers vocational studies in IT, development, design, and marketing. 
          They focus on practical education that bridges the gap between hobbies like gaming and 
          professional careers.
        </p>
        <p className="text-muted-foreground leading-relaxed text-lg mt-4">
          The goal was to recruit students for the Autumn 2026 semester by targeting gamers with 
          relevant interests in tech and creativity. Traditional social media ads often get scrolled 
          past by this audience, so the school needed a direct line of communication during engaged 
          viewing moments to announce available free study places.
        </p>
      </section>

      {/* Solution Section */}
      <section>
        <h2 className="text-2xl font-bold text-foreground border-b-2 border-border pb-3 mb-6">
          Solution
        </h2>
        <p className="text-muted-foreground leading-relaxed text-lg">
          The campaign utilized a Live Stream Overlay across 19 channels, where streamers verbally 
          connected the school's programs to the gaming world. The creative highlighted specific 
          courses and the availability of free study places, prompting viewers to click the link in 
          the chat for more details. Streamers emphasized how skills in development and design relate 
          directly to the games their audiences love.
        </p>
      </section>

      {/* Impact Section */}
      <section>
        <h2 className="text-2xl font-bold text-foreground border-b-2 border-border pb-3 mb-6">
          Impact
        </h2>
        <p className="text-muted-foreground leading-relaxed text-lg mb-6">
          The campaign delivered a strong 1.01% click-through rate, proving that the messaging about 
          turning a gaming passion into a career landed effectively. Viewers engaged with the offer 
          for free study places, driving qualified traffic to the application portal through the chat links.
        </p>

        {/* Performance Analysis Image */}
        <img
          src="https://storage.googleapis.com/livad-blog/3498/analysis_campaign_3498.png"
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
            <span><strong className="text-foreground">54K+</strong> Completed Views</span>
          </li>
          <li className="text-lg text-muted-foreground flex items-start gap-3">
            <span className="text-primary font-bold text-2xl leading-none">•</span>
            <span><strong className="text-foreground">1.01%</strong> CTR</span>
          </li>
          <li className="text-lg text-muted-foreground flex items-start gap-3">
            <span className="text-primary font-bold text-2xl leading-none">•</span>
            <span><strong className="text-foreground">19</strong> Creators</span>
          </li>
          <li className="text-lg text-muted-foreground flex items-start gap-3">
            <span className="text-primary font-bold text-2xl leading-none">•</span>
            <span><strong className="text-foreground">31</strong> Categories</span>
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
              src="https://storage.googleapis.com/livad-blog/3498/combined_campaign_3498_20260205_150643.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>
    </div>
  );
};

export default GokstadCaseStudy;
