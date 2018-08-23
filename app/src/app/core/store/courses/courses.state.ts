import { Course } from '../../../courses/models/course.model';

export interface CoursesState {
  data: ReadonlyArray<Course>;
  readonly loading: boolean;
  readonly loaded: boolean;
  readonly error: Error | string;
  readonly page: number;
  readonly pageSize: number;
  readonly search: string;
  readonly length: number;
}

export const initialCourseState: CoursesState = {
  data: [],
  loading: false,
  loaded: false,
  error: null,
  page: 0,
  pageSize: 5,
  search: '',
  length: 0
};
