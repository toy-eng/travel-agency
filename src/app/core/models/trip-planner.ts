export interface TripLegInput {
  from: string;
  to: string;
  departDate: string;
  nights: number;
}

export interface TripLeg extends TripLegInput {
  id: string;
}

export interface FlightOption {
  id: string;
  legId: string;
  airline: string;
  flightCode: string;
  from: string;
  to: string;
  departTime: string;
  arriveTime: string;
  duration: string;
  stops: string;
  price: number;
}

export interface StayOption {
  id: string;
  legId: string;
  name: string;
  city: string;
  rating: number;
  nightlyRate: number;
  totalPrice: number;
  checkIn: string;
  checkOut: string;
  nights: number;
  imageUrl: string;
}

export interface TripAttraction {
  id: string;
  name: string;
  city: string;
  category: string;
  duration: string;
  price: number;
  imageUrl: string;
}

export interface TripTotals {
  flights: number;
  stays: number;
  attractions: number;
  subtotal: number;
  taxes: number;
  total: number;
}

export type BookedTripStatus = 'upcoming' | 'past';

export interface BookedTrip {
  id: string;
  title: string;
  status: BookedTripStatus;
  imageUrl: string;
  legs: TripLeg[];
  passengers: string;
  cabinClass: string;
  flights: Record<string, FlightOption>;
  stays: Record<string, StayOption>;
  attractions: TripAttraction[];
  totals: TripTotals;
  bookedAt: string;
  confirmationCode: string;
}
