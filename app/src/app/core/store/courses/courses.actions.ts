import { Action } from '@ngrx/store';
import { Course } from '../../../courses/models/course.model';
import { PageEvent } from '@angular/material';

export enum CoursesActionTypes {
  GET_COURSES = '[Courses] GET_COURSES',
  GET_COURSES_SUCCESS = '[Courses] GET_COURSES_SUCCESS',
  GET_COURSES_ERROR = '[Courses] GET_COURSES_ERROR',
  GET_COURSE = '[Courses] GET_COURSE',
  ADD_COURSE = '[Courses] ADD_COURSE',
  UPDATE_COURSE = '[Courses] UPDATE_COURSE',
  DELETE_COURSE = '[Courses] DELETE_COURSE',
  PAGINATION = '[Courses] PAGINATION',
  SEARCH = '[Courses] SEARCH'
}

export class GetCourses implements Action {
  readonly type = CoursesActionTypes.GET_COURSES;
}

export class GetCoursesSuccess implements Action {
  readonly type = CoursesActionTypes.GET_COURSES_SUCCESS;
  constructor(public payload: any) {}
}

export class GetCoursesError implements Action {
  readonly type = CoursesActionTypes.GET_COURSES_ERROR;
  constructor(public payload: Error | string) {}
}

export class GetCourse implements Action {
  readonly type = CoursesActionTypes.GET_COURSE;
  constructor(public payload: string) {}
}

export class AddCourse implements Action {
  readonly type = CoursesActionTypes.ADD_COURSE;
  constructor(public payload: Course) {}
}

export class UpdateCourse implements Action {
  readonly type = CoursesActionTypes.UPDATE_COURSE;
  constructor(public payload: Course) {}
}

export class DeleteCourse implements Action {
  readonly type = CoursesActionTypes.DELETE_COURSE;
  constructor(public payload: Course) {}
}

export class Pagination implements Action {
  readonly type = CoursesActionTypes.PAGINATION;
  constructor(public payload: PageEvent) {}
}

export class Search implements Action {
  readonly type = CoursesActionTypes.SEARCH;
  constructor(public payload: string) {}
}

export type CoursesActions =
  GetCourses
  | GetCoursesSuccess
  | GetCoursesError
  | GetCourse
  | AddCourse
  | UpdateCourse
  | DeleteCourse
  | Pagination
  | Search;
