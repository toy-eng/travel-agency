import { Routes } from '@angular/router';

export const favouritesRoutes: Routes = [
  {
    path: '',
    title: 'Favourites',
    loadComponent: () =>
      import('./favourites').then(
        (m) => m.FavouritesPage,
      ),
  },
];
