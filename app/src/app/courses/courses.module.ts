import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { coursesReducer } from '../core/store/courses/courses.reducer';

import { CoursesComponent } from './courses.component';
import { ToolboxComponent } from './components/toolbox/toolbox.component';
import { CourseComponent } from './components/course/course.component';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { CourseBorderDirective } from './directives/course-border/course-border.directive';
import { DurationPipe } from './pipes/duration/duration.pipe';
import { OrderByDatePipe } from './pipes/orderByDate/order-by-date.pipe';
import { SearchPipe } from './pipes/search/search.pipe';
import { DatePipe } from '@angular/common';
import { CourseService } from './services/course/course.service';
import { DialogComponent } from './components/dialog/dialog.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { CoursesRoutingModule } from './courses-routing.module';
import { EditCourseComponent } from './components/edit-course/edit-course.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { PaginationService } from './services/pagination/pagination.service';
import { EffectsModule } from '../../../node_modules/@ngrx/effects';
import { CoursesEffects } from '../core/store/courses/courses.effects';
import { ValidatorsModule } from './validators/validators.module';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('courses', coursesReducer),
    EffectsModule.forFeature([CoursesEffects]),
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    ValidatorsModule,
    CoursesRoutingModule
  ],
  providers: [DecimalPipe, SearchPipe, CourseService, DatePipe, PaginationService],
  declarations: [
    ToolboxComponent,
    CourseComponent,
    CoursesListComponent,
    CoursesComponent,
    CourseBorderDirective,
    DurationPipe,
    OrderByDatePipe,
    SearchPipe,
    DialogComponent,
    AddCourseComponent,
    EditCourseComponent,
    PaginationComponent
  ],
  entryComponents: [DialogComponent],
  exports: [CoursesComponent]
})
export class CoursesModule { }
