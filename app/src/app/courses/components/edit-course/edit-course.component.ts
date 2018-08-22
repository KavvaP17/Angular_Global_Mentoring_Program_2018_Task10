import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, Params, ActivatedRoute} from '@angular/router';
import { CourseService } from '../../services/course/course.service';
import { FormControl } from '@angular/forms';
import { Course } from '../../models/course.model';
import { Subscription } from 'rxjs';
import { LoadingService } from '../../../core/services/loading/loading.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit, OnDestroy {

  public id;
  public courseTitle = '';
  public courseDescription = '';
  public courseDuration = 0;
  public courseDate = new FormControl();
  public courseAuthors = '';
  public topRated = false;

  private getCourseByIdSub: Subscription;
  private updateCourseSub: Subscription;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private courseService: CourseService,
              private loadingService: LoadingService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.loadingService.setIsLoadingValue(true);
      this.id = +params.id;
      this.getCourseByIdSub = this.courseService.getCourseById(this.id)
        .pipe( delay(200) )
        .subscribe((course: Course) => {
          if (course) {
            this.courseTitle = course.title;
            this.courseDescription = course.description;
            this.courseDuration = course.duration;
            this.courseDate = (+course.creation) ? new FormControl(new Date(+course.creation))
                                                : new FormControl(new Date(Date.parse(String(course.creation))));
            this.topRated = course.topRated;
            this.courseAuthors = '';
          } else {
            this.router.navigate(['courses']);
          }
          this.loadingService.setIsLoadingValue(false);
      });
    });
  }

  cancel() {
    this.router.navigate(['courses']);
  }

  save() {
    // this.loadingService.setIsLoadingValue(true);
    this.updateCourseSub = this.courseService.updateCourse(this.id, this.courseTitle, +this.courseDate.value,
      this.courseDuration, this.courseDescription, this.topRated).subscribe(() => {
        this.router.navigate(['courses']);
        // this.loadingService.setIsLoadingValue(false);
    });
  }

  ngOnDestroy() {
    if (this.getCourseByIdSub) {
      this.getCourseByIdSub.unsubscribe();
    }
    if (this.updateCourseSub) {
      this.updateCourseSub.unsubscribe();
    }
  }

}
