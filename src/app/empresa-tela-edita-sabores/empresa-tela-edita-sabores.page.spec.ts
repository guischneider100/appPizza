import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaTelaEditaSaboresPage } from './empresa-tela-edita-sabores.page';

describe('EmpresaTelaEditaSaboresPage', () => {
  let component: EmpresaTelaEditaSaboresPage;
  let fixture: ComponentFixture<EmpresaTelaEditaSaboresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpresaTelaEditaSaboresPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresaTelaEditaSaboresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
