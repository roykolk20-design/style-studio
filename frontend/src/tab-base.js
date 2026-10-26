import { LitElement, css, html, nothing } from "lit";
import { setStandalone, standalone } from "./popup-format.js";
import { translator } from "./strings.js";

/**
 * What every tab shares: form rows, the confirm/save bar at the bottom and
 * the styles for both. A tab keeps its own draft and says whether it's dirty,
 * so the panel can ask before switching tabs.
 */
export class TabBase extends LitElement {
  static properties = {
    hass: { attribute: false },
    narrow: { type: Boolean },
    _busy: { state: true },
    _toast: { state: true },
    _confirm: { state: true },
  };

  constructor() {
    super();
    this._busy = false;
    this._confirm = null;
  }

  get t() {
    return translator(this.hass);
  }

  /** True while there are unsaved changes. */
  get dirty() {
    return false;
  }

  _ask(text, action) {
    this._confirm = { text, action };
  }

  _showToast(text) {
    this._toast = text;
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => (this._toast = null), 4000);
  }

  _error(err) {
    this._showToast(this.t("error", { message: err?.message ?? err }));
  }

  async _run(work, done) {
    this._busy = true;
    try {
      await work();
      if (done) this._showToast(done);
    } catch (err) {
      this._error(err);
    } finally {
      this._busy = false;
    }
  }

  /**
   * The start of a tab: "what do you want to do?" with a big button per
   * choice. items: [{ key, icon, title, text }].
   */
  _choices(title, items, pick) {
    return html`
      <h2 class="choices-title">${title}</h2>
      <div class="choices">
        ${items.map(
          (item) => html`<button class="choice" data-choice=${item.key} @click=${() => pick(item.key)}>
            <ha-icon .icon=${item.icon}></ha-icon>
            <b>${item.title}</b>
            <span>${item.text}</span>
          </button>`
        )}
      </div>
    `;
  }

  _back(label, go) {
    return html`<button class="back" @click=${go}>
      <ha-icon icon="mdi:arrow-left"></ha-icon>${label}
    </button>`;
  }

  /**
   * Numbered steps; only the current one is open. Done steps fold to their
   * title and a summary and open again on a click.
   * steps: [{ title, summary, content, ready }]; `ready` false hides Volgende.
   */
  _steps(steps, current, go, finish = nothing) {
    return html`<ol class="steps">
      ${steps.map((step, index) => {
        const state = index < current ? "done" : index === current ? "open" : "later";
        return html`<li class="step ${state}">
          <button class="step-head" ?disabled=${state === "later"} @click=${() => go(index)}>
            <span class="number">${state === "done" ? html`<ha-icon icon="mdi:check"></ha-icon>` : index + 1}</span>
            <span class="step-title">${step.title}</span>
            ${state === "done" && step.summary ? html`<small class="step-summary">${step.summary}</small>` : nothing}
          </button>
          ${state === "open"
            ? html`<div class="step-body">
                ${step.content}
                ${index < steps.length - 1
                  ? html`<button
                      class="primary next"
                      ?disabled=${step.ready === false}
                      @click=${() => go(index + 1)}
                    >
                      ${this.t("next")}
                    </button>`
                  : finish}
              </div>`
            : nothing}
        </li>`;
      })}
    </ol>`;
  }

  /** Settings most people never need, folded away. */
  _more(content) {
    return html`<details class="more">
      <summary>${this.t("more_options")}</summary>
      ${content}
    </details>`;
  }

  // Override to change one setting of the draft.
  _set() {}

  _warning(text) {
    return html`<div class="warning"><ha-icon icon="mdi:alert-outline"></ha-icon>${text}</div>`;
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

  // New pop-ups in Bubble Card's standalone (3.2+) or legacy format.
  _popupFormat() {
    const current = standalone();
    return html`
      <div class="row">
        <span>
          ${this.t("pf_title")}
          <small>${this.t("pf_hint")}</small>
        </span>
        <div class="segment small" role="radiogroup">
          ${[
            [true, this.t("pf_new")],
            [false, this.t("pf_old")],
          ].map(
            ([value, label]) => html`<button
              role="radio"
              aria-checked=${current === value ? "true" : "false"}
              class=${current === value ? "active" : ""}
              @click=${() => {
                setStandalone(value);
                this.requestUpdate();
              }}
            >
              ${label}
            </button>`
          )}
        </div>
      </div>
    `;
  }

  _color(s, key, label, hint) {
    return html`
      <label class="row">
        <span>
          ${label}
          ${hint ? html`<small>${hint}</small>` : nothing}
        </span>
        <input type="color" .value=${s[key]} @input=${(ev) => this._set(key, ev.target.value)} />
      </label>
    `;
  }

  /**
   * The bar at the bottom: a question to confirm, or the tab's own buttons on
   * the left, a message in the middle and Cancel/Save when dirty.
   */
  _bar({ left = nothing, onCancel, onSave, canSave = this.dirty }) {
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
    // On a phone an empty bar would only take space.
    if (left === nothing && !this._toast && !canSave) return nothing;
    return html`
      <footer class="bar">
        ${left}
        <span class="grow">${this._toast ?? (this.dirty ? this.t("unsaved") : "")}</span>
        ${canSave
          ? html`
              <button ?disabled=${this._busy} @click=${onCancel}>${this.t("cancel")}</button>
              <button class="primary" ?disabled=${this._busy} @click=${onSave}>
                ${this.t("save")}
              </button>
            `
          : nothing}
      </footer>
    `;
  }

  static styles = css`
    :host {
      display: block;
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
      border-radius: var(--ss-radius, 12px);
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

    .card {
      background: var(--ha-card-background, var(--card-background-color));
      border-radius: var(--ss-radius, 12px);
      box-shadow: var(--ha-card-box-shadow, none);
      border: 1px solid var(--ha-card-border-color, var(--divider-color));
      padding: 16px;
      margin-bottom: 16px;
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
      flex-shrink: 0;
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      background: none;
      cursor: pointer;
    }

    input[type="text"] {
      font: inherit;
      min-width: 0;
      padding: 6px 8px;
      border-radius: 8px;
      border: 1px solid var(--divider-color);
      background: var(--card-background-color);
      color: var(--primary-text-color);
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
      z-index: 2;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;
      margin: 0 -16px;
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

    .choices-title {
      margin: 8px 0 12px;
      font-size: 18px;
    }

    .choices {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 12px;
      margin-bottom: 16px;
    }

    .choice {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 6px;
      padding: 18px;
      text-align: start;
      border-radius: var(--ss-radius, 12px);
      border: 1px solid var(--divider-color);
      background: var(--ha-card-background, var(--card-background-color));
      transition: border-color 120ms, transform 120ms;
    }

    .choice:hover {
      border-color: var(--primary-color);
      transform: translateY(-1px);
    }

    .choice ha-icon {
      color: var(--primary-color);
      --mdc-icon-size: 32px;
      margin-bottom: 4px;
    }

    .choice b {
      font-size: 16px;
    }

    .choice span {
      color: var(--secondary-text-color);
      font-size: 13px;
      line-height: 1.4;
    }

    .back {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      margin: 0 0 12px;
      padding: 6px 10px 6px 4px;
      border-radius: 999px;
      color: var(--primary-color);
      font-weight: 500;
    }

    .steps {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .step {
      border-radius: var(--ss-radius, 12px);
      border: 1px solid var(--divider-color);
      background: var(--ha-card-background, var(--card-background-color));
    }

    .step.open {
      border-color: var(--primary-color);
    }

    .step.later {
      opacity: 0.55;
    }

    .step-head {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
      width: 100%;
      padding: 14px 16px;
      text-align: start;
    }

    .step-head:disabled {
      opacity: 1;
    }

    .number {
      display: grid;
      place-items: center;
      width: 28px;
      height: 28px;
      flex-shrink: 0;
      border-radius: 50%;
      background: var(--secondary-background-color);
      font-weight: 600;
      --mdc-icon-size: 18px;
    }

    .step.open .number,
    .step.done .number {
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
    }

    .step-title {
      font-size: 16px;
      font-weight: 500;
    }

    .step-summary {
      flex-basis: 100%;
      margin: 0 0 0 40px;
    }

    .step-body {
      padding: 0 16px 16px 56px;
    }

    @media (max-width: 600px) {
      .step-body {
        padding-left: 16px;
      }
    }

    .next {
      margin-top: 12px;
    }

    .more {
      margin-top: 12px;
      border-top: 1px solid var(--divider-color);
      padding-top: 8px;
    }

    .more summary {
      cursor: pointer;
      color: var(--secondary-text-color);
      font-size: 14px;
      padding: 6px 0;
    }
  `;
}
