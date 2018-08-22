import { TestBed, async, inject } from '@angular/core/testing';

import { AuthPageGuard } from './auth-page.guard';

describe('AuthPageGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthPageGuard]
    });
  });

  it('should ...', inject([AuthPageGuard], (guard: AuthPageGuard) => {
    expect(guard).toBeTruthy();
  }));
});
