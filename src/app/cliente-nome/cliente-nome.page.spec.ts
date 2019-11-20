import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteNomePage } from './cliente-nome.page';

describe('ClienteNomePage', () => {
  let component: ClienteNomePage;
  let fixture: ComponentFixture<ClienteNomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteNomePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteNomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
