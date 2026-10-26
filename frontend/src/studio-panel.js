import { LitElement, css, html, nothing } from "lit";
import "./climate-tab.js";
import "./people-tab.js";
import "./rooms-tab.js";
import "./sidebar-tab.js";
import "./themes-tab.js";
import { translator } from "./strings.js";
import { VERSION } from "./version.js";

const TABS = ["themes", "sidebar", "rooms", "climate", "people", "check"];

/** The Stijl panel: tabs, each with its own settings and Save. */
class StudioPanel extends LitElement {
  static properties = {
    hass: { attribute: false },
    narrow: { type: Boolean },
    panel: { attribute: false },
    _data: { state: true },
    _tab: { state: true },
    _leaving: { state: true },
  };

  constructor() {
    super();
    this._tab = "themes";
    this._leaving = null;
  }

  get t() {
    return translator(this.hass);
  }

  willUpdate(changed) {
    if (changed.has("hass") && this.hass && !this._loading) this._loading = this._load();
  }

  async _load() {
    try {
      this._data = await this.hass.callWS({ type: "style_studio/get" });
    } catch (err) {
      this._error = err.message ?? String(err);
    }
  }

  _pickTab(tab) {
    if (tab === this._tab) return;
    const current = this.renderRoot.querySelector(".tab-content > *");
    if (current?.dirty) this._leaving = tab;
    else this._tab = tab;
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
        ${this._error ? html`<div class="warning">${this.t("error", { message: this._error })}</div>` : nothing}
        ${this._data ? this._content() : nothing}
      </main>
    `;
  }

  _toggleMenu() {
    this.dispatchEvent(new Event("hass-toggle-menu", { bubbles: true, composed: true }));
  }

  _content() {
    return html`
      ${this._staleVersion()
        ? html`<div class="warning">
            <ha-icon icon="mdi:alert-outline"></ha-icon>
            ${this.t("warn_old_panel", { old: this._staleVersion(), new: this._data.version })}
          </div>`
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
      ${this._leaving
        ? html`<div class="leaving">
            <span>${this.t("discard_confirm")}</span>
            <button @click=${() => (this._leaving = null)}>${this.t("no")}</button>
            <button
              class="primary"
              @click=${() => {
                this._tab = this._leaving;
                this._leaving = null;
              }}
            >
              ${this.t("yes")}
            </button>
          </div>`
        : nothing}
      <div class="tab-content">${this._tabContent()}</div>
    `;
  }

  // The panel or the per-person script in this browser is older than the server.
  _staleVersion() {
    const runtime = window.__styleStudio?.version;
    if (VERSION !== this._data.version) return VERSION;
    if (runtime && runtime !== this._data.version) return runtime;
    return null;
  }

  _tabContent() {
    switch (this._tab) {
      case "themes":
        return html`<ss-themes-tab .hass=${this.hass} .narrow=${this.narrow}></ss-themes-tab>`;
      case "rooms":
        return html`<ss-rooms-tab .hass=${this.hass} .narrow=${this.narrow}></ss-rooms-tab>`;
      case "climate":
        return html`<ss-climate-tab .hass=${this.hass} .narrow=${this.narrow}></ss-climate-tab>`;
      case "people":
        return html`<ss-people-tab .hass=${this.hass} .narrow=${this.narrow}></ss-people-tab>`;
      case "sidebar":
        return html`<ss-sidebar-tab
          .hass=${this.hass}
          .narrow=${this.narrow}
          .glass=${this._data.glass_sidebar}
          @reload=${() => this._load()}
        ></ss-sidebar-tab>`;
      default:
        return html`<div class="card coming">${this.t("coming")}</div>`;
    }
  }

  static styles = css`
    /* Home Assistant gives a panel a fixed-height box and cuts off what
       sticks out, so the panel scrolls by itself. That also keeps the Save
       bar at the bottom of the screen. */
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow-y: auto;
      box-sizing: border-box;
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
      padding: 0 16px;
      box-sizing: border-box;
    }

    button {
      font: inherit;
      color: inherit;
      background: none;
      border: 0;
      cursor: pointer;
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

    .warning,
    .leaving {
      display: flex;
      gap: 10px;
      align-items: center;
      flex-wrap: wrap;
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

    .leaving span {
      flex: 1;
    }

    .leaving button:not(.primary) {
      padding: 8px 12px;
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
      border: 1px solid var(--ha-card-border-color, var(--divider-color));
      padding: 16px;
      margin-bottom: 16px;
    }

    .coming {
      color: var(--secondary-text-color);
    }
  `;
}

if (!customElements.get("style-studio-panel")) {
  customElements.define("style-studio-panel", StudioPanel);
}
