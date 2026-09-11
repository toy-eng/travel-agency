import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Room {
  name: string;
  price: string;
  image: string;
}

@Component({
  selector: 'app-hoteldetails-rooms',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './available-rooms.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvailableRoomsComponent {
  readonly rooms = signal<Room[]>([
    { name: 'Superior room - 1 double bed or 2 twin beds', price: '$240', image: '/hotelsImg.jpg' },
    { name: 'Superior room - City view - 1 double bed or 2 twin beds', price: '$280', image: '/hotelsImg.jpg' },
    { name: 'Superior room - City view - 1 double bed or 2 twin beds', price: '$320', image: '/hotelsImg.jpg' },
    { name: 'Superior room - City view - 1 double bed or 2 twin beds', price: '$350', image: '/hotelsImg.jpg' },
  ]);
}
