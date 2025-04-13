import {AfterViewInit, Component, effect, input} from '@angular/core';
import {Toast} from 'bootstrap';
import {ToastService} from './toast.service';

@Component({
  selector: 'app-toast',
  template: `
    <div class="toast-container position-fixed top-0 end-0 p-3">
      <div id="custom_toast" class="toast text-white bg-success" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
          <i class="bi bi-check-circle mr-2"
             [class.bi-success]="type() === 'success'"
             [class.bi-exclamation-circle-fill]="type() === 'warning'"
             [class.bi-x-octagon]="type() === 'error'">
          </i>
          <strong class="ms-2 me-auto">{{ title() }}</strong>
          <small>{{ subtitle() }}</small>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
          {{ message() }}
        </div>
      </div>
    </div>
  `
})
export class ToastComponent implements AfterViewInit {

  type = input.required<'success' | 'warning' | 'error'>();
  title = input<string>();
  message = input<string>();
  subtitle = input<string>();
  autohide = input<boolean>(true);

  private toastInstance!: Toast;

  constructor(private toastService: ToastService) {
    effect(() => {
      console.log('ciao', this.toastService.getStatusToast());
      if (this.toastService.getStatusToast()) {
        this.toastInstance.show();
        queueMicrotask(() => this.toastService.hide());
      }
    });
  }

  ngAfterViewInit() {
    const el = document.getElementById('custom_toast');
    if (el) {
      this.toastInstance = new Toast(el, {autohide: this.autohide(), delay: 4000});
    }
  }
}
