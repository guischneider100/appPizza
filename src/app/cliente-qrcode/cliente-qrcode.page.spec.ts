import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteQrcodePage } from './cliente-qrcode.page';

describe('ClienteQrcodePage', () => {
  let component: ClienteQrcodePage;
  let fixture: ComponentFixture<ClienteQrcodePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteQrcodePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteQrcodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
