import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, '../public/lovable-uploads');

async function main() {
  // Connect to the user's running Chrome via CDP
  // First try connecting, if that fails, launch with user profile
  let browser;
  try {
    browser = await chromium.launch({
      headless: true,
      channel: 'chrome',
      args: ['--disable-blink-features=AutomationControlled'],
    });
  } catch {
    browser = await chromium.launch({ headless: true });
  }

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    // Bypass common bot detection
    javaScriptEnabled: true,
    bypassCSP: true,
  });

  // Override navigator.webdriver
  await context.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
  });

  const page = await context.newPage();

  try {
    console.log('Navigating to streamscharts.com/channels...');
    await page.goto('https://streamscharts.com/channels', {
      waitUntil: 'domcontentloaded',
      timeout: 30000
    });

    // Wait for content or cloudflare
    console.log('Waiting for page...');
    await page.waitForTimeout(8000);

    const title = await page.title();
    console.log(`Title: ${title}`);

    await page.screenshot({
      path: path.join(outDir, 'screenshot-streamscharts.jpg'),
      type: 'jpeg',
      quality: 85,
      clip: { x: 0, y: 0, width: 1440, height: 810 },
    });
    console.log('Saved screenshot-streamscharts.jpg');
  } catch (err) {
    console.error('Failed:', err.message);
  }

  await browser.close();
}

main();
