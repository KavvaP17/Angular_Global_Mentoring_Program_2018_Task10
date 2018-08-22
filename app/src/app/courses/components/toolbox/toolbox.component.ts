import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.css']
})
export class ToolboxComponent implements OnInit {
  public searchValue = new BehaviorSubject<string>('');
  @Output() search = new EventEmitter<string>();

  constructor(public router: Router) { }

  ngOnInit() {
    this.searchValue
      .pipe(debounceTime(500))
      .subscribe((value) => {
        if (value && value.length > 2){
          this.search.emit(value);
        } else {
          this.search.emit('');
        }
      })
  }

  public openAddCoursePage() {
    this.router.navigate(['courses', 'new']);
  }

}
