import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-flightdetails-itinerary-card',
  standalone: true,
  templateUrl: './itinerary-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItineraryCardComponent {
  readonly date = input('Return Wed, Dec 8');
  readonly duration = input('2h 28m');
  readonly departureAirport = input('Newark(EWR)');
  readonly arrivalAirport = input('Newark(EWR)');
}