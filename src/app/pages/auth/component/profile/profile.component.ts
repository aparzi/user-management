import {Component, inject} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
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

          <div class="text-center">
            <button class="btn btn-outline-danger" (click)="logout()">Logout</button>
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
