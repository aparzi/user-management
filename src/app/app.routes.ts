import {Routes} from '@angular/router';
import {notAuthGuard} from './core/guards/notAuth.guard';
import {authGuard} from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [notAuthGuard],
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
