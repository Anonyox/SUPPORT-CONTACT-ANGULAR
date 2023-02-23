import { TestBed } from '@angular/core/testing';

import { SystemPackageService } from './system-package.service';

describe('SystemPackageService', () => {
  let service: SystemPackageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SystemPackageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
