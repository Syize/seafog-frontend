import { TestBed } from '@angular/core/testing';

import { QueryDateService } from './query-date.service';

describe('QueryDateService', () => {
  let service: QueryDateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QueryDateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
