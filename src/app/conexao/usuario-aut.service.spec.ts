import { TestBed } from '@angular/core/testing';

import { UsuarioAutService } from './usuario-aut.service';

describe('UsuarioAutService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsuarioAutService = TestBed.get(UsuarioAutService);
    expect(service).toBeTruthy();
  });
});
