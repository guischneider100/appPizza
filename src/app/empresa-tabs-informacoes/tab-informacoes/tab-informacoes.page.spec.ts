import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabInformacoesPage } from './tab-informacoes.page';

describe('TabInformacoesPage', () => {
  let component: TabInformacoesPage;
  let fixture: ComponentFixture<TabInformacoesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabInformacoesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabInformacoesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
