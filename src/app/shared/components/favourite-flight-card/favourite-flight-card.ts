import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface FavouriteFlight {
  airline: string;
  flightCode: string;
  departureTime: string;
  arrivalTime: string;
  departureLabel: string;
  arrivalLabel: string;
  duration: string;
  aircraft: string;
  price: string;
  rating: number;
  reviewCount: number;
}

@Component({
  selector: 'app-favourite-flight-card',
  imports: [RouterLink],
  templateUrl: './favourite-flight-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavouriteFlightCardComponent {
  readonly airline = input.required<string>();
  readonly flightCode = input('');
  readonly departureTime = input('');
  readonly arrivalTime = input('');
  readonly departureLabel = input('');
  readonly arrivalLabel = input('');
  readonly duration = input('');
  readonly aircraft = input('');
  readonly price = input.required<string>();
  readonly rating = input(4.5);
  readonly reviewCount = input(0);
  readonly remove = output<void>();

  readonly airlineInitial = computed(() => this.airline().charAt(0));
}
