import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from '../../services/course/course.service';
import { Subscription } from 'rxjs';
import { LoadingService } from '../../../core/services/loading/loading.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit, OnDestroy {

  public courseTitle = '';
  public courseDescription = '';
  public courseDuration = 0;
  public courseDate;
  public courseAuthors = '';

  private createCourseSub: Subscription;

  constructor(private router: Router,
              private courseService: CourseService,
              private loadingService: LoadingService) { }

  ngOnInit() {
  }

  public close() {
    this.router.navigate(['courses']);
  }

  public save() {
    this.loadingService.setIsLoadingValue(true);
    this.createCourseSub = this.courseService.createCourse(this.courseTitle, this.courseDate, this.courseDuration, this.courseDescription)
      .subscribe(() => {
        this.router.navigate(['courses']);
        this.loadingService.setIsLoadingValue(false);
      });
  }

  ngOnDestroy() {
    if (this.createCourseSub) {
      this.createCourseSub.unsubscribe();
    }
  }

}
