// Finds room tiles and pop-ups that are already on a dashboard, also hand-made
// ones, and changes them in place: only the name, icon and lights change; the
// card's own design (styles, templates) stays as it is.
//
// A room is a pair that shares an address like "#l-woonkamer":
// - a tile: any card that navigates to that address;
// - a pop-up: a Bubble Card pop-up with that hash, either as the first card of
//   a vertical-stack (the classic way) or with its own `cards`.

const LIGHT_ARRAY = /\[\s*(?:["'`]light\.[a-z0-9_]+["'`]\s*,?\s*)+\]/g;
const CONST_NAME = /(const\s+NAME\s*=\s*)(["'`])((?:\\.|(?!\2).)*)\2/;
const CONST_ICON = /(const\s+ICON\s*=\s*)(["'`])((?:\\.|(?!\2).)*)\2/;

const clone = (value) => JSON.parse(JSON.stringify(value));

function navigation(card) {
  return (
    card?.tap_action?.navigation_path ??
    card?.button_action?.tap_action?.navigation_path ??
    null
  );
}

function popupHead(card) {
  if (card?.type === "custom:bubble-card" && card.card_type === "pop-up") return card;
  const first = card?.type === "vertical-stack" ? card.cards?.[0] : null;
  return first?.type === "custom:bubble-card" && first.card_type === "pop-up" ? first : null;
}

// The cards inside a pop-up, wherever they are kept.
function popupBody(card) {
  if (card.type === "vertical-stack") return { list: card.cards, start: 1 };
  card.cards ??= [];
  return { list: card.cards, start: 0 };
}

/** Every string in a card, with a way to replace it. */
function strings(node, visit) {
  if (Array.isArray(node)) {
    node.forEach((child, index) => {
      if (typeof child === "string") node[index] = visit(child);
      else strings(child, visit);
    });
  } else if (node && typeof node === "object") {
    for (const [key, value] of Object.entries(node)) {
      if (typeof value === "string") node[key] = visit(value);
      else strings(value, visit);
    }
  }
}

function readTemplate(card, pattern) {
  let found = null;
  strings(clone(card), (text) => {
    const match = text.match(pattern);
    if (match && found === null) found = match[3];
    return text;
  });
  return found;
}

function lightsIn(card) {
  let found = null;
  strings(clone(card), (text) => {
    const match = text.match(LIGHT_ARRAY);
    if (match && !found) found = JSON.parse(match[0].replace(/['`]/g, '"').replace(/,\s*\]/, "]"));
    return text;
  });
  return found;
}

/** Walks every card of every view with where it is. */
function eachCard(config, visit) {
  (config.views ?? []).forEach((view, viewIndex) => {
    const walk = (cards, where) =>
      (cards ?? []).forEach((card, index) => {
        visit(card, { ...where, index });
        if (Array.isArray(card?.cards) && !popupHead(card)) walk(card.cards, { ...where, nested: true });
      });
    walk(view.cards, { view: viewIndex, section: null });
    (view.sections ?? []).forEach((section, sectionIndex) =>
      walk(section.cards, { view: viewIndex, section: sectionIndex })
    );
  });
}

/** Sections of a view with a readable label, for "where to put it". */
export function sectionsOf(view) {
  if (view?.type !== "sections") return [{ index: null, label: view?.title ?? "" }];
  return (view.sections ?? []).map((section, index) => {
    const heading = (section.cards ?? []).find((card) => card.type === "heading")?.heading;
    return { index, label: heading ?? `#${index + 1}` };
  });
}

/** Rooms on this dashboard: [{ hash, name, icon, lights, climate, tile, popup }]. */
export function findRooms(config) {
  const rooms = new Map();
  const room = (hash) => {
    if (!rooms.has(hash)) rooms.set(hash, { hash, tile: null, popup: null });
    return rooms.get(hash);
  };
  eachCard(config, (card, where) => {
    const head = popupHead(card);
    if (head?.hash?.startsWith("#")) room(head.hash).popup = { ...where };
    const target = navigation(card);
    if (target?.startsWith("#") && !head && !target.startsWith("#airco")) {
      // Only cards that look like a room tile, not every button with a link.
      const r = room(target);
      if (!r.tile) r.tile = { ...where };
    }
  });

  const result = [];
  for (const r of rooms.values()) {
    if (!r.popup) continue;
    const popupCard = cardAt(config, r.popup);
    const head = popupHead(popupCard);
    const body = popupBody(clone(popupCard));
    const inside = body.list.slice(body.start);
    const tileCard = r.tile ? cardAt(config, r.tile) : null;
    const lightsFromPopup = inside.map((c) => c.entity).filter((e) => e?.startsWith("light."));
    result.push({
      hash: r.hash,
      name: head.name ?? (tileCard && (readTemplate(tileCard, CONST_NAME) ?? tileCard.name)) ?? r.hash,
      icon: head.icon ?? (tileCard && (readTemplate(tileCard, CONST_ICON) ?? tileCard.icon)) ?? "mdi:home-outline",
      lights: lightsFromPopup.length ? lightsFromPopup : (tileCard && lightsIn(tileCard)) ?? [],
      climate: inside.find((c) => c.entity?.startsWith("climate."))?.entity ?? null,
      tile: r.tile,
      popup: r.popup,
    });
  }
  return result.sort((a, b) => a.name.localeCompare(b.name));
}

export function cardAt(config, where) {
  const view = config.views[where.view];
  const list = where.section === null ? view.cards : view.sections[where.section].cards;
  return list[where.index];
}

/**
 * Changes a room in place and returns the new config. The tile keeps its
 * design: its name, icon and list of lights are swapped, also inside
 * button-card templates (`const NAME`, `const ICON`, `const LIGHTS`).
 */
export function updateRoom(config, room, changes) {
  const next = clone(config);
  const { name, icon, lights } = changes;
  const lightsJson = JSON.stringify(lights);

  if (room.tile) {
    const tile = cardAt(next, room.tile);
    if (typeof tile.name === "string" && !tile.name.includes("[[[")) tile.name = name;
    if (typeof tile.icon === "string" && !tile.icon.includes("[[[")) tile.icon = icon;
    strings(tile, (text) =>
      text
        .replace(CONST_NAME, (all, start, quote) => `${start}${quote}${name.replace(quote, `\\${quote}`)}${quote}`)
        .replace(CONST_ICON, (all, start, quote) => `${start}${quote}${icon}${quote}`)
        .replace(LIGHT_ARRAY, lightsJson)
    );
  }

  const popup = cardAt(next, room.popup);
  const head = popupHead(popup);
  head.name = name;
  head.icon = icon;
  const body = popupBody(popup);
  let inside = body.list.slice(body.start);

  // The air conditioning button: removed, or one that opens its pop-up.
  const isClimate = (c) => c.entity?.startsWith("climate.") || navigation(c)?.startsWith("#airco");
  if ("climate" in changes) {
    const existing = inside.find(isClimate);
    inside = inside.filter((c) => !isClimate(c));
    if (changes.climate) inside.push(existing?.entity === changes.climate ? existing : changes.climateCard);
  }

  const isLight = (c) => c.entity?.startsWith("light.");
  const firstLight = inside.findIndex(isLight);
  // New light cards copy the look of the first one; without one, a tile.
  const model = firstLight === -1 ? { type: "tile", features: [{ type: "light-brightness" }] } : inside[firstLight];
  const lightCards = lights.map((entity) => {
    const existing = inside.find((c) => c.entity === entity);
    if (existing) return existing;
    const card = { ...clone(model), entity };
    // A name belongs to the copied light, not to the new one.
    delete card.name;
    return card;
  });
  // The lights go where the first one was; other cards keep their place.
  const others = inside.filter((c) => !isLight(c));
  const at = firstLight === -1 ? 0 : inside.slice(0, firstLight).filter((c) => !isLight(c)).length;
  const merged = [...others.slice(0, at), ...lightCards, ...others.slice(at)];
  body.list.splice(body.start, body.list.length - body.start, ...clone(merged));
  return next;
}

/** Adds cards to a section (or a view without sections) and returns the config. */
export function addCards(config, viewIndex, sectionIndex, cards) {
  const next = clone(config);
  const view = next.views[viewIndex];
  if (view.type === "sections") {
    view.sections ??= [];
    const section = view.sections[sectionIndex] ?? (view.sections.push({ type: "grid", cards: [] }), view.sections.at(-1));
    section.cards ??= [];
    section.cards.push(...cards);
  } else {
    view.cards ??= [];
    view.cards.push(...cards);
  }
  return next;
}

/**
 * A new room made like one already on the dashboard: copies of its tile and
 * pop-up with this room's address, name, icon and lights. The pop-up keeps the
 * format of the model (vertical-stack or standalone).
 */
export function roomLike(config, model, room, climateCard) {
  const fake = clone(config);
  // Work on copies placed where the model is, so updateRoom can change them.
  const tile = model.tile ? clone(cardAt(fake, model.tile)) : null;
  const popup = clone(cardAt(fake, model.popup));
  const hash = room.hash;
  if (tile) {
    strings(tile, (text) => (text === model.hash ? hash : text));
    for (const action of [tile.tap_action, tile.button_action?.tap_action]) {
      if (action?.navigation_path === model.hash) action.navigation_path = hash;
    }
  }
  popupHead(popup).hash = hash;
  const scratch = { views: [{ cards: [tile ?? { type: "markdown" }, popup] }] };
  const where = { tile: tile ? { view: 0, section: null, index: 0 } : null, popup: { view: 0, section: null, index: 1 } };
  const changed = updateRoom(scratch, { ...model, ...where }, {
    name: room.name,
    icon: room.icon,
    lights: room.lights,
    climate: room.climate,
    climateCard,
  });
  const [newTile, newPopup] = changed.views[0].cards;
  return tile ? [newTile, newPopup] : [newPopup];
}
