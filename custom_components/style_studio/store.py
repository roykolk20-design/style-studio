"""Style Studio's own storage: themes and the history behind Restore."""

from datetime import datetime, timezone
from typing import Any

from homeassistant.core import HomeAssistant
from homeassistant.helpers.storage import Store

from .const import HISTORY_LIMIT, STORAGE_KEY, STORAGE_VERSION, VERSION

# Stored layout:
# {
#   "themes": [{"id", "name", "base", "overrides", "vars"}, ...],
#   "history": {"<what>": [{"saved_at": "...", "value": ...}, ...]},
# }
# "<what>" is for example "glass_sidebar" or "themes"; the newest entry is last.


class StyleStore:
    def __init__(self, hass: HomeAssistant) -> None:
        self._store: Store[dict[str, Any]] = Store(hass, STORAGE_VERSION, STORAGE_KEY)
        self._data: dict[str, Any] = {}

    async def async_load(self) -> None:
        self._data = await self._store.async_load() or {}
        self._data.setdefault("history", {})
        self._data.setdefault("themes", [])
        self._data.setdefault("persons", {})
        self._data.setdefault("reports", {})
        # Remember when this version first started.
        if self._data.get("version") != VERSION:
            self._data["version"] = VERSION
            self._data["version_since"] = datetime.now(timezone.utc).isoformat()
            await self._store.async_save(self._data)

    @property
    def version_since(self) -> str | None:
        return self._data.get("version_since")

    @property
    def themes(self) -> list[dict[str, Any]]:
        return self._data["themes"]

    async def async_set_themes(self, themes: list[dict[str, Any]]) -> None:
        self._data["themes"] = themes
        await self._store.async_save(self._data)

    @property
    def persons(self) -> dict[str, dict[str, Any]]:
        """What the admin set per user: {"theme", "sidebar", "*_updated"}."""
        return self._data["persons"]

    async def async_set_persons(self, persons: dict[str, dict[str, Any]]) -> None:
        self._data["persons"] = persons
        await self._store.async_save(self._data)

    @property
    def reports(self) -> dict[str, dict[str, Any]]:
        """What each browser last told us, by device id."""
        return self._data["reports"]

    def report(self, device_id: str, report: dict[str, Any], limit: int) -> None:
        reports = self._data["reports"]
        reports[device_id] = report
        for old in sorted(reports, key=lambda key: reports[key]["at"])[:-limit]:
            del reports[old]
        # Browsers report on every page load; no need to write each one at once.
        self._store.async_delay_save(lambda: self._data, 30)

    def history(self, key: str) -> list[dict[str, Any]]:
        """Kept versions, oldest first: [{"saved_at", "value"}]."""
        return list(self._data["history"].get(key, []))

    def history_size(self, key: str) -> int:
        return len(self._data["history"].get(key, []))

    async def async_push_history(self, key: str, value: Any) -> None:
        """Keep a value from before a change, so it can be put back."""
        history = self._data["history"].setdefault(key, [])
        history.append({"saved_at": datetime.now(timezone.utc).isoformat(), "value": value})
        del history[:-HISTORY_LIMIT]
        await self._store.async_save(self._data)

    async def async_pop_history(self, key: str) -> Any:
        """The newest kept value, removed from the history; None if empty."""
        history = self._data["history"].get(key)
        if not history:
            return None
        value = history.pop()["value"]
        await self._store.async_save(self._data)
        return value
