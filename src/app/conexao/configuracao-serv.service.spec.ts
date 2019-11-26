import { TestBed } from '@angular/core/testing';

import { ConfiguracaoServService } from './configuracao-serv.service';

describe('ConfiguracaoServService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfiguracaoServService = TestBed.get(ConfiguracaoServService);
    expect(service).toBeTruthy();
  });
});
