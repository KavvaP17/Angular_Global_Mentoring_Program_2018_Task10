import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { InitIconsService } from './core/services/init-icons/init-icons.service';
import { Md5 } from 'ts-md5';

const fakeIconsSrvice = {};
const fakeMd5 = {};

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ AppComponent],
      providers: [{provide: InitIconsService, useValue : fakeIconsSrvice},
                  {provide: Md5, useValue : fakeMd5}],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    component.user = {};
    component.isAuthenticated = false;
  });

  it('should create the app ', async(() => {
    expect(component).toBeTruthy();
  }));
});
