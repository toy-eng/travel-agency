import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  computed,
  inject,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';
import { TripPlannerService } from '../../core/services/trip-planner/trip-planner';
import { gsap } from '../../shared/motion/gsap';
import { prefersReducedMotion } from '../../shared/motion/prefers-reduced-motion';
import type {
  BookedTrip,
  FlightOption,
  StayOption,
  TripAttraction,
  TripLeg,
} from '../../core/models/trip-planner';

type TripsTab = 'upcoming' | 'draft' | 'past';

const tabMotion = trigger('tabMotion', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(12px)' }),
    animate('300ms cubic-bezier(0.22, 1, 0.36, 1)', style({ opacity: 1, transform: 'none' })),
  ]),
]);

@Component({
  selector: 'app-my-trips',
  imports: [RouterLink],
  templateUrl: './my-trips.html',
  styleUrl: './my-trips.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [tabMotion],
})
export class MyTrips implements AfterViewInit, OnDestroy {
  readonly service = inject(TripPlannerService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly reduceMotion = prefersReducedMotion();
  private motionContext: gsap.Context | null = null;
  private toastTimer: ReturnType<typeof setTimeout> | null = null;

  readonly tabs: { id: TripsTab; label: string }[] = [
    { id: 'upcoming', label: 'Upcoming Trips' },
    { id: 'draft', label: 'Draft Itineraries' },
    { id: 'past', label: 'Past History' },
  ];

  readonly activeTab = signal<TripsTab>('upcoming');
  readonly selectedTicket = signal<BookedTrip | null>(null);
  readonly showConfirmation = signal(false);
  private readonly bookedTripId = signal<string | null>(
    this.route.snapshot.queryParamMap.get('booked'),
  );

  readonly upcomingTrips = this.service.upcomingTrips;
  readonly pastTrips = this.service.pastTrips;
  readonly activeUpcoming = computed(() => this.upcomingTrips()[0]);
  readonly confirmationTrip = computed(() => {
    const id = this.bookedTripId();
    return id ? this.service.bookedTrips().find((trip) => trip.id === id) : undefined;
  });

  readonly draftFlightCount = computed(() => Object.keys(this.service.flights()).length);
  readonly draftStayCount = computed(() => Object.keys(this.service.stays()).length);

  constructor() {
    if (this.bookedTripId()) {
      this.showConfirmation.set(true);
      if (isPlatformBrowser(this.platformId)) {
        this.toastTimer = setTimeout(() => this.showConfirmation.set(false), 5200);
      }
    }
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId) || this.reduceMotion()) {
      return;
    }

    this.motionContext = gsap.context(() => {
      gsap.from('[data-trips-reveal]', {
        opacity: 0,
        y: 16,
        duration: 0.62,
        stagger: 0.08,
        ease: 'power3.out',
      });
    }, this.host.nativeElement);
  }

  ngOnDestroy(): void {
    this.motionContext?.revert();
    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }
  }

  setTab(tab: TripsTab): void {
    this.activeTab.set(tab);
  }

  viewTicket(trip: BookedTrip): void {
    this.selectedTicket.set(trip);
  }

  closeTicket(): void {
    this.selectedTicket.set(null);
  }

  rebookTrip(trip: BookedTrip): void {
    this.service.rebookTrip(trip);
    void this.router.navigate(['/plan-trip']);
  }

  showUpcoming(): void {
    this.activeTab.set('upcoming');
    this.showConfirmation.set(false);
  }

  tabCount(tab: TripsTab): number {
    if (tab === 'upcoming') {
      return this.upcomingTrips().length;
    }
    if (tab === 'past') {
      return this.pastTrips().length;
    }
    return 1;
  }

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

  draftNights(): number {
    return this.service.legs().reduce((total, leg) => total + leg.nights, 0);
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

  draftDateRange(): string {
    const legs = this.service.legs();
    const first = legs[0]?.departDate;
    const last = legs[legs.length - 1]?.departDate;
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
