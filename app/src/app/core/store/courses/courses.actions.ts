import { Action } from '@ngrx/store';
import { Course } from '../../../courses/models/course.model';
import { PageEvent } from '@angular/material';

export enum CoursesActionTypes {
  GET_COURSES = '[Courses] GET_COURSES',
  GET_COURSES_SUCCESS = '[Courses] GET_COURSES_SUCCESS',
  GET_COURSES_ERROR = '[Courses] GET_COURSES_ERROR',
  ADD_COURSE = '[Courses] ADD_COURSE',
  ADD_COURSES_SUCCESS = '[Courses] ADD_COURSES_SUCCESS',
  ADD_COURSES_ERROR = '[Courses] ADD_COURSES_ERROR',
  UPDATE_COURSE = '[Courses] UPDATE_COURSE',
  UPDATE_COURSE_SUCCESS = '[Courses] UPDATE_COURSE_SUCCESS',
  UPDATE_COURSE_ERROR = '[Courses] UPDATE_COURSE_ERROR',
  DELETE_COURSE = '[Courses] DELETE_COURSE',
  DELETE_COURSE_SUCCESS = '[Courses] DELETE_COURSE_SUCCESS',
  DELETE_COURSE_ERROR = '[Courses] DELETE_COURSE_ERROR',
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

export class AddCourse implements Action {
  readonly type = CoursesActionTypes.ADD_COURSE;
  constructor(public payload: Course) {}
}

export class AddCoursesSuccess implements Action {
  readonly type = CoursesActionTypes.ADD_COURSES_SUCCESS;
}

export class AddCoursesError implements Action {
  readonly type = CoursesActionTypes.ADD_COURSES_ERROR;
  constructor(public payload: Error | string) {}
}

export class UpdateCourse implements Action {
  readonly type = CoursesActionTypes.UPDATE_COURSE;
  constructor(public payload: Course) {}
}

export class UpdateCourseSuccess implements Action {
  readonly type = CoursesActionTypes.UPDATE_COURSE_SUCCESS;
  constructor(public payload: Course) {}
}

export class UpdateCourseError implements Action {
  readonly type = CoursesActionTypes.UPDATE_COURSE_ERROR;
  constructor(public payload: Error | string) {}
}

export class DeleteCourse implements Action {
  readonly type = CoursesActionTypes.DELETE_COURSE;
  constructor(public payload: number) {}
}

export class DeleteCourseSuccess implements Action {
  readonly type = CoursesActionTypes.DELETE_COURSE_SUCCESS;
  constructor(public payload: any) {}
}

export class DeleteCourseError implements Action {
  readonly type = CoursesActionTypes.DELETE_COURSE_ERROR;
  constructor(public payload: Error | string) {}
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
  | AddCourse
  | AddCoursesSuccess
  | AddCoursesError
  | UpdateCourse
  | UpdateCourseSuccess
  | UpdateCourseError
  | DeleteCourse
  | DeleteCourseSuccess
  | DeleteCourseError
  | Pagination
  | Search;
