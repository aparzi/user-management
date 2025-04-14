import {Injectable, signal} from '@angular/core';

export interface IToast {
  type: 'success' | 'warning' | 'danger' | 'info';
  title?: string;
  message?: string;
  subtitle?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private toast = signal<IToast | undefined>(undefined);

  show(config: IToast) {
    this.toast.update(_ => config);
  }

  getStatusToast = this.toast.asReadonly();
}
