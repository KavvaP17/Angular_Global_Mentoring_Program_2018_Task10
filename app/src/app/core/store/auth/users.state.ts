import { User, UserName } from '../../../auth/models/user.model';

export interface UsersState {
  id: number;
  fakeToken: string;
  name: UserName;
  login: string;
  password: string;
  isAuthenticated: boolean;
  loading: boolean;
  error: Error | string;
}

export const initialUsersState: UsersState = {
  id : null,
  fakeToken: null,
  name: null,
  login: null,
  password: null,
  isAuthenticated: false,
  loading: true,
  error: null
};
