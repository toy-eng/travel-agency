import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hoteldetails-summary',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './hotel-summary.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HotelSummaryComponent {
  readonly hotelName = signal('CVK Park Bosphorus Hotel Istanbul');
  readonly address = signal('Gümüşsuyu Mah. İnönü Cad. No:8, Istanbul 34437');
  readonly category = signal('5 Star Hotel');
  readonly rating = signal(4.2);
  readonly reviewCount = signal(371);
  readonly pricePerNight = signal('$240');
  readonly stars = [1, 2, 3, 4, 5];

  readonly galleryImages = [
    '/hotelsImg.jpg',
    '/hotelsImg.jpg',
    '/hotelsImg.jpg',
    '/hotelsImg.jpg',
  ];

  readonly saved = signal(false);
}
