import type { ReviewCardItem } from './components/review-card/review-card';
import type { Airport, Attraction, CuratedRoute, HowItWorksStep } from './home.models';

export const airports: Airport[] = [
  { code: 'LOS', city: 'Lagos', country: 'Nigeria' },
  { code: 'CGK', city: 'Jakarta', country: 'Indonesia' },
  { code: 'DXB', city: 'Dubai', country: 'UAE' },
  { code: 'DPS', city: 'Bali', country: 'Indonesia' },
  { code: 'SIN', city: 'Singapore', country: 'Singapore' },
  { code: 'CDG', city: 'Paris', country: 'France' },
  { code: 'LHR', city: 'London', country: 'United Kingdom' },
  { code: 'IST', city: 'Istanbul', country: 'Turkey' },
  { code: 'HND', city: 'Tokyo', country: 'Japan' },
  { code: 'CPT', city: 'Cape Town', country: 'South Africa' },
  { code: 'RAK', city: 'Marrakech', country: 'Morocco' },
  { code: 'JFK', city: 'New York', country: 'United States' },
];

export const curatedRoutes: CuratedRoute[] = [
  {
    id: 'asian-gateway',
    eyebrow: 'Most booked',
    title: 'Asian Gateway',
    description: 'Temple mornings, Jakarta nights, and a Dubai desert finale.',
    routeLabel: 'Lagos → Jakarta → Dubai',
    imageUrl:
      'https://images.unsplash.com/photo-1555899434-94d1368aa7af?auto=format&fit=crop&w=1200&q=85',
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
    eyebrow: 'Slow travel',
    title: 'Island & City Hop',
    description: 'Pair Bali rice terraces with Singapore skyline evenings.',
    routeLabel: 'Bali → Singapore → Bali',
    imageUrl:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=85',
    price: 1640,
    currency: 'USD',
    durationLabel: '6 nights · 2 cities',
    legs: [
      { from: 'DPS', to: 'SIN', departDate: '2027-04-08', nights: 3 },
      { from: 'SIN', to: 'DPS', departDate: '2027-04-11', nights: 3 },
    ],
  },
  {
    id: 'european-icons',
    eyebrow: 'Editor pick',
    title: 'European Icons',
    description: 'Grand boulevards, London theatre, and Bosphorus sunsets.',
    routeLabel: 'Paris → London → Istanbul',
    imageUrl:
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=85',
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

export const attractions: Attraction[] = [
  {
    id: 'bali-temples',
    name: 'Bali Temple Trail',
    location: 'Ubud, Bali',
    imageUrl:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=85',
    price: 420,
    currency: 'USD',
    duration: '2-day experience',
    rating: 4.9,
    category: 'Culture',
  },
  {
    id: 'dubai-marina',
    name: 'Dubai Marina at Golden Hour',
    location: 'Dubai, UAE',
    imageUrl:
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=85',
    price: 360,
    currency: 'USD',
    duration: 'Sunset cruise',
    rating: 4.8,
    category: 'Coastal',
  },
  {
    id: 'paris-landmarks',
    name: 'Paris Landmarks, Curated',
    location: 'Paris, France',
    imageUrl:
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=85',
    price: 510,
    currency: 'USD',
    duration: '2-day private route',
    rating: 4.9,
    category: 'City',
  },
];

export const howItWorksSteps: HowItWorksStep[] = [
  {
    number: '01',
    title: 'Map your stops',
    description: 'Chain multiple cities and choose exactly how long you want to stay in each one.',
    icon: 'map',
  },
  {
    number: '02',
    title: 'Bundle flights & stays',
    description: 'Match connecting flights with stays synced to every arrival and checkout date.',
    icon: 'bundle',
  },
  {
    number: '03',
    title: 'Track your itinerary',
    description: 'Keep boarding passes, hotel check-ins, and experiences together in My Trips.',
    icon: 'itinerary',
  },
];

export const travelerReviews: ReviewCardItem[] = [
  {
    quote: 'Every connection, finally in one place.',
    body: 'We planned a three-city honeymoon without a spreadsheet for the first time. Flights, hotels, and transfers stayed in sync from the first stop to the last.',
    author: 'Amara & Tunde',
    role: 'Lagos → Bali → Singapore',
    source: 'Verified traveler',
    imageUrl:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80',
    rating: 5,
  },
  {
    quote: 'Our hotels matched every arrival.',
    body: 'The stay dates updated automatically whenever we added a city. That small detail made a 10-day work-and-weekend trip feel genuinely easy.',
    author: 'Maya Chen',
    role: 'Tokyo → Seoul → Bangkok',
    source: 'Verified traveler',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80',
    rating: 5,
  },
  {
    quote: 'The itinerary actually felt effortless.',
    body: 'We added a Dubai stop two weeks before departure and everything rebalanced around it. It is the first trip planner I have kept open after booking.',
    author: 'Daniel Okafor',
    role: 'London → Istanbul → Dubai',
    source: 'Verified traveler',
    imageUrl:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80',
    rating: 5,
  },
];
