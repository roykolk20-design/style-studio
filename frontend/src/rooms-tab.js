import { css, html, nothing } from "lit";
import { live } from "lit/directives/live.js";
import { repeat } from "lit/directives/repeat.js";
import { TabBase } from "./tab-base.js";
import "./card-preview.js";
import "./background-flow.js";
import "./icon-picker.js";
import "./rooms-view.js";
import { NEEDED_CARDS } from "./climate-tab.js";
import { addCards, cardAt, findRooms, roomLike, sectionsOf, updateRoom } from "./dashboard-cards.js";
import { listDashboards, loadDashboard, saveDashboard } from "./dashboards.js";
import { greetingCard, scenesCard, statusCard, weatherCard } from "./other-cards.js";
import { popupContent } from "./popup-format.js";
import { areaEntities, climateButton, roomHash, roomPopup, roomTile } from "./rooms-cards.js";

const POPUP_STYLE = { glass: false, opacity: 80, width_desktop: 540, margin_top_mobile: 20, show_header: true };
const OTHER = "__other";

/**
 * Rooms and other cards on your own dashboards, step by step. It starts
 * with "what do you want to do?": change a room, add a room, add a card, or
 * make a whole page. Each is a short list of steps with the preview beside.
 */
class RoomsTab extends TabBase {
  static properties = {
    ...TabBase.properties,
    _mode: { state: true },
    _step: { state: true },
    _dashboards: { state: true },
    _dashboard: { state: true },
    _config: { state: true },
    _room: { state: true },
    _source: { state: true },
    _draft: { state: true },
    _place: { state: true },
    _filter: { state: true },
    _model: { state: true },
    _card: { state: true },
    _scenes: { state: true },
  };

  constructor() {
    super();
    this._mode = null;
    this._step = 0;
    this._filter = "";
    this._scenes = [];
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
    this._dashboards = (await listDashboards(this.hass, this.hass.localize("panel.states") || "Overview")).filter(
      (d) => d.editable
    );
    if (this._dashboards[0]) await this._pickDashboard(this._dashboards[0].url_path);
  }

  async _pickDashboard(urlPath) {
    this._dashboard = urlPath;
    try {
      this._config = await loadDashboard(this.hass, urlPath);
    } catch (err) {
      this._config = { views: [] };
    }
    this._place = { view: 0, section: sectionsOf(this._config.views?.[0])[0]?.index ?? 0 };
    // New rooms look like the first room already there, unless you pick otherwise.
    this._model = this._found()[0]?.hash ?? null;
    this._room = null;
  }

  _found() {
    return this._config ? findRooms(this._config) : [];
  }

  _start(mode) {
    this._mode = mode;
    this._step = 0;
    this._room = null;
    this._source = null;
    this._card = null;
    this._scenes = [];
    this._filter = "";
    this._toast = null;
    this._draft = { name: "", icon: "mdi:home-outline", lights: [], climate: null };
  }

  // --- choosing a room ------------------------------------------------------

  _pickFound(hash) {
    const room = this._found().find((r) => r.hash === hash);
    this._room = room;
    this._draft = { name: room.name, icon: room.icon, lights: [...room.lights], climate: room.climate };
  }

  // A new room from an area, or one made by hand.
  _pickSource(source) {
    this._source = source;
    if (source === OTHER) {
      this._draft = { name: this.t("rm_new_room"), icon: "mdi:home-outline", lights: [], climate: null };
      return;
    }
    const area = this.hass.areas[source];
    const { lights, climate } = areaEntities(this.hass, area.area_id);
    this._draft = { name: area.name, icon: area.icon || "mdi:home-outline", lights, climate };
    // A room from an area goes under the heading of its floor.
    const floor = this.hass.floors?.[area.floor_id]?.name?.toLowerCase();
    const match = sectionsOf(this._config.views?.[this._place.view]).find(
      (s) => floor && s.label.toLowerCase() === floor
    );
    if (match) this._place = { ...this._place, section: match.index };
  }

  _suggestions() {
    const taken = new Set(this._found().map((room) => room.hash));
    return Object.values(this.hass.areas ?? {})
      .filter((area) => !taken.has(roomHash(area.name)))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  _set(key, value) {
    this._draft = { ...this._draft, [key]: value };
    this._toast = null;
  }

  get dirty() {
    // Nothing happens to the dashboard until the last step, for these either.
    return Boolean(this._mode) && !["page", "background"].includes(this._mode) && this._step > 0;
  }

  // --- the cards ------------------------------------------------------------

  _changedConfig() {
    const d = this._draft;
    return updateRoom(this._config, this._room, {
      ...d,
      climateCard: d.climate ? climateButton(d.climate, d.name, this._labels) : null,
    });
  }

  _newRoom() {
    return { ...this._draft, include: true, climate_button: Boolean(this._draft.climate) };
  }

  _newCards(config = this._config) {
    const room = this._newRoom();
    const model = findRooms(config).find((r) => r.hash === this._model);
    if (model) {
      const climateCard = room.climate ? climateButton(room.climate, room.name, this._labels) : null;
      return roomLike(config, model, { ...room, hash: roomHash(room.name) }, climateCard);
    }
    return [roomTile(room, this._labels), roomPopup(room, POPUP_STYLE, this._labels)];
  }

  _otherConfig() {
    const weather = Object.keys(this.hass.states).find((id) => id.startsWith("weather."));
    switch (this._card) {
      case "scenes":
        return this._scenes.length ? scenesCard(this._scenes) : null;
      case "status":
        return statusCard(this._lang);
      case "weather":
        return weather ? weatherCard(weather) : null;
      case "greeting":
        return greetingCard(this._lang, weather);
      default:
        return null;
    }
  }

  _placeText(view, section) {
    const v = this._config.views[view];
    const heading = sectionsOf(v).find((s) => s.index === section)?.label ?? "";
    return { view: v?.title ?? v?.path ?? `${view + 1}`, section: heading };
  }

  // --- saving -----------------------------------------------------------------

  async _finish(work, message) {
    await this._run(async () => {
      await work();
      await this._pickDashboard(this._dashboard);
      this._mode = null;
    }, message);
  }

  _saveEdit() {
    const hash = this._room.hash;
    this._ask(this.t("rm_update_confirm", { name: this._draft.name }), () =>
      this._finish(async () => {
        const old = await loadDashboard(this.hass, this._dashboard);
        const changed = updateRoom(old, findRooms(old).find((r) => r.hash === hash), {
          ...this._draft,
          climateCard: this._draft.climate ? climateButton(this._draft.climate, this._draft.name, this._labels) : null,
        });
        await saveDashboard(this.hass, this._dashboard, old, changed);
      }, this.t("rm_update_done"))
    );
  }

  _saveNew() {
    const hash = roomHash(this._draft.name);
    if (this._found().some((r) => r.hash === hash)) {
      this._showToast(this.t("rm_hash_taken", { hash }));
      return;
    }
    const where = this._placeText(this._place.view, this._place.section);
    this._ask(this.t("rm_put_confirm", { name: this._draft.name, ...where }), () =>
      this._finish(async () => {
        const old = await loadDashboard(this.hass, this._dashboard);
        const changed = addCards(old, this._place.view, this._place.section, this._newCards(old));
        await saveDashboard(this.hass, this._dashboard, old, changed);
      }, this.t("rm_put_done"))
    );
  }

  _saveCard() {
    const card = this._otherConfig();
    const where = this._placeText(this._place.view, this._place.section);
    this._ask(this.t("oc_add_confirm", { card: this.t(`oc_${this._card}`), ...where }), () =>
      this._finish(async () => {
        const old = await loadDashboard(this.hass, this._dashboard);
        await saveDashboard(this.hass, this._dashboard, old, addCards(old, this._place.view, this._place.section, [card]));
      }, this.t("oc_added"))
    );
  }

  // --- rendering --------------------------------------------------------------

  render() {
    if (!this._dashboards) return nothing;
    if (!this._dashboards.length) return html`<div class="card"><p class="hint">${this.t("cl_readonly")}</p></div>`;
    if (!this._mode) return this._startScreen();
    return html`
      ${this._back(this.t("back"), () => (this._mode = null))}
      ${this._mode === "background"
        ? html`<ss-background-flow
            .hass=${this.hass}
            .narrow=${this.narrow}
            @done=${async (ev) => {
              this._mode = null;
              await this._pickDashboard(this._dashboard);
              this._showToast(ev.detail);
            }}
          ></ss-background-flow>`
        : this._mode === "page"
        ? html`<div class="card"><ss-rooms-view .hass=${this.hass} .narrow=${this.narrow}></ss-rooms-view></div>`
        : html`<div class="layout">
            <div>${this._flow()}</div>
            <aside class="card preview">
              <h2>${this.t("preview")}</h2>
              ${this._preview()}
            </aside>
          </div>`}
      ${this._bar({ canSave: false })}
    `;
  }

  _startScreen() {
    return html`
      <p class="intro">${this.t("rooms_intro")}</p>
      ${this._choices(
        this._toast ? this.t("done_again") : this.t("what_to_do"),
        [
          { key: "edit", icon: "mdi:pencil-outline", title: this.t("rm_do_edit"), text: this.t("rm_do_edit_text") },
          { key: "add", icon: "mdi:plus-box-outline", title: this.t("rm_do_add"), text: this.t("rm_do_add_text") },
          { key: "card", icon: "mdi:card-plus-outline", title: this.t("rm_do_card"), text: this.t("rm_do_card_text") },
          { key: "background", icon: "mdi:image-outline", title: this.t("bg_do"), text: this.t("bg_do_text") },
          { key: "page", icon: "mdi:view-dashboard-outline", title: this.t("rm_do_page"), text: this.t("rm_do_page_text") },
        ],
        (mode) => this._start(mode)
      )}
      ${this._bar({ canSave: false })}
    `;
  }

  _flow() {
    const go = (step) => (this._step = step);
    const d = this._draft;
    const climates = Object.keys(this.hass.states).filter((id) => id.startsWith("climate."));
    const nameStep = {
      title: this.t("st_name_icon"),
      summary: d.name,
      ready: Boolean(d.name.trim()),
      content: this._nameIcon(),
    };
    const lightsStep = {
      title: this.t("st_lights"),
      summary: d.lights.length ? this.t("rm_lights", { count: d.lights.length }) : this.t("rm_no_lights_chosen"),
      content: this._lightList(),
    };
    const climateStep = climates.length
      ? [
          {
            title: this.t("st_climate"),
            summary: d.climate ? this.hass.states[d.climate]?.attributes.friendly_name : this.t("rm_no_climate"),
            content: this._climatePicker(climates),
          },
        ]
      : [];

    if (this._mode === "edit") {
      const steps = [
        {
          title: this.t("st_which_room"),
          summary: this._room?.name,
          ready: Boolean(this._room),
          content: html`${this._dashboardPicker()} ${this._roomButtons()}`,
        },
        nameStep,
        lightsStep,
        ...climateStep,
        { title: this.t("st_save"), content: html`<p class="hint">${this.t("st_save_edit")}</p>` },
      ];
      return this._steps(steps, this._step, go, this._finishButton(this.t("st_save"), () => this._saveEdit()));
    }

    if (this._mode === "add") {
      const model = this._found().find((r) => r.hash === this._model);
      const steps = [
        {
          title: this.t("st_where"),
          summary: Object.values(this._placeText(this._place.view, this._place.section)).filter(Boolean).join(" › "),
          content: html`${this._dashboardPicker()} ${this._placePicker()}`,
        },
        {
          title: this.t("st_which_room"),
          summary: d.name,
          ready: Boolean(this._source),
          content: this._sourceButtons(),
        },
        nameStep,
        lightsStep,
        ...climateStep,
        {
          title: this.t("st_save"),
          content: html`<p class="hint">
              ${model ? this.t("st_save_like", { name: model.name }) : this.t("st_save_standard")}
            </p>
            ${this._more(this._designPicker())}`,
        },
      ];
      return this._steps(steps, this._step, go, this._finishButton(this.t("rm_put"), () => this._saveNew()));
    }

    // A card.
    const scenes = Object.keys(this.hass.states).filter((id) => id.startsWith("scene.")).sort();
    const steps = [
      {
        title: this.t("st_which_card"),
        summary: this._card ? this.t(`oc_${this._card}`) : "",
        ready: Boolean(this._card),
        content: this._cardButtons(),
      },
      ...(this._card === "scenes"
        ? [
            {
              title: this.t("st_scenes"),
              summary: `${this._scenes.length}`,
              ready: this._scenes.length > 0,
              content: scenes.length
                ? html`<div class="checks">
                    ${scenes.map(
                      (id) => html`<label>
                        <input
                          type="checkbox"
                          .checked=${live(this._scenes.includes(id))}
                          @change=${(ev) =>
                            (this._scenes = ev.target.checked ? [...this._scenes, id] : this._scenes.filter((s) => s !== id))}
                        />
                        ${this.hass.states[id].attributes.friendly_name ?? id}
                      </label>`
                    )}
                  </div>`
                : html`<p class="hint">${this.t("oc_no_scenes")}</p>`,
            },
          ]
        : []),
      {
        title: this.t("st_where"),
        content: html`${this._dashboardPicker()} ${this._placePicker()}`,
      },
    ];
    return this._steps(
      steps,
      this._step,
      go,
      this._finishButton(this.t("st_add"), () => this._saveCard(), !this._otherConfig())
    );
  }

  _finishButton(label, action, disabled = false) {
    return html`<button class="primary next" ?disabled=${this._busy || disabled} @click=${action}>${label}</button>`;
  }

  _dashboardPicker() {
    if (this._dashboards.length < 2) return nothing;
    return html`<label class="row">
      <span>${this.t("cl_dashboard")}</span>
      <select @change=${(ev) => this._pickDashboard(ev.target.value || null)}>
        ${this._dashboards.map(
          (d) => html`<option value=${d.url_path ?? ""} ?selected=${d.url_path === this._dashboard}>${d.title}</option>`
        )}
      </select>
    </label>`;
  }

  _placePicker() {
    const views = this._config.views ?? [];
    const place = this._place;
    const sections = sectionsOf(views[place.view]);
    return html`
      <label class="row">
        <span>${this.t("lbl_page")}</span>
        <select
          @change=${(ev) =>
            (this._place = { view: Number(ev.target.value), section: sectionsOf(views[Number(ev.target.value)])[0]?.index ?? 0 })}
        >
          ${views.map((v, index) => html`<option value=${index} ?selected=${index === place.view}>${v.title ?? v.path ?? index + 1}</option>`)}
        </select>
      </label>
      ${views[place.view]?.type === "sections"
        ? html`<label class="row">
            <span>${this.t("lbl_heading")}</span>
            <select @change=${(ev) => (this._place = { ...place, section: Number(ev.target.value) })}>
              ${sections.map((s) => html`<option value=${s.index} ?selected=${s.index === place.section}>${s.label}</option>`)}
            </select>
          </label>`
        : nothing}
    `;
  }

  _roomButtons() {
    const found = this._found();
    if (!found.length) return html`<p class="hint">${this.t("rm_no_rooms_found")}</p>`;
    return html`<div class="tiles">
      ${found.map(
        (r) => html`<button class="tile ${this._room?.hash === r.hash ? "active" : ""}" @click=${() => this._pickFound(r.hash)}>
          <ha-icon .icon=${r.icon}></ha-icon>${r.name}
        </button>`
      )}
    </div>`;
  }

  _sourceButtons() {
    return html`<div class="tiles">
      ${this._suggestions().map(
        (area) => html`<button
          class="tile ${this._source === area.area_id ? "active" : ""}"
          @click=${() => this._pickSource(area.area_id)}
        >
          <ha-icon .icon=${area.icon || "mdi:home-outline"}></ha-icon>${area.name}
        </button>`
      )}
      <button class="tile ${this._source === OTHER ? "active" : ""}" @click=${() => this._pickSource(OTHER)}>
        <ha-icon icon="mdi:plus"></ha-icon>${this.t("rm_other_room")}
      </button>
    </div>`;
  }

  _cardButtons() {
    const kinds = [
      ["greeting", "mdi:hand-wave-outline"],
      ["scenes", "mdi:palette-outline"],
      ["status", "mdi:home-alert-outline"],
      ["weather", "mdi:weather-partly-cloudy"],
    ];
    return html`<div class="tiles wide">
      ${kinds.map(
        ([kind, icon]) => html`<button
          class="tile ${this._card === kind ? "active" : ""}"
          data-card=${kind}
          @click=${() => (this._card = kind)}
        >
          <ha-icon .icon=${icon}></ha-icon>
          <span><b>${this.t(`oc_${kind}`)}</b><small>${this.t(`oc_${kind}_text`)}</small></span>
        </button>`
      )}
    </div>`;
  }

  _nameIcon() {
    const d = this._draft;
    return html`
      <label class="row">
        <span>${this.t("cl_name")}</span>
        <input type="text" .value=${d.name} @input=${(ev) => this._set("name", ev.target.value)} />
      </label>
      <ss-icon-picker .value=${d.icon} .t=${this.t} @change=${(ev) => this._set("icon", ev.detail)}></ss-icon-picker>
    `;
  }

  _climatePicker(climates) {
    const d = this._draft;
    return html`<label class="row">
      <span>${this.t("rm_climate_pick")}</span>
      <select @change=${(ev) => this._set("climate", ev.target.value || null)}>
        <option value="" ?selected=${!d.climate}>${this.t("rm_no_climate")}</option>
        ${climates.map(
          (id) => html`<option value=${id} ?selected=${id === d.climate}>${this.hass.states[id].attributes.friendly_name ?? id}</option>`
        )}
      </select>
    </label>`;
  }

  _lightList() {
    const d = this._draft;
    const all = Object.keys(this.hass.states)
      .filter((id) => id.startsWith("light."))
      .map((id) => ({ id, name: this.hass.states[id].attributes.friendly_name ?? id }))
      .filter((l) => !this._filter || l.name.toLowerCase().includes(this._filter) || l.id.includes(this._filter))
      // A steady order: rows must not move under the pointer while you tick them.
      .sort((a, b) => a.name.localeCompare(b.name));
    return html`
      <input
        type="search"
        class="search"
        placeholder=${this.t("rm_filter")}
        aria-label=${this.t("rm_filter")}
        .value=${this._filter}
        @input=${(ev) => (this._filter = ev.target.value.toLowerCase())}
      />
      <div class="checks">
        ${repeat(
          all,
          (l) => l.id,
          (l) => html`<label>
            <input
              type="checkbox"
              .checked=${live(d.lights.includes(l.id))}
              @change=${(ev) => this._set("lights", ev.target.checked ? [...d.lights, l.id] : d.lights.filter((x) => x !== l.id))}
            />
            ${l.name}
          </label>`
        )}
      </div>
    `;
  }

  _designPicker() {
    return html`
      <label class="row">
        <span>${this.t("rm_design")}</span>
        <select @change=${(ev) => (this._model = ev.target.value || null)}>
          ${this._found().map(
            (r) => html`<option value=${r.hash} ?selected=${r.hash === this._model}>${this.t("rm_like", { name: r.name })}</option>`
          )}
          <option value="" ?selected=${!this._model}>${this.t("rm_standard")}</option>
        </select>
      </label>
      ${this._model ? nothing : this._popupFormat()}
    `;
  }

  _preview() {
    if (this._mode === "card") {
      const card = this._otherConfig();
      return card
        ? html`<ss-card-preview .hass=${this.hass} .t=${this.t} .needs=${[]} .config=${card}></ss-card-preview>`
        : html`<p class="hint">${this.t("st_which_card")}</p>`;
    }
    if (this._mode === "edit" && !this._room) return html`<p class="hint">${this.t("st_which_room")}</p>`;
    if (this._mode === "add" && !this._source) return html`<p class="hint">${this.t("st_which_room")}</p>`;

    let tile;
    let popupCards;
    if (this._mode === "edit") {
      const changed = this._changedConfig();
      tile = this._room.tile ? cardAt(changed, this._room.tile) : null;
      popupCards = popupContent(cardAt(changed, this._room.popup));
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

      .tiles {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }

      .tile {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 10px 14px;
        border-radius: 12px;
        border: 1px solid var(--divider-color);
        background: var(--card-background-color);
        text-align: start;
      }

      .tile ha-icon {
        color: var(--primary-color);
        flex-shrink: 0;
      }

      .tile.active {
        border-color: var(--primary-color);
        background: color-mix(in srgb, var(--primary-color) 14%, var(--card-background-color));
      }

      .tiles.wide {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      }

      .tiles.wide .tile {
        align-items: flex-start;
      }

      .tile small {
        display: block;
        margin: 2px 0 0;
      }

      .search {
        width: 100%;
        box-sizing: border-box;
        font: inherit;
        padding: 8px 10px;
        margin-bottom: 8px;
        border-radius: 8px;
        border: 1px solid var(--divider-color);
        background: var(--card-background-color);
        color: var(--primary-text-color);
      }

      .checks {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        gap: 6px 12px;
        max-height: 280px;
        overflow-y: auto;
      }

      .checks label {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .checks input {
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
    `,
  ];
}

if (!customElements.get("ss-rooms-tab")) {
  customElements.define("ss-rooms-tab", RoomsTab);
}
