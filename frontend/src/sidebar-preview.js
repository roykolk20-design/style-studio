import { LitElement, css, html, nothing } from "lit";

// What a screen of each width shows. Desktop is cropped to its left part, or
// the sidebar would be too small to judge.
const DEVICES = {
  phone: { width: 430, height: 640 },
  tablet: { width: 768, height: 600 },
  desktop: { width: 760, height: 560 },
};

/**
 * A drawing of the sidebar as Glass Sidebar styles it, from the same
 * settings. It mimics HA's layout; it doesn't embed the real sidebar.
 */
export class SidebarPreview extends LitElement {
  static properties = {
    settings: { attribute: false },
    items: { attribute: false },
    device: {},
    page: {},
    expanded: { type: Boolean },
    settingsLabel: {},
    _scale: { state: true },
  };

  constructor() {
    super();
    this.settingsLabel = "Settings";
    this.items = [];
    this.device = "desktop";
    this.page = "light";
    this.expanded = true;
    this._scale = 1;
  }

  connectedCallback() {
    super.connectedCallback();
    this._resize = new ResizeObserver(() => this._fit());
    this._resize.observe(this);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._resize?.disconnect();
  }

  updated(changed) {
    if (changed.has("device")) this._fit();
  }

  _fit() {
    const { width } = DEVICES[this.device];
    this._scale = Math.min(1, this.clientWidth / width) || 1;
  }

  render() {
    const s = this.settings;
    if (!s) return nothing;
    const { width, height } = DEVICES[this.device];
    return html`
      <div class="viewport" style="height:${height * this._scale}px">
        <div
          class="screen ${this.page}"
          style="width:${width}px;height:${height}px;transform:scale(${this._scale})"
        >
          ${this.device === "desktop" ? this._desktop(s) : this._modal(s)}
        </div>
      </div>
    `;
  }

  // Wide screens: the sidebar has its own column (HA's .sidebar-shell).
  _desktop(s) {
    const inset = s.floating ? s.inset : 0;
    const width = (this.expanded ? 256 : 56) + inset * 2;
    return html`
      <div class="desktop">
        <div class="shell" style="width:${width}px;padding:${inset}px;${this._shell(s)}">
          ${this._sidebar(s, { radius: s.floating ? s.radius : 0, floating: s.floating })}
        </div>
        ${this._page()}
      </div>
    `;
  }

  // Narrow screens: HA shows the sidebar as a drawer over the page. Only
  // phones (up to 600px) get the floating style; tablets keep the plain one.
  _modal(s) {
    const phone = this.device === "phone";
    const inset = phone && s.floating ? s.inset : 0;
    const width = phone ? Math.min(430 * 0.9, s.mobile_width) : 256;
    return html`
      ${this._page()}
      <div class="backdrop ${phone && s.mobile_blur ? "blurred" : ""}"></div>
      <div class="drawer ${phone ? "" : "plain"}" style="width:${width}px;padding:${inset}px">
        ${this._sidebar(s, {
          radius: phone && s.floating ? s.radius : 0,
          floating: phone && s.floating,
          opacity: phone ? Math.min(s.opacity + 12, 100) : s.opacity,
          phone,
          expanded: true,
        })}
      </div>
    `;
  }

  // Glass Sidebar leaves the gap around a floating sidebar see-through, which
  // shows black on dark dashboards; the dark page preview makes that visible.
  _shell(s) {
    if (s.shell === "custom") return `background:${s.shell_color}`;
    if (s.shell === "theme") return "background:var(--primary-background-color)";
    return "background:transparent";
  }

  _sidebar(s, { radius, floating, opacity = s.opacity, phone = false, expanded = this.expanded }) {
    const itemRadius = Math.min(Math.max((s.floating ? s.radius : 0) - 6, 8), 14);
    const style = [
      `border-radius:${radius}px`,
      `--ss-opacity:${opacity}%`,
      `--ss-blur:${s.blur}px`,
      `--ss-item-radius:${itemRadius}px`,
      `--ss-phone-text:${s.mobile_text_size ?? 14}px`,
      s.accent ? `--sidebar-selected-icon-color:${s.accent};--sidebar-selected-text-color:${s.accent}` : "",
    ].join(";");
    const rows = this._rows(s);
    // The first visible item stands in for the page you're on.
    const selected = rows.find((row) => row.item)?.item.path;
    return html`
      <nav
        class="sidebar ${floating ? "floating" : ""} ${phone ? "phone" : ""} ${expanded
          ? "expanded"
          : ""} ${s.highlight}"
        style=${style}
      >
        <div class="menu">
          <ha-icon icon="mdi:menu"></ha-icon>
          ${expanded ? html`<span>Home Assistant</span>` : nothing}
        </div>
        <div class="list">
          ${rows.map((row) =>
            row.heading !== undefined
              ? html`<div class="heading">${expanded ? row.heading : ""}</div>`
              : html`
                  <div
                    class="item ${row.item.path === selected ? "selected" : ""} ${s.hover_motion
                      ? "motion"
                      : ""}"
                  >
                    <ha-icon .icon=${row.item.icon}></ha-icon>
                    ${expanded ? html`<span>${row.item.title}</span>` : nothing}
                  </div>
                `
          )}
        </div>
        <div class="spacer"></div>
        <div class="item">
          <ha-icon icon="mdi:cog"></ha-icon>
          ${expanded ? html`<span>${this.settingsLabel}</span>` : nothing}
        </div>
      </nav>
    `;
  }

  // Same rules as applyCategories() in Glass Sidebar: ungrouped items first in
  // their natural order, then each group with a heading if it has visible items.
  _rows(s) {
    const hidden = new Set(s.hidden ?? []);
    const grouped = new Set(s.categories.flatMap((c) => c.panels));
    const byPath = new Map(this.items.map((item) => [item.path, item]));
    const rows = this.items
      .filter((item) => !grouped.has(item.path) && !hidden.has(item.path))
      .map((item) => ({ item }));
    const placed = new Set();
    for (const category of s.categories) {
      const items = category.panels
        .filter((path) => !placed.has(path) && !hidden.has(path) && byPath.has(path))
        .map((path) => byPath.get(path));
      items.forEach((item) => placed.add(item.path));
      if (!items.length) continue;
      rows.push({ heading: category.name });
      rows.push(...items.map((item) => ({ item })));
    }
    return rows;
  }

  _page() {
    return html`
      <div class="page">
        <div class="toolbar"></div>
        <div class="cards">
          ${[0, 1, 2, 3, 4, 5].map(() => html`<div class="card"></div>`)}
        </div>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
      min-width: 0;
    }

    .viewport {
      overflow: hidden;
      border-radius: 12px;
      border: 1px solid var(--divider-color);
    }

    .screen {
      position: relative;
      overflow: hidden;
      transform-origin: top left;
      font-family: var(--ha-font-family-body, Roboto, sans-serif);
      --page-bg: var(--primary-background-color, #fafafa);
      background: var(--page-bg);
    }

    /* Like the floor plan dashboard that turned the gap black. */
    .screen.dark {
      --page-bg: radial-gradient(circle at 70% 30%, #2b3440, #0d1117 70%);
    }

    .desktop {
      display: flex;
      height: 100%;
    }

    .shell {
      box-sizing: border-box;
      flex-shrink: 0;
      height: 100%;
    }

    .page {
      position: relative;
      flex: 1;
      height: 100%;
      background: var(--page-bg);
    }

    .screen > .page {
      position: absolute;
      inset: 0;
    }

    .toolbar {
      height: 56px;
    }

    .cards {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 12px;
      padding: 0 16px;
    }

    .card {
      height: 96px;
      border-radius: var(--ha-card-border-radius, 12px);
      background: var(--card-background-color, #fff);
      box-shadow: var(--ha-card-box-shadow, none);
    }

    .dark .card {
      background: rgba(255, 255, 255, 0.08);
    }

    .backdrop {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.32);
    }

    .backdrop.blurred {
      backdrop-filter: blur(8px) saturate(1.2);
    }

    .drawer {
      position: absolute;
      inset: 0 auto 0 0;
      box-sizing: border-box;
    }

    .drawer.plain {
      background: var(--sidebar-background-color, var(--card-background-color, #fff));
    }

    .sidebar {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: hidden;
      color: var(--sidebar-text-color, var(--primary-text-color));
      background: color-mix(
        in srgb,
        var(--sidebar-background-color, var(--card-background-color, #fff)) var(--ss-opacity),
        transparent
      );
      backdrop-filter: blur(var(--ss-blur)) saturate(1.5);
    }

    .sidebar.floating {
      border: 1px solid color-mix(in srgb, var(--divider-color, #888) 60%, transparent);
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06), 0 12px 32px rgba(0, 0, 0, 0.12);
    }

    .sidebar.floating.phone {
      box-shadow: 0 24px 60px rgba(0, 0, 0, 0.28);
    }

    .menu {
      display: flex;
      align-items: center;
      gap: 20px;
      height: 56px;
      padding: 0 16px;
      font-size: 20px;
      flex-shrink: 0;
    }

    .list {
      display: flex;
      flex-direction: column;
      padding: 4px 0;
      overflow: hidden;
    }

    .spacer {
      flex: 1;
    }

    .heading {
      padding: 14px 16px 6px;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--secondary-text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .sidebar:not(.expanded) .heading {
      height: 1px;
      padding: 0;
      margin: 8px 16px;
      background: var(--divider-color);
    }

    .item {
      position: relative;
      isolation: isolate;
      display: flex;
      align-items: center;
      gap: 20px;
      min-height: 40px;
      margin: 0 4px;
      padding: 0 12px;
      border-radius: var(--ss-item-radius);
      font-size: 14px;
      white-space: nowrap;
      color: var(--sidebar-text-color, var(--primary-text-color));
      flex-shrink: 0;
    }

    .phone .item {
      min-height: 48px;
      font-size: var(--ss-phone-text);
    }

    .item ha-icon {
      color: var(--sidebar-icon-color, var(--secondary-text-color));
      transition: transform 160ms ease-out;
    }

    .item.motion:hover ha-icon {
      transform: translateX(2px);
    }

    .item.selected {
      font-weight: 600;
      color: var(--sidebar-selected-text-color, var(--primary-color));
    }

    .item.selected ha-icon {
      color: var(--sidebar-selected-icon-color, var(--primary-color));
    }

    .item.selected::before {
      content: "";
      position: absolute;
      inset: 0;
      z-index: -1;
      border-radius: inherit;
      background: var(--sidebar-selected-icon-color, var(--primary-color));
      opacity: 0.14;
    }

    .vivid .item.selected::before {
      opacity: 1;
      background: linear-gradient(
        135deg,
        color-mix(in srgb, var(--sidebar-selected-icon-color, var(--primary-color)) 78%, black),
        color-mix(in srgb, var(--sidebar-selected-icon-color, var(--primary-color)) 60%, black)
      );
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.25),
        0 6px 18px -4px
          color-mix(in srgb, var(--sidebar-selected-icon-color, var(--primary-color)) 70%, transparent);
    }

    .vivid .item.selected,
    .vivid .item.selected ha-icon {
      color: #fff;
    }

    @media (prefers-reduced-motion: reduce) {
      .item.motion:hover ha-icon {
        transform: none;
      }
    }
  `;
}

if (!customElements.get("ss-sidebar-preview")) {
  customElements.define("ss-sidebar-preview", SidebarPreview);
}
