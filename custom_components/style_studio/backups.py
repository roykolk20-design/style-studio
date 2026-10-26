"""Backups of what Style Studio changes outside its own files.

Before the panel saves a dashboard it sends the old configuration here; it
is written to /config/style_studio/backups/dashboards/ as JSON, so it can be
read back and restored from the panel (or by hand).
"""

from datetime import datetime
import json
from pathlib import Path
import re
from typing import Any

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant, callback

from .const import DOMAIN
from .themes import BACKUP_DIR

KINDS = ("dashboards",)
KEY = re.compile(r"^[a-z0-9_-]{1,64}$")
FILE = re.compile(r"^([a-z0-9_-]{1,64})\.(\d{8}-\d{6})\.json$")
LIMIT_PER_KEY = 20
MAX_BYTES = 4_000_000


def _dir(hass: HomeAssistant, kind: str) -> Path:
    return Path(hass.config.path(*BACKUP_DIR, kind))


def _write(folder: Path, key: str, content: str) -> str:
    folder.mkdir(parents=True, exist_ok=True)
    stamp = datetime.now().strftime("%Y%m%d-%H%M%S")
    name = f"{key}.{stamp}.json"
    (folder / name).write_text(content, encoding="utf-8")
    for old in sorted(folder.glob(f"{key}.*.json"))[:-LIMIT_PER_KEY]:
        old.unlink()
    return name


def _list(folder: Path) -> list[dict[str, Any]]:
    if not folder.is_dir():
        return []
    found = []
    for path in folder.iterdir():
        if match := FILE.match(path.name):
            found.append(
                {
                    "file": path.name,
                    "key": match.group(1),
                    "saved_at": datetime.strptime(match.group(2), "%Y%m%d-%H%M%S").isoformat(),
                    "size": path.stat().st_size,
                }
            )
    return sorted(found, key=lambda item: item["saved_at"], reverse=True)


@callback
def async_register(hass: HomeAssistant) -> None:
    for command in (ws_backup_create, ws_backup_list, ws_backup_read):
        websocket_api.async_register_command(hass, command)


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/backups/create",
        vol.Required("kind"): vol.In(KINDS),
        vol.Required("key"): vol.Match(KEY),
        vol.Required("data"): vol.Any(dict, list),
    }
)
@websocket_api.async_response
async def ws_backup_create(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    content = json.dumps(msg["data"], indent=2, ensure_ascii=False)
    if len(content.encode()) > MAX_BYTES:
        connection.send_error(msg["id"], "too_big", "Backup is too big")
        return
    try:
        name = await hass.async_add_executor_job(
            _write, _dir(hass, msg["kind"]), msg["key"], content
        )
    except OSError as err:
        connection.send_error(msg["id"], "write_failed", str(err))
        return
    connection.send_result(msg["id"], {"file": name})


@websocket_api.require_admin
@websocket_api.websocket_command(
    {vol.Required("type"): f"{DOMAIN}/backups/list", vol.Required("kind"): vol.In(KINDS)}
)
@websocket_api.async_response
async def ws_backup_list(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    backups = await hass.async_add_executor_job(_list, _dir(hass, msg["kind"]))
    connection.send_result(msg["id"], {"backups": backups})


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/backups/read",
        vol.Required("kind"): vol.In(KINDS),
        vol.Required("file"): vol.Match(FILE),
    }
)
@websocket_api.async_response
async def ws_backup_read(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    # The pattern above keeps the name inside the backup folder.
    path = _dir(hass, msg["kind"]) / msg["file"]
    try:
        content = await hass.async_add_executor_job(path.read_text, "utf-8")
    except OSError:
        connection.send_error(msg["id"], "not_found", "No such backup")
        return
    connection.send_result(msg["id"], {"data": json.loads(content)})
