import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, Params, ActivatedRoute} from '@angular/router';
import { FormControl } from '@angular/forms';
import { Course } from '../../models/course.model';
import * as coursesActions from '../../../core/store/courses/courses.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/store/app.state';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit, OnDestroy {

  public id;
  public courseTitle = '';
  public courseDescription = '';
  public courseDuration = 0;
  public courseDate = new FormControl();
  public courseAuthors = '';
  public topRated = false;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private coursesStore: Store<AppState>) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.coursesStore
        .select( state => state.courses.data)
        .subscribe((courses: Course[]) => {
          const course = courses.find((item) => item.id === this.id);
          if (course) {
            this.courseTitle = course.title;
            this.courseDescription = course.description;
            this.courseDuration = course.duration;
            this.courseDate = (+course.creation) ? new FormControl(new Date(+course.creation))
                                                : new FormControl(new Date(Date.parse(String(course.creation))));
            this.topRated = course.topRated;
            this.courseAuthors = '';
          } else {
            this.router.navigate(['courses']);
          }
        });
    });
  }

  cancel() {
    this.router.navigate(['courses']);
  }

  save() {
    const course = new Course(this.id, this.courseTitle, +this.courseDate.value,
      this.courseDuration, this.courseDescription, this.topRated, []);
      this.coursesStore.dispatch(new coursesActions.UpdateCourse(course));
    this.router.navigate(['courses']);
  }

  ngOnDestroy() {}

}
