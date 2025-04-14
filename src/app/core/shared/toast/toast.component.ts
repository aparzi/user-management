import {AfterViewInit, Component, effect} from '@angular/core';
import {Toast} from 'bootstrap';
import {IToast, ToastService} from './toast.service';

@Component({
  selector: 'app-toast',
  template: `
    <div class="toast-container position-fixed top-0 end-0 p-3">
      <div id="custom_toast" class="toast text-white bg-{{currentConfig?.type}}" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
          <i class="bi bi-check-circle mr-2"
             [class.bi-success]="currentConfig?.type === 'success'"
             [class.bi-exclamation-circle-fill]="currentConfig?.type === 'warning' || currentConfig?.type === 'info'"
             [class.bi-x-octagon]="currentConfig?.type === 'danger'">
          </i>
          <strong class="ms-2 me-auto">{{ currentConfig?.title }}</strong>
          <small>{{ currentConfig?.subtitle }}</small>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
          {{ currentConfig?.message }}
        </div>
      </div>
    </div>
  `
})
export class ToastComponent implements AfterViewInit {

  public currentConfig: IToast | undefined;

  private toastInstance!: Toast;

  constructor(private toastService: ToastService) {
    effect(() => {
      this.currentConfig = this.toastService.getStatusToast();
      if (this.currentConfig) {
        this.toastInstance.show();
      }
    });
  }

  ngAfterViewInit() {
    const el = document.getElementById('custom_toast');
    if (el) {
      this.toastInstance = new Toast(el, {autohide: true, delay: 3000});
    }
  }
}
