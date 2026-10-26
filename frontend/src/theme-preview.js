import { LitElement, css, html, nothing } from "lit";

const CLIMATE = ["active", "auto", "cool", "dry", "heat", "heat_cool", "fan_only"];

/**
 * A small Home Assistant screen drawn with nothing but theme variables, so
 * every variable in the editor changes something you can see here.
 */
export class ThemePreview extends LitElement {
  static properties = {
    vars: { attribute: false },
    t: { attribute: false },
    popup: { type: Boolean },
  };

  render() {
    if (!this.vars) return nothing;
    const style = Object.entries(this.vars)
      .map(([key, value]) => `--${key}:${value}`)
      .join(";");
    const t = this.t;
    return html`
      <div class="screen" style=${style}>
        <div class="sidebar">
          <div class="dot"></div>
          <div class="nav selected"><ha-icon icon="mdi:view-dashboard"></ha-icon></div>
          <div class="nav"><ha-icon icon="mdi:lightning-bolt"></ha-icon></div>
          <div class="nav"><ha-icon icon="mdi:map"></ha-icon></div>
          <div class="nav"><ha-icon icon="mdi:palette-swatch-outline"></ha-icon></div>
        </div>
        <div class="main">
          <div class="header">
            <span class="title">${t("pv_title")}</span>
            <span class="tab active">${t("pv_title")}</span>
            <span class="tab">${t("pv_tab2")}</span>
          </div>
          <div class="content">
            <div class="blob"></div>
            <div class="weather">
              <ha-icon icon="mdi:weather-sunny"></ha-icon>
              <span>${t("pv_weather")}</span>
            </div>
            <div class="grid">
              <div class="card tile on">
                <span class="icon"><ha-icon icon="mdi:sofa"></ha-icon></span>
                <span><b>${t("pv_living")}</b><small>${t("pv_lights")}</small></span>
              </div>
              <div class="card tile">
                <span class="icon"><ha-icon icon="mdi:fridge"></ha-icon></span>
                <span><b>${t("pv_kitchen")}</b><small>${t("pv_off")}</small></span>
              </div>
            </div>
            <div class="card">
              <div class="line">
                <ha-icon icon="mdi:fan" class="state"></ha-icon>
                <span>${t("pv_switch")}</span>
                <span class="switch on"></span>
              </div>
              <div class="line">
                <span class="slider"><span></span></span>
              </div>
              <div class="line climate">
                <ha-icon icon="mdi:air-conditioner" class="state"></ha-icon>
                <span>${t("pv_climate")}</span>
                <span class="modes">
                  ${CLIMATE.map(
                    (mode) =>
                      html`<i title=${mode} style="background:var(--state-climate-${mode}-color)"></i>`
                  )}
                </span>
              </div>
            </div>
          </div>
          ${this.popup
            ? html`
                <div class="popup">
                  <div class="popup-head">
                    <span class="icon"><ha-icon icon="mdi:sofa"></ha-icon></span>
                    <b>${t("pv_popup")}</b>
                  </div>
                  <div class="buttons">
                    <span class="bubble on"><ha-icon icon="mdi:ceiling-light"></ha-icon></span>
                    <span class="bubble"><ha-icon icon="mdi:floor-lamp"></ha-icon></span>
                    <span class="bubble"><ha-icon icon="mdi:television"></ha-icon></span>
                  </div>
                  <div class="field">${t("pv_climate")}</div>
                </div>
              `
            : nothing}
        </div>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }

    .screen {
      display: flex;
      height: 440px;
      overflow: hidden;
      border-radius: 12px;
      border: 1px solid var(--divider-color);
      font-family: var(--ha-font-family-body, Roboto, sans-serif);
      font-size: 13px;
      color: var(--primary-text-color);
      background: var(--primary-background-color);
    }

    ha-icon {
      --mdc-icon-size: 18px;
    }

    .sidebar {
      width: 52px;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      padding: 10px 0;
      background: var(--sidebar-background-color);
      border-inline-end: 1px solid var(--divider-color);
    }

    .dot {
      width: 22px;
      height: 22px;
      margin-bottom: 8px;
      border-radius: 50%;
      background: var(--sidebar-text-color);
      opacity: 0.25;
    }

    .nav {
      position: relative;
      display: grid;
      place-items: center;
      width: 38px;
      height: 34px;
      border-radius: 10px;
      color: var(--sidebar-icon-color);
    }

    .nav.selected {
      color: var(--sidebar-selected-icon-color);
    }

    .nav.selected::before {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background: var(--sidebar-selected-icon-color);
      opacity: 0.14;
    }

    .main {
      position: relative;
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
    }

    .header {
      display: flex;
      align-items: flex-end;
      gap: 14px;
      height: 44px;
      padding: 0 14px;
      flex-shrink: 0;
      background: var(--app-header-background-color);
      color: var(--app-header-text-color);
    }

    .title {
      align-self: center;
      font-size: 16px;
      margin-inline-end: auto;
    }

    .tab {
      padding: 0 2px 10px;
      opacity: 0.75;
    }

    .tab.active {
      opacity: 1;
      border-bottom: 2px solid var(--app-header-selection-bar-color);
    }

    .content {
      position: relative;
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 12px;
      overflow: hidden;
    }

    /* Something behind the cards, so card and pop-up opacity show. */
    .blob {
      position: absolute;
      width: 220px;
      height: 220px;
      right: -40px;
      top: 30px;
      border-radius: 50%;
      background: var(--primary-color);
      opacity: 0.35;
      filter: blur(30px);
    }

    .card,
    .weather {
      position: relative;
      background: var(--ha-card-background, var(--card-background-color));
      border: var(--ha-card-border-width, 1px) solid var(--ha-card-border-color, var(--divider-color));
      border-radius: var(--ha-card-border-radius, 12px);
      box-shadow: var(--ha-card-box-shadow, none);
      backdrop-filter: blur(12px);
    }

    .weather {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px;
      background: var(--weather-card-gradient);
    }

    .weather ha-icon {
      color: var(--weather-card-accent);
      --mdc-icon-size: 26px;
    }

    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }

    .tile {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px;
    }

    .tile small,
    .line small {
      display: block;
      color: var(--secondary-text-color);
    }

    .icon {
      display: grid;
      place-items: center;
      width: 34px;
      height: 34px;
      border-radius: 50%;
      flex-shrink: 0;
      position: relative;
      color: var(--state-icon-color);
    }

    .icon::before {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background: var(--state-icon-color);
      opacity: 0.15;
    }

    .on .icon {
      color: var(--state-light-active-color);
    }

    .on .icon::before {
      background: var(--state-light-active-color);
      opacity: 0.2;
    }

    .card:not(.tile) {
      padding: 4px 12px;
    }

    .line {
      display: flex;
      align-items: center;
      gap: 10px;
      min-height: 36px;
    }

    .line + .line {
      border-top: 1px solid var(--divider-color);
    }

    .line > span:nth-child(2) {
      flex: 1;
    }

    .state {
      color: var(--state-fan-active-color);
    }

    .climate .state {
      color: var(--state-climate-cool-color);
    }

    .switch {
      position: relative;
      width: 34px;
      height: 14px;
      border-radius: 999px;
      background: var(--switch-checked-track-color);
      opacity: 0.9;
    }

    .switch::after {
      content: "";
      position: absolute;
      top: -3px;
      right: -2px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: var(--switch-checked-button-color);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    }

    .slider {
      flex: 1;
      height: 6px;
      border-radius: 999px;
      background: var(--slider-bar-color);
    }

    .slider span {
      display: block;
      width: 62%;
      height: 100%;
      border-radius: inherit;
      background: var(--slider-color);
    }

    .modes {
      display: flex;
      gap: 4px;
    }

    .modes i {
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }

    .popup {
      position: absolute;
      left: 8px;
      right: 8px;
      bottom: 0;
      height: 58%;
      padding: 14px;
      border-radius: 24px 24px 0 0;
      background: var(--bubble-pop-up-background-color, var(--card-background-color));
      backdrop-filter: blur(14px);
      box-shadow: 0 -8px 30px rgba(0, 0, 0, 0.2);
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .popup-head {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 15px;
    }

    .buttons {
      display: flex;
      gap: 10px;
    }

    .bubble {
      display: grid;
      place-items: center;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: var(--bubble-main-background-color);
      color: var(--state-icon-color);
    }

    .bubble.on {
      background: var(--bubble-button-background-color);
      color: var(--state-light-active-color);
    }

    .field {
      padding: 10px 12px;
      border-radius: 14px;
      background: var(--bubble-secondary-background-color);
    }
  `;
}

if (!customElements.get("ss-theme-preview")) {
  customElements.define("ss-theme-preview", ThemePreview);
}
