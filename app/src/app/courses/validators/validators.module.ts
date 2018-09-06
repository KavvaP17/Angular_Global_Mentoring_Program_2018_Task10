import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateDirective } from './date.directive';
import { DurationDirective } from './duration.directive';
import { AuthorsDirective } from './authors.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DateDirective, DurationDirective, AuthorsDirective],
  exports: [DateDirective, DurationDirective, AuthorsDirective]
})
export class ValidatorsModule { }
