// Bubble Card has two ways to write a pop-up:
// - standalone (Bubble Card 3.2 and newer): one card, its content in `cards`;
// - legacy: the pop-up as the first card of a vertical-stack. 3.2 still shows
//   it, with a notice asking to migrate.
// Bubble Card doesn't expose its version, so this is a choice, remembered
// per browser, with standalone as the default.

const KEY = "style-studio-popup-format";

export function standalone() {
  try {
    return localStorage.getItem(KEY) !== "legacy";
  } catch (err) {
    return true;
  }
}

export function setStandalone(value) {
  try {
    localStorage.setItem(KEY, value ? "standalone" : "legacy");
  } catch (err) {
    // Only remembered for this visit.
  }
}

/** A pop-up in the chosen format from its head card and content. */
export function popupCard(head, cards, asStandalone = standalone()) {
  return asStandalone ? { ...head, cards } : { type: "vertical-stack", cards: [head, ...cards] };
}

/** The content of a pop-up in either format. */
export function popupContent(card) {
  return card.type === "vertical-stack" ? card.cards.slice(1) : card.cards ?? [];
}

/** The head card (the Bubble Card pop-up itself) in either format. */
export function popupHeadOf(card) {
  if (card?.type === "custom:bubble-card" && card.card_type === "pop-up") return card;
  const first = card?.type === "vertical-stack" ? card.cards?.[0] : null;
  return first?.type === "custom:bubble-card" && first.card_type === "pop-up" ? first : null;
}
