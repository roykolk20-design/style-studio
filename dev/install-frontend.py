"""Install the home-assistant-frontend version the installed HA asks for."""

import json
import pathlib
import subprocess
import sys

import homeassistant.components.frontend as frontend

manifest = json.loads((pathlib.Path(frontend.__file__).parent / "manifest.json").read_text())
subprocess.check_call([sys.executable, "-m", "pip", "install", "-q", *manifest["requirements"]])
