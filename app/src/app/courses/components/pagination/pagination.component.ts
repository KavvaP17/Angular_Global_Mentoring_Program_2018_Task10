import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { PageEvent, MatPaginator } from '@angular/material';
import { PaginationService } from '../../services/pagination/pagination.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, AfterViewInit, OnDestroy {

   // MatPaginator Inputs
   @Input() length: Number;
   @Output() getPaginationData = new EventEmitter<PageEvent>();

   @ViewChild(MatPaginator) paginator: MatPaginator;

   public pageSize;
   public pageSizeOptions: Array<Number> = [5, 10, 15];

   // MatPaginator Output
   public pageEvent: PageEvent;

   private paginatorEventSub: Subscription;

  constructor(private paginationService: PaginationService) { }

  ngOnInit() {
    this.paginationService.init(this.paginator);
    this.pageSize = this.paginationService.getPageSize();
  }

  ngAfterViewInit() {
    this.paginatorEventSub = this.paginator.page.subscribe(() => {
      this.paginationService.setPageSize(this.pageEvent.pageSize);
      this.pageSize = this.paginationService.getPageSize();
      this.getPaginationData.emit(this.pageEvent);
    });
  }

  public setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  ngOnDestroy() {
    if (this.paginatorEventSub) {
      this.paginatorEventSub.unsubscribe();
    }
  }

}
