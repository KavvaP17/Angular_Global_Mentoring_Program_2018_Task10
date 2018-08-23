import { Component, OnInit, OnDestroy } from '@angular/core';
import { CourseService } from './services/course/course.service';
import { PageEvent } from '@angular/material';
import { Course } from './models/course.model';
import { PaginationService } from './services/pagination/pagination.service';
import { Subscription } from 'rxjs';
import { LoadingService } from '../core/services/loading/loading.service';
import { delay } from 'rxjs/operators';

import { Store, select } from '@ngrx/store';
import { AppState } from '../core/store/app.state';
import { CoursesState } from '../core/store/courses/courses.state';
import { Observable } from 'rxjs';
import * as coursesActions from '../core/store/courses/courses.actions';
import { CoursesRseponse } from './models/courses-response.interface';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit, OnDestroy {

  public coursesState$: Observable<CoursesState>;
  public searchValue = '';
  public courses: Course[] = [];
  public length = 0;
  public pageIndex = 0;
  public pageSize = 5;

  private deleteSub: Subscription;
  private getCoursesSub: Subscription;

  constructor(private courseService: CourseService,
              private paginationService: PaginationService,
              private loadingService: LoadingService,
              private coursesStore: Store<AppState>) { }

  ngOnInit() {
    this.coursesStore.dispatch(new coursesActions.GetCourses());
  }

  public search(searchValue): void {
    if (searchValue !== this.searchValue) {
      this.searchValue = searchValue;
      this.pageIndex = 0;
      this.paginationService.reset();
      this.getCourses();
    }
  }

  public delete(id) {
    this.deleteSub = this.courseService.removeCourse(id).subscribe(() => {
      if (this.pageIndex * this.pageSize + 1 >= this.length) {
        this.paginationService.previousPage();
      }
      this.getCourses();
    });
  }

  private getCourses() {
    this.loadingService.setIsLoadingValue(true);
    const start = this.pageIndex * this.pageSize;
    this.getCoursesSub = this.courseService.getCoursesList(start, this.pageSize, this.searchValue)
      .pipe( delay(400) )
      .subscribe( (coursesList: CoursesRseponse) => {
          this.courses = coursesList.courses;
          this.length = coursesList.length;
          this.loadingService.setIsLoadingValue(false);
      });
  }

  ngOnDestroy() {
    if (this.deleteSub) {
      this.deleteSub.unsubscribe();
    }
    if (this.getCoursesSub) {
      this.getCoursesSub.unsubscribe();
    }
  }
}
