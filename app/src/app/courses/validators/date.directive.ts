import { Directive } from '@angular/core';
import { AbstractControl, Validator, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appDateValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: DateDirective,
    multi: true
  }]
})
export class DateDirective implements Validator {

  validate(c: AbstractControl): {[key: string]: boolean} | null {
    return c.value ? null : {date: true};
  }

}
