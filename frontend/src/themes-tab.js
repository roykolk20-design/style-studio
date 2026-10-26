import { css, html, nothing } from "lit";
import { TabBase } from "./tab-base.js";
import "./theme-preview.js";
import {
  BASE_DEFAULTS,
  GROUPS,
  KNOWN_VARS,
  PRESETS,
  derive,
  fromExisting,
  themeVars,
} from "./theme-catalog.js";

const clone = (value) => (value == null ? value : JSON.parse(JSON.stringify(value)));

// "#abc", "#aabbcc" or "rgb(1, 2, 3)" as "#aabbcc"; anything else is null.
function toHex(value) {
  const text = String(value).trim().toLowerCase();
  if (/^#[0-9a-f]{6}$/.test(text)) return text;
  if (/^#[0-9a-f]{3}$/.test(text)) return `#${[...text.slice(1)].map((c) => c + c).join("")}`;
  const rgb = text.match(/^rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)/);
  return rgb ? `#${rgb.slice(1, 4).map((n) => Number(n).toString(16).padStart(2, "0")).join("")}` : null;
}
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const HEX = /^#[0-9a-f]{6}$/i;
const NEW = "new";

/** Make, edit and remove themes; they are written to themes/style_studio.yaml. */
class ThemesTab extends TabBase {
  static properties = {
    ...TabBase.properties,
    _state: { state: true },
    _selected: { state: true },
    _draft: { state: true },
    _picking: { state: true },
    _wholeScreen: { state: true },
    _popup: { state: true },
    _newVar: { state: true },
    _mode: { state: true },
    _step: { state: true },
  };

  constructor() {
    super();
    this._selected = null;
    this._draft = null;
    this._picking = false;
    this._wholeScreen = false;
    this._popup = true;
    this._newVar = { key: "", value: "" };
    this._applied = null;
    this._mode = null;
    this._step = 0;
  }

  connectedCallback() {
    super.connectedCallback();
    this._load();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._applyToScreen(null);
  }

  updated() {
    this._applyToScreen(this._wholeScreen && this._draft ? themeVars(this._draft) : null);
  }

  get _lang() {
    return (this.hass?.locale?.language || this.hass?.language || "nl").startsWith("nl")
      ? "nl"
      : "en";
  }

  get _saved() {
    return this._state?.themes.find((theme) => theme.id === this._selected) ?? null;
  }

  get dirty() {
    if (!this._draft) return false;
    // The theme you use now, opened untouched, isn't a change yet.
    if (this._selected === NEW) return !this._pristine || !same(this._editable(this._draft), this._pristine);
    const saved = this._saved;
    return !saved || !same(this._editable(this._draft), this._editable(saved));
  }

  _editable(theme) {
    return { name: theme.name, base: theme.base, overrides: theme.overrides };
  }

  async _load(select) {
    try {
      this._state = await this.hass.callWS({ type: "style_studio/themes/get" });
      if (select) this._select(select);
    } catch (err) {
      this._error(err);
    }
  }

  _select(id) {
    const theme = this._state.themes.find((t) => t.id === id);
    this._selected = theme ? id : null;
    this._draft = theme ? clone(this._editable(theme)) : null;
    this._picking = !theme;
  }

  // Shows the draft on the whole page in this browser, the way HA applies a
  // theme: as properties on <html>. What was there before is put back.
  _applyToScreen(vars) {
    const root = document.documentElement;
    if (this._applied) {
      for (const [key, value] of Object.entries(this._applied)) {
        if (value) root.style.setProperty(key, value);
        else root.style.removeProperty(key);
      }
      this._applied = null;
    }
    if (!vars) return;
    this._applied = {};
    for (const [key, value] of Object.entries(vars)) {
      this._applied[`--${key}`] = root.style.getPropertyValue(`--${key}`);
      root.style.setProperty(`--${key}`, value);
    }
  }

  _uniqueName(name) {
    const taken = new Set([
      ...this._state.themes.map((t) => t.name.toLowerCase()),
      ...Object.keys(this._state.others).map((n) => n.toLowerCase()),
    ]);
    let candidate = name;
    for (let n = 2; taken.has(candidate.toLowerCase()); n += 1) candidate = `${name} ${n}`;
    return candidate;
  }

  _startNew(name, base, overrides = {}) {
    this._selected = NEW;
    this._picking = false;
    this._draft = { name: this._uniqueName(name), base: clone(base), overrides: clone(overrides) };
    this._pristine = null;
  }

  // The theme this screen uses now: its name and a start for a new theme.
  _current() {
    const name = this.hass.selectedTheme?.theme;
    if (name && name !== "default" && this._state.others[name]) {
      return { name, ...fromExisting(this._state.others[name]) };
    }
    // HA's own theme, or one we can't read: take the colors on screen, as
    // base colors only, so the quick settings keep working.
    const style = getComputedStyle(document.documentElement);
    const onScreen = {};
    for (const key of KNOWN_VARS) {
      const hex = toHex(style.getPropertyValue(`--${key}`));
      if (hex) onScreen[key] = hex;
    }
    return { name: this.t("my_theme"), base: fromExisting(onScreen).base, overrides: {} };
  }

  _startFromCurrent() {
    const ours = this._state.themes.find((t) => t.name === this.hass.selectedTheme?.theme);
    if (ours) {
      this._select(ours.id);
      return;
    }
    const { name, base, overrides } = this._current();
    this._startNew(name === this.t("my_theme") ? name : `${name} (${this.t("copy_suffix")})`, base, overrides);
    this._pristine = clone(this._draft);
  }

  _set(key, value) {
    this._draft = { ...this._draft, base: { ...this._draft.base, [key]: value } };
    this._toast = null;
  }

  _override(key, value) {
    const overrides = { ...this._draft.overrides };
    if (value === "" || value == null) delete overrides[key];
    else overrides[key] = value;
    this._draft = { ...this._draft, overrides };
    this._toast = null;
  }

  _save() {
    const theme = { ...this._draft, vars: themeVars(this._draft) };
    if (this._selected !== NEW) theme.id = this._selected;
    this._run(async () => {
      try {
        const result = await this.hass.callWS({ type: "style_studio/themes/save", theme });
        this._wholeScreen = false;
        this._state = result;
        this._select(result.theme.id);
        // Saved: next, use it.
        this._mode = "use";
      } catch (err) {
        throw this._known(err);
      }
    }, this.t("saved_theme", { file: this._state.file }));
  }

  get _nameOk() {
    return /^[\p{L}\p{N}_][\p{L}\p{N}_ .()&+'-]*$/u.test((this._draft?.name ?? "").trim());
  }

  _known(err) {
    if (err?.code === "reload_failed") return new Error(this.t("err_reload_failed", { message: err.message }));
    const key = { file_exists: "err_file_exists", name_taken: "err_name_taken" }[err?.code];
    return key ? new Error(this.t(key)) : err;
  }

  _delete() {
    this._ask(this.t("delete_confirm", { name: this._saved.name }), () =>
      this._run(async () => {
        this._state = await this.hass.callWS({
          type: "style_studio/themes/delete",
          theme_id: this._selected,
        });
        this._select(null);
        this._mode = null;
      }, this.t("deleted"))
    );
  }

  _undo() {
    this._ask(this.t("undo_confirm"), () =>
      this._run(async () => {
        const result = await this.hass.callWS({ type: "style_studio/themes/undo" });
        if (!result.restored) throw new Error(this.t("nothing_to_undo"));
        this._state = result;
        this._select(this._selected);
      }, this.t("undone"))
    );
  }

  _setDefault(name = this._saved.name) {
    this._run(async () => {
      this._state = await this.hass.callWS({ type: "style_studio/themes/set_default", name });
    }, this.t("default_set", { name }));
  }

  _begin(mode) {
    this._mode = mode;
    this._step = 0;
    this._select(null);
    this._toast = null;
    if (mode === "new") this._startFromCurrent();
  }

  _home() {
    const go = () => {
      this._wholeScreen = false;
      this._select(null);
      this._mode = null;
    };
    if (this.dirty) this._ask(this.t("discard_confirm"), go);
    else go();
  }

  render() {
    if (!this._state) return nothing;
    if (!this._mode) return this._startScreen();
    if (this._mode === "use") {
      return html`${this._back(this.t("back"), () => this._home())} ${this._useList()} ${this._bar({ canSave: false })}`;
    }
    return html`
      ${this._back(this.t("back"), () => this._home())}
      <div class="layout">
        <div>${this._flow()}</div>
        ${this._draft ? this._previewCard() : html`<aside class="card preview"><p class="hint">${this.t("st_which_theme")}</p></aside>`}
      </div>
      ${this._bar({ canSave: false })}
    `;
  }

  _startScreen() {
    const items = [];
    if (this._state.themes.length) {
      items.push({ key: "edit", icon: "mdi:palette-outline", title: this.t("th_do_edit"), text: this.t("th_do_edit_text") });
    }
    items.push(
      { key: "new", icon: "mdi:plus-circle-outline", title: this.t("th_do_new"), text: this.t("th_do_new_text") },
      { key: "use", icon: "mdi:account-check-outline", title: this.t("th_do_use"), text: this.t("th_do_use_text") }
    );
    return html`
      <p class="intro">${this.t("themes_intro")}</p>
      ${this._choices(this.t("what_to_do"), items, (mode) => this._begin(mode))}
      ${this._bar({
        left: this._state.history
          ? html`<button ?disabled=${this._busy} @click=${this._undo}>
              <ha-icon icon="mdi:history"></ha-icon>${this.t("undo")}
            </button>`
          : nothing,
        canSave: false,
      })}
    `;
  }

  _flow() {
    const go = (step) => (this._step = step);
    const d = this._draft;
    const first =
      this._mode === "edit"
        ? { title: this.t("st_which_theme"), summary: d?.name, ready: Boolean(d), content: this._themeTiles() }
        : { title: this.t("start_from"), summary: d?.name, ready: Boolean(d), content: this._picker() };
    if (!d) return this._steps([first], 0, go);
    const b = { ...BASE_DEFAULTS, ...d.base };
    const saved = this._selected !== NEW ? this._saved : null;
    const steps = [
      first,
      { title: this.t("st_colors"), content: this._colors(b) },
      { title: this.t("st_shape"), content: this._shape(b) },
      {
        title: this.t("st_name_save"),
        content: html`
          ${saved && !this._state.loaded.includes(saved.name) ? this._warning(this.t("warn_not_loaded")) : nothing}
          <label class="row">
            <span>${this.t("theme_name")}</span>
            <input
              type="text"
              class="name"
              maxlength="50"
              .value=${d.name}
              @input=${(ev) => {
                this._draft = { ...this._draft, name: ev.target.value };
              }}
            />
          </label>
          ${this._nameOk ? nothing : html`<p class="hint bad">${this.t("err_bad_name")}</p>`}
          ${this._more(html`${this._allVars()}
            ${saved
              ? html`<button class="small danger" ?disabled=${this._busy} @click=${this._delete}>
                  <ha-icon icon="mdi:delete-outline"></ha-icon>${this.t("delete_theme")}
                </button>`
              : nothing}`)}
        `,
      },
    ];
    return this._steps(
      steps,
      this._step,
      go,
      html`<button class="primary next" ?disabled=${this._busy || !this._nameOk} @click=${() => this._save()}>
        ${this.t("save")}
      </button>`
    );
  }

  _themeTiles() {
    const { themes, loaded } = this._state;
    return html`<div class="chips">
      ${themes.map(
        (theme) => html`<button
          class="chip ${theme.id === this._selected ? "active" : ""}"
          @click=${() => this._select(theme.id)}
        >
          <span class="swatch" style="background:${theme.vars["primary-color"]}"></span>
          ${theme.name}
          ${loaded.includes(theme.name) ? nothing : html`<em class="bad">${this.t("badge_not_loaded")}</em>`}
        </button>`
      )}
    </div>`;
  }

  _colors(b) {
    const derived = derive(b);
    return html`
      ${this._fixedNotice()}
      ${this._color(b, "background", this.t("c_background"))}
      ${this._color(b, "card", this.t("c_card"))}
      ${this._color(b, "text", this.t("c_text"))}
      ${this._color(b, "accent", this.t("c_accent"))}
      ${this._color(b, "sidebar", this.t("c_sidebar"))}
      <label class="row">
        <span>
          ${this.t("c_icons")}
          <small>${this.t("c_icons_hint")}</small>
        </span>
        <span class="inline">
          ${b.icon
            ? html`<input
                type="color"
                aria-label=${this.t("c_icons")}
                .value=${b.icon}
                @input=${(ev) => this._set("icon", ev.target.value)}
              />`
            : nothing}
          <input
            type="checkbox"
            class="switch"
            aria-label=${this.t("c_icons_own")}
            .checked=${Boolean(b.icon)}
            @change=${(ev) => this._set("icon", ev.target.checked ? derived["state-icon-color"] : null)}
          />
        </span>
      </label>
      <label class="row">
        <span>${this.t("header_same")}</span>
        <span class="inline">
          ${b.header
            ? html`<input
                type="color"
                aria-label=${this.t("c_header")}
                .value=${b.header}
                @input=${(ev) => this._set("header", ev.target.value)}
              />`
            : nothing}
          <input
            type="checkbox"
            class="switch"
            .checked=${!b.header}
            @change=${(ev) => this._set("header", ev.target.checked ? null : b.background)}
          />
        </span>
      </label>
    `;
  }

  _shape(b) {
    return html`
      ${this._slider(b, "radius", this.t("corners"), 0, 28, "px")}
      <div class="row">
        <span>${this.t("shadow")}</span>
        ${this._segment(b, "shadow", [
          ["none", this.t("shadow_none")],
          ["soft", this.t("shadow_soft")],
          ["strong", this.t("shadow_strong")],
        ])}
      </div>
      ${this._slider(b, "card_opacity", this.t("card_opacity"), 40, 100, "%", false, this.t("card_opacity_hint"))}
      <div class="row">
        <span>${this.t("popups")}</span>
        ${this._segment(b, "popup", [
          ["solid", this.t("popup_solid")],
          ["glass", this.t("popup_glass")],
        ])}
      </div>
      ${b.popup === "glass" ? this._slider(b, "popup_opacity", this.t("popup_opacity"), 30, 100, "%") : nothing}
    `;
  }

  _allVars() {
    const d = this._draft;
    const derived = derive({ ...BASE_DEFAULTS, ...d.base });
    const vars = themeVars(d);
    return html`
      <h3>${this.t("all_vars")}</h3>
      <p class="hint">${this.t("all_vars_hint")}</p>
      ${GROUPS.map(
        (group) => html`
          <details>
            <summary>
              ${group[this._lang]}
              <span class="dots">
                ${group.vars
                  .filter(([, , , kind]) => kind === "color")
                  .slice(0, 6)
                  .map(([key]) => html`<i style="background:${vars[key]}"></i>`)}
              </span>
            </summary>
            ${group.vars.map(([key, nl, en, kind]) => this._varRow(key, this._lang === "nl" ? nl : en, kind, derived[key]))}
          </details>
        `
      )}
      <h3>${this.t("custom_vars")}</h3>
      <p class="hint">${this.t("custom_vars_hint")}</p>
      ${Object.entries(d.overrides)
        .filter(([key]) => !KNOWN_VARS.has(key))
        .map(([key, value]) => this._varRow(key, `--${key}`, "text", "", value, true))}
      <div class="row add-var">
        <input
          type="text"
          placeholder=${this.t("var_name")}
          .value=${this._newVar.key}
          @input=${(ev) => (this._newVar = { ...this._newVar, key: ev.target.value })}
        />
        <input
          type="text"
          placeholder=${this.t("var_value")}
          .value=${this._newVar.value}
          @input=${(ev) => (this._newVar = { ...this._newVar, value: ev.target.value })}
        />
        <button
          class="small"
          ?disabled=${!/^[a-z0-9][a-z0-9_-]*$/.test(this._newVar.key.replace(/^--/, "")) || !this._newVar.value}
          @click=${() => {
            this._override(this._newVar.key.replace(/^--/, ""), this._newVar.value);
            this._newVar = { key: "", value: "" };
          }}
        >
          ${this.t("add_var")}
        </button>
      </div>
    `;
  }

  _previewCard() {
    return html`<aside class="card preview">
      <h2>${this.t("preview")}</h2>
      <ss-theme-preview .vars=${themeVars(this._draft)} .t=${this.t} ?popup=${this._popup}></ss-theme-preview>
      <label class="row">
        <span>${this.t("show_popup")}</span>
        <input type="checkbox" class="switch" .checked=${this._popup} @change=${(ev) => (this._popup = ev.target.checked)} />
      </label>
      <label class="row">
        <span>
          ${this.t("whole_screen")}
          <small>${this.t("whole_screen_hint")}</small>
        </span>
        <input
          type="checkbox"
          class="switch"
          .checked=${this._wholeScreen}
          @change=${(ev) => (this._wholeScreen = ev.target.checked)}
        />
      </label>
    </aside>`;
  }

  // Use a theme: for yourself right away, or as the default for everyone.
  _useList() {
    const { themes, loaded, default_theme: fallback } = this._state;
    const row = (name, color) => html`<div class="use-row" data-theme=${name}>
      <span class="swatch" style="background:${color ?? "var(--primary-color)"}"></span>
      <b>${name}</b>
      ${name === fallback ? html`<em>${this.t("badge_default")}</em>` : nothing}
      <span class="grow"></span>
      <button class="small" ?disabled=${!loaded.includes(name) && !this._state.others[name]} @click=${() => this._useForMe(name)}>
        ${this.t("use_for_me")}
      </button>
      ${name === fallback
        ? nothing
        : html`<button class="small" title=${this.t("set_default_hint")} @click=${() => this._setDefault(name)}>
            ${this.t("set_default")}
          </button>`}
    </div>`;
    return html`
      <div class="card">
        <h2>${this.t("th_use_title")}</h2>
        <p class="hint">${this.t("th_use_hint")}</p>
        ${themes.map((theme) => row(theme.name, theme.vars["primary-color"]))}
        ${Object.keys(this._state.others).length
          ? html`<details class="more">
              <summary>${this.t("th_other_themes")}</summary>
              ${Object.entries(this._state.others).map(([name, vars]) => row(name, vars["primary-color"]))}
            </details>`
          : nothing}
      </div>
    `;
  }

  // Shows the saved theme on this screen now, as if picked in the profile.
  _useForMe(name = this._saved.name) {
    document
      .querySelector("home-assistant")
      ?.dispatchEvent(new CustomEvent("settheme", { detail: { theme: name } }));
    this._showToast(this.t("using_now", { name }));
  }

  _picker() {
    const others = Object.keys(this._state.others);
    const current = this._current();
    return html`
      <div>
        <button class="current" @click=${() => this._startFromCurrent()}>
          <ha-icon icon="mdi:palette-swatch"></ha-icon>
          <span>
            <b>${this.t("start_current")}</b>
            <small>${current.name}</small>
          </span>
        </button>
        <p class="hint">${this.t("or_preset")}</p>
        <div class="presets">
          ${Object.entries(PRESETS).map(([key, preset]) => {
            const vars = derive(preset.base);
            return html`<button
              class="preset"
              data-preset=${key}
              @click=${() => this._startNew(preset[this._lang], preset.base)}
            >
              <span class="mini" style="background:${vars["primary-background-color"]}">
                <i style="background:${vars["sidebar-background-color"]}"></i>
                <b style="background:${vars["card-background-color"]}"><s style="background:${vars["primary-color"]}"></s></b>
              </span>
              ${preset[this._lang]}
            </button>`;
          })}
        </div>
        ${others.length
          ? html`<label class="row">
              <span>${this.t("copy_existing")}</span>
              <select
                @change=${(ev) => {
                  const name = ev.target.value;
                  if (!name) return;
                  const { base, overrides } = fromExisting(this._state.others[name]);
                  this._startNew(`${name} (${this.t("copy_suffix")})`, base, overrides);
                }}
              >
                <option value="">${this.t("pick_theme")}</option>
                ${others.map((name) => html`<option>${name}</option>`)}
              </select>
            </label>`
          : nothing}
      </div>
    `;
  }

  // Colors copied from another theme stay as they were; say so, and offer to
  // let them follow the quick settings instead.
  _fixedNotice() {
    const fixed = Object.keys(this._draft.overrides).filter((key) => KNOWN_VARS.has(key));
    if (!fixed.length) return nothing;
    return html`<div class="fixed">
      <span>${this.t("fixed_colors", { count: fixed.length })}</span>
      <button
        class="small"
        @click=${() => {
          const overrides = Object.fromEntries(
            Object.entries(this._draft.overrides).filter(([key]) => !KNOWN_VARS.has(key))
          );
          this._draft = { ...this._draft, overrides };
        }}
      >
        ${this.t("follow_quick")}
      </button>
    </div>`;
  }

  _varRow(key, label, kind, derived, own = this._draft.overrides[key], removable = false) {
    const value = own ?? "";
    const shown = own ?? derived;
    return html`
      <div class="var ${own !== undefined ? "own" : ""}">
        <span class="label">${label}<code>--${key}</code></span>
        <span class="inline">
          ${kind === "color"
            ? html`<input
                type="color"
                aria-label=${label}
                .value=${HEX.test(shown) ? shown : "#000000"}
                @input=${(ev) => this._override(key, ev.target.value)}
              />`
            : nothing}
          <input
            type="text"
            aria-label=${label}
            .value=${value}
            placeholder=${derived}
            @change=${(ev) => this._override(key, ev.target.value.trim())}
          />
          ${own !== undefined
            ? html`<button
                class="icon"
                title=${removable ? this.t("remove") : this.t("reset")}
                @click=${() => this._override(key, null)}
              >
                <ha-icon icon=${removable ? "mdi:delete-outline" : "mdi:restore"}></ha-icon>
              </button>`
            : html`<span class="icon-space"></span>`}
        </span>
      </div>
    `;
  }

  static styles = [
    TabBase.styles,
    css`
      .use-row {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 8px;
        padding: 10px 0;
        border-top: 1px solid var(--divider-color);
      }

      .use-row .grow {
        flex: 1;
      }

      .use-row em {
        font-style: normal;
        font-size: 12px;
        color: var(--secondary-text-color);
      }

      .danger {
        color: var(--error-color);
        margin-top: 12px;
      }

      h3 {
        margin: 12px 0 4px;
        font-size: 15px;
        font-weight: 500;
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

      .chip.active {
        border-color: var(--primary-color);
        background: color-mix(in srgb, var(--primary-color) 14%, var(--card-background-color));
      }

      .chip em {
        font-style: normal;
        font-size: 12px;
        color: var(--secondary-text-color);
      }

      .chip em.bad {
        color: var(--error-color);
      }

      .chip.add {
        color: var(--primary-color);
      }

      .swatch {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        border: 1px solid var(--divider-color);
      }

      .presets {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
        gap: 10px;
        margin-bottom: 8px;
      }

      .preset {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 8px;
        border-radius: 12px;
        border: 1px solid var(--divider-color);
        text-align: start;
      }

      .preset:hover {
        border-color: var(--primary-color);
      }

      .mini {
        display: flex;
        height: 64px;
        border-radius: 8px;
        overflow: hidden;
        gap: 6px;
      }

      .mini i {
        width: 18px;
      }

      .mini b {
        flex: 1;
        margin: 8px 8px 8px 0;
        border-radius: 6px;
        padding: 6px;
      }

      .mini s {
        display: block;
        width: 16px;
        height: 16px;
        border-radius: 50%;
      }

      select {
        font: inherit;
        padding: 6px 8px;
        border-radius: 8px;
        border: 1px solid var(--divider-color);
        background: var(--card-background-color);
        color: var(--primary-text-color);
      }

      .name {
        flex: 1;
        max-width: 280px;
      }

      details {
        border-top: 1px solid var(--divider-color);
      }

      summary {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px 0;
        cursor: pointer;
        font-weight: 500;
      }

      .dots {
        display: inline-flex;
        gap: 3px;
        margin-inline-start: auto;
      }

      .dots i {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        border: 1px solid var(--divider-color);
      }

      .var {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding: 6px 0 6px 8px;
        border-inline-start: 3px solid transparent;
      }

      .var.own {
        border-inline-start-color: var(--primary-color);
      }

      .var .label {
        min-width: 0;
      }

      .var code {
        display: block;
        font-size: 11px;
        color: var(--secondary-text-color);
        overflow-wrap: anywhere;
      }

      .var input[type="text"] {
        width: 190px;
      }

      .icon {
        display: inline-flex;
        padding: 6px;
        border-radius: 50%;
      }

      .icon-space {
        width: 30px;
      }

      .add-var input {
        flex: 1;
      }

      .small {
        padding: 6px 12px;
        border-radius: 999px;
        color: var(--primary-color);
        font-weight: 500;
      }

      .current {
        display: flex;
        align-items: center;
        gap: 12px;
        width: 100%;
        padding: 12px;
        margin-bottom: 12px;
        border-radius: 12px;
        border: 1px solid var(--primary-color);
        background: color-mix(in srgb, var(--primary-color) 10%, var(--card-background-color));
        text-align: start;
      }

      .current small {
        margin: 0;
      }

      .fixed {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 8px;
        padding: 10px 12px;
        margin-bottom: 8px;
        border-radius: 10px;
        background: var(--secondary-background-color);
        font-size: 13px;
      }

      .fixed span {
        flex: 1;
        min-width: 200px;
      }

      .note {
        color: var(--secondary-text-color);
        padding: 0 8px;
      }

      @media (max-width: 600px) {
        .var {
          flex-direction: column;
          align-items: stretch;
        }

        .var input[type="text"] {
          flex: 1;
          width: auto;
        }
      }
    `,
  ];
}

if (!customElements.get("ss-themes-tab")) {
  customElements.define("ss-themes-tab", ThemesTab);
}
