import { TestBed } from '@angular/core/testing';

import { ToptalSnackbarService } from './toptal-snackbar.service';

describe('ToptalSnackbarService', () => {
  let service: ToptalSnackbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToptalSnackbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
