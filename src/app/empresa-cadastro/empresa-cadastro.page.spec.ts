import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaCadastroPage } from './empresa-cadastro.page';

describe('EmpresaCadastroPage', () => {
  let component: EmpresaCadastroPage;
  let fixture: ComponentFixture<EmpresaCadastroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpresaCadastroPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresaCadastroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
