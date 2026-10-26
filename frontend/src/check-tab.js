import { css, html, nothing } from "lit";
import { live } from "lit/directives/live.js";
import { TabBase } from "./tab-base.js";
import { listDashboards, loadDashboard, saveDashboard } from "./dashboards.js";
import { applySuggestions, scanDashboard, themeColors } from "./fixed-styles.js";

// Browser Mod sets this when it takes over the default dashboard; left
// behind, it shows default_dashboard_plugin_conflict (see the brief, 2.3).
const BROWSER_MOD_KEY = "isDefaultPanelManaged";

function readStorage(key) {
  try {
    return localStorage.getItem(key);
  } catch (err) {
    return null;
  }
}

/** Checks for known conflicts, fixed styles in dashboards, and restore. */
class CheckTab extends TabBase {
  static properties = {
    ...TabBase.properties,
    _check: { state: true },
    _scan: { state: true },
    _chosen: { state: true },
    _history: { state: true },
    _backups: { state: true },
  };

  connectedCallback() {
    super.connectedCallback();
    this._refresh();
  }

  async _refresh() {
    try {
      const [check, history, backups] = await Promise.all([
        this.hass.callWS({ type: "style_studio/check" }),
        this.hass.callWS({ type: "style_studio/history/list" }),
        this.hass.callWS({ type: "style_studio/backups/list", kind: "dashboards" }),
      ]);
      this._check = check;
      this._history = history;
      this._backups = backups.backups;
    } catch (err) {
      this._error(err);
    }
  }

  async _scanDashboards() {
    this._run(async () => {
      const colors = themeColors();
      const dashboards = (await listDashboards(this.hass, this.hass.localize("panel.states") || "Overview"))
        .filter((d) => d.editable);
      const results = [];
      for (const dashboard of dashboards) {
        try {
          const config = await loadDashboard(this.hass, dashboard.url_path);
          results.push({ dashboard, findings: scanDashboard(config, colors) });
        } catch (err) {
          // A dashboard that was never saved has no config yet.
        }
      }
      this._scan = results;
      // Everything with a suggestion starts chosen.
      this._chosen = new Set(
        results.flatMap((r) =>
          r.findings.filter((f) => f.suggestion).map((f) => this._findingKey(r.dashboard, f))
        )
      );
    });
  }

  _findingKey(dashboard, finding) {
    return `${dashboard.url_path ?? ""}|${finding.kind}|${finding.value.toLowerCase()}`;
  }

  _toggle(key, on) {
    const chosen = new Set(this._chosen);
    if (on) chosen.add(key);
    else chosen.delete(key);
    this._chosen = chosen;
  }

  _apply(result) {
    const chosen = result.findings.filter(
      (f) => f.suggestion && this._chosen.has(this._findingKey(result.dashboard, f))
    );
    const count = chosen.reduce((sum, f) => sum + f.count, 0);
    this._ask(this.t("ck_apply_confirm", { count, name: result.dashboard.title }), () =>
      this._run(async () => {
        const old = await loadDashboard(this.hass, result.dashboard.url_path);
        await saveDashboard(this.hass, result.dashboard.url_path, old, applySuggestions(old, chosen));
        await this._refresh();
        await this._scanDashboards();
      }, this.t("ck_applied", { name: result.dashboard.title }))
    );
  }

  _fixBrowserMod() {
    this._ask(this.t("ck_fix_confirm"), () => {
      try {
        localStorage.removeItem(BROWSER_MOD_KEY);
      } catch (err) {
        // Nothing to remove when storage is blocked.
      }
      this.requestUpdate();
      this._showToast(this.t("ck_fixed"));
    });
  }

  _restoreHistory(key, index) {
    this._ask(this.t("ck_restore_confirm"), () =>
      this._run(async () => {
        await this.hass.callWS({ type: "style_studio/history/restore", key, index });
        await this._refresh();
      }, this.t("ck_restored"))
    );
  }

  _restoreBackup(backup) {
    this._ask(this.t("ck_restore_confirm"), () =>
      this._run(async () => {
        const { data } = await this.hass.callWS({
          type: "style_studio/backups/read",
          kind: "dashboards",
          file: backup.file,
        });
        const current = await loadDashboard(this.hass, data.url_path).catch(() => ({}));
        await saveDashboard(this.hass, data.url_path, current, data.config);
        // Earlier search results no longer match the dashboard.
        this._scan = null;
        await this._refresh();
      }, this.t("ck_restored"))
    );
  }

  _when(iso) {
    return new Date(iso).toLocaleString(this.hass.locale?.language ?? "nl", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }

  render() {
    if (!this._check) return nothing;
    return html`
      <p class="intro">${this.t("check_intro")}</p>
      ${this._checksCard()} ${this._fixedCard()} ${this._restoreCard()} ${this._bar({})}
    `;
  }

  _item(ok, text, action = nothing) {
    return html`<div class="item ${ok ? "ok" : "warn"}">
      <ha-icon icon=${ok ? "mdi:check-circle" : "mdi:alert-circle"}></ha-icon>
      <div class="text">${text}</div>
      ${action}
    </div>`;
  }

  _checksCard() {
    const c = this._check;
    // Only themes someone uses can get in the way.
    const used = c.card_mod_themes.filter((t) => t.in_use);
    const unused = c.card_mod_themes.filter((t) => !t.in_use);
    const sidebarCardMod = used.filter((t) => t.sidebar);
    const otherCardMod = used.filter((t) => !t.sidebar);

    // A device seen before this version started simply hasn't opened Home
    // Assistant since; it loads the new files by itself. Only one that
    // reported an old version afterwards keeps old files.
    const since = c.version_since ? new Date(c.version_since).getTime() : 0;
    const recent = Date.now() - 14 * 24 * 3600 * 1000;
    const behind = c.devices.filter((d) => d.version !== c.version && new Date(d.at).getTime() > recent);
    const stale = behind.filter((d) => new Date(d.at).getTime() > since);
    const waiting = behind.filter((d) => new Date(d.at).getTime() <= since);
    const browserMod = readStorage(BROWSER_MOD_KEY) === "true";
    const deviceList = (devices) => html`<ul>
      ${devices.map(
        (d) => html`<li>
          ${this.t("ck_device", {
            user: d.user,
            kind: d.app ? this.t("ck_app") : this.t("ck_browser"),
            version: d.version,
            when: this._when(d.at),
          })}
        </li>`
      )}
    </ul>`;

    return html`
      <div class="card">
        <div class="title-row">
          <h2>${this.t("ck_checks")}</h2>
          <button class="small" ?disabled=${this._busy} @click=${() => this._refresh()}>
            <ha-icon icon="mdi:refresh"></ha-icon>${this.t("ck_again")}
          </button>
        </div>
        ${sidebarCardMod.length
          ? sidebarCardMod.map((t) =>
              c.glass_handles_themes
                ? this._item(true, this.t("ck_cardmod_handled", { theme: t.theme }))
                : this._item(
                    !c.glass_sidebar,
                    this.t("ck_cardmod_sidebar", { theme: t.theme, keys: t.keys.join(", ") })
                  )
            )
          : this._item(true, this.t("ck_no_cardmod"))}
        ${otherCardMod.map((t) =>
          this._item(true, this.t("ck_cardmod_other", { theme: t.theme, keys: t.keys.join(", ") }))
        )}
        ${unused.length
          ? this._item(
              true,
              this.t(unused.length === 1 ? "ck_cardmod_unused_one" : "ck_cardmod_unused", {
                count: unused.length,
                names: unused.map((t) => t.theme).join(", "),
              })
            )
          : nothing}
        ${browserMod
          ? this._item(
              false,
              this.t("ck_browser_mod"),
              html`<button class="small" @click=${this._fixBrowserMod}>${this.t("ck_fix")}</button>`
            )
          : this._item(true, this.t("ck_browser_mod_ok"))}
        ${c.themes_not_loaded.length
          ? this._item(false, this.t("ck_not_loaded", { names: c.themes_not_loaded.join(", ") }))
          : this._item(true, this.t("ck_loaded"))}
        ${stale.length
          ? this._item(
              false,
              html`${this.t("ck_devices_old")} ${deviceList(stale)}
                <small>${this.t("ck_app_cache")}</small>`
            )
          : this._item(true, waiting.length ? this.t("ck_devices_none_old") : this.t("ck_devices_ok", { version: c.version }))}
        ${waiting.length
          ? this._item(true, html`${this.t("ck_devices_waiting", { version: c.version })} ${deviceList(waiting)}`)
          : nothing}
      </div>
    `;
  }

  _fixedCard() {
    return html`
      <div class="card">
        <h2>${this.t("ck_fixed_styles")}</h2>
        <p class="hint">${this.t("ck_fixed_hint")}</p>
        <button class="primary" ?disabled=${this._busy} @click=${this._scanDashboards}>
          ${this.t("ck_scan")}
        </button>
        ${this._scan
          ? this._scan.every((r) => !r.findings.length)
            ? html`<p>${this.t("ck_none_found")}</p>`
            : this._scan.filter((r) => r.findings.length).map((r) => this._dashboardFindings(r))
          : nothing}
      </div>
    `;
  }

  _dashboardFindings(result) {
    const chosen = result.findings.filter(
      (f) => f.suggestion && this._chosen.has(this._findingKey(result.dashboard, f))
    );
    return html`
      <div class="dashboard" data-dashboard=${result.dashboard.title}>
        <h3>${result.dashboard.title}</h3>
        ${result.findings.map((f) => {
          const key = this._findingKey(result.dashboard, f);
          return html`<label class="finding ${f.suggestion ? "" : "none"}">
            <input
              type="checkbox"
              aria-label=${f.value}
              ?disabled=${!f.suggestion}
              .checked=${live(this._chosen.has(key))}
              @change=${(ev) => this._toggle(key, ev.target.checked)}
            />
            ${f.kind === "color"
              ? html`<span class="swatch" style="background:${f.value}"></span>`
              : html`<ha-icon icon="mdi:rounded-corner"></ha-icon>`}
            <code>${f.value}</code>
            <span class="arrow">→</span>
            <code class="suggestion">${f.suggestion ?? this.t("ck_no_suggestion")}</code>
            <small title=${f.places.join("\n")}>${f.count === 1 ? this.t("ck_found_one") : this.t("ck_found", { count: f.count })} · ${f.places.slice(0, 2).join(", ")}${f.places.length > 2 ? " …" : ""}</small>
          </label>`;
        })}
        <button class="small" ?disabled=${this._busy || !chosen.length} @click=${() => this._apply(result)}>
          ${this.t("ck_apply")}
        </button>
      </div>
    `;
  }

  _restoreCard() {
    const lists = [
      ["themes", this.t("ck_themes")],
      ["glass_sidebar", this.t("ck_glass")],
      ["people", this.t("ck_people")],
    ];
    return html`
      <div class="card">
        <h2>${this.t("ck_backups")}</h2>
        <details open>
          <summary>${this.t("ck_dashboards")} (${this._backups.length})</summary>
          ${this._backups.length
            ? this._backups.map(
                (b) => html`<div class="version">
                  <span>${b.key}</span>
                  <small>${this._when(b.saved_at)}</small>
                  <button class="small" ?disabled=${this._busy} @click=${() => this._restoreBackup(b)}>
                    ${this.t("ck_restore")}
                  </button>
                </div>`
              )
            : html`<p class="hint">${this.t("ck_nothing")}</p>`}
        </details>
        ${lists.map(
          ([key, label]) => html`<details>
            <summary>${label} (${this._history[key].length})</summary>
            ${this._history[key].length
              ? this._history[key].map(
                  (entry) => html`<div class="version">
                    <span>${entry.summary}</span>
                    <small>${this._when(entry.saved_at)}</small>
                    <button
                      class="small"
                      ?disabled=${this._busy}
                      @click=${() => this._restoreHistory(key, entry.index)}
                    >
                      ${this.t("ck_restore")}
                    </button>
                  </div>`
                )
              : html`<p class="hint">${this.t("ck_nothing")}</p>`}
          </details>`
        )}
      </div>
    `;
  }

  static styles = [
    TabBase.styles,
    css`
      .title-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .item {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        padding: 10px 0;
        border-top: 1px solid var(--divider-color);
        line-height: 1.4;
      }

      .item .text {
        flex: 1;
      }

      .item ul {
        margin: 4px 0;
        padding-inline-start: 18px;
      }

      .item.ok > ha-icon {
        color: var(--success-color, #43a047);
      }

      .item.warn > ha-icon {
        color: var(--warning-color, #ffa600);
      }

      .small {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 6px 12px;
        border-radius: 999px;
        color: var(--primary-color);
        font-weight: 500;
        white-space: nowrap;
      }

      .dashboard {
        margin-top: 16px;
        padding-top: 8px;
        border-top: 1px solid var(--divider-color);
      }

      h3 {
        margin: 4px 0 8px;
        font-size: 15px;
        font-weight: 500;
      }

      .finding {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 8px;
        padding: 6px 0;
      }

      .finding.none {
        opacity: 0.6;
      }

      .finding input {
        accent-color: var(--primary-color);
      }

      .finding small {
        flex-basis: 100%;
        margin: 0 0 0 26px;
      }

      .swatch {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        border: 1px solid var(--divider-color);
      }

      code {
        font-size: 12px;
        padding: 2px 6px;
        border-radius: 6px;
        background: var(--secondary-background-color);
      }

      .arrow {
        color: var(--secondary-text-color);
      }

      details {
        border-top: 1px solid var(--divider-color);
        padding: 8px 0;
      }

      summary {
        cursor: pointer;
        font-weight: 500;
      }

      .version {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 6px 0;
      }

      .version span {
        flex: 1;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .version small {
        margin: 0;
      }
    `,
  ];
}

if (!customElements.get("ss-check-tab")) {
  customElements.define("ss-check-tab", CheckTab);
}
