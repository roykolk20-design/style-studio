# Changelog

## [0.3.0]

### New

- **Climate** tab: a Bubble Card pop-up per air conditioner with temperature
  minus and plus, modes, fan speeds and swing switches, built from
  button-cards. Only what the device reports is offered; missing parts are
  explained. Preview with the real cards in Home Assistant. Puts the pop-up and
  an opener button on a dashboard view after a backup of that dashboard, and
  replaces an earlier one instead of adding a second.
- Dashboard backups in `config/style_studio/backups/dashboards/`.
- The theme editor starts from the theme you use now instead of something new.
  Colors that come fixed from a copied theme are shown, with a button to let
  them follow the quick settings.
- Link to Glass Sidebar's own settings page (1.5 and newer).

### Fixed

- Group icons and "start collapsed" from Glass Sidebar 1.5 are kept when
  saving from the Sidebar tab.

## [0.2.0]

### New

- **Per person** tab: a theme and a sidebar order for each person, or copy
  everything from someone else. A small script applies it in their own
  browser the next time they open Home Assistant, once per device, and reports
  back what each device uses and which version it runs.
- **Use for me** puts a saved theme on your own screen right away.

### Fixed

- The panel now scrolls by itself. In Home Assistant the Save bar could end up
  out of reach, so changes seemed to do nothing.
- With unsaved changes, *New theme* asks right below the buttons instead of
  in the bar at the bottom.

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
