import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import * as AuthorsActions from './authors.actions';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AuthorsEffects {

  private serverURl = 'http://localhost:3004/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };
  constructor(private actions$: Actions,
            private http: HttpClient) {}

  @Effect()
  getAuthors$: Observable<Action> = this.actions$.pipe(
    ofType(AuthorsActions.AuthorsActionTypes.GET_AUTHORS),
    switchMap((action) => {
      const url = `${this.serverURl}authors`;
      return this.http.get(url, this.httpOptions).toPromise()
        .then(data => {
          return new AuthorsActions.GetAuthorsSuccess(data);
        })
        .catch(error => new AuthorsActions.GetAuthorsError(error));
    })
  );
}
