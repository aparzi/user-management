import {Routes} from '@angular/router';
import {UserManagementComponent} from './users/components/user-management/user-management.component';
import {UserListComponent} from './users/components/user-list/user-list.component';

export const routes: Routes = [
  {path: '', component: UserListComponent},
  {path: 'users', component: UserListComponent},
  {path: 'user/:mode', component: UserManagementComponent}, // creazione
  {path: 'user/:mode/:id', component: UserManagementComponent}, // modifica
];
