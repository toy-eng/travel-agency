import { Routes } from '@angular/router';

export const favouritesRoutes: Routes = [
  {
    path: '',
    title: 'Favourites',
    loadComponent: () =>
      import('./pages/favourites-page/favourites-page').then(
        (m) => m.FavouritesPage,
      ),
  },
];
