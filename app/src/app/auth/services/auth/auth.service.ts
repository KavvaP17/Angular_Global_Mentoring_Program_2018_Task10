import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/store/app.state';
import * as usersActions from '../../../core/store/auth/users.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isAuthenticated$: Observable<boolean>;
  private serverURL = 'http://localhost:3004/';

  constructor(private http: HttpClient,
              private store: Store<AppState>,
              private router: Router) {
    this.isAuthenticated$ = this.store.select((state: any) => {
      if (state.users){
        return state.users.isAuthenticated;
      }
      return false;
    });
  }

  login(login: string, password: string): Observable<User> {
    const url = `${this.serverURL}users`;
    return this.http.get(url).pipe(
      map((users: Array<User>) => {
        const user = users.find((item) => {
          return item.login === login && item.password === password;
        });
        return user;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.store.dispatch(new usersActions.UserLogout());
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticated$.pipe(map((isAuth) => {
      if ( !isAuth && localStorage.getItem('token')) {
        const url = `${this.serverURL}users`;
        this.http.get(url).pipe(
          map((users: Array<User>) => {
            const user = users.find((item) => {
              return item.fakeToken === localStorage.getItem('token');
            });
            if (user) {
              this.store.dispatch(new usersActions.UserLogin({login: user.login, password: user.password}));
            } else {
              localStorage.removeItem('token');
              this.store.dispatch(new usersActions.UserLogout());
              this.router.navigate(['/auth']);
            }
          })
        ).subscribe();
        return true;
      } else {
        return isAuth;
      }
    }));
  }

}
