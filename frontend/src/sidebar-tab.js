import { html, nothing } from "lit";
import "./groups-editor.js";
import "./sidebar-preview.js";
import { TabBase } from "./tab-base.js";

// HA always shows these at the bottom; they can't be grouped.
const FIXED_PANELS = new Set(["config", "profile", "notfound"]);

const clone = (value) => (value == null ? value : JSON.parse(JSON.stringify(value)));
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

// "1.10.0" > "1.9.2"; anything unparsable counts as new enough.
function olderThan(version, minimum) {
  const parse = (v) => String(v).split(".").map((part) => parseInt(part, 10) || 0);
  const [a, b] = [parse(version), parse(minimum)];
  for (let i = 0; i < Math.max(a.length, b.length); i += 1) {
    if ((a[i] ?? 0) !== (b[i] ?? 0)) return (a[i] ?? 0) < (b[i] ?? 0);
  }
  return false;
}

/** Sets up Glass Sidebar, which does the actual styling of the sidebar. */
class SidebarTab extends TabBase {
  static properties = {
    ...TabBase.properties,
    glass: { attribute: false },
    _draft: { state: true },
    _device: { state: true },
    _page: { state: true },
    _expanded: { state: true },
    _haSidebar: { state: true },
  };

  constructor() {
    super();
    this._draft = null;
    this._device = window.innerWidth <= 600 ? "phone" : window.innerWidth <= 870 ? "tablet" : "desktop";
    this._page = "light";
    this._expanded = true;
    this._haSidebar = {};
  }

  connectedCallback() {
    super.connectedCallback();
    this.hass
      .callWS({ type: "frontend/get_user_data", key: "sidebar" })
      .then((result) => (this._haSidebar = result?.value ?? {}))
      .catch(() => {});
  }

  willUpdate(changed) {
    if (changed.has("glass")) this._draft = clone(this.glass?.sidebar ?? null);
  }

  get dirty() {
    return this._draft !== null && !same(this._draft, this.glass?.sidebar ?? null);
  }

  _set(key, value) {
    this._edit({ [key]: value });
  }

  _edit(changes) {
    this._draft = { ...this._draft, ...changes };
    this._toast = null;
  }

  _reload() {
    this.dispatchEvent(new CustomEvent("reload"));
  }

  _save() {
    this._run(async () => {
      await this.hass.callWS({ type: "style_studio/sidebar/save", sidebar: this._draft });
      this._reload();
    }, this.t("saved"));
  }

  _undo() {
    this._ask(this.t("undo_confirm"), () =>
      this._run(async () => {
        const { restored } = await this.hass.callWS({ type: "style_studio/sidebar/undo" });
        if (!restored) throw new Error(this.t("nothing_to_undo"));
        this._reload();
      }, this.t("undone"))
    );
  }

  // Panels as the sidebar shows them, in the user's own HA order.
  _items() {
    const order = this._haSidebar.panelOrder ?? [];
    const hiddenInHa = new Set(this._haSidebar.hiddenPanels ?? []);
    const rank = (path) => {
      const index = order.indexOf(path);
      return index === -1 ? order.length : index;
    };
    return Object.values(this.hass.panels ?? {})
      .filter(
        (panel) =>
          (panel.title || panel.url_path === "lovelace") &&
          !FIXED_PANELS.has(panel.url_path) &&
          !hiddenInHa.has(panel.url_path)
      )
      .map((panel) => ({
        path: panel.url_path,
        icon: panel.icon || "mdi:view-dashboard",
        title: this._panelTitle(panel),
      }))
      .sort(
        (a, b) =>
          rank(a.path) - rank(b.path) ||
          (b.path === "lovelace") - (a.path === "lovelace") ||
          a.title.localeCompare(b.title)
      );
  }

  _panelTitle(panel) {
    if (!panel.title) return this.hass.localize("panel.states") || "Overview";
    // Built-in panels carry a translation key such as "energy".
    return this.hass.localize(`panel.${panel.title}`) || panel.title;
  }

  render() {
    const glass = this.glass;
    if (!glass) return nothing;
    if (!glass.version && !glass.added) {
      return html`<div class="card">
        <h2>${this.t("glass_missing_title")}</h2>
        <p class="hint">${this.t("glass_missing")}</p>
      </div>`;
    }
    if (!glass.added || !this._draft) {
      return html`<div class="card">
        <h2>${this.t("glass_not_added_title")}</h2>
        <p class="hint">${this.t("glass_not_added")}</p>
      </div>`;
    }

    const s = this._draft;
    return html`
      <p class="intro">${this.t("glass_intro")}</p>
      ${glass.version && olderThan(glass.version, glass.min_version)
        ? this._warning(this.t("glass_old", { version: glass.version, min: glass.min_version }))
        : nothing}
      ${glass.loaded ? nothing : this._warning(this.t("glass_not_loaded"))}
      <div class="layout">
        <div class="settings">
          <div class="card">
            <h2>${this.t("shape")}</h2>
            ${this._switch(s, "floating", this.t("floating"), this.t("floating_hint"))}
            ${this._slider(s, "inset", this.t("inset"), 0, 24, "px", !s.floating)}
            ${this._slider(s, "radius", this.t("radius"), 0, 32, "px", !s.floating)}
          </div>

          <div class="card">
            <h2>${this.t("glass")}</h2>
            ${this._slider(s, "blur", this.t("blur"), 0, 40, "px")}
            ${this._slider(s, "opacity", this.t("opacity"), 40, 100, "%", false, this.t("opacity_hint"))}
            ${this._switch(s, "glass_cards", this.t("glass_cards"), this.t("glass_cards_hint"))}
          </div>

          <div class="card">
            <h2>${this.t("active")}</h2>
            ${this._segment(s, "highlight", [
              ["soft", this.t("highlight_soft")],
              ["vivid", this.t("highlight_vivid")],
            ])}
            <label class="row">
              <span>
                ${this.t("own_accent")}
                <small>${this.t("own_accent_hint")}</small>
              </span>
              <span class="inline">
                ${s.accent
                  ? html`<input
                      type="color"
                      .value=${s.accent}
                      @input=${(ev) => this._set("accent", ev.target.value)}
                    />`
                  : nothing}
                <input
                  type="checkbox"
                  class="switch"
                  .checked=${Boolean(s.accent)}
                  @change=${(ev) => this._set("accent", ev.target.checked ? "#f59e0b" : null)}
                />
              </span>
            </label>
            ${this._switch(s, "hover_motion", this.t("motion"))}
          </div>

          <div class="card">
            <h2>${this.t("phone")}</h2>
            <p class="hint">${this.t("phone_hint")}</p>
            ${this._slider(s, "mobile_width", this.t("mobile_width"), 240, 360, "px")}
            ${this._slider(s, "mobile_text_size", this.t("mobile_text_size"), 12, 20, "px")}
            ${this._switch(s, "mobile_blur", this.t("mobile_blur"))}
          </div>

          <div class="card">
            <h2>${this.t("groups")}</h2>
            <p class="hint">${this.t("groups_hint")}</p>
            <ss-groups-editor
              .items=${this._items()}
              .categories=${s.categories}
              .t=${this.t}
              @change=${(ev) => this._edit(ev.detail)}
            ></ss-groups-editor>
          </div>
        </div>

        <aside class="card preview">
          <h2>${this.t("preview")}</h2>
          <p class="hint">${this.t("preview_hint")}</p>
          <div class="segment small">
            ${["phone", "tablet", "desktop"].map(
              (device) => html`<button
                class=${device === this._device ? "active" : ""}
                @click=${() => (this._device = device)}
              >
                ${this.t(`device_${device}`)}
                <small>${{ phone: 430, tablet: 768, desktop: 1920 }[device]}</small>
              </button>`
            )}
          </div>
          <div class="segment small">
            ${["light", "dark"].map(
              (page) => html`<button
                class=${page === this._page ? "active" : ""}
                @click=${() => (this._page = page)}
              >
                ${this.t(`page_${page}`)}
              </button>`
            )}
            ${this._device === "desktop"
              ? html`<button
                  class=${this._expanded ? "active" : ""}
                  @click=${() => (this._expanded = !this._expanded)}
                >
                  ${this.t("expanded")}
                </button>`
              : nothing}
          </div>
          <ss-sidebar-preview
            .settings=${s}
            .items=${this._items()}
            .device=${this._device}
            .page=${this._page}
            .expanded=${this._expanded}
            .settingsLabel=${this.hass.localize("panel.config") || "Settings"}
          ></ss-sidebar-preview>
        </aside>
      </div>
      ${this._bar({
        left: glass.history
          ? html`<button ?disabled=${this._busy} @click=${this._undo}>
              <ha-icon icon="mdi:history"></ha-icon>${this.t("undo")}
            </button>`
          : nothing,
        onCancel: () => (this._draft = clone(this.glass.sidebar)),
        onSave: () => this._save(),
      })}
    `;
  }
}

if (!customElements.get("ss-sidebar-tab")) {
  customElements.define("ss-sidebar-tab", SidebarTab);
}
