import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserService} from '../../../users/services/users.service';
import {AuthService} from '../../services/auth.service';
import {catchError, EMPTY, tap} from 'rxjs';
import {ToastService} from '../../../../core/shared/toast/toast.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule
  ],
  template: `
    <div class="container mt-5" style="max-width: 400px;">
      <h2 class="mb-4 text-center">Login</h2>
      <form [formGroup]="loginForm" (ngSubmit)="login()">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input
            type="email"
            id="email"
            class="form-control"
            formControlName="email"
            [class.is-invalid]="submitted && loginForm.get('email')?.invalid"
          />
          <div class="invalid-feedback">
            Email obbligatoria.
          </div>
        </div>

        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input
            type="password"
            id="password"
            class="form-control"
            formControlName="password"
            [class.is-invalid]="submitted && loginForm.get('password')?.invalid"
          />
          <div class="invalid-feedback">
            Password obbligatoria.
          </div>
        </div>

        <!-- Submit -->
        <button [disabled]="loginForm.invalid" type="submit" class="btn btn-primary w-100">Accedi</button>
      </form>
    </div>
  `
})
export class LoginComponent {

  submitted = false;

  private fb = inject(FormBuilder);
  public loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  private router: Router = inject(Router);
  private toastService = inject(ToastService);
  private authService: AuthService = inject(AuthService);

  login() {
    this.submitted = true;

    if (this.loginForm.invalid) return;

    const credentials = this.loginForm.value;

    this.authService.login(credentials.email!, credentials.password!).pipe(
      tap((user) => {
        if (user) {
          this.toastService.show({type: 'success', title: 'Successo', message: 'Login effettuato!'});
          this.router.navigate(['/users']);
        } else {
          this.toastService.show({type: 'info', title: 'Attenzione', message: 'Credenziali non valide!'});
        }
      }),
      catchError((error) => {
        console.log('Error login user => ', error);
        this.toastService.show({type: 'danger', title: 'Errore', message: 'Si è verificato un problema!'});
        return EMPTY;
      })
    ).subscribe();
  }
}
