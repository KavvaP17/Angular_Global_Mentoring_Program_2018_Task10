import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';

import * as CoursesActions from './courses.actions';

import { Observable } from 'rxjs';
import { switchMap, withLatestFrom } from 'rxjs/operators';

import { CourseService } from '../../../courses/services/course/course.service';
import { CoursesRseponse } from '../../../courses/models/courses-response.interface';
import { AppState } from '../app.state';
import { PaginationService } from '../../../courses/services/pagination/pagination.service';
import { Course } from '../../../courses/models/course.model';
import { Router } from '@angular/router';


@Injectable()
export class CoursesEffects {

  constructor(private actions$: Actions,
              private store$: Store<AppState>,
              private courseService: CourseService,
              private paginationService: PaginationService,
              private router: Router) {}

  @Effect()
  getCourses$: Observable<Action> = this.actions$.pipe(
    ofType(CoursesActions.CoursesActionTypes.GET_COURSES),
    withLatestFrom(this.store$),
    switchMap((value) => {
      const state = value[1].courses;
      const start = state.page * state.pageSize;
      const count = state.pageSize;
      const search = state.search;
      return this.courseService.getCoursesList(start, count, search).toPromise()
      .then((data: CoursesRseponse) => {
        return new CoursesActions.GetCoursesSuccess({courses: data.courses, length: data.length});
      })
      .catch(error => new CoursesActions.GetCoursesError(error));
    })
  );

  @Effect()
  getCourse$: Observable<Action> = this.actions$.pipe(
    ofType(CoursesActions.CoursesActionTypes.GET_COURSE),
    switchMap((action: any) => {
      return this.courseService.getCourseById(action.payload).toPromise()
      .then((data: Course) => {
        return new CoursesActions.GetCourseSuccess({course: data});
      })
      .catch(error => {
        this.router.navigate(['courses']);
        return new CoursesActions.GetCourseError(error)
      });
    })
  );

  @Effect()
  addCourse$: Observable<Action> = this.actions$.pipe(
    ofType(CoursesActions.CoursesActionTypes.ADD_COURSE),
    withLatestFrom(this.store$),
    switchMap((value: any) => {
      const state = value[1].courses;
      return this.courseService.createCourse(value[0].payload).toPromise()
      .then(() => {
        return  this.courseService.getCoursesList(0, state.pageSize, state.search).toPromise();
      })
      .then((data: CoursesRseponse) => {
        return new CoursesActions.AddCoursesSuccess({
          courses: data.courses,
          length: data.length,
          page: 0
        });
      })
      .catch(error => new CoursesActions.AddCoursesError(error));
    })
  );

  @Effect()
  DeleteCourse$: Observable<Action> = this.actions$.pipe(
    ofType(CoursesActions.CoursesActionTypes.DELETE_COURSE),
    withLatestFrom(this.store$),
    switchMap((value: any) => {
      const state = value[1].courses;
      return this.courseService.removeCourse(value[0].payload).toPromise()
      .then(() => {
        if (state.page * state.pageSize >= state.length - 1) {
          this.paginationService.previousPage();
          state.page -= 1;
        }
        const start = state.page * state.pageSize;
        return this.courseService.getCoursesList(start, state.pageSize, state.search).toPromise();
      })
      .then((data: CoursesRseponse) => {
        return new CoursesActions.DeleteCourseSuccess({
          courses: data.courses,
          length: data.length,
          page: state.page
        });
      })
      .catch(error => new CoursesActions.DeleteCourseError(error));
    })
  );

  @Effect()
  EditCourse$: Observable<Action> = this.actions$.pipe(
    ofType(CoursesActions.CoursesActionTypes.UPDATE_COURSE),
    withLatestFrom(this.store$),
    switchMap((value: any) => {
      const state = value[1].courses;
      return this.courseService.updateCourse(value[0].payload).toPromise()
      .then(() => {
        const start = state.page * state.pageSize;
        return this.courseService.getCoursesList(start, state.pageSize, state.search).toPromise();
      })
      .then((data: CoursesRseponse) => {
        return new CoursesActions.UpdateCourseSuccess({
          courses: data.courses,
          page: state.page
        });
      })
      .catch(error => new CoursesActions.UpdateCourseError(error));
    })
  );
}
