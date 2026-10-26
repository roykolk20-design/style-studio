"""Websocket commands for the panel. All of them are for admins only."""

from typing import Any

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.config_entries import ConfigEntryState
from homeassistant.core import HomeAssistant, callback
from homeassistant.loader import IntegrationNotFound, async_get_integration

from .const import DOMAIN, VERSION
from .glass import GLASS_DOMAIN, GLASS_MIN_VERSION, glass_entry, normalize, to_options, to_sidebar
from .store import StyleStore


@callback
def async_register(hass: HomeAssistant) -> None:
    for command in (ws_get, ws_sidebar_save, ws_sidebar_undo):
        websocket_api.async_register_command(hass, command)


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
