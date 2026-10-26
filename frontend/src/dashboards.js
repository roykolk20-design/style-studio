// Reading and writing dashboards through Home Assistant's own Lovelace
// commands, with a backup in Style Studio before every save.

export const backupKey = (urlPath) =>
  (urlPath ?? "lovelace").toLowerCase().replace(/[^a-z0-9_-]+/g, "-").slice(0, 64);

/** Dashboards stored in the UI, which are the ones that can be changed. */
export async function listDashboards(hass, defaultTitle) {
  const dashboards = [];
  const main = hass.panels?.lovelace;
  dashboards.push({
    url_path: null,
    title: defaultTitle,
    editable: (main?.config?.mode ?? "storage") === "storage",
  });
  try {
    const list = await hass.callWS({ type: "lovelace/dashboards/list" });
    for (const item of list) {
      // Newer versions list the main dashboard too; it is already first.
      if (!item.url_path || item.url_path === "lovelace") continue;
      dashboards.push({
        url_path: item.url_path,
        title: item.title || item.url_path,
        editable: item.mode === "storage",
      });
    }
  } catch (err) {
    // Without the list only the main dashboard is offered.
  }
  return dashboards;
}

export async function loadDashboard(hass, urlPath) {
  return hass.callWS({ type: "lovelace/config", url_path: urlPath, force: false });
}

/** Back up the current config, then save the new one. */
export async function saveDashboard(hass, urlPath, oldConfig, newConfig) {
  await hass.callWS({
    type: "style_studio/backups/create",
    kind: "dashboards",
    key: backupKey(urlPath),
    data: { url_path: urlPath, config: oldConfig },
  });
  await hass.callWS({ type: "lovelace/config/save", url_path: urlPath, config: newConfig });
}

/**
 * Puts cards into a view and returns how many were replaced. A card that
 * `match` finds is replaced in place; others go into a section with the given
 * heading (sections views) or at the end (other views).
 */
export function placeCards(view, items, heading) {
  let replaced = 0;
  for (const { card, match } of items) {
    if (view.type === "sections") {
      view.sections ??= [];
      let done = false;
      for (const section of view.sections) {
        const index = (section.cards ?? []).findIndex(match);
        if (index !== -1) {
          section.cards[index] = card;
          replaced += 1;
          done = true;
          break;
        }
      }
      if (done) continue;
      let target = view.sections.find((section) =>
        (section.cards ?? []).some((c) => c.type === "heading" && c.heading === heading)
      );
      if (!target) {
        target = { type: "grid", cards: [{ type: "heading", heading }] };
        view.sections.push(target);
      }
      target.cards.push(card);
    } else {
      view.cards ??= [];
      const index = view.cards.findIndex(match);
      if (index !== -1) {
        view.cards[index] = card;
        replaced += 1;
      } else {
        view.cards.push(card);
      }
    }
  }
  return replaced;
}

// Custom cards are loaded by the dashboard, not by this panel; load the ones
// we need from the dashboard resources so the preview can use them.
export async function ensureCards(hass, names) {
  const missing = () => names.filter((name) => !customElements.get(name));
  if (!missing().length) return [];
  try {
    const resources = await hass.callWS({ type: "lovelace/resources" });
    for (const resource of resources) {
      if (!missing().some((name) => resource.url.includes(name.replace(/^hui-/, "")))) continue;
      if (resource.type === "module") {
        await import(/* @vite-ignore */ resource.url).catch(() => {});
      } else {
        await new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = resource.url;
          script.onload = script.onerror = resolve;
          document.head.append(script);
        });
      }
    }
  } catch (err) {
    // No resources (YAML mode); the preview falls back to a drawing.
  }
  await Promise.race([
    Promise.all(names.map((name) => customElements.whenDefined(name))),
    new Promise((resolve) => setTimeout(resolve, 3000)),
  ]);
  return missing();
}

/** A real Home Assistant card element, or null outside Home Assistant. */
export async function createCard(hass, config) {
  const helpers = await window.loadCardHelpers?.().catch(() => null);
  if (!helpers) return null;
  const element = helpers.createCardElement(config);
  element.hass = hass;
  return element;
}
