// Builds the rooms view: a section per floor with a tile per room
// (custom:button-card) and a Bubble Card pop-up per room with its lights.
// Like the hand-made "Licht" view (see the brief, 2.4), with theme variables
// instead of fixed colors.
import { slug } from "./climate-cards.js";

export const OTHER = "__other";

/** Lights and the climate entity of an area, from the registries. */
export function areaEntities(hass, areaId) {
  const inArea = (id) => {
    const entry = hass.entities?.[id];
    if (!entry || entry.hidden) return false;
    return (entry.area_id ?? hass.devices?.[entry.device_id]?.area_id) === areaId;
  };
  const ids = Object.keys(hass.states).filter(inArea).sort();
  return {
    lights: ids.filter((id) => id.startsWith("light.")),
    climate: ids.find((id) => id.startsWith("climate.")) ?? null,
  };
}

/** Floors in order, each with its areas; areas without a floor go last. */
export function floorsWithAreas(hass, otherName) {
  const floors = Object.values(hass.floors ?? {})
    .sort((a, b) => (a.level ?? 0) - (b.level ?? 0) || a.name.localeCompare(b.name))
    .map((floor) => ({ id: floor.floor_id, name: floor.name, areas: [] }));
  const other = { id: OTHER, name: otherName, areas: [] };
  for (const area of Object.values(hass.areas ?? {}).sort((a, b) => a.name.localeCompare(b.name))) {
    (floors.find((f) => f.id === area.floor_id) ?? other).areas.push(area.area_id);
  }
  return [...floors, other].filter((floor) => floor.areas.length);
}

export function defaultRoom(hass, area) {
  const { lights, climate } = areaEntities(hass, area.area_id);
  return {
    include: lights.length > 0 || Boolean(climate),
    name: area.name,
    icon: area.icon || "mdi:home-outline",
    lights,
    climate,
    climate_button: Boolean(climate),
  };
}

export const roomHash = (name) => `#l-${slug(name)}`;
// The same address the Climate tab gives an air conditioner in this room.
export const climateHash = (name) => `#airco-${slug(name)}`;

function tile(room, labels) {
  const lights = JSON.stringify(room.lights);
  const anyOn = `${lights}.some((e) => states[e] && states[e].state === 'on')`;
  return {
    type: "custom:button-card",
    name: room.name,
    icon: room.icon,
    show_label: true,
    label: `[[[ const on = ${lights}.filter((e) => states[e] && states[e].state === 'on').length; return on ? on + ' ${labels.on}' : '${labels.off}'; ]]]`,
    tap_action: { action: "navigate", navigation_path: roomHash(room.name) },
    hold_action: { action: "none" },
    styles: {
      grid: [{ "grid-template-areas": '"i" "n" "l"' }, { "justify-items": "start" }],
      card: [
        { padding: "14px" },
        { "border-radius": "var(--ha-card-border-radius, 16px)" },
        { "min-height": "96px" },
      ],
      img_cell: [
        { width: "40px" },
        { height: "40px" },
        { "border-radius": "50%" },
        { "background-color": "var(--secondary-background-color)" },
        { "justify-content": "center" },
      ],
      icon: [{ width: "22px" }, { color: "var(--state-icon-color)" }],
      name: [{ "font-weight": "600" }, { "justify-self": "start" }, { "margin-top": "10px" }],
      label: [{ "justify-self": "start" }, { "font-size": "12px" }, { color: "var(--secondary-text-color)" }],
    },
    state: [
      {
        operator: "template",
        value: `[[[ return ${anyOn}; ]]]`,
        styles: {
          img_cell: [{ "background-color": "var(--bubble-icon-background-color, var(--secondary-background-color))" }],
          icon: [{ color: "var(--state-light-active-color)" }],
        },
      },
    ],
  };
}

function popup(room, style, labels) {
  const head = {
    type: "custom:bubble-card",
    card_type: "pop-up",
    hash: roomHash(room.name),
    name: room.name,
    icon: room.icon,
    show_header: style.show_header,
    width_desktop: `${style.width_desktop}px`,
    margin_top_mobile: `${style.margin_top_mobile}%`,
    bg_opacity: style.glass ? String(style.opacity) : "100",
    bg_blur: style.glass ? "14" : "0",
  };
  const cards = [head];
  for (const light of room.lights) {
    cards.push({ type: "tile", entity: light, features: [{ type: "light-brightness" }] });
  }
  if (room.climate && room.climate_button) {
    const hash = climateHash(room.name);
    cards.push({
      type: "custom:bubble-card",
      card_type: "button",
      button_type: "name",
      entity: room.climate,
      name: labels.climate,
      icon: "mdi:air-conditioner",
      show_state: true,
      show_attribute: true,
      attribute: "current_temperature",
      tap_action: { action: "navigate", navigation_path: hash },
      button_action: { tap_action: { action: "navigate", navigation_path: hash } },
    });
  }
  return { type: "vertical-stack", cards };
}

/** The whole view. `floors` holds { name, rooms: [room] } in order. */
export function roomsView(settings, floors, labels) {
  const sections = floors
    .filter((floor) => floor.rooms.length)
    .map((floor) => ({
      type: "grid",
      cards: [
        { type: "heading", heading: floor.name },
        ...floor.rooms.map((room) => tile(room, labels)),
        ...floor.rooms.map((room) => popup(room, settings.popup, labels)),
      ],
    }));
  return {
    title: settings.title,
    path: settings.path,
    icon: "mdi:home-floor-plan",
    type: "sections",
    // One column per floor on a wide screen; phones stack them by themselves.
    max_columns: Math.max(1, Math.min(4, sections.length)),
    sections,
  };
}

export { tile as roomTile, popup as roomPopup };
