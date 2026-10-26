from pathlib import Path

import pytest

from homeassistant.components.frontend import DATA_PANELS
from homeassistant.core import HomeAssistant
from homeassistant.setup import async_setup_component
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.style_studio.const import DOMAIN, PANEL_PATH
from custom_components.style_studio.glass import SIDEBAR_DEFAULTS, to_options, to_sidebar

# The Docker test image copies Glass Sidebar next to Style Studio when its
# repository is mounted (see dev/Dockerfile.test).
HAS_GLASS = (Path(__file__).parents[1] / "custom_components" / "glass_sidebar").is_dir()
needs_glass = pytest.mark.skipif(not HAS_GLASS, reason="Glass Sidebar not available")


async def _setup(hass: HomeAssistant, glass_options: dict | None = None) -> MockConfigEntry:
    assert await async_setup_component(hass, "http", {})
    if glass_options is not None:
        glass = MockConfigEntry(domain="glass_sidebar", options=glass_options)
        glass.add_to_hass(hass)
        assert await hass.config_entries.async_setup(glass.entry_id)
    entry = MockConfigEntry(domain=DOMAIN)
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    return entry


async def test_setup_and_unload(hass: HomeAssistant) -> None:
    entry = await _setup(hass)
    assert PANEL_PATH in hass.data[DATA_PANELS]

    assert await hass.config_entries.async_unload(entry.entry_id)
    assert PANEL_PATH not in hass.data[DATA_PANELS]

    # Setting up again must not register the static path or commands twice.
    assert await hass.config_entries.async_setup(entry.entry_id)
    assert PANEL_PATH in hass.data[DATA_PANELS]


async def test_without_glass_sidebar(hass, hass_ws_client) -> None:
    await _setup(hass)
    client = await hass_ws_client(hass)

    await client.send_json_auto_id({"type": "style_studio/get"})
    glass = (await client.receive_json())["result"]["glass_sidebar"]
    assert glass["added"] is False
    assert glass["sidebar"] is None
    if not HAS_GLASS:
        assert glass["version"] is None

    await client.send_json_auto_id(
        {"type": "style_studio/sidebar/save", "sidebar": SIDEBAR_DEFAULTS}
    )
    assert (await client.receive_json())["error"]["code"] == "not_found"


@needs_glass
async def test_save_reaches_glass_sidebar(hass, hass_ws_client) -> None:
    await _setup(hass, {"radius": 12, "future_option": "kept"})
    client = await hass_ws_client(hass)

    # Listen the way Glass Sidebar's own script does.
    await client.send_json_auto_id({"type": "glass_sidebar/subscribe"})
    assert (await client.receive_json())["success"]
    assert (await client.receive_json())["event"]["radius"] == 12

    await client.send_json_auto_id({"type": "style_studio/get"})
    glass = (await client.receive_json())["result"]["glass_sidebar"]
    assert glass["added"] and glass["loaded"]
    assert glass["version"]
    assert glass["sidebar"]["radius"] == 12

    sidebar = {**glass["sidebar"], "radius": 6, "accent": "#f59e0b", "mobile_text_size": 16}
    await client.send_json_auto_id({"type": "style_studio/sidebar/save", "sidebar": sidebar})
    msg = await client.receive_json()
    while "event" in msg:
        event = msg["event"]
        msg = await client.receive_json()
    assert msg["success"], msg
    assert event["radius"] == 6
    assert event["accent"] == "rgb(245, 158, 11)"
    assert event["mobile_text_size"] == 16

    entry = hass.config_entries.async_entries("glass_sidebar")[0]
    assert entry.options["future_option"] == "kept"
    assert entry.options["custom_accent"] is True

    await client.send_json_auto_id({"type": "style_studio/sidebar/undo"})
    msg = await client.receive_json()
    while "event" in msg:
        event = msg["event"]
        msg = await client.receive_json()
    assert msg["result"] == {"restored": True}
    assert event["radius"] == 12
    assert event["accent"] is None
    assert dict(entry.options) == {"radius": 12, "future_option": "kept"}

    await client.send_json_auto_id({"type": "style_studio/sidebar/undo"})
    assert (await client.receive_json())["result"] == {"restored": False}


async def test_rejects_bad_input(hass, hass_ws_client) -> None:
    await _setup(hass)
    MockConfigEntry(domain="glass_sidebar").add_to_hass(hass)
    client = await hass_ws_client(hass)

    await client.send_json_auto_id(
        {"type": "style_studio/sidebar/save", "sidebar": {**SIDEBAR_DEFAULTS, "radius": 99}}
    )
    assert (await client.receive_json())["error"]["code"] == "invalid_format"

    await client.send_json_auto_id(
        {"type": "style_studio/sidebar/save", "sidebar": {**SIDEBAR_DEFAULTS, "accent": "red"}}
    )
    assert (await client.receive_json())["error"]["code"] == "invalid_format"


async def test_admin_only(hass, hass_ws_client, hass_read_only_access_token) -> None:
    await _setup(hass)
    client = await hass_ws_client(hass, hass_read_only_access_token)
    await client.send_json_auto_id({"type": "style_studio/get"})
    assert (await client.receive_json())["error"]["code"] == "unauthorized"


def test_options_round_trip() -> None:
    options = {
        "radius": 12,
        "custom_accent": True,
        "accent_color": [245, 158, 11],
        # Glass Sidebar 1.1 stored categories as text.
        "categories": "Dashboards: lovelace, energy\nInfo: logbook",
        "unknown": 1,
    }
    sidebar = to_sidebar(options)
    assert sidebar["radius"] == 12
    assert sidebar["accent"] == "#f59e0b"
    assert sidebar["categories"] == [
        {"name": "Dashboards", "panels": ["lovelace", "energy"]},
        {"name": "Info", "panels": ["logbook"]},
    ]
    back = to_options(sidebar, options)
    assert back["unknown"] == 1
    assert back["accent_color"] == [245, 158, 11]
    assert to_sidebar(back) == sidebar


def test_bad_options_fall_back_to_defaults() -> None:
    assert to_sidebar({"radius": 500}) == SIDEBAR_DEFAULTS
