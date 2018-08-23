import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';

import * as CoursesActions from './courses.actions';

import { Observable } from 'rxjs';
import { switchMap, withLatestFrom } from 'rxjs/operators';

import { CourseService } from '../../../courses/services/course/course.service';
import { CoursesRseponse } from '../../../courses/models/courses-response.interface';
import { AppState } from '../app.state';


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
        return new CoursesActions.GetCoursesSuccess({courses: data.courses, length: data.length})
      })
      .catch(error => new CoursesActions.GetCoursesSuccess(error))
    })
  );
}
