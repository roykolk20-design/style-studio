"""Style Studio's own storage: themes and the history behind Restore."""

from datetime import datetime, timezone
from typing import Any

from homeassistant.core import HomeAssistant
from homeassistant.helpers.storage import Store

from .const import HISTORY_LIMIT, STORAGE_KEY, STORAGE_VERSION

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

    @property
    def themes(self) -> list[dict[str, Any]]:
        return self._data["themes"]

    async def async_set_themes(self, themes: list[dict[str, Any]]) -> None:
        self._data["themes"] = themes
        await self._store.async_save(self._data)

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
