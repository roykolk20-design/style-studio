from pathlib import Path

from homeassistant.setup import async_setup_component
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.style_studio.const import DOMAIN, VERSION

THEME = {
    "name": "Joyce",
    "base": {"accent": "#e8749e"},
    "overrides": {},
    "vars": {"primary-color": "#e8749e"},
}

WARM = """Licht Warm:
  primary-color: "#f59e0b"
  card-mod-theme: "Licht Warm"
  card-mod-sidebar: |
    :host { border-radius: 20px; }
"""


async def _send(client, **msg) -> dict:
    await client.send_json_auto_id(msg)
    return await client.receive_json()


async def test_check_and_restore(hass, hass_ws_client, tmp_path: Path) -> None:
    hass.config.config_dir = str(tmp_path)
    (tmp_path / "configuration.yaml").write_text(
        "frontend:\n  themes: !include_dir_merge_named themes\n", encoding="utf-8"
    )
    (tmp_path / "themes").mkdir()
    (tmp_path / "themes" / "warm.yaml").write_text(WARM, encoding="utf-8")
    assert await async_setup_component(hass, "http", {})
    assert await async_setup_component(hass, "frontend", {})
    await hass.services.async_call("frontend", "reload_themes", blocking=True)
    entry = MockConfigEntry(domain=DOMAIN)
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    client = await hass_ws_client(hass)

    check = (await _send(client, type="style_studio/check"))["result"]
    assert check["version"] == VERSION
    # Installed but nobody uses it: reported, but not as a problem.
    assert check["card_mod_themes"] == [
        {
            "theme": "Licht Warm",
            "keys": ["card-mod-sidebar", "card-mod-theme"],
            "sidebar": True,
            "in_use": False,
        }
    ]
    # True with Glass Sidebar 1.4+ next to it (the Docker image adds it when mounted).
    has_glass = (Path(__file__).parents[1] / "custom_components" / "glass_sidebar").is_dir()
    assert check["glass_handles_themes"] is has_glass
    assert check["version_since"]
    assert check["themes_not_loaded"] == []

    # As the default theme it is in use.
    await hass.services.async_call("frontend", "set_theme", {"name": "Licht Warm"}, blocking=True)
    check = (await _send(client, type="style_studio/check"))["result"]
    assert check["card_mod_themes"][0]["in_use"] is True

    # Two saves keep two versions; restoring the newer one brings back "Joyce".
    first = (await _send(client, type="style_studio/themes/save", theme=THEME))["result"]["theme"]
    renamed = {**first, "name": "Joyce 2"}
    assert (await _send(client, type="style_studio/themes/save", theme=renamed))["success"]

    history = (await _send(client, type="style_studio/history/list"))["result"]
    assert [entry["summary"] for entry in history["themes"]] == ["Joyce", "-"]
    index = history["themes"][0]["index"]

    msg = await _send(client, type="style_studio/history/restore", key="themes", index=index)
    assert msg["success"], msg
    state = (await _send(client, type="style_studio/themes/get"))["result"]
    assert [t["name"] for t in state["themes"]] == ["Joyce"]
    assert state["loaded"] == ["Joyce"]

    msg = await _send(client, type="style_studio/history/restore", key="themes", index=99)
    assert msg["error"]["code"] == "not_found"
    msg = await _send(client, type="style_studio/history/restore", key="nope", index=0)
    assert msg["error"]["code"] == "invalid_format"
