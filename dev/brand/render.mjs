// Renders dev/brand/icon.svg into the brand images Home Assistant and HACS
// show: icon (256, 512) and a logo with the name, for light and dark.
// Run: node dev/brand/render.mjs
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";

const icon = readFileSync(new URL("./icon.svg", import.meta.url), "utf8");
const out = new URL("../../custom_components/style_studio/brand/", import.meta.url);
const browser = await chromium.launch({ channel: "msedge" });

async function render(name, html, width, height, scale) {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: scale });
  await page.setContent(`<!doctype html><html><head><style>
      html, body { margin: 0; background: transparent; }
      .logo { display: flex; align-items: center; gap: 24px; height: 128px; }
      .logo svg { width: 128px; height: 128px; flex-shrink: 0; }
      .logo span { font: 700 64px "Segoe UI Variable Display", "Segoe UI", Inter, sans-serif; letter-spacing: -0.5px; }
    </style></head><body>${html}</body></html>`);
  await page.screenshot({ path: fileURLToPath(new URL(name, out)), omitBackground: true });
  await page.close();
}

const iconHtml = icon.replace("<svg ", '<svg width="256" height="256" ');
await render("icon.png", iconHtml, 256, 256, 1);
await render("icon@2x.png", iconHtml, 256, 256, 2);

const logo = (color) => `<div class="logo">${icon}<span style="color:${color}">Style Studio</span></div>`;
// Logo width matches the text; measured once at this font size.
for (const [file, color] of [["logo", "#1f1f1f"], ["dark_logo", "#f5f5f5"]]) {
  const page = await browser.newPage();
  await page.setContent(`<div style="display:inline-flex;gap:24px;align-items:center"><span style="width:128px"></span><span style='font:700 64px "Segoe UI Variable Display","Segoe UI",Inter,sans-serif;letter-spacing:-0.5px'>Style Studio</span></div>`);
  const width = Math.ceil(await page.evaluate(() => document.body.firstElementChild.getBoundingClientRect().width));
  await page.close();
  await render(`${file}.png`, logo(color), width, 128, 1);
  await render(`${file}@2x.png`, logo(color), width, 128, 2);
}

await browser.close();
console.log("brand images written");
