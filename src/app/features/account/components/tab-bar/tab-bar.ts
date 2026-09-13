import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  ElementRef,
  OnDestroy,
  afterRenderEffect,
  computed,
  inject,
  input,
  output,
  signal,
  viewChildren,
} from '@angular/core';

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
export class TabBarComponent implements AfterViewInit, OnDestroy {
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

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly document = inject(DOCUMENT);
  private readonly tabButtons = viewChildren<ElementRef<HTMLButtonElement>>('tabButton');
  private resizeObserver: ResizeObserver | null = null;

  /**
   * The underline is positioned from real measurements instead of percentages: the tabs are
   * content-sized (so their labels never wrap), which means they are not all the same width.
   */
  readonly indicatorLeft = signal(0);
  readonly indicatorWidth = signal(0);

  constructor() {
    // Re-measure after any render that could move or resize the active tab.
    afterRenderEffect(() => {
      this.activeIndex();
      this.tabButtons();
      this.measureIndicator();
    });
  }

  ngAfterViewInit(): void {
    const view = this.document.defaultView;
    if (!view || typeof ResizeObserver === 'undefined') {
      return;
    }

    this.resizeObserver = new view.ResizeObserver(() => this.measureIndicator());
    this.resizeObserver.observe(this.host.nativeElement);
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }

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

  private measureIndicator(): void {
    const active = this.tabButtons()[this.activeIndex()]?.nativeElement;
    if (!active || !active.offsetWidth) {
      return;
    }

    this.indicatorLeft.set(active.offsetLeft);
    this.indicatorWidth.set(active.offsetWidth);
  }
}
