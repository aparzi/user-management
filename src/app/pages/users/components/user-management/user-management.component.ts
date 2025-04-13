import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-user-management',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  template: `
    <div class="container mt-4">
      <h2 class="text-white">{{ isEdit ? 'Modifica Utente' : 'Nuovo Utente' }}</h2>
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
              <input type="text" class="form-control" formControlName="name">
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
              <input type="number" class="form-control" formControlName="eta">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3 col-xs-6">
            <div class="mb-3">
              <label>Ruolo</label>
              <select class="form-control" id="inputGroupSelect01">
                <option selected value="1">Admin</option>
                <option value="2">Moderatore</option>
                <option value="3">Viewer</option>
              </select>
            </div>
          </div>
        </div>

        <hr />

        <div class="d-flex justify-content-between">
          <button class="btn btn-outline-warning" type="button" routerLink="/list">Annulla</button>
          <button class="btn btn-success" type="submit">Salva</button>
        </div>
      </form>
    </div>
  `
})
export class UserManagementComponent {

  private fb = inject(FormBuilder);

  public isEdit = false;
  public form = this.fb.group({
    name: [''],
    email: [''],
    eta: [''],
  });


  public saveData(): void {

  }
}
