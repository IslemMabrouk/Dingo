import { TestBed } from '@angular/core/testing';

import { PlatService } from './plat.service';

describe('PlatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlatService = TestBed.get(PlatService);
    expect(service).toBeTruthy();
  });
});
