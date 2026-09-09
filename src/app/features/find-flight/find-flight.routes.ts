import { Routes } from '@angular/router';

export const findFlightRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./flightflow').then((m) => m.Flightflow),
    children: [
      {
        path: '',
        pathMatch: 'full',
        title: 'Search Flight',
        loadComponent: () =>
          import('./pages/flightsearch/flightsearch').then(
            (m) => m.Flightsearch,
          ),
      },
      {
        path: 'search',
        title: 'Search Flight',
        loadComponent: () =>
          import('./pages/flightsearch/flightsearch').then(
            (m) => m.Flightsearch,
          ),
      },
      {
        path: 'flightlisting',
        title: 'Show Flights',
        loadComponent: () =>
          import('./pages/flightlisting/flightlisting').then(
            (m) => m.Flightlisting,
          ),
      },
      {
        path: 'flightdetails',
        title: 'Flight Details',
        loadComponent: () =>
          import('./pages/flightdetails/flightdetails').then(
            (m) => m.Flightdetails,
          ),
      },
      {
        path: 'bookingdetails',
        title: 'Book Flight',
        loadComponent: () =>
          import('./pages/bookingdetails/bookingdetails').then(
            (m) => m.Bookingdetails,
          ),
      },
    ],
  },
];
