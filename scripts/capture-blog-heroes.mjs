import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '..', 'public', 'lovable-uploads');

// Strategy: Navigate to visually rich pages and extract the hero/visual content area
// - Live streams: clip the player area for an actual "photo" of streaming content
// - Source articles: grab the hero image area
// - Platform pages: clip the visual hero/banner
// - Game pages: grab the game artwork

const captures = [
  // --- CTV vs Live Streaming: Netflix-style streaming interface ---
  { file: 'blog-ctv-vs-live-streaming-nordic-2026-hero.jpg', url: 'https://www.twitch.tv/directory', wait: 4000,
    action: async (pg) => {
      // Click into the first live channel to get a stream preview
      const firstStream = await pg.$('a[data-a-target="preview-card-image-link"]');
      if (firstStream) { await firstStream.click(); await pg.waitForTimeout(4000); }
    },
    clip: { x: 0, y: 50, width: 1600, height: 750 } // Stream player area
  },

  // --- Kick growth: Kick homepage hero ---
  { file: 'blog-kick-q3-2025-growth-nordic-advertising-opportunity-hero.jpg', url: 'https://kick.com', wait: 4000,
    clip: { x: 0, y: 0, width: 1600, height: 800 }
  },

  // --- YouTube Live advertising: YouTube Gaming hero ---
  { file: 'blog-youtube-live-advertising-nordic-2026-hero.jpg', url: 'https://www.youtube.com/gaming', wait: 4000,
    clip: { x: 0, y: 56, width: 1600, height: 700 }
  },

  // --- Twitch CPM guide: TwitchTracker statistics charts ---
  { file: 'blog-twitch-cpm-media-buying-guide-2026-hero.jpg', url: 'https://twitchtracker.com/statistics', wait: 4000,
    scrollY: 300,
    clip: { x: 200, y: 0, width: 1200, height: 700 }
  },

  // --- Pause ad revolution: A Just Chatting stream ---
  { file: 'blog-pause-ad-revolution-twitch-2026-hero.jpg', url: 'https://www.twitch.tv/directory/category/just-chatting', wait: 3000,
    action: async (pg) => {
      const stream = await pg.$('a[data-a-target="preview-card-image-link"]');
      if (stream) { await stream.click(); await pg.waitForTimeout(4000); }
    },
    clip: { x: 0, y: 50, width: 1600, height: 750 }
  },

  // --- Brands as showrunners: Special events stream ---
  { file: 'blog-brands-as-showrunners-serialized-livestream-content-2026-hero.jpg', url: 'https://www.twitch.tv/directory/category/special-events', wait: 3000,
    action: async (pg) => {
      const stream = await pg.$('a[data-a-target="preview-card-image-link"]');
      if (stream) { await stream.click(); await pg.waitForTimeout(4000); }
    },
    clip: { x: 0, y: 50, width: 1600, height: 750 }
  },

  // --- Streaming shakeout: Stream Hatchet Q4 report ---
  { file: 'blog-streaming-shakeout-trovo-shutdown-hero.jpg', url: 'https://streamscharts.com/overall', wait: 4000,
    clip: { x: 0, y: 0, width: 1600, height: 800 }
  },

  // --- Nordic streaming ad budget: IRL stream ---
  { file: 'blog-nordic-streaming-market-ad-budget-shift-2026-hero.jpg', url: 'https://www.twitch.tv/directory/category/irl', wait: 3000,
    action: async (pg) => {
      const stream = await pg.$('a[data-a-target="preview-card-image-link"]');
      if (stream) { await stream.click(); await pg.waitForTimeout(4000); }
    },
    clip: { x: 0, y: 50, width: 1600, height: 750 }
  },

  // --- Micro streamer ROI: Small streamer with chat ---
  { file: 'blog-micro-streamer-roi-nordic-brands-2026-hero.jpg', url: 'https://www.twitch.tv/directory/all?sort=VIEWER_COUNT_ASC', wait: 3000,
    action: async (pg) => {
      // Pick 3rd stream (small but active)
      const streams = await pg.$$('a[data-a-target="preview-card-image-link"]');
      if (streams[2]) { await streams[2].click(); await pg.waitForTimeout(4000); }
    },
    clip: { x: 0, y: 50, width: 1600, height: 750 }
  },

  // --- Nordic streaming tipping point: SullyGnome analytics ---
  { file: 'blog-nordic-streaming-tipping-point-2026-hero.jpg', url: 'https://sullygnome.com/channels/365/watched', wait: 4000,
    clip: { x: 0, y: 0, width: 1600, height: 800 }
  },

  // --- Creator-first brand strategies: Slots/sponsored stream ---
  { file: 'blog-creator-first-brand-strategies-2026-hero.jpg', url: 'https://www.twitch.tv/directory/category/just-chatting', wait: 3000,
    action: async (pg) => {
      const streams = await pg.$$('a[data-a-target="preview-card-image-link"]');
      if (streams[3]) { await streams[3].click(); await pg.waitForTimeout(4000); }
    },
    clip: { x: 0, y: 50, width: 1600, height: 750 }
  },

  // --- Session length brand recall: TwitchTracker viewership graph ---
  { file: 'blog-twitch-session-length-brand-recall-2026-hero.jpg', url: 'https://twitchtracker.com/statistics/viewers', wait: 4000,
    scrollY: 200,
    clip: { x: 100, y: 0, width: 1400, height: 700 }
  },

  // --- Platform diversification: Kick browse hero ---
  { file: 'blog-platform-diversification-nordic-2026-hero.jpg', url: 'https://kick.com/browse', wait: 4000,
    clip: { x: 0, y: 0, width: 1600, height: 800 }
  },

  // --- Nordic esports: League of Legends stream ---
  { file: 'blog-nordic-esports-advertising-2026-hero.jpg', url: 'https://www.twitch.tv/directory/category/league-of-legends', wait: 3000,
    action: async (pg) => {
      const stream = await pg.$('a[data-a-target="preview-card-image-link"]');
      if (stream) { await stream.click(); await pg.waitForTimeout(4000); }
    },
    clip: { x: 0, y: 50, width: 1600, height: 750 }
  },

  // --- TikTok live: TikTok live page ---
  { file: 'blog-tiktok-live-overtakes-twitch-2026-hero.jpg', url: 'https://www.tiktok.com/live', wait: 4000,
    clip: { x: 0, y: 0, width: 1600, height: 800 }
  },

  // --- Gen Z streaming: Fortnite stream ---
  { file: 'blog-gen-z-streaming-ad-relevance-gap-2026-hero.jpg', url: 'https://www.twitch.tv/directory/category/fortnite', wait: 3000,
    action: async (pg) => {
      const stream = await pg.$('a[data-a-target="preview-card-image-link"]');
      if (stream) { await stream.click(); await pg.waitForTimeout(4000); }
    },
    clip: { x: 0, y: 50, width: 1600, height: 750 }
  },

  // --- Long term partnerships: Valorant stream ---
  { file: 'blog-long-term-streamer-partnerships-2026-hero.jpg', url: 'https://www.twitch.tv/directory/category/valorant', wait: 3000,
    action: async (pg) => {
      const stream = await pg.$('a[data-a-target="preview-card-image-link"]');
      if (stream) { await stream.click(); await pg.waitForTimeout(4000); }
    },
    clip: { x: 0, y: 50, width: 1600, height: 750 }
  },

  // --- AI dynamic ad insertion: Streamlabs hero ---
  { file: 'blog-ai-powered-dynamic-ad-insertion-2026-hero.jpg', url: 'https://streamlabs.com', wait: 4000,
    clip: { x: 0, y: 0, width: 1600, height: 800 }
  },

  // --- Overlay ad engagement: GTA V stream ---
  { file: 'blog-overlay-ad-engagement-doubled-2025-hero.jpg', url: 'https://www.twitch.tv/directory/category/grand-theft-auto-v', wait: 3000,
    action: async (pg) => {
      const stream = await pg.$('a[data-a-target="preview-card-image-link"]');
      if (stream) { await stream.click(); await pg.waitForTimeout(4000); }
    },
    clip: { x: 0, y: 50, width: 1600, height: 750 }
  },

  // --- Affiliate vs brand deal: Minecraft stream ---
  { file: 'blog-affiliate-sponsored-brand-deal-twitch-hero.jpg', url: 'https://www.twitch.tv/directory/category/minecraft', wait: 3000,
    action: async (pg) => {
      const stream = await pg.$('a[data-a-target="preview-card-image-link"]');
      if (stream) { await stream.click(); await pg.waitForTimeout(4000); }
    },
    clip: { x: 0, y: 50, width: 1600, height: 750 }
  },

  // --- How to brief streamer: CS stream ---
  { file: 'blog-how-to-brief-streamer-native-ad-2026-hero.jpg', url: 'https://www.twitch.tv/directory/category/counter-strike', wait: 3000,
    action: async (pg) => {
      const stream = await pg.$('a[data-a-target="preview-card-image-link"]');
      if (stream) { await stream.click(); await pg.waitForTimeout(4000); }
    },
    clip: { x: 0, y: 50, width: 1600, height: 750 }
  },

  // --- Discord communities: Discord homepage hero ---
  { file: 'blog-discord-communities-amplify-twitch-hero.jpg', url: 'https://discord.com', wait: 4000,
    action: async (pg) => {
      // Dismiss cookie banner
      try {
        const btn = await pg.$('button:has-text("Allow All"), button:has-text("Accept")');
        if (btn) { await btn.click(); await pg.waitForTimeout(1000); }
      } catch {}
    },
    clip: { x: 0, y: 0, width: 1600, height: 800 }
  },

  // --- Women in esports: Art category stream ---
  { file: 'blog-women-esports-streaming-advertising-2026-hero.jpg', url: 'https://www.twitch.tv/directory/category/art', wait: 3000,
    action: async (pg) => {
      const stream = await pg.$('a[data-a-target="preview-card-image-link"]');
      if (stream) { await stream.click(); await pg.waitForTimeout(4000); }
    },
    clip: { x: 0, y: 50, width: 1600, height: 750 }
  },

  // --- AI tools streamers: Science & Tech stream ---
  { file: 'blog-ai-tools-streamers-content-creation-2026-hero.jpg', url: 'https://www.twitch.tv/directory/category/science-technology', wait: 3000,
    action: async (pg) => {
      const stream = await pg.$('a[data-a-target="preview-card-image-link"]');
      if (stream) { await stream.click(); await pg.waitForTimeout(4000); }
    },
    clip: { x: 0, y: 50, width: 1600, height: 750 }
  },

  // --- Brand safety: Sports stream ---
  { file: 'blog-brand-safety-live-streaming-2026-hero.jpg', url: 'https://www.twitch.tv/directory/category/sports', wait: 3000,
    action: async (pg) => {
      const stream = await pg.$('a[data-a-target="preview-card-image-link"]');
      if (stream) { await stream.click(); await pg.waitForTimeout(4000); }
    },
    clip: { x: 0, y: 50, width: 1600, height: 750 }
  },

  // --- Parasocial: Music stream ---
  { file: 'blog-parasocial-relationships-streamers-hero.jpg', url: 'https://www.twitch.tv/directory/category/music', wait: 3000,
    action: async (pg) => {
      const stream = await pg.$('a[data-a-target="preview-card-image-link"]');
      if (stream) { await stream.click(); await pg.waitForTimeout(4000); }
    },
    clip: { x: 0, y: 50, width: 1600, height: 750 }
  },

  // --- Co-streaming: Rocket League stream ---
  { file: 'blog-co-streaming-squad-streams-2026-hero.jpg', url: 'https://www.twitch.tv/directory/category/rocket-league', wait: 3000,
    action: async (pg) => {
      const stream = await pg.$('a[data-a-target="preview-card-image-link"]');
      if (stream) { await stream.click(); await pg.waitForTimeout(4000); }
    },
    clip: { x: 0, y: 50, width: 1600, height: 750 }
  },

  // --- Top gaming categories: Twitch game directory with box art ---
  { file: 'blog-top-twitch-gaming-categories-2026-hero.jpg', url: 'https://www.twitch.tv/directory', wait: 3000,
    scrollY: 150,
    clip: { x: 200, y: 0, width: 1300, height: 700 }
  },

  // --- Streamer sponsorship ROI: TwitchTracker active streamers ---
  { file: 'blog-streamer-sponsorship-roi-metrics-2026-hero.jpg', url: 'https://twitchtracker.com/statistics/active-streamers', wait: 4000,
    scrollY: 200,
    clip: { x: 100, y: 0, width: 1400, height: 700 }
  },

  // --- Kick vs Twitch: Kick categories hero ---
  { file: 'blog-kick-vs-twitch-nordics-2026-hero.jpg', url: 'https://kick.com/browse/categories', wait: 4000,
    clip: { x: 0, y: 0, width: 1600, height: 800 }
  },

  // --- Just Chatting/IRL: Just Chatting top stream ---
  { file: 'blog-just-chatting-irl-streaming-2026-hero.jpg', url: 'https://www.twitch.tv/directory/category/just-chatting', wait: 3000,
    action: async (pg) => {
      const streams = await pg.$$('a[data-a-target="preview-card-image-link"]');
      if (streams[1]) { await streams[1].click(); await pg.waitForTimeout(4000); }
    },
    clip: { x: 0, y: 50, width: 1600, height: 750 }
  },

  // --- Twitch algorithm: Twitch homepage with recommended ---
  { file: 'blog-twitch-recommendation-algorithm-2026-hero.jpg', url: 'https://www.twitch.tv', wait: 4000,
    clip: { x: 150, y: 50, width: 1400, height: 700 }
  },

  // --- Ad blocker crisis: Apex Legends stream ---
  { file: 'blog-ad-blocker-crisis-livestream-2026-hero.jpg', url: 'https://www.twitch.tv/directory/category/apex-legends', wait: 3000,
    action: async (pg) => {
      const stream = await pg.$('a[data-a-target="preview-card-image-link"]');
      if (stream) { await stream.click(); await pg.waitForTimeout(4000); }
    },
    clip: { x: 0, y: 50, width: 1600, height: 750 }
  },

  // --- Native ads outperform: Warzone stream ---
  { file: 'blog-why-native-stream-ads-outperform-hero.jpg', url: 'https://www.twitch.tv/directory/category/call-of-duty-warzone', wait: 3000,
    action: async (pg) => {
      const stream = await pg.$('a[data-a-target="preview-card-image-link"]');
      if (stream) { await stream.click(); await pg.waitForTimeout(4000); }
    },
    clip: { x: 0, y: 50, width: 1600, height: 750 }
  },

  // --- Beyond banner blindness: WoW stream ---
  { file: 'blog-beyond-banner-blindness-nordic-hero.jpg', url: 'https://www.twitch.tv/directory/category/world-of-warcraft', wait: 3000,
    action: async (pg) => {
      const stream = await pg.$('a[data-a-target="preview-card-image-link"]');
      if (stream) { await stream.click(); await pg.waitForTimeout(4000); }
    },
    clip: { x: 0, y: 50, width: 1600, height: 750 }
  },

  // --- Livestream commerce: YouTube Live browse ---
  { file: 'blog-livestream-commerce-nordic-2026-hero.jpg', url: 'https://www.youtube.com/@YouTube/streams', wait: 4000,
    clip: { x: 0, y: 56, width: 1600, height: 700 }
  },

  // --- Native vs display: Overwatch stream ---
  { file: 'blog-native-stream-ads-vs-display-ads-hero.jpg', url: 'https://www.twitch.tv/directory/category/overwatch-2', wait: 3000,
    action: async (pg) => {
      const stream = await pg.$('a[data-a-target="preview-card-image-link"]');
      if (stream) { await stream.click(); await pg.waitForTimeout(4000); }
    },
    clip: { x: 0, y: 50, width: 1600, height: 750 }
  },

  // --- How Twitch ads work: Amazon Ads Twitch page ---
  { file: 'blog-how-twitch-advertising-works-2024-hero.jpg', url: 'https://advertising.amazon.com/solutions/products/twitch', wait: 4000,
    clip: { x: 0, y: 0, width: 1600, height: 800 }
  },

  // --- Samsung campaign: PUBG stream ---
  { file: 'blog-samsung-twitch-campaign-hero.jpg', url: 'https://www.twitch.tv/directory/category/pubg-battlegrounds', wait: 3000,
    action: async (pg) => {
      const stream = await pg.$('a[data-a-target="preview-card-image-link"]');
      if (stream) { await stream.click(); await pg.waitForTimeout(4000); }
    },
    clip: { x: 0, y: 50, width: 1600, height: 750 }
  },

  // --- Streamer-first advertising: Top stream on Twitch ---
  { file: 'blog-rise-of-streamer-first-advertising-hero.jpg', url: 'https://www.twitch.tv/directory/all', wait: 3000,
    action: async (pg) => {
      const stream = await pg.$('a[data-a-target="preview-card-image-link"]');
      if (stream) { await stream.click(); await pg.waitForTimeout(4000); }
    },
    clip: { x: 0, y: 50, width: 1600, height: 750 }
  },

  // --- Twitch Norge: Norwegian tagged stream ---
  { file: 'blog-twitch-annonsering-norge-hero.jpg', url: 'https://www.twitch.tv/directory/all?tags=Norwegian', wait: 3000,
    action: async (pg) => {
      const stream = await pg.$('a[data-a-target="preview-card-image-link"]');
      if (stream) { await stream.click(); await pg.waitForTimeout(4000); }
    },
    clip: { x: 0, y: 50, width: 1600, height: 750 }
  },

  // --- Twitch Sverige: Swedish tagged stream ---
  { file: 'blog-twitch-reklam-sverige-hero.jpg', url: 'https://www.twitch.tv/directory/all?tags=Swedish', wait: 3000,
    action: async (pg) => {
      const stream = await pg.$('a[data-a-target="preview-card-image-link"]');
      if (stream) { await stream.click(); await pg.waitForTimeout(4000); }
    },
    clip: { x: 0, y: 50, width: 1600, height: 750 }
  },

  // --- Twitch Suomi: Finnish tagged stream ---
  { file: 'blog-twitch-mainonta-suomi-hero.jpg', url: 'https://www.twitch.tv/directory/all?tags=Finnish', wait: 3000,
    action: async (pg) => {
      const stream = await pg.$('a[data-a-target="preview-card-image-link"]');
      if (stream) { await stream.click(); await pg.waitForTimeout(4000); }
    },
    clip: { x: 0, y: 50, width: 1600, height: 750 }
  },

  // --- Twitch statistics: TwitchTracker main charts ---
  { file: 'blog-twitch-statistics-2025-hero.jpg', url: 'https://twitchtracker.com/statistics', wait: 4000,
    scrollY: 100,
    clip: { x: 100, y: 0, width: 1400, height: 700 }
  },

  // --- Norwegian streamers: SullyGnome Norwegian table ---
  { file: 'blog-norwegian-twitch-streamers-2025-hero.jpg', url: 'https://sullygnome.com/channels/30/watched?language=no', wait: 4000,
    clip: { x: 0, y: 50, width: 1600, height: 750 }
  },

  // --- Most watched games: SullyGnome games chart ---
  { file: 'blog-most-watched-twitch-games-2025-hero.jpg', url: 'https://sullygnome.com/games/365/watched', wait: 4000,
    clip: { x: 0, y: 50, width: 1600, height: 750 }
  },

  // --- Nordic Twitch market: SullyGnome Swedish channels ---
  { file: 'blog-nordic-twitch-market-2025-hero.jpg', url: 'https://sullygnome.com/channels/30/watched?language=sv', wait: 4000,
    clip: { x: 0, y: 50, width: 1600, height: 750 }
  },

  // --- Twitch vs YouTube: YouTube Gaming page ---
  { file: 'blog-twitch-vs-youtube-gaming-2025-hero.jpg', url: 'https://www.youtube.com/gaming', wait: 4000,
    clip: { x: 0, y: 56, width: 1600, height: 700 }
  },

  // --- Advertising benchmarks: Dead by Daylight stream ---
  { file: 'blog-twitch-advertising-benchmarks-2025-hero.jpg', url: 'https://www.twitch.tv/directory/category/dead-by-daylight', wait: 3000,
    action: async (pg) => {
      const stream = await pg.$('a[data-a-target="preview-card-image-link"]');
      if (stream) { await stream.click(); await pg.waitForTimeout(4000); }
    },
    clip: { x: 0, y: 50, width: 1600, height: 750 }
  },

  // --- Swedish streamers: SullyGnome Swedish ---
  { file: 'blog-swedish-twitch-streamers-2025-hero.jpg', url: 'https://sullygnome.com/channels/30/watched?language=sv', wait: 4000,
    scrollY: 100,
    clip: { x: 0, y: 0, width: 1600, height: 750 }
  },

  // --- Finnish streamers: SullyGnome Finnish ---
  { file: 'blog-finnish-twitch-streamers-2025-hero.jpg', url: 'https://sullygnome.com/channels/30/watched?language=fi', wait: 4000,
    scrollY: 100,
    clip: { x: 0, y: 0, width: 1600, height: 750 }
  },

  // --- Kick growth: Kick browse ---
  { file: 'blog-kick-streaming-growth-2025-hero.jpg', url: 'https://kick.com', wait: 4000,
    action: async (pg) => {
      // Click into a stream on Kick
      const stream = await pg.$('a[href*="/"] img');
      if (stream) { await stream.click(); await pg.waitForTimeout(4000); }
    },
    clip: { x: 0, y: 0, width: 1600, height: 800 }
  },

  // --- Top streaming games: SullyGnome games ---
  { file: 'blog-top-streaming-games-2025-hero.jpg', url: 'https://sullygnome.com/games/30/watched', wait: 4000,
    clip: { x: 0, y: 50, width: 1600, height: 750 }
  },

  // --- Non-gaming content: Creative stream ---
  { file: 'blog-non-gaming-content-twitch-2025-hero.jpg', url: 'https://www.twitch.tv/directory/category/art', wait: 3000,
    action: async (pg) => {
      const streams = await pg.$$('a[data-a-target="preview-card-image-link"]');
      if (streams[1]) { await streams[1].click(); await pg.waitForTimeout(4000); }
    },
    clip: { x: 0, y: 50, width: 1600, height: 750 }
  },

  // --- Top streamers: SullyGnome top channels ---
  { file: 'blog-top-streamers-2025-hero.jpg', url: 'https://sullygnome.com/channels/365/watched', wait: 4000,
    clip: { x: 0, y: 50, width: 1600, height: 750 }
  },

  // --- Esports viewership: Esports Charts ---
  { file: 'blog-esports-viewership-2025-hero.jpg', url: 'https://escharts.com', wait: 4000,
    clip: { x: 0, y: 0, width: 1600, height: 800 }
  },
];

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1600, height: 900 },
    locale: 'en-US',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  });

  let done = 0;
  let fail = 0;
  const total = captures.length;

  for (const cap of captures) {
    const outPath = path.join(outDir, cap.file);
    const pg = await context.newPage();
    try {
      await pg.goto(cap.url, { waitUntil: 'load', timeout: 20000 });
      await pg.waitForTimeout(cap.wait || 3000);

      // Dismiss cookie banners
      try {
        const cookieBtn = await pg.$('button:has-text("Accept All"), button:has-text("Accept"), button:has-text("Allow All"), button:has-text("I agree"), button:has-text("Godta alle"), [data-a-target="consent-banner-accept"]');
        if (cookieBtn) { await cookieBtn.click(); await pg.waitForTimeout(800); }
      } catch {}

      // Scroll if needed
      if (cap.scrollY) {
        await pg.evaluate((y) => window.scrollBy(0, y), cap.scrollY);
        await pg.waitForTimeout(1000);
      }

      // Run custom action (click into stream, etc.)
      if (cap.action) {
        await cap.action(pg);
      }

      // Take clipped screenshot
      const ssOpts = { path: outPath, type: 'jpeg', quality: 90 };
      if (cap.clip) ssOpts.clip = cap.clip;
      await pg.screenshot(ssOpts);

      done++;
      console.log(`[${done + fail}/${total}] ✓ ${cap.file}`);
    } catch (err) {
      fail++;
      console.error(`[${done + fail}/${total}] ✗ ${cap.file}: ${err.message.split('\n')[0]}`);
    } finally {
      await pg.close();
    }
  }

  await browser.close();
  console.log(`\nDone: ${done} succeeded, ${fail} failed out of ${total}.`);
}

run().catch(console.error);
