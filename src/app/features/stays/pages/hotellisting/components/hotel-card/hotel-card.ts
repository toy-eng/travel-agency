import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hotel-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './hotel-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HotelCardComponent {
  readonly name = input.required<string>();
  readonly location = input.required<string>();
  readonly pricePerNight = input.required<string>();
  readonly priceNote = input('excl. tax');
  readonly imageUrl = input('/flight-hotel-card.jpg');
  readonly imageCount = input(0);
  readonly rating = input(0);
  readonly reviewCount = input(0);
}
