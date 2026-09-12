import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

export type FavouritesTab = 'flights' | 'places';

@Component({
  selector: 'app-favourites-tabs',
  templateUrl: './favourites-tabs.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavouritesTabsComponent {
  readonly activeTab = input.required<FavouritesTab>();
  readonly flightCount = input(0);
  readonly placeCount = input(0);
  readonly tabChange = output<FavouritesTab>();

  protected onKeydown(event: KeyboardEvent): void {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
      return;
    }

    event.preventDefault();
    this.tabChange.emit(this.activeTab() === 'flights' ? 'places' : 'flights');
  }
}
