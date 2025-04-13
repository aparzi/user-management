import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {UserService} from '../../services/users.service';
import {tap} from 'rxjs';

@Component({
  selector: 'app-user-management',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  template: `
    <div class="container mt-4">
      <h2 class="text-white">{{ getTitleForm() }}</h2>
      <form [formGroup]="form" (ngSubmit)="saveData()">
        <div class="row">
          <div class="col-md-3 col-xs-6">
            <div class="mb-3">
              <label>Nome</label>
              <input type="text" class="form-control" formControlName="name">
            </div>
          </div>
          <div class="col-md-3 col-xs-6">
            <div class="mb-3">
              <label>Cognome</label>
              <input type="text" class="form-control" formControlName="surname">
            </div>
          </div>
          <div class="col-md-3 col-xs-6">
            <div class="mb-3">
              <label>Email</label>
              <input type="email" class="form-control" formControlName="email">
            </div>
          </div>
          <div class="col-md-3 col-xs-6">
            <div class="mb-3">
              <label>Età</label>
              <input type="number" class="form-control" formControlName="age">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3 col-xs-6">
            <div class="mb-3">
              <label>Ruolo</label>
              <select class="form-control" id="inputGroupSelect01" formControlName="role">
                <option selected value="admin">admin</option>
                <option value="moderatore">moderatore</option>
                <option value="utente">utente</option>
              </select>
            </div>
          </div>
        </div>

        <hr/>

        <div class="d-flex justify-content-between">
          <button class="btn btn-outline-warning" type="button" routerLink="/list">Annulla</button>
          @if (!isInfo) {
            <button class="btn btn-success" type="submit">Salva</button>
          }
        </div>
      </form>
    </div>
  `
})
export class UserManagementComponent implements OnInit {

  private fb = inject(FormBuilder);
  public form = this.fb.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    age: [18, [Validators.required, Validators.min(18)]],
    role: ['', Validators.required],
  });
  public isEdit = false;
  public isInfo = false;

  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private userService: UserService = inject(UserService);

  ngOnInit(): void {
    this.setMode();
    if (this.isEdit || this.isInfo) {
      const userId = this.activatedRoute.snapshot.params['id'];
      this.userService.getById(userId).pipe(
          tap(user => {
            this.form.setValue({
              name: user.name,
              surname: user.surname,
              email: user.email,
              age: user.age,
              role: user.role
            });
            if (this.isInfo) {
              const controls = (this.form as FormGroup).controls;
              Object.keys(controls).forEach((key: any) => controls[key].disable());
            }
          })
      ).subscribe();
    }
  }

  public saveData(): void {
    if (this.form.invalid) return;

    // const user: User = this.form.value;
    //
    // if (this.isEdit && this.userId) {
    //   this.userService.update({...user, id: this.userId}).subscribe(() => {
    //     this.router.navigate(['/users']);
    //   });
    // } else {
    //   this.userService.add(user).subscribe(() => {
    //     this.router.navigate(['/users']);
    //   });
    // }
  }

  public getTitleForm(): string {
    if (this.isEdit) {
      return 'Modifica Utente';
    } else if (this.isInfo) {
      return 'Info Utente';
    } else {
      return 'Creazione Utente';
    }
  }

  private setMode() {
    const mode = this.activatedRoute.snapshot.params['mode'];
    mode === 'edit' ? this.isEdit = true : mode === 'info' ? this.isInfo = true : '';
  }
}
