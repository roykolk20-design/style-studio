DOMAIN = "style_studio"
# Keep in sync with manifest.json and frontend/src/version.js.
VERSION = "0.1.0"

URL_BASE = f"/{DOMAIN}"
# The version in the URL makes browsers and the Companion app fetch new files.
PANEL_URL = f"{URL_BASE}/studio-panel.js?v={VERSION}"
PANEL_PATH = "style-studio"
PANEL_ELEMENT = "style-studio-panel"

STORAGE_KEY = DOMAIN
STORAGE_VERSION = 1
HISTORY_LIMIT = 10
