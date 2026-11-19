import { Routes } from '@angular/router';
import { Shell } from './layout/shell/shell';

export const routes: Routes = [
  {
    path: 'create-account',
    title: 'Create Account',
    loadComponent: () =>
      import('./features/auth/create-account/create-account').then((m) => m.CreateAccount),
  },
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
        data: { breadcrumb: 'Plan Trip' },
        loadComponent: () => import('./features/plan-trip/plan-trip').then((m) => m.PlanTrip),
      },
      {
        path: 'explore',
        title: 'Explore',
        data: { breadcrumb: 'Explore' },
        loadComponent: () => import('./features/explore/explore').then((m) => m.Explore),
      },
      {
        path: 'my-trips',
        title: 'My Trips',
        data: { breadcrumb: 'My Trips' },
        loadChildren: () =>
          import('./features/my-trips/my-trips.routes').then((m) => m.myTripsRoutes),
      },
      {
        path: 'flights',
        title: 'Flights',
        data: { breadcrumb: 'Flights' },
        loadChildren: () =>
          import('./features/flights/flights.routes').then((m) => m.flightsRoutes),
      },
      {
        path: 'stays',
        title: 'Stays',
        data: { breadcrumb: 'Stays' },
        loadChildren: () => import('./features/stays/stays.routes').then((m) => m.staysRoutes),
      },
      {
        path: 'favourites',
        title: 'Favourites',
        data: { breadcrumb: 'Favourites' },
        loadChildren: () =>
          import('./features/favourites/favourites.routes').then((m) => m.favouritesRoutes),
      },
      {
        path: 'account',
        title: 'Account',
        data: { breadcrumb: 'Account' },
        loadComponent: () => import('./features/account/account').then((m) => m.Account),
      },
      {
        path: 'settings',
        title: 'Settings',
        data: { breadcrumb: 'Settings' },
        loadComponent: () => import('./features/settings/settings').then((m) => m.Settings),
      },
      {
        path: 'login',
        title: 'Login',
        data: { breadcrumb: 'Login' },
        loadComponent: () => import('./features/auth/login/login').then((m) => m.Login),
      },
      {
        path: 'forgot-password',
        title: 'Forgot Password',
        data: { breadcrumb: 'Forgot Password' },
        loadComponent: () =>
          import('./features/auth/forget-password/forget-password').then((m) => m.ForgetPassword),
      },
      { path: '**', redirectTo: '' },
    ],
  },
];
