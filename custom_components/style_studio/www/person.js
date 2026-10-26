// Style Studio, per person: applies the theme and sidebar the admin picked for
// the user who is logged in, and reports what this device uses.
// The sidebar's look is Glass Sidebar's job; this only sets HA's own order.
(() => {
  // Keep in sync with const.py and manifest.json.
  const VERSION = "0.5.1";

  if (window.__styleStudio) return;
  window.__styleStudio = { version: VERSION };

  const deviceKey = "style-studio-device";
  const appliedKey = (userId, what) => `style-studio-applied-${what}-${userId}`;

  const storage = {
    get(key) {
      try {
        return localStorage.getItem(key);
      } catch (err) {
        return null;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(key, value);
      } catch (err) {
        // Blocked storage only means the setting is applied again next time.
      }
    },
  };

  function deviceId() {
    let id = storage.get(deviceKey);
    if (!id) {
      id = Math.random().toString(36).slice(2, 12).padEnd(10, "0");
      storage.set(deviceKey, id);
    }
    return id;
  }

  const root = () => document.querySelector("home-assistant");

  async function report() {
    const hass = root()?.hass;
    if (!hass) return;
    let sidebar = null;
    try {
      sidebar = (await hass.callWS({ type: "frontend/get_user_data", key: "sidebar" }))?.value ?? null;
    } catch (err) {
      // Older versions have no server-side sidebar data.
    }
    hass
      .callWS({
        type: "style_studio/person/report",
        device: deviceId(),
        version: VERSION,
        // The Companion app adds "Home Assistant/" to its user agent.
        app: /Home ?Assistant\//i.test(navigator.userAgent),
        theme: hass.selectedTheme?.theme ?? null,
        sidebar: sidebar
          ? { panelOrder: sidebar.panelOrder ?? [], hiddenPanels: sidebar.hiddenPanels ?? [] }
          : null,
      })
      .catch(() => {});
  }

  // Each setting is applied once per device after it changes, so the person
  // can still choose something else in their profile.
  async function apply(config) {
    window.__styleStudio.serverVersion = config.version;
    const hass = root()?.hass;
    const userId = hass?.user?.id;
    if (!userId) return;

    if (config.theme && config.theme_updated) {
      const key = appliedKey(userId, "theme");
      if (storage.get(key) !== config.theme_updated) {
        root().dispatchEvent(new CustomEvent("settheme", { detail: { theme: config.theme } }));
        storage.set(key, config.theme_updated);
      }
    }

    if (config.sidebar && config.sidebar_updated) {
      const key = appliedKey(userId, "sidebar");
      if (storage.get(key) !== config.sidebar_updated) {
        try {
          await hass.callWS({ type: "frontend/set_user_data", key: "sidebar", value: config.sidebar });
          storage.set(key, config.sidebar_updated);
        } catch (err) {
          console.warn("Style Studio: could not set the sidebar order", err);
        }
      }
    }

    // Let HA settle first, so the report shows the result.
    setTimeout(report, 1500);
  }

  function start() {
    const hass = root()?.hass;
    if (!hass?.connection || !hass.user) {
      setTimeout(start, 500);
      return;
    }
    hass.connection
      .subscribeMessage(apply, { type: "style_studio/person/subscribe" })
      .catch((err) => console.warn("Style Studio: could not load personal settings", err));
  }

  start();
})();
