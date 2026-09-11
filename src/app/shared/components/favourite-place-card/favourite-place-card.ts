import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface FavouritePlace {
  name: string;
  location: string;
  pricePerNight: string;
  priceNote: string;
  imageUrl: string;
  imageCount: number;
  rating: number;
  ratingLabel: string;
  reviewCount: number;
  stars: number;
  category: string;
  amenities: string;
}

@Component({
  selector: 'app-favourite-place-card',
  imports: [RouterLink],
  templateUrl: './favourite-place-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavouritePlaceCardComponent {
  readonly name = input.required<string>();
  readonly location = input.required<string>();
  readonly pricePerNight = input.required<string>();
  readonly priceNote = input('excl. tax');
  readonly imageUrl = input('');
  readonly imageCount = input(0);
  readonly rating = input(0);
  readonly ratingLabel = input('Very Good');
  readonly reviewCount = input(0);
  readonly stars = input(5);
  readonly category = input('5 Star Hotel');
  readonly amenities = input('20+ Amenities');
  readonly remove = output<void>();

  readonly starList = computed(() =>
    Array.from({ length: this.stars() }, (_, index) => index),
  );
}
