import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Params } from '@angular/router';
import { CourseService } from '../../../courses/services/course/course.service';
import { Course } from '../../../courses/models/course.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  public breadcrumbs = '';

  private getCoursesByIdSub: Subscription;

  constructor(private router: Router,
              private courseService: CourseService) { }

  ngOnInit() {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentUrl = this.router.routerState.snapshot.url.split('/');
        const id = +currentUrl[currentUrl.length - 1];
        if (id) {
          this.getCoursesByIdSub = this.courseService.getCourseById(id)
            .subscribe((course: Course) => {
              if (course) {
                this.breadcrumbs = ` / ${course.title}`;
              } else {
                this.breadcrumbs = '';
              }
            });
        } else if (currentUrl[currentUrl.length - 1] === 'new') {
          this.breadcrumbs = ' / Add new course';
        } else {
          this.breadcrumbs = '';
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.getCoursesByIdSub) {
      this.getCoursesByIdSub.unsubscribe();
    }
  }
}

