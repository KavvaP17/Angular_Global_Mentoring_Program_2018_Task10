import { AuthorsActionTypes, AuthorsActions } from './authors.actions';
import { AuthorsState, initialAuthorsState, Author} from './authors.state';

export function authorsReducer(state = initialAuthorsState, action: AuthorsActions): AuthorsState {
  switch (action.type) {
    case AuthorsActionTypes.GET_AUTHORS: {
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    }
    case AuthorsActionTypes.GET_AUTHORS_SUCCESS: {
      const data = [...(<Array<Author>>action.payload)];
      return {
        ...state,
        data,
        loading: false,
        loaded: true,
      };
    }
    case AuthorsActionTypes.GET_AUTHORS_ERROR: {
      const error = action.payload;
      return {
        ...state,
        loading: false,
        loaded: false,
        error
      };
    }
    default:
      return state;
  }
}
