// Dutch first; English for everyone whose Home Assistant is not in Dutch.
const nl = {
  title: "Stijl",

  tab_sidebar: "Zijbalk",
  tab_themes: "Thema's",
  tab_rooms: "Kamers en pop-ups",
  tab_climate: "Klimaat",
  tab_people: "Per persoon",
  tab_check: "Controle en herstel",
  coming: "Dit onderdeel komt in een volgende versie.",

  glass_intro:
    "De zijbalk wordt opgemaakt door de plugin Glass Sidebar. Hier stel je die in; wijzigingen gelden voor iedereen en verschijnen direct.",
  glass_missing_title: "Glass Sidebar is niet geïnstalleerd",
  glass_missing:
    "Installeer Glass Sidebar via HACS en herstart Home Assistant. Daarna stel je de zijbalk hier in.",
  glass_not_added_title: "Glass Sidebar is nog niet toegevoegd",
  glass_not_added:
    "Ga naar Instellingen › Apparaten en diensten › Integratie toevoegen › Glass Sidebar.",
  glass_not_loaded:
    "Glass Sidebar is uitgeschakeld of niet geladen. Je kunt instellingen opslaan, maar je ziet ze pas als Glass Sidebar weer draait.",
  glass_old:
    "Je hebt Glass Sidebar {version}. Style Studio is gemaakt voor {min} of nieuwer; werk Glass Sidebar bij via HACS. Opties die jouw versie nog niet kent, doen niets.",
  open_glass: "Instellingen van Glass Sidebar openen",

  shape: "Vorm",
  floating: "Zwevend",
  floating_hint: "Een losse balk met ruimte eromheen.",
  inset: "Afstand tot de rand",
  radius: "Hoeken",
  glass: "Glas",
  blur: "Vervaging",
  opacity: "Dekking",
  opacity_hint: "Lager is meer doorzichtig.",
  glass_cards: "Glazen dashboardkaarten",
  glass_cards_hint: "Kaarten worden doorschijnend. Kan zwaar zijn op oudere tablets.",
  active: "Actieve pagina",
  highlight_soft: "Zacht",
  highlight_vivid: "Vol",
  own_accent: "Eigen kleur",
  own_accent_hint: "Uit: de kleur van het thema.",
  motion: "Iconen bewegen bij aanwijzen",
  phone: "Telefoon",
  phone_hint: "Voor schermen tot 600 pixels breed.",
  mobile_width: "Breedte van het menu",
  mobile_text_size: "Tekstgrootte",
  mobile_blur: "Pagina achter het menu vervagen",

  groups: "Groepen",
  groups_hint:
    "Sleep items naar een groep, of tik een item aan en kies Hierheen. Items zonder groep staan bovenaan.",
  ungrouped: "Zonder groep",
  ungrouped_hint: "Staan bovenaan, in de volgorde van Home Assistant.",
  add_group: "Groep toevoegen",
  new_group: "Nieuwe groep",
  group_name: "Naam van de groep",
  move_here: "Hierheen",
  move_up: "Omhoog",
  move_down: "Omlaag",
  move_left: "Naar voren",
  move_right: "Naar achteren",
  remove_group: "Groep verwijderen",
  remove_group_confirm: "Verwijderen? De items gaan terug naar Zonder groep.",
  hide: "Verbergen",
  show: "Tonen",
  missing: "niet gevonden",
  empty_group: "Sleep items hierheen.",

  preview: "Voorbeeld",
  preview_hint: "Wordt pas echt toegepast als je opslaat.",
  device_phone: "Telefoon",
  device_tablet: "Tablet",
  device_desktop: "Pc",
  page_light: "Lichte pagina",
  page_dark: "Donkere pagina",
  expanded: "Uitgeklapt",

  unsaved: "Niet opgeslagen wijzigingen",
  cancel: "Annuleren",
  save: "Opslaan",
  saved: "Opgeslagen",
  undo: "Vorige versie terugzetten",
  undo_confirm: "De instellingen van voor de laatste keer opslaan komen terug. Doorgaan?",
  undone: "Vorige versie teruggezet",
  nothing_to_undo: "Er is geen vorige versie",
  yes: "Ja",
  no: "Nee",
  discard_confirm: "Je hebt wijzigingen die niet zijn opgeslagen. Weggooien?",
  error: "Er ging iets mis: {message}",

  warn_old_panel:
    "Dit scherm gebruikt een oude versie van het paneel ({old}, server {new}). Herlaad de pagina. In de Companion-app: Instellingen › Companion-app › Probleemoplossing › Frontend-cache wissen.",
};

const en = {
  title: "Style",

  tab_sidebar: "Sidebar",
  tab_themes: "Themes",
  tab_rooms: "Rooms and pop-ups",
  tab_climate: "Climate",
  tab_people: "People",
  tab_check: "Check and restore",
  coming: "This part comes in a later version.",

  glass_intro:
    "The sidebar is styled by the Glass Sidebar plugin. You set it up here; changes apply to everyone and show right away.",
  glass_missing_title: "Glass Sidebar is not installed",
  glass_missing:
    "Install Glass Sidebar through HACS and restart Home Assistant. Then set up the sidebar here.",
  glass_not_added_title: "Glass Sidebar is not added yet",
  glass_not_added: "Go to Settings › Devices & services › Add integration › Glass Sidebar.",
  glass_not_loaded:
    "Glass Sidebar is disabled or not loaded. You can save settings, but you'll only see them once Glass Sidebar runs again.",
  glass_old:
    "You have Glass Sidebar {version}. Style Studio is made for {min} or newer; update Glass Sidebar through HACS. Options your version doesn't know do nothing.",
  open_glass: "Open Glass Sidebar settings",

  shape: "Shape",
  floating: "Floating",
  floating_hint: "A separate panel with space around it.",
  inset: "Distance to the edge",
  radius: "Corners",
  glass: "Glass",
  blur: "Blur",
  opacity: "Opacity",
  opacity_hint: "Lower is more see-through.",
  glass_cards: "Glass dashboard cards",
  glass_cards_hint: "Cards become translucent. Can be heavy on older tablets.",
  active: "Active page",
  highlight_soft: "Soft",
  highlight_vivid: "Solid",
  own_accent: "Own color",
  own_accent_hint: "Off: the theme's color.",
  motion: "Icons move on hover",
  phone: "Phone",
  phone_hint: "For screens up to 600 pixels wide.",
  mobile_width: "Menu width",
  mobile_text_size: "Text size",
  mobile_blur: "Blur the page behind the menu",

  groups: "Groups",
  groups_hint:
    "Drag items into a group, or tap an item and choose Move here. Items without a group stay at the top.",
  ungrouped: "No group",
  ungrouped_hint: "Shown at the top, in Home Assistant's order.",
  add_group: "Add group",
  new_group: "New group",
  group_name: "Group name",
  move_here: "Move here",
  move_up: "Up",
  move_down: "Down",
  move_left: "Earlier",
  move_right: "Later",
  remove_group: "Remove group",
  remove_group_confirm: "Remove? Its items go back to No group.",
  hide: "Hide",
  show: "Show",
  missing: "not found",
  empty_group: "Drag items here.",

  preview: "Preview",
  preview_hint: "Only applied once you save.",
  device_phone: "Phone",
  device_tablet: "Tablet",
  device_desktop: "Desktop",
  page_light: "Light page",
  page_dark: "Dark page",
  expanded: "Expanded",

  unsaved: "Unsaved changes",
  cancel: "Cancel",
  save: "Save",
  saved: "Saved",
  undo: "Restore previous version",
  undo_confirm: "The settings from before the last save come back. Continue?",
  undone: "Previous version restored",
  nothing_to_undo: "There is no previous version",
  yes: "Yes",
  no: "No",
  discard_confirm: "You have unsaved changes. Throw them away?",
  error: "Something went wrong: {message}",

  warn_old_panel:
    "This screen runs an old version of the panel ({old}, server {new}). Reload the page. In the Companion app: Settings › Companion app › Troubleshooting › Reset frontend cache.",
};

export function translator(hass) {
  const strings = (hass?.locale?.language || hass?.language || "nl").startsWith("nl")
    ? nl
    : en;
  return (key, values = {}) =>
    (strings[key] ?? en[key] ?? key).replace(/\{(\w+)\}/g, (_, name) => values[name] ?? "");
}
