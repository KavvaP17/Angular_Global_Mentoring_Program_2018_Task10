import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Router } from '@angular/router';


import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { CoursesModule } from './courses/courses.module';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';

import { AuthService } from './auth/services/auth/auth.service';
import { Md5 } from 'ts-md5';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthPageGuard } from './core/guards/auth-page.guard';
import { TokenInterceptor } from './core/interceptors/token-interceptor.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CoreModule,
    CoursesModule,
    HttpClientModule,
    AuthModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    Md5,
    AuthGuard,
    AuthPageGuard,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
   ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private router: Router) {
    // console.log('Routes:', JSON.stringify(router.config, undefined, 2));
  }
}
