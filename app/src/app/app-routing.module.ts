import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthPageGuard } from './core/guards/auth-page.guard';

const routes: Routes = [
    {
        path: 'auth',
        component: AuthComponent,
        canActivate: [AuthPageGuard]
    },
    {
        path: '',
        redirectTo: 'courses',
        pathMatch: 'full',
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }