import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, signal } from '@angular/core';

@Component({
  selector: 'app-hotel-results-toolbar',
  standalone: true,
  templateUrl: './hotel-results-toolbar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HotelResultsToolbarComponent {
  @Input() resultCount = 0;
  @Input() totalPlaces = 0;
  @Input() selectedSort = 'Recommended';
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
}
