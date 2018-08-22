import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoursesComponent } from './courses.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { EditCourseComponent } from './components/edit-course/edit-course.component';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
    {
        path: 'courses/new',
        component: AddCourseComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'courses/:id',
        component: EditCourseComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'courses',
        component: CoursesComponent,
        canActivate: [AuthGuard]
    }
 ];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
  })
  export class CoursesRoutingModule { }