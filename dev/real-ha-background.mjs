// Page backgrounds in the real Home Assistant from dev/real-ha.mjs: upload a
// photo through the panel, set it on a page, then open that dashboard page
// and check that Home Assistant really draws it. Also the theme variable
// `lovelace-background` for all pages.
// Run: node dev/real-ha-background.mjs [screenshot folder]
import { readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";
import { seedDashboard, start, ws } from "./real-ha.mjs";

const shots = process.argv[2];
const shot = (page, name) => (shots ? page.screenshot({ path: `${shots}/${name}.png` }) : null);
const config = fileURLToPath(new URL("./real-ha/config/", import.meta.url));

// A theme with a page background, for the "all pages" check.
writeFileSync(`${config}themes/bgtest.yaml`, 'BG Test:\n  lovelace-background: "#336699"\n  primary-color: "#e8749e"\n');

const auth = await start();
await seedDashboard(auth.access_token, true);
const api = (path, body) =>
  fetch(`${auth.base}${path}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${auth.access_token}`, "Content-Type": "application/json" },
    body: JSON.stringify(body ?? {}),
  });
await api("/api/services/frontend/reload_themes");

const browser = await chromium.launch({ channel: "msedge" });
const context = await browser.newContext({ viewport: { width: 1500, height: 950 } });
await context.addInitScript((tokens) => localStorage.setItem("hassTokens", JSON.stringify(tokens)), {
  access_token: auth.access_token,
  refresh_token: auth.refresh_token,
  token_type: "Bearer",
  expires_in: auth.expires_in,
  expires: Date.now() + auth.expires_in * 1000,
  hassUrl: auth.base,
  clientId: auth.client,
});
const page = await context.newPage();
const errors = [];
page.on("pageerror", (err) => errors.push(`pageerror: ${err.message}`));

let failures = 0;
const check = (ok, label) => {
  console.log(`${ok ? "ok  " : "FAIL"} ${label}`);
  if (!ok) failures += 1;
};

// A real picture, big enough to be shrunk: a 3600 x 2000 gradient made in the browser.
const big = await page.evaluate(async () => {
  const canvas = document.createElement("canvas");
  canvas.width = 3600;
  canvas.height = 2000;
  const c = canvas.getContext("2d");
  const g = c.createLinearGradient(0, 0, 3600, 2000);
  g.addColorStop(0, "#1d2b64");
  g.addColorStop(0.5, "#e8749e");
  g.addColorStop(1, "#f8cdda");
  c.fillStyle = g;
  c.fillRect(0, 0, 3600, 2000);
  // Some noise, so the file is not tiny.
  for (let i = 0; i < 4000; i += 1) {
    c.fillStyle = `rgba(255,255,255,${Math.random() * 0.15})`;
    c.fillRect(Math.random() * 3600, Math.random() * 2000, 40 + Math.random() * 120, 6);
  }
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
  return Array.from(new Uint8Array(await blob.arrayBuffer()));
});
const bigBuffer = Buffer.from(big);
console.log(`test picture: ${(bigBuffer.length / 1e6).toFixed(1)} MB png, 3600 x 2000`);

await page.goto(`${auth.base}/style-studio`);
const panel = page.locator("style-studio-panel");
await panel.locator("nav.tabs").waitFor({ timeout: 60000 });
await panel.locator("nav.tabs").getByRole("button", { name: "Kamers en pop-ups" }).click();
const rooms = panel.locator("ss-rooms-tab");
await rooms.locator('[data-choice="background"]').click();
const flow = rooms.locator("ss-background-flow");
await flow.locator(".tile").first().waitFor();
const next = () => flow.getByRole("button", { name: "Volgende" }).click();
await next();

// Upload through the real endpoint.
await flow.locator('input[type="file"]').setInputFiles({ name: "Test Foto.png", mimeType: "image/png", buffer: bigBuffer });
await flow.getByRole("button", { name: /^Test Foto/ }).waitFor({ timeout: 60000 });
const stored = readdirSync(`${config}style_studio/backgrounds`);
console.log("stored files:", stored);
check(stored.some((f) => f.startsWith("Test Foto") && f.endsWith(".jpg")), "a big photo is shrunk to a jpg before it is stored");
const storedName = stored.find((f) => f.startsWith("Test Foto"));
const storedSize = storedName ? statSync(`${config}style_studio/backgrounds/${storedName}`).size : 0;
check(storedSize > 0 && storedSize < bigBuffer.length, `smaller than the original (${(storedSize / 1e6).toFixed(2)} MB)`);

const photoUrl = await flow.locator(".photo.chosen .thumb img").getAttribute("src");
console.log("photo url:", photoUrl);
const served = await fetch(`${auth.base}${photoUrl}`);
check(served.status === 200 && (served.headers.get("content-type") ?? "").startsWith("image/"), "the server shows the photo without a login");

await next();
await flow.locator('input[type="range"]').fill("-30");
await next();
await flow.getByRole("button", { name: "Achtergrond zetten" }).click();
await flow.getByRole("button", { name: "Ja" }).click();
await page.waitForTimeout(3000);

const [dashboard] = await ws(auth.access_token, [{ type: "lovelace/config", url_path: null }]);
const written = dashboard.views[0].background;
console.log("written:", written);
check(typeof written === "string" && written.includes(photoUrl) && written.includes("rgba(0, 0, 0, 0.3)"), "background written into the page");
check(dashboard.views.length === 1 || dashboard.views.slice(1).every((v) => !v.background), "other pages untouched");

// Does Home Assistant draw it?
await page.goto(`${auth.base}/lovelace/licht`);
await page.waitForTimeout(6000);
const later = page.getByRole("button", { name: /Remind me later/ });
if (await later.count()) await later.first().click();
await page.waitForTimeout(500);
// Walk every shadow root for an element whose background uses the photo.
const found = await page.evaluate((url) => {
  const hits = [];
  const walk = (root) => {
    for (const el of root.querySelectorAll("*")) {
      const bg = getComputedStyle(el).backgroundImage;
      if (bg && bg.includes(url)) hits.push({ tag: el.localName, bg: bg.slice(0, 160), box: el.getBoundingClientRect().toJSON() });
      if (el.shadowRoot) walk(el.shadowRoot);
    }
  };
  walk(document);
  return hits;
}, photoUrl);
console.log("elements drawing the photo:", found.map((f) => `${f.tag} ${Math.round(f.box.width)}x${Math.round(f.box.height)}`));
check(found.length > 0, "Home Assistant draws the photo on the page");
check(found.some((f) => f.box.width > 800 && f.box.height > 400), "and it covers the page");
await shot(page, "real-background-photo");

// A color on the page instead; then removed. Both through the panel.
await page.goto(`${auth.base}/style-studio`);
await panel.locator("nav.tabs").waitFor({ timeout: 60000 });
await panel.locator("nav.tabs").getByRole("button", { name: "Kamers en pop-ups" }).click();
await rooms.locator('[data-choice="background"]').click();
await flow.locator(".tile").first().waitFor();
await next();
await flow.locator('[data-kind="none"]').click();
await next();
await flow.getByRole("button", { name: "Achtergrond weghalen" }).click();
await flow.getByRole("button", { name: "Ja" }).click();
await page.waitForTimeout(3000);
const [after] = await ws(auth.access_token, [{ type: "lovelace/config", url_path: null }]);
check(after.views[0].background === undefined, "background removed again");

// The theme variable: all pages at once.
await page.goto(`${auth.base}/lovelace/licht`);
await page.waitForTimeout(6000);
if (await later.count()) await later.first().click();
// Pick the theme the way the profile page does (the per-person script may have
// picked another one for this user when the page loaded).
await page.evaluate(() =>
  document.querySelector("home-assistant").dispatchEvent(new CustomEvent("settheme", { detail: { theme: "BG Test" } }))
);
await page.waitForTimeout(1500);
const themed = await page.evaluate(() => {
  const hits = [];
  const walk = (root) => {
    for (const el of root.querySelectorAll("*")) {
      const bg = getComputedStyle(el).background;
      if (bg.includes("rgb(51, 102, 153)")) hits.push({ tag: el.localName, w: el.getBoundingClientRect().width });
      if (el.shadowRoot) walk(el.shadowRoot);
    }
  };
  walk(document);
  return { hits, variable: getComputedStyle(document.documentElement).getPropertyValue("--lovelace-background") };
});
console.log("theme variable:", JSON.stringify(themed.variable), "drawn by:", themed.hits.map((h) => `${h.tag} ${Math.round(h.w)}`).slice(0, 6));
check(themed.variable.trim() === "#336699", "the theme sets --lovelace-background");
check(themed.hits.some((h) => h.w > 600), "Home Assistant uses it as the background of the pages");
await shot(page, "real-background-theme");

// Clean up what this test added.
await api("/api/services/frontend/set_theme", { name: "default" });
rmSync(`${config}themes/bgtest.yaml`, { force: true });
await api("/api/services/frontend/reload_themes");

console.log(errors.length ? `errors:\n${errors.join("\n")}` : "no page errors");
await browser.close();
console.log(failures ? `${failures} failed` : "all passed");
process.exit(failures ? 1 : 0);
