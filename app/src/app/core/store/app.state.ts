import { CoursesState } from './courses/courses.state';
import { UsersState } from './auth/users.state';
import { AuthorsState } from './authors/authors.state';

export interface AppState {
  courses: CoursesState;
  user: UsersState;
  authors: AuthorsState;
}
