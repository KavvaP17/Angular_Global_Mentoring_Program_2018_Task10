import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateDirective } from './date.directive';
import { DurationDirective } from './duration.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DateDirective, DurationDirective],
  exports: [DateDirective, DurationDirective]
})
export class ValidatorsModule { }
