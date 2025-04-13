import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavbarComponent} from './layout/navbar/navbar.component';
import {ToastComponent} from './core/shared/toast/toast.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavbarComponent,
    ToastComponent
  ],
  template: `
    <app-navbar />
    <router-outlet />
    <app-toast />
  `
})
export class AppComponent {
}
