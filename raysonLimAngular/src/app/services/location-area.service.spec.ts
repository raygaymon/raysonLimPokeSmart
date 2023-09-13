import { TestBed } from '@angular/core/testing';

import { LocationAreaService } from './location-area.service';

describe('LocationAreaService', () => {
  let service: LocationAreaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationAreaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
