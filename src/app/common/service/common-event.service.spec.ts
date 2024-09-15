import { TestBed } from '@angular/core/testing';

import { CommonEventService } from './common-event.service';

describe('CommonEventService', () => {
  let service: CommonEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
