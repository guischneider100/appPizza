import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabSugestoesPage } from './tab-sugestoes.page';

describe('TabSugestoesPage', () => {
  let component: TabSugestoesPage;
  let fixture: ComponentFixture<TabSugestoesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabSugestoesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabSugestoesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
