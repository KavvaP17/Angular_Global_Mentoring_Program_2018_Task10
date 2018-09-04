import { Directive } from '@angular/core';
import { AbstractControl, Validator, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appDurationValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: DurationDirective,
    multi: true
  }]
})
export class DurationDirective implements Validator {

  validate(c: AbstractControl): {[key: string]: boolean} | null {
    const regExp = /^[0-9]*$/;
    return regExp.test(c.value) ? null : {duration: true};
  }

}
