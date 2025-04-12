import { Component } from '@angular/core';
import {
  NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle,
  NgbNav,
  NgbNavContent,
  NgbNavItem,
  NgbNavLinkButton,
  NgbNavOutlet
} from '@ng-bootstrap/ng-bootstrap';
import {NgOptimizedImage} from '@angular/common';

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
      <li ngbDropdown class="nav-item" role="presentation">
        <img ngSrc="user-logo.png" width="50" height="50" alt="profile image" role="button" class="m-2" ngbDropdownToggle/>
        <div ngbDropdownMenu>
          <button ngbDropdownItem>Profilo</button>
          <button ngbDropdownItem>Logout</button>
        </div>
      </li>
    </ul>

    <div [ngbNavOutlet]="nav" class="mt-2"></div>
  `
})
export class NavbarComponent {

}
