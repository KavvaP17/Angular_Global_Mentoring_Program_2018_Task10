import { Injectable } from '@angular/core';
import { MatPaginator } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  private pagination: MatPaginator;
  private pageSize = 5;

  constructor() { }

  init(pagination) {
    this.pagination = pagination;
  }

  reset() {
    this.pagination.firstPage();
  }

  previousPage() {
    this.pagination.previousPage();
  }

  getPageSize() {
    return this.pageSize;
  }

  setPageSize(value: number) {
    this.pageSize = value;
  }
}
