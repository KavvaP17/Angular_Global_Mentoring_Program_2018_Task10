import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DurationPipe } from '../../pipes/duration/duration.pipe';
import { DecimalPipe } from '@angular/common';
import { MatDialog } from '@angular/material';

import { CourseComponent } from './course.component';
import { Course } from '../../models/course.model';

// corses Host component
import { Component } from '@angular/core';

@Component({
  template: `<app-course [course]="course" (deleteCourse)="deleteCourse($event)"></app-course>`,
})
class CourseHostComponent {
  public course: Course = new Course(1, 'course#1', Date.now(), 100,
                                    `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`, true);
  public deletedCourseId: number;
  public deleteCourse(id): void {
    this.deletedCourseId = id;
  }
}
// END: corses host component

describe('CourseComponent: Stand Alone testing', () => {
  let component: CourseComponent;
  let fixture: ComponentFixture<CourseComponent>;
  const course: Course = new Course(1, 'course#1', Date.now(), 100,
                                  `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`, true);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseComponent, DurationPipe ],
      providers: [DecimalPipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseComponent);
    component = fixture.componentInstance;
    component.course = course;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should display corect course title', () => {
    const courseTitleEl: HTMLElement = fixture.debugElement.query(By.css('.course-panel-title')).nativeElement;
    expect(courseTitleEl.textContent.toLowerCase()).toBe(course.title.toLowerCase());
  });
  it('should display course creation date', () => {
    const courseCreationEl: HTMLElement = fixture.debugElement.query(By.css('.course-panel-creation')).nativeElement;
    expect(courseCreationEl.textContent).toBeTruthy();
  });
  it('should display course duration', () => {
    const courseDurationEl: HTMLElement = fixture.debugElement.query(By.css('.course-panel-duration')).nativeElement;
    expect(courseDurationEl.textContent).toBeTruthy();
  });
  it('should display corect course description', () => {
    const courseDescriptionEl: HTMLElement = fixture.debugElement.query(By.css('.course-description')).nativeElement;
    expect(courseDescriptionEl.textContent.toLowerCase()).toBe(course.description.toString().toLowerCase());
  });
  it('should raise delete event when clicked', () => {
    const deleteBtnDE = fixture.debugElement.query(By.css('.course-panel-btn-delete'));
    let deletedCourseId: number;
    component.deleteCourse.subscribe((courseId: number) => deletedCourseId = courseId);
    deleteBtnDE.nativeElement.click();
    expect(deletedCourseId).toBe(course.id);
  });

});

describe('CourseComponent: Host testing', () => {

  let component: CourseHostComponent;
  let fixture: ComponentFixture<CourseHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseHostComponent, CourseComponent, DurationPipe ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [DecimalPipe]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should display corect course title', () => {
    const courseTitleEl: HTMLElement = fixture.debugElement.query(By.css('.course-panel-title')).nativeElement;
    expect(courseTitleEl.textContent.toLowerCase()).toBe(component.course.title.toLowerCase());
  });
  it('should display course creation date', () => {
    const courseCreationEl: HTMLElement = fixture.debugElement.query(By.css('.course-panel-creation')).nativeElement;
    expect(courseCreationEl.textContent).toBeTruthy();
  });
  it('should display course duration', () => {
    const courseDurationEl: HTMLElement = fixture.debugElement.query(By.css('.course-panel-duration')).nativeElement;
    expect(courseDurationEl.textContent).toBeTruthy();
  });
  it('should display corect course description', () => {
    const courseDescriptionEl: HTMLElement = fixture.debugElement.query(By.css('.course-description')).nativeElement;
    expect(courseDescriptionEl.textContent.toLowerCase()).toBe(component.course .description.toString().toLowerCase());
  });
  it('should raise delete event when clicked', () => {
    const deleteBtnDE = fixture.debugElement.query(By.css('.course-panel-btn-delete'));
    deleteBtnDE.nativeElement.click();
    expect(component.deletedCourseId).toBe(component.course.id);
  });
});

describe('CourseComponent: Test as a class', () => {
  let sut: CourseComponent;
  let dialog: MatDialog;

  beforeEach(() => {
    sut = new CourseComponent(dialog);
  });
  it('should create', () => {
    expect(sut).toBeTruthy();
  });
  it('class CourseComponent defined metod delete', () => {
    expect(sut.delete).toBeDefined();
  });
});
