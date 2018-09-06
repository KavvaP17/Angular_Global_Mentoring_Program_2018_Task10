import { Directive } from '@angular/core';
import { AbstractControl, Validator, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appAuthorsValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: AuthorsDirective,
    multi: true
  }]
})
export class AuthorsDirective implements Validator {

  validate(c: AbstractControl): {[key: string]: boolean} | null {
    return c.value.length > 0 ? null : {authors: true};
  }

}
