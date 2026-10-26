"""Websocket commands for the panel. All of them are for admins only."""

from typing import Any
import uuid

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.components.frontend import DATA_PANELS
from homeassistant.config_entries import ConfigEntryState
from homeassistant.core import HomeAssistant, callback
from homeassistant.loader import IntegrationNotFound, async_get_integration

from . import backups, checks, people
from .const import DOMAIN, VERSION
from .glass import GLASS_DOMAIN, GLASS_MIN_VERSION, glass_entry, normalize, to_options, to_sidebar
from .store import StyleStore
from .themes import (
    THEME_SCHEMA,
    ForeignFileError,
    async_write_themes,
    default_theme,
    flatten,
    loaded_themes,
    themes_path,
)

THEMES = "themes"


@callback
def async_register(hass: HomeAssistant) -> None:
    for command in (
        ws_get,
        ws_sidebar_save,
        ws_sidebar_undo,
        ws_themes_get,
        ws_themes_save,
        ws_themes_delete,
        ws_themes_undo,
        ws_themes_set_default,
    ):
        websocket_api.async_register_command(hass, command)
    people.async_register(hass)
    backups.async_register(hass)
    checks.async_register(hass)


def _store(hass: HomeAssistant) -> StyleStore:
    return hass.data[DOMAIN]["store"]


async def _glass_version(hass: HomeAssistant) -> str | None:
    try:
        integration = await async_get_integration(hass, GLASS_DOMAIN)
    except IntegrationNotFound:
        return None
    return str(integration.version) if integration.version else None


@websocket_api.require_admin
@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/get"})
@websocket_api.async_response
async def ws_get(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    entry = glass_entry(hass)
    connection.send_result(
        msg["id"],
        {
            "version": VERSION,
            "glass_sidebar": {
                # Installed through HACS, whether or not it was added.
                "version": await _glass_version(hass),
                "min_version": GLASS_MIN_VERSION,
                "added": entry is not None,
                "loaded": entry is not None and entry.state is ConfigEntryState.LOADED,
                # Glass Sidebar 1.5+ has its own settings page here.
                "settings_page": "/glass-sidebar" if "glass-sidebar" in hass.data.get(DATA_PANELS, {}) else None,
                "sidebar": to_sidebar(dict(entry.options)) if entry else None,
                "history": _store(hass).history_size(GLASS_DOMAIN),
            },
        },
    )


@websocket_api.require_admin
@websocket_api.websocket_command(
    {vol.Required("type"): f"{DOMAIN}/sidebar/save", vol.Required("sidebar"): dict}
)
@websocket_api.async_response
async def ws_sidebar_save(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    """Write the settings into Glass Sidebar, which applies them live."""
    entry = glass_entry(hass)
    if entry is None:
        connection.send_error(msg["id"], "not_found", "Glass Sidebar is not set up")
        return
    try:
        sidebar = normalize(msg["sidebar"])
    except vol.Invalid as err:
        connection.send_error(msg["id"], "invalid_format", str(err))
        return

    current = dict(entry.options)
    await _store(hass).async_push_history(GLASS_DOMAIN, current)
    hass.config_entries.async_update_entry(entry, options=to_options(sidebar, current))
    connection.send_result(msg["id"], {"sidebar": sidebar})


@websocket_api.require_admin
@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/sidebar/undo"})
@websocket_api.async_response
async def ws_sidebar_undo(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    """Put back Glass Sidebar's options from before the last save."""
    entry = glass_entry(hass)
    if entry is None:
        connection.send_error(msg["id"], "not_found", "Glass Sidebar is not set up")
        return
    previous: dict[str, Any] | None = await _store(hass).async_pop_history(GLASS_DOMAIN)
    if previous is not None:
        hass.config_entries.async_update_entry(entry, options=previous)
    connection.send_result(msg["id"], {"restored": previous is not None})


@callback
def _themes_state(hass: HomeAssistant) -> dict[str, Any]:
    store = _store(hass)
    ours = {theme["name"] for theme in store.themes}
    loaded = loaded_themes(hass)
    return {
        "themes": store.themes,
        # Names of our themes Home Assistant actually loaded; a theme missing
        # here means configuration.yaml doesn't include the themes folder.
        "loaded": sorted(ours & loaded.keys()),
        "others": {
            name: flatten(theme) for name, theme in sorted(loaded.items()) if name not in ours
        },
        "default_theme": default_theme(hass),
        "history": store.history_size(THEMES),
        "file": str(themes_path(hass)),
    }


async def _async_store_themes(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict,
    themes: list[dict[str, Any]],
) -> bool:
    """Write the themes; the old list goes into the history. False on error."""
    store = _store(hass)
    previous = store.themes
    try:
        await async_write_themes(hass, themes)
    except ForeignFileError as err:
        connection.send_error(msg["id"], "file_exists", f"Not made by Style Studio: {err}")
        return False
    except OSError as err:
        connection.send_error(msg["id"], "write_failed", str(err))
        return False
    await store.async_push_history(THEMES, previous)
    await store.async_set_themes(themes)
    return True


@websocket_api.require_admin
@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/themes/get"})
@websocket_api.async_response
async def ws_themes_get(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    connection.send_result(msg["id"], _themes_state(hass))


@websocket_api.require_admin
@websocket_api.websocket_command(
    {vol.Required("type"): f"{DOMAIN}/themes/save", vol.Required("theme"): dict}
)
@websocket_api.async_response
async def ws_themes_save(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    """Create or update one theme (by id) and write the themes file."""
    try:
        theme = THEME_SCHEMA(msg["theme"])
    except vol.Invalid as err:
        connection.send_error(msg["id"], "invalid_format", str(err))
        return

    themes = list(_store(hass).themes)
    theme_id = theme.get("id") or uuid.uuid4().hex
    theme["id"] = theme_id
    others = [t for t in themes if t["id"] != theme_id]
    taken = {t["name"].lower() for t in others} | {
        name.lower() for name in _themes_state(hass)["others"]
    }
    if theme["name"].lower() in taken:
        connection.send_error(msg["id"], "name_taken", f"Theme {theme['name']} already exists")
        return

    index = next((i for i, t in enumerate(themes) if t["id"] == theme_id), None)
    if index is None:
        themes.append(theme)
    else:
        themes[index] = theme
    if await _async_store_themes(hass, connection, msg, themes):
        connection.send_result(msg["id"], {"theme": theme, **_themes_state(hass)})


@websocket_api.require_admin
@websocket_api.websocket_command(
    {vol.Required("type"): f"{DOMAIN}/themes/delete", vol.Required("theme_id"): str}
)
@websocket_api.async_response
async def ws_themes_delete(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    themes = [t for t in _store(hass).themes if t["id"] != msg["theme_id"]]
    if len(themes) == len(_store(hass).themes):
        connection.send_error(msg["id"], "not_found", "No such theme")
        return
    if await _async_store_themes(hass, connection, msg, themes):
        connection.send_result(msg["id"], _themes_state(hass))


@websocket_api.require_admin
@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/themes/undo"})
@websocket_api.async_response
async def ws_themes_undo(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    """Put back the themes from before the last save or delete."""
    store = _store(hass)
    previous = await store.async_pop_history(THEMES)
    if previous is None:
        connection.send_result(msg["id"], {"restored": False, **_themes_state(hass)})
        return
    try:
        await async_write_themes(hass, previous)
    except (ForeignFileError, OSError) as err:
        # Keep it in the history so the user can try again.
        await store.async_push_history(THEMES, previous)
        connection.send_error(msg["id"], "write_failed", str(err))
        return
    await store.async_set_themes(previous)
    connection.send_result(msg["id"], {"restored": True, **_themes_state(hass)})


@websocket_api.require_admin
@websocket_api.websocket_command(
    {vol.Required("type"): f"{DOMAIN}/themes/set_default", vol.Required("name"): str}
)
@websocket_api.async_response
async def ws_themes_set_default(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    """Make a theme the default for everyone who didn't pick one in their profile."""
    if msg["name"] not in loaded_themes(hass):
        connection.send_error(msg["id"], "not_found", "Theme not loaded")
        return
    await hass.services.async_call(
        "frontend", "set_theme", {"name": msg["name"]}, blocking=True
    )
    connection.send_result(msg["id"], _themes_state(hass))
