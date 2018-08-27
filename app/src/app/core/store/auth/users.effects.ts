import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { User } from '../../../auth/models/user.model';

import * as UsersActions from './users.actions';

import { Observable } from 'rxjs';
import { switchMap} from 'rxjs/operators';

import { AuthService } from '../../../auth/services/auth/auth.service';
import { Router } from '@angular/router';


@Injectable()
export class UsersEffects {

  constructor(private actions$: Actions,
              private authService: AuthService,
              private router: Router) {}

  @Effect()
  login$: Observable<Action> = this.actions$.pipe(
    ofType(UsersActions.UsersActionTypes.LOGIN),
    switchMap((action: any) => {
      return this.authService.login(action.payload.login, action.payload.password).toPromise()
      .then((user: User) => {
        if (user) {
            localStorage.setItem('token', user.fakeToken);
            return new UsersActions.UserLoginSuccess(user);
        } else {
            return new UsersActions.UserLoginError('Invalid login or password');
        }
      })
      .catch(error => new UsersActions.UserLoginError(error));
    })
  );
}
