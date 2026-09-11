import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export interface PriceRow {
  label: string;
  value: string;
}

@Component({
  selector: 'app-booking-summary',
  standalone: true,
  templateUrl: './booking-summary.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingSummaryComponent {
  readonly imageUrl = input.required<string>();
  readonly imageAlt = input('');
  readonly subtitle = input('');
  readonly title = input.required<string>();
  readonly rating = input(0);
  readonly ratingLabel = input('Very Good');
  readonly reviewCount = input(0);
  readonly priceRows = input<PriceRow[]>([]);
  readonly total = input('$0');
}
