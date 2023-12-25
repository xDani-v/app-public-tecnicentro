import { TestBed } from '@angular/core/testing';

import { ServiciosapiService } from './serviciosapi.service';

describe('ServiciosapiService', () => {
  let service: ServiciosapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiciosapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
