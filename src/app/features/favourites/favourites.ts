import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

import {
  FavouriteFlight,
  FavouriteFlightCardComponent,
} from '../../shared/components/favourite-flight-card/favourite-flight-card';
import {
  FavouritePlace,
  FavouritePlaceCardComponent,
} from '../../shared/components/favourite-place-card/favourite-place-card';
import {
  FavouritesTab,
  FavouritesTabsComponent,
} from './components/favourites-tabs/favourites-tabs';

@Component({
  selector: 'app-favourites-page',
  imports: [
    FavouritesTabsComponent,
    FavouritePlaceCardComponent,
    FavouriteFlightCardComponent,
  ],
  templateUrl: './favourites.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavouritesPage {
  readonly activeTab = signal<FavouritesTab>('places');

  readonly places = signal<FavouritePlace[]>([
    {
      name: 'CVK Park Bosphorus Hotel Istanbul',
      location: 'Gümüşsuyu Mah. İnönü Cad. No:8, Istanbul 34437',
      pricePerNight: '$240',
      priceNote: 'excl. tax',
      imageUrl:
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80',
      imageCount: 9,
      rating: 4.2,
      ratingLabel: 'Very Good',
      reviewCount: 371,
      stars: 5,
      category: '5 Star Hotel',
      amenities: '20+ Amenities',
    },
    {
      name: 'Hagia Sophia Mansions Istanbul',
      location: 'Tayahütop Cd. No:34, Istanbul 34122',
      pricePerNight: '$310',
      priceNote: 'excl. tax',
      imageUrl:
        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80',
      imageCount: 12,
      rating: 4.9,
      ratingLabel: 'Excellent',
      reviewCount: 1923,
      stars: 5,
      category: '5 Star Hotel',
      amenities: '24+ Amenities',
    },
    {
      name: 'The Ritz-Carlton Istanbul',
      location: 'Süzer Plaza, Elbi Cd. No:6, Istanbul 34367',
      pricePerNight: '$450',
      priceNote: 'excl. tax',
      imageUrl:
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80',
      imageCount: 15,
      rating: 4.7,
      ratingLabel: 'Very Good',
      reviewCount: 3102,
      stars: 5,
      category: '5 Star Hotel',
      amenities: '18+ Amenities',
    },
  ]);

  readonly flights = signal<FavouriteFlight[]>([
    {
      airline: 'Emirates',
      flightCode: 'EK 205',
      departureTime: '9:50 AM',
      arrivalTime: '12:10 PM',
      departureLabel: 'LHE',
      arrivalLabel: 'DXB',
      duration: '2h 20m',
      aircraft: 'Airbus A330',
      price: '$420',
      rating: 4.8,
      reviewCount: 54,
    },
    {
      airline: 'Qatar Airways',
      flightCode: 'QR 628',
      departureTime: '1:15 PM',
      arrivalTime: '6:40 PM',
      departureLabel: 'IST',
      arrivalLabel: 'DOH',
      duration: '5h 25m',
      aircraft: 'Boeing 787',
      price: '$365',
      rating: 4.6,
      reviewCount: 38,
    },
  ]);

  readonly placeCount = computed(() => this.places().length);
  readonly flightCount = computed(() => this.flights().length);

  setTab(tab: FavouritesTab): void {
    this.activeTab.set(tab);
  }

  removePlace(name: string): void {
    this.places.update((places) => places.filter((place) => place.name !== name));
  }

  removeFlight(flightCode: string): void {
    this.flights.update((flights) =>
      flights.filter((flight) => flight.flightCode !== flightCode),
    );
  }
}
