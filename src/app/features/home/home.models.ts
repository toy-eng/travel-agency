export type TripMode = 'Multi-City' | 'Round Trip' | 'One Way';

export interface Airport {
  code: string;
  city: string;
  country: string;
}

export interface JourneyLeg {
  id: number;
  from: string;
  to: string;
  departDate: string;
  nights: number;
}

export interface CuratedRouteLeg {
  from: string;
  to: string;
  departDate: string;
  nights: number;
}

export interface CuratedRoute {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  routeLabel: string;
  imageUrl: string;
  price: number;
  currency: string;
  durationLabel: string;
  legs: CuratedRouteLeg[];
}

export interface Attraction {
  id: string;
  name: string;
  location: string;
  imageUrl: string;
  price: number;
  currency: string;
  duration: string;
  rating: number;
  category: string;
}

export interface HowItWorksStep {
  number: string;
  title: string;
  description: string;
  icon: 'map' | 'bundle' | 'itinerary';
}
