import React from "react";
import { Link } from "react-router-dom";

const GokstadCaseStudy: React.FC = () => {
  return (
    <div className="space-y-8">
      <img
        src="https://storage.googleapis.com/ad-gifs/3790920.gif"
        alt="Gokstad Akademiet campaign header"
        className="w-full h-auto rounded-xl"
      />

      <section>
        <h2 className="text-2xl font-bold text-foreground border-b-2 border-border pb-3 mb-6">
          Challenge
        </h2>
        <p className="text-muted-foreground leading-relaxed text-lg">
          Gokstad Akademiet wanted to connect with the next generation of IT and design professionals where they are most active. The goal was to show tech-savvy individuals how a passion for gaming can lead to a career in development or marketing. To do this effectively, the academy looked past standard ads. They needed to share a time-sensitive opportunity regarding free study places for the Autumn 2026 intake. This message required more than a static image. It needed the personal touch and trust that comes from a live personality.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground border-b-2 border-border pb-3 mb-6">
          Solution
        </h2>
        <div className="flex gap-4 justify-center my-6">
          <img
            src="https://storage.googleapis.com/ad-gifs/3818913.gif"
            alt="Campaign GIF Left Column"
            className="max-w-[48%] rounded-lg shadow-lg shadow-black/10"
          />
          <img
            src="https://storage.googleapis.com/ad-gifs/3818527.gif"
            alt="Campaign GIF Right Column"
            className="max-w-[48%] rounded-lg shadow-lg shadow-black/10"
          />
        </div>
        <p className="text-muted-foreground leading-relaxed text-lg">
          Viewers encountered a Live Stream Overlay during natural breaks in content. While the graphic displayed the school's branding, streamers explained the connection between gaming and studying IT or design. A direct link in the chat allowed interested students to browse the course catalog right away. The campaign covered 49 different categories to ensure the message reached a wide variety of interests. In total, 22 creators helped share these study opportunities.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground border-b-2 border-border pb-3 mb-6">
          Impact
        </h2>
        <p className="text-muted-foreground leading-relaxed text-lg mb-6">
          The audience showed strong interest, resulting in a 1.22% click-through rate. This metric proves the offer was relevant enough for viewers to take action. With over 100K completed views, the campaign successfully introduced the academy to potential students. The results confirm a clear alignment between the gaming community and technical education. This approach effectively drove traffic to the application portal for the upcoming academic year.
        </p>
        <img
          src="https://storage.googleapis.com/livad-blog/3498/analysis_campaign_3498.png"
          alt="Campaign Performance Analysis"
          className="w-full h-auto rounded-lg my-6"
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground border-b-2 border-border pb-3 mb-6">
          Results
        </h2>
        <ul className="space-y-3 mb-8">
          <li className="text-lg text-muted-foreground flex items-start gap-3">
            <span className="text-primary font-bold text-2xl leading-none">•</span>
            <span><strong className="text-foreground">100K+</strong> Completed Views</span>
          </li>
          <li className="text-lg text-muted-foreground flex items-start gap-3">
            <span className="text-primary font-bold text-2xl leading-none">•</span>
            <span><strong className="text-foreground">1.22%</strong> CTR</span>
          </li>
          <li className="text-lg text-muted-foreground flex items-start gap-3">
            <span className="text-primary font-bold text-2xl leading-none">•</span>
            <span><strong className="text-foreground">22</strong> Creators</span>
          </li>
          <li className="text-lg text-muted-foreground flex items-start gap-3">
            <span className="text-primary font-bold text-2xl leading-none">•</span>
            <span><strong className="text-foreground">49</strong> Categories</span>
          </li>
        </ul>

        <div className="relative w-full pb-[56.25%] h-0 overflow-hidden bg-black rounded-xl">
          <video
            controls
            className="absolute top-0 left-0 w-full h-full"
            crossOrigin="anonymous"
          >
            <source
              src="https://storage.googleapis.com/livad-blog/3498/combined_campaign_3498_20260220_053553.mp4"
              type="video/mp4"
            />
            <track
              src="https://storage.googleapis.com/livad-blog/3498/subtitles/combined_trimmed_386_20260220_053313.vtt"
              kind="subtitles"
              srcLang="en"
              label="English"
              default
            />
            Your browser does not support the video tag.
          </video>
        </div>

        <p className="text-muted-foreground leading-relaxed text-lg mt-8">
          <strong className="text-foreground">
            Reach your target audience with fun and engaging virtual experiences,{" "}
            <Link to="/contact" className="text-primary hover:underline font-bold">
              start today
            </Link>
            .
          </strong>
        </p>
      </section>
    </div>
  );
};

export default GokstadCaseStudy;
