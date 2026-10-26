// Finds colors and corner radii written into dashboard cards. Those don't
// follow any theme, which is why changing a theme seems to do nothing on some
// dashboards. Each one gets a suggestion: the theme variable with the same
// color, or the card radius. The old value stays as a fallback.

const HEX = /(?<!var\([^)]*)#[0-9a-fA-F]{6}\b/g;
const RADIUS = /border-radius\s*:\s*(\d+(?:\.\d+)?px)/g;

// Theme colors worth pointing to, most useful first.
const COLOR_VARS = [
  "primary-color",
  "accent-color",
  "state-light-active-color",
  "state-climate-active-color",
  "primary-text-color",
  "secondary-text-color",
  "card-background-color",
  "primary-background-color",
  "secondary-background-color",
  "sidebar-background-color",
  "app-header-background-color",
  "divider-color",
  "error-color",
  "warning-color",
  "success-color",
  "info-color",
];

function toHex(value) {
  const text = String(value).trim().toLowerCase();
  if (/^#[0-9a-f]{6}$/.test(text)) return text;
  const rgb = text.match(/^rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)/);
  return rgb ? `#${rgb.slice(1, 4).map((n) => Number(n).toString(16).padStart(2, "0")).join("")}` : null;
}

/** "#f59e0b" → "primary-color", from the theme this screen uses now. */
export function themeColors(root = document.documentElement) {
  const style = getComputedStyle(root);
  const map = new Map();
  for (const name of COLOR_VARS) {
    const hex = toHex(style.getPropertyValue(`--${name}`));
    if (hex && !map.has(hex)) map.set(hex, name);
  }
  return map;
}

const radiusVar = (value) => `var(--ha-card-border-radius, ${value})`;
const colorVar = (name, hex) => `var(--${name}, ${hex})`;

/**
 * Every fixed color and radius in a dashboard config, grouped by value:
 * [{ kind, value, count, places, suggestion }].
 */
export function scanDashboard(config, colors) {
  const found = new Map();
  const add = (kind, value, place) => {
    const key = `${kind}:${value.toLowerCase()}`;
    if (!found.has(key)) {
      const name = kind === "color" ? colors.get(value.toLowerCase()) : null;
      found.set(key, {
        kind,
        value,
        count: 0,
        places: new Set(),
        suggestion: kind === "radius" ? radiusVar(value) : name ? colorVar(name, value) : null,
      });
    }
    const item = found.get(key);
    item.count += 1;
    item.places.add(place);
  };

  const walk = (node, place) => {
    if (Array.isArray(node)) {
      node.forEach((child) => walk(child, place));
      return;
    }
    if (node && typeof node === "object") {
      const here = node.type ? `${place} › ${String(node.type).replace(/^custom:/, "")}` : place;
      for (const [key, value] of Object.entries(node)) {
        if (key === "border-radius" && typeof value === "string" && /^\d+(\.\d+)?px$/.test(value.trim())) {
          add("radius", value.trim(), here);
        } else {
          walk(value, here);
        }
      }
      return;
    }
    if (typeof node === "string") {
      for (const match of node.matchAll(HEX)) add("color", match[0], place);
      for (const match of node.matchAll(RADIUS)) add("radius", match[1], place);
    }
  };

  (config.views ?? []).forEach((view, index) => walk(view, view.title ?? view.path ?? `${index + 1}`));
  return [...found.values()]
    .map((item) => ({ ...item, places: [...item.places] }))
    .sort((a, b) => b.count - a.count);
}

/** The config with every finding that has a suggestion replaced. */
export function applySuggestions(config, findings) {
  const colors = new Map(
    findings.filter((f) => f.kind === "color" && f.suggestion).map((f) => [f.value.toLowerCase(), f.suggestion])
  );
  const radii = new Set(findings.filter((f) => f.kind === "radius").map((f) => f.value));

  const fix = (text) =>
    text
      .replace(HEX, (hex) => colors.get(hex.toLowerCase()) ?? hex)
      .replace(RADIUS, (all, value) => (radii.has(value) ? `border-radius: ${radiusVar(value)}` : all));

  const walk = (node) => {
    if (Array.isArray(node)) return node.map(walk);
    if (node && typeof node === "object") {
      return Object.fromEntries(
        Object.entries(node).map(([key, value]) => {
          if (key === "border-radius" && typeof value === "string" && radii.has(value.trim())) {
            return [key, radiusVar(value.trim())];
          }
          return [key, walk(value)];
        })
      );
    }
    return typeof node === "string" ? fix(node) : node;
  };
  return walk(config);
}
