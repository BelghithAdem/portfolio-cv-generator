import { TestBed } from '@angular/core/testing';

import { SevicesService } from './sevices.service';

describe('SevicesService', () => {
  let service: SevicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SevicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
