import { Routes } from '@angular/router';
import {UserListComponent} from './pages/users/components/user-list/user-list.component';
import {UserManagementComponent} from './pages/users/components/user-management/user-management.component';

export const routes: Routes = [
  { path: '', component: UserListComponent },
  { path: 'list', component: UserListComponent },
  { path: 'user/:mode', component: UserManagementComponent }, // creazione
  { path: 'user/:mode/:id', component: UserManagementComponent }, // modifica
];
