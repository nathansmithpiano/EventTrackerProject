import { TestBed } from '@angular/core/testing';

import { GarminService } from './garmin.service';

describe('GarminService', () => {
  let service: GarminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GarminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
