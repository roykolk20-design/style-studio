import { css, html, nothing } from "lit";
import { TabBase } from "./tab-base.js";
import "./card-preview.js";
import { slug } from "./climate-cards.js";
import { NEEDED_CARDS } from "./climate-tab.js";
import { listDashboards, loadDashboard, saveDashboard } from "./dashboards.js";
import {
  climateHash,
  defaultRoom,
  floorsWithAreas,
  roomPopup,
  roomTile,
  roomsView,
} from "./rooms-cards.js";

/** Room tiles and pop-ups per floor, as one view on a dashboard. */
class RoomsTab extends TabBase {
  static properties = {
    ...TabBase.properties,
    _settings: { state: true },
    _rooms: { state: true },
    _order: { state: true },
    _dashboards: { state: true },
    _dashboard: { state: true },
    _selected: { state: true },
    _open: { state: true },
  };

  connectedCallback() {
    super.connectedCallback();
    const floors = floorsWithAreas(this.hass, this.t("rm_other"));
    this._order = Object.fromEntries(floors.map((floor) => [floor.id, [...floor.areas]]));
    this._floorNames = Object.fromEntries(floors.map((floor) => [floor.id, floor.name]));
    this._rooms = Object.fromEntries(
      Object.values(this.hass.areas ?? {}).map((area) => [area.area_id, defaultRoom(this.hass, area)])
    );
    this._settings = {
      title: this.t("tab_rooms").split(" ")[0],
      path: "kamers",
      popup: { glass: false, opacity: 80, width_desktop: 540, margin_top_mobile: 20, show_header: true },
    };
    this._open = null;
    this._loadDashboards();
  }

  async _loadDashboards() {
    this._dashboards = await listDashboards(this.hass, this.hass.localize("panel.states") || "Overview");
    this._dashboard = (this._dashboards.find((d) => d.editable) ?? this._dashboards[0])?.url_path ?? null;
  }

  get _labels() {
    return { on: this.t("rm_on"), off: this.t("rm_off"), climate: this.t("rm_climate_label") };
  }

  _floors() {
    return Object.entries(this._order).map(([id, areas]) => ({
      id,
      name: this._floorNames[id],
      rooms: areas.map((areaId) => this._rooms[areaId]).filter((room) => room?.include),
    }));
  }

  _room(areaId, changes) {
    this._rooms = { ...this._rooms, [areaId]: { ...this._rooms[areaId], ...changes } };
  }

  _move(floorId, index, step) {
    const areas = [...this._order[floorId]];
    const to = index + step;
    if (to < 0 || to >= areas.length) return;
    [areas[index], areas[to]] = [areas[to], areas[index]];
    this._order = { ...this._order, [floorId]: areas };
  }

  _setPopup(key, value) {
    this._settings = { ...this._settings, popup: { ...this._settings.popup, [key]: value } };
  }

  _create() {
    const dashboard = this._dashboards.find((d) => d.url_path === this._dashboard);
    const { title, path } = this._settings;
    this._run(async () => {
      const old = await loadDashboard(this.hass, dashboard.url_path);
      const exists = (old.views ?? []).some((view) => view.path === path);
      this._ask(this.t(exists ? "rm_replace_confirm" : "rm_create_confirm", { title }), () =>
        this._run(async () => {
          const config = JSON.parse(JSON.stringify(old));
          config.views ??= [];
          const view = roomsView(this._settings, this._floors(), this._labels);
          const index = config.views.findIndex((v) => v.path === path);
          if (index === -1) config.views.push(view);
          else config.views[index] = view;
          await saveDashboard(this.hass, dashboard.url_path, old, config);
        }, this.t("rm_created", { title }))
      );
    });
  }

  render() {
    if (!Object.keys(this.hass.areas ?? {}).length) {
      return html`<p class="intro">${this.t("rooms_intro")}</p>
        <div class="card"><p class="hint">${this.t("no_areas")}</p></div>`;
    }
    const s = this._settings;
    const p = s.popup;
    const dashboards = this._dashboards ?? [];
    const dashboard = dashboards.find((d) => d.url_path === this._dashboard);
    return html`
      <p class="intro">${this.t("rooms_intro")}</p>
      <div class="layout">
        <div class="settings">
          <div class="card">
            <h2>${this.t("rm_view")}</h2>
            <label class="row">
              <span>${this.t("cl_dashboard")}</span>
              <select @change=${(ev) => (this._dashboard = ev.target.value || null)}>
                ${dashboards.map(
                  (d) => html`<option value=${d.url_path ?? ""} ?selected=${d.url_path === this._dashboard}>
                    ${d.title}
                  </option>`
                )}
              </select>
            </label>
            ${dashboard && !dashboard.editable ? this._warning(this.t("cl_readonly")) : nothing}
            <label class="row">
              <span>${this.t("rm_title")}</span>
              <input
                type="text"
                .value=${s.title}
                @input=${(ev) => (this._settings = { ...s, title: ev.target.value })}
              />
            </label>
            <label class="row">
              <span>${this.t("rm_path")}</span>
              <input
                type="text"
                .value=${s.path}
                @change=${(ev) => (this._settings = { ...s, path: slug(ev.target.value) || "kamers" })}
              />
            </label>
          </div>

          <div class="card">
            <h2>${this.t("rm_popups")}</h2>
            <div class="segment" role="radiogroup">
              ${[
                [false, this.t("rm_solid")],
                [true, this.t("rm_glass")],
              ].map(
                ([glass, label]) => html`<button
                  role="radio"
                  aria-checked=${p.glass === glass ? "true" : "false"}
                  class=${p.glass === glass ? "active" : ""}
                  @click=${() => this._setPopup("glass", glass)}
                >
                  ${label}
                </button>`
              )}
            </div>
            ${p.glass ? this._popupSlider("opacity", this.t("rm_opacity"), 30, 100, "%") : nothing}
            ${this._popupSlider("width_desktop", this.t("rm_width"), 360, 900, "px")}
            ${this._popupSlider("margin_top_mobile", this.t("rm_height"), 0, 60, "%")}
            <label class="row">
              <span>${this.t("rm_header")}</span>
              <input
                type="checkbox"
                class="switch"
                .checked=${p.show_header}
                @change=${(ev) => this._setPopup("show_header", ev.target.checked)}
              />
            </label>
          </div>

          ${Object.entries(this._order).map(([floorId, areas]) => this._floorCard(floorId, areas))}

          <button
            class="primary create"
            ?disabled=${this._busy || !dashboard?.editable || !this._floors().some((f) => f.rooms.length)}
            @click=${this._create}
          >
            ${this.t("rm_create")}
          </button>
        </div>

        <aside class="card preview">
          <h2>${this.t("preview")}</h2>
          ${this._preview()}
        </aside>
      </div>
      ${this._bar({})}
    `;
  }

  _popupSlider(key, label, min, max, unit) {
    const p = this._settings.popup;
    return html`
      <label class="row slider">
        <span>${label}</span>
        <span class="inline">
          <input
            type="range"
            min=${min}
            max=${max}
            step="1"
            .value=${String(p[key])}
            @input=${(ev) => this._setPopup(key, Number(ev.target.value))}
          />
          <output>${p[key]}${unit}</output>
        </span>
      </label>
    `;
  }

  _floorCard(floorId, areas) {
    return html`
      <div class="card floor" data-floor=${this._floorNames[floorId]}>
        <h2>${this._floorNames[floorId]}</h2>
        ${areas.map((areaId, index) => {
          const room = this._rooms[areaId];
          return html`
            <div class="room ${room.include ? "" : "off"}">
              <input
                type="checkbox"
                aria-label="${this.t("rm_include")} ${room.name}"
                .checked=${room.include}
                @change=${(ev) => this._room(areaId, { include: ev.target.checked })}
              />
              <ha-icon .icon=${room.icon}></ha-icon>
              <div class="fields">
                <input
                  type="text"
                  aria-label=${this.t("cl_name")}
                  .value=${room.name}
                  @input=${(ev) => this._room(areaId, { name: ev.target.value })}
                />
                <input
                  type="text"
                  class="icon-field"
                  aria-label=${this.t("rm_icon")}
                  .value=${room.icon}
                  @change=${(ev) =>
                    /^mdi:[a-z0-9-]+$/.test(ev.target.value.trim()) &&
                    this._room(areaId, { icon: ev.target.value.trim() })}
                />
                <details>
                  <summary>
                    ${room.lights.length === 1
                      ? this.t("rm_light_one")
                      : room.lights.length
                        ? this.t("rm_lights", { count: room.lights.length })
                        : this.t("rm_no_lights")}
                  </summary>
                  ${this._lightChoices(areaId, room)}
                </details>
                ${room.climate
                  ? html`<label class="climate">
                      <input
                        type="checkbox"
                        .checked=${room.climate_button}
                        @change=${(ev) => this._room(areaId, { climate_button: ev.target.checked })}
                      />
                      ${this.t("rm_climate")}
                      <small>${this.t("rm_climate_hint", { hash: climateHash(room.name) })}</small>
                    </label>`
                  : nothing}
              </div>
              <span class="moves">
                <button class="icon" title=${this.t("move_up")} ?disabled=${index === 0} @click=${() => this._move(floorId, index, -1)}>
                  <ha-icon icon="mdi:arrow-up"></ha-icon>
                </button>
                <button
                  class="icon"
                  title=${this.t("move_down")}
                  ?disabled=${index === areas.length - 1}
                  @click=${() => this._move(floorId, index, 1)}
                >
                  <ha-icon icon="mdi:arrow-down"></ha-icon>
                </button>
              </span>
            </div>
          `;
        })}
      </div>
    `;
  }

  // Any light can be added; the area's own lights are checked by default.
  _lightChoices(areaId, room) {
    const all = Object.keys(this.hass.states)
      .filter((id) => id.startsWith("light."))
      .sort();
    return html`<div class="lights">
      ${all.map(
        (id) => html`<label>
          <input
            type="checkbox"
            .checked=${room.lights.includes(id)}
            @change=${(ev) =>
              this._room(areaId, {
                lights: ev.target.checked ? [...room.lights, id] : room.lights.filter((l) => l !== id),
              })}
          />
          ${this.hass.states[id].attributes.friendly_name ?? id}
        </label>`
      )}
    </div>`;
  }

  _preview() {
    const floors = this._floors().filter((floor) => floor.rooms.length);
    const open = floors.flatMap((f) => f.rooms).find((room) => room.name === this._open) ?? null;
    return html`
      <div class="columns">
        ${floors.map(
          (floor) => html`<div class="column">
            <div class="floor-name">${floor.name}</div>
            ${floor.rooms.map(
              (room) => html`<button class="pick" @click=${() => (this._open = room.name)}>
                <ss-card-preview
                  bare
                  .hass=${this.hass}
                  .t=${this.t}
                  .needs=${NEEDED_CARDS}
                  .config=${roomTile(room, this._labels)}
                ></ss-card-preview>
              </button>`
            )}
          </div>`
        )}
      </div>
      ${open
        ? html`<div class="popup-title">
              <ha-icon .icon=${open.icon}></ha-icon><b>${open.name}</b>
              <button class="icon" @click=${() => (this._open = null)}><ha-icon icon="mdi:close"></ha-icon></button>
            </div>
            <ss-card-preview
              .hass=${this.hass}
              .t=${this.t}
              .needs=${NEEDED_CARDS}
              .config=${{ type: "vertical-stack", cards: roomPopup(open, this._settings.popup, this._labels).cards.slice(1) }}
            ></ss-card-preview>`
        : html`<p class="hint">${this.t("rm_pick_room")}</p>`}
    `;
  }

  static styles = [
    TabBase.styles,
    css`
      select {
        font: inherit;
        max-width: 220px;
        padding: 6px 8px;
        border-radius: 8px;
        border: 1px solid var(--divider-color);
        background: var(--card-background-color);
        color: var(--primary-text-color);
      }

      .room {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        padding: 10px 0;
        border-top: 1px solid var(--divider-color);
      }

      .room.off .fields,
      .room.off > ha-icon {
        opacity: 0.45;
      }

      .room > input[type="checkbox"] {
        margin-top: 10px;
        accent-color: var(--primary-color);
      }

      .room > ha-icon {
        margin-top: 6px;
        color: var(--primary-color);
      }

      .fields {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        gap: 6px 10px;
        align-items: center;
      }

      .fields > input[type="text"] {
        flex: 1;
        min-width: 140px;
      }

      .fields .icon-field {
        flex: 0 1 170px;
        font-size: 13px;
      }

      details {
        flex-basis: 100%;
        font-size: 13px;
      }

      summary {
        cursor: pointer;
        color: var(--secondary-text-color);
      }

      .lights {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
        gap: 4px 12px;
        margin-top: 6px;
      }

      .lights label,
      .climate {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 13px;
      }

      .climate {
        flex-basis: 100%;
        flex-wrap: wrap;
      }

      .climate small {
        margin: 0;
      }

      .moves {
        display: flex;
      }

      .icon {
        display: inline-flex;
        padding: 6px;
        border-radius: 50%;
      }

      .create {
        margin-bottom: 16px;
      }

      .columns {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 12px;
      }

      .column {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      .floor-name {
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--secondary-text-color);
      }

      .pick {
        padding: 0;
        text-align: start;
      }

      .popup-title {
        display: flex;
        align-items: center;
        gap: 8px;
        margin: 16px 0 8px;
      }

      .popup-title button {
        margin-inline-start: auto;
      }
    `,
  ];
}

if (!customElements.get("ss-rooms-tab")) {
  customElements.define("ss-rooms-tab", RoomsTab);
}
