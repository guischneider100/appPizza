import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaTelaConfiguracoesPage } from './empresa-tela-configuracoes.page';

describe('EmpresaTelaConfiguracoesPage', () => {
  let component: EmpresaTelaConfiguracoesPage;
  let fixture: ComponentFixture<EmpresaTelaConfiguracoesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpresaTelaConfiguracoesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresaTelaConfiguracoesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
