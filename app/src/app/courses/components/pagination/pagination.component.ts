import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { PageEvent, MatPaginator } from '@angular/material';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/store/app.state';
import * as coursesActions from '../../../core/store/courses/courses.actions';
import { PaginationService } from '../../services/pagination/pagination.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, AfterViewInit, OnDestroy {

   public length: Observable<number>;
   public pageSize: Observable<number>;
   public pageSizeOptions: Array<Number> = [5, 10, 15];
   public pageEvent: PageEvent;
   private paginatorEventSub: Subscription;

   @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private coursesStore: Store<AppState>,
              private paginationServise: PaginationService) { }

  ngOnInit() {
    this.paginationServise.init(this.paginator);
    this.length = this.coursesStore
      .select( state => state.courses.length);
    this.pageSize = this.coursesStore
      .select( state => state.courses.pageSize);
  }

  ngAfterViewInit() {
    this.paginatorEventSub = this.paginator.page.subscribe(() => {
      this.coursesStore.dispatch(new coursesActions.Pagination(this.pageEvent));
      this.coursesStore.dispatch(new coursesActions.GetCourses());
    });
  }

  public setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  ngOnDestroy() {
    if (this.paginatorEventSub) {
      this.paginatorEventSub.unsubscribe();
    }
  }

}
