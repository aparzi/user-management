import {Component, inject, OnInit} from '@angular/core';
import {UserService} from '../../services/users.service';
import {User} from '../../models/User';
import {NgForOf, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-user-list',
  imports: [
    NgForOf,
    RouterLink,
    NgIf
  ],
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {

  users: User[] = [];
  private userService = inject(UserService);

  ngOnInit() {
    this.userService.getAll().subscribe(data => this.users = data);
  }

  deleteUser(id: number) {
    if (confirm('Sei sicuro di voler eliminare questo utente?')) {
      this.userService.delete(id).subscribe(() => {
        this.users = this.users.filter(u => u.id !== id);
      });
    }
  }

}
