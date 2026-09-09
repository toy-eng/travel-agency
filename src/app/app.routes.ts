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
        loadComponent: () =>
          import('./features/home/home').then((m) => m.Home),
      },
      {
        path: 'find-flight',
        loadChildren: () =>
          import('./features/find-flight/find-flight.routes').then(
            (m) => m.findFlightRoutes,
          ),
      },
      {
        path: 'find-stays',
        loadChildren: () =>
          import('./features/find-stays/find-stays.routes').then(
            (m) => m.findStaysRoutes,
          ),
      },
      {
        path: 'login',
        title: 'Login',
        loadComponent: () =>
          import('./features/auth/login/login').then((m) => m.Login),
      },
      {
        path: 'create-account',
        title: 'Create Account',
        loadComponent: () =>
          import('./features/auth/create-account/create-account').then(
            (m) => m.CreateAccount,
          ),
      },
      {
        path: 'forgot-password',
        title: 'Forgot Password',
        loadComponent: () =>
          import('./features/auth/forget-password/forget-password').then(
            (m) => m.ForgetPassword,
          ),
      },
      { path: '**', redirectTo: '' },
    ],
  },
];
