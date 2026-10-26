import { css, html, nothing } from "lit";
import { live } from "lit/directives/live.js";
import { repeat } from "lit/directives/repeat.js";
import { TabBase } from "./tab-base.js";
import "./card-preview.js";
import "./rooms-view.js";
import { NEEDED_CARDS } from "./climate-tab.js";
import { popupContent } from "./popup-format.js";
import { addCards, cardAt, findRooms, roomLike, sectionsOf, updateRoom } from "./dashboard-cards.js";
import { listDashboards, loadDashboard, saveDashboard } from "./dashboards.js";
import { greetingCard, scenesCard, statusCard, weatherCard } from "./other-cards.js";
import { areaEntities, climateButton, roomHash, roomPopup, roomTile } from "./rooms-cards.js";

const NEW = "new";
const POPUP_STYLE = { glass: false, opacity: 80, width_desktop: 540, margin_top_mobile: 20, show_header: true };

/**
 * Rooms and other cards on your own dashboards: find the rooms already there
 * (also hand-made ones) and change them in place, add new rooms to a section,
 * and add other cards. A whole new view is still possible at the bottom.
 */
class RoomsTab extends TabBase {
  static properties = {
    ...TabBase.properties,
    _dashboards: { state: true },
    _dashboard: { state: true },
    _config: { state: true },
    _selected: { state: true },
    _draft: { state: true },
    _place: { state: true },
    _filter: { state: true },
    _other: { state: true },
    _model: { state: true },
  };

  constructor() {
    super();
    this._filter = "";
    this._other = { kind: "greeting", scenes: [], view: 0, section: 0 };
  }

  connectedCallback() {
    super.connectedCallback();
    this._loadDashboards();
  }

  get _lang() {
    return (this.hass?.locale?.language || this.hass?.language || "nl").startsWith("nl") ? "nl" : "en";
  }

  get _labels() {
    return { on: this.t("rm_on"), off: this.t("rm_off"), climate: this.t("rm_climate_label") };
  }

  async _loadDashboards() {
    this._dashboards = await listDashboards(this.hass, this.hass.localize("panel.states") || "Overview");
    const first = this._dashboards.find((d) => d.editable) ?? this._dashboards[0];
    if (first) await this._pickDashboard(first.url_path);
  }

  async _pickDashboard(urlPath, select) {
    this._dashboard = urlPath;
    try {
      this._config = await loadDashboard(this.hass, urlPath);
    } catch (err) {
      this._config = { views: [] };
    }
    this._place = { view: 0, section: 0 };
    this._other = { ...this._other, view: 0, section: 0 };
    const rooms = this._found();
    // New rooms look like the first room already there, unless you pick otherwise.
    this._model = rooms[0]?.hash ?? null;
    this._choose(select ?? (rooms[0] ? `found:${rooms[0].hash}` : NEW));
  }

  _found() {
    return this._config ? findRooms(this._config) : [];
  }

  // Areas whose room isn't on this dashboard yet, as a start for a new room.
  _suggestions() {
    const taken = new Set(this._found().map((room) => room.hash));
    return Object.values(this.hass.areas ?? {})
      .filter((area) => !taken.has(roomHash(area.name)))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  _choose(key) {
    this._selected = key;
    this._toast = null;
    if (key.startsWith("found:")) {
      const room = this._found().find((r) => `found:${r.hash}` === key);
      this._draft = { name: room.name, icon: room.icon, lights: [...room.lights], climate: room.climate };
      return;
    }
    if (key.startsWith("area:")) {
      const area = this.hass.areas[key.slice(5)];
      const { lights, climate } = areaEntities(this.hass, area.area_id);
      this._draft = { name: area.name, icon: area.icon || "mdi:home-outline", lights, climate };
      this._place = { ...this._place, section: this._sectionForFloor(area.floor_id) };
      return;
    }
    this._draft = { name: this.t("rm_new_room"), icon: "mdi:home-outline", lights: [], climate: null };
  }

  // A new room from an area goes into the section named after its floor.
  _sectionForFloor(floorId) {
    const floor = this.hass.floors?.[floorId]?.name?.toLowerCase();
    const sections = sectionsOf(this._config.views?.[this._place.view]);
    const match = sections.find((s) => floor && s.label.toLowerCase() === floor);
    return match?.index ?? sections[0]?.index ?? 0;
  }

  get _room() {
    return this._selected?.startsWith("found:")
      ? this._found().find((r) => `found:${r.hash}` === this._selected)
      : null;
  }

  _set(key, value) {
    this._draft = { ...this._draft, [key]: value };
    this._toast = null;
  }

  get dirty() {
    const room = this._room;
    if (!room || !this._draft) return false;
    return JSON.stringify(this._draft) !== JSON.stringify({ name: room.name, icon: room.icon, lights: room.lights, climate: room.climate });
  }

  // What the changed room looks like: the dashboard's own cards, changed.
  _changedConfig() {
    const room = this._room;
    const d = this._draft;
    return updateRoom(this._config, room, {
      name: d.name,
      icon: d.icon,
      lights: d.lights,
      climate: d.climate,
      climateCard: d.climate ? climateButton(d.climate, d.name, this._labels) : null,
    });
  }

  _newRoom() {
    const d = this._draft;
    return { ...d, include: true, climate_button: Boolean(d.climate) };
  }

  // The cards for a new room: like the model room, or Style Studio's own.
  _newCards(config = this._config) {
    const room = this._newRoom();
    const model = findRooms(config).find((r) => r.hash === this._model);
    if (model) {
      const climateCard = room.climate ? climateButton(room.climate, room.name, this._labels) : null;
      return roomLike(config, model, { ...room, hash: roomHash(room.name) }, climateCard);
    }
    return [roomTile(room, this._labels), roomPopup(room, POPUP_STYLE, this._labels)];
  }

  _placeLabel(view, section) {
    const v = this._config.views[view];
    const label = sectionsOf(v).find((s) => s.index === section)?.label ?? "";
    return { view: v?.title ?? v?.path ?? `${view + 1}`, section: label };
  }

  _save() {
    const room = this._room;
    const dashboard = this._dashboards.find((d) => d.url_path === this._dashboard);
    if (room) {
      this._ask(this.t("rm_update_confirm", { name: this._draft.name }), () =>
        this._run(async () => {
          const old = await loadDashboard(this.hass, dashboard.url_path);
          const changed = updateRoom(old, findRooms(old).find((r) => r.hash === room.hash), {
            ...this._draft,
            climateCard: this._draft.climate ? climateButton(this._draft.climate, this._draft.name, this._labels) : null,
          });
          await saveDashboard(this.hass, dashboard.url_path, old, changed);
          await this._pickDashboard(dashboard.url_path, `found:${room.hash}`);
        }, this.t("rm_update_done"))
      );
      return;
    }
    const hash = roomHash(this._draft.name);
    if (this._found().some((r) => r.hash === hash)) {
      this._showToast(this.t("rm_hash_taken", { hash }));
      return;
    }
    const where = this._placeLabel(this._place.view, this._place.section);
    this._ask(this.t("rm_put_confirm", { name: this._draft.name, ...where }), () =>
      this._run(async () => {
        const old = await loadDashboard(this.hass, dashboard.url_path);
        const changed = addCards(old, this._place.view, this._place.section, this._newCards(old));
        await saveDashboard(this.hass, dashboard.url_path, old, changed);
        await this._pickDashboard(dashboard.url_path, `found:${hash}`);
      }, this.t("rm_put_done"))
    );
  }

  render() {
    const dashboards = this._dashboards ?? [];
    const dashboard = dashboards.find((d) => d.url_path === this._dashboard);
    return html`
      <p class="intro">${this.t("rooms_intro")}</p>
      <div class="card">
        <label class="row">
          <span>${this.t("cl_dashboard")}</span>
          <select @change=${(ev) => this._pickDashboard(ev.target.value || null)}>
            ${dashboards.map(
              (d) => html`<option value=${d.url_path ?? ""} ?selected=${d.url_path === this._dashboard}>${d.title}</option>`
            )}
          </select>
        </label>
        ${dashboard && !dashboard.editable ? this._warning(this.t("cl_readonly")) : nothing}
      </div>
      ${this._config && this._draft ? this._roomSection(dashboard) : nothing}
      ${this._config ? this._otherCards(dashboard) : nothing}
      <div class="card">
        <details>
          <summary><h2>${this.t("rm_whole_view")}</h2></summary>
          <ss-rooms-view .hass=${this.hass} .narrow=${this.narrow}></ss-rooms-view>
        </details>
      </div>
      ${this._bar({ onCancel: () => this._choose(this._selected), onSave: () => this._save() })}
    `;
  }

  _roomSection(dashboard) {
    const found = this._found();
    const room = this._room;
    const d = this._draft;
    return html`
      <div class="chips">
        ${found.map(
          (r) => html`<button
            class="chip ${this._selected === `found:${r.hash}` ? "active" : ""}"
            @click=${() => this._choose(`found:${r.hash}`)}
          >
            <ha-icon .icon=${r.icon}></ha-icon>${r.name}
          </button>`
        )}
        ${found.length ? nothing : html`<span class="hint">${this.t("rm_no_rooms_found")}</span>`}
        ${this._suggestions().map(
          (area) => html`<button
            class="chip suggestion ${this._selected === `area:${area.area_id}` ? "active" : ""}"
            title=${this.t("rm_from_area")}
            @click=${() => this._choose(`area:${area.area_id}`)}
          >
            <ha-icon icon="mdi:plus"></ha-icon>${area.name}
          </button>`
        )}
        <button class="chip add ${this._selected === NEW ? "active" : ""}" @click=${() => this._choose(NEW)}>
          <ha-icon icon="mdi:plus"></ha-icon>${this.t("rm_add_room")}
        </button>
      </div>

      <div class="layout">
        <div class="settings">
          <div class="card">
            <h2>${this.t("rm_room")}</h2>
            ${room ? html`<p class="hint">${this.t("rm_keeps_design")}</p>` : nothing}
            <label class="row">
              <span>${this.t("cl_name")}</span>
              <input type="text" .value=${d.name} @input=${(ev) => this._set("name", ev.target.value)} />
            </label>
            <label class="row">
              <span>${this.t("rm_icon")}</span>
              <span class="inline">
                <ha-icon .icon=${d.icon}></ha-icon>
                <input
                  type="text"
                  .value=${d.icon}
                  @change=${(ev) => /^mdi:[a-z0-9-]+$/.test(ev.target.value.trim()) && this._set("icon", ev.target.value.trim())}
                />
              </span>
            </label>
            <label class="row">
              <span>${this.t("rm_climate_pick")}</span>
              <select @change=${(ev) => this._set("climate", ev.target.value || null)}>
                <option value="" ?selected=${!d.climate}>${this.t("rm_no_climate")}</option>
                ${Object.keys(this.hass.states)
                  .filter((id) => id.startsWith("climate."))
                  .map(
                    (id) => html`<option value=${id} ?selected=${id === d.climate}>
                      ${this.hass.states[id].attributes.friendly_name ?? id}
                    </option>`
                  )}
              </select>
            </label>
            <div class="row column">
              <span>${this.t("rm_lights_pick")} (${d.lights.length})</span>
              <input
                type="text"
                placeholder=${this.t("rm_filter")}
                aria-label=${this.t("rm_filter")}
                .value=${this._filter}
                @input=${(ev) => (this._filter = ev.target.value.toLowerCase())}
              />
              ${this._lightList()}
            </div>
          </div>

          <div class="card">
            <h2>${this.t("rm_where")}</h2>
            ${room
              ? html`<p class="hint">${this.t("rm_is_at", this._placeLabel(room.popup.view, room.popup.section))}</p>`
              : html`${this._placePicker(this._place, (place) => (this._place = place))} ${this._designPicker()}`}
            <button
              class="primary"
              ?disabled=${this._busy || !dashboard?.editable || (room && !this.dirty) || !d.name.trim()}
              @click=${this._save}
            >
              ${room ? this.t("rm_update") : this.t("rm_put")}
            </button>
          </div>
        </div>

        <aside class="card preview">
          <h2>${this.t("preview")}</h2>
          ${this._roomPreview()}
        </aside>
      </div>
    `;
  }

  _lightList() {
    const d = this._draft;
    const all = Object.keys(this.hass.states)
      .filter((id) => id.startsWith("light."))
      .map((id) => ({ id, name: this.hass.states[id].attributes.friendly_name ?? id }))
      .filter((l) => !this._filter || l.name.toLowerCase().includes(this._filter) || l.id.includes(this._filter) || d.lights.includes(l.id))
      // A steady order: rows must not move under the pointer while you tick them.
      .sort((a, b) => a.name.localeCompare(b.name));
    return html`<div class="lights">
      ${repeat(
        all,
        (l) => l.id,
        (l) => html`<label>
          <input
            type="checkbox"
            .checked=${live(d.lights.includes(l.id))}
            @change=${(ev) =>
              this._set("lights", ev.target.checked ? [...d.lights, l.id] : d.lights.filter((x) => x !== l.id))}
          />
          ${l.name}
        </label>`
      )}
    </div>`;
  }

  _designPicker() {
    const found = this._found();
    return html`
      <label class="row">
        <span>${this.t("rm_design")}</span>
        <select @change=${(ev) => (this._model = ev.target.value || null)}>
          ${found.map(
            (r) => html`<option value=${r.hash} ?selected=${r.hash === this._model}>${this.t("rm_like", { name: r.name })}</option>`
          )}
          <option value="" ?selected=${!this._model}>${this.t("rm_standard")}</option>
        </select>
      </label>
      ${this._model ? nothing : this._popupFormat()}
    `;
  }

  _placePicker(place, set) {
    const views = this._config.views ?? [];
    const sections = sectionsOf(views[place.view]);
    return html`
      <label class="row">
        <span>${this.t("cl_view")}</span>
        <select @change=${(ev) => set({ view: Number(ev.target.value), section: sectionsOf(views[Number(ev.target.value)])[0]?.index ?? 0 })}>
          ${views.map((v, index) => html`<option value=${index} ?selected=${index === place.view}>${v.title ?? v.path ?? index + 1}</option>`)}
        </select>
      </label>
      ${views[place.view]?.type === "sections"
        ? html`<label class="row">
            <span>${this.t("rm_section")}</span>
            <select @change=${(ev) => set({ ...place, section: Number(ev.target.value) })}>
              ${sections.map((s) => html`<option value=${s.index} ?selected=${s.index === place.section}>${s.label}</option>`)}
            </select>
          </label>`
        : nothing}
    `;
  }

  // An existing room shows its own cards, changed; a new one the generated cards.
  _roomPreview() {
    let tile;
    let popupCards;
    const room = this._room;
    if (room) {
      const changed = this._changedConfig();
      tile = room.tile ? cardAt(changed, room.tile) : null;
      const popup = cardAt(changed, room.popup);
      popupCards = popupContent(popup);
    } else {
      const cards = this._newCards();
      tile = cards.length === 2 ? cards[0] : null;
      popupCards = popupContent(cards.at(-1));
    }
    return html`
      ${tile
        ? html`<div class="tile-preview">
            <ss-card-preview bare .hass=${this.hass} .t=${this.t} .needs=${NEEDED_CARDS} .config=${tile}></ss-card-preview>
          </div>`
        : nothing}
      <div class="popup-title"><ha-icon .icon=${this._draft.icon}></ha-icon><b>${this._draft.name}</b></div>
      <ss-card-preview
        .hass=${this.hass}
        .t=${this.t}
        .needs=${NEEDED_CARDS}
        .config=${{ type: "vertical-stack", cards: popupCards }}
      ></ss-card-preview>
    `;
  }

  _otherConfig() {
    const o = this._other;
    const weather = Object.keys(this.hass.states).find((id) => id.startsWith("weather."));
    switch (o.kind) {
      case "scenes":
        return o.scenes.length ? scenesCard(o.scenes) : null;
      case "status":
        return statusCard(this._lang);
      case "weather":
        return weather ? weatherCard(weather) : null;
      default:
        return greetingCard(this._lang, weather);
    }
  }

  _addOther() {
    const dashboard = this._dashboards.find((d) => d.url_path === this._dashboard);
    const o = this._other;
    const card = this._otherConfig();
    const where = this._placeLabel(o.view, o.section);
    this._ask(this.t("oc_add_confirm", { card: this.t(`oc_${o.kind}`), ...where }), () =>
      this._run(async () => {
        const old = await loadDashboard(this.hass, dashboard.url_path);
        await saveDashboard(this.hass, dashboard.url_path, old, addCards(old, o.view, o.section, [card]));
        this._config = await loadDashboard(this.hass, dashboard.url_path);
      }, this.t("oc_added"))
    );
  }

  _otherCards(dashboard) {
    const o = this._other;
    const scenes = Object.keys(this.hass.states).filter((id) => id.startsWith("scene.")).sort();
    const card = this._otherConfig();
    return html`
      <div class="card">
        <h2>${this.t("oc_title")}</h2>
        <p class="hint">${this.t("oc_hint")}</p>
        <div class="layout">
          <div>
            <div class="segment" role="radiogroup">
              ${["greeting", "scenes", "status", "weather"].map(
                (kind) => html`<button
                  role="radio"
                  aria-checked=${o.kind === kind ? "true" : "false"}
                  class=${o.kind === kind ? "active" : ""}
                  @click=${() => (this._other = { ...o, kind })}
                >
                  ${this.t(`oc_${kind}`)}
                </button>`
              )}
            </div>
            ${o.kind === "scenes"
              ? scenes.length
                ? html`<div class="lights">
                    ${scenes.map(
                      (id) => html`<label>
                        <input
                          type="checkbox"
                          .checked=${live(o.scenes.includes(id))}
                          @change=${(ev) =>
                            (this._other = {
                              ...o,
                              scenes: ev.target.checked ? [...o.scenes, id] : o.scenes.filter((s) => s !== id),
                            })}
                        />
                        ${this.hass.states[id].attributes.friendly_name ?? id}
                      </label>`
                    )}
                  </div>`
                : html`<p class="hint">${this.t("oc_no_scenes")}</p>`
              : nothing}
            ${o.kind === "weather" && !card ? html`<p class="hint">${this.t("oc_no_weather")}</p>` : nothing}
            ${this._placePicker(o, (place) => (this._other = { ...o, ...place }))}
            <button class="primary" ?disabled=${this._busy || !card || !dashboard?.editable} @click=${this._addOther}>
              ${this.t("oc_add")}
            </button>
          </div>
          <div>
            ${card
              ? html`<ss-card-preview .hass=${this.hass} .t=${this.t} .needs=${[]} .config=${card}></ss-card-preview>`
              : nothing}
          </div>
        </div>
      </div>
    `;
  }

  static styles = [
    TabBase.styles,
    css`
      select {
        font: inherit;
        max-width: 240px;
        padding: 6px 8px;
        border-radius: 8px;
        border: 1px solid var(--divider-color);
        background: var(--card-background-color);
        color: var(--primary-text-color);
      }

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

      .chip.suggestion {
        border-style: dashed;
        color: var(--secondary-text-color);
      }

      .chip.add {
        color: var(--primary-color);
      }

      .chip.active {
        border-color: var(--primary-color);
        border-style: solid;
        color: var(--primary-text-color);
        background: color-mix(in srgb, var(--primary-color) 14%, var(--card-background-color));
      }

      .row.column {
        flex-direction: column;
        align-items: stretch;
      }

      .lights {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        gap: 4px 12px;
        max-height: 260px;
        overflow-y: auto;
        margin: 6px 0;
        font-size: 14px;
      }

      .lights label {
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .lights input,
      .lights label input {
        accent-color: var(--primary-color);
      }

      .tile-preview {
        max-width: 220px;
        margin-bottom: 12px;
      }

      .popup-title {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 8px;
      }

      details summary {
        cursor: pointer;
        list-style: none;
      }

      details summary h2 {
        display: inline;
      }
    `,
  ];
}

if (!customElements.get("ss-rooms-tab")) {
  customElements.define("ss-rooms-tab", RoomsTab);
}
