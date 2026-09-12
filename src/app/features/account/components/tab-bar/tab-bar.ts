import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

export interface TabItem {
  id: string;
  label: string;
  /** Optional leading glyph, rendered from a small built-in set. */
  icon?: 'plane' | 'bed';
}

@Component({
  selector: 'app-tab-bar',
  templateUrl: './tab-bar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabBarComponent {
  readonly tabs = input.required<TabItem[]>();
  readonly activeTab = input.required<string>();
  readonly ariaLabel = input('Sections');
  /** Unique prefix for the generated tab/panel ids, e.g. `account`. */
  readonly idPrefix = input.required<string>();
  readonly tabChange = output<string>();

  readonly activeIndex = computed(() => {
    const idx = this.tabs().findIndex((tab) => tab.id === this.activeTab());
    return idx >= 0 ? idx : 0;
  });

  onKeydown(event: KeyboardEvent): void {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
      return;
    }

    event.preventDefault();
    const tabs = this.tabs();
    const current = tabs.findIndex((tab) => tab.id === this.activeTab());
    const offset = event.key === 'ArrowRight' ? 1 : -1;
    const next = (current + offset + tabs.length) % tabs.length;
    this.tabChange.emit(tabs[next].id);
  }
}
