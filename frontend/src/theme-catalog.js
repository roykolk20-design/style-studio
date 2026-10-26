// Every theme variable the editor knows, grouped as you see them in Home
// Assistant, plus the rules that derive all of them from a few base colors.
//
// Values are written as plain hex or rgba, never color-mix(): older Android
// WebViews in the Companion app don't support it.

// [variable, Dutch label, English label, kind]; kind is color | size | shadow | text.
export const GROUPS = [
  {
    key: "basis",
    nl: "Basis",
    en: "Basics",
    vars: [
      ["primary-color", "Hoofdkleur", "Primary color", "color"],
      ["accent-color", "Accentkleur", "Accent color", "color"],
      ["light-primary-color", "Hoofdkleur licht", "Primary color, light", "color"],
      ["dark-primary-color", "Hoofdkleur donker", "Primary color, dark", "color"],
      ["text-primary-color", "Tekst op de hoofdkleur", "Text on primary color", "color"],
      ["primary-background-color", "Achtergrond", "Background", "color"],
      ["secondary-background-color", "Tweede achtergrond", "Secondary background", "color"],
      ["divider-color", "Scheidingslijnen", "Dividers", "color"],
    ],
  },
  {
    key: "text",
    nl: "Tekst",
    en: "Text",
    vars: [
      ["primary-text-color", "Tekst", "Text", "color"],
      ["secondary-text-color", "Tekst, tweede", "Secondary text", "color"],
      ["disabled-text-color", "Tekst, uitgeschakeld", "Disabled text", "color"],
    ],
  },
  {
    key: "header",
    nl: "Bovenbalk",
    en: "Top bar",
    vars: [
      ["app-header-background-color", "Achtergrond", "Background", "color"],
      ["app-header-text-color", "Tekst en iconen", "Text and icons", "color"],
      ["app-header-selection-bar-color", "Streep onder actieve tab", "Active tab bar", "color"],
      ["app-header-edit-background-color", "Achtergrond bij bewerken", "Background while editing", "color"],
      ["app-header-edit-text-color", "Tekst bij bewerken", "Text while editing", "color"],
    ],
  },
  {
    key: "sidebar",
    nl: "Zijbalk (menu)",
    en: "Sidebar (menu)",
    vars: [
      ["sidebar-background-color", "Achtergrond", "Background", "color"],
      ["sidebar-text-color", "Tekst", "Text", "color"],
      ["sidebar-icon-color", "Iconen", "Icons", "color"],
      ["sidebar-selected-icon-color", "Icoon actieve pagina", "Active page icon", "color"],
      ["sidebar-selected-text-color", "Tekst actieve pagina", "Active page text", "color"],
    ],
  },
  {
    key: "cards",
    nl: "Kaarten",
    en: "Cards",
    vars: [
      ["card-background-color", "Achtergrond", "Background", "color"],
      ["ha-card-background", "Achtergrond (dashboard)", "Background (dashboard)", "color"],
      ["ha-card-border-color", "Rand", "Border", "color"],
      ["ha-card-border-width", "Randdikte", "Border width", "size"],
      ["ha-card-border-radius", "Hoeken", "Corners", "size"],
      ["ha-card-box-shadow", "Schaduw", "Shadow", "shadow"],
    ],
  },
  {
    key: "popups",
    nl: "Pop-ups (Bubble Card)",
    en: "Pop-ups (Bubble Card)",
    vars: [
      ["bubble-pop-up-background-color", "Achtergrond pop-up", "Pop-up background", "color"],
      ["bubble-pop-up-main-background-color", "Achtergrond inhoud", "Content background", "color"],
      ["bubble-main-background-color", "Knoppen, achtergrond", "Buttons, background", "color"],
      ["bubble-secondary-background-color", "Tweede achtergrond", "Secondary background", "color"],
      ["bubble-button-background-color", "Knop", "Button", "color"],
      ["bubble-icon-background-color", "Achter iconen", "Behind icons", "color"],
    ],
  },
  {
    key: "dialogs",
    nl: "Vensters (meer info, instellingen)",
    en: "Dialogs (more info, settings)",
    vars: [
      ["ha-dialog-surface-background", "Achtergrond", "Background", "color"],
      ["mdc-theme-surface", "Achtergrond (oudere vensters)", "Background (older dialogs)", "color"],
      ["dialog-box-shadow", "Schaduw", "Shadow", "shadow"],
      ["ha-dialog-border-radius", "Hoeken", "Corners", "size"],
    ],
  },
  {
    key: "controls",
    nl: "Schakelaars en schuiven",
    en: "Switches and sliders",
    vars: [
      ["switch-checked-color", "Schakelaar aan", "Switch on", "color"],
      ["switch-checked-button-color", "Knopje aan", "Knob on", "color"],
      ["switch-checked-track-color", "Baan aan", "Track on", "color"],
      ["switch-unchecked-button-color", "Knopje uit", "Knob off", "color"],
      ["switch-unchecked-track-color", "Baan uit", "Track off", "color"],
      ["slider-color", "Schuif", "Slider", "color"],
      ["slider-bar-color", "Baan van de schuif", "Slider track", "color"],
    ],
  },
  {
    key: "inputs",
    nl: "Invoervelden",
    en: "Input fields",
    vars: [
      ["input-fill-color", "Achtergrond", "Background", "color"],
      ["mdc-text-field-fill-color", "Achtergrond (oudere velden)", "Background (older fields)", "color"],
      ["input-ink-color", "Tekst", "Text", "color"],
      ["input-label-ink-color", "Label", "Label", "color"],
      ["code-editor-background-color", "Code-editor", "Code editor", "color"],
    ],
  },
  {
    key: "states",
    nl: "Status en iconen",
    en: "States and icons",
    vars: [
      ["state-icon-color", "Icoon (uit)", "Icon (off)", "color"],
      ["state-active-color", "Aan (algemeen)", "On (general)", "color"],
      ["state-light-active-color", "Lamp aan", "Light on", "color"],
      ["state-switch-active-color", "Schakelaar aan", "Switch on", "color"],
      ["state-fan-active-color", "Ventilator aan", "Fan on", "color"],
      ["state-cover-active-color", "Zonwering open", "Cover open", "color"],
      ["state-inactive-color", "Uit (algemeen)", "Off (general)", "color"],
      ["state-unavailable-color", "Niet beschikbaar", "Unavailable", "color"],
    ],
  },
  {
    key: "climate",
    nl: "Airco-ring",
    en: "Climate ring",
    vars: [
      ["state-climate-active-color", "Actief", "Active", "color"],
      ["state-climate-auto-color", "Auto", "Auto", "color"],
      ["state-climate-cool-color", "Koelen", "Cool", "color"],
      ["state-climate-dry-color", "Drogen", "Dry", "color"],
      ["state-climate-heat-color", "Verwarmen", "Heat", "color"],
      ["state-climate-heat_cool-color", "Koelen en verwarmen", "Heat and cool", "color"],
      ["state-climate-fan_only-color", "Alleen ventilator", "Fan only", "color"],
    ],
  },
  {
    key: "alerts",
    nl: "Meldingen",
    en: "Alerts",
    vars: [
      ["error-color", "Fout", "Error", "color"],
      ["warning-color", "Waarschuwing", "Warning", "color"],
      ["success-color", "Gelukt", "Success", "color"],
      ["info-color", "Informatie", "Info", "color"],
    ],
  },
  {
    key: "weather",
    nl: "Weerkaart",
    en: "Weather card",
    vars: [
      ["weather-card-gradient", "Achtergrond (verloop)", "Background (gradient)", "text"],
      ["weather-card-accent", "Accent", "Accent", "color"],
    ],
  },
];

export const KNOWN_VARS = new Set(GROUPS.flatMap((group) => group.vars.map(([key]) => key)));

export const BASE_DEFAULTS = {
  background: "#f4efe6",
  card: "#fffaf2",
  text: "#3b3127",
  accent: "#f59e0b",
  sidebar: "#fbf6ec",
  // null: the same as the background.
  header: null,
  radius: 16,
  shadow: "soft",
  // 100 is solid; lower lets the background show through cards.
  card_opacity: 100,
  popup: "solid",
  popup_opacity: 80,
};

export const PRESETS = {
  sand: {
    nl: "Zand en geel",
    en: "Sand and yellow",
    base: { ...BASE_DEFAULTS },
  },
  pink: {
    nl: "Roze",
    en: "Pink",
    base: {
      ...BASE_DEFAULTS,
      background: "#fbf1f4",
      card: "#fffafc",
      text: "#3d2b33",
      accent: "#e8749e",
      sidebar: "#fdf5f8",
    },
  },
  dark: {
    nl: "Donker",
    en: "Dark",
    base: {
      ...BASE_DEFAULTS,
      background: "#111418",
      card: "#1b1f25",
      text: "#e6e8eb",
      accent: "#f5b301",
      sidebar: "#161a1f",
      shadow: "none",
    },
  },
  glass: {
    nl: "Glas",
    en: "Glass",
    base: {
      ...BASE_DEFAULTS,
      background: "#dfe7ef",
      card: "#ffffff",
      text: "#1f2a37",
      accent: "#3b82f6",
      sidebar: "#f3f6fa",
      radius: 20,
      card_opacity: 62,
      popup: "glass",
      popup_opacity: 72,
    },
  },
};

const SHADOWS = {
  none: "none",
  soft: "0 1px 2px rgba(0, 0, 0, 0.05), 0 4px 14px rgba(0, 0, 0, 0.06)",
  strong: "0 2px 4px rgba(0, 0, 0, 0.08), 0 12px 32px rgba(0, 0, 0, 0.14)",
};

function rgb(hex) {
  const value = parseInt(hex.slice(1), 16);
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
}

function toHex([r, g, b]) {
  return `#${[r, g, b].map((c) => Math.round(c).toString(16).padStart(2, "0")).join("")}`;
}

// `amount` of a, the rest b.
export function mix(a, b, amount) {
  const [x, y] = [rgb(a), rgb(b)];
  return toHex(x.map((c, i) => c * amount + y[i] * (1 - amount)));
}

function alpha(hex, percent) {
  if (percent >= 100) return hex;
  const [r, g, b] = rgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${percent / 100})`;
}

function luminance(hex) {
  const [r, g, b] = rgb(hex).map((c) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// Black or white, whichever reads better on `hex`.
export function readable(hex) {
  return luminance(hex) > 0.45 ? "#1f1f1f" : "#ffffff";
}

export const isDark = (hex) => luminance(hex) < 0.2;

/** All variables from the base colors. */
export function derive(base) {
  const b = { ...BASE_DEFAULTS, ...base };
  const dark = isDark(b.background);
  const header = b.header ?? b.background;
  const card = alpha(b.card, b.card_opacity);
  const secondaryText = mix(b.text, b.background, 0.62);
  const divider = mix(b.text, b.background, dark ? 0.16 : 0.12);
  const popup = b.popup === "glass" ? alpha(b.card, b.popup_opacity) : b.card;
  const soft = (color, amount) => mix(color, b.card, amount);

  return {
    "primary-color": b.accent,
    "accent-color": b.accent,
    "light-primary-color": mix(b.accent, b.background, 0.4),
    "dark-primary-color": mix(b.accent, "#000000", 0.8),
    "text-primary-color": readable(b.accent),
    "primary-background-color": b.background,
    "secondary-background-color": mix(b.text, b.background, dark ? 0.06 : 0.04),
    "divider-color": divider,

    "primary-text-color": b.text,
    "secondary-text-color": secondaryText,
    "disabled-text-color": mix(b.text, b.background, 0.38),

    "app-header-background-color": header,
    "app-header-text-color": header === b.background ? b.text : readable(header),
    "app-header-selection-bar-color": b.accent,
    "app-header-edit-background-color": mix(b.text, b.background, 0.75),
    "app-header-edit-text-color": readable(mix(b.text, b.background, 0.75)),

    "sidebar-background-color": b.sidebar,
    "sidebar-text-color": b.text,
    "sidebar-icon-color": secondaryText,
    "sidebar-selected-icon-color": b.accent,
    "sidebar-selected-text-color": dark ? b.accent : mix(b.accent, b.text, 0.7),

    "card-background-color": card,
    "ha-card-background": card,
    "ha-card-border-color": divider,
    "ha-card-border-width": "1px",
    "ha-card-border-radius": `${b.radius}px`,
    "ha-card-box-shadow": SHADOWS[b.shadow] ?? SHADOWS.soft,

    "bubble-pop-up-background-color": popup,
    "bubble-pop-up-main-background-color": popup,
    "bubble-main-background-color": mix(b.text, b.card, dark ? 0.08 : 0.05),
    "bubble-secondary-background-color": mix(b.text, b.card, dark ? 0.12 : 0.08),
    "bubble-button-background-color": soft(b.accent, 0.22),
    "bubble-icon-background-color": soft(b.accent, 0.18),

    "ha-dialog-surface-background": b.card,
    "mdc-theme-surface": b.card,
    "dialog-box-shadow": SHADOWS.strong,
    "ha-dialog-border-radius": `${Math.max(b.radius + 8, 12)}px`,

    "switch-checked-color": b.accent,
    "switch-checked-button-color": b.accent,
    "switch-checked-track-color": b.accent,
    "switch-unchecked-button-color": dark ? "#9aa0a6" : "#fafafa",
    "switch-unchecked-track-color": mix(b.text, b.background, 0.35),
    "slider-color": b.accent,
    "slider-bar-color": mix(b.accent, b.background, 0.3),

    "input-fill-color": mix(b.text, b.card, 0.05),
    "mdc-text-field-fill-color": mix(b.text, b.card, 0.05),
    "input-ink-color": b.text,
    "input-label-ink-color": secondaryText,
    "code-editor-background-color": b.card,

    "state-icon-color": secondaryText,
    "state-active-color": b.accent,
    "state-light-active-color": b.accent,
    "state-switch-active-color": b.accent,
    "state-fan-active-color": b.accent,
    "state-cover-active-color": b.accent,
    "state-inactive-color": mix(b.text, b.background, 0.4),
    "state-unavailable-color": mix(b.text, b.background, 0.3),

    // Active follows the theme (yellow for sand, pink for pink); the modes
    // keep the colors people know from Home Assistant.
    "state-climate-active-color": b.accent,
    "state-climate-auto-color": "#43a047",
    "state-climate-cool-color": "#2196f3",
    "state-climate-dry-color": "#efbd07",
    "state-climate-heat-color": "#ff8100",
    "state-climate-heat_cool-color": "#ffa000",
    "state-climate-fan_only-color": "#00bcd4",

    "error-color": "#db4437",
    "warning-color": "#ffa600",
    "success-color": "#43a047",
    "info-color": "#039be5",

    "weather-card-gradient": `linear-gradient(135deg, ${soft(b.accent, 0.35)}, ${b.card})`,
    "weather-card-accent": b.accent,
  };
}

/** What gets written: the derived values with the user's own on top. */
export function themeVars(theme) {
  return { ...derive(theme.base), ...theme.overrides };
}

// Picks base colors from an existing theme, so importing gives a sensible
// starting point; every variable it sets is kept as an override.
export function fromExisting(vars) {
  const hex = (key) => {
    const value = String(vars[key] ?? "").trim();
    return /^#[0-9a-f]{6}$/i.test(value) ? value.toLowerCase() : null;
  };
  const base = { ...BASE_DEFAULTS };
  base.background = hex("primary-background-color") ?? base.background;
  base.card = hex("card-background-color") ?? hex("ha-card-background") ?? base.card;
  base.text = hex("primary-text-color") ?? base.text;
  base.accent = hex("primary-color") ?? base.accent;
  base.sidebar = hex("sidebar-background-color") ?? base.background;
  base.header = hex("app-header-background-color");
  const overrides = {};
  for (const [key, value] of Object.entries(vars)) {
    if (typeof value === "string" || typeof value === "number") overrides[key] = String(value);
  }
  return { base, overrides };
}
