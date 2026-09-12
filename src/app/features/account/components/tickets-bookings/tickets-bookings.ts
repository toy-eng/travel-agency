import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TabBarComponent, TabItem } from '../tab-bar/tab-bar';
import { FlightTicket, FlightTicketCardComponent } from './components/flight-ticket-card/flight-ticket-card';
import { StayTicket, StayTicketCardComponent } from './components/stay-ticket-card/stay-ticket-card';

export type BookingType = 'flights' | 'stays';

@Component({
  selector: 'app-tickets-bookings',
  imports: [FormsModule, TabBarComponent, FlightTicketCardComponent, StayTicketCardComponent],
  templateUrl: './tickets-bookings.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketsBookingsComponent {
  readonly activeType = signal<BookingType>('flights');
  readonly sort = signal('Upcoming');

  readonly sortOptions = ['Upcoming', 'Completed', 'Cancelled'];

  readonly bookingTabs: TabItem[] = [
    { id: 'flights', label: 'Flights', icon: 'plane' },
    { id: 'stays', label: 'Stays', icon: 'bed' },
  ];

  readonly flightTickets: FlightTicket[] = [
    {
      airline: 'Emirates',
      departureLabel: 'Newark(EWR)',
      departureTime: '12:00 pm',
      arrivalLabel: 'Newark(EWR)',
      arrivalTime: '6:00 pm',
      date: '12-11-22',
      flightTime: 'Newark(EWR)',
      gate: 'A12',
      seat: '128',
    },
    {
      airline: 'Emirates',
      departureLabel: 'Newark(EWR)',
      departureTime: '12:00 pm',
      arrivalLabel: 'Newark(EWR)',
      arrivalTime: '6:00 pm',
      date: '12-11-22',
      flightTime: 'Newark(EWR)',
      gate: 'A12',
      seat: '128',
    },
    {
      airline: 'Emirates',
      departureLabel: 'Newark(EWR)',
      departureTime: '12:00 pm',
      arrivalLabel: 'Newark(EWR)',
      arrivalTime: '6:00 pm',
      date: '12-11-22',
      flightTime: 'Newark(EWR)',
      gate: 'A12',
      seat: '128',
    },
  ];

  readonly stayTickets: StayTicket[] = [
    {
      checkInDate: 'Thu, Dec 8',
      checkOutDate: 'Fri, Dec 9',
      checkInTime: '12:00pm',
      checkOutTime: '11:30am',
      roomNumber: 'On arrival',
    },
    {
      checkInDate: 'Thu, Dec 8',
      checkOutDate: 'Fri, Dec 9',
      checkInTime: '12:00pm',
      checkOutTime: '11:30am',
      roomNumber: 'On arrival',
    },
    {
      checkInDate: 'Thu, Dec 8',
      checkOutDate: 'Fri, Dec 9',
      checkInTime: '12:00pm',
      checkOutTime: '11:30am',
      roomNumber: 'On arrival',
    },
  ];

  setBookingType(type: string): void {
    this.activeType.set(type as BookingType);
  }
}
