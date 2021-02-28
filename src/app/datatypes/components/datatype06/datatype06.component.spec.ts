import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Datatype06Component } from './datatype06.component';

describe('Datatype06Component', () => {
  let component: Datatype06Component;
  let fixture: ComponentFixture<Datatype06Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Datatype06Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Datatype06Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
