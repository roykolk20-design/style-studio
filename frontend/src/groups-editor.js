import { LitElement, css, html, nothing } from "lit";

const UNGROUPED = -1;

/**
 * Edits sidebar groups and, with canHide, hidden items. Fires "change" with
 * { categories, hidden } and never changes its own properties.
 *
 * Moving works two ways: drag and drop with a mouse, or tap an item and then
 * "Move here" on a group, which also works on touch screens.
 */
export class GroupsEditor extends LitElement {
  static properties = {
    items: { attribute: false },
    categories: { attribute: false },
    hidden: { attribute: false },
    disabled: { type: Boolean },
    // Hiding items needs support from the sidebar plugin.
    canHide: { type: Boolean },
    t: { attribute: false },
    _selected: { state: true },
    _confirm: { state: true },
    _dropTarget: { state: true },
  };

  constructor() {
    super();
    this.items = [];
    this.categories = [];
    this.hidden = [];
    this._selected = null;
    this._confirm = null;
    this._dropTarget = null;
  }

  _emit(categories, hidden = this.hidden) {
    const detail = this.canHide ? { categories, hidden } : { categories };
    this.dispatchEvent(new CustomEvent("change", { detail }));
  }

  _clone() {
    // Keep what other tools store per group, such as Glass Sidebar's icon.
    return this.categories.map((c) => ({ ...c, panels: [...c.panels] }));
  }

  // Puts a panel in a group (or none) before `before`, or at the end.
  _move(path, group, before = null) {
    const categories = this._clone();
    for (const category of categories) {
      category.panels = category.panels.filter((p) => p !== path);
    }
    if (group !== UNGROUPED) {
      const panels = categories[group].panels;
      const index = before === null ? -1 : panels.indexOf(before);
      panels.splice(index === -1 ? panels.length : index, 0, path);
    }
    this._emit(categories);
  }

  _shift(path, group, step) {
    const categories = this._clone();
    const panels = categories[group].panels;
    const from = panels.indexOf(path);
    const to = from + step;
    if (from === -1 || to < 0 || to >= panels.length) return;
    [panels[from], panels[to]] = [panels[to], panels[from]];
    this._emit(categories);
  }

  _toggleHidden(path) {
    const hidden = this.hidden.includes(path)
      ? this.hidden.filter((p) => p !== path)
      : [...this.hidden, path];
    this._emit(this.categories, hidden);
  }

  _addGroup() {
    const taken = new Set(this.categories.map((c) => c.name.toLowerCase()));
    let name = this.t("new_group");
    for (let n = 2; taken.has(name.toLowerCase()); n += 1) name = `${this.t("new_group")} ${n}`;
    this._emit([...this._clone(), { name, panels: [] }]);
  }

  _rename(group, name) {
    const categories = this._clone();
    categories[group].name = name.trim() || categories[group].name;
    this._emit(categories);
  }

  _swapGroups(group, step) {
    const categories = this._clone();
    const to = group + step;
    if (to < 0 || to >= categories.length) return;
    [categories[group], categories[to]] = [categories[to], categories[group]];
    this._emit(categories);
  }

  _removeGroup(group) {
    this._confirm = null;
    this._emit(this._clone().filter((_, index) => index !== group));
  }

  _item(path) {
    return this.items.find((item) => item.path === path) ?? { path, title: path, icon: "mdi:help", missing: true };
  }

  render() {
    const grouped = new Set(this.categories.flatMap((c) => c.panels));
    const ungrouped = this.items.filter((item) => !grouped.has(item.path));
    return html`
      ${this._zone(UNGROUPED, ungrouped, html`
        <div class="title">
          <strong>${this.t("ungrouped")}</strong>
          <span class="hint">${this.t("ungrouped_hint")}</span>
        </div>
      `)}
      ${this.categories.map((category, index) =>
        this._zone(
          index,
          category.panels.map((path) => this._item(path)),
          this._groupHeader(category, index)
        )
      )}
      <button class="add" ?disabled=${this.disabled} @click=${this._addGroup}>
        <ha-icon icon="mdi:plus"></ha-icon>${this.t("add_group")}
      </button>
    `;
  }

  _groupHeader(category, index) {
    if (this._confirm === index) {
      return html`
        <div class="title confirm">
          <span>${this.t("remove_group_confirm")}</span>
          <button class="danger" @click=${() => this._removeGroup(index)}>${this.t("yes")}</button>
          <button @click=${() => (this._confirm = null)}>${this.t("no")}</button>
        </div>
      `;
    }
    return html`
      <div class="title">
        <input
          .value=${category.name}
          maxlength="40"
          aria-label=${this.t("group_name")}
          ?disabled=${this.disabled}
          @change=${(ev) => this._rename(index, ev.target.value)}
        />
        <button
          class="icon"
          title=${this.t("move_up")}
          ?disabled=${this.disabled || index === 0}
          @click=${() => this._swapGroups(index, -1)}
        >
          <ha-icon icon="mdi:arrow-up"></ha-icon>
        </button>
        <button
          class="icon"
          title=${this.t("move_down")}
          ?disabled=${this.disabled || index === this.categories.length - 1}
          @click=${() => this._swapGroups(index, 1)}
        >
          <ha-icon icon="mdi:arrow-down"></ha-icon>
        </button>
        <button
          class="icon"
          title=${this.t("remove_group")}
          ?disabled=${this.disabled}
          @click=${() => (this._confirm = index)}
        >
          <ha-icon icon="mdi:delete-outline"></ha-icon>
        </button>
      </div>
    `;
  }

  _zone(group, items, header) {
    const selected = this._selected;
    const canMoveHere = selected && selected.group !== group;
    return html`
      <section
        class="zone ${this._dropTarget === group ? "over" : ""}"
        @dragover=${(ev) => this._dragOver(ev, group)}
        @dragleave=${() => (this._dropTarget = null)}
        @drop=${(ev) => this._drop(ev, group, null)}
      >
        ${header}
        <div class="chips">
          ${items.map((item) => this._chip(item, group))}
          ${!items.length && group !== UNGROUPED
            ? html`<span class="hint">${this.t("empty_group")}</span>`
            : nothing}
        </div>
        ${canMoveHere
          ? html`<button class="here" @click=${() => this._moveSelected(group)}>
              <ha-icon icon="mdi:arrow-down-bold"></ha-icon>${this.t("move_here")}
            </button>`
          : nothing}
      </section>
    `;
  }

  _chip(item, group) {
    const hidden = this.hidden.includes(item.path);
    const selected = this._selected?.path === item.path;
    const panels = group === UNGROUPED ? [] : this.categories[group].panels;
    const position = panels.indexOf(item.path);
    return html`
      <div
        class="chip ${hidden ? "hidden" : ""} ${selected ? "selected" : ""}"
        draggable=${this.disabled ? "false" : "true"}
        @dragstart=${(ev) => {
          ev.dataTransfer.setData("text/plain", item.path);
          ev.dataTransfer.effectAllowed = "move";
        }}
        @dragend=${() => (this._dropTarget = null)}
        @drop=${(ev) => {
          ev.stopPropagation();
          this._drop(ev, group, item.path);
        }}
      >
        <button
          class="label"
          ?disabled=${this.disabled}
          aria-pressed=${selected ? "true" : "false"}
          @click=${() => (this._selected = selected ? null : { path: item.path, group })}
        >
          <ha-icon .icon=${item.icon}></ha-icon>
          <span>${item.title}</span>
          ${item.missing ? html`<em>${this.t("missing")}</em>` : nothing}
        </button>
        ${selected && group !== UNGROUPED
          ? html`
              <button
                class="icon"
                title=${this.t("move_left")}
                ?disabled=${position === 0}
                @click=${() => this._shift(item.path, group, -1)}
              >
                <ha-icon icon="mdi:chevron-left"></ha-icon>
              </button>
              <button
                class="icon"
                title=${this.t("move_right")}
                ?disabled=${position === panels.length - 1}
                @click=${() => this._shift(item.path, group, 1)}
              >
                <ha-icon icon="mdi:chevron-right"></ha-icon>
              </button>
            `
          : nothing}
        ${this.canHide
          ? html`<button
              class="icon"
              title=${hidden ? this.t("show") : this.t("hide")}
              ?disabled=${this.disabled}
              @click=${() => this._toggleHidden(item.path)}
            >
              <ha-icon icon=${hidden ? "mdi:eye-off-outline" : "mdi:eye-outline"}></ha-icon>
            </button>`
          : nothing}
      </div>
    `;
  }

  _dragOver(ev, group) {
    if (this.disabled) return;
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
    this._dropTarget = group;
  }

  _drop(ev, group, before) {
    if (this.disabled) return;
    ev.preventDefault();
    this._dropTarget = null;
    const path = ev.dataTransfer.getData("text/plain");
    if (path && path !== before) this._move(path, group, before);
  }

  _moveSelected(group) {
    const { path } = this._selected;
    this._selected = { path, group };
    this._move(path, group);
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .zone {
      border: 1px dashed var(--divider-color);
      border-radius: 12px;
      padding: 10px;
      transition: background-color 120ms;
    }

    .zone.over {
      background: color-mix(in srgb, var(--primary-color) 10%, transparent);
      border-color: var(--primary-color);
    }

    .title {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 8px;
      flex-wrap: wrap;
    }

    .title.confirm span {
      flex: 1;
    }

    .title input {
      flex: 1;
      min-width: 0;
      font: inherit;
      font-weight: 600;
      padding: 6px 8px;
      border-radius: 8px;
      border: 1px solid var(--divider-color);
      background: var(--card-background-color);
      color: var(--primary-text-color);
    }

    .hint {
      color: var(--secondary-text-color);
      font-size: 13px;
    }

    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .chip {
      display: inline-flex;
      align-items: center;
      border-radius: 999px;
      background: var(--secondary-background-color);
      border: 1px solid transparent;
      cursor: grab;
      max-width: 100%;
    }

    .chip.selected {
      border-color: var(--primary-color);
      background: color-mix(in srgb, var(--primary-color) 14%, var(--card-background-color));
    }

    .chip.hidden .label {
      opacity: 0.45;
      text-decoration: line-through;
    }

    button {
      font: inherit;
      color: inherit;
      background: none;
      border: 0;
      cursor: pointer;
    }

    button:disabled {
      cursor: default;
      opacity: 0.4;
    }

    .label {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 4px 6px 10px;
      min-width: 0;
    }

    .label span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .label em {
      font-size: 12px;
      color: var(--error-color);
    }

    .label ha-icon,
    .icon ha-icon {
      --mdc-icon-size: 18px;
    }

    .icon {
      display: inline-flex;
      padding: 6px;
      border-radius: 999px;
    }

    .icon:hover:not(:disabled) {
      background: color-mix(in srgb, var(--primary-text-color) 8%, transparent);
    }

    .danger {
      color: var(--error-color);
      font-weight: 600;
      padding: 6px 10px;
    }

    .confirm button:not(.danger) {
      padding: 6px 10px;
    }

    .here,
    .add {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      margin-top: 8px;
      padding: 6px 12px;
      border-radius: 999px;
      color: var(--primary-color);
      font-weight: 500;
    }

    .here {
      background: color-mix(in srgb, var(--primary-color) 12%, transparent);
    }

    .add {
      align-self: flex-start;
      margin-top: 0;
    }
  `;
}

if (!customElements.get("ss-groups-editor")) {
  customElements.define("ss-groups-editor", GroupsEditor);
}
