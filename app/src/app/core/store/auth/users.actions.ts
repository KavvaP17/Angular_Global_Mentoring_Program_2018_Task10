import { Action } from '@ngrx/store';
import { User } from '../../../auth/models/user.model';

export enum UsersActionTypes {
  LOGIN = '[Users] LOGIN',
  LOGIN_SUCCESS = '[Users] LOGIN_SUCCESS',
  LOGIN_ERROR = '[Users] LOGIN_ERROR',
  LOGOUT = '[Users] LOGOUT'
}

export class UserLogin implements Action {
    readonly type = UsersActionTypes.LOGIN;
    constructor(public payload: any) {}
}

export class UserLoginSuccess implements Action {
    readonly type = UsersActionTypes.LOGIN_SUCCESS;
    constructor(public payload: User) {}
}

export class UserLoginError implements Action {
    readonly type = UsersActionTypes.LOGIN_ERROR;
    constructor(public payload: Error | string) {}
}

export class UserLogout implements Action {
    readonly type = UsersActionTypes.LOGOUT;
}

export type UsersActions =
    UserLogin
    | UserLoginSuccess
    | UserLoginError
    | UserLogout;