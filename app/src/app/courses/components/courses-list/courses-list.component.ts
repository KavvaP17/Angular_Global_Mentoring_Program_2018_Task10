import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Course } from '../../models/course.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/store/app.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesListComponent implements OnInit {
  @Output() delete = new EventEmitter<void>();

  public coursesArrayEmptyMsg = 'NO DATA, PLEASE CLICK ADD COURSE TO INSERT NEW CORSE';
  public courses$: Observable<ReadonlyArray<Course>>;
  
  constructor(private coursesStore: Store<AppState>) { }

  ngOnInit() {
    this.courses$ = this.coursesStore
      .select( state => state.courses.data);
  }

  public deleteCourse(id): void {
    this.delete.emit(id);
  }
}
