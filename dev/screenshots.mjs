// Makes the README images in images/ from dev/harness.html.
// Run: node dev/screenshots.mjs
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";
import { server } from "./serve.mjs";

const base = "http://127.0.0.1:8123/dev/harness.html";
const out = (name) => fileURLToPath(new URL(`../images/${name}`, import.meta.url));
const browser = await chromium.launch({ channel: "msedge" });

async function open(width, height, tabName = "Thema's") {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 2 });
  await page.goto(base);
  const panel = page.locator("style-studio-panel");
  await panel.locator("nav.tabs").waitFor();
  if (tabName !== "Thema's") await panel.locator("nav.tabs").getByRole("button", { name: tabName }).click();
  await page.waitForTimeout(500);
  return { page, panel, themes: panel.locator("ss-themes-tab") };
}

// Start screen of the theme editor.
{
  const { page } = await open(1280, 800);
  await page.screenshot({ path: out("presets.png") });
  await page.close();
}

// Editing a theme, with the pop-up in the preview.
{
  const { page, themes } = await open(1280, 800);
  await themes.locator('[data-preset="sand"]').click();
  await page.waitForTimeout(300);
  await page.screenshot({ path: out("themes.png") });

  // Every variable, by group.
  for (const group of ["Bovenbalk", "Pop-ups (Bubble Card)"]) {
    await themes.locator("summary", { hasText: group }).click();
  }
  await themes.locator("summary", { hasText: "Bovenbalk" }).scrollIntoViewIfNeeded();
  await page.mouse.wheel(0, -120);
  await page.waitForTimeout(300);
  await page.screenshot({ path: out("all-colors.png") });
  await page.close();
}

// The pink theme on the whole screen, before saving.
{
  const { page, themes } = await open(1280, 800);
  await themes.locator('[data-preset="pink"]').click();
  await themes.getByRole("radio", { name: "Glas" }).click();
  await themes.getByRole("checkbox", { name: /Ook tonen op dit hele scherm/ }).check();
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  await page.screenshot({ path: out("pink.png") });
  await page.close();
}

// The dark preset.
{
  const { page, themes } = await open(1280, 800);
  await themes.locator('[data-preset="dark"]').click();
  await themes.getByRole("checkbox", { name: /Ook tonen op dit hele scherm/ }).check();
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  await page.screenshot({ path: out("dark.png") });
  await page.close();
}

// Sidebar tab with the Glass Sidebar add-on.
{
  const { page } = await open(1280, 800, "Zijbalk");
  await page.screenshot({ path: out("sidebar.png") });
  await page.close();
}

// Per person, after picking a theme for Roy and Joyce.
{
  const { page, panel } = await open(1280, 800, "Per persoon");
  const people = panel.locator("ss-people-tab");
  await people.waitFor();
  await page.waitForTimeout(300);
  await people.getByRole("combobox", { name: "Thema (Roy)" }).selectOption("Licht Warm");
  await people.getByRole("combobox", { name: "Thema (Joyce)" }).selectOption("Licht Roze");
  await people.getByRole("button", { name: "Opslaan" }).click();
  await page.waitForTimeout(5000);
  await page.screenshot({ path: out("people.png") });
  await page.close();
}

// Phone.
{
  const { page, themes } = await open(430, 860);
  await themes.locator('[data-preset="sand"]').click();
  await page.waitForTimeout(300);
  await page.screenshot({ path: out("mobile.png") });
  await page.close();
}

await browser.close();
server.close();
console.log("images written");
