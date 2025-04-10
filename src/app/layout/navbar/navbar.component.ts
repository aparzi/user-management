import { Component } from '@angular/core';
import {
  NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle,
  NgbNav,
  NgbNavContent,
  NgbNavItem,
  NgbNavLinkButton,
  NgbNavOutlet
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar',
  imports: [
    NgbNavOutlet,
    NgbNav,
    NgbDropdown,
    NgbDropdownMenu,
    NgbDropdownItem,
    NgbDropdownToggle
  ],
  template: `
    <ul ngbNav #nav="ngbNav" class="nav-tabs justify-content-end">
      <li ngbDropdown class="nav-item" role="presentation">
        <button type="button" class="nav-link" ngbDropdownToggle>Dropdown</button>
        <div ngbDropdownMenu>
          <button ngbDropdownItem>Action</button>
          <button ngbDropdownItem>Another action</button>
          <button ngbDropdownItem>Something else here</button>
          <div class="dropdown-divider"></div>
          <button ngbDropdownItem>Separated link</button>
        </div>
      </li>
    </ul>

    <div [ngbNavOutlet]="nav" class="mt-2"></div>
  `
})
export class NavbarComponent {

}
