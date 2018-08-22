import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesListComponent implements OnInit {
  @Input() courses: Course[];
  @Output() delete = new EventEmitter<void>();

  public coursesArrayEmptyMsg = 'NO DATA, PLEASE CLICK ADD COURSE TO INSERT NEW CORSE';

  constructor() { }

  ngOnInit() {}

  public deleteCourse(id): void {
    this.delete.emit(id);
  }
}
