import { UsersActionTypes, UsersActions } from './users.actions';
import { UsersState, initialUsersState} from './users.state';

export function usersReducer(state = initialUsersState, action: UsersActions): UsersState {
  switch (action.type) {
    case UsersActionTypes.LOGIN: {
      return {...state, loading: false};
    }
    case UsersActionTypes.LOGIN_SUCCESS: {
        const user = action.payload;
        return {
            ...state,
            id: user.id,
            fakeToken: user.fakeToken,
            name: user.name,
            login: user.login,
            password: user.password,
            loading: true,
            isAuthenticated: true
        };
    }
    case UsersActionTypes.LOGIN_ERROR: {
        const error = action.payload;
        return {
            ...state,
            loading: false,
            isAuthenticated: false,
            error
        };
    }
    case UsersActionTypes.LOGOUT: {
        return {
            ...state,
            id: null,
            fakeToken: null,
            name: null,
            login: null,
            password: null,
            loading: true,
            isAuthenticated: false
        };
    }
    default:
      return state;
  }
}
