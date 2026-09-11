import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterSidebarComponent } from './components/hotel-filter-sidebar/hotel-filter-sidebar';
import { HotelCardComponent } from './components/hotel-card/hotel-card';
import { HotelResultsToolbarComponent } from './components/hotel-results-toolbar/hotel-results-toolbar';

interface Hotel {
  name: string;
  location: string;
  pricePerNight: string;
  priceNote: string;
  imageUrl: string;
  imageCount: number;
  rating: number;
  reviewCount: number;
}

@Component({
  selector: 'app-hotellisting',
  standalone: true,
  imports: [FormsModule, FilterSidebarComponent, HotelCardComponent, HotelResultsToolbarComponent],
  templateUrl: './hotellisting.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hotellisting {
  readonly destination = signal('Istanbul, Turkey');
  readonly checkIn = signal('Fri 12/2');
  readonly checkOut = signal('Sun 12/4');
  readonly guests = signal('1 room, 2 guests');

  readonly activeCategory = signal('Hotels');
  readonly categories = [
    { name: 'Hotels', count: 257 },
    { name: 'Motels', count: 51 },
    { name: 'Resorts', count: 72 },
  ];

  readonly sortOptions = ['Cheapest', 'Best', 'Recommended'];
  readonly selectedSort = 'Recommended';

  readonly hotels: Hotel[] = [
    {
      name: 'CVK Park Bosphorus Hotel Istanbul',
      location: 'Gümüşsuyu Mah. İnönü Cad. No:8, Istanbul 34437',
      pricePerNight: '$240',
      priceNote: 'excl. tax',
      imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80',
      imageCount: 9,
      rating: 4.8,
      reviewCount: 2847,
    },
    {
      name: 'Hagia Sophia Mansions Istanbul',
      location: 'Tayahütop Cd. No:34, Istanbul 34122',
      pricePerNight: '$310',
      priceNote: 'excl. tax',
      imageUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80',
      imageCount: 12,
      rating: 4.9,
      reviewCount: 1923,
    },
    {
      name: 'The Ritz-Carlton Istanbul',
      location: 'Süzer Plaza, Elbi Cd. No:6, Istanbul 34367',
      pricePerNight: '$450',
      priceNote: 'excl. tax',
      imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80',
      imageCount: 15,
      rating: 4.7,
      reviewCount: 3102,
    },
    {
      name: 'Four Seasons Hotel Istanbul',
      official: true,
      location: 'Tevkifhane Sk. No:1, Istanbul 34122',
      pricePerNight: '$520',
      priceNote: 'excl. tax',
      imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=900&q=80',
      imageCount: 20,
      rating: 4.9,
      reviewCount: 4215,
    },
  ] as Hotel[];

  onSortChange(value: string): void {
    console.log('Sort changed:', value);
  }
}
