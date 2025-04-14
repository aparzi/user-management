import {Routes} from '@angular/router';
import {authGuard} from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/auth/component/login/login.component').then(c => c.LoginComponent)
  },
  {
    path: '',
    loadChildren: () => import('./pages/pages.routes').then(r => r.routes),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
