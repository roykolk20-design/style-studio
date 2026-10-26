"""Themes: stored in Style Studio, written where Home Assistant reads themes.

Home Assistant loads a theme folder in one of two ways, set in
configuration.yaml:

- `themes: !include_dir_merge_named themes`: every file holds named themes.
  Style Studio writes all of its themes to themes/style_studio.yaml.
- `themes: !include_dir_named themes`: every file is one theme, named after
  the file. Style Studio writes one file per theme, "<name>.yaml".

Files Style Studio writes start with MARKER; files without it are never
changed or removed. Before every write the old files are copied to
/config/style_studio/backups/. If Home Assistant can't load the result, the
old files are put back, so a theme can never break the others.
"""

from dataclasses import dataclass
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
# The first line marks a file as ours; a file without it is never overwritten.
MARKER = "# Made by Style Studio."
HEADER = f"{MARKER} Changes made here are overwritten; use the Stijl panel.\n"
BACKUP_DIR = ("style_studio", "backups")
BACKUP_LIMIT = 20

VAR_KEY = re.compile(r"^[a-z0-9][a-z0-9_-]*$")
# Theme names become file names with !include_dir_named, so keep them plain.
THEME_NAME = re.compile(r"^[\w][\w .()&+'-]*$")
INCLUDE = re.compile(
    r"^[ \t]*themes:[ \t]*!include_dir_(merge_)?named[ \t]+['\"]?([^\s'\"#]+)", re.MULTILINE
)


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
        vol.Required("name"): vol.All(
            str, vol.Strip, vol.Length(min=1, max=50), vol.Match(THEME_NAME)
        ),
        vol.Required("base"): BASE_SCHEMA,
        vol.Required("overrides"): VARS_SCHEMA,
        vol.Required("vars"): VARS_SCHEMA,
    }
)


class ForeignFileError(HomeAssistantError):
    """A file Style Studio wants to write exists and wasn't made by it."""


class ReloadError(HomeAssistantError):
    """Home Assistant couldn't load the themes; the old files are back."""


@dataclass
class Layout:
    """How this Home Assistant loads its themes."""

    mode: str  # "merge" or "named"
    folder: Path
    # False when configuration.yaml doesn't show a themes folder at all.
    found: bool


def theme_layout(hass: HomeAssistant) -> Layout:
    """Reads configuration.yaml to see how themes are included."""
    default = Layout("merge", Path(hass.config.path("themes")), False)
    try:
        text = Path(hass.config.path("configuration.yaml")).read_text(encoding="utf-8")
    except OSError:
        return default
    if match := INCLUDE.search(text):
        folder = Path(hass.config.path(match.group(2).rstrip("/")))
        return Layout("merge" if match.group(1) else "named", folder, True)
    return default


def themes_path(hass: HomeAssistant) -> Path:
    """Where Style Studio's themes are: a file, or a folder of files."""
    layout = theme_layout(hass)
    return layout.folder / THEMES_FILE if layout.mode == "merge" else layout.folder


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


def _ours(path: Path) -> bool:
    try:
        with path.open(encoding="utf-8") as file:
            return file.readline().startswith(MARKER)
    except OSError:
        return False


def _plan(layout: Layout, themes: list[dict[str, Any]]) -> dict[Path, str | None]:
    """The files to write (content) or remove (None) for these themes."""
    files: dict[Path, str | None] = {}
    merge_file = layout.folder / THEMES_FILE
    if layout.mode == "merge":
        data = {theme["name"]: dict(theme["vars"]) for theme in themes}
        files[merge_file] = HEADER + (yaml_util.dump(data) if data else "{}\n")
        # One-theme files from the other layout can't be read here.
        if layout.folder.is_dir():
            for path in layout.folder.glob("*.yaml"):
                if path != merge_file and _ours(path):
                    files[path] = None
        return files

    wanted = {layout.folder / f"{theme['name']}.yaml": theme for theme in themes}
    for path, theme in wanted.items():
        files[path] = HEADER + yaml_util.dump(dict(theme["vars"]))
    # Our files for themes that are gone, and a merge-style file from before,
    # which this layout can't read.
    if layout.folder.is_dir():
        for path in layout.folder.glob("*.yaml"):
            if path not in wanted and _ours(path):
                files[path] = None
    return files


def _apply(files: dict[Path, str | None], backup_dir: Path, stamp: str) -> dict[Path, str | None]:
    """Runs in the executor. Backs up and writes; returns the old contents."""
    for path, content in files.items():
        if content is not None and path.exists() and not _ours(path):
            raise ForeignFileError(str(path))
    old: dict[Path, str | None] = {}
    for path, content in files.items():
        old[path] = path.read_text(encoding="utf-8") if path.exists() else None
        if old[path] is not None:
            backup_dir.mkdir(parents=True, exist_ok=True)
            shutil.copy2(path, backup_dir / f"{path.name}.{stamp}")
        if content is None:
            path.unlink(missing_ok=True)
        else:
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text(content, encoding="utf-8")
    for name in {path.name for path in files}:
        for extra in sorted(backup_dir.glob(f"{name}.*"))[:-BACKUP_LIMIT]:
            extra.unlink()
    return old


def _restore(old: dict[Path, str | None]) -> None:
    for path, content in old.items():
        if content is None:
            path.unlink(missing_ok=True)
        else:
            path.write_text(content, encoding="utf-8")


async def async_write_themes(hass: HomeAssistant, themes: list[dict[str, Any]]) -> None:
    """Write Style Studio's themes where Home Assistant reads them, and reload."""
    layout = await hass.async_add_executor_job(theme_layout, hass)
    files = await hass.async_add_executor_job(_plan, layout, themes)
    stamp = datetime.now().strftime("%Y%m%d-%H%M%S")
    old = await hass.async_add_executor_job(
        _apply, files, Path(hass.config.path(*BACKUP_DIR)), stamp
    )
    try:
        await hass.services.async_call("frontend", "reload_themes", blocking=True)
    except HomeAssistantError as err:
        await hass.async_add_executor_job(_restore, old)
        # Load the old themes again; if that fails too, it isn't ours to fix.
        try:
            await hass.services.async_call("frontend", "reload_themes", blocking=True)
        except HomeAssistantError:
            pass
        raise ReloadError(str(err)) from err


def _mismatch(layout: Layout) -> bool:
    """Our files are in the other layout's format (it changed, or an older
    Style Studio wrote them). Home Assistant can't start its frontend then."""
    if not layout.folder.is_dir():
        return False
    ours = [path for path in layout.folder.glob("*.yaml") if _ours(path)]
    merge_file = layout.folder / THEMES_FILE
    if layout.mode == "named":
        return merge_file in ours
    return any(path != merge_file for path in ours)


async def async_repair_themes(hass: HomeAssistant, themes: list[dict[str, Any]]) -> bool:
    """Rewrite our files when they don't fit the layout. Returns True if so."""
    layout = await hass.async_add_executor_job(theme_layout, hass)
    if not await hass.async_add_executor_job(_mismatch, layout):
        return False
    files = await hass.async_add_executor_job(_plan, layout, themes)
    stamp = datetime.now().strftime("%Y%m%d-%H%M%S")
    await hass.async_add_executor_job(_apply, files, Path(hass.config.path(*BACKUP_DIR)), stamp)
    return True
