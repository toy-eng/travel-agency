import { Routes } from '@angular/router';

export const staysRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./stays').then((m) => m.Stays),
    children: [
      {
        path: '',
        pathMatch: 'full',
        title: 'Search Hotels',
        loadComponent: () =>
          import('./pages/hotelsearch/hotelsearch').then(
            (m) => m.Hotelsearch,
          ),
      },
      {
        path: 'hotelsearch',
        title: 'Search Hotels',
        loadComponent: () =>
          import('./pages/hotelsearch/hotelsearch').then(
            (m) => m.Hotelsearch,
          ),
      },
      {
        path: 'hotellisting',
        title: 'Show Hotels',
        loadComponent: () =>
          import('./pages/hotellisting/hotellisting').then(
            (m) => m.Hotellisting,
          ),
      },
      {
        path: 'hoteldetails',
        title: 'Hotel Details',
        loadComponent: () =>
          import('./pages/hoteldetails/hoteldetails').then(
            (m) => m.Hoteldetails,
          ),
      },
      {
        path: 'hotelbookingdetails',
        title: 'Hotel Booking',
        loadComponent: () =>
          import('./pages/hotelbookingdetails/hotelbookingdetails').then(
            (m) => m.Hotelbookingdetails,
          ),
      },
    ],
  },
];