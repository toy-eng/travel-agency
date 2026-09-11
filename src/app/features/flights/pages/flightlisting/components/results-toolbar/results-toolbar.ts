import { Component, EventEmitter, Input, Output, signal } from '@angular/core';

@Component({
  selector: 'app-flightlisting-results-toolbar',
  standalone: true,
  templateUrl: './results-toolbar.html',
})
export class ResultsToolbarComponent {
  @Input() resultCount = 0;
  @Input() totalPlaces = 0;
  @Input() selectedSort = 'Cheapest';
  @Input() secondarySort = 'Recommended';
  @Input() sortOptions: string[] = [];

  readonly secondarySortOpen = signal(false);
  readonly activeSecondarySort = signal('Recommended');

  @Output() sortChange = new EventEmitter<string>();

  toggleSecondarySort() {
    this.secondarySortOpen.update((isOpen) => !isOpen);
  }

  selectSecondarySort(option: string) {
    this.activeSecondarySort.set(option);
    this.secondarySortOpen.set(false);
    this.sortChange.emit(option);
  }

  onSortChange(valueOrEvent: string | Event) {
    const value = typeof valueOrEvent === 'string'
      ? valueOrEvent
      : (valueOrEvent.target as HTMLSelectElement).value;

    this.sortChange.emit(value);
  }
}
