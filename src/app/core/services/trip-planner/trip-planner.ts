import { Injectable, computed, signal } from '@angular/core';
import type {
  BookedTrip,
  FlightOption,
  StayOption,
  TripAttraction,
  TripLeg,
  TripLegInput,
  TripTotals,
} from '../../models/trip-planner';

const AIRPORT_CITIES: Record<string, string> = {
  LOS: 'Lagos',
  CGK: 'Jakarta',
  DXB: 'Dubai',
  DPS: 'Bali',
  SIN: 'Singapore',
  CDG: 'Paris',
  LHR: 'London',
  IST: 'Istanbul',
  HND: 'Tokyo',
  CPT: 'Cape Town',
  RAK: 'Marrakech',
  JFK: 'New York',
};

const DEFAULT_LEGS: TripLegInput[] = [
  { from: 'LOS', to: 'CGK', departDate: '2027-11-20', nights: 7 },
  { from: 'CGK', to: 'DXB', departDate: '2027-11-27', nights: 5 },
  { from: 'DXB', to: 'LOS', departDate: '2027-12-02', nights: 0 },
];

const HOTEL_IMAGES = [
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=85',
];

const TRIP_IMAGE =
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=85';

function createLeg(input: TripLegInput, index: number): TripLeg {
  return { id: `leg-${index + 1}`, ...input, nights: Number(input.nights) };
}

function addDays(isoDate: string, days: number): string {
  const date = new Date(`${isoDate}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function createFlightOptions(leg: TripLeg): FlightOption[] {
  const templates = [
    {
      airline: 'Qatar Airways',
      code: 'QR',
      number: '1328',
      departTime: '08:20',
      arriveTime: '14:45',
      duration: '10h 25m',
      stops: '1 stop · DOH',
      multiplier: 1,
    },
    {
      airline: 'Emirates',
      code: 'EK',
      number: '784',
      departTime: '11:10',
      arriveTime: '19:05',
      duration: '11h 55m',
      stops: '1 stop · DXB',
      multiplier: 1.14,
    },
    {
      airline: 'Turkish Airlines',
      code: 'TK',
      number: '626',
      departTime: '16:40',
      arriveTime: '22:30',
      duration: '9h 50m',
      stops: 'Nonstop',
      multiplier: 1.24,
    },
  ];

  return templates.map((template, index) => ({
    id: `${leg.id}-flight-${index + 1}`,
    legId: leg.id,
    airline: template.airline,
    flightCode: `${template.code} ${template.number}`,
    from: leg.from,
    to: leg.to,
    departTime: template.departTime,
    arriveTime: template.arriveTime,
    duration: template.duration,
    stops: template.stops,
    price: Math.round((520 + leg.nights * 26) * template.multiplier),
  }));
}

function createStayOptions(leg: TripLeg): StayOption[] {
  if (leg.nights <= 0) {
    return [];
  }

  const city = AIRPORT_CITIES[leg.to] ?? leg.to;
  const hotels = [
    { name: `The ${city} House`, rating: 4.9, nightlyRate: 186 },
    { name: `${city} Grand Central`, rating: 4.7, nightlyRate: 142 },
    { name: `Mint Garden ${city}`, rating: 4.8, nightlyRate: 168 },
  ];

  return hotels.map((hotel, index) => ({
    id: `${leg.id}-stay-${index + 1}`,
    legId: leg.id,
    name: hotel.name,
    city,
    rating: hotel.rating,
    nightlyRate: hotel.nightlyRate,
    totalPrice: hotel.nightlyRate * leg.nights,
    checkIn: leg.departDate,
    checkOut: addDays(leg.departDate, leg.nights),
    nights: leg.nights,
    imageUrl: HOTEL_IMAGES[index],
  }));
}

function calculateTotals(
  flights: Record<string, FlightOption>,
  stays: Record<string, StayOption>,
  attractions: TripAttraction[],
): TripTotals {
  const flightTotal = Object.values(flights).reduce((sum, flight) => sum + flight.price, 0);
  const stayTotal = Object.values(stays).reduce((sum, stay) => sum + stay.totalPrice, 0);
  const attractionTotal = attractions.reduce((sum, attraction) => sum + attraction.price, 0);
  const subtotal = flightTotal + stayTotal + attractionTotal;
  const taxes = Math.round(subtotal * 0.12);

  return {
    flights: flightTotal,
    stays: stayTotal,
    attractions: attractionTotal,
    subtotal,
    taxes,
    total: subtotal + taxes,
  };
}

function routeTitle(legs: TripLeg[]): string {
  if (!legs.length) {
    return 'New multi-stop journey';
  }

  return [
    AIRPORT_CITIES[legs[0].from] ?? legs[0].from,
    ...legs.map((leg) => AIRPORT_CITIES[leg.to] ?? leg.to),
  ].join(' → ');
}

function createDefaultTrip(
  status: BookedTrip['status'],
  inputs: TripLegInput[],
  bookedAt: string,
  attractions: TripAttraction[] = [],
): BookedTrip {
  const legs = inputs.map(createLeg);
  const flights = Object.fromEntries(
    legs.map((leg) => [leg.id, createFlightOptions(leg)[0]]),
  ) as Record<string, FlightOption>;
  const stays = Object.fromEntries(
    legs.filter((leg) => leg.nights > 0).map((leg) => [leg.id, createStayOptions(leg)[0]]),
  ) as Record<string, StayOption>;

  return {
    id: `trip-${status}-${bookedAt}`,
    title: routeTitle(legs),
    status,
    imageUrl: TRIP_IMAGE,
    legs,
    passengers: '2 Adults',
    cabinClass: 'Economy',
    flights,
    stays,
    attractions,
    totals: calculateTotals(flights, stays, attractions),
    bookedAt,
    confirmationCode: `GLB-${bookedAt.slice(0, 4)}-${inputs[0]?.from ?? 'TRP'}`,
  };
}

const DEFAULT_ATTRACTIONS: TripAttraction[] = [
  {
    id: 'jakarta-old-town',
    name: 'Jakarta Old Town & Street Food',
    city: 'Jakarta',
    category: 'Culture',
    duration: '4 hours',
    price: 96,
    imageUrl:
      'https://images.unsplash.com/photo-1555899434-94d1368aa7af?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'desert-safari',
    name: 'Dubai Desert Safari',
    city: 'Dubai',
    category: 'Adventure',
    duration: '6 hours',
    price: 148,
    imageUrl:
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=85',
  },
];

@Injectable({ providedIn: 'root' })
export class TripPlannerService {
  private readonly _legs = signal<TripLeg[]>(DEFAULT_LEGS.map(createLeg));
  private readonly _passengers = signal('2 Adults');
  private readonly _cabinClass = signal('Economy');
  private readonly _flights = signal<Record<string, FlightOption>>({});
  private readonly _stays = signal<Record<string, StayOption>>({});
  private readonly _attractions = signal<TripAttraction[]>([]);
  private readonly _bookedTrips = signal<BookedTrip[]>([
    createDefaultTrip('upcoming', DEFAULT_LEGS, '2026-11-02', DEFAULT_ATTRACTIONS),
    createDefaultTrip(
      'past',
      [
        { from: 'CDG', to: 'LHR', departDate: '2026-05-08', nights: 4 },
        { from: 'LHR', to: 'IST', departDate: '2026-05-12', nights: 3 },
        { from: 'IST', to: 'CDG', departDate: '2026-05-15', nights: 0 },
      ],
      '2026-03-19',
    ),
    createDefaultTrip(
      'past',
      [
        { from: 'DPS', to: 'SIN', departDate: '2025-10-03', nights: 3 },
        { from: 'SIN', to: 'DPS', departDate: '2025-10-06', nights: 2 },
      ],
      '2025-08-14',
    ),
  ]);

  readonly legs = this._legs.asReadonly();
  readonly passengers = this._passengers.asReadonly();
  readonly cabinClass = this._cabinClass.asReadonly();
  readonly flights = this._flights.asReadonly();
  readonly stays = this._stays.asReadonly();
  readonly attractions = this._attractions.asReadonly();
  readonly bookedTrips = this._bookedTrips.asReadonly();

  readonly upcomingTrips = computed(() =>
    this._bookedTrips().filter((trip) => trip.status === 'upcoming'),
  );

  readonly pastTrips = computed(() => this._bookedTrips().filter((trip) => trip.status === 'past'));

  readonly totals = computed(() =>
    calculateTotals(this._flights(), this._stays(), this._attractions()),
  );

  readonly draftTitle = computed(() => routeTitle(this._legs()));

  constructor() {
    this.ensureSelections();
  }

  setItinerary(
    inputs: TripLegInput[],
    passengers = this._passengers(),
    cabinClass = this._cabinClass(),
  ): void {
    const legs = inputs.map(createLeg);
    this._legs.set(legs);
    this._passengers.set(passengers);
    this._cabinClass.set(cabinClass);
    this._flights.set({});
    this._stays.set({});
    this.ensureSelections();
  }

  applyCuratedRoute(route: { legs: TripLegInput[] }): void {
    this.setItinerary(route.legs);
  }

  selectFlight(legId: string, flight: FlightOption): void {
    this._flights.update((flights) => ({ ...flights, [legId]: flight }));
  }

  selectStay(legId: string, stay: StayOption): void {
    this._stays.update((stays) => ({ ...stays, [legId]: stay }));
  }

  addAttraction(attraction: TripAttraction): void {
    if (this._attractions().some((item) => item.id === attraction.id)) {
      return;
    }
    this._attractions.update((items) => [...items, attraction]);
  }

  removeAttraction(attractionId: string): void {
    this._attractions.update((items) => items.filter((item) => item.id !== attractionId));
  }

  confirmBooking(): BookedTrip {
    const trip: BookedTrip = {
      id: `trip-upcoming-${Date.now()}`,
      title: this.draftTitle(),
      status: 'upcoming',
      imageUrl: TRIP_IMAGE,
      legs: this._legs().map((leg) => ({ ...leg })),
      passengers: this._passengers(),
      cabinClass: this._cabinClass(),
      flights: { ...this._flights() },
      stays: { ...this._stays() },
      attractions: [...this._attractions()],
      totals: this.totals(),
      bookedAt: new Date().toISOString().slice(0, 10),
      confirmationCode: `GLB-${String(this._bookedTrips().length + 1).padStart(3, '0')}-${this._legs()[0]?.from ?? 'TRP'}`,
    };

    this._bookedTrips.update((trips) => [trip, ...trips]);
    return trip;
  }

  rebookTrip(trip: BookedTrip): void {
    this._legs.set(trip.legs.map((leg) => ({ ...leg })));
    this._passengers.set(trip.passengers);
    this._cabinClass.set(trip.cabinClass);
    this._flights.set({ ...trip.flights });
    this._stays.set({ ...trip.stays });
    this._attractions.set(trip.attractions.map((item) => ({ ...item })));
    this.ensureSelections();
  }

  flightOptionsFor(leg: TripLeg | undefined): FlightOption[] {
    return leg ? createFlightOptions(leg) : [];
  }

  stayOptionsFor(leg: TripLeg | undefined): StayOption[] {
    return leg ? createStayOptions(leg) : [];
  }

  airportCity(code: string): string {
    return AIRPORT_CITIES[code] ?? code;
  }

  airportLabel(code: string): string {
    return `${this.airportCity(code)} (${code})`;
  }

  legLabel(leg: TripLeg): string {
    return `${this.airportCity(leg.from)} → ${this.airportCity(leg.to)}`;
  }

  private ensureSelections(): void {
    const flights: Record<string, FlightOption> = {};
    const stays: Record<string, StayOption> = {};

    this._legs().forEach((leg) => {
      flights[leg.id] = this._flights()[leg.id] ?? createFlightOptions(leg)[0];
      if (leg.nights > 0) {
        stays[leg.id] = this._stays()[leg.id] ?? createStayOptions(leg)[0];
      }
    });

    this._flights.set(flights);
    this._stays.set(stays);
  }
}
