import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, '../public/lovable-uploads');

async function main() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  });

  // Try multiple approaches
  const urls = [
    'https://streamscharts.com/channels',
    'https://streamscharts.com/games',
    'https://streamscharts.com',
  ];

  for (const url of urls) {
    const page = await context.newPage();
    try {
      console.log(`Trying ${url}...`);
      await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 });
      await page.waitForTimeout(5000);

      // Check if we hit cloudflare
      const text = await page.textContent('body');
      if (text.includes('security verification') || text.includes('Verify you are human')) {
        console.log('  -> Cloudflare block, trying to wait...');
        await page.waitForTimeout(10000);
      }

      const title = await page.title();
      console.log(`  Title: ${title}`);

      await page.screenshot({
        path: path.join(outDir, 'screenshot-streamscharts.jpg'),
        type: 'jpeg',
        quality: 85,
        clip: { x: 0, y: 0, width: 1440, height: 810 },
      });
      console.log('  -> saved!');
      break;
    } catch (err) {
      console.error(`  -> ${err.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
}

main();
