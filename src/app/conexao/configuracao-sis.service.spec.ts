import { TestBed } from '@angular/core/testing';

import { ConfiguracaoSisService } from './configuracao-sis.service';

describe('ConfiguracaoSisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfiguracaoSisService = TestBed.get(ConfiguracaoSisService);
    expect(service).toBeTruthy();
  });
});
