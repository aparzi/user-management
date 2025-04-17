import {computed, Injectable, signal} from '@angular/core';
import {User} from '../../users/models/User';
import {map, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:50000/operators';

  private _currentUser = signal<User | null>(null);
  readonly isAuthenticated = computed(() => this._currentUser() !== null);
  readonly currentUser = this._currentUser.asReadonly();

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<User | null> {
    return this.http
      .get<User[]>(`${this.apiUrl}?username=${username}&password=${password}`)
      .pipe(
        map(users => {
          if (users.length) {
            this._currentUser.set(users[0]);
            localStorage.setItem('user', JSON.stringify(this._currentUser()));
            return users[0];
          } else {
            return null;
          }
        })
      );
  }

  getUserLogged(): void {
    if (localStorage.getItem('user')) {
        this._currentUser.set(JSON.parse(localStorage.getItem('user')!));
    } else {
      this.logout();
    }
  }

  logout() {
    this._currentUser.set(null);
    localStorage.clear();
  }

}
