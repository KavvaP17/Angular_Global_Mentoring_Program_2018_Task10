import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import * as CoursesActions from './courses.actions';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { CourseService } from '../../../courses/services/course/course.service';
import { Course } from '../../../courses/models/course.model';
import { CoursesRseponse } from '../../../courses/models/courses-response.interface';


@Injectable()
export class CoursesEffects {

  constructor(private actions$: Actions,
              private courseService: CourseService) {}

  @Effect()
  getCourses$: Observable<Action> = this.actions$.pipe(
    ofType(CoursesActions.CoursesActionTypes.GET_COURSES),
    switchMap(() => this.courseService.getCoursesList().toPromise()
      .then((data: CoursesRseponse) => new CoursesActions.GetCoursesSuccess(data.courses))
      .catch(error => new CoursesActions.GetCoursesSuccess(error))
    )
  );
}
