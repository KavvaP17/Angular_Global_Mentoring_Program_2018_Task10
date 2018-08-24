import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from '../../services/course/course.service';
import { Subscription } from 'rxjs';
import { LoadingService } from '../../../core/services/loading/loading.service';
import * as coursesActions from '../../../core/store/courses/courses.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/store/app.state';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit, OnDestroy {

  public courseTitle = '';
  public courseDescription = '';
  public courseDuration = 0;
  public courseDate;
  public courseAuthors = '';

  constructor(private router: Router,
              private coursesStore: Store<AppState>) { }

  ngOnInit() {
  }

  public close() {
    this.router.navigate(['courses']);
  }

  public save() {
    const id = Date.now();
    const course = new Course(id, this.courseTitle, this.courseDate, this.courseDuration, this.courseDescription, false, []);
    this.coursesStore.dispatch(new coursesActions.AddCourse(course));
    this.router.navigate(['courses']);
  }

  ngOnDestroy() {}

}
