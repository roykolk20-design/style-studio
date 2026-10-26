from pathlib import Path

from homeassistant.setup import async_setup_component
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.style_studio.const import DOMAIN


async def _send(client, **msg) -> dict:
    await client.send_json_auto_id(msg)
    return await client.receive_json()


async def test_dashboard_backups(hass, hass_ws_client, tmp_path: Path) -> None:
    hass.config.config_dir = str(tmp_path)
    assert await async_setup_component(hass, "http", {})
    entry = MockConfigEntry(domain=DOMAIN)
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    client = await hass_ws_client(hass)

    data = {"url_path": None, "config": {"views": [{"title": "Licht"}]}}
    msg = await _send(client, type="style_studio/backups/create", kind="dashboards", key="lovelace", data=data)
    assert msg["success"], msg
    name = msg["result"]["file"]
    assert (tmp_path / "style_studio" / "backups" / "dashboards" / name).is_file()

    listed = (await _send(client, type="style_studio/backups/list", kind="dashboards"))["result"]
    assert [b["file"] for b in listed["backups"]] == [name]
    assert listed["backups"][0]["key"] == "lovelace"

    read = (await _send(client, type="style_studio/backups/read", kind="dashboards", file=name))["result"]
    assert read["data"] == data

    # Names can't leave the backup folder.
    msg = await _send(client, type="style_studio/backups/read", kind="dashboards", file="../../secrets.yaml")
    assert msg["error"]["code"] == "invalid_format"
    msg = await _send(client, type="style_studio/backups/create", kind="dashboards", key="../x", data={})
    assert msg["error"]["code"] == "invalid_format"
