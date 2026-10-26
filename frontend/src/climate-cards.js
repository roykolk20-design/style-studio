// Builds the climate pop-up: a Bubble Card pop-up with custom:button-card
// buttons, the design that worked by hand (see the brief, 2.5). Colors are
// theme variables, so the active button follows each person's theme.

import { popupCard, popupHeadOf } from "./popup-format.js";

export const MODE_ICONS = {
  off: "mdi:power",
  cool: "mdi:snowflake",
  heat: "mdi:fire",
  auto: "mdi:thermostat-auto",
  dry: "mdi:water-percent",
  fan_only: "mdi:fan",
  heat_cool: "mdi:sun-snowflake-variant",
};

const FAN_ICONS = {
  auto: "mdi:fan-auto",
  low: "mdi:fan-speed-1",
  medium: "mdi:fan-speed-2",
  middle: "mdi:fan-speed-2",
  high: "mdi:fan-speed-3",
};

export const slug = (text) =>
  String(text)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "airco";

/** What a climate entity can do, from its attributes. */
export function capabilities(stateObj) {
  const a = stateObj?.attributes ?? {};
  const toggle = (modes) => {
    if (!Array.isArray(modes) || modes.length < 2) return null;
    const off = modes.find((m) => String(m).toLowerCase() === "off");
    const on = modes.find((m) => m !== off);
    return off && on ? { off, on } : null;
  };
  return {
    modes: Array.isArray(a.hvac_modes) ? a.hvac_modes : [],
    fanModes: Array.isArray(a.fan_modes) ? a.fan_modes : [],
    swing: toggle(a.swing_modes),
    swingHorizontal: toggle(a.swing_horizontal_modes),
    temperature: a.temperature !== undefined || a.target_temp_low === undefined,
    min: Number(a.min_temp ?? 16),
    max: Number(a.max_temp ?? 30),
    step: Number(a.target_temp_step ?? 0.5),
  };
}

export function defaultOptions(entityId, stateObj, name) {
  const caps = capabilities(stateObj);
  return {
    entity: entityId,
    name,
    hash: `#airco-${slug(name.replace(/^airco\s*/i, "") || entityId.split(".")[1])}`,
    modes: [...caps.modes],
    fan: caps.fanModes.length > 0,
    swing: Boolean(caps.swing),
    swing_horizontal: Boolean(caps.swingHorizontal),
    temperature: caps.temperature,
    opener: true,
  };
}

const ACTIVE = {
  card: [{ "background-color": "var(--state-climate-active-color, var(--primary-color))" }],
  name: [{ color: "var(--text-primary-color, #fff)" }],
  icon: [{ color: "var(--text-primary-color, #fff)" }],
  label: [{ color: "var(--text-primary-color, #fff)" }],
};

function button(entity, { name, icon, tap, active, extra = {} }) {
  return {
    type: "custom:button-card",
    entity,
    name,
    icon,
    show_state: false,
    show_name: true,
    show_icon: Boolean(icon),
    tap_action: tap ?? { action: "none" },
    hold_action: { action: "none" },
    styles: {
      card: [
        { "border-radius": "18px" },
        { padding: "10px 4px" },
        { "box-shadow": "none" },
        { "background-color": "var(--bubble-main-background-color, var(--secondary-background-color))" },
      ],
      name: [{ "font-size": "13px" }, { "font-weight": "500" }],
      icon: [{ width: "24px" }],
    },
    ...(active
      ? { state: [{ operator: "template", value: `[[[ return ${active}; ]]]`, styles: ACTIVE }] }
      : {}),
    ...extra,
  };
}

const perform = (entity, action, data) => ({
  action: "perform-action",
  perform_action: action,
  target: { entity_id: entity },
  data,
});

/**
 * The cards for one climate entity: [pop-up, opener button or null].
 * `labels` holds the texts in the user's language.
 */
export function climateCards(options, stateObj, labels) {
  const { entity } = options;
  const caps = capabilities(stateObj);
  const cards = [
    {
      type: "custom:bubble-card",
      card_type: "pop-up",
      hash: options.hash,
      name: options.name,
      icon: "mdi:air-conditioner",
      entity,
    },
  ];

  if (options.temperature) {
    const round = (expr) => `Math.round((${expr}) * 10) / 10`;
    const target = `Number(entity.attributes.temperature ?? ${caps.min})`;
    const big = { card: [{ height: "88px" }], icon: [{ width: "36px" }] };
    cards.push({
      type: "grid",
      columns: 3,
      square: false,
      cards: [
        button(entity, {
          icon: "mdi:minus",
          tap: perform(entity, "climate.set_temperature", {
            temperature: `[[[ return Math.max(${caps.min}, ${round(`${target} - ${caps.step}`)}); ]]]`,
          }),
          extra: { show_name: false, styles: { card: big.card, icon: big.icon } },
        }),
        button(entity, {
          name: "[[[ return (entity.attributes.temperature ?? '–') + '°'; ]]]",
          extra: {
            show_label: true,
            label: `[[[ return '${labels.now} ' + (entity.attributes.current_temperature ?? '–') + '°'; ]]]`,
            styles: {
              card: big.card,
              name: [{ "font-size": "28px" }, { "font-weight": "600" }],
              label: [{ "font-size": "12px" }, { opacity: "0.7" }],
            },
          },
        }),
        button(entity, {
          icon: "mdi:plus",
          tap: perform(entity, "climate.set_temperature", {
            temperature: `[[[ return Math.min(${caps.max}, ${round(`${target} + ${caps.step}`)}); ]]]`,
          }),
          extra: { show_name: false, styles: { card: big.card, icon: big.icon } },
        }),
      ],
    });
  }

  const modes = caps.modes.filter((mode) => options.modes.includes(mode));
  if (modes.length) {
    cards.push({
      type: "grid",
      title: labels.mode,
      columns: Math.min(modes.length, 3),
      square: false,
      cards: modes.map((mode) =>
        button(entity, {
          name: labels.modes[mode] ?? mode,
          icon: MODE_ICONS[mode] ?? "mdi:thermostat",
          tap: perform(entity, "climate.set_hvac_mode", { hvac_mode: mode }),
          active: `entity.state === '${mode}'`,
        })
      ),
    });
  }

  if (options.fan && caps.fanModes.length) {
    cards.push({
      type: "grid",
      title: labels.fan,
      columns: Math.min(caps.fanModes.length, 4),
      square: false,
      cards: caps.fanModes.map((mode) =>
        button(entity, {
          name: labels.fanModes[mode] ?? String(mode).charAt(0).toUpperCase() + String(mode).slice(1),
          icon: FAN_ICONS[mode] ?? "mdi:fan",
          tap: perform(entity, "climate.set_fan_mode", { fan_mode: mode }),
          active: `entity.attributes.fan_mode === '${mode}'`,
        })
      ),
    });
  }

  const swings = [];
  if (options.swing && caps.swing) {
    const { on, off } = caps.swing;
    swings.push(
      button(entity, {
        name: labels.swingVertical,
        icon: "mdi:arrow-up-down",
        tap: perform(entity, "climate.set_swing_mode", {
          swing_mode: `[[[ return entity.attributes.swing_mode === '${off}' ? '${on}' : '${off}'; ]]]`,
        }),
        active: `entity.attributes.swing_mode !== '${off}'`,
      })
    );
  }
  if (options.swing_horizontal && caps.swingHorizontal) {
    const { on, off } = caps.swingHorizontal;
    swings.push(
      button(entity, {
        name: labels.swingHorizontal,
        icon: "mdi:arrow-left-right",
        tap: perform(entity, "climate.set_swing_horizontal_mode", {
          swing_horizontal_mode: `[[[ return entity.attributes.swing_horizontal_mode === '${off}' ? '${on}' : '${off}'; ]]]`,
        }),
        active: `entity.attributes.swing_horizontal_mode !== '${off}'`,
      })
    );
  }
  if (swings.length) {
    cards.push({ type: "grid", title: labels.swing, columns: swings.length, square: false, cards: swings });
  }

  const [head, ...content] = cards;
  const popup = popupCard(head, content);
  const opener = options.opener
    ? {
        type: "custom:bubble-card",
        card_type: "button",
        button_type: "name",
        entity,
        name: options.name,
        icon: "mdi:air-conditioner",
        show_state: true,
        show_attribute: true,
        attribute: "current_temperature",
        tap_action: { action: "navigate", navigation_path: options.hash },
        button_action: { tap_action: { action: "navigate", navigation_path: options.hash } },
      }
    : null;
  return { popup, opener };
}

/** Finds cards made for this pop-up earlier, so they get replaced. */
export const isPopup = (hash) => (card) => popupHeadOf(card)?.hash === hash;

export const isOpener = (hash) => (card) =>
  card?.type === "custom:bubble-card" &&
  card.card_type === "button" &&
  (card.tap_action?.navigation_path === hash ||
    card.button_action?.tap_action?.navigation_path === hash);
