import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import * as coursesActions from '../../../core/store/courses/courses.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/store/app.state';
import { Course } from '../../models/course.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit, OnDestroy {

  public courseAuthors = '';
  public courseForm: FormGroup;

  constructor(private router: Router,
              private coursesStore: Store<AppState>,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', Validators.maxLength(500)],
      date: [''],
      duration: [0],
      authors: [[]]
    });
  }

  public close() {
    this.router.navigate(['courses']);
  }

  public save() {
    const id = Date.now();
    const random = Math.ceil(Math.random() * 100);
    const randomUrl = `https://loremflickr.com/300/200?random=${random}`;
    const course = new Course(id, this.courseForm.controls.title.value, this.courseForm.controls.date.value,
      this.courseForm.controls.duration.value, this.courseForm.controls.description.value, false,
      this.courseForm.controls.authors.value, randomUrl);
    this.coursesStore.dispatch(new coursesActions.AddCourse(course));
    this.router.navigate(['courses']);
  }

  ngOnDestroy() {}

}
