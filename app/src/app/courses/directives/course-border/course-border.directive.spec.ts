import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { CourseBorderDirective } from './course-border.directive';


@Component({
  template: `
    <div class="case1" [appCourseBorder]="date1">1</div>
    <div class="case2" [appCourseBorder]="date2">2</div>
    <div class="case3" [appCourseBorder]="date3">3</div>
    <div class="case4" [appCourseBorder]="date4">4</div>
    <div class="case5" [appCourseBorder]="date5">5</div>`
})
class TestComponent {
  date1 = Date.now();
  date2 = Date.now() - 13 * 24 * 60 * 60 * 1000;
  date3 = Date.now() + 13 * 24 * 60 * 60 * 1000;
  date4 = Date.now() - 16 * 24 * 60 * 60 * 1000;
  date5 = Date.now() + 16 * 24 * 60 * 60 * 1000;

}

describe('CourseBorderDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let testEl1: DebugElement;
  let testEl2: DebugElement;
  let testEl3: DebugElement;
  let testEl4: DebugElement;
  let testEl5: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestComponent, CourseBorderDirective ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    testEl1 = fixture.debugElement.query(By.css('.case1'));
    testEl2 = fixture.debugElement.query(By.css('.case2'));
    testEl3 = fixture.debugElement.query(By.css('.case3'));
    testEl4 = fixture.debugElement.query(By.css('.case4'));
    testEl5 = fixture.debugElement.query(By.css('.case5'));
  });

  it('Element has class green-border', () => {
    expect(testEl1.nativeElement.classList.contains('green-border')).toBe(true);
  });

  it('Element has class green-border', () => {
    expect(testEl2.nativeElement.classList.contains('green-border')).toBe(true);
  });

  it('Element has class blue-border', () => {
    expect(testEl3.nativeElement.classList.contains('blue-border')).toBe(true);
  });

  it('Element do not have blue-border and green-border classes ', () => {
    expect(!testEl4.nativeElement.classList.contains('blue-border') && !testEl4.nativeElement.classList.contains('green-border')).toBe(true);
  });

  it('Element has class blue-border', () => {
    expect(testEl5.nativeElement.classList.contains('blue-border')).toBe(true);
  });

});
