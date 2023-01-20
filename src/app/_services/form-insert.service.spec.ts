import { TestBed } from '@angular/core/testing';

import { FormInsertService } from './form-insert.service';

describe('FormInsertService', () => {
  let service: FormInsertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormInsertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
