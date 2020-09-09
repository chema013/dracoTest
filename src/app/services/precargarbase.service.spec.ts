import { TestBed } from '@angular/core/testing';

import { PrecargarbaseService } from './precargarbase.service';

describe('PrecargarbaseService', () => {
  let service: PrecargarbaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrecargarbaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
