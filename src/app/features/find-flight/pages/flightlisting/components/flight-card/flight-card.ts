import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-flightlisting-flight-card',
  standalone: true,
  templateUrl: './flight-card.html',
})
export class FlightCardComponent {
  @Input() airline = 'Emirates';
  @Input() flightCode = 'EK 205';
  @Input() departureTime = '9:50 AM';
  @Input() arrivalTime = '12:10 PM';
  @Input() departureLabel = 'LHE';
  @Input() arrivalLabel = 'DXB';
  @Input() duration = '2h 20m';
  @Input() aircraft = 'A330';
  @Input() price = '$420';
  @Input() rating = 4.8;
  @Input() badge = 'Best value';
  @Input() imageUrl = '/flight-hotel-card.jpg';
  @Input() isFeatured = false;
}
