import { Routes } from '@angular/router';

export const findStaysRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./findstays').then((m) => m.FindStays),
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
    ],
  },
];