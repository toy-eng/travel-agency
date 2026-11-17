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
import { Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';
import { TripPlannerService } from '../../core/services/trip-planner/trip-planner';
import { gsap } from '../../shared/motion/gsap';
import { prefersReducedMotion } from '../../shared/motion/prefers-reduced-motion';
import type {
  FlightOption,
  StayOption,
  TripAttraction,
  TripLeg,
} from '../../core/models/trip-planner';
import { TRIP_ATTRACTIONS } from './plan-trip.data';

const legPanelAnimation = trigger('legPanel', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(10px)' }),
    animate('280ms cubic-bezier(0.22, 1, 0.36, 1)', style({ opacity: 1, transform: 'none' })),
  ]),
  transition('* => *', [
    style({ opacity: 0, transform: 'translateY(8px)' }),
    animate('240ms cubic-bezier(0.22, 1, 0.36, 1)', style({ opacity: 1, transform: 'none' })),
  ]),
]);

@Component({
  selector: 'app-plan-trip',
  templateUrl: './plan-trip.html',
  styleUrl: './plan-trip.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [legPanelAnimation],
})
export class PlanTrip implements AfterViewInit, OnDestroy {
  readonly service = inject(TripPlannerService);
  private readonly router = inject(Router);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly reduceMotion = prefersReducedMotion();
  private motionContext: gsap.Context | null = null;

  readonly activeLegIndex = signal(0);
  readonly legs = this.service.legs;
  readonly passengers = this.service.passengers;
  readonly cabinClass = this.service.cabinClass;
  readonly totals = this.service.totals;
  readonly attractions = this.service.attractions;
  readonly isAddingLeg = signal(false);
  readonly newLegDestination = signal('CGK');
  readonly newLegNights = signal(3);
  readonly nightOptions = [1, 2, 3, 4, 5, 7, 10, 14];

  readonly activeLeg = computed(() => this.legs()[this.activeLegIndex()]);
  readonly lastLeg = computed(() => {
    const legs = this.legs();
    return legs[legs.length - 1];
  });
  readonly availableDestinations = computed(() => {
    const legs = this.legs();
    const lastDestination = legs[legs.length - 1]?.to;
    return this.service.airportOptions.filter((option) => option.code !== lastDestination);
  });
  readonly flightOptions = computed(() => this.service.flightOptionsFor(this.activeLeg()));
  readonly stayOptions = computed(() => this.service.stayOptionsFor(this.activeLeg()));
  readonly destinationAttractions = computed(() => {
    const leg = this.activeLeg();
    if (!leg) {
      return [];
    }

    const city = this.service.airportCity(leg.to);
    return TRIP_ATTRACTIONS.filter((attraction) => attraction.city === city);
  });
  readonly selectedAttractionIds = computed(
    () => new Set(this.attractions().map((attraction) => attraction.id)),
  );
  readonly selectedFlight = computed(() => {
    const leg = this.activeLeg();
    return leg ? this.service.flights()[leg.id] : undefined;
  });
  readonly selectedStay = computed(() => {
    const leg = this.activeLeg();
    return leg ? this.service.stays()[leg.id] : undefined;
  });
  readonly selectedCount = computed(() => {
    const legs = this.legs();
    const flights = this.service.flights();
    const stays = this.service.stays();
    const flightCount = legs.filter((leg) => Boolean(flights[leg.id])).length;
    const stayCount = legs.filter((leg) => leg.nights === 0 || Boolean(stays[leg.id])).length;
    return { complete: flightCount + stayCount, total: legs.length * 2 };
  });

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId) || this.reduceMotion()) {
      return;
    }

    this.motionContext = gsap.context(() => {
      gsap.from('[data-plan-reveal]', {
        opacity: 0,
        y: 16,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
      });
    }, this.host.nativeElement);
  }

  ngOnDestroy(): void {
    this.motionContext?.revert();
  }

  selectLeg(index: number): void {
    this.activeLegIndex.set(index);
  }

  startAddLeg(): void {
    const firstDestination = this.availableDestinations()[0];
    if (firstDestination) {
      this.newLegDestination.set(firstDestination.code);
    }
    this.isAddingLeg.set(true);
  }

  cancelAddLeg(): void {
    this.isAddingLeg.set(false);
  }

  addLeg(): void {
    const leg = this.service.addLeg(this.newLegDestination(), this.newLegNights());
    if (!leg) {
      return;
    }

    this.activeLegIndex.set(this.legs().length - 1);
    this.isAddingLeg.set(false);
  }

  selectFlight(flight: FlightOption): void {
    const leg = this.activeLeg();
    if (leg) {
      this.service.selectFlight(leg.id, flight);
    }
  }

  selectStay(stay: StayOption): void {
    const leg = this.activeLeg();
    if (leg) {
      this.service.selectStay(leg.id, stay);
    }
  }

  removeAttraction(attractionId: string): void {
    this.service.removeAttraction(attractionId);
  }

  toggleAttraction(attraction: TripAttraction): void {
    if (this.selectedAttractionIds().has(attraction.id)) {
      this.service.removeAttraction(attraction.id);
      return;
    }

    this.service.addAttraction(attraction);
  }

  confirmBooking(): void {
    const trip = this.service.confirmBooking();
    void this.router.navigate(['/my-trips'], { queryParams: { booked: trip.id } });
  }

  formatDate(date: string): string {
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      timeZone: 'UTC',
    }).format(new Date(`${date}T12:00:00Z`));
  }

  flightFor(legIndex: number): FlightOption | undefined {
    const leg = this.legs()[legIndex];
    return leg ? this.service.flights()[leg.id] : undefined;
  }

  stayFor(legIndex: number): StayOption | undefined {
    const leg = this.legs()[legIndex];
    return leg ? this.service.stays()[leg.id] : undefined;
  }

  legLabel(leg: TripLeg): string {
    return this.service.legLabel(leg);
  }
}
