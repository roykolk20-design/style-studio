import { LitElement, css, html, nothing } from "lit";

// Icons for rooms and devices, with Dutch and English words to find them.
const SUGGESTED = [
  ["mdi:sofa", "woonkamer bank living room"],
  ["mdi:sofa-outline", "woonkamer bank living room"],
  ["mdi:television", "tv televisie"],
  ["mdi:bed", "slaapkamer bed bedroom"],
  ["mdi:bed-king", "slaapkamer bed bedroom"],
  ["mdi:bunk-bed", "kinderkamer kids"],
  ["mdi:baby-carriage", "babykamer baby"],
  ["mdi:fridge", "keuken koelkast kitchen"],
  ["mdi:stove", "keuken fornuis kitchen"],
  ["mdi:silverware-fork-knife", "eetkamer dining"],
  ["mdi:table-chair", "eettafel dining"],
  ["mdi:shower", "badkamer douche bathroom"],
  ["mdi:bathtub", "badkamer bad bathroom"],
  ["mdi:toilet", "toilet wc"],
  ["mdi:washing-machine", "waskamer wasmachine laundry"],
  ["mdi:desk", "kantoor bureau office"],
  ["mdi:laptop", "werkkamer office"],
  ["mdi:hanger", "kledingkamer kast wardrobe"],
  ["mdi:wardrobe", "kast wardrobe"],
  ["mdi:door", "hal deur hall door"],
  ["mdi:door-open", "voordeur entree door"],
  ["mdi:stairs", "trap overloop stairs"],
  ["mdi:home", "huis home"],
  ["mdi:home-outline", "huis home"],
  ["mdi:home-roof", "zolder attic"],
  ["mdi:home-floor-0", "begane grond ground floor"],
  ["mdi:home-floor-1", "eerste verdieping first floor"],
  ["mdi:garage", "garage"],
  ["mdi:car", "auto oprit car"],
  ["mdi:flower", "tuin bloemen garden"],
  ["mdi:tree", "tuin boom garden"],
  ["mdi:grass", "gazon tuin lawn"],
  ["mdi:grill", "bbq barbecue"],
  ["mdi:pool", "zwembad pool"],
  ["mdi:hot-tub", "jacuzzi hot tub"],
  ["mdi:dumbbell", "fitness sport gym"],
  ["mdi:gamepad-variant", "spelen gamen games"],
  ["mdi:bookshelf", "bibliotheek boeken books"],
  ["mdi:music", "muziek music"],
  ["mdi:paw", "huisdier dieren pets"],
  ["mdi:ceiling-light", "plafondlamp lamp light"],
  ["mdi:floor-lamp", "staande lamp lamp"],
  ["mdi:lamp", "lamp schemerlamp"],
  ["mdi:lightbulb", "lamp licht light"],
  ["mdi:led-strip-variant", "ledstrip led"],
  ["mdi:air-conditioner", "airco klimaat climate"],
  ["mdi:fan", "ventilator fan"],
  ["mdi:radiator", "verwarming radiator heating"],
  ["mdi:thermometer", "temperatuur temperature"],
  ["mdi:cctv", "camera beveiliging"],
  ["mdi:shield-home", "beveiliging alarm security"],
  ["mdi:server", "server techniek meterkast"],
  ["mdi:solar-power", "zonnepanelen solar"],
  ["mdi:lightning-bolt", "energie stroom energy"],
  ["mdi:battery", "batterij thuisbatterij battery"],
  ["mdi:water", "water"],
  ["mdi:weather-sunny", "weer zon weather"],
  ["mdi:account-group", "familie gezin family"],
  ["mdi:heart", "favoriet favorite"],
  ["mdi:star", "ster favoriet star"],
];

let allIcons = null;

// Home Assistant's own list of every icon, when this browser can get it.
async function loadAll() {
  if (allIcons) return allIcons;
  try {
    const res = await fetch("/static/mdi/iconList.json");
    const list = await res.json();
    allIcons = list.map((item) =>
      typeof item === "string"
        ? [`mdi:${item}`, item]
        : [`mdi:${item.name}`, [item.name, ...(item.keywords ?? [])].join(" ")]
    );
  } catch (err) {
    allIcons = [];
  }
  return allIcons;
}

/** Pick an icon from a grid or by searching; fires "change" with the icon. */
export class IconPicker extends LitElement {
  static properties = {
    value: {},
    t: { attribute: false },
    _open: { state: true },
    _query: { state: true },
    _all: { state: true },
  };

  constructor() {
    super();
    this._open = false;
    this._query = "";
    this._all = [];
  }

  async _toggle() {
    this._open = !this._open;
    if (this._open && !this._all.length) this._all = await loadAll();
  }

  _pick(icon) {
    this._open = false;
    this.dispatchEvent(new CustomEvent("change", { detail: icon }));
  }

  _matches() {
    const words = this._query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (!words.length) return SUGGESTED;
    const hit = ([icon, text]) => words.every((w) => icon.includes(w) || text.includes(w));
    const found = [...SUGGESTED.filter(hit)];
    const seen = new Set(found.map(([icon]) => icon));
    for (const entry of this._all) {
      if (found.length >= 120) break;
      if (!seen.has(entry[0]) && hit(entry)) found.push(entry);
    }
    return found;
  }

  render() {
    const matches = this._open ? this._matches() : [];
    return html`
      <button class="current" aria-expanded=${this._open ? "true" : "false"} @click=${this._toggle}>
        <ha-icon .icon=${this.value}></ha-icon>
        <span>${this.t("ip_choose")}</span>
      </button>
      ${this._open
        ? html`<div class="panel">
            <input
              type="search"
              placeholder=${this.t("ip_search")}
              aria-label=${this.t("ip_search")}
              .value=${this._query}
              @input=${(ev) => (this._query = ev.target.value)}
            />
            <div class="grid">
              ${matches.map(
                ([icon]) => html`<button
                  class="icon ${icon === this.value ? "chosen" : ""}"
                  title=${icon.replace("mdi:", "")}
                  aria-label=${icon.replace("mdi:", "")}
                  @click=${() => this._pick(icon)}
                >
                  <ha-icon .icon=${icon}></ha-icon>
                </button>`
              )}
            </div>
            ${!matches.length ? html`<p>${this.t("ip_none")}</p>` : nothing}
          </div>`
        : nothing}
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

    .current {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 8px 14px 8px 8px;
      border-radius: 999px;
      border: 1px solid var(--divider-color);
    }

    .current ha-icon {
      display: grid;
      place-items: center;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: color-mix(in srgb, var(--primary-color) 16%, transparent);
      color: var(--primary-color);
    }

    .panel {
      margin-top: 10px;
      padding: 10px;
      border-radius: 12px;
      border: 1px solid var(--divider-color);
    }

    input {
      width: 100%;
      box-sizing: border-box;
      font: inherit;
      padding: 8px 10px;
      border-radius: 8px;
      border: 1px solid var(--divider-color);
      background: var(--card-background-color);
      color: var(--primary-text-color);
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(44px, 1fr));
      gap: 4px;
      max-height: 240px;
      overflow-y: auto;
      margin-top: 8px;
    }

    .icon {
      display: grid;
      place-items: center;
      height: 44px;
      border-radius: 10px;
    }

    .icon:hover {
      background: var(--secondary-background-color);
    }

    .icon.chosen {
      background: color-mix(in srgb, var(--primary-color) 20%, transparent);
      color: var(--primary-color);
    }

    p {
      color: var(--secondary-text-color);
      font-size: 13px;
    }
  `;
}

if (!customElements.get("ss-icon-picker")) {
  customElements.define("ss-icon-picker", IconPicker);
}
