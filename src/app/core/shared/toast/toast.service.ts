import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private statusToast = signal(false);

  show() {
    this.statusToast.set(true);
  }

  hide() {
    this.statusToast.set(false);
  }

  getStatusToast = this.statusToast.asReadonly();
}
