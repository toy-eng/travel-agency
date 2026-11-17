import type { TripAttraction } from '../../core/models/trip-planner';
import type { CuratedRoute } from '../home/home.models';

export type ExploreRegion = 'Asia' | 'Middle East' | 'Europe';

export interface ExploreRoute extends CuratedRoute {
  region: ExploreRegion;
}

export interface ExploreAttraction extends TripAttraction {
  region: ExploreRegion;
  rating: number;
}

export const exploreRoutes: ExploreRoute[] = [
  {
    id: 'asian-gateway',
    region: 'Asia',
    eyebrow: 'Most booked',
    title: 'Asian Gateway',
    description: 'Temple mornings, Jakarta nights, and a Dubai desert finale.',
    routeLabel: 'Lagos → Jakarta → Dubai → Lagos',
    imageUrl:
      'https://images.unsplash.com/photo-1555899434-94d1368aa7af?auto=format&fit=crop&w=1400&q=85',
    price: 2480,
    currency: 'USD',
    durationLabel: '12 nights · 3 cities',
    legs: [
      { from: 'LOS', to: 'CGK', departDate: '2027-03-12', nights: 7 },
      { from: 'CGK', to: 'DXB', departDate: '2027-03-19', nights: 5 },
      { from: 'DXB', to: 'LOS', departDate: '2027-03-24', nights: 0 },
    ],
  },
  {
    id: 'island-city-hop',
    region: 'Asia',
    eyebrow: 'Slow travel',
    title: 'Island & City Hop',
    description: 'Pair Bali rice terraces with Singapore skyline evenings.',
    routeLabel: 'Bali → Singapore → Bali',
    imageUrl:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1400&q=85',
    price: 1640,
    currency: 'USD',
    durationLabel: '6 nights · 2 cities',
    legs: [
      { from: 'DPS', to: 'SIN', departDate: '2027-04-08', nights: 3 },
      { from: 'SIN', to: 'DPS', departDate: '2027-04-11', nights: 3 },
    ],
  },
  {
    id: 'middle-east-icons',
    region: 'Middle East',
    eyebrow: 'Skyline escape',
    title: 'Desert & Skyline',
    description: 'Old Dubai souks, Marina sunsets, and a final night under the stars.',
    routeLabel: 'Lagos → Dubai → Istanbul → Lagos',
    imageUrl:
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1400&q=85',
    price: 2180,
    currency: 'USD',
    durationLabel: '8 nights · 3 cities',
    legs: [
      { from: 'LOS', to: 'DXB', departDate: '2027-06-04', nights: 4 },
      { from: 'DXB', to: 'IST', departDate: '2027-06-08', nights: 4 },
      { from: 'IST', to: 'LOS', departDate: '2027-06-12', nights: 0 },
    ],
  },
  {
    id: 'european-icons',
    region: 'Europe',
    eyebrow: 'Editor pick',
    title: 'European Icons',
    description: 'Grand boulevards, London theatre, and Bosphorus sunsets.',
    routeLabel: 'Paris → London → Istanbul',
    imageUrl:
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1400&q=85',
    price: 3120,
    currency: 'USD',
    durationLabel: '9 nights · 3 cities',
    legs: [
      { from: 'CDG', to: 'LHR', departDate: '2027-05-14', nights: 4 },
      { from: 'LHR', to: 'IST', departDate: '2027-05-18', nights: 5 },
      { from: 'IST', to: 'CDG', departDate: '2027-05-23', nights: 0 },
    ],
  },
];

export const exploreAttractions: ExploreAttraction[] = [
  {
    id: 'uluwatu-temple',
    name: 'Uluwatu Temple & Kecak Dance',
    city: 'Bali',
    region: 'Asia',
    category: 'Culture',
    duration: '5 hours',
    price: 128,
    rating: 4.9,
    imageUrl:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 'burj-khalifa-safari',
    name: 'Burj Khalifa & Desert Safari',
    city: 'Dubai',
    region: 'Middle East',
    category: 'Adventure',
    duration: 'Full day',
    price: 214,
    rating: 4.9,
    imageUrl:
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 'louvre-seine',
    name: 'Louvre & Seine Cruise',
    city: 'Paris',
    region: 'Europe',
    category: 'City',
    duration: '6 hours',
    price: 186,
    rating: 4.8,
    imageUrl:
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 'singapore-gardens',
    name: 'Gardens by the Bay After Dark',
    city: 'Singapore',
    region: 'Asia',
    category: 'Nature',
    duration: '3 hours',
    price: 84,
    rating: 4.8,
    imageUrl:
      'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 'dubai-marina',
    name: 'Dubai Marina Golden Hour Cruise',
    city: 'Dubai',
    region: 'Middle East',
    category: 'Coastal',
    duration: '2 hours',
    price: 96,
    rating: 4.7,
    imageUrl:
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 'london-eye',
    name: 'London Eye & West End Evening',
    city: 'London',
    region: 'Europe',
    category: 'City',
    duration: '4 hours',
    price: 154,
    rating: 4.8,
    imageUrl:
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1000&q=85',
  },
];
