import { TestBed } from '@angular/core/testing';

import { FormdataService } from './formdata.service';

describe('FormdataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormdataService = TestBed.get(FormdataService);
    expect(service).toBeTruthy();
  });
});
