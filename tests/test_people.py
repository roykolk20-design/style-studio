from homeassistant.core import HomeAssistant
from homeassistant.setup import async_setup_component
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.style_studio.const import DOMAIN

SIDEBAR = {"panelOrder": ["lovelace", "map"], "hiddenPanels": ["logbook"]}


async def _setup(hass: HomeAssistant) -> None:
    assert await async_setup_component(hass, "http", {})
    assert await async_setup_component(
        hass, "frontend", {"frontend": {"themes": {"Roze": {"primary-color": "#e8749e"}}}}
    )
    entry = MockConfigEntry(domain=DOMAIN)
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()


async def _send(client, **msg) -> dict:
    await client.send_json_auto_id(msg)
    return await client.receive_json()


async def test_person_gets_their_settings_live(
    hass, hass_ws_client, hass_admin_user, hass_read_only_user, hass_read_only_access_token
) -> None:
    await _setup(hass)
    admin = await hass_ws_client(hass)
    joyce = await hass_ws_client(hass, hass_read_only_access_token)

    # Joyce's browser listens for her own settings.
    assert (await _send(joyce, type="style_studio/person/subscribe"))["success"]
    first = (await joyce.receive_json())["event"]
    assert "theme" not in first

    msg = await _send(
        admin,
        type="style_studio/people/save",
        persons={hass_read_only_user.id: {"theme": "Roze", "sidebar": SIDEBAR}},
    )
    assert msg["success"], msg
    event = (await joyce.receive_json())["event"]
    assert event["theme"] == "Roze"
    assert event["sidebar"] == SIDEBAR
    assert event["theme_updated"] and event["sidebar_updated"]
    first_time = event["theme_updated"]

    # Saving the same theme again keeps its time, so browsers don't re-apply it.
    msg = await _send(
        admin,
        type="style_studio/people/save",
        persons={hass_read_only_user.id: {"theme": "Roze", "sidebar": None}},
    )
    event = (await joyce.receive_json())["event"]
    assert event["theme_updated"] == first_time
    assert "sidebar" not in event

    # Her browser reports back; the admin sees it.
    msg = await _send(
        joyce,
        type="style_studio/person/report",
        device="abc123def4",
        version="0.2.0",
        app=True,
        theme="Roze",
        sidebar=SIDEBAR,
    )
    assert msg["success"], msg
    state = (await _send(admin, type="style_studio/people/get"))["result"]
    report = state["reports"][0]
    assert report["user_id"] == hass_read_only_user.id
    assert report["app"] is True and report["theme"] == "Roze"
    assert "Roze" in state["themes"]

    # Undo puts back the first save, with its times.
    state = (await _send(admin, type="style_studio/people/undo"))["result"]
    assert state["restored"] is True
    event = (await joyce.receive_json())["event"]
    assert event["sidebar"] == SIDEBAR


async def test_people_rules(
    hass, hass_ws_client, hass_admin_user, hass_read_only_access_token
) -> None:
    await _setup(hass)
    admin = await hass_ws_client(hass)

    msg = await _send(
        admin,
        type="style_studio/people/save",
        persons={hass_admin_user.id: {"theme": "Bestaat niet", "sidebar": None}},
    )
    assert msg["error"]["code"] == "unknown_theme"

    msg = await _send(
        admin, type="style_studio/people/save", persons={"nobody": {"theme": None, "sidebar": None}}
    )
    assert msg["error"]["code"] == "unknown_user"

    user = await hass_ws_client(hass, hass_read_only_access_token)
    msg = await _send(user, type="style_studio/people/get")
    assert msg["error"]["code"] == "unauthorized"
    msg = await _send(
        user, type="style_studio/person/report", device="x", version="0.2.0", app=False
    )
    assert msg["error"]["code"] == "invalid_format"


async def test_runtime_is_loaded(hass: HomeAssistant) -> None:
    from homeassistant.components.frontend import DATA_EXTRA_MODULE_URL

    from custom_components.style_studio.const import RUNTIME_URL

    await _setup(hass)
    assert RUNTIME_URL in hass.data[DATA_EXTRA_MODULE_URL].urls
