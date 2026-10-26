import { LitElement, css, html, nothing } from "lit";
import { createCard, ensureCards } from "./dashboards.js";

// Runs a button-card template from the cards we generate ourselves.
function evaluate(value, hass, entity) {
  if (typeof value !== "string" || !value.trim().startsWith("[[[")) return value;
  const body = value.trim().slice(3, -3);
  try {
    // eslint-disable-next-line no-new-func
    return new Function("entity", "states", "hass", "variables", body)(entity, hass.states, hass, {});
  } catch (err) {
    return "";
  }
}

/**
 * Shows a card config: the real cards when Home Assistant can create them
 * and the custom cards are installed, otherwise a drawing of the same cards.
 */
export class CardPreview extends LitElement {
  static properties = {
    hass: { attribute: false },
    config: { attribute: false },
    needs: { attribute: false },
    t: { attribute: false },
    // Only the card: no frame, label or warning (for small tiles).
    bare: { type: Boolean },
    _real: { state: true },
    _missing: { state: true },
  };

  constructor() {
    super();
    this.needs = [];
    this._real = null;
    this._missing = null;
  }

  async updated(changed) {
    if (changed.has("config") || changed.has("needs")) {
      const missing = await ensureCards(this.hass, this.needs);
      this._missing = missing;
      const card = missing.length ? null : await createCard(this.hass, this.config);
      this._real = card;
    }
    if (this._real) this._real.hass = this.hass;
  }

  render() {
    if (!this.config) return nothing;
    if (this.bare) return this._real ?? this._draw(this.config);
    return html`
      ${this._missing?.length
        ? html`<p class="warning">${this.t("needs_cards", { cards: this._missing.join(", ") })}</p>`
        : nothing}
      <small>${this._real ? this.t("preview_real") : this.t("preview_drawing")}</small>
      <div class="frame">${this._real ?? this._draw(this.config)}</div>
    `;
  }

  _draw(card) {
    const entity = this.hass.states?.[card.entity];
    switch (card.type) {
      case "vertical-stack":
        return html`<div class="stack">${card.cards.map((c) => this._draw(c))}</div>`;
      case "horizontal-stack":
        return html`<div class="hstack">${card.cards.map((c) => this._draw(c))}</div>`;
      case "grid":
        return html`
          ${card.title ? html`<div class="title">${card.title}</div>` : nothing}
          <div class="grid" style="grid-template-columns: repeat(${card.columns ?? 3}, minmax(0, 1fr))">
            ${card.cards.map((c) => this._draw(c))}
          </div>
        `;
      case "heading":
        return html`<div class="title big">${card.heading}</div>`;
      case "custom:button-card": {
        const rule = (card.state ?? []).find(
          (r) => r.operator === "template" && evaluate(r.value, this.hass, entity)
        );
        // A rule that colors the whole card makes it "active" (climate
        // buttons); one that only colors the icon makes it "lit" (rooms).
        const active = rule ? (rule.styles?.card ? "active" : "lit") : "";
        const room = (card.styles?.grid ?? []).some((r) => r["grid-template-areas"]);
        const style = (card.styles?.card ?? []).map((rule) => Object.entries(rule)[0]).filter(([key]) => key === "height");
        return html`<div
          class="button ${active} ${room ? "room" : ""}"
          style=${style.map(([key, value]) => `${key}:${value}`).join(";")}
        >
          ${card.show_icon !== false && card.icon
            ? room
              ? html`<span class="room-icon"><ha-icon .icon=${card.icon}></ha-icon></span>`
              : html`<ha-icon .icon=${card.icon}></ha-icon>`
            : nothing}
          ${card.show_name !== false && card.name
            ? html`<span class="name ${card.styles?.name?.some((r) => r["font-size"] === "28px") ? "huge" : ""}">${evaluate(card.name, this.hass, entity)}</span>`
            : nothing}
          ${card.show_label ? html`<small>${evaluate(card.label, this.hass, entity)}</small>` : nothing}
        </div>`;
      }
      case "custom:bubble-card":
        if (card.card_type === "pop-up") {
          return html`<div class="popup-head">
            <span class="round"><ha-icon .icon=${card.icon ?? "mdi:circle"}></ha-icon></span>
            <b>${card.name}</b>
            <code>${card.hash}</code>
          </div>`;
        }
        return html`<div class="pill">
          <span class="round"><ha-icon .icon=${card.icon ?? "mdi:circle"}></ha-icon></span>
          <b>${card.name}</b>
          <small>${entity ? entity.attributes?.[card.attribute] ?? entity.state : ""}${card.attribute === "current_temperature" ? "°" : ""}</small>
        </div>`;
      case "tile":
        return html`<div class="tile ${entity?.state === "on" ? "on" : ""}">
          <span class="round"><ha-icon .icon=${entity?.attributes?.icon ?? "mdi:lightbulb"}></ha-icon></span>
          <span><b>${card.name ?? entity?.attributes?.friendly_name ?? card.entity}</b><small>${entity?.state ?? ""}</small></span>
        </div>`;
      default:
        return html`<div class="unknown">${card.type}</div>`;
    }
  }

  static styles = css`
    :host {
      display: block;
    }

    small {
      display: block;
      color: var(--secondary-text-color);
      font-size: 12px;
      margin-bottom: 6px;
    }

    .warning {
      margin: 0 0 8px;
      padding: 10px 12px;
      border-radius: 10px;
      background: color-mix(in srgb, var(--warning-color, #ffa600) 16%, var(--card-background-color));
      font-size: 13px;
      line-height: 1.4;
    }

    .frame {
      padding: 14px;
      border-radius: 24px;
      background: var(--bubble-pop-up-background-color, var(--card-background-color));
      border: 1px solid var(--divider-color);
    }

    .stack {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .hstack {
      display: flex;
      gap: 10px;
    }

    .title {
      margin: 6px 0 -2px 4px;
      font-size: 13px;
      font-weight: 500;
      color: var(--secondary-text-color);
    }

    .title.big {
      font-size: 16px;
      color: var(--primary-text-color);
    }

    .grid {
      display: grid;
      gap: 8px;
    }

    .button {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 4px;
      min-height: 64px;
      padding: 8px 4px;
      border-radius: 18px;
      background: var(--bubble-main-background-color, var(--secondary-background-color));
      text-align: center;
      font-size: 13px;
      font-weight: 500;
    }

    .button small {
      margin: 0;
    }

    .button.active {
      background: var(--state-climate-active-color, var(--primary-color));
      color: var(--text-primary-color, #fff);
    }

    .button.active small {
      color: inherit;
    }

    .button.room {
      align-items: flex-start;
      text-align: start;
      min-height: 96px;
      padding: 14px;
      border-radius: var(--ha-card-border-radius, 16px);
      background: var(--ha-card-background, var(--card-background-color));
      border: 1px solid var(--divider-color);
      font-weight: 600;
    }

    .button.room .room-icon {
      display: grid;
      place-items: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: var(--secondary-background-color);
      color: var(--state-icon-color);
      --mdc-icon-size: 22px;
      margin-bottom: 6px;
    }

    .button.room.lit .room-icon {
      background: var(--bubble-icon-background-color, var(--secondary-background-color));
      color: var(--state-light-active-color);
    }

    .button.room small {
      font-weight: 400;
    }

    .name.huge {
      font-size: 28px;
      font-weight: 600;
    }

    .popup-head,
    .pill,
    .tile {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .popup-head code {
      margin-inline-start: auto;
      font-size: 12px;
      color: var(--secondary-text-color);
    }

    .pill,
    .tile {
      padding: 8px;
      border-radius: 999px;
      background: var(--bubble-main-background-color, var(--secondary-background-color));
    }

    .tile {
      border-radius: var(--ha-card-border-radius, 12px);
      background: var(--ha-card-background, var(--card-background-color));
      border: 1px solid var(--divider-color);
    }

    .tile small,
    .pill small {
      margin: 0;
    }

    .pill small {
      margin-inline-start: auto;
      padding-inline-end: 8px;
    }

    .round {
      display: grid;
      place-items: center;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      flex-shrink: 0;
      background: color-mix(in srgb, var(--primary-color) 18%, transparent);
      color: var(--primary-color);
    }

    .tile.on .round {
      color: var(--state-light-active-color, var(--primary-color));
    }

    .unknown {
      padding: 8px;
      border: 1px dashed var(--divider-color);
      border-radius: 8px;
      font-size: 12px;
      color: var(--secondary-text-color);
    }
  `;
}

if (!customElements.get("ss-card-preview")) {
  customElements.define("ss-card-preview", CardPreview);
}
