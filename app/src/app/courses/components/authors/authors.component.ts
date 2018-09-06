import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroup} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/store/app.state';
import * as authorsActions from '../../../core/store/authors/authors.actions';

export interface Option {
  id: number;
  name: string;
}

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
  public authors = [
    {id: 1, firstName: 'Adam', lastName:  'Smit'},
    {id: 2, firstName: 'Johr', lastName:  'Qwert'},
    {id: 3, firstName: 'Piter', lastName:  'Pen'},
    {id: 4, firstName: 'Den', lastName:  'Broun'},
  ];
  public options = this.authorsToOptions(this.authors);
  public filteredOptions: Observable<Option[]>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(new authorsActions.GetAuthors());
    this.store.select( state => state.authors.data)
      .subscribe((authors: any) => {
        console.log(authors);
        this.authors = authors;
        this.options = this.authorsToOptions(this.authors);
      });
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith<string | Option>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      );
      this.setValue(this.items);
  }

  private _filter(name: string): Option[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  displayFn(option?: Option): string | undefined {
    return option ? option.name : undefined;
  }

  private authorsToOptions(options): Option[] {
    return this.authors.map(author => {
      return {
        id: author.id,
        name: `${author.firstName} ${author.lastName}`
      };
    });
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
      this.onTouched();
    }
  }

  get value() {
    return this.selectedAuthors;
  }

  writeValue(value: any) {
    if (value && value.length > 0) {
      this.selectedAuthors = value;
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

  delete(author) {
    this.selectedAuthors = this.selectedAuthors.filter(item => item.id !== author.id);
    this.onChange(this.selectedAuthors);
    this.onTouched();
  }

  optionSelected(selectedValue) {
    this.myControl.setValue('');
    this.selectedAuthors.push(this.getAuthorById(selectedValue.option.value.id));
    this.onChange(this.value);
    this.onTouched();
  }

  private getAuthorById(id) {
    return this.authors.find(author => author.id === id);
  }
  public markInputAsDirty() {
    this.onTouched();
  }

}
