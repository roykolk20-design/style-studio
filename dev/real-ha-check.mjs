// Drives the Stijl panel in the real Home Assistant from dev/real-ha.mjs.
// Run: node dev/real-ha-check.mjs [screenshot folder]
import { chromium } from "playwright-core";
import { start } from "./real-ha.mjs";

const shots = process.argv[2];
const auth = await start();
const browser = await chromium.launch({ channel: "msedge" });
const context = await browser.newContext({ viewport: { width: 1600, height: 1000 } });
// Log in the way the frontend remembers a session.
await context.addInitScript((tokens) => {
  localStorage.setItem("hassTokens", JSON.stringify(tokens));
}, {
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
page.on("console", (msg) => msg.type() === "error" && errors.push(`console: ${msg.text()}`));

let failures = 0;
const check = (ok, label) => {
  console.log(`${ok ? "ok  " : "FAIL"} ${label}`);
  if (!ok) failures += 1;
};

await page.goto(`${auth.base}/style-studio`);
const panel = page.locator("style-studio-panel");
await panel.locator("nav.tabs").waitFor({ timeout: 60000 });
const themes = panel.locator("ss-themes-tab");
await themes.locator(".intro").waitFor();
await page.waitForTimeout(1000);

// Make a theme from the pink preset and save it.
await themes.getByRole("button", { name: "Nieuw thema" }).click();
await themes.locator('[data-preset="pink"]').click();
// A new name each run; an existing name is (rightly) refused.
const NAME = `Roze ${new Date().toISOString().slice(11, 19).replace(/:/g, "")}`;
await themes.getByRole("textbox", { name: "Naam", exact: true }).fill(NAME);
await themes.getByRole("button", { name: "Opslaan" }).click();
await page.waitForTimeout(3000);
const chips = await themes.locator(".chip").allInnerTexts();
console.log("theme chips:", chips.map((c) => c.replace(/\s+/g, " ").trim()));
check(chips.some((c) => c.includes(NAME) && !c.includes("niet geladen")), "saved theme is loaded");
if (shots) await page.screenshot({ path: `${shots}/real-themes.png` });

// Per person: the new theme must be in the list.
await panel.locator("nav.tabs").getByRole("button", { name: "Per persoon" }).click();
const people = panel.locator("ss-people-tab");
await people.locator(".intro").waitFor();
await page.waitForTimeout(1000);
const select = people.getByRole("combobox", { name: "Thema (Roy)" });
const options = await select.locator("option").allInnerTexts();
console.log("theme options for Roy:", options.map((o) => o.trim()));
check(options.some((o) => o.trim() === NAME), "new theme can be picked for a person");
if (options.some((o) => o.trim() === NAME)) {
  await select.selectOption(NAME);
  await people.getByRole("button", { name: "Opslaan" }).click();
  await page.waitForTimeout(3000);
  const text = (await people.locator(".person").first().allInnerTexts()).join(" ");
  console.log("Roy's card:", text.replace(/\s+/g, " ").slice(0, 200));
  check(/Toegepast|Wordt toegepast/.test(text), "saved for the person");
}
if (shots) await page.screenshot({ path: `${shots}/real-people.png` });

console.log(errors.length ? `errors:\n${errors.join("\n")}` : "no page errors");
await browser.close();
console.log(failures ? `${failures} failed` : "all passed");
process.exit(failures ? 1 : 0);
