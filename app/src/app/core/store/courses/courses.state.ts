import { Course } from '../../../courses/models/course.model';

export interface CoursesState {
  data: ReadonlyArray<Course>;
  readonly loading: boolean;
  readonly loaded: boolean;
  readonly error: Error | string;
}

export const initialCourseState: CoursesState = {
  data: [],
  loading: false,
  loaded: false,
  error: null
};
