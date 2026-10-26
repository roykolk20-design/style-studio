import { css, html, nothing } from "lit";
import { TabBase } from "./tab-base.js";
import "./card-preview.js";
import { capabilities, climateCards, defaultOptions, isOpener, isPopup } from "./climate-cards.js";
import { listDashboards, loadDashboard, placeCards, saveDashboard } from "./dashboards.js";

export const NEEDED_CARDS = ["button-card", "bubble-card"];

/** One pop-up per climate entity, put on a dashboard after a backup. */
class ClimateTab extends TabBase {
  static properties = {
    ...TabBase.properties,
    _entity: { state: true },
    _options: { state: true },
    _dashboards: { state: true },
    _dashboard: { state: true },
    _views: { state: true },
    _view: { state: true },
  };

  constructor() {
    super();
    this._options = {};
    this._dashboard = null;
    this._views = null;
    this._view = 0;
  }

  connectedCallback() {
    super.connectedCallback();
    const first = this._entities()[0];
    if (first) this._pickEntity(first);
    this._loadDashboards();
  }

  _entities() {
    return Object.keys(this.hass.states)
      .filter((id) => id.startsWith("climate."))
      .sort();
  }

  // "Airco woonkamer": the area name when there is one, else the entity name.
  _defaultName(entityId) {
    const entry = this.hass.entities?.[entityId];
    const areaId = entry?.area_id ?? this.hass.devices?.[entry?.device_id]?.area_id;
    const area = areaId ? this.hass.areas?.[areaId]?.name : null;
    const friendly = this.hass.states[entityId]?.attributes?.friendly_name ?? entityId;
    return area ? `${this.t("cl_section")} ${area.toLowerCase()}` : friendly;
  }

  _pickEntity(entityId) {
    this._entity = entityId;
    if (!this._options[entityId]) {
      this._options = {
        ...this._options,
        [entityId]: defaultOptions(entityId, this.hass.states[entityId], this._defaultName(entityId)),
      };
    }
  }

  get _opts() {
    return this._options[this._entity];
  }

  _set(key, value) {
    this._options = { ...this._options, [this._entity]: { ...this._opts, [key]: value } };
  }

  async _loadDashboards() {
    this._dashboards = await listDashboards(this.hass, this.hass.localize("panel.states") || "Overview");
    const first = this._dashboards.find((d) => d.editable) ?? this._dashboards[0];
    if (first) this._pickDashboard(first.url_path);
  }

  async _pickDashboard(urlPath) {
    this._dashboard = urlPath;
    this._views = null;
    try {
      const config = await loadDashboard(this.hass, urlPath);
      this._views = config.views ?? [];
      this._view = 0;
    } catch (err) {
      this._views = [];
      this._error(err);
    }
  }

  get _labels() {
    const t = this.t;
    const modes = Object.fromEntries(
      ["off", "cool", "heat", "auto", "dry", "fan_only", "heat_cool"].map((m) => [m, t(`mode_${m}`)])
    );
    const fanModes = Object.fromEntries(
      ["auto", "low", "medium", "middle", "high"].map((m) => [m, t(`fan_${m}`)])
    );
    return {
      now: t("cl_now_label"),
      mode: t("cl_modes"),
      fan: t("cl_fan"),
      swing: t("cl_swing_title"),
      swingVertical: t("cl_swing_v"),
      swingHorizontal: t("cl_swing_h"),
      modes,
      fanModes,
    };
  }

  _cards() {
    return climateCards(this._opts, this.hass.states[this._entity], this._labels);
  }

  _put() {
    const dashboard = this._dashboards.find((d) => d.url_path === this._dashboard);
    const view = this._views[this._view];
    const viewName = view?.title ?? view?.path ?? `${this._view + 1}`;
    this._ask(this.t("cl_add_confirm", { hash: this._opts.hash, view: viewName }), () =>
      this._run(async () => {
        const old = await loadDashboard(this.hass, dashboard.url_path);
        const config = JSON.parse(JSON.stringify(old));
        const target = config.views[this._view];
        const { popup, opener } = this._cards();
        const items = [{ card: popup, match: isPopup(this._opts.hash) }];
        if (opener) items.push({ card: opener, match: isOpener(this._opts.hash) });
        const replaced = placeCards(target, items, this.t("cl_section"));
        await saveDashboard(this.hass, dashboard.url_path, old, config);
        this._views = config.views;
        this._showToast(this.t("cl_added", { view: viewName, replaced }));
      })
    );
  }

  render() {
    const entities = this._entities();
    if (!entities.length) {
      return html`<p class="intro">${this.t("climate_intro")}</p>
        <div class="card"><p class="hint">${this.t("no_climate")}</p></div>`;
    }
    const o = this._opts;
    const stateObj = this.hass.states[this._entity];
    const caps = capabilities(stateObj);
    const { popup } = this._cards();
    return html`
      <p class="intro">${this.t("climate_intro")}</p>
      <div class="chips">
        ${entities.map(
          (id) => html`<button
            class="chip ${id === this._entity ? "active" : ""}"
            @click=${() => this._pickEntity(id)}
          >
            <ha-icon icon="mdi:air-conditioner"></ha-icon>
            ${this.hass.states[id].attributes.friendly_name ?? id}
          </button>`
        )}
      </div>
      <div class="layout">
        <div class="settings">
          <div class="card">
            <h2>${this.t("cl_popup")}</h2>
            <label class="row">
              <span>${this.t("cl_name")}</span>
              <input type="text" .value=${o.name} @input=${(ev) => this._set("name", ev.target.value)} />
            </label>
            <label class="row">
              <span>
                ${this.t("cl_hash")}
                <small>${this.t("cl_hash_hint", { hash: o.hash })}</small>
              </span>
              <input
                type="text"
                .value=${o.hash}
                @change=${(ev) => {
                  const value = ev.target.value.trim().replace(/^#?/, "#").replace(/[^#a-z0-9_-]/gi, "-");
                  this._set("hash", value.length > 1 ? value : o.hash);
                }}
              />
            </label>
          </div>

          <div class="card">
            <h2>${this.t("cl_parts")}</h2>
            ${this._switch(
              o,
              "temperature",
              this.t("cl_temperature"),
              this.t("cl_temperature_hint", { min: caps.min, max: caps.max, step: caps.step })
            )}
            <div class="row column">
              <span>${this.t("cl_modes")}</span>
              <div class="modes">
                ${caps.modes.map(
                  (mode) => html`<label class="mode">
                    <input
                      type="checkbox"
                      .checked=${o.modes.includes(mode)}
                      @change=${(ev) =>
                        this._set(
                          "modes",
                          ev.target.checked ? [...o.modes, mode] : o.modes.filter((m) => m !== mode)
                        )}
                    />
                    ${this.t(`mode_${mode}`)}
                  </label>`
                )}
              </div>
            </div>
            ${caps.fanModes.length
              ? this._switch(o, "fan", this.t("cl_fan"), caps.fanModes.join(", "))
              : this._unavailable(this.t("cl_fan"), this.t("cl_fan_none"))}
            ${caps.swing
              ? this._switch(o, "swing", this.t("cl_swing_v"))
              : this._unavailable(this.t("cl_swing_v"), this.t("cl_swing_none"))}
            ${caps.swingHorizontal
              ? this._switch(o, "swing_horizontal", this.t("cl_swing_h"))
              : this._unavailable(this.t("cl_swing_h"), this.t("cl_swing_none"))}
            <p class="note"><ha-icon icon="mdi:information-outline"></ha-icon>${this.t("cl_louvers")}</p>
          </div>

          ${this._placeCard()}

          <div class="card">
            <details>
              <summary>${this.t("cl_code")}</summary>
              <p class="hint">${this.t("cl_code_hint")}</p>
              <button
                class="small"
                @click=${async () => {
                  await navigator.clipboard?.writeText(JSON.stringify(popup, null, 2));
                  this._showToast(this.t("copied"));
                }}
              >
                <ha-icon icon="mdi:content-copy"></ha-icon>${this.t("copy")}
              </button>
              <pre>${JSON.stringify(popup, null, 2)}</pre>
            </details>
          </div>
        </div>

        <aside class="card preview">
          <h2>${this.t("preview")}</h2>
          <div class="popup-title">
            <ha-icon icon="mdi:air-conditioner"></ha-icon><b>${o.name}</b><code>${o.hash}</code>
          </div>
          <ss-card-preview
            .hass=${this.hass}
            .t=${this.t}
            .needs=${NEEDED_CARDS}
            .config=${{ type: "vertical-stack", cards: popup.cards.slice(1) }}
          ></ss-card-preview>
        </aside>
      </div>
      ${this._bar({})}
    `;
  }

  _unavailable(label, why) {
    return html`<div class="row off">
      <span>${label}<small>${why}</small></span>
      <ha-icon icon="mdi:minus-circle-outline"></ha-icon>
    </div>`;
  }

  _placeCard() {
    const dashboards = this._dashboards ?? [];
    const dashboard = dashboards.find((d) => d.url_path === this._dashboard);
    const view = this._views?.[this._view];
    const panelView = view?.type === "panel";
    return html`
      <div class="card">
        <h2>${this.t("cl_place")}</h2>
        <label class="row">
          <span>${this.t("cl_dashboard")}</span>
          <select @change=${(ev) => this._pickDashboard(ev.target.value || null)}>
            ${dashboards.map(
              (d) => html`<option value=${d.url_path ?? ""} ?selected=${d.url_path === this._dashboard}>
                ${d.title}
              </option>`
            )}
          </select>
        </label>
        ${dashboard && !dashboard.editable ? this._warning(this.t("cl_readonly")) : nothing}
        <label class="row">
          <span>${this.t("cl_view")}</span>
          <select @change=${(ev) => (this._view = Number(ev.target.value))}>
            ${(this._views ?? []).map(
              (v, index) => html`<option value=${index} ?selected=${index === this._view}>
                ${v.title ?? v.path ?? index + 1}
              </option>`
            )}
          </select>
        </label>
        ${panelView ? this._warning(this.t("cl_panel_view")) : nothing}
        ${this._switch(this._opts, "opener", this.t("cl_opener"))}
        <button
          class="primary place"
          ?disabled=${this._busy || !dashboard?.editable || !view || panelView}
          @click=${this._put}
        >
          ${this.t("cl_add")}
        </button>
      </div>
    `;
  }

  static styles = [
    TabBase.styles,
    css`
      .chips {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 16px;
      }

      .chip {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 14px;
        border-radius: 999px;
        border: 1px solid var(--divider-color);
        background: var(--card-background-color);
      }

      .chip.active {
        border-color: var(--primary-color);
        background: color-mix(in srgb, var(--primary-color) 14%, var(--card-background-color));
      }

      .row.column {
        flex-direction: column;
        align-items: stretch;
      }

      .modes {
        display: flex;
        flex-wrap: wrap;
        gap: 6px 14px;
      }

      .mode {
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }

      .mode input {
        accent-color: var(--primary-color);
      }

      .note {
        display: flex;
        gap: 8px;
        margin: 8px 0 0;
        font-size: 13px;
        line-height: 1.4;
        color: var(--secondary-text-color);
      }

      .note ha-icon {
        flex-shrink: 0;
        --mdc-icon-size: 18px;
      }

      select {
        font: inherit;
        max-width: 220px;
        padding: 6px 8px;
        border-radius: 8px;
        border: 1px solid var(--divider-color);
        background: var(--card-background-color);
        color: var(--primary-text-color);
      }

      .place {
        margin-top: 8px;
      }

      .small {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 6px 12px;
        border-radius: 999px;
        color: var(--primary-color);
        font-weight: 500;
      }

      summary {
        cursor: pointer;
        font-weight: 500;
      }

      pre {
        max-height: 320px;
        overflow: auto;
        padding: 10px;
        border-radius: 8px;
        background: var(--secondary-background-color);
        font-size: 12px;
      }

      .popup-title {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 8px;
      }

      .popup-title code {
        margin-inline-start: auto;
        font-size: 12px;
        color: var(--secondary-text-color);
      }

      @media (max-width: 600px) {
        .row {
          flex-wrap: wrap;
        }
      }
    `,
  ];
}

if (!customElements.get("ss-climate-tab")) {
  customElements.define("ss-climate-tab", ClimateTab);
}
