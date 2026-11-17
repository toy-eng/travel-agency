import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import { TripPlannerService } from '../../../../core/services/trip-planner/trip-planner';
import { airports } from '../../home.data';
import type { CuratedRoute, JourneyLeg, TripMode } from '../../home.models';

const legTransition = trigger('legTransition', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(-10px) scaleY(0.96)' }),
    animate(
      '320ms cubic-bezier(0.22, 1, 0.36, 1)',
      style({ opacity: 1, transform: 'translateY(0) scaleY(1)' }),
    ),
  ]),
  transition(':leave', [
    animate(
      '220ms cubic-bezier(0.4, 0, 1, 1)',
      style({ opacity: 0, transform: 'translateY(-8px) scaleY(0.96)' }),
    ),
  ]),
]);

@Component({
  selector: 'app-journey-builder',
  templateUrl: './journey-builder.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [legTransition],
})
export class JourneyBuilderComponent {
  private readonly router = inject(Router);
  private readonly tripPlanner = inject(TripPlannerService);

  readonly experienceCount = input(0);

  readonly airports = airports;
  readonly tripModes: readonly TripMode[] = ['Multi-City', 'Round Trip', 'One Way'];
  readonly stayOptions = [0, 1, 2, 3, 4, 5, 7, 10, 14];
  readonly passengerOptions = ['1 Adult', '2 Adults', '2 Adults, 1 Child', 'Family of 4'];
  readonly cabinOptions = ['Economy', 'Premium Economy', 'Business', 'First'];

  readonly tripMode = signal<TripMode>('Multi-City');
  readonly passengers = signal('2 Adults');
  readonly cabinClass = signal('Economy');
  readonly builtItinerary = signal<string | null>(null);

  private nextLegId = 2;

  readonly legs = signal<JourneyLeg[]>([
    { id: 1, from: 'LOS', to: 'CGK', departDate: '2027-03-12', nights: 7 },
  ]);

  readonly totalNights = computed(() =>
    this.legs().reduce((total, leg) => total + Number(leg.nights), 0),
  );

  readonly itinerarySummary = computed(() => {
    const stops = new Set(this.legs().map((leg) => leg.to)).size;
    const stopLabel = stops === 1 ? 'stop' : 'stops';
    return `${stops} ${stopLabel} · ${this.totalNights()} nights`;
  });

  setMode(mode: TripMode): void {
    this.tripMode.set(mode);
    this.builtItinerary.set(null);
  }

  updateLeg(index: number, field: keyof JourneyLeg, value: string | number): void {
    this.legs.update((legs) => {
      const updated = legs.map((leg, legIndex) =>
        legIndex === index ? { ...leg, [field]: value } : leg,
      );

      if (field === 'to' && updated[index + 1]) {
        updated[index + 1] = { ...updated[index + 1], from: String(value) };
      }

      if (field === 'nights' && updated[index + 1]) {
        updated[index + 1] = {
          ...updated[index + 1],
          departDate: this.addDays(updated[index].departDate, Number(value)),
        };
      }

      if (field === 'departDate' && updated[index + 1]) {
        updated[index + 1] = {
          ...updated[index + 1],
          departDate: this.addDays(String(value), updated[index].nights),
        };
      }

      return updated;
    });
    this.builtItinerary.set(null);
  }

  addStop(): void {
    const legs = this.legs();
    const lastLeg = legs[legs.length - 1];
    const usedDestinations = new Set(legs.map((leg) => leg.to));
    const nextAirport =
      this.airports.find(
        (airport) =>
          airport.code !== lastLeg.to &&
          airport.code !== legs[0]?.from &&
          !usedDestinations.has(airport.code),
      ) ?? this.airports.find((airport) => airport.code !== lastLeg.to);

    if (!nextAirport) {
      return;
    }

    this.legs.set([
      ...legs,
      {
        id: this.nextLegId++,
        from: lastLeg.to,
        to: nextAirport.code,
        departDate: this.addDays(lastLeg.departDate, Math.max(lastLeg.nights, 1)),
        nights: 4,
      },
    ]);
    this.builtItinerary.set(null);
  }

  removeLeg(index: number): void {
    if (this.legs().length === 1) {
      return;
    }

    const remaining = this.legs().filter((_, legIndex) => legIndex !== index);
    this.legs.set(
      remaining.map((leg, legIndex) =>
        legIndex === 0 ? leg : { ...leg, from: remaining[legIndex - 1].to },
      ),
    );
    this.builtItinerary.set(null);
  }

  applyRoute(route: CuratedRoute): void {
    this.tripMode.set('Multi-City');
    this.nextLegId = route.legs.length + 1;
    this.legs.set(
      route.legs.map((leg, index) => ({
        id: index + 1,
        ...leg,
      })),
    );
    this.builtItinerary.set(null);
  }

  buildItinerary(): void {
    this.tripPlanner.setItinerary(
      this.legs().map(({ from, to, departDate, nights }) => ({
        from,
        to,
        departDate,
        nights: Number(nights),
      })),
      this.passengers(),
      this.cabinClass(),
    );
    void this.router.navigate(['/plan-trip']);

    const firstLeg = this.legs()[0];
    const lastLeg = this.legs()[this.legs().length - 1];
    const experienceNote = this.experienceCount()
      ? ` ${this.experienceCount()} featured experience${this.experienceCount() === 1 ? '' : 's'} included.`
      : '';

    this.builtItinerary.set(
      `${this.airportCity(firstLeg.from)} to ${this.airportCity(lastLeg.to)} · ${this.itinerarySummary()} for ${this.passengers()} in ${this.cabinClass()}.${experienceNote}`,
    );
  }

  airportLabel(code: string): string {
    const airport = this.airports.find((item) => item.code === code);
    return airport ? `${airport.city} (${airport.code})` : code;
  }

  airportCity(code: string): string {
    return this.airports.find((item) => item.code === code)?.city ?? code;
  }

  hotelWindow(leg: JourneyLeg): string {
    if (!leg.departDate || Number(leg.nights) === 0) {
      return 'No hotel needed for this final arrival';
    }

    const start = new Date(`${leg.departDate}T12:00:00Z`);
    const end = this.addDays(leg.departDate, Number(leg.nights));
    return `${this.formatDate(start)} – ${this.formatDate(new Date(`${end}T12:00:00Z`))}`;
  }

  private addDays(date: string, days: number): string {
    const next = new Date(`${date}T12:00:00Z`);
    next.setUTCDate(next.getUTCDate() + days);
    return next.toISOString().slice(0, 10);
  }

  private formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      timeZone: 'UTC',
    }).format(date);
  }
}
