/**
 * Captures README demo media from a running preview server.
 * Usage: npm run preview (port 4173) then node scripts/capture-readme-assets.mjs
 */
import { chromium } from "playwright";
import gifenc from "gifenc";
const { GIFEncoder, quantize, applyPalette } = gifenc;
import { PNG } from "pngjs";
import { writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ASSETS = join(__dirname, "..", "readme-assets");
const BASE = process.env.PREVIEW_URL ?? "http://127.0.0.1:4173";

mkdirSync(ASSETS, { recursive: true });

function pngBufferToRgba(buffer) {
  const png = PNG.sync.read(buffer);
  return { width: png.width, height: png.height, data: png.data };
}

function rgbaToGifFrame(rgba, width, height) {
  const palette = quantize(rgba, 256);
  const index = applyPalette(rgba, palette);
  return { width, height, palette, index };
}

async function waitForProducts(page) {
  await page.waitForSelector("article, .display-heading", { timeout: 20000 });
  await page.waitForTimeout(1200);
}

async function captureDesktop(page) {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(BASE, { waitUntil: "networkidle" });
  await waitForProducts(page);
  await page.screenshot({
    path: join(ASSETS, "desktop.png"),
    type: "png",
    animations: "disabled",
  });
}

async function captureMobile(page) {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${BASE}/shop`, { waitUntil: "networkidle" });
  await waitForProducts(page);
  await page.screenshot({
    path: join(ASSETS, "mobile.png"),
    type: "png",
    fullPage: true,
    animations: "disabled",
  });
}

async function captureGif(page) {
  await page.setViewportSize({ width: 1280, height: 720 });
  const gif = GIFEncoder();
  const frames = [];

  async function snap() {
    const buffer = await page.screenshot({ type: "png", animations: "disabled" });
    const { width, height, data } = pngBufferToRgba(buffer);
    frames.push(rgbaToGifFrame(data, width, height));
  }

  const flow = [
    async () => {
      await page.goto(BASE, { waitUntil: "networkidle" });
      await waitForProducts(page);
    },
    async () => page.click('a[href="/shop"]'),
    async () => {
      await page.waitForURL(/\/shop/);
      await waitForProducts(page);
    },
    async () => {
      const search = page.locator("#product-search");
      if (await search.count()) {
        await search.fill("jacket");
        await page.waitForTimeout(600);
      }
    },
    async () => {
      const card = page.locator("article").first();
      await card.locator('a[href^="/product/"]').first().click();
      await page.waitForURL(/\/product\//);
      await waitForProducts(page);
    },
    async () => {
      const addBtn = page.getByRole("button", { name: /add to cart/i });
      if (await addBtn.count()) await addBtn.first().click();
      await page.waitForTimeout(500);
    },
    async () => page.click('a[href="/cart"]'),
    async () => {
      await page.waitForURL(/\/cart/);
      await page.waitForTimeout(800);
    },
    async () => page.click('a[href="/checkout"]'),
    async () => {
      await page.waitForURL(/\/checkout/);
      await page.waitForTimeout(800);
    },
  ];

  for (const step of flow) {
    await step();
    await snap();
    await page.waitForTimeout(400);
  }

  for (const frame of frames) {
    gif.writeFrame(frame.index, frame.width, frame.height, {
      palette: frame.palette,
      delay: 900,
    });
  }
  gif.finish();
  writeFileSync(join(ASSETS, "shop.gif"), Buffer.from(gif.bytes()));
}

async function main() {
  const browser = await chromium.launch({
    headless: true,
    channel: "msedge",
  });
  const context = await browser.newContext({
    colorScheme: "dark",
    reducedMotion: "reduce",
  });
  const page = await context.newPage();

  try {
    await captureDesktop(page);
    await captureMobile(page);
    await captureGif(page);
    console.log("README assets saved to readme-assets/");
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
