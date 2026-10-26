import { LitElement, css, html, nothing } from "lit";
import "./groups-editor.js";
import "./sidebar-preview.js";
import { translator } from "./strings.js";
import { VERSION } from "./version.js";

// HA always shows these at the bottom; they can't be grouped.
const FIXED_PANELS = new Set(["config", "profile", "notfound"]);
const TABS = ["sidebar", "themes", "rooms", "climate", "people", "check"];

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

class StudioPanel extends LitElement {
  static properties = {
    hass: { attribute: false },
    narrow: { type: Boolean },
    panel: { attribute: false },
    _data: { state: true },
    _draft: { state: true },
    _tab: { state: true },
    _device: { state: true },
    _page: { state: true },
    _expanded: { state: true },
    _busy: { state: true },
    _toast: { state: true },
    _confirm: { state: true },
    _haSidebar: { state: true },
  };

  constructor() {
    super();
    this._draft = null;
    this._tab = "sidebar";
    this._device = "desktop";
    this._page = "light";
    this._expanded = true;
    this._busy = false;
    this._confirm = null;
    this._haSidebar = {};
  }

  get t() {
    return translator(this.hass);
  }

  willUpdate(changed) {
    if (changed.has("hass") && this.hass && !this._loading) {
      this._loading = this._load();
      // Start with the preview that matches this screen.
      if (window.innerWidth <= 600) this._device = "phone";
      else if (this.narrow) this._device = "tablet";
    }
  }

  async _load() {
    try {
      const [data, haSidebar] = await Promise.all([
        this.hass.callWS({ type: "style_studio/get" }),
        this.hass
          .callWS({ type: "frontend/get_user_data", key: "sidebar" })
          .then((result) => result?.value ?? {})
          .catch(() => ({})),
      ]);
      this._data = data;
      this._haSidebar = haSidebar;
      this._draft = clone(this._saved);
    } catch (err) {
      this._showToast(this.t("error", { message: err.message ?? err }));
    }
  }

  get _glass() {
    return this._data.glass_sidebar;
  }

  // Glass Sidebar's stored settings; null when it isn't added.
  get _saved() {
    return this._data?.glass_sidebar.sidebar ?? null;
  }

  get _dirty() {
    return this._draft !== null && !same(this._draft, this._saved);
  }

  _set(key, value) {
    this._edit({ [key]: value });
  }

  _edit(changes) {
    this._draft = { ...this._draft, ...changes };
    this._toast = null;
  }

  _ask(text, action) {
    this._confirm = { text, action };
  }

  _pickTab(tab) {
    if (tab === this._tab) return;
    const go = () => {
      this._tab = tab;
      this._draft = clone(this._saved);
    };
    if (this._dirty) this._ask(this.t("discard_confirm"), go);
    else go();
  }

  async _run(work, done) {
    this._busy = true;
    try {
      await work();
      await this._load();
      if (done) this._showToast(done);
    } catch (err) {
      this._showToast(this.t("error", { message: err.message ?? err }));
    } finally {
      this._busy = false;
    }
  }

  _save() {
    this._run(
      () => this.hass.callWS({ type: "style_studio/sidebar/save", sidebar: this._draft }),
      this.t("saved")
    );
  }

  _undo() {
    this._ask(this.t("undo_confirm"), () =>
      this._run(async () => {
        const { restored } = await this.hass.callWS({ type: "style_studio/sidebar/undo" });
        if (!restored) throw new Error(this.t("nothing_to_undo"));
      }, this.t("undone"))
    );
  }

  _showToast(text) {
    this._toast = text;
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => (this._toast = null), 4000);
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
    return html`
      <div class="toolbar">
        ${this.narrow
          ? html`<button class="icon" @click=${this._toggleMenu} aria-label="Menu">
              <ha-icon icon="mdi:menu"></ha-icon>
            </button>`
          : nothing}
        <h1>${this.t("title")}</h1>
      </div>
      <main>
        ${this._data ? this._content() : nothing}
      </main>
      ${this._data ? this._actionBar() : nothing}
    `;
  }

  _toggleMenu() {
    this.dispatchEvent(new Event("hass-toggle-menu", { bubbles: true, composed: true }));
  }

  _content() {
    return html`
      ${this._data.version !== VERSION
        ? this._warning(this.t("warn_old_panel", { old: VERSION, new: this._data.version }))
        : nothing}
      <nav class="tabs">
        ${TABS.map(
          (tab) => html`<button
            class=${tab === this._tab ? "active" : ""}
            @click=${() => this._pickTab(tab)}
          >
            ${this.t(`tab_${tab}`)}
          </button>`
        )}
      </nav>
      ${this._tab === "sidebar"
        ? this._sidebarTab()
        : html`<div class="card coming">${this.t("coming")}</div>`}
    `;
  }

  _warning(text) {
    return html`<div class="warning"><ha-icon icon="mdi:alert-outline"></ha-icon>${text}</div>`;
  }

  _sidebarTab() {
    const glass = this._glass;
    if (!glass.version && !glass.added) {
      return html`<div class="card">
        <h2>${this.t("glass_missing_title")}</h2>
        <p class="hint">${this.t("glass_missing")}</p>
      </div>`;
    }
    if (!glass.added) {
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
    `;
  }

  _switch(s, key, label, hint) {
    return html`
      <label class="row">
        <span>
          ${label}
          ${hint ? html`<small>${hint}</small>` : nothing}
        </span>
        <input
          type="checkbox"
          class="switch"
          .checked=${s[key]}
          @change=${(ev) => this._set(key, ev.target.checked)}
        />
      </label>
    `;
  }

  _slider(s, key, label, min, max, unit, disabled = false, hint) {
    return html`
      <label class="row slider ${disabled ? "off" : ""}">
        <span>
          ${label}
          ${hint ? html`<small>${hint}</small>` : nothing}
        </span>
        <span class="inline">
          <input
            type="range"
            min=${min}
            max=${max}
            step="1"
            .value=${String(s[key])}
            ?disabled=${disabled}
            @input=${(ev) => this._set(key, Number(ev.target.value))}
          />
          <output>${s[key]}${unit}</output>
        </span>
      </label>
    `;
  }

  _segment(s, key, options) {
    return html`
      <div class="segment" role="radiogroup">
        ${options.map(
          ([value, label]) => html`<button
            role="radio"
            aria-checked=${s[key] === value ? "true" : "false"}
            class=${s[key] === value ? "active" : ""}
            @click=${() => this._set(key, value)}
          >
            ${label}
          </button>`
        )}
      </div>
    `;
  }

  _actionBar() {
    if (this._confirm) {
      const { text, action } = this._confirm;
      return html`
        <footer class="bar">
          <span class="grow">${text}</span>
          <button @click=${() => (this._confirm = null)}>${this.t("no")}</button>
          <button
            class="primary"
            @click=${() => {
              this._confirm = null;
              action();
            }}
          >
            ${this.t("yes")}
          </button>
        </footer>
      `;
    }
    const history = this._tab === "sidebar" && this._glass.added ? this._glass.history : 0;
    // On a phone an empty bar would only take space.
    if (!history && !this._toast && !this._dirty) return nothing;
    return html`
      <footer class="bar">
        ${history
          ? html`<button ?disabled=${this._busy} @click=${this._undo}>
              <ha-icon icon="mdi:history"></ha-icon>${this.t("undo")}
            </button>`
          : nothing}
        <span class="grow">${this._toast ?? (this._dirty ? this.t("unsaved") : "")}</span>
        ${this._dirty
          ? html`
              <button ?disabled=${this._busy} @click=${() => (this._draft = clone(this._saved))}>
                ${this.t("cancel")}
              </button>
              <button class="primary" ?disabled=${this._busy} @click=${this._save}>
                ${this.t("save")}
              </button>
            `
          : nothing}
      </footer>
    `;
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      background: var(--primary-background-color);
      color: var(--primary-text-color);
      font-family: var(--ha-font-family-body, Roboto, sans-serif);
      --ss-radius: var(--ha-card-border-radius, 12px);
    }

    .toolbar {
      display: flex;
      align-items: center;
      gap: 8px;
      height: var(--header-height, 56px);
      padding: 0 16px;
      flex-shrink: 0;
    }

    h1 {
      margin: 0;
      font-size: 20px;
      font-weight: 400;
    }

    main {
      flex: 1;
      width: 100%;
      max-width: 1240px;
      margin: 0 auto;
      padding: 0 16px 24px;
      box-sizing: border-box;
    }

    button {
      font: inherit;
      color: inherit;
      background: none;
      border: 0;
      cursor: pointer;
    }

    button:disabled {
      cursor: default;
      opacity: 0.5;
    }

    button.icon {
      display: inline-flex;
      padding: 8px;
      border-radius: 50%;
    }

    .primary {
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
      border-radius: 999px;
      padding: 8px 18px;
      font-weight: 500;
    }

    .warning {
      display: flex;
      gap: 10px;
      align-items: flex-start;
      padding: 12px 14px;
      margin-bottom: 12px;
      border-radius: var(--ss-radius);
      background: color-mix(in srgb, var(--warning-color, #ffa600) 16%, var(--card-background-color));
      line-height: 1.4;
    }

    .warning ha-icon {
      color: var(--warning-color, #ffa600);
      flex-shrink: 0;
    }

    .intro {
      margin: 0 0 16px;
      color: var(--secondary-text-color);
      line-height: 1.4;
    }

    .tabs {
      display: flex;
      gap: 4px;
      overflow-x: auto;
      border-bottom: 1px solid var(--divider-color);
      margin-bottom: 16px;
    }

    .tabs button {
      padding: 10px 14px;
      white-space: nowrap;
      border-bottom: 2px solid transparent;
      color: var(--secondary-text-color);
    }

    .tabs button.active {
      color: var(--primary-color);
      border-bottom-color: var(--primary-color);
      font-weight: 500;
    }

    .card {
      background: var(--ha-card-background, var(--card-background-color));
      border-radius: var(--ss-radius);
      box-shadow: var(--ha-card-box-shadow, none);
      border: 1px solid var(--ha-card-border-color, var(--divider-color));
      padding: 16px;
      margin-bottom: 16px;
    }

    .coming {
      color: var(--secondary-text-color);
    }

    h2 {
      margin: 0 0 8px;
      font-size: 16px;
      font-weight: 500;
    }

    .hint,
    small {
      display: block;
      color: var(--secondary-text-color);
      font-size: 13px;
      line-height: 1.4;
      margin: 0 0 8px;
    }

    .row small {
      margin: 2px 0 0;
    }

    .layout {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(320px, 440px);
      gap: 16px;
      align-items: start;
    }

    .preview {
      position: sticky;
      top: 16px;
    }

    @media (max-width: 900px) {
      .layout {
        grid-template-columns: minmax(0, 1fr);
      }

      .preview {
        position: static;
        order: -1;
      }
    }

    .row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      padding: 10px 0;
      min-height: 32px;
    }

    .row + .row {
      border-top: 1px solid color-mix(in srgb, var(--divider-color) 60%, transparent);
    }

    .row.off {
      opacity: 0.45;
    }

    .inline {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      flex-shrink: 0;
    }

    input[type="range"] {
      width: 180px;
      accent-color: var(--primary-color);
    }

    @media (max-width: 600px) {
      .row.slider {
        flex-direction: column;
        align-items: stretch;
        gap: 4px;
      }

      .row.slider .inline,
      .row.slider input[type="range"] {
        flex: 1;
        width: auto;
      }
    }

    output {
      min-width: 44px;
      text-align: end;
      font-variant-numeric: tabular-nums;
      color: var(--secondary-text-color);
    }

    input[type="color"] {
      width: 40px;
      height: 32px;
      padding: 0;
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      background: none;
      cursor: pointer;
    }

    .switch {
      appearance: none;
      position: relative;
      width: 40px;
      height: 22px;
      margin: 0;
      flex-shrink: 0;
      border-radius: 999px;
      background: var(--switch-unchecked-track-color, #bbb);
      cursor: pointer;
      transition: background-color 150ms;
    }

    .switch::after {
      content: "";
      position: absolute;
      top: 3px;
      left: 3px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: #fff;
      transition: transform 150ms;
    }

    .switch:checked {
      background: var(--primary-color);
    }

    .switch:checked::after {
      transform: translateX(18px);
    }

    .switch:focus-visible,
    button:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }

    .segment {
      display: inline-flex;
      flex-wrap: wrap;
      gap: 4px;
      padding: 4px;
      margin: 4px 8px 8px 0;
      border-radius: 999px;
      background: var(--secondary-background-color);
    }

    .segment button {
      padding: 6px 14px;
      border-radius: 999px;
    }

    .segment button.active {
      background: var(--card-background-color);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
      font-weight: 500;
    }

    .segment.small button {
      padding: 4px 10px;
      font-size: 13px;
    }

    .segment small {
      display: inline;
      margin: 0 0 0 4px;
      font-size: 11px;
    }

    .bar {
      position: sticky;
      bottom: 0;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;
      padding: 10px 16px calc(10px + env(safe-area-inset-bottom, 0px));
      background: var(--card-background-color);
      border-top: 1px solid var(--divider-color);
      min-height: 40px;
    }

    .bar button:not(.primary) {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 12px;
      border-radius: 999px;
    }

    .bar .grow {
      flex: 1;
      min-width: 120px;
      color: var(--secondary-text-color);
    }
  `;
}

if (!customElements.get("style-studio-panel")) {
  customElements.define("style-studio-panel", StudioPanel);
}
