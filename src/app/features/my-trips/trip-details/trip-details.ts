import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { TripPlannerService } from '../../../core/services/trip-planner/trip-planner';
import type {
  BookedTrip,
  FlightOption,
  StayOption,
  TripAttraction,
  TripLeg,
} from '../../../core/models/trip-planner';

@Component({
  selector: 'app-trip-details',
  imports: [RouterLink],
  templateUrl: './trip-details.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TripDetails {
  readonly service = inject(TripPlannerService);
  private readonly route = inject(ActivatedRoute);
  private readonly tripId = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('tripId') ?? '')),
    { initialValue: this.route.snapshot.paramMap.get('tripId') ?? '' },
  );

  readonly trip = computed(() =>
    this.service.bookedTrips().find((item) => item.id === this.tripId()),
  );

  flightFor(trip: BookedTrip, leg: TripLeg): FlightOption | undefined {
    return trip.flights[leg.id];
  }

  stayFor(trip: BookedTrip, leg: TripLeg): StayOption | undefined {
    return trip.stays[leg.id];
  }

  attractionsFor(trip: BookedTrip, leg: TripLeg): TripAttraction[] {
    const city = this.service.airportCity(leg.to).toLowerCase();
    return trip.attractions.filter((attraction) => attraction.city.toLowerCase() === city);
  }

  legLabel(leg: TripLeg): string {
    return this.service.legLabel(leg);
  }

  tripNights(trip: BookedTrip): number {
    return trip.legs.reduce((total, leg) => total + leg.nights, 0);
  }

  tripDateRange(trip: BookedTrip): string {
    const first = trip.legs[0]?.departDate;
    const last = trip.legs[trip.legs.length - 1]?.departDate;
    if (!first || !last) {
      return 'Dates to be confirmed';
    }
    return first === last
      ? this.formatDate(first)
      : `${this.formatDate(first)} - ${this.formatDate(last)}`;
  }

  formatDate(date: string): string {
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      timeZone: 'UTC',
    }).format(new Date(`${date}T12:00:00Z`));
  }

  formatLongDate(date: string): string {
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC',
    }).format(new Date(`${date}T12:00:00Z`));
  }
}
