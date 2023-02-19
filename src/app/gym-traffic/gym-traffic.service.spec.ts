import { TestBed } from '@angular/core/testing';

import { GymTrafficService } from './gym-traffic.service';

describe('GymTrafficService', () => {
  let service: GymTrafficService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GymTrafficService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
