import { TestBed } from '@angular/core/testing';

import { ExtractedCVService } from './extracted-cv.service';

describe('ExtractedCVService', () => {
  let service: ExtractedCVService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtractedCVService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
