import { TestBed } from '@angular/core/testing';

import { AutologinguardGuard } from './autologinguard.guard';

describe('AutologinguardGuard', () => {
  let guard: AutologinguardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AutologinguardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
