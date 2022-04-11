import { TestBed } from '@angular/core/testing';

import { ToptalHttpService } from './toptal-http.service';

describe('ToptalHttpService', () => {
  let service: ToptalHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToptalHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
