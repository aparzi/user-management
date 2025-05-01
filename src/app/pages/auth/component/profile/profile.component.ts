import {Component, inject} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [
    RouterLink
  ],
  template: `
    <div class="container mt-5" style="max-width: 600px;">
      <div class="card shadow-sm">
        <div class="card-body">
          <h3 class="card-title text-center mb-4">Profilo Utente</h3>

          <ul class="list-group list-group-flush mb-4">
            <li class="list-group-item">
              <strong>Nome:</strong> {{ user?.name }}
            </li>
            <li class="list-group-item">
              <strong>Nome:</strong> {{ user?.surname }}
            </li>
            <li class="list-group-item">
              <strong>Email:</strong> {{ user?.email || 'non disponibile' }}
            </li>
            <li class="list-group-item">
              <strong>Ruolo:</strong> {{ user?.role }}
            </li>
          </ul>

          <div class="d-flex justify-content-between">
            <button class="btn btn-outline-secondary" type="button" routerLink="/users">Lista utenti</button>
            <button class="btn btn-danger" (click)="logout()">Logout</button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ProfileComponent {

  private authService = inject(AuthService);
  private router = inject(Router);

  user = this.authService.currentUser();

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
