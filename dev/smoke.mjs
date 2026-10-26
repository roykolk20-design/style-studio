// Loads dev/harness.html in Edge at phone, tablet and desktop width, with a
// light and a dark page, and checks the panel together with Glass Sidebar.
// Run: node dev/smoke.mjs [screenshot folder]
import { chromium } from "playwright-core";
import { server } from "./serve.mjs";

async function preset(themesTab, key) {
  if (!(await themesTab.locator(`[data-preset="${key}"]`).count())) {
    await themesTab.getByRole("button", { name: "Nieuw thema" }).click();
  }
  await themesTab.locator(`[data-preset="${key}"]`).click();
}

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
  const ready = {
    "Thema's": "ss-themes-tab .intro",
    "Per persoon": "ss-people-tab .intro",
    Klimaat: "ss-climate-tab .intro",
    "Kamers en pop-ups": "ss-rooms-tab .intro",
    "Controle en herstel": "ss-check-tab .intro",
  };
  await panel.locator(ready[tabName] ?? "ss-sidebar-tab .card").first().waitFor();
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

// The Save bar must be on screen without scrolling, at the top of a long
// page too: Home Assistant cuts off a panel that doesn't scroll by itself.
async function saveBarOnScreen(tab, panel) {
  const button = panel.getByRole("button", { name: "Opslaan" });
  const box = await button.boundingBox();
  const viewport = tab.viewportSize();
  return Boolean(box) && box.y >= 0 && box.y + box.height <= viewport.height;
}

for (const width of [430, 1920]) {
  const { ctx, tab, panel } = await open(width, "", "Zijbalk");
  await panel.locator('input[type="range"]').nth(1).fill("6");
  await tab.waitForTimeout(100);
  check(await saveBarOnScreen(tab, panel), `${width}px: Save bar on screen after a change`);
  // A person scrolls with the wheel; the groups card at the bottom must come into view.
  await tab.mouse.move(width / 2, 400);
  for (let i = 0; i < 15; i += 1) await tab.mouse.wheel(0, 600);
  await tab.waitForTimeout(300);
  const groups = await panel.locator("ss-groups-editor").boundingBox();
  check(Boolean(groups) && groups.y < tab.viewportSize().height, `${width}px: wheel scrolls the panel`);
  const themes = await open(width, "", "Thema's");
  await preset(themes.panel.locator("ss-themes-tab"), "sand");
  await themes.tab.waitForTimeout(100);
  check(await saveBarOnScreen(themes.tab, themes.panel), `${width}px: theme Save bar on screen`);
  await ctx.close();
  await themes.ctx.close();
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
  check(
    (await themesTab.getByRole("textbox", { name: "Naam", exact: true }).inputValue()) === "Licht Warm (kopie)",
    "first time: starts from the theme in use"
  );
  check(!state.panelText.includes("Niet opgeslagen"), "that start doesn't count as a change");
  check(state.panelText.includes("kleuren komen vast uit het gekopieerde thema"), "fixed colors explained");

  await preset(themesTab, "pink");
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

  await themesTab.getByRole("button", { name: "Voor mij gebruiken" }).click();
  await tab.waitForTimeout(100);
  check((await tab.evaluate(() => window.__appliedTheme)) === "Joyce", "use for me applies the theme here");

  // With unsaved changes, "Nieuw thema" asks right below the buttons.
  await themesTab.getByRole("radio", { name: "Sterk" }).click();
  await themesTab.getByRole("button", { name: "Nieuw thema" }).click();
  const question = themesTab.getByRole("alert");
  const box = await question.boundingBox();
  check(Boolean(box) && box.y + box.height <= tab.viewportSize().height, "leave question shown where you click");
  await question.getByRole("button", { name: "Ja" }).click();
  state = await tab.evaluate(probe);
  check(state.panelText.includes("Begin met"), "new theme picker after confirming");
  await themesTab.locator(".chip", { hasText: "Joyce" }).click();

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

// Per person: Roy (logged in here) gets Joyce's sidebar and the pink theme;
// the runtime in this browser applies both.
{
  const { ctx, tab, panel, errors } = await open(1920, "", "Per persoon");
  const people = panel.locator("ss-people-tab");
  let state = await tab.evaluate(probe);
  check(state.panelText.includes("Gebruikt nu: Licht Roze"), "Joyce's reported theme shown");

  await people.getByRole("combobox", { name: "Thema (Roy)" }).selectOption("Licht Roze");
  await people.getByRole("combobox", { name: /Zijbalk.*\(Roy\)/ }).selectOption({ label: "Zoals Joyce nu" });
  await people.getByRole("button", { name: "Opslaan" }).click();
  await tab.waitForTimeout(2500);
  const result = await tab.evaluate(() => window.__people());
  check(result.persons["8faf3d60"]?.theme === "Licht Roze", "theme saved for Roy");
  check(result.appliedTheme === "Licht Roze", `runtime applied theme (${result.appliedTheme})`);
  check(
    JSON.stringify(result.userSidebar) === JSON.stringify({ panelOrder: ["lovelace", "map"], hiddenPanels: ["logbook", "history"] }),
    `runtime applied sidebar (${JSON.stringify(result.userSidebar)})`
  );
  const roy = Object.values(result.reports).find((r) => r.user_id === "8faf3d60");
  check(roy?.theme === "Licht Roze" && roy.version, "runtime reported back");

  // Copy everything from Joyce to... Joyce can't copy from herself; copy Roy to Joyce.
  await people.getByRole("combobox", { name: "Alles kopiëren van (Joyce)" }).selectOption("8faf3d60");
  await people.getByRole("button", { name: "Opslaan" }).click();
  await tab.waitForTimeout(300);
  const after = await tab.evaluate(() => window.__people());
  check(after.persons["3a122b8e"]?.theme === "Licht Roze", "copy everything to Joyce");

  await people.getByRole("button", { name: "Vorige versie terugzetten" }).click();
  await people.getByRole("button", { name: "Ja" }).click();
  await tab.waitForTimeout(300);
  const undone = await tab.evaluate(() => window.__people());
  check(!undone.persons["3a122b8e"], "undo removes Joyce's settings again");
  check(errors.length === 0, `people: no errors ${errors.join(" | ")}`);
  if (shots) await tab.screenshot({ path: `${shots}/people.png` });
  await ctx.close();
}

// Climate: options, preview, and putting the pop-up on a dashboard.
{
  const { ctx, tab, panel, errors } = await open(1920, "", "Klimaat");
  const climate = panel.locator("ss-climate-tab");
  const preview = climate.locator("ss-card-preview");
  await climate.getByRole("button", { name: "LG Woonkamer" }).click();
  check((await climate.getByRole("textbox", { name: "Naam" }).inputValue()) === "Airco woonkamer", "name from the room");
  check((await climate.getByRole("textbox", { name: /Adres/ }).inputValue()) === "#airco-woonkamer", "address from the room");
  check((await preview.locator(".button.active").allInnerTexts()).some((t) => t.includes("Koel")), "current mode is active in preview");
  check((await preview.locator(".button.active").allInnerTexts()).some((t) => t.includes("Links/rechts")), "horizontal swing on");
  check((await preview.getByText("21°", { exact: true }).count()) === 1, "target temperature shown");
  check((await preview.getByText("Droog", { exact: true }).count()) === 1, "dry mode in preview before unchecking");

  await climate.getByRole("checkbox", { name: "Droog" }).uncheck();
  check((await preview.getByText("Droog", { exact: true }).count()) === 0, "unchecked mode leaves the preview");

  await climate.getByRole("button", { name: "Op dashboard zetten" }).click();
  await climate.getByRole("button", { name: "Ja" }).click();
  await tab.waitForTimeout(300);
  let lovelace = await tab.evaluate(() => window.__lovelace());
  const cards = lovelace.dashboards.__main.views[0].sections.flatMap((section) => section.cards);
  const popup = cards.find((c) => c.type === "vertical-stack" && c.cards[0].hash === "#airco-woonkamer");
  check(Boolean(popup), "pop-up on the dashboard");
  check(cards.some((c) => c.card_type === "button" && c.tap_action?.navigation_path === "#airco-woonkamer"), "opener button on the dashboard");
  check(lovelace.backups.length === 1 && lovelace.backups[0].data.config.views[0].sections.length === 1, "backup of the old dashboard");
  check(!JSON.stringify(popup).includes('"dry"'), "dry mode left out");

  // Again: replaced, not doubled.
  await climate.getByRole("button", { name: "Op dashboard zetten" }).click();
  await climate.getByRole("button", { name: "Ja" }).click();
  await tab.waitForTimeout(300);
  lovelace = await tab.evaluate(() => window.__lovelace());
  const again = lovelace.dashboards.__main.views[0].sections.flatMap((section) => section.cards);
  check(again.filter((c) => c.type === "vertical-stack").length === 1, "second time replaces the pop-up");

  // The other air conditioner has no fan modes or swing.
  await climate.getByRole("button", { name: "Slaapkamer" }).click();
  check((await climate.getByText(/geen ventilatorstanden/).count()) === 1, "missing fan explained");

  // A panel-mode view can't take extra cards.
  await climate.getByRole("combobox", { name: "Dashboard" }).selectOption({ label: "Plattegrond" });
  await tab.waitForTimeout(200);
  check(await climate.getByRole("button", { name: "Op dashboard zetten" }).isDisabled(), "panel view refused");
  check(errors.length === 0, `climate: no errors ${errors.join(" | ")}`);
  if (shots) await tab.screenshot({ path: `${shots}/climate.png` });
  await ctx.close();
}

// Rooms: tiles per floor from areas, pop-ups with lights, a new view.
{
  const { ctx, tab, panel, errors } = await open(1920, "", "Kamers en pop-ups");
  const rooms = panel.locator("ss-rooms-tab");
  const floorText = async (name) => (await rooms.locator(`.floor[data-floor="${name}"]`).allInnerTexts()).join(" ");
  check((await rooms.locator(".floor").count()) === 3, "one card per floor");
  check((await rooms.locator('.floor[data-floor="Begane grond"] input[aria-label="Naam"]').count()) === 2, "living room and kitchen on the ground floor");
  check((await floorText("Begane grond")).includes("2 lampen"), "lights found per area");
  check((await floorText("Begane grond")).includes("#airco-woonkamer"), "air conditioning button links to the climate pop-up");

  const preview = rooms.locator("aside");
  check((await preview.getByText("1 aan").count()) === 2, "tiles count lights that are on");
  await rooms.locator(".pick", { hasText: "Woonkamer" }).click();
  check((await preview.getByText("Plafondlamp").count()) === 1, "pop-up shows the room's lights");
  check((await preview.getByText("Airco", { exact: true }).count()) === 1, "pop-up has the air conditioning button");

  await rooms.getByRole("checkbox", { name: "Meenemen Zolder" }).uncheck();
  check(
    (await preview.locator(".floor-name").allTextContents()).join() === "Begane grond,1e verdieping",
    "left-out room leaves the preview"
  );

  await rooms.getByRole("button", { name: "Weergave maken" }).click();
  await rooms.getByRole("button", { name: "Ja" }).click();
  await tab.waitForTimeout(300);
  let lovelace = await tab.evaluate(() => window.__lovelace());
  const view = lovelace.dashboards.__main.views.find((v) => v.path === "kamers");
  check(Boolean(view) && view.type === "sections" && view.max_columns === 2, `view made with a column per floor (${view?.max_columns})`);
  const cards = view.sections.flatMap((section) => section.cards);
  check(cards.some((c) => c.tap_action?.navigation_path === "#l-woonkamer"), "tile opens #l-woonkamer");
  const popup = cards.find((c) => c.type === "vertical-stack" && c.cards[0].hash === "#l-woonkamer");
  check(popup?.cards.filter((c) => c.type === "tile").length === 2, "pop-up with both lights");
  check(!JSON.stringify(view).includes("#l-zolder"), "left-out room not in the view");
  check(lovelace.dashboards.__main.views.length === 3, "other views kept");
  const backups = lovelace.backups.length;

  await rooms.getByRole("button", { name: "Weergave maken" }).click();
  check((await rooms.getByText(/bestaat al en wordt vervangen/).count()) === 1, "asks before replacing");
  await rooms.getByRole("button", { name: "Ja" }).click();
  await tab.waitForTimeout(300);
  lovelace = await tab.evaluate(() => window.__lovelace());
  check(lovelace.dashboards.__main.views.length === 3 && lovelace.backups.length === backups + 1, "replaced with a new backup");
  check(errors.length === 0, `rooms: no errors ${errors.join(" | ")}`);
  if (shots) await tab.screenshot({ path: `${shots}/rooms.png` });
  await ctx.close();
}

// Check and restore: conflicts, fixed styles in dashboards, backups.
{
  const { ctx, tab, panel, errors } = await open(1920, "", "Controle en herstel");
  const checkTab = panel.locator("ss-check-tab");
  check((await checkTab.getByText(/card-mod de zijbalk/).count()) === 1, "card-mod sidebar theme flagged");
  check((await checkTab.getByText(/Joyce · Companion-app · 0.1.0/).count()) === 1, "old app version flagged per device");

  // Browser Mod's leftover setting in this browser.
  await tab.evaluate(() => localStorage.setItem("isDefaultPanelManaged", "true"));
  await checkTab.getByRole("button", { name: "Opnieuw controleren" }).click();
  await checkTab.getByRole("button", { name: "Oplossen" }).click();
  await checkTab.getByRole("button", { name: "Ja" }).click();
  check((await tab.evaluate(() => localStorage.getItem("isDefaultPanelManaged"))) === null, "Browser Mod conflict fixed");

  await checkTab.getByRole("button", { name: "Dashboards doorzoeken" }).click();
  await tab.waitForTimeout(300);
  check((await checkTab.getByText("var(--primary-color, #D99A1E)").count()) === 1, "fixed color mapped to the theme color");
  check((await checkTab.getByText("var(--ha-card-border-radius, 24px)").count()) === 1, "fixed corner mapped to the card radius");
  check((await checkTab.getByText("geen themakleur met deze waarde").count()) === 1, "unknown color left alone");
  await checkTab.getByRole("button", { name: "Gekozen voorstellen toepassen" }).first().click();
  await checkTab.getByRole("button", { name: "Ja" }).click();
  await tab.waitForTimeout(500);
  let lovelace = await tab.evaluate(() => window.__lovelace());
  const energy = JSON.stringify(lovelace.dashboards.__main.views[1]);
  check(energy.includes("var(--primary-color, #D99A1E)") && energy.includes("var(--ha-card-border-radius, 24px)"), "suggestions applied");
  check(energy.includes("#123456"), "color without suggestion kept");
  check(lovelace.backups.length === 1, "backup before applying");

  await checkTab.locator("details", { hasText: "Dashboards" }).getByRole("button", { name: "Terugzetten" }).first().click();
  await checkTab.getByRole("button", { name: "Ja" }).click();
  await tab.waitForTimeout(500);
  lovelace = await tab.evaluate(() => window.__lovelace());
  check(!JSON.stringify(lovelace.dashboards.__main).includes("var(--primary-color"), "dashboard backup restored");
  check(errors.length === 0, `check: no errors ${errors.join(" | ")}`);
  if (shots) await tab.screenshot({ path: `${shots}/check.png` });
  await ctx.close();
}

// Themes at phone width.
{
  const { ctx, tab, panel, errors } = await open(430, "", "Thema's");
  await preset(panel.locator("ss-themes-tab"), "sand");
  await tab.waitForTimeout(200);
  check(errors.length === 0, `themes on a phone: no errors ${errors.join(" | ")}`);
  if (shots) await tab.screenshot({ path: `${shots}/themes-430.png` });
  await ctx.close();
}

await browser.close();
server.close();
console.log(failures ? `${failures} failed` : "all passed");
process.exit(failures ? 1 : 0);
