import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  public isLoading = new BehaviorSubject<boolean>(false);

  constructor() { }

  setIsLoadingValue(value: boolean) {
    this.isLoading.next(value);
  }

  getIsLoadingValue(): BehaviorSubject<boolean> {
    return this.isLoading;
  }
}
