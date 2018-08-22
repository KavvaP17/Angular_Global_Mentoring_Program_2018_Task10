import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DurationPipe } from './duration.pipe';
import { DecimalPipe } from '@angular/common';

@Component({
  template: `
    <div class="case1">{{case1 | duration}}</div>
    <div class="case2">{{case2 | duration}}</div>
    <div class="case3">{{case3 | duration}}</div>
    <div class="case4">{{case4 | duration}}</div>
    <div class="case5">{{case5 | duration}}</div>`
})
class TestComponent {
  case1 = 60;
  case2 = 65;
  case3 = 120;
  case4 = 1;
  case5 = 20;
}

describe('DurationPipe', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let testEl1: DebugElement;
  let testEl2: DebugElement;
  let testEl3: DebugElement;
  let testEl4: DebugElement;
  let testEl5: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestComponent, DurationPipe],
      providers: [DecimalPipe]
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

  it('60 => 1h 00min', () => {
    expect(testEl1.nativeElement.textContent).toBe('1h 00min');
  });

  it('65 => 1h 05min', () => {
    expect(testEl2.nativeElement.textContent).toBe('1h 05min');
  });

  it('120 => 2h 00min', () => {
    expect(testEl3.nativeElement.textContent).toBe('2h 00min');
  });

  it('1 => 01min', () => {
    expect(testEl4.nativeElement.textContent).toBe('01min');
  });

  it('20 => 20min', () => {
    expect(testEl5.nativeElement.textContent).toBe('20min');
  });

});
