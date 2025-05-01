import {Component, inject, OnInit, signal} from '@angular/core';
import {UserService} from '../../services/users.service';
import {User} from '../../models/User';
import {Router, RouterLink} from '@angular/router';
import {NgbModal, NgbPagination, NgbTooltip} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {UserDeleteModalComponent} from '../user-delete-modal/user-delete-modal.component';
import {tap} from 'rxjs';
import {ToastService} from '../../../../core/shared/toast/toast.service';
import {TableBodyDirective} from './table-body/table-body.component';

@Component({
  selector: 'app-user-list',
  imports: [
    RouterLink,
    NgbPagination,
    FormsModule,
    TableBodyDirective,
    NgbTooltip
  ],
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {

  public usersPaginated: User[] = [];
  public page = 1;
  public pageSize = 10;
  public collectionSize = 0;

  private users: User[] = [];
  private userService = inject(UserService);
  private modalService = inject(NgbModal);
  private toastService = inject(ToastService);
  private router = inject(Router);

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAll().subscribe(data => {
      this.users = data;
      this.collectionSize = this.users?.length;
      this.refreshUsers();
    });
  }

  deleteUser(user: User) {
    const componentRef = this.modalService.open(UserDeleteModalComponent);
    componentRef.componentInstance.user = signal(user);
    componentRef.closed.pipe(
      tap(res => {
        if (res?.result) {
          this.toastService.show({type: 'success', title: 'Successo', message: 'Operazione completata!'});
          this.getAllUsers();
        } else {
          this.toastService.show({type: 'danger', title: 'Errore', message: 'Si è verificato un problema!'});
        }
      })
    ).subscribe();
  }

  refreshUsers() {
    this.usersPaginated = this.users?.slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize,
    );
  }

  actionClicked(path: string): void {
    this.router.navigate([path]);
  }
}
