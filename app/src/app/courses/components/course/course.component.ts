import { Component, OnInit, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';

import { Course } from '../../models/course.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/store/app.state';
import * as coursesActions from '../../../core/store/courses/courses.actions';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseComponent implements OnInit {
  @Input() course: Course;
  @Output() deleteCourse = new EventEmitter<number>();
  public randomUrl: String;

  constructor(public dialog: MatDialog,
              private coursesStore: Store<AppState>) { }

  ngOnInit() { }

  public delete(event) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '235px',
      data: {title: this.course.title}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteCourse.emit(this.course.id);
      }
    });
  }

  public editCourse(id) {
    this.coursesStore.dispatch(new coursesActions.GetCourse(id));
  }

  public changeRated(event) {
    event.stopPropagation();
    this.course.topRated = !this.course.topRated;
  }
}
