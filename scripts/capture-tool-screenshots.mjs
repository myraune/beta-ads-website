import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, '../public/lovable-uploads');

const targets = [
  {
    name: 'twitchtracker',
    url: 'https://twitchtracker.com/statistics',
    filename: 'screenshot-twitchtracker.jpg',
    waitFor: 2000,
  },
  {
    name: 'twitchtracker-channel',
    url: 'https://twitchtracker.com/shroud',
    filename: 'screenshot-twitchtracker-channel.jpg',
    waitFor: 2000,
  },
  {
    name: 'sullygnome',
    url: 'https://sullygnome.com/channels/30/watched',
    filename: 'screenshot-sullygnome.jpg',
    waitFor: 3000,
  },
  {
    name: 'streamscharts',
    url: 'https://streamscharts.com/',
    filename: 'screenshot-streamscharts.jpg',
    waitFor: 2000,
  },
  {
    name: 'streamscharts-channels',
    url: 'https://streamscharts.com/channels',
    filename: 'screenshot-streamscharts-channels.jpg',
    waitFor: 2000,
  },
  {
    name: 'streamhatchet',
    url: 'https://streamhatchet.com/',
    filename: 'screenshot-streamhatchet.jpg',
    waitFor: 2000,
  },
];

async function main() {
  const browser = await chromium.launch({ headless: true });

  for (const t of targets) {
    console.log(`Capturing ${t.name} from ${t.url}...`);
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    });
    const page = await context.newPage();
    try {
      await page.goto(t.url, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await page.waitForTimeout(t.waitFor);

      // Try to dismiss cookie banners
      try {
        const cookieBtn = await page.$('button:has-text("Accept"), button:has-text("Got it"), button:has-text("OK"), [class*="cookie"] button');
        if (cookieBtn) await cookieBtn.click();
        await page.waitForTimeout(500);
      } catch {}

      await page.screenshot({
        path: path.join(outDir, t.filename),
        type: 'jpeg',
        quality: 85,
        clip: { x: 0, y: 0, width: 1440, height: 810 },
      });
      console.log(`  -> saved ${t.filename}`);
    } catch (err) {
      console.error(`  -> FAILED: ${err.message}`);
    } finally {
      await context.close();
    }
  }

  await browser.close();
  console.log('Done!');
}

main();
