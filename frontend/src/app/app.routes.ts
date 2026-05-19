import { Routes } from '@angular/router';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home').then(m => m.HomeComponent)
  },
  {
    path: 'book',
    loadComponent: () =>
      import('./pages/booking/booking').then(m => m.BookingComponent)
  },
  {
    path: 'confirmation',
    loadComponent: () =>
      import('./pages/confirmation/confirmation').then(m => m.ConfirmationComponent)
  },
  {
    path: 'admin/login',
    loadComponent: () =>
      import('./pages/admin-login/admin-login').then(m => m.AdminLoginComponent)
  },
  {
    path: 'admin/dashboard',
    loadComponent: () =>
      import('./pages/admin-dashboard/admin-dashboard').then(m => m.AdminDashboardComponent),
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: '' }
];