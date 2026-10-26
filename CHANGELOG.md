# Changelog

## [0.1.0]

First version: phase 1 (base), phase 2 (sidebar) and phase 3 (themes).

- Integration with a config flow and the **Stijl** panel.
- **Themes** tab: set every color in Home Assistant. Start from a preset (sand and yellow,
  pink, dark, glass) or a copy of an existing theme; a few base colors work out all others,
  and every variable can be set on its own, plus own variables. Solid or glass pop-ups with
  an opacity slider. Preview of a whole screen, optionally applied to your own browser before
  saving. Saves to `themes/style_studio.yaml` with a backup, reloads themes, and can make a
  theme the default. Never writes your own theme files.
- **Sidebar** tab that sets up the Glass Sidebar add-on (1.4.0 or newer), its own repository:
  shape, glass, active page, phone and groups, with a preview at phone, tablet and desktop width
  on a light or dark page.
- Every save keeps the previous Glass Sidebar options, with a button to restore them.
- The panel says when Glass Sidebar is missing, not added, disabled or too old, and when a
  screen runs an old version of the panel.
