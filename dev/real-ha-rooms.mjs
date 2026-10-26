// The Rooms tab in the real Home Assistant from dev/real-ha.mjs, with the
// real button-card and Bubble Card and a hand-made "Licht" view.
// Run: node dev/real-ha-rooms.mjs [screenshot folder]
import { chromium } from "playwright-core";
import { seedDashboard, start, ws } from "./real-ha.mjs";

const shots = process.argv[2];
const shot = (page, name) => (shots ? page.screenshot({ path: `${shots}/${name}.png` }) : null);
const auth = await start();
// Start from the hand-made dashboard every run.
await seedDashboard(auth.access_token, true);
const browser = await chromium.launch({ channel: "msedge" });
const context = await browser.newContext({ viewport: { width: 1600, height: 1000 } });
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
const dashboard = async () => (await ws(auth.access_token, [{ type: "lovelace/config", url_path: null }]))[0];

await page.goto(`${auth.base}/lovelace/licht`);
await page.waitForTimeout(5000);
await shot(page, "real-dashboard-before");

await page.goto(`${auth.base}/style-studio`);
const panel = page.locator("style-studio-panel");
await panel.locator("nav.tabs").waitFor({ timeout: 60000 });
await panel.locator("nav.tabs").getByRole("button", { name: "Kamers en pop-ups" }).click();
const rooms = panel.locator("ss-rooms-tab");
const next = () => rooms.getByRole("button", { name: "Volgende" }).click();
const yes = () => rooms.getByRole("button", { name: "Ja" }).click();
await rooms.locator(".choice").first().waitFor();
await page.waitForTimeout(2000);
await shot(page, "real-rooms-start");

// Change the hand-made living room, step by step.
await rooms.locator('[data-choice="edit"]').click();
const tiles = (await rooms.locator(".tile").allInnerTexts()).map((c) => c.trim());
console.log("rooms:", tiles.join(", "));
check(["Keuken", "Slaapkamer", "Woonkamer"].every((name) => tiles.includes(name)), "hand-made rooms found");
await rooms.locator(".tile", { hasText: "Woonkamer" }).click();
await page.waitForTimeout(2000);
check((await rooms.getByText("Echte kaarten; de knoppen werken echt").count()) >= 1, "preview uses the real cards");
await next();
await rooms.getByRole("textbox", { name: "Naam" }).fill("Huiskamer");
await rooms.getByRole("button", { name: "Ander icoon kiezen" }).click();
await rooms.locator("ss-icon-picker").getByRole("searchbox").fill("bath");
await page.waitForTimeout(800);
check((await rooms.locator("ss-icon-picker").getByRole("button", { name: "bathtub", exact: true }).count()) === 1, "icon search uses Home Assistant's icon list");
await rooms.locator("ss-icon-picker").getByRole("button", { name: "sofa-outline", exact: true }).click().catch(async () => {
  await rooms.locator("ss-icon-picker").getByRole("searchbox").fill("sofa");
  await rooms.locator("ss-icon-picker").getByRole("button", { name: "sofa-outline", exact: true }).click();
});
await next();
check(await rooms.getByRole("checkbox", { name: "Ceiling Lights" }).isChecked(), "lights read from the pop-up");
await rooms.getByRole("checkbox", { name: "Ceiling Lights" }).uncheck();
await rooms.getByRole("checkbox", { name: "Office RGBW Lights" }).check();
await page.waitForTimeout(1500);
await shot(page, "real-rooms-edit");
await next(); // lights
await next(); // air conditioning
await rooms.getByRole("button", { name: "Opslaan", exact: true }).click();
await yes();
await page.waitForTimeout(3000);

let config = await dashboard();
const ground = config.views[0].sections[1].cards;
check(ground[1].name.includes("const NAME='Huiskamer'") && ground[1].name.includes('"light.office_rgbw_lights"'), "tile changed in place");
check(ground[1].name.includes("const ICON='mdi:sofa-outline'"), "icon from the picker");
check(ground[1].styles.card[0]["border-radius"] === "24px", "tile design kept");
const popupLights = ground[2].cards.slice(1).map((c) => c.entity);
check(
  JSON.stringify(popupLights) === JSON.stringify(["light.living_room_rgbww_lights", "light.office_rgbw_lights"]) &&
    ground[2].cards.slice(1).every((c) => c.button_type === "slider"),
  `pop-up lights changed, design kept (${popupLights})`
);

// A new room by hand, under "1e verdieping", like the rooms already there.
await rooms.locator('[data-choice="add"]').click();
await rooms.getByRole("combobox", { name: "Onder welk kopje" }).selectOption({ label: "1e verdieping" });
await next();
await rooms.locator(".tile", { hasText: "Een andere kamer" }).click();
await next();
await rooms.getByRole("textbox", { name: "Naam" }).fill("Kantoor");
await next();
await rooms.getByRole("checkbox", { name: "Office RGBW Lights" }).check();
await next();
await next();
await rooms.getByRole("button", { name: "Op dashboard zetten" }).click();
await yes();
await page.waitForTimeout(3000);
config = await dashboard();
const officeCards = config.views[0].sections[2].cards;
const officeTile = officeCards.find((c) => c.tap_action?.navigation_path === "#l-kantoor");
check(officeTile?.styles?.card?.[0]?.["border-radius"] === "24px", "new room looks like the rooms already there");
check(officeCards.some((c) => c.type === "vertical-stack" && c.cards[0].hash === "#l-kantoor" && c.cards[1].button_type === "slider"), "with a pop-up like theirs");

// Another card: a greeting at the top.
await rooms.locator('[data-choice="card"]').click();
await rooms.locator('[data-card="greeting"]').click();
await next();
await rooms.getByRole("button", { name: "Toevoegen", exact: true }).click();
await yes();
await page.waitForTimeout(2000);
config = await dashboard();
check(config.views[0].sections[0].cards.some((c) => c.type === "markdown"), "greeting added");

// Bubble Card asks to migrate the hand-made (old format) pop-ups; that
// notice is about the seeded cards, so close it for the screenshots.
const dismiss = async () => {
  const later = page.getByRole("button", { name: /Remind me later/ });
  if (await later.count()) await later.first().click();
};
await page.goto(`${auth.base}/lovelace/licht`);
await page.waitForTimeout(5000);
await dismiss();
await page.waitForTimeout(500);
await shot(page, "real-dashboard-after");
for (const hash of ["#l-woonkamer", "#l-kantoor"]) {
  await page.goto(`${auth.base}/lovelace/licht${hash}`);
  await page.waitForTimeout(4000);
  await dismiss();
  await page.waitForTimeout(800);
  await shot(page, `real-popup-${hash.slice(3)}`);
}

// The blue icons: HA's default blue written into the cards.
await page.goto(`${auth.base}/style-studio`);
await panel.locator("nav.tabs").waitFor({ timeout: 60000 });
await panel.locator("nav.tabs").getByRole("button", { name: "Controle en herstel" }).click();
const checkTab = panel.locator("ss-check-tab");
await checkTab.getByRole("button", { name: "Dashboards doorzoeken" }).click();
await page.waitForTimeout(3000);
check((await checkTab.getByText("var(--state-icon-color, #44739e)").count()) === 1, "HA's default blue mapped to the icon color");
await shot(page, "real-check");
await checkTab.getByRole("button", { name: "Gekozen voorstellen toepassen" }).first().click();
await checkTab.getByRole("button", { name: "Ja" }).click();
await page.waitForTimeout(3000);
config = await dashboard();
check(!JSON.stringify(config).includes('"color":"#44739e"'), "blue replaced in the cards");
await page.goto(`${auth.base}/lovelace/licht`);
await page.waitForTimeout(5000);
const later = page.getByRole("button", { name: /Remind me later/ });
if (await later.count()) await later.first().click();
await page.waitForTimeout(500);
await shot(page, "real-dashboard-fixed");

console.log(errors.length ? `errors:\n${errors.join("\n")}` : "no page errors");
await browser.close();
console.log(failures ? `${failures} failed` : "all passed");
process.exit(failures ? 1 : 0);
