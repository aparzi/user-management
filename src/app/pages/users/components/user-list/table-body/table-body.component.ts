import {Directive, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {User} from '../../../models/User';

@Directive({
  selector: '[appTableBody]',
})
export class TableBodyDirective {
  @Input('appTableBody') user!: User;

  @Output() actionClicked: EventEmitter<string> = new EventEmitter<string>();
  @Output() deleteUserClicked: EventEmitter<User> = new EventEmitter<User>();

  @HostListener('click', ['$event.target'])
  onClick(target: HTMLElement) {
    console.log(target);
    const clickedButton = target.closest('#info-action, #edit-action, #delete-action');

    if (!clickedButton) {
      return;
    }

    if (clickedButton.id === 'info-action') {
      this.actionClicked.emit(`/user/info/${this.user.id}`);
    } else if (clickedButton.id === 'edit-action') {
      this.actionClicked.emit(`/user/edit/${this.user.id}`);
    } else {
      this.deleteUserClicked.emit(this.user);
    }
  }

}
