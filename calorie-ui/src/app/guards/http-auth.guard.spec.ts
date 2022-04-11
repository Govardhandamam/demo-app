import { TestBed } from '@angular/core/testing';

import { HttpAuthGuard } from './http-auth.guard';

describe('HttpAuthGuard', () => {
  let guard: HttpAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HttpAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
