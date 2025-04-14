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

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<User | null> {
    return this.http
      .get<User[]>(`${this.apiUrl}?username=${username}&password=${password}`)
      .pipe(
        map(users => {
          if (users.length) {
            this._currentUser.set(users[0]);
            return users[0];
          } else {
            return null;
          }
        })
      );
  }

  logout() {
    this._currentUser.set(null);
  }

}
