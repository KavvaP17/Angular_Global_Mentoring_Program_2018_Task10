import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user.model';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user = new BehaviorSubject<User>(null);
  public isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private serverURL = 'http://localhost:3004/';

  constructor(private http: HttpClient) { }

  login(login: string, password: string): Observable<boolean> {
    this.user.next(null);
    this.isAuthenticatedSubject.next(false);
    const url = `${this.serverURL}users`;
    return this.http.get(url).pipe(
      map((users: Array<User>) => {
        const user = users.find((item) => {
          return item.login === login && item.password === password; 
        });
        if (user) {
          this.user.next(user);
          localStorage.setItem('token', user.fakeToken);
          this.isAuthenticatedSubject.next(true);
          return true;
        } else {
          this.isAuthenticatedSubject.next(false);
          return false;
        }
      })
    )
  }

  logout(): void {
    this.user.next(null);
    localStorage.removeItem('token');
    this.isAuthenticatedSubject.next(false);
  }

  isAuthenticated(): Observable<boolean> { 
    if ( !this.isAuthenticatedSubject.value && localStorage.getItem('token')) {
      const url = `${this.serverURL}users`;
      return this.http.get(url).pipe(
        map((users: Array<User>) => {
        const user = users.find((item) => {
          return item.fakeToken === localStorage.getItem('token') ; 
        });
        if (user) {
          this.user.next(user);
          this.isAuthenticatedSubject.next(true);
          return true;
        } else {
          this.isAuthenticatedSubject.next(false);
          return false;
        }
      }))
    } 

    return this.isAuthenticatedSubject;
  }

  getUserInfo() {
    return this.user;
  }

}
