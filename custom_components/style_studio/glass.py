"""The sidebar is Glass Sidebar's job; Style Studio edits its options.

The panel works with one flat dict (see SIDEBAR_DEFAULTS). Here it is turned
into Glass Sidebar's config entry options and back. Options this file doesn't
know about are left alone, so newer Glass Sidebar versions keep theirs.
"""

from typing import Any

import voluptuous as vol

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, callback
import homeassistant.helpers.config_validation as cv

GLASS_DOMAIN = "glass_sidebar"
# The options below match Glass Sidebar 1.4.0; 1.5 has its own settings page
# with more, which Style Studio leaves alone.
GLASS_MIN_VERSION = "1.4.0"

HEX_COLOR = vol.Match(r"^#[0-9a-fA-F]{6}$")
HIGHLIGHTS = ("soft", "vivid")
# Glass Sidebar's own default accent, used when none is set.
DEFAULT_ACCENT_RGB = [3, 169, 244]

SIDEBAR_DEFAULTS: dict[str, Any] = {
    "floating": True,
    "inset": 8,
    "radius": 20,
    "blur": 18,
    "opacity": 74,
    "highlight": "soft",
    # None follows the theme's --sidebar-selected-icon-color.
    "accent": None,
    "hover_motion": True,
    "glass_cards": False,
    "mobile_width": 300,
    "mobile_blur": True,
    "mobile_text_size": 14,
    "categories": [],
}


def _int(minimum: int, maximum: int) -> vol.All:
    return vol.All(vol.Coerce(int), vol.Range(min=minimum, max=maximum))


# Glass Sidebar 1.5 added an icon and "start collapsed" per category; they
# are kept as they are.
CATEGORY_SCHEMA = vol.Schema(
    {
        vol.Required("name"): vol.All(cv.string, vol.Strip, vol.Length(min=1, max=40)),
        vol.Optional("panels", default=list): [cv.string],
        vol.Optional("icon"): vol.Any(None, vol.Match(r"^mdi:[a-z0-9-]+$")),
        vol.Optional("collapsed"): cv.boolean,
    }
)

# Same ranges as Glass Sidebar's own options flow.
SIDEBAR_SCHEMA = vol.Schema(
    {
        vol.Required("floating"): cv.boolean,
        vol.Required("inset"): _int(0, 24),
        vol.Required("radius"): _int(0, 32),
        vol.Required("blur"): _int(0, 40),
        vol.Required("opacity"): _int(40, 100),
        vol.Required("highlight"): vol.In(HIGHLIGHTS),
        vol.Required("accent"): vol.Any(None, HEX_COLOR),
        vol.Required("hover_motion"): cv.boolean,
        vol.Required("glass_cards"): cv.boolean,
        vol.Required("mobile_width"): _int(240, 360),
        vol.Required("mobile_blur"): cv.boolean,
        vol.Required("mobile_text_size"): _int(12, 20),
        vol.Required("categories"): [CATEGORY_SCHEMA],
    }
)

# Keys that are stored under the same name in both shapes.
PLAIN_KEYS = tuple(key for key in SIDEBAR_DEFAULTS if key not in ("accent", "categories"))


def normalize(value: dict[str, Any]) -> dict[str, Any]:
    """Validate panel settings; raises vol.Invalid on bad input."""
    merged = {**SIDEBAR_DEFAULTS, **value}
    return SIDEBAR_SCHEMA({key: merged[key] for key in SIDEBAR_DEFAULTS})


@callback
def glass_entry(hass: HomeAssistant) -> ConfigEntry | None:
    entries = hass.config_entries.async_entries(GLASS_DOMAIN)
    return entries[0] if entries else None


def to_sidebar(options: dict[str, Any]) -> dict[str, Any]:
    """Glass Sidebar options as panel settings."""
    value: dict[str, Any] = {key: options[key] for key in PLAIN_KEYS if key in options}

    if options.get("custom_accent"):
        try:
            red, green, blue = (int(c) for c in options["accent_color"])
            value["accent"] = f"#{red:02x}{green:02x}{blue:02x}"
        except (KeyError, TypeError, ValueError):
            pass

    categories = options.get("categories") or []
    if isinstance(categories, str):
        # Glass Sidebar 1.1 stored lines like "Name: panel1, panel2".
        parsed = []
        for line in categories.splitlines():
            name, sep, panels = line.partition(":")
            if sep and name.strip():
                parsed.append(
                    {
                        "name": name.strip(),
                        "panels": [p.strip() for p in panels.split(",") if p.strip()],
                    }
                )
        categories = parsed
    value["categories"] = [
        {
            "name": str(c["name"]),
            "panels": [str(p) for p in c.get("panels", [])],
            **({"icon": c["icon"]} if c.get("icon") else {}),
            **({"collapsed": True} if c.get("collapsed") else {}),
        }
        for c in categories
        if isinstance(c, dict) and c.get("name")
    ]
    try:
        return normalize(value)
    except vol.Invalid:
        return dict(SIDEBAR_DEFAULTS)


def to_options(sidebar: dict[str, Any], current: dict[str, Any]) -> dict[str, Any]:
    """Panel settings as Glass Sidebar options, keeping options we don't know."""
    options = {**current, **{key: sidebar[key] for key in PLAIN_KEYS}}
    options["categories"] = sidebar["categories"]
    accent = sidebar["accent"]
    options["custom_accent"] = accent is not None
    if accent is not None:
        options["accent_color"] = [int(accent[i : i + 2], 16) for i in (1, 3, 5)]
    else:
        options.setdefault("accent_color", DEFAULT_ACCENT_RGB)
    return options
