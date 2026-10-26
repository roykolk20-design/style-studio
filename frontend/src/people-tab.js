import { css, html, nothing } from "lit";
import { TabBase } from "./tab-base.js";

const clone = (value) => (value == null ? value : JSON.parse(JSON.stringify(value)));
const same = (a, b) => JSON.stringify(a ?? null) === JSON.stringify(b ?? null);

/** A theme and sidebar order per person, applied by www/person.js. */
class PeopleTab extends TabBase {
  static properties = {
    ...TabBase.properties,
    _state: { state: true },
    _draft: { state: true },
  };

  connectedCallback() {
    super.connectedCallback();
    this._load();
  }

  async _load() {
    try {
      this._accept(await this.hass.callWS({ type: "style_studio/people/get" }));
    } catch (err) {
      this._error(err);
    }
  }

  _accept(state) {
    this._state = state;
    this._draft = this._fromSaved();
  }

  // { user id: { theme, sidebar } } with null for "their own choice".
  _fromSaved() {
    return Object.fromEntries(
      this._state.users.map((user) => {
        const person = this._state.persons[user.id] ?? {};
        return [user.id, { theme: person.theme ?? null, sidebar: clone(person.sidebar ?? null) }];
      })
    );
  }

  get dirty() {
    return Boolean(this._state) && !same(this._draft, this._fromSaved());
  }

  _setPerson(userId, changes) {
    this._draft = { ...this._draft, [userId]: { ...this._draft[userId], ...changes } };
    this._toast = null;
  }

  // The newest report per user: what their latest device uses.
  _latest(userId) {
    return this._state.reports.find((report) => report.user_id === userId) ?? null;
  }

  _devices(userId) {
    return this._state.reports.filter((report) => report.user_id === userId);
  }

  _save() {
    this._run(async () => {
      this._accept(await this.hass.callWS({ type: "style_studio/people/save", persons: this._draft }));
      // Open browsers apply it within seconds and report back; show that.
      clearTimeout(this._refresh);
      this._refresh = setTimeout(() => !this.dirty && this._load(), 4000);
    }, this.t("saved"));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearTimeout(this._refresh);
  }

  _undo() {
    this._ask(this.t("undo_confirm"), () =>
      this._run(async () => {
        const result = await this.hass.callWS({ type: "style_studio/people/undo" });
        if (!result.restored) throw new Error(this.t("nothing_to_undo"));
        this._accept(result);
      }, this.t("undone"))
    );
  }

  _when(iso) {
    const seconds = (new Date(iso).getTime() - Date.now()) / 1000;
    const format = new Intl.RelativeTimeFormat(this.hass.locale?.language ?? "nl", { numeric: "auto" });
    for (const [unit, size] of [
      ["day", 86400],
      ["hour", 3600],
      ["minute", 60],
    ]) {
      if (Math.abs(seconds) >= size) return format.format(Math.round(seconds / size), unit);
    }
    return format.format(0, "minute");
  }

  render() {
    if (!this._state || !this._draft) return nothing;
    const { users, themes } = this._state;
    return html`
      <p class="intro">${this.t("people_intro")}</p>
      ${themes.length ? nothing : this._warning(this.t("no_themes_yet"))}
      ${this._state.not_loaded?.length
        ? this._warning(this.t("people_not_loaded", { names: this._state.not_loaded.join(", ") }))
        : nothing}
      <div class="people">${users.map((user) => this._person(user))}</div>
      ${this._bar({
        left: this._state.history
          ? html`<button ?disabled=${this._busy} @click=${this._undo}>
              <ha-icon icon="mdi:history"></ha-icon>${this.t("undo")}
            </button>`
          : nothing,
        onCancel: () => (this._draft = this._fromSaved()),
        onSave: () => this._save(),
      })}
    `;
  }

  _person(user) {
    const draft = this._draft[user.id];
    const saved = this._state.persons[user.id] ?? {};
    const latest = this._latest(user.id);
    const devices = this._devices(user.id);
    const others = this._state.users.filter((other) => other.id !== user.id);
    const withSidebar = others.filter((other) => this._latest(other.id)?.sidebar);

    return html`
      <div class="card person" data-user=${user.name}>
        <div class="head">
          <ha-icon icon=${user.is_admin ? "mdi:account-star" : "mdi:account"}></ha-icon>
          <div class="who">
            <h2>${user.name}</h2>
            <small>
              ${latest
                ? html`${this.t("last_seen", { when: this._when(latest.at) })} ·
                  ${devices.length === 1 ? this.t("device_one") : this.t("devices", { count: devices.length })}
                  ${devices.some((d) => d.app) ? html`<em>${this.t("app_badge")}</em>` : nothing}`
                : this.t("never_seen")}
            </small>
          </div>
          <label class="copy">
            <span>${this.t("copy_all_from")}</span>
            <select
              aria-label="${this.t("copy_all_from")} (${user.name})"
              @change=${(ev) => {
                const from = ev.target.value;
                ev.target.value = "";
                if (!from) return;
                const source = this._draft[from];
                this._setPerson(user.id, {
                  theme: source.theme ?? this._latest(from)?.theme ?? null,
                  sidebar: clone(source.sidebar ?? this._latest(from)?.sidebar ?? null),
                });
              }}
            >
              <option value="">${this.t("pick_person")}</option>
              ${others.map((other) => html`<option value=${other.id}>${other.name}</option>`)}
            </select>
          </label>
        </div>

        <div class="row">
          <span>
            ${this.t("person_theme")}
            <small>${this.t("now_uses", { value: latest ? latest.theme || this.t("ha_default") : this.t("unknown") })}</small>
            ${this._status(user, draft.theme, saved.theme, latest?.theme, latest)}
          </span>
          <select
            aria-label="${this.t("person_theme")} (${user.name})"
            .value=${draft.theme ?? ""}
            @change=${(ev) => this._setPerson(user.id, { theme: ev.target.value || null })}
          >
            <option value="" ?selected=${!draft.theme}>${this.t("self_choice")}</option>
            ${this._themeOptions(draft.theme)}
          </select>
        </div>

        <div class="row">
          <span>
            ${this.t("person_sidebar")}
            <small>${this._sidebarSummary(draft.sidebar ?? latest?.sidebar)}</small>
            ${this._status(user, draft.sidebar, saved.sidebar, latest?.sidebar, latest)}
          </span>
          <select
            aria-label="${this.t("person_sidebar")} (${user.name})"
            @change=${(ev) => {
              const from = ev.target.value;
              if (from === "") this._setPerson(user.id, { sidebar: null });
              else if (from !== "keep") this._setPerson(user.id, { sidebar: clone(this._latest(from).sidebar) });
            }}
          >
            <option value="" ?selected=${!draft.sidebar}>${this.t("self_choice")}</option>
            ${draft.sidebar ? html`<option value="keep" selected>${this._sidebarSummary(draft.sidebar)}</option>` : nothing}
            ${withSidebar.map(
              (other) => html`<option value=${other.id}>${this.t("like_person", { name: other.name })}</option>`
            )}
            ${latest?.sidebar
              ? html`<option value=${user.id}>${this.t("like_person", { name: user.name })}</option>`
              : nothing}
          </select>
        </div>
      </div>
    `;
  }

  _themeOptions(selected) {
    const names = [...this._state.themes];
    // Keep a theme that was picked before even if it isn't loaded now.
    if (selected && !names.includes(selected)) names.push(selected);
    return names.map((name) => html`<option ?selected=${name === selected}>${name}</option>`);
  }

  _sidebarSummary(sidebar) {
    if (!sidebar) return this.t("unknown");
    return [
      this.t("order_count", { count: sidebar.panelOrder?.length ?? 0 }),
      this.t("hidden_count", { count: sidebar.hiddenPanels?.length ?? 0 }),
    ].join(" · ");
  }

  // Applied, waiting for the person, or nothing when they choose themselves.
  _status(user, draft, saved, reported, latest) {
    if (draft == null || !same(draft, saved)) return nothing;
    const done = latest && same(reported, saved);
    return html`<small class=${done ? "ok" : "wait"}>
      <ha-icon icon=${done ? "mdi:check-circle" : "mdi:clock-outline"}></ha-icon>
      ${done ? this.t("applied") : this.t("pending", { name: user.name })}
    </small>`;
  }

  static styles = [
    TabBase.styles,
    css`
      .people {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
        gap: 16px;
      }

      @media (max-width: 600px) {
        .people {
          grid-template-columns: minmax(0, 1fr);
        }
      }

      .person {
        margin: 0;
      }

      .head {
        display: flex;
        align-items: center;
        gap: 12px;
        flex-wrap: wrap;
        padding-bottom: 8px;
        border-bottom: 1px solid var(--divider-color);
      }

      .head > ha-icon {
        color: var(--primary-color);
        --mdc-icon-size: 28px;
      }

      .who {
        flex: 1;
        min-width: 140px;
      }

      .who h2 {
        margin: 0;
      }

      .who small {
        margin: 0;
      }

      em {
        font-style: normal;
        font-size: 11px;
        padding: 1px 6px;
        margin-inline-start: 4px;
        border-radius: 999px;
        background: var(--secondary-background-color);
      }

      .copy {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 13px;
        color: var(--secondary-text-color);
      }

      select {
        font: inherit;
        max-width: 200px;
        padding: 6px 8px;
        border-radius: 8px;
        border: 1px solid var(--divider-color);
        background: var(--card-background-color);
        color: var(--primary-text-color);
      }

      small.ok,
      small.wait {
        display: flex;
        align-items: center;
        gap: 4px;
        margin-top: 4px;
      }

      small.ok {
        color: var(--success-color, #43a047);
      }

      small ha-icon {
        --mdc-icon-size: 16px;
      }

      @media (max-width: 600px) {
        .row {
          flex-direction: column;
          align-items: stretch;
        }

        select {
          max-width: none;
        }
      }
    `,
  ];
}

if (!customElements.get("ss-people-tab")) {
  customElements.define("ss-people-tab", PeopleTab);
}
