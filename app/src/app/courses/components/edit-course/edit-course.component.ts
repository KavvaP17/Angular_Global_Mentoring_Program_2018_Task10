import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, Params, ActivatedRoute} from '@angular/router';
import { FormControl } from '@angular/forms';
import { Course } from '../../models/course.model';
import * as coursesActions from '../../../core/store/courses/courses.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/store/app.state';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit, OnDestroy {

  public id;
  public topRated = false;
  public img = '';
  public editCourseForm: FormGroup;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private coursesStore: Store<AppState>,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.editCourseForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', Validators.maxLength(500)],
      date: [''],
      duration: [0],
      authors: [[]]
    });
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.coursesStore
        .select( state => state.courses.editedCourse)
        .subscribe((editedCourse: any) => {
          const course = editedCourse ? editedCourse.course : null;
          if (course) {
             const courseDate = (+course.creation) ? new FormControl(new Date(+course.creation))
                                                : new FormControl(new Date(Date.parse(String(course.creation))));

            this.editCourseForm = this.fb.group({
              title: [course.title, [Validators.required, Validators.maxLength(50)]],
              description: [course.description, Validators.maxLength(500)],
              date: courseDate,
              duration: [course.duration],
              authors: [course.authors]
            });
            this.topRated = course.topRated;
            this.img = course.img;
          } else {
            this.coursesStore.dispatch(new coursesActions.GetCourse(this.id));
            // this.router.navigate(['courses']);
          }
        });
    });
  }

  cancel() {
    this.router.navigate(['courses']);
  }

  save() {
    const course = new Course(this.id, this.editCourseForm.controls.title.value, +this.editCourseForm.controls.date.value,
      this.editCourseForm.controls.duration.value, this.editCourseForm.controls.description.value, this.topRated,
      this.editCourseForm.controls.authors.value, this.img);
      this.coursesStore.dispatch(new coursesActions.UpdateCourse(course));
    this.router.navigate(['courses']);
  }

  ngOnDestroy() {}

}
