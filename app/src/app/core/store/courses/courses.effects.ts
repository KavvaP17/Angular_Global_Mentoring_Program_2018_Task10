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


@Injectable()
export class CoursesEffects {

  constructor(private actions$: Actions,
              private store$: Store<AppState>,
              private courseService: CourseService) {}

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
      .catch(error => new CoursesActions.GetCoursesSuccess(error));
    })
  );

  @Effect()
  addCourse$: Observable<Action> = this.actions$.pipe(
    ofType(CoursesActions.CoursesActionTypes.ADD_COURSE),
    switchMap((action: any) => {
      return this.courseService.createCourse(action.payload).toPromise()
      .then((data: CoursesRseponse) => {
        return new CoursesActions.AddCoursesSuccess();
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
      const page = state.page;
      return this.courseService.removeCourse(value[0].payload).toPromise()
      .then(() => {
        console.log((state.page + 1) * state.pageSize);
        console.log(state.length);
        if (state.page * state.pageSize >= state.length - 1) {
          // поправить!!!
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
    switchMap((action: any) => {
      return this.courseService.updateCourse(action.payload).toPromise()
      .then((data: CoursesRseponse) => {
        return new CoursesActions.UpdateCourseSuccess(action.payload);
      })
      .catch(error => new CoursesActions.UpdateCourseError(error));
    })
  );
}
