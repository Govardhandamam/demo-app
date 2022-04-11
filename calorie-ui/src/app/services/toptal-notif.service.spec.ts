import { TestBed } from '@angular/core/testing';

import { ToptalNotifService } from './toptal-notif.service';

describe('ToptalNotifService', () => {
  let service: ToptalNotifService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToptalNotifService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
