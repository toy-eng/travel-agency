import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-hotelbookingdetails-room-summary',
  standalone: true,
  templateUrl: './room-summary.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomSummaryComponent {
  readonly roomName = signal('Superior room - 1 double bed or 2 twin beds');
  readonly pricePerNight = signal('$240');
  readonly hotelName = signal('CVK Park Bosphorus Hotel Istanbul');
  readonly hotelLogo = signal('CVK');
  readonly hotelLogoSub = signal('Park Bosphorus Hotel');
  readonly hotelLogoCity = signal('Istanbul');
  readonly address = signal('Gümüşsuyu Mah. İnönü Cad. No:8, Istanbul 34437');
  readonly checkInDate = signal('Thursday, Dec 8');
  readonly checkOutDate = signal('Friday, Dec 9');
}
