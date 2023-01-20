import { TestBed } from '@angular/core/testing';

import { AdminSistService } from './admin-sist.service';

describe('AdminSistService', () => {
  let service: AdminSistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminSistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
