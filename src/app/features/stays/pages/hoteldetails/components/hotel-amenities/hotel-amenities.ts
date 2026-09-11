import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

interface Amenity {
  label: string;
  icon: string;
}

@Component({
  selector: 'app-hoteldetails-amenities',
  standalone: true,
  templateUrl: './hotel-amenities.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HotelAmenitiesComponent {
  readonly amenities = signal<Amenity[]>([
    { label: 'Outdoor pool', icon: 'pool' },
    { label: 'Fitness center', icon: 'fitness' },
    { label: 'Indoor pool', icon: 'pool' },
    { label: 'Bar/Lounge', icon: 'bar' },
    { label: 'Spa and wellness center', icon: 'spa' },
    { label: 'Free Wi-Fi', icon: 'wifi' },
    { label: 'Restaurant', icon: 'restaurant' },
    { label: 'Tea/coffee machine', icon: 'coffee' },
    { label: 'Room service', icon: 'room' },
  ]);
}
