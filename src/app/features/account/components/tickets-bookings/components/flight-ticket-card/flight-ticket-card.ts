import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

export interface FlightTicket {
  airline: string;
  departureLabel: string;
  departureTime: string;
  arrivalLabel: string;
  arrivalTime: string;
  date: string;
  flightTime: string;
  gate: string;
  seat: string;
}

@Component({
  selector: 'app-flight-ticket-card',
  templateUrl: './flight-ticket-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlightTicketCardComponent {
  readonly ticket = input.required<FlightTicket>();

  readonly download = output<void>();
  readonly open = output<void>();
}
