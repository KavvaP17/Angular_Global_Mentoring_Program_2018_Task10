import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from '../core/store/app.state';
import * as coursesActions from '../core/store/courses/courses.actions';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  constructor(private coursesStore: Store<AppState>) { }

  ngOnInit() {
    this.coursesStore.dispatch(new coursesActions.GetCourses());
  }

  public delete(id) {
    this.coursesStore.dispatch(new coursesActions.DeleteCourse(id));
  }

}
