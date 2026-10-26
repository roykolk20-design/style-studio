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
    panelText: panel.shadowRoot?.textContent.replace(/\s+/g, " ") ?? "",
    hasPreview: Boolean(panel.shadowRoot?.querySelector("ss-sidebar-preview")?.shadowRoot?.querySelector(".sidebar")),
  };
};

async function open(width, query = "") {
  const ctx = await browser.newContext({ viewport: { width, height: width < 800 ? 900 : 1000 } });
  const tab = await ctx.newPage();
  const errors = [];
  tab.on("pageerror", (err) => errors.push(err.message));
  tab.on("console", (msg) => {
    if (msg.type() === "error" && !msg.location().url.endsWith("favicon.ico")) errors.push(msg.text());
  });
  await tab.goto(`${base}${query}`);
  await tab.waitForTimeout(600);
  return { ctx, tab, errors, panel: tab.locator("style-studio-panel") };
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
  ["missing", "Glass Sidebar is niet geïnstalleerd"],
  ["not-added", "Glass Sidebar is nog niet toegevoegd"],
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

await browser.close();
server.close();
console.log(failures ? `${failures} failed` : "all passed");
process.exit(failures ? 1 : 0);
