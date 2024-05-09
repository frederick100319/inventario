import { TestBed } from '@angular/core/testing';

import { ResetAuthService } from './reset-auth.service';

describe('ResetAuthService', () => {
  let service: ResetAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResetAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
