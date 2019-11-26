import { TestBed } from '@angular/core/testing';

import { SaboresService } from './sabores.service';

describe('SaboresService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SaboresService = TestBed.get(SaboresService);
    expect(service).toBeTruthy();
  });
});
