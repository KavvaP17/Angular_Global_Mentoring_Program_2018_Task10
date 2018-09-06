import { Action } from '@ngrx/store';

export enum AuthorsActionTypes {
  GET_AUTHORS = '[Authors] GET_AUTHORS',
  GET_AUTHORS_SUCCESS = '[Authors] GET_AUTHORS_SUCCESS',
  GET_AUTHORS_ERROR = '[Authors] GET_AUTHORS_ERROR',
}

export class GetAuthors implements Action {
  readonly type = AuthorsActionTypes.GET_AUTHORS;
}

export class GetAuthorsSuccess implements Action {
  readonly type = AuthorsActionTypes.GET_AUTHORS_SUCCESS;
  constructor(public payload: any) {}
}

export class GetAuthorsError implements Action {
  readonly type = AuthorsActionTypes.GET_AUTHORS_ERROR;
  constructor(public payload: Error | string) {}
}



export type AuthorsActions =
  GetAuthors
  | GetAuthorsSuccess
  | GetAuthorsError;
