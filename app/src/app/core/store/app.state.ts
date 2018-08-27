import { CoursesState } from './courses/courses.state';
import { UsersState } from './auth/users.state';

export interface AppState {
  courses: CoursesState;
  user: UsersState;
}
