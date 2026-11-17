import { Routes } from '@angular/router';
import { Shell } from './layout/shell/shell';

export const routes: Routes = [
  {
    path: '',
    component: Shell,
    children: [
      {
        path: '',
        title: 'Travel Agency',
        loadComponent: () => import('./features/home/home').then((m) => m.Home),
      },
      {
        path: 'plan-trip',
        title: 'Plan Trip',
        loadComponent: () => import('./features/plan-trip/plan-trip').then((m) => m.PlanTrip),
      },
      {
        path: 'explore',
        title: 'Explore',
        loadComponent: () => import('./features/explore/explore').then((m) => m.Explore),
      },
      {
        path: 'my-trips',
        title: 'My Trips',
        loadComponent: () => import('./features/my-trips/my-trips').then((m) => m.MyTrips),
      },
      {
        path: 'flights',
        loadChildren: () =>
          import('./features/flights/flights.routes').then((m) => m.flightsRoutes),
      },
      {
        path: 'stays',
        loadChildren: () => import('./features/stays/stays.routes').then((m) => m.staysRoutes),
      },
      {
        path: 'favourites',
        loadChildren: () =>
          import('./features/favourites/favourites.routes').then((m) => m.favouritesRoutes),
      },
      {
        path: 'account',
        title: 'Account',
        loadComponent: () => import('./features/account/account').then((m) => m.Account),
      },
      {
        path: 'settings',
        title: 'Settings',
        loadComponent: () => import('./features/settings/settings').then((m) => m.Settings),
      },
      {
        path: 'login',
        title: 'Login',
        loadComponent: () => import('./features/auth/login/login').then((m) => m.Login),
      },
      {
        path: 'create-account',
        title: 'Create Account',
        loadComponent: () =>
          import('./features/auth/create-account/create-account').then((m) => m.CreateAccount),
      },
      {
        path: 'forgot-password',
        title: 'Forgot Password',
        loadComponent: () =>
          import('./features/auth/forget-password/forget-password').then((m) => m.ForgetPassword),
      },
      { path: '**', redirectTo: '' },
    ],
  },
];
