import {Component, inject, OnInit} from '@angular/core';
import {UserService} from '../../services/users.service';
import {User} from '../../models/User';
import {NgForOf, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {NgbPagination} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-user-list',
  imports: [
    NgForOf,
    RouterLink,
    NgIf,
    NgbPagination,
    FormsModule
  ],
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {

  usersPaginated: User[] = [];
  page = 1;
  pageSize = 10;
  collectionSize = 0;

  private users: User[] = [];
  private userService = inject(UserService);

  ngOnInit() {
    this.userService.getAll().subscribe(data => {
      this.users = data;
      this.collectionSize = this.users?.length;
      this.refreshUsers();
    });
  }

  deleteUser(id: number) {
    if (confirm('Sei sicuro di voler eliminare questo utente?')) {
      this.userService.delete(id).subscribe(() => {
        this.users = this.users.filter(u => u.id !== id);
      });
    }
  }

  refreshUsers() {
    this.usersPaginated = this.users?.slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize,
    );
  }

}
