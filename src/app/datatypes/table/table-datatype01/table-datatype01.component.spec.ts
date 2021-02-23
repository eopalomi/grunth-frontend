import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDatatype01Component } from './table-datatype01.component';

describe('TableDatatype01Component', () => {
  let component: TableDatatype01Component;
  let fixture: ComponentFixture<TableDatatype01Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableDatatype01Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDatatype01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
