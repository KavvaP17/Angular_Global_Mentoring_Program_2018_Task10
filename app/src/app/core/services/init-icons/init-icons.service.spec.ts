import { TestBed, inject } from '@angular/core/testing';

import { InitIconsService } from './init-icons.service';

describe('InitIconsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InitIconsService]
    });
  });

  it('should be created', inject([InitIconsService], (service: InitIconsService) => {
    expect(service).toBeTruthy();
  }));
});
