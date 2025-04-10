import { Routes } from '@angular/router';
import {UserListComponent} from './pages/users/components/user-list/user-list.component';

export const routes: Routes = [
  { path: '', component: UserListComponent },
  { path: 'list', component: UserListComponent },
];
