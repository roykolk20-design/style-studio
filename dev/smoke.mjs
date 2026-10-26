// Loads dev/harness.html in Edge at phone, tablet and desktop width, with a
// light and a dark page, and checks the panel together with Glass Sidebar.
// Run: node dev/smoke.mjs [screenshot folder]
import { chromium } from "playwright-core";
import { server } from "./serve.mjs";

const shots = process.argv[2];
const base = "http://127.0.0.1:8123/dev/harness.html";
const browser = await chromium.launch({ channel: "msedge" });
let failures = 0;

function check(ok, label) {
  console.log(`${ok ? "ok  " : "FAIL"} ${label}`);
  if (!ok) failures += 1;
}

// Reads state out of the shadow roots, like the runtime does.
const probe = () => {
  const deepText = (root) =>
    [...root.querySelectorAll("*")]
      .map((el) => (el.shadowRoot ? deepText(el.shadowRoot) : ""))
      .join(" ") + root.textContent;
  const main = document.querySelector("home-assistant").shadowRoot.querySelector("home-assistant-main");
  const sidebar = main.shadowRoot.querySelector("ha-sidebar");
  const panel = main.shadowRoot.querySelector("style-studio-panel");
  const holder = sidebar.shadowRoot.querySelector('slot[name="main-navigation"]');
  const visible = [...holder.children]
    .filter((el) => el.localName === "ha-list-item-button" || el.textContent.trim())
    .sort((a, b) => Number(a.style.order) - Number(b.style.order))
    .map((el) => (el.localName === "ha-list-item-button" ? el.id.replace("sidebar-panel-", "") : `# ${el.textContent}`));
  return {
    visible: visible.join(","),
    sidebarRadius: getComputedStyle(sidebar).borderTopLeftRadius,
    panelText: deepText(panel.shadowRoot).replace(/\s+/g, " "),
    hasPreview: Boolean(
      panel.shadowRoot
        .querySelector("ss-sidebar-tab")
        ?.shadowRoot?.querySelector("ss-sidebar-preview")
        ?.shadowRoot?.querySelector(".sidebar")
    ),
    rootPrimary: document.documentElement.style.getPropertyValue("--primary-color"),
  };
};

async function open(width, query = "", tabName = "Zijbalk") {
  const ctx = await browser.newContext({ viewport: { width, height: width < 800 ? 900 : 1000 } });
  const tab = await ctx.newPage();
  const errors = [];
  tab.on("pageerror", (err) => errors.push(err.message));
  tab.on("console", (msg) => {
    if (msg.type() === "error" && !msg.location().url.endsWith("favicon.ico")) errors.push(msg.text());
  });
  await tab.goto(`${base}${query}`);
  const panel = tab.locator("style-studio-panel");
  // Wait for the panel itself rather than a fixed time.
  await panel.locator("nav.tabs").waitFor();
  if (tabName !== "Thema's") {
    await panel.locator("nav.tabs").getByRole("button", { name: tabName }).click();
  }
  await panel.locator(tabName === "Thema's" ? "ss-themes-tab .intro" : "ss-sidebar-tab .card").first().waitFor();
  await tab.waitForTimeout(300);
  return { ctx, tab, errors, panel };
}

const groupedOrder =
  "lovelace,browser-mod,style-studio,# Dashboards,dashboard-plattegrond,energy,# Info,logbook,history,map";

for (const width of [430, 768, 1920]) {
  for (const page of ["light", "dark"]) {
    const { ctx, tab, errors } = await open(width, `?page=${page}`);
    const state = await tab.evaluate(probe);
    const label = `${width}px ${page}`;
    check(errors.length === 0, `${label}: no errors ${errors.join(" | ")}`);
    check(state.panelText.includes("Glass Sidebar"), `${label}: panel rendered`);
    check(state.hasPreview, `${label}: preview rendered`);
    check(state.visible === groupedOrder, `${label}: Glass Sidebar groups (${state.visible})`);
    if (shots) await tab.screenshot({ path: `${shots}/${width}-${page}.png` });
    await ctx.close();
  }
}

// Glass Sidebar missing, not added, disabled or too old.
for (const [state, text] of [
  ["missing", "Uitbreiding: Glass Sidebar"],
  ["not-added", "Glass Sidebar is geïnstalleerd"],
  ["disabled", "uitgeschakeld of niet geladen"],
  ["old", "Je hebt Glass Sidebar 1.2.1"],
]) {
  const { ctx, tab, errors } = await open(1920, `?glass=${state}`);
  const { panelText } = await tab.evaluate(probe);
  check(panelText.includes(text) && !errors.length, `glass ${state}: "${text}" ${errors.join(" | ")}`);
  await ctx.close();
}

// Editing: nothing changes until Save; Save goes to Glass Sidebar; undo restores.
{
  const { ctx, tab, panel } = await open(1920);
  await panel.locator('input[type="range"]').nth(1).fill("6");
  await tab.waitForTimeout(100);
  let state = await tab.evaluate(probe);
  check(state.panelText.includes("Niet opgeslagen"), "unsaved notice");
  check(state.sidebarRadius === "20px", `real sidebar unchanged before save (${state.sidebarRadius})`);

  await panel.getByRole("button", { name: "Opslaan" }).click();
  await tab.waitForTimeout(300);
  state = await tab.evaluate(probe);
  check((await tab.evaluate(() => window.__db.sidebar.radius)) === 6, "save stores radius");
  check(state.sidebarRadius === "6px", `Glass Sidebar applies saved radius (${state.sidebarRadius})`);

  await panel.getByRole("button", { name: "Vorige versie terugzetten" }).click();
  await panel.getByRole("button", { name: "Ja" }).click();
  await tab.waitForTimeout(300);
  state = await tab.evaluate(probe);
  check(state.sidebarRadius === "20px", `undo restores radius (${state.sidebarRadius})`);

  // Groups: add one, move an item into it with tap + "Hierheen", save.
  const editor = panel.locator("ss-groups-editor");
  await editor.getByRole("button", { name: "Groep toevoegen" }).click();
  await editor.getByRole("button", { name: /Overzicht/ }).click();
  await editor.getByRole("button", { name: "Hierheen" }).last().click();
  await panel.getByRole("button", { name: "Opslaan" }).click();
  await tab.waitForTimeout(300);
  state = await tab.evaluate(probe);
  check(state.visible.endsWith("# Nieuwe groep,lovelace"), `new group in Glass Sidebar (${state.visible})`);
  check(!state.panelText.includes("Verbergen"), "no hide buttons (Glass Sidebar can't hide items)");
  if (shots) await tab.screenshot({ path: `${shots}/editing.png` });
  await ctx.close();
}

// Themes: start from a preset, change things, save, show on the whole screen,
// make it the default, copy an existing theme, delete and restore.
{
  const { ctx, tab, panel, errors } = await open(1920, "", "Thema's");
  const themesTab = panel.locator("ss-themes-tab");
  let state = await tab.evaluate(probe);
  check(state.panelText.includes("Begin met"), "no themes yet: preset picker shown");

  await themesTab.locator('[data-preset="pink"]').click();
  await themesTab.getByRole("textbox", { name: "Naam", exact: true }).fill("Joyce");
  await themesTab.locator("summary", { hasText: "Bovenbalk" }).click();
  const headerField = themesTab
    .locator("details", { hasText: "Bovenbalk" })
    .getByRole("textbox", { name: "Achtergrond", exact: true })
    .first();
  await headerField.fill("#123456");
  await headerField.blur();
  await themesTab.getByRole("checkbox", { name: /Ook tonen op dit hele scherm/ }).check();
  await tab.waitForTimeout(100);
  state = await tab.evaluate(probe);
  check(state.rootPrimary === "#e8749e", `whole-screen preview sets --primary-color (${state.rootPrimary})`);

  await themesTab.getByRole("button", { name: "Opslaan" }).click();
  await tab.waitForTimeout(300);
  let saved = await tab.evaluate(() => window.__themes());
  check(saved.themes.length === 1 && saved.themes[0].name === "Joyce", "theme saved");
  check(saved.themes[0].vars["app-header-background-color"] === "#123456", "override written to vars");
  check(saved.themes[0].vars["primary-background-color"] === "#fbf1f4", "background untouched by header override");
  check(saved.themes[0].vars["bubble-pop-up-main-background-color"] === "#fffafc", "solid pop-up by default");
  state = await tab.evaluate(probe);
  check(state.rootPrimary === "", "whole-screen preview removed after save");

  await themesTab.getByRole("button", { name: "Standaard voor iedereen" }).click();
  await tab.waitForTimeout(200);
  saved = await tab.evaluate(() => window.__themes());
  check(saved.defaultTheme === "Joyce", "set as default theme");

  // Glass pop-ups give a see-through pop-up background.
  await themesTab.getByRole("radio", { name: "Glas" }).click();
  await themesTab.getByRole("button", { name: "Opslaan" }).click();
  await tab.waitForTimeout(300);
  saved = await tab.evaluate(() => window.__themes());
  check(
    saved.themes[0].vars["bubble-pop-up-main-background-color"].startsWith("rgba("),
    `glass pop-up (${saved.themes[0].vars["bubble-pop-up-main-background-color"]})`
  );

  // Copy the user's own Licht Warm file as a starting point.
  await themesTab.getByRole("button", { name: "Nieuw thema" }).click();
  await themesTab.locator("select").selectOption("Licht Warm");
  await themesTab.getByRole("button", { name: "Opslaan" }).click();
  await tab.waitForTimeout(300);
  saved = await tab.evaluate(() => window.__themes());
  check(
    saved.themes.map((t) => t.name).join() === "Joyce,Licht Warm (kopie)",
    `copied existing theme (${saved.themes.map((t) => t.name).join()})`
  );

  await themesTab.getByRole("button", { name: "Thema verwijderen" }).click();
  await themesTab.getByRole("button", { name: "Ja" }).click();
  await tab.waitForTimeout(300);
  saved = await tab.evaluate(() => window.__themes());
  check(saved.themes.length === 1, "deleted after confirm");
  await themesTab.getByRole("button", { name: "Vorige versie terugzetten" }).click();
  await themesTab.getByRole("button", { name: "Ja" }).click();
  await tab.waitForTimeout(300);
  saved = await tab.evaluate(() => window.__themes());
  check(saved.themes.length === 2, "restored after delete");
  check(errors.length === 0, `themes: no errors ${errors.join(" | ")}`);
  if (shots) await tab.screenshot({ path: `${shots}/themes.png`, fullPage: false });
  await ctx.close();
}

// Themes at phone width.
{
  const { ctx, tab, panel, errors } = await open(430, "", "Thema's");
  await panel.locator("ss-themes-tab").locator('[data-preset="sand"]').click();
  await tab.waitForTimeout(200);
  check(errors.length === 0, `themes on a phone: no errors ${errors.join(" | ")}`);
  if (shots) await tab.screenshot({ path: `${shots}/themes-430.png` });
  await ctx.close();
}

await browser.close();
server.close();
console.log(failures ? `${failures} failed` : "all passed");
process.exit(failures ? 1 : 0);
