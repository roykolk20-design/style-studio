import { css, html, nothing } from "lit";
import { TabBase } from "./tab-base.js";
import {
  DEFAULT_BACKGROUND,
  GRADIENTS,
  SWATCHES,
  backgroundCss,
  describeBackground,
  safeUrl,
  uploadPhoto,
} from "./backgrounds.js";
import { listDashboards, loadDashboard, saveDashboard } from "./dashboards.js";

const clone = (value) => JSON.parse(JSON.stringify(value));

/**
 * A background for one or more pages of a dashboard: a photo, a color or a
 * gradient. Which pages, which background, how it looks, then save. Fires
 * "done" with a message when the dashboard was changed.
 */
class BackgroundFlow extends TabBase {
  static properties = {
    ...TabBase.properties,
    _dashboards: { state: true },
    _dashboard: { state: true },
    _config: { state: true },
    _pages: { state: true },
    _b: { state: true },
    _photos: { state: true },
    _step: { state: true },
  };

  constructor() {
    super();
    this._b = { ...DEFAULT_BACKGROUND };
    this._pages = new Set([0]);
    this._photos = [];
    this._step = 0;
  }

  connectedCallback() {
    super.connectedCallback();
    this._load();
  }

  async _load() {
    this._dashboards = (await listDashboards(this.hass, this.hass.localize("panel.states") || "Overview")).filter(
      (d) => d.editable
    );
    if (this._dashboards[0]) await this._pickDashboard(this._dashboards[0].url_path);
    await this._loadPhotos();
  }

  async _pickDashboard(urlPath) {
    this._dashboard = urlPath;
    try {
      this._config = await loadDashboard(this.hass, urlPath);
    } catch (err) {
      this._config = { views: [] };
    }
    this._pages = new Set([0]);
  }

  async _loadPhotos() {
    try {
      this._photos = (await this.hass.callWS({ type: "style_studio/backgrounds/list" })).photos;
    } catch (err) {
      this._error(err);
    }
  }

  _set(key, value) {
    this._b = { ...this._b, [key]: value };
    this._toast = null;
  }

  get _views() {
    return this._config?.views ?? [];
  }

  _togglePage(index) {
    const pages = new Set(this._pages);
    if (pages.has(index)) pages.delete(index);
    else pages.add(index);
    this._pages = pages;
  }

  get _css() {
    return this._b.kind === "none" ? null : backgroundCss(this._b);
  }

  // --- photos -------------------------------------------------------------------

  _upload(file) {
    if (!file) return;
    this._run(async () => {
      try {
        const result = await uploadPhoto(this.hass, file);
        await this._loadPhotos();
        this._b = { ...this._b, kind: "image", url: result.url };
        this._showToast(result.shrunk ? this.t("bg_uploaded_shrunk") : this.t("bg_uploaded"));
      } catch (err) {
        const key = { unsupported_type: "bg_err_type", too_big: "bg_err_big", not_a_picture: "bg_err_type" }[err.code];
        throw key ? new Error(this.t(key)) : err;
      }
    });
  }

  _deletePhoto(photo) {
    this._ask(this.t("bg_delete_confirm", { name: photo.name }), () =>
      this._run(async () => {
        await this.hass.callWS({ type: "style_studio/backgrounds/delete", name: photo.name });
        await this._loadPhotos();
        if (this._b.url === photo.url) this._set("url", "");
      }, this.t("bg_deleted"))
    );
  }

  // --- saving -------------------------------------------------------------------

  _pageNames() {
    return [...this._pages]
      .sort((a, b) => a - b)
      .map((i) => this._views[i]?.title ?? this._views[i]?.path ?? `${i + 1}`)
      .join(", ");
  }

  _save() {
    const css = this._css;
    const removing = this._b.kind === "none";
    this._ask(this.t(removing ? "bg_remove_confirm" : "bg_confirm", { pages: this._pageNames() }), () =>
      this._run(async () => {
        const old = await loadDashboard(this.hass, this._dashboard);
        const config = clone(old);
        for (const index of this._pages) {
          const view = config.views[index];
          if (!view) continue;
          if (removing) delete view.background;
          else view.background = css;
        }
        await saveDashboard(this.hass, this._dashboard, old, config);
        this.dispatchEvent(new CustomEvent("done", { detail: this.t(removing ? "bg_removed" : "bg_done") }));
      })
    );
  }

  // --- rendering ----------------------------------------------------------------

  render() {
    if (!this._dashboards) return nothing;
    if (!this._dashboards.length) return html`<div class="card"><p class="hint">${this.t("cl_readonly")}</p></div>`;
    const b = this._b;
    const kinds = [
      ["image", this.t("bg_kind_image")],
      ["color", this.t("bg_kind_color")],
      ["gradient", this.t("bg_kind_gradient")],
      ["none", this.t("bg_kind_none")],
    ];
    const steps = [
      {
        title: this.t("bg_st_page"),
        summary: this._pageNames(),
        ready: this._pages.size > 0,
        content: this._pagePicker(),
      },
      {
        title: this.t("bg_st_kind"),
        summary: kinds.find(([key]) => key === b.kind)?.[1],
        ready: b.kind !== "image" || safeUrl(b.url),
        content: html`
          <div class="segment" role="radiogroup">
            ${kinds.map(
              ([key, label]) => html`<button
                role="radio"
                data-kind=${key}
                aria-checked=${b.kind === key ? "true" : "false"}
                class=${b.kind === key ? "active" : ""}
                @click=${() => this._set("kind", key)}
              >
                ${label}
              </button>`
            )}
          </div>
          ${this._kindContent()}
        `,
      },
      ...(b.kind === "image"
        ? [{ title: this.t("bg_st_look"), content: this._look() }]
        : []),
      {
        title: this.t("st_save"),
        content: html`<p class="hint">${this.t("bg_save_text", { pages: this._pageNames() })}</p>
          <p class="hint">${this.t("bg_theme_hint")}</p>`,
      },
    ];
    return html`
      <div class="layout">
        <div>
          ${this._steps(
            steps,
            this._step,
            (step) => (this._step = step),
            html`<button class="primary next" ?disabled=${this._busy || this._pages.size === 0 || (b.kind !== "none" && !this._css)} @click=${this._save}>
              ${b.kind === "none" ? this.t("bg_remove") : this.t("bg_set")}
            </button>`
          )}
        </div>
        <aside class="card preview">
          <h2>${this.t("preview")}</h2>
          ${this._preview()}
        </aside>
      </div>
      ${this._bar({ canSave: false })}
    `;
  }

  _pagePicker() {
    const views = this._views;
    return html`
      ${this._dashboards.length > 1
        ? html`<label class="row">
            <span>${this.t("cl_dashboard")}</span>
            <select @change=${(ev) => this._pickDashboard(ev.target.value || null)}>
              ${this._dashboards.map(
                (d) => html`<option value=${d.url_path ?? ""} ?selected=${d.url_path === this._dashboard}>${d.title}</option>`
              )}
            </select>
          </label>`
        : nothing}
      <div class="tiles">
        ${views.map((view, index) => {
          const has = describeBackground(view.background);
          return html`<button
            class="tile ${this._pages.has(index) ? "active" : ""}"
            aria-pressed=${this._pages.has(index) ? "true" : "false"}
            @click=${() => this._togglePage(index)}
          >
            <ha-icon .icon=${view.icon ?? "mdi:view-dashboard-outline"}></ha-icon>
            <span>
              <b>${view.title ?? view.path ?? index + 1}</b>
              ${has ? html`<small>${this.t("bg_has")}</small>` : nothing}
            </span>
          </button>`;
        })}
        ${views.length > 1
          ? html`<button
              class="tile"
              @click=${() => (this._pages = this._pages.size === views.length ? new Set() : new Set(views.keys()))}
            >
              <ha-icon icon="mdi:select-all"></ha-icon>${this.t("bg_all_pages")}
            </button>`
          : nothing}
      </div>
    `;
  }

  _kindContent() {
    const b = this._b;
    if (b.kind === "none") return html`<p class="hint">${this.t("bg_none_text")}</p>`;
    if (b.kind === "color") {
      return html`
        <div class="swatches">
          ${SWATCHES.map(
            (color) => html`<button
              class="swatch ${b.color === color ? "chosen" : ""}"
              style="background:${color}"
              aria-label=${color}
              @click=${() => this._set("color", color)}
            ></button>`
          )}
        </div>
        ${this._color(b, "color", this.t("bg_color"))}
      `;
    }
    if (b.kind === "gradient") {
      return html`
        <div class="swatches">
          ${GRADIENTS.map(
            (g) => html`<button
              class="swatch wide"
              style="background:linear-gradient(${g.angle}deg, ${g.from}, ${g.to})"
              title=${this.t(`bg_preset_${g.key}`)}
              aria-label=${this.t(`bg_preset_${g.key}`)}
              @click=${() => (this._b = { ...b, from: g.from, to: g.to, angle: g.angle })}
            ></button>`
          )}
        </div>
        ${this._color(b, "from", this.t("bg_from"))} ${this._color(b, "to", this.t("bg_to"))}
        ${this._slider(b, "angle", this.t("bg_angle"), 0, 360, "°")}
      `;
    }
    return this._photoPicker();
  }

  _photoPicker() {
    const b = this._b;
    return html`
      <input
        type="file"
        hidden
        accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
        @change=${(ev) => {
          this._upload(ev.target.files[0]);
          ev.target.value = "";
        }}
      />
      <button
        class="primary upload"
        ?disabled=${this._busy}
        @click=${() => this.renderRoot.querySelector('input[type="file"]').click()}
      >
        <ha-icon icon="mdi:upload"></ha-icon>${this._busy ? this.t("bg_uploading") : this.t("bg_upload")}
      </button>
      <small class="hint">${this.t("bg_upload_hint")}</small>
      ${this._photos.length
        ? html`<div class="photos">
            ${this._photos.slice(0, 60).map(
              (photo) => html`<div class="photo ${b.url === photo.url ? "chosen" : ""}">
                <button
                  class="thumb"
                  title=${photo.name}
                  aria-label=${photo.name}
                  aria-pressed=${b.url === photo.url ? "true" : "false"}
                  @click=${() => this._set("url", photo.url)}
                >
                  <img src=${photo.url} alt="" loading="lazy" />
                </button>
                ${photo.source === "upload"
                  ? html`<button class="remove" title=${this.t("bg_delete_photo")} aria-label="${this.t("bg_delete_photo")} ${photo.name}" @click=${() => this._deletePhoto(photo)}>
                      <ha-icon icon="mdi:close"></ha-icon>
                    </button>`
                  : nothing}
              </div>`
            )}
          </div>`
        : html`<p class="hint">${this.t("bg_no_photos")}</p>`}
      ${this._more(html`
        <label class="row">
          <span>
            ${this.t("bg_url")}
            <small>${this.t("bg_url_hint")}</small>
          </span>
          <input
            type="text"
            .value=${b.url}
            placeholder="/local/foto.jpg"
            @change=${(ev) => safeUrl(ev.target.value.trim()) && this._set("url", ev.target.value.trim())}
          />
        </label>
      `)}
    `;
  }

  _look() {
    const b = this._b;
    return html`
      <div class="row">
        <span>${this.t("bg_fit")}</span>
        ${this._segment(b, "fit", [
          ["cover", this.t("bg_fit_cover")],
          ["contain", this.t("bg_fit_contain")],
          ["tile", this.t("bg_fit_tile")],
        ])}
      </div>
      ${this._slider(b, "dim", this.t("bg_dim"), -60, 60, "%", false, this.t("bg_dim_hint"))}
      ${this._switch(b, "fixed", this.t("bg_fixed"))}
      ${this._more(html`
        <div class="row">
          <span>${this.t("bg_align")}</span>
          ${this._segment(b, "align", ["center", "top", "bottom", "left", "right"].map((key) => [key, this.t(`bg_align_${key}`)]))}
        </div>
      `)}
    `;
  }

  // The page as it will look: the background with a few cards on top.
  _preview() {
    const css = this._b.kind === "none" ? null : backgroundCss(this._b, { preview: true });
    return html`
      <div class="page" style=${css ? `background:${css}` : ""}>
        <div class="fake-card wide"><b></b><i></i></div>
        <div class="fake-card"><b></b><i></i></div>
        <div class="fake-card"><b></b><i></i></div>
        <div class="fake-card"><b></b><i></i></div>
      </div>
      <p class="hint">${this.t("bg_preview_hint")}</p>
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
        margin-top: 8px;
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
      }

      .tile small {
        display: block;
        margin: 0;
      }

      .tile.active {
        border-color: var(--primary-color);
        background: color-mix(in srgb, var(--primary-color) 14%, var(--card-background-color));
      }

      .upload {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        margin: 12px 0 4px;
      }

      .photos {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(96px, 1fr));
        gap: 8px;
        margin: 12px 0;
        max-height: 320px;
        overflow-y: auto;
      }

      .photo {
        position: relative;
        border-radius: 10px;
        border: 2px solid transparent;
      }

      .photo.chosen {
        border-color: var(--primary-color);
      }

      .thumb {
        display: block;
        width: 100%;
        padding: 0;
        border-radius: 8px;
        overflow: hidden;
      }

      .thumb img {
        display: block;
        width: 100%;
        height: 72px;
        object-fit: cover;
        background: var(--secondary-background-color);
      }

      .remove {
        position: absolute;
        top: 2px;
        inset-inline-end: 2px;
        display: grid;
        place-items: center;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.55);
        color: #fff;
        --mdc-icon-size: 16px;
      }

      .swatches {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin: 12px 0 4px;
      }

      .swatch {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: 2px solid var(--divider-color);
      }

      .swatch.wide {
        width: 64px;
        border-radius: 12px;
      }

      .swatch.chosen {
        border-color: var(--primary-color);
      }

      .page {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 10px;
        padding: 14px;
        height: 260px;
        border-radius: 12px;
        border: 1px solid var(--divider-color);
        background: var(--primary-background-color);
        overflow: hidden;
        align-content: start;
      }

      .fake-card {
        height: 80px;
        padding: 10px;
        box-sizing: border-box;
        border-radius: var(--ha-card-border-radius, 12px);
        background: var(--ha-card-background, var(--card-background-color));
        box-shadow: var(--ha-card-box-shadow, none);
      }

      .fake-card.wide {
        grid-column: 1 / -1;
        height: 64px;
      }

      .fake-card b,
      .fake-card i {
        display: block;
        height: 8px;
        border-radius: 4px;
        background: var(--secondary-text-color);
        opacity: 0.35;
      }

      .fake-card i {
        width: 60%;
        margin-top: 8px;
      }
    `,
  ];
}

if (!customElements.get("ss-background-flow")) {
  customElements.define("ss-background-flow", BackgroundFlow);
}
