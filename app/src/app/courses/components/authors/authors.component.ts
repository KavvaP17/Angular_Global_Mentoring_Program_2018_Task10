import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroup} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AuthorsComponent),
      multi: true
    }
  ]
})
export class AuthorsComponent implements OnInit, ControlValueAccessor {

  @Input() disabled = false;
  @Input() items = [];
  public myControl = new FormControl();
  public selectedAuthors = [];
  public options = [
    'Adam Smit',
    'Johr Qwert',
    'Piter Pen',
    'Den Broun'
  ];
  public filteredOptions: Observable<string[]>;

  constructor() { }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith<string>(''),
        map(name => name ? this._filter(name) : this.options.slice())
      );
      this.setValue(this.items);
  }

  onChange(value) {}
  onTouched() {}

  setValue(value) {
    this.value = value;
  }

  set value(newValue) {
    if (newValue && newValue.length) {
      this.selectedAuthors.push(newValue);
      this.onChange(this.selectedAuthors);
    }
  }

  get value() {
    return this.selectedAuthors;
  }

  writeValue(value: any) {
    if (value && value.length > 0) {
      this.selectedAuthors.push(value);
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  displayFn(author?: string): string | undefined {
    return author ? author : undefined;
  }

  private _filter(name: string): string[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  delete(author) {
    this.selectedAuthors = this.selectedAuthors.filter(item => item !== author);
    this.onChange(this.selectedAuthors);
  }

  optionSelected(selectedValue) {
    this.myControl.setValue('');
    this.value = selectedValue.option.value;
    this.onChange(this.value);
    this.onTouched();
  }

}
