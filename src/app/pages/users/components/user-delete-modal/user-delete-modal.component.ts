import {Component, inject, input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {User} from '../../models/User';

@Component({
  selector: 'app-user-delete-modal',
  imports: [],
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Elimina utente</h4>
      <button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss()"></button>
    </div>
    <div class="modal-body">
      <p>Sei sicuro di voler eliminare l'utente {{user()?.name}} {{user()?.surname}}!</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-secondary" (click)="activeModal.dismiss()">Annulla</button>
      <button type="button" class="btn btn-success" (click)="confirm()">Conferma</button>
    </div>
  `
})
export class UserDeleteModalComponent {

  activeModal = inject(NgbActiveModal);

  user = input<User>();

  confirm() {
    this.activeModal.close();
  }
}
