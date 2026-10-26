// Other cards from the "Licht" view in the brief (2.4): a greeting with the
// day, lights and who is home; scenes; house status; weather. They use Home
// Assistant's own cards (markdown, tile, weather-forecast), so they need
// nothing from HACS and follow the theme.

export const KINDS = ["greeting", "scenes", "status", "weather"];

const DAYS = {
  nl: ["maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag", "zondag"],
  en: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
};
const MONTHS = {
  nl: ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"],
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
};
const TEXT = {
  nl: {
    morning: "Goedemorgen",
    afternoon: "Goedemiddag",
    evening: "Goedenavond",
    lights: "lampen aan",
    home: "thuis",
    batteries: "Bijna lege batterijen",
    offline: "Niet beschikbaar",
    allGood: "Alles in orde",
  },
  en: {
    morning: "Good morning",
    afternoon: "Good afternoon",
    evening: "Good evening",
    lights: "lights on",
    home: "home",
    batteries: "Low batteries",
    offline: "Unavailable",
    allGood: "All good",
  },
};

const list = (items) => `[${items.map((item) => `'${item}'`).join(", ")}]`;

/** Markdown with the greeting, the date and a line of facts. */
export function greetingCard(lang, weather) {
  const t = TEXT[lang];
  const temperature = weather
    ? ` · {{ state_attr('${weather}', 'temperature') }}{{ state_attr('${weather}', 'temperature_unit') }}`
    : "";
  return {
    type: "markdown",
    text_only: true,
    content: [
      "{% set h = now().hour %}",
      `## {{ '${t.morning}' if h < 12 else '${t.afternoon}' if h < 18 else '${t.evening}' }}, {{ user }}`,
      `{{ ${list(DAYS[lang])}[now().weekday()] }} {{ now().day }} {{ ${list(MONTHS[lang])}[now().month - 1] }}`,
      "",
      `{{ states.light | selectattr('state', 'eq', 'on') | list | count }} ${t.lights} · ` +
        `{{ states.person | selectattr('state', 'eq', 'home') | list | count }} ${t.home}${temperature}`,
    ].join("\n"),
  };
}

/** A tile per scene that turns it on with one tap. */
export function scenesCard(scenes) {
  const turnOn = (entity) => ({
    action: "perform-action",
    perform_action: "scene.turn_on",
    target: { entity_id: entity },
  });
  return {
    type: "grid",
    columns: Math.min(3, Math.max(1, scenes.length)),
    square: false,
    cards: scenes.map((entity) => ({
      type: "tile",
      entity,
      tap_action: turnOn(entity),
      icon_tap_action: turnOn(entity),
    })),
  };
}

/** Markdown that lists low batteries and devices that are offline. */
export function statusCard(lang) {
  const t = TEXT[lang];
  return {
    type: "markdown",
    content: [
      "{% set low = namespace(names=[]) %}",
      "{% for s in states.sensor if s.attributes.device_class == 'battery' and s.state | is_number and s.state | float < 20 %}",
      "{% set low.names = low.names + [s.name ~ ' (' ~ s.state ~ '%)'] %}",
      "{% endfor %}",
      "{% set off = states | selectattr('state', 'eq', 'unavailable') | list | count %}",
      "{% if low.names or off %}",
      `{% if low.names %}**${t.batteries}:** {{ low.names | join(', ') }}{% endif %}`,
      "",
      `{% if off %}**${t.offline}:** {{ off }}{% endif %}`,
      "{% else %}",
      `✓ ${t.allGood}`,
      "{% endif %}",
    ].join("\n"),
  };
}

export function weatherCard(entity) {
  return { type: "weather-forecast", entity, forecast_type: "daily", show_forecast: true };
}
