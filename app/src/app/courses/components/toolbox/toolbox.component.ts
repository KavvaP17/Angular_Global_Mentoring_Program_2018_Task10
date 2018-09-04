import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AppState } from '../../../core/store/app.state';
import { Store } from '@ngrx/store';
import * as coursesActions from '../../../core/store/courses/courses.actions';
import { PaginationService } from '../../services/pagination/pagination.service';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.css']
})
export class ToolboxComponent implements OnInit {
  public searchValue = new BehaviorSubject<string>('');

  constructor(public router: Router,
              private coursesStore: Store<AppState>,
              private paginationService: PaginationService) { }

  ngOnInit() {
    this.searchValue
      .pipe(debounceTime(300))
      .subscribe((value) => {
        if (value && value.length > 2){
          this.coursesStore.dispatch(new coursesActions.Search(value));
          this.coursesStore.dispatch(new coursesActions.GetCourses());
          this.paginationService.reset();
        } else {
          const searchValueSub = this.coursesStore.select( state => state.courses.search)
            .subscribe((oldSearchValue) => {
              if (oldSearchValue !== '') {
                this.coursesStore.dispatch(new coursesActions.Search(''));
                this.coursesStore.dispatch(new coursesActions.GetCourses());
                this.paginationService.reset();
              }
            });
          searchValueSub.unsubscribe();
        }
      });
  }

  public openAddCoursePage() {
    this.router.navigate(['courses', 'new']);
  }

}
