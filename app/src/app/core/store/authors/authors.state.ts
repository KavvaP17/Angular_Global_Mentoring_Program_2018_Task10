export interface Author {
  id: number;
  firstName: string;
  lastName: string;
}

export interface AuthorsState {
  data: ReadonlyArray<Author>;
  error: string | Error;
  loading: boolean;
  loaded: boolean;
}

export const initialAuthorsState: AuthorsState = {
  data: [],
  error: null,
  loading: false,
  loaded: false,
};
