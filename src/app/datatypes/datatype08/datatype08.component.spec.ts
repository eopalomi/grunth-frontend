import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Datatype08Component } from './datatype08.component';

describe('Datatype08Component', () => {
  let component: Datatype08Component;
  let fixture: ComponentFixture<Datatype08Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Datatype08Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Datatype08Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
