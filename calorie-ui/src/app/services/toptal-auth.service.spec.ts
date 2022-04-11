import { TestBed } from '@angular/core/testing';

import { ToptalAuthService } from './toptal-auth.service';

describe('ToptalAuthService', () => {
  let service: ToptalAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToptalAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
