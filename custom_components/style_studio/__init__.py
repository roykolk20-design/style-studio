from pathlib import Path

from homeassistant.components import frontend, panel_custom
from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant

from . import websocket
from .const import DOMAIN, PANEL_ELEMENT, PANEL_PATH, PANEL_URL, URL_BASE
from .store import StyleStore


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    data = hass.data.setdefault(DOMAIN, {})

    # Static paths and commands can't be removed again, so register them once.
    if not data.get("registered"):
        await hass.http.async_register_static_paths(
            [StaticPathConfig(URL_BASE, str(Path(__file__).parent / "www"), False)]
        )
        websocket.async_register(hass)
        data["registered"] = True

    store = StyleStore(hass)
    await store.async_load()
    data["store"] = store

    await panel_custom.async_register_panel(
        hass,
        frontend_url_path=PANEL_PATH,
        webcomponent_name=PANEL_ELEMENT,
        module_url=PANEL_URL,
        sidebar_title="Stijl",
        sidebar_icon="mdi:palette-swatch-outline",
        require_admin=True,
    )
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    frontend.async_remove_panel(hass, PANEL_PATH)
    return True
