import {Component, inject, Signal} from '@angular/core';
import {
  NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle,
  NgbNav,
  NgbNavOutlet
} from '@ng-bootstrap/ng-bootstrap';
import {NgOptimizedImage} from '@angular/common';
import {AuthService} from '../../pages/auth/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [
    NgbNavOutlet,
    NgbNav,
    NgbDropdown,
    NgbDropdownMenu,
    NgbDropdownItem,
    NgOptimizedImage,
    NgbDropdownToggle
  ],
  template: `
    <ul ngbNav #nav="ngbNav" class="nav-tabs justify-content-end">
      @if (isAuthenticated()) {
        <li ngbDropdown class="nav-item" role="presentation">
          <img ngSrc="user-logo.png" width="50" height="50" alt="profile image" role="button" class="m-2"
               ngbDropdownToggle/>
          <div ngbDropdownMenu>
            <button ngbDropdownItem (click)="goToProfile()">Profilo</button>
            <button ngbDropdownItem (click)="logout()">Logout</button>
          </div>
        </li>
      }
    </ul>

    <div [ngbNavOutlet]="nav" class="mt-2"></div>
  `
})
export class NavbarComponent {

  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  public isAuthenticated: Signal<boolean> = this.authService.isAuthenticated;

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }
}
