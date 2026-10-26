"""Themes: stored in Style Studio, written to /config/themes/style_studio.yaml.

Style Studio only ever writes its own file. Your other theme files are read
(to import them) but never changed. Before every write the old file is copied
to /config/style_studio/backups/.
"""

from datetime import datetime
from pathlib import Path
import re
import shutil
from typing import Any

import voluptuous as vol

from homeassistant.components.frontend import DATA_DEFAULT_THEME, DATA_THEMES
from homeassistant.core import HomeAssistant
from homeassistant.exceptions import HomeAssistantError
from homeassistant.util import yaml as yaml_util

THEMES_FILE = "style_studio.yaml"
# The first line marks the file as ours; a file without it is never overwritten.
MARKER = "# Made by Style Studio."
HEADER = f"{MARKER} Changes made here are overwritten; use the Stijl panel.\n"
BACKUP_DIR = ("style_studio", "backups")
BACKUP_LIMIT = 20

VAR_KEY = re.compile(r"^[a-z0-9][a-z0-9_-]*$")


def _var_value(value: Any) -> str:
    value = str(value)
    if len(value) > 500 or "\n" in value:
        raise vol.Invalid("value too long or on several lines")
    return value


VARS_SCHEMA = vol.Schema({vol.Match(VAR_KEY): _var_value})
BASE_SCHEMA = vol.Schema(
    vol.All(
        {str: vol.Any(None, bool, int, float, vol.All(str, vol.Length(max=100)))},
        vol.Length(max=30),
    )
)
THEME_SCHEMA = vol.Schema(
    {
        vol.Optional("id"): vol.All(str, vol.Match(r"^[0-9a-f]{1,32}$")),
        vol.Required("name"): vol.All(str, vol.Strip, vol.Length(min=1, max=50)),
        vol.Required("base"): BASE_SCHEMA,
        vol.Required("overrides"): VARS_SCHEMA,
        vol.Required("vars"): VARS_SCHEMA,
    }
)


class ForeignFileError(HomeAssistantError):
    """themes/style_studio.yaml exists but wasn't made by Style Studio."""


def themes_path(hass: HomeAssistant) -> Path:
    return Path(hass.config.path("themes", THEMES_FILE))


def loaded_themes(hass: HomeAssistant) -> dict[str, Any]:
    return hass.data.get(DATA_THEMES) or {}


def default_theme(hass: HomeAssistant) -> str | None:
    return hass.data.get(DATA_DEFAULT_THEME)


def flatten(theme: Any) -> dict[str, str]:
    """A loaded HA theme as plain variables, light mode first.

    card-mod entries are CSS, not colors, so they are left out.
    """
    if not isinstance(theme, dict):
        return {}
    modes = theme.get("modes") if isinstance(theme.get("modes"), dict) else {}
    merged = {**{k: v for k, v in theme.items() if k != "modes"}, **(modes.get("light") or {})}
    return {
        str(key): str(value)
        for key, value in merged.items()
        if isinstance(value, (str, int, float)) and not str(key).startswith("card-mod")
    }


def _write(path: Path, backup_dir: Path, content: str, stamp: str) -> None:
    """Runs in the executor: back up the old file, then write the new one."""
    if path.exists():
        old = path.read_text(encoding="utf-8")
        if not old.startswith(MARKER):
            raise ForeignFileError(str(path))
        backup_dir.mkdir(parents=True, exist_ok=True)
        shutil.copy2(path, backup_dir / f"{THEMES_FILE}.{stamp}")
        backups = sorted(backup_dir.glob(f"{THEMES_FILE}.*"))
        for extra in backups[:-BACKUP_LIMIT]:
            extra.unlink()
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")


async def async_write_themes(hass: HomeAssistant, themes: list[dict[str, Any]]) -> None:
    """Write all Style Studio themes to their file and reload themes."""
    data = {theme["name"]: dict(theme["vars"]) for theme in themes}
    content = HEADER + (yaml_util.dump(data) if data else "{}\n")
    stamp = datetime.now().strftime("%Y%m%d-%H%M%S")
    await hass.async_add_executor_job(
        _write, themes_path(hass), Path(hass.config.path(*BACKUP_DIR)), content, stamp
    )
    await hass.services.async_call("frontend", "reload_themes", blocking=True)
