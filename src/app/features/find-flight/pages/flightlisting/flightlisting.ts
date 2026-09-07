import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatingFieldComponent } from '../../../../shared/components/floating-field/floating-field';
import { FilterSidebarComponent } from './components/filter-sidebar/filter-sidebar';
import { FlightCardComponent } from './components/flight-card/flight-card';
import { ResultsToolbarComponent } from './components/results-toolbar/results-toolbar';
import { ShowMoreComponent } from './components/show-more/show-more';
import { DestinationsSectionComponent } from '../../../home/components/destinations-section/destinations-section';
import { destinationsMock } from '../../../../shared/data/destinations.mock';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal';

@Component({
  selector: 'app-flightlisting',
  imports: [
    FormsModule,
    FloatingFieldComponent,
    FilterSidebarComponent,
    ResultsToolbarComponent,
    FlightCardComponent,
    ShowMoreComponent,
    DestinationsSectionComponent,
    ScrollRevealDirective,
  ],
  templateUrl: './flightlisting.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Flightlisting {
  readonly destinations = destinationsMock;
  readonly fromLocation = signal('Lahore');
  readonly toLocation = signal('Karachi');
  readonly tripType = signal('Return');
  readonly departReturn = signal('07 Nov 22 - 13 Nov 22');
  readonly passengerClass = signal('1 Passenger, Economy');

  readonly sortOptions = ['Cheapest', 'Best', 'Quickest', 'Recommended'];
  readonly selectedSort = 'Cheapest';
  readonly flights = [
    {
      airline: 'Emirates',
      flightCode: 'EK 205',
      departureTime: '9:50 AM',
      arrivalTime: '12:10 PM',
      departureLabel: 'LHE',
      arrivalLabel: 'DXB',
      duration: '2h 20m',
      aircraft: 'A330',
      price: '$420',
      rating: 4.8,
      badge: 'Best value',
      imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=900&q=80',
      isFeatured: true,
    },
    {
      airline: 'Qatar Airways',
      flightCode: 'QR 449',
      departureTime: '11:35 AM',
      arrivalTime: '2:10 PM',
      departureLabel: 'LHE',
      arrivalLabel: 'DOH',
      duration: '2h 35m',
      aircraft: 'A321',
      price: '$470',
      rating: 4.9,
      badge: 'Popular',
      imageUrl: 'https://images.unsplash.com/photo-1529074963764-98f45c47344b?auto=format&fit=crop&w=900&q=80',
      isFeatured: false,
    },
    {
      airline: 'Air Arabia',
      flightCode: 'G9 206',
      departureTime: '7:15 AM',
      arrivalTime: '10:05 AM',
      departureLabel: 'LHE',
      arrivalLabel: 'SHJ',
      duration: '2h 50m',
      aircraft: 'A320',
      price: '$390',
      rating: 4.7,
      badge: 'Great fare',
      imageUrl: 'https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?auto=format&fit=crop&w=900&q=80',
      isFeatured: false,
    },
  ];

  onSortChange(value: string) {
    // Sorting logic can be expanded later; kept as a UI hook for the toolbar.
    console.log('Sort changed to:', value);
  }
}
