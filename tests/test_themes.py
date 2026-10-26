from pathlib import Path

import pytest

from homeassistant.components.frontend import DATA_DEFAULT_THEME
from homeassistant.core import HomeAssistant
from homeassistant.setup import async_setup_component
from homeassistant.util import yaml as yaml_util
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.style_studio.const import DOMAIN
from custom_components.style_studio.themes import MARKER

THEME = {
    "name": "Joyce",
    "base": {"accent": "#e8749e", "header": None, "radius": 16},
    "overrides": {"app-header-background-color": "#123456"},
    "vars": {
        "primary-color": "#e8749e",
        "app-header-background-color": "#123456",
        "bubble-pop-up-main-background-color": "rgba(255, 250, 252, 0.8)",
    },
}


@pytest.fixture
async def config_dir(hass: HomeAssistant, tmp_path: Path) -> Path:
    """A config folder like a real one: themes included from themes/."""
    hass.config.config_dir = str(tmp_path)
    (tmp_path / "configuration.yaml").write_text(
        "frontend:\n  themes: !include_dir_merge_named themes\n", encoding="utf-8"
    )
    (tmp_path / "themes").mkdir()
    # One of the user's own theme files; Style Studio must never touch it.
    (tmp_path / "themes" / "licht_warm.yaml").write_text(
        'Licht Warm:\n  primary-color: "#f59e0b"\n  card-mod-theme: "Licht Warm"\n'
        "  modes:\n    light:\n      primary-background-color: \"#f4efe6\"\n",
        encoding="utf-8",
    )
    assert await async_setup_component(hass, "http", {})
    assert await async_setup_component(
        hass, "frontend", await hass.async_add_executor_job(_config, tmp_path)
    )
    entry = MockConfigEntry(domain=DOMAIN)
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    return tmp_path


def _config(path: Path) -> dict:
    return yaml_util.load_yaml_dict(str(path / "configuration.yaml"))


async def _send(client, **msg) -> dict:
    await client.send_json_auto_id(msg)
    return await client.receive_json()


async def test_save_writes_file_and_loads_theme(hass, hass_ws_client, config_dir) -> None:
    client = await hass_ws_client(hass)

    state = (await _send(client, type="style_studio/themes/get"))["result"]
    assert state["themes"] == []
    # card-mod is CSS, not a color; modes are flattened.
    assert state["others"]["Licht Warm"] == {
        "primary-color": "#f59e0b",
        "primary-background-color": "#f4efe6",
    }

    msg = await _send(client, type="style_studio/themes/save", theme=THEME)
    assert msg["success"], msg
    result = msg["result"]
    assert result["loaded"] == ["Joyce"]
    assert "Joyce" not in result["others"]

    path = config_dir / "themes" / "style_studio.yaml"
    content = path.read_text(encoding="utf-8")
    assert content.startswith(MARKER)
    written = yaml_util.parse_yaml(content)
    assert written["Joyce"]["app-header-background-color"] == "#123456"

    # The user's own file is untouched.
    assert "card-mod-theme" in (config_dir / "themes" / "licht_warm.yaml").read_text()

    # A second save keeps a backup of the first file.
    theme = {**result["theme"], "vars": {**THEME["vars"], "primary-color": "#ff0000"}}
    assert (await _send(client, type="style_studio/themes/save", theme=theme))["success"]
    backups = list((config_dir / "style_studio" / "backups").glob("style_studio.yaml.*"))
    assert len(backups) == 1
    assert backups[0].read_text(encoding="utf-8") == content


async def test_name_taken(hass, hass_ws_client, config_dir) -> None:
    client = await hass_ws_client(hass)
    msg = await _send(
        client, type="style_studio/themes/save", theme={**THEME, "name": "licht warm"}
    )
    assert msg["error"]["code"] == "name_taken"


async def test_never_overwrites_foreign_file(hass, hass_ws_client, config_dir) -> None:
    path = config_dir / "themes" / "style_studio.yaml"
    path.write_text("Mine:\n  primary-color: red\n", encoding="utf-8")
    client = await hass_ws_client(hass)

    msg = await _send(client, type="style_studio/themes/save", theme=THEME)
    assert msg["error"]["code"] == "file_exists"
    assert path.read_text(encoding="utf-8") == "Mine:\n  primary-color: red\n"
    assert hass.data[DOMAIN]["store"].themes == []


async def test_delete_and_undo(hass, hass_ws_client, config_dir) -> None:
    client = await hass_ws_client(hass)
    theme = (await _send(client, type="style_studio/themes/save", theme=THEME))["result"]["theme"]

    state = (await _send(client, type="style_studio/themes/delete", theme_id=theme["id"]))["result"]
    assert state["themes"] == []
    assert state["loaded"] == []

    state = (await _send(client, type="style_studio/themes/undo"))["result"]
    assert state["restored"] is True
    assert [t["name"] for t in state["themes"]] == ["Joyce"]
    assert state["loaded"] == ["Joyce"]


async def test_set_default(hass, hass_ws_client, config_dir) -> None:
    client = await hass_ws_client(hass)
    assert (await _send(client, type="style_studio/themes/save", theme=THEME))["success"]

    msg = await _send(client, type="style_studio/themes/set_default", name="Joyce")
    assert msg["result"]["default_theme"] == "Joyce"
    assert hass.data[DATA_DEFAULT_THEME] == "Joyce"

    msg = await _send(client, type="style_studio/themes/set_default", name="Nope")
    assert msg["error"]["code"] == "not_found"


@pytest.mark.parametrize(
    "theme",
    [
        {**THEME, "name": ""},
        {**THEME, "vars": {"Bad Key": "#fff"}},
        {**THEME, "vars": {"primary-color": "red\nevil: 1"}},
    ],
)
async def test_rejects_bad_themes(hass, hass_ws_client, config_dir, theme) -> None:
    client = await hass_ws_client(hass)
    msg = await _send(client, type="style_studio/themes/save", theme=theme)
    assert msg["error"]["code"] == "invalid_format"


NAMED_CONFIG = "frontend:\n  themes: !include_dir_named themes\n"


async def test_named_layout(hass, hass_ws_client, tmp_path: Path) -> None:
    """With !include_dir_named every file is one theme, named after the file."""
    hass.config.config_dir = str(tmp_path)
    (tmp_path / "configuration.yaml").write_text(NAMED_CONFIG, encoding="utf-8")
    themes = tmp_path / "themes"
    themes.mkdir()
    (themes / "licht_warm.yaml").write_text('primary-color: "#f59e0b"\n', encoding="utf-8")
    assert await async_setup_component(hass, "http", {})
    assert await async_setup_component(hass, "frontend", {})
    entry = MockConfigEntry(domain=DOMAIN)
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    # A file from an older Style Studio in the merge format; this layout can't
    # read it, and it made every theme reload fail.
    (themes / "style_studio.yaml").write_text(MARKER + "\nOld:\n  primary-color: red\n", encoding="utf-8")
    client = await hass_ws_client(hass)

    state = (await _send(client, type="style_studio/themes/get"))["result"]
    assert state["layout"] == "named"

    msg = await _send(client, type="style_studio/themes/save", theme={**THEME, "name": "Joyce Roze"})
    assert msg["success"], msg
    assert msg["result"]["loaded"] == ["Joyce Roze"]
    written = themes / "Joyce Roze.yaml"
    assert written.read_text(encoding="utf-8").startswith(MARKER)
    assert yaml_util.parse_yaml(written.read_text(encoding="utf-8"))["primary-color"] == "#e8749e"
    assert not (themes / "style_studio.yaml").exists()
    assert (themes / "licht_warm.yaml").exists()
    assert "licht_warm" in msg["result"]["others"]

    # The theme can now be picked for a person.
    people = (await _send(client, type="style_studio/people/get"))["result"]
    assert "Joyce Roze" in people["themes"]
    assert people["not_loaded"] == []

    theme_id = msg["result"]["theme"]["id"]
    assert (await _send(client, type="style_studio/themes/delete", theme_id=theme_id))["success"]
    assert not written.exists()


async def test_reload_failure_puts_files_back(hass, hass_ws_client, config_dir) -> None:
    # Someone else's broken theme file makes every reload fail.
    (config_dir / "themes" / "broken.yaml").write_text("Broken: 5\n", encoding="utf-8")
    client = await hass_ws_client(hass)

    msg = await _send(client, type="style_studio/themes/save", theme=THEME)
    assert msg["error"]["code"] == "reload_failed"
    assert not (config_dir / "themes" / "style_studio.yaml").exists()
    assert hass.data[DOMAIN]["store"].themes == []


async def test_name_must_fit_a_file_name(hass, hass_ws_client, config_dir) -> None:
    client = await hass_ws_client(hass)
    msg = await _send(client, type="style_studio/themes/save", theme={**THEME, "name": "../etc"})
    assert msg["error"]["code"] == "invalid_format"


async def test_repairs_files_at_start(hass, tmp_path: Path) -> None:
    """An older Style Studio left a merge-style file in a named setup; at the
    next start it becomes one file per theme."""
    hass.config.config_dir = str(tmp_path)
    (tmp_path / "configuration.yaml").write_text(NAMED_CONFIG, encoding="utf-8")
    themes = tmp_path / "themes"
    themes.mkdir()
    assert await async_setup_component(hass, "http", {})
    assert await async_setup_component(hass, "frontend", {})
    (themes / "style_studio.yaml").write_text(MARKER + "\nJoyce:\n  primary-color: red\n", encoding="utf-8")

    entry = MockConfigEntry(domain=DOMAIN)
    entry.add_to_hass(hass)
    # Style Studio's own store already knows the theme.
    hass_storage_theme = {**THEME, "id": "abc"}
    from custom_components.style_studio.store import StyleStore

    store = StyleStore(hass)
    await store.async_load()
    await store.async_set_themes([hass_storage_theme])
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    assert not (themes / "style_studio.yaml").exists()
    assert (themes / "Joyce.yaml").read_text(encoding="utf-8").startswith(MARKER)
    assert "Joyce" in hass.data["frontend_themes"]
