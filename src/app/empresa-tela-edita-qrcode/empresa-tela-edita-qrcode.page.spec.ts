import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaTelaEditaQrcodePage } from './empresa-tela-edita-qrcode.page';

describe('EmpresaTelaEditaQrcodePage', () => {
  let component: EmpresaTelaEditaQrcodePage;
  let fixture: ComponentFixture<EmpresaTelaEditaQrcodePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpresaTelaEditaQrcodePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresaTelaEditaQrcodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
