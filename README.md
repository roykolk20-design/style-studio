# Style Studio

Stel het uiterlijk van Home Assistant in vanuit één paneel, zonder YAML of CSS.

> **Status: 0.1.0, fase 1 en 2.** Het tabblad Zijbalk werkt. Thema's, kamers, klimaat, per
> persoon en controle en herstel komen in volgende versies; hun tabbladen staan al in het paneel.

Style Studio is een losse integratie. De zijbalk zelf wordt opgemaakt door
[Glass Sidebar](https://github.com/roykolk20-design/Home-assistant-glasssidebar), een aparte
plugin die je ook zonder Style Studio kunt gebruiken. Style Studio is de mooie
instellingenpagina erbovenop: het schrijft naar de instellingen van Glass Sidebar via de
gewone weg van Home Assistant (de opties van de integratie), en Glass Sidebar toont ze direct.

## Wat het nu doet

- Een paneel **Stijl** in de zijbalk (alleen voor beheerders).
- **Zijbalk** (via Glass Sidebar 1.4.0 of nieuwer): zwevend of vast, afstand, hoeken,
  vervaging, dekking, glazen kaarten, zachte of volle markering van de actieve pagina met een
  eigen kleur, en op de telefoon de breedte, tekstgrootte en vervaging van het menu.
- **Groepen:** maak groepen met kopjes en sleep items erheen, of tik een item aan en kies
  *Hierheen* op een telefoon.
- **Voorbeeld:** telefoon (430), tablet (768) en pc (1920), met een lichte of donkere pagina.
  Pas bij *Opslaan* verandert de echte zijbalk, voor iedereen tegelijk.
- **Terugzetten:** elke opslag bewaart de vorige instellingen van Glass Sidebar (de laatste
  tien), met een knop om ze terug te zetten.
- Het paneel meldt het als Glass Sidebar ontbreekt, nog niet is toegevoegd, uit staat of te oud
  is, en als een scherm een oude versie van het paneel gebruikt.

Glass Sidebar kan nog geen items verbergen en laat de ruimte rond een zwevende balk
doorzichtig (zwart op donkere dashboards). Zodra Glass Sidebar dat kan, krijgt Style Studio er
knoppen voor.

## Installeren

1. Installeer **Glass Sidebar** via HACS en voeg het toe onder Instellingen › Apparaten en
   diensten.
2. HACS › drie puntjes › *Aangepaste repository's* › deze repository, type *Integratie*.
3. Installeer **Style Studio** en herstart Home Assistant.
4. Instellingen › Apparaten en diensten › *Integratie toevoegen* › **Style Studio**.
5. Het paneel **Stijl** staat nu in de zijbalk.

Gebruik geen `card-mod-sidebar` in je thema naast Glass Sidebar; die overschrijft dezelfde
stijlen.

## Hoe het werkt

- `custom_components/style_studio/` is de integratie. `glass.py` zet de instellingen van het
  paneel om naar de opties van Glass Sidebar en terug. Opties die Style Studio niet kent, blijven
  staan, zodat nieuwere versies van Glass Sidebar de hunne houden.
- De geschiedenis voor *Terugzetten* staat in een eigen `Store` (`.storage/style_studio`, via de
  officiële helper).
- `www/studio-panel.js` is het paneel, gebouwd met Lit uit `frontend/src/`.

Websocket-commando's (alleen voor beheerders):

| Commando | Doet |
| --- | --- |
| `style_studio/get` | Versie, en de staat en instellingen van Glass Sidebar |
| `style_studio/sidebar/save` | `sidebar` opslaan in de opties van Glass Sidebar |
| `style_studio/sidebar/undo` | De opties van voor de laatste opslag terugzetten |

## Ontwikkelen

```sh
npm install
npm run build        # frontend/src → custom_components/style_studio/www/studio-panel.js
npm run check        # versies in manifest.json, const.py en version.js gelijk
npm run smoke        # test in Edge op 430, 768 en 1920 px, licht en donker
node dev/serve.mjs   # daarna http://localhost:8123/dev/harness.html
```

De testpagina `dev/harness.html` bootst de zijbalk van Home Assistant en `hass` grof na, en laadt
de echte `sidebar.js` van Glass Sidebar uit de map ernaast
(`../Home assistant setting bar`, of `GLASS_SIDEBAR_DIR`). Dat vangt fouten in het paneel, maar
vervangt geen test in Home Assistant zelf.

Backend-tests (Home Assistant draait niet op Windows, dus via Docker). De tweede `-v` is
optioneel; daarmee lopen de tests ook tegen de echte Glass Sidebar:

```sh
docker build -t style-studio-test -f dev/Dockerfile.test dev
docker run --rm -v "$PWD:/src:ro" -v "$PWD/../Home assistant setting bar:/glass:ro" style-studio-test
```

Een nieuwe versie: verhoog het versienummer op de drie plekken die `npm run check` noemt, werk
`CHANGELOG.md` bij, bouw, en push een tag `vX.Y.Z`.
