import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-hoteldetails-overview',
  standalone: true,
  templateUrl: './hotel-overview.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HotelOverviewComponent {
  readonly rating = signal(4.2);
  readonly ratingLabel = signal('Very good');
  readonly reviewCount = signal(371);

  readonly overview =
    'Located in Taksim Gmsuyu, the heart of Istanbul, the CVK Park Bosphorus Hotel Istanbul has risen from the ashes of the historic Park Hotel, which also served as Foreign Affairs Palace 120 years ago and is hosting its guests by assuming this hospitality mission. With its 452 luxurious rooms and suites, 8500 m2 SPA and fitness area, 18 meeting rooms including 4 dividable ones and 3 terraces with Bosphorus view, Istanbul s largest terrace with Bosphorus view (4500 m2) and latest technology infrastructure, CVK Park Bosphorus Hotel Istanbul is destined to be the popular attraction point of the city. Room and suite categories at various sizes with city and Bosphorus view, as well as 68 separate luxury suites, are offered to its special guests as a wide variety of selection.';

  readonly tags = [
    { label: 'Near park', icon: 'tree' },
    { label: 'Near nightlife', icon: 'moon' },
    { label: 'Near theater', icon: 'theater' },
    { label: 'Clean Hotel', icon: 'clean' },
  ];
}
