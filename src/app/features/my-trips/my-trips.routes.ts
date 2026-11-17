import { Routes } from '@angular/router';

export const myTripsRoutes: Routes = [
  {
    path: '',
    title: 'My Trips',
    loadComponent: () => import('./my-trips').then((m) => m.MyTrips),
  },
  {
    path: 'draft',
    title: 'Draft Itinerary',
    data: { breadcrumb: 'Draft Itinerary' },
    loadComponent: () => import('./draft-details/draft-details').then((m) => m.DraftDetails),
  },
  {
    path: ':tripId',
    title: 'Trip Details',
    data: { breadcrumb: 'Trip Details' },
    loadComponent: () => import('./trip-details/trip-details').then((m) => m.TripDetails),
  },
];
